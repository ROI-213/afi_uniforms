/**
 * IndustriesWeServe — Major Section
 *
 * Showcases the 10 core industries AFI Uniform designs, manufactures, and supplies for:
 *   1. Healthcare
 *   2. Manufacturing
 *   3. Corporate
 *   4. Hospitality
 *   5. Education
 *   6. Security
 *   7. Retail
 *   8. Construction
 *   9. Logistics
 *  10. Food & Catering (Chef)
 *
 * Feature: Ultra-smooth continuous infinite marquee with GPU acceleration and pause-on-hover.
 * Light Theme with authentic workforce photography.
 */

import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Factory,
  ShieldCheck,
  Stethoscope,
  GraduationCap,
  Briefcase,
  Truck,
  HardHat,
  Store,
  Utensils,
  Pause,
  Play,
} from 'lucide-react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

interface IndustryCard {
  id: string
  title: string
  subtitle: string
  desc: string
  image: string
  icon: React.ElementType
  href: string
  badge: string
}

const INDUSTRIES: IndustryCard[] = [
  {
    id: 'healthcare',
    title: 'Healthcare & Hospitals',
    subtitle: 'Doctors, Nurses & Technicians',
    desc: 'Antimicrobial scrubs, consultation coats, OT wear, and hospital department color-coded kits.',
    image: '/ind-healthcare.jpg',
    icon: Stethoscope,
    href: '/shop?category=healthcare',
    badge: 'Clinical Grade',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing & Plants',
    subtitle: 'Factory Workers & Supervisors',
    desc: 'Heavy-duty twill jackets, high-visibility coveralls, shop-floor trousers, and anti-static safety workwear.',
    image: '/mfg-factory.jpg',
    icon: Factory,
    href: '/shop?category=industrial',
    badge: 'Heavy Industrial',
  },
  {
    id: 'corporate',
    title: 'Corporate & Executive',
    subtitle: 'Office & Management Teams',
    desc: 'Bespoke corporate blazers, wrinkle-free Oxford shirts, tailored trousers, and premium logo embroidered polos.',
    image: '/ind-corporate.jpg',
    icon: Briefcase,
    href: '/shop?category=corporate',
    badge: 'Executive Line',
  },
  {
    id: 'hospitality',
    title: 'Hospitality & Hotels',
    subtitle: 'Front-Desk, Housekeeping & Concierge',
    desc: 'Elegant reception suits, front-office blazers, concierge attire, and durable housekeeping uniforms.',
    image: '/ind-hospitality.jpg',
    icon: Building2,
    href: '/shop?category=hospitality',
    badge: 'Luxury Resort',
  },
  {
    id: 'education',
    title: 'Education & Academics',
    subtitle: 'Teachers, Faculty & School Staff',
    desc: 'Institutional crest blazers, faculty formalwear, staff aprons, and campus staff uniform packages.',
    image: '/ind-education.jpg',
    icon: GraduationCap,
    href: '/shop?category=education',
    badge: 'Campus Standard',
  },
  {
    id: 'security',
    title: 'Security & Facility',
    subtitle: 'Security Officers & Patrol Staff',
    desc: 'Commanding structured shirts, epaulet shirts, cargo trousers, and weather-resistant tactical jackets.',
    image: '/ind-security.jpg',
    icon: ShieldCheck,
    href: '/shop?category=security',
    badge: 'Tactical Pro',
  },
  {
    id: 'retail',
    title: 'Retail & Showrooms',
    subtitle: 'Store Managers & Sales Personnel',
    desc: 'Vibrant branded polos, waistcoats, aprons, and comfortable floor staff uniforms designed for active shifts.',
    image: '/ind-retail.jpg',
    icon: Store,
    href: '/shop?category=corporate',
    badge: 'Retail Fit',
  },
  {
    id: 'construction',
    title: 'Construction & Infrastructure',
    subtitle: 'Site Supervisors & Field Engineers',
    desc: 'Reflective hi-vis jackets, reinforced utility cargo, safety vests, and rugged field jackets.',
    image: '/ind-construction.jpg',
    icon: HardHat,
    href: '/shop?category=industrial',
    badge: 'Safety First',
  },
  {
    id: 'logistics',
    title: 'Logistics & Warehouse',
    subtitle: 'Fleet Drivers, Dispatch & Cargo Teams',
    desc: 'Breathable dry-fit polos, cargo pants, dispatch jackets, and high-visibility fleet uniforms.',
    image: '/ind-logistics.jpg',
    icon: Truck,
    href: '/shop?category=logistics',
    badge: 'Fleet Ready',
  },
  {
    id: 'food-catering',
    title: 'Food & Culinary',
    subtitle: 'Head Chefs, Kitchen & Catering Crew',
    desc: 'Double-breasted chef coats, heat-resistant kitchen aprons, chef trousers, and food handling caps.',
    image: '/ind-chef.jpg',
    icon: Utensils,
    href: '/shop?category=chef',
    badge: 'Culinary Master',
  },
]

