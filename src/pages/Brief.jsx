import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageSEO from '../components/PageSEO'

const arms = [
  {
    name: 'Archangel',
    title: 'Operational Intelligence Platform',
    description:
      'A real-time system that fuses maritime, air, orbital, geospatial, and environmental signals into one operational picture.',
    points: [
      'Fuses AIS, radar, air traffic, imagery, and intelligence feeds',
      'Produces evidence-backed alerts with context and reasoning',
      'Supports data-driven regional deployments across Africa',
    ],
    accent: 'teal',
  },
  {
    name: 'IkirereMesh',
    title: 'AI Coordination Layer for Satellite Constellations',
    description:
      'A coordination system for low Earth orbit that predicts close approaches and proposes safe, fuel-aware maneuver plans.',
    points: [
      'Combines reinforcement learning agents with deterministic safety shields',
      'Keeps operators in the loop for large-scale coordination decisions',
      'Progresses from simulation to CubeSat deployment and constellation control',
    ],
    accent: 'amber',
  },
]

const drivers = [
  'Space, air, sea, and land systems now generate more data than most operators can fuse coherently.',
  'Orbital congestion is rising as constellations expand faster than safety infrastructure.',
  'Africa needs sovereign capability instead of continued dependence on external systems.',
]

const team = [
  'Jason Quist (Ghana) - AI researcher specializing in reinforcement learning and autonomous systems; founder of Ikirere Orbital Labs Africa building AI infrastructure for space operations and operational intelligence. Archangel Intelligence Platform Lead Engineer.',
  'Gideon Salami (Ghana) - Senior software engineer focused on machine learning systems, RL environments, and backend architecture for large-scale simulation and data pipelines.',
  'Abigail Boateng (Ghana) - Chief Research Scientist leading the research program on reinforcement learning, orbital coordination algorithms, and safety-critical AI systems.',
  'Jessica Randall (South Africa) - Software engineer with strong mathematical foundations supporting machine learning research, modeling, and algorithm development.',
  'Ignatius Balayo (Uganda) - AI master\'s student and software developer responsible for evaluation frameworks, experiment tracking, and machine learning validation pipelines.',
  'Alph Doamekpor (Germany) - Aerospace and machine learning expert with over two decades of experience across ESA, NASA and EUMETSAT guiding research direction and space systems integration.',
]

