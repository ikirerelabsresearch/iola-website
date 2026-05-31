import { useEffect, useRef } from 'react'
import PageSEO from '../components/PageSEO'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.1 }
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

const h2Style = { fontVariationSettings: "'wght' 580", letterSpacing: '-0.025em', color: '#111827' }

const areas = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="10" cy="10" r="8"/><circle cx="10" cy="10" r="3"/>
        <line x1="10" y1="2" x2="10" y2="5"/><line x1="10" y1="15" x2="10" y2="18"/>
        <line x1="2" y1="10" x2="5" y2="10"/><line x1="15" y1="10" x2="18" y2="10"/>
      </svg>
    ),
    title: 'Orbital Intelligence',
    status: 'Active',
    statusColor: '#0A2463',
    desc: 'Autonomous coordination, manoeuvre planning, orbital safety, and constellation-scale decision systems for next-generation satellite networks.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M10 2L10 6M10 14L10 18M2 10L6 10M14 10L18 10"/>
        <circle cx="10" cy="10" r="3"/>
        <path d="M4.9 4.9l2.8 2.8M12.3 12.3l2.8 2.8M15.1 4.9l-2.8 2.8M7.7 12.3l-2.8 2.8"/>
      </svg>
    ),
    title: 'Conjunction Assessment',
    status: 'Active',
    statusColor: '#64748b',
    desc: 'Real-time orbital risk analysis and collision prediction systems for dense nanosatellite environments.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="10" cy="10" r="2.5"/>
        <circle cx="3.5" cy="5" r="1.5"/><circle cx="16.5" cy="5" r="1.5"/>
        <circle cx="3.5" cy="15" r="1.5"/><circle cx="16.5" cy="15" r="1.5"/>
        <line x1="5" y1="5" x2="8.5" y2="8.5"/><line x1="15" y1="5" x2="11.5" y2="8.5"/>
        <line x1="5" y1="15" x2="8.5" y2="11.5"/><line x1="15" y1="15" x2="11.5" y2="11.5"/>
      </svg>
    ),
    title: 'Autonomous Coordination Systems',
    status: 'Phase 3',
    statusColor: '#64748b',
    desc: 'Multi-agent coordination architectures for distributed satellite fleets operating as adaptive orbital networks.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="2" y="5" width="16" height="10" rx="1.5"/>
        <line x1="6" y1="9" x2="9" y2="9"/><line x1="6" y1="11" x2="11" y2="11"/>
        <circle cx="14" cy="10" r="2"/>
      </svg>
    ),
    title: 'Simulation Infrastructure',
    status: 'Active',
    statusColor: '#0A2463',
    desc: 'High-fidelity orbital simulation environments used to validate coordination, safety, and autonomy systems before hardware deployment.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="7" y="2" width="6" height="12" rx="1"/>
        <line x1="4" y1="8" x2="7" y2="8"/><line x1="13" y1="8" x2="16" y2="8"/>
        <path d="M6 17h8"/><line x1="10" y1="14" x2="10" y2="17"/>
      </svg>
    ),
    title: 'Hardware Systems',
    status: 'Phase 3',
    statusColor: '#94a3b8',
    desc: 'Compact programmable nanosatellite platforms designed for multipurpose missions across communications, sensing, and Earth observation.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M2 15 Q 6 8 10 12 Q 14 16 18 5"/>
        <circle cx="2" cy="15" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="18" cy="5" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
    title: 'Ground Systems',
    status: 'Phase 3',
    statusColor: '#64748b',
    desc: 'Ground communication, telemetry, and mission control infrastructure supporting autonomous orbital operations across Africa.',
  },
]

export default function Research() {
  const areasRef = useReveal()
  const stackRef = useReveal()

  return (
    <>
      <PageSEO
        title="Research — Orbital Intelligence & Autonomous Systems"
        description="IOLA research spans orbital intelligence, conjunction assessment, autonomous coordination, simulation infrastructure, hardware systems, and ground systems for next-generation nanosatellite networks."
        path="/research"
        schema={{
          "@context": "https://schema.org",
          "@type": "ResearchProject",
          "name": "IOLA Orbital Intelligence Research",
          "url": "https://ikirere.com/research",
          "description": "Applied research across orbital intelligence, autonomous coordination systems, simulation infrastructure, and next-generation nanosatellite architectures.",
          "funder": { "@id": "https://ikirere.com/#organization" },
          "keywords": "orbital intelligence, conjunction assessment, autonomous coordination, CubeSat, constellation management, reinforcement learning, satellite safety"
        }}
      />
      {/* ── Page hero ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: '80px 0 64px',
          borderBottom: '1px solid #e2e8f0',
          
          
        }}
      >
        <div className="absolute pointer-events-none" style={{ top: '-60px', right: '-40px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(30,95,168,0.05) 0%, transparent 65%)', borderRadius: '50%' }} aria-hidden />
        <div className="max-w-[1100px] mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
            <Label>Research</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.08', color: '#111827', marginBottom: '16px' }}>
            Research
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '520px' }}>
            Applied research across orbital intelligence, autonomous coordination systems, simulation infrastructure, and next-generation nanosatellite architectures.
          </p>
        </div>
      </section>

      {/* ── Research areas ────────────────────────────── */}
      <section className="py-20 max-w-[1100px] mx-auto px-8">
        <div ref={areasRef} className="reveal">
          <Label>Research Areas</Label>
          <h2 className="text-2xl mb-10" style={h2Style}>Core research domains driving the IOLA architecture.</h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1px', background: '#e2e8f0', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {areas.map(a => (
              <div key={a.title}
                style={{ background: '#fff', padding: '28px 28px', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div style={{ color: '#334155', opacity: 0.7 }}>{a.icon}</div>
                  <span style={{
                    fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: a.statusColor,
                    background: a.status === 'Active' ? 'rgba(10,36,99,0.07)' : '#f1f5f9',
                    padding: '3px 9px', borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    {a.status}
                  </span>
                </div>
                <h3 style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>{a.title}</h3>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>{a.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Validation Infrastructure ─────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={stackRef} className="reveal">
          <Label>Infrastructure</Label>
          <h2 className="text-2xl mb-8" style={h2Style}>Validation Infrastructure</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>IOLA's simulation environment acts as the validation layer for the entire orbital stack. Autonomous coordination systems, orbital safety logic, and constellation behaviours are tested against live orbital datasets before deployment to onboard systems.</p>
            <p>The environment supports large-scale constellation simulation, orbital manoeuvre modelling, conjunction analysis, and distributed coordination testing across thousands of active objects in orbit.</p>
            <p>Architecturally, the simulation layer is designed to transition directly into onboard flight systems, reducing the gap between research validation and operational deployment.</p>
          </div>
        </div>
      </section>
    </>
  )
}
