import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const TRAIL_SEGMENTS = 30
const TRAIL_LENGTH = 1.5
const TRANSITION_DURATION = 60.0 // 1 minute to transition between states

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
    const fuel = isZombie ? Math.random() * 10 : 60 + Math.random() * 35 // Fuel percentage

    return {
        designator: `IK-${launchYear}-${(index + 1).toString().padStart(3, '0')}`,
        model: models[index % models.length],
        launchDate: `${launchYear}-${launchMonth.toString().padStart(2, '0')}-${Math.floor(Math.random() * 28) + 1}`,
        telemetry: {
            battery: battery,
            temp: temp,
            signal: signal,
            solar: solarOutput,
            fuel: fuel,
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

    // Transition state - store previous orbital params when coordinated changes
    const transitionRef = useRef({
        active: false,
        startTime: 0,
        prevParams: [] // { phi, radiusOffset, speedOffset, currentAngle } for each satellite
    })
    const prevCoordinatedRef = useRef(coordinated)
    
    // Store actual theta values (not from sat array) to avoid jumps
    const actualThetaRef = useRef([])

    // Detect coordination changes and capture previous state for interpolation
    useEffect(() => {
        if (prevCoordinatedRef.current !== coordinated && positionsRef.current.length > 0) {
            transitionRef.current = {
                active: true,
                startTime: -1,
                prevParams: positionsRef.current.map(sat => ({
                    phi: sat.phi,
                    radiusOffset: sat.radiusOffset,
                    speedOffset: sat.speedOffset,
                    currentAngle: 0 // captured on first frame
                }))
            }
        }
        prevCoordinatedRef.current = coordinated
    }, [coordinated])

    // Smooth easing
    const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2

    useFrame((state) => {
        if (!visible) return

        const t = state.clock.getElapsedTime()
        const earthRadius = 2
        const positions = []
        let selectedFound = false

        // Handle transition timing
        const transition = transitionRef.current
        let transitionProgress = 1.0
        
        if (transition.active) {
            if (transition.startTime < 0) {
                transition.startTime = t
                // Capture current angle for each satellite
                satellites.forEach((sat, i) => {
                    if (transition.prevParams[i]) {
                        const prev = transition.prevParams[i]
                        // Current angle = where the satellite IS right now
                        transition.prevParams[i].currentAngle = positionsRef.current[i]?.theta 
                            ? positionsRef.current[i].theta + t * speed * prev.speedOffset * 0.1
                            : sat.theta + t * speed * prev.speedOffset * 0.1
                    }
                })
            }
            const elapsed = t - transition.startTime
            transitionProgress = Math.min(elapsed / TRANSITION_DURATION, 1.0)
            
            if (transitionProgress >= 1.0) {
                transition.active = false
            }
        }

        if (meshRef.current) {
            satellites.forEach((sat, i) => {
                let phi = sat.phi
                let radiusOffset = sat.radiusOffset
                let speedOffset = sat.speedOffset
                let angle

                const zombieWobble = sat.isZombie ? Math.sin(t * 2 + i) * 0.1 : 0
                
                // Final state angle (what the satellite SHOULD be at when not transitioning)
                const finalAngle = sat.theta + t * speed * sat.speedOffset * 0.1 + zombieWobble

                if (transition.active && transition.prevParams[i] && !sat.isZombie) {
                    const prev = transition.prevParams[i]
                    
                    // Stagger for wave effect
                    const stagger = (i / satellites.length) * 0.15
                    const staggeredProgress = Math.max(0, Math.min(1, (transitionProgress - stagger) / (1 - stagger)))
                    const t_ease = easeInOutQuad(staggeredProgress)

                    // Smoothly transition orbital plane (inclination change)
                    phi = prev.phi + (sat.phi - prev.phi) * t_ease
                    
                    // Smoothly transition altitude (orbit raising/lowering)
                    radiusOffset = prev.radiusOffset + (sat.radiusOffset - prev.radiusOffset) * t_ease
                    
                    // Speed blends smoothly
                    speedOffset = prev.speedOffset + (sat.speedOffset - prev.speedOffset) * t_ease
                    
                    // SIMPLE: Satellite moves FORWARD from where it started, at blended speed
                    // NO target position = NO backwards motion possible
                    const timeSinceStart = t - transition.startTime
                    angle = prev.currentAngle + timeSinceStart * speed * speedOffset * 0.1
                    
                    // Store the actual theta for seamless handoff
                    actualThetaRef.current[i] = angle - t * speed * speedOffset * 0.1
                    
                } else {
                    // Normal operation - use actual theta if we have it (post-transition), otherwise sat.theta
                    const useTheta = (actualThetaRef.current[i] !== undefined && !sat.isZombie) 
                        ? actualThetaRef.current[i] 
                        : sat.theta
                    angle = useTheta + t * speed * sat.speedOffset * 0.1 + zombieWobble
                    
                    // Update actual theta to track current position
                    if (!sat.isZombie) {
                        actualThetaRef.current[i] = useTheta
                    }
                }

                const r = earthRadius + altitude + radiusOffset
                const x = r * Math.cos(angle) * Math.cos(phi)
                const y = r * Math.sin(phi)
                const z = r * Math.sin(angle) * Math.cos(phi)

                dummy.position.set(x, y, z)
                dummy.lookAt(0, 0, 0)
                dummy.scale.setScalar(sat.isZombie ? 0.07 : 0.05)
                dummy.updateMatrix()
                meshRef.current.setMatrixAt(i, dummy.matrix)

                // Store current params for next transition capture
                positions.push({ 
                    ...sat, 
                    theta: angle - t * speed * speedOffset * 0.1, // derive theta from current angle
                    phi, 
                    radiusOffset, 
                    speedOffset,
                    position: { x, y, z } 
                })

                // Update highlight if this is the selected satellite
                if (sat.id === selectedSatelliteId && highlightRef.current) {
                    highlightRef.current.position.set(x, y, z)
                    highlightRef.current.visible = true
                    selectedFound = true
                }
            })
            meshRef.current.instanceMatrix.needsUpdate = true

            // Update trail geometry during transition
            if (transition.active && trailsRef.current?.geometry) {
                const geo = trailsRef.current.geometry
                const orbitAttr = geo.getAttribute('aOrbit')
                if (orbitAttr) {
                    positions.forEach((pos, i) => {
                        for (let j = 0; j < TRAIL_SEGMENTS; j++) {
                            const idx = i * TRAIL_SEGMENTS + j
                            orbitAttr.array[idx * 4 + 0] = pos.theta
                            orbitAttr.array[idx * 4 + 1] = pos.phi
                            orbitAttr.array[idx * 4 + 2] = pos.radiusOffset
                            orbitAttr.array[idx * 4 + 3] = pos.speedOffset
                        }
                    })
                    orbitAttr.needsUpdate = true
                }
            }
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
