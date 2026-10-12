/**
 * NewArrivalsSection — "New Arrivals" (Spring 2026 Collection Drop)
 * ─────────────────────────────────────────────────────────────
 * Exact implementation of the reference design:
 *  1. Header: "SPRING 2026 COLLECTION DROP" pill + "New Arrivals" + description | Top-right "View All New Arrivals →" + Filter pills ("All New", "Scrubs", "Lab Coats", "Surgical", "Jackets", "Accessories") + circular prev/next buttons
 *  2. Left Hero Composition (~50% width): Full-bleed mauve scrub editorial image with "JUST IN / SPRING 2026", "Designed for those who care ♡", 3 vertical circular glass feature items, "Released: 24 MAR 2026" pill, interactive 4-thumbnail lookbook strip, and overlapping floating glass story card ("A New Season, A Stronger You." + CTAs + 03 / 25+ / 06 stats)
 *  3. Right Product Carousel (~50% width): 3 vertical product cards visible on desktop (Plus Size Comfort Scrub Top, Women's Lab Coat, Women's Slim Fit Scrub Set + additional new arrivals on scroll/filter)
 *  4. Bottom Feature Banner: Folded multi-colour fabrics image + "NEW SEASON / Fresh silhouettes. Smarter fabrics. Better movement." + 3 feature pillars + "Explore New Collection →" CTA
 */

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Feather,
  Waves,
  ShieldCheck,
  Calendar,
  Heart,
  ShoppingBag,
  Check,
} from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { useStore } from '../context/StoreContext'
import type { Product } from '../context/StoreContext'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function formatPrice(p: number) {
  return `₹${p.toLocaleString('en-IN')}`
}

type NewArrivalFilterId =
  | 'all'
  | 'scrubs'
  | 'lab-coats'
  | 'surgical'
  | 'jackets'
  | 'accessories'

const FILTER_PILLS: { id: NewArrivalFilterId; label: string }[] = [
  { id: 'all', label: 'All New' },
  { id: 'scrubs', label: 'Scrubs' },
  { id: 'lab-coats', label: 'Lab Coats' },
  { id: 'surgical', label: 'Surgical' },
  { id: 'jackets', label: 'Jackets' },
  { id: 'accessories', label: 'Accessories' },
]

const HERO_THUMBNAILS = [
  { id: 'front', src: '/na-hero-mauve.jpg', label: 'Front lookbook view' },
  { id: 'fit', src: '/na-thumb-2.jpg', label: 'Tailored V-neck fit detail' },
  { id: 'fabric', src: '/na-thumb-3.jpg', label: 'Mauve micro-twill weave' },
  { id: 'pocket', src: '/na-thumb-4.jpg', label: 'Reinforced pocket stitching' },
]

interface CardOverrideMeta {
  badgeText: 'NEW' | 'JUST IN'
  image: string
  releaseDateLabel: string
  discountOverride?: number
  visibleSwatches: string[]
  extraColoursLabel: string
}

const CARD_OVERRIDES: Record<string, CardOverrideMeta> = {
  p010: {
    badgeText: 'NEW',
    image: '/na-prod-1.jpg',
    releaseDateLabel: '20 Mar 2026',
    discountOverride: 23,
    visibleSwatches: ['#6B21A8', '#EC4899', '#1D4ED8', '#475569'],
    extraColoursLabel: '+3 colours',
  },
  p002: {
    badgeText: 'JUST IN',
    image: '/na-prod-2.jpg',
    releaseDateLabel: '15 Mar 2026',
    discountOverride: 24,
    visibleSwatches: ['#FFFFFF', '#1E3A8A', '#64748B'],
    extraColoursLabel: '+1 colour',
  },
  p009: {
    badgeText: 'NEW',
    image: '/na-prod-3.jpg',
    releaseDateLabel: '2 Mar 2026',
    discountOverride: 18,
    visibleSwatches: ['#1D4ED8', '#EC4899', '#7C3AED', '#0D9488', '#0F172A'],
    extraColoursLabel: '+2 colours',
  },
}

