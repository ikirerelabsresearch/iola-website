import { useEffect, useMemo, useRef } from 'react'
import * as Cesium from 'cesium'
import { useCesium } from './CesiumContext'

export default function SatelliteSwarmResium({ count = 10, altitude = 500000, spread = 45, speed = 1 }) { // Reduced default for debug
    const viewer = useCesium()
    const primitivesRef = useRef(null)

    console.log("Swarm Render:", { viewer, count })

    // Generate orbital parameters (persistent across re-renders unless count changes)
    const satellites = useMemo(() => {
        return new Array(count).fill().map(() => ({
            inclination: (Math.random() - 0.5) * spread * (Math.PI / 180),
            raan: Math.random() * Math.PI * 2,
            trueAnomaly: Math.random() * Math.PI * 2,
            speedOffset: Math.random() * 0.5 + 0.8,
            altitudeOffset: (Math.random() - 0.5) * 50000
        }))
    }, [count, spread]) // Added spread dependency to regenerate if spread changes

    useEffect(() => {
        if (!viewer) {
            console.log("No viewer in Swarm yet")
            return
        }

        console.log("Initializing Swarm Primitives")

        // Create primitives collection
        const collection = new Cesium.PointPrimitiveCollection()
        // Optimization: Setting this might help performance for static points, but these are dynamic.
        // collection.blendOption = Cesium.BlendOption.OPAQUE_AND_TRANSLUCENT

        try {
            const points = []

            // Add points to collection
            satellites.forEach(() => {
                const p = collection.add({
                    color: Cesium.Color.fromCssColorString('#00F0FF'),
                    pixelSize: 4,
                    position: Cesium.Cartesian3.ZERO // Updated in loop
                })
                points.push(p)
            })

            viewer.scene.primitives.add(collection)
            primitivesRef.current = collection
            console.log("Primitives added to scene")
        } catch (e) {
            console.error("Error adding primitives:", e)
        }


        // Animation Loop
        const onTick = (clock) => {
            // Use Cesium clock for sync
            // But for smoother bespoke animation independent of simulation time, we can use performance.now (simpler here)
            // Or better: use clock.currentTime.secondsOfDay - but let's stick to accumulating time for demo smoothness

            const t = performance.now() * 0.001 * speed
            const earthRadius = 6371000

            for (let i = 0; i < points.length; i++) {
                const point = points[i]
                const sat = satellites[i]

                const currentAnomaly = sat.trueAnomaly + t * 0.05 * sat.speedOffset
                const r = earthRadius + altitude + sat.altitudeOffset

                // Cartesian calculation
                const x = r * Math.cos(currentAnomaly)
                const y = r * Math.sin(currentAnomaly)

                // Apply Inclination (Rotate around X)
                const y_inc = y * Math.cos(sat.inclination)
                const z_inc = y * Math.sin(sat.inclination)

                // Apply RAAN (Rotate around Z)
                const x_final = x * Math.cos(sat.raan) - y_inc * Math.sin(sat.raan)
                const y_final = x * Math.sin(sat.raan) + y_inc * Math.cos(sat.raan)
                const z_final = z_inc

                point.position = new Cesium.Cartesian3(x_final, y_final, z_final)
            }
        }

        const eventRemover = viewer.scene.preUpdate.addEventListener(onTick)

        return () => {
            eventRemover()
            if (!viewer.isDestroyed() && primitivesRef.current) {
                viewer.scene.primitives.remove(primitivesRef.current)
            }
        }
    }, [viewer, satellites, altitude, speed]) // Dependencies to restart swarm

    return null // This component renders nothing in React tree, only manages Cesium primitives
}
