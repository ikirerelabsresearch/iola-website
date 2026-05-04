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

const positions = [
  { title: 'Flight Software Engineer', location: 'Kigali, Rwanda', type: 'Full-time',
    desc: 'Build embedded Linux systems for CubeSats. Work on ADCS, communications, and onboard autonomy.',
    reqs: ['C/C++ and Python expertise','Embedded systems experience','Understanding of spacecraft systems','Linux kernel development (preferred)'] },
  { title: 'Hardware Engineer (CubeSat)', location: 'Kigali, Rwanda', type: 'Full-time',
    desc: 'Design and integrate CubeSat subsystems. Work with power, ADCS, comms, and payload modules.',
    reqs: ['Electrical engineering background','PCB design and testing','Thermal and structural analysis','Experience with space-grade components'] },
  { title: 'ML Research Engineer', location: 'Remote / Kigali', type: 'Full-time',
    desc: 'Develop reinforcement learning algorithms for constellation coordination and collision avoidance.',
    reqs: ['PhD or equivalent in ML/RL','PyTorch or JAX experience','Multi-agent systems knowledge','Publications in top-tier venues (preferred)'] },
  { title: 'Mission Operations Specialist', location: 'Kigali, Rwanda', type: 'Full-time',
    desc: 'Operate satellite constellations. Manage ground station networks and respond to orbital events.',
    reqs: ['Astrodynamics fundamentals','Experience with STK or GMAT','Telemetry and command protocols','24/7 shift work availability'] },
]

