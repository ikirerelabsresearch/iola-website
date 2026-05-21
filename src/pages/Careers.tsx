import { useEffect, useRef } from 'react'

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

const roles = [
  { title: 'Orbital Mechanics', desc: 'Orbital propagation, conjunction analysis, mission planning, and satellite state modelling.' },
  { title: 'Aerospace Systems Engineering', desc: 'Nanosatellite architecture, subsystem integration, mission systems design, and operational spacecraft engineering.' },
  { title: 'Embedded Systems & Flight Software', desc: 'Onboard autonomy, flight systems engineering, and spacecraft software infrastructure.' },
  { title: 'Autonomous Systems & Machine Learning', desc: 'Reinforcement learning, autonomous coordination systems, orbital intelligence, and distributed decision architectures.' },
  { title: 'Simulation Engineering', desc: 'High-fidelity orbital simulation environments, physics-based modelling, and validation infrastructure.' },
  { title: 'Ground Systems', desc: 'Telemetry infrastructure, mission operations, communication systems, and orbital support architecture.' },
  { title: 'Guidance, Navigation & Control', desc: 'Attitude determination, orbital control systems, and autonomous spacecraft stabilization architectures.' },
]

export default function Careers() {
  const rolesRef = useReveal()
  const applyRef = useReveal()

  return (
    <>
      {/* ── Page hero ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: '80px 0 64px',
          borderBottom: '1px solid #e2e8f0',
          backgroundImage: 'radial-gradient(circle, rgba(10,36,99,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div className="absolute pointer-events-none" style={{ top: '-60px', right: '-40px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(200,134,10,0.05) 0%, transparent 65%)', borderRadius: '50%' }} aria-hidden />
        <div className="max-w-[720px] mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
            <Label>Careers</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.08', color: '#111827', marginBottom: '16px' }}>
            Build Africa's Orbital<br />Infrastructure With Us
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '500px' }}>
            A frontier aerospace research program building autonomous orbital infrastructure and programmable nanosatellite systems from Africa.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-[720px] mx-auto px-8">

        {/* Honest context */}
        <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', marginBottom: '48px', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
          <div style={{ padding: '12px 20px', background: '#f0f4f9', borderBottom: '1px solid #e2e8f0', borderLeft: '3px solid #0A2463' }}>
            <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E5FA8' }}>Honest context</p>
          </div>
          <div style={{ padding: '24px 28px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8' }}>
              IOLA is an early-stage aerospace research company operating pre-revenue and pre-funding. We are building long-horizon orbital infrastructure systems that require deep technical work, patience, and first-principles engineering.
            </p>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8' }}>
              The people joining now are not joining for startup perks. They are joining to help architect foundational systems at the earliest stage of the company's formation.
            </p>
            <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8' }}>
              In return, contributors gain direct exposure to frontier orbital systems development, applied aerospace research, and the opportunity to help shape the technical foundations of a long-term space infrastructure program.
            </p>
          </div>
        </div>

        {/* Roles */}
        <div ref={rolesRef} className="reveal">
          <Label>Areas of need</Label>
          <h2 className="text-2xl mb-8" style={h2Style}>Where we need help.</h2>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {roles.map((r, i) => (
              <div key={r.title}
                style={{
                  display: 'flex', gap: '16px', alignItems: 'flex-start',
                  padding: '20px 24px',
                  borderBottom: i < roles.length - 1 ? '1px solid #f1f5f9' : 'none',
                  background: '#fff',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#f8fafc')}
                onMouseLeave={e => (e.currentTarget.style.background = '#fff')}
              >
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, marginTop: '8px' }} />
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px', color: '#111827', marginBottom: '3px' }}>{r.title}</p>
                  <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Apply */}
        <div ref={applyRef} className="reveal" style={{ marginTop: '56px', paddingTop: '40px', borderTop: '1px solid #e2e8f0' }}>
          <Label>How to apply</Label>
          <h2 className="text-2xl mb-5" style={h2Style}>Apply directly.</h2>
          <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8', marginBottom: '10px' }}>
            Send an email to{' '}
            <a href="mailto:jason@ikirere.com?subject=IOLA — " style={{ color: '#0A2463', textDecoration: 'underline', textDecorationColor: 'rgba(10,36,99,0.3)' }}>
              jason@ikirere.com
            </a>{' '}
            with the subject: <strong style={{ color: '#111827' }}>IOLA — [Your Area]</strong>
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '16px 0 20px 0' }}>
            {['what you've built', 'what you want to work on', 'links to technical work, research, code, or projects'].map((item) => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', marginTop: '2px' }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{item}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8', marginBottom: '28px' }}>
            We care far more about demonstrated technical curiosity and systems thinking than formal credentials. Every serious technical inquiry is reviewed directly by the founding team.
          </p>
          <a
            href="mailto:jason@ikirere.com?subject=IOLA — "
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#0A2463', color: '#fff',
              fontSize: '13px', fontWeight: 500,
              padding: '10px 22px', borderRadius: '7px',
              boxShadow: '0 1px 3px rgba(10,36,99,0.3)',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0d2d7a')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0A2463')}
          >
            Send an Email
          </a>
        </div>
      </section>
    </>
  )
}
