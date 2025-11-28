import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei'
import DebrisField from './DebrisField'
import SafetyMesh from './SafetyMesh'
import CubeSat from './CubeSat'

export default function OrbitalScene() {
  const groupRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.05
    }
  })

  return (
    <>
      {/* Camera */}
      <PerspectiveCamera makeDefault position={[0, 2, 8]} fov={50} />

      {/* Controls - subtle auto-rotation */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 3}
      />

      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#00F0FF" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFBF00" />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        color="#00F0FF"
        castShadow
      />

      {/* Background Stars */}
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />

      {/* Main Scene Group */}
      <group ref={groupRef}>
        {/* Central CubeSat */}
        <CubeSat position={[0, 0, 0]} />

        {/* Orbital Debris Field */}
        <DebrisField count={500} radius={5} />

        {/* Safety Mesh Grid */}
        <SafetyMesh />
      </group>

      {/* Fog for depth */}
      <fog attach="fog" args={['#0B1E3D', 5, 25]} />
    </>
  )
}
