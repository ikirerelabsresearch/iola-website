import { useEffect, useState, useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// ── Mini CubeSat preview (isolated 3D canvas) ─────────────────────────────────
// Orbit tilt shared by ring and satellite so they're always aligned
const ORBIT_TILT = 0.42 // radians — matches the visual ring tilt

function MiniCubeSat({ color, isZombie }) {
    const panelLRef = useRef()
    const panelRRef = useRef()
    const glowRef = useRef()
    const orbitRef = useRef()
    const satGroupRef = useRef()
    const zombieRotRef = useRef({ z: 0, x: 0 })

    useFrame((state) => {
        const t = state.clock.getElapsedTime()

        if (satGroupRef.current) {
            const r = 1.1
            const angle = t * 0.7
            // Satellite lives in LOCAL space of the tilted group (XZ plane only)
            satGroupRef.current.position.x = Math.cos(angle) * r
            satGroupRef.current.position.y = 0
            satGroupRef.current.position.z = Math.sin(angle) * r
            // Nadir pointing — always face center of ring (0,0,0 in local space)
            satGroupRef.current.lookAt(0, 0, 0)

            if (isZombie) {
                zombieRotRef.current.z += 0.015
                zombieRotRef.current.x += 0.008
                satGroupRef.current.rotation.z = zombieRotRef.current.z
                satGroupRef.current.rotation.x = zombieRotRef.current.x
            }

            if (panelLRef.current) panelLRef.current.rotation.z = Math.sin(t * 0.5) * 0.04
            if (panelRRef.current) panelRRef.current.rotation.z = -Math.sin(t * 0.5) * 0.04
        }

        if (glowRef.current) {
            glowRef.current.material.opacity = 0.3 + Math.sin(t * 2) * 0.15
        }
        if (orbitRef.current) {
            // Dash flows in direction of travel
            orbitRef.current.material.dashOffset = -t * 0.3
        }
    })

    // Orbit ring geometry — flat circle in XZ plane, 64 segments
    const orbitPoints = useMemo(() => {
        const pts = []
        for (let i = 0; i <= 64; i++) pts.push(new THREE.Vector3(Math.cos(i / 64 * Math.PI * 2) * 1.1, 0, Math.sin(i / 64 * Math.PI * 2) * 1.1))
        return pts
    }, [])
    const orbitGeo = useMemo(() => new THREE.BufferGeometry().setFromPoints(orbitPoints), [orbitPoints])

    return (
        <>
            <ambientLight intensity={0.3} />
            <directionalLight position={[3, 4, 3]} intensity={1.8} color="#ffffff" />
            <pointLight position={[-3, -2, -3]} intensity={0.4} color={color} />

            {/* Single tilted group — BOTH ring and satellite share this tilt so they're always aligned */}
            <group rotation={[ORBIT_TILT, 0, 0]}>
                <line ref={orbitRef} geometry={orbitGeo}>
                    <lineDashedMaterial color={color} dashSize={0.12} gapSize={0.06} transparent opacity={0.4} />
                </line>

                {/* Satellite rides on the ring — INSIDE the same tilted group */}
                <group ref={satGroupRef}>
                {/* Main body (3U: tall rectangular) */}
                <mesh castShadow>
                    <boxGeometry args={[0.18, 0.18, 0.52]} />
                    <meshStandardMaterial
                        color={isZombie ? '#2a2a3a' : '#1a2a3a'}
                        metalness={0.8}
                        roughness={0.3}
                        emissive={color}
                        emissiveIntensity={isZombie ? 0.05 : 0.15}
                    />
                </mesh>

                {/* Body edge highlights */}
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(0.18, 0.18, 0.52)]} />
                    <lineBasicMaterial color={color} transparent opacity={isZombie ? 0.2 : 0.6} />
                </lineSegments>

                {/* Left solar panel */}
                <group ref={panelLRef} position={[-0.24, 0, 0.05]}>
                    <mesh>
                        <boxGeometry args={[0.22, 0.01, 0.18]} />
                        <meshStandardMaterial color="#1a3a6a" metalness={0.4} roughness={0.5} emissive="#0a1a3a" emissiveIntensity={0.3} />
                    </mesh>
                    {/* Solar cell grid lines */}
                    <lineSegments>
                        <edgesGeometry args={[new THREE.BoxGeometry(0.22, 0.01, 0.18)]} />
                        <lineBasicMaterial color="#00DCFF" transparent opacity={0.4} />
                    </lineSegments>
                </group>

                {/* Right solar panel */}
                <group ref={panelRRef} position={[0.24, 0, 0.05]}>
                    <mesh>
                        <boxGeometry args={[0.22, 0.01, 0.18]} />
                        <meshStandardMaterial color="#1a3a6a" metalness={0.4} roughness={0.5} emissive="#0a1a3a" emissiveIntensity={0.3} />
                    </mesh>
                    <lineSegments>
                        <edgesGeometry args={[new THREE.BoxGeometry(0.22, 0.01, 0.18)]} />
                        <lineBasicMaterial color="#00DCFF" transparent opacity={0.4} />
                    </lineSegments>
                </group>

                {/* UHF antenna */}
                <mesh position={[0, 0.09, 0.29]}>
                    <cylinderGeometry args={[0.008, 0.008, 0.14, 6]} />
                    <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Camera lens (nadir face) */}
                <mesh position={[0, 0, -0.27]}>
                    <cylinderGeometry args={[0.03, 0.03, 0.04, 16]} />
                    <meshStandardMaterial color="#111111" metalness={0.5} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0, -0.3]}>
                    <sphereGeometry args={[0.022, 12, 12]} />
                    <meshStandardMaterial color="#001a2a" metalness={0.2} roughness={0.1} transparent opacity={0.9} />
                </mesh>

                {/* Status beacon */}
                <mesh ref={glowRef} position={[0, 0.09, 0]}>
                    <sphereGeometry args={[0.025, 8, 8]} />
                    <meshBasicMaterial color={isZombie ? '#ff3333' : color} transparent opacity={0.7} />
                </mesh>
                <pointLight position={[0, 0.09, 0]} color={isZombie ? '#ff3333' : color} intensity={0.3} distance={1} />
                </group>{/* end satGroupRef */}
            </group>{/* end orbit tilt group */}
        </>
    )
}

