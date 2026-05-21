import { useEffect, useRef } from 'react'
import { Link } from 'react-router'

// ── Scroll reveal hook ────────────────────────────────────────────────────────
function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

// ── Orbital arc SVG — extracted from logo geometry ───────────────────────────
function OrbitalArc() {
  const ref = useRef<SVGPathElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const t = setTimeout(() => el.classList.add('drawn'), 300)
    return () => clearTimeout(t)
  }, [])
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1100 640"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Large orbital arc — mirrors logo's orbit ring */}
      <path
        ref={ref}
        className="orbital-line"
        d="M -100 480 Q 300 -80 700 120 Q 960 260 1200 100"
        stroke="#1E5FA8"
        strokeWidth="1"
        strokeOpacity="0.18"
      />
      {/* Secondary arc */}
      <path
        d="M -60 520 Q 280 40 660 200 Q 900 320 1200 180"
        stroke="#0A2463"
        strokeWidth="0.5"
        strokeOpacity="0.08"
      />
      {/* Horizon glow — the sunrise in the logo */}
      <ellipse
        cx="820" cy="560"
        rx="380" ry="200"
        fill="url(#horizonGlow)"
      />
      <defs>
        <radialGradient id="horizonGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#C8860A" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#C8860A" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

// ── Partner icons ─────────────────────────────────────────────────────────────
function IconGoogle() {
  return (
    <svg height="18" viewBox="0 0 272 92" fill="currentColor" aria-label="Google">
      <path d="M115.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18C71.25 34.32 81.24 25 93.5 25s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44S80.99 39.2 80.99 47.18c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
      <path d="M163.75 47.18c0 12.77-9.99 22.18-22.25 22.18s-22.25-9.41-22.25-22.18c0-12.85 9.99-22.18 22.25-22.18s22.25 9.32 22.25 22.18zm-9.74 0c0-7.98-5.79-13.44-12.51-13.44s-12.51 5.46-12.51 13.44c0 7.9 5.79 13.44 12.51 13.44s12.51-5.55 12.51-13.44z"/>
      <path d="M209.75 26.34v39.82c0 16.38-9.66 23.07-21.08 23.07-10.75 0-17.22-7.19-19.66-13.07l8.48-3.53c1.51 3.61 5.21 7.87 11.17 7.87 7.31 0 11.84-4.51 11.84-13v-3.19h-.34c-2.18 2.69-6.38 5.04-11.68 5.04-11.09 0-21.25-9.66-21.25-22.09 0-12.52 10.16-22.26 21.25-22.26 5.29 0 9.49 2.35 11.68 4.96h.34v-3.61h9.25zm-8.56 20.92c0-7.81-5.21-13.52-11.84-13.52-6.72 0-12.35 5.71-12.35 13.52 0 7.73 5.63 13.36 12.35 13.36 6.63 0 11.84-5.63 11.84-13.36z"/>
      <path d="M225 3v65h-9.5V3h9.5z"/>
      <path d="M262.02 54.48l7.56 5.04c-2.44 3.61-8.32 9.83-18.48 9.83-12.6 0-22.01-9.74-22.01-22.18 0-13.19 9.49-22.18 20.92-22.18 11.51 0 17.14 9.16 18.98 14.11l1.01 2.52-29.65 12.28c2.27 4.45 5.8 6.72 10.75 6.72 4.96 0 8.4-2.44 10.92-6.14zm-23.27-7.98l19.82-8.23c-1.09-2.77-4.37-4.7-8.23-4.7-4.95 0-11.84 4.37-11.59 12.93z"/>
      <path d="M35.29 41.41V32h34.2c.34 1.76.51 3.84.51 6.09 0 7.57-2.07 16.9-8.73 23.56-6.49 6.74-14.78 10.33-25.78 10.33C16.32 72 0 56.2 0 36.71 0 17.22 16.32 1.42 35.49 1.42c11.26 0 19.29 4.38 25.3 10.1l-7.15 7.15c-4.36-4.04-10.26-7.15-18.15-7.15-14.83 0-26.42 11.93-26.42 26.19 0 14.26 11.59 26.19 26.42 26.19 9.62 0 15.1-3.87 18.61-7.39 2.85-2.85 4.73-6.93 5.47-12.51H35.29z"/>
    </svg>
  )
}

function IconNVIDIA() {
  return (
    <svg height="16" viewBox="0 0 300 58" fill="currentColor" aria-label="NVIDIA">
      <text y="46" fontFamily="Inter, system-ui, sans-serif" fontSize="50" fontWeight="800" letterSpacing="-1">NVIDIA</text>
    </svg>
  )
}

