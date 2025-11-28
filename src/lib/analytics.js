/**
 * Analytics Configuration for Ikirere Orbital Labs
 * Supports: Google Analytics 4, Plausible, and custom event tracking
 */

// Google Analytics 4
export const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || ''

// Plausible Analytics
export const PLAUSIBLE_DOMAIN = 'ikirere.com'

// Initialize Google Analytics
export const initGA = () => {
  if (!GA_MEASUREMENT_ID) return

  // Load GA4 script
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
  document.head.appendChild(script)

  // Initialize gtag
  window.dataLayer = window.dataLayer || []
  function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag = gtag
  gtag('js', new Date())
  gtag('config', GA_MEASUREMENT_ID, {
    page_path: window.location.pathname,
    send_page_view: true,
  })
}

// Initialize Plausible (privacy-focused, GDPR-compliant)
export const initPlausible = () => {
  const script = document.createElement('script')
  script.defer = true
  script.setAttribute('data-domain', PLAUSIBLE_DOMAIN)
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)
}

// Track page views
export const trackPageView = (url) => {
  if (window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: url,
    })
  }
  if (window.plausible) {
    window.plausible('pageview')
  }
}

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  // Google Analytics
  if (window.gtag) {
    window.gtag('event', eventName, eventParams)
  }

  // Plausible
  if (window.plausible) {
    window.plausible(eventName, { props: eventParams })
  }

  // Console log in development
  if (import.meta.env.DEV) {
    console.log('Analytics Event:', eventName, eventParams)
  }
}

// Custom events for IOLA website
export const events = {
  // Waitlist interactions
  joinWaitlist: (email) => trackEvent('join_waitlist', { email_domain: email.split('@')[1] }),

  // 3D Scene interactions
  toggle3DAutoRotate: (enabled) => trackEvent('toggle_3d_rotation', { enabled }),

  // Navigation
  clickCTA: (cta_name, section) => trackEvent('click_cta', { cta_name, section }),
  scrollToSection: (section) => trackEvent('scroll_to_section', { section }),

  // Product interest
  viewSDKCode: () => trackEvent('view_sdk_code'),
  downloadDocs: () => trackEvent('download_docs'),
  requestDemo: () => trackEvent('request_demo'),

  // Roadmap engagement
  viewRoadmapPhase: (phase) => trackEvent('view_roadmap_phase', { phase }),

  // External links
  clickLinkedIn: () => trackEvent('click_social', { platform: 'linkedin' }),
  clickGitHub: () => trackEvent('click_social', { platform: 'github' }),
  clickEmail: () => trackEvent('click_contact', { method: 'email' }),

  // Performance metrics
  webGLSupported: (supported) => trackEvent('webgl_support', { supported }),
  loadTime: (time_ms) => trackEvent('page_load_time', { time_ms }),
}

// Track scroll depth (for content engagement)
export const trackScrollDepth = () => {
  let maxScroll = 0
  const milestones = [25, 50, 75, 100]
  const tracked = new Set()

  const handleScroll = () => {
    const windowHeight = window.innerHeight
    const documentHeight = document.documentElement.scrollHeight
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone)
          trackEvent('scroll_depth', { percent: milestone })
        }
      })
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
  return () => window.removeEventListener('scroll', handleScroll)
}

// Track time on page
export const trackTimeOnPage = () => {
  const startTime = Date.now()

  const sendTimeOnPage = () => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000) // seconds
    if (timeSpent > 5) { // Only track if user stayed more than 5 seconds
      trackEvent('time_on_page', { duration_seconds: timeSpent })
    }
  }

  // Send on page unload
  window.addEventListener('beforeunload', sendTimeOnPage)

  // Also send every 30 seconds for long sessions
  const interval = setInterval(() => {
    const timeSpent = Math.round((Date.now() - startTime) / 1000)
    if (timeSpent % 30 === 0) {
      trackEvent('session_ping', { duration_seconds: timeSpent })
    }
  }, 30000)

  return () => {
    clearInterval(interval)
    window.removeEventListener('beforeunload', sendTimeOnPage)
  }
}

// Initialize all analytics
export const initAnalytics = () => {
  // Check for Do Not Track
  if (navigator.doNotTrack === '1') {
    console.log('Analytics disabled: Do Not Track is enabled')
    return
  }

  // Initialize analytics providers
  if (GA_MEASUREMENT_ID) {
    initGA()
  }

  // Always use Plausible (privacy-focused, no cookies)
  initPlausible()

  // Set up automatic tracking
  trackScrollDepth()
  trackTimeOnPage()

  // Track WebGL support
  const canvas = document.createElement('canvas')
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
  events.webGLSupported(!!gl)

  // Track page load performance
  window.addEventListener('load', () => {
    if (window.performance) {
      const perfData = window.performance.timing
      const loadTime = perfData.loadEventEnd - perfData.navigationStart
      events.loadTime(loadTime)
    }
  })
}
