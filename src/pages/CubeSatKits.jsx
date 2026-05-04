import PageSEO, { pageSEO } from '../components/PageSEO'
import { Link } from 'react-router-dom'

const D = {
  page: { minHeight: '100vh', background: '#040C1C', paddingTop: 88 },
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '52px 6vw 100px' },
  card: { background: 'rgba(8,18,40,0.8)', border: '1px solid rgba(0,220,255,0.12)', borderRadius: 14, padding: '28px 32px' },
  eyebrow: (c='#00DCFF') => ({ fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: `${c}80`, textTransform: 'uppercase', marginBottom: 8 }),
  h1: { fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 3.8vw, 46px)', color: '#F5F7FA', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 14 },
  h2: { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22, color: '#F5F7FA', letterSpacing: '-0.01em', marginBottom: 6 },
  h3: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: '#F5F7FA', marginBottom: 5 },
  sub: { fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(245,247,250,0.58)', lineHeight: 1.7, maxWidth: 540 },
  mono: (c='#00DCFF') => ({ fontFamily: "'Roboto Mono', monospace", fontSize: 11, color: c }),
  badge: (c='#00DCFF') => ({ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', border: `1px solid ${c}30`, borderRadius: 100, background: `${c}08`, fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: c, textTransform: 'uppercase', marginBottom: 20 }),
}

const kits = [
  { name: '3U CubeSat Kit', tag: 'Compact Research', color: '#00DCFF',
    specs: [['Size','10×10×30 cm'],['Compute','NVIDIA Jetson Nano'],['Power','30W Solar'],['Storage','256GB SSD'],['Mass','~4 kg'],['Lifetime','2–3 years']],
    features: ['Pre-integrated structure','Solar power system','3-axis attitude control','UHF communication module','IkirereMesh SDK compatible','SpaceX rideshare ready'] },
  { name: '6U CubeSat Kit', tag: 'Extended Mission', color: '#FFBF00',
    specs: [['Size','10×20×30 cm'],['Compute','NVIDIA Jetson Xavier NX'],['Power','60W Solar'],['Storage','512GB SSD'],['Mass','~8 kg'],['Lifetime','3–5 years']],
    features: ['Extended payload capacity','Advanced solar arrays','Precision ADCS + star tracker','High-bandwidth comms','IkirereMesh SDK compatible','SpaceX rideshare ready','Extended mission duration'] },
]

const reasons = [
  { title: 'Launch Ready', body: 'Pre-qualified for SpaceX rideshare. Lab to orbit in months.',
    svg: <svg viewBox="0 0 28 28" width="24" height="24" fill="none"><path d="M14 3L17 9L24 11L19 16L20 23L14 20L8 23L9 16L4 11L11 9Z" stroke="#00DCFF" strokeWidth="1.4" strokeLinejoin="round"/></svg> },
  { title: 'AI-Powered Compute', body: 'NVIDIA Jetson enables on-orbit ML and edge inference at the satellite.',
    svg: <svg viewBox="0 0 28 28" width="24" height="24" fill="none"><rect x="5" y="5" width="18" height="18" rx="3" stroke="#00DCFF" strokeWidth="1.4"/><circle cx="14" cy="14" r="4" stroke="#00DCFF" strokeWidth="1.4"/><line x1="14" y1="5" x2="14" y2="10" stroke="#00DCFF" strokeWidth="1.4"/><line x1="14" y1="18" x2="14" y2="23" stroke="#00DCFF" strokeWidth="1.4"/><line x1="5" y1="14" x2="10" y2="14" stroke="#00DCFF" strokeWidth="1.4"/><line x1="18" y1="14" x2="23" y2="14" stroke="#00DCFF" strokeWidth="1.4"/></svg> },
  { title: 'Safe Operations', body: 'Integrated with IkirereMesh for collision-free constellation management.',
    svg: <svg viewBox="0 0 28 28" width="24" height="24" fill="none"><path d="M14 2L24 7V15C24 20 20 24 14 26C8 24 4 20 4 15V7Z" stroke="#00DCFF" strokeWidth="1.4"/><path d="M9 14L12 17L19 10" stroke="#00DCFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
]

export default function CubeSatKits() {
  return (
    <div style={D.page}>
      <PageSEO {...pageSEO.cubesatKits} />
      <div style={D.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div style={D.badge()}><span>Products</span></div>
          <h1 style={D.h1}>Programmable{' '}
            <span style={{ background: 'linear-gradient(135deg,#00DCFF,#0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>CubeSat Kits</span>
          </h1>
          <p style={D.sub}>Complete satellite hardware for African research institutions. Pre-integrated, launch-ready, NVIDIA compute inside.</p>
        </div>

        {/* Kit Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 52 }}>
          {kits.map((k, i) => (
            <div key={i} style={{ ...D.card, border: `1px solid ${k.color}22`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(to right, transparent, ${k.color}50, transparent)` }} />
              <div style={D.eyebrow(k.color)}>{k.tag}</div>
              <h2 style={{ ...D.h2, color: k.color, marginBottom: 20 }}>{k.name}</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: '1px solid rgba(0,220,255,0.07)', marginBottom: 20 }}>
                {k.specs.map(([label, val], j) => (
                  <div key={j} style={{ padding: '9px 8px 9px 0', borderBottom: '1px solid rgba(0,220,255,0.07)', borderRight: j % 2 === 0 ? '1px solid rgba(0,220,255,0.07)' : 'none', paddingLeft: j % 2 !== 0 ? 12 : 0 }}>
                    <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 10, color: 'rgba(245,247,250,0.35)', marginBottom: 2 }}>{label}</div>
                    <div style={D.mono()}>{val}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 24 }}>
                {k.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <div style={{ width: 4, height: 4, borderRadius: '50%', background: k.color, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.6)' }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href="mailto:team@ikirere.com?subject=CubeSat Inquiry" style={{ display: 'block', textAlign: 'center', padding: '10px', background: i === 0 ? 'linear-gradient(135deg,#00DCFF,#0088FF)' : 'linear-gradient(135deg,#FFBF00,#FF9500)', borderRadius: 8, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: '#040C1C', textDecoration: 'none' }}>Request Quote</a>
            </div>
          ))}
        </div>

        {/* Why section */}
        <div style={{ marginBottom: 52 }}>
          <div style={D.eyebrow()}>Why Ikirere</div>
          <h2 style={{ ...D.h2, marginBottom: 20 }}>Built for African Research Labs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {reasons.map((r, i) => (
              <div key={i} style={{ ...D.card, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, background: 'rgba(0,220,255,0.07)', border: '1px solid rgba(0,220,255,0.15)', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{r.svg}</div>
                <div>
                  <div style={D.h3}>{r.title}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)', lineHeight: 1.6 }}>{r.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'rgba(8,18,40,0.9)', border: '1px solid rgba(255,191,0,0.18)', borderRadius: 14, padding: '28px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 18, color: '#F5F7FA', marginBottom: 4 }}>Ready to deploy your research to orbit?</h3>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.42)' }}>Academic and volume discounts available.</p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <a href="mailto:team@ikirere.com?subject=CubeSat Inquiry" style={{ padding: '9px 22px', background: 'linear-gradient(135deg,#FFBF00,#FF9500)', borderRadius: 7, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, color: '#040C1C', textDecoration: 'none' }}>Get a Quote</a>
            <Link to="/ikirere-mesh-sdk" style={{ padding: '9px 22px', background: 'transparent', border: '1px solid rgba(0,220,255,0.28)', borderRadius: 7, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, color: '#00DCFF', textDecoration: 'none' }}>View SDK</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
