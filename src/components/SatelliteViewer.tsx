import { useRef, Component, ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ── Error boundary — catches any WebGL / Three.js crash ───────────────────────
interface EBState { error: boolean }
class SatelliteErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() { return this.state.error ? this.props.fallback : this.props.children }
}

// ── Materials (created once outside component — never re-allocated) ───────────
const bodyMat  = new THREE.MeshStandardMaterial({ color: '#e5e4e2', roughness: 0.50, metalness: 0.0 })
const aluMat   = new THREE.MeshStandardMaterial({ color: '#a6a6a8', roughness: 0.18, metalness: 1.0 })
const steelMat = new THREE.MeshStandardMaterial({ color: '#999a9c', roughness: 0.10, metalness: 1.0 })
const darkMat  = new THREE.MeshStandardMaterial({ color: '#080808', roughness: 0.60, metalness: 0.0 })
const solarMat = new THREE.MeshStandardMaterial({ color: '#b04d06', roughness: 0.20, metalness: 0.0 })

function CubeSat() {
  const group = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.20
  })

  const BX = 0.10, BZ = 0.34, BY = 0.10
  const PW = 0.22, PH = BZ, PT = 0.006
  const PX = BX / 2 + PT / 2

  return (
    <group ref={group} rotation={[-0.06, 0.4, 0]}>
      {/* Body */}
      <mesh material={bodyMat} castShadow receiveShadow>
        <boxGeometry args={[BX, BZ, BY]} />
      </mesh>

      {/* 1U separation rings */}
      {[-BZ / 6, BZ / 6].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} material={aluMat}>
          <boxGeometry args={[BX + 0.001, 0.0018, BY + 0.001]} />
        </mesh>
      ))}

      {/* Solar panels — one per side, flush */}
      {[-1, 1].map((sign) => (
        <mesh key={sign} position={[sign * PX, 0, 0]} material={solarMat} castShadow>
          <boxGeometry args={[PT, PH, PW]} />
        </mesh>
      ))}

      {/* Panel frame edges (top + bottom) */}
      {[-1, 1].map((sign) =>
        [-1, 1].map((tb) => (
          <mesh key={`${sign}${tb}`} position={[sign * PX, tb * (PH / 2 + 0.003), 0]} material={aluMat}>
            <boxGeometry args={[PT + 0.002, 0.005, PW + 0.002]} />
          </mesh>
        ))
      )}

      {/* Top: UHF patch */}
      <mesh position={[-0.018, BZ / 2 + 0.003, 0.010]} material={aluMat} castShadow>
        <boxGeometry args={[0.028, 0.005, 0.028]} />
      </mesh>

      {/* Top: star tracker dome */}
      <mesh position={[0.015, BZ / 2 + 0.005, -0.012]} material={darkMat}>
        <cylinderGeometry args={[0.010, 0.010, 0.010, 10]} />
      </mesh>

      {/* Antennas */}
      {[[0.036, 0.036], [-0.036, 0.036]].map(([x, z], i) => (
        <mesh key={i} position={[x, BZ / 2 + 0.046, z]} material={darkMat}>
          <cylinderGeometry args={[0.0009, 0.0009, 0.092, 6]} />
        </mesh>
      ))}

      {/* Bottom thrusters */}
      {[[0.022, 0.018], [-0.022, 0.018], [0, -0.022]].map(([x, z], i) => (
        <mesh key={i} position={[x, -BZ / 2 - 0.009, z]} material={steelMat} castShadow>
          <coneGeometry args={[0.012, 0.018, 10]} />
        </mesh>
      ))}
    </group>
  )
}

function Scene() {
  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI * 0.72}
        dampingFactor={0.08}
        enableDamping
      />
      {/* Pure local lights — no network fetches, no HDR loading */}
      <ambientLight intensity={0.55} />

      {/* Key: warm upper-left */}
      <directionalLight
        position={[-1.2, 1.8, -1.0]} intensity={2.4} color="#f8f3ee"
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-near={0.1} shadow-camera-far={10}
        shadow-camera-left={-0.8} shadow-camera-right={0.8}
        shadow-camera-top={0.8} shadow-camera-bottom={-0.8}
        shadow-radius={5} shadow-bias={-0.001}
      />
      {/* Fill: cool right */}
      <directionalLight position={[1.5, 0.5, -0.8]} intensity={0.7} color="#eef2ff" />
      {/* Rim: from behind */}
      <directionalLight position={[0.5, 1.0, 1.8]} intensity={0.9} color="#f0f4ff" />

      <CubeSat />

      {/* Simple shadow plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.22, 0]} receiveShadow>
        <planeGeometry args={[4, 4]} />
        <shadowMaterial transparent opacity={0.22} />
      </mesh>
    </>
  )
}

const fallbackUI = (
  <div style={{
    width: '100%', height: '100%',
    background: 'linear-gradient(135deg, #f5f3f0 0%, #edeae4 100%)',
    borderRadius: '12px',
    display: 'flex', flexDirection: 'column',
    alignItems: 'center', justifyContent: 'center', gap: '12px',
  }}>
    <div style={{ fontSize: '28px' }}>🛰️</div>
    <span style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
      3U CubeSat
    </span>
  </div>
)

export default function SatelliteViewer() {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: 'linear-gradient(135deg, #f5f3f0 0%, #edeae4 100%)',
      borderRadius: '12px', overflow: 'hidden', position: 'relative',
    }}>
      <SatelliteErrorBoundary fallback={fallbackUI}>
        <Canvas
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0.55, 0.14, 0.95], fov: 44, near: 0.01, far: 30 }}
          gl={{
            antialias: true,
            powerPreference: 'default',
            failIfMajorPerformanceCaveat: false,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.08,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
        >
          <Scene />
        </Canvas>
      </SatelliteErrorBoundary>

      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '10px 14px',
        background: 'linear-gradient(to top, rgba(240,237,232,0.85) 0%, transparent 100%)',
        display: 'flex', alignItems: 'center', gap: '6px',
        pointerEvents: 'none',
      }}>
        <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
        <span style={{ fontSize: '10px', color: 'rgba(30,30,30,0.5)', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          3U CubeSat
        </span>
      </div>
    </div>
  )
}
