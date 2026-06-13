import { useEffect, useRef } from 'react'
import { Link } from 'react-router'

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

const partnershipAreas = [
  'Aerospace engineering',
  'Spacecraft systems',
  'Machine learning',
  'Reinforcement learning',
  'Orbital mechanics',
  'Simulation technologies',
  'Mission planning',
  'Ground systems',
]

const areasOfInterest = [
  'Research collaborations',
  'University partnerships',
  'Aerospace mentorship',
  'Technical advisory relationships',
  'Early-stage strategic partnerships',
  'Space industry connections',
  'Deep technology ecosystems',
  'Mission-aligned investors',
]

const responseItems = [
  'Who you are',
  "What you're working on",
  "Why you're reaching out",
  'How we might collaborate',
]

export default function Contact() {
  const optionsRef  = useReveal()
  const interestRef = useReveal()
  const connectRef  = useReveal()
  const philoRef    = useReveal()
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
            <Label>Contact</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.1', color: '#111827', marginBottom: '16px' }}>
            {"Let's Build The Future"}<br />
            <span style={{ color: '#0A2463' }}>Of Space Systems</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '480px' }}>
            We welcome conversations with researchers, engineers, universities, space agencies, investors, technical collaborators, and organizations interested in the future of autonomous multipurpose spacecraft.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-[720px] mx-auto px-8">

        {/* ── Contact Options ───────────────────────────── */}
        <div ref={optionsRef} className="reveal" style={{ marginBottom: '56px' }}>
          <Label>Contact Options</Label>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>

            <div style={{ padding: '28px 28px 28px 24px', borderBottom: '1px solid #e2e8f0', borderLeft: '3px solid #0A2463', background: '#f8fafc' }}>
              <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>General Inquiries</p>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7', marginBottom: '12px' }}>
                For general questions, introductions, partnership discussions, and company-related inquiries.
              </p>
              <a href="mailto:research@ikirere.com" style={{ color: '#0A2463', fontSize: '14px', fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'rgba(10,36,99,0.3)' }}>
                research@ikirere.com
              </a>
            </div>

            <div style={{ padding: '28px 28px 28px 24px', borderBottom: '1px solid #e2e8f0', borderLeft: '3px solid transparent', background: '#fff', transition: 'border-left-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = '#0A2463'; (e.currentTarget as HTMLElement).style.background = '#f8fafc' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; (e.currentTarget as HTMLElement).style.background = '#fff' }}
            >
              <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>Research Collaboration</p>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>
                Interested in collaborating on orbital mechanics, autonomous systems, reinforcement learning, spacecraft engineering, or related research areas? We are always open to discussions with researchers, universities, research groups, and technical specialists.
              </p>
            </div>

            <div style={{ padding: '28px 28px 28px 24px', borderBottom: '1px solid #e2e8f0', borderLeft: '3px solid transparent', background: '#fff', transition: 'border-left-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = '#0A2463'; (e.currentTarget as HTMLElement).style.background = '#f8fafc' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; (e.currentTarget as HTMLElement).style.background = '#fff' }}
            >
              <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>Technical Partnerships</p>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7', marginBottom: '12px' }}>
                {"If you're building technologies relevant to spacecraft development, autonomy, simulation, aerospace engineering, or space infrastructure, we'd love to learn more about your work. Potential areas include:"}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {partnershipAreas.map(a => (
                  <div key={a} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                    <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.4 }} />
                    <span style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ padding: '28px 28px 28px 24px', borderLeft: '3px solid transparent', background: '#fff', transition: 'border-left-color 0.2s, background 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = '#0A2463'; (e.currentTarget as HTMLElement).style.background = '#f8fafc' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = 'transparent'; (e.currentTarget as HTMLElement).style.background = '#fff' }}
            >
              <p style={{ fontWeight: 600, fontSize: '14.5px', color: '#111827', marginBottom: '8px', letterSpacing: '-0.01em' }}>Investment & Strategic Discussions</p>
              <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.7' }}>
                We welcome conversations with investors, accelerators, venture studios, strategic partners, and organizations interested in long-term aerospace innovation. When reaching out, please include a brief introduction and any relevant context so we can prepare appropriately.
              </p>
            </div>

          </div>
        </div>

        {/* ── Areas of Interest ─────────────────────────── */}
        <div ref={interestRef} className="reveal" style={{ marginBottom: '56px' }}>
          <Label>Current Areas of Interest</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>We Are Particularly Interested In</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {areasOfInterest.map(a => (
              <div key={a} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Connect ───────────────────────────────────── */}
        <div ref={connectRef} className="reveal" style={{ marginBottom: '56px' }}>
          <Label>Connect</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>Additional Resources</h2>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {[
              {
                label: 'LinkedIn',
                content: (
                  <a href="https://www.linkedin.com/company/ikirere-orbital-labs-africa" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#0A2463', fontSize: '14px', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    Ikirere Orbital Labs
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10L10 2M10 2H5M10 2v5"/></svg>
                  </a>
                ),
              },
              {
                label: 'Research',
                content: (
                  <Link to="/research"
                    style={{ color: '#0A2463', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    Research Page
                  </Link>
                ),
              },
              {
                label: 'Updates',
                content: (
                  <Link to="/updates"
                    style={{ color: '#0A2463', fontSize: '14px', fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    Company Updates
                  </Link>
                ),
              },
              {
                label: 'Platform',
                content: (
                  <a href="https://orbit.ikirere.com" target="_blank" rel="noopener noreferrer"
                    style={{ color: '#0A2463', fontSize: '14px', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '5px', transition: 'opacity 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
                    orbit.ikirere.com
                    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10L10 2M10 2H5M10 2v5"/></svg>
                  </a>
                ),
              },
            ].map((row, i, arr) => (
              <div key={row.label} style={{ display: 'flex', gap: '24px', alignItems: 'center', padding: '18px 24px', borderBottom: i < arr.length - 1 ? '1px solid #f1f5f9' : 'none', background: '#fff' }}>
                <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', minWidth: '64px' }}>{row.label}</span>
                <div>{row.content}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Response Philosophy ───────────────────────── */}
        <div ref={philoRef} className="reveal" style={{ marginBottom: '56px', paddingTop: '40px', borderTop: '1px solid #e2e8f0' }}>
          <Label>Response Philosophy</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>Every Serious Inquiry Is Read</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>As an early-stage company, we value thoughtful conversations. While response times may vary depending on workload and ongoing research activities, every serious inquiry receives direct review.</p>
            <p>We appreciate concise messages that clearly explain:</p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '14px' }}>
            {responseItems.map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Closing ───────────────────────────────────── */}
        <div ref={closingRef} className="reveal" style={{ paddingTop: '40px', borderTop: '1px solid #e2e8f0' }}>
          <Label>Get In Touch</Label>
          <h2 className="text-2xl mb-6" style={h2Style}>The Best Conversations Often Start With A Simple Message</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '28px' }}>
            {"Whether you're a researcher, engineer, student, founder, investor, or simply someone interested in the future of space systems, we're always happy to connect with thoughtful people working on ambitious problems."}
          </p>
          <a
            href="mailto:research@ikirere.com"
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
            Contact Us
            <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7h9M7.5 3l4 4-4 4"/></svg>
          </a>
        </div>

      </section>
    </>
  )
}
