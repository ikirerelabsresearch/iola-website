/**
 * Shared IOLA 3U CubeSat geometry — used by both Home hero and Hardware page.
 * Tri-fold accordion solar arrays with spring-physics deployment.
 */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

// ── Shared materials ──────────────────────────────────────────────────────────
export const bodyMat  = new THREE.MeshStandardMaterial({ color: '#e5e4e2', roughness: 0.50, metalness: 0.0 })
export const aluMat   = new THREE.MeshStandardMaterial({ color: '#a6a6a8', roughness: 0.18, metalness: 1.0 })
export const steelMat = new THREE.MeshStandardMaterial({ color: '#9a9a9c', roughness: 0.10, metalness: 1.0 })
export const darkMat  = new THREE.MeshStandardMaterial({ color: '#080808', roughness: 0.60, metalness: 0.0 })
export const solarMat = new THREE.MeshStandardMaterial({ color: '#b04d06', roughness: 0.20, metalness: 0.0 })
export const highlightMat = new THREE.MeshStandardMaterial({
  color: '#ffffff', roughness: 0.15, metalness: 0.1,
  emissive: new THREE.Color('#1E5FA8'), emissiveIntensity: 0.45,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AM = animated('mesh'  as any) as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AG = animated('group' as any) as any

// ── Panel segment (one fold of the accordion array) ───────────────────────────
export function PanelSegment({
  side, segW, PH, PT, mat, onClick, children,
}: {
  side: 1 | -1; segW: number; PH: number; PT: number
  mat: THREE.Material; onClick?: (e: any) => void; children?: React.ReactNode
}) {
  const handleClick = onClick ?? (() => {})
  return (
    <>
      <AM position-x={side * segW / 2} position-y={0} position-z={0}
        material={mat} castShadow onClick={handleClick}>
        <boxGeometry args={[segW, PH, PT]} />
      </AM>
      <mesh position={[side * segW / 2,  PH/2 + 0.0025, 0]} material={aluMat}>
        <boxGeometry args={[segW + 0.001, 0.004, PT + 0.001]} />
      </mesh>
      <mesh position={[side * segW / 2, -PH/2 - 0.0025, 0]} material={aluMat}>
        <boxGeometry args={[segW + 0.001, 0.004, PT + 0.001]} />
      </mesh>
      <mesh position={[side * segW, 0, 0]} material={aluMat}>
        <boxGeometry args={[0.006, 0.022, 0.006]} />
      </mesh>
      <group position={[side * segW, 0, 0]}>{children}</group>
    </>
  )
}

// ── Tri-fold deployable panel ─────────────────────────────────────────────────
export function DeployablePanel({
  side, deployed, exploded,
  selected = null, onSelect,
}: {
  side: 1 | -1
  deployed: boolean
  exploded: boolean
  selected?: string | null
  onSelect?: (id: string | null) => void
}) {
  const id  = side === 1 ? 'panelL' : 'panelR'
  const BX  = 0.100
  const SEG = 0.080
  const PH  = 0.340
  const PT  = 0.005

  const s1Stow = -side * Math.PI / 2
  const s2Stow =  side * Math.PI
  const s3Stow = -side * Math.PI
  const cfg = { mass: 2.8, tension: 52, friction: 20 }

  const { r1 } = useSpring({ r1: deployed ? 0 : s1Stow, config: cfg, delay: deployed ? 0   : 380 })
  const { r2 } = useSpring({ r2: deployed ? 0 : s2Stow, config: cfg, delay: deployed ? 160 : 190 })
  const { r3 } = useSpring({ r3: deployed ? 0 : s3Stow, config: cfg, delay: deployed ? 320 : 0   })

  const { posX } = useSpring({
    posX: side * BX / 2 + (exploded ? side * 0.42 : 0),
    config: { mass: 1.2, tension: 130, friction: 22 },
  })

  const isSelected = selected === id
  const mat = isSelected ? highlightMat : solarMat
  const click = (e: any) => { e.stopPropagation(); onSelect?.(isSelected ? null : id) }

  return (
    <AG position-x={posX} position-y={0} position-z={0}>
      <mesh material={aluMat} castShadow>
        <boxGeometry args={[0.007, 0.024, 0.007]} />
      </mesh>
      <AG rotation-y={r1}>
        <PanelSegment side={side} segW={SEG} PH={PH} PT={PT} mat={mat} onClick={click}>
          <AG rotation-y={r2}>
            <PanelSegment side={side} segW={SEG} PH={PH} PT={PT} mat={mat} onClick={click}>
              <AG rotation-y={r3}>
                <PanelSegment side={side} segW={SEG} PH={PH} PT={PT} mat={mat} onClick={click} />
              </AG>
            </PanelSegment>
          </AG>
        </PanelSegment>
      </AG>
    </AG>
  )
}

// ── Part spring (for explode view) ────────────────────────────────────────────
const EXPLODE_OFFSETS: Record<string, [number, number, number]> = {
  ant0:   [0.10,  0.38,  0   ],
  ant1:   [-0.10, 0.38,  0   ],
  patch:  [0,     0.32, -0.05],
  dome:   [0.14,  0.32,  0   ],
  thr0:   [0.10, -0.38,  0.08],
  thr1:   [-0.10,-0.38,  0.08],
  thr2:   [0,    -0.38, -0.08],
  sep0:   [0,    -0.18,  0   ],
  sep1:   [0,     0.18,  0   ],
}

export function usePart(id: string, base: [number, number, number], exploded: boolean) {
  const offset = EXPLODE_OFFSETS[id] ?? [0, 0, 0]
  const target: [number, number, number] = exploded
    ? [base[0] + offset[0], base[1] + offset[1], base[2] + offset[2]]
    : base
  const { position } = useSpring({ position: target, config: { mass: 1.2, tension: 130, friction: 22 } })
  return position
}

// ── Main assembled CubeSat ────────────────────────────────────────────────────
export function CubeSat({
  exploded = false,
  deployed = true,
  rotating = true,
  selected = null,
  onSelect,
}: {
  exploded?: boolean
  deployed?: boolean
  rotating?: boolean
  selected?: string | null
  onSelect?: (id: string | null) => void
}) {
  const group = useRef<THREE.Group>(null)
  const isDragging = useRef(false)

  useFrame((_, delta) => {
    if (!group.current || !rotating || isDragging.current) return
    group.current.rotation.y += delta * 0.14
  })

  const BX = 0.10, BZ = 0.34, BY = 0.10

  const posA0   = usePart('ant0',  [0.036,  BZ/2+0.046,  0.036], exploded)
  const posA1   = usePart('ant1',  [-0.036, BZ/2+0.046,  0.036], exploded)
  const posPatch= usePart('patch', [-0.018, BZ/2+0.003,  0.010], exploded)
  const posDome = usePart('dome',  [0.015,  BZ/2+0.005, -0.012], exploded)
  const posT0   = usePart('thr0',  [0.022,  -BZ/2-0.009,  0.018], exploded)
  const posT1   = usePart('thr1',  [-0.022, -BZ/2-0.009,  0.018], exploded)
  const posT2   = usePart('thr2',  [0,      -BZ/2-0.009, -0.022], exploded)
  const posS0   = usePart('sep0',  [0, -BZ/6, 0], exploded)
  const posS1   = usePart('sep1',  [0,  BZ/6, 0], exploded)

  const click = (id: string) => (e: any) => {
    e.stopPropagation()
    onSelect?.(selected === id ? null : id)
  }

  return (
    <group
      ref={group}
      rotation={[-0.06, 0.4, 0]}
      onPointerDown={() => { isDragging.current = true }}
      onPointerUp={() => { setTimeout(() => { isDragging.current = false }, 80) }}
      onPointerMissed={() => onSelect?.(null)}
    >
      {/* Body */}
      <mesh material={bodyMat} castShadow receiveShadow onClick={click('body')}>
        <boxGeometry args={[BX, BZ, BY]} />
      </mesh>

      {/* 1U rings */}
      <AM position={posS0} material={aluMat} onClick={click('sep0')}>
        <boxGeometry args={[BX+0.001, 0.0018, BY+0.001]} />
      </AM>
      <AM position={posS1} material={aluMat} onClick={click('sep1')}>
        <boxGeometry args={[BX+0.001, 0.0018, BY+0.001]} />
      </AM>

      {/* Tri-fold deployable panels */}
      <DeployablePanel side={1}  deployed={deployed} exploded={exploded} selected={selected} onSelect={onSelect} />
      <DeployablePanel side={-1} deployed={deployed} exploded={exploded} selected={selected} onSelect={onSelect} />

      {/* Antennas */}
      <AM position={posA0} material={darkMat} onClick={click('ant0')}>
        <cylinderGeometry args={[0.0009, 0.0009, 0.092, 6]} />
      </AM>
      <AM position={posA1} material={darkMat} onClick={click('ant1')}>
        <cylinderGeometry args={[0.0009, 0.0009, 0.092, 6]} />
      </AM>

      {/* Top */}
      <AM position={posPatch} material={aluMat} castShadow onClick={click('patch')}>
        <boxGeometry args={[0.028, 0.005, 0.028]} />
      </AM>
      <AM position={posDome} material={darkMat} onClick={click('dome')}>
        <cylinderGeometry args={[0.010, 0.010, 0.010, 10]} />
      </AM>

      {/* Thrusters */}
      <AM position={posT0} material={steelMat} castShadow onClick={click('thr0')}>
        <coneGeometry args={[0.012, 0.018, 10]} />
      </AM>
      <AM position={posT1} material={steelMat} castShadow onClick={click('thr1')}>
        <coneGeometry args={[0.012, 0.018, 10]} />
      </AM>
      <AM position={posT2} material={steelMat} castShadow onClick={click('thr2')}>
        <coneGeometry args={[0.012, 0.018, 10]} />
      </AM>
    </group>
  )
}