export default function Brief() {
  return (
    <div className="min-h-screen bg-stratosphere pt-24">
      <PageSEO
        title="Company Brief | Ikirere Orbital Labs Africa"
        description="A concise summary of where Ikirere stands today and the two integrated product arms under development: Archangel and IkirereMesh."
        keywords="Ikirere brief, Archangel, IkirereMesh, orbital intelligence, Africa space infrastructure"
        aiDescription="Ikirere Orbital Labs Africa is building AI infrastructure for space and operational intelligence. The company is organized around two tightly integrated platforms: Archangel, a real-time operational intelligence platform for multi-domain data fusion, and IkirereMesh, an AI coordination layer for satellite constellations that combines reinforcement learning with deterministic safety controls."
        path="/brief"
      />

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,240,255,0.16),_transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(255,191,0,0.14),_transparent_28%)]" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="inline-flex rounded-full border border-teal/20 bg-black/30 px-4 py-2 text-xs font-mono uppercase tracking-[0.32em] text-teal">
              Company Brief
            </div>
            <h1 className="mt-8 text-5xl md:text-7xl font-heading font-black leading-[0.95] text-orbital">
              AI Infrastructure for
              <span className="block text-teal text-glow-teal">Space and Operational Intelligence</span>
            </h1>
            <p className="mt-8 max-w-4xl text-lg md:text-2xl leading-relaxed text-orbital/72">
              Ikirere Orbital Labs Africa is building the intelligence and coordination layer for the orbital economy.
              Today the company is centered on two tightly integrated arms:
              <span className="text-teal font-semibold"> Archangel</span> and
              <span className="text-amber font-semibold"> IkirereMesh</span>.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-12 grid gap-4 md:grid-cols-3"
          >
            <div className="rounded-2xl border border-teal/20 bg-black/35 p-6">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-teal/80">Structure</div>
              <div className="mt-3 text-3xl font-heading font-black text-orbital">2 Operating Arms</div>
              <p className="mt-2 text-sm leading-relaxed text-orbital/65">One product for intelligence fusion, one for orbital coordination.</p>
            </div>
            <div className="rounded-2xl border border-teal/20 bg-black/35 p-6">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-teal/80">Operational Scope</div>
              <div className="mt-3 text-3xl font-heading font-black text-orbital">Space to Surface</div>
              <p className="mt-2 text-sm leading-relaxed text-orbital/65">Built for orbital, air, maritime, land, and infrastructure awareness.</p>
            </div>
            <div className="rounded-2xl border border-amber/20 bg-black/35 p-6">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-amber/80">Mission</div>
              <div className="mt-3 text-3xl font-heading font-black text-orbital">Decision Infrastructure</div>
              <p className="mt-2 text-sm leading-relaxed text-orbital/65">Turn raw signals into operational decisions and keep satellite systems safe at scale.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] mb-20"
        >
          <div className="rounded-3xl border border-teal/20 bg-black/35 p-8 md:p-10">
            <div className="text-sm font-mono uppercase tracking-[0.3em] text-teal">Where We Stand</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-black text-orbital">Building the systems layer before the market catches up.</h2>
            <div className="mt-6 space-y-4 text-base md:text-lg leading-relaxed text-orbital/72">
              {drivers.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-amber/20 bg-gradient-to-br from-amber/10 to-black/30 p-8">
            <div className="text-sm font-mono uppercase tracking-[0.3em] text-amber">Long-Term Buildout</div>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-orbital/74">
              <p>Programmable CubeSats as data collection nodes.</p>
              <p>AI coordination systems for safe orbital operations.</p>
              <p>Operational intelligence platforms that interpret and distribute signals.</p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/archangel" className="inline-flex rounded-md bg-teal px-5 py-3 text-sm font-semibold tracking-wide text-stratosphere transition-colors hover:bg-teal/90">
                View Archangel
              </Link>
              <Link to="/roadmap" className="inline-flex rounded-md border border-orbital/20 px-5 py-3 text-sm font-semibold tracking-wide text-orbital transition-colors hover:border-teal/40 hover:text-teal">
                See Roadmap
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7 }}
          className="mb-20"
        >
          <div className="mb-8 text-center">
            <div className="text-sm font-mono uppercase tracking-[0.3em] text-teal">Two Arms</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-black text-orbital">One intelligence stack, two control layers.</h2>
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {arms.map((arm, index) => (
              <motion.div
                key={arm.name}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.65, delay: index * 0.1 }}
                className={`rounded-3xl border bg-black/35 p-8 md:p-10 ${arm.accent === 'teal' ? 'border-teal/20' : 'border-amber/20'}`}
              >
                <div className={`text-sm font-mono uppercase tracking-[0.3em] ${arm.accent === 'teal' ? 'text-teal' : 'text-amber'}`}>{arm.name}</div>
                <h3 className="mt-4 text-3xl font-heading font-black text-orbital">{arm.title}</h3>
                <p className="mt-5 text-lg leading-relaxed text-orbital/72">{arm.description}</p>
                <div className="mt-8 space-y-3">
                  {arm.points.map((point) => (
                    <div key={point} className="rounded-2xl border border-orbital/10 bg-white/[0.02] px-4 py-4 text-sm leading-relaxed text-orbital/68">
                      {point}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          <div className="mb-8 text-center">
            <div className="text-sm font-mono uppercase tracking-[0.3em] text-teal">Core Technical Team</div>
            <h2 className="mt-4 text-3xl md:text-5xl font-heading font-black text-orbital">Research, engineering, and aerospace experience across the stack.</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {team.map((member, index) => (
              <motion.div
                key={member}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55, delay: index * 0.06 }}
                className="rounded-2xl border border-teal/15 bg-black/35 p-6 text-sm leading-relaxed text-orbital/70"
              >
                {member}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  )
}
