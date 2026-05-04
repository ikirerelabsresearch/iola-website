import PageSEO from '../components/PageSEO'
import { Link } from 'react-router-dom'

const D = {
  page: { minHeight: '100vh', background: '#040C1C', paddingTop: 88 },
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '52px 6vw 100px' },
  card: { background: 'rgba(8,18,40,0.8)', border: '1px solid rgba(0,220,255,0.12)', borderRadius: 14, padding: '28px 32px' },
  h1: { fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 3.8vw, 46px)', color: '#F5F7FA', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 14 },
  h2: { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22, color: '#F5F7FA', letterSpacing: '-0.01em', marginBottom: 16 },
  label: (c='#00DCFF') => ({ fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: `${c}80`, textTransform: 'uppercase', marginBottom: 8 }),
  badge: (c='#00DCFF') => ({ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', border: `1px solid ${c}30`, borderRadius: 100, background: `${c}08`, fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: c, textTransform: 'uppercase', marginBottom: 20 }),
  sub: { fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(245,247,250,0.58)', lineHeight: 1.7, maxWidth: 620 },
}

const products = [
  { name: 'IkirereMesh', color: '#00DCFF', title: 'AI Coordination Layer for Satellite Constellations',
    desc: 'A coordination system for low Earth orbit that predicts close approaches and proposes safe, fuel-aware maneuver plans.',
    points: ['Combines reinforcement learning agents with deterministic safety shields','Keeps operators in the loop for large-scale coordination decisions','Progresses from simulation to CubeSat deployment and constellation control'] },
  { name: 'CubeSat Kits', color: '#FFBF00', title: 'Programmable Satellite Hardware',
    desc: 'Modular 3U/6U CubeSat kits with NVIDIA Jetson compute, pre-integrated systems, and launch-ready configurations.',
    points: ['NVIDIA Jetson Orin NX onboard compute','Pre-integrated structure, power, ADCS, and comms','SpaceX rideshare launch coordination included'] },
]

const stats = [
  { label: 'Structure', value: '2 Products', sub: 'AI coordination SDK and programmable CubeSat hardware.', color: '#00DCFF' },
  { label: 'Operational Scope', value: 'Space to Surface', sub: 'Built for orbital, air, maritime, land, and infrastructure awareness.', color: '#00DCFF' },
  { label: 'Mission', value: 'Decision Infrastructure', sub: 'Turn raw signals into operational decisions and keep satellite systems safe at scale.', color: '#FFBF00' },
]

const drivers = [
  'Space, air, sea, and land systems now generate more data than most operators can fuse coherently.',
  'Orbital congestion is rising as constellations expand faster than safety infrastructure.',
  'Africa needs sovereign capability instead of continued dependence on external systems.',
]

const teamList = [
  'Jason Quist (Ghana) — AI researcher specializing in RL and autonomous systems; founder of Ikirere Orbital Labs Africa building AI infrastructure for space operations and orbital coordination.',
  'Gideon Salami (Ghana) — Senior software engineer focused on ML systems, RL environments, and backend architecture for large-scale simulation.',
  'Abigail Boateng (Ghana) — Chief Research Scientist leading RL, orbital coordination algorithms, and safety-critical AI research.',
  'Jessica Randall (South Africa) — Software engineer with strong mathematical foundations supporting ML research and algorithm development.',
  "Ignatius Balayo (Uganda) — AI Master's student responsible for evaluation frameworks, experiment tracking, and ML validation pipelines.",
  'Alph Doamekpor (Germany) — Aerospace and ML expert with 20+ years across ESA, NASA, and EUMETSAT guiding research direction.',
]

export default function Brief() {
  return (
    <div style={D.page}>
      <PageSEO
        title="Company Brief | Ikirere Orbital Labs Africa"
        description="A concise summary of where Ikirere stands today: IkirereMesh AI coordination SDK and programmable CubeSat hardware for African research institutions."
        keywords="Ikirere brief, IkirereMesh, CubeSat, orbital intelligence, Africa space infrastructure"
        aiDescription="Ikirere Orbital Labs Africa is building AI infrastructure for space and orbital coordination. The company focuses on two products: IkirereMesh, an AI coordination layer for satellite constellations that combines reinforcement learning with deterministic safety controls, and programmable CubeSat kits with NVIDIA compute for African research institutions."
        path="/brief"
      />
      <div style={D.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.badge()}><span>Company Brief</span></div>
          <h1 style={D.h1}>AI Infrastructure for{' '}
            <span style={{ background: 'linear-gradient(135deg,#00DCFF,#0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Space and Orbit</span>
          </h1>
          <p style={D.sub}>Ikirere Orbital Labs Africa is building the intelligence and coordination layer for the orbital economy, centered on two tightly integrated products: <span style={{ color: '#00DCFF' }}>IkirereMesh</span> and <span style={{ color: '#FFBF00' }}>CubeSat Kits</span>.</p>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12, marginBottom: 44 }}>
          {stats.map((s, i) => (
            <div key={i} style={{ ...D.card, border: `1px solid ${s.color}18` }}>
              <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.3em', color: `${s.color}70`, textTransform: 'uppercase', marginBottom: 8 }}>{s.label}</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 20, color: '#F5F7FA', marginBottom: 5 }}>{s.value}</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.45)', lineHeight: 1.5 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Where we stand */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 16, marginBottom: 44, flexWrap: 'wrap' }} className="brief-grid">
          <div style={{ ...D.card }}>
            <div style={D.label()}>Where We Stand</div>
            <h2 style={{ ...D.h2, fontSize: 18 }}>Building the systems layer before the market catches up.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {drivers.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 10 }}>
                  <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#00DCFF', flexShrink: 0, marginTop: 5 }} />
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.62)', lineHeight: 1.65 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ ...D.card, border: '1px solid rgba(255,191,0,0.18)', background: 'linear-gradient(135deg, rgba(255,191,0,0.05), rgba(8,18,40,0.8))' }}>
            <div style={D.label('#FFBF00')}>Long-Term Buildout</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {['Programmable CubeSats as data collection nodes.','AI coordination systems for safe orbital operations.','Intelligence platforms that interpret and distribute signals.'].map((t, i) => (
                <p key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.65)', lineHeight: 1.65 }}>{t}</p>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Link to="/ikirere-mesh-sdk" style={{ padding: '8px 18px', background: 'linear-gradient(135deg,#00DCFF,#0088FF)', borderRadius: 7, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, color: '#040C1C', textDecoration: 'none' }}>View IkirereMesh SDK</Link>
              <Link to="/roadmap" style={{ padding: '8px 18px', background: 'transparent', border: '1px solid rgba(245,247,250,0.18)', borderRadius: 7, fontFamily: "'Inter', sans-serif", fontWeight: 600, fontSize: 12, color: 'rgba(245,247,250,0.7)', textDecoration: 'none' }}>See Roadmap</Link>
            </div>
          </div>
        </div>

        {/* Products */}
        <div style={{ marginBottom: 44 }}>
          <div style={D.label()}>Two Products</div>
          <h2 style={D.h2}>One intelligence stack, two control layers.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 14 }}>
            {products.map((p, i) => (
              <div key={i} style={{ ...D.card, border: `1px solid ${p.color}20` }}>
                <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: `${p.color}90`, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 8 }}>{p.name}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, color: '#F5F7FA', marginBottom: 10 }}>{p.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.58)', lineHeight: 1.65, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {p.points.map((pt, j) => (
                    <div key={j} style={{ background: 'rgba(245,247,250,0.02)', border: '1px solid rgba(245,247,250,0.06)', borderRadius: 7, padding: '8px 12px', fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.58)', lineHeight: 1.5 }}>{pt}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <div style={D.label()}>Core Technical Team</div>
          <h2 style={D.h2}>Research, engineering, and aerospace experience across the stack.</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 10 }}>
            {teamList.map((m, i) => (
              <div key={i} style={{ ...D.card, padding: '18px 20px' }}>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.62)', lineHeight: 1.6 }}>{m}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 700px) { .brief-grid { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  )
}
