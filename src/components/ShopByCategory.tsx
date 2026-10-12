/**
 * ShopByCategory — Clean, bright category card grid matching AFI brand reference
 *
 * Rebuilt to match the modern light card UI:
 * - Eyebrow: "UNIFORMS FOR EVERY INDUSTRY" with blue line
 * - Title: "Shop by Category" (with bright royal blue accent)
 * - Subtitle with clear typography
 * - Filter pills: All, Corporate & Service, Industrial & Safety, Institutional, Healthcare, Hospitality
 * - Top-right "View All Categories ->" button
 * - Cards: White background, category icon in light-blue badge, title, subtitle, count ("68+ Styles Available"),
 *          right photo with soft white feather gradient, and royal blue circular arrow button.
 */

import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Stethoscope,
  Briefcase,
  HardHat,
  ConciergeBell,
  GraduationCap,
  ShieldCheck,
  ShoppingBag,
  Hammer,
  UtensilsCrossed,
  Truck,
  type LucideIcon,
} from 'lucide-react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export type CategoryFilter =
  | 'All'
  | 'Corporate & Service'
  | 'Industrial & Safety'
  | 'Institutional'
  | 'Healthcare'
  | 'Hospitality'

export const FILTERS: CategoryFilter[] = [
  'All',
  'Corporate & Service',
  'Industrial & Safety',
  'Institutional',
  'Healthcare',
  'Hospitality',
]

export interface CategoryItem {
  id: string
  title: string
  desc: string
  count: string
  img: string
  href: string
  icon: LucideIcon
  groups: CategoryFilter[]
  isPrimary?: boolean
}

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'healthcare',
    title: 'Healthcare Uniforms',
    desc: 'Scrubs, lab coats, patient wear, and hospital uniforms.',
    count: '68+',
    img: '/products/women/scrubs/scrubs-prod-1.jpg',
    href: '/collections/scrubs',
    icon: Stethoscope,
    groups: ['All', 'Healthcare', 'Institutional'],
    isPrimary: true,
  },
  {
    id: 'corporate',
    title: 'Corporate Uniforms',
    desc: 'Executive blazers, shirts, trousers and formal wear.',
    count: '54+',
    img: '/products/women/corp/corp-prod-1.jpg',
    href: '/shop?category=corporate',
    icon: Briefcase,
    groups: ['All', 'Corporate & Service'],
    isPrimary: true,
  },
  {
    id: 'industrial',
    title: 'Industrial Workwear',
    desc: 'Heavy-duty uniforms, jackets, coveralls and safety wear.',
    count: '58+',
    img: '/products/women/ind/ind-prod-2.jpg',
    href: '/shop?category=industrial',
    icon: HardHat,
    groups: ['All', 'Industrial & Safety'],
    isPrimary: true,
  },
  {
    id: 'hospitality',
    title: 'Hospitality Uniforms',
    desc: 'Hotel, restaurant, catering and front-office uniforms.',
    count: '46+',
    img: '/products/women/hosp/hosp-prod-1.jpg',
    href: '/shop?category=hospitality',
    icon: ConciergeBell,
    groups: ['All', 'Hospitality', 'Corporate & Service'],
    isPrimary: true,
  },
  {
    id: 'education',
    title: 'School & College Uniforms',
    desc: 'School uniforms, college blazers, sports wear and accessories.',
    count: '48+',
    img: '/products/women/edu/edu-prod-1.jpg',
    href: '/shop?category=education',
    icon: GraduationCap,
    groups: ['All', 'Institutional'],
    isPrimary: true,
  },
  {
    id: 'security',
    title: 'Security Uniforms',
    desc: 'Guard uniforms, tactical shirts, trousers and accessories.',
    count: '34+',
    img: '/products/women/ind/ind-prod-3.jpg',
    href: '/shop?category=security',
    icon: ShieldCheck,
    groups: ['All', 'Industrial & Safety'],
    isPrimary: true,
  },
  {
    id: 'retail',
    title: 'Retail Uniforms',
    desc: 'Branded showroom polos, aprons and active floor staff wear.',
    count: '40+',
    img: '/products/women/corp/corp-prod-2.jpg',
    href: '/shop?category=corporate',
    icon: ShoppingBag,
    groups: ['Corporate & Service'],
  },
  {
    id: 'construction',
    title: 'Construction Workwear',
    desc: 'Hi-vis reflective jackets, field engineer coats and cargo gear.',
    count: '36+',
    img: '/products/women/ind/ind-prod-4.jpg',
    href: '/shop?category=industrial',
    icon: Hammer,
    groups: ['Industrial & Safety'],
  },
  {
    id: 'chef',
    title: 'Chef & Culinary',
    desc: 'Double-breasted chef coats, kitchen aprons and culinary wear.',
    count: '38+',
    img: '/products/women/hosp/hosp-prod-3.jpg',
    href: '/shop?category=chef',
    icon: UtensilsCrossed,
    groups: ['Hospitality', 'Corporate & Service'],
  },
  {
    id: 'institutional',
    title: 'Institutional & Fleets',
    desc: 'Bespoke OEM volume production for enterprise fleets and campuses.',
    count: '75+',
    img: '/products/women/edu/edu-prod-5.jpg',
    href: '/bulk-orders',
    icon: Truck,
    groups: ['Institutional'],
  },
]

