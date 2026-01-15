import { useRef, useMemo } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import * as THREE from 'three'
import { getFresnelMat } from './shaders/getFresnelMat'

export default function Earth({ radius = 2 }) {
    const earthRef = useRef()
    const lightsRef = useRef()
    const cloudsRef = useRef()
    const glowRef = useRef()

    // Load all Earth textures
    const [
        earthMap,
        earthBump,
        earthSpec,
        earthLights,
        cloudMap,
        cloudAlpha
    ] = useLoader(THREE.TextureLoader, [
        '/textures/earth/00_earthmap1k.jpg',
        '/textures/earth/01_earthbump1k.jpg',
        '/textures/earth/02_earthspec1k.jpg',
        '/textures/earth/03_earthlights1k.jpg',
        '/textures/earth/04_earthcloudmap.jpg',
        '/textures/earth/05_earthcloudmaptrans.jpg'
    ])

    // Create Fresnel glow material (memoized)
    const fresnelMat = useMemo(() => getFresnelMat({ rimHex: 0x00aaff, facingHex: 0x000000 }), [])

    // Rotation animation
    useFrame((state) => {
        const t = state.clock.getElapsedTime()
        const rotationSpeed = 0.002

        if (earthRef.current) {
            earthRef.current.rotation.y = t * rotationSpeed
        }
        if (lightsRef.current) {
            lightsRef.current.rotation.y = t * rotationSpeed
        }
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y = t * (rotationSpeed * 1.15) // Clouds rotate slightly faster
        }
        if (glowRef.current) {
            glowRef.current.rotation.y = t * rotationSpeed
        }
    })

    // IcosahedronGeometry for smoother sphere (like original repo)
    const geometry = useMemo(() => new THREE.IcosahedronGeometry(radius, 12), [radius])

    return (
        <group rotation={[0, 0, -23.4 * Math.PI / 180]}> {/* Earth's axial tilt */}
            {/* Earth Surface - Daytime */}
            <mesh ref={earthRef} geometry={geometry}>
                <meshPhongMaterial
                    map={earthMap}
                    bumpMap={earthBump}
                    bumpScale={0.04}
                    specularMap={earthSpec}
                    specular={new THREE.Color(0x333333)}
                    shininess={5}
                />
            </mesh>

            {/* City Lights - Nightside */}
            <mesh ref={lightsRef} geometry={geometry}>
                <meshBasicMaterial
                    map={earthLights}
                    blending={THREE.AdditiveBlending}
                    transparent
                    opacity={1}
                />
            </mesh>

            {/* Clouds Layer */}
            <mesh ref={cloudsRef} geometry={geometry} scale={1.003}>
                <meshStandardMaterial
                    map={cloudMap}
                    alphaMap={cloudAlpha}
                    transparent
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {/* Atmosphere Glow - Fresnel Effect */}
            <mesh ref={glowRef} geometry={geometry} scale={1.01} material={fresnelMat} />
        </group>
    )
}
