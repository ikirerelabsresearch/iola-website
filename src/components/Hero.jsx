import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import OrbitalScene from './3d/OrbitalScene'

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
          }}
        >
          <Suspense fallback={null}>
            <OrbitalScene />
          </Suspense>
        </Canvas>
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-stratosphere/40 via-transparent to-stratosphere z-5" />
      <div className="absolute inset-0 bg-gradient-to-r from-stratosphere/60 via-transparent to-transparent z-5" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-3xl"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-12 h-px bg-teal" />
              <span className="text-teal font-mono text-sm tracking-widest uppercase">
                The NVIDIA for Space
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-wider mb-4 leading-tight"
            >
              <span className="text-orbital">Africa's Access</span>
              <br />
              <span className="text-teal text-glow-teal">to Space</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="text-lg md:text-xl lg:text-2xl text-orbital/80 font-body mb-8 max-w-2xl leading-relaxed"
            >
              The sovereign infrastructure for the next generation of orbital research.
              <span className="text-teal"> Deterministic safety</span> in a chaotic orbit.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap gap-6 mt-12"
            >
              <Link
                to="/sandbox"
                className="group relative px-8 py-4 bg-teal/10 hover:bg-teal/20 border border-teal/50 text-teal font-mono text-sm tracking-widest uppercase transition-all overflow-hidden inline-block"
              >
                <span className="relative z-10 group-hover:tracking-[0.25em] transition-all duration-300">Launch Sandbox</span>
                <div className="absolute bottom-0 left-0 h-[2px] w-full bg-teal transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </Link>

              <button className="group relative px-8 py-4 bg-transparent hover:bg-white/5 border border-white/20 text-white font-mono text-sm tracking-widest uppercase transition-all">
                <span className="group-hover:text-teal transition-colors">Documentation</span>
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.5 }}
              className="mt-10 lg:mt-12 grid grid-cols-3 gap-6 lg:gap-8 max-w-2xl"
            >
              <div className="border-l-2 border-teal pl-4">
                <div className="text-3xl font-heading font-bold text-teal">32+</div>
                <div className="text-sm text-orbital/60 mt-1">Satellites Simulated</div>
              </div>
              <div className="border-l-2 border-amber pl-4">
                <div className="text-3xl font-heading font-bold text-amber">100%</div>
                <div className="text-sm text-orbital/60 mt-1">Collision Avoidance</div>
              </div>
              <div className="border-l-2 border-teal pl-4">
                <div className="text-3xl font-heading font-bold text-teal">∞</div>
                <div className="text-sm text-orbital/60 mt-1">Possibilities</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2, repeat: Infinity, repeatType: 'reverse' }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-teal/60 text-xs tracking-widest uppercase font-mono">Scroll</span>
          <svg className="w-6 h-6 text-teal animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
