import { useEffect, useRef } from 'react'

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

const updates = [
  {
    date: 'May 2026',
    phase: 'Phase 1',
    phaseColor: '#0A2463',
    title: 'Phase 1 Complete — Live Orbital Simulation Environment',
    body: [
      "IOLA's orbital simulation environment is now operating against live orbital datasets, tracking more than 15,000 active objects across low Earth orbit in real time.",
      'The platform supports constellation modelling, orbital manoeuvre simulation, conjunction monitoring, and distributed coordination testing within a unified orbital environment designed for large-scale validation.',
      'This system forms the foundation of the broader IOLA architecture. Every onboard coordination and autonomy system will be validated within this environment before deployment to flight hardware.',
    ],
  },
  {
    date: 'June 2026',
    phase: 'Phase 2',
    phaseColor: '#64748b',
    title: 'Phase 2 Begins — Orbital Intelligence and Autonomous Coordination',
    body: [
      'Development has begun on the next layer of the IOLA architecture: orbital intelligence and autonomous coordination systems for distributed nanosatellite operations.',
      'Current work focuses on conjunction assessment, orbital risk analysis, and real-time coordination systems capable of operating across dense satellite environments.',
      'The long-term objective is a shared coordination and safety layer that enables autonomous nanosatellite fleets to operate as adaptive orbital networks rather than isolated spacecraft.',
      'Parallel work has also begun on the IkirereMesh coordination architecture and the underlying simulation systems required for large-scale validation.',
    ],
  },
]

export default function Updates() {
  const listRef = useReveal()

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
        <div className="absolute pointer-events-none" style={{ top: '-60px', right: '-40px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(30,95,168,0.05) 0%, transparent 65%)', borderRadius: '50%' }} aria-hidden />
        <div className="max-w-[1100px] mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
            <Label>Updates</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.08', color: '#111827', marginBottom: '16px' }}>
            What we've built.<br />What comes next.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '440px' }}>
            Development milestones, research progress, and system architecture updates across the IOLA orbital stack.
          </p>
        </div>
      </section>

      {/* ── Log ───────────────────────────────────────── */}
      <section className="py-16 max-w-[720px] mx-auto px-8">
        <div ref={listRef} className="reveal">
          {updates.map((u, i) => (
            <article
              key={u.title}
              style={{
                padding: '44px 0',
                borderBottom: i < updates.length - 1 ? '1px solid #e2e8f0' : 'none',
              }}
            >
              {/* Meta row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 500 }}>{u.date}</span>
                <span style={{ width: '3px', height: '3px', borderRadius: '50%', background: '#cbd5e1', display: 'inline-block' }} />
                <span style={{
                  fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: u.phaseColor,
                  background: u.phase === 'Phase 1' ? 'rgba(10,36,99,0.07)' : '#f1f5f9',
                  padding: '3px 9px', borderRadius: '100px',
                }}>
                  {u.phase}
                </span>
              </div>

              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#111827', marginBottom: '20px', lineHeight: '1.35' }}>
                {u.title}
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {u.body.map((p, j) => (
                  <p key={j} style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8' }}>{p}</p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
