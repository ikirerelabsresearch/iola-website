import { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useSpring, animated } from '@react-spring/three'
import * as THREE from 'three'

// ── Component catalogue ────────────────────────────────────────────────────────
// Every clickable part: id, display name, category, one-line status, full description, specs
const COMPONENTS: Record<string, {
  name: string
  category: string
  status: string
  description: string
  specs: { label: string; value: string }[]
}> = {
  body: {
    name: 'Structural Bus',
    category: 'Structure',
    status: 'Primary',
    description: 'The primary structural chassis of the 3U CubeSat. Machined aluminium 6061-T6 with hard-anodised finish. Provides the mechanical backbone for all subsystem mounting, thermal conduction pathways, and structural load distribution during launch.',
    specs: [
      { label: 'Form factor',  value: '3U CubeSat (10×10×34cm)' },
      { label: 'Material',     value: 'Al 6061-T6 hard-anodised' },
      { label: 'Mass (bus)',   value: '~380g' },
      { label: 'Launch load',  value: '30g quasi-static' },
    ],
  },
  panelL: {
    name: 'Solar Array — Port',
    category: 'Power',
    status: 'Deployable',
    description: 'Deployable GaAs triple-junction solar array, port side. Stowed against the body during launch and deployed via spring-loaded hinge mechanisms on orbit insertion. Generates primary power for onboard systems.',
    specs: [
      { label: 'Cell type',    value: 'GaAs triple-junction' },
      { label: 'Peak power',   value: '~8.5W per panel' },
      { label: 'Efficiency',   value: '28–30%' },
      { label: 'Deployment',   value: 'Spring-loaded, one-shot' },
    ],
  },
  panelR: {
    name: 'Solar Array — Starboard',
    category: 'Power',
    status: 'Deployable',
    description: 'Deployable GaAs triple-junction solar array, starboard side. Mirror configuration to the port array. Combined output with port panel provides sufficient power for mission operations in nominal sun-pointing attitude.',
    specs: [
      { label: 'Cell type',    value: 'GaAs triple-junction' },
      { label: 'Peak power',   value: '~8.5W per panel' },
      { label: 'Combined BOL', value: '~17W both arrays' },
      { label: 'Voltage',      value: '4.2V nominal' },
    ],
  },
  patch: {
    name: 'UHF Patch Antenna',
    category: 'Communications',
    status: 'Active',
    description: 'Ultra-high frequency patch antenna on the +Z face. Used for low-rate telemetry downlink, command uplink, and ground contact during initial acquisition. Operates in the 430–440 MHz amateur satellite band with omnidirectional coverage.',
    specs: [
      { label: 'Frequency',    value: '435 MHz (UHF)' },
      { label: 'Data rate',    value: '9.6–38.4 kbps' },
      { label: 'TX power',     value: '0.5W nominal' },
      { label: 'Pattern',      value: 'Near-omnidirectional' },
    ],
  },
  dome: {
    name: 'Star Tracker',
    category: 'ADCS',
    status: 'Navigation',
    description: 'Miniaturised star tracker for high-accuracy attitude determination. Provides three-axis attitude knowledge by matching observed star patterns against an onboard star catalogue. Primary attitude sensor for fine pointing and nadir-pointing operations.',
    specs: [
      { label: 'Accuracy',     value: '<0.01° cross-boresight' },
      { label: 'Update rate',  value: '4 Hz' },
      { label: 'FOV',          value: '20° × 20°' },
      { label: 'Power',        value: '1.5W operational' },
    ],
  },
  ant0: {
    name: 'VHF Whip Antenna — 1',
    category: 'Communications',
    status: 'Active',
    description: 'Deployable VHF monopole whip antenna. Used for beacon transmission and emergency communications. Stowed against the body during launch in a spring-loaded configuration, deploys autonomously after separation from the launch vehicle.',
    specs: [
      { label: 'Frequency',    value: '145 MHz (VHF)' },
      { label: 'Length',       value: '~50cm deployed' },
      { label: 'Deployment',   value: 'Spring-loaded, passive' },
      { label: 'Function',     value: 'Beacon + emergency comms' },
    ],
  },
  ant1: {
    name: 'VHF Whip Antenna — 2',
    category: 'Communications',
    status: 'Active',
    description: 'Secondary deployable VHF monopole whip antenna. Provides cross-polarisation diversity with antenna 1, improving ground contact reliability and link margin during high-elevation passes.',
    specs: [
      { label: 'Frequency',    value: '145 MHz (VHF)' },
      { label: 'Polarisation', value: 'Cross-pol to Ant-1' },
      { label: 'Gain',         value: '2.15 dBi' },
      { label: 'Link margin',  value: '+4 dB diversity gain' },
    ],
  },
  thr0: {
    name: 'Cold Gas Thruster — 1',
    category: 'Propulsion',
    status: 'Phase 3',
    description: 'Miniaturised cold gas thruster for orbital manoeuvring and fine attitude control. Uses nitrogen or CO₂ as propellant. Enables controlled orbit raising, station-keeping, and de-orbit manoeuvres required for responsible end-of-life disposal.',
    specs: [
      { label: 'Thrust',       value: '10–50 mN' },
      { label: 'Isp',          value: '~60s (N₂)' },
      { label: 'Propellant',   value: 'Cold gas N₂' },
      { label: 'ΔV budget',    value: '~15 m/s total' },
    ],
  },
  thr1: {
    name: 'Cold Gas Thruster — 2',
    category: 'Propulsion',
    status: 'Phase 3',
    description: 'Secondary cold gas thruster, symmetric pair with thruster 1. Together the pair provides pure-couple torque capability for yaw control without translational disturbance, enabling precise attitude manoeuvres.',
    specs: [
      { label: 'Configuration','value': 'Symmetric pair' },
      { label: 'Control mode', value: 'Pure-couple yaw' },
      { label: 'Valve type',   value: 'Solenoid, normally-closed' },
      { label: 'Response',     value: '<5ms opening time' },
    ],
  },
  thr2: {
    name: 'De-orbit Thruster',
    category: 'Propulsion',
    status: 'Phase 3',
    description: 'Dedicated de-orbit thruster aligned with the -Z axis for retrograde burns. Ensures compliance with the 25-year de-orbit rule for LEO operations. The IkirereMesh coordination system plans and schedules de-orbit manoeuvres autonomously.',
    specs: [
      { label: 'Alignment',    value: '-Z (retrograde)' },
      { label: 'Purpose',      value: 'Compliance de-orbit' },
      { label: 'Orbit life',   value: '<25yr post-mission' },
      { label: 'Automation',   value: 'IkirereMesh scheduled' },
    ],
  },
  sep0: {
    name: '1U Interface Ring — Lower',
    category: 'Structure',
    status: 'Structural',
    description: 'Lower 1U/2U interface separation ring. Provides the mechanical boundary between the lower and middle units of the 3U stack. Includes alignment features for payload bay integration and PCB stack mounting rails.',
    specs: [
      { label: 'Location',     value: 'Z = −113mm' },
      { label: 'Material',     value: 'Al 6061-T6' },
      { label: 'Interface',    value: 'PC/104 compatible' },
      { label: 'Function',     value: 'Payload bay boundary' },
    ],
  },
  sep1: {
    name: '1U Interface Ring — Upper',
    category: 'Structure',
    status: 'Structural',
    description: 'Upper 2U/3U interface separation ring. Separates the avionics bay from the communication and ADCS subsystem bay. Provides thermal isolation between power-intensive subsystems and temperature-sensitive electronics.',
    specs: [
      { label: 'Location',     value: 'Z = +113mm' },
      { label: 'Material',     value: 'Al 6061-T6' },
      { label: 'Interface',    value: 'Avionics / ADCS boundary' },
      { label: 'Function',     value: 'Thermal + structural separation' },
    ],
  },
}

