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
    role: 'Founder & CEO · Kigali, Rwanda',
    bio: 'Founder of Ikirere Orbital Labs. Focused on autonomous orbital infrastructure, AI systems, orbital software, and long-term space infrastructure development.',
  },
  {
    initials: 'AD',
    photo: '/alph.jpg',
    name: 'Alph Doamekpor',
    role: 'Strategic Aerospace Advisor · Germany',
    bio: 'More than two decades across ESA, NASA, EUMETSAT, Airbus, and ATG Europe. Provides guidance across mission architecture, spacecraft systems, orbital operations, and industry partnerships.',
  },
]

const beliefs = [
  {
    heading: 'Infrastructure matters.',
    body: 'The future space economy will be built on infrastructure that enables others to operate, innovate, and expand beyond Earth.',
  },
  {
    heading: 'Software before hardware.',
    body: 'Simulation, validation, and autonomous operations reduce risk and accelerate development. We build and test in software before committing to hardware.',
  },
  {
    heading: 'Long-term thinking wins.',
    body: 'Building meaningful space infrastructure requires patience, discipline, and sustained execution over decades. We are building for that timeline.',
  },
  {
    heading: 'Build for the future.',
    body: 'The systems required for future orbital, lunar, and deep-space operations will not appear overnight. They must be built deliberately, one layer at a time.',
  },
]

export default function About() {
  const missionRef   = useReveal()
  const teamRef      = useReveal()
  const beliefRef    = useReveal()

  return (
    <>
      <PageSEO
        title="About — Building Autonomous Orbital Infrastructure"
        description="Ikirere Orbital Labs builds the software, systems, and satellite infrastructure required for the next generation of orbital operations. Building from Africa for a global future."
        path="/about"
        schema={[
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            "url": "https://ikirere.com/about",
            "name": "About Ikirere Orbital Labs",
            "description": "Ikirere Orbital Labs builds autonomous orbital infrastructure — from ground systems and mission coordination software to multipurpose nanosatellite platforms.",
            "isPartOf": { "@id": "https://ikirere.com/#website" },
            "about": { "@id": "https://ikirere.com/#organization" }
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Jason Quist",
            "jobTitle": "Founder & CEO",
            "worksFor": { "@id": "https://ikirere.com/#organization" },
            "description": "Founder of Ikirere Orbital Labs. Focused on autonomous orbital infrastructure, AI systems, orbital software, and long-term space infrastructure development.",
            "image": "https://ikirere.com/jason-ggle.jpg",
            "url": "https://ikirere.com/about"
          },
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Alph Doamekpor",
            "jobTitle": "Strategic Aerospace Advisor",
            "worksFor": { "@id": "https://ikirere.com/#organization" },
            "description": "More than two decades across ESA, NASA, EUMETSAT, Airbus, and ATG Europe. Provides guidance across mission architecture, spacecraft systems, orbital operations, and industry partnerships.",
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
            <Label>About</Label>
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontVariationSettings: "'wght' 600", letterSpacing: '-0.03em', lineHeight: '1.12', color: '#111827', marginBottom: '16px' }}>
            Why we exist.
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '540px' }}>
            Ikirere Orbital Labs is building the software, systems, and satellite infrastructure required for the next generation of orbital operations. Our work spans ground infrastructure, autonomous mission coordination, and multipurpose nanosatellite systems designed to support future orbital economies.
          </p>
          <p style={{ fontSize: '1.05rem', color: '#64748b', lineHeight: '1.7', maxWidth: '540px', marginTop: '16px' }}>
            Existing satellite systems are expensive, fragmented, and built for single-purpose missions. IOLA is building a new model: programmable multipurpose nanosatellites coordinated through a shared orbital intelligence layer designed for African institutions, governments, and research ecosystems.
          </p>
        </div>
      </section>

      {/* ── Mission ─────────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={missionRef} className="reveal">
          <Label>Mission</Label>
          <h2 className="text-2xl mb-6" style={h2}>Why we exist</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Access to space infrastructure remains concentrated among a small number of countries and organizations.</p>
            <p>As orbital activity expands, the world will require new infrastructure capable of coordinating increasingly complex spacecraft, missions, and data systems.</p>
            <p>Ikirere Orbital Labs exists to help build that future. We believe the next generation of orbital infrastructure should be more autonomous, more accessible, and more capable of supporting global participation in the space economy.</p>
            <p>We are building from Africa with a long-term vision that extends beyond individual satellites toward the infrastructure layer that powers space operations.</p>
          </div>

          <div style={{ height: '1px', background: '#e2e8f0', margin: '40px 0' }} />

          <h2 className="text-2xl mb-6" style={h2}>Why software first</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', fontSize: '0.95rem', color: '#475569', lineHeight: '1.8' }}>
            <p>Space hardware is expensive to build and difficult to iterate.</p>
            <p>Software allows us to validate mission concepts, operational logic, and coordination systems before hardware enters production.</p>
            <p>By building and testing in simulation first, we reduce risk, accelerate learning, and create a foundation that can scale from individual spacecraft to future constellations.</p>
            <p>Simulation is not the destination. It is how we build better infrastructure.</p>
          </div>

          <div style={{ height: '1px', background: '#e2e8f0', margin: '40px 0' }} />

          <h2 className="text-2xl mb-6" style={h2}>Our architecture</h2>

          <div style={{ border: '1px solid #e2e8f0', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 1px 3px rgba(10,36,99,0.05)' }}>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #e2e8f0', background: '#f0f4f9', borderLeft: '3px solid #0A2463' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1E5FA8', marginBottom: '8px' }}>IOLA Orbit</p>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.7' }}>Autonomous mission planning, spacecraft operations, and orbital coordination software.</p>
            </div>
            <div style={{ padding: '24px 28px', borderBottom: '1px solid #e2e8f0', background: '#fff', borderLeft: '3px solid transparent' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>Ground Infrastructure</p>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.7' }}>Mission support systems, communications infrastructure, and operational capabilities connecting Earth to orbit.</p>
            </div>
            <div style={{ padding: '24px 28px', background: '#fff', borderLeft: '3px solid transparent' }}>
              <p style={{ fontSize: '10px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#94a3b8', marginBottom: '8px' }}>Multipurpose Nanosatellite Network</p>
              <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.7' }}>Software-enabled satellite systems designed to support multiple applications through a unified orbital platform.</p>
            </div>
          </div>
        </div>
      </section>

      <div style={{ borderTop: '1px solid #e2e8f0' }} />

      {/* ── Team ──────────────────────────────────────── */}
      <section className="py-20 max-w-[720px] mx-auto px-8">
        <div ref={teamRef} className="reveal">
          <Label>Team</Label>
          <h2 className="text-2xl mb-10" style={h2}>The team building it</h2>

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
          <Label>What We Believe</Label>
          <h2 className="text-2xl mb-10" style={h2}>What we believe</h2>

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
