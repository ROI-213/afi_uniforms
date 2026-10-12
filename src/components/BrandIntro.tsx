import { useRef, useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Package,
  Award,
  Truck,
  PenTool,
  ArrowRight,
  Play,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

interface CategorySlide {
  id: string
  image: string
  category: string
  subtitle: string
  badge: string
}

const CATEGORY_SLIDES: CategorySlide[] = [
  {
    id: 'mfg',
    image: '/mfg-production-line.jpg',
    category: 'Manufacturing & Plants',
    subtitle: 'Factory Stitching Line & Quality Check',
    badge: 'In-House Production',
  },
  {
    id: 'corporate',
    image: '/ind-corporate.jpg',
    category: 'Corporate & Executive',
    subtitle: 'Bespoke Blazers & Oxford Shirts',
    badge: 'Executive Line',
  },
  {
    id: 'healthcare',
    image: '/ind-healthcare.jpg',
    category: 'Healthcare & Hospitals',
    subtitle: 'Antimicrobial Scrubs & Lab Coats',
    badge: 'Clinical Grade',
  },
  {
    id: 'industrial',
    image: '/ind-industrial.jpg',
    category: 'Industrial & Safety',
    subtitle: 'Twill Jackets & Heavy Coveralls',
    badge: 'Heavy Industrial',
  },
  {
    id: 'hospitality',
    image: '/ind-hospitality.jpg',
    category: 'Hospitality & Hotels',
    subtitle: 'Front-Desk & Concierge Suiting',
    badge: 'Luxury Resort',
  },
  {
    id: 'chef',
    image: '/ind-chef.jpg',
    category: 'Food & Culinary',
    subtitle: 'Double-Breasted Chef Coats',
    badge: 'Culinary Master',
  },
  {
    id: 'construction',
    image: '/ind-construction.jpg',
    category: 'Construction & Infrastructure',
    subtitle: 'Reflective Safety & Field Utility',
    badge: 'Safety First',
  },
  {
    id: 'security',
    image: '/ind-security.jpg',
    category: 'Security & Facility',
    subtitle: 'Tactical Epaulet Shirts & Cargo',
    badge: 'Tactical Pro',
  },
  {
    id: 'education',
    image: '/ind-education.jpg',
    category: 'Education & Academics',
    subtitle: 'Institutional Crest Blazers & Staff',
    badge: 'Campus Standard',
  },
  {
    id: 'retail',
    image: '/ind-retail.jpg',
    category: 'Retail & Showrooms',
    subtitle: 'Active Shift Polos & Sales Staff',
    badge: 'Retail Fit',
  },
]

const PROCESS_STEPS = [
  {
    id: 'fabrics',
    title: 'Premium Fabrics',
    image: '/brand-fabric-macro.jpg',
    alt: 'Premium textile fabric weaves for uniforms',
  },
  {
    id: 'patterns',
    title: 'Custom Patterns',
    image: '/mfg-custom-patterns.jpg',
    alt: 'Technical pattern drafting and garment architectural design',
  },
  {
    id: 'stitching',
    title: 'Skilled Stitching',
    image: '/brand-stitching.jpg',
    alt: 'Precision sewing machine stitching and reinforced seams',
  },
  {
    id: 'finished',
    title: 'Finished Uniforms',
    image: '/brand-scrubs-rail.jpg',
    alt: 'Finished professional uniforms ready for enterprise dispatch',
  },
]

const STAT_BADGES = [
  {
    icon: Package,
    title: '10,000+',
    sub: 'Units/Month',
  },
  {
    icon: Award,
    title: 'ISO Certified',
    sub: 'Quality Process',
  },
  {
    icon: Truck,
    title: 'Pan India',
    sub: 'Delivery',
  },
  {
    icon: PenTool,
    title: 'Custom Branding',
    sub: '& Embroidery',
  },
]

export default function BrandIntro() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [slideIndex, setSlideIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStartX = useRef<number | null>(null)
  const timerRef = useRef<number | null>(null)

  const nextSlide = useCallback(() => {
    setSlideIndex(prev => (prev + 1) % CATEGORY_SLIDES.length)
  }, [])

  const prevSlide = useCallback(() => {
    setSlideIndex(prev => (prev - 1 + CATEGORY_SLIDES.length) % CATEGORY_SLIDES.length)
  }, [])

  // Auto-slide every 3.2 seconds
  useEffect(() => {
    if (isPaused) return
    timerRef.current = window.setInterval(nextSlide, 3200)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [nextSlide, isPaused])

  // Scroll reveal
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
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Touch handling
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

  const currentSlide = CATEGORY_SLIDES[slideIndex]

  return (
    <section
      ref={sectionRef}
      aria-labelledby="mfg-excellence-heading"
      style={{
        padding: 'clamp(3rem, 5.5vw, 5.5rem) 0',
        background: '#F8FAFC',
        position: 'relative',
      }}
    >
      <div className="container-site">
        {/* ══════════════════════════════════════════
            MAIN MANUFACTURING EXCELLENCE CARD (Curved Edges)
        ══════════════════════════════════════════ */}
        <div
          className="mfg-excellence-card"
          style={{
            background: 'white',
            borderRadius: 'clamp(20px, 2.6vw, 32px)',
            overflow: 'hidden',
            boxShadow: '0 24px 64px -18px rgba(10, 25, 50, 0.12), 0 4px 20px rgba(10, 25, 50, 0.04)',
            border: '1px solid rgba(10, 25, 50, 0.07)',
            display: 'grid',
            gridTemplateColumns: '1fr',
            position: 'relative',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.75s ${EASE}, transform 0.75s ${EASE}`,
          }}
        >
          {/* Split 2-Column Grid */}
          <div className="mfg-grid-layout">
            {/* ── LEFT COLUMN: Sliding Category Product Images Gallery ── */}
            <div
              className="mfg-media-col"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {/* Category Product Image Slides Stack */}
              <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 480 }}>
                {CATEGORY_SLIDES.map((slide, idx) => {
                  const isActive = idx === slideIndex
                  return (
                    <div
                      key={slide.id}
                      aria-hidden={!isActive}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        opacity: isActive ? 1 : 0,
                        visibility: isActive ? 'visible' : 'hidden',
                        transform: isActive ? 'scale(1)' : 'scale(1.04)',
                        transition: `opacity 0.7s ${EASE}, transform 1.2s ${EASE}, visibility 0.7s`,
                        pointerEvents: isActive ? 'auto' : 'none',
                      }}
                    >
                      <img
                        src={slide.image}
                        alt={`${slide.category} — ${slide.subtitle}`}
                        className="mfg-hero-photo"
                        loading={idx === 0 ? 'eager' : 'lazy'}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Gradient Vignette over images */}
              <div
                className="mfg-media-overlay"
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, rgba(7, 21, 41, 0.25) 0%, rgba(7, 21, 41, 0.05) 40%, rgba(7, 21, 41, 0.75) 100%)',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              />

              {/* ── Category Pill Badge (Top Left of Image) ── */}
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(1rem, 2vw, 1.5rem)',
                  left: 'clamp(1rem, 2vw, 1.5rem)',
                  zIndex: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  background: 'rgba(7, 21, 41, 0.82)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  borderRadius: 100,
                  padding: '0.4rem 0.95rem 0.4rem 0.75rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                  transition: `all 0.3s ${EASE}`,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#3B9EFF',
                    boxShadow: '0 0 8px #3B9EFF',
                  }}
                />
                <span
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.78rem',
                    color: 'white',
                    letterSpacing: '0.02em',
                  }}
                >
                  {currentSlide.category}
                </span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    color: 'rgba(255, 255, 255, 0.75)',
                    fontWeight: 600,
                  }}
                >
                  • {currentSlide.badge}
                </span>
              </div>

              {/* ── Slide Progress Counter / Indicator (Top Right of Image) ── */}
              <div
                style={{
                  position: 'absolute',
                  top: 'clamp(1rem, 2vw, 1.5rem)',
                  right: 'clamp(1rem, 2vw, 1.5rem)',
                  zIndex: 6,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: 'rgba(7, 21, 41, 0.82)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 100,
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  color: '#60C4FF',
                  fontFamily: 'var(--font-display)',
                  letterSpacing: '0.05em',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.35)',
                }}
              >
                <span>{String(slideIndex + 1).padStart(2, '0')}</span>
                <span style={{ opacity: 0.5 }}>/</span>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {String(CATEGORY_SLIDES.length).padStart(2, '0')}
                </span>
              </div>

              {/* ── Slide Navigation Arrows (Prev / Next) ── */}
              <button
                onClick={e => {
                  e.stopPropagation()
                  prevSlide()
                }}
                aria-label="Previous Category Image"
                className="mfg-slider-arrow mfg-slider-arrow-prev"
                style={{
                  position: 'absolute',
                  left: 'clamp(0.75rem, 1.5vw, 1.25rem)',
                  top: '46%',
                  transform: 'translateY(-50%)',
                  zIndex: 6,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(7, 21, 41, 0.65)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: `all 0.25s ${EASE}`,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                }}
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={e => {
                  e.stopPropagation()
                  nextSlide()
                }}
                aria-label="Next Category Image"
                className="mfg-slider-arrow mfg-slider-arrow-next"
                style={{
                  position: 'absolute',
                  right: 'clamp(0.75rem, 1.5vw, 1.25rem)',
                  top: '46%',
                  transform: 'translateY(-50%)',
                  zIndex: 6,
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: 'rgba(7, 21, 41, 0.65)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: `all 0.25s ${EASE}`,
                  boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
                }}
              >
                <ChevronRight size={20} />
              </button>

              {/* ── Floating Stats Strip (Bottom Left of Media Col) ── */}
              <div className="mfg-stats-strip">
                {STAT_BADGES.map(stat => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.title} className="mfg-stat-item">
                      <div className="mfg-stat-icon-wrap">
                        <Icon size={16} />
                      </div>
                      <div>
                        <div className="mfg-stat-title">{stat.title}</div>
                        <div className="mfg-stat-sub">{stat.sub}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* ── RIGHT COLUMN: Content, Process Cards & Dual CTA ── */}
            <div className="mfg-content-col">
              {/* Top ambient soft radial glow */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '-15%',
                  right: '-15%',
                  width: '320px',
                  height: '320px',
                  background: 'radial-gradient(circle, rgba(23, 105, 232, 0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              {/* Eyebrow */}
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '1rem',
                }}
              >
                <span
                  style={{
                    width: 28,
                    height: 2,
                    background: '#1769E8',
                    borderRadius: 2,
                  }}
                />
                <span
                  style={{
                    fontSize: 'clamp(0.72rem, 0.9vw, 0.8125rem)',
                    fontWeight: 800,
                    letterSpacing: '0.14em',
                    color: '#1769E8',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  UNIFORM MANUFACTURING EXCELLENCE
                </span>
              </div>

              {/* Headline */}
              <h2
                id="mfg-excellence-heading"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(2.1rem, 3.6vw, 3.35rem)',
                  lineHeight: 1.08,
                  letterSpacing: '-0.035em',
                  color: 'var(--color-navy)',
                  marginBottom: '1.25rem',
                }}
              >
                Engineered workwear
                <br />
                for <span style={{ color: '#1769E8' }}>every industry,</span>
                <br />
                role and workplace.
              </h2>

              {/* Paragraph */}
              <p
                style={{
                  fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)',
                  lineHeight: 1.65,
                  color: 'var(--color-neutral-600)',
                  marginBottom: '2rem',
                  maxWidth: 540,
                }}
              >
                AFI Uniforms manufactures high-quality, customized uniforms for corporate,
                industrial, healthcare, hospitality, education and more. With modern
                infrastructure and skilled craftsmanship, we deliver consistent quality at
                scale.
              </p>

              {/* ── 4 Process Thumbnail Cards ── */}
              <div className="mfg-process-grid">
                {PROCESS_STEPS.map(step => (
                  <div key={step.id} className="mfg-process-card">
                    <div className="mfg-process-img-wrap">
                      <img
                        src={step.image}
                        alt={step.alt}
                        loading="lazy"
                        className="mfg-process-img"
                      />
                    </div>
                    <div className="mfg-process-label">{step.title}</div>
                  </div>
                ))}
              </div>

              {/* ── Action Buttons ── */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '1rem',
                }}
              >
                {/* Primary Button */}
                <Link to="/shop" className="mfg-cta-primary">
                  <span>Explore Manufacturing</span>
                  <ArrowRight size={16} />
                </Link>

                {/* Secondary Pill Button with Play Icon */}
                <Link to="/bulk-orders" className="mfg-cta-secondary">
                  <div className="mfg-play-circle">
                    <Play size={13} fill="#1769E8" style={{ color: '#1769E8', marginLeft: 2 }} />
                  </div>
                  <span>Custom &amp; Bulk Inquiry</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Component Styles ── */}
      <style>{`
        /* Main Grid Split */
        .mfg-grid-layout {
          display: grid;
          grid-template-columns: 50% 50%;
          min-height: 520px;
        }

        /* Left Media Column */
        .mfg-media-col {
          position: relative;
          overflow: hidden;
          background: #081629;
          min-height: 480px;
        }
        .mfg-hero-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
        }

        /* Slider Arrows Hover */
        .mfg-slider-arrow:hover {
          background: #1769E8 !important;
          border-color: rgba(255, 255, 255, 0.6) !important;
          transform: translateY(-50%) scale(1.1) !important;
          box-shadow: 0 6px 20px rgba(23, 105, 232, 0.45) !important;
        }
        .mfg-slider-arrow:active {
          transform: translateY(-50%) scale(0.95) !important;
        }

        /* Floating Stats Strip */
        .mfg-stats-strip {
          position: absolute;
          bottom: clamp(1rem, 2vw, 1.5rem);
          left: clamp(1rem, 2vw, 1.5rem);
          right: clamp(1rem, 2vw, 1.5rem);
          background: rgba(7, 21, 41, 0.90);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.16);
          padding: 0.875rem 1.15rem;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.75rem;
          box-shadow: 0 12px 36px rgba(0, 0, 0, 0.3);
          z-index: 5;
        }
        .mfg-stat-item {
          display: flex;
          align-items: center;
          gap: 0.625rem;
        }
        .mfg-stat-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: #1769E8;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
          box-shadow: 0 4px 10px rgba(23, 105, 232, 0.4);
        }
        .mfg-stat-title {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 0.8125rem;
          color: white;
          line-height: 1.15;
          letter-spacing: -0.01em;
          white-space: nowrap;
        }
        .mfg-stat-sub {
          font-size: 0.6875rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 500;
          line-height: 1.2;
          margin-top: 1px;
          white-space: nowrap;
        }

        /* Right Content Column */
        .mfg-content-col {
          position: relative;
          padding: clamp(2rem, 4vw, 3.75rem) clamp(1.75rem, 3.5vw, 3.5rem);
          display: flex;
          flex-direction: column;
          justify-content: center;
          background: white;
        }

        /* 4 Process Cards */
        .mfg-process-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0.875rem;
          margin-bottom: 2.25rem;
        }
        .mfg-process-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .mfg-process-img-wrap {
          width: 100%;
          height: 82px;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(10, 22, 40, 0.08);
          background: #F1F5F9;
          box-shadow: 0 2px 8px rgba(10, 22, 40, 0.04);
        }
        .mfg-process-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .mfg-process-card:hover .mfg-process-img {
          transform: scale(1.08);
        }
        .mfg-process-label {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 0.75rem;
          color: var(--color-navy);
          text-align: center;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        /* Buttons */
        .mfg-cta-primary {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          background: #1769E8;
          color: white;
          font-weight: 700;
          font-size: clamp(0.875rem, 1.05vw, 0.95rem);
          padding: 0.875rem 1.75rem;
          border-radius: 12px;
          text-decoration: none;
          box-shadow: 0 6px 20px rgba(23, 105, 232, 0.38);
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          letter-spacing: -0.01em;
        }
        .mfg-cta-primary:hover {
          background: #1157C4;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(23, 105, 232, 0.48);
        }
        .mfg-cta-primary:active {
          transform: translateY(0) scale(0.98);
        }

        .mfg-cta-secondary {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          background: white;
          color: var(--color-navy);
          font-weight: 700;
          font-size: clamp(0.875rem, 1.05vw, 0.95rem);
          padding: 0.75rem 1.5rem;
          border-radius: 100px;
          text-decoration: none;
          border: 1.5px solid #E2E8F0;
          box-shadow: 0 2px 10px rgba(10, 22, 40, 0.04);
          transition: all 0.25s cubic-bezier(0.22, 1, 0.36, 1);
          letter-spacing: -0.01em;
        }
        .mfg-play-circle {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(23, 105, 232, 0.1);
          border: 1.5px solid #1769E8;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.25s ease;
        }
        .mfg-cta-secondary:hover {
          border-color: #1769E8;
          color: #1769E8;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(23, 105, 232, 0.12);
        }
        .mfg-cta-secondary:hover .mfg-play-circle {
          background: #1769E8;
        }
        .mfg-cta-secondary:hover .mfg-play-circle svg {
          fill: white !important;
          color: white !important;
        }
        .mfg-cta-secondary:active {
          transform: translateY(0) scale(0.98);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .mfg-grid-layout {
            grid-template-columns: 1fr;
          }
          .mfg-media-col {
            min-height: 400px;
          }
          .mfg-stats-strip {
            grid-template-columns: repeat(2, 1fr);
            gap: 1rem;
          }
        }

        @media (max-width: 640px) {
          .mfg-stats-strip {
            position: static;
            border-radius: 0;
            grid-template-columns: repeat(2, 1fr);
            border-left: none;
            border-right: none;
            border-bottom: none;
          }
          .mfg-process-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }
        }
      `}</style>
    </section>
  )
}
