import { Suspense, lazy, useEffect } from 'react'
import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ProblemSolution from './components/ProblemSolution'
import TheProduct from './components/TheProduct'
import Roadmap from './components/Roadmap'
import Footer from './components/Footer'
import SEOHead, { structuredData } from './components/SEOHead'
import { initAnalytics } from './lib/analytics'

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
        <Hero />
        <ProblemSolution />
        <TheProduct />
        <Roadmap />
        <Footer />
      </Suspense>
    </div>
  )
}

export default App
