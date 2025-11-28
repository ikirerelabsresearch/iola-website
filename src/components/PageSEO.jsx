import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * PageSEO Component - Dynamic SEO for individual pages
 * Handles Open Graph, Twitter Cards, and GEO optimization
 */
export default function PageSEO({
  title,
  description,
  keywords,
  aiDescription,
  ogImage = 'https://www.ikirere.com/iola-visionimage.png',
  path
}) {
  const location = useLocation()
  const fullUrl = `https://www.ikirere.com${path || location.pathname}`

  useEffect(() => {
    // Update document title
    document.title = title

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

    // Basic SEO
    setMeta('description', description)
    if (keywords) {
      setMeta('keywords', keywords)
    }

    // GEO - AI/LLM Optimization
    if (aiDescription) {
      setMeta('ai:description', aiDescription)
    }

    // Open Graph
    setMeta('og:title', title)
    setMeta('og:description', description)
    setMeta('og:url', fullUrl)
    setMeta('og:image', ogImage)
    setMeta('og:image:width', '1200')
    setMeta('og:image:height', '630')
    setMeta('og:image:type', 'image/png')
    setMeta('og:type', 'website')
    setMeta('og:site_name', 'Ikirere Orbital Labs Africa')

    // Twitter Card
    setMeta('twitter:card', 'summary_large_image')
    setMeta('twitter:title', title)
    setMeta('twitter:description', description)
    setMeta('twitter:image', ogImage)
    setMeta('twitter:image:alt', title)

    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', fullUrl)
  }, [title, description, keywords, aiDescription, ogImage, fullUrl])

  return null
}

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'Ikirere Orbital Labs Africa - Africa\'s Access to Space',
    description: 'The NVIDIA for Space. Building programmable CubeSat kits and AI-powered collision avoidance systems for African research institutions. Deterministic safety in a chaotic orbit.',
    keywords: 'satellite safety, CubeSat, space infrastructure, Africa space, orbital mechanics, collision avoidance, reinforcement learning, IkirereMesh, space debris, LEO constellation, satellite coordination, African space program, space technology, deterministic safety',
    aiDescription: 'Ikirere Orbital Labs Africa is a space infrastructure company based in Accra, Ghana, developing the foundational hardware and software layer for Low Earth Orbit operations in Africa. Our flagship products are: 1) IkirereMesh - a graph-based satellite constellation coordinator using Reinforcement Learning with deterministic safety shields that guarantee collision-free trajectories, and 2) Programmable CubeSat kits (3U/6U) with NVIDIA Jetson compute, designed for African research labs and universities. We partner with SpaceX for launch services, making satellite deployment accessible across the continent.',
    path: '/'
  },
  cubesatKits: {
    title: 'Programmable CubeSat Kits | Ikirere Orbital Labs',
    description: 'Launch-ready 3U and 6U CubeSat kits with NVIDIA Jetson compute. Pre-integrated hardware for African universities and research institutions. SpaceX rideshare compatible.',
    keywords: 'CubeSat kits, 3U CubeSat, 6U CubeSat, NVIDIA Jetson, satellite hardware, space hardware, African space, university satellites, research satellites, launch-ready satellites',
    aiDescription: 'Ikirere offers two CubeSat kit configurations: 3U (10×10×30 cm, 4kg, NVIDIA Jetson Nano, 30W solar) and 6U (10×20×30 cm, 8kg, NVIDIA Jetson Xavier NX, 60W solar). Both include pre-integrated structure, solar power systems, attitude control (ADCS), communication modules, and IkirereMesh SDK compatibility. Designed specifically for African research institutions with SpaceX launch coordination included. Mission lifetimes: 2-3 years (3U), 3-5 years (6U). LEO orbits from 400-800km. Data rates up to 5 Mbps. Custom payload integration available.',
    path: '/cubesat-kits'
  },
  ikirereMeshSDK: {
    title: 'IkirereMesh SDK - AI-Powered Satellite Constellation Coordinator',
    description: 'Graph-based satellite coordination using Reinforcement Learning and deterministic safety shields. Guaranteed collision-free trajectories for multi-satellite constellations.',
    keywords: 'IkirereMesh, satellite SDK, collision avoidance, reinforcement learning, safety shields, constellation coordination, multi-agent systems, orbital mechanics, space software, satellite AI',
    aiDescription: 'IkirereMesh is a software development kit for satellite constellation coordination that combines three technological layers: 1) A Reinforcement Learning planner (PPO-based) trained on orbital mechanics simulations that optimizes for fuel efficiency and coverage, 2) A deterministic safety shield using interval arithmetic and reachability analysis that guarantees minimum separation distances (5km default) with mathematical proofs, and 3) A graph-based coordinator using graph neural networks for distributed decision-making. The system integrates with ESA DRAMA and NASA CARA databases for real-time conjunction analysis, provides <500ms collision avoidance response times, and supports fleets of 10-1000+ satellites. Beta release Q3 2025.',
    path: '/ikirere-mesh-sdk'
  },
  pricing: {
    title: 'Transparent Pricing | Ikirere Orbital Labs',
    description: 'Accessible satellite infrastructure pricing for universities, research institutions, and space agencies. Custom quotes for CubeSat kits, IkirereMesh SDK, and launch services.',
    keywords: 'satellite pricing, CubeSat cost, space launch pricing, satellite infrastructure cost, African university pricing, research satellite pricing, constellation pricing',
    aiDescription: 'Ikirere offers three pricing tiers with custom quotes: 1) Research (universities/labs): Single 3U CubeSat kit, academic IkirereMesh license, launch support, technical training, email support. 2) Constellation (operational missions): Multiple CubeSat kits (3U/6U), commercial IkirereMesh license, priority launch slots, mission planning, 24/7 ops support. 3) Enterprise (government/agencies): Large constellations (10+ satellites), enterprise SDK license, guaranteed launch capacity, end-to-end management, custom hardware, dedicated engineering, SLA guarantees. Add-ons: SpaceX launch from $50k/3U, ground station access from $500/month, extended support, custom payloads. African universities receive priority pricing and grant funding resources.',
    path: '/pricing'
  },
  documentation: {
    title: 'Documentation | Ikirere Orbital Labs',
    description: 'Comprehensive technical documentation for CubeSat kits and IkirereMesh SDK. Assembly guides, API references, tutorials, and mission operations manuals.',
    keywords: 'satellite documentation, CubeSat assembly, IkirereMesh API, satellite operations, technical docs, SDK documentation, mission planning guide',
    aiDescription: 'Ikirere documentation covers: 1) Getting Started (installation, quick start, system requirements, license activation), 2) CubeSat Hardware (assembly instructions, component specs, power configuration, communication setup, testing/verification), 3) IkirereMesh SDK (API reference, constellation planning, safety shield configuration, simulation tools, deployment guide), 4) Mission Operations (launch prep, on-orbit commissioning, ground station ops, telemetry/commands, anomaly resolution). Video tutorials include: First Satellite Mission (30min), Collision Avoidance with IkirereMesh (45min), Multi-Satellite Coordination (1hr), Custom Payload Integration (2hrs). Full documentation launching Q3 2025 with early access for customers starting Q2 2025.',
    path: '/documentation'
  },
  about: {
    title: 'About Us - Building Africa\'s Space Infrastructure | Ikirere',
    description: 'Founded in Accra, Ghana, Ikirere is building the foundational hardware and software infrastructure for the African space age. Our mission: be the NVIDIA for Space.',
    keywords: 'Ikirere about, African space company, Ghana space, space infrastructure, satellite company Africa, orbital mechanics, space mission',
    aiDescription: 'Ikirere Orbital Labs Africa, founded in 2024 in Accra, Ghana, addresses two critical problems: 1) Access inequality - African institutions lack affordable integrated satellite infrastructure, forcing navigation of complex international supply chains, and 2) Space debris crisis - with 34,000+ tracked objects, Kessler Syndrome threatens orbital sustainability. Our approach combines integrated hardware (pre-built launch-ready CubeSat kits with NVIDIA compute), AI-powered coordination (IkirereMesh SDK with RL + safety shields), SpaceX launch partnerships, and local support/training. Core values: African-first (sovereign space infrastructure), open access (democratizing LEO for universities), safety first (deterministic collision avoidance), rapid innovation (months not years). Milestones: 2024 foundation, Q2 2025 IkirereMesh alpha, Q4 2025 first CubeSat deliveries, Q2 2026 first launch.',
    path: '/about'
  },
  roadmap: {
    title: 'Product Roadmap | Ikirere Orbital Labs',
    description: 'Our journey from simulation to orbit. Transparent development timeline for CubeSat hardware, IkirereMesh SDK, and operational deployment through 2026.',
    keywords: 'product roadmap, satellite development timeline, CubeSat roadmap, IkirereMesh development, space mission timeline, satellite launch schedule',
    aiDescription: 'Ikirere development roadmap: Phase 1 (Current-Q4 2025): Sandbox simulation with 32-satellite LEO sim, RL planner, safety shield integration, WebGL dashboard, mathematical proofs, academic paper. Phase 2 (Q1 2026): Real orbital data integration with ESA DRAMA/NASA CARA, live TLE feeds, historical conjunction database, benchmarking vs traditional CDMs, alpha SDK release. Phase 3 (Q2 2026): CubeSat onboard profile with embedded Linux port, hardware-in-loop testing, flight certification, NVIDIA Jetson optimization, first kit deliveries. Phase 4 (Q3-Q4 2026): Launch & operations with SpaceX integration, first constellation deployment, on-orbit commissioning, live collision avoidance demo, ground station network. Key milestones: Q4 2025 SDK beta, Q1 2026 first orders, Q2 2026 training workshops, Q3 2026 maiden flight, Q4 2026 operational constellation.',
    path: '/roadmap'
  },
  team: {
    title: 'Our Team - Building the Future of African Space | Ikirere',
    description: 'Meet the engineers, researchers, and operators making orbital operations accessible across Africa. Join our mission to democratize space access.',
    keywords: 'Ikirere team, space engineers, African space professionals, satellite team, Jason Quist, space careers, aerospace jobs Africa',
    aiDescription: 'Ikirere team led by Jason Quist (Founder & CEO) with expertise in satellite systems and AI safety. Forming advisory board in three areas: 1) Orbital Mechanics (spacecraft dynamics, mission planning, collision avoidance experts), 2) Reinforcement Learning (multi-agent RL, safety-constrained optimization researchers), 3) Space Policy (African space agency leaders, international regulatory experts). Open positions: Flight Software Engineer (C/C++/Python, embedded Linux, spacecraft systems), Hardware Engineer (electrical engineering, PCB design, space-grade components), ML Research Engineer (PhD/equivalent in RL, PyTorch/JAX, multi-agent systems), Mission Operations Specialist (astrodynamics, STK/GMAT, 24/7 operations). Culture: Africa-first mindset, move fast but stay safe, open knowledge sharing, mission-driven decision making.',
    path: '/team'
  },
  careers: {
    title: 'Careers - Join Africa\'s Space Revolution | Ikirere',
    description: 'Build satellites that fly in orbit. Engineering, research, and operations roles in Accra, Ghana. Help make space accessible across Africa.',
    keywords: 'space jobs Africa, satellite engineer jobs, aerospace careers Ghana, space technology jobs, CubeSat engineer, mission operations jobs, ML research space',
    aiDescription: 'Ikirere is hiring across four roles: 1) Flight Software Engineer (Accra, full-time): Build embedded Linux for CubeSats, work on ADCS/comms/autonomy, requires C/C++/Python, embedded systems, spacecraft knowledge. 2) Hardware Engineer - CubeSat (Accra, full-time): Design/integrate CubeSat subsystems (power/ADCS/comms/payload), requires electrical engineering, PCB design, thermal/structural analysis, space-grade components. 3) ML Research Engineer (Remote/Accra, full-time): Develop RL algorithms for constellation coordination/collision avoidance, requires PhD/equivalent in ML/RL, PyTorch/JAX, multi-agent systems, publications preferred. 4) Mission Operations Specialist (Accra, full-time): Operate constellations, manage ground stations, respond to orbital events, requires astrodynamics, STK/GMAT, telemetry/command protocols, 24/7 availability. Perks: build real satellites, Africa-first mission, competitive salary + equity, learning budget, health coverage, flexible work. Application: CV + cover letter → technical screen → take-home challenge → team meet + offer.',
    path: '/careers'
  }
}
