import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Building2,
  Stethoscope,
  GraduationCap,
  Microscope,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Play,
  Palette,
  Scissors,
  Layers,
  MapPin,
  X,
  CheckCircle2,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface InstitutionCardItem {
  id: string
  title: string
  stat: string
  image: string
  icon: 'hospitals' | 'clinics' | 'colleges' | 'laboratories' | 'corporate'
  protocolEyebrow: string
  headingLine1: string
  headingLine2Prefix: string
  headingHighlight: string
  description: string
  ctaLabel: string
}

const INSTITUTION_CARDS: InstitutionCardItem[] = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    stat: '500+ Hospital Partners',
    image: '/ind-healthcare.jpg',
    icon: 'hospitals',
    protocolEyebrow: 'DEDICATED PROTOCOL FOR HEALTHCARE',
    headingLine1: 'Multi-Department &',
    headingLine2Prefix: 'Clinical Team ',
    headingHighlight: 'Outfitting',
    description:
      'Unified color-coding by department (OT, ICU, OPD, Emergency). High-durability autoclave fabrics with crest branding.',
    ctaLabel: 'Consult For Healthcare',
  },
  {
    id: 'corporate',
    title: 'Corporate',
    stat: '300+ Enterprise Clients',
    image: '/ind-corporate.jpg',
    icon: 'corporate',
    protocolEyebrow: 'DEDICATED PROTOCOL FOR CORPORATE TEAMS',
    headingLine1: 'Executive Suits &',
    headingLine2Prefix: 'Brand Identity ',
    headingHighlight: 'Outfitting',
    description:
      'Tailored corporate blazers, Oxford shirts, and embroidered polos with centralized rate contracts and pan-India dispatch.',
    ctaLabel: 'Consult For Corporate',
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    stat: '200+ Factory Plants',
    image: '/mfg-factory.jpg',
    icon: 'laboratories',
    protocolEyebrow: 'DEDICATED PROTOCOL FOR MANUFACTURING',
    headingLine1: 'Plant-Wide Safety &',
    headingLine2Prefix: 'Industrial Workwear ',
    headingHighlight: 'Supply',
    description:
      'Heavy-duty twill jackets, coveralls, anti-static safety gear, and shop-floor uniforms tested for 100+ industrial washes.',
    ctaLabel: 'Consult For Manufacturing',
  },
  {
    id: 'hospitality',
    title: 'Hospitality',
    stat: '150+ Hotel & Resort Brands',
    image: '/ind-hospitality.jpg',
    icon: 'clinics',
    protocolEyebrow: 'DEDICATED PROTOCOL FOR HOSPITALITY',
    headingLine1: 'Front-Office &',
    headingLine2Prefix: 'F&B Service ',
    headingHighlight: 'Elegance',
    description:
      'Luxury hotel reception blazers, concierge attire, banquet suits, and durable housekeeping uniform packages.',
    ctaLabel: 'Consult For Hospitality',
  },
  {
    id: 'education',
    title: 'Education',
    stat: '120+ Schools & Colleges',
    image: '/ind-education.jpg',
    icon: 'colleges',
    protocolEyebrow: 'DEDICATED PROTOCOL FOR EDUCATION',
    headingLine1: 'Academic Faculty &',
    headingLine2Prefix: 'Institution Campus ',
    headingHighlight: 'Outfitting',
    description:
      'Standardized student and faculty blazers with university crest embroidery, sizing camps, and batch-sorted delivery.',
    ctaLabel: 'Consult For Education',
  },
  {
    id: 'security',
    title: 'Security',
    stat: '250+ Security Agencies',
    image: '/ind-security.jpg',
    icon: 'corporate',
    protocolEyebrow: 'DEDICATED PROTOCOL FOR SECURITY',
    headingLine1: 'Tactical Officers &',
    headingLine2Prefix: 'Facility Personnel ',
    headingHighlight: 'Kits',
    description:
      'Structured tactical shirts, epaulets, cargo trousers, and weather-resistant security outerwear.',
    ctaLabel: 'Consult For Security',
  },
  {
    id: 'retail',
    title: 'Retail',
    stat: '180+ Showroom Chains',
    image: '/ind-retail.jpg',
    icon: 'clinics',
    protocolEyebrow: 'DEDICATED PROTOCOL FOR RETAIL',
    headingLine1: 'Showroom Staff &',
    headingLine2Prefix: 'Floor Crew ',
    headingHighlight: 'Branding',
    description:
      'Custom color-coded store polos, aprons, and waistcoats for active floor staff and multi-location retail chains.',
    ctaLabel: 'Consult For Retail',
  },
  {
    id: 'industrial',
    title: 'Industrial Workwear',
    stat: '400+ Engineering Units',
    image: '/ind-industrial.jpg',
    icon: 'laboratories',
    protocolEyebrow: 'DEDICATED PROTOCOL FOR INDUSTRIAL WORKWEAR',
    headingLine1: 'High-Visibility &',
    headingLine2Prefix: 'Field Engineer ',
    headingHighlight: 'Safety',
    description:
      'Reflective 3M safety jackets, cargo trousers, and reinforced flame/acid protective technical workwear.',
    ctaLabel: 'Consult For Industrial',
  },
]

