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

const milestones = [
  { year: '2025', title: 'Foundation', desc: 'Ikirere Orbital Labs Africa founded in Kigali, Rwanda' },
  { year: 'Q2 2026', title: 'First Prototype', desc: 'IkirereMesh SDK alpha release to partner institutions' },
  { year: 'Q4 2026', title: 'CubeSat Production', desc: 'First 3U CubeSat kits delivered to African universities' },
  { year: 'Q2 2027', title: 'Launch', desc: 'First Ikirere satellites deployed via SpaceX rideshare' },
]

const values = [
  { title: 'African-First', desc: 'Building sovereign space infrastructure on the continent, for the continent' },
  { title: 'Open Access', desc: 'Democratizing orbital operations for universities and research labs' },
  { title: 'Safety First', desc: 'Deterministic collision avoidance to prevent space debris cascades' },
  { title: 'Rapid Innovation', desc: 'From concept to orbit in months, not years' },
]

const approach = [
  { n: '1', title: 'Integrated Hardware', body: 'Pre-built, launch-ready CubeSat kits with NVIDIA compute. No need to source components from dozens of suppliers.' },
  { n: '2', title: 'AI-Powered Coordination', body: 'IkirereMesh SDK combines RL for fuel-efficient planning with deterministic safety shields for collision-free guarantees.' },
  { n: '3', title: 'Launch Partnerships', body: 'Direct coordination with SpaceX rideshare missions. Streamlined path from lab to orbit.' },
  { n: '4', title: 'Local Support', body: 'Training, technical support, and community building for African space programs.' },
]

export default function About() {
  return (
    <div style={D.page}>
      <PageSEO {...pageSEO.about} />
      <div style={D.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div style={D.badge()}><span>About Us</span></div>
          <h1 style={D.h1}>About <span style={{ background: 'linear-gradient(135deg,#00DCFF,#0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ikirere</span></h1>
          <p style={D.sub}>Building the foundational infrastructure for the African space age.</p>
        </div>

        {/* Mission */}
        <div style={{ ...D.card, textAlign: 'center', marginBottom: 40 }}>
          <div style={D.label()}>Mission</div>
          <h2 style={{ ...D.h2, color: '#00DCFF' }}>Our Mission</h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(245,247,250,0.72)', lineHeight: 1.8, maxWidth: 720, margin: '0 auto' }}>
            To be the <span style={{ color: '#00DCFF', fontWeight: 600 }}>NVIDIA for Space</span> — providing hardware and software that enables African universities, research institutions, and governments to deploy satellites for scientific research, earth observation, and communications. Making LEO accessible across the continent with deterministic safety guarantees.
          </p>
        </div>

        {/* Problems */}
        <div style={{ marginBottom: 40 }}>
          <div style={D.label()}>The Problem</div>
          <h2 style={D.h2}>What We're Solving</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {[
              { title: 'Access Inequality', body: 'African institutions lack affordable, integrated satellite infrastructure. Current options require navigating complex international supply chains.', accent: '#FFBF00' },
              { title: 'Space Debris Crisis', body: 'With 34,000+ tracked objects in orbit and growing constellations, collision risk is escalating. Kessler Syndrome threatens orbital operations.', accent: '#FF4444' },
            ].map((p, i) => (
              <div key={i} style={{ ...D.card, border: `1px solid ${p.accent}22` }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: p.accent, marginBottom: 12 }} />
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: '#F5F7FA', marginBottom: 8 }}>{p.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.55)', lineHeight: 1.65 }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Approach */}
        <div style={{ ...D.card, marginBottom: 40 }}>
          <div style={D.label()}>Approach</div>
          <h2 style={D.h2}>How We Build</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {approach.map((a, i) => (
              <div key={i} style={{ display: 'flex', gap: 18, paddingTop: i > 0 ? 18 : 0, paddingBottom: i < 3 ? 18 : 0, borderBottom: i < 3 ? '1px solid rgba(0,220,255,0.07)' : 'none' }}>
                <div style={{ width: 28, height: 28, background: 'rgba(0,220,255,0.08)', border: '1px solid rgba(0,220,255,0.25)', borderRadius: 7, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 11, color: '#00DCFF' }}>{a.n}</span>
                </div>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#00DCFF', marginBottom: 4 }}>{a.title}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)', lineHeight: 1.65 }}>{a.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 40 }}>
          <div style={D.label()}>Values</div>
          <h2 style={D.h2}>What We Stand For</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
            {values.map((v, i) => (
              <div key={i} style={D.card}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#00DCFF', marginBottom: 6 }}>{v.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div style={{ marginBottom: 40 }}>
          <div style={D.label()}>Journey</div>
          <h2 style={D.h2}>Journey to Orbit</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {milestones.map((m, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: 16, alignItems: 'start' }}>
                <div style={{ background: 'rgba(255,191,0,0.07)', border: '1px solid rgba(255,191,0,0.18)', borderRadius: 8, padding: '8px 12px', textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 11, color: '#FFBF00', fontWeight: 700 }}>{m.year}</div>
                </div>
                <div style={D.card}>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13, color: '#00DCFF', marginBottom: 3 }}>{m.title}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)' }}>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div style={{ textAlign: 'center', paddingTop: 20 }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 18, color: '#F5F7FA', marginBottom: 8 }}>Based in Kigali, Rwanda</div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.45)', marginBottom: 20 }}>Building space infrastructure at the intersection of innovation and opportunity</p>
          <a href="mailto:team@ikirere.com" style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 12, color: '#00DCFF', textDecoration: 'none', padding: '9px 20px', border: '1px solid rgba(0,220,255,0.28)', borderRadius: 8, display: 'inline-block' }}>team@ikirere.com</a>
        </div>
      </div>
    </div>
  )
}
