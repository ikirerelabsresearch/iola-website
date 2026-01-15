import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SatelliteSwarm({ count = 100, altitude = 3, spread = 1, speed = 1 }) {
    const meshRef = useRef()
    const trailsRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Trail configuration
    const TRAIL_SEGMENTS = 30  // More segments = smoother trail
    const TRAIL_LENGTH = 1.5   // Base trail length in arc radians

    // Generate orbital parameters - regenerate when count or spread changes
    const satellites = useMemo(() => {
        return new Array(count).fill(null).map(() => ({
            theta: Math.random() * Math.PI * 2,
            phi: (Math.random() - 0.5) * spread,
            radiusOffset: (Math.random() - 0.5) * 0.2,
            speedOffset: (Math.random() * 0.5 + 0.5)
        }))
    }, [count, spread])

    // Generate trail geometry data - regenerate when satellites change
    const trailGeometry = useMemo(() => {
        const totalVertices = count * TRAIL_SEGMENTS
        const indices = []
        const orbitParams = new Float32Array(totalVertices * 4)
        const trailOffsets = new Float32Array(totalVertices)
        // Position buffer - will be computed in shader, but needs valid initial data
        const positions = new Float32Array(totalVertices * 3)

        for (let i = 0; i < count; i++) {
            const sat = satellites[i]

            for (let j = 0; j < TRAIL_SEGMENTS; j++) {
                const idx = i * TRAIL_SEGMENTS + j

                // Store orbital parameters for each trail vertex
                orbitParams[idx * 4 + 0] = sat.theta
                orbitParams[idx * 4 + 1] = sat.phi
                orbitParams[idx * 4 + 2] = sat.radiusOffset
                orbitParams[idx * 4 + 3] = sat.speedOffset

                // Trail offset: 0 = satellite position (head), 1 = trail end (tail)
                trailOffsets[idx] = j / (TRAIL_SEGMENTS - 1)

                // Initial positions (will be overwritten by shader, but Three.js needs valid bounds)
                const r = 2 + altitude
                positions[idx * 3 + 0] = r
                positions[idx * 3 + 1] = 0
                positions[idx * 3 + 2] = 0

                // Create line segments connecting consecutive trail points
                if (j < TRAIL_SEGMENTS - 1) {
                    indices.push(idx, idx + 1)
                }
            }
        }

        return {
            indices: new Uint32Array(indices), // Use Uint32 for larger counts
            orbitParams,
            trailOffsets,
            positions
        }
    }, [satellites, count, altitude])

    // Create/update geometry when trailGeometry changes
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

        // Update Satellites (CPU - InstancedMesh)
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

        // Update Trail Uniforms (GPU)
        if (trailsRef.current && trailsRef.current.material) {
            const mat = trailsRef.current.material
            mat.uniforms.uTime.value = t
            mat.uniforms.uAltitude.value = altitude
            mat.uniforms.uSpeed.value = speed
            mat.uniforms.uTrailLength.value = TRAIL_LENGTH
        }
    })

    // Shader uniforms - created once
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
                        
                        attribute vec4 aOrbit;  // theta, phi, radiusOffset, speedOffset
                        attribute float aOffset; // 0 = head (satellite), 1 = tail
                        
                        varying float vAlpha;

                        void main() {
                            // Alpha fades from 1 at head to 0 at tail
                            vAlpha = 1.0 - aOffset;
                            
                            // Calculate the angular lag for this trail segment
                            // Trail shows where the satellite WAS, so we subtract from current angle
                            // The lag is proportional to aOffset (0 at head, max at tail)
                            // Scale by speed so trail length stays visually consistent
                            float angularLag = aOffset * uTrailLength / max(uSpeed * aOrbit.w, 0.01);
                            
                            // Current satellite angle
                            float currentAngle = aOrbit.x + uTime * uSpeed * aOrbit.w * 0.1;
                            
                            // This trail point's angle (in the past)
                            float trailAngle = currentAngle - angularLag * uSpeed * aOrbit.w * 0.1;
                            
                            // Compute position on orbital path
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
                            // Teal glow that fades along the trail
                            gl_FragColor = vec4(0.0, 0.94, 1.0, vAlpha * 0.6);
                        }
                    `}
                />
            </lineSegments>
        </group>
    )
}
