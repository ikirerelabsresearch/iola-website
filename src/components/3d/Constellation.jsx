import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const TRAIL_SEGMENTS = 30
const TRAIL_LENGTH = 1.5

// Color palette for constellations
const CONSTELLATION_COLORS = [
    '#00F0FF', // Teal
    '#FF6B35', // Orange
    '#7B2CBF', // Purple
    '#2ECC71', // Green
    '#E74C3C', // Red
    '#F39C12', // Yellow
    '#3498DB', // Blue
    '#E91E63', // Pink
]

export function getConstellationColor(index) {
    return CONSTELLATION_COLORS[index % CONSTELLATION_COLORS.length]
}

// Generate realistic satellite metadata
const generateSatelliteData = (id, index, isZombie, constellationId) => {
    const launchYear = 2020 + Math.floor(Math.random() * 6)
    const launchMonth = Math.floor(Math.random() * 12) + 1
    const models = ['NanoSat v4', 'Bus-X', 'CommsLink Mk1', 'Obs-7']

    // Telemetry generation
    const battery = isZombie ? Math.random() * 30 : 85 + Math.random() * 15
    const temp = isZombie ? (Math.random() > 0.5 ? -40 : 80) + Math.random() * 20 : 25 + Math.random() * 10
    const signal = isZombie ? -110 - Math.random() * 20 : -65 - Math.random() * 15
    const solarOutput = isZombie ? Math.random() * 100 : 450 + Math.random() * 50

    return {
        designator: `IK-${launchYear}-${(index + 1).toString().padStart(3, '0')}`,
        model: models[index % models.length],
        launchDate: `${launchYear}-${launchMonth.toString().padStart(2, '0')}-${Math.floor(Math.random() * 28) + 1}`,
        telemetry: {
            battery: battery,
            temp: temp,
            signal: signal,
            solar: solarOutput,
            latency: isZombie ? 999 : 20 + Math.random() * 40,
            cpuLoad: isZombie ? 0 : 30 + Math.random() * 40
        }
    }
}

