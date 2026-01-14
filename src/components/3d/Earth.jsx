import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, useTexture } from '@react-three/drei'
import * as THREE from 'three'

export default function Earth() {
    const earthRef = useRef()
    const cloudsRef = useRef()

    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        if (earthRef.current) {
            earthRef.current.rotation.y = t * 0.02
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = t * 0.025
        }
    })

    return (
        <group>
            {/* Earth Sphere */}
            <Sphere ref={earthRef} args={[2, 64, 64]}>
                <meshStandardMaterial
                    color="#1E4064"
                    emissive="#0B1E3D"
                    emissiveIntensity={0.2}
                    roughness={0.6}
                    metalness={0.1}
                />
            </Sphere>

            {/* Atmosphere Glow (Fake) */}
            <mesh scale={[2.1, 2.1, 2.1]}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial
                    color="#00F0FF"
                    transparent
                    opacity={0.05}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Clouds / Grid Overlay */}
            <Sphere ref={cloudsRef} args={[2.02, 64, 64]}>
                <meshStandardMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.15}
                    blending={THREE.AdditiveBlending}
                    alphaMap={null} // Could load a cloud map here
                />
            </Sphere>
        </group>
    )
}
