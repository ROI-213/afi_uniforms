/**
 * ShopByColour — Section 5
 * ─────────────────────────────────────────────────────────────
 * Exact implementation of the reference design:
 *  1. Header: Left eyebrow + "Shop by Colour" + description | Right 3 feature indicators + carousel nav arrows
 *  2. Horizontal draggable/scrollable carousel of colour cards with realistic Indian healthcare professionals wearing each exact uniform shade
 *  3. Interactive Colour Swatch Navigation bar with miniature scrub-top icons ("All Colours" + 14 colours) that scrolls/highlights the carousel
 *  4. Wide Bottom Feature Banner with folded scrub fabrics image, headline, 3 benefit points, and "Explore All Colours →" CTA
 */

import React, { useRef, useEffect, useState, useCallback } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  Palette,
  Gem,
  Sparkles,
  ShieldCheck,
  Feather,
} from 'lucide-react'
import { PRODUCTS } from '../data/products'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

export interface ColourItem {
  id: string
  name: string
  shortName: string
  hex: string
  collarHex?: string
  gradientTint: string
  baseCount: number
  image: string
  lightShirt?: boolean
}

const COLOUR_ITEMS: ColourItem[] = [
  {
    id: 'navy-blue',
    name: 'Navy Blue',
    shortName: 'Navy Blue',
    hex: '#102542',
    gradientTint: 'rgba(10, 24, 48, 0.88)',
    baseCount: 64,
    image: '/col-navy-blue.jpg',
  },
  {
    id: 'royal-blue',
    name: 'Royal Blue',
    shortName: 'Royal Blue',
    hex: '#185ADB',
    gradientTint: 'rgba(15, 52, 130, 0.86)',
    baseCount: 52,
    image: '/col-royal-blue.jpg',
  },
  {
    id: 'bottle-green',
    name: 'Bottle Green',
    shortName: 'Bottle Green',
    hex: '#1B4D3E',
    gradientTint: 'rgba(14, 46, 36, 0.88)',
    baseCount: 46,
    image: '/col-bottle-green.jpg',
  },
  {
    id: 'wine',
    name: 'Wine / Burgundy',
    shortName: 'Wine',
    hex: '#6B1D2F',
    gradientTint: 'rgba(68, 14, 28, 0.88)',
    baseCount: 38,
    image: '/col-wine.jpg',
  },
  {
    id: 'steel-grey',
    name: 'Steel Grey',
    shortName: 'Steel Grey',
    hex: '#5C6B73',
    gradientTint: 'rgba(42, 52, 62, 0.86)',
    baseCount: 44,
    image: '/col-steel-grey.jpg',
  },
  {
    id: 'black',
    name: 'Black',
    shortName: 'Black',
    hex: '#181B20',
    gradientTint: 'rgba(12, 14, 18, 0.90)',
    baseCount: 36,
    image: '/col-black.jpg',
  },
  {
    id: 'sky-blue',
    name: 'Sky Blue',
    shortName: 'Sky Blue',
    hex: '#5B9BD5',
    gradientTint: 'rgba(22, 58, 98, 0.84)',
    baseCount: 42,
    image: '/col-sky-blue.jpg',
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    shortName: 'Charcoal',
    hex: '#374151',
    gradientTint: 'rgba(26, 32, 44, 0.88)',
    baseCount: 34,
    image: '/col-charcoal.jpg',
  },
  {
    id: 'white',
    name: 'White',
    shortName: 'White',
    hex: '#F3F4F6',
    collarHex: '#D1D5DB',
    gradientTint: 'rgba(15, 28, 48, 0.82)',
    baseCount: 30,
    image: '/col-white.jpg',
    lightShirt: true,
  },
  {
    id: 'purple',
    name: 'Purple',
    shortName: 'Purple',
    hex: '#5B21B6',
    gradientTint: 'rgba(46, 16, 98, 0.86)',
    baseCount: 28,
    image: '/col-purple.jpg',
  },
  {
    id: 'pink',
    name: 'Pink',
    shortName: 'Pink',
    hex: '#EC4899',
    gradientTint: 'rgba(98, 24, 62, 0.84)',
    baseCount: 26,
    image: '/col-pink.jpg',
  },
  {
    id: 'teal',
    name: 'Teal',
    shortName: 'Teal',
    hex: '#0D9488',
    gradientTint: 'rgba(12, 64, 62, 0.86)',
    baseCount: 40,
    image: '/col-teal.jpg',
  },
  {
    id: 'olive',
    name: 'Olive',
    shortName: 'Olive',
    hex: '#4D5D3B',
    gradientTint: 'rgba(36, 46, 26, 0.88)',
    baseCount: 24,
    image: '/col-olive.jpg',
  },
  {
    id: 'beige',
    name: 'Beige',
    shortName: 'Beige',
    hex: '#C8B696',
    collarHex: '#A69374',
    gradientTint: 'rgba(52, 42, 30, 0.84)',
    baseCount: 22,
    image: '/col-beige.jpg',
  },
]

