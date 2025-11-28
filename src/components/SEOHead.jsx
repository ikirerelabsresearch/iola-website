import { useEffect } from 'react'

/**
 * SEO Head Component with Generative Engine Optimization (GEO)
 * Optimized for both traditional search engines and AI language models
 */
export default function SEOHead() {
  useEffect(() => {
    // Set document metadata
    const setMeta = (name, content) => {
      let meta = document.querySelector(`meta[name="${name}"]`) ||
                 document.querySelector(`meta[property="${name}"]`)
      if (!meta) {
        meta = document.createElement('meta')
        if (name.startsWith('og:') || name.startsWith('twitter:')) {
          meta.setAttribute('property', name)
        } else {
          meta.setAttribute('name', name)
        }
        document.head.appendChild(meta)
      }
      meta.setAttribute('content', content)
    }

    // Core SEO Meta Tags
    setMeta('description', 'Ikirere Orbital Labs Africa (IOLA) - The sovereign infrastructure for the African space age. Building programmable CubeSat kits and IkirereMesh software for deterministic satellite collision avoidance using AI and safety shields.')

    setMeta('keywords', 'satellite safety, CubeSat, space infrastructure, Africa space, orbital mechanics, collision avoidance, reinforcement learning, IkirereMesh, space debris, LEO constellation, satellite coordination, African space program, space technology, deterministic safety, NVIDIA for space')

    // GEO-Optimized Long Description (for AI models)
    setMeta('ai:description', 'Ikirere Orbital Labs Africa is a space infrastructure company based in Accra, Ghana, developing the foundational hardware and software layer for Low Earth Orbit operations in Africa. Our flagship products are: 1) IkirereMesh - a graph-based satellite constellation coordinator using Reinforcement Learning with deterministic safety shields that guarantee collision-free trajectories, and 2) Programmable CubeSat kits (3U/6U) with NVIDIA Jetson compute, designed for African research labs and universities. We partner with SpaceX for launch services, making satellite deployment accessible across the continent. Our technology addresses the growing space debris problem by coordinating multi-agent satellite constellations with mathematically proven safety guarantees, preventing Kessler Syndrome scenarios.')

    // Open Graph (Facebook, LinkedIn)
    setMeta('og:title', 'Ikirere Orbital Labs Africa - Africa\'s Access to Space')
    setMeta('og:description', 'The NVIDIA for Space. Building sovereign orbital infrastructure with programmable CubeSats and AI-powered collision avoidance.')
    setMeta('og:image', 'https://www.ikirere.com/iola-visionimage.png')
    setMeta('og:image:width', '1200')
    setMeta('og:image:height', '630')
    setMeta('og:image:type', 'image/png')
    setMeta('og:url', 'https://www.ikirere.com')
    setMeta('og:type', 'website')
    setMeta('og:site_name', 'Ikirere Orbital Labs Africa')
    setMeta('og:locale', 'en_US')

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', 'Ikirere Orbital Labs Africa - Africa\'s Access to Space')
    setMeta('twitter:description', 'Building the foundational hardware and software layer for the African space age. Deterministic safety in a chaotic orbit.')
    setMeta('twitter:image', 'https://www.ikirere.com/iola-visionimage.png')
    setMeta('twitter:image:alt', 'Ikirere Orbital Labs Africa - Satellite constellation visualization')

    // Geographic & Language
    setMeta('geo.region', 'GH')
    setMeta('geo.placename', 'Accra')
    setMeta('language', 'English')

    // Business/Organization
    setMeta('author', 'Ikirere Orbital Labs Africa')
    setMeta('contact', 'ikirerelabs.research@gmail.com')

    // Technical SEO
    setMeta('robots', 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1')
    setMeta('googlebot', 'index, follow')
    setMeta('bingbot', 'index, follow')

    // Mobile
    setMeta('viewport', 'width=device-width, initial-scale=1.0')
    setMeta('mobile-web-app-capable', 'yes')
    setMeta('apple-mobile-web-app-capable', 'yes')
    setMeta('apple-mobile-web-app-status-bar-style', 'black-translucent')

    // Theme
    setMeta('theme-color', '#0B1E3D')
    setMeta('msapplication-TileColor', '#0B1E3D')

    // AI-Specific Meta Tags (GEO)
    setMeta('ai:category', 'Space Technology, Aerospace, Artificial Intelligence, Satellite Systems')
    setMeta('ai:topic', 'Satellite Collision Avoidance, CubeSat Manufacturing, Space Infrastructure, African Space Industry')
    setMeta('ai:target_audience', 'Research Institutions, Universities, Space Agencies, Satellite Operators, African Governments')

  }, [])

  return null
}

