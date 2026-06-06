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

// Status colour map: Active = navy, Development = slate, Long-Term = muted
const STATUS_COLOR: Record<string, string> = {
  'Active':      '#0A2463',
  'Development': '#64748b',
  'Long-Term':   '#94a3b8',
}

const areas = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <circle cx="10" cy="10" r="8"/><circle cx="10" cy="10" r="3"/>
        <line x1="10" y1="2" x2="10" y2="5"/><line x1="10" y1="15" x2="10" y2="18"/>
        <line x1="2" y1="10" x2="5" y2="10"/><line x1="15" y1="10" x2="18" y2="10"/>
      </svg>
    ),
    title: 'Orbital Operations & Autonomy',
    status: 'Active',
    desc: 'Mission planning, orbital safety, conjunction assessment, spacecraft scheduling, and autonomous operational decision systems.',
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
    title: 'Constellation Coordination',
    status: 'Active',
    desc: 'Distributed coordination architectures for multi-spacecraft operations, autonomous task allocation, and long-duration mission management.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="2" y="5" width="16" height="10" rx="1.5"/>
        <line x1="6" y1="9" x2="9" y2="9"/><line x1="6" y1="11" x2="11" y2="11"/>
        <circle cx="14" cy="10" r="2"/>
      </svg>
    ),
    title: 'Orbital Simulation Infrastructure',
    status: 'Active',
    desc: 'High-fidelity simulation environments used to validate mission architectures, operational procedures, and autonomous coordination systems before deployment.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <rect x="7" y="2" width="6" height="12" rx="1"/>
        <line x1="4" y1="8" x2="7" y2="8"/><line x1="13" y1="8" x2="16" y2="8"/>
        <path d="M6 17h8"/><line x1="10" y1="14" x2="10" y2="17"/>
      </svg>
    ),
    title: 'Spacecraft Systems',
    status: 'Development',
    desc: 'Multipurpose nanosatellite architectures, subsystem integration, payload flexibility, and software-defined spacecraft design.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M2 15 Q 6 8 10 12 Q 14 16 18 5"/>
        <circle cx="2" cy="15" r="1.2" fill="currentColor" stroke="none"/>
        <circle cx="18" cy="5" r="1.2" fill="currentColor" stroke="none"/>
      </svg>
    ),
    title: 'Ground Infrastructure',
    status: 'Development',
    desc: 'Ground systems, mission operations, telemetry workflows, communications infrastructure, and command architectures supporting orbital missions.',
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
        <path d="M10 2 L10 6 M17 10 L13 10 M10 18 L10 14"/>
        <circle cx="10" cy="10" r="3"/>
        <path d="M4 4 L7 7 M4 16 L7 13 M16 4 L13 7"/>
      </svg>
    ),
    title: 'Future Orbital Infrastructure',
    status: 'Long-Term',
    desc: 'Research into technologies that may support future orbital economies, cislunar operations, and autonomous space infrastructure beyond Earth orbit.',
  },
]

export default function Research() {
  const areasRef = useReveal()
  const stackRef = useReveal()
  const philoRef = useReveal()

  return (
    <>
      <PageSEO
        title="Research — Applied Orbital Infrastructure Research"
        description="Ikirere Orbital Labs conducts applied research across orbital operations, autonomous systems, spacecraft architecture, constellation coordination, and simulation environments — all tied to real-world deployment."
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
            Research that advances autonomous orbital infrastructure. Ikirere Orbital Labs conducts applied research across orbital operations, autonomous systems, spacecraft architecture, and simulation environments. Every research effort supports technologies intended for real-world deployment.
          </p>
        </div>
      </section>

      {/* ── Research areas ────────────────────────────── */}
      <section className="py-20 max-w-[1100px] mx-auto px-8">
        <div ref={areasRef} className="reveal">
          <Label>Research Areas</Label>
          <h2 className="text-2xl mb-10" style={h2Style}>Research areas.</h2>

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
                    color: STATUS_COLOR[a.status] ?? '#94a3b8',
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

      {/* ── Simulation Environment ────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={stackRef} className="reveal">
          <Label>Simulation</Label>
          <h2 className="text-2xl mb-8" style={h2Style}>Simulation environment.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>The simulation environment serves as the development and validation layer for IOLA's orbital systems.</p>
            <p>Satellite operations, orbital safety logic, mission planning, and autonomous coordination algorithms are tested extensively in simulation before hardware deployment.</p>
            <p>The environment enables large-scale modelling of spacecraft behaviour, orbital interactions, communications workflows, and mission execution across thousands of active objects.</p>
            <p>By validating systems before deployment, simulation reduces risk, accelerates iteration, and provides a direct pathway from research to operational infrastructure.</p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Research Philosophy ───────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={philoRef} className="reveal">
          <Label>Philosophy</Label>
          <h2 className="text-2xl mb-8" style={h2Style}>Research philosophy.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>We do not pursue research for publication alone.</p>
            <p>Research is valuable when it improves real systems, reduces operational risk, enables new capabilities, or advances the infrastructure required for future space operations.</p>
            <p>Every research program at IOLA is tied to a deployment pathway.</p>
            <p>Our engineering philosophy is rooted in first-principles thinking. Assumptions are challenged before they become requirements. Requirements are questioned before systems are built. Complexity is treated as a cost rather than a feature.</p>
            <p>When designing spacecraft, software, simulations, or operational systems, we follow a simple progression:</p>
            <p style={{ fontWeight: 600, color: '#111827', letterSpacing: '-0.01em' }}>Question. Simplify. Optimize. Automate.</p>
            <p>We first challenge the problem itself and verify that the requirement is real. We then remove unnecessary components, processes, and constraints. Only after simplification do we optimize performance. Automation comes last.</p>
            <p>This approach allows small teams to build ambitious systems efficiently while avoiding unnecessary complexity, cost, and technical debt.</p>
            <p>The goal is not to build more technology. The goal is to build the minimum infrastructure required to accomplish the mission.</p>
          </div>
        </div>
      </section>
    </>
  )
}
