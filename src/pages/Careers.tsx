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

const buildingItems = [
  'Orbital simulation systems',
  'Autonomous decision-making systems',
  'Orbital mechanics and conjunction analysis',
  'Reinforcement learning environments',
  'Spacecraft architectures',
  'Future onboard autonomy technologies',
]

const roles = [
  {
    title: 'Machine Learning & Autonomous Systems',
    desc: 'Reinforcement learning, autonomous decision-making, optimization systems, and intelligent spacecraft operations.',
  },
  {
    title: 'Orbital Mechanics',
    desc: 'Orbital propagation, conjunction assessment, trajectory analysis, mission planning, and orbital modeling.',
  },
  {
    title: 'Aerospace Engineering',
    desc: 'Spacecraft architecture, systems engineering, mission design, subsystem integration, and nanosatellite development.',
  },
  {
    title: 'Simulation Engineering',
    desc: 'Physics-based simulation environments, modeling frameworks, validation systems, and digital spacecraft development.',
  },
  {
    title: 'Software Engineering',
    desc: 'Platform development, infrastructure, data systems, visualization tools, and research tooling.',
  },
  {
    title: 'Embedded Systems & Flight Software',
    desc: 'Future onboard computing systems, firmware development, spacecraft software, and autonomy integration.',
  },
  {
    title: 'Research',
    desc: 'Academic research, experimentation, benchmarking, technical writing, and scientific validation.',
  },
]

const values = [
  'Think from first principles',
  'Learn quickly',
  'Enjoy difficult technical challenges',
  'Communicate clearly',
  'Care about engineering rigor',
  'Can work independently',
  'Are comfortable operating with uncertainty',
]

const applyItems = [
  'A brief introduction',
  'What interests you about the mission',
  "Projects you've worked on",
  'Relevant research, code, or technical work',
  'Anything else that demonstrates how you think',
]

export default function Careers() {
  const contextRef  = useReveal()
  const buildRef    = useReveal()
  const rolesRef    = useReveal()
  const valuesRef   = useReveal()
  const philoRef    = useReveal()
  const applyRef    = useReveal()
  const closingRef  = useReveal()

  return (
    <>
      {/* ── Page hero ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{ padding: '80px 0 64px', borderBottom: '1px solid #e2e8f0' }}
      >
        <div className="absolute pointer-events-none" style={{ top: '-60px', right: '-40px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(200,134,10,0.05) 0%, transparent 65%)', borderRadius: '50%' }} aria-hidden />
        <div className="max-w-[720px] mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
            <Label>Careers</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.08', color: '#111827', marginBottom: '16px' }}>
            Build The Future Of<br />
            <span style={{ color: '#0A2463' }}>Autonomous Spacecraft</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '500px' }}>
            Join us as we develop programmable autonomous multipurpose nanosatellites and the technologies that will power the next generation of space systems.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-[720px] mx-auto px-8">

        {/* ── Where we are ────────────────────────────── */}
        <div ref={contextRef} className="reveal" style={{ marginBottom: '56px' }}>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            <div style={{ padding: '12px 20px', background: '#f0f4f9', borderBottom: '1px solid #e2e8f0', borderLeft: '3px solid #0A2463' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E5FA8' }}>Where we are</p>
            </div>
            <div style={{ padding: '24px 28px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8' }}>
                IOLA is an early-stage aerospace research and engineering company. We are pre-revenue, pre-funding, and focused on solving difficult technical problems that may take years to fully realize.
              </p>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8' }}>
                The people joining today are not joining a mature aerospace company. They are helping build one. This stage requires curiosity, patience, and a willingness to work on problems with long development horizons and uncertain answers.
              </p>
              <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8' }}>
                In return, contributors gain direct exposure to frontier research, spacecraft development, autonomous systems, and the opportunity to help shape a company from its earliest stages.
              </p>
            </div>
          </div>
        </div>

        {/* ── What We Are Building ──────────────────────── */}
        <div ref={buildRef} className="reveal" style={{ marginBottom: '56px' }}>
          <Label>What We Are Building</Label>
          <h2 className="text-2xl mb-4" style={h2Style}>The Mission</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
            Our long-term objective is to develop programmable autonomous multipurpose nanosatellites capable of performing multiple missions from a single spacecraft platform. To get there, we are researching and developing:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            {buildingItems.map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{item}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>Every contributor helps move that mission forward.</p>
        </div>

        {/* ── Areas of Interest ─────────────────────────── */}
        <div ref={rolesRef} className="reveal" style={{ marginBottom: '56px' }}>
          <Label>Areas of Interest</Label>
          <h2 className="text-2xl mb-8" style={h2Style}>Where We Need Help</h2>

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

        {/* ── Who Thrives Here ──────────────────────────── */}
        <div ref={valuesRef} className="reveal" style={{ marginBottom: '56px' }}>
          <Label>Who Thrives Here</Label>
          <h2 className="text-2xl mb-4" style={h2Style}>What We Value</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
            We care more about how you think than where you studied. We look for people who:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
            {values.map(v => (
              <div key={v} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{v}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            Formal credentials are respected. Demonstrated curiosity and execution matter more.
          </p>
        </div>

        {/* ── Working Philosophy ────────────────────────── */}
        <div ref={philoRef} className="reveal" style={{ marginBottom: '56px', paddingTop: '40px', borderTop: '1px solid #e2e8f0' }}>
          <Label>Our Working Philosophy</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>Long-Term Thinking</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Building advanced space systems is not a sprint. The technologies we are researching today may take years to fully mature.</p>
            <p>We optimize for correctness, learning, and steady progress rather than shortcuts.</p>
            <p>The goal is not to move fast and break things. The goal is to build things that eventually work in orbit.</p>
          </div>
        </div>

        {/* ── Apply ─────────────────────────────────────── */}
        <div ref={applyRef} className="reveal" style={{ paddingTop: '40px', borderTop: '1px solid #e2e8f0' }}>
          <Label>How to Apply</Label>
          <h2 className="text-2xl mb-5" style={h2Style}>Apply Directly</h2>
          <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8', marginBottom: '6px' }}>
            Send an email to{' '}
            <a href="mailto:research@ikirere.com?subject=IOLA — " style={{ color: '#0A2463', textDecoration: 'underline', textDecorationColor: 'rgba(10,36,99,0.3)' }}>
              research@ikirere.com
            </a>
          </p>
          <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
            Subject: <strong style={{ color: '#111827' }}>IOLA — [Your Area Of Interest]</strong>
          </p>
          <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8', marginBottom: '10px' }}>Include:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '0 0 20px 0' }}>
            {applyItems.map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', marginTop: '2px' }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{item}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.8', marginBottom: '28px' }}>
            We review every serious technical inquiry directly.
          </p>
          <a
            href="mailto:research@ikirere.com?subject=IOLA — "
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
            Send An Email
          </a>
        </div>

      </section>

      {/* ── Closing ──────────────────────────────────────── */}
      <div style={{ borderTop: '1px solid #e2e8f0' }} />
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={closingRef} className="reveal">
          <Label>Join Us</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>Help Build What Comes Next</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>The future of space systems will be shaped by people willing to tackle difficult problems long before the answers are obvious.</p>
            <p>If that sounds like the kind of work you enjoy, we'd love to hear from you.</p>
          </div>
        </div>
      </section>
    </>
  )
}
