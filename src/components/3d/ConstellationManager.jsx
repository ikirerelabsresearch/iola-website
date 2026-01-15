import { useState, useCallback, useMemo, useRef } from 'react'
import Constellation, { getConstellationColor } from './Constellation'

// Default constellation names
const CONSTELLATION_NAMES = [
    'Ikirere Alpha',
    'Beta Network',
    'Gamma Array',
    'Delta Mesh',
    'Epsilon Grid',
    'Zeta Cluster'
]

// Collision detection with spatial hashing
function detectCollisions(allPositions, threshold = 0.15) {
    const collisions = []
    const cellSize = threshold * 2
    const grid = new Map()

    // Hash all satellites to grid cells
    allPositions.forEach(sat => {
        const { x, y, z } = sat.position
        const cellX = Math.floor(x / cellSize)
        const cellY = Math.floor(y / cellSize)
        const cellZ = Math.floor(z / cellSize)
        const key = `${cellX},${cellY},${cellZ}`

        if (!grid.has(key)) grid.set(key, [])
        grid.get(key).push(sat)
    })

    // Check each cell and neighbors
    grid.forEach((satsInCell, key) => {
        const [cx, cy, cz] = key.split(',').map(Number)

        // Get all satellites in adjacent cells
        const nearby = []
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                for (let dz = -1; dz <= 1; dz++) {
                    const neighborKey = `${cx + dx},${cy + dy},${cz + dz}`
                    if (grid.has(neighborKey)) {
                        nearby.push(...grid.get(neighborKey))
                    }
                }
            }
        }

        // Check for collisions within nearby satellites
        for (let i = 0; i < satsInCell.length; i++) {
            const sat1 = satsInCell[i]
            for (let j = 0; j < nearby.length; j++) {
                const sat2 = nearby[j]
                if (sat1.id >= sat2.id) continue // Avoid duplicates
                if (sat1.constellationId === sat2.constellationId) continue // Same constellation

                const dx = sat1.position.x - sat2.position.x
                const dy = sat1.position.y - sat2.position.y
                const dz = sat1.position.z - sat2.position.z
                const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

                if (dist < threshold) {
                    collisions.push({
                        sat1: sat1.id,
                        sat2: sat2.id,
                        distance: dist,
                        constellation1: sat1.constellationId,
                        constellation2: sat2.constellationId
                    })
                }
            }
        }
    })

    return collisions
}

export default function ConstellationManager({
    constellations,
    onConstellationsChange,
    onSelectSatellite,
    selectedSatelliteId
}) {
    const positionsRef = useRef({})
    const [collisions, setCollisions] = useState([])
    const [globalRisk, setGlobalRisk] = useState(0)
    const lastUpdateRef = useRef(0)

    // Handle position updates from each constellation
    const handlePositionsUpdate = useCallback((constellationId, positions) => {
        positionsRef.current[constellationId] = positions

        // Throttle collision detection to every 500ms
        const now = Date.now()
        if (now - lastUpdateRef.current > 500) {
            lastUpdateRef.current = now

            // Combine all positions
            const allPositions = Object.values(positionsRef.current).flat()

            // Detect collisions
            const newCollisions = detectCollisions(allPositions)
            setCollisions(newCollisions)

            // Compute global risk
            const totalSats = allPositions.length
            const uncoordinatedCount = constellations.filter(c => !c.coordinated && c.visible).reduce((sum, c) => sum + c.satelliteCount, 0)
            const zombieCount = constellations.reduce((sum, c) => sum + (c.zombieCount || 0), 0)

            const baseRisk = 0.02
            const collisionRisk = newCollisions.length * 0.05
            const densityRisk = (totalSats / 2000) * 0.2
            const uncoordRisk = (uncoordinatedCount / Math.max(totalSats, 1)) * 0.3
            const zombieRisk = (zombieCount / Math.max(totalSats, 1)) * 0.4

            const risk = Math.min(baseRisk + collisionRisk + densityRisk + uncoordRisk + zombieRisk, 1.0)
            setGlobalRisk(risk)
        }
    }, [constellations])

    // Handle satellite click
    const handleSatelliteClick = useCallback((satellite) => {
        if (onSelectSatellite) {
            const constellation = constellations.find(c => c.id === satellite.constellationId)
            onSelectSatellite({ ...satellite, constellation })
        }
    }, [constellations, onSelectSatellite])

    return (
        <>
            {constellations.map((config) => (
                <Constellation
                    key={config.id}
                    config={config}
                    onSatelliteClick={handleSatelliteClick}
                    onPositionsUpdate={handlePositionsUpdate}
                    selectedSatelliteId={selectedSatelliteId}
                />
            ))}
        </>
    )
}

// Export utilities
export { getConstellationColor, CONSTELLATION_NAMES, detectCollisions }