export default function Constellation({
    config,
    onSatelliteClick,
    onPositionsUpdate,
    selectedSatelliteId
}) {
    const { id, color, satelliteCount, altitude, inclination, speed, coordinated, visible, zombieCount = 0 } = config

    const meshRef = useRef()
    const trailsRef = useRef()
    const { camera, raycaster, pointer } = useThree()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate satellites with zombie support and rich metadata
    const satellites = useMemo(() => {
        const sats = []
        const totalSats = satelliteCount + zombieCount

        for (let i = 0; i < totalSats; i++) {
            const isZombie = i >= satelliteCount
            const metadata = generateSatelliteData(id, i, isZombie, id)

            if (coordinated && !isZombie) {
                // Coordinated logic
                const numShells = Math.max(1, Math.ceil(satelliteCount / 50))
                const satsPerShell = Math.ceil(satelliteCount / numShells)
                const shellIndex = Math.floor(i / satsPerShell)
                const posInShell = i % satsPerShell
                const shellSatsCount = Math.min(satsPerShell, satelliteCount - shellIndex * satsPerShell)

                sats.push({
                    id: `${id}-sat-${i}`,
                    constellationId: id,
                    theta: (posInShell / shellSatsCount) * Math.PI * 2,
                    phi: ((shellIndex % 3 - 1) * 0.3) * Math.min(inclination, 0.5),
                    radiusOffset: (shellIndex / numShells) * 0.3 - 0.15,
                    speedOffset: 1.0,
                    isZombie: false,
                    ...metadata
                })
            } else {
                // Uncoordinated/Zombie logic
                sats.push({
                    id: `${id}-sat-${i}`,
                    constellationId: id,
                    theta: Math.random() * Math.PI * 2,
                    phi: (Math.random() - 0.5) * inclination,
                    radiusOffset: (Math.random() - 0.5) * 0.2,
                    speedOffset: isZombie ? (Math.random() * 0.3 + 0.1) : (Math.random() * 0.5 + 0.5),
                    isZombie,
                    ...metadata
                })
            }
        }
        return sats
    }, [id, satelliteCount, zombieCount, coordinated, inclination])

    // Trail geometry
    const trailGeometry = useMemo(() => {
        const count = satellites.length
        const totalVertices = count * TRAIL_SEGMENTS
        const indices = []
        const orbitParams = new Float32Array(totalVertices * 4)
        const trailOffsets = new Float32Array(totalVertices)
        const positions = new Float32Array(totalVertices * 3)

        for (let i = 0; i < count; i++) {
            const sat = satellites[i]
            for (let j = 0; j < TRAIL_SEGMENTS; j++) {
                const idx = i * TRAIL_SEGMENTS + j
                orbitParams[idx * 4 + 0] = sat.theta
                orbitParams[idx * 4 + 1] = sat.phi
                orbitParams[idx * 4 + 2] = sat.radiusOffset
                orbitParams[idx * 4 + 3] = sat.speedOffset
                trailOffsets[idx] = j / (TRAIL_SEGMENTS - 1)
                const r = 2 + altitude
                positions[idx * 3] = r
                positions[idx * 3 + 1] = 0
                positions[idx * 3 + 2] = 0
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

    // Store positions for collision detection
    const positionsRef = useRef([])

    const highlightRef = useRef()

    useFrame((state) => {
        if (!visible) return

        const t = state.clock.getElapsedTime()
        const earthRadius = 2
        const positions = []
        let selectedFound = false

        if (meshRef.current) {
            satellites.forEach((sat, i) => {
                const zombieWobble = sat.isZombie ? Math.sin(t * 2 + i) * 0.1 : 0
                const angle = sat.theta + t * speed * sat.speedOffset * 0.1 + zombieWobble
                const r = earthRadius + altitude + sat.radiusOffset

                const x = r * Math.cos(angle) * Math.cos(sat.phi)
                const y = r * Math.sin(sat.phi)
                const z = r * Math.sin(angle) * Math.cos(sat.phi)

                dummy.position.set(x, y, z)
                dummy.lookAt(0, 0, 0)
                dummy.scale.setScalar(sat.isZombie ? 0.07 : 0.05)
                dummy.updateMatrix()
                meshRef.current.setMatrixAt(i, dummy.matrix)

                positions.push({ ...sat, position: { x, y, z } })

                // Update highlight if this is the selected satellite
                if (sat.id === selectedSatelliteId && highlightRef.current) {
                    highlightRef.current.position.set(x, y, z)
                    highlightRef.current.visible = true
                    selectedFound = true
                }
            })
            meshRef.current.instanceMatrix.needsUpdate = true
        }

        // Hide highlight if not found in this constellation (or if no selection)
        if (!selectedFound && highlightRef.current) {
            highlightRef.current.visible = false
        }

        positionsRef.current = positions
        if (onPositionsUpdate) onPositionsUpdate(id, positions)

        if (trailsRef.current?.material) {
            const mat = trailsRef.current.material
            mat.uniforms.uTime.value = t
            mat.uniforms.uAltitude.value = altitude
            mat.uniforms.uSpeed.value = speed
            mat.uniforms.uTrailLength.value = TRAIL_LENGTH
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

    const trailUniforms = useMemo(() => ({
        uTime: { value: 0 },
        uAltitude: { value: altitude },
        uSpeed: { value: speed },
        uTrailLength: { value: TRAIL_LENGTH }
    }), [])

    const threeColor = useMemo(() => new THREE.Color(color), [color])

    if (!visible) return null

    return (
        <group>
            <instancedMesh
                ref={meshRef}
                args={[null, null, satellites.length]}
                frustumCulled={false}
                onClick={handleClick}
            >
                <boxGeometry args={[1, 0.5, 0.5]} />
                <meshStandardMaterial
                    color={threeColor}
                    emissive={threeColor}
                    emissiveIntensity={0.8}
                />
            </instancedMesh>

            {/* Selection Highlight */}
            <mesh ref={highlightRef} visible={false}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshBasicMaterial
                    color="#ffffff"
                    wireframe
                    transparent
                    opacity={0.6}
                    depthTest={false}
                />
            </mesh>



            <lineSegments ref={trailsRef} frustumCulled={false}>
                <bufferGeometry />
                <shaderMaterial
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    uniforms={trailUniforms}
                    vertexShader={`
                        uniform float uTime;
                        uniform float uAltitude;
                        uniform float uSpeed;
                        uniform float uTrailLength;
                        attribute vec4 aOrbit;
                        attribute float aOffset;
                        varying float vAlpha;
                        void main() {
                            vAlpha = 1.0 - aOffset;
                            float angularLag = aOffset * uTrailLength / max(uSpeed * aOrbit.w, 0.01);
                            float currentAngle = aOrbit.x + uTime * uSpeed * aOrbit.w * 0.1;
                            float trailAngle = currentAngle - angularLag * uSpeed * aOrbit.w * 0.1;
                            float r = 2.0 + uAltitude + aOrbit.z;
                            vec3 pos;
                            pos.x = r * cos(trailAngle) * cos(aOrbit.y);
                            pos.y = r * sin(aOrbit.y);
                            pos.z = r * sin(trailAngle) * cos(aOrbit.y);
                            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                        }
                    `}
                    fragmentShader={`
                        uniform vec3 uColor;
                        varying float vAlpha;
                        void main() {
                            gl_FragColor = vec4(${threeColor.r.toFixed(2)}, ${threeColor.g.toFixed(2)}, ${threeColor.b.toFixed(2)}, vAlpha * 0.6);
                        }
                    `}
                />
            </lineSegments>
        </group>
    )
}
