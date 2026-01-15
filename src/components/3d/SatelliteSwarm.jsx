import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SatelliteSwarm({
    count = 100,
    altitude = 3,
    spread = 1,
    speed = 1,
    coordinated = false,
    onRiskUpdate = null
}) {
    const meshRef = useRef()
    const trailsRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const lastRiskUpdate = useRef(0)

    // Trail configuration
    const TRAIL_SEGMENTS = 30
    const TRAIL_LENGTH = 1.5

    // Generate orbital parameters - coordinated vs uncoordinated
    const satellites = useMemo(() => {
        if (coordinated) {
            // COORDINATED: Even phase distribution, discrete shells, uniform motion
            const numShells = Math.max(1, Math.ceil(count / 50))
            const satsPerShell = Math.ceil(count / numShells)

            return new Array(count).fill(null).map((_, i) => {
                const shellIndex = Math.floor(i / satsPerShell)
                const posInShell = i % satsPerShell
                const shellSatsCount = Math.min(satsPerShell, count - shellIndex * satsPerShell)

                // Even phase distribution within shell
                const theta = (posInShell / shellSatsCount) * Math.PI * 2

                // Discrete shell altitudes
                const radiusOffset = (shellIndex / numShells) * 0.3 - 0.15

                // Organized latitude bands (reduced spread)
                const bandIndex = shellIndex % 3
                const phi = ((bandIndex - 1) * 0.3) * Math.min(spread, 0.5)

                return {
                    theta,
                    phi,
                    radiusOffset,
                    speedOffset: 1.0 // Uniform speed
                }
            })
        } else {
            // UNCOORDINATED: Random chaotic distribution
            return new Array(count).fill(null).map(() => ({
                theta: Math.random() * Math.PI * 2,
                phi: (Math.random() - 0.5) * spread,
                radiusOffset: (Math.random() - 0.5) * 0.2,
                speedOffset: (Math.random() * 0.5 + 0.5)
            }))
        }
    }, [count, spread, coordinated])

    // Risk calculation - heuristic for conjunction probability
    const computeRiskIndex = useCallback((time) => {
        // Even coordinated constellations have residual risk - nothing is perfect
        const baselineRisk = coordinated ? 0.02 : 0.08

        if (coordinated) {
            // Small fluctuation to feel alive, but fundamentally low
            const jitter = Math.sin(time * 0.5) * 0.01 + Math.cos(time * 0.7) * 0.01
            return Math.max(0.01, baselineRisk + jitter)
        }

        // Sample subset for performance (O(n²) is expensive)
        const sampleSize = Math.min(satellites.length, 100)
        const step = Math.max(1, Math.floor(satellites.length / sampleSize))

        let closeApproaches = 0
        const ANGULAR_THRESHOLD = 0.15

        for (let i = 0; i < satellites.length; i += step) {
            const sat1 = satellites[i]
            const angle1 = sat1.theta + time * speed * sat1.speedOffset * 0.1

            for (let j = i + step; j < satellites.length; j += step) {
                const sat2 = satellites[j]
                const angle2 = sat2.theta + time * speed * sat2.speedOffset * 0.1

                // Angular proximity check
                let phaseDiff = Math.abs(angle1 - angle2) % (Math.PI * 2)
                if (phaseDiff > Math.PI) phaseDiff = Math.PI * 2 - phaseDiff

                const inclDiff = Math.abs(sat1.phi - sat2.phi)
                const altDiff = Math.abs(sat1.radiusOffset - sat2.radiusOffset)

                if (phaseDiff < ANGULAR_THRESHOLD && inclDiff < ANGULAR_THRESHOLD && altDiff < 0.05) {
                    closeApproaches++
                }
            }
        }

        // Normalize based on sample
        const sampledPairs = (sampleSize * (sampleSize - 1)) / 2
        const rawRisk = closeApproaches / Math.max(sampledPairs * 0.02, 1)

        // Density factor - more satellites = more risk, non-linearly
        const densityFactor = Math.pow(satellites.length / 500, 0.3)

        // Spread factor - tighter orbits = more risk
        const spreadFactor = 1.2 - (spread / Math.PI) * 0.4

        // Add slight temporal variation for honesty
        const temporalJitter = Math.sin(time * 1.3) * 0.03

        return Math.min(baselineRisk + (rawRisk * densityFactor * spreadFactor) + temporalJitter, 1.0)
    }, [satellites, coordinated, speed, spread])

    // Generate trail geometry data
    const trailGeometry = useMemo(() => {
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
                positions[idx * 3 + 0] = r
                positions[idx * 3 + 1] = 0
                positions[idx * 3 + 2] = 0

                if (j < TRAIL_SEGMENTS - 1) {
                    indices.push(idx, idx + 1)
                }
            }
        }

        return {
            indices: new Uint32Array(indices),
            orbitParams,
            trailOffsets,
            positions
        }
    }, [satellites, count, altitude])

    // Update geometry when trailGeometry changes
    useEffect(() => {
        if (trailsRef.current && trailsRef.current.geometry) {
            const geo = trailsRef.current.geometry

            geo.setIndex(new THREE.BufferAttribute(trailGeometry.indices, 1))
            geo.setAttribute('position', new THREE.BufferAttribute(trailGeometry.positions, 3))
            geo.setAttribute('aOrbit', new THREE.BufferAttribute(trailGeometry.orbitParams, 4))
            geo.setAttribute('aOffset', new THREE.BufferAttribute(trailGeometry.trailOffsets, 1))

            geo.computeBoundingSphere()
        }
    }, [trailGeometry])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        const earthRadius = 2

        // Update Satellites
        if (meshRef.current) {
            satellites.forEach((sat, i) => {
                const angle = sat.theta + t * speed * sat.speedOffset * 0.1
                const r = earthRadius + altitude + sat.radiusOffset

                const x = r * Math.cos(angle) * Math.cos(sat.phi)
                const y = r * Math.sin(sat.phi)
                const z = r * Math.sin(angle) * Math.cos(sat.phi)

                dummy.position.set(x, y, z)
                dummy.lookAt(0, 0, 0)
                dummy.scale.setScalar(0.05)
                dummy.updateMatrix()
                meshRef.current.setMatrixAt(i, dummy.matrix)
            })
            meshRef.current.instanceMatrix.needsUpdate = true
        }

        // Update Trail Uniforms
        if (trailsRef.current && trailsRef.current.material) {
            const mat = trailsRef.current.material
            mat.uniforms.uTime.value = t
            mat.uniforms.uAltitude.value = altitude
            mat.uniforms.uSpeed.value = speed
            mat.uniforms.uTrailLength.value = TRAIL_LENGTH
        }

        // Update risk index (throttled to every 500ms)
        if (onRiskUpdate && t - lastRiskUpdate.current > 0.5) {
            lastRiskUpdate.current = t
            const risk = computeRiskIndex(t)
            onRiskUpdate(risk)
        }
    })

    // Shader uniforms
    const trailUniforms = useMemo(() => ({
        uTime: { value: 0 },
        uAltitude: { value: altitude },
        uSpeed: { value: speed },
        uTrailLength: { value: TRAIL_LENGTH }
    }), [])

    return (
        <group>
            {/* Satellite Meshes */}
            <instancedMesh ref={meshRef} args={[null, null, count]} frustumCulled={false}>
                <boxGeometry args={[1, 0.5, 0.5]} />
                <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.8} />
            </instancedMesh>

            {/* Orbital Trails */}
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
                        varying float vAlpha;
                        
                        void main() {
                            gl_FragColor = vec4(0.0, 0.94, 1.0, vAlpha * 0.6);
                        }
                    `}
                />
            </lineSegments>
        </group>
    )
}
