
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
        <a href="https://linkedin.com/company/ikirere-orbital-labs-africa" target="_blank" rel="noopener noreferrer"
          style={{ color: '#0A2463', fontSize: '15px', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'opacity 0.15s' }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.75')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
          Ikirere Orbital Labs
          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 10L10 2M10 2H5M10 2v5"/></svg>
        </a>
      ),
    },
    {
      type: 'Live Simulation',
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
        <div className="max-w-[720px] mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
            <Label>Contact</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.08', color: '#111827', marginBottom: '16px' }}>
            Get in touch
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '400px' }}>
            Technical collaboration, research partnerships, institutional engagement, and mission-aligned inquiries.
          </p>
        </div>
      </section>

      {/* ── Contact card ──────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div
          style={{
            border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden',
            boxShadow: '0 1px 3px rgba(10,36,99,0.05)',
            maxWidth: '460px',
          }}
        >
          {items.map((item, i) => (
            <div
              key={item.type}
              style={{
                display: 'flex', gap: '24px', alignItems: 'center',
                padding: '20px 24px',
                borderBottom: i < items.length - 1 ? '1px solid #f1f5f9' : 'none',
                background: '#fff',
              }}
            >
              <span style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#94a3b8', minWidth: '60px' }}>
                {item.type}
              </span>
              <div>{item.content}</div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '24px', maxWidth: '400px', lineHeight: '1.7' }}>
          For technical collaboration or research engagement, include a brief overview of your background, area of interest, and what you're proposing. Serious inquiries are reviewed directly by the team.
        </p>
      </section>
    </>
  )
}
