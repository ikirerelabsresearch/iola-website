import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const TRAIL_SEGMENTS = 48
const TRAIL_LENGTH = 1.8
const TRANSITION_DURATION = 60.0

// ── Color palette ────────────────────────────────────────────────────────────
const CONSTELLATION_COLORS = [
    '#00DCFF', '#FF6B35', '#7B2CBF', '#2ECC71',
    '#E74C3C', '#F39C12', '#3498DB', '#E91E63',
]
export function getConstellationColor(index) {
    return CONSTELLATION_COLORS[index % CONSTELLATION_COLORS.length]
}

// ── Procedural 3U CubeSat geometry (10×10×30 cm → scene units ~0.05) ─────────
function buildCubeSatGeometry() {
    const body = new THREE.BoxGeometry(0.022, 0.022, 0.065)

    // Two deployable solar panels (each side)
    const panelGeo = new THREE.BoxGeometry(0.04, 0.001, 0.03)
    const panelL = panelGeo.clone()
    const panelR = panelGeo.clone()

    // Offset the panels outward from the body
    const mL = new THREE.Matrix4().makeTranslation(-0.031, 0, 0.008)
    const mR = new THREE.Matrix4().makeTranslation( 0.031, 0, 0.008)
    panelL.applyMatrix4(mL)
    panelR.applyMatrix4(mR)

    // UHF antenna stub (top face)
    const antGeo = new THREE.CylinderGeometry(0.001, 0.001, 0.018, 6)
    const antMat = new THREE.Matrix4().makeTranslation(0, 0, 0.038).multiply(
        new THREE.Matrix4().makeRotationX(Math.PI / 2)
    )
    antGeo.applyMatrix4(antMat)

    // Camera lens (bottom face)
    const camGeo = new THREE.CylinderGeometry(0.004, 0.004, 0.006, 8)
    const camMat = new THREE.Matrix4().makeTranslation(0, 0, -0.036).multiply(
        new THREE.Matrix4().makeRotationX(Math.PI / 2)
    )
    camGeo.applyMatrix4(camMat)

    // Merge all into one geometry for instanced mesh
    const merged = mergeGeometries([body, panelL, panelR, antGeo, camGeo])
    return merged
}

// Minimal geometry merge (replaces BufferGeometryUtils to avoid extra import)
function mergeGeometries(geos) {
    let totalVerts = 0
    let totalIdx = 0
    geos.forEach(g => {
        totalVerts += g.attributes.position.count
        if (g.index) totalIdx += g.index.count
    })

    const positions = new Float32Array(totalVerts * 3)
    const normals = new Float32Array(totalVerts * 3)
    const indices = totalIdx > 0 ? [] : null

    let vOff = 0
    let iOff = 0

    geos.forEach(g => {
        const pos = g.attributes.position.array
        const nor = g.attributes.normal ? g.attributes.normal.array : null
        const n = g.attributes.position.count
        for (let i = 0; i < pos.length; i++) positions[vOff * 3 + i] = pos[i]
        if (nor) for (let i = 0; i < nor.length; i++) normals[vOff * 3 + i] = nor[i]
        if (indices && g.index) {
            const idx = g.index.array
            for (let i = 0; i < idx.length; i++) indices.push(idx[i] + vOff)
        }
        vOff += n
        iOff += g.index ? g.index.count : 0
    })

    const out = new THREE.BufferGeometry()
    out.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    out.setAttribute('normal', new THREE.BufferAttribute(normals, 3))
    if (indices) out.setIndex(indices)
    out.computeVertexNormals()
    return out
}

// ── Satellite metadata generator ─────────────────────────────────────────────
const SAT_MODELS = ['IK-3U-v2', 'IK-3U-EO', 'IK-6U-Pro', 'IK-3U-Comm']
const SAT_MISSIONS = ['Earth Observation', 'Climate Monitor', 'IoT Gateway', 'RF Survey']

