import { useEffect, useRef } from 'react'

function useReveal() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('visible'); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return ref
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '10px' }}>
      {children}
    </p>
  )
}

const h2 = { fontVariationSettings: "'wght' 580", letterSpacing: '-0.025em', color: '#111827' }

const team = [
  {
    initials: 'JQ',
    name: 'Jason Quist',
    role: 'Founder & CEO · Kigali, Rwanda',
    bio: 'AI researcher focused on reinforcement learning for autonomous systems. Leads product, research, and company strategy. Building IOLA because Africa\'s access to space infrastructure shouldn\'t depend on external permission.',
  },
  {
    initials: 'AD',
    name: 'Alph Doamekpor',
    role: 'Strategy & Aerospace Advisor · Germany',
    bio: 'Over two decades across ESA, NASA, and EUMETSAT. Bridges IOLA\'s software-first approach with the real constraints of aerospace systems engineering. Ensures the architecture is grounded in actual mission physics.',
  },
]

const beliefs = [
  {
    heading: 'Safety is not a feature.',
    body: 'Orbital safety — guaranteed minimum separation, verified manoeuvre planning, deterministic collision avoidance — is the foundation everything else runs on. We don\'t ship coordination algorithms that can\'t be formally verified. The sky is shared infrastructure.',
  },
  {
    heading: 'Simulation is not a prototype.',
    body: 'The simulation environment is the production system in development. Every algorithm that ships runs there first. Real TLE data. Real conjunction geometry. Real orbital mechanics. When we say something works, we mean it works on 15,000 satellites simultaneously.',
  },
  {
    heading: 'Africa is not a market. It\'s the mission.',
    body: 'We are not building a product for African universities and governments. We are part of the same institutions we serve. The infrastructure we build will be operated by African engineers, run on African ground stations, serve African research objectives.',
  },
  {
    heading: 'Long timelines are honest timelines.',
    body: 'Getting a satellite into orbit takes years. Operating a constellation safely takes decades of institutional knowledge. The software will be validated in two years. The firmware will be flight-ready in four. The first constellation will launch when the physics is proven.',
  },
]

export default function About() {
  const missionRef   = useReveal()
  const teamRef      = useReveal()
  const beliefRef    = useReveal()

  return (
    <>
      {/* ── Page hero ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: '80px 0 64px',
          borderBottom: '1px solid #e2e8f0',
          backgroundImage: 'radial-gradient(circle, rgba(10,36,99,0.04) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div
          className="absolute pointer-events-none"
          style={{ top: '-60px', right: '-40px', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(200,134,10,0.05) 0%, transparent 65%)', borderRadius: '50%' }}
          aria-hidden
        />
        <div className="max-w-[720px] mx-auto px-8 relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-5 h-px" style={{ background: 'linear-gradient(to right, transparent, #1E5FA8)' }} />
            <Label>About IOLA</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.08', color: '#111827', marginBottom: '16px' }}>
            Software first.<br />
            <span style={{ color: '#0A2463' }}>Hardware when proven.</span>
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '500px' }}>
            A team of AI researchers and aerospace engineers building the orbital infrastructure for the African space age.
          </p>
        </div>
      </section>

      {/* ── Mission ─────────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={missionRef} className="reveal">
          <Label>Mission</Label>
          <h2 className="text-2xl mb-6" style={h2}>Why we exist</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Africa has 17% of the world's population and less than 3% of active satellites. The infrastructure deficit is not a technology problem — it's a capital allocation and access problem. IOLA's job is to reduce the cost and complexity of getting a satellite into orbit and operating it effectively, until African institutions can do it themselves without depending on external systems or permissions.</p>
            <p>We are not a satellite imagery company. We are not building another comms constellation. We are building the software layer that makes all of those things cheaper, safer, and more accessible — and eventually, the hardware platform that runs it.</p>
          </div>

          <div style={{ height: '1px', background: '#e2e8f0', margin: '40px 0' }} />

          <h2 className="text-2xl mb-6" style={h2}>Why software first</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Hardware development in aerospace has a failure mode: you build the satellite, launch it, and discover that the coordination, autonomy, and safety logic doesn't work at scale. You can't fix it in orbit. IOLA's approach inverts this. We build and validate the full software stack — orbital mechanics, conjunction assessment, multi-satellite coordination, safety-verified manoeuvre planning — in simulation, against real data, before a single piece of hardware is fabricated.</p>
            <p>When the firmware ships, it ports directly from the simulation environment. When the satellite launches, the operational logic has already run millions of simulated orbits. The hardware is the last variable, not the first.</p>
          </div>

          <div style={{ height: '1px', background: '#e2e8f0', margin: '40px 0' }} />

          <h2 className="text-2xl mb-6" style={h2}>The two-track architecture</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '20px' }}>IOLA runs two parallel development tracks that converge at launch:</p>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #e2e8f0', background: '#f0f4f9', borderLeft: '3px solid #0A2463' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E5FA8', marginBottom: '8px' }}>Software track — forward</p>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.7' }}>Build the ground simulation, prove the coordination algorithms, port to onboard firmware, validate in hardware-in-the-loop testing.</p>
            </div>
            <div style={{ padding: '24px 28px', background: '#fff', borderLeft: '3px solid transparent' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>Hardware track — reverse</p>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.7' }}>Start from the final mission capability and reverse-engineer the minimum hardware that delivers it. 3U or 6U CubeSat. NVIDIA Jetson compute. Off-the-shelf where possible, custom where necessary.</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Team ──────────────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={teamRef} className="reveal">
          <Label>Team</Label>
          <h2 className="text-2xl mb-10" style={h2}>The people building it</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {team.map((m, i) => (
              <div key={m.name} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', padding: '28px 28px', background: '#fff', borderBottom: i < team.length - 1 ? '1px solid #e2e8f0' : 'none' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0A2463, #1E5FA8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 600, fontSize: '13px', flexShrink: 0,
                  letterSpacing: '0.04em',
                }}>
                  {m.initials}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111827' }}>{m.name}</p>
                  <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px', marginBottom: '10px', letterSpacing: '0.02em' }}>{m.role}</p>
                  <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.7' }}>{m.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Philosophy ───────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={beliefRef} className="reveal">
          <Label>Philosophy</Label>
          <h2 className="text-2xl mb-10" style={h2}>What IOLA believes</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0', border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            {beliefs.map((b, i) => (
              <div key={b.heading}
                style={{
                  padding: '28px 28px 28px 24px',
                  borderBottom: i < beliefs.length - 1 ? '1px solid #e2e8f0' : 'none',
                  borderLeft: '3px solid #e2e8f0',
                  background: '#fff',
                  transition: 'border-left-color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = '#0A2463'; (e.currentTarget as HTMLElement).style.background = '#f8fafc' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderLeftColor = '#e2e8f0'; (e.currentTarget as HTMLElement).style.background = '#fff' }}
              >
                <p style={{ fontWeight: 600, fontSize: '0.95rem', color: '#111827', marginBottom: '8px' }}>{b.heading}</p>
                <p style={{ fontSize: '13.5px', color: '#64748b', lineHeight: '1.75' }}>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
