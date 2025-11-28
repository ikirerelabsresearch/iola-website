import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageSEO, { pageSEO } from '../components/PageSEO'

export default function IkirereMeshSDK() {
  const features = [
    {
      title: 'Reinforcement Learning Planner',
      description: 'Optimize fuel-efficient trajectories for multi-satellite constellations using state-of-the-art RL algorithms.',
      icon: '🧠'
    },
    {
      title: 'Deterministic Safety Shields',
      description: 'Mathematical guarantees on collision-free trajectories. Override unsafe maneuvers in real-time.',
      icon: '🛡️'
    },
    {
      title: 'Graph-Based Coordination',
      description: 'Model satellite networks as dynamic graphs. Optimize for minimal fuel and maximal coverage.',
      icon: '🌐'
    },
    {
      title: 'Real-Time Collision Avoidance',
      description: 'React to debris fields and conjunction warnings in <500ms with verified safety.',
      icon: '⚡'
    },
    {
      title: 'Multi-Agent Support',
      description: 'Coordinate fleets of 10-1000+ satellites with distributed decision making.',
      icon: '🛰️'
    },
    {
      title: 'Simulation & Testing',
      description: 'Validate mission plans in high-fidelity orbital mechanics simulators before deployment.',
      icon: '🔬'
    }
  ]

  const codeExample = `# IkirereMesh SDK - Quick Start
from ikirere_mesh import Constellation, SafetyShield

# Initialize constellation
constellation = Constellation(satellites=32)

# Define mission parameters
mission = constellation.plan_mission(
    target_coverage=0.95,
    fuel_budget="minimal",
    safety_margin=5000  # 5km minimum separation
)

# Apply safety shield
shield = SafetyShield(debris_db="spacetrack")
safe_plan = shield.verify(mission)

# Execute maneuvers
constellation.execute(safe_plan)
print(f"Mission success: {safe_plan.is_safe()}")
# Output: Mission success: True`

  return (
    <div className="min-h-screen bg-stratosphere pt-24">
      <PageSEO {...pageSEO.ikirereMeshSDK} />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black text-orbital mb-6">
            <span className="text-teal">IkirereMesh</span> SDK
          </h1>
          <p className="text-xl md:text-2xl text-orbital/70 max-w-3xl mx-auto leading-relaxed">
            Graph-based satellite constellation coordinator with AI-powered planning
            and deterministic safety guarantees.
          </p>
        </motion.div>

        {/* Code Example */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-20"
        >
          <div className="bg-black/60 border border-teal/30 rounded-xl p-8">
            <pre className="text-teal font-mono text-sm overflow-x-auto">
              <code>{codeExample}</code>
            </pre>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Core Features</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-black/40 border border-teal/20 rounded-xl p-6 hover:border-teal/40 transition-all"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-heading font-bold text-orbital mb-2">{feature.title}</h3>
                <p className="text-orbital/60">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technical Architecture */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-black/40 border border-amber/20 rounded-xl p-8 mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-6">Technical Architecture</h2>
          <div className="space-y-6 text-orbital/70">
            <div>
              <h3 className="text-xl font-semibold text-teal mb-2">Layer 1: Reinforcement Learning Planner</h3>
              <p>
                PPO-based multi-agent system trained on orbital mechanics simulations.
                Optimizes for fuel efficiency, coverage, and constellation geometry.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal mb-2">Layer 2: Deterministic Safety Shield</h3>
              <p>
                Runtime verification using interval arithmetic and reachability analysis.
                Guarantees minimum separation distances even in worst-case scenarios.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-teal mb-2">Layer 3: Graph Coordinator</h3>
              <p>
                Models satellite networks as time-varying graphs. Applies graph neural networks
                for distributed coordination and communication-efficient planning.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8 text-center">Use Cases</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-black/40 border border-teal/20 rounded-xl p-6">
              <h3 className="text-xl font-heading font-bold text-teal mb-3">Earth Observation Constellations</h3>
              <p className="text-orbital/60">
                Coordinate imaging satellites for maximum ground coverage while avoiding
                collisions with debris and other satellites.
              </p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-6">
              <h3 className="text-xl font-heading font-bold text-teal mb-3">Communication Networks</h3>
              <p className="text-orbital/60">
                Optimize LEO communication constellations for latency, bandwidth,
                and fuel-efficient station-keeping.
              </p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-6">
              <h3 className="text-xl font-heading font-bold text-teal mb-3">Research Missions</h3>
              <p className="text-orbital/60">
                Plan formation flying experiments, rendezvous operations, and
                distributed sensing missions with safety guarantees.
              </p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-6">
              <h3 className="text-xl font-heading font-bold text-teal mb-3">Debris Mitigation</h3>
              <p className="text-orbital/60">
                Active collision avoidance in congested orbital regimes. Prevent
                Kessler Syndrome cascades with verified safe maneuvers.
              </p>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center"
        >
          <Link
            to="/documentation"
            className="inline-block px-8 py-4 bg-teal text-black font-semibold rounded-lg hover:bg-teal/90 transition-all text-lg"
          >
            View Documentation
          </Link>
          <p className="text-orbital/60 mt-4">
            Beta access available Q3 2025
          </p>
        </motion.div>
      </section>
    </div>
  )
}
