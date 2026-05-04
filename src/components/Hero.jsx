import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'

export default function Hero() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return
    const W = container.clientWidth
    const H = container.clientHeight

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(W, H)
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 1000)
    camera.position.set(0, 2.5, 9)

    scene.fog = new THREE.FogExp2(0x040C1C, 0.04)

    const ambLight = new THREE.AmbientLight(0xffffff, 0.15)
    scene.add(ambLight)
    const tealLight = new THREE.PointLight(0x00DCFF, 3, 30)
    tealLight.position.set(8, 6, 4)
    scene.add(tealLight)
    const amberLight = new THREE.PointLight(0xFFBF00, 2, 20)
    amberLight.position.set(-6, -4, -4)
    scene.add(amberLight)
    const rimLight = new THREE.DirectionalLight(0x0060aa, 0.8)
    rimLight.position.set(0, 10, -5)
    scene.add(rimLight)

    // Stars
    const starCount = 4000
    const starPos = new Float32Array(starCount * 3)
    const starCol = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 60 + Math.random() * 100
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      starPos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starPos[i * 3 + 2] = r * Math.cos(phi)
      const t = Math.random()
      starCol[i * 3] = 0.7 + t * 0.3
      starCol[i * 3 + 1] = 0.8 + t * 0.2
      starCol[i * 3 + 2] = 0.9 + t * 0.1
    }
    const starGeo = new THREE.BufferGeometry()
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    starGeo.setAttribute('color', new THREE.BufferAttribute(starCol, 3))
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.12, vertexColors: true, transparent: true, opacity: 0.9 })))

    // Earth
    const earthGeo = new THREE.SphereGeometry(2, 64, 64)
    const earth = new THREE.Mesh(earthGeo, new THREE.MeshPhongMaterial({
      color: 0x0B1E3D, emissive: 0x001833, emissiveIntensity: 0.4,
      shininess: 60, specular: 0x00DCFF,
    }))
    scene.add(earth)
    scene.add(new THREE.Mesh(earthGeo, new THREE.MeshBasicMaterial({ color: 0x00DCFF, wireframe: true, transparent: true, opacity: 0.06 })))

    // Atmosphere
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(2.18, 32, 32), new THREE.MeshBasicMaterial({ color: 0x0044aa, transparent: true, opacity: 0.15, side: THREE.BackSide })))
    scene.add(new THREE.Mesh(new THREE.SphereGeometry(2.35, 32, 32), new THREE.MeshBasicMaterial({ color: 0x00DCFF, transparent: true, opacity: 0.04, side: THREE.BackSide })))

    // Orbital rings
    const ringGroup = new THREE.Group()
    scene.add(ringGroup)

    function makeRing(radius, tilt, color, opacity) {
      const pts = []
      for (let i = 0; i <= 128; i++) {
        const a = (i / 128) * Math.PI * 2
        pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
      }
      const ring = new THREE.Line(
        new THREE.BufferGeometry().setFromPoints(pts),
        new THREE.LineBasicMaterial({ color, transparent: true, opacity })
      )
      ring.rotation.x = tilt
      ringGroup.add(ring)
    }

    makeRing(3.2, 0.3, 0x00DCFF, 0.25)
    makeRing(3.8, 0.8, 0x0088CC, 0.15)
    makeRing(4.5, 1.2, 0x00DCFF, 0.1)
    makeRing(2.8, -0.4, 0x004488, 0.12)

    // Satellites
    const satData = [
      { orbit: 3.2, tilt: 0.3, speed: 0.8, phase: 0, color: 0x00DCFF },
      { orbit: 3.2, tilt: 0.3, speed: 0.8, phase: Math.PI * 0.66, color: 0x00DCFF },
      { orbit: 3.2, tilt: 0.3, speed: 0.8, phase: Math.PI * 1.33, color: 0x00DCFF },
      { orbit: 3.8, tilt: 0.8, speed: 0.6, phase: 0, color: 0xFFBF00 },
      { orbit: 3.8, tilt: 0.8, speed: 0.6, phase: Math.PI, color: 0xFFBF00 },
      { orbit: 4.5, tilt: 1.2, speed: 0.4, phase: 0.5, color: 0x00AAFF },
      { orbit: 2.8, tilt: -0.4, speed: 1.1, phase: 1.0, color: 0x00DCFF },
      { orbit: 2.8, tilt: -0.4, speed: 1.1, phase: 2.5, color: 0x00DCFF },
    ]

    const satellites = satData.map(d => {
      const g = new THREE.Group()
      g.add(new THREE.Mesh(
        new THREE.BoxGeometry(0.08, 0.06, 0.14),
        new THREE.MeshPhongMaterial({ color: d.color, emissive: d.color, emissiveIntensity: 0.6, shininess: 80 })
      ))
      ;[-1, 1].forEach(side => {
        const panel = new THREE.Mesh(
          new THREE.BoxGeometry(0.14, 0.01, 0.06),
          new THREE.MeshPhongMaterial({ color: d.color, emissive: d.color, emissiveIntensity: 0.3, transparent: true, opacity: 0.85 })
        )
        panel.position.x = side * 0.13
        g.add(panel)
      })
      g.add(new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 8, 8),
        new THREE.MeshBasicMaterial({ color: d.color, transparent: true, opacity: 0.9 })
      ))
      scene.add(g)
      return { mesh: g, ...d }
    })

    // Debris
    const debrisCount = 300
    const debrisPos = new Float32Array(debrisCount * 3)
    for (let i = 0; i < debrisCount; i++) {
      const r = 2.3 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = (Math.random() - 0.5) * 0.6
      debrisPos[i * 3] = r * Math.cos(theta) * Math.cos(phi)
      debrisPos[i * 3 + 1] = r * Math.sin(phi)
      debrisPos[i * 3 + 2] = r * Math.sin(theta) * Math.cos(phi)
    }
    const debrisGeo = new THREE.BufferGeometry()
    debrisGeo.setAttribute('position', new THREE.BufferAttribute(debrisPos, 3))
    const debris = new THREE.Points(debrisGeo, new THREE.PointsMaterial({ size: 0.04, color: 0xFF4444, transparent: true, opacity: 0.5 }))
    scene.add(debris)

    // Connection lines
    const connLines = []
    function updateConnections() {
      connLines.forEach(l => scene.remove(l))
      connLines.length = 0
      for (let i = 0; i < satellites.length; i++) {
        for (let j = i + 1; j < satellites.length; j++) {
          const d = satellites[i].mesh.position.distanceTo(satellites[j].mesh.position)
          if (d < 2.8) {
            const line = new THREE.Line(
              new THREE.BufferGeometry().setFromPoints([satellites[i].mesh.position.clone(), satellites[j].mesh.position.clone()]),
              new THREE.LineBasicMaterial({ color: 0x00DCFF, transparent: true, opacity: Math.max(0, (2.8 - d) / 2.8) * 0.35 })
            )
            scene.add(line)
            connLines.push(line)
          }
        }
      }
    }

    let mouseX = 0, mouseY = 0
    const onMouse = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', onMouse)

    const onResize = () => {
      const W2 = container.clientWidth, H2 = container.clientHeight
      camera.aspect = W2 / H2
      camera.updateProjectionMatrix()
      renderer.setSize(W2, H2)
    }
    window.addEventListener('resize', onResize)

    let frameId
    const clock = new THREE.Clock()
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const t = clock.getElapsedTime()

      earth.rotation.y = t * 0.04
      debris.rotation.y = t * 0.015
      ringGroup.rotation.y = t * 0.07

      satellites.forEach(s => {
        const angle = s.phase + t * s.speed
        const x = s.orbit * Math.cos(angle)
        const z = s.orbit * Math.sin(angle)
        s.mesh.position.set(x, z * Math.sin(s.tilt), z * Math.cos(s.tilt))
        s.mesh.rotation.y = -angle
      })

      updateConnections()

      camera.position.x += (mouseX * 0.8 - camera.position.x) * 0.03
      camera.position.y += (-mouseY * 0.5 + 2.5 - camera.position.y) * 0.03
      camera.lookAt(0, 0, 0)

      tealLight.intensity = 2.5 + Math.sin(t * 0.8) * 0.5
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('mousemove', onMouse)
      window.removeEventListener('resize', onResize)
      renderer.dispose()
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement)
    }
  }, [])

  return (
    <section style={{ position: 'relative', height: '100vh', minHeight: 700, overflow: 'hidden', background: 'linear-gradient(180deg, #040C1C 0%, #071428 100%)' }}>
      {/* Three.js canvas */}
      <div ref={mountRef} style={{ position: 'absolute', inset: 0 }} />

      {/* Gradient overlays */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(4,12,28,0.45) 0%, transparent 40%, rgba(4,12,28,0.7) 80%, #040C1C 100%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(4,12,28,0.7) 0%, transparent 60%)', pointerEvents: 'none' }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.04,
        backgroundImage: 'linear-gradient(rgba(0,220,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,220,255,1) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', alignItems: 'center', padding: '0 6vw' }}>
        <div style={{ maxWidth: 680 }}>
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(to right, transparent, #00DCFF)' }} />
            <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 11, letterSpacing: '0.3em', color: '#00DCFF', textTransform: 'uppercase' }}>The NVIDIA for Space</span>
          </div>

          {/* Headline */}
          <h1 style={{
            fontFamily: "'Montserrat', sans-serif", fontWeight: 900,
            fontSize: 'clamp(42px, 6vw, 78px)', lineHeight: 1.0,
            letterSpacing: '-0.01em', marginBottom: 24,
          }}>
            <span style={{ color: '#F5F7FA', display: 'block' }}>Africa's Access</span>
            <span style={{
              display: 'block',
              background: 'linear-gradient(135deg, #00DCFF 0%, #0088FF 50%, #00DCFF 100%)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              filter: 'drop-shadow(0 0 30px rgba(0,220,255,0.5))',
            }}>to Space</span>
          </h1>

          {/* Subline */}
          <p style={{
            fontFamily: "'Inter', sans-serif", fontSize: 'clamp(15px, 1.8vw, 20px)',
            color: 'rgba(245,247,250,0.65)', lineHeight: 1.7, marginBottom: 40, maxWidth: 540,
          }}>
            The sovereign infrastructure for the next generation of orbital research.{' '}
            <span style={{ color: '#00DCFF' }}>Deterministic safety</span> in a chaotic orbit.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <Link to="/sandbox" style={{
              fontFamily: "'Roboto Mono', monospace", fontSize: 12, letterSpacing: '0.2em',
              textTransform: 'uppercase', fontWeight: 600,
              padding: '14px 32px', background: 'transparent',
              border: '1px solid rgba(0,220,255,0.5)', color: '#00DCFF',
              textDecoration: 'none', transition: 'all 0.25s ease', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(0,220,255,0.1)'; e.currentTarget.style.borderColor = '#00DCFF'; e.currentTarget.style.boxShadow = '0 0 30px rgba(0,220,255,0.2)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(0,220,255,0.5)'; e.currentTarget.style.boxShadow = 'none' }}>
              Launch Sandbox
            </Link>
            <Link to="/documentation" style={{
              fontFamily: "'Roboto Mono', monospace", fontSize: 12, letterSpacing: '0.2em',
              textTransform: 'uppercase', fontWeight: 600,
              padding: '14px 32px', background: 'transparent',
              border: '1px solid rgba(245,247,250,0.2)', color: 'rgba(245,247,250,0.7)',
              textDecoration: 'none', transition: 'all 0.25s ease', display: 'inline-block',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(0,220,255,0.4)'; e.currentTarget.style.color = '#00DCFF' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(245,247,250,0.2)'; e.currentTarget.style.color = 'rgba(245,247,250,0.7)' }}>
              Documentation
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, marginTop: 52,
            maxWidth: 460, borderTop: '1px solid rgba(0,220,255,0.12)',
          }}>
            {[
              { val: '32+', label: 'Satellites Simulated', col: '#00DCFF' },
              { val: '100%', label: 'Collision Avoidance', col: '#FFBF00' },
              { val: '<500ms', label: 'Response Time', col: '#00DCFF' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '20px 0 4px', paddingLeft: i === 0 ? 0 : 24, borderLeft: i > 0 ? '1px solid rgba(0,220,255,0.12)' : 'none' }}>
                <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: 26, color: s.col, letterSpacing: '-0.01em' }}>{s.val}</div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: 'rgba(245,247,250,0.4)', marginTop: 4, letterSpacing: '0.04em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 10, opacity: 0.6,
      }}>
        <span style={{ fontFamily: "'Roboto Mono', monospace", fontSize: 9, letterSpacing: '0.3em', color: '#00DCFF', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, #00DCFF, transparent)', animation: 'scrollPulse 2s ease-in-out infinite' }} />
      </div>

      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  )
}
