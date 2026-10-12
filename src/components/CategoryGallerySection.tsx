/**
 * CategoryGallerySection — Dedicated Category Showcase displaying 4 curated product images per category
 * All images are local, non-Unsplash assets.
 */

import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Stethoscope,
  Briefcase,
  HardHat,
  ConciergeBell,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from 'lucide-react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

interface CategoryProduct {
  id: string
  title: string
  spec: string
  badge: string
  image: string
  price: string
  href: string
}

interface CategoryGroup {
  id: string
  label: string
  icon: typeof Stethoscope
  tagline: string
  desc: string
  products: CategoryProduct[]
}

const CATEGORY_GROUPS: CategoryGroup[] = [
  {
    id: 'healthcare',
    label: 'Healthcare',
    icon: Stethoscope,
    tagline: 'CLINICAL & MEDICAL EXCELLENCE',
    desc: 'Engineered antimicrobial scrubs, lab coats, and hospital kits designed for high-stress medical environments.',
    products: [
      {
        id: 'hc-1',
        title: "Women's ComfortFit Scrub Set",
        spec: '4-Way Stretch, Antimicrobial Weave',
        badge: 'Top Rated',
        image: '/cat-womens-scrubs.jpg',
        price: '₹1,499',
        href: '/collections/scrubs',
      },
      {
        id: 'hc-2',
        title: 'Executive Consultation Lab Coat',
        spec: 'Fluid-Resistant, Teflon Stain Release',
        badge: 'Hospital Standard',
        image: '/cat-lab-coats.jpg',
        price: '₹1,299',
        href: '/collections/scrubs',
      },
      {
        id: 'hc-3',
        title: 'Sterile OT & Surgical Scrub Set',
        spec: 'Autoclave Safe, Lint-Free Finish',
        badge: 'Surgical Grade',
        image: '/cat-surgical-wear.jpg',
        price: '₹1,699',
        href: '/collections/scrubs',
      },
      {
        id: 'hc-4',
        title: "Men's Athletic Motion Scrub Set",
        spec: 'Moisture-Wicking & Breathable Poly-Cotton',
        badge: 'All-Day Wear',
        image: '/cat-mens-scrubs.jpg',
        price: '₹1,499',
        href: '/collections/scrubs',
      },
    ],
  },
  {
    id: 'corporate',
    label: 'Corporate',
    icon: Briefcase,
    tagline: 'EXECUTIVE & FORMAL APPAREL',
    desc: 'Bespoke corporate suiting, crisp formal shirts, and tailored trousers that reinforce enterprise brand identity.',
    products: [
      {
        id: 'cp-1',
        title: 'Executive Tailored Navy Blazer',
        spec: 'Italian Cut, Wrinkle-Resistant Poly-Wool',
        badge: 'Executive Line',
        image: '/cat-corp-blazer.jpg',
        price: '₹2,899',
        href: '/shop?category=corporate',
      },
      {
        id: 'cp-2',
        title: 'Crisp Oxford Button-Down Shirt',
        spec: '100% Combed Compact Cotton, Easy-Iron',
        badge: 'Bestseller',
        image: '/cat-corp-shirt.jpg',
        price: '₹999',
        href: '/shop?category=corporate',
      },
      {
        id: 'cp-3',
        title: 'Charcoal Pleated Formal Trousers',
        spec: 'Reinforced Pockets & Stretch Waistband',
        badge: 'Daily Fit',
        image: '/cat-corp-trouser.jpg',
        price: '₹1,199',
        href: '/shop?category=corporate',
      },
      {
        id: 'cp-4',
        title: 'Tailored Business Formal Vest',
        spec: 'Satin Back Lining, Adjustable Buckle',
        badge: 'Premium Finish',
        image: '/cat-corp-vest.jpg',
        price: '₹1,399',
        href: '/shop?category=corporate',
      },
    ],
  },
  {
    id: 'industrial',
    label: 'Industrial & Safety',
    icon: HardHat,
    tagline: 'HEAVY INDUSTRIAL & PLANT SAFETY',
    desc: 'Heavy-duty coveralls, reflective safety jackets, and protective garments certified for manufacturing plants.',
    products: [
      {
        id: 'ind-1',
        title: 'Heavy Duty Boiler Suit Coverall',
        spec: 'Flame Retardant, High-Tear Strength Twill',
        badge: 'Industrial Pro',
        image: '/cat-ind-coverall.jpg',
        price: '₹2,199',
        href: '/shop?category=industrial',
      },
      {
        id: 'ind-2',
        title: 'Plant Technician Utility Uniform',
        spec: 'Double-Seam Stitching, Brass Hardware',
        badge: 'Plant Standard',
        image: '/ind-industrial.jpg',
        price: '₹1,699',
        href: '/shop?category=industrial',
      },
      {
        id: 'ind-3',
        title: 'Field Safety Hi-Vis Utility Suit',
        spec: '3M Reflective Striping, EN ISO 20471',
        badge: 'Hi-Vis Safety',
        image: '/ind-construction.jpg',
        price: '₹1,899',
        href: '/shop?category=industrial',
      },
      {
        id: 'ind-4',
        title: 'Heavy Logistics & Fleet Workwear',
        spec: 'Abrasion-Resistant Elbow & Knee Panels',
        badge: 'Heavy Utility',
        image: '/ind-logistics.jpg',
        price: '₹1,599',
        href: '/shop?category=industrial',
      },
    ],
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    icon: ConciergeBell,
    tagline: 'LUXURY RESORTS & FRONT-OFFICE',
    desc: 'Impeccable front-desk suits, concierge blazers, and service team uniforms that elevate guest experiences.',
    products: [
      {
        id: 'hsp-1',
        title: 'Front-Desk Concierge Suiting',
        spec: 'Luxury Matty Weave, Stain-Guarded',
        badge: '5-Star Standard',
        image: '/ind-hospitality.jpg',
        price: '₹2,699',
        href: '/shop?category=hospitality',
      },
      {
        id: 'hsp-2',
        title: 'Master Executive Chef Coat',
        spec: 'Double-Breasted, Heat-Shield Fabric',
        badge: 'Culinary Master',
        image: '/ind-chef.jpg',
        price: '₹1,499',
        href: '/shop?category=chef',
      },
      {
        id: 'hsp-3',
        title: 'Banquet & F&B Service Suit',
        spec: 'Spill-Resistant Micro-Poly Blend',
        badge: 'Banquet Pro',
        image: '/bs-prod-3.jpg',
        price: '₹1,899',
        href: '/shop?category=hospitality',
      },
      {
        id: 'hsp-4',
        title: 'Front Office Hospitality Blazer',
        spec: 'Breathable Lining with Logo Embroidery',
        badge: 'Guest Ready',
        image: '/hero-bg-2.jpg',
        price: '₹2,499',
        href: '/shop?category=hospitality',
      },
    ],
  },
  {
    id: 'security',
    label: 'Security & Tactical',
    icon: ShieldCheck,
    tagline: 'COMMANDING SECURITY & FACILITY',
    desc: 'Rigorous tactical epaulet shirts, security blazers, and durable duty cargo uniforms for private security firms.',
    products: [
      {
        id: 'sec-1',
        title: 'Commanding Epaulet Guard Shirt',
        spec: 'Reinforced Epaulets, Badge Loops & Pleats',
        badge: 'Tactical Standard',
        image: '/ind-security.jpg',
        price: '₹1,099',
        href: '/shop?category=security',
      },
      {
        id: 'sec-2',
        title: 'Tactical Facility Officer Uniform',
        spec: 'Heavy Ripstop Twill, Anti-Tear Fabric',
        badge: 'Security Pro',
        image: '/hero-multi-industry.jpg',
        price: '₹1,799',
        href: '/shop?category=security',
      },
      {
        id: 'sec-3',
        title: 'Executive Security Suiting Blazer',
        spec: 'Concealed Radio Pockets & Mic Tabs',
        badge: 'VIP Protection',
        image: '/ind-corporate.jpg',
        price: '₹2,799',
        href: '/shop?category=security',
      },
      {
        id: 'sec-4',
        title: 'All-Weather Tactical Duty Cargo',
        spec: '8 Pocket Utility Design, Bar-Tacked Stress Points',
        badge: 'Heavy Duty',
        image: '/bs-prod-1.jpg',
        price: '₹1,399',
        href: '/shop?category=security',
      },
    ],
  },
  {
    id: 'education',
    label: 'School & College',
    icon: GraduationCap,
    tagline: 'INSTITUTIONAL & ACADEMIC CRITERIA',
    desc: 'Durable, colorfast school uniforms, crest blazers, and college campus wear tailored for academic prestige.',
    products: [
      {
        id: 'edu-1',
        title: 'Institutional Crest School Blazer',
        spec: 'Gold Button Accents & Embroidered Crest',
        badge: 'Campus Standard',
        image: '/ind-education.jpg',
        price: '₹1,899',
        href: '/shop?category=education',
      },
      {
        id: 'edu-2',
        title: 'Senior Faculty Formal Suiting',
        spec: 'Crease-Free Poly-Cotton with Soft Lining',
        badge: 'Faculty Series',
        image: '/brand-duo.jpg',
        price: '₹2,299',
        href: '/shop?category=education',
      },
      {
        id: 'edu-3',
        title: 'University & College Uniform Set',
        spec: 'Uniform Oxford Shirt with Striped Tie',
        badge: 'Bulk Program',
        image: '/bulk-card-colleges.jpg',
        price: '₹1,299',
        href: '/shop?category=education',
      },
      {
        id: 'edu-4',
        title: 'Sports Day & Athletic Tracksuit',
        spec: 'Breathable Dry-Fit Mesh & Ribbed Cuffs',
        badge: 'Athletic Dept',
        image: '/hero-bg-3.jpg',
        price: '₹1,499',
        href: '/shop?category=education',
      },
    ],
  },
]

