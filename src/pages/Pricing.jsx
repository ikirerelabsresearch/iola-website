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

const tiers = [
  { name: 'Research', desc: 'For universities and research labs', highlight: false,
    features: ['Single 3U CubeSat Kit','IkirereMesh SDK (Academic License)','Launch coordination support','Technical training workshops','Email support','Community access'] },
  { name: 'Constellation', desc: 'For operational missions', highlight: true,
    features: ['Multiple CubeSat Kits (3U or 6U)','IkirereMesh SDK (Commercial License)','Priority launch slots','Dedicated mission planning','On-orbit commissioning support','24/7 operations support','Custom feature development'] },
  { name: 'Enterprise', desc: 'For government & space agencies', highlight: false,
    features: ['Large-scale constellation (10+ sats)','IkirereMesh SDK (Enterprise License)','Guaranteed launch capacity','End-to-end mission management','Custom hardware modifications','Dedicated engineering team','SLA with uptime guarantees'] },
]

const addons = [
  { name: 'Launch Services', desc: 'SpaceX rideshare coordination and integration', price: 'From $50k/3U' },
  { name: 'Ground Station Access', desc: 'Global network for satellite communications', price: '$500/mo per sat' },
  { name: 'Extended Mission Support', desc: 'Operations and maintenance beyond warranty', price: 'Custom' },
  { name: 'Custom Payloads', desc: 'Integration of specialized sensors and instruments', price: 'Custom' },
]

const faqs = [
  { q: 'Why is pricing custom?', a: 'Every mission has unique requirements for payload, orbit, launch timing, and support. We work with you to optimize costs.' },
  { q: "What's included in the base kit price?", a: 'All kits include structure, solar panels, ADCS, communications, compute module, and basic integration. Launch services are separate.' },
  { q: 'Do you offer academic discounts?', a: 'Yes. African universities and research institutions receive priority pricing and access to grant funding resources.' },
  { q: 'What payment terms do you accept?', a: 'We work with milestone-based payments, grants, and government contracts. Contact us to discuss flexible structures.' },
]

export default function Pricing() {
  return (
    <div style={D.page}>
      <PageSEO {...pageSEO.pricing} />
      <div style={D.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div style={D.badge()}><span>Pricing</span></div>
          <h1 style={D.h1}>Transparent <span style={{ background: 'linear-gradient(135deg,#00DCFF,#0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Pricing</span></h1>
          <p style={D.sub}>Access to space shouldn't be opaque. Choose the plan that fits your mission.</p>
        </div>

        {/* Tiers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginBottom: 52 }}>
          {tiers.map((t, i) => (
            <div key={i} style={{
              background: t.highlight ? 'rgba(0,220,255,0.05)' : 'rgba(8,18,40,0.8)',
              border: t.highlight ? '2px solid rgba(0,220,255,0.45)' : '1px solid rgba(0,220,255,0.12)',
              borderRadius: 14, padding: '28px 28px', position: 'relative',
              boxShadow: t.highlight ? '0 0 40px rgba(0,220,255,0.06)' : 'none',
            }}>
              {t.highlight && <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(135deg,#00DCFF,#0088FF)', padding: '3px 16px', borderRadius: '0 0 8px 8px', fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: '#040C1C', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>Most Popular</div>}
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 22, color: '#F5F7FA', marginBottom: 4, marginTop: t.highlight ? 12 : 0 }}>{t.name}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.42)', marginBottom: 20 }}>{t.desc}</p>
              <div style={{ marginBottom: 24 }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 26, color: '#00DCFF' }}>Custom</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.38)' }}>Contact for quote</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
                {t.features.map((f, j) => (
                  <div key={j} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                    <div style={{ width: 14, height: 14, background: 'rgba(0,220,255,0.12)', border: '1px solid rgba(0,220,255,0.35)', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 1 }}>
                      <svg width="7" height="7" viewBox="0 0 7 7" fill="none"><path d="M1 3.5l1.7 1.7 3.3-3.3" stroke="#00DCFF" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.62)', lineHeight: 1.4 }}>{f}</span>
                  </div>
                ))}
              </div>
              <a href={`mailto:team@ikirere.com?subject=Pricing: ${t.name}`} style={{ display: 'block', textAlign: 'center', padding: '10px', background: t.highlight ? 'linear-gradient(135deg,#00DCFF,#0088FF)' : 'rgba(0,220,255,0.07)', border: t.highlight ? 'none' : '1px solid rgba(0,220,255,0.22)', borderRadius: 8, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: t.highlight ? '#040C1C' : '#00DCFF', textDecoration: 'none' }}>Get Quote</a>
            </div>
          ))}
        </div>

        {/* Addons */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.label()}>Optional Services</div>
          <h2 style={D.h2}>Add-On Services</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {addons.map((a, i) => (
              <div key={i} style={D.card}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#00DCFF', marginBottom: 5 }}>{a.name}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.5)', marginBottom: 10, lineHeight: 1.55 }}>{a.desc}</p>
                <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 11, color: '#FFBF00' }}>{a.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ ...D.card }}>
          <div style={D.label()}>FAQ</div>
          <h2 style={D.h2}>Pricing FAQ</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {faqs.map((f, i) => (
              <div key={i} style={{ paddingTop: i > 0 ? 20 : 0, paddingBottom: i < 3 ? 20 : 0, borderBottom: i < 3 ? '1px solid rgba(0,220,255,0.07)' : 'none' }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#00DCFF', marginBottom: 6 }}>{f.q}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.55)', lineHeight: 1.65 }}>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
