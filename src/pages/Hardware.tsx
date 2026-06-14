import { useRef, useState, useCallback, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import {
  aluMat, darkMat, steelMat, highlightMat,
  AM, DeployablePanel, usePart,
  BODY_X, BODY_Y, BODY_Z,
} from '../components/CubeSatModel'

// ── Component catalogue — sourced from IOLA-H1-RA-0001 v0.5 FRE ──────────────
// All CBE values from Section 13.3 mass budget and subsystem design (Section 10)
// [CBE] = Current Best Estimate pending vendor data per document notation
const COMPONENTS: Record<string, {
  name: string
  category: string
  status: string
  description: string
  specs: { label: string; value: string }[]
}> = {
  body: {
    name: 'Primary Structure — 12U XL Flat Bus',
    category: 'Structure',
    status: 'Phase A',
    description: 'Aluminium alloy primary structure in a flat, shallow bus geometry — the "flying pizza box" described in the Horizon-1 reference architecture. Internal rails compatible with standard CubeSat integration practice. Stiff enough for launch loads and deployment shock; stowed first-mode frequency above 90 Hz (deployer-specific, to be confirmed in Phase A). Flat deployed geometry maximises surface area for solar, thermal, and payload apertures.',
    specs: [
      { label: 'Form factor',     value: '12U XL flat-sat' },
      { label: 'Stowed envelope', value: '226.3 × 226.3 × 366 mm [CBE]' },
      { label: 'Gross volume',    value: '~18.7 L stowed' },
      { label: 'Usable volume',   value: '~15–16 L (after rails, margins)' },
      { label: 'Material',        value: 'Aluminium alloy, primary structure' },
      { label: 'Mass (CBE)',      value: '2.6 kg CBE / 3.1 kg with 20% MGA' },
      { label: 'Bus geometry',    value: 'Flat, not tower; deployed pizza-box shape' },
    ],
  },
  panelL: {
    name: 'Solar Wing — Port',
    category: 'Power',
    status: 'Phase A',
    description: 'Deployable long-edge solar wing, port side. Each wing is simultaneously a power system, structural member, and deployment mechanism — a flight mechanism, not a sheet of solar cells. Layer stack: high-efficiency cells on illuminated side; cover glass; interconnects and flex wiring; composite or aluminium-honeycomb substrate; root bracket and hinge interface; hold-down and release mechanism; deployment stop and latch; harness strain relief. Two wings preferred for balance and to avoid dependence on a single appendage.',
    specs: [
      { label: 'Nominal power',   value: '~45 W per wing BOL [CBE vendor ref]' },
      { label: 'Deployed span',   value: '~908 mm per wing [CBE vendor ref]' },
      { label: 'Configuration',   value: '~3 panels per wing, rigid/semi-rigid' },
      { label: 'Combined BOL',    value: '~90 W wings + ~12 W body strips = ~102 W nominal' },
      { label: 'Orbit-avg power', value: '~40 W (34–46 W range) [CBE]' },
      { label: 'Mass (CBE)',      value: '2.3 kg CBE / 2.8 kg with 20% MGA (both wings)' },
      { label: 'Deployment',      value: 'Deployable hinge line, spring-loaded, one-shot' },
    ],
  },
  panelR: {
    name: 'Solar Wing — Starboard',
    category: 'Power',
    status: 'Phase A',
    description: 'Deployable long-edge solar wing, starboard side. Mirror configuration to the port wing. Wings are sized by the orbit-energy ledger, not aesthetics. The spacecraft generates approximately 63 Wh per orbit (54–73 Wh range), with ~31 Wh discretionary pool after continuous loads of ~20 W. The flat-bus geometry raises aerodynamic disturbance torque and introduces wing flexible-mode interaction with the control loop — a named Phase A ADCS analysis item.',
    specs: [
      { label: 'Nominal power',   value: '~45 W per wing BOL [CBE vendor ref]' },
      { label: 'Deployed span',   value: '~908 mm per wing [CBE vendor ref]' },
      { label: 'Orbit energy',    value: '~63 Wh/orbit baseline [CBE]' },
      { label: 'Discret. pool',   value: '~31 Wh/orbit after housekeeping [CBE]' },
      { label: 'EO scene cost',   value: '0.4 Wh per 90 s collection' },
      { label: 'SAR event cost',  value: '3.3 Wh per 60 s burst (200 W DC)' },
      { label: 'DoD per burst',   value: '~2–3% per SAR event at ≤1.7C [CBE]' },
    ],
  },
  patch: {
    name: 'TT&C and Payload Downlink',
    category: 'Communications',
    status: 'Phase A',
    description: 'Separate command-safe TT&C radio plus high-rate payload downlink radio. The document\'s standing rule: payload experiments must never compromise command safety — command-safe TT&C is independent from the payload downlink layer. X-band transmitters at this class advertise up to ~225 Mbps downlink (vendor ceiling reference, link-budget-unverified for the ground segment; a Phase A item). ITU filing and national licensing required; standard process with 12–24 month lead time.',
    specs: [
      { label: 'TT&C band',       value: 'S-band or UHF (command-safe layer)' },
      { label: 'Downlink band',   value: 'X-band, payload data' },
      { label: 'Ref. rate',       value: '~225 Mbps ceiling [CBE vendor ref]' },
      { label: 'Downlink cost',   value: '3.3 Wh per 8 min pass at 25 W' },
      { label: 'Licensing',       value: 'ITU filing + national auth; 12–24 mo lead' },
      { label: 'Mass (TT&C+Xb)',  value: '1.2 kg CBE / 1.4 kg with 15% MGA' },
      { label: 'Design rule',     value: 'TT&C never shared with experiment path' },
    ],
  },
  dome: {
    name: 'ADCS — Star Tracker & GNSS',
    category: 'ADCS',
    status: 'Phase A',
    description: 'Attitude Determination and Control System comprising star tracker, sun sensors, magnetometer, gyroscopes, reaction wheels, magnetorquers, and a GNSS receiver added in v0.5. The GNSS receiver is required for precision orbit determination (POD) to support SAR image focusing. EO pointing requirement: control ≤0.1°, knowledge ≤0.03° [CBE placeholders, to be derived in Phase A]. The flat-bus geometry raises aerodynamic disturbance torque and flexible-mode interaction — ADCS sizing must cover disturbance torque and structural-mode filtering, not inertia alone (WP-A6).',
    specs: [
      { label: 'Sensors',         value: 'Star tracker, sun sensors, magnetometer, gyros' },
      { label: 'Actuators',       value: 'Reaction wheels + magnetorquers' },
      { label: 'GNSS',            value: 'Receiver added v0.5 for SAR POD' },
      { label: 'EO pointing ctrl',value: '≤0.1° control, ≤0.03° knowledge [CBE]' },
      { label: 'SAR knowledge',   value: 'Arcminute class + GNSS POD [CBE]' },
      { label: 'Mass (CBE)',      value: '2.3 kg CBE / 2.5 kg with 10% MGA' },
      { label: 'Control modes',   value: '3-axis stabilised; autonomous detumble; safe-mode recovery' },
    ],
  },
  ant0: {
    name: 'EPS — Battery System',
    category: 'Power',
    status: 'Phase A',
    description: 'Space-rated lithium-ion battery pack. Sized for payload bursts and eclipse survival. Holds up demonstration-payload bursts at ≤1.7C, ≤5% DoD per event [CBE]. Battery management electronics with state-of-charge telemetry. Thermal protection integrated into the battery bay. The document mandate: do not build custom cells — use flight-proven lithium-ion packs. Reference class: 77–99 Wh packs; 150–200 Wh installed total sized by eclipse load plus worst-case event stack plus 30% capacity margin at EOL.',
    specs: [
      { label: 'Chemistry',       value: 'Space-rated Li-ion, flight-proven packs' },
      { label: 'Capacity target', value: '150–200 Wh installed [CBE]' },
      { label: 'Ref. pack class', value: '77–99 Wh per pack' },
      { label: 'Max C-rate',      value: '≤1.7C per burst event [CBE]' },
      { label: 'DoD per event',   value: '≤5% per SAR/payload burst [CBE]' },
      { label: 'EOL margin',      value: '30% capacity reserve at EOL' },
      { label: 'Mass (CBE)',      value: '1.5 kg CBE / 1.7 kg with 10% MGA' },
    ],
  },
  ant1: {
    name: 'C&DH — Flight Computer',
    category: 'Avionics',
    status: 'Phase A',
    description: 'Command and Data Handling system comprising main flight computer, separate payload processor, and non-volatile onboard storage. Core functions: boot and watchdog; telemetry collection; payload scheduling; onboard storage management; housekeeping commands; fault detection, isolation, and recovery (FDIR). Software design principle from the document: the spacecraft should recover from its own mistakes. Storage target: ≥64 GB non-volatile with headroom for anomaly logs and retry queues [CBE].',
    specs: [
      { label: 'Architecture',    value: 'Main flight computer + payload processor' },
      { label: 'Storage',         value: '≥64 GB non-volatile [CBE]' },
      { label: 'Power (C&DH)',    value: '~4 W continuous [CBE]' },
      { label: 'Mass (CBE)',      value: '0.8 kg CBE / 0.9 kg with 15% MGA' },
      { label: 'FDIR',            value: 'Autonomous fault detection, isolation, recovery' },
      { label: 'Autonomy',        value: 'Safe-mode, routine ops, limited payload autonomy' },
      { label: 'Data bottleneck', value: 'Downlink, not sensor; tasked never streaming' },
    ],
  },
  thr0: {
    name: 'Payload Bay — Multispectral EO',
    category: 'Payload',
    status: 'Baseline — All Units',
    description: 'Multispectral Earth observation imager. Baseline payload on every Horizon-1 flight unit. Reference band set: Blue, Green, Red, Red Edge, Near Infrared — the minimum credible agriculture stack. Purpose: identify crop state over time, detect vegetation change, support drought, flood, and land-use monitoring. COTS instrument class; no physics or engineering barriers; estimated TRL 8–9. Pointing requirement derived in Phase A (placeholder: control ≤0.1°, knowledge ≤0.03°, jitter TBD [CBE]).',
    specs: [
      { label: 'Band set',        value: 'Blue, Green, Red, Red Edge, NIR' },
      { label: 'Application',     value: 'Agriculture, vegetation, land monitoring' },
      { label: 'Estimated TRL',   value: '8–9 (COTS instrument class)' },
      { label: 'Pointing ctrl',   value: '≤0.1° control, ≤0.03° knowledge [CBE]' },
      { label: 'Energy per scene',value: '0.4 Wh per 90 s collection' },
      { label: 'Mass (CBE)',      value: '1.3 kg CBE / 1.5 kg with 15% MGA' },
      { label: 'Status',          value: 'On every flight unit; no descope trigger' },
    ],
  },
  thr1: {
    name: 'Payload Bay — Demonstration (Option S or D)',
    category: 'Payload',
    status: 'Phase A Selection',
    description: 'One demonstration payload, selected at the Phase A gate. Option S: demonstration-grade X-band SAR with a ≥1.0 m² deployable aperture (reflectarray or membrane-array), ~40–80 W average RF, expected NESZ −8 to −11 dB. Option D: 3GPP NTN narrowband messaging (Release 17/18 NB-IoT), patch array under 0.25 m², 10–30 W transmit windows, SDR-based. Current mass closure: Config S ~24.2 kg; Config D ~21.2 kg against a 12U XL ceiling of ~24–26 kg. Unselected option funded as a Horizon-2 engineering study.',
    specs: [
      { label: 'Option S: aperture','value': '≥1.0 m² deployed (physics floor [PHY])' },
      { label: 'Option S: NESZ',  value: '~−8 to −11 dB expected [CBE]; −12 dB stretch' },
      { label: 'Option S: TRL',   value: '~4 estimated (highest risk item)' },
      { label: 'Option D: antenna','value': '<0.25 m² patch array, <2 kg' },
      { label: 'Option D: TRL',   value: '~6–7 estimated' },
      { label: 'Selection timing', value: 'Phase A gate decision' },
      { label: 'MGA applied',     value: '30% mass growth allowance (demo payloads)' },
    ],
  },
  thr2: {
    name: 'Thermal Control System',
    category: 'Thermal',
    status: 'Phase A',
    description: 'Thermal control comprising MLI, conductive paths, radiators, heaters, thermal straps, and phase-change or thermal-capacitor provision for burst payloads. Primary challenge: SAR burst loads of 150–250 W DC dissipated for ≤120 s per collection (quantified in v0.5). Thermal design principle from the document: treat heat as a scheduling and storage problem. Reserve a dedicated radiator face — never share radiator real estate with solar or payload apertures. Inter-collection recovery time is an output of Phase A thermal analysis (WP-A7).',
    specs: [
      { label: 'SAR burst load',  value: '150–250 W DC for ≤120 s per collection' },
      { label: 'SAR energy/burst','value': '2.5–4.2 Wh per 60 s collection [CBE]' },
      { label: 'Steady bus load', value: '15–30 W bus baseline; 30–50 W imaging' },
      { label: 'Radiator rule',   value: 'Dedicated face; never shared with solar/payload' },
      { label: 'Peak management', value: 'Thermal capacitance + scheduling discipline' },
      { label: 'Mass (CBE)',      value: '0.7 kg CBE / 0.8 kg with 20% MGA' },
      { label: 'Phase A WP',      value: 'WP-A7: burst thermal analysis + recovery time' },
    ],
  },
  sep0: {
    name: 'Structure — Deployment & Mechanisms',
    category: 'Structure',
    status: 'Phase A',
    description: 'All deployment mechanisms including solar wing hinges, hold-down and release mechanisms, deployment stops and latches, harness strain relief, and payload aperture deployment geometry. Mechanism count is the dominant infant-mortality driver in this vehicle class. The document\'s standing rule: every deployable adds failure risk. Deployment verification is a Phase D/E gate item. Flat-sat geometry requires discipline: the deployed state only matters if the deployment sequence is reliable.',
    specs: [
      { label: 'Solar wings',     value: '2 wings × ~3 panels; ~908 mm deployed span each [CBE]' },
      { label: 'Hold-down',       value: 'Hold-down and release mechanism per wing' },
      { label: 'Hinge type',      value: 'Deployable hinge line; composite or Al-honeycomb substrate' },
      { label: 'Harness',         value: 'Flex-harness routing with strain relief' },
      { label: 'Mass (CBE)',      value: '2.3 kg CBE / 2.8 kg with 20% MGA (wings + deploy)' },
      { label: 'Risk rank',       value: 'Mechanism count = dominant infant-mortality risk' },
      { label: 'Verification',    value: 'Phase D/E gate item per document' },
    ],
  },
  sep1: {
    name: 'Disposal — Passive Atmospheric Decay',
    category: 'Disposal',
    status: 'Baseline FU1',
    description: 'No propulsion on Flight Unit 1. Disposal is passive atmospheric decay from the 500–550 km SSO baseline. The flat-sat geometry\'s high area-to-mass ratio assists decay. Preliminary decay estimate [CBE]: at ~22 kg and tumble-averaged cross-section of ~0.25–0.45 m², ballistic coefficient is ~22–40 kg/m². Estimated decay lifetime from 550 km: ~4–10 years depending on solar activity; from 500 km, shorter. Satisfies the 25-year guideline with large margin. Compliance verified using DRAMA or DAS in Phase A (WP-A9).',
    specs: [
      { label: 'Propulsion FU1',  value: 'None (passive disposal baseline)' },
      { label: 'Orbit',           value: '500–550 km SSO [CBE]' },
      { label: 'Est. spacecraft mass','value': '~22 kg [CBE]' },
      { label: 'Cross-section',   value: '~0.25–0.45 m² tumble-averaged [CBE]' },
      { label: 'Ballistic coeff.',value: '~22–40 kg/m² [CBE]' },
      { label: 'Decay lifetime',  value: '~4–10 yr from 550 km (solar-activity dependent) [CBE]' },
      { label: 'Compliance',      value: '25-yr rule satisfied with margin; WP-A9 verification' },
    ],
  },
}

// ── Category colours ──────────────────────────────────────────────────────────
const CAT_COLOR: Record<string, string> = {
  Structure:      '#64748b',
  Power:          '#C8860A',
  Communications: '#1E5FA8',
  Avionics:       '#475569',
  ADCS:           '#0A2463',
  Payload:        '#7c3aed',
  Thermal:        '#dc2626',
  Disposal:       '#22c55e',
}

// Materials, AM, AG, PanelSegment, DeployablePanel, usePart — all from CubeSatModel

function getMatFor(id: string, selected: string | null, base: THREE.Material) {
  return id === selected ? highlightMat : base
}

// AM, AG, PanelSegment, DeployablePanel, usePart — imported from CubeSatModel

// ── Per-part callout offset: label sits here, line points back to part ────────
// [dx, dy] in screen-ish HTML space (pixels from part center)
const LABEL_OFFSETS: Record<string, [number, number, string]> = {
  // [x-offset px, y-offset px, anchor side for the pointer line]
  panelL:  [-110,   0,  'right' ],
  panelR:  [ 110,   0,  'left'  ],
  ant0:    [  60, -70,  'bottom'],
  ant1:    [ -60, -70,  'bottom'],
  patch:   [  90, -55,  'bottom'],
  dome:    [ -90, -55,  'bottom'],
  thr0:    [  90,  55,  'top'   ],
  thr1:    [ -90,  55,  'top'   ],
  thr2:    [   0,  80,  'top'   ],
  sep0:    [ 110,  30,  'left'  ],
  sep1:    [ 110, -30,  'left'  ],
}

// ── Callout label — offset pill with pointer line ─────────────────────────────
function PartLabel({ id, position, exploded, selected, onSelect }:
  { id: string; position: any; exploded: boolean; selected: string | null; onSelect: (id: string) => void }
) {
  const comp = COMPONENTS[id]
  const offset = LABEL_OFFSETS[id]
  if (!comp || !exploded || !offset) return null

  const [dx, dy, anchor] = offset
  const isSelected = id === selected
  const catColor = CAT_COLOR[comp.category] ?? '#1E5FA8'

  // Pointer line: from label edge back toward the part center
  // We draw it as an SVG absolutely positioned over the label container
  return (
    <AM position={position}>
      <Html
        center={false}
        style={{ pointerEvents: 'none', overflow: 'visible', userSelect: 'none' }}
        distanceFactor={2.2}
      >
        {/* Outer container — positioned so (0,0) is the part centre */}
        <div style={{ position: 'relative', width: 0, height: 0, overflow: 'visible' }}>

          {/* Pointer line — SVG drawn from origin to label offset */}
          <svg
            style={{
              position: 'absolute',
              overflow: 'visible',
              pointerEvents: 'none',
              left: 0, top: 0,
            }}
            width="1" height="1"
          >
            <line
              x1={0} y1={0}
              x2={dx} y2={dy}
              stroke={isSelected ? catColor : 'rgba(10,36,99,0.35)'}
              strokeWidth={isSelected ? '1.5' : '1'}
              strokeDasharray={isSelected ? 'none' : '4 3'}
            />
            {/* Dot at the part end */}
            <circle cx={0} cy={0} r="2.5" fill={isSelected ? catColor : 'rgba(10,36,99,0.4)'} />
          </svg>

          {/* Label pill — positioned at offset from part */}
          <div
            onClick={() => onSelect(id)}
            style={{
              position: 'absolute',
              left: dx, top: dy,
              transform: anchor === 'right'  ? 'translate(0, -50%)'  :
                         anchor === 'left'   ? 'translate(-100%, -50%)' :
                         anchor === 'bottom' ? 'translate(-50%, 0)' :
                                              'translate(-50%, -100%)',
              background: isSelected
                ? `linear-gradient(135deg, ${catColor}ee, ${catColor}cc)`
                : 'rgba(10,14,26,0.82)',
              color: isSelected ? '#fff' : '#f0f4ff',
              fontSize: '9.5px',
              fontWeight: 600,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              padding: '4px 10px',
              borderRadius: '4px',
              border: `1px solid ${isSelected ? catColor : 'rgba(255,255,255,0.15)'}`,
              pointerEvents: 'all',
              cursor: 'pointer',
              backdropFilter: 'blur(8px)',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s, border-color 0.2s',
              boxShadow: isSelected ? `0 2px 12px ${catColor}44` : '0 1px 4px rgba(0,0,0,0.3)',
            }}
          >
            {comp.name}
          </div>
        </div>
      </Html>
    </AM>
  )
}

// ── Satellite mesh ─────────────────────────────────────────────────────────────
function Satellite({
  exploded,
  deployed,
  selected,
  onSelect,
  rotating,
}: {
  exploded: boolean
  deployed: boolean
  selected: string | null
  onSelect: (id: string | null) => void
  rotating: boolean
}) {
  const group = useRef<THREE.Group>(null)
  const isDragging = useRef(false)

  useFrame((_, delta) => {
    if (!group.current || !rotating || isDragging.current) return
    group.current.rotation.y += delta * 0.14
  })

  // Horizon-1: 400×400×100mm "flying pizza box"
  const BX = BODY_X   // 0.400m
  const BY = BODY_Y   // 0.100m — thin pizza-box edge
  const BZ = BODY_Z   // 0.400m

  // Component positions matched to flat-sat geometry
  // X axis: wing direction, Y axis: face normal (thin), Z axis: depth (400mm)
  const posA0   = usePart('ant0',  [ BX*0.28,  BY/2+0.055,  BZ*0.25], exploded)
  const posA1   = usePart('ant1',  [-BX*0.28,  BY/2+0.055,  BZ*0.25], exploded)
  const posPatch= usePart('patch', [ BX*0.05, -BY/2-0.012,  BZ*0.08], exploded)
  const posDome = usePart('dome',  [-BX*0.18, -BY/2-0.012, -BZ*0.15], exploded)
  const posT0   = usePart('thr0',  [ BX*0.18,  BY/2+0.010,  BZ*0.10], exploded)
  const posT1   = usePart('thr1',  [-BX*0.18,  BY/2+0.010,  BZ*0.10], exploded)
  const posT2   = usePart('thr2',  [0,         0,            0      ], exploded)
  const posS0   = usePart('sep0',  [0,         0,           -BZ/3   ], exploded)
  const posS1   = usePart('sep1',  [0,         0,            BZ/3   ], exploded)

  const click = (id: string) => (e: any) => {
    e.stopPropagation()
    onSelect(selected === id ? null : id)
  }

  // MLI-covered materials for the flat-sat
  const mliMat = new THREE.MeshStandardMaterial({ color: '#c8860a', roughness: 0.08, metalness: 0.85 })
  const radiatorMat = new THREE.MeshStandardMaterial({ color: '#e8e8e8', roughness: 0.72, metalness: 0.0 })
  const solarBodyMat = new THREE.MeshStandardMaterial({ color: '#1a2a5e', roughness: 0.12, metalness: 0.0 })

  return (
    <group
      ref={group}
      rotation={[0.28, 0.55, 0.06]}
      onPointerDown={() => { isDragging.current = true }}
      onPointerUp={() => { setTimeout(() => { isDragging.current = false }, 80) }}
      onPointerMissed={() => onSelect(null)}
    >
      {/* Primary flat bus — 400×400×100mm MLI-wrapped body */}
      <mesh material={getMatFor('body', selected, mliMat)} castShadow receiveShadow onClick={click('body')}>
        <boxGeometry args={[BX, BY, BZ]} />
      </mesh>

      {/* Radiator face: -Z dedicated thermal face (white painted Al) */}
      <mesh position={[0, 0, -BZ/2 - 0.001]} material={radiatorMat}>
        <boxGeometry args={[BX - 0.004, BY - 0.004, 0.002]} />
      </mesh>

      {/* Nadir face: EO instrument window (dark optical) */}
      <mesh position={[0, -BY/2 - 0.001, BZ*0.1]} material={getMatFor('patch', selected, darkMat)} onClick={click('patch')}>
        <boxGeometry args={[0.080, 0.003, 0.090]} />
      </mesh>

      {/* Zenith face: body-mounted solar strips (~12W) */}
      <mesh position={[0, BY/2 + 0.001, 0]} material={solarBodyMat}>
        <boxGeometry args={[BX - 0.008, 0.002, BZ - 0.008]} />
      </mesh>

      {/* Corner rails: structural aluminium */}
      {([
        [ BX/2 - 0.009, 0,  BZ/2 - 0.009] as [number,number,number],
        [-BX/2 + 0.009, 0,  BZ/2 - 0.009] as [number,number,number],
        [ BX/2 - 0.009, 0, -BZ/2 + 0.009] as [number,number,number],
        [-BX/2 + 0.009, 0, -BZ/2 + 0.009] as [number,number,number],
      ]).map((pos, i) => (
        <mesh key={i} position={pos} material={aluMat}>
          <boxGeometry args={[0.012, BY + 0.002, 0.012]} />
        </mesh>
      ))}

      {/* Structural separation joints */}
      <AM position={posS0} material={getMatFor('sep0', selected, aluMat)} onClick={click('sep0')}>
        <boxGeometry args={[BX + 0.001, BY + 0.001, 0.003]} />
      </AM>
      <AM position={posS1} material={getMatFor('sep1', selected, aluMat)} onClick={click('sep1')}>
        <boxGeometry args={[BX + 0.001, BY + 0.001, 0.003]} />
      </AM>

      {/* Deployable solar wings from ±X long edges */}
      <DeployablePanel side={1}  deployed={deployed} exploded={exploded} selected={selected} onSelect={onSelect} />
      <DeployablePanel side={-1} deployed={deployed} exploded={exploded} selected={selected} onSelect={onSelect} />

      {/* TT&C whip antennas on zenith face */}
      <AM position={posA0} material={getMatFor('ant0', selected, steelMat)} onClick={click('ant0')}>
        <cylinderGeometry args={[0.0010, 0.0010, 0.110, 6]} />
      </AM>
      <AM position={posA1} material={getMatFor('ant1', selected, steelMat)} onClick={click('ant1')}>
        <cylinderGeometry args={[0.0010, 0.0010, 0.110, 6]} />
      </AM>

      {/* X-band downlink patch on +Z face */}
      <mesh position={[0, 0, BZ/2 + 0.003]} material={darkMat} onClick={click('ant1')}>
        <boxGeometry args={[0.055, BY * 0.7, 0.004]} />
      </mesh>

      {/* EO lens aperture (Payload A) */}
      <AM position={posDome} material={getMatFor('dome', selected, darkMat)} onClick={click('dome')}>
        <cylinderGeometry args={[0.018, 0.022, 0.024, 12]} />
      </AM>

      {/* ADCS reaction wheels — visible as discs */}
      <AM position={posT0} material={getMatFor('thr0', selected, steelMat)} onClick={click('thr0')}>
        <cylinderGeometry args={[0.028, 0.028, 0.012, 16]} />
      </AM>
      <AM position={posT1} material={getMatFor('thr1', selected, steelMat)} onClick={click('thr1')}>
        <cylinderGeometry args={[0.028, 0.028, 0.012, 16]} />
      </AM>

      {/* Battery pack (EPS) */}
      <AM position={posT2} material={getMatFor('thr2', selected, new THREE.MeshStandardMaterial({ color: '#2a3a5a', roughness: 0.4, metalness: 0.2 }))} onClick={click('thr2')}>
        <boxGeometry args={[BX * 0.55, BY * 0.60, BZ * 0.30]} />
      </AM>

      {/* 3D floating callout labels when exploded */}
      {(['ant0','ant1','patch','dome','thr0','thr1','thr2','sep0','sep1'] as const).map(id => {
        const posMap: Record<string, any> = {
          ant0: posA0, ant1: posA1,
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
    const target = new THREE.Vector3(0.90, 0.70, 2.00)
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
      position: 'fixed',
      top: '64px',
      bottom: '0',
      left: '0',
      width: '320px',
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(12px)',
      borderRight: '1px solid #e2e8f0',
      boxShadow: '4px 0 24px rgba(10,36,99,0.08)',
      display: 'flex',
      flexDirection: 'column',
      animation: 'panelIn 0.2s ease both',
      zIndex: 50,
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

      {/* Scrollable body — description + specs */}
      <div style={{ flex: 1, overflowY: 'auto', minHeight: 0 }}>
        {/* Description */}
        <div style={{ padding: '14px 16px', borderBottom: '1px solid #f1f5f9' }}>
          <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.65', margin: 0 }}>
            {comp.description}
          </p>
        </div>

        {/* Specs table */}
        <div style={{ padding: '10px 16px 16px' }}>
          <p style={{ fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px', marginTop: 0 }}>
            Specifications
          </p>
          {comp.specs.map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '5px 0', borderBottom: '1px solid #f8fafc', gap: '8px' }}>
              <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 500, flexShrink: 0 }}>{s.label}</span>
              <span style={{ fontSize: '11px', color: '#111827', fontWeight: 600, textAlign: 'right' }}>{s.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Toolbar ────────────────────────────────────────────────────────────────────
function Toolbar({
  exploded, onExplode, deployed, onToggleDeploy,
  onReset, selected, rotating, onToggleRotation,
}: {
  exploded: boolean
  onExplode: () => void
  deployed: boolean
  onToggleDeploy: () => void
  onReset: () => void
  selected: string | null
  rotating: boolean
  onToggleRotation: () => void
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

      {/* Deploy / Stow solar panels */}
      <button onClick={onToggleDeploy} style={{
        background: deployed ? 'rgba(200,134,10,0.1)' : 'transparent',
        color: deployed ? '#C8860A' : '#64748b',
        border: '1px solid',
        borderColor: deployed ? 'rgba(200,134,10,0.4)' : 'transparent',
        borderRadius: '100px',
        padding: '5px 14px',
        fontSize: '11px', fontWeight: 600, letterSpacing: '0.06em',
        textTransform: 'uppercase', cursor: 'pointer',
        transition: 'all 0.2s',
        display: 'flex', alignItems: 'center', gap: '5px',
      }}>
        {/* Solar panel icon */}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <rect x="1" y="4" width="10" height="4" rx="0.5"/>
          <line x1="4" y1="4" x2="4" y2="8"/>
          <line x1="8" y1="4" x2="8" y2="8"/>
          <line x1="1" y1="6" x2="11" y2="6"/>
        </svg>
        {deployed ? 'Stow Arrays' : 'Deploy Arrays'}
      </button>

      <div style={{ width: '1px', height: '16px', background: '#e2e8f0' }} />

      {/* Rotation toggle */}
      <button onClick={onToggleRotation} style={{
        background: 'transparent',
        color: rotating ? '#64748b' : '#0A2463',
        border: 'none', borderRadius: '100px',
        padding: '5px 12px',
        fontSize: '11px', fontWeight: 500, cursor: 'pointer',
        letterSpacing: '0.04em', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: '5px',
      }}>
        {/* Simple rotation icon */}
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M10 6A4 4 0 1 1 6 2"/>
          <path d="M10 2v4h-4"/>
        </svg>
        {rotating ? 'Stop' : 'Rotate'}
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
  const [deployed, setDeployed]   = useState(true)   // panels deployed by default
  const [selected, setSelected]   = useState<string | null>(null)
  const [resetTrigger, setReset]  = useState(0)
  const [hintDismissed, setHint]  = useState(false)
  const [rotating, setRotating]   = useState(true)

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
          Hardware · IOLA-H1-RA-0001 v0.5
        </p>
        <p style={{ fontSize: '18px', fontWeight: 600, letterSpacing: '-0.02em', color: '#111827', margin: '2px 0 0' }}>
          Horizon-1 · 12U XL Flat-Sat
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
          Phase 0 / Phase A Architecture Study
        </p>
      </div>

      {/* 3D Canvas */}
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0.90, 0.70, 2.00], fov: 50, near: 0.01, far: 30 }}
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

        <Satellite exploded={exploded} deployed={deployed} selected={selected} onSelect={setSelected} rotating={rotating} />

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
        deployed={deployed}
        onToggleDeploy={() => setDeployed(d => !d)}
        onReset={handleReset}
        selected={selected}
        rotating={rotating}
        onToggleRotation={() => setRotating(r => !r)}
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