export default function CategoryGallerySection() {
  const [activeTab, setActiveTab] = useState('healthcare')
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

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

  const currentGroup = CATEGORY_GROUPS.find(g => g.id === activeTab) || CATEGORY_GROUPS[0]

  return (
    <section
      ref={sectionRef}
      aria-labelledby="cat-gallery-heading"
      style={{
        padding: 'clamp(3.5rem, 6vw, 6rem) 0',
        background: '#F8FAFC',
        position: 'relative',
        borderTop: '1px solid #E2E8F0',
        borderBottom: '1px solid #E2E8F0',
      }}
    >
      <div className="container-site">
        {/* Header Block */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: 720,
            margin: '0 auto clamp(2rem, 3.5vw, 3rem) auto',
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
              border: '1px solid rgba(30, 107, 242, 0.18)',
              borderRadius: 100,
              padding: '0.35rem 0.95rem',
              color: '#1E6BF2',
              fontSize: '0.78rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}
          >
            <Sparkles size={14} />
            <span>Curated Product Gallery by Category</span>
          </div>

          <h2
            id="cat-gallery-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.1rem, 3.8vw, 3.25rem)',
              color: '#0A1932',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              marginBottom: '0.85rem',
            }}
          >
            Explore 4 Signature Styles in{' '}
            <span style={{ color: '#1E6BF2' }}>Every Category</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.92rem, 1.1vw, 1.02rem)',
              color: '#64748B',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Select any industry sector below to view specialized garments manufactured with
            customized specs, durable fabrics, and enterprise branding options.
          </p>
        </div>

        {/* Category Tab Selector Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '0.625rem',
            marginBottom: 'clamp(2rem, 3vw, 2.75rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(16px)',
            transition: `opacity 0.7s ${EASE} 0.1s, transform 0.7s ${EASE} 0.1s`,
          }}
        >
          {CATEGORY_GROUPS.map(group => {
            const Icon = group.icon
            const isActive = activeTab === group.id
            return (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveTab(group.id)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.65rem 1.35rem',
                  borderRadius: 100,
                  fontSize: '0.875rem',
                  fontWeight: isActive ? 800 : 600,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                  background: isActive ? '#0A1932' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#334155',
                  border: `1.5px solid ${isActive ? '#0A1932' : '#E2E8F0'}`,
                  boxShadow: isActive
                    ? '0 6px 18px rgba(10, 25, 50, 0.22)'
                    : '0 2px 8px rgba(10, 25, 50, 0.04)',
                  transition: `all 0.22s ${EASE}`,
                }}
              >
                <Icon size={17} style={{ color: isActive ? '#60C4FF' : '#1E6BF2' }} />
                <span>{group.label}</span>
              </button>
            )
          })}
        </div>

        {/* Category Description Banner */}
        <div
          style={{
            background: '#FFFFFF',
            borderRadius: 18,
            border: '1px solid #E2E8F0',
            padding: '1.25rem 1.75rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            boxShadow: '0 2px 10px rgba(10, 25, 50, 0.03)',
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#1E6BF2',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.25rem',
              }}
            >
              {currentGroup.tagline}
            </span>
            <div
              style={{
                fontSize: '0.92rem',
                color: '#475569',
                fontWeight: 500,
                lineHeight: 1.5,
              }}
            >
              {currentGroup.desc}
            </div>
          </div>

          <Link
            to={`/shop?category=${currentGroup.id}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#EFF6FF',
              color: '#1E6BF2',
              fontWeight: 700,
              fontSize: '0.84rem',
              padding: '0.55rem 1.15rem',
              borderRadius: 100,
              textDecoration: 'none',
              border: '1px solid rgba(30, 107, 242, 0.2)',
              transition: `all 0.2s ${EASE}`,
            }}
          >
            <span>View All {currentGroup.label} Styles</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* ── 4 Product Images Grid for the Active Category ── */}
        <div
          className="cat-products-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem',
          }}
        >
          {currentGroup.products.map(prod => (
            <Link
              key={prod.id}
              to={prod.href}
              className="cat-prod-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                background: '#FFFFFF',
                borderRadius: 'clamp(16px, 1.8vw, 22px)',
                border: '1px solid #E8EEF5',
                overflow: 'hidden',
                textDecoration: 'none',
                color: 'inherit',
                boxShadow: '0 4px 18px rgba(10, 25, 50, 0.05)',
                transition: `transform 0.3s ${EASE}, box-shadow 0.3s ${EASE}, border-color 0.3s ease`,
              }}
            >
              {/* Product Image Wrap */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '1 / 1',
                  background: '#F1F5F9',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={prod.image}
                  alt={prod.title}
                  loading="lazy"
                  className="cat-prod-img"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                    display: 'block',
                    transition: `transform 0.5s ${EASE}`,
                  }}
                />

                {/* Badge Top Left */}
                <div
                  style={{
                    position: 'absolute',
                    top: '0.75rem',
                    left: '0.75rem',
                    background: 'rgba(10, 25, 50, 0.85)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    color: '#FFFFFF',
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '0.28rem 0.65rem',
                    borderRadius: 100,
                    letterSpacing: '0.02em',
                  }}
                >
                  {prod.badge}
                </div>
              </div>

              {/* Product Info */}
              <div
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  flex: 1,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1rem',
                      lineHeight: 1.25,
                      color: '#0A1932',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {prod.title}
                  </h3>

                  <p
                    style={{
                      fontSize: '0.78rem',
                      color: '#64748B',
                      lineHeight: 1.4,
                      margin: 0,
                      minHeight: '2.8em',
                    }}
                  >
                    {prod.spec}
                  </p>
                </div>

                {/* Bottom Row */}
                <div
                  style={{
                    marginTop: '1rem',
                    paddingTop: '0.85rem',
                    borderTop: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: '0.7rem',
                        color: '#94A3B8',
                        display: 'block',
                        textTransform: 'uppercase',
                        fontWeight: 600,
                      }}
                    >
                      From
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        color: '#0A1932',
                      }}
                    >
                      {prod.price}
                    </span>
                  </div>

                  <div
                    className="cat-prod-arrow-btn"
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: '#1E6BF2',
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: `transform 0.25s ${EASE}, background 0.25s ease`,
                      boxShadow: '0 4px 10px rgba(30, 107, 242, 0.35)',
                    }}
                  >
                    <ArrowRight size={15} color="white" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Component Styles */}
      <style>{`
        .cat-prod-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 16px 36px -8px rgba(10, 25, 50, 0.14) !important;
          border-color: #CBD5E1 !important;
        }

        .cat-prod-card:hover .cat-prod-img {
          transform: scale(1.05);
        }

        .cat-prod-card:hover .cat-prod-arrow-btn {
          background: #1157CB !important;
          transform: scale(1.1);
        }

        @media (max-width: 1024px) {
          .cat-products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (max-width: 580px) {
          .cat-products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
