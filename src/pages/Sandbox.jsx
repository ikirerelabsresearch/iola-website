import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import EarthScene from '../components/3d/EarthScene'
import ConstellationControlPanel from '../components/ui/ConstellationControlPanel'
import SatelliteInfoPanel from '../components/ui/SatelliteInfoPanel'
import { getConstellationColor } from '../components/3d/Constellation'

// Generate unique ID
const generateId = () => `const-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

// Default constellation config
const createConstellation = (index) => ({
    id: generateId(),
    name: ['Ikirere Alpha', 'Beta Network', 'Gamma Array', 'Delta Mesh', 'Epsilon Grid', 'Zeta Cluster'][index % 6],
    color: getConstellationColor(index),
    satelliteCount: 200,
    altitude: 1.2 + (index * 0.3),
    inclination: 0.8,
    speed: 0.5,
    coordinated: true,
    visible: true,
    zombieCount: 0
})

export default function Sandbox() {
    // Constellation state
    const [constellations, setConstellations] = useState([
        createConstellation(0)
    ])
    const [selectedSatellite, setSelectedSatellite] = useState(null)

    // Compute global metrics
    const globalMetrics = useMemo(() => {
        const totalSats = constellations.reduce((sum, c) => sum + c.satelliteCount + (c.zombieCount || 0), 0)
        const zombieTotal = constellations.reduce((sum, c) => sum + (c.zombieCount || 0), 0)
        const uncoordinated = constellations.filter(c => !c.coordinated && c.visible).length

        // Simple risk calculation
        const baseRisk = 0.02
        const densityRisk = Math.min(totalSats / 5000, 0.3)
        const zombieRisk = (zombieTotal / Math.max(totalSats, 1)) * 0.4
        const uncoordRisk = (uncoordinated / Math.max(constellations.length, 1)) * 0.25

        return {
            totalSatellites: totalSats,
            totalZombies: zombieTotal,
            constellationCount: constellations.length,
            risk: Math.min(baseRisk + densityRisk + zombieRisk + uncoordRisk, 1.0)
        }
    }, [constellations])

    // Add new constellation
    const handleAddConstellation = useCallback(() => {
        setConstellations(prev => [...prev, createConstellation(prev.length)])
    }, [])

    // Handle satellite selection
    const handleSelectSatellite = useCallback((satellite) => {
        setSelectedSatellite(satellite)
    }, [])

    // Close satellite panel
    const handleCloseSatellitePanel = useCallback(() => {
        setSelectedSatellite(null)
    }, [])

    return (
        <div className="relative h-screen w-full bg-[#050A14]">
            {/* Back Button */}
            <div className="absolute top-6 left-6 z-50">
                <Link
                    to="/"
                    className="px-4 py-2 border border-teal/30 rounded-lg text-teal/80 hover:text-teal hover:bg-teal/10 hover:border-teal transition-all flex items-center gap-2 text-sm font-mono tracking-wide backdrop-blur-md bg-black/20"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    RETURN TO COMMAND
                </Link>
            </div>

            {/* Title */}
            <div className="absolute bottom-6 left-6 z-10 pointer-events-none">
                <h1 className="text-3xl font-bold text-white mb-1 tracking-tighter">
                    COMMAND <span className="text-teal">CENTER</span>
                </h1>
                <p className="text-white/40 max-w-xs text-xs font-mono">
                    Multi-constellation simulation. Click satellites for metadata. Toggle coordination to observe collective behavior.
                </p>
            </div>

            {/* Global Metrics Bar */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                <div className="backdrop-blur-md bg-black/40 border border-white/10 rounded-lg px-6 py-2 flex items-center gap-8">
                    <div className="text-center">
                        <div className="text-white/40 text-[10px] font-mono tracking-widest">SATELLITES</div>
                        <div className="text-white font-mono text-lg">{globalMetrics.totalSatellites}</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                        <div className="text-white/40 text-[10px] font-mono tracking-widest">CONSTELLATIONS</div>
                        <div className="text-white font-mono text-lg">{globalMetrics.constellationCount}</div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                        <div className="text-white/40 text-[10px] font-mono tracking-widest">ZOMBIES</div>
                        <div className={`font-mono text-lg ${globalMetrics.totalZombies > 0 ? 'text-red-400' : 'text-white'}`}>
                            {globalMetrics.totalZombies}
                        </div>
                    </div>
                    <div className="w-px h-8 bg-white/10" />
                    <div className="text-center">
                        <div className="text-white/40 text-[10px] font-mono tracking-widest">CONJUNCTION RISK</div>
                        <div
                            className="font-mono text-lg transition-colors"
                            style={{
                                color: globalMetrics.risk < 0.2 ? '#00F0FF' : globalMetrics.risk < 0.5 ? '#FFB800' : '#FF4444'
                            }}
                        >
                            {globalMetrics.risk.toFixed(2)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Constellation Control Panel */}
            <ConstellationControlPanel
                constellations={constellations}
                onChange={setConstellations}
                onAdd={handleAddConstellation}
            />

            {/* Satellite Info Panel */}
            <SatelliteInfoPanel
                satellite={selectedSatellite}
                onClose={handleCloseSatellitePanel}
            />

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: false, powerPreference: 'high-performance' }}
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
        </div>
    )
}
