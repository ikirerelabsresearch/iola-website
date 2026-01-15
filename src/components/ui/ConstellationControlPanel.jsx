import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getConstellationColor } from '../3d/Constellation'

function ConstellationStats({ config }) {
    const { satelliteCount, zombieCount, altitude, inclination } = config
    const totalSats = satelliteCount + zombieCount
    const health = ((satelliteCount / totalSats) * 100).toFixed(1)

    // Mock calculations for "physics-based" metrics
    const type = altitude < 1.0 ? 'LEO' : altitude < 3.0 ? 'MEO' : 'GEO'
    const capacity = (satelliteCount * 12.5).toFixed(1) // Gbps per sat
    const coverage = Math.min((satelliteCount * (altitude * 2)) / 50, 99.9).toFixed(1)

    return (
        <div className="grid grid-cols-2 gap-2 mt-3 mb-3 p-2 bg-black/20 rounded-lg border border-white/5">
            <div className="text-center">
                <div className="text-[9px] text-white/40 font-mono tracking-widest">NETWORK HEALTH</div>
                <div className={`font-mono text-xs ${Number(health) > 90 ? 'text-teal' : 'text-red-400'}`}>
                    {health}% OPERATIONAL
                </div>
            </div>
            <div className="text-center">
                <div className="text-[9px] text-white/40 font-mono tracking-widest">EST. CAPACITY</div>
                <div className="font-mono text-xs text-white/80">{capacity} Tbps</div>
            </div>
            <div className="text-center">
                <div className="text-[9px] text-white/40 font-mono tracking-widest">ORBIT TYPE</div>
                <div className="font-mono text-xs text-white/80">{type} / {(inclination * 57.3).toFixed(0)}°</div>
            </div>
            <div className="text-center">
                <div className="text-[9px] text-white/40 font-mono tracking-widest">GLOBAL COVERAGE</div>
                <div className="font-mono text-xs text-white/80">{coverage}%</div>
            </div>
        </div>
    )
}

