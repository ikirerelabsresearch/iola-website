import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SatelliteSwarm({ count = 100, altitude = 3, spread = 1, speed = 1 }) {
    const meshRef = useRef()
    const trailsRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate random initial parameters for each satellite
    const { satellites, trailData } = useMemo(() => {
        const sats = []
        // Trail Geometry Data
        const segments = 20
        const totalVertices = count * segments
        const indices = []
        const positions = new Float32Array(totalVertices * 3) // Placeholder, updated in shader
        const orbitParams = new Float32Array(totalVertices * 4) // theta, phi, radiusOffset, speedOffset
        const trailOffsets = new Float32Array(totalVertices) // 0 to 1 along the trail

        for (let i = 0; i < count; i++) {
            // Satellite Data
            const theta = Math.random() * Math.PI * 2
            const phi = (Math.random() - 0.5) * spread
            const radiusOffset = (Math.random() - 0.5) * 0.2
            const speedOffset = (Math.random() * 0.5 + 0.5)

            sats.push({ theta, phi, radiusOffset, speedOffset })

            // Trail Data
            for (let j = 0; j < segments; j++) {
                const idx = i * segments + j

                // Duplicate orbit params for every vertex of the trail
                orbitParams[idx * 4 + 0] = theta
                orbitParams[idx * 4 + 1] = phi
                orbitParams[idx * 4 + 2] = radiusOffset
                orbitParams[idx * 4 + 3] = speedOffset

                // Normalized offset: 0 = head, 1 = tail
                trailOffsets[idx] = j / (segments - 1)

                // Indices for lines (j -> j+1)
                if (j < segments - 1) {
                    indices.push(idx, idx + 1)
                }
            }
        }

        return {
            satellites: sats,
            trailData: { indices, positions, orbitParams, trailOffsets }
        }
    }, [count, spread])

    // Shader Uniforms
    const trailUniforms = useMemo(() => ({
        uTime: { value: 0 },
        uAltitude: { value: altitude },
        uSpeed: { value: speed }
    }), [])

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        // Update Satellites (CPU)
        if (meshRef.current) {
            satellites.forEach((sat, i) => {
                const angle = sat.theta + t * speed * sat.speedOffset * 0.1
                const r = 2 + altitude + sat.radiusOffset
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

        // Update Trails (GPU Uniforms)
        if (trailsRef.current) {
            trailsRef.current.material.uniforms.uTime.value = t
            trailsRef.current.material.uniforms.uAltitude.value = altitude
            trailsRef.current.material.uniforms.uSpeed.value = speed
        }
    })

    return (
        <group>
            <instancedMesh ref={meshRef} args={[null, null, count]}>
                <boxGeometry args={[1, 0.5, 0.5]} />
                <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.8} />
            </instancedMesh>

            <lineSegments ref={trailsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="index" array={new Uint16Array(trailData.indices)} count={trailData.indices.length} itemSize={1} />
                    <bufferAttribute attach="attributes-position" array={trailData.positions} count={trailData.positions.length / 3} itemSize={3} />
                    <bufferAttribute attach="attributes-aOrbit" array={trailData.orbitParams} count={trailData.orbitParams.length / 4} itemSize={4} />
                    <bufferAttribute attach="attributes-aOffset" array={trailData.trailOffsets} count={trailData.trailOffsets.length} itemSize={1} />
                </bufferGeometry>
                <shaderMaterial
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    uniforms={trailUniforms}
                    vertexShader={`
                        uniform float uTime;
                        uniform float uAltitude;
                        uniform float uSpeed;
                        
                        attribute vec4 aOrbit; // theta, phi, radiusOffset, speedOffset
                        attribute float aOffset; // 0.0 to 1.0 along trail
                        
                        varying float vAlpha;

                        void main() {
                            vAlpha = 1.0 - aOffset; // Fade out near tail
                            
                            // Time delay for trail segments
                            // The further back (aOffset closer to 1), the more time we subtract
                            float trailLag = aOffset * 2.0; // 2 seconds trail length
                            float effectiveTime = uTime - trailLag;
                            
                            // Same math as CPU
                            // angle = theta + t * speed * speedOffset * 0.1
                            float angle = aOrbit.x + effectiveTime * uSpeed * aOrbit.w * 0.1;
                            float r = 2.0 + uAltitude + aOrbit.z;
                            
                            vec3 pos;
                            pos.x = r * cos(angle) * cos(aOrbit.y);
                            pos.y = r * sin(aOrbit.y);
                            pos.z = r * sin(angle) * cos(aOrbit.y);

                            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
                        }
                    `}
                    fragmentShader={`
                        varying float vAlpha;
                        
                        void main() {
                            // Teal color with fade
                            gl_FragColor = vec4(0.0, 0.94, 1.0, vAlpha * 0.5);
                        }
                    `}
                />
            </lineSegments>
        </group>
    )
}