function IconESA() {
  return (
    <svg height="20" viewBox="0 0 120 38" fill="currentColor" aria-label="European Space Agency">
      <text y="30" fontFamily="Inter, system-ui, sans-serif" fontSize="32" fontWeight="700" letterSpacing="1">ESA</text>
    </svg>
  )
}

function IconStationF() {
  return (
    <svg height="14" viewBox="0 0 160 28" fill="currentColor" aria-label="Station F">
      <text y="22" fontFamily="Inter, system-ui, sans-serif" fontSize="16" fontWeight="600" letterSpacing="3.5">STATION F</text>
    </svg>
  )
}

function IconDLI() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ background: '#C8860A' }}>
        <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '8px', fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>DLI</span>
      </div>
      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
        DL INDABA
      </span>
    </div>
  )
}

// ── Card component ────────────────────────────────────────────────────────────
function Card({ children, className = '', accent = false }: {
  children: React.ReactNode
  className?: string
  accent?: boolean
}) {
  return (
    <div
      className={className}
      style={{
        background: accent ? '#f0f4f9' : '#ffffff',
        border: `1px solid ${accent ? 'rgba(10,36,99,0.12)' : '#e2e8f0'}`,
        borderLeft: accent ? '3px solid #0A2463' : undefined,
        borderRadius: '10px',
        boxShadow: '0 1px 3px rgba(10,36,99,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
      }}
    >
      {children}
    </div>
  )
}

// ── Section label ─────────────────────────────────────────────────────────────
function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' }}>
      {children}
    </p>
  )
}

// ── Heading style ─────────────────────────────────────────────────────────────
const h2Style = { fontVariationSettings: "'wght' 580", letterSpacing: '-0.025em', color: '#111827' }

// ── Data ──────────────────────────────────────────────────────────────────────
const shifts = {
  before: [
    'One satellite, one mission. A weather satellite does weather. A comms satellite does comms. The category defines the capability.',
    'Designed and launched by large contractors. Years of lead time. Hundreds of millions per mission.',
    'No coordination layer across operators. Each constellation manages itself in isolation.',
    'Africa depends almost entirely on external satellite infrastructure it did not build and does not control.',
  ],
  after: [
    'One platform, multiple missions. The same satellite carries different payloads for different operators at different times.',
    'Small enough for a university lab. Affordable enough for a research grant. Fast enough to iterate.',
    'A shared coordination and safety layer that treats satellites as a networked system — not isolated units.',
    'Sovereign orbital infrastructure, designed in Africa, operated by African institutions, serving African priorities.',
  ],
}

const stages = [
  {
    n: '01', title: 'Orbital Intelligence', active: true,
    desc: 'Building the coordination, safety, and simulation systems required to operate nanosatellite networks at scale. The architecture that makes everything else possible.',
  },
  {
    n: '02', title: 'Onboard Systems', active: false,
    desc: 'Embedding the coordination and safety architecture directly into the satellite. Intelligence at the edge — no ground station dependency for routine decisions.',
  },
  {
    n: '03', title: 'Multipurpose Platforms', active: false,
    desc: 'A programmable nanosatellite platform for African research institutions. One vehicle, multiple missions, accessible without a dedicated launch program.',
  },
]

const traction = [
  { icon: <IconDLI />,      desc: "Africa's leading ML research community. Where we first presented the coordination thesis." },
  { icon: <IconGoogle />,   desc: 'Infrastructure support for large-scale simulation and machine learning development.' },
  { icon: <IconNVIDIA />,   desc: 'Compute platform for onboard orbital intelligence and edge inference.' },
  { icon: <IconESA />,      desc: 'European Space Agency engagement on orbital safety and coordination standards.' },
  { icon: <IconStationF />, desc: 'Paris. Deep-tech infrastructure and aerospace network access.' },
]

const proofStats = [
  { n: '15,432', label: 'satellites tracked in simulation' },
  { n: 'Sub-second', label: 'coordination response time' },
  { n: '3+', label: 'African institutions engaged' },
  { n: 'Stage 01', label: 'of three — orbital intelligence' },
]

