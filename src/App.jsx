import { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import SEOHead, { structuredData } from './components/SEOHead'
import { initAnalytics } from './lib/analytics'

// Pages
import Home from './pages/Home'
import Sandbox from './pages/Sandbox'
import CubeSatKits from './pages/CubeSatKits'
import IkirereMeshSDK from './pages/IkirereMeshSDK'
import Pricing from './pages/Pricing'
import Documentation from './pages/Documentation'
import About from './pages/About'
import RoadmapPage from './pages/RoadmapPage'
import Team from './pages/Team'
import Careers from './pages/Careers'
import Partnerships from './pages/Partnerships'

function App() {
  useEffect(() => {
    // Initialize analytics on mount
    initAnalytics()

    // Inject structured data
    const script = document.getElementById('structured-data')
    if (script) {
      script.textContent = JSON.stringify(structuredData)
    }
  }, [])

  return (
    <Router>
      <div className="relative min-h-screen">
        <SEOHead />
        <Navigation />

        <Suspense fallback={
          <div className="fixed inset-0 flex items-center justify-center bg-stratosphere">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-teal font-mono">Initializing Orbital Systems...</p>
            </div>
          </div>
        }>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/cubesat-kits" element={<CubeSatKits />} />
            <Route path="/ikirere-mesh-sdk" element={<IkirereMeshSDK />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/documentation" element={<Documentation />} />
            <Route path="/about" element={<About />} />
            <Route path="/roadmap" element={<RoadmapPage />} />
            <Route path="/team" element={<Team />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/partnerships" element={<Partnerships />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  )
}

export default App
