/**
 * IOLA Horizon-1 (IOLA-H1 Pathfinder) — 12U XL Flat-Sat
 * Based on IOLA-H1-RA-0001 v0.5 Final Review Edition
 *
 * GEOMETRY — "The Flying Pizza Box":
 * Body: 400 × 400 × 100 mm  (user confirmed dimensions)
 *   X = 0.400 m  (width — wing deployment direction)
 *   Y = 0.100 m  (thickness — the thin pizza-box dimension)
 *   Z = 0.400 m  (depth — flight/nadir direction)
 *
 * The large 400×400mm face is NADIR (−Y) and ZENITH (+Y)
 * The thin 100mm dimension is the body depth (Y axis)
 *
 * Solar wings (Section 10.3.4):
 *   ~908mm deployed span per wing
 *   3 panels per wing, each ~280mm wide × 400mm tall × 6mm thick
 *   Wings deploy from the ±X body edges
 *   Hinge axis: Z (runs along the 400mm body depth)
 *   Stowed: panels fold DOWN onto the ±X thin side faces
 *   Deployed: panels extend outward in ±X, face is XZ plane (solar cell faces +Y zenith)
 *
 * Deployment physics for FLAT-SAT:
 *   Hinge at X = ±BX/2, running along Z
 *   Rotation about Z axis
 *   Stowed angle: ±90° → panels lie flat against ±X thin faces
 *   Deployed angle: 0° → panels extend in ±X plane, cell face toward zenith (+Y)
 */
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

// ── Spacecraft dimensions ────────────────────────────────────────────────────
export const BODY_X = 0.400   // width (wing direction)
export const BODY_Y = 0.100   // thickness (pizza-box thin dimension)
export const BODY_Z = 0.400   // depth (nadir face dimension)

// Solar wing geometry (Section 10.3.4, ~908mm span, 3 panels)
export const WING_SPAN  = 0.908    // total deployed span
export const WING_NSEG  = 3        // tri-fold segments
export const WING_SEG_W = WING_SPAN / WING_NSEG   // ~302mm per segment
export const WING_H     = BODY_Z - 0.020  // panel height = body depth minus brackets
export const WING_T     = 0.006   // panel thickness

// ── Materials ────────────────────────────────────────────────────────────────
// MLI — Multi-Layer Insulation blanket (gold/amber metallic, main body surface)
export const mliMat = new THREE.MeshStandardMaterial({
  color: '#c8860a', roughness: 0.42, metalness: 0.72,
})
// Machined aluminium structure (rails, brackets, hinges)
export const aluMat = new THREE.MeshStandardMaterial({
  color: '#9e9ea2', roughness: 0.14, metalness: 0.96,
})
// GaAs solar cell face — deep navy blue, AR-coated glass
export const solarMat = new THREE.MeshStandardMaterial({
  color: '#0f1b45', roughness: 0.08, metalness: 0.0,
})
// Solar cell grid lines (slightly lighter, printed interconnect pattern)
export const solarGridMat = new THREE.MeshStandardMaterial({
  color: '#1a2d68', roughness: 0.18, metalness: 0.0,
})
// Substrate rear face (CFRP or Al-honeycomb — dark grey)
export const substrateMat = new THREE.MeshStandardMaterial({
  color: '#2a2a2e', roughness: 0.60, metalness: 0.1,
})
// Radiator face — white painted aluminium (dedicated thermal face)
export const radiatorMat = new THREE.MeshStandardMaterial({
  color: '#ebebeb', roughness: 0.70, metalness: 0.0,
})
// Optical black — star tracker, EO baffle, antenna RF absorber
export const opticalBlackMat = new THREE.MeshStandardMaterial({
  color: '#080808', roughness: 0.55, metalness: 0.05,
})
// Polished steel — reaction wheels, structural bolts
export const steelMat = new THREE.MeshStandardMaterial({
  color: '#888890', roughness: 0.07, metalness: 1.0,
})
// Body mat alias for compatibility
export const bodyMat = mliMat
export const darkMat = opticalBlackMat

