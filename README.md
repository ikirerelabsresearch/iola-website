# Ikirere Orbital Labs Africa - Official Website

**Africa's Access to Space**

The flagship website for Ikirere Orbital Labs Africa (IOLA) - the sovereign infrastructure provider for the African space age. Built with cutting-edge web technologies to match our cutting-edge orbital technology.

## Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS
- **3D Engine**: Three.js + React-Three-Fiber + Drei
- **Animation**: Framer Motion
- **Performance**: Optimized for 60fps with WebGL rendering

## Quick Start

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

The site will be available at `http://localhost:3000`

## Project Structure

```
iola-website/
├── public/                    # Static assets
│   ├── iola-logo.png         # Brand logo
│   └── iola-visionimage.png  # Hero banner
├── src/
│   ├── components/
│   │   ├── Navigation.jsx    # Sticky nav with glassmorphism
│   │   ├── Hero.jsx          # Immersive 3D hero section
│   │   ├── ProblemSolution.jsx # Scrollytelling narrative
│   │   ├── TheProduct.jsx    # CubeSat showcase + SDK
│   │   ├── Roadmap.jsx       # Interactive timeline
│   │   ├── Footer.jsx        # Links + social
│   │   └── 3d/               # Three.js components
│   │       ├── OrbitalScene.jsx   # Main 3D scene manager
│   │       ├── CubeSat.jsx        # Animated CubeSat model
│   │       ├── DebrisField.jsx    # Particle system (debris)
│   │       └── SafetyMesh.jsx     # Orbital grid visualization
│   ├── App.jsx               # Main app component
│   ├── main.jsx              # React entry point
│   └── index.css             # Global styles + Tailwind
├── tailwind.config.js        # Brand colors + custom utilities
├── vite.config.js            # Vite configuration
└── package.json
```

## Brand Identity

### Colors

| Name | Hex | Usage |
|------|-----|-------|
| Deep Stratosphere Blue | `#0B1E3D` | Backgrounds, deep space |
| Luminous Teal | `#00F0FF` | The Mesh, data lines, CTAs |
| Signal Amber | `#FFBF00` | Alerts, beacons, highlights |
| Orbital White | `#F5F7FA` | Primary text |

### Typography

- **Headings**: Montserrat (Bold, Wide Tracking)
- **Body**: Inter
- **Code/Data**: Roboto Mono

## Key Features

### 1. Immersive 3D Hero
- Procedural orbital scene with debris field
- Animated CubeSat with custom shaders
- IkirereMesh safety grid visualization
- Auto-rotating camera with smooth controls

### 2. Scroll-Triggered Storytelling
- Problem → Solution → Outcome narrative
- Opacity transitions tied to scroll position
- Intersection observer for view-based animations

### 3. Product Showcase
- Exploded-view CubeSat layers
- Technical specifications table
- Interactive SDK code example
- Pricing CTA

### 4. Interactive Roadmap
- Vertical timeline with alternating layout
- Phase-based development milestones
- Animated progress nodes
- Waitlist form integration

### 5. Performance Optimizations
- Lazy loading with React Suspense
- WebGL instancing for particles
- Debounced scroll handlers
- Production build minification

## Development Notes

### 3D Scene Performance

The orbital scene uses several optimization techniques:

- **Instanced rendering** for debris particles
- **LOD (Level of Detail)** not implemented yet, but recommended for >1000 objects
- **Shader materials** instead of standard materials for better performance
- **60fps target** on mid-range GPUs

### Responsive Design

- Mobile: Simplified particle count, touch-friendly navigation
- Tablet: Adjusted grid layouts
- Desktop: Full 3D experience with auto-rotation

### Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion support (can be enhanced)

## Deployment

### Recommended Platforms

1. **Vercel** (Recommended)
   ```bash
   pnpm build
   vercel --prod
   ```

2. **Netlify**
   - Build command: `pnpm build`
   - Publish directory: `dist`

3. **Custom Server**
   ```bash
   pnpm build
   # Serve the 'dist' folder with any static server
   ```

### Environment Variables

No environment variables required for the base implementation.

For future integrations (analytics, forms):
- `VITE_ANALYTICS_ID` - Google Analytics
- `VITE_WAITLIST_API` - Waitlist API endpoint

## Future Enhancements

### Phase 2 Features
- [ ] Live 32-satellite WebGL simulation
- [ ] Real-time TLE data integration
- [ ] Interactive 3D CubeSat configurator
- [ ] Blog/Research section with MDX
- [ ] Multi-language support (English, French, Swahili)

### Performance
- [ ] Implement service worker for offline support
- [ ] Add image optimization pipeline
- [ ] Preload critical 3D assets
- [ ] Implement route-based code splitting

### Analytics
- [ ] Google Analytics 4
- [ ] Scroll depth tracking
- [ ] 3D interaction heatmaps
- [ ] Conversion funnel monitoring

## Brand Guidelines

This website implements the complete Ikirere brand identity:

- **Philosophy**: "Precision in Chaos"
- **Archetype**: The Architect
- **Tone**: Visionary, Precise, Sovereign, Technical yet Accessible
- **Positioning**: "The NVIDIA for Space"

## Contributing

Internal team only. For questions or suggestions:

- **Email**: ikirerelabs.research@gmail.com
- **LinkedIn**: [Ikirere Orbital Labs Africa](https://www.linkedin.com/company/ikirere-orbital-labs-africa)

## License

© 2024 Ikirere Orbital Labs Africa. All rights reserved.

---

**Built in Accra. Deployed to Orbit.**

*// Deterministic Safety in a Chaotic Orbit*
