import PageSEO, { pageSEO } from '../components/PageSEO'
import { Link } from 'react-router-dom'

const D = {
  page: { minHeight: '100vh', background: '#040C1C', paddingTop: 88 },
  wrap: { maxWidth: 1100, margin: '0 auto', padding: '52px 6vw 100px' },
  card: { background: 'rgba(8,18,40,0.8)', border: '1px solid rgba(0,220,255,0.12)', borderRadius: 14, padding: '28px 32px' },
  h1: { fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 'clamp(28px, 3.8vw, 46px)', color: '#F5F7FA', letterSpacing: '-0.02em', lineHeight: 1.05, marginBottom: 14 },
  h2: { fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22, color: '#F5F7FA', letterSpacing: '-0.01em', marginBottom: 16 },
  h3: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: '#F5F7FA', marginBottom: 5 },
  sub: { fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(245,247,250,0.58)', lineHeight: 1.7, maxWidth: 560 },
  label: (c='#00DCFF') => ({ fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: `${c}80`, textTransform: 'uppercase', marginBottom: 8 }),
  badge: (c='#00DCFF') => ({ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', border: `1px solid ${c}30`, borderRadius: 100, background: `${c}08`, fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: c, textTransform: 'uppercase', marginBottom: 20 }),
}

const features = [
  { title: 'RL Planner', sub: 'Reinforcement Learning', body: 'PPO-based multi-agent system optimizing fuel-efficient trajectories for constellations of any size.', color: '#00DCFF' },
  { title: 'Safety Shields', sub: 'Deterministic Verification', body: 'Runtime verification using interval arithmetic. Guarantees minimum separation in worst-case scenarios.', color: '#00DCFF' },
  { title: 'Graph Coordinator', sub: 'Neural Coordination', body: 'Models satellite networks as time-varying graphs, applies GNNs for distributed coordination.', color: '#FFBF00' },
  { title: 'Collision Avoidance', sub: '<500ms Response', body: 'React to debris fields and conjunction warnings in under 500ms with verified safety certificates.', color: '#FFBF00' },
  { title: 'Multi-Agent', sub: '10–1000+ Satellites', body: 'Coordinate large fleets with distributed decision-making and inter-satellite communication.', color: '#00DCFF' },
  { title: 'Simulation', sub: 'High-Fidelity Orbital', body: 'Validate mission plans in orbital mechanics simulators before hardware deployment.', color: '#00DCFF' },
]

const layers = [
  { n: 'Layer 1', title: 'Reinforcement Learning Planner', body: 'PPO-based multi-agent system trained on orbital mechanics simulations. Optimizes for fuel efficiency, coverage, and constellation geometry.' },
  { n: 'Layer 2', title: 'Deterministic Safety Shield', body: 'Runtime verification using interval arithmetic and reachability analysis. Guarantees minimum separation distances even in worst-case scenarios.' },
  { n: 'Layer 3', title: 'Graph Coordinator', body: 'Models satellite networks as time-varying graphs. Applies graph neural networks for distributed coordination and communication-efficient planning.' },
]

const usecases = [
  { title: 'Earth Observation', body: 'Coordinate imaging satellites for maximum ground coverage while avoiding collisions.' },
  { title: 'Communication Networks', body: 'Optimize LEO communication constellations for latency, bandwidth, and fuel-efficient station-keeping.' },
  { title: 'Research Missions', body: 'Plan formation flying, rendezvous operations, and distributed sensing with safety guarantees.' },
  { title: 'Debris Mitigation', body: 'Active collision avoidance in congested orbital regimes. Prevent Kessler Syndrome cascades.' },
]

const code = `from ikirere_mesh import Constellation, SafetyShield

# Initialize constellation
constellation = Constellation(satellites=32)

# Plan mission
mission = constellation.plan_mission(
    target_coverage=0.95,
    fuel_budget="minimal",
    safety_margin=5000  # 5km minimum separation
)

# Apply safety shield
shield = SafetyShield(debris_db="spacetrack")
safe_plan = shield.verify(mission)

# Execute
constellation.execute(safe_plan)
print(f"Mission success: {safe_plan.is_safe()}")
# Output: Mission success: True`

export default function IkirereMeshSDK() {
  return (
    <div style={D.page}>
      <PageSEO {...pageSEO.ikirereMeshSDK} />
      <div style={D.wrap}>
        {/* Header */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.badge()}><span>SDK</span></div>
          <h1 style={D.h1}><span style={{ background: 'linear-gradient(135deg,#00DCFF,#0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>IkirereMesh</span> SDK</h1>
          <p style={D.sub}>Graph-based satellite constellation coordinator with AI-powered planning and deterministic safety guarantees.</p>
        </div>

        {/* Code block */}
        <div style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(0,220,255,0.18)', borderRadius: 12, padding: '24px 32px', marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
            {['#FF5F57','#FEBC2E','#28C840'].map((c,i) => <div key={i} style={{ width: 9, height: 9, borderRadius: '50%', background: c }} />)}
            <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: 'rgba(0,220,255,0.4)', marginLeft: 8, letterSpacing: '0.1em' }}>ikirere_mesh_sdk.py</span>
          </div>
          <pre style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 12, lineHeight: 1.85, margin: 0, color: '#00DCFF', overflow: 'auto' }}>{code}</pre>
        </div>

        {/* Features */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.label()}>Core Features</div>
          <h2 style={D.h2}>What IkirereMesh Does</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 14 }}>
            {features.map((f, i) => (
              <div key={i} style={{ ...D.card, border: `1px solid ${f.color}15` }}
                onMouseEnter={e => e.currentTarget.style.borderColor = `${f.color}35`}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${f.color}15`}>
                <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: `${f.color}70`, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6 }}>{f.sub}</div>
                <div style={D.h3}>{f.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)', lineHeight: 1.65 }}>{f.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture */}
        <div style={{ ...D.card, border: '1px solid rgba(255,191,0,0.15)', marginBottom: 48 }}>
          <div style={D.label('#FFBF00')}>Architecture</div>
          <h2 style={D.h2}>Three-Layer System</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {layers.map((l, i) => (
              <div key={i} style={{ display: 'flex', gap: 20, paddingTop: i > 0 ? 20 : 0, paddingBottom: i < 2 ? 20 : 0, borderBottom: i < 2 ? '1px solid rgba(0,220,255,0.07)' : 'none' }}>
                <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, color: '#FFBF00', letterSpacing: '0.1em', whiteSpace: 'nowrap', paddingTop: 2, flexShrink: 0 }}>{l.n}</div>
                <div>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#00DCFF', marginBottom: 4 }}>{l.title}</div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.55)', lineHeight: 1.65 }}>{l.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Use cases */}
        <div style={{ marginBottom: 48 }}>
          <div style={D.label()}>Use Cases</div>
          <h2 style={D.h2}>Built for Real Missions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 }}>
            {usecases.map((u, i) => (
              <div key={i} style={D.card}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#00DCFF', marginBottom: 6 }}>{u.title}</div>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: 'rgba(245,247,250,0.52)', lineHeight: 1.65 }}>{u.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/documentation" style={{ display: 'inline-block', padding: '12px 32px', background: 'linear-gradient(135deg,#00DCFF,#0088FF)', borderRadius: 8, fontFamily: "'Inter', sans-serif", fontWeight: 700, fontSize: 14, color: '#040C1C', textDecoration: 'none' }}>View Documentation</Link>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.3)', marginTop: 12 }}>Beta access available Q3 2026</p>
        </div>
      </div>
    </div>
  )
}
