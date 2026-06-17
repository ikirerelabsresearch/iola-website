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

const h2 = { fontVariationSettings: "'wght' 580", letterSpacing: '-0.025em', color: '#111827' }

const team = [
  {
    initials: 'JQ',
    photo: '/jason-ggle.jpg',
    name: 'Jason Quist',
    role: 'Founder & CEO · Kigali, Rwanda',
    bio: 'Founder, systems architect, and researcher focused on autonomous systems, space technology, spacecraft autonomy, and long-term aerospace innovation. Leads company strategy, research direction, product development, and technical vision.',
  },
  {
    initials: 'MM',
    photo: '/mayank.jpeg',
    name: 'Mayank Mutha',
    role: 'Co-Founder & Head of Spacecraft Systems · India',
    bio: 'Aerospace engineer focused on spacecraft systems, mission design, and nanosatellite development. Contributes across systems engineering, spacecraft architecture, hardware development, and long-term technical execution of the IOLA roadmap.',
  },
  {
    initials: 'AD',
    photo: '/alph.jpg',
    name: 'Alph Doamekpor',
    role: 'Strategy & Aerospace Advisor · Germany',
    bio: 'Aerospace advisor with experience across major international space organizations including ESA, NASA, and EUMETSAT. Provides guidance across mission architecture, systems engineering, and long-term aerospace strategy.',
  },
]

const beliefs = [
  {
    heading: 'First Principles Thinking',
    body: 'We begin with the underlying physics, constraints, and realities of the problem rather than assumptions about how things have always been done.',
  },
  {
    heading: 'Long-Term Thinking',
    body: 'Space systems require patience. Meaningful advances are measured in years, not weeks.',
  },
  {
    heading: 'Validation Before Claims',
    body: 'Capabilities are validated through research, testing, and evidence before they become part of the company narrative.',
  },
  {
    heading: 'Progress Through Iteration',
    body: 'Complex systems are built step by step. Every stage should reduce uncertainty and increase confidence.',
  },
]

const stages = [
  {
    n: '01',
    title: 'Research & Simulation',
    desc: 'Developing the environments and tools required to study spacecraft behavior, orbital dynamics, and mission operations.',
  },
  {
    n: '02',
    title: 'Autonomy & Coordination',
    desc: 'Researching intelligent decision-making systems capable of supporting future autonomous spacecraft operations.',
  },
  {
    n: '03',
    title: 'Multipurpose Nanosatellite Development',
    desc: 'Applying validated research toward the design and development of programmable autonomous nanosatellite platforms.',
  },
]

const autonomyPoints = [
  'Respond to changing conditions',
  'Optimize mission performance',
  'Manage routine operations',
  'Improve operational efficiency',
  'Scale beyond traditional management approaches',
]

const researchAreas = [
  'Orbital simulation',
  'Orbital mechanics',
  'Conjunction assessment',
  'Autonomous decision systems',
  'Reinforcement learning research',
  'Nanosatellite architecture development',
]

const applications = [
  'Earth observation',
  'Environmental monitoring',
  'Communications: Internet, Voice, SMS',
  'Logistics support',
  'Scientific research',
]

