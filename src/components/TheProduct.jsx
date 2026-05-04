import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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

function SectionLabel({ text, color = '#FFBF00' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
      <div style={{ width: 28, height: 1, background: color, opacity: 0.6 }} />
      <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, letterSpacing: '0.35em', color, textTransform: 'uppercase' }}>{text}</span>
    </div>
  )
}

const features = [
  {
    title: 'Programmable CubeSats',
    sub: '3U / 6U Kits',
    body: 'Modular satellite kits with NVIDIA Jetson compute and customizable payloads. From prototype to orbit in months.',
    color: '#00DCFF',
    icon: <svg viewBox="0 0 40 40" width="32" height="32" fill="none"><rect x="8" y="4" width="24" height="32" rx="2" stroke="#00DCFF" strokeWidth="1.5"/><rect x="4" y="14" width="4" height="12" rx="1" fill="#00DCFF" opacity="0.5"/><rect x="32" y="14" width="4" height="12" rx="1" fill="#00DCFF" opacity="0.5"/><line x1="8" y1="20" x2="32" y2="20" stroke="#00DCFF" strokeWidth="0.75" opacity="0.4"/></svg>,
  },
  {
    title: 'IkirereMesh SDK',
    sub: 'AI Coordination Layer',
    body: 'Graph-based mission planner with RL coordination and deterministic safety shields. Python APIs for ground station control.',
    color: '#FFBF00',
    icon: <svg viewBox="0 0 40 40" width="32" height="32" fill="none"><circle cx="20" cy="20" r="10" stroke="#FFBF00" strokeWidth="1.5"/><circle cx="8" cy="10" r="3" fill="#FFBF00" opacity="0.6"/><circle cx="32" cy="10" r="3" fill="#FFBF00" opacity="0.6"/><circle cx="20" cy="35" r="3" fill="#FFBF00" opacity="0.6"/><line x1="11" y1="12" x2="17" y2="16" stroke="#FFBF00" strokeWidth="1" opacity="0.5"/><line x1="29" y1="12" x2="23" y2="16" stroke="#FFBF00" strokeWidth="1" opacity="0.5"/><line x1="20" y1="30" x2="20" y2="24" stroke="#FFBF00" strokeWidth="1" opacity="0.5"/></svg>,
  },
  {
    title: 'Launch Partnership',
    sub: 'SpaceX Rideshare',
    body: 'Integrated launch coordination. From lab prototype to orbit in months. We handle the path from integration to deployment.',
    color: '#00DCFF',
    icon: <svg viewBox="0 0 40 40" width="32" height="32" fill="none"><path d="M20 4 L26 16 L38 20 L26 24 L24 36 L20 28 L12 36 L14 24 L2 20 L14 16 Z" stroke="#00DCFF" strokeWidth="1.5" fill="none"/></svg>,
  },
]

const specs = [
  { label: 'Form Factor', value: '3U / 6U CubeSat' },
  { label: 'Compute', value: 'NVIDIA Jetson Orin NX' },
  { label: 'Comms', value: 'UHF/S-Band + Optical' },
  { label: 'Power', value: 'Triple-junction Solar' },
  { label: 'ADCS', value: 'Reaction Wheels + Star Tracker' },
  { label: 'Software', value: 'Linux RT + IkirereMesh SDK' },
]

export default function TheProduct() {
  const ref = useRef(null)
  const vis = useInView(ref)

  return (
    <section ref={ref} id="product" style={{ background: 'linear-gradient(180deg, #060F1E 0%, #040C1C 100%)', padding: '120px 6vw' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72, opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(30px)', transition: 'all 0.8s ease' }}>
          <SectionLabel text="The Product" />
          <h2 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 900, fontSize: 'clamp(32px, 5vw, 60px)', color: '#F5F7FA', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
            Code. Configure. <span style={{ color: '#FFBF00', textShadow: '0 0 30px rgba(255,191,0,0.5)' }}>Launch.</span>
          </h2>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 18, color: 'rgba(245,247,250,0.55)', marginTop: 16, maxWidth: 560, margin: '16px auto 0' }}>
            The first programmable satellite kit for African research labs.
          </p>
        </div>

        {/* Feature Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 80 }}>
          {features.map((f, i) => (
            <div key={i} style={{
              background: 'rgba(8,18,40,0.7)', border: `1px solid ${f.color}18`,
              borderRadius: 14, padding: '36px 32px',
              opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(30px)',
              transition: `all 0.7s ease ${i * 0.12}s`, cursor: 'default',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = `${f.color}40`; e.currentTarget.style.background = 'rgba(8,18,40,0.95)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = `${f.color}18`; e.currentTarget.style.background = 'rgba(8,18,40,0.7)' }}
            >
              <div style={{ width: 48, height: 48, background: `${f.color}12`, border: `1px solid ${f.color}25`, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>{f.icon}</div>
              <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: f.color, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>{f.sub}</div>
              <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 22, color: '#F5F7FA', marginBottom: 12 }}>{f.title}</h3>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,247,250,0.55)', lineHeight: 1.7 }}>{f.body}</p>
            </div>
          ))}
        </div>

        {/* Specs + CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'start' }} className="product-grid">
          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(-30px)', transition: 'all 0.8s ease 0.3s' }}>
            <h3 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 26, color: '#F5F7FA', marginBottom: 32 }}>Technical Specifications</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {specs.map((s, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid rgba(0,220,255,0.08)' }}>
                  <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: 'rgba(245,247,250,0.5)' }}>{s.label}</span>
                  <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 12, color: '#00DCFF' }}>{s.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateX(30px)', transition: 'all 0.8s ease 0.4s' }}>
            <div style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(0,220,255,0.15)', borderRadius: 12, padding: '28px 32px', marginBottom: 24 }}>
              <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: 'rgba(0,220,255,0.4)', letterSpacing: '0.1em', marginBottom: 16 }}>ikirere_mesh.py</div>
              <pre style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 12, lineHeight: 1.8, margin: 0, color: 'rgba(245,247,250,0.7)', overflow: 'auto' }}>
{`from ikirere import Constellation

mesh = Constellation("my-mission")
mesh.add_satellite("sat-1", orbit="LEO-550")

trajectory = mesh.plan_maneuver(
  target="science-orbit",
  shield=SafetyShield(sep=5.0)
)

mesh.execute(trajectory)
# ✓ Safe trajectory deployed`}
              </pre>
            </div>

            <div style={{ background: 'rgba(8,18,40,0.8)', border: '1px solid rgba(255,191,0,0.2)', borderRadius: 12, padding: '28px 32px' }}>
              <div style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 10, color: 'rgba(255,191,0,0.7)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 12 }}>Pricing</div>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 28, color: '#F5F7FA', marginBottom: 8 }}>Contact for Quote</div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: 'rgba(245,247,250,0.5)', marginBottom: 20, lineHeight: 1.6 }}>Volume discounts for university consortiums and research programs.</p>
              <Link to="/pricing" style={{
                display: 'block', textAlign: 'center', padding: '13px',
                background: 'linear-gradient(135deg, #00DCFF, #0088FF)',
                border: 'none', borderRadius: 8, fontFamily: "'Inter', sans-serif", fontWeight: 700,
                fontSize: 14, color: '#040C1C', textDecoration: 'none',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                Request Demo Kit
              </Link>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 768px) { .product-grid { grid-template-columns: 1fr !important; } }`}</style>
    </section>
  )
}