function generateSatelliteData(id, index, isZombie) {
    const year = 2024 + Math.floor(Math.random() * 3)
    const month = Math.floor(Math.random() * 12) + 1
    const battery = isZombie ? Math.random() * 25 : 80 + Math.random() * 18
    const temp = isZombie ? (Math.random() > 0.5 ? -45 : 82) + Math.random() * 15 : 18 + Math.random() * 12
    const signal = isZombie ? -118 - Math.random() * 12 : -62 - Math.random() * 18
    const solar = isZombie ? Math.random() * 80 : 430 + Math.random() * 70
    const fuel = isZombie ? Math.random() * 8 : 55 + Math.random() * 38
    return {
        designator: `IK-${year}-${(index + 1).toString().padStart(3, '0')}`,
        model: SAT_MODELS[index % SAT_MODELS.length],
        mission: SAT_MISSIONS[index % SAT_MISSIONS.length],
        launchDate: `${year}-${month.toString().padStart(2, '0')}-${(Math.floor(Math.random() * 27) + 1).toString().padStart(2, '0')}`,
        noradId: 44000 + index + Math.floor(Math.random() * 4000),
        inclination: (45 + Math.random() * 53).toFixed(2),
        telemetry: { battery, temp, signal, solar, fuel,
            latency: isZombie ? 999 : 18 + Math.random() * 35,
            cpuLoad: isZombie ? 0 : 22 + Math.random() * 44,
            dataRate: isZombie ? 0 : 0.8 + Math.random() * 4.2,
        }
    }
}

