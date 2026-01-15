import { Canvas } from '@react-three/fiber'
import { Suspense, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useControls, Leva, button } from 'leva'
import EarthScene from '../components/3d/EarthScene'

export default function Sandbox() {
    const [riskIndex, setRiskIndex] = useState(0)

    const { satelliteCount, altitude, speed, inclination } = useControls('Orbital Parameters', {
        satelliteCount: { value: 500, min: 100, max: 5000, step: 100 },
        altitude: { value: 1.5, min: 0.5, max: 5, step: 0.1 },
        speed: { value: 0.5, min: 0, max: 5, step: 0.1 },
        inclination: { value: 1, min: 0.1, max: Math.PI, step: 0.1, label: 'Orbital Inclination' }
    })

    const { coordinated } = useControls('Coordination', {
        coordinated: { value: false, label: 'Coordinated Constellation' }
    })

    const handleRiskUpdate = useCallback((risk) => {
        setRiskIndex(risk)
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

            {/* Info Panel */}
            <div className="absolute bottom-10 left-10 z-10 pointer-events-none">
                <h1 className="text-4xl font-bold text-white mb-2 tracking-tighter">SANDBOX <span className="text-teal">MODE</span></h1>
                <p className="text-white/50 max-w-sm text-sm font-mono">
                    Interactive simulation of Ikirere Mesh Network coverage. Toggle coordination to observe collective behavior under load.
                </p>
            </div>

            {/* Risk Metric - Subtle floating display */}
            <div className="absolute bottom-10 right-10 z-10 pointer-events-none">
                <div className="backdrop-blur-md bg-black/30 border border-white/10 rounded-lg px-4 py-3">
                    <div className="text-white/40 text-xs font-mono tracking-widest mb-1">CONJUNCTION RISK</div>
                    <div
                        className="font-mono text-2xl tracking-tight transition-colors duration-300"
                        style={{
                            color: riskIndex < 0.2 ? '#00F0FF' : riskIndex < 0.5 ? '#FFB800' : '#FF4444',
                            textShadow: `0 0 20px ${riskIndex < 0.2 ? 'rgba(0,240,255,0.5)' : riskIndex < 0.5 ? 'rgba(255,184,0,0.5)' : 'rgba(255,68,68,0.5)'}`
                        }}
                    >
                        {riskIndex.toFixed(2)}
                    </div>
                </div>
            </div>

            <Leva theme={{
                colors: {
                    accent: '#00F0FF',
                    bg: '#0B1E3D',
                    fg: '#ffffff',
                    active: '#00F0FF',
                    hover: '#1E4064'
                }
            }} />

            <Canvas
                camera={{ position: [0, 0, 8], fov: 45 }}
                gl={{ antialias: false, powerPreference: 'high-performance' }}
                dpr={[1, 2]}
            >
                <Suspense fallback={null}>
                    <EarthScene
                        satelliteCount={satelliteCount}
                        orbitalAltitude={altitude}
                        orbitSpeed={speed}
                        swarmSpread={inclination}
                        coordinated={coordinated}
                        onRiskUpdate={handleRiskUpdate}
                    />
                </Suspense>
            </Canvas>
        </div>
    )
}
