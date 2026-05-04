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

const team = [
  { name: 'Jason Quist', country: 'Ghana', role: 'Founder and Lead Engineer', bio: 'AI researcher specializing in reinforcement learning and autonomous systems; founder of Ikirere Orbital Labs Africa building AI infrastructure for space operations and orbital coordination.' },
  { name: 'Gideon Salami', country: 'Ghana', role: 'Senior Software Engineer', bio: 'Focused on machine learning systems, RL environments, and backend architecture for large-scale simulation and data pipelines.' },
  { name: 'Abigail Boateng', country: 'Ghana', role: 'Chief Research Scientist', bio: 'Leading the research program on reinforcement learning, orbital coordination algorithms, and safety-critical AI systems.' },
  { name: 'Jessica Randall', country: 'South Africa', role: 'Software Engineer', bio: 'Software engineer with strong mathematical foundations supporting machine learning research, modeling, and algorithm development.' },
  { name: 'Ignatius Balayo', country: 'Uganda', role: "AI Master's Student & Developer", bio: 'Responsible for evaluation frameworks, experiment tracking, and machine learning validation pipelines.' },
  { name: 'Alph Doamekpor', country: 'Germany', role: 'Aerospace & ML Expert', bio: 'Over two decades of experience across ESA, NASA and EUMETSAT guiding research direction and space systems integration.' },
]

const advisors = [
  { area: 'Orbital Mechanics', desc: 'Experts in spacecraft dynamics, mission planning, and collision avoidance' },
  { area: 'Reinforcement Learning', desc: 'Leading researchers in multi-agent RL and safety-constrained optimization' },
  { area: 'Space Policy', desc: 'African space agency leaders and international regulatory experts' },
]

const values = [
  { title: 'Rigorous Research', desc: 'Mathematical reasoning and safety-critical thinking shape how we design systems.' },
  { title: 'Africa-Focused', desc: 'Building infrastructure that expands sovereign capability on the continent.' },
  { title: 'Operational Discipline', desc: 'Work is practical, deployment-oriented, and judged by whether operators can trust it.' },
  { title: 'Safety First', desc: 'Collision-free and evidence-backed operation remains the standard across our stack.' },
]

const openRoles = ['Flight Software Engineer','Hardware Engineer (CubeSat)','ML Research Engineer','Mission Operations Specialist']

const initials = name => name.split(' ').map(p => p[0]).slice(0,2).join('')

export default function Team() {
  return (
    <div style={D.page}>
      <PageSEO {...pageSEO.team} />
      <div style={D.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 52 }}>
          <div style={D.badge()}><span>Team</span></div>
          <h1 style={D.h1}>Meet the <span style={{ background: 'linear-gradient(135deg,#00DCFF,#0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Team</span></h1>
          <p style={D.sub}>Engineers and researchers building AI infrastructure for space operations and orbital coordination.</p>
        </div>

        {/* Core team */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.label()}>Core Technical Team</div>
          <h2 style={D.h2}>Core Technical Team</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
            {team.map((m, i) => (
              <div key={i} style={D.card}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(0,220,255,0.1)', border: '1px solid rgba(0,220,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 14, color: '#00DCFF' }}>{initials(m.name)}</span>
                  </div>
                  <div>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: '#F5F7FA', marginBottom: 2 }}>{m.name}</div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 8px', background: 'rgba(255,191,0,0.08)', border: '1px solid rgba(255,191,0,0.18)', borderRadius: 100 }}>
                      <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 8, letterSpacing: '0.15em', color: '#FFBF00', textTransform: 'uppercase' }}>{m.country}</span>
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#00DCFF', marginBottom: 6 }}>{m.role}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)', lineHeight: 1.6 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Advisory */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.label()}>Advisory Board</div>
          <h2 style={D.h2}>Advisory Board</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
            {advisors.map((a, i) => (
              <div key={i} style={D.card}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#00DCFF', marginBottom: 6 }}>{a.area}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)', lineHeight: 1.6, marginBottom: 8 }}>{a.desc}</p>
                <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: '#FFBF00', letterSpacing: '0.1em' }}>Forming advisory board</span>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 44 }}>
          <div style={D.label()}>Lab Values</div>
          <h2 style={D.h2}>Research Lab Values</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {values.map((v, i) => (
              <div key={i} style={D.card}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#F5F7FA', marginBottom: 5 }}>{v.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.5)', lineHeight: 1.6 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <div style={{ background: 'rgba(8,18,40,0.9)', border: '1px solid rgba(255,191,0,0.2)', borderRadius: 14, padding: '28px 32px' }}>
          <div style={D.label('#FFBF00')}>Careers</div>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 18, color: '#F5F7FA', marginBottom: 12 }}>Join Our Research Lab</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.5)', marginBottom: 16, maxWidth: 600, lineHeight: 1.65 }}>
            Building a world-class technical team for orbital intelligence, coordination, and safety-critical AI.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
            {openRoles.map((r, i) => (
              <span key={i} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#00DCFF', background: 'rgba(0,220,255,0.07)', border: '1px solid rgba(0,220,255,0.2)', borderRadius: 6, padding: '4px 10px' }}>{r}</span>
            ))}
          </div>
          <a href="/careers" style={{ padding: '9px 22px', background: 'linear-gradient(135deg,#FFBF00,#FF9500)', borderRadius: 7, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, color: '#040C1C', textDecoration: 'none', display: 'inline-block' }}>View All Careers</a>
        </div>
      </div>
    </div>
  )
}
