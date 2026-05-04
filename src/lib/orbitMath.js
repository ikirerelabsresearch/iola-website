/**
 * orbitMath.js — Keplerian orbital mechanics for IkirereMesh simulation
 *
 * Implements the full ECI (Earth-Centered Inertial) coordinate transformation
 * in Three.js Y-up convention (Y = north pole, XZ = equatorial plane).
 *
 * This is Phase 1 of the IOLA roadmap: correct orbital geometry without live
 * TLE data. When Phase 1 (SGP4 + CelesTrak) ships, these functions remain as
 * the rendering layer — propagated ECI positions drop straight in.
 *
 * Reference: Vallado "Fundamentals of Astrodynamics and Applications" 4th ed.
 */

export const GM = 398600.4418        // Earth gravitational parameter km³/s²
export const R_EARTH_KM = 6371       // Earth mean radius km
export const SCENE_SCALE = 1 / 1000  // 1 scene unit = 1000 km  (Earth r = 6.371)

// ── Keplerian → ECI (Three.js Y-up) ─────────────────────────────────────────
//
// Orbital elements:
//   a   — semi-major axis (km)
//   e   — eccentricity [0, 1)
//   i   — inclination (radians)
//   Ω   — RAAN, right ascension of ascending node (radians)
//   ω   — argument of perigee (radians)
//   f   — true anomaly (radians, advances with time)
//
// Three.js Y-up mapping (from standard Z-up ECI):
//   X_three =  X_eci
//   Y_three =  Z_eci   (north pole)
//   Z_three = -Y_eci   (inverted)
//
export function keplerianToECI(a, e, i, raan, argPerigee, trueAnomaly) {
    // Radial distance from vis-viva
    const p = a * (1 - e * e)
    const r = p / (1 + e * Math.cos(trueAnomaly))

    // Argument of latitude
    const argLat = argPerigee + trueAnomaly

    const cosRaan = Math.cos(raan)
    const sinRaan = Math.sin(raan)
    const cosI    = Math.cos(i)
    const sinI    = Math.sin(i)
    const cosArgL = Math.cos(argLat)
    const sinArgL = Math.sin(argLat)

    // Standard ECI (Z-up)
    const X_eci =  r * (cosRaan * cosArgL - sinRaan * sinArgL * cosI)
    const Y_eci =  r * (sinRaan * cosArgL + cosRaan * sinArgL * cosI)
    const Z_eci =  r * (sinArgL * sinI)

    // Convert to Three.js Y-up and apply scene scale
    return {
        x:  X_eci * SCENE_SCALE,
        y:  Z_eci * SCENE_SCALE,   // north pole → Y
        z: -Y_eci * SCENE_SCALE,   // invert Y_eci → Z_three
    }
}

// ── Mean motion (radians/second) from semi-major axis ───────────────────────
export function meanMotion(a) {
    return Math.sqrt(GM / (a * a * a))  // rad/s
}

// ── Orbital period in seconds ────────────────────────────────────────────────
export function orbitalPeriod(a) {
    return 2 * Math.PI / meanMotion(a)
}

// ── True anomaly at time t, for circular/near-circular orbits ────────────────
// For e≈0 we use mean anomaly ≈ eccentric anomaly ≈ true anomaly (error <0.1°)
// For higher e we solve Kepler's equation iteratively (Newton-Raphson).
export function trueAnomalyAtTime(M0, e, n, t) {
    const M = M0 + n * t  // mean anomaly

    if (e < 0.01) return M  // circular — skip Newton-Raphson

    // Kepler's equation: M = E - e·sin(E)
    let E = M
    for (let iter = 0; iter < 8; iter++) {
        const dE = (M - E + e * Math.sin(E)) / (1 - e * Math.cos(E))
        E += dE
        if (Math.abs(dE) < 1e-8) break
    }

    // True anomaly from eccentric anomaly
    const cosE = Math.cos(E)
    const sinE = Math.sin(E)
    const f = Math.atan2(
        Math.sqrt(1 - e * e) * sinE,
        cosE - e
    )
    return f
}

// ── Walker-T constellation RAAN and initial anomaly ─────────────────────────
// Walker notation T/P/F:
//   T = total satellites, P = planes, F = phasing parameter
// Returns array of { raan, m0 } for each satellite
export function walkerConstellation(T, P, F, baseRaan = 0) {
    const satsPerPlane = Math.round(T / P)
    const raanSpacing  = (2 * Math.PI) / P          // RAAN between planes
    const anomSpacing  = (2 * Math.PI) / satsPerPlane  // anomaly between sats
    const phasingShift = (F / T) * 2 * Math.PI       // per-plane anomaly offset

    const sats = []
    for (let p = 0; p < P; p++) {
        const raan = baseRaan + p * raanSpacing
        for (let s = 0; s < satsPerPlane; s++) {
            sats.push({
                raan,
                m0: (s * anomSpacing) + (p * phasingShift),
                plane: p,
            })
        }
    }
    return sats
}

