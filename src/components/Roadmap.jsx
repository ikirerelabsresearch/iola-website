import { useRef, useEffect, useState } from 'react'

function useInView(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return visible
}

function SectionLabel({ text, color = '#00DCFF' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <div style={{ width: 28, height: 1, background: color, opacity: 0.6 }} />
      <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, letterSpacing: '0.35em', color, textTransform: 'uppercase' }}>{text}</span>
    </div>
  )
}

const phases = [
  { phase: '01', status: 'In Progress', title: 'Sandbox Simulation', description: '32-satellite LEO simulation with RL planner and safety shield integration. WebGL dashboard.', active: true, color: '#FFBF00' },
  { phase: '02', status: 'Q1 2026', title: 'Real Orbital Data', description: 'ESA DRAMA and NASA CARA integration for real-time conjunction analysis and live TLE feeds.', active: false, color: '#00DCFF' },
  { phase: '03', status: 'Q2 2026', title: 'CubeSat Onboard', description: 'IkirereMesh deployed to flight-ready CubeSat hardware with onboard decision-making.', active: false, color: '#00DCFF' },
  { phase: '04', status: 'Q4 2026', title: 'Inter-Operator Protocol', description: 'Standardized mesh coordination for multi-operator constellations. ISO compliance.', active: false, color: '#00DCFF' },
]

export default function Roadmap() {
  const ref = useRef(null)
  const vis = useInView(ref)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  return (
    <section ref={ref} id="roadmap" style={{ background: 'linear-gradient(180deg, #040C1C 0%, #060F1E 50%, #040C1C 100%)', padding: '120px 6vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 80, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <SectionLabel text="Roadmap" />
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 60px)', color: '#F5F7FA', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Development{' '}
            <span style={{ background: 'linear-gradient(135deg, #00DCFF, #0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Roadmap</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: 'rgba(245,247,250,0.5)', marginTop: 16 }}>
            From simulation to orbit. A systematic path to sovereign orbital infrastructure.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative', marginBottom: 100 }}>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, transparent, rgba(0,220,255,0.2) 10%, rgba(0,220,255,0.2) 90%, transparent)', transform: 'translateX(-50%)' }} className="timeline-spine" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            {phases.map((p, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '1fr 64px 1fr', alignItems: 'center', gap: 0,
                opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(30px)',
                transition: `all 0.7s ease ${i * 0.15}s`,
              }} className="timeline-row">
                {/* Left content */}
                <div style={{ paddingRight: 40, textAlign: i % 2 === 0 ? 'right' : 'left', order: i % 2 === 0 ? 0 : 2 }}>
                  {i % 2 === 0 ? (
                    <div style={{ background: 'rgba(8,18,40,0.8)', border: `1px solid ${p.color}22`, borderRadius: 12, padding: '28px 32px' }}>
                      <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: p.color, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>{p.status}</div>
                      <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22, color: '#F5F7FA', marginBottom: 10 }}>{p.title}</h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,247,250,0.55)', lineHeight: 1.7 }}>{p.description}</p>
                    </div>
                  ) : <div />}
                </div>

                {/* Node */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', order: 1 }}>
                  <div style={{
                    width: 48, height: 48, borderRadius: '50%',
                    background: p.active ? 'linear-gradient(135deg, #FFBF00, #FF9500)' : 'rgba(8,18,40,0.9)',
                    border: `2px solid ${p.color}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: p.active ? '0 0 24px rgba(255,191,0,0.5)' : `0 0 16px rgba(0,220,255,0.1)`,
                    zIndex: 2, position: 'relative',
                  }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 14, color: p.active ? '#040C1C' : p.color }}>{p.phase}</span>
                    {p.active && <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', border: '1px solid rgba(255,191,0,0.3)', animation: 'nodePulse 2s ease-in-out infinite' }} />}
                  </div>
                </div>

                {/* Right content */}
                <div style={{ paddingLeft: 40, order: i % 2 === 0 ? 2 : 0 }}>
                  {i % 2 !== 0 ? (
                    <div style={{ background: 'rgba(8,18,40,0.8)', border: `1px solid ${p.color}22`, borderRadius: 12, padding: '28px 32px' }}>
                      <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: p.color, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>{p.status}</div>
                      <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22, color: '#F5F7FA', marginBottom: 10 }}>{p.title}</h3>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,247,250,0.55)', lineHeight: 1.7 }}>{p.description}</p>
                    </div>
                  ) : <div />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Waitlist CTA */}
        <div style={{
          background: 'rgba(8,18,40,0.9)', border: '1px solid rgba(0,220,255,0.15)',
          borderRadius: 20, padding: '64px 40px', textAlign: 'center', maxWidth: 700, margin: '0 auto',
          opacity: vis ? 1 : 0, transition: 'opacity 0.8s ease 0.6s', position: 'relative',
        }}>
          <div style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)', width: 300, height: 200, background: 'radial-gradient(ellipse, rgba(0,220,255,0.08), transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 32, color: '#F5F7FA', marginBottom: 12 }}>Join the Mission</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: 'rgba(245,247,250,0.55)', marginBottom: 36, lineHeight: 1.7 }}>
            Be part of Africa's space infrastructure revolution. Get early access to the IkirereMesh sandbox.
          </p>
          {!submitted ? (
            <form onSubmit={e => { e.preventDefault(); if (email) setSubmitted(true) }} style={{ display: 'flex', gap: 12, maxWidth: 480, margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" required
                style={{
                  flex: 1, minWidth: 220, padding: '13px 20px',
                  background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(0,220,255,0.25)',
                  borderRadius: 8, fontFamily: "'Inter', sans-serif", fontSize: 14,
                  color: '#F5F7FA', outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = '#00DCFF'}
                onBlur={e => e.target.style.borderColor = 'rgba(0,220,255,0.25)'}
              />
              <button type="submit" style={{
                padding: '13px 28px', background: 'linear-gradient(135deg, #FFBF00, #FF9500)',
                border: 'none', borderRadius: 8, fontFamily: "'Inter', sans-serif",
                fontWeight: 700, fontSize: 14, color: '#040C1C', cursor: 'pointer',
                whiteSpace: 'nowrap', letterSpacing: '0.05em',
              }}>Join Waitlist</button>
            </form>
          ) : (
            <div style={{ fontFamily: "'Roboto Mono', monospace", color: '#00DCFF', fontSize: 16 }}>✓ You're on the list. Early access opens Q1 2026.</div>
          )}
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.3)', marginTop: 16 }}>No spam, ever.</p>
        </div>
      </div>

      <style>{`
        @keyframes nodePulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.15); }
        }
        @media (max-width: 768px) {
          .timeline-spine { display: none !important; }
          .timeline-row { grid-template-columns: 1fr !important; gap: 12px !important; }
          .timeline-row > div { order: unset !important; padding: 0 !important; text-align: left !important; }
        }
      `}</style>
    </section>
  )
}
