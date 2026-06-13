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

const methodology = [
  { step: 'Understand', desc: 'Study the physics, constraints, and operational realities of the problem.' },
  { step: 'Simulate',   desc: 'Build environments that allow ideas to be tested before implementation.' },
  { step: 'Validate',   desc: 'Measure performance, identify weaknesses, and compare against established baselines.' },
  { step: 'Iterate',    desc: 'Improve designs through repeated experimentation.' },
  { step: 'Deploy',     desc: 'Apply validated findings to future spacecraft systems.' },
]

const areas = [
  {
    title: 'Orbital Simulation',
    status: 'Active Research',
    body: 'Building simulation environments that model orbital dynamics, spacecraft behavior, mission operations, and future satellite interactions. Simulation allows us to evaluate ideas before they become hardware.',
    bullets: null as string[] | null,
  },
  {
    title: 'Orbital Mechanics & Propagation',
    status: 'Active Research',
    body: 'Researching how spacecraft move, interact, and evolve within orbital environments. This includes orbital propagation, trajectory analysis, mission planning, and long-term orbital behavior modeling.',
    bullets: null as string[] | null,
  },
  {
    title: 'Conjunction Assessment',
    status: 'Active Research',
    body: 'Developing systems that identify and evaluate potential close approaches between orbital objects. Understanding conjunction risk is an important part of future autonomous spacecraft operations.',
    bullets: null as string[] | null,
  },
  {
    title: 'Autonomous Systems',
    status: 'Active Research',
    body: 'Exploring how spacecraft can make intelligent operational decisions with minimal human intervention. Areas of interest include:',
    bullets: ['Autonomous planning', 'Decision making', 'Resource management', 'Mission adaptation', 'Operational optimization'],
  },
  {
    title: 'Reinforcement Learning',
    status: 'Research & Development',
    body: 'Researching reinforcement learning approaches for future autonomous spacecraft behavior. The objective is to understand how intelligent agents might eventually support mission execution, coordination, and decision-making in complex orbital environments. Current work focuses on experimentation, benchmarking, and environment development.',
    bullets: null as string[] | null,
  },
  {
    title: 'Multipurpose Nanosatellite Architecture',
    status: 'Research & Development',
    body: 'Researching spacecraft architectures capable of supporting multiple mission profiles from a single platform. This includes:',
    bullets: ['System design', 'Mission flexibility', 'Payload integration', 'Operational adaptability', 'Future onboard autonomy'],
  },
]

const currentFocus = [
  {
    title: 'Orbital Simulation',
    desc: 'Improving our ability to model and understand orbital environments.',
  },
  {
    title: 'Conjunction Assessment',
    desc: 'Developing methods for identifying and analyzing close orbital approaches.',
  },
  {
    title: 'Autonomous Systems Research',
    desc: 'Exploring decision-making systems that may contribute to future autonomous spacecraft operations.',
  },
]

const collaborators = [
  'Researchers',
  'Universities',
  'Aerospace engineers',
  'Machine learning practitioners',
  'Space agencies',
  'Technical collaborators',
]

