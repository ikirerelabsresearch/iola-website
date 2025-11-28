import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function DebrisField({ count = 500, radius = 5 }) {
  const meshRef = useRef()

  const particles = useMemo(() => {
    const temp = []
    const colors = []
    const sizes = []

    for (let i = 0; i < count; i++) {
      // Spherical distribution
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const r = radius + Math.random() * 2

      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      temp.push(x, y, z)

      // Mix of teal and white particles
      const isTeal = Math.random() > 0.7
      colors.push(
        isTeal ? 0 : 1,
        isTeal ? 0.94 : 1,
        isTeal ? 1 : 1
      )

      sizes.push(Math.random() * 0.05 + 0.02)
    }

    return {
      positions: new Float32Array(temp),
      colors: new Float32Array(colors),
      sizes: new Float32Array(sizes)
    }
  }, [count, radius])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.05
      meshRef.current.rotation.x = Math.sin(t * 0.02) * 0.1
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.positions.length / 3}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.colors.length / 3}
          array={particles.colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={particles.sizes.length}
          array={particles.sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <shaderMaterial
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={`
          attribute float size;
          varying vec3 vColor;

          void main() {
            vColor = color;
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * 300.0 / -mvPosition.z;
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          varying vec3 vColor;

          void main() {
            float distanceToCenter = length(gl_PointCoord - vec2(0.5));
            float alpha = 1.0 - smoothstep(0.0, 0.5, distanceToCenter);
            gl_FragColor = vec4(vColor, alpha * 0.8);
          }
        `}
      />
    </points>
  )
}
