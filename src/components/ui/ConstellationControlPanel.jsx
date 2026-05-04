import { useState } from 'react'
import { getConstellationColor } from '../3d/Constellation'
import { ORBIT_PRESETS, orbitalPeriod, smaFromAlt, apogeeAlt, perigeeAlt } from '../../lib/orbitMath'

// ── Orbit type selector ────────────────────────────────────────────────────────
function OrbitTypeSelector({ config, onChange }) {
    const [open, setOpen] = useState(false)
    const preset = ORBIT_PRESETS[config.orbitPreset] || ORBIT_PRESETS.LEO_MIDLAT

    return (
        <div style={{ marginBottom: 10 }}>
            <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.2em', color: 'rgba(245,247,250,0.35)', textTransform: 'uppercase', marginBottom: 5 }}>Orbit Type</div>
            <button
                onClick={() => setOpen(o => !o)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 10px', background: 'rgba(0,220,255,0.06)', border: '1px solid rgba(0,220,255,0.18)', borderRadius: 7, cursor: 'pointer', fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: '#F5F7FA' }}
            >
                <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <span>{preset.icon}</span>
                    <span style={{ color: config.color }}>{preset.label}</span>
                </span>
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                    <path d="M2 3.5L5 6.5L8 3.5" stroke="rgba(245,247,250,0.4)" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
            </button>

            {open && (
                <div style={{ marginTop: 4, background: 'rgba(2,8,18,0.97)', border: '1px solid rgba(0,220,255,0.15)', borderRadius: 8, overflow: 'hidden', maxHeight: 260, overflowY: 'auto' }}>
                    {Object.entries(ORBIT_PRESETS).map(([key, p]) => (
                        <button
                            key={key}
                            onClick={() => { onChange({ ...config, orbitPreset: key }); setOpen(false) }}
                            style={{
                                width: '100%', textAlign: 'left', padding: '7px 10px',
                                background: config.orbitPreset === key ? 'rgba(0,220,255,0.1)' : 'transparent',
                                border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)',
                                cursor: 'pointer', display: 'flex', alignItems: 'flex-start', gap: 8,
                            }}
                        >
                            <span style={{ fontSize: 12, flexShrink: 0, marginTop: 1 }}>{p.icon}</span>
                            <div>
                                <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: config.orbitPreset === key ? '#00DCFF' : '#F5F7FA', marginBottom: 2 }}>{p.label}</div>
                                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 9, color: 'rgba(245,247,250,0.4)', lineHeight: 1.4 }}>{p.description}</div>
                            </div>
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

// ── Orbit stats display ────────────────────────────────────────────────────────
function OrbitStats({ config }) {
    const preset = ORBIT_PRESETS[config.orbitPreset] || ORBIT_PRESETS.LEO_MIDLAT
    const alt    = config.altitudeKm    ?? preset.altitudeKm    ?? 550
    const inc    = config.inclinationDeg ?? preset.inclinationDeg ?? 53
    const ecc    = config.eccentricity  ?? preset.eccentricity  ?? 0.0001
    const a      = preset.semiMajorAxisKm ?? smaFromAlt(alt)
    const T      = orbitalPeriod(a)
    const aAlt   = apogeeAlt(a, ecc).toFixed(0)
    const pAlt   = perigeeAlt(a, ecc).toFixed(0)
    const P      = config.planesCount   ?? Math.max(1, Math.ceil(config.satelliteCount / 8))
    const totSats = config.satelliteCount + (config.zombieCount || 0)
    const health = ((config.satelliteCount / totSats) * 100).toFixed(1)

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, marginBottom: 10, background: 'rgba(0,0,0,0.25)', borderRadius: 7, overflow: 'hidden' }}>
            {[
                { l: 'Inclination', v: `${inc.toFixed(1)}°` },
                { l: 'Period',      v: `${(T / 60).toFixed(0)} min` },
                { l: 'Apogee',      v: `${aAlt} km` },
                { l: 'Perigee',     v: `${pAlt} km` },
                { l: 'Planes',      v: `${P}` },
                { l: 'Health',      v: `${health}%`, warn: Number(health) < 90 },
            ].map((m, i) => (
                <div key={i} style={{ padding: '6px 8px', borderBottom: i < 4 ? '1px solid rgba(255,255,255,0.04)' : 'none', borderRight: i % 2 === 0 ? '1px solid rgba(255,255,255,0.04)' : 'none' }}>
                    <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: 'rgba(245,247,250,0.3)', marginBottom: 2 }}>{m.l}</div>
                    <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: m.warn ? '#FF4444' : '#F5F7FA' }}>{m.v}</div>
                </div>
            ))}
        </div>
    )
}

