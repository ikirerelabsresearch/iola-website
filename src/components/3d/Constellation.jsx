/**
 * Constellation.jsx — Prototype orbital simulation with maneuver engine
 *
 * How real orbital maneuvers work:
 *
 * 1. Ground uplinks a ΔV plan (burn time, magnitude, direction)
 * 2. Each satellite acknowledges and schedules an attitude reorientation
 * 3. At the burn window, thrusters fire → satellite enters Hohmann transfer orbit
 *    (elliptical arc between old and new orbit radius)
 * 4. At transfer apogee/perigee, second burn circularizes into the new orbit
 * 5. Inclination changes happen at nodal crossings (equator crossing),
 *    altitude changes happen at apogee/perigee
 *
 * In this prototype:
 *  - Each orbital PLANE maneuvers sequentially (real ops avoid simultaneous burns)
 *  - During transfer: r temporarily arcs to Hohmann midpoint radius
 *  - inclination + raan interpolate smoothly with easeInOutCubic
 *  - Per-plane stagger = PLANE_STAGGER_S seconds between each plane's burn start
 *  - onManeuverEvent callback drives the uplink log in the HUD
 */

import { useRef, useMemo, useEffect, useCallback } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { walkerConstellation, ORBIT_PRESETS, smaFromAlt } from '../../lib/orbitMath'

const TRAIL_SEGMENTS    = 40
const TRAIL_ARC         = 0.55
const EARTH_R           = 2.0
const MANEUVER_DURATION = 18   // seconds per plane to complete full maneuver
const PLANE_STAGGER_S   = 4    // seconds between each plane starting its burn

const CONSTELLATION_COLORS = [
    '#00DCFF', '#FF6B35', '#7B2CBF', '#2ECC71',
    '#E74C3C', '#F39C12', '#3498DB', '#E91E63',
]
export function getConstellationColor(index) {
    return CONSTELLATION_COLORS[index % CONSTELLATION_COLORS.length]
}

// ── Procedural CubeSat geometry ───────────────────────────────────────────────
function buildCubeSatGeometry() {
    const body  = new THREE.BoxGeometry(0.022, 0.022, 0.065)
    const panelL = new THREE.BoxGeometry(0.04, 0.001, 0.03)
    const panelR = new THREE.BoxGeometry(0.04, 0.001, 0.03)
    panelL.applyMatrix4(new THREE.Matrix4().makeTranslation(-0.031, 0, 0.008))
    panelR.applyMatrix4(new THREE.Matrix4().makeTranslation( 0.031, 0, 0.008))
    const ant = new THREE.CylinderGeometry(0.001, 0.001, 0.018, 6)
    ant.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, 0.038).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)))
    const cam = new THREE.CylinderGeometry(0.004, 0.004, 0.006, 8)
    cam.applyMatrix4(new THREE.Matrix4().makeTranslation(0, 0, -0.036).multiply(new THREE.Matrix4().makeRotationX(Math.PI / 2)))
    return mergeGeometries([body, panelL, panelR, ant, cam])
}

function mergeGeometries(geos) {
    let total = 0
    geos.forEach(g => { total += g.attributes.position.count })
    const pos = new Float32Array(total * 3)
    const nor = new Float32Array(total * 3)
    const idx = []
    let off = 0
    geos.forEach(g => {
        const p = g.attributes.position.array
        const n = g.attributes.normal?.array
        const c = g.attributes.position.count
        for (let i = 0; i < p.length; i++) pos[off * 3 + i] = p[i]
        if (n) for (let i = 0; i < n.length; i++) nor[off * 3 + i] = n[i]
        if (g.index) g.index.array.forEach(v => idx.push(v + off))
        off += c
    })
    const out = new THREE.BufferGeometry()
    out.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    out.setAttribute('normal',   new THREE.BufferAttribute(nor, 3))
    if (idx.length) out.setIndex(idx)
    out.computeVertexNormals()
    return out
}

// ── Metadata ──────────────────────────────────────────────────────────────────
const SAT_MODELS   = ['IK-3U-v2', 'IK-3U-EO', 'IK-6U-Pro', 'IK-3U-Comm']
const SAT_MISSIONS = ['Earth Observation', 'Climate Monitor', 'IoT Gateway', 'RF Survey']