/*Ordered swatch list matching the exact sequence in the reference image*/
const SWATCH_ORDER = [
  'navy-blue',
  'royal-blue',
  'sky-blue',
  'bottle-green',
  'wine',
  'steel-grey',
  'charcoal',
  'black',
  'white',
  'purple',
  'pink',
  'teal',
  'olive',
  'beige',
]

/* ── Miniature 3D-styled Scrub Top SVG Icon for Swatches ── */
function ScrubTopSvg({ hex, light }: { hex: string; light?: boolean }) {
  const strokeColor = light ? '#CBD5E1' : 'rgba(0,0,0,0.18)'
  return (
    <svg width="38" height="36" viewBox="0 0 64 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`grad-${hex.replace('#', '')}`} x1="0" y1="0" x2="64" y2="60" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={hex} />
          <stop offset="55%" stopColor={hex} />
          <stop offset="100%" stopColor={light ? '#E2E8F0' : '#000000'} stopOpacity={light ? '1' : '0.28'} />
        </linearGradient>
      </defs>
      {/* Drop shadow */}
      <path
        d="M20 7 L10 12 L3 25 L13 30 L16 23 L16 54 C16 55.5 17.5 56.5 19 56.5 L45 56.5 C46.5 56.5 48 55.5 48 54 L48 23 L51 30 L61 25 L54 12 L44 7 L38 7 L32 18 L26 7 Z"
        fill="rgba(10,22,40,0.08)"
        transform="translate(0, 2)"
      />
      {/* Main scrub body */}
      <path
        d="M20 7 L10 12 L3 25 L13 30 L16 23 L16 54 C16 55.5 17.5 56.5 19 56.5 L45 56.5 C46.5 56.5 48 55.5 48 54 L48 23 L51 30 L61 25 L54 12 L44 7 L38 7 L32 18 L26 7 Z"
        fill={hex}
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Subtle shading overlay */}
      <path
        d="M20 7 L10 12 L3 25 L13 30 L16 23 L16 54 C16 55.5 17.5 56.5 19 56.5 L45 56.5 C46.5 56.5 48 55.5 48 54 L48 23 L51 30 L61 25 L54 12 L44 7 L38 7 L32 18 L26 7 Z"
        fill={`url(#grad-${hex.replace('#', '')})`}
        opacity="0.35"
      />
      {/* Back neck inside */}
      <path d="M26 7 Q32 9 38 7 L32 18 Z" fill={light ? '#CBD5E1' : 'rgba(0,0,0,0.35)'} />
      {/* V-neck collar trim */}
      <path
        d="M24 7 L32 21 L40 7"
        stroke={light ? '#94A3B8' : 'rgba(255,255,255,0.28)'}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Left chest pocket */}
      <rect
        x="36"
        y="23"
        width="7.5"
        height="8.5"
        rx="1.2"
        stroke={light ? '#94A3B8' : 'rgba(255,255,255,0.32)'}
        strokeWidth="1.2"
        fill={light ? 'rgba(0,0,0,0.03)' : 'rgba(0,0,0,0.12)'}
      />
      {/* Subtle AFI badge dot on pocket */}
      <line
        x1="37.5"
        y1="25"
        x2="41.5"
        y2="25"
        stroke={light ? '#64748B' : 'rgba(255,255,255,0.55)'}
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

