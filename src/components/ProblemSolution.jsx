import { useRef, useEffect, useState } from 'react'

function useInView(ref) {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.2 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return visible
}

function SectionLabel({ text, color = '#00DCFF' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <div style={{ width: 28, height: 1, background: color, opacity: 0.6 }} />
      <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, letterSpacing: '0.35em', color, textTransform: 'uppercase' }}>{text}</span>
    </div>
  )
}

export default function ProblemSolution() {
  const ref = useRef(null)
  const vis = useInView(ref)

  const cards = [
    {
      label: 'Problem', labelColor: '#FF4444', title: 'Space is Crowded', accent: '#FF4444',
      body: 'Over 34,000 tracked debris objects orbit Earth. A single collision cascades into thousands of fragments, making entire orbital shells unusable for generations.',
      items: ['Kessler Syndrome risk is real', 'Uncoordinated maneuvers', 'No African orbital infrastructure'],
      icon: (
        <svg viewBox="0 0 80 80" width="80" height="80" style={{ opacity: 0.8 }}>
          <circle cx="40" cy="40" r="18" fill="none" stroke="#FF4444" strokeWidth="1.5" strokeDasharray="4 2" />
          {[...Array(16)].map((_, i) => {
            const a = (i / 16) * Math.PI * 2; const r = 28 + (i % 3) * 6
            return <circle key={i} cx={40 + Math.cos(a) * r} cy={40 + Math.sin(a) * r} r="2" fill="#FF4444" opacity="0.6" />
          })}
          <circle cx="40" cy="40" r="6" fill="#FF6644" />
        </svg>
      ),
    },
    {
      label: 'Solution', labelColor: '#00DCFF', title: 'We Bring Order', accent: '#00DCFF',
      body: 'IkirereMesh coordinates satellite constellations using a graph-based planner with deterministic safety shields that guarantee collision-free trajectories.',
      items: ['Reinforcement Learning Planner', 'Deterministic Safety Override', 'Multi-Agent Coordination'],
      icon: (
        <svg viewBox="0 0 80 80" width="80" height="80" style={{ opacity: 0.9 }}>
          <circle cx="40" cy="40" r="22" fill="none" stroke="#00DCFF" strokeWidth="1" opacity="0.3" />
          <circle cx="40" cy="40" r="15" fill="none" stroke="#00DCFF" strokeWidth="1.5" />
          {[0,1,2,3,4,5].map(i => {
            const a = (i / 6) * Math.PI * 2 - Math.PI / 2
            return <circle key={i} cx={40 + Math.cos(a) * 22} cy={40 + Math.sin(a) * 22} r="2.5" fill="#00DCFF" opacity="0.8" />
          })}
          <circle cx="40" cy="40" r="5" fill="#00DCFF" />
        </svg>
      ),
    },
    {
      label: 'Outcome', labelColor: '#FFBF00', title: 'Deterministic Safety', accent: '#FFBF00',
      body: 'Our safety shield mathematically guarantees separation distances, overriding any unsafe RL actions with provably safe maneuvers in under 500ms.',
      items: ['100% collision avoidance', '95% fuel efficiency', '<500ms reaction time'],
      icon: (
        <svg viewBox="0 0 80 80" width="80" height="80" style={{ opacity: 0.9 }}>
          <path d="M40 8 L68 22 L68 44 C68 60 55 72 40 76 C25 72 12 60 12 44 L12 22 Z" fill="none" stroke="#FFBF00" strokeWidth="1.5" />
          <path d="M28 40 L36 48 L52 32" stroke="#FFBF00" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
  ]

  return (
    <section ref={ref} id="mission" style={{ background: 'linear-gradient(180deg, #040C1C 0%, #060F1E 100%)', padding: '120px 6vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 80, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <SectionLabel text="Mission Critical" />
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 60px)', color: '#F5F7FA', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Precision in{' '}
            <span style={{ background: 'linear-gradient(135deg, #00DCFF, #0088FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Chaos</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: 'rgba(245,247,250,0.55)', marginTop: 16, maxWidth: 560, margin: '16px auto 0' }}>
            Low Earth Orbit is congested. We bring deterministic order to the orbital environment.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
          {cards.map((c, i) => (
            <div key={i} style={{
              background: 'rgba(8,18,40,0.8)', border: `1px solid ${c.accent}22`, borderRadius: 16, padding: '40px 36px',
              opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(40px)',
              transition: `all 0.8s ease ${i * 0.15}s`, position: 'relative', overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)', width: 120, height: 1, background: `linear-gradient(to right, transparent, ${c.accent}, transparent)` }} />
              <SectionLabel text={c.label} color={c.labelColor} />
              <div style={{ marginBottom: 24 }}>{c.icon}</div>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 28, color: '#F5F7FA', marginBottom: 16 }}>{c.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 15, color: 'rgba(245,247,250,0.6)', lineHeight: 1.7, marginBottom: 28 }}>{c.body}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {c.items.map((item, j) => (
                  <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: c.accent, flexShrink: 0 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.7)' }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 64, background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,220,255,0.15)',
          borderRadius: 12, padding: '32px 40px',
          opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease 0.5s',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            {['#FF5F57','#FEBC2E','#28C840'].map((c,i) => <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />)}
            <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 11, color: 'rgba(0,220,255,0.4)', marginLeft: 8, letterSpacing: '0.1em' }}>safety_shield.py</span>
          </div>
          <pre style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 13, lineHeight: 1.8, margin: 0, color: 'rgba(245,247,250,0.75)', overflow: 'auto', whiteSpace: 'pre-wrap' }}>
            <span style={{color:'rgba(0,220,255,0.5)'}}>{'  // IkirereMesh Safety Shield'}</span>{'\n'}
            <span style={{color:'#FFBF00'}}>  if</span>{' (collision_risk > '}<span style={{color:'#00DCFF'}}>threshold</span>{') {\n'}
            {'    '}<span style={{color:'#00DCFF'}}>execute</span>{'(deterministic_maneuver);\n'}
            {'    '}<span style={{color:'#FFBF00'}}>guarantee</span>{'(min_separation_5km);   '}<span style={{color:'rgba(0,220,255,0.4)'}}>{'// 100% verified'}</span>{'\n  }\n'}
            {'  → '}<span style={{color:'#00DCFF'}}>Response time:</span><span style={{color:'#FFBF00'}}>{' <500ms'}</span>{'  |  Fuel efficiency: '}<span style={{color:'#00DCFF'}}>95%</span>
          </pre>
        </div>
      </div>
    </section>
  )
}
