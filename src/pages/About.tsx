import { useEffect, useRef } from 'react'
import PageSEO from '../components/PageSEO'

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
    photo: '/jason-ggle.jpg',
    name: 'Jason Quist',
    role: 'Co-Founder & CEO · Kigali, Rwanda',
    bio: 'Founder and systems architect focused on autonomous orbital infrastructure, reinforcement learning systems, and next-generation nanosatellite coordination architectures. Leads product, research, and company strategy.',
  },
  {
    initials: 'MM',
    photo: '/mayank.jpeg',
    name: 'Mayank Mutha',
    role: 'Co-Founder & Aerospace Systems Engineer · India',
    bio: 'Aerospace systems engineer focused on spacecraft mission architecture, autonomous orbital operations, and simulation-driven satellite system design. Works across ADCS and mission planning for CubeSat-class spacecraft. Ex-Dhruva Space.',
  },
  {
    initials: 'AD',
    photo: '/alph.jpg',
    name: 'Alph Doamekpor',
    role: 'Strategy & Aerospace Advisor · Germany',
    bio: 'Over two decades across ESA, NASA, and EUMETSAT. Advises on orbital systems engineering, mission architecture, and aerospace operational constraints across the IOLA roadmap.',
  },
]

const beliefs = [
  {
    heading: 'Safety is not a feature.',
    body: 'Orbital safety — guaranteed minimum separation, verified manoeuvre planning, deterministic collision avoidance — is the foundation everything else runs on. We don\'t ship coordination algorithms that can\'t be formally verified. Orbital space is shared infrastructure.',
  },
  {
    heading: 'Simulation is not a prototype.',
    body: 'The simulation environment is the production system in development. Every algorithm that ships runs there first. Real TLE data. Real conjunction geometry. Real orbital mechanics. Systems are validated against live orbital datasets and large-scale constellation environments before hardware deployment.',
  },
  {
    heading: 'Africa is not a market. It\'s the mission.',
    body: 'We are not building a product for African universities and governments. The infrastructure is being designed for African operational realities, institutions, and long-term sovereignty. The infrastructure we build will be operated by African engineers, run on African ground stations, serve African research objectives.',
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
      <PageSEO
        title="About — Who We Are"
        description="Ikirere Orbital Labs Africa: a frontier aerospace research program building autonomous orbital infrastructure from Africa. Learn about our mission, team, and philosophy."
        path="/about"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "url": "https://ikirere.com/about",
            "name": "About Ikirere Orbital Labs Africa",
            "description": "About the team and mission behind IOLA — building autonomous nanosatellite infrastructure from Africa.",
            "isPartOf": { "@id": "https://ikirere.com/#website" },
            "about": { "@id": "https://ikirere.com/#organization" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Jason Quist",
            "jobTitle": "Founder & CEO",
            "worksFor": { "@id": "https://ikirere.com/#organization" },
            "description": "Founder and systems architect focused on autonomous orbital infrastructure, reinforcement learning systems, and next-generation nanosatellite coordination architectures.",
            "image": "https://ikirere.com/jason-ggle.jpg",
            "url": "https://ikirere.com/about"
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Mayank Mutha",
            "jobTitle": "Co-Founder & Aerospace Systems Engineer",
            "worksFor": { "@id": "https://ikirere.com/#organization" },
            "description": "Aerospace systems engineer focused on spacecraft mission architecture, autonomous orbital operations, and simulation-driven satellite system design. Works across ADCS and mission planning for CubeSat-class spacecraft. Ex-Dhruva Space.",
            "image": "https://ikirere.com/mayank.jpeg",
            "url": "https://ikirere.com/about",
            "alumniOf": { "@type": "Organization", "name": "Dhruva Space" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Alph Doamekpor",
            "jobTitle": "Strategy & Aerospace Advisor",
            "worksFor": { "@id": "https://ikirere.com/#organization" },
            "description": "Over two decades across ESA, NASA, and EUMETSAT. Advises on orbital systems engineering, mission architecture, and aerospace operational constraints.",
            "image": "https://ikirere.com/alph.jpg",
            "url": "https://ikirere.com/about"
          }
        ]}
      />
      {/* ── Page hero ─────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          padding: '80px 0 64px',
          borderBottom: '1px solid #e2e8f0',
          
          
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
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.12', color: '#111827', marginBottom: '16px' }}>
            Who we are
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '540px' }}>
            A team of AI researchers and aerospace engineers building the full-stack orbital infrastructure powering the next generation of autonomous nanosatellite systems for climate, agriculture, Earth observation, logistics, and connectivity across Africa.
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
            <p>Existing satellite systems are expensive, fragmented, and built for single-purpose missions. IOLA is building a new model: programmable multipurpose nanosatellites coordinated through a shared orbital intelligence layer designed for African institutions, governments, and research ecosystems.</p>
          </div>

          <div style={{ height: '1px', background: '#e2e8f0', margin: '40px 0' }} />

          <h2 className="text-2xl mb-6" style={h2}>Why software first</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Space hardware is expensive to iterate. A satellite launched with flawed coordination or autonomy systems cannot simply be patched in orbit. IOLA solves this by validating orbital intelligence, autonomous coordination, and safety systems in simulation before deployment to flight hardware.</p>
            <p>When the firmware ships, it ports directly from the simulation environment. When the satellite launches, the operational logic has already run millions of simulated orbits. The hardware is the last variable, not the first.</p>
          </div>

          <div style={{ height: '1px', background: '#e2e8f0', margin: '40px 0' }} />

          <h2 className="text-2xl mb-6" style={h2}>The two-track architecture</h2>
          <p style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.8', marginBottom: '20px' }}>IOLA develops its orbital systems through two converging tracks:</p>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #e2e8f0', background: '#f0f4f9', borderLeft: '3px solid #0A2463' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E5FA8', marginBottom: '8px' }}>Software track</p>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.7' }}>Build the orbital intelligence layer, validate coordination systems in simulation, and transition proven architectures into onboard flight systems.</p>
            </div>
            <div style={{ padding: '24px 28px', background: '#fff', borderLeft: '3px solid transparent' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>Hardware track</p>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.7' }}>Engineer compact, modular nanosatellite platforms capable of supporting multiple missions through shared onboard infrastructure and programmable payload systems.</p>
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
                <img
                  src={m.photo}
                  alt={m.name}
                  onError={(e) => {
                    const t = e.currentTarget
                    t.style.display = 'none'
                    const fb = t.nextSibling as HTMLElement
                    if (fb) fb.style.display = 'flex'
                  }}
                  style={{
                    width: '56px', height: '56px', borderRadius: '50%',
                    objectFit: 'cover', objectPosition: 'center top',
                    flexShrink: 0, display: 'block',
                    border: '2px solid #e2e8f0',
                  }}
                />
                {/* Initials fallback — hidden when photo loads */}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #0A2463, #1E5FA8)',
                  display: 'none', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontWeight: 600, fontSize: '14px', flexShrink: 0,
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
