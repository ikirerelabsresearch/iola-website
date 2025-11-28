# Quick Start Guide - Ikirere Website

## Installation & Launch (3 steps)

### 1. Install Dependencies
```bash
pnpm install
```

This will install:
- React 18 + Vite
- Three.js ecosystem (React-Three-Fiber, Drei)
- Framer Motion
- Tailwind CSS
- All development tools

**Expected time**: 2-3 minutes

### 2. Start Development Server
```bash
pnpm dev
```

The website will automatically open at `http://localhost:3000`

### 3. View Your Site
Open your browser and navigate to `http://localhost:3000`

You should see:
- ✨ Immersive 3D orbital scene with animated CubeSat
- 🎯 "Africa's Access to Space" hero headline
- 📊 Scroll-triggered problem/solution storytelling
- 🛰️ Product showcase with exploded CubeSat view
- 🗓️ Interactive roadmap timeline
- 📧 Waitlist form

---

## What You're Seeing

### Hero Section
The 3D scene features:
- **Central CubeSat** with amber beacon (representing your logo)
- **Debris Field** of 500 particles in chaotic orbit
- **IkirereMesh** grid - teal orbital rings organizing the chaos
- **Auto-rotation** for cinematic effect

### Brand Colors in Action
- **Deep Blue (#0B1E3D)**: Background, space depth
- **Luminous Teal (#00F0FF)**: Mesh, connections, safety
- **Signal Amber (#FFBF00)**: Beacon, CTAs, highlights

---

## Development Commands

```bash
# Start dev server (with hot reload)
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

---

## Making Changes

### Edit Content
- **Hero text**: [src/components/Hero.jsx](src/components/Hero.jsx#L42-L50)
- **Roadmap phases**: [src/components/Roadmap.jsx](src/components/Roadmap.jsx#L7-L54)
- **Product features**: [src/components/TheProduct.jsx](src/components/TheProduct.jsx#L7-L27)

### Adjust 3D Scene
- **Particle count**: [src/components/3d/DebrisField.jsx](src/components/3d/DebrisField.jsx#L5) (line 5: `count = 500`)
- **Rotation speed**: [src/components/3d/OrbitalScene.jsx](src/components/3d/OrbitalScene.jsx#L11-L15)
- **CubeSat size**: [src/components/3d/CubeSat.jsx](src/components/3d/CubeSat.jsx#L61) (line 61: `boxGeometry args`)

### Modify Colors
All brand colors are in [tailwind.config.js](tailwind.config.js#L9-L13)

---

## Performance Tips

### If the 3D scene is slow:
1. Reduce particle count in `DebrisField.jsx` (500 → 200)
2. Disable auto-rotation in `OrbitalScene.jsx` (set `autoRotate={false}`)
3. Lower the camera FOV for less rendering area

### Mobile Optimization
The site automatically reduces particle count on mobile. Test with:
```bash
# Chrome DevTools > Toggle Device Toolbar (Ctrl+Shift+M)
```

---

## Deployment

### Deploy to Vercel (Recommended)
```bash
npm install -g vercel
npm run build
vercel --prod
```

### Deploy to Netlify
1. Push to GitHub
2. Connect repository in Netlify dashboard
3. Build command: `npm run build`
4. Publish directory: `dist`

---

## Troubleshooting

### Port 3000 already in use?
```bash
# Vite will automatically try 3001, 3002, etc.
# Or specify a custom port:
pnpm dev --port 4000
```

### 3D scene not loading?
1. Check browser console for WebGL errors
2. Ensure your GPU drivers are up to date
3. Try a different browser (Chrome/Edge recommended)

### Dependencies not installing?
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## Next Steps

1. **Customize content** to match your latest research updates
2. **Add waitlist integration** (connect form to your email service)
3. **Set up analytics** (Google Analytics, Plausible, etc.)
4. **Deploy to production** (Vercel/Netlify)
5. **Share with the team** and gather feedback

---

## Support

Questions or issues? Contact the team:
- Email: team@ikirere.com
- LinkedIn: [Ikirere Orbital Labs Africa](https://www.linkedin.com/company/ikirere-orbital-labs-africa)

---

**Built in Kigali. Deployed to Orbit.**