// ── Category colours ──────────────────────────────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  Structure:      '#64748b',
  Power:          '#C8860A',
  Communications: '#1E5FA8',
  ADCS:           '#0A2463',
  Propulsion:     '#22c55e',
}

// ── Materials ─────────────────────────────────────────────────────────────────
const bodyMat  = new THREE.MeshStandardMaterial({ color: '#e5e4e2', roughness: 0.50, metalness: 0.0 })
const aluMat   = new THREE.MeshStandardMaterial({ color: '#a6a6a8', roughness: 0.18, metalness: 1.0 })
const steelMat = new THREE.MeshStandardMaterial({ color: '#9a9a9c', roughness: 0.10, metalness: 1.0 })
const darkMat  = new THREE.MeshStandardMaterial({ color: '#080808', roughness: 0.60, metalness: 0.0 })
const solarMat = new THREE.MeshStandardMaterial({ color: '#b04d06', roughness: 0.20, metalness: 0.0 })

// Highlight material for selected part
const highlightMat = new THREE.MeshStandardMaterial({
  color: '#ffffff',
  roughness: 0.15,
  metalness: 0.1,
  emissive: new THREE.Color('#1E5FA8'),
  emissiveIntensity: 0.45,
})

function getMatFor(id: string, selected: string | null, base: THREE.Material) {
  return id === selected ? highlightMat : base
}