function ConstellationCard({ config, onChange, onRemove, isExpanded, onToggleExpand }) {
    const { id, name, color, satelliteCount, altitude, inclination, speed, coordinated, visible, zombieCount = 0 } = config

    return (
        <div className="border border-white/10 rounded-lg overflow-hidden bg-black/30">
            {/* Header - always visible */}
            <button
                onClick={onToggleExpand}
                className="w-full px-3 py-2.5 flex items-center justify-between hover:bg-white/5 transition-colors"
            >
                <div className="flex items-center gap-2">
                    <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: color }}
                    />
                    <div className="flex flex-col items-start">
                        <span className="text-white/90 text-sm font-medium leading-none mb-0.5">{name}</span>
                        <span className="text-white/40 text-[10px] font-mono leading-none">
                            ID: {id.split('-')[1].toUpperCase()}
                        </span>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {/* Visibility toggle */}
                    <button
                        onClick={(e) => { e.stopPropagation(); onChange({ ...config, visible: !visible }) }}
                        className={`p-1 rounded ${visible ? 'text-white/60' : 'text-white/20'} hover:text-white/80`}
                        title={visible ? 'Hide constellation' : 'Show constellation'}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {visible ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            )}
                        </svg>
                    </button>
                    {/* Expand arrow */}
                    <svg
                        className={`w-4 h-4 text-white/40 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </button>

            {/* Expanded controls */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="px-3 pb-3 pt-1 border-t border-white/5">

                            {/* Constellation Aggregate Stats */}
                            <ConstellationStats config={config} />

                            <div className="space-y-3">
                                {/* Coordination toggle */}
                                <div className="flex items-center justify-between">
                                    <span className="text-white/60 text-xs">Coordinated</span>
                                    <button
                                        onClick={() => onChange({ ...config, coordinated: !coordinated })}
                                        className={`relative w-10 h-5 rounded-full transition-colors ${coordinated ? 'bg-teal/60' : 'bg-white/20'
                                            }`}
                                    >
                                        <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${coordinated ? 'left-5' : 'left-0.5'
                                            }`} />
                                    </button>
                                </div>

                                {/* Satellite count */}
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-white/60">Satellites</span>
                                        <span className="text-white/80 font-mono">{satelliteCount}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={10}
                                        max={1000}
                                        step={10}
                                        value={satelliteCount}
                                        onChange={(e) => onChange({ ...config, satelliteCount: Number(e.target.value) })}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal"
                                    />
                                </div>

                                {/* Altitude */}
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-white/60">Altitude</span>
                                        <span className="text-white/80 font-mono">{(altitude * 400).toFixed(0)} km</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={0.5}
                                        max={5}
                                        step={0.1}
                                        value={altitude}
                                        onChange={(e) => onChange({ ...config, altitude: Number(e.target.value) })}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal"
                                    />
                                </div>

                                {/* Inclination */}
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-white/60">Inclination</span>
                                        <span className="text-white/80 font-mono">{(inclination * 57.3).toFixed(0)}°</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={0.1}
                                        max={Math.PI}
                                        step={0.1}
                                        value={inclination}
                                        onChange={(e) => onChange({ ...config, inclination: Number(e.target.value) })}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal"
                                    />
                                </div>

                                {/* Speed */}
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-white/60">Orbital Speed</span>
                                        <span className="text-white/80 font-mono">{speed.toFixed(1)}x</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={0.1}
                                        max={3}
                                        step={0.1}
                                        value={speed}
                                        onChange={(e) => onChange({ ...config, speed: Number(e.target.value) })}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-teal"
                                    />
                                </div>

                                {/* Zombie satellites */}
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-white/60">Zombie Satellites</span>
                                        <span className="text-red-400/80 font-mono">{zombieCount}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={0}
                                        max={50}
                                        step={1}
                                        value={zombieCount}
                                        onChange={(e) => onChange({ ...config, zombieCount: Number(e.target.value) })}
                                        className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-red-400"
                                    />
                                </div>

                                {/* Remove button */}
                                <button
                                    onClick={() => onRemove(id)}
                                    className="w-full py-1.5 text-xs text-red-400/60 hover:text-red-400 hover:bg-red-400/10 rounded transition-colors"
                                >
                                    Remove Constellation
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default function ConstellationControlPanel({ constellations, onChange, onAdd }) {
    const [expandedId, setExpandedId] = useState(null)

    const handleConstellationChange = (updated) => {
        const newConstellations = constellations.map(c => c.id === updated.id ? updated : c)
        onChange(newConstellations)
    }

    const handleRemove = (id) => {
        onChange(constellations.filter(c => c.id !== id))
    }

    const totalSatellites = constellations.reduce((sum, c) => sum + c.satelliteCount + (c.zombieCount || 0), 0)

    return (
        <div className="absolute top-24 left-6 w-72 z-40">
            <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl overflow-hidden">
                {/* Header */}
                <div className="px-4 py-3 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <span className="text-white/90 font-mono text-sm tracking-wide">CONSTELLATIONS</span>
                        <span className="text-white/40 text-xs font-mono">{totalSatellites} total</span>
                    </div>
                </div>

                {/* Constellation list */}
                <div className="p-3 space-y-2 max-h-[50vh] overflow-y-auto">
                    {constellations.map((config) => (
                        <ConstellationCard
                            key={config.id}
                            config={config}
                            onChange={handleConstellationChange}
                            onRemove={handleRemove}
                            isExpanded={expandedId === config.id}
                            onToggleExpand={() => setExpandedId(expandedId === config.id ? null : config.id)}
                        />
                    ))}

                    {/* Add button */}
                    <button
                        onClick={onAdd}
                        className="w-full py-2 border border-dashed border-white/20 rounded-lg text-white/40 text-sm hover:border-teal/50 hover:text-teal/70 transition-colors flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Constellation
                    </button>
                </div>
            </div>
        </div>
    )
}
