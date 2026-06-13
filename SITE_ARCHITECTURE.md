# Ikirere Orbital Labs — Complete Site Architecture & Content
Generated from source. Branch: main. Last commit: edd42b9.

---

# GLOBAL SHELL

## Navigation (sticky, all pages)

**Logo:** iola-logo-light.png (40×40px)
**Company name:** IKIRERE / ORBITAL LABS (two-line small caps)

**Links (left → right):**
1. Orbit ↗ (external: https://orbit.ikirere.com)
2. About → /about
3. Research → /research
4. Hardware → /hardware
5. Careers → /careers
6. Updates → /updates
7. Contact → /contact (styled as outlined CTA button)

**Mobile:** Hamburger collapses to full-screen overlay with same links at larger size.

---

## Footer (all pages)

**Logo:** iola-logo-light.png (56×56px)
**Tagline:** AFRICA'S ACCESS TO SPACE
**Description:** Building the full-stack orbital infrastructure powering the next generation of autonomous nanosatellite systems for the African space age.

**Company links:** About · Research · Hardware · Careers · Updates · Contact
**Systems links:** Orbit Simulation ↗ · IkirereMesh SDK (static) · Ground Software (static)

**Copyright:** © 2026 Ikirere Orbital Labs. Kigali, Rwanda.
**Status indicator:** Green pulse dot · Phase 03 active — IkirereMesh coordination

---

# HOME

## Section 1 — Hero

**Eyebrow:** Ikirere Orbital Labs

**H1:**
> Building Africa's
> Orbital Infrastructure

(Second line "Orbital Infrastructure" in navy #0A2463)

**Subheadline:**
> Building the full-stack orbital infrastructure powering the next generation of programmable multipurpose nanosatellites.

**CTA 1 (primary, external):** See it in orbit → https://orbit.ikirere.com
**CTA 2 (secondary, internal):** Our approach → /about

**Right column:** Live interactive 3D CubeSat (React Three Fiber, transparent background, floats on hero)
- Double-click to disassemble/reassemble
- Drag to orbit
- Label: "double-tap to disassemble / reassemble"

**Visual elements:**
- Animated SVG orbital arc (travelling wave, left to right, loops continuously)
- Secondary static arc (lower opacity)
- Gold radial ellipse glow at bottom-right
- Radial gold/blue glow decorative element top-right corner

---

## Section 2 — Pillars Strip

**Background:** #f8fafc, 3-column grid

| Label | Value |
|-------|-------|
| MULTIPURPOSE | 1 Satellite → Multiple missions |
| ORBITAL INTELLIGENCE | Autonomous coordination infrastructure for next-generation nanosatellite fleets |
| SOFTWARE + HARDWARE | Full-stack orbital architecture |

---

## Section 3 — The Transition (Comparison)

**Label:** THE TRANSITION
**H2:** Satellites are approaching their computing moment.

**Supporting paragraph:**
> Computers once filled entire rooms, cost millions, and served a single purpose. Then microprocessors changed everything, systems became smaller, programmable, networked, and massively more capable. Satellite infrastructure is now approaching the same transition.

**Left column — "Satellites today":**
1. One satellite, one mission. A weather satellite does weather. A comms satellite does comms. The category defines the capability.
2. Designed and launched by large contractors. Years of lead time. Hundreds of millions per mission.
3. No coordination layer across operators. Each constellation manages itself in isolation.
4. Africa depends almost entirely on external satellite infrastructure it did not build and does not control.

**Right column — "IOLA's direction":**
1. One satellite, multiple missions. The same satellite carries different payloads for different operators at different times.
2. Small enough for a university lab. Affordable enough for a research grant. Fast enough to iterate.
3. A shared coordination and safety layer that treats satellites as a networked system — not isolated units.
4. Sovereign orbital infrastructure, designed in Africa, operated by African institutions, serving African priorities.

---

## Section 4 — Three Stages

**Label:** THE ARCHITECTURE
**H2:** Three stages. Built in sequence.

**Stage 01 — Orbital Intelligence** *(active — "In development" badge with green pulse dot)*
> Building the coordination, safety, and simulation systems required to operate nanosatellite networks at scale. The architecture that makes everything else possible.

**Stage 02 — Onboard Systems** *(inactive)*
> Embedding the coordination and safety architecture directly into the satellite. Intelligence at the edge — no ground station dependency for routine decisions.

**Stage 03 — Multipurpose Platforms** *(inactive)*
> A programmable nanosatellite platform for African research institutions. One vehicle, multiple missions, accessible without a dedicated launch program.

---

## Section 5 — Live Simulation

**Label:** THE SIMULATION
**H2:** The architecture, running live.

**Subheadline:**
> 15,432 real satellites. Real orbital dynamics. The coordination system operating against actual data — before any hardware has flown.

**Embed:** iframe → https://orbit.ikirere.com (480px height, dark background #0a0e1a, pointer-events disabled)
**Overlay label (bottom-left):** Green dot · orbit.ikirere.com — live
**CTA (bottom-right):** Open Orbit ↗ → https://orbit.ikirere.com

---

## Section 6 — Partners & Recognition

**Label:** PARTNERS & RECOGNITION
**H2:** Backed by the Ecosystem.

**4 partner cards:**

1. **Deep Learning Indaba** (logo: deep-learning-indaba.png)
   > Africa's leading machine learning research community. First public presentation of the orbital coordination thesis.

2. **Google** (logo: google-1-1.svg)
   > Cloud and infrastructure ecosystem support through the Deep Learning Indaba network.

3. **NVIDIA** (logo: nvidia.svg)
   > Access to accelerated computing and AI infrastructure through the Deep Learning Indaba ecosystem.

4. **Station F** (logo: station-f.jpg)
   > European deep-tech ecosystem access across aerospace, infrastructure, and frontier technology networks.

---

## Section 7 — Join Us

**Label:** WORK WITH US
**H2:**
> The work is long-term.
> That's deliberate.

**Body:**
> We are building orbital infrastructure with a five-year technical roadmap. We need orbital mechanics researchers, systems engineers, RL practitioners, and firmware developers who understand that the most important infrastructure is built slowly and correctly.

**CTA (primary):** View Open Roles → /careers

---

# ABOUT

## Section 1 — Hero

**Label:** ABOUT IOLA
**H1:** Who we are

**Subheadline:**
> A team of AI researchers and aerospace engineers building the full-stack orbital infrastructure powering the next generation of autonomous nanosatellite systems for climate, agriculture, Earth observation, logistics, and connectivity across Africa.

---

## Section 2 — Mission

**Label:** MISSION

### Why we exist

**H2:** Why we exist

**Body (2 paragraphs):**
> Africa has 17% of the world's population and less than 3% of active satellites. The infrastructure deficit is not a technology problem — it's a capital allocation and access problem. IOLA's job is to reduce the cost and complexity of getting a satellite into orbit and operating it effectively, until African institutions can do it themselves without depending on external systems or permissions.

> Existing satellite systems are expensive, fragmented, and built for single-purpose missions. IOLA is building a new model: programmable multipurpose nanosatellites coordinated through a shared orbital intelligence layer designed for African institutions, governments, and research ecosystems.

---

### Why software first

**H2:** Why software first

**Body (2 paragraphs):**
> Space hardware is expensive to iterate. A satellite launched with flawed coordination or autonomy systems cannot simply be patched in orbit. IOLA solves this by validating orbital intelligence, autonomous coordination, and safety systems in simulation before deployment to flight hardware.

> When the firmware ships, it ports directly from the simulation environment. When the satellite launches, the operational logic has already run millions of simulated orbits. The hardware is the last variable, not the first.

---

### The two-track architecture

**H2:** The two-track architecture

**Intro:** IOLA develops its orbital systems through two converging tracks:

**Track 1 — Software track (active, navy accent):**
> Build the orbital intelligence layer, validate coordination systems in simulation, and transition proven architectures into onboard flight systems.

**Track 2 — Hardware track (inactive):**
> Engineer compact, modular nanosatellite platforms capable of supporting multiple missions through shared onboard infrastructure and programmable payload systems.

---

## Section 3 — Team

**Label:** TEAM
**H2:** The people building it

**Card 1 — Jason Quist**
- Photo: jason-ggle.jpg (56×56px circle, fallback initials JQ)
- Role: Founder & CEO · Kigali, Rwanda
- Bio: Founder and systems architect focused on autonomous orbital infrastructure, reinforcement learning systems, and next-generation nanosatellite coordination architectures. Leads product, research, and company strategy.

**Card 2 — Alph Doamekpor**
- Photo: alph.jpg (56×56px circle, fallback initials AD)
- Role: Strategy & Aerospace Advisor · Germany
- Bio: Over two decades across ESA, NASA, and EUMETSAT. Advises on orbital systems engineering, mission architecture, and aerospace operational constraints across the IOLA roadmap.

---

## Section 4 — Philosophy

**Label:** PHILOSOPHY
**H2:** What IOLA believes

**Belief 1:**
Heading: Safety is not a feature.
> Orbital safety — guaranteed minimum separation, verified manoeuvre planning, deterministic collision avoidance — is the foundation everything else runs on. We don't ship coordination algorithms that can't be formally verified. Orbital space is shared infrastructure.

**Belief 2:**
Heading: Simulation is not a prototype.
> The simulation environment is the production system in development. Every algorithm that ships runs there first. Real TLE data. Real conjunction geometry. Real orbital mechanics. Systems are validated against live orbital datasets and large-scale constellation environments before hardware deployment.

**Belief 3:**
Heading: Africa is not a market. It's the mission.
> We are not building a product for African universities and governments. The infrastructure is being designed for African operational realities, institutions, and long-term sovereignty. The infrastructure we build will be operated by African engineers, run on African ground stations, serve African research objectives.

**Belief 4:**
Heading: Long timelines are honest timelines.
> Getting a satellite into orbit takes years. Operating a constellation safely takes decades of institutional knowledge. The software will be validated in two years. The firmware will be flight-ready in four. The first constellation will launch when the physics is proven.

---

# RESEARCH

## Section 1 — Hero

**Label:** RESEARCH
**H1:** Research

**Subheadline:**
> Applied research across orbital intelligence, autonomous coordination systems, simulation infrastructure, and next-generation nanosatellite architectures.

---

## Section 2 — Research Areas Grid

**Label:** RESEARCH AREAS
**H2:** Core research domains driving the IOLA architecture.

**6 research area cards (auto-fill grid, minmax 300px):**

**Card 1 — Orbital Intelligence** · Status: Active
> Autonomous coordination, manoeuvre planning, orbital safety, and constellation-scale decision systems for next-generation satellite networks.
Icon: Concentric circles with compass cross

**Card 2 — Conjunction Assessment** · Status: Active
> Real-time orbital risk analysis and collision prediction systems for dense nanosatellite environments.
Icon: Star/burst pattern with circle

**Card 3 — Autonomous Coordination Systems** · Status: Phase 3
> Multi-agent coordination architectures for distributed satellite fleets operating as adaptive orbital networks.
Icon: Connected nodes graph

**Card 4 — Simulation Infrastructure** · Status: Active
> High-fidelity orbital simulation environments used to validate coordination, safety, and autonomy systems before hardware deployment.
Icon: Screen/display with circuit elements

**Card 5 — Hardware Systems** · Status: Phase 3
> Compact programmable nanosatellite platforms designed for multipurpose missions across communications, sensing, and Earth observation.
Icon: CubeSat/antenna form

**Card 6 — Ground Systems** · Status: Phase 3
> Ground communication, telemetry, and mission control infrastructure supporting autonomous orbital operations across Africa.
Icon: Signal wave line with endpoints

---

## Section 3 — Validation Infrastructure

**Label:** INFRASTRUCTURE
**H2:** Validation Infrastructure

**Body (3 paragraphs):**
> IOLA's simulation environment acts as the validation layer for the entire orbital stack. Autonomous coordination systems, orbital safety logic, and constellation behaviours are tested against live orbital datasets before deployment to onboard systems.

> The environment supports large-scale constellation simulation, orbital manoeuvre modelling, conjunction analysis, and distributed coordination testing across thousands of active objects in orbit.

> Architecturally, the simulation layer is designed to transition directly into onboard flight systems, reducing the gap between research validation and operational deployment.

---

# HARDWARE

## Full-Screen 3D Interactive Page

**Top-left:**
Label: HARDWARE
Title: IOLA 3U CubeSat

**Top-right:**
Label: 12 COMPONENTS
Subtitle: Phase 3 hardware

**Toolbar buttons (bottom-centre):**
- Disassemble / Assemble
- Deploy Arrays / Stow Arrays
- Stop / Rotate
- Reset view

**Hint bar (top-centre, dismisses on click):**
> Drag to orbit · Click any part to inspect · Double-click to disassemble

**Part hint (bottom-right):**
> double-tap to disassemble / double-tap to reassemble

---

## 12 Clickable Components with Detail Panels

**1. Structural Bus** · Category: Structure · Status: Primary
> The primary structural chassis of the 3U CubeSat. Machined aluminium 6061-T6 with hard-anodised finish. Provides the mechanical backbone for all subsystem mounting, thermal conduction pathways, and structural load distribution during launch.
Specs: Form factor: 3U CubeSat (10×10×34cm) · Material: Al 6061-T6 hard-anodised · Mass (bus): ~380g · Launch load: 30g quasi-static

**2. Solar Array — Port** · Category: Power · Status: Deployable
> Deployable GaAs triple-junction solar array, port side. Stowed against the body during launch and deployed via spring-loaded hinge mechanisms on orbit insertion. Generates primary power for onboard systems.
Specs: Cell type: GaAs triple-junction · Peak power: ~8.5W per panel · Efficiency: 28–30% · Deployment: Spring-loaded, one-shot

**3. Solar Array — Starboard** · Category: Power · Status: Deployable
> Deployable GaAs triple-junction solar array, starboard side. Mirror configuration to the port array. Combined output with port panel provides sufficient power for mission operations in nominal sun-pointing attitude.
Specs: Cell type: GaAs triple-junction · Peak power: ~8.5W per panel · Combined BOL: ~17W both arrays · Voltage: 4.2V nominal

**4. UHF Patch Antenna** · Category: Communications · Status: Active
> Ultra-high frequency patch antenna on the +Z face. Used for low-rate telemetry downlink, command uplink, and ground contact during initial acquisition. Operates in the 430–440 MHz amateur satellite band with omnidirectional coverage.
Specs: Frequency: 435 MHz (UHF) · Data rate: 9.6–38.4 kbps · TX power: 0.5W nominal · Pattern: Near-omnidirectional

**5. Star Tracker** · Category: ADCS · Status: Navigation
> Miniaturised star tracker for high-accuracy attitude determination. Provides three-axis attitude knowledge by matching observed star patterns against an onboard star catalogue. Primary attitude sensor for fine pointing and nadir-pointing operations.
Specs: Accuracy: <0.01° cross-boresight · Update rate: 4 Hz · FOV: 20° × 20° · Power: 1.5W operational

**6. VHF Whip Antenna — 1** · Category: Communications · Status: Active
> Deployable VHF monopole whip antenna. Used for beacon transmission and emergency communications. Stowed against the body during launch in a spring-loaded configuration, deploys autonomously after separation from the launch vehicle.
Specs: Frequency: 145 MHz (VHF) · Length: ~50cm deployed · Deployment: Spring-loaded, passive · Function: Beacon + emergency comms

**7. VHF Whip Antenna — 2** · Category: Communications · Status: Active
> Secondary deployable VHF monopole whip antenna. Provides cross-polarisation diversity with antenna 1, improving ground contact reliability and link margin during high-elevation passes.
Specs: Frequency: 145 MHz (VHF) · Polarisation: Cross-pol to Ant-1 · Gain: 2.15 dBi · Link margin: +4 dB diversity gain

**8. Cold Gas Thruster — 1** · Category: Propulsion · Status: Phase 3
> Miniaturised cold gas thruster for orbital manoeuvring and fine attitude control. Uses nitrogen or CO₂ as propellant. Enables controlled orbit raising, station-keeping, and de-orbit manoeuvres required for responsible end-of-life disposal.
Specs: Thrust: 10–50 mN · Isp: ~60s (N₂) · Propellant: Cold gas N₂ · ΔV budget: ~15 m/s total

**9. Cold Gas Thruster — 2** · Category: Propulsion · Status: Phase 3
> Secondary cold gas thruster, symmetric pair with thruster 1. Together the pair provides pure-couple torque capability for yaw control without translational disturbance, enabling precise attitude manoeuvres.
Specs: Configuration: Symmetric pair · Control mode: Pure-couple yaw · Valve type: Solenoid, normally-closed · Response: <5ms opening time

**10. De-orbit Thruster** · Category: Propulsion · Status: Phase 3
> Dedicated de-orbit thruster aligned with the -Z axis for retrograde burns. Ensures compliance with the 25-year de-orbit rule for LEO operations. The IkirereMesh coordination system plans and schedules de-orbit manoeuvres autonomously.
Specs: Alignment: -Z (retrograde) · Purpose: Compliance de-orbit · Orbit life: <25yr post-mission · Automation: IkirereMesh scheduled

**11. 1U Interface Ring — Lower** · Category: Structure · Status: Structural
> Lower 1U/2U interface separation ring. Provides the mechanical boundary between the lower and middle units of the 3U stack. Includes alignment features for payload bay integration and PCB stack mounting rails.
Specs: Location: Z = −113mm · Material: Al 6061-T6 · Interface: PC/104 compatible · Function: Payload bay boundary

**12. 1U Interface Ring — Upper** · Category: Structure · Status: Structural
> Upper 2U/3U interface separation ring. Separates the avionics bay from the communication and ADCS subsystem bay. Provides thermal isolation between power-intensive subsystems and temperature-sensitive electronics.
Specs: Location: Z = +113mm · Material: Al 6061-T6 · Interface: Avionics / ADCS boundary · Function: Thermal + structural separation

---

# CAREERS

## Section 1 — Hero

**Label:** CAREERS
**H1:**
> Build Africa's Orbital
> Infrastructure With Us

**Subheadline:**
> A frontier aerospace research program building autonomous orbital infrastructure and programmable nanosatellite systems from Africa.

---

## Section 2 — Main Content

### Context Card

**Header label:** HONEST CONTEXT

**Body (3 paragraphs):**
> IOLA is an early-stage aerospace research company operating pre-revenue and pre-funding. We are building long-horizon orbital infrastructure systems that require deep technical work, patience, and first-principles engineering.

> The people joining now are not joining for startup perks. They are joining to help architect foundational systems at the earliest stage of the company's formation.

> In return, contributors gain direct exposure to frontier orbital systems development, applied aerospace research, and the opportunity to help shape the technical foundations of a long-term space infrastructure program.

---

### Roles List

**Label:** AREAS OF NEED
**H2:** Where we need help.

**7 role rows:**

1. **Orbital Mechanics**
   > Orbital propagation, conjunction analysis, mission planning, and satellite state modelling.

2. **Aerospace Systems Engineering**
   > Nanosatellite architecture, subsystem integration, mission systems design, and operational spacecraft engineering.

3. **Embedded Systems & Flight Software**
   > Onboard autonomy, flight systems engineering, and spacecraft software infrastructure.

4. **Autonomous Systems & Machine Learning**
   > Reinforcement learning, autonomous coordination systems, orbital intelligence, and distributed decision architectures.

5. **Simulation Engineering**
   > High-fidelity orbital simulation environments, physics-based modelling, and validation infrastructure.

6. **Ground Systems**
   > Telemetry infrastructure, mission operations, communication systems, and orbital support architecture.

7. **Guidance, Navigation & Control**
   > Attitude determination, orbital control systems, and autonomous spacecraft stabilization architectures.

---

### Apply Section

**Label:** HOW TO APPLY
**H2:** Apply directly.

**Instruction:**
> Send an email to jason@ikirere.com with the subject: IOLA — [Your Area]

**Include:**
- what you've built
- what you want to work on
- links to technical work, research, code, or projects

**Closing:**
> We care far more about demonstrated technical curiosity and systems thinking than formal credentials. Every serious technical inquiry is reviewed directly by the founding team.

**CTA button:** Send an Email → mailto:jason@ikirere.com?subject=IOLA —

---

# UPDATES

## Section 1 — Hero

**Label:** UPDATES
**H1:**
> What we've built.
> What comes next.

**Subheadline:**
> Development milestones, research progress, and system architecture updates across the IOLA orbital stack.

---

## Section 2 — Update Log (3 articles)

### Article 1

**Date:** May 2026 · **Phase:** Phase 1 (navy pill)
**H2:** Phase 1 Complete — Live Orbital State Infrastructure

**Body (6 paragraphs):**
> IOLA's Phase 1 orbital infrastructure is now operational against live orbital datasets, continuously ingesting, propagating, synchronizing, and rendering real-world satellite behavior in real time.

> The system functions as a deterministic orbital state engine supporting telemetry ingestion, constellation simulation, orbital classification, propagation validation, and synchronized orbital visualization across thousands of active objects in orbit.

> The architecture includes live telemetry pipelines, propagation infrastructure, orbital state persistence, operational synchronization systems, and real-time constellation rendering designed for future autonomous orbital coordination.

> This foundational layer transforms the platform from static orbital visualization into a continuously operating orbital intelligence environment capable of supporting future onboard autonomy and distributed nanosatellite coordination systems.

> Phase 1 answers a foundational question: "Where are the satellites right now?"

> Every future coordination, autonomy, and orbital intelligence system within IOLA is built on top of this deterministic operational layer.

---

### Article 2

**Date:** May 2026 · **Phase:** Phase 2 (navy pill)
**H2:** Phase 2 Complete — Orbital Intelligence Infrastructure

**Body (7 paragraphs):**
> Phase 2 focuses on transforming the IOLA platform from an orbital state engine into a predictive orbital intelligence system capable of understanding, forecasting, and reasoning about satellite behavior in real time.

> Current development includes conjunction assessment, closest-approach prediction, orbital forecasting, communication window analysis, coverage estimation, and deterministic operational risk modelling across large-scale satellite environments.

> The system is designed to continuously evaluate orbital relationships between active objects, predict high-risk encounters, estimate future orbital state, and generate operational decision data for autonomous coordination systems.

> At the core of the architecture is a simple but foundational problem: "Given two satellites, how close will they get within a future time window?"

> Solving this at scale requires continuous orbital propagation, three-dimensional spatial analysis, relative velocity modelling, and deterministic risk evaluation across thousands of active orbital objects simultaneously.

> Phase 2 establishes the intelligence layer required for future autonomous manoeuvre planning, distributed fleet coordination, and onboard orbital decision-making systems.

> The platform no longer just tracks orbit. It understands orbital relationships, predicts future state, and produces actionable operational intelligence.

---

### Article 3

**Date:** May 2026 · **Phase:** Phase 3 (green pill)
**H2:** Phase 3 Begins — IkirereMesh Autonomous Coordination

**Body (6 paragraphs):**
> Phase 3 transitions IOLA from orbital intelligence infrastructure into autonomous constellation coordination systems.

> The focus shifts from understanding orbital state to coordinating satellite behavior dynamically across distributed nanosatellite fleets. This includes autonomous scheduling, multi-satellite orchestration, coverage optimization, anomaly response, and reinforcement learning driven operational coordination.

> IkirereMesh introduces the coordination layer for programmable orbital infrastructure: a distributed intelligence system capable of managing satellite relationships, mission priorities, telemetry awareness, and operational decision-making across an entire constellation.

> Core research areas entering active development include multi-satellite coordination policies, autonomous collision avoidance, adaptive coverage optimisation, fuel-aware manoeuvre planning, reinforcement learning coordination systems, distributed telemetry intelligence, constellation-wide operational memory, and subsystem health and degradation analytics.

> The long-term objective is a constellation architecture capable of autonomous operational behavior while maintaining deterministic safety constraints and verifiable orbital coordination guarantees.

> This phase establishes the foundation for self-coordinating multipurpose nanosatellite infrastructure operating as a unified orbital system rather than isolated spacecraft.

---

# CONTACT

## Section 1 — Hero

**Label:** CONTACT
**H1:** Get in touch

**Subheadline:**
> Technical collaboration, research partnerships, institutional engagement, and mission-aligned inquiries.

---

## Section 2 — Contact Card

**3-row contact table (maxWidth 460px):**

| Type | Content |
|------|---------|
| EMAIL | jason@ikirere.com |
| LINKEDIN | Ikirere Orbital Labs ↗ → https://linkedin.com/company/ikirere-orbital-labs-africa |
| LIVE SIMULATION | orbit.ikirere.com ↗ → https://orbit.ikirere.com |

**Closing note:**
> For technical collaboration or research engagement, include a brief overview of your background, area of interest, and what you're proposing. Serious inquiries are reviewed directly by the team.

---

# DESIGN SYSTEM REFERENCE

## Colour Tokens

| Name | Hex | Use |
|------|-----|-----|
| Navy | #0A2463 | Primary brand, CTAs, active states |
| Blue | #1E5FA8 | Eyebrows, secondary accents |
| Gold | #C8860A | Decorative glows, status |
| Green | #22c55e | Live/active pulse dot |
| Text dark | #111827 | All headings |
| Text body | #475569 | Prose |
| Text muted | #64748b | Subheadlines, secondary body |
| Text faint | #94a3b8 | Labels, captions, meta |
| Border | #e2e8f0 | All dividers and card borders |
| Surface | #f8fafc | Section backgrounds, card hover |
| Tint | #f0f4f9 | Active card background |
| Ink | #334155 | Icon colour |

## Typography Scale

| Element | Size | Weight | Tracking | Color |
|---------|------|--------|----------|-------|
| H1 (hero) | clamp(2.2rem, 4.5vw, 3.6rem) | 600 | -0.035em | #111827 |
| H1 (inner) | clamp(2rem, 4vw, 2.8rem) | 600 | -0.03em | #111827 |
| H2 | text-2xl / text-3xl | 580 | -0.025em | #111827 |
| H3 (card) | 14.5–15px | 600 | -0.01em | #111827 |
| Body large | 1.05rem | 400 | — | #64748b |
| Body standard | 0.95rem | 400 | — | #475569 |
| Body small | 13–13.5px | 400 | — | #64748b / #475569 |
| Label | 10px | 600 | 0.16em | #94a3b8 |
| Eyebrow | 11px | 600 | 0.18em | #1E5FA8 |
| Caption | 12px | 500 | — | #94a3b8 |
| Pill | 9px | 600 | 0.12em | varies |

## Spacing Patterns

- Hero padding (home): clamp(40px, 8vw, 60px) top / clamp(40px, 8vw, 96px) bottom
- Hero padding (inner pages): 80px top / 64px bottom
- Section padding (home): py-24 (96px)
- Section padding (inner): py-20 (80px)
- Subsection divider margin: 40px top and bottom
- Card inner padding (large): 36px top/bottom, 40px left/right
- Card inner padding (medium): 28px all
- Card inner padding (small): 24px all
- Horizontal page padding: px-8 (32px)
- Max content width (wide): 1100px
- Max content width (narrow): 720px
- Gap between columns: gap-10 (40px)

## Component Patterns

### Label
10px · weight 600 · letterSpacing 0.16em · uppercase · #94a3b8 · marginBottom 10px

### Eyebrow Row
Flex row · gap-3 · [24px gradient line transparent→#1E5FA8] + [Label]

### Card Container
border 1px solid #e2e8f0 · borderRadius 10px · overflow hidden · boxShadow 0 1px 3px rgba(10,36,99,0.05)

### Active Card State
borderLeft 3px solid #0A2463 · background #f0f4f9

### Inactive Card State
borderLeft 3px solid transparent · background #fff

### Hover State
background #f8fafc · transition 0.15–0.2s ease

### Status Pill
9px caps · borderRadius 100px · padding 3px 9px
Active: background rgba(10,36,99,0.07) · color #0A2463
Inactive: background #f1f5f9 · color #94a3b8
Phase 3: background #f1f5f9 · color #64748b
Live/green: background rgba(34,197,94,0.09) · color #22c55e

### Primary CTA Button
background #0A2463 · color #fff · fontSize 13px · fontWeight 500
padding 10px 22px · borderRadius 7px · boxShadow 0 1px 3px rgba(10,36,99,0.3)
hover: background #0d2d7a

### Secondary CTA Button
background transparent · color #0A2463 · border 1px solid rgba(10,36,99,0.25)
same padding/radius as primary
hover: borderColor #0A2463 · background #f0f4f9

### Text Link
color #0A2463 · textDecoration underline · textDecorationColor rgba(10,36,99,0.3)

### External Link
inline-flex · gap 6px · arrow SVG 11×11px · hover opacity 0.75

### Bullet Dot (prose lists)
5×5px circle · #cbd5e1 (neutral) or #0A2463 (brand) · marginTop 7–8px · flexShrink 0

### Scroll Reveal
opacity: 0 · transform: translateY(16px) → opacity: 1 · transform: translateY(0)
transition: 0.6s ease · triggered by IntersectionObserver at threshold 0.08–0.12

### Page Hero Decorative Glow (all pages except home)
400×400px circle · position absolute top-right (-60px, -40px) · pointer-events none
Home variant: rgba(200,134,10,0.05) gold
Research/Updates/Contact: rgba(30,95,168,0.05) blue
Careers/About: rgba(200,134,10,0.05) gold

### Body-Wide Sunset Glow
body::before · fixed · bottom-right (-120px each) · 700×700px circle
radial-gradient: rgba(200,134,10,0.055) center → rgba(30,95,168,0.03) midpoint → transparent
z-index: 0 · all pages

### Body-Wide Dot Grid
background-image: radial-gradient(circle, rgba(10,36,99,0.025) 1px, transparent 1px)
background-size: 28px 28px · all pages

## Page Flow Summary

| Page | Hero width | Body width | Sections | 3D/Interactive |
|------|-----------|-----------|----------|---------------|
| Home | 1100px, 2-col | 1100px | 7 | Yes (SatelliteViewer) |
| About | 720px, 1-col | 720px | 4 | No |
| Research | 1100px, 1-col | 1100px / 720px | 3 | No |
| Hardware | Full viewport | Full viewport | 1 (canvas) | Yes (Hardware3D) |
| Careers | 720px, 1-col | 720px | 2 | No |
| Updates | 1100px, 1-col | 720px | 2 | No |
| Contact | 720px, 1-col | 720px | 2 | No |