// ── Real orbit type presets ──────────────────────────────────────────────────
// Altitude in km, inclination in degrees.
// These match real constellation parameters from public TLE data.
//
// Walker notation used where applicable. For custom constellations the user
// controls T, P, F, i, alt, e, argPerigee directly.
//
export const ORBIT_PRESETS = {
    // ── Low Earth Orbit ─────────────────────────────────────────
    LEO_EQUATORIAL: {
        label: 'Equatorial LEO',
        description: 'Low-latitude orbit. Used for Earth observation of equatorial regions.',
        altitudeKm: 550,
        inclinationDeg: 5,
        eccentricity: 0.0001,
        argPerigee: 0,
        walkerF: 1,
        color: '#00DCFF',
        icon: '⊙',
    },
    LEO_MIDLAT: {
        label: 'Mid-Latitude LEO',
        description: 'Classic Starlink-style orbit covering ±55° latitude.',
        altitudeKm: 550,
        inclinationDeg: 53,
        eccentricity: 0.0001,
        argPerigee: 0,
        walkerF: 22,
        color: '#00DCFF',
        icon: '◎',
    },
    ISS: {
        label: 'ISS Orbit',
        description: 'International Space Station orbital plane. 51.6° inclination.',
        altitudeKm: 408,
        inclinationDeg: 51.64,
        eccentricity: 0.0002,
        argPerigee: 0,
        walkerF: 1,
        color: '#FFBF00',
        icon: '⬡',
    },
    SSO: {
        label: 'Sun-Synchronous',
        description: 'Retrograde orbit that maintains constant sun angle. ~97.4° at 550 km.',
        altitudeKm: 550,
        inclinationDeg: 97.44,
        eccentricity: 0.0001,
        argPerigee: 0,
        walkerF: 2,
        color: '#F39C12',
        icon: '☀',
    },
    POLAR: {
        label: 'Polar',
        description: 'True polar orbit. Passes over every point on Earth.',
        altitudeKm: 780,
        inclinationDeg: 86.4,
        eccentricity: 0.0001,
        argPerigee: 0,
        walkerF: 2,
        color: '#E74C3C',
        icon: '↕',
    },
    ONEWEB: {
        label: 'OneWeb-style',
        description: 'Near-polar LEO at 1200 km. Full global coverage.',
        altitudeKm: 1200,
        inclinationDeg: 87.9,
        eccentricity: 0.0001,
        argPerigee: 0,
        walkerF: 1,
        color: '#2ECC71',
        icon: '◈',
    },
    // ── Medium Earth Orbit ───────────────────────────────────────
    GPS: {
        label: 'GPS-style MEO',
        description: 'GPS orbital shell. T=24/P=6/F=2, 55° inclination.',
        altitudeKm: 20200,
        inclinationDeg: 55,
        eccentricity: 0.01,
        argPerigee: 0,
        walkerF: 2,
        color: '#3498DB',
        icon: '⊕',
    },
    GALILEO: {
        label: 'Galileo-style MEO',
        description: 'Galileo orbital geometry. T=27/P=3/F=1, 56° inclination.',
        altitudeKm: 23222,
        inclinationDeg: 56,
        eccentricity: 0.0003,
        argPerigee: 0,
        walkerF: 1,
        color: '#9B59B6',
        icon: '✦',
    },
    // ── Highly Elliptical ────────────────────────────────────────
    MOLNIYA: {
        label: 'Molniya HEO',
        description: '12-hr orbit. Spends ~8 hrs over northern hemisphere apogee (~39,600 km).',
        altitudeKm: null,  // uses a directly
        semiMajorAxisKm: 26560,
        inclinationDeg: 62.8,
        eccentricity: 0.74,
        argPerigee: 270 * Math.PI / 180,  // perigee in southern hemisphere
        walkerF: 0,
        color: '#E91E63',
        icon: '⬭',
    },
    // ── Geostationary ────────────────────────────────────────────
    GEO: {
        label: 'Geostationary',
        description: 'Equatorial orbit at 35,786 km. Appears stationary above Earth.',
        altitudeKm: 35786,
        inclinationDeg: 0.05,
        eccentricity: 0.0001,
        argPerigee: 0,
        walkerF: 0,
        color: '#1ABC9C',
        icon: '○',
    },
}

// ── Semi-major axis from altitude (km) ──────────────────────────────────────
export function smaFromAlt(altKm) {
    return R_EARTH_KM + altKm
}

// ── Altitude from semi-major axis ───────────────────────────────────────────
export function altFromSma(a) {
    return a - R_EARTH_KM
}

// ── Velocity in km/s from vis-viva ───────────────────────────────────────────
export function orbitalVelocity(a, r) {
    return Math.sqrt(GM * (2 / r - 1 / a))
}

// ── Compute apogee and perigee altitudes ────────────────────────────────────
export function apogeeAlt(a, e)  { return a * (1 + e) - R_EARTH_KM }
export function perigeeAlt(a, e) { return a * (1 - e) - R_EARTH_KM }
