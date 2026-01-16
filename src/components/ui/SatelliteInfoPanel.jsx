import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

const TelemetryBar = ({ label, value, unit, color = 'bg-teal', max = 100 }) => (
    <div className="mb-2">
        <div className="flex justify-between text-[10px] font-mono mb-1">
            <span className="text-white/40">{label}</span>
            <span className="text-white/80">{value.toFixed(1)}{unit}</span>
        </div>
        <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
                className={`h-full ${color} transition-all duration-500`}
                style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
            />
        </div>
    </div>
)

const SystemLog = ({ isZombie }) => {
    const [logs, setLogs] = useState([])

    useEffect(() => {
        const msgs = isZombie
            ? ['CONNECTION TIMEOUT', 'GYRO SYNC ERROR', 'BATTERY CRITICAL', 'ATTITUDE CONTROL FAILURE', 'PACKET LOSS DETECTED']
            : ['Telemetry OK', 'Station Keeping Active', 'Solar Array Efficient', 'Thermal Stable', 'Uplink Established']

        const interval = setInterval(() => {
            setLogs(prev => {
                const newLog = `[${new Date().toISOString().split('T')[1].split('.')[0]}] ${msgs[Math.floor(Math.random() * msgs.length)]}`
                return [newLog, ...prev].slice(0, 5)
            })
        }, 2000)
        return () => clearInterval(interval)
    }, [isZombie])

    return (
        <div className="font-mono text-[10px] space-y-1 text-white/30 h-20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />
            {logs.map((log, i) => (
                <div key={i} className={isZombie ? 'text-red-500/50' : 'text-teal/50'}>{log}</div>
            ))}
        </div>
    )
}

export default function SatelliteInfoPanel({ satellite, onClose }) {
    if (!satellite) return null

    const {
        designator,
        model,
        launchDate,
        telemetry = {},
        isZombie,
        position,
        constellation
    } = satellite

    // Calculate real physics values from simulation units
    const altitudeKm = ((constellation?.altitude || 1.5) * 400).toFixed(0)
    const velocityKmS = ((constellation?.speed || 0.5) * 7.8).toFixed(1)
    const orbitalPeriod = (Math.sqrt(Math.pow((6371 + Number(altitudeKm)) / 6371, 3)) * 84).toFixed(1)

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="absolute top-24 right-6 w-80 z-40"
            >
                <div className="backdrop-blur-xl bg-[#0A0F16]/90 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                    {/* Header */}
                    <div
                        className="px-4 py-3 border-b border-white/10 flex items-center justify-between"
                        style={{ borderTop: `2px solid ${constellation?.color || '#00F0FF'}` }}
                    >
                        <div>
                            <div className="text-white font-mono font-bold tracking-wider">{designator}</div>
                            <div className="text-white/40 text-[10px] font-mono">{constellation?.name} • {model}</div>
                        </div>
                        <div className={`px-2 py-1 rounded text-[10px] font-bold tracking-widest ${isZombie ? 'bg-red-500/20 text-red-500 border border-red-500/30' : 'bg-teal/20 text-teal border border-teal/30'
                            }`}>
                            {isZombie ? 'CRITICAL' : 'NOMINAL'}
                        </div>
                    </div>

                    <div className="p-4 space-y-6">
                        {/* Telemetry Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <TelemetryBar
                                    label="BATTERY"
                                    value={telemetry.battery || 0}
                                    unit="%"
                                    color={isZombie ? 'bg-red-500' : 'bg-emerald-400'}
                                />
                                <TelemetryBar
                                    label="FUEL"
                                    value={telemetry.fuel || 0}
                                    unit="%"
                                    color={telemetry.fuel < 20 ? 'bg-orange-500' : isZombie ? 'bg-red-500' : 'bg-purple-400'}
                                />
                            </div>
                            <div>
                                <TelemetryBar
                                    label="SOLAR INPUT"
                                    value={telemetry.solar || 0}
                                    unit="W"
                                    max={600}
                                    color="bg-yellow-400"
                                />
                                <TelemetryBar
                                    label="THERMAL"
                                    value={telemetry.temp || 0}
                                    unit="°C"
                                    max={100}
                                    color={isZombie ? 'bg-red-400' : 'bg-blue-400'}
                                />
                            </div>
                        </div>

                        {/* Signal Strength */}
                        <div>
                            <div className="flex justify-between text-[10px] font-mono mb-1">
                                <span className="text-white/40">SIGNAL STRENGTH</span>
                                <span className="text-white/80">{telemetry.signal?.toFixed(0)} dBm</span>
                            </div>
                            <div className="flex gap-0.5">
                                {[1, 2, 3, 4, 5].map(i => (
                                    <div
                                        key={i}
                                        className={`h-1.5 flex-1 rounded-sm ${(telemetry.signal > -100 + (i * 10))
                                            ? (isZombie ? 'bg-red-500' : 'bg-teal')
                                            : 'bg-white/10'
                                        }`}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Orbital Physics */}
                        <div>
                            <div className="text-white/40 text-[10px] font-mono tracking-widest mb-2 border-b border-white/5 pb-1">ORBITAL DYNAMICS</div>
                            <div className="grid grid-cols-3 gap-2 text-center">
                                <div className="bg-white/5 rounded p-2">
                                    <div className="text-white font-mono text-sm">{altitudeKm}</div>
                                    <div className="text-white/30 text-[9px]">KM ALT</div>
                                </div>
                                <div className="bg-white/5 rounded p-2">
                                    <div className="text-white font-mono text-sm">{velocityKmS}</div>
                                    <div className="text-white/30 text-[9px]">KM/S</div>
                                </div>
                                <div className="bg-white/5 rounded p-2">
                                    <div className="text-white font-mono text-sm">{orbitalPeriod}</div>
                                    <div className="text-white/30 text-[9px]">MIN PERIOD</div>
                                </div>
                            </div>

                            {/* LIVE XYZ */}
                            <div className="mt-2 flex justify-between font-mono text-[10px] text-white/50 bg-black/40 rounded px-2 py-1">
                                <span>X: {(position.x * 6371).toFixed(0)}</span>
                                <span>Y: {(position.y * 6371).toFixed(0)}</span>
                                <span>Z: {(position.z * 6371).toFixed(0)}</span>
                            </div>
                        </div>

                        {/* System Logs */}
                        <div>
                            <div className="text-white/40 text-[10px] font-mono tracking-widest mb-2 border-b border-white/5 pb-1">SYSTEM LOGS</div>
                            <SystemLog isZombie={isZombie} />
                        </div>

                        <div className="pt-2 border-t border-white/5 flex gap-2">
                            <button
                                onClick={onClose}
                                className="flex-1 py-1.5 rounded bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-mono transition-colors"
                            >
                                CLOSE CONNECTION
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
