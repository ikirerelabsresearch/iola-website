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
    title: 'Phase 1 Complete — Live Orbital State Infrastructure',
    body: [
      "IOLA's Phase 1 orbital infrastructure is now operational against live orbital datasets, continuously ingesting, propagating, synchronizing, and rendering real-world satellite behavior in real time.",
      'The system functions as a deterministic orbital state engine supporting telemetry ingestion, constellation simulation, orbital classification, propagation validation, and synchronized orbital visualization across thousands of active objects in orbit.',
      'The architecture includes live telemetry pipelines, propagation infrastructure, orbital state persistence, operational synchronization systems, and real-time constellation rendering designed for future autonomous orbital coordination.',
      'This foundational layer transforms the platform from static orbital visualization into a continuously operating orbital intelligence environment capable of supporting future onboard autonomy and distributed nanosatellite coordination systems.',
      'Phase 1 answers a foundational question: "Where are the satellites right now?"',
      'Every future coordination, autonomy, and orbital intelligence system within IOLA is built on top of this deterministic operational layer.',
    ],
  },
  {
    date: 'June 2026',
    phase: 'Phase 2',
    phaseColor: '#64748b',
    title: 'Phase 2 Begins — Orbital Intelligence Infrastructure',
    body: [
      'Phase 2 focuses on transforming the IOLA platform from an orbital state engine into a predictive orbital intelligence system capable of understanding, forecasting, and reasoning about satellite behavior in real time.',
      'Current development includes conjunction assessment, closest-approach prediction, orbital forecasting, communication window analysis, coverage estimation, and deterministic operational risk modelling across large-scale satellite environments.',
      'The system is designed to continuously evaluate orbital relationships between active objects, predict high-risk encounters, estimate future orbital state, and generate operational decision data for autonomous coordination systems.',
      'At the core of the architecture is a simple but foundational problem: "Given two satellites, how close will they get within a future time window?"',
      'Solving this at scale requires continuous orbital propagation, three-dimensional spatial analysis, relative velocity modelling, and deterministic risk evaluation across thousands of active orbital objects simultaneously.',
      'Phase 2 establishes the intelligence layer required for future autonomous manoeuvre planning, distributed fleet coordination, and onboard orbital decision-making systems.',
      'The platform no longer just tracks orbit. It understands orbital relationships, predicts future state, and produces actionable operational intelligence.',
    ],
  },
  {
    date: 'Q4 2026',
    phase: 'Upcoming',
    phaseColor: '#22c55e',
    title: 'Phase 3 Begins — IkirereMesh Autonomous Coordination',
    body: [
      'Phase 3 transitions IOLA from orbital intelligence infrastructure into autonomous constellation coordination systems.',
      'The focus shifts from understanding orbital state to coordinating satellite behavior dynamically across distributed nanosatellite fleets. This includes autonomous scheduling, multi-satellite orchestration, coverage optimization, anomaly response, and reinforcement learning driven operational coordination.',
      'IkirereMesh introduces the coordination layer for programmable orbital infrastructure: a distributed intelligence system capable of managing satellite relationships, mission priorities, telemetry awareness, and operational decision-making across an entire constellation.',
      'Core research areas entering active development include multi-satellite coordination policies, autonomous collision avoidance, adaptive coverage optimisation, fuel-aware manoeuvre planning, reinforcement learning coordination systems, distributed telemetry intelligence, constellation-wide operational memory, and subsystem health and degradation analytics.',
      'The long-term objective is a constellation architecture capable of autonomous operational behavior while maintaining deterministic safety constraints and verifiable orbital coordination guarantees.',
      'This phase establishes the foundation for self-coordinating multipurpose nanosatellite infrastructure operating as a unified orbital system rather than isolated spacecraft.',
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
