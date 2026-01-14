import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SatelliteSwarm({ count = 100, altitude = 3, spread = 1, speed = 1 }) {
    const meshRef = useRef()
    const dummy = useMemo(() => new THREE.Object3D(), [])

    // Generate random initial parameters for each satellite
    const satellites = useMemo(() => {
        return new Array(count).fill().map(() => ({
            // Orbital parameters
            theta: Math.random() * Math.PI * 2, // simple circular orbit angle
            phi: (Math.random() - 0.5) * spread, // inclination spread
            radiusOffset: (Math.random() - 0.5) * 0.2, // slight altitude variation
            speedOffset: (Math.random() * 0.5 + 0.5) // specific speed variance
        }))
    }, [count, spread]) // Re-generate if count changes (expensive, but okay for this demo)

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        if (meshRef.current) {
            satellites.forEach((sat, i) => {
                // Calculate current angle based on time and speed
                const angle = sat.theta + t * speed * sat.speedOffset * 0.1

                // Convert spherical to cartesian
                // Base radius is earth radius (approx 2) + altitude
                const r = 2 + altitude + sat.radiusOffset

                const x = r * Math.cos(angle) * Math.cos(sat.phi)
                const y = r * Math.sin(sat.phi)
                const z = r * Math.sin(angle) * Math.cos(sat.phi)

                dummy.position.set(x, y, z)

                // Orient satellite to face movement direction (roughly) or earth
                dummy.lookAt(0, 0, 0)

                dummy.scale.setScalar(0.05) // Small scale for individual sats
                dummy.updateMatrix()

                meshRef.current.setMatrixAt(i, dummy.matrix)
            })
            meshRef.current.instanceMatrix.needsUpdate = true
        }
    })

    return (
        <instancedMesh ref={meshRef} args={[null, null, count]}>
            <boxGeometry args={[1, 0.5, 0.5]} />
            <meshStandardMaterial color="#00F0FF" emissive="#00F0FF" emissiveIntensity={0.8} />
        </instancedMesh>
    )
}
