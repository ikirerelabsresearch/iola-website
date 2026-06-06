import { useEffect, useRef } from 'react'
import PageSEO from '../components/PageSEO'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' }}>
      {children}
    </p>
  )
}

const STATUS_STYLE: Record<string, { color: string; bg: string; dot: string }> = {
  'Operational':        { color: '#0A2463', bg: 'rgba(10,36,99,0.07)',   dot: '#0A2463' },
  'Active Development': { color: '#22c55e', bg: 'rgba(34,197,94,0.09)',  dot: '#22c55e' },
  'Planning & Design':  { color: '#C8860A', bg: 'rgba(200,134,10,0.09)', dot: '#C8860A' },
  'Long-Term Vision':   { color: '#94a3b8', bg: '#f1f5f9',               dot: '#94a3b8' },
}

const updates = [
  {
    date: 'May 2026',
    status: 'Operational',
    title: 'Orbit Platform Operational',
    body: 'The first layer of the IOLA architecture is now operational. The platform continuously ingests orbital datasets, propagates active spacecraft, synchronizes orbital states, and provides a real-time operational view of Earth orbit.',
    detail: 'Today the system tracks more than 15,000 active satellites and orbital objects across LEO, MEO, and GEO. This foundation enables every future capability built by IOLA, including orbital intelligence, autonomous coordination, mission planning, and spacecraft operations.',
    bullets: null as string[] | null,
  },
  {
    date: 'June 2026',
    status: 'Operational',
    title: 'Orbital Intelligence Layer Deployed',
    body: 'The second layer of the architecture is focused on understanding orbital behaviour rather than simply tracking it. The platform can now reason about orbital relationships and generate operational insights from live orbital data.',
    detail: null as string | null,
    bullets: [
      'Conjunction assessment',
      'Closest approach analysis',
      'Orbital forecasting',
      'Relative motion modelling',
      'Coverage estimation',
      'Operational mission analysis',
    ] as string[] | null,
  },
  {
    date: 'In Development',
    status: 'Active Development',
    title: 'IkirereMesh Autonomous Coordination',
    body: 'Development is underway on IkirereMesh, the coordination layer that enables multiple spacecraft to operate as a unified system.',
    detail: 'The long-term objective is autonomous orbital infrastructure capable of coordinating spacecraft operations with minimal human intervention.' as string | null,
    bullets: [
      'Autonomous mission scheduling',
      'Distributed spacecraft coordination',
      'Collision avoidance policies',
      'Reinforcement learning systems',
      'Coverage optimization',
      'Mission prioritization',
      'Fleet-level operational intelligence',
    ] as string[] | null,
  },
  {
    date: 'Next Milestone',
    status: 'Planning & Design',
    title: 'Flight Systems Program',
    body: 'Following validation of the software stack, IOLA is preparing the transition toward flight-capable spacecraft systems.',
    detail: 'The objective is a flight-ready multipurpose nanosatellite platform designed to support multiple missions from a common spacecraft architecture.' as string | null,
    bullets: [
      'Spacecraft architecture',
      'Subsystem design',
      'Mission requirements',
      'Payload integration studies',
      'Ground operations planning',
      'Launch readiness preparation',
    ] as string[] | null,
  },
  {
    date: 'Long-Term Vision',
    status: 'Long-Term Vision',
    title: 'Beyond Individual Spacecraft',
    body: "Most satellites today operate independently. IOLA's long-term vision is autonomous orbital infrastructure: networks of spacecraft, software, and ground systems operating together as a coordinated platform.",
    detail: 'The goal is not simply to launch satellites. The goal is to build the infrastructure layer that future space economies depend on.' as string | null,
    bullets: null as string[] | null,
  },
]

export default function Updates() {
  const listRef = useReveal()

  return (
    <>
      <PageSEO
        title="Progress Updates — Building Orbital Infrastructure"
        description="Major milestones and technical progress at Ikirere Orbital Labs: orbit platform operational, orbital intelligence deployed, IkirereMesh in development, flight systems program in planning."
        path="/updates"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Ikirere Orbital Labs Progress Updates",
          "url": "https://ikirere.com/updates",
          "description": "Technical milestones, research progress, and infrastructure developments at Ikirere Orbital Labs.",
          "publisher": { "@id": "https://ikirere.com/#organization" }
        }}
      />

      {/* ── Page hero ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ padding: '80px 0 64px', borderBottom: '1px solid #e2e8f0' }}
      >
        <div className="absolute pointer-events-none" style={{ top: '-60px', right: '-40px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(30,95,168,0.05) 0%, transparent 65%)', borderRadius: '50%' }} aria-hidden />
        <div className="max-w-[1100px] mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
            <Label>Progress</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.08', color: '#111827', marginBottom: '16px' }}>
            Progress Updates
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '480px' }}>
            Building orbital infrastructure is a long-term effort. This page documents major milestones, technical progress, and infrastructure developments across Ikirere Orbital Labs.
          </p>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={listRef} className="reveal">
          {updates.map((u, i) => {
            const st = STATUS_STYLE[u.status] ?? STATUS_STYLE['Long-Term Vision']
            const isLast = i === updates.length - 1

            return (
              <div key={u.title} style={{ display: 'flex', gap: '0' }}>

                {/* Timeline spine */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '32px', flexShrink: 0 }}>
                  <div style={{
                    width: '10px', height: '10px', borderRadius: '50%',
                    background: st.dot, flexShrink: 0, marginTop: '6px',
                    boxShadow: `0 0 0 3px ${st.bg}`,
                  }} />
                  {!isLast && (
                    <div style={{
                      width: '1px', flexGrow: 1, minHeight: '40px',
                      background: 'linear-gradient(to bottom, #e2e8f0 0%, #f1f5f9 100%)',
                      margin: '8px 0',
                    }} />
                  )}
                </div>

                {/* Content */}
                <div style={{ flex: 1, paddingBottom: isLast ? 0 : '52px', paddingLeft: '20px' }}>
                  {/* Meta */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>{u.date}</span>
                    <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1', display: 'inline-block' }} />
                    <span style={{
                      fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: st.color, background: st.bg,
                      padding: '3px 9px', borderRadius: '100px',
                    }}>
                      {u.status}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#111827', marginBottom: '12px', lineHeight: '1.35' }}>
                    {u.title}
                  </h2>

                  {/* Body */}
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8', marginBottom: u.bullets || u.detail ? '12px' : 0 }}>
                    {u.body}
                  </p>

                  {/* Bullets */}
                  {u.bullets && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', margin: '12px 0' }}>
                      {u.bullets.map(b => (
                        <div key={b} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: st.dot, flexShrink: 0, display: 'inline-block', opacity: 0.7 }} />
                          <span style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{b}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Detail */}
                  {u.detail && (
                    <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8', marginTop: '12px' }}>
                      {u.detail}
                    </p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
