import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CubeSat({ position = [0, 0, 0] }) {
  const cubeRef = useRef()
  const beaconRef = useRef()

  // Custom shader material for the cube faces
  const cubeMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#0B1E3D') },
        edgeColor: { value: new THREE.Color('#00F0FF') }
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vPosition;
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vPosition = position;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color;
        uniform vec3 edgeColor;
        varying vec3 vNormal;
        varying vec3 vPosition;

        void main() {
          float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
          vec3 finalColor = mix(color, edgeColor, fresnel * 0.8);

          // Grid lines
          float grid = max(
            step(0.95, fract(vPosition.x * 2.0)),
            step(0.95, fract(vPosition.y * 2.0))
          );
          grid = max(grid, step(0.95, fract(vPosition.z * 2.0)));

          finalColor = mix(finalColor, edgeColor, grid * 0.5);

          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      transparent: false
    })
  }, [])

  useFrame((state) => {
    const t = state.clock.getElapsedTime()

    if (cubeRef.current) {
      cubeRef.current.rotation.x = t * 0.2
      cubeRef.current.rotation.y = t * 0.3
      cubeMaterial.uniforms.time.value = t
    }

    if (beaconRef.current) {
      const pulse = Math.sin(t * 2) * 0.5 + 0.5
      beaconRef.current.scale.setScalar(0.3 + pulse * 0.1)
      beaconRef.current.material.opacity = 0.7 + pulse * 0.3
    }
  })

  return (
    <group position={position}>
      {/* Main Cube Structure */}
      <mesh ref={cubeRef} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.5, 1.5]} />
        <primitive object={cubeMaterial} />
      </mesh>

      {/* Wireframe overlay */}
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1.5, 1.5, 1.5)]} />
        <lineBasicMaterial color="#00F0FF" linewidth={2} transparent opacity={0.6} />
      </lineSegments>

      {/* Central Beacon (Amber Core) */}
      <mesh ref={beaconRef}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial
          color="#FFBF00"
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Beacon Glow */}
      <pointLight position={[0, 0, 0]} color="#FFBF00" intensity={2} distance={5} />

      {/* Outer glow sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color="#FFBF00"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}
