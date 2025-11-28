import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function TheProduct() {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  const features = [
    {
      icon: '🛰️',
      title: 'Programmable CubeSats',
      description: 'Modular 3U/6U CubeSat kits with onboard compute and customizable payloads. Deploy your research to orbit.',
    },
    {
      icon: '🧠',
      title: 'IkirereMesh Software',
      description: 'Graph-based mission planner with RL coordination and deterministic safety shields. APIs for ground station control.',
    },
    {
      icon: '🚀',
      title: 'Launch Partnership',
      description: 'Integrated SpaceX rideshare coordination. From prototype to orbit in months, not years.',
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

  return (
    <section id="product" className="relative py-32 bg-gradient-to-b from-stratosphere to-black/95">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-block px-6 py-2 bg-amber/10 border border-amber/30 rounded-full mb-6">
            <span className="text-amber font-mono text-sm tracking-widest uppercase">The Product</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-orbital mb-6">
            Code. Configure. <span className="text-amber">Launch.</span>
          </h2>
          <p className="text-xl text-orbital/70 max-w-3xl mx-auto">
            The first programmable satellite kit for African research labs.
            Hardware, software, and launch—all in one sovereign platform.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="glass rounded-2xl p-8 hover:border-teal/30 transition-all group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
              <h3 className="text-2xl font-heading font-bold text-orbital mb-4 group-hover:text-teal transition-colors">
                {feature.title}
              </h3>
              <p className="text-orbital/70 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Exploded View Section */}
        <div ref={ref} className="grid md:grid-cols-2 gap-16 items-center mb-24">

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square glass rounded-2xl p-12 flex items-center justify-center overflow-hidden">
              {/* Simplified exploded CubeSat layers */}
              <div className="relative w-full h-full">
                {[
                  { label: 'Chassis', color: 'bg-stratosphere', offset: 0, opacity: 'opacity-90' },
                  { label: 'Compute', color: 'bg-teal/20', offset: 40, opacity: 'opacity-80' },
                  { label: 'Software', color: 'bg-amber/10', offset: 80, opacity: 'opacity-70' },
                ].map((layer, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 0, opacity: 0 }}
                    animate={inView ? {
                      y: -layer.offset,
                      opacity: 1,
                      rotateX: i * 5,
                    } : {}}
                    transition={{
                      duration: 0.8,
                      delay: i * 0.2,
                      type: 'spring',
                      stiffness: 100,
                    }}
                    className={`absolute inset-0 ${layer.color} ${layer.opacity} border-2 border-teal/30 rounded-lg`}
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <div className="absolute top-2 left-2 text-teal text-xs font-mono">{layer.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Floating labels */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="absolute -right-4 top-1/4 glass rounded-lg px-4 py-2"
            >
              <div className="text-xs text-orbital/60">Solar Panels</div>
              <div className="text-teal font-mono text-sm">12W Peak</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 1.4 }}
              className="absolute -left-4 bottom-1/4 glass rounded-lg px-4 py-2"
            >
              <div className="text-xs text-orbital/60">Propulsion</div>
              <div className="text-amber font-mono text-sm">Cold Gas</div>
            </motion.div>
          </motion.div>

          {/* Specs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h3 className="text-3xl font-heading font-bold text-orbital mb-8">
              Technical Specifications
            </h3>

            <div className="space-y-4">
              {specs.map((spec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  className="flex justify-between items-center pb-4 border-b border-teal/10"
                >
                  <span className="text-orbital/60 font-medium">{spec.label}</span>
                  <span className="text-teal font-mono text-sm">{spec.value}</span>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.6 }}
              className="mt-12 glass rounded-xl p-6"
            >
              <div className="text-amber font-mono text-sm mb-2">$ Pricing</div>
              <div className="text-4xl font-heading font-bold text-orbital mb-2">
                Contact for Quote
              </div>
              <p className="text-orbital/60 text-sm mb-4">
                Volume discounts available for university consortiums and research programs.
              </p>
              <a
                href="#waitlist"
                className="block w-full text-center px-6 py-3 bg-teal text-stratosphere font-bold rounded-lg hover:bg-teal/90 transition-all"
              >
                Request Demo Kit
              </a>
            </motion.div>
          </motion.div>

        </div>

        {/* SDK Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="glass rounded-2xl p-8 md:p-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block px-4 py-2 bg-teal/10 border border-teal/30 rounded-full mb-4">
                <span className="text-teal font-mono text-xs tracking-wider">SDK</span>
              </div>
              <h3 className="text-3xl font-heading font-bold text-orbital mb-4">
                Build with IkirereMesh
              </h3>
              <p className="text-orbital/70 mb-6">
                Python SDK with intuitive APIs for mission planning, telemetry, and safety verification.
                Deploy reinforcement learning policies directly to your constellation.
              </p>
              <a
                href="#docs"
                className="inline-flex items-center gap-2 text-teal hover:gap-3 transition-all font-mono text-sm"
              >
                View Documentation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="bg-black/50 rounded-xl p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-orbital/80">
{`from ikirere import Constellation, SafetyShield

# Initialize constellation
mesh = Constellation("my-mission")
mesh.add_satellite("cubesat-1", orbit="LEO-550")

# Configure safety shield
shield = SafetyShield(
  min_separation=5.0,  # km
  collision_threshold=0.001
)

# Plan maneuver with RL + Safety
trajectory = mesh.plan_maneuver(
  target="science-orbit",
  shield=shield
)

# Deploy to orbit
mesh.execute(trajectory)
print(f"✓ Safe trajectory deployed")
`}
              </pre>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
