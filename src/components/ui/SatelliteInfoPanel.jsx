import { motion, AnimatePresence } from 'framer-motion'

export default function SatelliteInfoPanel({ satellite, onClose }) {
    if (!satellite) return null

    const { id, constellationId, isZombie, position, constellation } = satellite

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-24 right-6 w-72 z-40"
            >
                <div className="backdrop-blur-xl bg-black/60 border border-white/10 rounded-xl overflow-hidden">
                    {/* Header */}
                    <div
                        className="px-4 py-3 border-b border-white/10 flex items-center justify-between"
                        style={{ backgroundColor: `${constellation?.color}15` }}
                    >
                        <div className="flex items-center gap-2">
                            <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: constellation?.color || '#00F0FF' }}
                            />
                            <span className="text-white/90 font-mono text-sm tracking-wide">
                                SATELLITE DATA
                            </span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-white/40 hover:text-white/80 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        {/* ID */}
                        <div>
                            <div className="text-white/40 text-xs font-mono tracking-widest mb-1">IDENTIFIER</div>
                            <div className="text-white font-mono text-sm">{id}</div>
                        </div>

                        {/* Constellation */}
                        <div>
                            <div className="text-white/40 text-xs font-mono tracking-widest mb-1">CONSTELLATION</div>
                            <div className="flex items-center gap-2">
                                <div
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: constellation?.color || '#00F0FF' }}
                                />
                                <span className="text-white font-mono text-sm">{constellation?.name || constellationId}</span>
                            </div>
                        </div>

                        {/* Status */}
                        <div>
                            <div className="text-white/40 text-xs font-mono tracking-widest mb-1">STATUS</div>
                            <div className={`inline-flex items-center gap-2 px-2 py-1 rounded text-xs font-mono ${isZombie
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-emerald-500/20 text-emerald-400'
                                }`}>
                                <div className={`w-1.5 h-1.5 rounded-full ${isZombie ? 'bg-red-400' : 'bg-emerald-400'}`} />
                                {isZombie ? 'ZOMBIE / UNRESPONSIVE' : 'ACTIVE'}
                            </div>
                        </div>

                        {/* Position */}
                        <div>
                            <div className="text-white/40 text-xs font-mono tracking-widest mb-1">POSITION (km)</div>
                            <div className="grid grid-cols-3 gap-2 text-xs font-mono">
                                <div className="bg-white/5 rounded px-2 py-1">
                                    <span className="text-white/40">X:</span>
                                    <span className="text-white ml-1">{(position?.x * 6371).toFixed(0)}</span>
                                </div>
                                <div className="bg-white/5 rounded px-2 py-1">
                                    <span className="text-white/40">Y:</span>
                                    <span className="text-white ml-1">{(position?.y * 6371).toFixed(0)}</span>
                                </div>
                                <div className="bg-white/5 rounded px-2 py-1">
                                    <span className="text-white/40">Z:</span>
                                    <span className="text-white ml-1">{(position?.z * 6371).toFixed(0)}</span>
                                </div>
                            </div>
                        </div>

                        {/* Orbital Params */}
                        <div>
                            <div className="text-white/40 text-xs font-mono tracking-widest mb-1">ORBITAL PARAMETERS</div>
                            <div className="space-y-1 text-xs font-mono">
                                <div className="flex justify-between">
                                    <span className="text-white/50">Altitude</span>
                                    <span className="text-white">{((constellation?.altitude || 1.5) * 400).toFixed(0)} km</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/50">Inclination</span>
                                    <span className="text-white">{((constellation?.inclination || 0.8) * 57.3).toFixed(1)}°</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-white/50">Velocity</span>
                                    <span className="text-white">{((constellation?.speed || 0.5) * 7.8).toFixed(1)} km/s</span>
                                </div>
                            </div>
                        </div>

                        {/* Warnings for zombies */}
                        {isZombie && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                                <div className="flex items-center gap-2 text-red-400 text-xs font-mono">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                    </svg>
                                    UNCONTROLLED DEBRIS RISK
                                </div>
                                <p className="text-white/50 text-xs mt-2">
                                    This satellite is no longer responding to coordination commands. Erratic orbital behavior detected.
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