// Highlight for selected parts
export const highlightMat = new THREE.MeshStandardMaterial({
  color: '#ffffff', roughness: 0.12, metalness: 0.08,
  emissive: new THREE.Color('#1E5FA8'), emissiveIntensity: 0.55,
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AM = animated('mesh'  as any) as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const AG = animated('group' as any) as any

// ── Solar panel segment ───────────────────────────────────────────────────────
// One fold segment of the tri-fold accordion wing.
// For the flat-sat, the panel face (solar cells) is in the XZ plane.
// Panel: width along X, height along Z, thin in Y.
export function PanelSegment({
  side, segW, mat, onClick, children,
}: {
  side: 1 | -1
  segW: number
  mat: THREE.Material
  onClick?: (e: any) => void
  children?: React.ReactNode
}) {
  const handleClick = onClick ?? (() => {})
  const H = WING_H
  const T = WING_T

  return (
    <>
      {/* Solar cell face (XZ plane — faces +Y zenith when deployed) */}
      <AM
        position-x={side * segW / 2}
        position-y={0}
        position-z={0}
        material={mat}
        castShadow
        onClick={handleClick}
      >
        {/* Width along X, thin in Y, height along Z */}
        <boxGeometry args={[segW, T, H]} />
      </AM>

      {/* Panel substrate (rear face — CFRP/Al-honeycomb) */}
      <mesh
        position={[side * segW / 2, -T * 0.6, 0]}
        material={substrateMat}
      >
        <boxGeometry args={[segW - 0.002, T * 0.4, H - 0.002]} />
      </mesh>

      {/* Aluminium frame — +Z and -Z edges (top and bottom of panel) */}
      <mesh position={[side * segW / 2, 0,  H/2 + 0.0025]} material={aluMat}>
        <boxGeometry args={[segW + 0.002, T + 0.004, 0.005]} />
      </mesh>
      <mesh position={[side * segW / 2, 0, -H/2 - 0.0025]} material={aluMat}>
        <boxGeometry args={[segW + 0.002, T + 0.004, 0.005]} />
      </mesh>

      {/* Side edge frame strip (tip of segment) */}
      <mesh position={[side * (segW + 0.0025), 0, 0]} material={aluMat}>
        <boxGeometry args={[0.005, T + 0.003, H + 0.002]} />
      </mesh>

      {/* Hinge knuckle at fold point (cylindrical, steel) */}
      <mesh
        position={[side * segW, 0, 0]}
        rotation={[0, 0, Math.PI/2]}
        material={steelMat}
      >
        <cylinderGeometry args={[0.006, 0.006, 0.020, 10]} />
      </mesh>

      {/* Cover glass highlight strip — thin bright strip across solar face */}
      {[0.25, 0.50, 0.75].map((frac, i) => (
        <mesh
          key={i}
          position={[side * segW / 2, T/2 + 0.0005, H * (frac - 0.5)]}
          material={solarGridMat}
        >
          <boxGeometry args={[segW - 0.004, 0.001, 0.002]} />
        </mesh>
      ))}

      <group position={[side * segW, 0, 0]}>{children}</group>
    </>
  )
}

// ── Deployable tri-fold solar wing ────────────────────────────────────────────
// FLAT-SAT deployment physics:
//   Hinge runs along Z (the 400mm body depth edge)
//   Hinge pivot point: X = ±BODY_X/2
//   Rotation axis: Z (vertical when satellite is nadir-pointing)
//
//   STOWED: panels folded down onto ±X thin side face
//     → rotation.z = ±90° (panel lies on the 100mm thin edge)
//     Seg1: rotZ = ∓90° (folds toward body face)
//     Seg2: rotZ = ±180° (folds back, Z-accordion)
//     Seg3: rotZ = ∓180° (folds forward again)
//     All segments stack on each other against the body's ±X face
//
//   DEPLOYED: rotation.z = 0°, panels extend in ±X, solar face points up (+Y)
//
// Sequential stow order: Seg3 first → Seg2 → Seg1 last (tip inward, root last)
// Sequential deploy order: Seg1 first → Seg2 → Seg3 last
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
  const id = side === 1 ? 'panelL' : 'panelR'
  const SEG = WING_SEG_W

  // Z-fold stow angles about Z axis
  // side=+1 (port): seg1 folds up (−Z rotation), seg2 back, seg3 forward
  // side=−1 (starboard): mirror
  const s1Stow =  side * Math.PI / 2    // 90°: root folds up against body ±X face
  const s2Stow = -side * Math.PI        // 180°: seg2 Z-folds back on seg1
  const s3Stow =  side * Math.PI        // 180°: seg3 Z-folds forward on seg2

  const cfg = { mass: 3.2, tension: 46, friction: 24 }

  // Deploy: root first (seg1 at t=0), tip last (seg3 at t=360ms)
  // Stow: tip first (seg3 at t=0), root last (seg1 at t=420ms)
  const { r1 } = useSpring({ r1: deployed ? 0 : s1Stow, config: cfg, delay: deployed ? 0   : 420 })
  const { r2 } = useSpring({ r2: deployed ? 0 : s2Stow, config: cfg, delay: deployed ? 180 : 210 })
  const { r3 } = useSpring({ r3: deployed ? 0 : s3Stow, config: cfg, delay: deployed ? 360 : 0   })

  // Explode: push wings further out in ±X
  const { posX } = useSpring({
    posX: side * BODY_X / 2 + (exploded ? side * 0.62 : 0),
    config: { mass: 1.2, tension: 130, friction: 22 },
  })

  const isSelected = selected === id
  const mat = isSelected ? highlightMat : solarMat
  const click = (e: any) => { e.stopPropagation(); onSelect?.(isSelected ? null : id) }

  return (
    // Root group translates to body edge, then explodes further
    <AG position-x={posX} position-y={0} position-z={0}>
      {/* Root hinge bracket at body edge */}
      <mesh material={aluMat} castShadow>
        <boxGeometry args={[0.012, BODY_Y + 0.004, 0.022]} />
      </mesh>
      {/* Root hinge pin */}
      <mesh rotation={[0, 0, Math.PI/2]} material={steelMat}>
        <cylinderGeometry args={[0.004, 0.004, BODY_Y + 0.010, 8]} />
      </mesh>

      {/* Tri-fold segments rotating about Z axis */}
      <AG rotation-z={r1}>
        <PanelSegment side={side} segW={SEG} mat={mat} onClick={click}>
          <AG rotation-z={r2}>
            <PanelSegment side={side} segW={SEG} mat={mat} onClick={click}>
              <AG rotation-z={r3}>
                <PanelSegment side={side} segW={SEG} mat={mat} onClick={click} />
              </AG>
            </PanelSegment>
          </AG>
        </PanelSegment>
      </AG>
    </AG>
  )
}

// ── Part spring for explode/disassemble view ──────────────────────────────────
const EXPLODE_OFFSETS: Record<string, [number, number, number]> = {
  ant0:  [ 0.12,  0.50,  0.10],   // TT&C antenna 1 — up and forward
  ant1:  [-0.12,  0.50,  0.10],   // TT&C antenna 2
  patch: [ 0.08, -0.45,  0.08],   // EO imager — down (nadir face)
  dome:  [-0.08, -0.45, -0.10],   // Star tracker — down, aft
  thr0:  [ 0.30, -0.45,  0     ], // EO camera cluster — starboard nadir, explodes out/down
  thr1:  [-0.30, -0.45,  0     ], // SAR aperture — port nadir, explodes out/down
  thr2:  [ 0,     0.40, -0.20  ], // Battery pack — up and aft
  sep0:  [ 0,     0,    -0.30  ], // Separation joint aft
  sep1:  [ 0,     0,     0.30  ], // Separation joint forward
}

export function usePart(id: string, base: [number, number, number], exploded: boolean) {
  const offset = EXPLODE_OFFSETS[id] ?? [0, 0, 0]
  const target: [number, number, number] = exploded
    ? [base[0] + offset[0], base[1] + offset[1], base[2] + offset[2]]
    : base
  const { position } = useSpring({
    position: target,
    config: { mass: 1.2, tension: 130, friction: 22 },
  })
  return position
}

// ── Horizon-1 Complete Spacecraft ─────────────────────────────────────────────
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
    group.current.rotation.y += delta * 0.10
  })

  const BX = BODY_X   // 0.400m
  const BY = BODY_Y   // 0.100m — the thin pizza-box edge
  const BZ = BODY_Z   // 0.400m

  // Component positions in body-local space
  // Y=+BY/2 = zenith face (sun-facing, solar strips + sensors)
  // Y=−BY/2 = nadir face (Earth-facing, EO instrument + star tracker)
  // Z direction = flight direction / depth

  const posA0    = usePart('ant0',  [ BX*0.28,  BY/2+0.055,  BZ*0.25], exploded)
  const posA1    = usePart('ant1',  [-BX*0.28,  BY/2+0.055,  BZ*0.25], exploded)
  const posPatch = usePart('patch', [ BX*0.05,  -BY/2-0.012,  BZ*0.08], exploded)
  const posDome  = usePart('dome',  [-BX*0.18,  -BY/2-0.012, -BZ*0.15], exploded)
  const posT0    = usePart('thr0',  [ BX*0.18,   BY/2+0.010,  BZ*0.10], exploded)
  const posT1    = usePart('thr1',  [-BX*0.18,   BY/2+0.010,  BZ*0.10], exploded)
  const posT2    = usePart('thr2',  [ 0,          0,            0      ], exploded)
  const posS0    = usePart('sep0',  [ 0,          0,           -BZ/3   ], exploded)
  const posS1    = usePart('sep1',  [ 0,          0,            BZ/3   ], exploded)

  const click = (id: string) => (e: any) => {
    e.stopPropagation()
    onSelect?.(selected === id ? null : id)
  }

  // Battery material (blue-grey Li-ion pack appearance)
  const battMat = new THREE.MeshStandardMaterial({ color: '#2a3a5a', roughness: 0.40, metalness: 0.20 })

  return (
    <group
      ref={group}
      // Slight pitch and yaw to show the flat face + wing extension + body depth
      rotation={[0.28, 0.55, 0.06]}
      onPointerDown={() => { isDragging.current = true }}
      onPointerUp={() => { setTimeout(() => { isDragging.current = false }, 80) }}
      onPointerMissed={() => onSelect?.(null)}
    >
      {/* ══ PRIMARY BODY STRUCTURE ══════════════════════════════════════════ */}
      {/* Main bus — MLI gold thermal blanket wraps ±X and ±Z side faces */}
      <mesh material={mliMat} castShadow receiveShadow onClick={click('body')}>
        <boxGeometry args={[BX, BY, BZ]} />
      </mesh>

      {/* Radiator face: −Z, dedicated thermal rejection face (white) */}
      {/* Section 13.8: "reserve a clean thermal face; never share radiator real estate" */}
      <mesh position={[0, 0, -BZ/2 - 0.0008]}>
        <boxGeometry args={[BX - 0.006, BY - 0.006, 0.002]} />
        <meshStandardMaterial color="#ececec" roughness={0.68} metalness={0} />
      </mesh>

      {/* Nadir face (−Y): black optical coating + EO aperture */}
      {/* This face points toward Earth; EO instrument is here */}
      <mesh position={[0, -BY/2 - 0.0008, 0]}>
        <boxGeometry args={[BX - 0.004, 0.002, BZ - 0.004]} />
        <meshStandardMaterial color="#111114" roughness={0.50} metalness={0.05} />
      </mesh>

      {/* Zenith face (+Y): body-mounted solar strips + GNSS patch */}
      {/* Section 10.3.1: "optional body-mounted strips on zenith and side faces" */}
      <mesh position={[0, BY/2 + 0.0008, 0]}>
        <boxGeometry args={[BX - 0.006, 0.002, BZ - 0.006]} />
        <meshStandardMaterial color="#0d1640" roughness={0.10} metalness={0} />
      </mesh>
      {/* Zenith solar cell grid lines */}
      {[-0.10, 0, 0.10].map((zOff, i) => (
        <mesh key={i} position={[0, BY/2 + 0.0018, zOff]}>
          <boxGeometry args={[BX - 0.010, 0.001, 0.002]} />
          <meshStandardMaterial color="#1a2d68" roughness={0.15} metalness={0} />
        </mesh>
      ))}

      {/* Corner rails: machined Al, visible on all 4 long edges */}
      {([
        [ BX/2 - 0.010, 0,  BZ/2 - 0.010],
        [-BX/2 + 0.010, 0,  BZ/2 - 0.010],
        [ BX/2 - 0.010, 0, -BZ/2 + 0.010],
        [-BX/2 + 0.010, 0, -BZ/2 + 0.010],
      ] as [number,number,number][]).map((pos, i) => (
        <mesh key={`rail${i}`} position={pos} material={aluMat}>
          <boxGeometry args={[0.014, BY + 0.003, 0.014]} />
        </mesh>
      ))}

      {/* Top/bottom edge frame strips (along X) */}
      <mesh position={[0, 0,  BZ/2 - 0.007]} material={aluMat}>
        <boxGeometry args={[BX - 0.020, BY + 0.002, 0.010]} />
      </mesh>
      <mesh position={[0, 0, -BZ/2 + 0.007]} material={aluMat}>
        <boxGeometry args={[BX - 0.020, BY + 0.002, 0.010]} />
      </mesh>

      {/* Structural separation joints (functional bay boundaries along Z) */}
      {/* Section 9: bus split into payload bay / avionics bay */}
      <AM position={posS0} material={aluMat} onClick={click('sep0')}>
        <boxGeometry args={[BX + 0.002, BY + 0.002, 0.004]} />
      </AM>
      <AM position={posS1} material={aluMat} onClick={click('sep1')}>
        <boxGeometry args={[BX + 0.002, BY + 0.002, 0.004]} />
      </AM>

      {/* ══ SOLAR WINGS ═════════════════════════════════════════════════════ */}
      <DeployablePanel side={1}  deployed={deployed} exploded={exploded} selected={selected} onSelect={onSelect} />
      <DeployablePanel side={-1} deployed={deployed} exploded={exploded} selected={selected} onSelect={onSelect} />

      {/* ══ TT&C ANTENNAS (Section 10.7) ════════════════════════════════════ */}
      {/* Deployable monopole whips on zenith face, near +Z (forward) edge */}
      <AM position={posA0} material={steelMat} onClick={click('ant0')}>
        <cylinderGeometry args={[0.0012, 0.0012, 0.120, 6]} />
      </AM>
      <AM position={posA1} material={steelMat} onClick={click('ant1')}>
        <cylinderGeometry args={[0.0012, 0.0012, 0.120, 6]} />
      </AM>
      {/* Antenna base mounts */}
      <mesh position={[ BX*0.28, BY/2 + 0.003,  BZ*0.25]} material={aluMat}>
        <cylinderGeometry args={[0.006, 0.006, 0.006, 8]} />
      </mesh>
      <mesh position={[-BX*0.28, BY/2 + 0.003,  BZ*0.25]} material={aluMat}>
        <cylinderGeometry args={[0.006, 0.006, 0.006, 8]} />
      </mesh>

      {/* X-band downlink patch array on +Z face (Section 10.7, payload downlink) */}
      <mesh position={[0, 0, BZ/2 + 0.004]} material={opticalBlackMat} onClick={click('ant0')}>
        <boxGeometry args={[0.065, BY * 0.65, 0.005]} />
      </mesh>
      {/* X-band patch array substrate */}
      <mesh position={[0, 0, BZ/2 + 0.007]} material={aluMat}>
        <boxGeometry args={[0.070, BY * 0.68, 0.003]} />
      </mesh>

      {/* ══ EO INSTRUMENT — Payload A (Section 7.1) ══════════════════════════ */}
      {/* Nadir face, centered, slightly +Z offset */}
      {/* Multispectral: Blue/Green/Red/RedEdge/NIR bands */}
      <AM position={posPatch} material={opticalBlackMat} castShadow onClick={click('patch')}>
        <boxGeometry args={[0.090, 0.030, 0.105]} />
      </AM>
      {/* EO main lens aperture */}
      <mesh position={[ BX*0.05, -BY/2 - 0.026, BZ*0.08]}>
        <cylinderGeometry args={[0.024, 0.024, 0.005, 16]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.05} metalness={0.10} />
      </mesh>
      {/* EO baffle tube */}
      <mesh position={[ BX*0.05, -BY/2 - 0.042, BZ*0.08]}>
        <cylinderGeometry args={[0.022, 0.026, 0.022, 16]} />
        <meshStandardMaterial color="#121212" roughness={0.55} metalness={0.05} />
      </mesh>
      {/* Calibration port (small side window) */}
      <mesh position={[ BX*0.10, -BY/2 - 0.018, BZ*0.08]}>
        <boxGeometry args={[0.010, 0.006, 0.010]} />
        <meshStandardMaterial color="#080808" roughness={0.40} metalness={0} />
      </mesh>

      {/* ══ STAR TRACKER (Section 10.6) ═════════════════════════════════════ */}
      {/* Nadir face, offset from EO to avoid FoV conflict */}
      <AM position={posDome} material={opticalBlackMat} onClick={click('dome')}>
        <cylinderGeometry args={[0.019, 0.023, 0.028, 14]} />
      </AM>
      {/* Star tracker baffle (straylight shield) */}
      <mesh position={[-BX*0.18, -BY/2 - 0.030, -BZ*0.15]}>
        <cylinderGeometry args={[0.016, 0.018, 0.024, 14]} />
        <meshStandardMaterial color="#090909" roughness={0.55} metalness={0.05} />
      </mesh>
      {/* Star tracker housing ring */}
      <mesh position={[-BX*0.18, -BY/2 - 0.008, -BZ*0.15]} material={aluMat}>
        <cylinderGeometry args={[0.022, 0.022, 0.004, 14]} />
      </mesh>

      {/* ══ REACTION WHEELS — ADCS (Section 10.6) ═══════════════════════════ */}
      {/* Three-axis wheel set: X, Y, Z wheels */}
      {/* Visible on zenith face as polished steel discs */}
      {/* Wheel X */}
      <AM position={posT0} material={steelMat} castShadow onClick={click('thr0')}>
        <cylinderGeometry args={[0.030, 0.030, 0.014, 18]} />
      </AM>
      {/* Wheel Y */}
      <AM position={posT1} material={steelMat} castShadow onClick={click('thr1')}>
        <cylinderGeometry args={[0.030, 0.030, 0.014, 18]} />
      </AM>
      {/* Wheel Z (rotated 90° — spins about Z axis) */}
      <mesh position={[0, BY/2 + 0.008, -BZ*0.12]} rotation={[Math.PI/2, 0, 0]} material={steelMat} onClick={click('thr1')}>
        <cylinderGeometry args={[0.026, 0.026, 0.012, 18]} />
      </mesh>
      {/* Wheel housing brackets */}
      <mesh position={[ BX*0.18, BY/2 + 0.003, BZ*0.10]} material={aluMat}>
        <boxGeometry args={[0.065, 0.006, 0.065]} />
      </mesh>
      <mesh position={[-BX*0.18, BY/2 + 0.003, BZ*0.10]} material={aluMat}>
        <boxGeometry args={[0.065, 0.006, 0.065]} />
      </mesh>

      {/* ══ BATTERY PACK — EPS (Section 10.4) ═══════════════════════════════ */}
      {/* 150–200 Wh space-rated Li-ion, inside body */}
      <AM position={posT2} material={battMat} onClick={click('thr2')}>
        <boxGeometry args={[BX * 0.52, BY * 0.58, BZ * 0.28]} />
      </AM>
      {/* Battery bay cover plate */}
      <mesh position={[0, -BY/2 + 0.003, 0]} material={aluMat}>
        <boxGeometry args={[BX * 0.52 + 0.006, 0.004, BZ * 0.28 + 0.006]} />
      </mesh>

      {/* ══ GNSS ANTENNA (Section 10.6, added v0.5) ══════════════════════════ */}
      {/* Small patch antenna on zenith face, aft-port quadrant */}
      <mesh position={[-BX*0.28, BY/2 + 0.005, -BZ*0.28]}>
        <boxGeometry args={[0.044, 0.006, 0.044]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.65} metalness={0} />
      </mesh>
      {/* GNSS ground plane */}
      <mesh position={[-BX*0.28, BY/2 + 0.003, -BZ*0.28]} material={aluMat}>
        <boxGeometry args={[0.050, 0.003, 0.050]} />
      </mesh>

      {/* ══ MAGNETORQUER BARS (Section 10.6) ════════════════════════════════ */}
      {/* 3-axis coil rods for momentum dumping */}
      {/* X-axis torquer: runs along X */}
      <mesh position={[0, 0, BZ/2 - 0.015]} material={aluMat}>
        <boxGeometry args={[BX * 0.80, 0.008, 0.008]} />
      </mesh>
      {/* Z-axis torquer: runs along Z */}
      <mesh position={[BX/2 - 0.015, 0, 0]} material={aluMat}>
        <boxGeometry args={[0.008, 0.008, BZ * 0.80]} />
      </mesh>

      {/* ══ SUN SENSORS (Section 10.6) ═══════════════════════════════════════ */}
      {/* Small coarse sun sensors on each face */}
      {[
        [BX/2 + 0.001, 0, 0],
        [-BX/2 - 0.001, 0, 0],
        [0, BY/2 + 0.001, BZ*0.30],
      ].map((pos, i) => (
        <mesh key={`ss${i}`} position={pos as [number,number,number]}>
          <boxGeometry args={[0.012, 0.012, 0.004]} />
          <meshStandardMaterial color="#181820" roughness={0.30} metalness={0.10} />
        </mesh>
      ))}

      {/* ══ ACCESS PANELS (Section 10.1) ════════════════════════════════════ */}
      {/* Section 10.1: "Access panels supporting test and integration" */}
      {/* Visible as slightly recessed rectangular panels on ±Z faces */}
      <mesh position={[BX*0.10, 0, BZ/2 - 0.001]} material={aluMat}>
        <boxGeometry args={[0.080, BY - 0.010, 0.002]} />
      </mesh>
      <mesh position={[-BX*0.10, 0, BZ/2 - 0.001]} material={aluMat}>
        <boxGeometry args={[0.080, BY - 0.010, 0.002]} />
      </mesh>

    </group>
  )
}
