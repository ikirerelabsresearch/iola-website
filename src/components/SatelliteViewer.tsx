import { useRef, useState, useCallback, Component, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

// ── Error boundary ────────────────────────────────────────────────────────────
interface EBState { error: boolean }
class SatelliteErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { error: false }
  static getDerivedStateFromError() { return { error: true } }
  render() { return this.state.error ? this.props.fallback : this.props.children }
}

// ── Materials ─────────────────────────────────────────────────────────────────
const bodyMat  = new THREE.MeshStandardMaterial({ color: '#e5e4e2', roughness: 0.50, metalness: 0.0 })
const aluMat   = new THREE.MeshStandardMaterial({ color: '#a6a6a8', roughness: 0.18, metalness: 1.0 })
const steelMat = new THREE.MeshStandardMaterial({ color: '#9a9a9c', roughness: 0.10, metalness: 1.0 })
const darkMat  = new THREE.MeshStandardMaterial({ color: '#080808', roughness: 0.60, metalness: 0.0 })
const solarMat = new THREE.MeshStandardMaterial({ color: '#b04d06', roughness: 0.20, metalness: 0.0 })

// ── Animated mesh wrapper ─────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AnimMesh = animated('mesh' as any) as any

// ── Exploded positions: where each part travels to when exploded ──────────────
const EXPLODE = {
  panelL:   [0.55,  0,     0  ],
  panelR:   [-0.55, 0,     0  ],
  antL:     [0.08,  0.32,  0  ],
  antR:     [-0.08, 0.32,  0  ],
  patch:    [0,     0.28, -0.05],
  dome:     [0.12,  0.28,  0  ],
  thr0:     [0.08, -0.32,  0.06],
  thr1:     [-0.08,-0.32,  0.06],
  thr2:     [0,    -0.32, -0.06],
  sep0:     [0,    -0.15,  0  ],
  sep1:     [0,     0.15,  0  ],
} as Record<string, [number,number,number]>

function usePartSpring(key: string, exploded: boolean, basePos: [number,number,number]) {
  const target = exploded
    ? [basePos[0] + EXPLODE[key][0], basePos[1] + EXPLODE[key][1], basePos[2] + EXPLODE[key][2]]
    : basePos
  const { position } = useSpring({
    position: target,
    config: { mass: 1.2, tension: 140, friction: 22 },
  })
  return position
}

