import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Activity,
  UserCheck,
  Palette,
  Shield,
  Waves,
  Feather,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface FeatureRow {
  title: string
  subtitle: string
  icon: 'shield' | 'waves' | 'feather' | 'sparkles' | 'check' | 'layers'
}

interface DepartmentCollection {
  id: string
  tabLabel: string
  tabIcon: 'activity' | 'user' | 'palette'
  badgeText: string
  eyebrow: string
  title: string
  description: string
  inventoryCount: number
  editorialImage: string
  fabricImage: string
  shopButtonText: string
  shopLink: string
  lookbookLink: string
  scriptLine1: string
  scriptLine2: string
  departments: {
    label: string
    iconType: 'surgical' | 'emergency' | 'opd' | 'icu'
    leftPercent: string
  }[]
  features: FeatureRow[]
}

const DEPARTMENT_COLLECTIONS: DepartmentCollection[] = [
  {
    id: 'aeroflex-elite',
    tabLabel: 'AeroFlex™ Elite',
    tabIcon: 'activity',
    badgeText: 'Flagship Series',
    eyebrow: 'ZERO-GRAVITY 4-WAY STRETCH',
    title: 'AeroFlex™ Elite Collection',
    description:
      'Engineered with our proprietary micro-twill weave for doctors who never stop moving during marathon 16-hour shifts.',
    inventoryCount: 24,
    editorialImage: '/dept-aeroflex.jpg',
    fabricImage: '/dept-fabric-aeroflex.jpg',
    shopButtonText: 'Shop AeroFlex™',
    shopLink: '/shop?collection=stretch',
    lookbookLink: '/shop?category=scrubs',
    scriptLine1: 'Performance',
    scriptLine2: 'Meets Purpose',
    departments: [
      { label: 'SURGICAL', iconType: 'surgical', leftPercent: '38.5%' },
      { label: 'EMERGENCY', iconType: 'emergency', leftPercent: '56.2%' },
      { label: 'OPD', iconType: 'opd', leftPercent: '74.2%' },
      { label: 'ICU', iconType: 'icu', leftPercent: '93.2%' },
    ],
    features: [
      {
        title: 'Anti-Microbial Infusion',
        subtitle: 'Stay fresh, stay protected',
        icon: 'shield',
      },
      {
        title: 'Moisture-Wicking',
        subtitle: 'Keeps you cool & dry',
        icon: 'waves',
      },
      {
        title: 'Ergonomic Seams',
        subtitle: 'Designed for all-day comfort',
        icon: 'feather',
      },
    ],
  },
  {
    id: 'executive-consultation',
    tabLabel: 'Executive Consultation',
    tabIcon: 'user',
    badgeText: 'Bespoke Tailoring',
    eyebrow: 'TAILORED CLINICAL AUTHORITY',
    title: 'Executive Consultation Series',
    description:
      'Structured architectural silhouettes crafted from breathable combed cotton-twill with liquid-repellent HydroDrop™ protection.',
    inventoryCount: 16,
    editorialImage: '/dept-executive.jpg',
    fabricImage: '/dept-fabric-executive.jpg',
    shopButtonText: 'Shop Executive',
    shopLink: '/shop?category=lab-coats',
    lookbookLink: '/shop?collection=classic',
    scriptLine1: 'Precision',
    scriptLine2: 'Meets Prestige',
    departments: [
      { label: 'SURGICAL', iconType: 'surgical', leftPercent: '38.5%' },
      { label: 'EMERGENCY', iconType: 'emergency', leftPercent: '56.2%' },
      { label: 'OPD', iconType: 'opd', leftPercent: '74.2%' },
      { label: 'ICU', iconType: 'icu', leftPercent: '93.2%' },
    ],
    features: [
      {
        title: 'HydroDrop™ Stain Shield',
        subtitle: 'Repels fluids & clinical spills',
        icon: 'shield',
      },
      {
        title: 'Crease-Resistant Weave',
        subtitle: 'Crisp drape through 12-hour OPDs',
        icon: 'layers',
      },
      {
        title: 'Concealed Tablet Pocket',
        subtitle: 'Balanced weight distribution',
        icon: 'feather',
      },
    ],
  },
  {
    id: 'comfortcare-pastel',
    tabLabel: 'ComfortCare™ Pastel',
    tabIcon: 'palette',
    badgeText: 'Pediatrics & OPD',
    eyebrow: 'SOOTHING CLINICAL PALETTE',
    title: 'ComfortCare™ Pastel Range',
    description:
      'Calming contemporary hues engineered to reduce patient anxiety in pediatric, maternity, and wellness departments.',
    inventoryCount: 19,
    editorialImage: '/dept-pastel.jpg',
    fabricImage: '/dept-fabric-pastel.jpg',
    shopButtonText: 'Shop ComfortCare™',
    shopLink: '/shop?collection=lightweight',
    lookbookLink: '/shop?filter=new',
    scriptLine1: 'Softness',
    scriptLine2: 'Meets Science',
    departments: [
      { label: 'SURGICAL', iconType: 'surgical', leftPercent: '38.5%' },
      { label: 'EMERGENCY', iconType: 'emergency', leftPercent: '56.2%' },
      { label: 'OPD', iconType: 'opd', leftPercent: '74.2%' },
      { label: 'ICU', iconType: 'icu', leftPercent: '93.2%' },
    ],
    features: [
      {
        title: 'ColourLock™ Dye Tech',
        subtitle: 'Fade-proof after 100+ washes',
        icon: 'sparkles',
      },
      {
        title: 'Peached Soft-Touch Finish',
        subtitle: 'Gentle hypoallergenic comfort',
        icon: 'feather',
      },
      {
        title: 'AeroVent™ Breathability',
        subtitle: 'Engineered for humid climates',
        icon: 'waves',
      },
    ],
  },
]

