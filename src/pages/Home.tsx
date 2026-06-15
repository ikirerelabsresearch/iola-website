import { useEffect, useRef, Suspense, lazy } from 'react'
import { Link } from 'react-router'

const SatelliteViewer = lazy(() => import('../components/SatelliteViewer'))


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
    // Travelling wave: dasharray = [visible segment, gap]
    // Animate dashoffset from 1200 → 0 continuously — the segment
    // appears to travel left-to-right across the path
    const LENGTH = 600
    const SEG    = 220   // length of the visible travelling segment
    const GAP    = LENGTH - SEG

    el.style.strokeDasharray  = `${SEG} ${GAP + SEG}`
    el.style.strokeDashoffset = `${SEG + GAP}`
    el.style.transition = 'none'
    el.style.opacity    = '1'

    let offset = SEG + GAP
    let rafId: number

    const step = () => {
      offset -= 1.6  // speed: pixels per frame
      if (offset < -SEG) offset = SEG + GAP   // seamless loop
      el.style.strokeDashoffset = String(offset)
      rafId = requestAnimationFrame(step)
    }
    rafId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(rafId)
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

// ── Partner logos — real assets from /public ─────────────────────────────────
const logoStyle: React.CSSProperties = {
  height: '28px',
  width: 'auto',
  maxWidth: '120px',
  objectFit: 'contain',
  objectPosition: 'left center',
  filter: 'none',
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
    'One satellite. One mission.',
    'Large development costs and long deployment timelines.',
    'Specialized systems designed for narrow operational objectives.',
    'Limited flexibility once deployed.',
  ],
  after: [
    'Programmable spacecraft capable of supporting multiple mission profiles.',
    'Autonomous onboard decision-making systems.',
    'Smaller, faster, and more adaptable satellite architectures.',
    'Greater access to space for researchers, institutions, and emerging space ecosystems.',
  ],
}

const stages = [
  {
    n: '01', title: 'Research & Simulation', active: true,
    desc: 'Building and validating the environments required to model spacecraft behavior, orbital dynamics, autonomy systems, and mission operations before hardware development begins.',
  },
  {
    n: '02', title: 'Autonomy & Coordination', active: false,
    desc: 'Researching autonomous decision-making systems and spacecraft coordination architectures that could support future multipurpose nanosatellite fleets.',
  },
  {
    n: '03', title: 'Multipurpose Nanosatellite Platform', active: false,
    desc: 'Applying validated research to the development of programmable autonomous nanosatellite systems capable of supporting multiple missions from a single platform.',
  },
]

const traction = [
  { icon: <img src="/deep-learning-indaba.png" alt="Deep Learning Indaba" style={logoStyle} />, desc: 'Deep Learning Indaba' },
  { icon: <img src="/google-1-1.svg"           alt="Google"              style={logoStyle} />, desc: 'Google' },
  { icon: <img src="/nvidia.svg"               alt="NVIDIA"              style={logoStyle} />, desc: 'NVIDIA' },
  { icon: <img src="/station-f.jpg"            alt="Station F"           style={logoStyle} />, desc: 'Station F' },
]