function genMeta(_id, idx, isZombie) {
    const yr = 2024 + Math.floor(Math.random() * 3)
    const mo = Math.floor(Math.random() * 12) + 1
    return {
        designator:  `IK-${yr}-${(idx + 1).toString().padStart(3, '0')}`,
        model:       SAT_MODELS[idx % SAT_MODELS.length],
        mission:     SAT_MISSIONS[idx % SAT_MISSIONS.length],
        launchDate:  `${yr}-${mo.toString().padStart(2, '0')}-${(Math.floor(Math.random() * 27) + 1).toString().padStart(2, '0')}`,
        noradId:     44000 + idx + Math.floor(Math.random() * 4000),
        telemetry: {
            battery:  isZombie ? Math.random() * 25        : 80 + Math.random() * 18,
            temp:     isZombie ? 82 + Math.random() * 15   : 18 + Math.random() * 12,
            signal:   isZombie ? -118 - Math.random() * 12 : -62 - Math.random() * 18,
            solar:    isZombie ? Math.random() * 80         : 430 + Math.random() * 70,
            fuel:     isZombie ? Math.random() * 8          : 55 + Math.random() * 38,
            latency:  isZombie ? 999                        : 18 + Math.random() * 35,
            cpuLoad:  isZombie ? 0                          : 22 + Math.random() * 44,
            dataRate: isZombie ? 0                          : 0.8 + Math.random() * 4.2,
        }
    }
}

// ── Orbital position from inclination + RAAN (Y-up ECI) ──────────────────────
function satPosition(r, inclRad, raanRad, theta) {
    const ci = Math.cos(inclRad), si = Math.sin(inclRad)
    const cO = Math.cos(raanRad), sO = Math.sin(raanRad)
    const r0x = cO,  r0y = 0,  r0z = -sO
    const nx = -si * sO,  ny = ci,  nz = si * cO
    const r1x = ny * r0z - nz * r0y
    const r1y = nz * r0x - nx * r0z
    const r1z = nx * r0y - ny * r0x
    const ct = Math.cos(theta), st = Math.sin(theta)
    return {
        x: r * (ct * r0x + st * r1x),
        y: r * (ct * r0y + st * r1y),
        z: r * (ct * r0z + st * r1z),
    }
}

// ── Easing ────────────────────────────────────────────────────────────────────
const easeInOutCubic = t => t < 0.5 ? 4*t*t*t : 1 - Math.pow(-2*t + 2, 3) / 2

// Hohmann arc: r bulges outward in the first half, contracts in the second
// This mimics the transfer orbit ellipse — at t=0.5 the satellite is at apogee of transfer
function hohmannR(r0, r1, progress) {
    const rMid = (r0 + r1) / 2 + Math.abs(r1 - r0) * 0.35  // slightly exaggerated arc
    if (progress < 0.5) {
        const tp = progress * 2
        return r0 + (rMid - r0) * easeInOutCubic(tp)
    } else {
        const tp = (progress - 0.5) * 2
        return rMid + (r1 - rMid) * easeInOutCubic(tp)
    }
}