export default function ShopByCategory() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All')

  // Reveal animation on scroll
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Filter categories
  const filteredCategories =
    activeFilter === 'All'
      ? CATEGORIES.filter(c => c.isPrimary) // 6 primary cards matching reference image
      : CATEGORIES.filter(c => c.groups.includes(activeFilter))

  return (
    <section
      ref={sectionRef}
      aria-labelledby="sbc-heading"
      style={{
        padding: 'clamp(3.5rem, 6vw, 6rem) 0',
        background: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-site">
        {/* ══════════════════════════════════════════
            HEADER ROW: Title, Subtitle & Filter Pills
        ══════════════════════════════════════════ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: 'clamp(2rem, 3.5vw, 3rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: `opacity 0.7s ${EASE}, transform 0.7s ${EASE}`,
          }}
        >
          {/* Left: Eyebrow + Heading + Subtitle */}
          <div style={{ maxWidth: 580 }}>
            {/* Eyebrow */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.65rem',
                marginBottom: '0.85rem',
              }}
            >
              <span
                style={{
                  width: 28,
                  height: 2.5,
                  background: '#1E6BF2',
                  borderRadius: 2,
                }}
              />
              <span
                style={{
                  fontSize: '0.8125rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  color: '#1E6BF2',
                  textTransform: 'uppercase',
                  fontFamily: 'var(--font-sans)',
                }}
              >
                UNIFORMS FOR EVERY INDUSTRY
              </span>
            </div>

            {/* Main Headline */}
            <h2
              id="sbc-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.2rem, 4vw, 3.5rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.035em',
                color: '#0A1932',
                marginBottom: '0.875rem',
              }}
            >
              Shop by <span style={{ color: '#1E6BF2' }}>Category</span>
            </h2>

            {/* Subtitle */}
            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.05vw, 1rem)',
                lineHeight: 1.6,
                color: '#64748B',
                margin: 0,
              }}
            >
              Purpose-built professional uniforms for corporate offices, industrial
              plants, luxury hospitality, healthcare, education, and security teams.
            </p>
          </div>

          {/* Right: Filter Pills + View All Categories Button */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'flex-start',
            }}
          >
            {/* Filter Tabs */}
            {FILTERS.map(filter => {
              const isActive = activeFilter === filter
              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  style={{
                    padding: '0.5rem 1.125rem',
                    borderRadius: 100,
                    fontSize: '0.8125rem',
                    fontWeight: isActive ? 700 : 600,
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    background: isActive ? '#0A1932' : '#FFFFFF',
                    color: isActive ? '#FFFFFF' : '#334155',
                    border: `1px solid ${isActive ? '#0A1932' : '#E2E8F0'}`,
                    boxShadow: isActive ? '0 4px 12px rgba(10, 25, 50, 0.2)' : 'none',
                    transition: `all 0.2s ${EASE}`,
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = '#CBD5E1'
                      e.currentTarget.style.background = '#F8FAFC'
                    }
                  }}
                  onMouseLeave={e => {
                    if (!isActive) {
                      e.currentTarget.style.borderColor = '#E2E8F0'
                      e.currentTarget.style.background = '#FFFFFF'
                    }
                  }}
                >
                  {filter}
                </button>
              )
            })}

            {/* View All Categories Link */}
            <Link
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: '#0A1932',
                color: '#FFFFFF',
                fontSize: '0.8125rem',
                fontWeight: 700,
                padding: '0.55rem 1.25rem',
                borderRadius: 100,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(10, 25, 50, 0.22)',
                transition: `all 0.22s ${EASE}`,
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#152B4D'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#0A1932'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              <span>View All Categories</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            GRID OF CATEGORY CARDS (Matches Image 2)
        ══════════════════════════════════════════ */}
        <div
          className="sbc-cards-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(1rem, 1.6vw, 1.5rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.75s ${EASE} 0.1s, transform 0.75s ${EASE} 0.1s`,
          }}
        >
          {filteredCategories.map((cat, index) => {
            const Icon = cat.icon
            return (
              <Link
                key={cat.id}
                to={cat.href}
                className="sbc-card-link"
                style={{
                  textDecoration: 'none',
                  display: 'block',
                  color: 'inherit',
                }}
              >
                <div
                  className="sbc-card-item"
                  style={{
                    position: 'relative',
                    background: '#FFFFFF',
                    borderRadius: 'clamp(18px, 1.8vw, 24px)',
                    border: '1px solid #E8EEF5',
                    boxShadow: '0 4px 20px rgba(10, 25, 50, 0.05)',
                    overflow: 'hidden',
                    minHeight: 250,
                    display: 'grid',
                    gridTemplateColumns: '52% 48%',
                    transition: `transform 0.3s ${EASE}, box-shadow 0.3s ${EASE}, border-color 0.3s ease`,
                  }}
                >
                  {/* ── Left Content (Text, Icon, Count) ── */}
                  <div
                    className="sbc-card-content"
                    style={{
                      position: 'relative',
                      zIndex: 2,
                      padding: 'clamp(1.2rem, 1.6vw, 1.55rem)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: '#FFFFFF',
                      height: '100%',
                    }}
                  >
                    <div>
                      {/* Category Icon Badge */}
                      <div
                        style={{
                          width: 42,
                          height: 42,
                          borderRadius: 12,
                          background: '#EFF6FF',
                          border: '1px solid rgba(30, 107, 242, 0.14)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#1E6BF2',
                          boxShadow: '0 2px 8px rgba(30, 107, 242, 0.08)',
                        }}
                      >
                        <Icon size={21} strokeWidth={2} />
                      </div>

                      {/* Card Title */}
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: 'clamp(1.15rem, 1.35vw, 1.35rem)',
                          lineHeight: 1.18,
                          letterSpacing: '-0.025em',
                          color: '#0A1932',
                          marginTop: '0.95rem',
                          marginBottom: '0.45rem',
                        }}
                      >
                        {cat.title}
                      </h3>

                      {/* Card Description */}
                      <p
                        style={{
                          fontSize: 'clamp(0.78rem, 0.88vw, 0.84rem)',
                          lineHeight: 1.45,
                          color: '#64748B',
                          margin: 0,
                          maxWidth: 240,
                        }}
                      >
                        {cat.desc}
                      </p>
                    </div>

                    {/* Style Count (Bottom-Left) */}
                    <div
                      style={{
                        marginTop: '1.25rem',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: '0.35rem',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 900,
                          fontSize: '1.25rem',
                          color: '#1E6BF2',
                          letterSpacing: '-0.02em',
                        }}
                      >
                        {cat.count}
                      </span>
                      <span
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          color: '#64748B',
                        }}
                      >
                        Styles Available
                      </span>
                    </div>
                  </div>

                  {/* ── Right Image Section (100% Crisp, No White Overlay) ── */}
                  <div
                    className="sbc-card-image-wrap"
                    style={{
                      position: 'relative',
                      width: '100%',
                      height: '100%',
                      overflow: 'hidden',
                      zIndex: 1,
                    }}
                  >
                    <img
                      src={cat.img}
                      alt={cat.title}
                      loading={index < 3 ? 'eager' : 'lazy'}
                      className="sbc-card-img"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                        transition: `transform 0.6s ${EASE}`,
                      }}
                    />
                  </div>

                  {/* ── Circular Blue Action Arrow (Bottom-Right) ── */}
                  <div
                    className="sbc-action-btn"
                    style={{
                      position: 'absolute',
                      bottom: 'clamp(1rem, 1.5vw, 1.25rem)',
                      right: 'clamp(1rem, 1.5vw, 1.25rem)',
                      zIndex: 4,
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: '#1E6BF2',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 4px 14px rgba(30, 107, 242, 0.38)',
                      transition: `transform 0.25s ${EASE}, background 0.25s ease, box-shadow 0.25s ease`,
                    }}
                  >
                    <ArrowRight size={17} strokeWidth={2.4} color="white" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>

      {/* ── Component Styles ── */}
      <style>{`
        /* Hover Effects for Cards */
        .sbc-card-item:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px -8px rgba(10, 25, 50, 0.12), 0 4px 16px rgba(10, 25, 50, 0.04) !important;
          border-color: #D1DDEB !important;
        }

        .sbc-card-item:hover .sbc-card-img {
          transform: scale(1.06);
        }

        .sbc-card-item:hover .sbc-action-btn {
          background: #1156CB !important;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(30, 107, 242, 0.52) !important;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .sbc-cards-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 680px) {
          .sbc-cards-grid {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .sbc-card-item {
            grid-template-columns: 55% 45% !important;
          }
        }
      `}</style>
    </section>
  )
}