function CategoryCardIcon({
  type,
  isSelected,
}: {
  type: InstitutionCardItem['icon']
  isSelected: boolean
}) {
  const color = isSelected ? '#08264A' : '#1769E8'
  switch (type) {
    case 'hospitals':
      return <Building2 size={20} strokeWidth={1.9} color={color} />
    case 'clinics':
      return <Stethoscope size={20} strokeWidth={1.9} color={color} />
    case 'colleges':
      return <GraduationCap size={20} strokeWidth={1.9} color={color} />
    case 'laboratories':
      return <Microscope size={20} strokeWidth={1.9} color={color} />
    case 'corporate':
      return <Briefcase size={20} strokeWidth={1.9} color={color} />
  }
}

export default function InstitutionalBulkSection() {
  const { ref, isVisible } = useScrollReveal()
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [showOverviewModal, setShowOverviewModal] = useState(false)

  const activeCategory = INSTITUTION_CARDS[selectedIdx]

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="afi-bulk-heading"
      style={{
        position: 'relative',
        paddingBlock: 'clamp(4rem, 6.5vw, 6.25rem)',
        background:
          'linear-gradient(180deg, #EAF4FF 0%, #F4F9FF 32%, #FFFFFF 65%, #EAF3FF 100%)',
        color: '#08264A',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Playfair+Display:ital,wght@0,600;0,700;1,600&display=swap');

        .afi-bulk-hero-wrap {
          position: relative;
          display: grid;
          grid-template-columns: 45% 55%;
          align-items: center;
          min-height: 360px;
          margin-bottom: -1.15rem;
          z-index: 2;
        }

        .afi-bulk-hero-left {
          position: relative;
          z-index: 4;
          padding-right: 1rem;
          padding-bottom: 2rem;
        }

        .afi-bulk-hero-right {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: flex-end;
          justify-content: flex-end;
          margin-left: -12%;
        }

        .afi-bulk-hero-img-mask {
          position: relative;
          width: 100%;
          border-radius: 24px;
          overflow: hidden;
          mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.65) 9%, rgba(0,0,0,1) 20%, rgba(0,0,0,1) 100%);
          -webkit-mask-image: linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.65) 9%, rgba(0,0,0,0.98) 20%, rgba(0,0,0,1) 100%);
        }

        .afi-bulk-cards-row {
          position: relative;
          z-index: 5;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .afi-bulk-cat-card {
          position: relative;
          height: 148px;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          text-align: left;
          padding: 1rem 1.05rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease;
        }

        .afi-bulk-cat-card:hover {
          transform: translateY(-6px);
        }

        .afi-bulk-cat-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          z-index: 1;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .afi-bulk-cat-card:hover .afi-bulk-cat-bg {
          transform: scale(1.05);
        }

        .afi-bulk-cat-arrow {
          position: absolute;
          right: 10px;
          bottom: 10px;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #FFFFFF;
          color: #08264A;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(8, 38, 74, 0.16);
          z-index: 4;
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.25s ease;
        }

        .afi-bulk-cat-card:hover .afi-bulk-cat-arrow {
          transform: translateX(3px);
        }

        .afi-bulk-lower-panel {
          position: relative;
          z-index: 4;
          border-radius: 26px;
          background: linear-gradient(90deg, #FFFFFF 0%, #F7FBFF 52%, #FFFFFF 100%);
          border: 1.5px solid rgba(23, 105, 232, 0.14);
          box-shadow: 0 22px 58px rgba(8, 38, 74, 0.07), 0 4px 16px rgba(23, 105, 232, 0.04);
          padding: 1.85rem 2.1rem;
          display: grid;
          grid-template-columns: 46% 34% 20%;
          align-items: center;
          overflow: hidden;
        }

        .afi-bulk-primary-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.92rem 1.65rem;
          border-radius: 999px;
          background: linear-gradient(135deg, #061D3B 0%, #0B2D59 100%);
          color: #FFFFFF;
          font-size: 0.86rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 10px 26px rgba(8, 38, 74, 0.24), 0 0 14px rgba(23, 105, 232, 0.16);
          transition: all 0.32s cubic-bezier(0.22, 1, 0.36, 1);
          white-space: nowrap;
        }

        .afi-bulk-primary-cta:hover {
          transform: translateY(-2px);
          background: linear-gradient(135deg, #0B2D59 0%, #1769E8 100%);
          box-shadow: 0 14px 30px rgba(23, 105, 232, 0.32);
        }

        @keyframes afiBulkFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .afi-bulk-fabric-float {
          animation: afiBulkFloat 5.5s ease-in-out infinite;
        }

        @media (max-width: 1140px) {
          .afi-bulk-hero-wrap {
            grid-template-columns: 1fr;
            margin-bottom: 1.25rem;
          }
          .afi-bulk-hero-right {
            margin-left: 0;
          }
          .afi-bulk-hero-img-mask {
            mask-image: none;
            -webkit-mask-image: none;
          }
          .afi-bulk-cards-row {
            display: flex;
            overflow-x: auto;
            padding-bottom: 0.5rem;
          }
          .afi-bulk-cat-card {
            min-width: 220px;
            flex: 0 0 220px;
          }
          .afi-bulk-lower-panel {
            grid-template-columns: 1fr;
            gap: 1.5rem;
          }
        }

        @media (max-width: 680px) {
          .afi-bulk-lower-panel {
            padding: 1.45rem 1.25rem;
          }
          .afi-bulk-features-strip {
            grid-template-columns: 1fr 1fr !important;
          }
        }
      `}</style>

      {/* ── SUBTLE ATMOSPHERIC BLUE BACKGROUND SHAPES & FLOWING CURVES ── */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 700"
        fill="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <defs>
          <radialGradient id="bulkSkyGlow" cx="0.2" cy="0.15" r="0.55">
            <stop offset="0%" stopColor="#CBE4FF" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="1440" height="700" fill="url(#bulkSkyGlow)" />
        {/* Subtle flowing blue arc across top-left to center */}
        <path
          d="M360 -20 C520 80, 680 140, 880 180"
          stroke="rgba(23, 105, 232, 0.22)"
          strokeWidth="1.4"
        />
        <path
          d="M-40 310 C180 260, 340 210, 480 90"
          stroke="rgba(23, 105, 232, 0.12)"
          strokeWidth="1.2"
        />
      </svg>

      {/* Subtle dotted pattern in top-left margin */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '8%',
          left: '1.2%',
          width: 110,
          height: 170,
          backgroundImage: 'radial-gradient(rgba(23, 105, 232, 0.18) 1.25px, transparent 1.25px)',
          backgroundSize: '14px 14px',
          opacity: 0.65,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
        {/* ════════════════════════════════════════════════════════════════
            1. TOP HERO AREA (LEFT CONTENT + RIGHT 4 DOCTORS & HOSPITAL)
           ════════════════════════════════════════════════════════════════ */}
        <div className="afi-bulk-hero-wrap">
          {/* ── LEFT CONTENT: TRUST LABEL + HEADING + DESCRIPTION + CTAs ── */}
          <div
            className="afi-bulk-hero-left"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(22px)',
              transition:
                'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
            }}
          >
            {/* Trust Label */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                marginBottom: '0.85rem',
              }}
            >
              <ShieldCheck size={17} strokeWidth={2.1} color="#1769E8" />
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.13em',
                  textTransform: 'uppercase',
                  color: '#184B8C',
                }}
              >
                TRUSTED BY 500+ ENTERPRISES & ORGANIZATIONS
              </span>
              <span
                style={{
                  width: 34,
                  height: 1.2,
                  background: 'rgba(23, 105, 232, 0.32)',
                }}
              />
            </div>

            {/* Main Heading */}
            <h2
              id="afi-bulk-heading"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: 'clamp(2.2rem, 3.85vw, 3.25rem)',
                lineHeight: 1.08,
                letterSpacing: '-0.02em',
                margin: '0 0 0.9rem 0',
              }}
            >
              <div style={{ color: '#08264A' }}>BULK UNIFORMING FOR</div>
              <div style={{ color: '#1769E8' }}>EVERY PROFESSIONAL TEAM</div>
            </h2>

            {/* Description */}
            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.05vw, 0.98rem)',
                lineHeight: 1.58,
                color: '#4B5E75',
                maxWidth: 490,
                margin: '0 0 1.5rem 0',
                fontWeight: 500,
              }}
            >
              End-to-end uniform manufacturing and procurement solutions for businesses, institutions and professional teams across India.
            </p>

            {/* CTA Area: Explore Institutional Solutions → + Watch Overview (2 min video) */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.35rem',
                flexWrap: 'wrap',
              }}
            >
              <Link to="/bulk-orders" className="afi-bulk-primary-cta">
                <span>Explore Institutional Solutions</span>
                <ArrowRight size={16} />
              </Link>

              <button
                type="button"
                onClick={() => setShowOverviewModal(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.7rem',
                  background: 'transparent',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
              >
                <span
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: '#FFFFFF',
                    border: '2px solid #1769E8',
                    boxShadow: '0 6px 16px rgba(23, 105, 232, 0.15)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1769E8',
                    flexShrink: 0,
                  }}
                >
                  <Play size={16} fill="#1769E8" style={{ marginLeft: 2 }} />
                </span>
                <span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      color: '#08264A',
                      lineHeight: 1.2,
                    }}
                  >
                    Watch Overview
                  </span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.7rem',
                      fontWeight: 500,
                      color: '#63758B',
                      marginTop: '0.1rem',
                    }}
                  >
                    2 min video
                  </span>
                </span>
              </button>
            </div>
          </div>

          {/* ── RIGHT HERO IMAGE: 4 INDIAN DOCTORS IN NAVY / ROYAL BLUE / WHITE / TEAL + HOSPITAL ── */}
          <div
            className="afi-bulk-hero-right"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.97)',
              transition:
                'opacity 0.8s cubic-bezier(0.22,1,0.36,1) 120ms, transform 0.8s cubic-bezier(0.22,1,0.36,1) 120ms',
            }}
          >
            <div className="afi-bulk-hero-img-mask">
              <img
                src="/bulk-hero-doctors.jpg"
                alt="Four Indian healthcare professionals in Navy, Royal Blue, White Lab Coat, and Teal uniforms outside modern Indian hospital"
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
            </div>

            {/* Handwritten Editorial Text on Far Right: "Uniform Solutions for a Healthier Tomorrow" */}
            <div
              style={{
                position: 'absolute',
                right: '2.2%',
                bottom: '10%',
                transform: 'rotate(-8deg)',
                pointerEvents: 'none',
                zIndex: 5,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: "'Caveat', cursive",
                  fontSize: 'clamp(1.15rem, 1.5vw, 1.42rem)',
                  fontWeight: 700,
                  lineHeight: 0.96,
                  color: '#08264A',
                }}
              >
                <div>Uniform</div>
                <div>Solutions</div>
                <div>for a Healthier</div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <span>Tomorrow</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1769E8" strokeWidth="2.2">
                    <path d="M12 21s-7-4.5-7-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 16.5 12 21 12 21z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            2. FIVE INSTITUTION CATEGORY CARDS
           ════════════════════════════════════════════════════════════════ */}
        <div className="afi-bulk-cards-row">
          {INSTITUTION_CARDS.map((card, idx) => {
            const isSelected = selectedIdx === idx
            return (
              <button
                key={card.id}
                type="button"
                onClick={() => setSelectedIdx(idx)}
                className="afi-bulk-cat-card"
                style={{
                  background: isSelected ? '#08264A' : '#FFFFFF',
                  border: isSelected
                    ? '2px solid #1769E8'
                    : '1.5px solid #FFFFFF',
                  boxShadow: isSelected
                    ? '0 18px 38px rgba(8, 38, 74, 0.24), 0 0 0 1px rgba(23, 105, 232, 0.25)'
                    : '0 12px 30px rgba(8, 38, 74, 0.07)',
                  opacity: isVisible ? 1 : 0,
                  transitionDelay: `${idx * 70}ms`,
                }}
              >
                {/* Cinematic Architectural / Interior Background Image */}
                <img
                  src={card.image}
                  alt={card.title}
                  className="afi-bulk-cat-bg"
                />

                {/* Smooth Left Gradient Overlay for Typography Legibility */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: isSelected
                      ? 'linear-gradient(95deg, #071F40 0%, #092850 38%, rgba(9, 40, 80, 0.35) 68%, rgba(9, 40, 80, 0.05) 100%)'
                      : 'linear-gradient(95deg, #FFFFFF 0%, rgba(255, 255, 255, 0.94) 38%, rgba(255, 255, 255, 0.28) 68%, rgba(255, 255, 255, 0) 100%)',
                    zIndex: 2,
                    transition: 'background 0.35s ease',
                  }}
                />

                {/* Top Circular Icon */}
                <div
                  style={{
                    position: 'relative',
                    zIndex: 3,
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    background: isSelected ? '#FFFFFF' : '#EBF4FF',
                    border: isSelected
                      ? '1px solid rgba(255, 255, 255, 0.9)'
                      : '1px solid rgba(23, 105, 232, 0.14)',
                    boxShadow: isSelected
                      ? '0 6px 16px rgba(0, 0, 0, 0.2)'
                      : '0 4px 10px rgba(23, 105, 232, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CategoryCardIcon type={card.icon} isSelected={isSelected} />
                </div>

                {/* Bottom Title & Partner Count */}
                <div style={{ position: 'relative', zIndex: 3, paddingRight: '1.8rem' }}>
                  <div
                    style={{
                      fontSize: '0.98rem',
                      fontWeight: 800,
                      color: isSelected ? '#FFFFFF' : '#08264A',
                      lineHeight: 1.2,
                      letterSpacing: '-0.01em',
                    }}
                  >
                    {card.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 600,
                      color: isSelected ? 'rgba(255, 255, 255, 0.85)' : '#4A5D75',
                      marginTop: '0.18rem',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {card.stat}
                  </div>
                </div>

                {/* Bottom-Right Circular Arrow Button */}
                <span className="afi-bulk-cat-arrow">
                  <ArrowRight size={14} strokeWidth={2.4} />
                </span>
              </button>
            )
          })}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            3. LOWER INSTITUTIONAL FEATURE PANEL
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="afi-bulk-lower-panel"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
            transition:
              'opacity 0.75s cubic-bezier(0.22,1,0.36,1) 240ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) 240ms',
          }}
        >
          {/* ── LEFT COLUMN: EYEBROW + HEADING + DESCRIPTION + 4 FEATURES ── */}
          <div style={{ position: 'relative', zIndex: 3 }}>
            {/* Eyebrow in subtle warm gold */}
            <div
              style={{
                fontSize: '0.7rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#B88933',
                marginBottom: '0.4rem',
              }}
            >
              {activeCategory.protocolEyebrow}
            </div>

            {/* Heading */}
            <h3
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontWeight: 700,
                fontSize: 'clamp(1.55rem, 2.25vw, 2.05rem)',
                lineHeight: 1.14,
                color: '#08264A',
                margin: '0 0 0.65rem 0',
                letterSpacing: '-0.015em',
              }}
            >
              <div>{activeCategory.headingLine1}</div>
              <div>
                {activeCategory.headingLine2Prefix}
                <span style={{ color: '#1769E8' }}>
                  {activeCategory.headingHighlight}
                </span>
              </div>
            </h3>

            {/* Description */}
            <p
              style={{
                fontSize: '0.84rem',
                lineHeight: 1.55,
                color: '#4E6178',
                margin: '0 0 1.25rem 0',
                maxWidth: 460,
                fontWeight: 500,
              }}
            >
              {activeCategory.description}
            </p>

            {/* 4 Feature Items in Horizontal Row */}
            <div
              className="afi-bulk-features-strip"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, auto)',
                gap: '0.85rem',
                alignItems: 'center',
              }}
            >
              {[
                {
                  l1: 'Department-wise',
                  l2: 'Colour Coding',
                  icon: <Palette size={15} strokeWidth={1.9} />,
                },
                {
                  l1: 'Custom Branding',
                  l2: '& Embroidery',
                  icon: <Scissors size={15} strokeWidth={1.9} />,
                },
                {
                  l1: 'Autoclave-Grade',
                  l2: 'Durability',
                  icon: <Layers size={15} strokeWidth={1.9} />,
                },
                {
                  l1: 'Pan-India',
                  l2: 'Supply Support',
                  icon: <MapPin size={15} strokeWidth={1.9} />,
                },
              ].map((feat) => (
                <div
                  key={feat.l1}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.48rem',
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: '#EAF3FF',
                      border: '1px solid rgba(23, 105, 232, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#1769E8',
                      flexShrink: 0,
                    }}
                  >
                    {feat.icon}
                  </div>
                  <div
                    style={{
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      color: '#08264A',
                      lineHeight: 1.22,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <div>{feat.l1}</div>
                    <div>{feat.l2}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── CENTER-RIGHT VISUAL: FOLDED UNIFORMS IN NAVY / ROYAL BLUE / TEAL / GREY / WHITE + STETHOSCOPE ── */}
          <div
            className="afi-bulk-fabric-float"
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src="/bulk-folded-stethoscope.jpg"
              alt="Folded medical uniforms in Navy, Royal Blue, Teal, Steel Grey and White with stethoscope"
              style={{
                width: '100%',
                maxWidth: 360,
                height: 'auto',
                display: 'block',
                borderRadius: 14,
              }}
            />
          </div>

          {/* ── FAR-RIGHT EDITORIAL MESSAGE & CTA ── */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1.35rem',
            }}
          >
            {/* Handwritten Editorial Text: "Built for Institutions. Designed for People." */}
            <div
              style={{
                fontFamily: "'Caveat', cursive",
                fontSize: 'clamp(1.35rem, 1.75vw, 1.62rem)',
                fontWeight: 700,
                lineHeight: 1.02,
                color: '#08264A',
                transform: 'rotate(-5deg)',
                textAlign: 'left',
                alignSelf: 'center',
              }}
            >
              <div>Built for</div>
              <div>Institutions.</div>
              <div style={{ color: '#134687' }}>Designed for People.</div>
            </div>

            {/* CTA Button: Consult For Hospitals → */}
            <Link
              to={`/bulk-orders?institution=${activeCategory.id}`}
              className="afi-bulk-primary-cta"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <span>{activeCategory.ctaLabel}</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── OPTIONAL INSTITUTIONAL OVERVIEW MODAL WHEN "WATCH OVERVIEW" IS CLICKED ── */}
      {showOverviewModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="AFI Institutional Uniforming Overview"
          onClick={() => setShowOverviewModal(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(8, 24, 48, 0.72)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            zIndex: 1000,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#FFFFFF',
              borderRadius: 24,
              maxWidth: 560,
              width: '100%',
              padding: '2rem',
              boxShadow: '0 28px 68px rgba(8, 38, 74, 0.35)',
              position: 'relative',
            }}
          >
            <button
              type="button"
              onClick={() => setShowOverviewModal(false)}
              aria-label="Close modal"
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 34,
                height: 34,
                borderRadius: '50%',
                border: '1px solid #E2E8F0',
                background: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#08264A',
              }}
            >
              <X size={17} />
            </button>

            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.12em',
                color: '#1769E8',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}
            >
              AFI INSTITUTIONAL PROCUREMENT
            </div>
            <h4
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#08264A',
                margin: '0 0 0.75rem 0',
              }}
            >
              End-to-End Hospital Outfitting in 6 Steps
            </h4>
            <p
              style={{
                fontSize: '0.88rem',
                color: '#4E6178',
                lineHeight: 1.55,
                marginBottom: '1.25rem',
              }}
            >
              From on-site staff sizing camps and custom hospital crest digitization
              to department-sorted pan-India dispatch within 7–10 working days.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
              {[
                'Department-wise color coding for OT, ICU, OPD, and Emergency',
                'Complimentary physical fabric swatch & embroidered sample box in 48h',
                '100+ autoclave wash durability guarantee with ColourLock™',
                'Verified GST tax invoicing & institutional rate contracts',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', fontSize: '0.84rem', fontWeight: 600, color: '#08264A' }}>
                  <CheckCircle2 size={16} color="#1769E8" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <Link
              to="/bulk-orders"
              className="afi-bulk-primary-cta"
              style={{ width: '100%' }}
              onClick={() => setShowOverviewModal(false)}
            >
              <span>Request Institutional Sample Box</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </section>
  )
}
