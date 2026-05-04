import PageSEO, { pageSEO } from '../components/PageSEO'

const D = {
  page: { minHeight: '100vh', background: '#040C1C', paddingTop: 88 },
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '52px 6vw 100px' },
  card: { background: 'rgba(8,18,40,0.8)', border: '1px solid rgba(0,220,255,0.12)', borderRadius: 14, padding: '28px 32px' },
  h1: { fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 3.8vw, 46px)', color: '#F5F7FA', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 14 },
  h2: { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22, color: '#F5F7FA', letterSpacing: '-0.01em', marginBottom: 16 },
  label: (c='#00DCFF') => ({ fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: `${c}80`, textTransform: 'uppercase', marginBottom: 8 }),
  badge: (c='#00DCFF') => ({ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', border: `1px solid ${c}30`, borderRadius: 100, background: `${c}08`, fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: c, textTransform: 'uppercase', marginBottom: 20 }),
  sub: { fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(245,247,250,0.58)', lineHeight: 1.7, maxWidth: 560 },
}

const partners = [
  { name: 'SpaceX', logo: '/partners/spacex-logo.png', category: 'Launch Services', desc: 'Launch services partner providing rideshare missions to LEO for Ikirere satellites and customer payloads.', url: 'https://www.spacex.com' },
  { name: 'Cerebras Systems', logo: '/partners/cerebras-logo.svg', category: 'AI Infrastructure', desc: 'AI compute infrastructure partner powering IkirereMesh training and simulation workloads.', url: 'https://www.cerebras.ai' },
  { name: 'Google', logo: '/partners/google-logo.png', category: 'Cloud & AI', desc: 'Cloud infrastructure and AI/ML tools supporting satellite data processing and constellation coordination.', url: 'https://cloud.google.com' },
]

const types = [
  { title: 'Launch Partners', desc: 'Reliable, cost-effective access to orbit for African satellites' },
  { title: 'Technology Partners', desc: 'Cutting-edge AI/ML infrastructure for coordination and safety' },
  { title: 'Academic Partners', desc: 'Collaboration with African universities on space research and training' },
  { title: 'Agency Partners', desc: 'Working with space agencies to advance orbital safety standards' },
]

const reasons = [
  { title: 'Pan-African Reach', body: 'Access to the growing African space market with direct relationships to universities, research institutions, and government agencies.' },
  { title: 'Rapid Innovation', body: 'Agile development cycles and deployment-focused approach. From concept to orbit in months, not years.' },
  { title: 'Proven Technology', body: 'IkirereMesh SDK with mathematically proven safety guarantees. Production-ready CubeSat kits.' },
  { title: 'Mission Alignment', body: 'Shared commitment to democratizing space access, advancing orbital safety, and building sustainable infrastructure.' },
]

export default function Partnerships() {
  return (
    <div style={D.page}>
      <PageSEO {...pageSEO.partnerships} />
      <div style={D.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div style={D.badge()}><span>Partners</span></div>
          <h1 style={D.h1}>Our <span style={{ background: 'linear-gradient(135deg,#00DCFF,#0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Partners</span></h1>
          <p style={D.sub}>Building Africa's space infrastructure with world-class technology and launch partners.</p>
        </div>

        {/* Strategic Partners */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.label()}>Strategic Partners</div>
          <h2 style={D.h2}>Strategic Partners</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {partners.map((p, i) => (
              <div key={i} style={D.card}>
                <div style={{ height: 56, display: 'flex', alignItems: 'center', marginBottom: 16 }}>
                  <img src={p.logo} alt={p.name} style={{ maxHeight: 36, maxWidth: 120, objectFit: 'contain', filter: 'brightness(0) invert(1) opacity(0.8)' }} />
                </div>
                <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: 'rgba(255,191,0,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>{p.category}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: '#F5F7FA', marginBottom: 8 }}>{p.name}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)', lineHeight: 1.65, marginBottom: 14 }}>{p.desc}</p>
                <a href={p.url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#00DCFF', textDecoration: 'none' }}>
                  Visit Website
                  <svg viewBox="0 0 12 12" width="11" height="11" fill="none"><path d="M2 10L10 2M10 2H5M10 2v5" stroke="#00DCFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership types */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.label()}>Opportunities</div>
          <h2 style={D.h2}>Partnership Opportunities</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            {types.map((t, i) => (
              <div key={i} style={D.card}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#00DCFF', marginBottom: 10 }} />
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#F5F7FA', marginBottom: 5 }}>{t.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.5)', lineHeight: 1.6 }}>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why partner */}
        <div style={{ ...D.card, border: '1px solid rgba(255,191,0,0.15)', marginBottom: 44 }}>
          <div style={D.label('#FFBF00')}>Why Partner</div>
          <h2 style={D.h2}>Why Partner With Ikirere</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            {reasons.map((r, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#00DCFF', marginBottom: 5 }}>{r.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)', lineHeight: 1.65 }}>{r.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 18, color: '#F5F7FA', marginBottom: 8 }}>Interested in Partnering?</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.45)', marginBottom: 24 }}>We're always looking for strategic partners who share our vision of making space accessible across Africa.</p>
          <a href="mailto:team@ikirere.com?subject=Partnership Inquiry" style={{ padding: '11px 32px', background: 'linear-gradient(135deg,#00DCFF,#0088FF)', borderRadius: 8, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: '#040C1C', textDecoration: 'none', display: 'inline-block' }}>Get in Touch</a>
        </div>
      </div>
    </div>
  )
}
