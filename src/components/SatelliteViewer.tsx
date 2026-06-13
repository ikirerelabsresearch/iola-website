import { useState, useCallback, Component, type ReactNode } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { CubeSat } from './CubeSatModel'

// ── Error boundary ────────────────────────────────────────────────────────────
interface EBState { error: boolean }
class SatelliteErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() { return this.state.error ? this.props.fallback : this.props.children }
}

function Scene({ transparent, exploded }: { transparent: boolean; exploded: boolean }) {
  return (
    <>
      <OrbitControls
        enableZoom={false} enablePan={false}
        minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI * 0.72}
        dampingFactor={0.08} enableDamping
      />
      <ambientLight intensity={transparent ? 0.7 : 0.55} color={transparent ? '#f5f0ea' : '#ffffff'} />
      <directionalLight
        position={[-1.2, 1.8, -1.0]} intensity={transparent ? 2.8 : 2.4}
        color={transparent ? '#f9f0e4' : '#f8f3ee'}
        castShadow shadow-mapSize={[512, 512]}
        shadow-camera-near={0.1} shadow-camera-far={10}
        shadow-camera-left={-0.8} shadow-camera-right={0.8}
        shadow-camera-top={0.8} shadow-camera-bottom={-0.8}
        shadow-radius={transparent ? 12 : 5} shadow-bias={-0.001}
      />
      <directionalLight position={[1.5, 0.5, -0.8]} intensity={0.7} color="#eef2ff" />
      <directionalLight position={[0.5, 1.0, 1.8]} intensity={0.9} color="#f0f4ff" />
      {transparent && <pointLight position={[0.8, -0.5, 0.5]} intensity={0.4} color="#c8860a" />}

      {/* Fully deployed panels, auto-rotating, double-click explodes */}
      <CubeSat exploded={exploded} deployed rotating />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.22, 0]} receiveShadow>
        <planeGeometry args={[4, 4]} />
        <shadowMaterial transparent opacity={transparent ? 0.12 : 0.22} />
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
  </div>
)

export default function SatelliteViewer({ transparent = false }: { transparent?: boolean }) {
  const [exploded, setExploded] = useState(false)
  const handleDoubleClick = useCallback(() => setExploded(e => !e), [])

  return (
    <div
      onDoubleClick={handleDoubleClick}
      style={{
        width: '100%', height: '100%',
        background: transparent ? 'transparent' : 'linear-gradient(135deg, #f5f3f0 0%, #edeae4 100%)',
        borderRadius: transparent ? '0' : '12px',
        overflow: 'hidden', position: 'relative',
        cursor: 'grab',
      }}
    >
      <SatelliteErrorBoundary fallback={transparent ? null : fallbackUI}>
        <Canvas
          shadows dpr={[1, 1.5]}
          camera={{ position: [0.70, 0.55, 1.65], fov: 52, near: 0.01, far: 30 }}
          gl={{
            antialias: true, powerPreference: 'default',
            failIfMajorPerformanceCaveat: false,
            alpha: transparent,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: transparent ? 1.3 : 1.08,
            outputColorSpace: THREE.SRGBColorSpace,
          }}
          style={transparent ? { background: 'transparent' } : {}}
        >
          <Scene transparent={transparent} exploded={exploded} />
        </Canvas>
      </SatelliteErrorBoundary>

      {!transparent && (
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
      )}

      <div style={{
        position: 'absolute', bottom: '12px', right: '14px',
        fontSize: '10px', color: transparent ? 'rgba(30,30,30,0.32)' : 'rgba(30,30,30,0.38)',
        fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
        pointerEvents: 'none', userSelect: 'none',
      }}>
        {exploded ? 'double-tap to reassemble' : 'double-tap to disassemble'}
      </div>
    </div>
  )
}