// ── Resolve orbit config to scene params ──────────────────────────────────────
function resolveOrbitParams(config) {
    const p   = ORBIT_PRESETS[config.orbitPreset] || ORBIT_PRESETS.LEO_MIDLAT
    const alt = config.altitudeKm    ?? p.altitudeKm    ?? 550
    const inc = (config.inclinationDeg ?? p.inclinationDeg ?? 53) * Math.PI / 180
    const ecc = config.eccentricity  ?? p.eccentricity  ?? 0.0001
    const P   = config.planesCount   ?? Math.max(1, Math.ceil(config.satelliteCount / 8))
    const F   = config.walkerF       ?? p.walkerF        ?? 1
    const bR  = (config.baseRaan     ?? 0) * Math.PI / 180
    const a_km = p.semiMajorAxisKm ?? smaFromAlt(alt)
    const r_scene = (a_km / 6371) * EARTH_R
    const baseSpeed = 0.12 / Math.sqrt(r_scene / EARTH_R)
    return { inc, ecc, P, F, bR, a_km, r_scene, baseSpeed, label: p.label }
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function Constellation({ config, onSatelliteClick, onPositionsUpdate, selectedSatelliteId, onManeuverEvent }) {
    const { id, color, satelliteCount, speedMultiplier, coordinated, visible, zombieCount = 0 } = config

    const meshRef   = useRef()
    const trailsRef = useRef()
    const ringsRef  = useRef([])
    useThree() // needed to activate R3F context; click handling uses event.instanceId directly
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const satGeometry = useMemo(() => buildCubeSatGeometry(), [])

    // ── Track config changes for maneuver detection ───────────────────────────
    const prevConfigKeyRef = useRef(null)

    // configKey captures all orbit-changing parameters
    const configKey = [
        config.orbitPreset, config.altitudeKm, config.inclinationDeg,
        config.eccentricity, config.planesCount, config.walkerF, config.baseRaan
    ].join('|')

    // ── Satellite logical records (rebuilt on orbit change) ───────────────────
    const buildSatellites = useCallback((cfg) => {
        const params = resolveOrbitParams(cfg)
        const { inc, ecc, P, F, bR, r_scene, baseSpeed, a_km } = params
        const total  = cfg.satelliteCount + (cfg.zombieCount || 0)
        const walker = walkerConstellation(cfg.satelliteCount, P, F, bR)
        const sats   = []
        for (let i = 0; i < total; i++) {
            const isZombie = i >= cfg.satelliteCount
            const meta = genMeta(id, i, isZombie)
            if (isZombie) {
                sats.push({
                    id: `${id}-sat-${i}`, constellationId: id, isZombie: true,
                    r: r_scene * (0.95 + Math.random() * 0.08),
                    inc: inc + (Math.random() - 0.5) * 0.15,
                    raan: Math.random() * Math.PI * 2,
                    theta0: Math.random() * Math.PI * 2,
                    speed: baseSpeed * (0.6 + Math.random() * 0.4) * (cfg.speedMultiplier ?? 1),
                    plane: -1, a_km, e: ecc, i_rad: inc, ...meta,
                })
            } else {
                const w = walker[i % walker.length]
                sats.push({
                    id: `${id}-sat-${i}`, constellationId: id, isZombie: false,
                    r: r_scene, inc, raan: w.raan,
                    theta0: w.m0,
                    speed: baseSpeed * (0.9 + Math.random() * 0.2) * (cfg.speedMultiplier ?? 1),
                    plane: w.plane, a_km, e: ecc, i_rad: inc, ...meta,
                })
            }
        }
        return { sats, params }
    }, [id])

    // ── Per-satellite maneuver state ──────────────────────────────────────────
    // Each entry: { from: {r,inc,raan}, to: {r,inc,raan}, startT, duration }
    const maneuverRef  = useRef(null)   // { sats: [{from,to,startT,done}], startedPlanes: Set }
    const satelliteRef = useRef([])     // current satellite records (inc live theta)
    const liveThetas   = useRef([])

    // ── Initialize satellites on first mount ──────────────────────────────────
    useEffect(() => {
        const { sats } = buildSatellites(config)
        satelliteRef.current = sats
        liveThetas.current = sats.map(s => s.theta0)
        prevConfigKeyRef.current = configKey
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // ── Detect orbit type change and set up maneuver ───────────────────────────
    useEffect(() => {
        if (prevConfigKeyRef.current === null) return  // skip initial
        if (prevConfigKeyRef.current === configKey) return

        prevConfigKeyRef.current = configKey

        const { sats: newSats, params: newParams } = buildSatellites(config)

        // Build per-satellite from→to maneuver records
        const maneuvers = satelliteRef.current.map((oldSat, i) => {
            const newSat = newSats[i] || newSats[newSats.length - 1]
            return {
                from:  { r: oldSat.r, inc: oldSat.inc, raan: oldSat.raan },
                to:    { r: newSat.r, inc: newSat.inc, raan: newSat.raan },
                plane: oldSat.plane,
                // start time set when plane's turn comes (in useFrame)
                startT: null,
                done: false,
            }
        })

        // Unique planes sorted so they stagger sequentially
        const uniquePlanes = [...new Set(
            satelliteRef.current.map(s => s.plane)
        )].filter(p => p >= 0).sort((a, b) => a - b)

        maneuverRef.current = {
            maneuvers,
            uniquePlanes,
            globalStartT: null,   // set on first useFrame after this
            newSats,
            newParams,
            firedEvents: new Set(),
        }

        // Emit initial event: maneuver queued
        const dInc = Math.abs((newParams.inc - (resolveOrbitParams({ ...config, orbitPreset: prevConfigKeyRef.current?.split('|')[0] || config.orbitPreset })?.inc ?? newParams.inc)) * 57.3).toFixed(1)
        if (onManeuverEvent) {
            onManeuverEvent({
                constellationId: id,
                phase: 'QUEUED',
                label: config.name || id,
                targetOrbit: newParams.label,
                totalSats: config.satelliteCount,
                planes: uniquePlanes.length,
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configKey])

    // ── Orbital ring geometry — always from TARGET config, not satellite positions ──
    // Rings show where satellites ARE GOING, not where they came from.
    // Satellites then maneuver into the rings — correct operational display.
    const ringGeometries = useMemo(() => {
        const params = resolveOrbitParams(config)
        const { inc, P, F, bR, r_scene } = params
        const walker = walkerConstellation(Math.max(satelliteCount, 1), P, F, bR)

        const planes = new Map()
        walker.forEach(w => {
            if (!planes.has(w.plane))
                planes.set(w.plane, { r: r_scene, inc, raan: w.raan })
        })

        return Array.from(planes.values()).map(({ r, inc: planeInc, raan }) => {
            const pts = []
            for (let i = 0; i <= 128; i++) {
                const p = satPosition(r, planeInc, raan, (i / 128) * Math.PI * 2)
                pts.push(new THREE.Vector3(p.x, p.y, p.z))
            }
            const geo = new THREE.BufferGeometry().setFromPoints(pts)
            geo.computeBoundingSphere()
            return geo
        })
    // configKey covers all orbit params — recompute rings whenever orbit type changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [configKey])

    // ── Trail buffer ───────────────────────────────────────────────────────────
    const trailCount = useMemo(() => Math.max(satelliteRef.current.length, config.satelliteCount + zombieCount), [config.satelliteCount, zombieCount])

    const trailIndices = useMemo(() => {
        const idx = []
        for (let i = 0; i < trailCount; i++)
            for (let j = 0; j < TRAIL_SEGMENTS - 1; j++)
                idx.push(i * TRAIL_SEGMENTS + j, i * TRAIL_SEGMENTS + j + 1)
        return new Uint32Array(idx)
    }, [trailCount])

    const trailAlphas = useMemo(() => {
        const a = new Float32Array(trailCount * TRAIL_SEGMENTS)
        for (let i = 0; i < trailCount; i++)
            for (let j = 0; j < TRAIL_SEGMENTS; j++)
                a[i * TRAIL_SEGMENTS + j] = 1.0 - j / (TRAIL_SEGMENTS - 1)
        return a
    }, [trailCount])

    useEffect(() => {
        if (!trailsRef.current?.geometry) return
        const geo = trailsRef.current.geometry
        geo.setIndex(new THREE.BufferAttribute(trailIndices, 1))
        geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(trailCount * TRAIL_SEGMENTS * 3), 3))
        geo.setAttribute('aAlpha',   new THREE.BufferAttribute(trailAlphas, 1))
        geo.computeBoundingSphere()
    }, [trailIndices, trailAlphas, trailCount])

    const positionsRef = useRef([])
    const highlightRef = useRef()
    const hitRef       = useRef()   // invisible hitbox mesh — larger, easier to click
    const threeColor   = useMemo(() => new THREE.Color(color), [color])

    // ── Animation loop ─────────────────────────────────────────────────────────
    useFrame((state) => {
        if (!visible) return
        const t = state.clock.getElapsedTime()
        const sats = satelliteRef.current
        if (!sats.length || !meshRef.current) return

        const positions = []
        let selectedFound = false
        const posAttr = trailsRef.current?.geometry?.getAttribute('position')
        const man = maneuverRef.current

        // ── Set global start time on first frame after maneuver is queued ──
        if (man && man.globalStartT === null) {
            man.globalStartT = t
        }

        sats.forEach((s, i) => {
            if (liveThetas.current[i] === undefined) liveThetas.current[i] = s.theta0

            const zombieWobble = s.isZombie ? Math.sin(t * 1.5 + i) * 0.05 : 0
            liveThetas.current[i] += s.speed * 0.016
            const theta = liveThetas.current[i] + zombieWobble

            // Default to current satellite params
            let liveR   = s.r
            let liveInc = s.inc
            let liveRaan = s.raan
            let isManeuvering = false

            // ── Apply maneuver interpolation if active ────────────────────
            if (man && !s.isZombie && man.maneuvers[i]) {
                const mv = man.maneuvers[i]

                // Calculate this plane's stagger delay
                const planeIdx = man.uniquePlanes.indexOf(s.plane)
                const planeDelay = planeIdx >= 0 ? planeIdx * PLANE_STAGGER_S : 0
                const planeStartT = man.globalStartT + planeDelay
                const eventKey = `plane-${s.plane}`

                if (t >= planeStartT && !mv.done) {
                    isManeuvering = true
                    if (mv.startT === null) {
                        mv.startT = t
                        // Fire per-plane events
                        if (!man.firedEvents.has(`uplink-${s.plane}`)) {
                            man.firedEvents.add(`uplink-${s.plane}`)
                            onManeuverEvent?.({
                                constellationId: id, phase: 'UPLINK',
                                plane: s.plane, planeIdx,
                            })
                            // Schedule subsequent events
                            setTimeout(() => onManeuverEvent?.({ constellationId: id, phase: 'ACK', plane: s.plane, planeIdx }), 900)
                            setTimeout(() => onManeuverEvent?.({ constellationId: id, phase: 'BURN1', plane: s.plane, planeIdx }), 2200)
                            setTimeout(() => onManeuverEvent?.({ constellationId: id, phase: 'TRANSFER', plane: s.plane, planeIdx }), 4500)
                            setTimeout(() => onManeuverEvent?.({ constellationId: id, phase: 'BURN2', plane: s.plane, planeIdx }), MANEUVER_DURATION * 1000 - 2000)
                        }
                    }

                    const elapsed  = t - mv.startT
                    const progress = Math.min(elapsed / MANEUVER_DURATION, 1.0)
                    const eased    = easeInOutCubic(progress)

                    // Hohmann arc for radius, smooth interpolation for inc/raan
                    liveR    = hohmannR(mv.from.r, mv.to.r, progress)
                    liveInc  = mv.from.inc  + (mv.to.inc  - mv.from.inc)  * eased
                    liveRaan = mv.from.raan + (mv.to.raan - mv.from.raan) * eased

                    if (progress >= 1.0 && !mv.done) {
                        mv.done = true
                        // Update the satellite's stored params to final values
                        s.r    = mv.to.r
                        s.inc  = mv.to.inc
                        s.raan = mv.to.raan

                        // Check if ALL planes are done
                        const allDone = man.maneuvers.every(m => m.done || man.satelliteRef?.current[m]?.isZombie)
                        const nominalDone = man.maneuvers.filter((_, mi) => !sats[mi]?.isZombie).every(m => m.done)
                        if (nominalDone && !man.firedEvents.has('complete')) {
                            man.firedEvents.add('complete')
                            onManeuverEvent?.({ constellationId: id, phase: 'COMPLETE', targetOrbit: man.newParams.label })
                            maneuverRef.current = null
                        } else if (!man.firedEvents.has(`circularize-${s.plane}`)) {
                            man.firedEvents.add(`circularize-${s.plane}`)
                            onManeuverEvent?.({ constellationId: id, phase: 'CIRCULARIZE', plane: s.plane, planeIdx })
                        }
                    }
                } else if (!mv.done && t < planeStartT) {
                    // Waiting for this plane's turn — hold at from position
                    liveR    = mv.from.r
                    liveInc  = mv.from.inc
                    liveRaan = mv.from.raan
                }
            }

            const pos = satPosition(liveR, liveInc, liveRaan, theta)
            dummy.position.set(pos.x, pos.y, pos.z)
            dummy.lookAt(0, 0, 0)
            // Thrusting satellites pitch slightly (attitude maneuver visual)
            if (isManeuvering) dummy.rotation.z += 0.3
            dummy.scale.setScalar(s.isZombie ? 0.9 : 0.7)
            dummy.updateMatrix()
            meshRef.current.setMatrixAt(i, dummy.matrix)

            // Trail
            if (posAttr) {
                for (let j = 0; j < TRAIL_SEGMENTS; j++) {
                    const thetaT = theta - (j / (TRAIL_SEGMENTS - 1)) * TRAIL_ARC
                    const tp = satPosition(liveR, liveInc, liveRaan, thetaT)
                    const base = (i * TRAIL_SEGMENTS + j) * 3
                    posAttr.array[base]     = tp.x
                    posAttr.array[base + 1] = tp.y
                    posAttr.array[base + 2] = tp.z
                }
            }

            positions.push({ ...s, r: liveR, inc: liveInc, raan: liveRaan, liveTheta: theta, isManeuvering, position: pos })

            if (s.id === selectedSatelliteId && highlightRef.current) {
                highlightRef.current.position.set(pos.x, pos.y, pos.z)
                highlightRef.current.visible = true
                selectedFound = true
            }
        })

        meshRef.current.instanceMatrix.needsUpdate = true
        // Sync hitbox to same transforms
        if (hitRef.current) {
            hitRef.current.instanceMatrix.copy(meshRef.current.instanceMatrix)
            hitRef.current.instanceMatrix.needsUpdate = true
        }
        if (posAttr) {
            posAttr.needsUpdate = true
            trailsRef.current.geometry.computeBoundingSphere()
        }
        if (!selectedFound && highlightRef.current) highlightRef.current.visible = false
        positionsRef.current = positions
        if (onPositionsUpdate) onPositionsUpdate(id, positions)

        // Ring dash animation
        ringsRef.current.forEach(ring => {
            if (ring?.material) ring.material.dashOffset -= 0.0015
        })
    })

    const handleClick = useCallback((e) => {
        if (!onSatelliteClick) return
        e.stopPropagation()
        // Use instanceId from the event directly — works for both visible and hitbox mesh
        const instanceId = e.instanceId ?? e.object?.userData?.instanceId
        if (instanceId !== undefined && positionsRef.current[instanceId]) {
            onSatelliteClick(positionsRef.current[instanceId])
        }
    }, [onSatelliteClick])

    if (!visible) return null

    return (
        <group>
            {ringGeometries.map((geo, ri) => (
                <line key={ri} ref={el => { ringsRef.current[ri] = el }} geometry={geo} frustumCulled={false}>
                    <lineDashedMaterial color={color} dashSize={0.14} gapSize={0.07} transparent opacity={coordinated ? 0.55 : 0.2} />
                </line>
            ))}

            {/* Visible satellite mesh */}
            <instancedMesh ref={meshRef} args={[satGeometry, null, config.satelliteCount + zombieCount]} frustumCulled={false}>
                <meshStandardMaterial color={threeColor} emissive={threeColor} emissiveIntensity={coordinated ? 0.9 : 0.45} metalness={0.7} roughness={0.25} />
            </instancedMesh>

            {/* Invisible click hitbox — larger sphere synced to meshRef matrix, easier to click */}
            <instancedMesh ref={hitRef} args={[null, null, config.satelliteCount + zombieCount]} frustumCulled={false} onClick={handleClick}>
                <sphereGeometry args={[0.16, 5, 5]} />
                <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </instancedMesh>

            <mesh ref={highlightRef} visible={false}>
                <torusGeometry args={[0.072, 0.009, 8, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.85} depthTest={false} />
            </mesh>

            <lineSegments ref={trailsRef} frustumCulled={false}>
                <bufferGeometry />
                <shaderMaterial
                    transparent depthWrite={false} blending={THREE.AdditiveBlending}
                    vertexShader={`attribute float aAlpha;varying float vA;void main(){vA=aAlpha;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`}
                    fragmentShader={`varying float vA;void main(){gl_FragColor=vec4(${threeColor.r.toFixed(3)},${threeColor.g.toFixed(3)},${threeColor.b.toFixed(3)},vA*0.7);}`}
                />
            </lineSegments>
        </group>
    )
}
