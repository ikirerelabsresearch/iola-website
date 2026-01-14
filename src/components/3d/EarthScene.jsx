import { OrbitControls, Stars } from '@react-three/drei'
// import { EffectComposer, Bloom, Noise } from '@react-three/postprocessing'
import Earth from './Earth'
import SatelliteSwarm from './SatelliteSwarm'

export default function EarthScene({ satelliteCount, orbitalAltitude, orbitSpeed, swarmSpread }) {
    return (
        <>
            <ambientLight intensity={0.1} />
            <pointLight position={[15, 15, 15]} intensity={2} color="#ffffff" />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00F0FF" />

            <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={0.5} />

            <Earth />
            <SatelliteSwarm
                count={satelliteCount}
                altitude={orbitalAltitude}
                speed={orbitSpeed}
                spread={swarmSpread}
            />

            <OrbitControls
                enablePan={false}
                minDistance={3.5}
                maxDistance={12}
                autoRotate
                autoRotateSpeed={0.2}
            />

            {/* <EffectComposer disableNormalPass>
                <Bloom luminanceThreshold={0.2} mipmapBlur intensity={1} radius={0.5} />
                <Noise opacity={0.05} />
            </EffectComposer> */}
        </>
    )
}