// ── Streaming system log ──────────────────────────────────────────────────────
function SystemLog({ isZombie, mission }) {
    const [logs, setLogs] = useState([])
    useEffect(() => {
        const msgs = isZombie
            ? ['[ERR] GYRO SYNC LOST', '[ERR] BATTERY CRITICAL', '[ERR] ATTITUDE CONTROL FAIL', '[WARN] PACKET LOSS 89%', '[ERR] THERMAL RUNAWAY', '[ERR] RF LINK DEAD']
            : [`[OK] ADCS NOMINAL`, `[OK] ${mission?.toUpperCase() || 'EO'} PAYLOAD ACTIVE`, '[OK] SOLAR TRACKING', '[OK] RF LINK ESTABLISHED', '[OK] SAFETY SHIELD ACTIVE', '[OK] TELEMETRY STREAMING']
        const interval = setInterval(() => {
            setLogs(p => {
                const ts = new Date().toISOString().split('T')[1].slice(0, 8)
                return [`${ts} ${msgs[Math.floor(Math.random() * msgs.length)]}`, ...p].slice(0, 6)
            })
        }, 1800)
        return () => clearInterval(interval)
    }, [isZombie, mission])
    return (
        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, lineHeight: 1.6, color: isZombie ? 'rgba(255,60,60,0.5)' : 'rgba(0,220,255,0.45)', height: 72, overflow: 'hidden', position: 'relative' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #050D1A 30%, transparent)', pointerEvents: 'none' }} />
            {logs.map((l, i) => <div key={i}>{l}</div>)}
        </div>
    )
}