/* ── Multi-Colour Wheel SVG for "All Colours" Swatch ── */
function ColourWheelSvg() {
  const segments = [
    { color: '#1E3A8A', d: 'M18 4 A14 14 0 0 1 29.5 10 L23.5 13.8 A7 7 0 0 0 18 11 Z' },
    { color: '#2563EB', d: 'M29.5 10 A14 14 0 0 1 31.5 22 L24.7 20 A7 7 0 0 0 23.5 13.8 Z' },
    { color: '#0D9488', d: 'M31.5 22 A14 14 0 0 1 22 31.5 L20 24.7 A7 7 0 0 0 24.7 20 Z' },
    { color: '#1B4D3E', d: 'M22 31.5 A14 14 0 0 1 10 29.5 L13.8 23.5 A7 7 0 0 0 20 24.7 Z' },
    { color: '#881337', d: 'M10 29.5 A14 14 0 0 1 4.5 18 L11.5 18 A7 7 0 0 0 13.8 23.5 Z' },
    { color: '#D97706', d: 'M4.5 18 A14 14 0 0 1 18 4 L18 11 A7 7 0 0 0 11.5 18 Z' },
  ]
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
      {segments.map((s, idx) => (
        <path key={idx} d={s.d} fill={s.color} />
      ))}
      <circle cx="18" cy="18" r="6.2" fill="white" />
    </svg>
  )
}