// ── CubeSat ───────────────────────────────────────────────────────────────────
function CubeSat({ exploded }: { exploded: boolean }) {
  const group = useRef<THREE.Group>(null)
  const isDragging = useRef(false)

  useFrame((_, delta) => {
    if (!group.current || isDragging.current) return
    group.current.rotation.y += delta * 0.20
  })

  const BX = 0.10, BZ = 0.34, BY = 0.10
  const PW = 0.22, PH = BZ, PT = 0.006
  const PX = BX / 2 + PT / 2

  // Panel springs
  const posL   = usePartSpring('panelL',  exploded, [PX,   0, 0])
  const posR   = usePartSpring('panelR',  exploded, [-PX,  0, 0])
  const posA0  = usePartSpring('antL',    exploded, [0.036,  BZ/2 + 0.046,  0.036])
  const posA1  = usePartSpring('antR',    exploded, [-0.036, BZ/2 + 0.046,  0.036])
  const posPatch = usePartSpring('patch', exploded, [-0.018, BZ/2 + 0.003,  0.010])
  const posDome  = usePartSpring('dome',  exploded, [0.015,  BZ/2 + 0.005, -0.012])
  const posT0  = usePartSpring('thr0',   exploded, [0.022,  -BZ/2 - 0.009,  0.018])
  const posT1  = usePartSpring('thr1',   exploded, [-0.022, -BZ/2 - 0.009,  0.018])
  const posT2  = usePartSpring('thr2',   exploded, [0,      -BZ/2 - 0.009, -0.022])
  const posSep0 = usePartSpring('sep0',  exploded, [0, -BZ/6, 0])
  const posSep1 = usePartSpring('sep1',  exploded, [0,  BZ/6, 0])

  return (
    <group
      ref={group}
      rotation={[-0.06, 0.4, 0]}
      onPointerDown={() => { isDragging.current = true }}
      onPointerUp={() => { setTimeout(() => { isDragging.current = false }, 100) }}
    >
      {/* Body — stays fixed */}
      <mesh material={bodyMat} castShadow receiveShadow>
        <boxGeometry args={[BX, BZ, BY]} />
      </mesh>

      {/* 1U separation rings */}
      <AnimMesh material={aluMat} position={posSep0 as any}>
        <boxGeometry args={[BX + 0.001, 0.0018, BY + 0.001]} />
      </AnimMesh>
      <AnimMesh material={aluMat} position={posSep1 as any}>
        <boxGeometry args={[BX + 0.001, 0.0018, BY + 0.001]} />
      </AnimMesh>

      {/* Solar panels */}
      <AnimMesh material={solarMat} position={posL as any} castShadow>
        <boxGeometry args={[PT, PH, PW]} />
      </AnimMesh>
      <AnimMesh material={solarMat} position={posR as any} castShadow>
        <boxGeometry args={[PT, PH, PW]} />
      </AnimMesh>

      {/* Panel frame edges */}
      {[-1, 1].map((sign) =>
        [-1, 1].map((tb) => (
          <mesh key={`${sign}${tb}`}
            position={[sign * PX, tb * (PH / 2 + 0.003), 0]}
            material={aluMat}
          >
            <boxGeometry args={[PT + 0.002, 0.005, PW + 0.002]} />
          </mesh>
        ))
      )}

      {/* Antennas */}
      <AnimMesh material={darkMat} position={posA0 as any}>
        <cylinderGeometry args={[0.0009, 0.0009, 0.092, 6]} />
      </AnimMesh>
      <AnimMesh material={darkMat} position={posA1 as any}>
        <cylinderGeometry args={[0.0009, 0.0009, 0.092, 6]} />
      </AnimMesh>

      {/* UHF patch */}
      <AnimMesh material={aluMat} position={posPatch as any} castShadow>
        <boxGeometry args={[0.028, 0.005, 0.028]} />
      </AnimMesh>

      {/* Star tracker */}
      <AnimMesh material={darkMat} position={posDome as any}>
        <cylinderGeometry args={[0.010, 0.010, 0.010, 10]} />
      </AnimMesh>

      {/* Thrusters */}
      <AnimMesh material={steelMat} position={posT0 as any} castShadow>
        <coneGeometry args={[0.012, 0.018, 10]} />
      </AnimMesh>
      <AnimMesh material={steelMat} position={posT1 as any} castShadow>
        <coneGeometry args={[0.012, 0.018, 10]} />
      </AnimMesh>
      <AnimMesh material={steelMat} position={posT2 as any} castShadow>
        <coneGeometry args={[0.012, 0.018, 10]} />
      </AnimMesh>
    </group>
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────
function Scene({ transparent = false, exploded }: { transparent?: boolean; exploded: boolean }) {
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
      <ambientLight intensity={transparent ? 0.7 : 0.55} color={transparent ? '#f5f0ea' : '#ffffff'} />
      <directionalLight
        position={[-1.2, 1.8, -1.0]}
        intensity={transparent ? 2.8 : 2.4}
        color={transparent ? '#f9f0e4' : '#f8f3ee'}
        castShadow
        shadow-mapSize={[512, 512]}
        shadow-camera-near={0.1} shadow-camera-far={10}
        shadow-camera-left={-0.8} shadow-camera-right={0.8}
        shadow-camera-top={0.8} shadow-camera-bottom={-0.8}
        shadow-radius={transparent ? 12 : 5}
        shadow-bias={-0.001}
      />
      <directionalLight position={[1.5, 0.5, -0.8]} intensity={0.7} color="#eef2ff" />
      <directionalLight position={[0.5, 1.0, 1.8]} intensity={0.9} color="#f0f4ff" />
      {transparent && <pointLight position={[0.8, -0.5, 0.5]} intensity={0.4} color="#c8860a" />}

      <CubeSat exploded={exploded} />

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.22, 0]} receiveShadow>
        <planeGeometry args={[4, 4]} />
        <shadowMaterial transparent opacity={transparent ? 0.12 : 0.22} />
      </mesh>
    </>
  )
}

// ── Hint label ────────────────────────────────────────────────────────────────
function Hint({ exploded }: { exploded: boolean }) {
  return (
    <div style={{
      position: 'absolute', bottom: '12px', right: '14px',
      fontSize: '10px', color: 'rgba(30,30,30,0.38)',
      fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase',
      pointerEvents: 'none', userSelect: 'none',
      transition: 'opacity 0.3s',
    }}>
      {exploded ? 'double-tap to reassemble' : 'double-tap to disassemble'}
    </div>
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
    <span style={{ fontSize: '11px', color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>3U CubeSat</span>
  </div>
)

// ── Export ────────────────────────────────────────────────────────────────────
export default function SatelliteViewer({ transparent = false }: { transparent?: boolean }) {
  const [exploded, setExploded] = useState(false)

  const handleDoubleClick = useCallback(() => {
    setExploded(e => !e)
  }, [])

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
          shadows
          dpr={[1, 1.5]}
          camera={{ position: [0.55, 0.14, 0.95], fov: 44, near: 0.01, far: 30 }}
          gl={{
            antialias: true,
            powerPreference: 'default',
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

      <Hint exploded={exploded} />
    </div>
  )
}
