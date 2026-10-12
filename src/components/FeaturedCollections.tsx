/**
 * FeaturedCollections — Section 6
 * ─────────────────────────────────────────────────────────────
 * Cinematic Collection Showcase matching the reference design:
 *  1. Editorial Header: "SIGNATURE FABRIC SERIES" pill + "Featured Collections" + 3 right-side feature indicators + circular carousel controls
 *  2. Horizontal Cinematic Carousel: 3 full collection cards + partial 4th card visible on desktop, with full-bleed Indian healthcare photography, glass numbered badges, vertical feature icon list, white pill CTA, circular arrow button, and design count
 *  3. Carousel Pagination: elongated active blue pill + dots
 *  4. Full-width Bottom Fabric Technology Banner with folded fabrics photography, ColourLock™ story, 3 feature items, and "Explore All Fabrics →" CTA
 */

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  Feather,
  Gem,
  Waves,
  ShieldCheck,
  Grid,
  Zap,
  UserCheck,
  Snowflake,
  Sun,
  Shirt,
  Star,
  Layers,
  Settings,
} from 'lucide-react'
import { PRODUCTS } from '../data/products'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

interface FeatureBullet {
  icon: React.ElementType
  lines: string[]
}

interface CollectionCardData {
  id: string
  num: string
  badge: string
  name: string
  tagline: string
  ctaLabel: string
  href: string
  baseCount: number
  countUnit: string
  image: string
  imagePosition: string
  overlayGradient: string
  hoverOverlayGradient: string
  badgeBg: string
  features: FeatureBullet[]
}

