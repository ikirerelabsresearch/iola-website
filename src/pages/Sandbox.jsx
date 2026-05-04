import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useCallback, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import EarthScene from '../components/3d/EarthScene'
import ConstellationControlPanel from '../components/ui/ConstellationControlPanel'
import SatelliteInfoPanel from '../components/ui/SatelliteInfoPanel'
import MusicPlayer from '../components/ui/MusicPlayer'
import { getConstellationColor } from '../components/3d/Constellation'

const TRANSITION_DURATION = 60
const generateId = () => `const-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

const createConstellation = (index) => ({
    id: generateId(),
    name: ['Ikirere Alpha','Beta Network','Gamma Array','Delta Mesh','Epsilon Grid','Zeta Cluster'][index % 6],
    color: getConstellationColor(index),
    satelliteCount: 24 + (index * 8),
    altitude: 1.2 + (index * 0.3),
    inclination: 0.8,
    speed: 0.5,
    coordinated: false,
    visible: true,
    zombieCount: 0
})

// ── Algorithm state mini-feed ──────────────────────────────────────────────────
function AlgorithmFeed({ coordinated }) {
    const [events, setEvents] = useState([])
    useEffect(() => {
        const msgs = coordinated
            ? ['RL policy: trajectory optimized','Safety shield: separation OK','Graph coordinator: updated','Conjunction: 0 alerts','Fuel efficiency: 94.8%']
            : ['Uncoordinated flight detected','Manual mode: no safety shield','High collision probability','No mesh consensus','Risk accumulating...']
        const iv = setInterval(() => {
            setEvents(p => {
                const ts = new Date().toISOString().split('T')[1].slice(0, 8)
                return [`${ts}  ${msgs[Math.floor(Math.random() * msgs.length)]}`, ...p].slice(0, 5)
            })
        }, 2200)
        return () => clearInterval(iv)
    }, [coordinated])
    return (
        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, lineHeight: 1.7, color: coordinated ? 'rgba(0,220,255,0.5)' : 'rgba(255,120,60,0.55)', maxHeight: 90, overflow: 'hidden' }}>
            {events.map((e, i) => <div key={i}>{e}</div>)}
        </div>
    )
}

// ── Risk gauge ─────────────────────────────────────────────────────────────────
function RiskGauge({ risk }) {
    const pct = Math.round(risk * 100)
    const color = risk < 0.2 ? '#00DCFF' : risk < 0.5 ? '#FFBF00' : '#FF4444'
    const arcR = 24
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
            <svg width="64" height="40" viewBox="0 0 64 40">
                <path d="M 8 36 A 24 24 0 0 1 56 36" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" strokeLinecap="round" />
                <path d="M 8 36 A 24 24 0 0 1 56 36" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
                    strokeDasharray={`${(risk * Math.PI * arcR).toFixed(2)} 999`}
                    style={{ transition: 'stroke-dasharray 0.5s ease, stroke 0.5s ease', filter: `drop-shadow(0 0 3px ${color})` }} />
                <text x="32" y="35" textAnchor="middle" fill={color} fontSize="11" fontFamily="Roboto Mono" fontWeight="bold">{pct}</text>
            </svg>
            <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: 'rgba(245,247,250,0.35)', letterSpacing: '0.2em' }}>RISK %</div>
        </div>
    )
}

export default function Sandbox() {
    const [constellations, setConstellations] = useState([createConstellation(0)])
    const [selectedSatellite, setSelectedSatellite] = useState(null)
    const [transitionState, setTransitionState] = useState({ active: false, progress: 0, direction: null, startTime: null })
    const prevCoordinatedRef = useRef({})

    useEffect(() => {
        let changed = false, direction = null
        constellations.forEach(c => {
            if (prevCoordinatedRef.current[c.id] !== undefined && prevCoordinatedRef.current[c.id] !== c.coordinated) {
                changed = true; direction = c.coordinated ? 'coordinating' : 'decoordinating'
            }
            prevCoordinatedRef.current[c.id] = c.coordinated
        })
        if (changed) setTransitionState({ active: true, progress: 0, direction, startTime: Date.now() })
    }, [constellations])

    useEffect(() => {
        if (!transitionState.active) return
        const iv = setInterval(() => {
            const elapsed = (Date.now() - transitionState.startTime) / 1000
            const progress = Math.min(elapsed / TRANSITION_DURATION, 1)
            if (progress >= 1) setTransitionState(p => ({ ...p, active: false, progress: 1 }))
            else setTransitionState(p => ({ ...p, progress }))
        }, 100)
        return () => clearInterval(iv)
    }, [transitionState.active, transitionState.startTime])

    const globalMetrics = useMemo(() => {
        const totalSats = constellations.reduce((s, c) => s + c.satelliteCount + (c.zombieCount || 0), 0)
        const zombieTotal = constellations.reduce((s, c) => s + (c.zombieCount || 0), 0)
        const uncoordinated = constellations.filter(c => !c.coordinated && c.visible).length
        const coordinated = constellations.filter(c => c.coordinated && c.visible).length
        const densityRisk = Math.min(totalSats / 5000, 0.3)
        const zombieRisk = (zombieTotal / Math.max(totalSats, 1)) * 0.4
        const uncoordRisk = (uncoordinated / Math.max(constellations.length, 1)) * 0.25
        return { totalSatellites: totalSats, totalZombies: zombieTotal, constellationCount: constellations.length, coordinated, risk: Math.min(0.02 + densityRisk + zombieRisk + uncoordRisk, 1.0) }
    }, [constellations])

    const handleAddConstellation = useCallback(() => {
        setConstellations(prev => [...prev, createConstellation(prev.length)])
    }, [])

    const handleSelectSatellite = useCallback((satellite) => {
        setSelectedSatellite(satellite)
    }, [])

    const handleCloseSatellitePanel = useCallback(() => {
        setSelectedSatellite(null)
    }, [])

    const riskColor = globalMetrics.risk < 0.2 ? '#00DCFF' : globalMetrics.risk < 0.5 ? '#FFBF00' : '#FF4444'
    const anyCoordinated = constellations.some(c => c.coordinated)

    return (
        <div style={{ position: 'relative', height: '100vh', width: '100%', background: '#020810', overflow: 'hidden' }}>
            <style>{`
                @keyframes blink { 0%,100%{opacity:0.4} 50%{opacity:1} }
                @keyframes fadeInDown { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
                .hud-panel { backdrop-filter: blur(20px); background: rgba(5,13,26,0.85); border: 1px solid rgba(0,220,255,0.12); border-radius: 12px; }
            `}</style>

            {/* ── 3D Canvas ── */}
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: true, powerPreference: 'high-performance' }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <EarthScene
                        constellations={constellations}
                        onSelectSatellite={handleSelectSatellite}
                        selectedSatelliteId={selectedSatellite?.id}
                    />
                </Suspense>
            </Canvas>

            {/* ── TOP BAR: single row left/center/right ── */}
            <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, zIndex: 50,
                height: 60,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 20px',
                background: 'linear-gradient(to bottom, rgba(2,8,16,0.92) 0%, transparent 100%)',
                backdropFilter: 'blur(8px)',
                borderBottom: '1px solid rgba(0,220,255,0.06)',
            }}>
                {/* Left: back + title */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                    <Link to="/" style={{
                        display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0,
                        padding: '6px 12px', background: 'rgba(0,220,255,0.06)',
                        border: '1px solid rgba(0,220,255,0.2)', borderRadius: 7,
                        fontFamily: "'Roboto Mono', monospace", fontSize: 10, letterSpacing: '0.12em',
                        color: 'rgba(0,220,255,0.7)', textDecoration: 'none', transition: 'all 0.2s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = '#00DCFF'; e.currentTarget.style.borderColor = 'rgba(0,220,255,0.45)'; e.currentTarget.style.background = 'rgba(0,220,255,0.1)' }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'rgba(0,220,255,0.7)'; e.currentTarget.style.borderColor = 'rgba(0,220,255,0.2)'; e.currentTarget.style.background = 'rgba(0,220,255,0.06)' }}>
                        <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                        RETURN
                    </Link>
                    <div style={{ borderLeft: '1px solid rgba(255,255,255,0.08)', paddingLeft: 14 }}>
                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 15, letterSpacing: '0.08em', color: '#F5F7FA', lineHeight: 1 }}>
                            COMMAND <span style={{ color: '#00DCFF' }}>CENTER</span>
                        </div>
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.15em', color: 'rgba(245,247,250,0.3)', marginTop: 3 }}>
                            IkirereMesh Orbital Simulation
                        </div>
                    </div>
                </div>

                {/* Center: prototype badge */}
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 7, flexShrink: 0,
                    padding: '5px 14px', background: 'rgba(255,191,0,0.07)',
                    border: '1px solid rgba(255,191,0,0.28)', borderRadius: 100,
                    fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.16em', color: 'rgba(255,191,0,0.75)',
                }}>
                    <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#FFBF00', animation: 'blink 2s ease-in-out infinite', flexShrink: 0 }} />
                    PROTOTYPE · SIMULATED DATA
                </div>

                {/* Right: compact risk + mesh status in top bar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
                    {/* Inline risk indicator */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 12px', background: 'rgba(5,13,26,0.7)', border: `1px solid ${riskColor}30`, borderRadius: 8 }}>
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.15em', color: 'rgba(245,247,250,0.35)' }}>RISK</div>
                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 16, color: riskColor, textShadow: `0 0 8px ${riskColor}60`, lineHeight: 1 }}>
                            {(globalMetrics.risk * 100).toFixed(1)}%
                        </div>
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: riskColor, opacity: 0.8 }}>
                            {globalMetrics.risk < 0.2 ? 'LOW' : globalMetrics.risk < 0.5 ? 'MOD' : 'CRIT'}
                        </div>
                    </div>

                    {/* IkirereMesh status pill */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '6px 12px', background: 'rgba(5,13,26,0.7)', border: `1px solid rgba(0,220,255,0.15)`, borderRadius: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: '50%', background: anyCoordinated ? '#00DCFF' : 'rgba(245,247,250,0.2)', boxShadow: anyCoordinated ? '0 0 6px #00DCFF' : 'none', animation: anyCoordinated ? 'blink 1.5s infinite' : 'none' }} />
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.12em', color: anyCoordinated ? '#00DCFF' : 'rgba(245,247,250,0.3)' }}>
                            {anyCoordinated ? 'MESH ACTIVE' : 'MESH STANDBY'}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── LEFT SIDE: IkirereMesh algorithm panel (below constellation list) ── */}
            <div style={{ position: 'absolute', top: 72, left: 20, width: 280, zIndex: 39, pointerEvents: 'none' }}>
                {/* This is a pass-through container — actual constellation panel renders above it */}
            </div>

            {/* ── BOTTOM CENTER: Global metrics ── */}
            <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 50 }}>
                <div className="hud-panel" style={{ padding: '10px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
                    {[
                        { label: 'SATELLITES', value: globalMetrics.totalSatellites, color: '#F5F7FA' },
                        { label: 'CONSTELLATIONS', value: globalMetrics.constellationCount, color: '#F5F7FA' },
                        { label: 'COORDINATED', value: globalMetrics.coordinated, color: '#00DCFF' },
                        { label: 'ZOMBIES', value: globalMetrics.totalZombies, color: globalMetrics.totalZombies > 0 ? '#FF4444' : 'rgba(245,247,250,0.4)' },
                    ].map((m, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 64 }}>
                            <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: 'rgba(245,247,250,0.35)', marginBottom: 2 }}>{m.label}</div>
                            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 18, color: m.color, lineHeight: 1 }}>{m.value}</div>
                        </div>
                    ))}

                    {transitionState.active && (
                        <>
                            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.08)' }} />
                            <div style={{ minWidth: 130 }}>
                                <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.15em', color: transitionState.direction === 'coordinating' ? '#00DCFF' : '#FFBF00', marginBottom: 4, animation: 'blink 1s infinite' }}>
                                    {transitionState.direction === 'coordinating' ? '● COORDINATING' : '● DISPERSING'}
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                    <div style={{ flex: 1, height: 4, background: 'rgba(255,255,255,0.08)', borderRadius: 2, overflow: 'hidden' }}>
                                        <div style={{ width: `${transitionState.progress * 100}%`, height: '100%', background: 'linear-gradient(to right, #FFBF00, #00DCFF)', borderRadius: 2, transition: 'width 0.1s ease' }} />
                                    </div>
                                    <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: '#FFBF00', minWidth: 24 }}>
                                        {Math.floor((1 - transitionState.progress) * TRANSITION_DURATION)}s
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* ── LEFT BOTTOM: IkirereMesh algorithm panel ── */}
            <div style={{
                position: 'absolute', bottom: 90, left: 20, width: 280, zIndex: 40,
                backdropFilter: 'blur(20px)', background: 'rgba(5,13,26,0.85)',
                border: '1px solid rgba(0,220,255,0.1)', borderRadius: 12,
                padding: '10px 14px',
            }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: 'rgba(0,220,255,0.5)', textTransform: 'uppercase' }}>IkirereMesh Engine</div>
                    <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: anyCoordinated ? '#00DCFF' : 'rgba(245,247,250,0.25)', animation: anyCoordinated ? 'blink 1.5s infinite' : 'none' }}>
                        {anyCoordinated ? '● ACTIVE' : '○ STANDBY'}
                    </div>
                </div>
                {[
                    { label: 'Graph Topology', val: 1.0, color: '#00DCFF' },
                    { label: 'RL Policy Eval', val: anyCoordinated ? 1.0 : 0.0, color: '#FFBF00' },
                    { label: 'Safety Shield', val: anyCoordinated ? 1.0 : 0.0, color: '#00DCFF' },
                    { label: 'Maneuver Plan', val: anyCoordinated ? globalMetrics.coordinated / Math.max(globalMetrics.constellationCount, 1) : 0, color: '#2ECC71' },
                ].map((l, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: 'rgba(245,247,250,0.35)', width: 86, flexShrink: 0 }}>{l.label}</div>
                        <div style={{ flex: 1, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, overflow: 'hidden' }}>
                            <div style={{ width: `${l.val * 100}%`, height: '100%', background: l.color, borderRadius: 2, boxShadow: l.val > 0.5 ? `0 0 4px ${l.color}` : 'none', transition: 'width 0.6s ease' }} />
                        </div>
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: l.val > 0 ? l.color : 'rgba(245,247,250,0.18)', width: 26, textAlign: 'right', flexShrink: 0 }}>{(l.val * 100).toFixed(0)}%</div>
                    </div>
                ))}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 7, marginTop: 4 }}>
                    <AlgorithmFeed coordinated={anyCoordinated} />
                </div>
            </div>

            {/* ── BOTTOM LEFT: Click hint ── */}
            <div style={{ position: 'absolute', bottom: 24, left: 20, zIndex: 50, fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.12em', color: 'rgba(245,247,250,0.18)', lineHeight: 1.8, pointerEvents: 'none' }}>
                <div>CLICK SATELLITE → inspect · TOGGLE MESH → coordinate</div>
                <div>SCROLL TO ZOOM · DRAG TO ROTATE</div>
            </div>

            {/* ── Panels ── */}
            <ConstellationControlPanel
                constellations={constellations}
                onChange={setConstellations}
                onAdd={handleAddConstellation}
            />

            <SatelliteInfoPanel
                satellite={selectedSatellite}
                onClose={handleCloseSatellitePanel}
            />

            <MusicPlayer />
        </div>
    )
}