/* ── Single Carousel Card ── */
function ColourCarouselCard({
  item,
  index,
  visible,
  isSelected,
  onSelect,
}: {
  item: ColourItem
  index: number
  visible: boolean
  isSelected: boolean
  onSelect: () => void
}) {
  const [hovered, setHovered] = useState(false)

  // Compute dynamic count supplemented by catalog baseCount so real product database counts are reflected
  const matchingCatalogCount = PRODUCTS.filter(p =>
    p.colors?.some(c => c.toLowerCase() === item.hex.toLowerCase())
  ).length
  const displayCount = item.baseCount + matchingCatalogCount

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${item.name} — ${displayCount} products`}
      onClick={onSelect}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect()
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="afi-colour-card"
      style={{
        position: 'relative',
        width: 'clamp(235px, 21vw, 268px)',
        height: 'clamp(350px, 31vw, 404px)',
        borderRadius: 22,
        overflow: 'hidden',
        flexShrink: 0,
        cursor: 'pointer',
        background: '#0A1628',
        scrollSnapAlign: 'start',
        userSelect: 'none',
        border: isSelected
          ? '2.5px solid var(--color-medical-blue)'
          : '1px solid rgba(10, 22, 40, 0.08)',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? 'translateY(-5px)'
            : 'translateY(0)'
          : 'translateY(28px)',
        transition: [
          `opacity 0.6s ${EASE} ${Math.min(index * 65, 420)}ms`,
          `transform 0.45s ${EASE}`,
          `box-shadow 0.4s ${EASE}`,
          `border-color 0.25s ease`,
        ].join(', '),
        boxShadow: hovered || isSelected
          ? '0 22px 48px rgba(10, 22, 40, 0.22), 0 6px 16px rgba(10, 22, 40, 0.10)'
          : '0 8px 26px rgba(10, 22, 40, 0.09)',
        outline: 'none',
      }}
    >
      {/* Full-bleed Model Image */}
      <img
        src={item.image}
        alt={`${item.name} professional uniforms`}
        loading="lazy"
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 14%',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: `transform 0.55s ${EASE}`,
        }}
      />

      {/* Bottom colour-matched gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `linear-gradient(to top, ${item.gradientTint} 0%, rgba(10, 22, 40, 0.36) 40%, rgba(10, 22, 40, 0.0) 72%)`,
          opacity: hovered ? 1 : 0.92,
          transition: 'opacity 0.4s ease',
        }}
      />

      {/* Bottom Content */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: '1.25rem 1.25rem 1.35rem',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: '0.75rem',
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(1.15rem, 1.45vw, 1.35rem)',
              color: 'white',
              letterSpacing: '-0.02em',
              lineHeight: 1.18,
              marginBottom: '0.25rem',
              textShadow: '0 2px 10px rgba(0,0,0,0.22)',
            }}
          >
            {item.name}
          </h3>
          <p
            style={{
              fontSize: '0.825rem',
              color: 'rgba(255, 255, 255, 0.84)',
              fontWeight: 500,
              letterSpacing: '0.01em',
            }}
          >
            {displayCount} products
          </p>
        </div>

        {/* Circular Glass Arrow Button */}
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: hovered
              ? 'rgba(255, 255, 255, 0.32)'
              : 'rgba(255, 255, 255, 0.20)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            flexShrink: 0,
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: `all 0.35s ${EASE}`,
          }}
        >
          <ArrowRight size={15} />
        </div>
      </div>
    </div>
  )
}

/* ── Main ShopByColour Section ── */
export default function ShopByColour() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const swatchRowRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const [visible, setVisible] = useState(false)
  const [selectedColour, setSelectedColour] = useState<string>('all')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Drag-to-scroll state for desktop mouse dragging
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)
  const hasDragged = useRef(false)

  const navigate = useNavigate()

  /* Scroll-reveal observer */
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
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* Update arrow enabled states */
  const updateScrollButtons = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 12)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 12)
  }, [])

  useEffect(() => {
    updateScrollButtons()
    window.addEventListener('resize', updateScrollButtons)
    return () => window.removeEventListener('resize', updateScrollButtons)
  }, [updateScrollButtons])

  /* Slide carousel left/right */
  const scrollCarousel = (direction: 'left' | 'right') => {
    const el = carouselRef.current
    if (!el) return
    const cardWidth = 284 // card + gap
    const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2
    el.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }

  /* Handle clicking a swatch in the bottom selector */
  const handleSwatchSelect = (colourId: string) => {
    setSelectedColour(colourId)
    const carouselEl = carouselRef.current
    if (!carouselEl) return

    if (colourId === 'all') {
      carouselEl.scrollTo({ left: 0, behavior: 'smooth' })
      return
    }

    const targetCard = cardRefs.current[colourId]
    if (targetCard) {
      const containerRect = carouselEl.getBoundingClientRect()
      const cardRect = targetCard.getBoundingClientRect()
      const offset =
        cardRect.left -
        containerRect.left +
        carouselEl.scrollLeft -
        containerRect.width / 2 +
        cardRect.width / 2
      carouselEl.scrollTo({ left: Math.max(0, offset), behavior: 'smooth' })
    }
  }

  /* Mouse drag handlers for smooth desktop carousel dragging */
  const onMouseDown = (e: React.MouseEvent) => {
    const el = carouselRef.current
    if (!el) return
    isDragging.current = true
    hasDragged.current = false
    dragStartX.current = e.pageX - el.offsetLeft
    dragScrollLeft.current = el.scrollLeft
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const el = carouselRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = (x - dragStartX.current) * 1.25
    if (Math.abs(walk) > 6) {
      hasDragged.current = true
    }
    el.scrollLeft = dragScrollLeft.current - walk
  }

  const onMouseUpOrLeave = () => {
    isDragging.current = false
  }

  /* Ordered swatches matching reference */
  const orderedSwatches = SWATCH_ORDER.map(
    id => COLOUR_ITEMS.find(c => c.id === id)!
  ).filter(Boolean)

  return (
    <section
      ref={sectionRef}
      aria-labelledby="shop-by-colour-heading"
      style={{
        position: 'relative',
        paddingBlock: 'clamp(4rem, 7vw, 6.5rem)',
        background:
          'linear-gradient(180deg, #FFFFFF 0%, #F5F9FF 52%, #F8FBFF 100%)',
        overflow: 'hidden',
      }}
    >
      {/* ── Subtle Background Curved Shapes & Glow ── */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-12%',
          right: '-8%',
          width: '55vw',
          height: '55vw',
          maxWidth: 780,
          maxHeight: 780,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(28, 77, 161, 0.055) 0%, rgba(28, 77, 161, 0.02) 48%, transparent 72%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-18%',
          left: '-10%',
          width: '48vw',
          height: '48vw',
          maxWidth: 680,
          maxHeight: 680,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(37, 99, 235, 0.045) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ════════════════════════════════════════════
          1. TOP HEADER + FEATURE INDICATORS + ARROWS
      ════════════════════════════════════════════ */}
      <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)',
          }}
        >
          {/* Left: Eyebrow + Heading + Subtitle */}
          <div
            style={{
              maxWidth: 500,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.6s ${EASE}, transform 0.6s ${EASE}`,
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                marginBottom: '0.75rem',
              }}
            >
              <div
                style={{
                  width: 30,
                  height: 2,
                  background: 'var(--color-medical-blue)',
                  borderRadius: 2,
                }}
              />
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 800,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-medical-blue)',
                }}
              >
                EXPLORE BY COLOUR
              </span>
            </div>

            {/* Main Heading */}
            <h2
              id="shop-by-colour-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.125rem, 4vw, 3.25rem)',
                color: 'var(--color-navy)',
                lineHeight: 1.06,
                letterSpacing: '-0.03em',
                marginBottom: '0.875rem',
              }}
            >
              Shop by{' '}
              <span style={{ color: '#1864AB' }}>Colour</span>
            </h2>

            {/* Supporting Copy */}
            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.1vw, 1.025rem)',
                color: 'var(--color-neutral-500)',
                lineHeight: 1.62,
                fontWeight: 400,
              }}
            >
              Find the perfect shade to represent your company, industry,
              department or brand identity. Premium colours, professional workwear.
            </p>
          </div>

          {/* Right: 3 Feature Indicators + Carousel Controls */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '1.35rem',
              marginLeft: 'auto',
              maxWidth: '100%',
            }}
            className="sbc-col-right-header"
          >
            {/* 3 Feature Indicators */}
            <div
              className="no-scrollbar"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1.125rem, 2.2vw, 2.25rem)',
                overflowX: 'auto',
                maxWidth: '100%',
                paddingBlock: '0.25rem',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(16px)',
                transition: `opacity 0.65s ${EASE} 140ms, transform 0.65s ${EASE} 140ms`,
              }}
            >
              {[
                {
                  icon: Palette,
                  title: 'Wide Colour Range',
                  sub: 'For every industry & role',
                },
                {
                  icon: Gem,
                  title: 'Premium Fabrics',
                  sub: 'Long lasting colours',
                },
                {
                  icon: Sparkles,
                  title: 'Modern & Stylish',
                  sub: 'Looks for every team',
                },
              ].map((feat, i) => (
                <div
                  key={feat.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    flexShrink: 0,
                    paddingRight: i < 2 ? 'clamp(0.5rem, 1vw, 1rem)' : 0,
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: '#EAF2FF',
                      border: '1px solid rgba(28, 77, 161, 0.10)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <feat.icon
                      size={19}
                      strokeWidth={1.8}
                      style={{ color: '#1864AB' }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.84rem',
                        color: 'var(--color-navy)',
                        lineHeight: 1.2,
                      }}
                    >
                      {feat.title}
                    </div>
                    <div
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--color-neutral-500)',
                        fontWeight: 500,
                        marginTop: 2,
                      }}
                    >
                      {feat.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls — Upper-Right */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(12px)',
                transition: `opacity 0.65s ${EASE} 240ms, transform 0.65s ${EASE} 240ms`,
              }}
            >
              {/* Left Arrow — White Circular Button */}
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                aria-label="Previous colours"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'white',
                  color: 'var(--color-navy)',
                  border: '1px solid rgba(10, 22, 40, 0.09)',
                  boxShadow: '0 4px 14px rgba(10, 22, 40, 0.07)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: canScrollLeft ? 'pointer' : 'default',
                  opacity: canScrollLeft ? 1 : 0.55,
                  transition: `all 0.25s ${EASE}`,
                }}
                onMouseEnter={e => {
                  if (canScrollLeft) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow =
                      '0 8px 20px rgba(10, 22, 40, 0.12)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow =
                    '0 4px 14px rgba(10, 22, 40, 0.07)'
                }}
              >
                <ArrowLeft size={18} />
              </button>

              {/* Right Arrow — Deep Navy Primary Circular Button */}
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                aria-label="Next colours"
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'var(--color-navy)',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 6px 20px rgba(10, 22, 40, 0.24)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: canScrollRight ? 'pointer' : 'default',
                  opacity: canScrollRight ? 1 : 0.55,
                  transition: `all 0.25s ${EASE}`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#18345E'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow =
                    '0 10px 26px rgba(10, 22, 40, 0.32)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--color-navy)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow =
                    '0 6px 20px rgba(10, 22, 40, 0.24)'
                }}
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          2. MAIN HORIZONTAL COLOUR CAROUSEL
      ════════════════════════════════════════════ */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)',
        }}
      >
        {/* Floating Left Edge Chevron Button (matches reference image) */}
        {canScrollLeft && (
          <button
            type="button"
            onClick={() => scrollCarousel('left')}
            aria-label="Scroll carousel left"
            className="sbc-floating-left-btn"
            style={{
              position: 'absolute',
              left: 'clamp(1rem, 3.5vw, 3.5rem)',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10,
              width: 44,
              height: 44,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(8px)',
              border: '1px solid rgba(10, 22, 40, 0.08)',
              boxShadow: '0 8px 24px rgba(10, 22, 40, 0.16)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-navy)',
              cursor: 'pointer',
              transition: `all 0.25s ${EASE}`,
            }}
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Scrollable Track — aligned with container on left, bleeding to viewport edge on right */}
        <div
          ref={carouselRef}
          onScroll={updateScrollButtons}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: 'clamp(0.875rem, 1.4vw, 1.25rem)',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingBlock: '0.75rem 1.25rem',
            paddingInline: 'max(1rem, calc((100vw - 1440px) / 2 + clamp(1rem, 4vw, 5rem)))',
            cursor: 'grab',
          }}
        >
          {COLOUR_ITEMS.map((item, idx) => (
            <div
              key={item.id}
              ref={el => {
                cardRefs.current[item.id] = el
              }}
              style={{ flexShrink: 0 }}
            >
              <ColourCarouselCard
                item={item}
                index={idx}
                visible={visible}
                isSelected={selectedColour === item.id}
                onSelect={() => {
                  if (hasDragged.current) return
                  navigate(`/shop?color=${encodeURIComponent(item.name)}`)
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          3. COLOUR SWATCH SELECTOR BAR + 4. BOTTOM BANNER
      ════════════════════════════════════════════ */}
      <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
        {/* Colour Swatch Selector Row */}
        <div
          ref={swatchRowRef}
          className="no-scrollbar"
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '0.625rem',
            overflowX: 'auto',
            paddingBlock: '0.35rem 0.75rem',
            marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(18px)',
            transition: `opacity 0.65s ${EASE} 320ms, transform 0.65s ${EASE} 320ms`,
          }}
        >
          {/* "All Colours" Swatch */}
          <button
            type="button"
            onClick={() => handleSwatchSelect('all')}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.45rem',
              minWidth: 78,
              padding: '0.65rem 0.625rem 0.55rem',
              borderRadius: 14,
              background:
                selectedColour === 'all' ? '#F0F6FF' : 'rgba(255, 255, 255, 0.9)',
              border:
                selectedColour === 'all'
                  ? '1.5px solid #2563EB'
                  : '1px solid rgba(10, 22, 40, 0.08)',
              boxShadow:
                selectedColour === 'all'
                  ? '0 6px 18px rgba(37, 99, 235, 0.14)'
                  : '0 2px 8px rgba(10, 22, 40, 0.04)',
              cursor: 'pointer',
              flexShrink: 0,
              transition: `all 0.22s ${EASE}`,
            }}
          >
            <ColourWheelSvg />
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: selectedColour === 'all' ? 800 : 600,
                color:
                  selectedColour === 'all'
                    ? 'var(--color-navy)'
                    : 'var(--color-neutral-600)',
                whiteSpace: 'nowrap',
                letterSpacing: '-0.01em',
              }}
            >
              All Colours
            </span>
          </button>

          {/* Individual Scrub Shirt Colour Swatches */}
          {orderedSwatches.map(swatch => {
            const active = selectedColour === swatch.id
            return (
              <button
                key={swatch.id}
                type="button"
                onClick={() => handleSwatchSelect(swatch.id)}
                onDoubleClick={() =>
                  navigate(`/shop?color=${encodeURIComponent(swatch.name)}`)
                }
                title={`Select ${swatch.name}`}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  minWidth: 78,
                  padding: '0.65rem 0.625rem 0.55rem',
                  borderRadius: 14,
                  background: active ? '#F0F6FF' : 'rgba(255, 255, 255, 0.92)',
                  border: active
                    ? '1.5px solid #2563EB'
                    : '1px solid rgba(10, 22, 40, 0.07)',
                  boxShadow: active
                    ? '0 6px 18px rgba(37, 99, 235, 0.14)'
                    : '0 2px 8px rgba(10, 22, 40, 0.04)',
                  cursor: 'pointer',
                  flexShrink: 0,
                  transform: active ? 'translateY(-2px)' : 'translateY(0)',
                  transition: `all 0.22s ${EASE}`,
                }}
                onMouseEnter={e => {
                  if (!active) {
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow =
                      '0 6px 14px rgba(10, 22, 40, 0.08)'
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow =
                      '0 2px 8px rgba(10, 22, 40, 0.04)'
                  }
                }}
              >
                <ScrubTopSvg hex={swatch.hex} light={swatch.lightShirt} />
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: active ? 800 : 600,
                    color: active
                      ? 'var(--color-navy)'
                      : 'var(--color-neutral-600)',
                    whiteSpace: 'nowrap',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {swatch.shortName}
                </span>
              </button>
            )
          })}
        </div>

        {/* ════════════════════════════════════════════
            4. BOTTOM FEATURE BANNER
        ════════════════════════════════════════════ */}
        <div
          className="sbc-colour-banner"
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr auto',
            alignItems: 'center',
            gap: 'clamp(1.25rem, 2.5vw, 2.5rem)',
            background: 'white',
            borderRadius: 22,
            border: '1px solid rgba(10, 22, 40, 0.07)',
            boxShadow: '0 10px 36px rgba(10, 22, 40, 0.06)',
            overflow: 'hidden',
            paddingRight: 'clamp(1.25rem, 2.5vw, 2.25rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.7s ${EASE} 420ms, transform 0.7s ${EASE} 420ms`,
          }}
        >
          {/* Left: Folded Scrub Fabrics Image */}
          <div
            className="sbc-colour-banner-img"
            style={{
              position: 'relative',
              height: '100%',
              minHeight: 124,
              overflow: 'hidden',
              background: '#EEF4FF',
            }}
          >
            <img
              src="/col-folded-banner.jpg"
              alt="Folded premium medical scrub fabrics"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            {/* Soft diagonal fade on right edge of image */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: 0,
                width: 48,
                background:
                  'linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%)',
              }}
            />
          </div>

          {/* Middle: Headline + 3 Feature Points */}
          <div
            className="sbc-colour-banner-body"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              paddingBlock: '1.25rem',
            }}
          >
            {/* Banner Headline */}
            <div
              style={{
                paddingRight: '1.5rem',
                borderRight: '1px solid var(--color-neutral-200)',
              }}
              className="sbc-colour-banner-title"
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: 'clamp(1.05rem, 1.5vw, 1.3rem)',
                  color: 'var(--color-navy)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                }}
              >
                Premium Colours for
                <br />
                <span style={{ color: '#1864AB' }}>
                  Every Professional Team & Industry
                </span>
              </div>
            </div>

            {/* 3 Feature Points */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1.25rem, 2.2vw, 2.25rem)',
                flexWrap: 'wrap',
                flex: 1,
                justifyContent: 'space-around',
              }}
            >
              {[
                {
                  icon: ShieldCheck,
                  title: 'Fade Resistant',
                  sub: 'Long lasting colours',
                },
                {
                  icon: Feather,
                  title: 'Soft & Breathable',
                  sub: 'All-day comfort',
                },
                {
                  icon: Sparkles,
                  title: 'Professional Look',
                  sub: 'For every department',
                },
              ].map(point => (
                <div
                  key={point.title}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      background: '#EAF2FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <point.icon
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: '#1864AB' }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.84rem',
                        color: 'var(--color-navy)',
                        lineHeight: 1.2,
                      }}
                    >
                      {point.title}
                    </div>
                    <div
                      style={{
                        fontSize: '0.74rem',
                        color: 'var(--color-neutral-500)',
                        fontWeight: 500,
                        marginTop: 2,
                      }}
                    >
                      {point.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Far Right: Explore All Colours Button */}
          <div style={{ paddingBlock: '1rem' }}>
            <Link
              to={
                selectedColour !== 'all'
                  ? `/shop?color=${encodeURIComponent(
                      COLOUR_ITEMS.find(c => c.id === selectedColour)?.name || ''
                    )}`
                  : '/shop'
              }
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'var(--color-navy)',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
                padding: '0.875rem 1.625rem',
                borderRadius: 100,
                whiteSpace: 'nowrap',
                boxShadow: '0 6px 20px rgba(10, 22, 40, 0.22)',
                transition: `all 0.25s ${EASE}`,
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#18345E'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow =
                  '0 10px 26px rgba(10, 22, 40, 0.30)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-navy)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(10, 22, 40, 0.22)'
              }}
            >
              Explore All Colours
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 1024px) {
          .sbc-colour-banner {
            grid-template-columns: 200px 1fr !important;
            padding-bottom: 1.25rem;
          }
          .sbc-colour-banner > div:last-child {
            grid-column: 1 / -1;
            padding: 0 1.5rem;
          }
          .sbc-colour-banner-title {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
        @media (max-width: 767px) {
          .sbc-col-right-header {
            align-items: flex-start !important;
            width: 100%;
          }
          .afi-colour-card {
            width: 74vw !important;
            max-width: 280px !important;
            height: 370px !important;
          }
          .sbc-floating-left-btn {
            display: none !important;
          }
          .sbc-colour-banner {
            grid-template-columns: 1fr !important;
            padding-right: 0 !important;
          }
          .sbc-colour-banner-img {
            height: 150px !important;
          }
          .sbc-colour-banner-body {
            padding-inline: 1.25rem !important;
          }
          .sbc-colour-banner > div:last-child {
            padding: 0 1.25rem 0.5rem !important;
          }
          .sbc-colour-banner > div:last-child a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