// ── IkirereMesh algorithm visualizer ─────────────────────────────────────────
function AlgorithmPanel({ coordinated }) {
    const [phase, setPhase] = useState(0)
    const phases = [
        { label: 'GRAPH TOPOLOGY', progress: 1.0, color: '#00DCFF' },
        { label: 'RL POLICY EVAL', progress: coordinated ? 1.0 : 0.3, color: '#FFBF00' },
        { label: 'SAFETY SHIELD', progress: coordinated ? 1.0 : 0.0, color: '#00DCFF' },
        { label: 'MANEUVER PLAN', progress: coordinated ? 1.0 : 0.0, color: '#00DCFF' },
    ]
    useEffect(() => {
        const iv = setInterval(() => setPhase(p => (p + 1) % phases.length), 900)
        return () => clearInterval(iv)
    }, [coordinated])

    return (
        <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,220,255,0.1)', borderRadius: 8, padding: '10px 12px' }}>
            <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: 'rgba(0,220,255,0.5)', textTransform: 'uppercase', marginBottom: 8 }}>
                IkirereMesh · {coordinated ? 'COORDINATING' : 'STANDBY'}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
                {phases.map((p, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: i === phase ? p.color : 'rgba(245,247,250,0.25)', width: 90, flexShrink: 0 }}>{p.label}</div>
                        <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{
                                width: `${p.progress * 100}%`,
                                height: '100%',
                                background: i === phase ? p.color : `${p.color}50`,
                                borderRadius: 2,
                                transition: 'width 0.4s ease',
                                boxShadow: i === phase ? `0 0 4px ${p.color}` : 'none'
                            }} />
                        </div>
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: i === phase ? p.color : 'rgba(245,247,250,0.2)', width: 28, textAlign: 'right' }}>
                            {(p.progress * 100).toFixed(0)}%
                        </div>
                    </div>
                ))}
            </div>
            {coordinated && (
                <div style={{ marginTop: 8, fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: 'rgba(0,220,255,0.4)', display: 'flex', justifyContent: 'space-between' }}>
                    <span>sep: 5.0 km</span>
                    <span>fuel: 95% eff</span>
                    <span>risk: ↓ 0.02</span>
                </div>
            )}
        </div>
    )
}