const pillars = [
  {
    label: 'Multipurpose',
    heading: 'One spacecraft. Multiple missions.',
    body: 'Future nanosatellites should not be limited to a single task. We are exploring architectures that allow a single platform to support communications, Earth observation, environmental monitoring, logistics, and future applications.',
  },
  {
    label: 'Autonomous',
    heading: 'Intelligence at the edge.',
    body: 'Future satellite systems must operate with greater independence, adaptability, and resilience. Autonomy enables spacecraft to make routine operational decisions without constant human intervention.',
  },
  {
    label: 'Accessible',
    heading: 'Lowering the barrier to space.',
    body: 'Our long-term goal is to make advanced satellite capabilities more accessible to researchers, institutions, and organizations that traditionally could not participate in space programs.',
  },
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
          paddingTop: 'clamp(40px, 8vw, 60px)',
          paddingBottom: 'clamp(40px, 8vw, 96px)',
          borderBottom: '1px solid #e2e8f0',
          /* Dot grid — very subtle */
          backgroundImage: 'radial-gradient(circle, rgba(10,36,99,0.030) 1px, transparent 1px)',
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

        <div className="max-w-[1100px] mx-auto px-8 relative z-10 flex flex-col md:flex-row items-center gap-10">

          {/* ── Left: copy ─────────────────────────────────────── */}
          <div style={{ flex: '0 0 auto', width: '100%', maxWidth: '460px' }}>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-6 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#1E5FA8' }}>
                Ikirere Orbital Labs
              </p>
            </div>

            <h1
              className="mb-6"
              style={{
                fontSize: 'clamp(1.6rem, 3.2vw, 2.6rem)',
                fontVariationSettings: "'wght' 600",
                letterSpacing: '-0.035em',
                lineHeight: '1.05',
                color: '#111827',
              }}
            >
              Building Programmable Autonomous<br />
              <span style={{ color: '#0A2463' }}>Multipurpose Nanosatellites</span>
            </h1>

            <p className="mb-10" style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.65' }}>
              Satellites today are typically built for a single mission. We are developing the next generation of programmable autonomous nanosatellites capable of performing multiple missions from a single spacecraft, reducing the cost and complexity of accessing space.
            </p>

            <div className="flex gap-3 flex-wrap">
              <Link
                to="/research"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  background: '#0A2463', color: '#fff',
                  fontSize: '13px', fontWeight: 500, letterSpacing: '0.01em',
                  padding: '10px 22px', borderRadius: '7px',
                  boxShadow: '0 1px 3px rgba(10,36,99,0.3)',
                  transition: 'background 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0d2d7a')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0A2463')}
              >
                See Our Research
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7h9M7.5 3l4 4-4 4"/></svg>
              </Link>
              <Link
                to="/about"
                style={{
                  display: 'inline-flex', alignItems: 'center',
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

          {/* ── Right: live 3D satellite — floats on hero, no box ── */}
          <div style={{ flex: '1 1 0', minWidth: 0, width: '100%', height: 'clamp(280px, 45vw, 480px)', position: 'relative' }}>
            <Suspense fallback={null}>
              <SatelliteViewer transparent />
            </Suspense>
          </div>

        </div>
      </section>

      {/* ── Pillars strip ─────────────────────────────── */}
      <div style={{ borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
        <div className="max-w-[1100px] mx-auto px-8 py-9 grid grid-cols-1 md:grid-cols-3">
          {pillars.map((p, i) => (
            <div key={p.label}
              className={i > 0 ? 'border-l border-border' : ''}
              style={{ padding: i === 0 ? '0 32px 0 0' : '0 32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E5FA8', marginBottom: '8px' }}>{p.label}</p>
              <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827', letterSpacing: '-0.01em', lineHeight: 1.4, marginBottom: '8px' }}>{p.heading}</p>
              <p style={{ fontSize: '13px', fontWeight: 400, color: '#64748b', lineHeight: 1.6 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── The Shift ────────────────────────────────── */}
      <section className="py-24 max-w-[1100px] mx-auto px-8">
        <div ref={shiftRef} className="reveal">
          <Label>The Transition</Label>
          <h2 className="text-3xl mb-3" style={h2Style}>
            Satellites Are Approaching Their Computing Moment
          </h2>
          <p style={{ color: '#64748b', maxWidth: '580px', fontSize: '0.95rem', marginBottom: '40px', lineHeight: '1.7' }}>
            Computers once filled entire rooms, cost millions of dollars, and were built for highly specialized tasks. Over time they became smaller, more powerful, programmable, and accessible to everyone. We believe satellite systems are approaching a similar transition.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden"
            style={{ border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {/* Before */}
            <div style={{ padding: '36px 40px', background: '#fff', borderRight: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '20px' }}>
                Satellites Today
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
                Where We Believe The Industry Is Going
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
          <Label>Our Approach</Label>
          <h2 className="text-3xl mb-3" style={h2Style}>Building In Sequence</h2>
          <p style={{ color: '#64748b', maxWidth: '580px', fontSize: '0.95rem', marginBottom: '40px', lineHeight: '1.7' }}>
            Developing advanced spacecraft requires rigorous validation before hardware ever reaches orbit. Our development process follows a staged approach designed to reduce risk, validate assumptions, and progressively increase system capability.
          </p>

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
                    <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
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
          <Label>Research</Label>
          <h2 className="text-3xl mb-3" style={h2Style}>Research Drives Everything</h2>
          <p style={{ fontSize: '0.95rem', color: '#64748b', maxWidth: '520px', marginBottom: '32px', lineHeight: '1.7' }}>
            Space systems are expensive to iterate in orbit. For that reason, we begin with research. Our work currently spans orbital simulation, orbital safety, spacecraft autonomy, reinforcement learning, mission coordination, and nanosatellite architecture development. Every capability is studied, modeled, tested, and validated before it becomes part of a future flight system.
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
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', animation: 'pulse 2s ease infinite' }} />
                <span style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>orbit.ikirere.com — live</span>
              </div>
              <a href="https://orbit.ikirere.com" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: '13px', color: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '5px', pointerEvents: 'all', transition: 'gap 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.gap = '9px')}
                onMouseLeave={e => (e.currentTarget.style.gap = '5px')}>
                Explore Research
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
          <h2 className="text-3xl mb-4" style={h2Style}>Building Alongside A Global Ecosystem</h2>
          <p style={{ color: '#64748b', maxWidth: '520px', fontSize: '0.95rem', marginBottom: '40px', lineHeight: '1.7' }}>
            These organizations represent communities, ecosystems, and networks that have supported various stages of our development journey.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 overflow-hidden"
            style={{ border: '1px solid #e2e8f0', borderRadius: '10px', boxShadow: '0 1px 3px rgba(10,36,99,0.04)' }}>
            {traction.map((t, i) => (
              <div key={i}
                style={{
                  padding: '28px 24px',
                  background: '#fff',
                  borderRight: i < 3 ? '1px solid #e2e8f0' : 'none',
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
                The Work Is Long-Term.<br />That's Deliberate.
              </h2>
              <p style={{ fontSize: '0.95rem', color: '#64748b', lineHeight: '1.7' }}>
                Building advanced space systems requires patience, technical rigor, and long-term thinking. We are interested in researchers, engineers, and builders who want to contribute to the future of autonomous spacecraft, nanosatellite systems, and space technology.
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
