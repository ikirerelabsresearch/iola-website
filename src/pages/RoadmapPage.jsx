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

const phases = [
  { n: '01', status: 'In Progress', color: '#FFBF00', active: true, title: 'Sandbox Simulation', period: 'Current',
    desc: 'High-fidelity 32-satellite LEO simulation with RL planner and safety shield integration.',
    deliverables: ['WebGL visualization dashboard','Collision avoidance verification','Multi-agent coordination prototype','Safety shield mathematical proofs'] },
  { n: '02', status: 'Q1 2027', color: '#00DCFF', active: false, title: 'Real Orbital Data', period: 'Q1 2027',
    desc: 'Integration with ESA DRAMA and NASA CARA for real-time conjunction analysis and live TLE feeds.',
    deliverables: ['Live TLE feed integration','Historical conjunction database','Alpha SDK release to partners','Real-time debris tracking'] },
  { n: '03', status: 'Q2 2027', color: '#00DCFF', active: false, title: 'CubeSat Onboard', period: 'Q2 2027',
    desc: 'Deploy IkirereMesh to flight-ready CubeSat hardware with onboard decision-making.',
    deliverables: ['Embedded Linux port','Hardware-in-the-loop testing','NVIDIA Jetson optimization','First CubeSat kit deliveries'] },
  { n: '04', status: 'Q3–Q4 2027', color: '#00DCFF', active: false, title: 'Launch & Operations', period: 'Q3–Q4 2027',
    desc: 'First Ikirere satellites deployed via SpaceX. On-orbit validation of IkirereMesh.',
    deliverables: ['SpaceX rideshare integration','Launch of first constellation','On-orbit commissioning','Live collision avoidance demo'] },
]

const milestones = [
  { date: 'Q4 2026', title: 'IkirereMesh SDK Beta', desc: 'First beta release to partner universities' },
  { date: 'Q1 2027', title: 'First CubeSat Orders', desc: 'Begin accepting pre-orders for 3U and 6U kits' },
  { date: 'Q2 2027', title: 'Training Workshops', desc: 'Launch technical training program across Africa' },
  { date: 'Q3 2027', title: 'First Launch', desc: 'Maiden flight via SpaceX rideshare mission' },
  { date: 'Q4 2027', title: 'Constellation Ops', desc: 'Full constellation with IkirereMesh coordination active' },
]

export default function RoadmapPage() {
  return (
    <div style={D.page}>
      <PageSEO {...pageSEO.roadmap} />
      <div style={D.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div style={D.badge()}><span>Roadmap</span></div>
          <h1 style={D.h1}>Product <span style={{ background: 'linear-gradient(135deg,#00DCFF,#0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Roadmap</span></h1>
          <p style={D.sub}>Our journey from simulation to orbit. Transparent timelines for hardware, software, and operations.</p>
        </div>

        {/* Phases */}
        <div style={{ marginBottom: 52 }}>
          <div style={D.label()}>Development Phases</div>
          <h2 style={D.h2}>Four Phases to Orbit</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {phases.map((p, i) => (
              <div key={i} style={{ background: 'rgba(8,18,40,0.8)', border: `1px solid ${p.active ? p.color + '40' : p.color + '18'}`, borderRadius: 14, padding: '24px 28px', display: 'grid', gridTemplateColumns: '56px 1fr', gap: 20, alignItems: 'start', boxShadow: p.active ? `0 0 24px ${p.color}10` : 'none' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: p.active ? `linear-gradient(135deg, ${p.color}, #FF9500)` : 'rgba(8,18,40,0.9)', border: `2px solid ${p.color}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: p.active ? `0 0 16px ${p.color}50` : 'none' }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 12, color: p.active ? '#040C1C' : p.color }}>{p.n}</span>
                  </div>
                  <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, color: `${p.color}80`, letterSpacing: '0.1em', textAlign: 'center', textTransform: 'uppercase' }}>{p.status}</div>
                </div>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
                    <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 17, color: '#F5F7FA' }}>{p.title}</h3>
                    <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: '#FFBF00', flexShrink: 0, paddingLeft: 12 }}>{p.period}</span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.55)', lineHeight: 1.6, marginBottom: 12 }}>{p.desc}</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 6 }}>
                    {p.deliverables.map((d, j) => (
                      <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                        <div style={{ width: 4, height: 4, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.5)' }}>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.label()}>Key Milestones</div>
          <h2 style={D.h2}>Upcoming Milestones</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
            {milestones.map((m, i) => (
              <div key={i} style={D.card}>
                <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: '#FFBF00', marginBottom: 6 }}>{m.date}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13, color: '#00DCFF', marginBottom: 5 }}>{m.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.48)', lineHeight: 1.55 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 2027+ */}
        <div style={{ background: 'linear-gradient(135deg, rgba(0,220,255,0.06), rgba(255,191,0,0.04))', border: '1px solid rgba(0,220,255,0.2)', borderRadius: 14, padding: '32px' }}>
          <div style={D.label()}>2027 and Beyond</div>
          <h2 style={D.h2}>Long-Term Vision</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20 }}>
            {[
              { title: 'Pan-African Network', body: 'Support 50+ African universities with satellite infrastructure and technical training programs.' },
              { title: 'Large Constellations', body: 'Scale IkirereMesh to coordinate constellations of 100+ satellites across multiple operators.' },
              { title: 'Global Standard', body: 'Establish IkirereMesh as the industry standard for safe orbital coordination. ISO compliance.' },
            ].map((v, i) => (
              <div key={i}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#00DCFF', marginBottom: 6 }}>{v.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)', lineHeight: 1.65 }}>{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
