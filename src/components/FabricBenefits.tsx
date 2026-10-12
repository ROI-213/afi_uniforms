import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Activity, Shield, Droplets, Wind, RotateCcw, CheckCircle2, ArrowRight } from 'lucide-react'

const TECH_SPECS = [
  {
    id: 'stretch',
    title: 'AeroWeave™ 4-Way Stretch',
    tag: 'Flexibility & Reach',
    icon: Activity,
    short: 'Ergonomic multi-directional stretch moves with CPR compressions, bending and lifting.',
    detail: 'Blended with 7% high-rebound Spandex, AeroWeave delivers 360-degree flexibility. Gusseted underarm panels eliminate shoulder drag during delicate surgical operations.',
    stats: '360° Zero-Tension Flex',
  },
  {
    id: 'antimicrobial',
    title: 'SilverShield™ Pathogen Defense',
    tag: 'Hygiene & Safety',
    icon: Shield,
    short: 'Infused silver ions naturally disrupt bacterial cell walls on the fabric surface.',
    detail: 'Certified 99.8% reduction against clinical bacterial colonies. Lasts over 80 commercial laundry cycles without losing protective efficacy.',
    stats: '99.8% Microbial Reduction',
  },
  {
    id: 'fluid',
    title: 'HydroDrop™ Barrier',
    tag: 'Liquid Repellence',
    icon: Droplets,
    short: 'Spills and fluids bead on contact and glide off before penetrating inner yarns.',
    detail: 'Treated with eco-friendly C0 durable water repellent. Accidental splashes in trauma or labor wards roll off without staining or soaking your base wear.',
    stats: 'Instant Fluid Repellency',
  },
  {
    id: 'breathable',
    title: 'ThermoBreathe™ Micro-Channels',
    tag: 'All-Day Climate Control',
    icon: Wind,
    short: 'Micro-perforated yarn channels vaporize sweat 3x faster than traditional cotton scrubs.',
    detail: 'Engineered specifically for warm Indian hospital environments and OT heating lamps, maintaining an optimal body climate across marathon shifts.',
    stats: '3x Faster Moisture Evaporation',
  },
  {
    id: 'durability',
    title: 'Autoclave-Grade ColorLock™',
    tag: 'Fade & Shrink Proof',
    icon: RotateCcw,
    short: 'Withstands harsh industrial hospital washing without fading, pilling or shrinking.',
    detail: 'Yarn-dyed at high thermal pressure. Whether washed in industrial laundry or domestic machines, our scrubs maintain crisp silhouettes and vivid shades.',
    stats: '100+ Wash Life Guarantee',
  },
]

export default function FabricBenefits() {
  const [activeTech, setActiveTech] = useState(TECH_SPECS[0])

  return (
    <section style={{ paddingBlock: 'clamp(4.5rem, 8vw, 7.5rem)', background: 'white', position: 'relative' }}>
      <div className="container-site">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 3.5rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.35rem 1rem', borderRadius: 100, background: 'var(--color-blue-pale)', border: '1px solid var(--color-blue-light)', marginBottom: '1rem' }}>
            <Sparkles size={14} style={{ color: 'var(--color-medical-blue)' }} />
            <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-medical-blue)' }}>
              Clinical Textile Engineering
            </span>
          </div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2rem, 3.8vw, 3rem)', color: 'var(--color-navy)', letterSpacing: '-0.025em', lineHeight: 1.15, marginBottom: '1rem' }}>
            Engineered for the Demands of 16-Hour Hospital Shifts
          </h2>
          <p style={{ color: 'var(--color-neutral-600)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Every AFI garment is an intersection of textile science and clinical comfort. Explore the six proprietary fabric innovations built into our uniforms.
          </p>
        </div>

        {/* Interactive Feature Explorer */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
          {/* Left: Tab Selection List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
            {TECH_SPECS.map((tech) => {
              const active = activeTech.id === tech.id
              const Icon = tech.icon
              return (
                <div
                  key={tech.id}
                  onClick={() => setActiveTech(tech)}
                  style={{
                    padding: '1.25rem 1.5rem',
                    borderRadius: 'var(--radius-lg)',
                    border: `1.5px solid ${active ? 'var(--color-medical-blue)' : 'var(--color-neutral-200)'}`,
                    background: active ? 'var(--color-blue-pale)' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                    boxShadow: active ? '0 10px 25px rgba(28,77,161,0.1)' : 'none',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 10,
                      background: active ? 'var(--color-medical-blue)' : 'var(--color-neutral-100)',
                      color: active ? 'white' : 'var(--color-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                      <h4 style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-navy)' }}>{tech.title}</h4>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--color-medical-blue)', background: 'rgba(28,77,161,0.1)', padding: '0.15rem 0.5rem', borderRadius: 4 }}>
                        {tech.tag}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600)', lineHeight: 1.5 }}>{tech.short}</p>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Right: Technical Deep Dive Showcase Box */}
          <div
            style={{
              background: 'linear-gradient(145deg, var(--color-navy) 0%, #152238 100%)',
              color: 'white',
              borderRadius: 'clamp(20px, 2.5vw, 32px)',
              padding: 'clamp(2.5rem, 5vw, 4rem)',
              boxShadow: '0 25px 60px rgba(10,22,40,0.18)',
              position: 'relative',
              overflow: 'hidden',
              minHeight: 460,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            {/* Visual glow accent */}
            <div style={{ position: 'absolute', top: '-15%', right: '-15%', width: 300, height: 300, borderRadius: '50%', background: 'rgba(56, 189, 248, 0.18)', filter: 'blur(70px)' }} />

            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-blue-light)', fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
                <CheckCircle2 size={16} /> Certified Clinical Specification
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)', lineHeight: 1.2, marginBottom: '1.25rem' }}>
                {activeTech.title}
              </h3>
              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: '2rem' }}>
                {activeTech.detail}
              </p>
            </div>

            <div>
              {/* Highlight Metric Card */}
              <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, padding: '1.25rem 1.5rem', marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--color-blue-light)' }}>
                  Performance Benchmark
                </div>
                <div style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: 'var(--font-display)', marginTop: '0.25rem' }}>
                  {activeTech.stats}
                </div>
              </div>

              <Link
                to="/shop"
                className="btn-primary"
                style={{ padding: '0.9rem 1.85rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white', color: 'var(--color-navy)' }}
              >
                Experience This Fabric <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
