import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function SafetyMesh() {
  const orbitRingsRef = useRef()
  const meshLinesRef = useRef()

  // Create orbital rings
  const orbitRings = useMemo(() => {
    const rings = []
    const ringCount = 5

    for (let i = 0; i < ringCount; i++) {
      const radius = 2 + i * 0.5
      const points = []
      const segments = 64

      for (let j = 0; j <= segments; j++) {
        const angle = (j / segments) * Math.PI * 2
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.3,
            Math.sin(angle) * radius
          )
        )
      }

      rings.push(new THREE.CatmullRomCurve3(points, true))
    }

    return rings
  }, [])

  // Connection lines between rings
  const meshLines = useMemo(() => {
    const lines = []
    const nodeCount = 12

    for (let i = 0; i < nodeCount; i++) {
      const angle = (i / nodeCount) * Math.PI * 2
      const points = []

      for (let j = 0; j < 5; j++) {
        const radius = 2 + j * 0.5
        points.push(
          new THREE.Vector3(
            Math.cos(angle) * radius,
            Math.sin(angle) * radius * 0.3,
            Math.sin(angle) * radius
          )
        )
      }

      lines.push(points)
    }

    return lines
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (orbitRingsRef.current) {
      orbitRingsRef.current.children.forEach((ring, i) => {
        ring.rotation.y = t * 0.1 * (1 + i * 0.1)
        const pulse = Math.sin(t * 2 + i * 0.5) * 0.5 + 0.5
        ring.material.opacity = 0.3 + pulse * 0.2
      })
    }

    if (meshLinesRef.current) {
      meshLinesRef.current.rotation.y = -t * 0.05
    }
  })

  return (
    <group>
      {/* Orbital Rings */}
      <group ref={orbitRingsRef}>
        {orbitRings.map((curve, i) => (
          <mesh key={`ring-${i}`}>
            <tubeGeometry args={[curve, 64, 0.008, 8, true]} />
            <meshBasicMaterial
              color="#00F0FF"
              transparent
              opacity={0.4}
              emissive="#00F0FF"
              emissiveIntensity={0.5}
            />
          </mesh>
        ))}
      </group>

      {/* Connection Lines */}
      <group ref={meshLinesRef}>
        {meshLines.map((points, i) => {
          const geometry = new THREE.BufferGeometry().setFromPoints(points)
          return (
            <line key={`line-${i}`} geometry={geometry}>
              <lineBasicMaterial
                color="#00F0FF"
                transparent
                opacity={0.2}
                linewidth={1}
              />
            </line>
          )
        })}
      </group>

      {/* Node Points */}
      <group ref={meshLinesRef}>
        {meshLines.map((points, i) =>
          points.map((point, j) => (
            <mesh key={`node-${i}-${j}`} position={point}>
              <sphereGeometry args={[0.03, 8, 8]} />
              <meshBasicMaterial
                color={j === 0 ? '#FFBF00' : '#00F0FF'}
                transparent
                opacity={0.8}
              />
            </mesh>
          ))
        )}
      </group>
    </group>
  )
}
