import PageSEO, { pageSEO } from '../components/PageSEO'
import { Link } from 'react-router-dom'

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

const sections = [
  { title: 'Getting Started', items: ['Installation & Setup','Quick Start Guide','System Requirements','License Activation'] },
  { title: 'CubeSat Hardware', items: ['Assembly Instructions','Component Specifications','Power System Configuration','Communication Setup','Testing & Verification'] },
  { title: 'IkirereMesh SDK', items: ['API Reference','Constellation Planning','Safety Shield Configuration','Simulation Tools','Deployment Guide'] },
  { title: 'Mission Operations', items: ['Launch Preparation','On-Orbit Commissioning','Ground Station Operations','Telemetry & Commands','Anomaly Resolution'] },
]

const tutorials = [
  { title: 'Your First Satellite Mission', duration: '30 min', desc: 'From kit assembly to mission simulation in one tutorial' },
  { title: 'Collision Avoidance with IkirereMesh', duration: '45 min', desc: 'Configure safety shields and plan safe maneuvers' },
  { title: 'Multi-Satellite Coordination', duration: '1 hr', desc: 'Build and manage a small constellation end-to-end' },
  { title: 'Custom Payload Integration', duration: '2 hrs', desc: 'Add sensors and instruments to your CubeSat' },
]

export default function Documentation() {
  return (
    <div style={D.page}>
      <PageSEO {...pageSEO.documentation} />
      <div style={D.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={D.badge()}><span>Docs</span></div>
          <h1 style={D.h1}><span style={{ background: 'linear-gradient(135deg,#00DCFF,#0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Documentation</span></h1>
          <p style={D.sub}>Everything you need to build, launch, and operate your satellite mission.</p>
        </div>

        {/* Search */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ maxWidth: 480, position: 'relative' }}>
            <input type="text" placeholder="Search documentation..." style={{ width: '100%', padding: '11px 44px 11px 16px', background: 'rgba(8,18,40,0.8)', border: '1px solid rgba(0,220,255,0.2)', borderRadius: 10, fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#F5F7FA', outline: 'none' }} onFocus={e => e.target.style.borderColor = '#00DCFF'} onBlur={e => e.target.style.borderColor = 'rgba(0,220,255,0.2)'} />
            <svg viewBox="0 0 20 20" width="16" height="16" fill="none" style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}><circle cx="8.5" cy="8.5" r="5.5" stroke="#00DCFF" strokeWidth="1.5" opacity="0.5"/><path d="M13 13L17 17" stroke="#00DCFF" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/></svg>
          </div>
        </div>

        {/* Sections */}
        <div style={{ marginBottom: 44 }}>
          <div style={D.label()}>Reference</div>
          <h2 style={D.h2}>Documentation Sections</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {sections.map((s, i) => (
              <div key={i} style={D.card}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: '#00DCFF', marginBottom: 14 }}>{s.title}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {s.items.map((item, j) => (
                    <a key={j} href="#" style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.55)', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#00DCFF' }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'rgba(245,247,250,0.55)' }}>
                      <span style={{ color: 'rgba(0,220,255,0.4)', fontSize: 11 }}>→</span>{item}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tutorials */}
        <div style={{ marginBottom: 44 }}>
          <div style={D.label()}>Tutorials</div>
          <h2 style={D.h2}>Video Tutorials</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
            {tutorials.map((t, i) => (
              <div key={i} style={D.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#F5F7FA' }}>{t.title}</div>
                  <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: '#FFBF00', flexShrink: 0, paddingLeft: 10 }}>{t.duration}</span>
                </div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.5)', marginBottom: 12, lineHeight: 1.55 }}>{t.desc}</p>
                <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#00DCFF', textDecoration: 'none' }}>
                  Watch Tutorial
                  <svg viewBox="0 0 16 16" width="12" height="12" fill="none"><circle cx="8" cy="8" r="6" stroke="#00DCFF" strokeWidth="1.3"/><path d="M6.5 5.5L11 8L6.5 10.5V5.5Z" fill="#00DCFF"/></svg>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Coming soon */}
        <div style={{ background: 'rgba(255,191,0,0.04)', border: '1px solid rgba(255,191,0,0.2)', borderRadius: 14, padding: '28px 32px' }}>
          <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: 'rgba(255,191,0,0.6)', textTransform: 'uppercase', marginBottom: 8 }}>Coming Soon</div>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 18, color: '#F5F7FA', marginBottom: 8 }}>Full Documentation — Q3 2026</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.52)', lineHeight: 1.65, marginBottom: 20, maxWidth: 640 }}>
            We're building comprehensive technical documentation, video tutorials, and interactive examples. Early access customers will receive draft documentation starting Q2 2026.
          </p>
          <a href="mailto:team@ikirere.com?subject=Documentation Early Access" style={{ padding: '9px 22px', background: 'linear-gradient(135deg,#FFBF00,#FF9500)', borderRadius: 7, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, color: '#040C1C', textDecoration: 'none', display: 'inline-block' }}>Request Early Access</a>
        </div>
      </div>
    </div>
  )
}
