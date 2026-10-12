import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Users,
  Building2,
  Grid3x3,
  ShieldCheck,
  Wind,
  Sparkles,
  HardHat,
  Shield,
  Layers,
} from 'lucide-react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

interface BannerData {
  id: string
  bgImage: string
  alt: string
  tag: string
  eyebrow: string
  titleLine1: string
  titleHighlight: string
  description: string
  buttons: {
    label: string
    href: string
    variant: 'primary' | 'secondary'
  }[]
  badges: {
    icon: React.ElementType
    label: string
    sub?: string
  }[]
}

const BANNERS: BannerData[] = [
  {
    id: 'all-industries',
    bgImage: '/hero-bg-1.jpg',
    alt: 'Built for Every Professional — AFI Uniforms Multi-Industry Lineup',
    tag: 'All Industries',
    eyebrow: 'PROFESSIONAL UNIFORMS',
    titleLine1: 'Built for Every',
    titleHighlight: 'Professional.',
    description:
      'From healthcare and hospitality to manufacturing, education and corporate teams – premium uniforms designed, manufactured and delivered at scale.',
    buttons: [
      { label: 'Explore Uniforms', href: '/shop', variant: 'primary' },
      { label: 'Custom Uniforms', href: '/bulk-orders', variant: 'secondary' },
    ],
    badges: [
      { icon: Users, label: '50,000+', sub: 'Professionals Outfitted' },
      { icon: Building2, label: '500+', sub: 'Organizations Served' },
      { icon: Grid3x3, label: '200+', sub: 'Uniform Designs' },
    ],
  },
  {
    id: 'healthcare',
    bgImage: '/hero-bg-2.jpg',
    alt: 'Care in Every Stitch — AFI Healthcare Uniforms for Doctors and Nurses',
    tag: 'Healthcare',
    eyebrow: 'HEALTHCARE UNIFORMS',
    titleLine1: 'Care in',
    titleHighlight: 'Every Stitch.',
    description:
      'Comfortable, durable and hygienic uniforms for doctors, nurses and healthcare professionals.',
    buttons: [
      { label: 'Explore Healthcare', href: '/shop?category=healthcare', variant: 'primary' },
    ],
    badges: [
      { icon: ShieldCheck, label: 'Antimicrobial', sub: 'Fabric' },
      { icon: Wind, label: 'Breathable', sub: 'Comfort' },
      { icon: Sparkles, label: 'Easy Care', sub: '& Long Lasting' },
    ],
  },
  {
    id: 'industrial',
    bgImage: '/hero-bg-3.jpg',
    alt: 'Strength for a Safer Tomorrow — AFI Industrial & Safety Uniforms',
    tag: 'Industrial',
    eyebrow: 'INDUSTRIAL UNIFORMS',
    titleLine1: 'Strength for',
    titleHighlight: 'a Safer Tomorrow.',
    description:
      'Rugged, reliable and performance-driven uniforms for industrial and manufacturing teams.',
    buttons: [
      { label: 'Explore Industrial', href: '/shop?category=industrial', variant: 'primary' },
    ],
    badges: [
      { icon: Shield, label: 'High Durability', sub: 'Fabric' },
      { icon: Layers, label: 'Built for Tough', sub: 'Environments' },
      { icon: HardHat, label: 'Safety Compliant', sub: 'Designs' },
    ],
  },
]