// ── Exploded offsets ──────────────────────────────────────────────────────────
const EXPLODE_OFFSETS: Record<string, [number, number, number]> = {
  panelL: [0.60, 0,    0   ],
  panelR: [-0.60,0,    0   ],
  ant0:   [0.10, 0.38, 0   ],
  ant1:   [-0.10,0.38, 0   ],
  patch:  [0,    0.32,-0.05],
  dome:   [0.14, 0.32, 0   ],
  thr0:   [0.10,-0.38, 0.08],
  thr1:   [-0.10,-0.38,0.08],
  thr2:   [0,   -0.38,-0.08],
  sep0:   [0,   -0.18, 0   ],
  sep1:   [0,    0.18, 0   ],
}

function usePart(id: string, base: [number, number, number], exploded: boolean) {
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AM = animated('mesh' as any) as any

// ── Label in 3D space (only visible when exploded) ────────────────────────────
function PartLabel({ id, position, exploded, selected, onSelect }:
  { id: string; position: any; exploded: boolean; selected: string | null; onSelect: (id: string) => void }
) {
  const comp = COMPONENTS[id]
  if (!comp || !exploded) return null
  return (
    <AM position={position}>
      <Html
        center
        style={{ pointerEvents: 'none', whiteSpace: 'nowrap', userSelect: 'none' }}
        distanceFactor={2.2}
      >
        <div
          onClick={() => onSelect(id)}
          style={{
            background: id === selected ? 'rgba(30,95,168,0.92)' : 'rgba(10,14,26,0.82)',
            color: '#fff',
            fontSize: '9px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            padding: '3px 8px',
            borderRadius: '3px',
            border: `1px solid ${id === selected ? '#1E5FA8' : 'rgba(255,255,255,0.12)'}`,
            pointerEvents: 'all',
            cursor: 'pointer',
            backdropFilter: 'blur(4px)',
            transition: 'background 0.2s',
          }}
        >
          {comp.name}
        </div>
      </Html>
    </AM>
  )
}

// ── Satellite mesh ─────────────────────────────────────────────────────────────
function Satellite({
  exploded,
  selected,
  onSelect,
}: {
  exploded: boolean
  selected: string | null
  onSelect: (id: string | null) => void
}) {
  const group = useRef<THREE.Group>(null)
  const isDragging = useRef(false)
  const autoRotate = useRef(true)

  useFrame((_, delta) => {
    if (!group.current || !autoRotate.current || isDragging.current) return
    group.current.rotation.y += delta * 0.14
  })

  const BX = 0.10, BZ = 0.34, BY = 0.10
  const PW = 0.22, PH = BZ, PT = 0.006
  const PX = BX / 2 + PT / 2

  const posL    = usePart('panelL', [PX,  0, 0], exploded)
  const posR    = usePart('panelR', [-PX, 0, 0], exploded)
  const posA0   = usePart('ant0',   [0.036,  BZ/2+0.046,  0.036], exploded)
  const posA1   = usePart('ant1',   [-0.036, BZ/2+0.046,  0.036], exploded)
  const posPatch= usePart('patch',  [-0.018, BZ/2+0.003,  0.010], exploded)
  const posDome = usePart('dome',   [0.015,  BZ/2+0.005, -0.012], exploded)
  const posT0   = usePart('thr0',   [0.022,  -BZ/2-0.009,  0.018], exploded)
  const posT1   = usePart('thr1',   [-0.022, -BZ/2-0.009,  0.018], exploded)
  const posT2   = usePart('thr2',   [0,      -BZ/2-0.009, -0.022], exploded)
  const posS0   = usePart('sep0',   [0, -BZ/6, 0], exploded)
  const posS1   = usePart('sep1',   [0,  BZ/6, 0], exploded)

  const click = (id: string) => (e: any) => {
    e.stopPropagation()
    autoRotate.current = false
    setTimeout(() => { autoRotate.current = true }, 3000)
    onSelect(selected === id ? null : id)
  }

  return (
    <group
      ref={group}
      rotation={[-0.06, 0.4, 0]}
      onPointerDown={() => { isDragging.current = true }}
      onPointerUp={() => { setTimeout(() => { isDragging.current = false }, 80) }}
      onPointerMissed={() => onSelect(null)}
    >
      {/* Body */}
      <mesh material={getMatFor('body', selected, bodyMat)} castShadow receiveShadow onClick={click('body')}>
        <boxGeometry args={[BX, BZ, BY]} />
      </mesh>

      {/* Separation rings */}
      <AM position={posS0} material={getMatFor('sep0', selected, aluMat)} onClick={click('sep0')} castShadow>
        <boxGeometry args={[BX+0.001, 0.0018, BY+0.001]} />
      </AM>
      <AM position={posS1} material={getMatFor('sep1', selected, aluMat)} onClick={click('sep1')} castShadow>
        <boxGeometry args={[BX+0.001, 0.0018, BY+0.001]} />
      </AM>

      {/* Solar panels */}
      <AM position={posL} material={getMatFor('panelL', selected, solarMat)} castShadow onClick={click('panelL')}>
        <boxGeometry args={[PT, PH, PW]} />
      </AM>
      <AM position={posR} material={getMatFor('panelR', selected, solarMat)} castShadow onClick={click('panelR')}>
        <boxGeometry args={[PT, PH, PW]} />
      </AM>

      {/* Panel frame edges — not interactive */}
      {[-1, 1].map(sign => [-1, 1].map(tb => (
        <mesh key={`fe${sign}${tb}`} position={[sign*PX, tb*(PH/2+0.003), 0]} material={aluMat}>
          <boxGeometry args={[PT+0.002, 0.005, PW+0.002]} />
        </mesh>
      )))}

      {/* Antennas */}
      <AM position={posA0} material={getMatFor('ant0', selected, darkMat)} onClick={click('ant0')}>
        <cylinderGeometry args={[0.0009, 0.0009, 0.092, 6]} />
      </AM>
      <AM position={posA1} material={getMatFor('ant1', selected, darkMat)} onClick={click('ant1')}>
        <cylinderGeometry args={[0.0009, 0.0009, 0.092, 6]} />
      </AM>

      {/* Top components */}
      <AM position={posPatch} material={getMatFor('patch', selected, aluMat)} castShadow onClick={click('patch')}>
        <boxGeometry args={[0.028, 0.005, 0.028]} />
      </AM>
      <AM position={posDome} material={getMatFor('dome', selected, darkMat)} onClick={click('dome')}>
        <cylinderGeometry args={[0.010, 0.010, 0.010, 10]} />
      </AM>

      {/* Thrusters */}
      <AM position={posT0} material={getMatFor('thr0', selected, steelMat)} castShadow onClick={click('thr0')}>
        <coneGeometry args={[0.012, 0.018, 10]} />
      </AM>
      <AM position={posT1} material={getMatFor('thr1', selected, steelMat)} castShadow onClick={click('thr1')}>
        <coneGeometry args={[0.012, 0.018, 10]} />
      </AM>
      <AM position={posT2} material={getMatFor('thr2', selected, steelMat)} castShadow onClick={click('thr2')}>
        <coneGeometry args={[0.012, 0.018, 10]} />
      </AM>

      {/* 3D floating labels when exploded */}
      {Object.keys(EXPLODE_OFFSETS).map(id => {
        const posMap: Record<string, any> = {
          panelL: posL, panelR: posR, ant0: posA0, ant1: posA1,
          patch: posPatch, dome: posDome,
          thr0: posT0, thr1: posT1, thr2: posT2,
          sep0: posS0, sep1: posS1,
        }
        return (
          <PartLabel
            key={id}
            id={id}
            position={posMap[id]}
            exploded={exploded}
            selected={selected}
            onSelect={onSelect}
          />
        )
      })}
    </group>
  )
}

// ── Camera reset helper ───────────────────────────────────────────────────────
function CameraReset({ trigger }: { trigger: number }) {
  const { camera } = useThree()
  useEffect(() => {
    if (trigger === 0) return
    // Smoothly lerp back to default position
    const target = new THREE.Vector3(0.55, 0.14, 0.95)
    const start  = camera.position.clone()
    let t = 0
    const anim = () => {
      t += 0.04
      camera.position.lerpVectors(start, target, Math.min(t, 1))
      camera.lookAt(0, 0, 0)
      if (t < 1) requestAnimationFrame(anim)
    }
    requestAnimationFrame(anim)
  }, [trigger, camera])
  return null
}

// ── Detail panel ───────────────────────────────────────────────────────────────
function DetailPanel({ id, onClose }: { id: string; onClose: () => void }) {
  const comp = COMPONENTS[id]
  if (!comp) return null
  const catColor = CAT_COLOR[comp.category] ?? '#64748b'

  return (
    <div style={{
      position: 'absolute', top: '50%', left: '24px',
      transform: 'translateY(-50%)',
      width: '300px',
      background: 'rgba(255,255,255,0.96)',
      backdropFilter: 'blur(12px)',
      border: '1px solid #e2e8f0',
      borderRadius: '10px',
      boxShadow: '0 8px 32px rgba(10,36,99,0.12)',
      overflow: 'hidden',
      animation: 'panelIn 0.25s cubic-bezier(0.2,0,0,1) both',
      zIndex: 10,
    }}>
      {/* Header bar */}
      <div style={{ padding: '14px 16px 12px', borderBottom: '1px solid #e2e8f0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{
            fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em',
            textTransform: 'uppercase', color: catColor,
            background: `${catColor}15`,
            padding: '2px 8px', borderRadius: '100px',
          }}>
            {comp.category}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#94a3b8', fontSize: '16px', lineHeight: 1,
              padding: '0 2px',
            }}
          >×</button>
        </div>
        <p style={{ fontSize: '15px', fontWeight: 600, color: '#111827', letterSpacing: '-0.01em', margin: 0 }}>
          {comp.name}
        </p>
        <p style={{ fontSize: '10px', color: catColor, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginTop: '3px' }}>
          {comp.status}
        </p>
      </div>

      {/* Description */}
      <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
        <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: '1.7', margin: 0 }}>
          {comp.description}
        </p>
      </div>

      {/* Specs table */}
      <div style={{ padding: '10px 16px 14px' }}>
        <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px', marginTop: 0 }}>
          Specifications
        </p>
        {comp.specs.map(s => (
          <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 0', borderBottom: '1px solid #f8fafc' }}>
            <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500 }}>{s.label}</span>
            <span style={{ fontSize: '11px', color: '#111827', fontWeight: 600, textAlign: 'right', maxWidth: '170px' }}>{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Toolbar ────────────────────────────────────────────────────────────────────
function Toolbar({
  exploded, onExplode, onReset, selected,
}: {
  exploded: boolean
  onExplode: () => void
  onReset: () => void
  selected: string | null
}) {
  return (
    <div style={{
      position: 'absolute', bottom: '28px', left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex', alignItems: 'center', gap: '8px',
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(10px)',
      border: '1px solid #e2e8f0',
      borderRadius: '100px',
      padding: '6px 10px',
      boxShadow: '0 4px 16px rgba(10,36,99,0.10)',
      zIndex: 10,
    }}>
      <button onClick={onExplode} style={{
        background: exploded ? '#0A2463' : 'transparent',
        color: exploded ? '#fff' : '#0A2463',
        border: '1px solid',
        borderColor: exploded ? '#0A2463' : 'rgba(10,36,99,0.25)',
        borderRadius: '100px',
        padding: '5px 16px',
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
        textTransform: 'uppercase', cursor: 'pointer',
        transition: 'all 0.2s',
      }}>
        {exploded ? 'Assemble' : 'Disassemble'}
      </button>

      <div style={{ width: '1px', height: '16px', background: '#e2e8f0' }} />

      <button onClick={onReset} style={{
        background: 'transparent', color: '#64748b',
        border: 'none', borderRadius: '100px',
        padding: '5px 12px',
        fontSize: '11px', fontWeight: 500, cursor: 'pointer',
        letterSpacing: '0.04em', textTransform: 'uppercase',
      }}>
        Reset view
      </button>

      {selected && (
        <>
          <div style={{ width: '1px', height: '16px', background: '#e2e8f0' }} />
          <span style={{ fontSize: '11px', color: '#1E5FA8', fontWeight: 600, padding: '0 6px', letterSpacing: '0.04em' }}>
            ← {COMPONENTS[selected]?.name}
          </span>
        </>
      )}
    </div>
  )
}

// ── Hint ───────────────────────────────────────────────────────────────────────
function HintBar({ dismissed, onDismiss }: { dismissed: boolean; onDismiss: () => void }) {
  if (dismissed) return null
  return (
    <div
      onClick={onDismiss}
      style={{
        position: 'absolute', top: '20px', left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(10,14,26,0.75)',
        backdropFilter: 'blur(8px)',
        color: 'rgba(255,255,255,0.7)',
        fontSize: '11px', fontWeight: 500,
        padding: '7px 18px', borderRadius: '100px',
        letterSpacing: '0.05em',
        cursor: 'pointer',
        zIndex: 10,
        whiteSpace: 'nowrap',
      }}>
      Drag to orbit · Click any part to inspect · Double-click to disassemble
    </div>
  )
}

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Hardware() {
  const [exploded, setExploded]   = useState(false)
  const [selected, setSelected]   = useState<string | null>(null)
  const [resetTrigger, setReset]  = useState(0)
  const [hintDismissed, setHint]  = useState(false)

  const handleDoubleClick = useCallback(() => {
    setExploded(e => !e)
    setHint(true)
  }, [])

  const handleReset = useCallback(() => {
    setReset(n => n + 1)
    setSelected(null)
  }, [])

  return (
    <div style={{ position: 'relative', width: '100%', height: 'calc(100vh - 64px)', overflow: 'hidden', background: '#faf9f7' }}>

      {/* Page title — top left */}
      <div style={{
        position: 'absolute', top: '24px', left: '24px', zIndex: 10,
        pointerEvents: 'none',
      }}>
        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#94a3b8', margin: 0 }}>
          Hardware
        </p>
        <p style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em', color: '#111827', margin: '2px 0 0' }}>
          IOLA 3U CubeSat
        </p>
      </div>

      {/* Component count — top right */}
      <div style={{
        position: 'absolute', top: '24px', right: '24px', zIndex: 10,
        pointerEvents: 'none', textAlign: 'right',
      }}>
        <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', margin: 0 }}>
          {Object.keys(COMPONENTS).length} components
        </p>
        <p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0', letterSpacing: '0.02em' }}>
          Phase 3 hardware
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0.55, 0.14, 0.95], fov: 44, near: 0.01, far: 30 }}
        onDoubleClick={handleDoubleClick}
        gl={{
          antialias: true,
          powerPreference: 'default',
          failIfMajorPerformanceCaveat: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.12,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        style={{ background: '#faf9f7' }}
      >
        <OrbitControls
          enableZoom
          minDistance={0.4}
          maxDistance={3.5}
          enablePan={false}
          dampingFactor={0.08}
          enableDamping
        />

        <ambientLight intensity={0.60} />
        <directionalLight
          position={[-1.2, 1.8, -1.0]} intensity={2.6} color="#f9f0e4"
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-camera-near={0.1} shadow-camera-far={10}
          shadow-camera-left={-1} shadow-camera-right={1}
          shadow-camera-top={1} shadow-camera-bottom={-1}
          shadow-radius={10} shadow-bias={-0.001}
        />
        <directionalLight position={[1.5, 0.5, -0.8]} intensity={0.8} color="#eef2ff" />
        <directionalLight position={[0.5, 1.0, 1.8]} intensity={1.0} color="#f0f4ff" />
        <pointLight position={[0.8, -0.5, 0.5]} intensity={0.3} color="#c8860a" />

        <Satellite exploded={exploded} selected={selected} onSelect={setSelected} />

        {/* Shadow catcher */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.28, 0]} receiveShadow>
          <planeGeometry args={[6, 6]} />
          <shadowMaterial transparent opacity={0.15} />
        </mesh>

        <CameraReset trigger={resetTrigger} />
      </Canvas>

      {/* Overlays */}
      <HintBar dismissed={hintDismissed} onDismiss={() => setHint(true)} />

      {selected && (
        <DetailPanel id={selected} onClose={() => setSelected(null)} />
      )}

      <Toolbar
        exploded={exploded}
        onExplode={() => setExploded(e => !e)}
        onReset={handleReset}
        selected={selected}
      />

      {/* Panel slide-in animation */}
      <style>{`
        @keyframes panelIn {
          from { opacity: 0; transform: translateY(-50%) translateX(-16px); }
          to   { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
      `}</style>
    </div>
  )
}