export default function Research() {
  const introRef    = useReveal()
  const methodRef   = useReveal()
  const areasRef    = useReveal()
  const focusRef    = useReveal()
  const visionRef   = useReveal()
  const collabRef   = useReveal()

  return (
    <>
      {/* ── Page hero ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ padding: '80px 0 64px', borderBottom: '1px solid #e2e8f0' }}
      >
        <div className="absolute pointer-events-none" style={{ top: '-60px', right: '-40px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(30,95,168,0.05) 0%, transparent 65%)', borderRadius: '50%' }} aria-hidden />
        <div className="max-w-[720px] mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
            <Label>Research</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.08', color: '#111827', marginBottom: '16px' }}>
            Research Before Flight
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '520px' }}>
            Developing the scientific, engineering, and autonomy foundations required for programmable autonomous multipurpose nanosatellites.
          </p>
        </div>
      </section>

      {/* ── Why Research Matters ──────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={introRef} className="reveal">
          <Label>Introduction</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>Why Research Matters</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Space systems are expensive to build, difficult to modify, and unforgiving of mistakes.</p>
            <p>A software bug can be patched. A satellite already in orbit is far less forgiving.</p>
            <p>For that reason, research sits at the center of everything we do. Before hardware is designed, before systems are deployed, and before missions are flown, we validate ideas through simulation, experimentation, and first-principles engineering.</p>
            <p>Our goal is simple: reduce uncertainty before reaching orbit.</p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Research Methodology ──────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={methodRef} className="reveal">
          <Label>Research Methodology</Label>
          <h2 className="text-2xl mb-4" style={h2Style}>How We Approach Problems</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '24px' }}>
            Our research process follows a simple sequence:
          </p>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)', marginBottom: '24px' }}>
            {methodology.map((m, i) => (
              <div key={m.step} style={{
                display: 'flex', gap: '20px', alignItems: 'flex-start',
                padding: '20px 24px',
                borderBottom: i < methodology.length - 1 ? '1px solid #f1f5f9' : 'none',
                background: '#fff',
              }}>
                <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1E5FA8', flexShrink: 0, paddingTop: '2px', minWidth: '72px' }}>{m.step}</p>
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{m.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            This process allows us to move deliberately while reducing technical and operational risk.
          </p>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Research Areas ────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={areasRef} className="reveal">
          <Label>Research Areas</Label>
          <h2 className="text-2xl mb-4" style={h2Style}>Core Research Areas</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '32px' }}>
            The following research domains contribute directly to our long-term objective of developing autonomous multipurpose nanosatellites.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {areas.map((a, i) => (
              <div key={a.title} style={{
                padding: '28px 28px 28px 24px',
                borderBottom: i < areas.length - 1 ? '1px solid #e2e8f0' : 'none',
                borderLeft: '3px solid #e2e8f0',
                background: '#fff',
                transition: 'border-left-color 0.2s, background 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = '#0A2463'; (e.currentTarget as HTMLElement).style.background = '#f8fafc' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.background = '#fff' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px', gap: '12px' }}>
                  <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', letterSpacing: '-0.01em' }}>{a.title}</p>
                  <span style={{
                    fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: a.status === 'Active Research' ? '#0A2463' : '#64748b',
                    background: a.status === 'Active Research' ? 'rgba(10,36,99,0.07)' : '#f1f5f9',
                    padding: '3px 9px', borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0,
                  }}>
                    {a.status}
                  </span>
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7', marginBottom: a.bullets ? '10px' : 0 }}>{a.body}</p>
                {a.bullets && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    {a.bullets.map(b => (
                      <div key={b} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                        <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.4 }} />
                        <span style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{b}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Current Focus ─────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={focusRef} className="reveal">
          <Label>Current Development Focus</Label>
          <h2 className="text-2xl mb-4" style={h2Style}>What We Are Working On Today</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '24px' }}>
            Our current efforts are focused on three primary objectives:
          </p>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)', marginBottom: '24px' }}>
            {currentFocus.map((f, i) => (
              <div key={f.title} style={{
                padding: '24px 28px',
                borderBottom: i < currentFocus.length - 1 ? '1px solid #e2e8f0' : 'none',
                background: i === 0 ? '#f0f4f9' : '#fff',
                borderLeft: i === 0 ? '3px solid #0A2463' : '3px solid transparent',
              }}>
                <p style={{ fontWeight: 600, fontSize: '14px', color: '#111827', marginBottom: '4px', letterSpacing: '-0.01em' }}>{f.title}</p>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            These research areas form the foundation for later hardware development.
          </p>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Long-Term Vision ──────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={visionRef} className="reveal">
          <Label>Long-Term Research Vision</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>From Research To Spacecraft</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Research is not the final objective.</p>
            <p>The purpose of research is to inform engineering decisions.</p>
            <p>The insights generated through simulation, orbital analysis, autonomy research, and spacecraft architecture studies ultimately feed into the development of future programmable autonomous multipurpose nanosatellites.</p>
            <p>Every experiment, benchmark, and validation effort moves us one step closer to that goal.</p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Open Collaboration ────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={collabRef} className="reveal">
          <Label>Open Collaboration</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>Work With Us</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
            We welcome conversations with:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '28px' }}>
            {collaborators.map(c => (
              <div key={c} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{c}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '28px' }}>
            If your work aligns with our mission, we'd love to hear from you.
          </p>
          <a
            href="/contact"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#0A2463', color: '#fff',
              fontSize: '13px', fontWeight: 500,
              padding: '10px 22px', borderRadius: '7px',
              boxShadow: '0 1px 3px rgba(10,36,99,0.3)',
              transition: 'background 0.2s',
              textDecoration: 'none',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#0d2d7a')}
            onMouseLeave={e => (e.currentTarget.style.background = '#0A2463')}
          >
            Get In Touch
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7h9M7.5 3l4 4-4 4"/></svg>
          </a>
        </div>
      </section>
    </>
  )
}