// ── Multi-Industry Category Bar Data ──
const CATEGORIES = [
  {
    label: 'CORPORATE',
    sub: 'Executive & Office',
    img: '/ind-corporate.jpg',
    href: '/shop?category=corporate',
  },
  {
    label: 'INDUSTRIAL',
    sub: 'Safety & Plant Workwear',
    img: '/ind-industrial.jpg',
    href: '/shop?category=industrial',
  },
  {
    label: 'HOSPITALITY',
    sub: 'Hotels & Chef Uniforms',
    img: '/ind-hospitality.jpg',
    href: '/shop?category=hospitality',
  },
  {
    label: 'HEALTHCARE',
    sub: 'Scrubs & Lab Coats',
    img: '/ind-healthcare.jpg',
    href: '/shop?category=healthcare',
  },
  {
    label: 'SECURITY & EDU',
    sub: 'Tactical & School Staff',
    img: '/ind-security.jpg',
    href: '/shop?category=security',
  },
]

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const autoPlayRef = useRef<number | null>(null)

  const nextSlide = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % BANNERS.length)
  }, [])

  const prevSlide = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + BANNERS.length) % BANNERS.length)
  }, [])

  // Auto-play timer (6 seconds, pauses on hover)
  useEffect(() => {
    if (isPaused) return
    autoPlayRef.current = window.setInterval(nextSlide, 6500)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [nextSlide, isPaused])

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextSlide()
      else prevSlide()
    }
    touchStartX.current = null
  }

  return (
    <section
      aria-label="Featured Hero Banners"
      style={{
        paddingTop: 'clamp(0.75rem, 1.8vw, 1.5rem)',
        paddingBottom: 'clamp(1.5rem, 2.5vw, 2.5rem)',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
      }}
    >
      <div className="container-site">
        {/* ══════════════════════════════════════════
            HERO BANNER FRAME (Curved Edges)
        ══════════════════════════════════════════ */}
        <div
          className="afi-hero-banner-card"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{
            position: 'relative',
            borderRadius: 'clamp(18px, 2.6vw, 32px)', // ✨ Elegant curved edges
            overflow: 'hidden',
            boxShadow: '0 24px 60px -15px rgba(10, 25, 50, 0.28), 0 4px 18px rgba(10, 25, 50, 0.08)',
            border: '1px solid rgba(10, 25, 50, 0.1)',
            background: '#071529',
            minHeight: 'clamp(420px, 50vw, 540px)',
            display: 'flex',
            alignItems: 'stretch',
          }}
        >
          {/* Slides Stack */}
          {BANNERS.map((banner, idx) => {
            const isActive = idx === currentIndex
            return (
              <div
                key={banner.id}
                aria-hidden={!isActive}
                style={{
                  position: idx === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  opacity: isActive ? 1 : 0,
                  visibility: isActive ? 'visible' : 'hidden',
                  transform: isActive ? 'scale(1)' : 'scale(1.03)',
                  transition: `opacity 0.7s ${EASE}, transform 0.9s ${EASE}, visibility 0.7s`,
                  pointerEvents: isActive ? 'auto' : 'none',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                {/* Clean Photographic Background Image */}
                <img
                  src={banner.bgImage}
                  alt={banner.alt}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center right',
                  }}
                />

                {/* Atmospheric Dark Navy Gradient Overlay for Text Readability */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(90deg, rgba(7, 21, 41, 0.95) 0%, rgba(7, 21, 41, 0.88) 45%, rgba(7, 21, 41, 0.35) 75%, rgba(7, 21, 41, 0.05) 100%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Subtle bottom vignette to protect badges */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(7, 21, 41, 0.75) 0%, transparent 40%)',
                    pointerEvents: 'none',
                  }}
                />

                {/* ── Live Banner Content (Real crisp HTML & interactive buttons) ── */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 3,
                    width: '100%',
                    padding: 'clamp(2rem, 4.5vw, 3.75rem)',
                    paddingBottom: 'clamp(4.25rem, 6vw, 4.75rem)',
                    maxWidth: 720,
                  }}
                >
                  {/* Eyebrow */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginBottom: '0.875rem',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 'clamp(0.7rem, 1vw, 0.8125rem)',
                        fontWeight: 800,
                        letterSpacing: '0.18em',
                        color: 'rgba(255, 255, 255, 0.9)',
                        textTransform: 'uppercase',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {banner.eyebrow}
                    </span>
                    <span style={{ width: 28, height: 1.5, background: '#3B9EFF' }} />
                  </div>

                  {/* Headline */}
                  <h1
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: 'clamp(2.1rem, 4.2vw, 3.75rem)',
                      lineHeight: 1.06,
                      letterSpacing: '-0.035em',
                      color: 'white',
                      marginBottom: '1rem',
                      textShadow: '0 2px 24px rgba(0,0,0,0.3)',
                    }}
                  >
                    {banner.titleLine1}
                    <br />
                    <span style={{ color: '#3B9EFF' }}>{banner.titleHighlight}</span>
                  </h1>

                  {/* Subtitle / Paragraph */}
                  <p
                    style={{
                      fontSize: 'clamp(0.875rem, 1.15vw, 1.05rem)',
                      lineHeight: 1.6,
                      color: 'rgba(255, 255, 255, 0.85)',
                      marginBottom: '1.75rem',
                      maxWidth: 500,
                      textShadow: '0 1px 10px rgba(0,0,0,0.2)',
                    }}
                  >
                    {banner.description}
                  </p>

                  {/* Action Buttons */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '0.875rem',
                      marginBottom: '2rem',
                    }}
                  >
                    {banner.buttons.map(btn => {
                      if (btn.variant === 'primary') {
                        return (
                          <Link
                            key={btn.label}
                            to={btn.href}
                            className="afi-hero-btn-blue"
                          >
                            <span>{btn.label}</span>
                            <ArrowRight size={16} />
                          </Link>
                        )
                      }
                      return (
                        <Link
                          key={btn.label}
                          to={btn.href}
                          className="afi-hero-btn-ghost"
                        >
                          <span>{btn.label}</span>
                          <ArrowRight size={16} />
                        </Link>
                      )
                    })}
                  </div>

                  {/* Bottom Stats / Feature Badges */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 'clamp(1rem, 2.5vw, 2rem)',
                      alignItems: 'center',
                    }}
                  >
                    {banner.badges.map(badge => {
                      const Icon = badge.icon
                      return (
                        <div
                          key={badge.label}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.65rem',
                          }}
                        >
                          <div
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: 'rgba(59, 158, 255, 0.16)',
                              border: '1px solid rgba(59, 158, 255, 0.35)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: '#60C4FF',
                              flexShrink: 0,
                            }}
                          >
                            <Icon size={16} />
                          </div>
                          <div>
                            <div
                              style={{
                                fontFamily: 'var(--font-display)',
                                fontWeight: 800,
                                fontSize: 'clamp(0.85rem, 1.1vw, 1.05rem)',
                                color: 'white',
                                lineHeight: 1.1,
                                letterSpacing: '-0.02em',
                              }}
                            >
                              {badge.label}
                            </div>
                            {badge.sub && (
                              <div
                                style={{
                                  fontSize: '0.7rem',
                                  color: 'rgba(255, 255, 255, 0.72)',
                                  fontWeight: 500,
                                  marginTop: 1,
                                }}
                              >
                                {badge.sub}
                              </div>
                            )}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            )
          })}

          {/* ── Carousel Previous / Next Arrow Controls ── */}
          <button
            onClick={e => {
              e.stopPropagation()
              prevSlide()
            }}
            aria-label="Previous Banner"
            className="afi-hero-arrow afi-hero-arrow-prev"
            style={{
              position: 'absolute',
              left: 'clamp(0.75rem, 1.6vw, 1.5rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 'clamp(36px, 3.8vw, 46px)',
              height: 'clamp(36px, 3.8vw, 46px)',
              borderRadius: '50%',
              background: 'rgba(7, 21, 41, 0.65)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: `all 0.25s ${EASE}`,
              boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
            }}
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={e => {
              e.stopPropagation()
              nextSlide()
            }}
            aria-label="Next Banner"
            className="afi-hero-arrow afi-hero-arrow-next"
            style={{
              position: 'absolute',
              right: 'clamp(0.75rem, 1.6vw, 1.5rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 'clamp(36px, 3.8vw, 46px)',
              height: 'clamp(36px, 3.8vw, 46px)',
              borderRadius: '50%',
              background: 'rgba(7, 21, 41, 0.65)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: `all 0.25s ${EASE}`,
              boxShadow: '0 4px 18px rgba(0,0,0,0.3)',
            }}
          >
            <ChevronRight size={22} />
          </button>

          {/* ── Slide Indicator Dots / Navigation Pills ── */}
          <div
            style={{
              position: 'absolute',
              bottom: 'clamp(0.85rem, 1.8vw, 1.35rem)',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(7, 21, 41, 0.72)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              padding: '6px 14px',
              borderRadius: 100,
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.25)',
            }}
          >
            {BANNERS.map((banner, idx) => {
              const active = idx === currentIndex
              return (
                <button
                  key={banner.id}
                  onClick={e => {
                    e.stopPropagation()
                    setCurrentIndex(idx)
                  }}
                  aria-label={`Jump to ${banner.tag} slide`}
                  style={{
                    height: 7,
                    width: active ? 30 : 8,
                    borderRadius: 4,
                    background: active ? '#3B9EFF' : 'rgba(255, 255, 255, 0.45)',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: `all 0.35s ${EASE}`,
                  }}
                />
              )
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════════
            QUICK MULTI-INDUSTRY CATEGORY BAR
        ══════════════════════════════════════════ */}
        <div
          className="no-scrollbar"
          style={{
            marginTop: 'clamp(1rem, 2vw, 1.5rem)',
            overflowX: 'auto',
            paddingBottom: '0.25rem',
          }}
        >
          <div
            style={{
              display: 'flex',
              gap: '0.75rem',
              minWidth: 'max-content',
            }}
          >
            {CATEGORIES.map(cat => (
              <Link
                key={cat.label}
                to={cat.href}
                className="afi-hero-cat-chip"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.625rem 1rem',
                  background: 'white',
                  borderRadius: 14,
                  border: '1px solid rgba(10,22,40,0.08)',
                  boxShadow: '0 2px 8px rgba(10,22,40,0.04)',
                  textDecoration: 'none',
                  transition: `all 0.25s ${EASE}`,
                  flexShrink: 0,
                }}
              >
                <img
                  src={cat.img}
                  alt={cat.label}
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 9,
                    objectFit: 'cover',
                    flexShrink: 0,
                  }}
                />
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.75rem',
                      letterSpacing: '0.04em',
                      color: 'var(--color-navy)',
                      lineHeight: 1.1,
                    }}
                  >
                    {cat.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      color: 'var(--color-neutral-500)',
                      marginTop: 2,
                    }}
                  >
                    {cat.sub}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scoped Styles for Real Buttons & Controls ── */}
      <style>{`
        /* Primary Blue Button */
        .afi-hero-btn-blue {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: #1769E8;
          color: white;
          font-weight: 700;
          font-size: clamp(0.875rem, 1.1vw, 0.95rem);
          padding: 0.8125rem 1.625rem;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 4px 18px rgba(23, 105, 232, 0.45);
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          letter-spacing: -0.01em;
          border: 1px solid rgba(255, 255, 255, 0.25);
        }
        .afi-hero-btn-blue:hover {
          background: #1257C4;
          transform: translateY(-2px);
          box-shadow: 0 8px 26px rgba(23, 105, 232, 0.6);
        }
        .afi-hero-btn-blue:active {
          transform: translateY(0) scale(0.98);
        }

        /* Secondary Ghost Button */
        .afi-hero-btn-ghost {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(10, 28, 55, 0.65);
          color: white;
          font-weight: 600;
          font-size: clamp(0.875rem, 1.1vw, 0.95rem);
          padding: 0.8125rem 1.625rem;
          border-radius: 12px;
          text-decoration: none;
          border: 1.5px solid rgba(255, 255, 255, 0.35);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          letter-spacing: -0.01em;
        }
        .afi-hero-btn-ghost:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.7);
          transform: translateY(-2px);
        }
        .afi-hero-btn-ghost:active {
          transform: translateY(0) scale(0.98);
        }

        /* Arrow buttons hover */
        .afi-hero-arrow:hover {
          background: #1769E8 !important;
          border-color: rgba(255, 255, 255, 0.6) !important;
          transform: translateY(-50%) scale(1.08) !important;
          box-shadow: 0 6px 22px rgba(23, 105, 232, 0.5) !important;
        }
        .afi-hero-arrow:active {
          transform: translateY(-50%) scale(0.95) !important;
        }

        /* Category Chips Hover */
        .afi-hero-cat-chip:hover {
          transform: translateY(-2px);
          border-color: #1769E8;
          box-shadow: 0 6px 18px rgba(23, 105, 232, 0.14);
        }

        /* Mobile Layout */
        @media (max-width: 640px) {
          .afi-hero-banner-card {
            min-height: 480px !important;
          }
        }
      `}</style>
    </section>
  )
}