// ── Slider row ─────────────────────────────────────────────────────────────────
function SliderRow({ label, value, min, max, step, unit, onChange, warn = false, color = '#00DCFF' }) {
    return (
        <div style={{ marginBottom: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Roboto Mono', monospace", fontSize: 8, marginBottom: 3 }}>
                <span style={{ color: 'rgba(245,247,250,0.45)' }}>{label}</span>
                <span style={{ color: warn ? '#FF4444' : 'rgba(245,247,250,0.75)' }}>{typeof value === 'number' ? value.toFixed(step < 1 ? 3 : 0) : value}{unit}</span>
            </div>
            <input
                type="range" min={min} max={max} step={step} value={value}
                onChange={e => onChange(Number(e.target.value))}
                style={{ width: '100%', height: 3, accentColor: color, cursor: 'pointer' }}
            />
        </div>
    )
}

// ── Constellation card ─────────────────────────────────────────────────────────
function ConstellationCard({ config, onChange, onRemove, isExpanded, onToggleExpand }) {
    const { id, name, color, coordinated, visible } = config
    const preset = ORBIT_PRESETS[config.orbitPreset] || ORBIT_PRESETS.LEO_MIDLAT
    const hasCustom = config.altitudeKm !== undefined || config.inclinationDeg !== undefined

    return (
        <div style={{ border: `1px solid ${coordinated ? 'rgba(0,220,255,0.25)' : 'rgba(255,255,255,0.08)'}`, borderRadius: 9, overflow: 'hidden', background: 'rgba(0,0,0,0.25)', transition: 'border-color 0.3s' }}>
            {/* Header — div not button so nested buttons are valid HTML */}
            <div
                role="button" tabIndex={0}
                onClick={onToggleExpand}
                onKeyDown={e => e.key === 'Enter' && onToggleExpand()}
                style={{ width: '100%', padding: '9px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: color, boxShadow: coordinated ? `0 0 6px ${color}` : 'none' }} />
                    <div style={{ textAlign: 'left' }}>
                        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: '#F5F7FA', fontWeight: 500, lineHeight: 1, marginBottom: 2 }}>{name}</div>
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: 'rgba(245,247,250,0.35)' }}>{preset.icon} {preset.label}{hasCustom ? ' ·custom' : ''}</div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    {coordinated && (
                        <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 7, color: '#00DCFF', letterSpacing: '0.1em', padding: '2px 6px', background: 'rgba(0,220,255,0.1)', border: '1px solid rgba(0,220,255,0.2)', borderRadius: 4 }}>MESH</div>
                    )}
                    <button
                        onClick={e => { e.stopPropagation(); onChange({ ...config, visible: !visible }) }}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: visible ? 'rgba(245,247,250,0.5)' : 'rgba(245,247,250,0.18)', padding: 2 }}
                    >
                        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                            {visible
                                ? <><circle cx="6.5" cy="6.5" r="2.5" stroke="currentColor" strokeWidth="1.2"/><path d="M1 6.5C2.5 3.5 4.5 2 6.5 2s4 1.5 5.5 4.5c-1.5 3-3.5 4.5-5.5 4.5S2.5 9.5 1 6.5Z" stroke="currentColor" strokeWidth="1.2"/></>
                                : <path d="M1 1l11 11M4 2.5A6.5 4.5 0 0112.5 6.5M8.5 10.5A6.5 4.5 0 011 6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                            }
                        </svg>
                    </button>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" style={{ transform: isExpanded ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s', color: 'rgba(245,247,250,0.3)' }}>
                        <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>

            {/* Expanded controls — scrollable, capped to viewport */}
            {isExpanded && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div
                        className="card-scroll"
                        style={{ maxHeight: 'calc(100vh - 180px)', overflowY: 'auto', padding: '8px 10px 10px' }}
                    >
                        <OrbitTypeSelector config={config} onChange={onChange} />
                        <OrbitStats config={config} />

                        {/* IkirereMesh toggle */}
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 7, padding: '6px 9px', background: 'rgba(0,220,255,0.04)', border: '1px solid rgba(0,220,255,0.1)', borderRadius: 7 }}>
                            <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: 'rgba(245,247,250,0.6)' }}>IkirereMesh Coordination</span>
                            <button
                                onClick={() => onChange({ ...config, coordinated: !coordinated })}
                                style={{ width: 36, height: 18, borderRadius: 9, background: coordinated ? '#00DCFF' : 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s', flexShrink: 0 }}
                            >
                                <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#fff', position: 'absolute', top: 3, left: coordinated ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.3)' }} />
                            </button>
                        </div>

                        <SliderRow label="Satellites"     value={config.satelliteCount}  min={4}      max={200}   step={1}     unit=""    onChange={v => onChange({ ...config, satelliteCount: v })} />
                        <SliderRow label="Orbital Planes" value={config.planesCount ?? Math.max(1, Math.ceil(config.satelliteCount / 8))} min={1} max={24} step={1} unit="" onChange={v => onChange({ ...config, planesCount: v })} />
                        <SliderRow label="RAAN Offset"    value={config.baseRaan ?? 0}    min={0}      max={359}   step={1}     unit="°"   onChange={v => onChange({ ...config, baseRaan: v })}       color="#FFBF00" />
                        <SliderRow label="Inclination"    value={config.inclinationDeg ?? (ORBIT_PRESETS[config.orbitPreset]?.inclinationDeg ?? 53)} min={0} max={180} step={0.1} unit="°" onChange={v => onChange({ ...config, inclinationDeg: v })} />
                        <SliderRow label="Altitude"       value={config.altitudeKm ?? (ORBIT_PRESETS[config.orbitPreset]?.altitudeKm ?? 550)} min={200} max={36000} step={10} unit=" km" onChange={v => onChange({ ...config, altitudeKm: v })} color="#2ECC71" />
                        <SliderRow label="Eccentricity"   value={config.eccentricity ?? (ORBIT_PRESETS[config.orbitPreset]?.eccentricity ?? 0.0001)} min={0.0001} max={0.74} step={0.001} unit="" onChange={v => onChange({ ...config, eccentricity: v })} color="#E74C3C" />
                        <SliderRow label="Time Scale"     value={config.speedMultiplier ?? 1} min={0.1} max={20} step={0.1} unit="×" onChange={v => onChange({ ...config, speedMultiplier: v })} color="#9B59B6" />
                        <SliderRow label="Zombie Sats"    value={config.zombieCount ?? 0} min={0} max={30} step={1} unit="" warn={(config.zombieCount ?? 0) > 0} onChange={v => onChange({ ...config, zombieCount: v })} color="#FF4444" />

                        <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                            <button
                                onClick={() => onChange({ ...config, altitudeKm: undefined, inclinationDeg: undefined, eccentricity: undefined, baseRaan: undefined, planesCount: undefined })}
                                style={{ flex: 1, padding: '4px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 5, fontFamily: "'Roboto Mono', monospace", fontSize: 7, color: 'rgba(245,247,250,0.3)', cursor: 'pointer', letterSpacing: '0.06em' }}
                            >RESET DEFAULTS</button>
                            <button
                                onClick={() => onRemove(id)}
                                style={{ flex: 1, padding: '4px', background: 'rgba(255,60,60,0.05)', border: '1px solid rgba(255,60,60,0.15)', borderRadius: 5, fontFamily: "'Roboto Mono', monospace", fontSize: 7, color: 'rgba(255,100,100,0.6)', cursor: 'pointer', letterSpacing: '0.06em' }}
                            >REMOVE</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

// ── Main panel ──────────────────────────────────────────────────────────────────
export default function ConstellationControlPanel({ constellations, onChange, onAdd }) {
    const [expandedId, setExpandedId] = useState(null)

    const handleChange = updated => {
        onChange(constellations.map(c => c.id === updated.id ? updated : c))
    }
    const handleRemove = id => onChange(constellations.filter(c => c.id !== id))

    const totalSats = constellations.reduce((s, c) => s + c.satelliteCount + (c.zombieCount || 0), 0)

    const hasExpanded = expandedId !== null

    return (
        <div style={{
            position: 'absolute', top: 72, left: 20, width: 280, zIndex: 40,
            maxHeight: 'calc(100vh - 80px)',
            display: 'flex', flexDirection: 'column',
        }}>
            <div style={{
                backdropFilter: 'blur(20px)', background: 'rgba(5,13,26,0.9)',
                border: '1px solid rgba(0,220,255,0.12)', borderRadius: 12,
                overflow: 'hidden', display: 'flex', flexDirection: 'column',
                maxHeight: '100%',
            }}>
                {/* Header — always visible */}
                <div style={{ padding: '10px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, letterSpacing: '0.18em', color: 'rgba(245,247,250,0.8)' }}>CONSTELLATIONS</span>
                    <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: 'rgba(245,247,250,0.35)' }}>{totalSats} sats</span>
                </div>

                {/* List — scrolls only when no card is expanded */}
                <div
                    className="const-scroll"
                    style={{
                        padding: '8px', display: 'flex', flexDirection: 'column', gap: 6,
                        overflowY: hasExpanded ? 'visible' : 'auto',
                        flex: 1, minHeight: 0,
                    }}
                >
                    {constellations.map(c => (
                        <ConstellationCard
                            key={c.id}
                            config={c}
                            onChange={handleChange}
                            onRemove={handleRemove}
                            isExpanded={expandedId === c.id}
                            onToggleExpand={() => setExpandedId(expandedId === c.id ? null : c.id)}
                        />
                    ))}

                    {/* Add button — only show when nothing expanded */}
                    {!hasExpanded && (
                        <button
                            onClick={onAdd}
                            style={{ width: '100%', padding: '8px', border: '1px dashed rgba(0,220,255,0.2)', borderRadius: 8, background: 'transparent', fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: 'rgba(0,220,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, letterSpacing: '0.12em', transition: 'all 0.2s', flexShrink: 0 }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,220,255,0.5)'; e.currentTarget.style.color = '#00DCFF' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,220,255,0.2)'; e.currentTarget.style.color = 'rgba(0,220,255,0.5)' }}
                        >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                            ADD CONSTELLATION
                        </button>
                    )}
                </div>

                {/* Add button when expanded — fixed at bottom */}
                {hasExpanded && (
                    <div style={{ padding: '6px 8px', borderTop: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
                        <button
                            onClick={onAdd}
                            style={{ width: '100%', padding: '6px', border: '1px dashed rgba(0,220,255,0.2)', borderRadius: 7, background: 'transparent', fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: 'rgba(0,220,255,0.5)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, letterSpacing: '0.12em' }}
                            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,220,255,0.5)'; e.currentTarget.style.color = '#00DCFF' }}
                            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(0,220,255,0.2)'; e.currentTarget.style.color = 'rgba(0,220,255,0.5)' }}
                        >
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M5 1v8M1 5h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                            ADD CONSTELLATION
                        </button>
                    </div>
                )}
            </div>
            <style>{`
                .const-scroll::-webkit-scrollbar{width:3px}
                .const-scroll::-webkit-scrollbar-track{background:transparent}
                .const-scroll::-webkit-scrollbar-thumb{background:rgba(0,220,255,0.2);border-radius:2px}
                .card-scroll::-webkit-scrollbar{width:3px}
                .card-scroll::-webkit-scrollbar-track{background:transparent}
                .card-scroll::-webkit-scrollbar-thumb{background:rgba(0,220,255,0.15);border-radius:2px}
            `}</style>
        </div>
    )
}