const COLLECTIONS: CollectionCardData[] = [
  {
    id: 'corporate',
    num: '01',
    badge: 'EXECUTIVE & OFFICE STANDARD',
    name: 'Corporate Pro',
    tagline: 'Tailored blazers, shirts & trousers.',
    ctaLabel: 'Shop Corporate Pro',
    href: '/collections/corporate-uniforms',
    baseCount: 65,
    countUnit: 'Designs Available',
    image: '/ind-corporate.jpg',
    imagePosition: 'center 15%',
    overlayGradient:
      'linear-gradient(180deg, rgba(11, 39, 68, 0.28) 0%, rgba(11, 39, 68, 0.46) 46%, rgba(8, 26, 48, 0.94) 100%)',
    hoverOverlayGradient:
      'linear-gradient(180deg, rgba(11, 39, 68, 0.34) 0%, rgba(11, 39, 68, 0.54) 45%, rgba(6, 20, 40, 0.97) 100%)',
    badgeBg: '#0B2744',
    features: [
      { icon: Feather, lines: ['Wrinkle-Free', 'Suits & Shirts'] },
      { icon: Grid, lines: ['Structured', 'Tailoring'] },
      { icon: ShieldCheck, lines: ['Custom Logo', 'Embroidery'] },
    ],
  },
  {
    id: 'industrial',
    num: '02',
    badge: 'FACTORY & ENGINEERING SAFETY',
    name: 'Industrial Shield',
    tagline: 'Heavy-duty reflective & technical workwear.',
    ctaLabel: 'Shop Industrial Shield',
    href: '/collections/industrial-workwear',
    baseCount: 55,
    countUnit: 'Designs Available',
    image: '/ind-industrial.jpg',
    imagePosition: 'center 15%',
    overlayGradient:
      'linear-gradient(180deg, rgba(15, 36, 66, 0.25) 0%, rgba(12, 30, 56, 0.48) 46%, rgba(8, 22, 42, 0.94) 100%)',
    hoverOverlayGradient:
      'linear-gradient(180deg, rgba(15, 36, 66, 0.32) 0%, rgba(12, 30, 56, 0.56) 45%, rgba(6, 18, 36, 0.97) 100%)',
    badgeBg: '#1769E8',
    features: [
      { icon: ShieldCheck, lines: ['3M Hi-Vis', 'Reflective'] },
      { icon: Layers, lines: ['260 GSM', 'Heavy Twill'] },
      { icon: Settings, lines: ['Triple-Needle', 'Reinforced'] },
    ],
  },
  {
    id: 'hospitality',
    num: '03',
    badge: 'LUXURY HOTELS & RESORTS',
    name: 'Hospitality Signature',
    tagline: 'Concierge, front-office & F&B elegance.',
    ctaLabel: 'Shop Hospitality Line',
    href: '/collections/hospitality-uniforms',
    baseCount: 48,
    countUnit: 'Designs Available',
    image: '/ind-hospitality.jpg',
    imagePosition: 'center 15%',
    overlayGradient:
      'linear-gradient(180deg, rgba(22, 38, 56, 0.24) 0%, rgba(18, 32, 48, 0.46) 46%, rgba(10, 22, 36, 0.94) 100%)',
    hoverOverlayGradient:
      'linear-gradient(180deg, rgba(22, 38, 56, 0.32) 0%, rgba(18, 32, 48, 0.54) 45%, rgba(8, 18, 30, 0.97) 100%)',
    badgeBg: '#087F82',
    features: [
      { icon: Gem, lines: ['Luxury', 'Suiting Drape'] },
      { icon: Star, lines: ['Bespoke', 'Piping & Trim'] },
      { icon: UserCheck, lines: ['12-Hour', 'Front-Desk Fit'] },
    ],
  },
  {
    id: 'healthcare',
    num: '04',
    badge: 'CLINICAL & HOSPITAL GRADE',
    name: 'Healthcare Essentials',
    tagline: 'Antimicrobial scrubs, lab coats & OT wear.',
    ctaLabel: 'Shop Healthcare Line',
    href: '/collections/healthcare-uniforms',
    baseCount: 70,
    countUnit: 'Designs Available',
    image: '/fc-classic.jpg',
    imagePosition: '68% 14%',
    overlayGradient:
      'linear-gradient(180deg, rgba(15, 32, 56, 0.30) 0%, rgba(12, 28, 50, 0.52) 46%, rgba(10, 22, 40, 0.95) 100%)',
    hoverOverlayGradient:
      'linear-gradient(180deg, rgba(15, 32, 56, 0.38) 0%, rgba(12, 28, 50, 0.60) 45%, rgba(8, 18, 34, 0.98) 100%)',
    badgeBg: '#0B2744',
    features: [
      { icon: Zap, lines: ['4-Way', 'AeroFlex™'] },
      { icon: Waves, lines: ['Fluid & Stain', 'Barrier'] },
      { icon: ShieldCheck, lines: ['Autoclave', 'ColourLock™'] },
    ],
  },
  {
    id: 'chef',
    num: '05',
    badge: 'CULINARY & KITCHEN SERIES',
    name: 'Culinary Master',
    tagline: 'Executive chef coats, aprons & kitchen wear.',
    ctaLabel: 'Shop Culinary Line',
    href: '/collections/chef-culinary',
    baseCount: 36,
    countUnit: 'Designs Available',
    image: '/ind-chef.jpg',
    imagePosition: 'center 15%',
    overlayGradient:
      'linear-gradient(180deg, rgba(15, 32, 56, 0.26) 0%, rgba(12, 28, 50, 0.48) 46%, rgba(10, 22, 40, 0.94) 100%)',
    hoverOverlayGradient:
      'linear-gradient(180deg, rgba(15, 32, 56, 0.34) 0%, rgba(12, 28, 50, 0.56) 45%, rgba(8, 18, 34, 0.97) 100%)',
    badgeBg: '#0B2744',
    features: [
      { icon: Snowflake, lines: ['CoolVent™', 'Mesh Back'] },
      { icon: ShieldCheck, lines: ['Oil & Stain', 'Release'] },
      { icon: Shirt, lines: ['Double-Breasted', 'Tailoring'] },
    ],
  },
  {
    id: 'security',
    num: '06',
    badge: 'TACTICAL & FACILITY GUARD',
    name: 'Security Pro',
    tagline: 'Commanding tactical shirts, trousers & epaulets.',
    ctaLabel: 'Shop Security Line',
    href: '/collections/security-uniforms',
    baseCount: 30,
    countUnit: 'Designs Available',
    image: '/ind-security.jpg',
    imagePosition: 'center 15%',
    overlayGradient:
      'linear-gradient(180deg, rgba(12, 24, 44, 0.28) 0%, rgba(10, 20, 38, 0.50) 46%, rgba(8, 16, 32, 0.95) 100%)',
    hoverOverlayGradient:
      'linear-gradient(180deg, rgba(12, 24, 44, 0.36) 0%, rgba(10, 20, 38, 0.58) 45%, rgba(6, 12, 26, 0.98) 100%)',
    badgeBg: '#1769E8',
    features: [
      { icon: ShieldCheck, lines: ['Ripstop', 'Tactical Weave'] },
      { icon: Grid, lines: ['Permanent', 'Military Crease'] },
      { icon: Star, lines: ['Epaulet &', 'Badge Tabs'] },
    ],
  },
  {
    id: 'education',
    num: '07',
    badge: 'ACADEMIC & CAMPUS IDENTITY',
    name: 'Education Classic',
    tagline: 'Blazers, shirts & crest uniforms for institutions.',
    ctaLabel: 'Shop Education Line',
    href: '/collections/school-college',
    baseCount: 44,
    countUnit: 'Designs Available',
    image: '/ind-education.jpg',
    imagePosition: 'center 15%',
    overlayGradient:
      'linear-gradient(180deg, rgba(14, 34, 62, 0.26) 0%, rgba(11, 28, 52, 0.48) 46%, rgba(8, 20, 40, 0.94) 100%)',
    hoverOverlayGradient:
      'linear-gradient(180deg, rgba(14, 34, 62, 0.34) 0%, rgba(11, 28, 52, 0.56) 45%, rgba(6, 16, 34, 0.97) 100%)',
    badgeBg: '#087F82',
    features: [
      { icon: Gem, lines: ['Gold Bullion', 'Crest Ready'] },
      { icon: Feather, lines: ['Anti-Pilling', 'Suiting Blend'] },
      { icon: Sun, lines: ['All-Season', 'Breathability'] },
    ],
  },
  {
    id: 'custom-oem',
    num: '08',
    badge: 'BESPOKE OEM MANUFACTURING',
    name: 'Custom Institutional',
    tagline: 'Private-label workwear built to your brand spec.',
    ctaLabel: 'Explore Custom OEM',
    href: '/bulk-orders',
    baseCount: 100,
    countUnit: 'Fabric Options',
    image: '/ind-logistics.jpg',
    imagePosition: 'center 15%',
    overlayGradient:
      'linear-gradient(180deg, rgba(11, 39, 68, 0.28) 0%, rgba(11, 39, 68, 0.48) 46%, rgba(8, 26, 48, 0.95) 100%)',
    hoverOverlayGradient:
      'linear-gradient(180deg, rgba(11, 39, 68, 0.36) 0%, rgba(11, 39, 68, 0.56) 45%, rgba(6, 20, 40, 0.98) 100%)',
    badgeBg: '#0B2744',
    features: [
      { icon: Layers, lines: ['Pantone', 'Shade Match'] },
      { icon: Shirt, lines: ['Custom Woven', 'Labels & Tags'] },
      { icon: ShieldCheck, lines: ['Direct Factory', 'Bulk Supply'] },
    ],
  },
]

