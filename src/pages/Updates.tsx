import { useEffect, useRef } from 'react'
import { Link } from 'react-router'

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

const h2Style = { fontVariationSettings: "'wght' 580", letterSpacing: '-0.025em', color: '#111827' }

const STATUS_STYLE: Record<string, { color: string; bg: string }> = {
  'Active':             { color: '#0A2463', bg: 'rgba(10,36,99,0.07)'   },
  'In Progress':        { color: '#22c55e', bg: 'rgba(34,197,94,0.09)'  },
  'Research Active':    { color: '#22c55e', bg: 'rgba(34,197,94,0.09)'  },
  'Concept Development':{ color: '#C8860A', bg: 'rgba(200,134,10,0.09)' },
  'Planned':            { color: '#64748b', bg: '#f1f5f9'               },
  'Future':             { color: '#94a3b8', bg: '#f1f5f9'               },
}

const roadmap = [
  {
    phase: '01',
    title: 'Research & Simulation',
    desc: 'Building the foundational environments required to study spacecraft behavior, orbital dynamics, mission operations, and future autonomous systems.',
    status: 'Active',
  },
  {
    phase: '02',
    title: 'Autonomy & Coordination',
    desc: 'Researching intelligent decision-making systems and coordination architectures for future autonomous spacecraft operations.',
    status: 'Planned',
  },
  {
    phase: '03',
    title: 'Multipurpose Nanosatellite Development',
    desc: 'Applying validated research toward the design and development of programmable autonomous multipurpose nanosatellites.',
    status: 'Future',
  },
]

const devItems = [
  'Orbital data ingestion',
  'Orbital propagation',
  'Simulation tooling',
  'Visualization systems',
  'Research infrastructure',
  'Validation environments',
]

const autonomyItems = [
  'Mission planning',
  'Autonomous decision-making',
  'Coordination strategies',
  'Reinforcement learning environments',
  'Future onboard autonomy systems',
]

const architectureItems = [
  'Mission flexibility',
  'Spacecraft modularity',
  'Payload integration',
  'Autonomous operations',
  'Long-term scalability',
]

const nextItems = [
  'Expanding simulation capabilities',
  'Improving orbital modeling',
  'Advancing autonomy research',
  'Refining spacecraft concepts',
  'Building technical foundations for future hardware development',
]

function StatusPill({ status }: { status: string }) {
  const st = STATUS_STYLE[status] ?? STATUS_STYLE['Future']
  return (
    <span style={{
      fontSize: '9px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase',
      color: st.color, background: st.bg,
      padding: '3px 9px', borderRadius: '100px', whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {status}
    </span>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
      {items.map(item => (
        <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
          <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.4 }} />
          <span style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{item}</span>
        </div>
      ))}
    </div>
  )
}