// ── Main Constellation component ──────────────────────────────────────────────
export default function Constellation({ config, onSatelliteClick, onPositionsUpdate, selectedSatelliteId }) {
    const { id, color, satelliteCount, altitude, inclination, speed, coordinated, visible, zombieCount = 0 } = config

    const meshRef = useRef()
    const trailsRef = useRef()
    const orbitRingRef = useRef()
    const { camera, raycaster, pointer } = useThree()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Procedural CubeSat geometry (shared across all instances)
    const satGeometry = useMemo(() => buildCubeSatGeometry(), [])

    // Generate satellite logical data
    const satellites = useMemo(() => {
        const sats = []
        const total = satelliteCount + zombieCount
        for (let i = 0; i < total; i++) {
            const isZombie = i >= satelliteCount
            const meta = generateSatelliteData(id, i, isZombie)
            if (coordinated && !isZombie) {
                const numShells = Math.max(1, Math.ceil(satelliteCount / 50))
                const satsPerShell = Math.ceil(satelliteCount / numShells)
                const shellIdx = Math.floor(i / satsPerShell)
                const posInShell = i % satsPerShell
                const shellSatCount = Math.min(satsPerShell, satelliteCount - shellIdx * satsPerShell)
                sats.push({
                    id: `${id}-sat-${i}`, constellationId: id,
                    theta: (posInShell / shellSatCount) * Math.PI * 2,
                    phi: ((shellIdx % 3 - 1) * 0.3) * Math.min(inclination, 0.5),
                    radiusOffset: (shellIdx / numShells) * 0.3 - 0.15,
                    speedOffset: 1.0, isZombie: false, ...meta
                })
            } else {
                sats.push({
                    id: `${id}-sat-${i}`, constellationId: id,
                    theta: Math.random() * Math.PI * 2,
                    phi: (Math.random() - 0.5) * inclination,
                    radiusOffset: (Math.random() - 0.5) * 0.2,
                    speedOffset: isZombie ? Math.random() * 0.3 + 0.05 : Math.random() * 0.5 + 0.5,
                    isZombie, ...meta
                })
            }
        }
        return sats
    }, [id, satelliteCount, zombieCount, coordinated, inclination])

    // Trail geometry
    const trailGeometry = useMemo(() => {
        const count = satellites.length
        const totalV = count * TRAIL_SEGMENTS
        const indices = [], orbitParams = new Float32Array(totalV * 4), trailOffsets = new Float32Array(totalV), positions = new Float32Array(totalV * 3)
        for (let i = 0; i < count; i++) {
            const s = satellites[i]
            for (let j = 0; j < TRAIL_SEGMENTS; j++) {
                const idx = i * TRAIL_SEGMENTS + j
                orbitParams[idx * 4] = s.theta; orbitParams[idx * 4 + 1] = s.phi
                orbitParams[idx * 4 + 2] = s.radiusOffset; orbitParams[idx * 4 + 3] = s.speedOffset
                trailOffsets[idx] = j / (TRAIL_SEGMENTS - 1)
                const r = 2 + altitude
                positions[idx * 3] = r; positions[idx * 3 + 1] = 0; positions[idx * 3 + 2] = 0
                if (j < TRAIL_SEGMENTS - 1) indices.push(idx, idx + 1)
            }
        }
        return { indices: new Uint32Array(indices), orbitParams, trailOffsets, positions }
    }, [satellites, altitude])

    useEffect(() => {
        if (trailsRef.current?.geometry) {
            const geo = trailsRef.current.geometry
            geo.setIndex(new THREE.BufferAttribute(trailGeometry.indices, 1))
            geo.setAttribute('position', new THREE.BufferAttribute(trailGeometry.positions, 3))
            geo.setAttribute('aOrbit', new THREE.BufferAttribute(trailGeometry.orbitParams, 4))
            geo.setAttribute('aOffset', new THREE.BufferAttribute(trailGeometry.trailOffsets, 1))
            geo.computeBoundingSphere()
        }
    }, [trailGeometry])

    // Build orbital ring path (dashed circle at this constellation's altitude + mean inclination)
    const orbitRingGeometry = useMemo(() => {
        const segments = 256
        const r = 2 + altitude
        const pts = []
        for (let i = 0; i <= segments; i++) {
            const a = (i / segments) * Math.PI * 2
            pts.push(new THREE.Vector3(r * Math.cos(a), 0, r * Math.sin(a)))
        }
        const geo = new THREE.BufferGeometry().setFromPoints(pts)
        geo.computeBoundingSphere()
        return geo
    }, [altitude])

    const positionsRef = useRef([])
    const highlightRef = useRef()
    const transitionRef = useRef({ active: false, startTime: 0, prevParams: [] })
    const prevCoordinatedRef = useRef(coordinated)
    const actualThetaRef = useRef([])

    useEffect(() => {
        if (prevCoordinatedRef.current !== coordinated && positionsRef.current.length > 0) {
            transitionRef.current = {
                active: true, startTime: -1,
                prevParams: positionsRef.current.map(s => ({ phi: s.phi, radiusOffset: s.radiusOffset, speedOffset: s.speedOffset, currentAngle: 0 }))
            }
        }
        prevCoordinatedRef.current = coordinated
    }, [coordinated])

    const easeInOutQuad = t => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

    const threeColor = useMemo(() => new THREE.Color(color), [color])

    const trailUniforms = useMemo(() => ({
        uTime: { value: 0 }, uAltitude: { value: altitude },
        uSpeed: { value: speed }, uTrailLength: { value: TRAIL_LENGTH }
    }), [])

    useFrame((state) => {
        if (!visible) return
        const t = state.clock.getElapsedTime()
        const r_earth = 2
        const positions = []
        let selectedFound = false

        const transition = transitionRef.current
        let tp = 1.0
        if (transition.active) {
            if (transition.startTime < 0) {
                transition.startTime = t
                satellites.forEach((s, i) => {
                    if (transition.prevParams[i]) transition.prevParams[i].currentAngle = s.theta + t * speed * (transition.prevParams[i].speedOffset || 1) * 0.1
                })
            }
            tp = Math.min((t - transition.startTime) / TRANSITION_DURATION, 1.0)
            if (tp >= 1.0) transition.active = false
        }

        if (meshRef.current) {
            satellites.forEach((s, i) => {
                let phi = s.phi, radiusOffset = s.radiusOffset, speedOffset = s.speedOffset, angle
                const zombieWobble = s.isZombie ? Math.sin(t * 1.5 + i * 0.7) * 0.08 : 0

                if (transition.active && transition.prevParams[i] && !s.isZombie) {
                    const prev = transition.prevParams[i]
                    const stagger = (i / satellites.length) * 0.12
                    const sp = Math.max(0, Math.min(1, (tp - stagger) / (1 - stagger)))
                    const te = easeInOutQuad(sp)
                    phi = prev.phi + (s.phi - prev.phi) * te
                    radiusOffset = prev.radiusOffset + (s.radiusOffset - prev.radiusOffset) * te
                    speedOffset = prev.speedOffset + (s.speedOffset - prev.speedOffset) * te
                    const tss = t - transition.startTime
                    angle = prev.currentAngle + tss * speed * speedOffset * 0.1
                    actualThetaRef.current[i] = angle - t * speed * speedOffset * 0.1
                } else {
                    const useTheta = (actualThetaRef.current[i] !== undefined && !s.isZombie) ? actualThetaRef.current[i] : s.theta
                    angle = useTheta + t * speed * s.speedOffset * 0.1 + zombieWobble
                    if (!s.isZombie) actualThetaRef.current[i] = useTheta
                }

                const r = r_earth + altitude + radiusOffset
                // Apply inclination as a rotation around X axis
                const rawX = r * Math.cos(angle)
                const rawZ = r * Math.sin(angle)
                const x = rawX
                const y = rawZ * Math.sin(phi)
                const z = rawZ * Math.cos(phi)

                dummy.position.set(x, y, z)
                // Orient satellite: body Z toward Earth (-nadir), panels along X
                dummy.lookAt(0, 0, 0)
                // Scale: zombies slightly larger (tumbling debris), normal sats compact
                dummy.scale.setScalar(s.isZombie ? 0.9 : 0.7)
                dummy.updateMatrix()
                meshRef.current.setMatrixAt(i, dummy.matrix)

                positions.push({ ...s, phi, radiusOffset, speedOffset, liveAngle: angle, position: { x, y, z } })

                if (s.id === selectedSatelliteId && highlightRef.current) {
                    highlightRef.current.position.set(x, y, z)
                    highlightRef.current.visible = true
                    selectedFound = true
                }
            })
            meshRef.current.instanceMatrix.needsUpdate = true

            // Every frame: push each satellite's LIVE current angle into aOrbit.x
            // This guarantees the trail head is always exactly at the satellite position.
            if (trailsRef.current?.geometry) {
                const geo = trailsRef.current.geometry
                const orbitAttr = geo.getAttribute('aOrbit')
                if (orbitAttr) {
                    positions.forEach((pos, i) => {
                        for (let j = 0; j < TRAIL_SEGMENTS; j++) {
                            const idx = i * TRAIL_SEGMENTS + j
                            orbitAttr.array[idx * 4]     = pos.liveAngle      // live current angle, not initial theta
                            orbitAttr.array[idx * 4 + 1] = pos.phi
                            orbitAttr.array[idx * 4 + 2] = pos.radiusOffset
                            orbitAttr.array[idx * 4 + 3] = pos.speedOffset
                        }
                    })
                    orbitAttr.needsUpdate = true
                }
            }
        }

        if (!selectedFound && highlightRef.current) highlightRef.current.visible = false

        positionsRef.current = positions
        if (onPositionsUpdate) onPositionsUpdate(id, positions)

        // Trail shader only needs uAltitude/uSpeed for the lag calculation now
        if (trailsRef.current?.material) {
            const mat = trailsRef.current.material
            mat.uniforms.uTime.value = t
            mat.uniforms.uAltitude.value = altitude
            mat.uniforms.uSpeed.value = speed
            mat.uniforms.uTrailLength.value = TRAIL_LENGTH
        }

        // Animate dashed orbital ring — dash flows in direction of orbit
        if (orbitRingRef.current?.material) {
            orbitRingRef.current.material.dashOffset = -t * speed * 0.04
        }
    })

    const handleClick = useCallback((e) => {
        if (!meshRef.current || !onSatelliteClick) return
        e.stopPropagation()
        raycaster.setFromCamera(pointer, camera)
        const intersects = raycaster.intersectObject(meshRef.current)
        if (intersects.length > 0) {
            const instanceId = intersects[0].instanceId
            if (instanceId !== undefined && positionsRef.current[instanceId]) {
                onSatelliteClick(positionsRef.current[instanceId])
            }
        }
    }, [camera, raycaster, pointer, onSatelliteClick])

    if (!visible) return null

    // Mean inclination for the ring tilt
    const ringTilt = satellites.length > 0
        ? satellites.slice(0, Math.min(10, satellites.length)).reduce((s, x) => s + x.phi, 0) / Math.min(10, satellites.length)
        : 0

    return (
        <group>
            {/* ── Orbital ring (dashed, animated) ── */}
            <group rotation={[ringTilt, 0, 0]}>
                <line ref={orbitRingRef} geometry={orbitRingGeometry} frustumCulled={false}>
                    <lineDashedMaterial
                        color={color}
                        dashSize={0.18}
                        gapSize={0.09}
                        transparent
                        opacity={coordinated ? 0.55 : 0.2}
                        linewidth={1}
                    />
                </line>
            </group>

            {/* ── Satellite fleet (instanced high-fidelity CubeSat mesh) ── */}
            <instancedMesh
                ref={meshRef}
                args={[satGeometry, null, satellites.length]}
                frustumCulled={false}
                onClick={handleClick}
            >
                <meshStandardMaterial
                    color={threeColor}
                    emissive={threeColor}
                    emissiveIntensity={coordinated ? 0.9 : 0.5}
                    metalness={0.7}
                    roughness={0.25}
                />
            </instancedMesh>

            {/* ── Selection highlight ring ── */}
            <mesh ref={highlightRef} visible={false}>
                <torusGeometry args={[0.065, 0.008, 8, 32]} />
                <meshBasicMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.85}
                    depthTest={false}
                />
            </mesh>

            {/* ── Orbital trails (shader-driven) ── */}
            <lineSegments ref={trailsRef} frustumCulled={false}>
                <bufferGeometry />
                <shaderMaterial
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    uniforms={trailUniforms}
                    vertexShader={`
                        uniform float uAltitude;
                        uniform float uSpeed;
                        uniform float uTrailLength;
                        attribute vec4 aOrbit;
                        attribute float aOffset;
                        varying float vAlpha;
                        void main() {
                            // aOrbit.x = satellite's LIVE current angle (updated every frame from JS)
                            // Trail simply lags BEHIND by aOffset * trailLength radians
                            vAlpha = 1.0 - aOffset;
                            float angularLag = aOffset * uTrailLength;
                            float trailAngle = aOrbit.x - angularLag;
                            float r = 2.0 + uAltitude + aOrbit.z;
                            float rawZ = r * sin(trailAngle);
                            vec3 pos;
                            pos.x = r * cos(trailAngle);
                            pos.y = rawZ * sin(aOrbit.y);
                            pos.z = rawZ * cos(aOrbit.y);
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                        }
                    `}
                    fragmentShader={`
                        varying float vAlpha;
                        void main() {
                            gl_FragColor = vec4(${threeColor.r.toFixed(3)}, ${threeColor.g.toFixed(3)}, ${threeColor.b.toFixed(3)}, vAlpha * 0.65);
                        }
                    `}
                />
            </lineSegments>
        </group>
    )
}