// ── Page ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const shiftRef  = useReveal()
  const stageRef  = useReveal()
  const tractRef  = useReveal()
  const joinRef   = useReveal()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: '112px',
          paddingBottom: '96px',
          borderBottom: '1px solid #e2e8f0',
          /* Dot grid — very subtle */
          backgroundImage: 'radial-gradient(circle, rgba(10,36,99,0.055) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        {/* Orbital arc + horizon glow drawn in SVG */}
        <OrbitalArc />

        {/* Soft radial light from top-right — mimics logo's sun */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-80px', right: '-80px',
            width: '600px', height: '600px',
            background: 'radial-gradient(circle, rgba(200,134,10,0.06) 0%, rgba(30,95,168,0.04) 45%, transparent 70%)',
            borderRadius: '50%',
          }}
          aria-hidden
        />

        <div className="max-w-[1100px] mx-auto px-8 relative z-10">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-6 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
            <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1E5FA8' }}>
              Ikirere Orbital Labs Africa
            </p>
          </div>

          {/* Headline */}
          <h1
            className="mb-6"
            style={{
              fontSize: 'clamp(2.6rem, 5.5vw, 4rem)',
              fontVariationSettings: "'wght' 600",
              letterSpacing: '-0.035em',
              lineHeight: '1.03',
              color: '#111827',
              maxWidth: '760px',
            }}
          >
            Building Africa's<br />
            <span style={{ color: '#0A2463' }}>Orbital Infrastructure</span>
          </h1>

          <p className="mb-10" style={{ fontSize: '1.1rem', color: '#64748b', maxWidth: '520px', lineHeight: '1.65' }}>
            The coordination layer for the next generation of multipurpose nanosatellites.
            Software first. Hardware when the architecture is proven.
          </p>

          <div className="flex gap-3 flex-wrap">
            <a
              href="https://orbit.ikirere.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: '#0A2463', color: '#fff',
                fontSize: '13px', fontWeight: 500, letterSpacing: '0.01em',
                padding: '10px 22px', borderRadius: '7px',
                boxShadow: '0 1px 3px rgba(10,36,99,0.3), 0 1px 2px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0d2d7a')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0A2463')}
            >
              See it in orbit
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7h9M7.5 3l4 4-4 4"/></svg>
            </a>
            <Link
              to="/about"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                background: 'transparent', color: '#0A2463',
                fontSize: '13px', fontWeight: 500,
                padding: '10px 22px', borderRadius: '7px',
                border: '1px solid rgba(10,36,99,0.25)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = '#0A2463'; (e.currentTarget as HTMLElement).style.background = '#f0f4f9' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(10,36,99,0.25)'; (e.currentTarget as HTMLElement).style.background = 'transparent' }}
            >
              Our approach
            </Link>
          </div>
        </div>
      </section>

      {/* ── Proof strip ──────────────────────────────── */}
      <div style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div className="max-w-[1100px] mx-auto px-8 py-8 grid grid-cols-2 md:grid-cols-4"
          style={{ gap: '0', divideX: '1px solid #e2e8f0' }}>
          {proofStats.map((s, i) => (
            <div key={s.n}
              className={i > 0 ? 'border-l border-[#e2e8f0]' : ''}
              style={{ padding: '0 32px 0 i === 0 ? 0 : 32px' }}>
              <div style={{ padding: '0 0 0', paddingLeft: i === 0 ? '0' : '32px', paddingRight: '32px' }}>
                <p style={{ fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#0A2463', fontVariationSettings: "'wght' 580" }}>{s.n}</p>
                <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '3px', lineHeight: 1.4 }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── The Shift ────────────────────────────────── */}
      <section className="py-24 max-w-[1100px] mx-auto px-8">
        <div ref={shiftRef} className="reveal">
          <Label>The Transition</Label>
          <h2 className="text-3xl mb-3" style={h2Style}>
            Satellites are still at the mainframe stage.
          </h2>
          <p style={{ color: '#64748b', maxWidth: '580px', fontSize: '0.95rem', marginBottom: '40px', lineHeight: '1.7' }}>
            Computers went from room-sized and single-purpose to small, networked, and programmable. One device does everything. Satellites are approaching the same transition — and the bottleneck is not hardware. It is the absence of coordination, safety, and intelligence infrastructure.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden"
            style={{ border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {/* Before */}
            <div style={{ padding: '36px 40px', background: '#fff', borderRight: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '20px' }}>
                Satellites today
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {shifts.before.map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#cbd5e1', flexShrink: 0, marginTop: '7px' }} />
                    <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.65' }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* After */}
            <div style={{ padding: '36px 40px', background: '#f0f4f9', borderLeft: '3px solid #0A2463' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E5FA8', marginBottom: '20px' }}>
                IOLA's direction
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {shifts.after.map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, marginTop: '7px' }} />
                    <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.65' }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── What We're Building ───────────────────────── */}
      <section className="py-24 max-w-[1100px] mx-auto px-8">
        <div ref={stageRef} className="reveal">
          <Label>The Architecture</Label>
          <h2 className="text-3xl mb-12" style={h2Style}>Three stages. Built in sequence.</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 overflow-hidden"
            style={{ border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {stages.map((s, i) => (
              <div key={s.n}
                style={{
                  padding: '36px 32px',
                  background: s.active ? '#f0f4f9' : '#fff',
                  borderLeft: s.active ? '3px solid #0A2463' : '3px solid transparent',
                  borderRight: i < 2 ? '1px solid #e2e8f0' : 'none',
                  transition: 'background 0.2s',
                }}>
                <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: s.active ? '#0A2463' : '#94a3b8', marginBottom: '16px' }}>
                  Stage {s.n}
                </p>
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: s.active ? '#0A2463' : '#111827', marginBottom: '10px', letterSpacing: '-0.01em' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>{s.desc}</p>
                {s.active && (
                  <div className="flex items-center gap-2 mt-5"
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '7px',
                      fontSize: '10px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase',
                      color: '#0A2463', background: 'rgba(10,36,99,0.07)',
                      padding: '4px 12px', borderRadius: '100px',
                    }}>
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8860A', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
                    In development
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Live System ───────────────────────────────── */}
      <section className="py-24 px-8" style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="max-w-[1100px] mx-auto">
          <Label>The Simulation</Label>
          <h2 className="text-3xl mb-3" style={h2Style}>The architecture, running live.</h2>
          <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '520px', marginBottom: '32px', lineHeight: '1.7' }}>
            15,432 real satellites. Real orbital dynamics. The coordination system operating against actual data — before any hardware has flown.
          </p>

          <div style={{
            position: 'relative', borderRadius: '10px', overflow: 'hidden',
            border: '1px solid #d1d9e6',
            height: '480px',
            background: '#0a0e1a',
            boxShadow: '0 4px 24px rgba(10,36,99,0.12), 0 1px 4px rgba(0,0,0,0.08)',
          }}>
            <iframe
              src="https://orbit.ikirere.com"
              title="IOLA Orbit — live satellite simulation"
              loading="lazy"
              style={{ width: '100%', height: '100%', border: 'none', display: 'block', pointerEvents: 'none' }}
              sandbox="allow-scripts allow-same-origin"
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,14,26,0.6) 0%, transparent 45%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px 24px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', pointerEvents: 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#C8860A', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>orbit.ikirere.com — live</span>
              </div>
              <a href="https://orbit.ikirere.com" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '13px', color: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px', pointerEvents: 'all', transition: 'gap 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.gap = '9px')}
                onMouseLeave={e => (e.currentTarget.style.gap = '5px')}>
                Open Orbit
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7h9M7.5 3l4 4-4 4"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Recognition ──────────────────────────────── */}
      <section className="py-24 max-w-[1100px] mx-auto px-8">
        <div ref={tractRef} className="reveal">
          <Label>Partners & Recognition</Label>
          <h2 className="text-3xl mb-12" style={h2Style}>Who we work alongside.</h2>

          <div className="grid grid-cols-2 md:grid-cols-5 overflow-hidden"
            style={{ border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(10,36,99,0.04)' }}>
            {traction.map((t, i) => (
              <div key={i}
                style={{
                  padding: '28px 24px',
                  background: '#fff',
                  borderRight: i < 4 ? '1px solid #e2e8f0' : 'none',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}>
                <div style={{ height: '28px', display: 'flex', alignItems: 'center', color: '#334155', marginBottom: '14px' }}>
                  {t.icon}
                </div>
                <p style={{ fontSize: '12px', color: '#94a3b8', lineHeight: '1.6' }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Join Us ───────────────────────────────────── */}
      <section className="py-24 max-w-[1100px] mx-auto px-8">
        <div ref={joinRef} className="reveal">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div style={{ maxWidth: '520px' }}>
              <Label>Work With Us</Label>
              <h2 className="text-3xl mb-4" style={h2Style}>
                The work is long-term.<br />That's deliberate.
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.7' }}>
                We are building orbital infrastructure with a five-year technical roadmap. We need orbital mechanics researchers, systems engineers, RL practitioners, and firmware developers who understand that the most important infrastructure is built slowly and correctly.
              </p>
            </div>
            <Link
              to="/careers"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px', alignSelf: 'flex-start',
                background: '#0A2463', color: '#fff',
                fontSize: '13px', fontWeight: 500,
                padding: '10px 22px', borderRadius: '7px',
                boxShadow: '0 1px 3px rgba(10,36,99,0.3)',
                transition: 'background 0.2s', whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#0d2d7a')}
              onMouseLeave={e => (e.currentTarget.style.background = '#0A2463')}
            >
              View Open Roles
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7h9M7.5 3l4 4-4 4"/></svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