export default function Updates() {
  const introRef    = useReveal()
  const roadmapRef  = useReveal()
  const devRef      = useReveal()
  const researchRef = useReveal()
  const engRef      = useReveal()
  const learnRef    = useReveal()
  const nextRef     = useReveal()
  const collabRef   = useReveal()
  const closingRef  = useReveal()

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
            <Label>Updates</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.08', color: '#111827', marginBottom: '16px' }}>
            Our Progress
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '480px' }}>
            Progress updates, research milestones, technical breakthroughs, lessons learned, and development progress as we work toward programmable autonomous multipurpose nanosatellites.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-[720px] mx-auto px-8">

        {/* ── Introduction ──────────────────────────────── */}
        <div ref={introRef} className="reveal" style={{ marginBottom: '56px' }}>
          <Label>Introduction</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>Progress Over Hype</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Space technology is built over years, not weeks.</p>
            <p>This page serves as a transparent record of what we are building, what we are learning, and where we are heading next.</p>
            <p>Not every update will be a breakthrough. Some updates will simply represent progress. {"That's how real engineering works."}</p>
          </div>
        </div>

        {/* ── Roadmap ───────────────────────────────────── */}
        <div ref={roadmapRef} className="reveal" style={{ marginBottom: '56px' }}>
          <Label>Current Roadmap</Label>
          <h2 className="text-2xl mb-4" style={h2Style}>Our Development Journey</h2>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {roadmap.map((r, i) => (
              <div key={r.phase} style={{
                padding: '24px 28px',
                borderBottom: i < roadmap.length - 1 ? '1px solid #e2e8f0' : 'none',
                background: r.status === 'Active' ? '#f0f4f9' : '#fff',
                borderLeft: r.status === 'Active' ? '3px solid #0A2463' : '3px solid transparent',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px', gap: '12px' }}>
                  <div>
                    <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '4px' }}>Phase {r.phase}</p>
                    <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', letterSpacing: '-0.01em' }}>{r.title}</p>
                  </div>
                  <StatusPill status={r.status} />
                </div>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Dev update ────────────────────────────────── */}
        <div ref={devRef} className="reveal" style={{ marginBottom: '40px' }}>
          <Label>Latest Development Update</Label>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            <div style={{ padding: '20px 24px', background: '#f0f4f9', borderBottom: '1px solid #e2e8f0', borderLeft: '3px solid #0A2463', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', letterSpacing: '-0.01em' }}>Orbital Simulation Environment</p>
              <StatusPill status="In Progress" />
            </div>
            <div style={{ padding: '24px 28px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>
                Our current focus is the development of orbital simulation and validation environments that allow us to study spacecraft behavior before hardware development begins. Current work includes:
              </p>
              <BulletList items={devItems} />
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>
                The goal is to create a foundation for future autonomy and spacecraft development.
              </p>
            </div>
          </div>
        </div>

        {/* ── Research update ───────────────────────────── */}
        <div ref={researchRef} className="reveal" style={{ marginBottom: '40px' }}>
          <Label>Research Update</Label>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            <div style={{ padding: '20px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', borderLeft: '3px solid transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', letterSpacing: '-0.01em' }}>Autonomous Systems Research</p>
              <StatusPill status="Research Active" />
            </div>
            <div style={{ padding: '24px 28px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>
                Future autonomous spacecraft require robust decision-making capabilities. We are currently researching approaches to:
              </p>
              <BulletList items={autonomyItems} />
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>
                This work remains in the research and experimentation stage.
              </p>
            </div>
          </div>
        </div>

        {/* ── Engineering update ────────────────────────── */}
        <div ref={engRef} className="reveal" style={{ marginBottom: '56px' }}>
          <Label>Engineering Update</Label>
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            <div style={{ padding: '20px 24px', background: '#f8fafc', borderBottom: '1px solid #e2e8f0', borderLeft: '3px solid transparent', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
              <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', letterSpacing: '-0.01em' }}>Multipurpose Spacecraft Architecture</p>
              <StatusPill status="Concept Development" />
            </div>
            <div style={{ padding: '24px 28px', background: '#fff', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>
                Alongside software and simulation research, we continue exploring architectures for future multipurpose nanosatellites. Areas of investigation include:
              </p>
              <BulletList items={architectureItems} />
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>
                The objective is to better understand how future spacecraft can support multiple mission profiles from a single platform.
              </p>
            </div>
          </div>
        </div>

        {/* ── What We Learned ───────────────────────────── */}
        <div ref={learnRef} className="reveal" style={{ marginBottom: '56px', paddingTop: '40px', borderTop: '1px solid #e2e8f0' }}>
          <Label>What We Learned</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>Why We Share Progress</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Engineering progress is rarely linear. Some assumptions prove correct. Others require revision.</p>
            <p>Sharing updates helps document the journey, preserve lessons learned, and create accountability as we move forward.</p>
            <p>Our goal is to build carefully, learn continuously, and communicate honestly.</p>
          </div>
        </div>

        {/* ── What Comes Next ───────────────────────────── */}
        <div ref={nextRef} className="reveal" style={{ marginBottom: '56px' }}>
          <Label>What Comes Next</Label>
          <h2 className="text-2xl mb-4" style={h2Style}>Near-Term Focus</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '16px' }}>
            Over the coming months our primary focus remains:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
            {nextItems.map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{item}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            Every milestone should reduce uncertainty and increase confidence in the next stage of development.
          </p>
        </div>

        {/* ── Collaboration ─────────────────────────────── */}
        <div ref={collabRef} className="reveal" style={{ marginBottom: '56px', paddingTop: '40px', borderTop: '1px solid #e2e8f0' }}>
          <Label>Collaboration</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>Follow The Journey</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '28px' }}>
            We welcome researchers, engineers, students, advisors, and industry professionals interested in following our progress or contributing to the mission. If you'd like to collaborate, reach out through our contact page.
          </p>
          <Link
            to="/contact"
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
          </Link>
        </div>

        {/* ── Closing ───────────────────────────────────── */}
        <div ref={closingRef} className="reveal" style={{ paddingTop: '40px', borderTop: '1px solid #e2e8f0' }}>
          <Label>Our Commitment</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>Building One Step At A Time</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>The vision is ambitious.</p>
            <p>The process is deliberate.</p>
            <p>Research first. Validation second. Hardware when the time is right.</p>
            <p>{"That's how we intend to build."}</p>
          </div>
        </div>

      </section>
    </>
  )
}
