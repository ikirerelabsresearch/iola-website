import PageSEO from '../components/PageSEO'

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' }}>
      {children}
    </p>
  )
}

export default function Contact() {
  const items = [
    {
      type: 'Email',
      content: (
        <a href="mailto:jason@ikirere.com"
          style={{ color: '#0A2463', fontSize: '15px', fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          jason@ikirere.com
        </a>
      ),
    },
    {
      type: 'LinkedIn',
      content: (
        <a href="https://www.linkedin.com/company/ikirere-orbital-labs-africa" target="_blank" rel="noopener noreferrer"
          style={{ color: '#0A2463', fontSize: '15px', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'opacity 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          Ikirere Orbital Labs
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10L10 2M10 2H5M10 2v5"/></svg>
        </a>
      ),
    },
    {
      type: 'Platform',
      content: (
        <a href="https://orbit.ikirere.com" target="_blank" rel="noopener noreferrer"
          style={{ color: '#0A2463', fontSize: '15px', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'opacity 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          orbit.ikirere.com
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10L10 2M10 2H5M10 2v5"/></svg>
        </a>
      ),
    },
  ]

  const focus = [
    'Orbital simulation infrastructure',
    'Orbital intelligence systems',
    'Autonomous spacecraft coordination',
    'Multipurpose nanosatellite architectures',
    'Spacecraft and mission development',
    'Strategic partnerships and fundraising',
  ]

  const topics = [
    'Strategic partnerships',
    'Research collaboration',
    'Aerospace and space systems engineering',
    'Investment and fundraising',
    'University and institutional engagement',
    'Space mission development',
    'Media and speaking opportunities',
  ]

  return (
    <>
      <PageSEO
        title="Contact — Partnerships & Collaboration"
        description="Contact Ikirere Orbital Labs for partnerships, investment discussions, research collaboration, media inquiries, and mission-aligned opportunities."
        path="/contact"
        schema={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          "url": "https://ikirere.com/contact",
          "name": "Contact Ikirere Orbital Labs",
          "isPartOf": { "@id": "https://ikirere.com/#website" }
        }}
      />

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
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.08', color: '#111827', marginBottom: '16px' }}>
            Get in touch
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '460px' }}>
            Partnerships, investment discussions, research collaboration, media inquiries, and mission-aligned opportunities. We work with researchers, universities, space agencies, investors, operators, and organizations advancing the future of space infrastructure.
          </p>
        </div>
      </section>

      <section className="py-20 max-w-[720px] mx-auto px-8">

        {/* Contact card */}
        <div style={{
          border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden',
          boxShadow: '0 1px 3px rgba(10,36,99,0.05)', maxWidth: '460px', marginBottom: '48px',
        }}>
          {items.map((item, i) => (
            <div key={item.type} style={{
              display: 'flex', gap: '24px', alignItems: 'center',
              padding: '20px 24px',
              borderBottom: i < items.length - 1 ? '1px solid #f1f5f9' : 'none',
              background: '#fff',
            }}>
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', minWidth: '70px' }}>
                {item.type}
              </span>
              <div>{item.content}</div>
            </div>
          ))}
        </div>

        {/* Before you reach out */}
        <div style={{ marginBottom: '40px' }}>
          <Label>Before You Reach Out</Label>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#111827', marginBottom: '16px', fontVariationSettings: "'wght' 580" }}>
            The most productive conversations usually involve one of the following:
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {topics.map(t => (
              <div key={t} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{t}</p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '16px', lineHeight: '1.7' }}>
            When contacting us, include a brief introduction, relevant background, and what you would like to discuss.
          </p>
        </div>

        <div style={{ height: '1px', background: '#e2e8f0', margin: '40px 0' }} />

        {/* Current focus */}
        <div style={{ marginBottom: '40px' }}>
          <Label>Current Focus</Label>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '-0.02em', color: '#111827', marginBottom: '16px', fontVariationSettings: "'wght' 580" }}>
            Ikirere Orbital Labs is currently focused on:
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {focus.map(f => (
              <div key={f} style={{ display: 'flex', gap: '10px', alignItems: 'baseline' }}>
                <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#0A2463', flexShrink: 0, display: 'inline-block', opacity: 0.5 }} />
                <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.7' }}>{f}</p>
              </div>
            ))}
          </div>
        </div>

        <p style={{ fontSize: '13.5px', color: '#111827', fontWeight: 600, letterSpacing: '-0.01em' }}>
          We respond fastest to mission-aligned opportunities.
        </p>

      </section>
    </>
  )
}