export default function IndustriesWeServe() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-labelledby="industries-heading"
      style={{
        paddingBlock: 'clamp(4.5rem, 7.5vw, 6.5rem)',
        background: '#F8FAFC',
        color: '#0A1932',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      {/* Background radial glow */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '75vw',
          height: '520px',
          background: 'radial-gradient(circle, rgba(23, 105, 232, 0.07) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Header (Inside container) */}
        <div className="container-site">
          <div
            style={{
              textAlign: 'center',
              maxWidth: 760,
              margin: '0 auto clamp(2rem, 3.5vw, 3.25rem)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(24px)',
              transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#EFF6FF',
                border: '1px solid rgba(23, 105, 232, 0.18)',
                borderRadius: 100,
                padding: '0.35rem 0.95rem',
                marginBottom: '1rem',
              }}
            >
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#1769E8',
                  textTransform: 'uppercase',
                }}
              >
                MULTI-INDUSTRY MANUFACTURE
              </span>
            </div>

            <h2
              id="industries-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 4.5vw, 3.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.03em',
                marginBottom: '1rem',
                color: '#0A1932',
              }}
            >
              Industries We <span style={{ color: '#1769E8' }}>Serve</span>
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.95rem, 1.15vw, 1.08rem)',
                lineHeight: 1.6,
                color: '#64748B',
                margin: '0 auto',
              }}
            >
              Whether outfitting a 5,000-employee manufacturing plant or a 50-person hotel, AFI
              designs, manufactures, and customises high-performance uniforms tailored to your exact
              industry.
            </p>

            {/* Subtle Ticker Hint & Pause Button */}
            <div
              style={{
                marginTop: '1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.625rem',
                background: '#FFFFFF',
                border: '1px solid #E2E8F0',
                borderRadius: 100,
                padding: '0.35rem 0.85rem',
                fontSize: '0.75rem',
                color: '#64748B',
                boxShadow: '0 2px 6px rgba(10, 25, 50, 0.04)',
              }}
            >
              <button
                onClick={() => setIsPaused(p => !p)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1769E8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  padding: 0,
                }}
                aria-label={isPaused ? 'Resume sliding' : 'Pause sliding'}
              >
                {isPaused ? <Play size={13} fill="#1769E8" /> : <Pause size={13} fill="#1769E8" />}
                <span>{isPaused ? 'Resume' : 'Pause'}</span>
              </button>
              <span style={{ opacity: 0.4 }}>•</span>
              <span>Hover anywhere on cards to pause &amp; explore</span>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            CONTINUOUS INFINITE SLIDING MARQUEE
        ══════════════════════════════════════════ */}
        <div
          className="afi-marquee-wrapper"
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            paddingBlock: '1.25rem',
          }}
        >
          {/* Left edge shadow vignette */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              width: 'clamp(50px, 9vw, 150px)',
              background: 'linear-gradient(to right, #F8FAFC 10%, rgba(248, 250, 252, 0) 100%)',
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />

          {/* Right edge shadow vignette */}
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              right: 0,
              width: 'clamp(50px, 9vw, 150px)',
              background: 'linear-gradient(to left, #F8FAFC 10%, rgba(248, 250, 252, 0) 100%)',
              zIndex: 5,
              pointerEvents: 'none',
            }}
          />

          {/* Seamless Dual-Track Infinite Moving System */}
          <div
            className="afi-marquee-flex"
            style={{
              display: 'flex',
              width: 'max-content',
            }}
          >
            {[0, 1].map(groupIndex => (
              <div
                key={groupIndex}
                className="afi-track-group"
                style={{
                  animationPlayState: isPaused ? 'paused' : undefined,
                }}
              >
                {INDUSTRIES.map(ind => {
                  const Icon = ind.icon
                  return (
                    <div
                      key={`${groupIndex}-${ind.id}`}
                      className="afi-industry-card"
                    >
                      {/* Image header container */}
                      <div
                        style={{
                          position: 'relative',
                          height: 190,
                          overflow: 'hidden',
                          background: '#F1F5F9',
                        }}
                      >
                        <img
                          src={ind.image}
                          alt={ind.title}
                          className="ind-card-img"
                          loading="lazy"
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center',
                          }}
                        />
                        {/* Image overlay */}
                        <div
                          style={{
                            position: 'absolute',
                            inset: 0,
                            background:
                              'linear-gradient(180deg, rgba(10, 25, 50, 0.02) 0%, rgba(10, 25, 50, 0.45) 100%)',
                          }}
                        />

                        {/* Badge */}
                        <div
                          style={{
                            position: 'absolute',
                            top: '0.875rem',
                            right: '0.875rem',
                            background: 'rgba(10, 25, 50, 0.82)',
                            backdropFilter: 'blur(8px)',
                            WebkitBackdropFilter: 'blur(8px)',
                            border: '1px solid rgba(255, 255, 255, 0.25)',
                            borderRadius: 100,
                            padding: '0.25rem 0.65rem',
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            color: '#FFFFFF',
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {ind.badge}
                        </div>

                        {/* Icon floating badge */}
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '0.875rem',
                            left: '1rem',
                            width: 42,
                            height: 42,
                            borderRadius: 12,
                            background: '#1769E8',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            boxShadow: '0 4px 14px rgba(23, 105, 232, 0.35)',
                          }}
                        >
                          <Icon size={20} />
                        </div>
                      </div>

                      {/* Body content */}
                      <div
                        style={{
                          padding: '1.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          flex: 1,
                          justifyContent: 'space-between',
                          background: '#FFFFFF',
                        }}
                      >
                        <div>
                          <h3
                            style={{
                              fontFamily: 'var(--font-display)',
                              fontWeight: 800,
                              fontSize: '1.125rem',
                              color: '#0A1932',
                              marginBottom: '0.25rem',
                              lineHeight: 1.25,
                            }}
                          >
                            {ind.title}
                          </h3>
                          <div
                            style={{
                              fontSize: '0.75rem',
                              color: '#1769E8',
                              fontWeight: 700,
                              marginBottom: '0.75rem',
                            }}
                          >
                            {ind.subtitle}
                          </div>
                          <p
                            style={{
                              fontSize: '0.8125rem',
                              color: '#64748B',
                              lineHeight: 1.55,
                              marginBottom: '1.25rem',
                              minHeight: '3.8em',
                            }}
                          >
                            {ind.desc}
                          </p>
                        </div>

                        {/* Explore button */}
                        <Link
                          to={ind.href}
                          className="ind-explore-btn"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: '100%',
                            padding: '0.65rem 1rem',
                            borderRadius: 10,
                            background: '#F1F5F9',
                            border: '1px solid #E2E8F0',
                            color: '#0A1932',
                            fontSize: '0.8125rem',
                            fontWeight: 700,
                            textDecoration: 'none',
                          }}
                        >
                          <span>Explore Industry Uniforms</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            ))}
          </div>
        </div>


      </div>

      {/* ── Ultra-Smooth Continuous Sliding Keyframes ── */}
      <style>{`
        @keyframes afiSmoothMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-100%, 0, 0);
          }
        }

        .afi-track-group {
          display: flex;
          gap: 1.5rem;
          padding-right: 1.5rem;
          flex-shrink: 0;
          animation: afiSmoothMarquee 42s linear infinite;
          will-change: transform;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          transform: translate3d(0, 0, 0);
        }

        .afi-marquee-wrapper:hover .afi-track-group {
          animation-play-state: paused;
        }

        .afi-industry-card {
          width: 320px;
          flex-shrink: 0;
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          box-shadow: 0 4px 18px rgba(10, 25, 50, 0.05);
          transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.3s ease;
          position: relative;
        }

        .afi-industry-card:hover {
          transform: translateY(-6px);
          border-color: #93C5FD !important;
          box-shadow: 0 16px 36px -6px rgba(10, 25, 50, 0.12) !important;
        }

        .afi-industry-card .ind-card-img {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .afi-industry-card:hover .ind-card-img {
          transform: scale(1.06);
        }

        .ind-explore-btn {
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .ind-explore-btn:hover {
          background: #1769E8 !important;
          border-color: #1769E8 !important;
          color: #FFFFFF !important;
        }

        @media (max-width: 768px) {
          .afi-track-group {
            animation-duration: 32s;
          }
        }
      `}</style>
    </section>
  )
}