// ── Telemetry bar ─────────────────────────────────────────────────────────────
function TBar({ label, value, unit, max = 100, color = '#00DCFF', warn = false }) {
    const pct = Math.min((value / max) * 100, 100)
    const barColor = warn ? '#FF4444' : color
    return (
        <div style={{ marginBottom: 7 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Roboto Mono', monospace", fontSize: 9, marginBottom: 3 }}>
                <span style={{ color: 'rgba(245,247,250,0.4)' }}>{label}</span>
                <span style={{ color: warn ? '#FF6644' : 'rgba(245,247,250,0.8)' }}>{typeof value === 'number' ? value.toFixed(1) : value}{unit}</span>
            </div>
            <div style={{ height: 3, background: 'rgba(255,255,255,0.07)', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: 2, boxShadow: `0 0 4px ${barColor}60`, transition: 'width 0.5s ease' }} />
            </div>
        </div>
    )
}

// ── Main panel ────────────────────────────────────────────────────────────────
export default function SatelliteInfoPanel({ satellite, onClose }) {
    const [cmdOpen, setCmdOpen] = useState(false)
    const [cmdInput, setCmdInput] = useState('')
    const [cmdLog, setCmdLog] = useState([])
    const cmdInputRef = useRef()

    // Force position re-render every 500ms so ECI coords update live
    const [, setTick] = useState(0)
    useEffect(() => {
        if (!satellite) return
        const iv = setInterval(() => setTick(t => t + 1), 500)
        return () => clearInterval(iv)
    }, [satellite])

    const handleCmd = (e) => {
        e.preventDefault()
        if (!cmdInput.trim()) return
        const cmd = cmdInput.trim().toUpperCase()
        const responses = {
            'PING':       '→ PONG  latency: 24ms  link: nominal',
            'STATUS':     '→ ALL SYSTEMS NOMINAL  uplink: active',
            'ADCS RESET': '→ ADCS RESET ACKNOWLEDGED  stabilising...',
            'SAFE MODE':  '→ ENTERING SAFE MODE  payload suspended',
            'DOWNLINK':   '→ DOWNLINK SCHEDULED  next pass: 4.2 min',
            'DEPLOY':     '→ PAYLOAD DEPLOY COMMAND QUEUED',
            'REBOOT':     '→ OBC REBOOT SCHEDULED  eta: 90s',
        }
        const reply = responses[cmd] || `→ UNKNOWN COMMAND: ${cmd}  (try PING, STATUS, ADCS RESET, SAFE MODE)`
        const ts = new Date().toISOString().split('T')[1].slice(0, 8)
        setCmdLog(p => [`${ts}  ${reply}`, `${ts}  > ${cmd}`, ...p].slice(0, 8))
        setCmdInput('')
    }

    if (!satellite) return null
    const { designator, model, mission, launchDate, noradId, telemetry = {}, isZombie, position, constellation } = satellite

    // Use the satellite's own Keplerian semi-major axis when available
    const sma_km  = satellite?.a_km ?? 6921            // km (a_km set in buildSatellites)
    const ecc     = satellite?.e ?? 0.0001
    const altKm   = (sma_km * (1 - ecc) - 6371).toFixed(0)   // perigee altitude
    const altApog = (sma_km * (1 + ecc) - 6371).toFixed(0)   // apogee altitude
    const velKmS  = Math.sqrt(398600.4 / sma_km).toFixed(2)   // circular approx
    const period  = (2 * Math.PI * Math.sqrt(sma_km ** 3 / 398600.4) / 60).toFixed(1)
    const ecefX = ((position?.x || 0) * 6371).toFixed(0)
    const ecefY = ((position?.y || 0) * 6371).toFixed(0)
    const ecefZ = ((position?.z || 0) * 6371).toFixed(0)

    const accentColor = isZombie ? '#FF4444' : (constellation?.color || '#00DCFF')

    return (
        <div style={{
            position: 'absolute', top: 72, right: 20, width: 320, zIndex: 40,
            animation: 'slideIn 0.25s ease',
        }}>
            <style>{`
                @keyframes slideIn { from { opacity: 0; transform: translateX(16px); } to { opacity: 1; transform: translateX(0); } }
                @keyframes pulse { 0%,100% { opacity: 0.6; } 50% { opacity: 1; } }
                .sat-scroll::-webkit-scrollbar { width: 3px; }
                .sat-scroll::-webkit-scrollbar-track { background: transparent; }
                .sat-scroll::-webkit-scrollbar-thumb { background: rgba(0,220,255,0.2); border-radius: 2px; }
            `}</style>

            <div style={{
                background: 'rgba(5,13,26,0.96)', backdropFilter: 'blur(20px)',
                border: `1px solid rgba(${isZombie ? '255,68,68' : '0,220,255'},0.2)`,
                borderRadius: 14, overflow: 'hidden',
                boxShadow: `0 8px 40px rgba(0,0,0,0.8), 0 0 0 1px rgba(${isZombie ? '255,68,68' : '0,220,255'},0.08)`,
            }}>
                {/* Top accent line */}
                <div style={{ height: 2, background: `linear-gradient(to right, transparent, ${accentColor}, transparent)` }} />

                {/* Header */}
                <div style={{ padding: '12px 16px 10px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                            <div style={{ width: 6, height: 6, borderRadius: '50%', background: accentColor, boxShadow: `0 0 6px ${accentColor}`, animation: 'pulse 2s ease-in-out infinite' }} />
                            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 14, color: '#F5F7FA', letterSpacing: '0.05em' }}>{designator}</span>
                        </div>
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: 'rgba(245,247,250,0.4)', letterSpacing: '0.08em' }}>
                            {constellation?.name} · {model} · NORAD {noradId}
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                            padding: '3px 10px', borderRadius: 4, fontSize: 9, fontFamily: "'Roboto Mono', monospace",
                            fontWeight: 700, letterSpacing: '0.12em',
                            background: isZombie ? 'rgba(255,68,68,0.15)' : 'rgba(0,220,255,0.12)',
                            border: `1px solid ${accentColor}40`,
                            color: accentColor
                        }}>
                            {isZombie ? 'CRITICAL' : 'NOMINAL'}
                        </div>
                        <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(245,247,250,0.3)', fontSize: 16, lineHeight: 1, padding: 2 }}>✕</button>
                    </div>
                </div>

                <div className="sat-scroll" style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto' }}>

                    {/* Mini 3D preview — explicit dimensions required for embedded Canvas */}
                    <div style={{ height: 140, width: '100%', overflow: 'hidden', background: 'radial-gradient(ellipse at center, rgba(0,20,40,0.9) 0%, rgba(5,13,26,1) 100%)', position: 'relative', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <Canvas
                            camera={{ position: [2.2, 0.8, 2.2], fov: 42 }}
                            gl={{ antialias: true, alpha: true }}
                            style={{ position: 'absolute', inset: 0, width: '100% !important', height: '100% !important', background: 'transparent' }}
                        >
                            <MiniCubeSat color={accentColor} isZombie={isZombie} />
                        </Canvas>
                        {/* Mission badge */}
                        <div style={{ position: 'absolute', bottom: 8, left: 10, fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: `${accentColor}80`, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                            ● {mission || 'EARTH OBSERVATION'}
                        </div>
                        <div style={{ position: 'absolute', top: 8, right: 10, fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: 'rgba(245,247,250,0.25)', letterSpacing: '0.1em' }}>
                            LIVE PREVIEW
                        </div>
                    </div>

                    <div style={{ padding: '12px 16px' }}>

                        {/* Orbital dynamics */}
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.25em', color: 'rgba(245,247,250,0.3)', textTransform: 'uppercase', marginBottom: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 4 }}>
                                <span>Orbital Dynamics</span>
                                <span style={{ color: accentColor, animation: 'pulse 2s infinite' }}>● LIVE</span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, marginBottom: 8 }}>
                                {[
                                    { label: 'PERIGEE', value: altKm,   unit: 'km' },
                                    { label: 'VELOCITY', value: velKmS, unit: 'km/s' },
                                    { label: 'PERIOD',   value: period, unit: 'min' },
                                ].map((m, i) => (
                                    <div key={i} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 6, padding: '6px 8px', textAlign: 'center' }}>
                                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 13, color: accentColor }}>{m.value}</div>
                                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 8, color: 'rgba(245,247,250,0.3)', marginTop: 1 }}>{m.label} · {m.unit}</div>
                                    </div>
                                ))}
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 5, marginBottom: 8 }}>
                                {[
                                    { label: 'INCL', value: `${satellite?.i_rad != null ? (satellite.i_rad * 57.296).toFixed(1) : satellite?.inc != null ? (satellite.inc * 57.296).toFixed(1) : '—'}°` },
                                    { label: 'APOGEE', value: `${altApog} km` },
                                    { label: 'ECC', value: ecc.toFixed(4) },
                                    { label: 'LAUNCHED', value: launchDate },
                                ].map((m, i) => (
                                    <div key={i} style={{ background: 'rgba(0,0,0,0.3)', borderRadius: 6, padding: '5px 8px' }}>
                                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: 'rgba(245,247,250,0.35)', marginBottom: 2 }}>{m.label}</div>
                                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: 'rgba(245,247,250,0.75)' }}>{m.value}</div>
                                    </div>
                                ))}
                            </div>
                            {/* Live ECI position */}
                            <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: 6, padding: '5px 10px', fontFamily: "'Roboto Mono', monospace", fontSize: 9, display: 'flex', justifyContent: 'space-between', color: 'rgba(0,220,255,0.5)' }}>
                                <span>X: {ecefX} km</span>
                                <span>Y: {ecefY} km</span>
                                <span>Z: {ecefZ} km</span>
                            </div>
                        </div>

                        {/* Telemetry */}
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.25em', color: 'rgba(245,247,250,0.3)', textTransform: 'uppercase', marginBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 4 }}>Telemetry</div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
                                <div>
                                    <TBar label="BATTERY" value={telemetry.battery || 0} unit="%" color={isZombie ? '#FF4444' : '#2ECC71'} warn={telemetry.battery < 20} />
                                    <TBar label="FUEL" value={telemetry.fuel || 0} unit="%" color={telemetry.fuel < 20 ? '#FF8C00' : '#7B2CBF'} warn={telemetry.fuel < 15} />
                                    <TBar label="CPU LOAD" value={telemetry.cpuLoad || 0} unit="%" color="#3498DB" max={100} />
                                </div>
                                <div>
                                    <TBar label="SOLAR" value={telemetry.solar || 0} unit="W" max={600} color="#F39C12" />
                                    <TBar label="THERMAL" value={telemetry.temp || 0} unit="°C" max={100} color={isZombie ? '#FF4444' : '#3498DB'} warn={Math.abs(telemetry.temp) > 50} />
                                    <TBar label="DATA RATE" value={telemetry.dataRate || 0} unit=" Mb/s" max={8} color="#00DCFF" />
                                </div>
                            </div>

                            {/* Signal bars */}
                            <div style={{ marginTop: 8 }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Roboto Mono', monospace", fontSize: 9, marginBottom: 4 }}>
                                    <span style={{ color: 'rgba(245,247,250,0.4)' }}>RF SIGNAL</span>
                                    <span style={{ color: isZombie ? '#FF4444' : 'rgba(245,247,250,0.7)' }}>{telemetry.signal?.toFixed(0)} dBm</span>
                                </div>
                                <div style={{ display: 'flex', gap: 3 }}>
                                    {[1,2,3,4,5].map(i => (
                                        <div key={i} style={{ flex: 1, height: 6, borderRadius: 2, background: (telemetry.signal > -100 + i * 10) ? (isZombie ? '#FF4444' : accentColor) : 'rgba(255,255,255,0.08)' }} />
                                    ))}
                                </div>
                            </div>

                            {/* Latency */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: 'rgba(245,247,250,0.4)' }}>
                                <span>LATENCY: <span style={{ color: telemetry.latency > 200 ? '#FF4444' : '#00DCFF' }}>{telemetry.latency?.toFixed(0)} ms</span></span>
                                <span>UPLINK: <span style={{ color: isZombie ? '#FF4444' : '#2ECC71' }}>{isZombie ? 'LOST' : 'ACTIVE'}</span></span>
                            </div>
                        </div>

                        {/* IkirereMesh algorithm panel */}
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.25em', color: 'rgba(245,247,250,0.3)', textTransform: 'uppercase', marginBottom: 8, borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 4 }}>IkirereMesh Engine</div>
                            <AlgorithmPanel coordinated={constellation?.coordinated} />
                        </div>

                        {/* System logs */}
                        <div style={{ marginBottom: 12 }}>
                            <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.25em', color: 'rgba(245,247,250,0.3)', textTransform: 'uppercase', marginBottom: 6, borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 4 }}>System Log</div>
                            <SystemLog isZombie={isZombie} mission={mission} />
                        </div>

                        {/* Command terminal */}
                        {!isZombie && cmdOpen && (
                            <div style={{ marginBottom: 10, background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,220,255,0.15)', borderRadius: 8, overflow: 'hidden' }}>
                                {/* Log output */}
                                <div style={{ padding: '8px 10px', minHeight: 56, maxHeight: 80, overflowY: 'auto', fontFamily: "'Roboto Mono', monospace", fontSize: 9, lineHeight: 1.7, color: 'rgba(0,220,255,0.6)' }}>
                                    {cmdLog.length === 0
                                        ? <span style={{ color: 'rgba(245,247,250,0.2)' }}>try: PING · STATUS · ADCS RESET · SAFE MODE · DOWNLINK</span>
                                        : cmdLog.map((l, i) => (
                                            <div key={i} style={{ color: l.includes('→') ? 'rgba(0,220,255,0.7)' : 'rgba(245,247,250,0.4)' }}>{l}</div>
                                        ))
                                    }
                                </div>
                                {/* Input row */}
                                <form onSubmit={handleCmd} style={{ display: 'flex', borderTop: '1px solid rgba(0,220,255,0.1)' }}>
                                    <span style={{ padding: '6px 8px', fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: 'rgba(0,220,255,0.5)', flexShrink: 0 }}>›</span>
                                    <input
                                        ref={cmdInputRef}
                                        value={cmdInput}
                                        onChange={e => setCmdInput(e.target.value)}
                                        placeholder="enter command…"
                                        autoFocus
                                        style={{ flex: 1, background: 'none', border: 'none', outline: 'none', fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: '#F5F7FA', padding: '6px 0', letterSpacing: '0.05em' }}
                                    />
                                    <button type="submit" style={{ padding: '6px 10px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: 'rgba(0,220,255,0.5)', flexShrink: 0 }}>SEND</button>
                                </form>
                            </div>
                        )}

                        {/* Action buttons */}
                        <div style={{ display: 'flex', gap: 8 }}>
                            <button onClick={onClose} style={{ flex: 1, padding: '8px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 7, fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: 'rgba(245,247,250,0.4)', cursor: 'pointer', letterSpacing: '0.1em', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(245,247,250,0.7)' }}
                                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(245,247,250,0.4)' }}>
                                CLOSE
                            </button>
                            {!isZombie && (
                                <button
                                    onClick={() => setCmdOpen(o => !o)}
                                    style={{ flex: 2, padding: '8px', background: cmdOpen ? `rgba(0,220,255,0.15)` : `rgba(0,220,255,0.06)`, border: `1px solid rgba(0,220,255,${cmdOpen ? '0.4' : '0.18'})`, borderRadius: 7, fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: accentColor, cursor: 'pointer', letterSpacing: '0.1em', transition: 'all 0.2s' }}>
                                    {cmdOpen ? '▲ CLOSE TERMINAL' : '▶ SEND COMMAND'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