/* ── Single Vertical New-Arrival Product Card ── */
function NewArrivalProductCard({
  product,
  index,
  visible,
}: {
  product: Product
  index: number
  visible: boolean
}) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore()
  const override = CARD_OVERRIDES[product.id]

  const swatches = override?.visibleSwatches || (product.colors || []).slice(0, 4)
  const [selectedColor, setSelectedColor] = useState<string>(
    swatches[0] || '#0B2744'
  )
  const [hovered, setHovered] = useState(false)
  const [wishHovered, setWishHovered] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const wishlisted = isInWishlist(product.id)

  const discount =
    override?.discountOverride ??
    (product.originalPrice
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : null)

  const badgeText = override?.badgeText || 'NEW'
  const cardImg = override?.image || product.image

  const releaseLabel =
    override?.releaseDateLabel ||
    (product.publishedAt
      ? new Date(product.publishedAt).toLocaleDateString('en-GB', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : '24 Mar 2026')

  const extraLabel =
    override?.extraColoursLabel ||
    (product.colors && product.colors.length > 4
      ? `+${product.colors.length - 4} colours`
      : '+2 colours')

  const handleAdd = () => {
    const defaultSize = product.sizes?.[0] || 'M'
    addToCart(product, defaultSize, selectedColor)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1400)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="na-product-card"
      style={{
        background: 'white',
        borderRadius: 22,
        border: '1px solid rgba(11, 39, 68, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? 'translateY(-4px)'
            : 'translateY(0)'
          : 'translateX(24px)',
        transition: [
          `opacity 0.65s ${EASE} ${180 + index * 100}ms`,
          `transform 0.45s ${EASE}`,
          `box-shadow 0.4s ${EASE}`,
        ].join(', '),
        boxShadow: hovered
          ? '0 22px 48px rgba(11, 39, 68, 0.14), 0 4px 14px rgba(11, 39, 68, 0.06)'
          : '0 6px 24px rgba(11, 39, 68, 0.05)',
      }}
    >
      {/* Top Image Frame */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1.05',
          overflow: 'hidden',
          background: '#EAF2FF',
        }}
      >
        <Link
          to={`/product/${product.id}`}
          aria-label={product.name}
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          <img
            src={cardImg}
            alt={product.name}
            loading="lazy"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 10%',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: `transform 0.55s ${EASE}`,
            }}
          />
        </Link>

        {/* Top-Left Badge: NEW or JUST IN */}
        <div
          style={{
            position: 'absolute',
            top: '0.75rem',
            left: '0.75rem',
            zIndex: 2,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '0.26rem 0.68rem',
              borderRadius: 100,
              fontSize: '0.64rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'white',
              background:
                badgeText === 'NEW'
                  ? '#146EF5'
                  : 'rgba(71, 108, 158, 0.88)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 12px rgba(11, 39, 68, 0.16)',
            }}
          >
            {badgeText}
          </span>
        </div>

        {/* Top-Right Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          onMouseEnter={() => setWishHovered(true)}
          onMouseLeave={() => setWishHovered(false)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            zIndex: 2,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(11, 39, 68, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: wishlisted
              ? '#EF4444'
              : wishHovered
                ? '#146EF5'
                : '#0B2744',
            cursor: 'pointer',
            transform: wishHovered ? 'scale(1.1)' : 'scale(1)',
            transition: `all 0.22s ${EASE}`,
            boxShadow: '0 4px 10px rgba(10, 22, 40, 0.10)',
          }}
        >
          <Heart
            size={14}
            fill={wishlisted ? '#EF4444' : 'none'}
            strokeWidth={2}
          />
        </button>
      </div>

      {/* Product Details Body */}
      <div
        style={{
          padding: '0.65rem 0.75rem 0.75rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Collection Label */}
          <div
            style={{
              fontSize: '0.55rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#3B82F6',
              marginBottom: '0.15rem',
            }}
          >
            {product.collection || 'COMFORTCARE SERIES'}
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: 'none' }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.82rem',
                color: '#0B2744',
                lineHeight: 1.2,
                letterSpacing: '-0.015em',
                marginBottom: '0.2rem',
                minHeight: '1.95rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Release Date Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.62rem',
              color: 'var(--color-neutral-500)',
              fontWeight: 500,
              marginBottom: '0.25rem',
            }}
          >
            <Calendar size={10} style={{ color: 'var(--color-neutral-400)' }} />
            <span>{releaseLabel}</span>
          </div>

          {/* Price + MRP + Discount */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.3rem',
              flexWrap: 'wrap',
              marginBottom: '0.35rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '0.88rem',
                color: '#0B2744',
                letterSpacing: '-0.02em',
              }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: '0.68rem',
                  color: 'var(--color-neutral-400)',
                  textDecoration: 'line-through',
                  fontWeight: 500,
                }}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}
            {discount && (
              <span
                style={{
                  fontSize: '0.58rem',
                  fontWeight: 800,
                  color: '#15803D',
                  background: '#DCFCE7',
                  padding: '0.1rem 0.35rem',
                  borderRadius: 4,
                }}
              >
                {discount}% OFF
              </span>
            )}
          </div>
        </div>

        {/* Colour Swatches + Compact Action Button */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.35rem',
            borderTop: '1px solid #F1F5F9',
          }}
        >
          {/* Swatches */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            {swatches.map(hex => {
              const isSelected = selectedColor === hex
              const isWhite = hex.toLowerCase() === '#ffffff'
              return (
                <button
                  key={hex}
                  type="button"
                  onClick={() => setSelectedColor(hex)}
                  aria-label={`Select colour ${hex}`}
                  style={{
                    width: 13,
                    height: 13,
                    borderRadius: '50%',
                    background: hex,
                    border: isSelected
                      ? '2px solid white'
                      : isWhite
                        ? '1px solid #CBD5E1'
                        : '1px solid rgba(0,0,0,0.12)',
                    boxShadow: isSelected
                      ? '0 0 0 1.5px #146EF5'
                      : '0 1px 2px rgba(0,0,0,0.06)',
                    padding: 0,
                    cursor: 'pointer',
                    flexShrink: 0,
                    transform: isSelected ? 'scale(1.12)' : 'scale(1)',
                    transition: 'all 0.18s ease',
                  }}
                />
              )
            })}
            <span
              style={{
                fontSize: '0.6rem',
                color: 'var(--color-neutral-400)',
                fontWeight: 600,
                marginLeft: '0.1rem',
                whiteSpace: 'nowrap',
              }}
            >
              {extraLabel}
            </span>
          </div>

          {/* Compact Add to Cart Circle */}
          <button
            type="button"
            onClick={handleAdd}
            aria-label="Add to cart"
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: justAdded
                ? '#15803D'
                : hovered
                  ? '#163B66'
                  : '#0B2744',
              color: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(11, 39, 68, 0.16)',
              transform: hovered ? 'scale(1.08)' : 'scale(1)',
              transition: `all 0.22s ${EASE}`,
            }}
          >
            {justAdded ? (
              <Check size={13} />
            ) : (
              <ShoppingBag size={13} />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Main NewArrivalsSection Component ── */
export default function NewArrivalsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const productCarouselRef = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(false)
  const [activeFilter, setActiveFilter] = useState<NewArrivalFilterId>('all')
  const [activeHeroThumb, setActiveHeroThumb] = useState<number>(0)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Auto-rotate hero campaign image
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroThumb(prev => (prev + 1) % HERO_THUMBNAILS.length)
    }, 4500)
    return () => clearInterval(timer)
  }, [])

  // Drag state for product carousel
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragScrollLeft = useRef(0)

  /* IntersectionObserver for scroll reveal */
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

  /* Ordered product list matching reference (#1 p010 Plus Size Comfort Scrub Top, #2 p002 Women's Lab Coat, #3 p009 Women's Slim Fit Scrub Set, followed by remaining newest products) */
  const filteredProducts = React.useMemo(() => {
    const priorityIds = ['p010', 'p002', 'p009']
    const sorted = [...PRODUCTS].sort((a, b) => {
      const idxA = priorityIds.indexOf(a.id)
      const idxB = priorityIds.indexOf(b.id)
      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      if (idxA !== -1) return -1
      if (idxB !== -1) return 1
      const tA = a.publishedAt ? new Date(a.publishedAt).getTime() : 0
      const tB = b.publishedAt ? new Date(b.publishedAt).getTime() : 0
      return tB - tA
    })

    return sorted.filter(p => {
      if (activeFilter === 'all') return true
      if (activeFilter === 'scrubs') return p.category === 'scrubs'
      if (activeFilter === 'lab-coats') return p.category === 'lab-coats'
      if (activeFilter === 'surgical')
        return (
          p.category === 'scrub-caps' ||
          p.name.toLowerCase().includes('surgical') ||
          p.name.toLowerCase().includes('ot ')
        )
      if (activeFilter === 'jackets')
        return p.category === 'jackets' || p.category === 'underscrubs'
      if (activeFilter === 'accessories') return p.category === 'accessories'
      return true
    })
  }, [activeFilter])

  const updateScrollButtons = useCallback(() => {
    const el = productCarouselRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 8)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 8)
  }, [])

  useEffect(() => {
    updateScrollButtons()
    window.addEventListener('resize', updateScrollButtons)
    return () => window.removeEventListener('resize', updateScrollButtons)
  }, [updateScrollButtons, filteredProducts])

  const scrollProducts = (dir: 'left' | 'right') => {
    const el = productCarouselRef.current
    if (!el) return
    const step = 230
    el.scrollBy({
      left: dir === 'left' ? -step : step,
      behavior: 'smooth',
    })
  }

  /* Mouse drag handlers */
  const onMouseDown = (e: React.MouseEvent) => {
    const el = productCarouselRef.current
    if (!el) return
    isDragging.current = true
    dragStartX.current = e.pageX - el.offsetLeft
    dragScrollLeft.current = el.scrollLeft
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const el = productCarouselRef.current
    if (!el) return
    const x = e.pageX - el.offsetLeft
    const walk = (x - dragStartX.current) * 1.2
    el.scrollLeft = dragScrollLeft.current - walk
  }

  const onMouseUpOrLeave = () => {
    isDragging.current = false
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="new-arrivals-heading"
      style={{
        position: 'relative',
        paddingBlock: 'clamp(4.25rem, 7.5vw, 7rem)',
        background:
          'linear-gradient(180deg, #F6FAFF 0%, #FFFFFF 48%, #F2F7FF 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Background Curved Glow & Diagonal Line */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-12%',
          right: '-6%',
          width: '46vw',
          height: '46vw',
          maxWidth: 660,
          maxHeight: 660,
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(20, 110, 245, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
        {/* ════════════════════════════════════════════
            1. TOP HEADER + CATEGORY FILTERS + CONTROLS
        ════════════════════════════════════════════ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: 'clamp(1.75rem, 3vw, 2.25rem)',
          }}
        >
          {/* Left: Pill + Heading + Supporting Text */}
          <div
            style={{
              maxWidth: 500,
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
                padding: '0.34rem 0.9rem',
                borderRadius: 100,
                background: '#EAF4FF',
                border: '1px solid rgba(20, 110, 245, 0.14)',
                marginBottom: '0.85rem',
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
                SPRING 2026 COLLECTION DROP
              </span>
            </div>

            {/* Main Heading */}
            <h2
              id="new-arrivals-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.125rem, 4vw, 3.25rem)',
                color: '#0B2744',
                letterSpacing: '-0.03em',
                lineHeight: 1.05,
                marginBottom: '0.75rem',
              }}
            >
              New{' '}
              <span style={{ color: '#146EF5' }}>Arrivals</span>
            </h2>

            {/* Supporting Copy */}
            <p
              style={{
                color: 'var(--color-neutral-500)',
                fontSize: 'clamp(0.88rem, 1.05vw, 0.98rem)',
                lineHeight: 1.6,
              }}
            >
              Discover the latest AFI Uniform silhouettes, premium fabrics and
              refined fits — designed for healthcare professionals who move with
              confidence.
            </p>
          </div>

          {/* Right: View All Link + Filter Pills + Prev/Next Buttons */}
          <div
            className="na-header-right"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '1.35rem',
              marginLeft: 'auto',
              maxWidth: '100%',
            }}
          >
            {/* Top-Right Link */}
            <Link
              to="/new-arrivals"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.84rem',
                fontWeight: 800,
                color: '#0B2744',
                textDecoration: 'none',
                paddingBottom: 4,
                borderBottom: '2px solid #146EF5',
                opacity: visible ? 1 : 0,
                transition: `opacity 0.65s ${EASE} 120ms`,
              }}
            >
              View All New Arrivals
              <ArrowRight size={14} />
            </Link>

            {/* Filter Pills + Carousel Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                flexWrap: 'wrap',
                maxWidth: '100%',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(14px)',
                transition: `opacity 0.65s ${EASE} 200ms, transform 0.65s ${EASE} 200ms`,
              }}
            >
              <div
                className="no-scrollbar"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  overflowX: 'auto',
                  maxWidth: '100%',
                  paddingBlock: '0.2rem',
                }}
              >
                {FILTER_PILLS.map(pill => {
                  const active = activeFilter === pill.id
                  return (
                    <button
                      key={pill.id}
                      type="button"
                      onClick={() => setActiveFilter(pill.id)}
                      style={{
                        padding: '0.5rem 1.05rem',
                        borderRadius: 100,
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-sans)',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        background: active ? '#0B2744' : 'white',
                        color: active ? 'white' : '#0B2744',
                        border: active
                          ? '1px solid #0B2744'
                          : '1px solid rgba(20, 110, 245, 0.14)',
                        boxShadow: active
                          ? '0 4px 14px rgba(11, 39, 68, 0.20)'
                          : '0 2px 6px rgba(11, 39, 68, 0.03)',
                        transition: `all 0.22s ${EASE}`,
                      }}
                    >
                      {pill.label}
                    </button>
                  )
                })}
              </div>

              {/* Prev / Next Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                <button
                  type="button"
                  onClick={() => scrollProducts('left')}
                  aria-label="Previous new arrivals"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'white',
                    color: '#0B2744',
                    border: '1px solid rgba(11, 39, 68, 0.10)',
                    boxShadow: '0 4px 12px rgba(11, 39, 68, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: canScrollLeft ? 'pointer' : 'default',
                    opacity: canScrollLeft ? 1 : 0.5,
                    transition: `all 0.22s ${EASE}`,
                  }}
                >
                  <ChevronLeft size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => scrollProducts('right')}
                  aria-label="Next new arrivals"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: '#0B2744',
                    color: 'white',
                    border: 'none',
                    boxShadow: '0 6px 16px rgba(11, 39, 68, 0.22)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: canScrollRight ? 'pointer' : 'default',
                    opacity: canScrollRight ? 1 : 0.5,
                    transition: `all 0.22s ${EASE}`,
                  }}
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            2. MAIN EDITORIAL COMPOSITION (51% HERO + 49% PRODUCT CAROUSEL)
        ════════════════════════════════════════════ */}
        <div
          className="na-main-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '32% 68%',
            gap: '1rem',
            alignItems: 'stretch',
          }}
        >
          {/* ── LEFT SIDE: CINEMATIC HERO CAMPAIGN ── */}
          <div
            className="na-hero-container"
            style={{
              position: 'relative',
              borderRadius: 22,
              overflow: 'hidden',
              minHeight: 380,
              maxHeight: 385,
              background: '#2B192E',
              boxShadow: '0 16px 42px rgba(11, 39, 68, 0.12)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'scale(1)' : 'scale(0.96)',
              transition: `opacity 0.75s ${EASE}, transform 0.75s ${EASE}`,
            }}
          >
            {/* Active Hero Image */}
            <img
              src={HERO_THUMBNAILS[activeHeroThumb].src}
              alt={HERO_THUMBNAILS[activeHeroThumb].label}
              loading="lazy"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 12%',
                transition: `transform 0.75s ${EASE}`,
              }}
            />

            {/* Left & Bottom Cinematic Readability Gradients */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(90deg, rgba(18, 22, 34, 0.68) 0%, rgba(18, 22, 34, 0.26) 44%, rgba(255, 255, 255, 0.05) 100%)',
                pointerEvents: 'none',
              }}
            />
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 50%, rgba(18, 22, 34, 0.55) 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Top-Left Editorial "JUST IN / SPRING 2026" */}
            <div
              style={{
                position: 'absolute',
                top: '1.2rem',
                left: '1.2rem',
                zIndex: 3,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.75rem, 2.2vw, 2.1rem)',
                  color: 'white',
                  lineHeight: 0.94,
                  letterSpacing: '-0.02em',
                  textShadow: '0 4px 18px rgba(0,0,0,0.28)',
                }}
              >
                JUST
                <br />
                IN
              </div>
              <div
                style={{
                  marginTop: '0.45rem',
                  fontSize: '0.66rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.88)',
                }}
              >
                SPRING 2026
              </div>
            </div>

            {/* Upper-Right Handwritten Editorial Script ("Designed for those who care ♡") */}
            <div
              style={{
                position: 'absolute',
                top: '1.2rem',
                right: '1.2rem',
                zIndex: 3,
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  fontFamily: 'Georgia, "Times New Roman", serif',
                  fontStyle: 'italic',
                  fontSize: '0.88rem',
                  color: '#1E293B',
                  lineHeight: 1.2,
                  transform: 'rotate(-6deg)',
                  textShadow: '0 1px 10px rgba(255,255,255,0.85)',
                }}
              >
                Designed
                <br />
                for those
                <br />
                who care
                <br />
                <span style={{ fontStyle: 'normal', fontSize: '0.95rem' }}>♡</span>
              </div>
            </div>

            {/* Mid-Left Vertical Feature List */}
            <div
              style={{
                position: 'absolute',
                top: '6.5rem',
                left: '1.2rem',
                zIndex: 3,
                display: 'flex',
                flexDirection: 'column',
                gap: '0.45rem',
              }}
            >
              {[
                { icon: Feather, line1: 'Premium', line2: 'Fabrics' },
                { icon: Waves, line1: 'Modern', line2: 'Silhouettes' },
                { icon: ShieldCheck, line1: 'Built for', line2: 'Real Shifts' },
              ].map((feat, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.16)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.35)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      flexShrink: 0,
                    }}
                  >
                    <feat.icon size={13} strokeWidth={1.9} />
                  </div>
                  <div style={{ lineHeight: 1.15 }}>
                    <div
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: 'white',
                        textShadow: '0 1px 6px rgba(0,0,0,0.35)',
                      }}
                    >
                      {feat.line1}
                    </div>
                    <div
                      style={{
                        fontSize: '0.66rem',
                        fontWeight: 600,
                        color: 'rgba(255, 255, 255, 0.86)',
                        textShadow: '0 1px 6px rgba(0,0,0,0.35)',
                      }}
                    >
                      {feat.line2}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom-Right Floating Glass Story Card */}
            <div
              className="na-hero-story-card"
              style={{
                position: 'absolute',
                right: '0.75rem',
                bottom: '0.75rem',
                zIndex: 4,
                width: 'clamp(195px, 52%, 235px)',
                background: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                borderRadius: 16,
                border: '1px solid rgba(255, 255, 255, 0.95)',
                boxShadow: '0 12px 32px rgba(11, 39, 68, 0.16)',
                padding: '0.85rem 0.95rem',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(20px)',
                transition: `opacity 0.7s ${EASE} 260ms, transform 0.7s ${EASE} 260ms`,
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1rem, 1.25vw, 1.15rem)',
                  color: '#0B2744',
                  lineHeight: 1.15,
                  letterSpacing: '-0.025em',
                  marginBottom: '0.25rem',
                }}
              >
                A New Season,
                <br />A{' '}
                <span style={{ color: '#146EF5' }}>Stronger You.</span>
              </h3>

              <p
                style={{
                  fontSize: '0.67rem',
                  color: 'var(--color-neutral-500)',
                  lineHeight: 1.35,
                  marginBottom: '0.55rem',
                }}
              >
                Elevated designs, advanced fabrics and all-day comfort for every
                role in healthcare.
              </p>

              {/* Primary CTA */}
              <Link
                to="/new-arrivals"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  background: '#0B2744',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.7rem',
                  padding: '0.45rem 0.9rem',
                  borderRadius: 100,
                  textDecoration: 'none',
                  boxShadow: '0 4px 12px rgba(11, 39, 68, 0.20)',
                  marginBottom: '0.35rem',
                  transition: `all 0.22s ${EASE}`,
                }}
              >
                <span>Explore Collection</span>
                <ArrowRight size={11} />
              </Link>

              {/* Secondary CTA */}
              <div>
                <Link
                  to="/shop?sort=newest"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    color: '#0B2744',
                    textDecoration: 'none',
                  }}
                >
                  <span>View Lookbook</span>
                  <ArrowRight size={11} />
                </Link>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE: 4-CARD HORIZONTAL PRODUCT CAROUSEL ── */}
          <div
            ref={productCarouselRef}
            onScroll={updateScrollButtons}
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUpOrLeave}
            onMouseLeave={onMouseUpOrLeave}
            className="no-scrollbar na-product-rail"
            style={{
              display: 'flex',
              gap: '0.65rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              cursor: 'grab',
              paddingBottom: '0.25rem',
            }}
          >
            {filteredProducts.map((product, idx) => (
              <div
                key={product.id}
                className="na-product-col"
                style={{
                  scrollSnapAlign: 'start',
                  flex: '0 0 calc((100% - 3 * 0.65rem) / 4)',
                  minWidth: 0,
                }}
              >
                <NewArrivalProductCard
                  product={product}
                  index={idx}
                  visible={visible}
                />
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 1180px) {
          .na-main-grid {
            grid-template-columns: 1fr !important;
          }
          .na-product-col {
            flex: 0 0 calc((100% - 2 * 0.75rem) / 3) !important;
          }
        }
        @media (max-width: 767px) {
          .na-header-right {
            align-items: flex-start !important;
            width: 100%;
          }
          .na-hero-container {
            min-height: 480px !important;
          }
          .na-hero-story-card {
            left: 0.75rem !important;
            right: 0.75rem !important;
            width: auto !important;
            bottom: 0.75rem !important;
          }
          .na-product-col {
            flex: 0 0 75vw !important;
            max-width: 260px !important;
          }
        }
      `}</style>
    </section>
  )
}
