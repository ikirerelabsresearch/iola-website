import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CubeSatKits() {
  const kits = [
    {
      name: '3U CubeSat Kit',
      size: '10×10×30 cm',
      compute: 'NVIDIA Jetson Nano',
      power: '30W Solar Panels',
      storage: '256GB SSD',
      price: 'Contact for pricing',
      features: [
        'Pre-integrated structure',
        'Solar power system',
        'Attitude control',
        'Communication module',
        'IkirereMesh SDK compatible',
        'SpaceX launch ready'
      ]
    },
    {
      name: '6U CubeSat Kit',
      size: '10×20×30 cm',
      compute: 'NVIDIA Jetson Xavier NX',
      power: '60W Solar Panels',
      storage: '512GB SSD',
      price: 'Contact for pricing',
      features: [
        'Extended payload capacity',
        'Advanced solar arrays',
        'Precision ADCS',
        'High-bandwidth comms',
        'IkirereMesh SDK compatible',
        'SpaceX launch ready',
        'Extended mission duration'
      ]
    }
  ]

  const specs = {
    '3U': {
      mass: '~4 kg',
      orbit: 'LEO 400-600 km',
      lifetime: '2-3 years',
      dataRate: '1 Mbps',
      power: '30W peak',
      orientation: '3-axis stabilized'
    },
    '6U': {
      mass: '~8 kg',
      orbit: 'LEO 400-800 km',
      lifetime: '3-5 years',
      dataRate: '5 Mbps',
      power: '60W peak',
      orientation: '3-axis stabilized'
    }
  }

  return (
    <div className="min-h-screen bg-stratosphere pt-24">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-heading font-black text-orbital mb-6">
            Programmable <span className="text-teal">CubeSat Kits</span>
          </h1>
          <p className="text-xl md:text-2xl text-orbital/70 max-w-3xl mx-auto leading-relaxed">
            Complete satellite hardware designed for African research institutions.
            Pre-integrated, launch-ready, and powered by NVIDIA compute.
          </p>
        </motion.div>

        {/* Product Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {kits.map((kit, index) => (
            <motion.div
              key={kit.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-black/40 border border-teal/20 rounded-xl p-8 hover:border-teal/40 transition-all"
            >
              <h3 className="text-3xl font-heading font-bold text-teal mb-4">{kit.name}</h3>
              <div className="space-y-2 mb-6 text-orbital/60">
                <p><span className="text-orbital font-semibold">Size:</span> {kit.size}</p>
                <p><span className="text-orbital font-semibold">Compute:</span> {kit.compute}</p>
                <p><span className="text-orbital font-semibold">Power:</span> {kit.power}</p>
                <p><span className="text-orbital font-semibold">Storage:</span> {kit.storage}</p>
              </div>
              <div className="mb-6">
                <h4 className="text-orbital font-semibold mb-3">Features:</h4>
                <ul className="space-y-2">
                  {kit.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-orbital/70">
                      <span className="text-teal mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="pt-6 border-t border-teal/10">
                <p className="text-amber font-mono text-2xl mb-4">{kit.price}</p>
                <Link
                  to="/contact"
                  className="block w-full px-6 py-3 bg-teal text-black font-semibold rounded-lg hover:bg-teal/90 transition-all text-center"
                >
                  Request Quote
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="bg-black/40 border border-teal/20 rounded-xl p-8 mb-20"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8">Technical Specifications</h2>
          <div className="grid md:grid-cols-2 gap-12">
            {Object.entries(specs).map(([type, spec]) => (
              <div key={type}>
                <h3 className="text-2xl font-heading font-bold text-teal mb-4">{type} Specifications</h3>
                <div className="space-y-3 text-orbital/70">
                  <p><span className="text-orbital font-semibold">Mass:</span> {spec.mass}</p>
                  <p><span className="text-orbital font-semibold">Orbit:</span> {spec.orbit}</p>
                  <p><span className="text-orbital font-semibold">Mission Lifetime:</span> {spec.lifetime}</p>
                  <p><span className="text-orbital font-semibold">Data Rate:</span> {spec.dataRate}</p>
                  <p><span className="text-orbital font-semibold">Peak Power:</span> {spec.power}</p>
                  <p><span className="text-orbital font-semibold">Orientation:</span> {spec.orientation}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Why CubeSats Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl font-heading font-bold text-orbital mb-8">Why Choose Ikirere CubeSats?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black/40 border border-amber/20 rounded-xl p-6">
              <div className="text-amber text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-heading font-bold text-orbital mb-2">Launch Ready</h3>
              <p className="text-orbital/60">
                Pre-qualified for SpaceX rideshare missions. From lab to orbit in months.
              </p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-6">
              <div className="text-teal text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-heading font-bold text-orbital mb-2">AI-Powered</h3>
              <p className="text-orbital/60">
                NVIDIA Jetson enables on-orbit machine learning and edge computing.
              </p>
            </div>
            <div className="bg-black/40 border border-teal/20 rounded-xl p-6">
              <div className="text-teal text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-heading font-bold text-orbital mb-2">Safe Operations</h3>
              <p className="text-orbital/60">
                Integrated with IkirereMesh for collision-free constellation management.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