/* ── Single Collection Campaign Card ── */
function CollectionCampaignCard({
  col,
  index,
  visible,
  onNavigate,
}: {
  col: CollectionCardData
  index: number
  visible: boolean
  onNavigate: (href: string) => void
}) {
  const [hovered, setHovered] = useState(false)

  // Supplement with real catalog count
  const catalogMatchCount = PRODUCTS.filter(
    p =>
      p.collection?.toLowerCase().includes(col.id) ||
      p.category?.toLowerCase().includes(col.id)
  ).length
  const totalCount = col.baseCount + catalogMatchCount

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${col.name} Collection — ${col.tagline}`}
      onClick={() => onNavigate(col.href)}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onNavigate(col.href)
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fc-campaign-card"
      style={{
        position: 'relative',
        width: 'clamp(305px, 28.5vw, 400px)',
        height: 'clamp(460px, 41vw, 540px)',
        borderRadius: 26,
        overflow: 'hidden',
        flexShrink: 0,
        cursor: 'pointer',
        background: '#0B2744',
        scrollSnapAlign: 'start',
        userSelect: 'none',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? 'translateY(-5px) scale(1)'
            : 'translateY(0) scale(1)'
          : 'translateY(28px) scale(0.97)',
        transition: [
          `opacity 0.65s ${EASE} ${index * 110}ms`,
          `transform 0.5s ${EASE}`,
          `box-shadow 0.45s ${EASE}`,
        ].join(', '),
        boxShadow: hovered
          ? '0 26px 58px rgba(11, 39, 68, 0.26), 0 8px 20px rgba(11, 39, 68, 0.12)'
          : '0 10px 30px rgba(11, 39, 68, 0.11)',
        outline: 'none',
      }}
    >
      {/* Full-Bleed Background Photography */}
      <img
        src={col.image}
        alt={`${col.name} professional uniforms`}
        loading="lazy"
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: col.imagePosition,
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          transition: `transform 0.65s ${EASE}`,
        }}
      />

      {/* Left-Side Readability Gradient + Bottom Cinematic Gradient */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: hovered ? col.hoverOverlayGradient : col.overlayGradient,
          transition: 'background 0.45s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(10, 22, 40, 0.48) 0%, rgba(10, 22, 40, 0.16) 48%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* Top-Left Numbered Glass Badge */}
      <div
        style={{
          position: 'absolute',
          top: '1.25rem',
          left: '1.25rem',
          zIndex: 3,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.55rem',
          padding: '0.3rem 0.9rem 0.3rem 0.35rem',
          borderRadius: 100,
          background: 'rgba(255, 255, 255, 0.18)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1px solid rgba(255, 255, 255, 0.28)',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.14)',
        }}
      >
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: '50%',
            background: col.badgeBg,
            color: 'white',
            fontSize: '0.7rem',
            fontWeight: 800,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            letterSpacing: '0.02em',
          }}
        >
          {col.num}
        </span>
        <span
          style={{
            fontSize: '0.68rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'white',
            whiteSpace: 'nowrap',
          }}
        >
          {col.badge}
        </span>
      </div>

      {/* Left-Side Mid-Card Feature Bullets with Circular Glass Icons */}
      <div
        style={{
          position: 'absolute',
          top: '5.25rem',
          left: '1.25rem',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          gap: '0.85rem',
        }}
      >
        {col.features.map((feat, fIdx) => (
          <div
            key={fIdx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '50%',
                background: hovered
                  ? 'rgba(255, 255, 255, 0.24)'
                  : 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.34)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                flexShrink: 0,
                boxShadow: hovered
                  ? '0 0 16px rgba(255, 255, 255, 0.22)'
                  : 'none',
                transition: `all 0.35s ${EASE}`,
              }}
            >
              <feat.icon size={16} strokeWidth={1.9} />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                lineHeight: 1.2,
              }}
            >
              {feat.lines.map((line, lIdx) => (
                <span
                  key={lIdx}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.94)',
                    textShadow: '0 1px 6px rgba(0,0,0,0.35)',
                  }}
                >
                  {line}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Content Block */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 3,
          padding: '1.5rem 1.5rem 1.4rem',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Collection Title */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 900,
            fontSize: 'clamp(2rem, 2.6vw, 2.5rem)',
            color: 'white',
            letterSpacing: '-0.03em',
            lineHeight: 1.05,
            marginBottom: '0.35rem',
            textShadow: '0 2px 14px rgba(0, 0, 0, 0.28)',
          }}
        >
          {col.name}
        </h3>

        {/* Tagline */}
        <p
          style={{
            fontSize: '0.9rem',
            color: 'rgba(255, 255, 255, 0.88)',
            fontWeight: 500,
            marginBottom: '1.15rem',
            lineHeight: 1.4,
          }}
        >
          {col.tagline}
        </p>

        {/* CTA Row: White Pill Button + Right Circular Glass Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            marginBottom: '1.1rem',
            transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
            transition: `transform 0.35s ${EASE}`,
          }}
        >
          {/* White Pill CTA */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              background: 'white',
              color: '#0B2744',
              fontWeight: 800,
              fontSize: '0.84rem',
              padding: '0.72rem 1.35rem',
              borderRadius: 100,
              boxShadow: hovered
                ? '0 8px 24px rgba(0, 0, 0, 0.28)'
                : '0 4px 14px rgba(0, 0, 0, 0.16)',
              transition: `all 0.3s ${EASE}`,
              letterSpacing: '-0.01em',
            }}
          >
            <span>{col.ctaLabel}</span>
            <ArrowRight
              size={14}
              style={{
                transform: hovered ? 'translateX(3px)' : 'translateX(0)',
                transition: `transform 0.3s ${EASE}`,
              }}
            />
          </div>

          {/* Right Circular Glass Arrow */}
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: hovered
                ? 'rgba(255, 255, 255, 0.28)'
                : 'rgba(255, 255, 255, 0.14)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              border: '1px solid rgba(255, 255, 255, 0.38)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              flexShrink: 0,
              transform: hovered ? 'translateX(3px)' : 'translateX(0)',
              transition: `all 0.35s ${EASE}`,
            }}
          >
            <ArrowRight size={16} />
          </div>
        </div>

        {/* Bottom Statistic Row */}
        <div
          style={{
            paddingTop: '0.75rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.16)',
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.5rem',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: '1.15rem',
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            {totalCount}+
          </span>
          <span
            style={{
              fontSize: '0.78rem',
              color: 'rgba(255, 255, 255, 0.72)',
              fontWeight: 500,
            }}
          >
            {col.countUnit}
          </span>
        </div>
      </div>
    </div>
  )
}

/* ── Main FeaturedCollections Section ── */
export default function FeaturedCollections() {
  const sectionRef = useRef<HTMLElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Desktop mouse drag support
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)
  const hasDragged = useRef(false)

  const navigate = useNavigate()

  /* Scroll-reveal intersection observer */
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
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  /* Sync scroll state and active dot */
  const handleScroll = useCallback(() => {
    const el = carouselRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    setCanScrollLeft(el.scrollLeft > 12)
    setCanScrollRight(el.scrollLeft < maxScroll - 12)

    if (maxScroll > 0) {
      const ratio = el.scrollLeft / maxScroll
      const idx = Math.min(2, Math.round(ratio * 2))
      setActiveIndex(idx)
    }
  }, [])

  useEffect(() => {
    handleScroll()
    window.addEventListener('resize', handleScroll)
    return () => window.removeEventListener('resize', handleScroll)
  }, [handleScroll])

  /* Next / Prev button handler */
  const scrollByCard = (dir: 'left' | 'right') => {
    const el = carouselRef.current
    if (!el) return
    const step = 410
    el.scrollBy({
      left: dir === 'left' ? -step : step,
      behavior: 'smooth',
    })
  }

  /* Pagination dot click */
  const scrollToDot = (dotIdx: number) => {
    const el = carouselRef.current
    if (!el) return
    const maxScroll = el.scrollWidth - el.clientWidth
    const target = (dotIdx / 2) * maxScroll
    el.scrollTo({ left: target, behavior: 'smooth' })
    setActiveIndex(dotIdx)
  }

  /* Drag handlers */
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

  return (
    <section
      ref={sectionRef}
      aria-labelledby="featured-collections-heading"
      style={{
        position: 'relative',
        paddingBlock: 'clamp(4.25rem, 7.5vw, 7rem)',
        background:
          'linear-gradient(180deg, #F6FAFF 0%, #FFFFFF 45%, #F2F7FF 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle curved ambient background shapes */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-6%',
          width: '50vw',
          height: '50vw',
          maxWidth: 720,
          maxHeight: 720,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(20, 110, 245, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '-8%',
          width: '45vw',
          height: '45vw',
          maxWidth: 640,
          maxHeight: 640,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(11, 39, 68, 0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* ════════════════════════════════════════════
          1. SECTION HEADER + FEATURE INDICATORS + CONTROLS
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
          {/* Left: Eyebrow Pill + Heading + Supporting Copy */}
          <div
            style={{
              maxWidth: 520,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.65s ${EASE}, transform 0.65s ${EASE}`,
            }}
          >
            {/* Eyebrow Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 0.9rem',
                borderRadius: 100,
                background: '#EAF4FF',
                border: '1px solid rgba(20, 110, 245, 0.14)',
                marginBottom: '0.9rem',
              }}
            >
              <Feather size={13} style={{ color: '#146EF5' }} />
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#146EF5',
                }}
              >
                SIGNATURE FABRIC SERIES
              </span>
            </div>

            {/* Main Heading */}
            <h2
              id="featured-collections-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.125rem, 4vw, 3.25rem)',
                color: '#0B2744',
                letterSpacing: '-0.03em',
                lineHeight: 1.06,
                marginBottom: '0.85rem',
              }}
            >
              Featured{' '}
              <span style={{ color: '#146EF5' }}>Collections</span>
            </h2>

            {/* Supporting Copy */}
            <p
              style={{
                color: 'var(--color-neutral-500)',
                fontSize: 'clamp(0.9rem, 1.1vw, 1.025rem)',
                lineHeight: 1.6,
                maxWidth: 480,
              }}
            >
              Three iconic uniform lines engineered with distinct fabric
              compositions, drape ergonomics, and shift endurance.
            </p>
          </div>

          {/* Right: 3 Compact Premium Indicators + Carousel Arrows */}
          <div
            className="fc-header-right"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '1.25rem',
              marginLeft: 'auto',
              maxWidth: '100%',
            }}
          >
            {/* 3 Feature Indicators */}
            <div
              className="no-scrollbar"
              style={{
                display: 'flex',
                alignItems: 'center',
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
                  icon: Gem,
                  title: 'Premium\nFabric Blends',
                  sub: 'Engineered for Performance',
                },
                {
                  icon: Waves,
                  title: 'All-Day\nComfort',
                  sub: 'Lightweight & Breathable',
                },
                {
                  icon: ShieldCheck,
                  title: 'Built for\nProfessionals',
                  sub: 'Trusted Across India',
                },
              ].map((ind, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    paddingInline: idx === 0 ? '0 1.35rem' : idx === 1 ? '1.35rem' : '1.35rem 0',
                    borderRight:
                      idx < 2 ? '1px solid rgba(11, 39, 68, 0.09)' : 'none',
                    flexShrink: 0,
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: '50%',
                      background: '#EAF4FF',
                      border: '1px solid rgba(20, 110, 245, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <ind.icon
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: '#146EF5' }}
                    />
                  </div>
                  <div>
                    {ind.title.split('\n').map((line, lIdx) => (
                      <div
                        key={lIdx}
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          color: '#0B2744',
                          lineHeight: 1.2,
                        }}
                      >
                        {line}
                      </div>
                    ))}
                    <div
                      style={{
                        fontSize: '0.7rem',
                        color: 'var(--color-neutral-400)',
                        fontWeight: 500,
                        marginTop: 2,
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {ind.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Controls */}
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
              {/* Previous: White Circular Button */}
              <button
                type="button"
                onClick={() => scrollByCard('left')}
                aria-label="Previous collection"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: 'white',
                  color: '#0B2744',
                  border: '1px solid rgba(11, 39, 68, 0.10)',
                  boxShadow: '0 4px 14px rgba(11, 39, 68, 0.07)',
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
                      '0 8px 20px rgba(11, 39, 68, 0.12)'
                  }
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow =
                    '0 4px 14px rgba(11, 39, 68, 0.07)'
                }}
              >
                <ArrowLeft size={17} />
              </button>

              {/* Next: Deep Navy Circular Button */}
              <button
                type="button"
                onClick={() => scrollByCard('right')}
                aria-label="Next collection"
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: '50%',
                  background: '#0B2744',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 6px 20px rgba(11, 39, 68, 0.24)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: canScrollRight ? 'pointer' : 'default',
                  transition: `all 0.25s ${EASE}`,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#163B66'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow =
                    '0 10px 26px rgba(11, 39, 68, 0.32)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#0B2744'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow =
                    '0 6px 20px rgba(11, 39, 68, 0.24)'
                }}
              >
                <ArrowRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          2. HORIZONTAL CINEMATIC COLLECTION CAROUSEL
      ════════════════════════════════════════════ */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          className="no-scrollbar"
          style={{
            display: 'flex',
            gap: 'clamp(1rem, 1.6vw, 1.35rem)',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingBlock: '0.5rem 1.25rem',
            paddingInline:
              'max(1rem, calc((100vw - 1440px) / 2 + clamp(1rem, 4vw, 5rem)))',
            cursor: 'grab',
          }}
        >
          {COLLECTIONS.map((col, idx) => (
            <CollectionCampaignCard
              key={col.id}
              col={col}
              index={idx}
              visible={visible}
              onNavigate={href => {
                if (hasDragged.current) return
                navigate(href)
              }}
            />
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          3. CAROUSEL PAGINATION DOTS
      ════════════════════════════════════════════ */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.45rem',
          marginTop: '0.5rem',
          marginBottom: 'clamp(1.75rem, 3vw, 2.5rem)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {[0, 1, 2].map(dotIdx => {
          const isActive = activeIndex === dotIdx
          return (
            <button
              key={dotIdx}
              type="button"
              onClick={() => scrollToDot(dotIdx)}
              aria-label={`Go to slide ${dotIdx + 1}`}
              style={{
                width: isActive ? 26 : 8,
                height: 8,
                borderRadius: 100,
                background: isActive ? '#146EF5' : '#CBD5E1',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: `all 0.35s ${EASE}`,
              }}
            />
          )
        })}
      </div>

      {/* ════════════════════════════════════════════
          4. BOTTOM FABRIC TECHNOLOGY BANNER
      ════════════════════════════════════════════ */}
      <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="fc-fabric-banner"
          style={{
            display: 'grid',
            gridTemplateColumns: '270px 1fr auto',
            alignItems: 'center',
            gap: 'clamp(1.25rem, 2.5vw, 2.25rem)',
            background: 'white',
            borderRadius: 24,
            border: '1px solid rgba(11, 39, 68, 0.08)',
            boxShadow: '0 12px 38px rgba(11, 39, 68, 0.06)',
            overflow: 'hidden',
            paddingRight: 'clamp(1.25rem, 2.5vw, 2.25rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.7s ${EASE} 380ms, transform 0.7s ${EASE} 380ms`,
          }}
        >
          {/* Left: Folded Multi-Colour Fabrics Image */}
          <div
            className="fc-fabric-banner-img"
            style={{
              position: 'relative',
              height: '100%',
              minHeight: 132,
              overflow: 'hidden',
              background: '#EAF4FF',
            }}
          >
            <img
              src="/fc-fabric-banner.jpg"
              alt="Folded AFI medical uniform fabrics"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            {/* Diagonal white edge cut matching reference */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: -1,
                width: 44,
                background: 'white',
                clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
                opacity: 0.96,
              }}
            />
          </div>

          {/* Center: ColourLock™ Story + 3 Feature Points */}
          <div
            className="fc-fabric-banner-body"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              paddingBlock: '1.25rem',
            }}
          >
            {/* Left Text Block */}
            <div
              className="fc-fabric-banner-title"
              style={{
                paddingRight: '1.75rem',
                borderRight: '1px solid rgba(11, 39, 68, 0.09)',
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.05rem, 1.45vw, 1.28rem)',
                  color: '#0B2744',
                  lineHeight: 1.25,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.35rem',
                }}
              >
                All 3 Lines Feature
                <br />
                Autoclave-Safe{' '}
                <span style={{ color: '#146EF5' }}>ColourLock™</span>
              </div>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-neutral-500)',
                  fontWeight: 500,
                }}
              >
                <strong style={{ color: '#0B2744' }}>Fade-resistant.</strong>{' '}
                Long lasting. Made for real work environments.
              </p>
            </div>

            {/* 3 Feature Points */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(1.25rem, 2vw, 2rem)',
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
                  title: 'Easy to Maintain',
                  sub: 'Retains shape & softness',
                },
                {
                  icon: Settings,
                  title: 'Built for Hospitals',
                  sub: 'Designed for daily use',
                },
              ].map(item => (
                <div
                  key={item.title}
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
                      background: '#EAF4FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <item.icon
                      size={18}
                      strokeWidth={1.8}
                      style={{ color: '#146EF5' }}
                    />
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '0.84rem',
                        color: '#0B2744',
                        lineHeight: 1.2,
                      }}
                    >
                      {item.title}
                    </div>
                    <div
                      style={{
                        fontSize: '0.73rem',
                        color: 'var(--color-neutral-500)',
                        fontWeight: 500,
                        marginTop: 2,
                      }}
                    >
                      {item.sub}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Explore All Fabrics Button */}
          <div style={{ paddingBlock: '1rem' }}>
            <Link
              to="/shop"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.55rem',
                background: '#0B2744',
                color: 'white',
                fontWeight: 700,
                fontSize: '0.875rem',
                padding: '0.9rem 1.65rem',
                borderRadius: 14,
                whiteSpace: 'nowrap',
                boxShadow: '0 6px 20px rgba(11, 39, 68, 0.22)',
                transition: `all 0.25s ${EASE}`,
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#163B66'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow =
                  '0 10px 26px rgba(11, 39, 68, 0.30)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#0B2744'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow =
                  '0 6px 20px rgba(11, 39, 68, 0.22)'
              }}
            >
              Explore All Fabrics
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      {/* Responsive Overrides */}
      <style>{`
        @media (max-width: 1024px) {
          .fc-fabric-banner {
            grid-template-columns: 200px 1fr !important;
            padding-bottom: 1.25rem;
          }
          .fc-fabric-banner > div:last-child {
            grid-column: 1 / -1;
            padding: 0 1.5rem;
          }
          .fc-fabric-banner-title {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
        @media (max-width: 767px) {
          .fc-header-right {
            align-items: flex-start !important;
            width: 100%;
          }
          .fc-campaign-card {
            width: 82vw !important;
            max-width: 340px !important;
            height: 470px !important;
          }
          .fc-fabric-banner {
            grid-template-columns: 1fr !important;
            padding-right: 0 !important;
          }
          .fc-fabric-banner-img {
            height: 155px !important;
          }
          .fc-fabric-banner-body {
            padding-inline: 1.25rem !important;
          }
          .fc-fabric-banner > div:last-child {
            padding: 0 1.25rem 0.5rem !important;
          }
          .fc-fabric-banner > div:last-child a {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  )
}