const perks = [
  { title: 'Build Real Satellites', desc: 'Your code and hardware will fly in orbit', svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M12 2L15 8L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 8Z" stroke="#00DCFF" strokeWidth="1.5" strokeLinejoin="round"/></svg> },
  { title: 'Africa-First Mission', desc: 'Directly impact African space capabilities', svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><circle cx="12" cy="12" r="9" stroke="#00DCFF" strokeWidth="1.5"/><path d="M9 8C9 8 10 10 10 12S9 16 9 16" stroke="#00DCFF" strokeWidth="1.2"/><path d="M15 8C15 8 14 10 14 12S15 16 15 16" stroke="#00DCFF" strokeWidth="1.2"/><path d="M3 12h18" stroke="#00DCFF" strokeWidth="1.2"/></svg> },
  { title: 'Competitive Compensation', desc: 'Salary + equity in a frontier market', svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><rect x="2" y="6" width="20" height="12" rx="2" stroke="#00DCFF" strokeWidth="1.5"/><path d="M2 10h20" stroke="#00DCFF" strokeWidth="1.2"/></svg> },
  { title: 'Learning Budget', desc: 'Conferences, courses, and research resources', svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M4 6h16M4 10h16M4 14h10" stroke="#00DCFF" strokeWidth="1.5" strokeLinecap="round"/><rect x="3" y="3" width="18" height="18" rx="2" stroke="#00DCFF" strokeWidth="1.5"/></svg> },
  { title: 'Health Coverage', desc: 'Comprehensive medical and dental', svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><path d="M12 21C12 21 3 15 3 9C3 6 5 4 8 4C10 4 11 5 12 6C13 5 14 4 16 4C19 4 21 6 21 9C21 15 12 21 12 21Z" stroke="#00DCFF" strokeWidth="1.5"/><path d="M9 12h6M12 9v6" stroke="#00DCFF" strokeWidth="1.5" strokeLinecap="round"/></svg> },
  { title: 'Flexible Work', desc: 'Hybrid remote, outcomes over hours', svg: <svg viewBox="0 0 24 24" width="20" height="20" fill="none"><circle cx="12" cy="12" r="9" stroke="#00DCFF" strokeWidth="1.5"/><path d="M12 7v5l3 3" stroke="#00DCFF" strokeWidth="1.5" strokeLinecap="round"/></svg> },
]

const process = [
  { n: '1', title: 'Apply', desc: 'Send CV and cover letter' },
  { n: '2', title: 'Screen', desc: 'Initial technical interview' },
  { n: '3', title: 'Challenge', desc: 'Take-home technical project' },
  { n: '4', title: 'Offer', desc: 'Team meet & final decision' },
]

export default function Careers() {
  return (
    <div style={D.page}>
      <PageSEO {...pageSEO.careers} />
      <div style={D.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.badge()}><span>Careers</span></div>
          <h1 style={D.h1}>Join <span style={{ background: 'linear-gradient(135deg,#00DCFF,#0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ikirere</span></h1>
          <p style={D.sub}>Build the foundational infrastructure for the African space age. We're looking for engineers, researchers, and operators who want to make history.</p>
        </div>

        {/* Why banner */}
        <div style={{ background: 'linear-gradient(135deg, rgba(0,220,255,0.06), rgba(255,191,0,0.04))', border: '1px solid rgba(0,220,255,0.2)', borderRadius: 14, padding: '24px 32px', marginBottom: 44 }}>
          <div style={D.label()}>Why Ikirere</div>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,247,250,0.7)', lineHeight: 1.75, maxWidth: 720 }}>
            Most space companies build satellites for comms or imaging. We're building the <span style={{ color: '#00DCFF' }}>infrastructure layer</span> that makes orbital operations accessible to an entire continent. Your work here will enable dozens of African universities, governments, and research labs to deploy their own missions.
          </p>
        </div>

        {/* Positions */}
        <div style={{ marginBottom: 44 }}>
          <div style={D.label()}>Open Roles</div>
          <h2 style={D.h2}>Open Positions</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {positions.map((p, i) => (
              <div key={i} style={{ ...D.card, display: 'grid', gridTemplateColumns: '1fr auto', gap: 24, alignItems: 'start' }}>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 16, color: '#00DCFF', marginBottom: 4 }}>{p.title}</div>
                  <div style={{ display: 'flex', gap: 12, marginBottom: 10 }}>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.4)' }}>{p.location}</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.25)' }}>·</span>
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.4)' }}>{p.type}</span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.6)', lineHeight: 1.6, marginBottom: 10 }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.reqs.map((r, j) => (
                      <span key={j} style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.5)', background: 'rgba(0,220,255,0.06)', border: '1px solid rgba(0,220,255,0.12)', borderRadius: 6, padding: '3px 9px' }}>{r}</span>
                    ))}
                  </div>
                </div>
                <a href={`mailto:team@ikirere.com?subject=Application: ${p.title}`} style={{ padding: '9px 20px', background: 'linear-gradient(135deg,#00DCFF,#0088FF)', borderRadius: 7, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 12, color: '#040C1C', textDecoration: 'none', whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>Apply Now</a>
              </div>
            ))}
          </div>
        </div>

        {/* Perks */}
        <div style={{ marginBottom: 44 }}>
          <div style={D.label()}>Benefits</div>
          <h2 style={D.h2}>Perks & Benefits</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 12 }}>
            {perks.map((p, i) => (
              <div key={i} style={{ ...D.card, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 36, height: 36, background: 'rgba(0,220,255,0.07)', border: '1px solid rgba(0,220,255,0.15)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{p.svg}</div>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13, color: '#F5F7FA', marginBottom: 3 }}>{p.title}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.48)', lineHeight: 1.5 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process */}
        <div style={{ marginBottom: 44 }}>
          <div style={D.label()}>Process</div>
          <h2 style={D.h2}>Application Process</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 12 }}>
            {process.map((p, i) => (
              <div key={i} style={{ ...D.card, textAlign: 'center' }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 28, color: '#00DCFF', opacity: 0.3, marginBottom: 8 }}>{p.n}</div>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#F5F7FA', marginBottom: 4 }}>{p.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.48)' }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: 'rgba(8,18,40,0.9)', border: '1px solid rgba(255,191,0,0.2)', borderRadius: 14, padding: '28px 36px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 18, color: '#F5F7FA', marginBottom: 6 }}>Don't see your role?</h3>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.5)', marginBottom: 20 }}>We're always looking for exceptional talent passionate about space, Africa, and foundational infrastructure.</p>
          <a href="mailto:team@ikirere.com?subject=General Application" style={{ padding: '10px 28px', background: 'linear-gradient(135deg,#FFBF00,#FF9500)', borderRadius: 8, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 13, color: '#040C1C', textDecoration: 'none', display: 'inline-block' }}>Send General Application</a>
        </div>
      </div>
    </div>
  )
}