function DeptTopIcon({ type }: { type: 'surgical' | 'emergency' | 'opd' | 'icu' }) {
  if (type === 'surgical') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" strokeOpacity="0.55" />
        <path d="M12 7v10M8 11h8" strokeLinecap="round" />
        <circle cx="12" cy="12" r="2.2" />
      </svg>
    )
  }
  if (type === 'emergency') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" strokeOpacity="0.55" />
        <path d="M12 7v10M7.7 9.5l8.6 5M16.3 9.5l-8.6 5" strokeLinecap="round" />
      </svg>
    )
  }
  if (type === 'opd') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" strokeOpacity="0.55" />
        <path d="M9 9.5v2.5a3 3 0 0 0 6 0V9.5M12 15v2.5M9.5 17.5h5" strokeLinecap="round" />
      </svg>
    )
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" strokeOpacity="0.55" />
      <path d="M7.5 12h2l1.5-3 2 6 1.5-3h2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FeatureIcon({ type }: { type: FeatureRow['icon'] }) {
  switch (type) {
    case 'shield':
      return <Shield size={20} strokeWidth={1.85} />
    case 'waves':
      return <Waves size={20} strokeWidth={1.85} />
    case 'feather':
      return <Feather size={20} strokeWidth={1.85} />
    case 'sparkles':
      return <Sparkles size={20} strokeWidth={1.85} />
    case 'layers':
      return <Layers size={20} strokeWidth={1.85} />
    default:
      return <CheckCircle2 size={20} strokeWidth={1.85} />
  }
}