export default function About() {
  const missionRef    = useReveal()
  const buildingRef   = useReveal()
  const autonomyRef   = useReveal()
  const researchRef   = useReveal()
  const stagesRef     = useReveal()
  const teamRef       = useReveal()
  const beliefRef     = useReveal()
  const closingRef    = useReveal()

  return (
    <>
      {/* ── Page hero ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ padding: '80px 0 64px', borderBottom: '1px solid #e2e8f0' }}
      >
        <div
          className="absolute pointer-events-none"
          style={{ top: '-60px', right: '-40px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(200,134,10,0.05) 0%, transparent 65%)', borderRadius: '50%' }}
          aria-hidden
        />
        <div className="max-w-[720px] mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
            <Label>About IOLA</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.1', color: '#111827', marginBottom: '16px' }}>
            Building The Future Of<br />
            <span style={{ color: '#0A2463' }}>Multipurpose Spacecraft</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '540px' }}>
            Ikirere Orbital Labs is a team of ML researchers and aerospace engineers developing programmable autonomous multipurpose nanosatellites designed to perform multiple missions from a single spacecraft. Our mission is to help make space systems more capable, accessible, and adaptable for the next generation of space applications.
          </p>
        </div>
      </section>

      {/* ── Why We Exist ─────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={missionRef} className="reveal">
          <Label>Mission</Label>
          <h2 className="text-2xl mb-6" style={h2}>Why We Exist</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>For decades, most satellites have been designed around a simple principle: one spacecraft, one mission.</p>
            <p>A communications satellite handles communications. An Earth observation satellite performs imaging. A weather satellite performs weather monitoring.</p>
            <p>This approach has delivered tremendous value, but it also creates significant limitations. Development cycles remain long, costs remain high, and mission flexibility is constrained once a spacecraft reaches orbit.</p>
            <p>We believe the future will look different.</p>
            <p>Just as computers evolved from specialized machines into programmable platforms capable of supporting countless applications, we believe spacecraft will evolve into programmable autonomous systems capable of supporting multiple missions throughout their operational lifetime.</p>
            <p>IOLA exists to help build that future.</p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── What We Are Building ─────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={buildingRef} className="reveal">
          <Label>What We Are Building</Label>
          <h2 className="text-2xl mb-6" style={h2}>Programmable Autonomous Multipurpose Nanosatellites</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Our long-term objective is the development of nanosatellite systems that can support multiple mission profiles from a single spacecraft architecture.</p>
            <p>Potential applications include:</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '16px 0 20px 0' }}>
            {applications.map(a => (
              <div key={a} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{a}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            Rather than designing a new spacecraft for every mission, we are exploring how future satellite platforms can become more adaptable, reconfigurable, reusable and capable.
          </p>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Why Autonomy Matters ─────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={autonomyRef} className="reveal">
          <Label>Autonomy</Label>
          <h2 className="text-2xl mb-6" style={h2}>Spacecraft Must Become Smarter</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>As satellite networks grow and orbital environments become increasingly complex, human operators alone cannot manage every decision across every spacecraft.</p>
            <p>Future systems will require increasing levels of autonomy.</p>
            <p>Autonomous systems can help spacecraft:</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '16px 0 20px 0' }}>
            {autonomyPoints.map(a => (
              <div key={a} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{a}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>For us, autonomy is not a separate product.</p>
            <p>It is a foundational capability of future multipurpose spacecraft.</p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Why Research Comes First ─────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={researchRef} className="reveal">
          <Label>Research</Label>
          <h2 className="text-2xl mb-6" style={h2}>Build Carefully. Validate Early.</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Space is unforgiving.</p>
            <p>Mistakes discovered after launch are expensive, difficult to correct, and sometimes impossible to recover from.</p>
            <p>For that reason, we begin with research and validation.</p>
            <p>Our work includes:</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '16px 0 20px 0' }}>
            {researchAreas.map(r => (
              <div key={r} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{r}</p>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Every capability is studied, tested, and validated before it informs future spacecraft development.</p>
            <p>Research is not the destination.</p>
            <p>Research is how we reduce risk before building hardware.</p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Development Stages ───────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={stagesRef} className="reveal">
          <Label>Development Approach</Label>
          <h2 className="text-2xl mb-4" style={h2}>Building In Stages</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '24px' }}>We follow a phased development approach.</p>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)', marginBottom: '24px' }}>
            {stages.map((s, i) => (
              <div key={s.n} style={{
                padding: '24px 28px',
                borderBottom: i < stages.length - 1 ? '1px solid #e2e8f0' : 'none',
                background: '#fff',
              }}>
                <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '6px' }}>Phase {s.n}</p>
                <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', marginBottom: '6px', letterSpacing: '-0.01em' }}>{s.title}</p>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Each phase builds on the one before it.</p>
            <p>The goal is steady progress, not shortcuts.</p>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Team ──────────────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={teamRef} className="reveal">
          <Label>Team</Label>
          <h2 className="text-2xl mb-10" style={h2}>The People Building IOLA</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {team.map((m, i) => (
              <div key={m.name} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '28px 28px', background: '#fff', borderBottom: i < team.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                {m.photo ? (
                  <>
                    <img
                      src={m.photo}
                      alt={m.name}
                      onError={(e) => {
                        const t = e.currentTarget
                        t.style.display = 'none'
                        const fb = t.nextSibling as HTMLElement
                        if (fb) fb.style.display = 'flex'
                      }}
                      style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top', flexShrink: 0, display: 'block', border: '2px solid #e2e8f0' }}
                    />
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A2463, #1E5FA8)', display: 'none', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: '14px', flexShrink: 0, letterSpacing: '0.04em' }}>
                      {m.initials}
                    </div>
                  </>
                ) : (
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #0A2463, #1E5FA8)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 600, fontSize: '14px', flexShrink: 0, letterSpacing: '0.04em' }}>
                    {m.initials}
                  </div>
                )}
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111827' }}>{m.name}</p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', marginBottom: '10px', letterSpacing: '0.02em' }}>{m.role}</p>
                  <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.7' }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Philosophy ───────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={beliefRef} className="reveal">
          <Label>Philosophy</Label>
          <h2 className="text-2xl mb-10" style={h2}>Principles That Guide Our Work</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {beliefs.map((b, i) => (
              <div key={b.heading}
                style={{ padding: '28px 28px 28px 24px', borderBottom: i < beliefs.length - 1 ? '1px solid #e2e8f0' : 'none', borderLeft: '3px solid #e2e8f0', background: '#fff', transition: 'border-left-color 0.2s, background 0.2s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = '#0A2463'; (e.currentTarget as HTMLElement).style.background = '#f8fafc' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.background = '#fff' }}
              >
                <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111827', marginBottom: '8px' }}>{b.heading}</p>
                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.75' }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Closing ──────────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={closingRef} className="reveal">
          <Label>Vision</Label>
          <h2 className="text-2xl mb-6" style={h2}>Building Toward A More Capable Space Future</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>We believe future spacecraft will become more autonomous, more adaptable, and capable of supporting a broader range of missions than today's systems.</p>
            <p>Our focus is building toward that future through disciplined research, careful engineering, and long-term execution.</p>
          </div>
        </div>
      </section>
    </>
  )
}