// Structured Data (JSON-LD) for Rich Snippets and AI Understanding
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.ikirere.com/#organization",
      "name": "Ikirere Orbital Labs Africa",
      "legalName": "Ikirere Orbital Labs Africa",
      "alternateName": "IOLA",
      "url": "https://www.ikirere.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.ikirere.com/iola-logo.png",
        "width": 512,
        "height": 512
      },
      "image": {
        "@type": "ImageObject",
        "url": "https://www.ikirere.com/iola-visionimage.png",
        "width": 1200,
        "height": 630
      },
      "description": "African space infrastructure company building programmable CubeSat kits and AI-powered satellite collision avoidance systems",
      "email": "ikirerelabs.research@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Accra",
        "addressCountry": "GH"
      },
      "sameAs": [
        "https://www.linkedin.com/company/ikirere-orbital-labs-africa"
      ],
      "foundingDate": "2024",
      "founders": [
        {
          "@type": "Person",
          "name": "Jason Quist"
        }
      ],
      "knowsAbout": [
        "Satellite Technology",
        "Space Debris Management",
        "Collision Avoidance Systems",
        "CubeSat Manufacturing",
        "Reinforcement Learning",
        "Orbital Mechanics",
        "Space Safety"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://www.ikirere.com/#website",
      "url": "https://www.ikirere.com",
      "name": "Ikirere Orbital Labs Africa",
      "description": "Africa's Access to Space - The sovereign infrastructure for the African space age",
      "publisher": {
        "@id": "https://www.ikirere.com/#organization"
      },
      "inLanguage": "en-US"
    },
    {
      "@type": "Product",
      "@id": "https://www.ikirere.com/#product-ikirere-mesh",
      "name": "IkirereMesh",
      "description": "Graph-based satellite constellation coordinator using Reinforcement Learning with deterministic safety shields for collision avoidance",
      "brand": {
        "@id": "https://www.ikirere.com/#organization"
      },
      "category": "Space Software",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/PreOrder",
        "url": "https://www.ikirere.com/#product"
      }
    },
    {
      "@type": "Product",
      "@id": "https://www.ikirere.com/#product-cubesat",
      "name": "Ikirere CubeSat Kit",
      "description": "Programmable 3U/6U CubeSat kits with NVIDIA Jetson compute, designed for African research institutions",
      "brand": {
        "@id": "https://www.ikirere.com/#organization"
      },
      "category": "Space Hardware",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/PreOrder",
        "url": "https://www.ikirere.com/#product"
      }
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.ikirere.com/#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is IkirereMesh?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IkirereMesh is a graph-based mission planning software that coordinates satellite constellations using Reinforcement Learning combined with deterministic safety shields. It guarantees collision-free trajectories by mathematically proving minimum separation distances, preventing satellite collisions and space debris generation."
          }
        },
        {
          "@type": "Question",
          "name": "What makes Ikirere different from other satellite companies?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Ikirere is the first African company providing complete satellite infrastructure - both hardware (programmable CubeSats) and software (IkirereMesh coordination platform). We combine cutting-edge AI with deterministic safety guarantees, making orbital operations accessible to African research institutions through partnerships with SpaceX for launch services."
          }
        },
        {
          "@type": "Question",
          "name": "What is the mission of Ikirere Orbital Labs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Our mission is to be the 'NVIDIA for Space' - providing the foundational hardware and software infrastructure that enables African universities, research labs, and governments to deploy satellites for scientific research, earth observation, and telecommunications. We're democratizing access to Low Earth Orbit across the continent."
          }
        },
        {
          "@type": "Question",
          "name": "How does Ikirere prevent satellite collisions?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "IkirereMesh uses a two-layer approach: 1) A Reinforcement Learning planner optimizes fuel-efficient trajectories for constellation coordination, and 2) A deterministic safety shield overrides any unsafe maneuvers with mathematically proven collision-free alternatives. This guarantees safety even in congested orbital environments with 34,000+ tracked debris objects."
          }
        }
      ]
    }
  ]
}