export default function CollectionsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const { ref, isVisible } = useScrollReveal()
  const activeCollection = DEPARTMENT_COLLECTIONS[activeIndex]

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="afi-dept-section"
      style={{
        position: 'relative',
        paddingBlock: 'clamp(4rem, 6.5vw, 6.25rem)',
        background: 'linear-gradient(180deg, #F5FAFF 0%, #FFFFFF 38%, #F4F9FF 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Load Caveat / Dancing Script style font for "Performance Meets Purpose" callout & Playfair Display italic for "Department" */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,500;1,600&display=swap');

        .afi-dept-card-grid {
          display: grid;
          grid-template-columns: 57.5% 42.5%;
          align-items: stretch;
          min-height: 500px;
        }

        .afi-dept-left-wrap {
          position: relative;
          margin: 8px;
          border-radius: 22px;
          overflow: hidden;
          min-height: 484px;
          background: #081526;
          box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.12);
        }

        .afi-dept-editorial-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease;
        }

        .afi-dept-left-wrap:hover .afi-dept-editorial-img {
          transform: scale(1.022);
        }

        .afi-dept-right-wrap {
          position: relative;
          padding: 2.5rem 2.5rem 2.35rem 2.25rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          overflow: hidden;
          background: radial-gradient(circle at 88% 18%, rgba(216, 234, 255, 0.38) 0%, rgba(255, 255, 255, 0) 58%), #FFFFFF;
        }

        .afi-dept-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.55rem;
          padding: 0.72rem 1.45rem;
          border-radius: 999px;
          font-size: 0.875rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
          white-space: nowrap;
        }

        .afi-dept-tab-btn:hover {
          transform: translateY(-1px);
        }

        .afi-dept-primary-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.65rem;
          padding: 0.92rem 1.95rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #071930 0%, #0E2747 100%);
          color: #FFFFFF;
          font-size: 0.9rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 10px 24px rgba(8, 24, 48, 0.22);
          transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .afi-dept-primary-cta:hover {
          transform: translateY(-2px);
          box-shadow: 0 14px 28px rgba(20, 110, 245, 0.28);
          background: linear-gradient(135deg, #0D2646 0%, #146EF5 100%);
        }

        .afi-dept-lookbook-link {
          display: inline-flex;
           flex-direction: column;
          text-decoration: none;
          color: #175CD3;
          font-size: 0.88rem;
          font-weight: 700;
          transition: all 0.25s ease;
        }

        .afi-dept-lookbook-link:hover {
          color: #0B2545;
          transform: translateX(2px);
        }

        @keyframes afiFabricFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        .afi-dept-fabric-float {
          animation: afiFabricFloat 5.5s ease-in-out infinite;
        }

        @media (max-width: 1120px) {
          .afi-dept-card-grid {
            grid-template-columns: 1fr;
          }
          .afi-dept-left-wrap {
            min-height: 440px;
          }
          .afi-dept-right-wrap {
            padding: 2.25rem 2rem;
          }
        }

        @media (max-width: 680px) {
          .afi-dept-left-wrap {
            min-height: 360px;
            margin: 6px;
          }
          .afi-dept-overlay-panel {
            width: 52% !important;
            padding: 1.1rem 0.95rem !important;
          }
          .afi-dept-overlay-heading {
            font-size: 1.45rem !important;
          }
          .afi-dept-right-wrap {
            padding: 1.65rem 1.35rem 1.85rem;
          }
          .afi-dept-fabric-box {
            position: relative !important;
            right: auto !important;
            bottom: auto !important;
            width: 100% !important;
            max-width: 280px !important;
            margin: 1rem auto 0.5rem !important;
          }
          .afi-dept-script-callout {
            position: relative !important;
            top: auto !important;
            right: auto !important;
            text-align: right;
            margin-bottom: -0.5rem;
          }
          .afi-dept-top-labels {
            display: none !important;
          }
        }
      `}</style>

      {/* Subtle Background Decorative Shapes Matching Reference */}
      {/* Top-left sweeping white/pale-blue arc */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-18%',
          left: '-8%',
          width: '42%',
          height: '55%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(215, 235, 255, 0.45) 0%, rgba(215, 235, 255, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      {/* Top-right sweeping pale-blue organic shape */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-12%',
          right: '-10%',
          width: '36%',
          height: '65%',
          borderRadius: '50%',
          background: 'linear-gradient(160deg, rgba(222, 238, 255, 0.52) 0%, rgba(235, 245, 255, 0.15) 100%)',
          pointerEvents: 'none',
        }}
      />
      {/* Subtle dotted matrix on left & right margins */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '12%',
          left: '1.5%',
          width: 120,
          height: 180,
          backgroundImage: 'radial-gradient(rgba(20, 110, 245, 0.16) 1.25px, transparent 1.25px)',
          backgroundSize: '14px 14px',
          opacity: 0.65,
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '28%',
          right: '1.5%',
          width: 110,
          height: 220,
          backgroundImage: 'radial-gradient(rgba(20, 110, 245, 0.15) 1.25px, transparent 1.25px)',
          backgroundSize: '14px 14px',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
        {/* ── 1. CENTERED SECTION HEADER ───────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            marginBottom: '2.25rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Top Eyebrow with thin blue line on both sides */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.85rem',
              marginBottom: '0.75rem',
            }}
          >
            <span
              style={{
                width: 28,
                height: 1.5,
                background: '#2563EB',
                borderRadius: 2,
                 opacity: 0.75,
              }}
            />
            <span
              style={{
                fontSize: '0.76rem',
                fontWeight: 800,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#1D5BD6',
              }}
            >
              ENGINEERED FOR EVERY DEPARTMENT
            </span>
            <span
              style={{
                width: 28,
                height: 1.5,
                background: '#2563EB',
                borderRadius: 2,
                opacity: 0.75,
              }}
            />
          </div>

          {/* Main Heading */}
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.15rem, 4vw, 3.25rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.028em',
              color: '#081C38',
              margin: '0 0 0.85rem 0',
            }}
          >
            Engineered for Every{' '}
            <span
              style={{
                background: 'linear-gradient(90deg, #1565D8 0%, #2480F0 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Department
            </span>
          </h2>

          {/* Description */}
          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.15vw, 1.08rem)',
              lineHeight: 1.6,
              color: '#52657C',
              maxWidth: 560,
              margin: '0 0 1.85rem 0',
              fontWeight: 500,
            }}
          >
            From high-intensity trauma units to serene executive OPDs, explore
            purpose-built uniform collections.
          </p>

          {/* ── 2. COLLECTION TABS (PILL BAR) ──────────────────────────── */}
          <div
            role="tablist"
            aria-label="Department Uniform Collections"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.38rem',
              borderRadius: 999,
              background: '#F2F7FF',
              border: '1px solid rgba(20, 110, 245, 0.13)',
              boxShadow: '0 8px 24px rgba(11, 31, 58, 0.05), inset 0 1px 0 rgba(255,255,255,0.9)',
              maxWidth: '100%',
              overflowX: 'auto',
            }}
          >
            {DEPARTMENT_COLLECTIONS.map((col, idx) => {
              const isSelected = activeIndex === idx
              return (
                <button
                  key={col.id}
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveIndex(idx)}
                  className="afi-dept-tab-btn"
                  style={{
                    background: isSelected
                      ? 'linear-gradient(135deg, #07172C 0%, #0D2646 100%)'
                      : 'transparent',
                    color: isSelected ? '#FFFFFF' : '#263B54',
                    border: isSelected
                      ? '1px solid rgba(59, 130, 246, 0.35)'
                      : '1px solid transparent',
                    boxShadow: isSelected
                      ? '0 6px 18px rgba(8, 24, 48, 0.24), 0 0 12px rgba(20, 110, 245, 0.18)'
                      : 'none',
                  }}
                >
                  {col.tabIcon === 'activity' && (
                    <Activity
                      size={16}
                      style={{ color: isSelected ? '#60A5FA' : '#1D63DC' }}
                    />
                  )}
                  {col.tabIcon === 'user' && (
                    <UserCheck
                      size={16}
                      style={{ color: isSelected ? '#60A5FA' : '#1D63DC' }}
                    />
                  )}
                  {col.tabIcon === 'palette' && (
                    <Palette
                      size={16}
                      style={{ color: isSelected ? '#60A5FA' : '#1D63DC' }}
                    />
                  )}
                  <span>{col.tabLabel}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* ── 3. MAIN SPLIT FEATURE CARD ───────────────────────────────── */}
        <div
          style={{
            borderRadius: 28,
            background: '#FFFFFF',
            border: '1.5px solid rgba(20, 110, 245, 0.14)',
            boxShadow:
              '0 26px 68px rgba(10, 25, 48, 0.08), 0 4px 18px rgba(20, 110, 245, 0.04)',
            overflow: 'hidden',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.975) translateY(18px)',
            transition:
              'opacity 0.75s cubic-bezier(0.22,1,0.36,1) 120ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) 120ms',
          }}
        >
          <div className="afi-dept-card-grid">
            {/* ── LEFT SIDE: 4 INDIAN HEALTHCARE PROFESSIONALS + EDITORIAL OVERLAY ── */}
            <div className="afi-dept-left-wrap">
              <img
                key={activeCollection.editorialImage}
                src={activeCollection.editorialImage}
                alt={`${activeCollection.title} - Indian Healthcare Professionals across Surgical, Emergency, OPD and ICU`}
                className="afi-dept-editorial-img"
              />

              {/* Subtle Diagonal Light-Beam Separator Lines Matching Reference */}
              <svg
                aria-hidden="true"
                viewBox="0 0 1000 670"
                preserveAspectRatio="none"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              >
                <defs>
                  <linearGradient id="diagLineGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.42)" />
                    <stop offset="55%" stopColor="rgba(255,255,255,0.18)" />
                    <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
                  </linearGradient>
                </defs>
                {/* Diagonal separator between Dark Panel and Surgical */}
                <line x1="344" y1="0" x2="180" y2="670" stroke="url(#diagLineGrad)" strokeWidth="1.6" />
                {/* Diagonal separator between Surgical and Emergency */}
                <line x1="490" y1="0" x2="365" y2="340" stroke="url(#diagLineGrad)" strokeWidth="1.2" />
                {/* Diagonal separator between Emergency and OPD */}
                <line x1="672" y1="0" x2="578" y2="380" stroke="url(#diagLineGrad)" strokeWidth="1.2" />
                {/* Diagonal separator between OPD and ICU */}
                <line x1="896" y1="0" x2="812" y2="420" stroke="url(#diagLineGrad)" strokeWidth="1.2" />
              </svg>

              {/* Top 4 Department Labels (SURGICAL, EMERGENCY, OPD, ICU) */}
              <div
                className="afi-dept-top-labels"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 78,
                  pointerEvents: 'none',
                  zIndex: 3,
                }}
              >
                {activeCollection.departments.map((dept, i) => (
                  <div
                    key={dept.label}
                    style={{
                      position: 'absolute',
                      top: 14,
                      left: dept.leftPercent,
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '0.26rem',
                      color: 'rgba(255, 255, 255, 0.92)',
                      textShadow: '0 2px 8px rgba(6, 18, 36, 0.45)',
                      transition: `opacity 0.5s ease ${i * 90}ms`,
                    }}
                  >
                    <DeptTopIcon type={dept.iconType} />
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {dept.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Left Dark Editorial Overlay Content */}
              <div
                className="afi-dept-overlay-panel"
                style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: '42%',
                  padding: '1.45rem 1.25rem 1.45rem 1.55rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  zIndex: 4,
                  pointerEvents: 'none',
                }}
              >
                {/* Top Group: Flagship Pill + Built for Every Department + 3 Feature Items */}
                <div>
                  {/* ★ Flagship Series Pill */}
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.38rem 0.95rem',
                      borderRadius: 999,
                      background: 'rgba(8, 22, 44, 0.85)',
                      border: '1px solid rgba(147, 197, 253, 0.38)',
                      boxShadow: '0 4px 14px rgba(0, 0, 0, 0.25)',
                      marginBottom: '1.35rem',
                    }}
                  >
                    <span style={{ color: '#FFFFFF', fontSize: '0.78rem', lineHeight: 1 }}>★</span>
                    <span
                      style={{
                        color: '#FFFFFF',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.03em',
                      }}
                    >
                      {activeCollection.badgeText}
                    </span>
                  </div>

                  {/* Built for Every Department */}
                  <div
                    className="afi-dept-overlay-heading"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: 'clamp(1.75rem, 2.35vw, 2.25rem)',
                      lineHeight: 1.08,
                      color: '#FFFFFF',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      marginBottom: '0.85rem',
                      textShadow: '0 4px 16px rgba(0, 0, 0, 0.35)',
                    }}
                  >
                    <div>Built</div>
                    <div>for Every</div>
                    <div
                      style={{
                        fontStyle: 'italic',
                        fontWeight: 500,
                        color: '#7CC0FF',
                      }}
                    >
                      Department
                    </div>
                  </div>

                  {/* Subtle Short Horizontal Line */}
                  <div
                    style={{
                      width: 28,
                      height: 1.5,
                      background: 'rgba(255, 255, 255, 0.36)',
                      marginBottom: '0.95rem',
                    }}
                  />

                  {/* 3 Feature Items with Circular Outline Icons */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.7rem' }}>
                    {[
                      { l1: 'Purpose-Built', l2: 'Designs', icon: 'sparkle' },
                      { l1: 'Performance', l2: 'Fabrics', icon: 'wave' },
                      { l1: 'All-Day', l2: 'Comfort', icon: 'shield' },
                    ].map((item) => (
                      <div
                        key={item.l1}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.68rem',
                        }}
                      >
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            borderRadius: '50%',
                            border: '1px solid rgba(255, 255, 255, 0.38)',
                            background: 'rgba(10, 26, 50, 0.55)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            flexShrink: 0,
                          }}
                        >
                          {item.icon === 'sparkle' && <Sparkles size={15} strokeWidth={1.75} />}
                          {item.icon === 'wave' && <Waves size={15} strokeWidth={1.75} />}
                          {item.icon === 'shield' && <Shield size={15} strokeWidth={1.75} />}
                        </div>
                        <div
                          style={{
                            fontSize: '0.74rem',
                            lineHeight: 1.25,
                            color: 'rgba(255, 255, 255, 0.92)',
                            fontWeight: 500,
                          }}
                        >
                          <div>{item.l1}</div>
                          <div>{item.l2}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Series Inventory Readout */}
                <div style={{ marginTop: '1.25rem' }}>
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: 'rgba(255, 255, 255, 0.85)',
                      fontWeight: 500,
                      marginBottom: '0.15rem',
                    }}
                  >
                    Series Inventory
                  </div>
                  <div
                    style={{
                      fontSize: 'clamp(1.1rem, 1.45vw, 1.32rem)',
                      fontWeight: 800,
                      color: '#FFFFFF',
                      letterSpacing: '-0.015em',
                      whiteSpace: 'nowrap',
                      textShadow: '0 2px 12px rgba(4, 12, 26, 0.75)',
                    }}
                  >
                    {activeCollection.inventoryCount} Tailored Styles Available
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT SIDE: COLLECTION INFO + FEATURE ROWS + FABRIC VISUAL + CTA ── */}
            <div className="afi-dept-right-wrap">
              {/* Top Info Block */}
              <div style={{ position: 'relative', zIndex: 3 }}>
                {/* Small Eyebrow Label */}
                <div
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: '#175CD3',
                    marginBottom: '0.45rem',
                  }}
                >
                  {activeCollection.eyebrow}
                </div>

                {/* Collection Heading */}
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.65rem, 2.35vw, 2.2rem)',
                    fontWeight: 800,
                    color: '#081C38',
                    letterSpacing: '-0.025em',
                    lineHeight: 1.15,
                    margin: '0 0 0.75rem 0',
                    maxWidth: '82%',
                  }}
                >
                  {activeCollection.title}
                </h3>

                {/* Collection Description */}
                <p
                  style={{
                    fontSize: '0.92rem',
                    lineHeight: 1.6,
                    color: '#52657C',
                    margin: '0 0 1.55rem 0',
                    maxWidth: '72%',
                    fontWeight: 500,
                  }}
                >
                  {activeCollection.description}
                </p>

                {/* Handwritten Script Callout ("Performance Meets Purpose") in Top-Right */}
                <div
                  className="afi-dept-script-callout"
                  style={{
                    position: 'absolute',
                    top: -6,
                    right: -4,
                    transform: 'rotate(-8deg)',
                    pointerEvents: 'none',
                    zIndex: 4,
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Caveat', cursive",
                      fontSize: '1.55rem',
                      fontWeight: 700,
                      lineHeight: 0.92,
                      color: '#1B56B5',
                    }}
                  >
                    <div>{activeCollection.scriptLine1}</div>
                    <div style={{ marginLeft: '0.35rem' }}>{activeCollection.scriptLine2}</div>
                  </div>
                  {/* Hand-drawn underline swoosh */}
                  <svg
                    width="96"
                    height="14"
                    viewBox="0 0 96 14"
                    fill="none"
                    style={{ marginLeft: '0.85rem', marginTop: '2px' }}
                  >
                    <path
                      d="M2 10C28 4 62 3 93 6"
                      stroke="#1B56B5"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Middle Section: 3 Stacked Feature Rows on Left + Folded Fabric Visual on Right */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 3,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.15rem',
                  marginBottom: '1.85rem',
                  maxWidth: '58%',
                }}
              >
                {activeCollection.features.map((feat) => (
                  <div
                    key={feat.title}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.9rem',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: '50%',
                        background: '#EBF4FF',
                        border: '1px solid rgba(23, 92, 211, 0.14)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#175CD3',
                        flexShrink: 0,
                        boxShadow: '0 4px 12px rgba(23, 92, 211, 0.08)',
                      }}
                    >
                      <FeatureIcon type={feat.icon} />
                    </div>
                    <div>
                      <div
                        style={{
                          fontSize: '0.94rem',
                          fontWeight: 800,
                          color: '#0A2140',
                          lineHeight: 1.25,
                          marginBottom: '0.12rem',
                        }}
                      >
                        {feat.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.8rem',
                          color: '#64778D',
                          fontWeight: 500,
                          lineHeight: 1.3,
                        }}
                      >
                        {feat.subtitle}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Folded Medical Uniform Fabrics Visual on Lower-Right */}
              <div
                className="afi-dept-fabric-box afi-dept-fabric-float"
                style={{
                  position: 'absolute',
                  right: -2,
                  bottom: 0,
                  width: '49%',
                  maxWidth: 275,
                  pointerEvents: 'none',
                  zIndex: 2,
                }}
              >
                <img
                  key={activeCollection.fabricImage}
                  src={activeCollection.fabricImage}
                  alt="Folded premium medical uniform fabrics in royal blue, teal, and steel grey"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    borderBottomRightRadius: 24,
                  }}
                />
              </div>

              {/* Bottom CTAs */}
              <div
                style={{
                  position: 'relative',
                  zIndex: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.45rem',
                  flexWrap: 'wrap',
                  marginTop: 'auto',
                }}
              >
                <Link to={activeCollection.shopLink} className="afi-dept-primary-cta">
                  <span>{activeCollection.shopButtonText}</span>
                  <ArrowRight size={16} />
                </Link>

                <Link to={activeCollection.lookbookLink} className="afi-dept-lookbook-link">
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', paddingBottom: '0.3rem' }}>
                    <span>View Lookbook</span>
                    <ArrowRight size={15} />
                  </span>
                  <span
                    style={{
                      display: 'block',
                      width: '100%',
                      height: 1.5,
                      background: '#175CD3',
                      opacity: 0.55,
                    }}
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
