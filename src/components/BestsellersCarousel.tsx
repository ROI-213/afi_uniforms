/**
 * BestsellersCarousel — "India's Most-Ordered Uniforms"
 * ─────────────────────────────────────────────────────────────
 * Premium Bestseller Showcase matching the reference design:
 *  1. Header: "TRUSTED CHOICE" eyebrow + "India's Most-Ordered Uniforms" + floating right-side Trust Metrics Panel (50,000+ / 500+ / 1,000+)
 *  2. Category Navigation Bar: 6 filter pills ("All Ranked Styles", "Scrubs & Sets", "Lab Coats", "Jackets & Base Layers", "Surgical Wear", "Accessories") + "View All Rankings →" + circular prev/next buttons
 *  3. 4 Large Cinematic Product Showcases with rank badges (#1 crown, #2, #3 gold, #4), "BEST SELLER · X.XK SOLD" pill, wishlist heart button, 3 floating performance feature pills, floating garment thumbnail card, collection + rating row, price + MRP + discount badge, interactive colour swatches, and full-width deep navy "Add to Cart" button
 *  4. Bottom Fabric Technology Banner with folded fabrics photography, ColourLock™ story, 3 feature pillars, and "Trusted by India's Healthcare Heroes ♡" script badge
 */

import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Heart,
  Star,
  ShoppingCart,
  Check,
  Crown,
  Users,
  Building2,
  ShieldCheck,
  Sparkles,
  Wind,
  CheckCircle2,
  Move,
  Feather,
  Award,
  Layers,
  Scissors,
  Settings,
} from 'lucide-react'
import type { Product } from '../context/StoreContext'
import { useStore } from '../context/StoreContext'
import { PRODUCTS } from '../data/products'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function formatPrice(p: number) {
  return `₹${p.toLocaleString('en-IN')}`
}

function formatReviewCount(n?: number) {
  if (!n) return '0'
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`
  return `${n}`
}

interface FloatingPillSpec {
  icon: React.ElementType
  line1: string
  line2?: string
}

interface BestsellerCardMeta {
  thumbnail: string
  maxVisibleSwatches: number
  extraColoursCount: number
  features: FloatingPillSpec[]
}

const PRODUCT_SHOWCASE_META: Record<string, BestsellerCardMeta> = {
  p009: {
    thumbnail: '/bs-thumb-1.jpg',
    maxVisibleSwatches: 5,
    extraColoursCount: 2,
    features: [
      { icon: Sparkles, line1: 'Ultra Soft', line2: 'Fabric' },
      { icon: Wind, line1: 'Breathable', line2: '& Lightweight' },
      { icon: CheckCircle2, line1: 'All-Day', line2: 'Comfort' },
    ],
  },
  p001: {
    thumbnail: '/bs-thumb-2.jpg',
    maxVisibleSwatches: 5,
    extraColoursCount: 4,
    features: [
      { icon: Move, line1: '4-Way', line2: 'Stretch' },
      { icon: ShieldCheck, line1: 'Fade', line2: 'Resistant' },
      { icon: Settings, line1: 'Easy Care', line2: 'Fabric' },
    ],
  },
  p002: {
    thumbnail: '/bs-thumb-3.jpg',
    maxVisibleSwatches: 3,
    extraColoursCount: 1,
    features: [
      { icon: Award, line1: 'Premium', line2: 'Poly-Cotton' },
      { icon: ShieldCheck, line1: 'Wrinkle', line2: 'Resistant' },
      { icon: CheckCircle2, line1: 'Professional', line2: 'Look' },
    ],
  },
  p005: {
    thumbnail: '/bs-thumb-4.jpg',
    maxVisibleSwatches: 5,
    extraColoursCount: 3,
    features: [
      { icon: Move, line1: 'Ergonomic', line2: 'Fit' },
      { icon: Layers, line1: 'Deep', line2: 'Pockets' },
      { icon: Scissors, line1: 'Durable', line2: 'Stitching' },
    ],
  },
}

const DEFAULT_META: BestsellerCardMeta = {
  thumbnail: '/bs-thumb-1.jpg',
  maxVisibleSwatches: 4,
  extraColoursCount: 2,
  features: [
    { icon: Sparkles, line1: 'Clinical', line2: 'Grade' },
    { icon: Wind, line1: 'Breathable', line2: 'Weave' },
    { icon: ShieldCheck, line1: 'Autoclave', line2: 'Safe' },
  ],
}

type CategoryFilterId =
  | 'all'
  | 'healthcare'
  | 'corporate'
  | 'industrial'
  | 'hospitality'
  | 'security'

const FILTER_TABS: { id: CategoryFilterId; label: string; hasCrown?: boolean }[] = [
  { id: 'all', label: 'All Ranked Styles', hasCrown: true },
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'industrial', label: 'Industrial' },
  { id: 'hospitality', label: 'Hospitality' },
  { id: 'security', label: 'Security & Edu' },
]

/* ── Single Showcase Product Card ── */
function BestsellerShowcaseCard({
  product,
  rank,
  index,
  visible,
}: {
  product: Product
  rank: number
  index: number
  visible: boolean
}) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore()
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0] || '#0A1628'
  )
  const [hovered, setHovered] = useState(false)
  const [wishHovered, setWishHovered] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const wishlisted = isInWishlist(product.id)
  const meta = PRODUCT_SHOWCASE_META[product.id] || {
    ...DEFAULT_META,
    thumbnail: product.secondaryImage || product.image,
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  const soldCountK = ((product.salesCount ?? 1500) / 1000).toFixed(1)

  const visibleSwatches = (product.colors || []).slice(0, meta.maxVisibleSwatches)
  const extraCount =
    product.colors && product.colors.length > meta.maxVisibleSwatches
      ? product.colors.length - meta.maxVisibleSwatches
      : meta.extraColoursCount

  /* Rank badge styling per reference:
     #1 -> Vibrant blue pill with crown icon
     #2 -> Soft blue pill (#DBEAFE / #1E40AF)
     #3 -> Soft gold pill (#FEF3C7 / #B45309)
     #4+ -> Soft blue pill (#DBEAFE / #1E40AF)
  */
  const getRankStyle = (r: number) => {
    if (r === 1) {
      return {
        background: 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
        color: '#FFFFFF',
        border: '1px solid rgba(255,255,255,0.25)',
      }
    }
    if (r === 3) {
      return {
        background: '#FDE68A',
        color: '#92400E',
        border: '1px solid rgba(217, 119, 6, 0.25)',
      }
    }
    return {
      background: '#DBEAFE',
      color: '#1E40AF',
      border: '1px solid rgba(37, 99, 235, 0.2)',
    }
  }

  const handleAddToCart = () => {
    const defaultSize = product.sizes?.[1] || product.sizes?.[0] || 'M'
    addToCart(product, defaultSize, selectedColor)
    setJustAdded(true)
    setTimeout(() => setJustAdded(false), 1400)
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bs-showcase-card"
      style={{
        background: 'white',
        borderRadius: 24,
        border: '1px solid rgba(11, 39, 68, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered
            ? 'translateY(-5px) scale(1)'
            : 'translateY(0) scale(1)'
          : 'translateY(28px) scale(0.96)',
        transition: [
          `opacity 0.65s ${EASE} ${index * 100}ms`,
          `transform 0.5s ${EASE}`,
          `box-shadow 0.45s ${EASE}`,
        ].join(', '),
        boxShadow: hovered
          ? '0 24px 54px rgba(11, 39, 68, 0.16), 0 6px 18px rgba(11, 39, 68, 0.08)'
          : '0 8px 28px rgba(11, 39, 68, 0.06)',
      }}
    >
      {/* ── 1. LARGE EDITORIAL IMAGE AREA ── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '1 / 1.06',
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
            src={product.image}
            alt={product.name}
            loading="lazy"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 12%',
              transform: hovered ? 'scale(1.038)' : 'scale(1)',
              transition: `transform 0.55s ${EASE}`,
            }}
          />
        </Link>

        {/* Subtle bottom gradient for floating elements contrast */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(10,22,40,0.08) 0%, transparent 32%, transparent 62%, rgba(10,22,40,0.22) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* Top-Left: Rank Pill + Best Seller Sold Pill */}
        <div
          style={{
            position: 'absolute',
            top: '0.85rem',
            left: '0.85rem',
            zIndex: 3,
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
          }}
        >
          {/* Rank Badge */}
          <span
            style={{
              ...getRankStyle(rank),
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.25rem',
              padding: '0.28rem 0.65rem',
              borderRadius: 100,
              fontSize: '0.74rem',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.01em',
              boxShadow: '0 4px 12px rgba(10, 22, 40, 0.14)',
            }}
          >
            {rank === 1 && (
              <Crown
                size={12}
                fill="#FBBF24"
                stroke="#FBBF24"
                style={{ marginRight: 1 }}
              />
            )}
            #{rank}
          </span>

          {/* Best Seller Sold Pill */}
          <span
            style={{
              background: 'rgba(11, 39, 68, 0.90)',
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
              color: 'white',
              padding: '0.3rem 0.72rem',
              borderRadius: 100,
              fontSize: '0.64rem',
              fontWeight: 800,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255, 255, 255, 0.16)',
              boxShadow: '0 4px 12px rgba(10, 22, 40, 0.16)',
              whiteSpace: 'nowrap',
            }}
          >
            BEST SELLER · {soldCountK}K SOLD
          </span>
        </div>

        {/* Top-Right: Circular White Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          onMouseEnter={() => setWishHovered(true)}
          onMouseLeave={() => setWishHovered(false)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            zIndex: 3,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
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
            transform: wishHovered ? 'scale(1.08)' : 'scale(1)',
            transition: `all 0.25s ${EASE}`,
            boxShadow: '0 4px 14px rgba(10, 22, 40, 0.12)',
          }}
        >
          <Heart
            size={16}
            fill={wishlisted ? '#EF4444' : 'none'}
            strokeWidth={2}
          />
        </button>

        {/* Bottom-Left: 3 Stacked Floating Performance Feature Pills */}
        <div
          style={{
            position: 'absolute',
            left: '0.75rem',
            bottom: '0.75rem',
            zIndex: 3,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
            transition: `transform 0.45s ${EASE}`,
          }}
        >
          {meta.features.map((feat, fIdx) => (
            <div
              key={fIdx}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.95)',
                borderRadius: 11,
                padding: '0.32rem 0.65rem 0.32rem 0.4rem',
                boxShadow: '0 4px 14px rgba(10, 22, 40, 0.10)',
              }}
            >
              <div
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: '#EAF4FF',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#146EF5',
                  flexShrink: 0,
                }}
              >
                <feat.icon size={12} strokeWidth={2} />
              </div>
              <div style={{ lineHeight: 1.15 }}>
                <div
                  style={{
                    fontSize: '0.66rem',
                    fontWeight: 800,
                    color: '#0B2744',
                  }}
                >
                  {feat.line1}
                </div>
                {feat.line2 && (
                  <div
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: 600,
                      color: 'var(--color-neutral-500)',
                    }}
                  >
                    {feat.line2}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom-Right: Floating Garment Thumbnail Card */}
        <Link
          to={`/product/${product.id}`}
          aria-label={`View ${product.name} garment detail`}
          style={{
            position: 'absolute',
            right: '0.75rem',
            bottom: '0.75rem',
            zIndex: 3,
            width: 68,
            height: 78,
            borderRadius: 14,
            background: 'white',
            border: '2.5px solid white',
            boxShadow: '0 8px 22px rgba(10, 22, 40, 0.18)',
            overflow: 'hidden',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: `transform 0.4s ${EASE}`,
          }}
        >
          <img
            src={meta.thumbnail}
            alt={`${product.name} thumbnail`}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top',
            }}
          />
        </Link>
      </div>

      {/* ── 2. PRODUCT INFORMATION PANEL ── */}
      <div
        style={{
          padding: '1.15rem 1.25rem 1.25rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Collection Name + Rating Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '0.5rem',
              marginBottom: '0.35rem',
            }}
          >
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 800,
                letterSpacing: '0.09em',
                textTransform: 'uppercase',
                color: 'var(--color-neutral-400)',
              }}
            >
              {product.collection || 'CORE SERIES'}
            </span>

            {product.rating && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.22rem',
                }}
              >
                <Star size={12} fill="#F59E0B" stroke="#F59E0B" />
                <span
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: '#0B2744',
                  }}
                >
                  {product.rating.toFixed(1)}
                </span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    color: 'var(--color-neutral-400)',
                    fontWeight: 500,
                  }}
                >
                  ({formatReviewCount(product.reviewCount)})
                </span>
              </div>
            )}
          </div>

          {/* Product Name */}
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: 'none' }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1.08rem',
                color: '#0B2744',
                lineHeight: 1.28,
                letterSpacing: '-0.02em',
                marginBottom: '0.6rem',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {product.name}
            </h3>
          </Link>

          {/* Price + MRP + Discount Pill */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.85rem',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.22rem',
                color: '#0B2744',
                letterSpacing: '-0.02em',
              }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span
                style={{
                  fontSize: '0.82rem',
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
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#15803D',
                  background: '#DCFCE7',
                  padding: '0.18rem 0.5rem',
                  borderRadius: 6,
                  letterSpacing: '0.02em',
                }}
              >
                {discount}% OFF
              </span>
            )}
          </div>

          {/* Colour Circles + "+N colours" */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              marginBottom: '1.1rem',
            }}
          >
            {visibleSwatches.map(hex => {
              const isSelected = selectedColor === hex
              const isWhite = hex.toLowerCase() === '#ffffff'
              return (
                <button
                  key={hex}
                  type="button"
                  onClick={() => setSelectedColor(hex)}
                  aria-label={`Select colour ${hex}`}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: hex,
                    border: isSelected
                      ? '2px solid white'
                      : isWhite
                        ? '1px solid #CBD5E1'
                        : '1px solid rgba(0,0,0,0.12)',
                    boxShadow: isSelected
                      ? '0 0 0 1.8px #146EF5'
                      : '0 1px 3px rgba(0,0,0,0.08)',
                    padding: 0,
                    cursor: 'pointer',
                    transform: isSelected ? 'scale(1.12)' : 'scale(1)',
                    transition: 'all 0.18s ease',
                    flexShrink: 0,
                  }}
                />
              )
            })}
            {extraCount > 0 && (
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-neutral-500)',
                  fontWeight: 600,
                  marginLeft: '0.15rem',
                  whiteSpace: 'nowrap',
                }}
              >
                +{extraCount} {extraCount === 1 ? 'colour' : 'colours'}
              </span>
            )}
          </div>
        </div>

        {/* Full-Width Deep Navy Add to Cart Button */}
        <button
          type="button"
          onClick={handleAddToCart}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            padding: '0.78rem 1rem',
            borderRadius: 12,
            background: justAdded
              ? '#15803D'
              : hovered
                ? '#133863'
                : '#0B2744',
            color: 'white',
            border: 'none',
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            boxShadow: hovered
              ? '0 8px 20px rgba(11, 39, 68, 0.24)'
              : '0 4px 12px rgba(11, 39, 68, 0.14)',
            transition: `all 0.28s ${EASE}`,
          }}
        >
          {justAdded ? (
            <>
              <Check size={16} />
              <span>Added to Cart</span>
            </>
          ) : (
            <>
              <ShoppingCart size={15} />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

/* ── Main BestsellersCarousel Component ── */
export default function BestsellersCarousel() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)

  const [visible, setVisible] = useState(false)
  const [activeTab, setActiveTab] = useState<CategoryFilterId>('all')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  // Drag-to-scroll state
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

  /* Filter products and preserve top 4 ranked order (#1 p009, #2 p001, #3 p002, #4 p005) */
  const rankedProducts = React.useMemo(() => {
    const priorityOrder = ['p009', 'p001', 'p002', 'p005']
    const sorted = [...PRODUCTS].sort((a, b) => {
      const idxA = priorityOrder.indexOf(a.id)
      const idxB = priorityOrder.indexOf(b.id)
      if (idxA !== -1 && idxB !== -1) return idxA - idxB
      if (idxA !== -1) return -1
      if (idxB !== -1) return 1
      return (b.salesCount ?? 0) - (a.salesCount ?? 0)
    })

    return sorted.filter(p => {
      if (activeTab === 'all') return true
      if (activeTab === 'healthcare')
        return p.category === 'scrubs' || p.category === 'lab-coats'
      if (activeTab === 'corporate') return p.category === 'corporate'
      if (activeTab === 'industrial')
        return p.category === 'industrial' || p.category === 'logistics'
      if (activeTab === 'hospitality')
        return p.category === 'hospitality' || p.category === 'chef'
      if (activeTab === 'security')
        return p.category === 'security' || p.category === 'education'
      return true
    })
  }, [activeTab])

  const updateScrollState = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }, [])

  useEffect(() => {
    updateScrollState()
    window.addEventListener('resize', updateScrollState)
    return () => window.removeEventListener('resize', updateScrollState)
  }, [updateScrollState, rankedProducts])

  const scrollCarousel = (dir: 'left' | 'right') => {
    const el = trackRef.current
    if (!el) return
    const step = 340
    el.scrollBy({
      left: dir === 'left' ? -step * 2 : step * 2,
      behavior: 'smooth',
    })
  }

  /* Mouse drag handlers */
  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current
    if (!el) return
    isDragging.current = true
    dragStartX.current = e.pageX - el.offsetLeft
    dragScrollLeft.current = el.scrollLeft
  }

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const el = trackRef.current
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
      aria-labelledby="bestsellers-heading"
      style={{
        position: 'relative',
        paddingBlock: 'clamp(4.25rem, 7.5vw, 7rem)',
        background:
          'linear-gradient(180deg, #FFFFFF 0%, #F4F8FF 50%, #F8FBFF 100%)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle Ambient Background Glow & Dotted Accent */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '48vw',
          height: '48vw',
          maxWidth: 680,
          maxHeight: 680,
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
          top: 24,
          right: 24,
          width: 180,
          height: 120,
          opacity: 0.14,
          backgroundImage:
            'radial-gradient(#146EF5 1.25px, transparent 1.25px)',
          backgroundSize: '14px 14px',
          pointerEvents: 'none',
        }}
      />

      <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
        {/* ════════════════════════════════════════════
            1. HEADER + FLOATING TRUST METRICS PANEL
        ════════════════════════════════════════════ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.75rem',
            marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)',
          }}
        >
          {/* Left: Eyebrow + Heading + Supporting Copy */}
          <div
            style={{
              maxWidth: 560,
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateY(0)' : 'translateY(20px)',
              transition: `opacity 0.65s ${EASE}, transform 0.65s ${EASE}`,
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                marginBottom: '0.7rem',
              }}
            >
              <div
                style={{
                  width: 28,
                  height: 2,
                  background: '#146EF5',
                  borderRadius: 2,
                }}
              />
              <span
                style={{
                  fontSize: '0.7rem',
                  fontWeight: 800,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: '#0B2744',
                }}
              >
                TRUSTED CHOICE
              </span>
            </div>

            {/* Main Heading */}
            <h2
              id="bestsellers-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2rem, 3.8vw, 3.1rem)',
                color: '#0B2744',
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                marginBottom: '0.75rem',
              }}
            >
              India’s{' '}
              <span style={{ color: '#146EF5' }}>Most-Ordered</span>{' '}
              Professional Uniforms
            </h2>

            {/* Supporting Copy */}
            <p
              style={{
                color: 'var(--color-neutral-500)',
                fontSize: 'clamp(0.88rem, 1.05vw, 1rem)',
                lineHeight: 1.6,
              }}
            >
              Backed by verified corporate, industrial, hospitality & healthcare procurement data.
              <br />
              Bestseller status requires 1,000+ shifts verified.
            </p>
          </div>

          {/* Right: Floating White Translucent Trust Metrics Panel */}
          <div
            className="no-scrollbar bs-trust-panel"
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 20,
              border: '1px solid rgba(11, 39, 68, 0.07)',
              boxShadow: '0 10px 32px rgba(11, 39, 68, 0.06)',
              padding: '0.9rem 1.35rem',
              overflowX: 'auto',
              maxWidth: '100%',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(24px)',
              transition: `opacity 0.65s ${EASE} 140ms, transform 0.65s ${EASE} 140ms`,
            }}
          >
            {[
              {
                icon: Users,
                value: '50,000+',
                label: 'Happy Customers',
              },
              {
                icon: Building2,
                value: '500+',
                label: 'Hospitals Served',
              },
              {
                icon: ShieldCheck,
                value: '1,000+',
                label: 'Shifts Verified',
              },
            ].map((stat, idx) => (
              <div
                key={stat.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  paddingInline:
                    idx === 0
                      ? '0 1.25rem'
                      : idx === 1
                        ? '1.25rem'
                        : '1.25rem 0',
                  borderRight:
                    idx < 2 ? '1px solid rgba(11, 39, 68, 0.08)' : 'none',
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 12,
                    background: '#EAF4FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <stat.icon
                    size={19}
                    strokeWidth={1.8}
                    style={{ color: '#146EF5' }}
                  />
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '1.1rem',
                      color: '#0B2744',
                      lineHeight: 1.15,
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--color-neutral-500)',
                      fontWeight: 500,
                      marginTop: 2,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════
            2. CATEGORY FILTER NAVIGATION + CONTROLS ROW
        ════════════════════════════════════════════ */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: 'clamp(1.5rem, 2.5vw, 2.25rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(14px)',
            transition: `opacity 0.65s ${EASE} 220ms, transform 0.65s ${EASE} 220ms`,
          }}
        >
          {/* Filter Pills */}
          <div
            className="no-scrollbar"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              overflowX: 'auto',
              maxWidth: '100%',
              paddingBlock: '0.2rem',
            }}
          >
            {FILTER_TABS.map(tab => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.55rem 1.15rem',
                    borderRadius: 100,
                    fontSize: '0.8125rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-sans)',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    background: active ? '#0B2744' : 'white',
                    color: active ? 'white' : '#0B2744',
                    border: active
                      ? '1px solid #0B2744'
                      : '1px solid rgba(11, 39, 68, 0.10)',
                    boxShadow: active
                      ? '0 6px 16px rgba(11, 39, 68, 0.20)'
                      : '0 2px 6px rgba(11, 39, 68, 0.03)',
                    transition: `all 0.22s ${EASE}`,
                  }}
                >
                  {tab.hasCrown && (
                    <Crown
                      size={13}
                      fill={active ? '#FBBF24' : '#146EF5'}
                      stroke={active ? '#FBBF24' : '#146EF5'}
                    />
                  )}
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Right: View All Rankings + Prev/Next Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              marginLeft: 'auto',
            }}
          >
            <Link
              to="/bestsellers"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.84rem',
                fontWeight: 800,
                color: '#0B2744',
                textDecoration: 'none',
                paddingBottom: 3,
                borderBottom: '2px solid #146EF5',
                whiteSpace: 'nowrap',
              }}
            >
              View All Rankings
              <ArrowRight size={14} />
            </Link>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <button
                type="button"
                onClick={() => scrollCarousel('left')}
                aria-label="Previous bestsellers"
                style={{
                  width: 42,
                  height: 42,
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
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollCarousel('right')}
                aria-label="Next bestsellers"
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  background: '#0B2744',
                  color: 'white',
                  border: 'none',
                  boxShadow: '0 6px 18px rgba(11, 39, 68, 0.22)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: canScrollRight ? 'pointer' : 'default',
                  opacity: canScrollRight ? 1 : 0.5,
                  transition: `all 0.22s ${EASE}`,
                }}
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════
            3. 4 LARGE CINEMATIC PRODUCT SHOWCASES
        ════════════════════════════════════════════ */}
        <div
          ref={trackRef}
          onScroll={updateScrollState}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          className="no-scrollbar bs-showcase-track"
          style={{
            display: 'flex',
            gap: 'clamp(1rem, 1.5vw, 1.35rem)',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            WebkitOverflowScrolling: 'touch',
            paddingBlock: '0.35rem 1.25rem',
            cursor: 'grab',
          }}
        >
          {rankedProducts.map((product, idx) => (
            <div
              key={product.id}
              className="bs-showcase-col"
              style={{
                scrollSnapAlign: 'start',
                flex: '0 0 calc((100% - 3 * clamp(1rem, 1.5vw, 1.35rem)) / 4)',
                minWidth: 278,
              }}
            >
              <BestsellerShowcaseCard
                product={product}
                rank={idx + 1}
                index={idx}
                visible={visible}
              />
            </div>
          ))}
        </div>

        {/* ════════════════════════════════════════════
            4. BOTTOM FABRIC TECHNOLOGY BANNER
        ════════════════════════════════════════════ */}
        <div
          className="bs-fabric-banner"
          style={{
            marginTop: 'clamp(1.75rem, 3vw, 2.75rem)',
            display: 'grid',
            gridTemplateColumns: '260px 1fr auto',
            alignItems: 'center',
            gap: 'clamp(1.25rem, 2.5vw, 2.25rem)',
            background: 'linear-gradient(90deg, #FFFFFF 0%, #F4F9FF 100%)',
            borderRadius: 24,
            border: '1px solid rgba(11, 39, 68, 0.08)',
            boxShadow: '0 12px 36px rgba(11, 39, 68, 0.06)',
            overflow: 'hidden',
            paddingRight: 'clamp(1.5rem, 3vw, 2.5rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: `opacity 0.7s ${EASE} 420ms, transform 0.7s ${EASE} 420ms`,
          }}
        >
          {/* Left: Folded Premium AFI Uniform Fabrics Image */}
          <div
            className="bs-fabric-banner-img"
            style={{
              position: 'relative',
              height: '100%',
              minHeight: 145,
              overflow: 'hidden',
              background: '#EAF4FF',
            }}
          >
            <img
              src="/bs-fabric-banner.jpg"
              alt="Folded premium AFI medical uniform fabrics"
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
              }}
            />
            {/* Diagonal white edge curve */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                right: -1,
                width: 46,
                background: 'white',
                clipPath: 'polygon(100% 0, 0 0, 100% 100%)',
              }}
            />
          </div>

          {/* Center: ColourLock™ Headline + 3 Vertical-Icon Feature Pillars */}
          <div
            className="bs-fabric-banner-body"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
              paddingBlock: '1.35rem',
            }}
          >
            {/* Left Copy */}
            <div
              className="bs-fabric-banner-title"
              style={{
                paddingRight: '1.75rem',
                borderRight: '1px solid rgba(11, 39, 68, 0.09)',
                maxWidth: 380,
              }}
            >
              <div
                style={{
                  fontSize: '0.64rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#146EF5',
                  marginBottom: '0.35rem',
                }}
              >
                PREMIUM FABRIC TECHNOLOGY
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.1rem, 1.55vw, 1.38rem)',
                  color: '#0B2744',
                  lineHeight: 1.22,
                  letterSpacing: '-0.02em',
                  marginBottom: '0.4rem',
                }}
              >
                All 3 Lines Feature
                <br />
                Autoclave-Safe{' '}
                <span style={{ color: '#146EF5' }}>ColourLock™</span>
              </div>
              <p
                style={{
                  fontSize: '0.78rem',
                  color: 'var(--color-neutral-500)',
                  fontWeight: 500,
                }}
              >
                Fade-resistant. Long lasting. Made for real work environments.
              </p>
            </div>

            {/* 3 Feature Columns */}
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
                  title: 'Easy to Maintain',
                  sub: 'Retains shape & softness',
                },
                {
                  icon: Settings,
                  title: 'Built for Hospitals',
                  sub: 'Designed for daily use',
                },
              ].map((feat, fIdx) => (
                <div
                  key={feat.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.35rem',
                    paddingRight: fIdx < 2 ? '1rem' : 0,
                    borderRight:
                      fIdx < 2 ? '1px solid rgba(11, 39, 68, 0.07)' : 'none',
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      background: '#EAF4FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#146EF5',
                    }}
                  >
                    <feat.icon size={18} strokeWidth={1.8} />
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '0.84rem',
                      color: '#0B2744',
                      lineHeight: 1.2,
                    }}
                  >
                    {feat.title}
                  </div>
                  <div
                    style={{
                      fontSize: '0.73rem',
                      color: 'var(--color-neutral-500)',
                      fontWeight: 500,
                    }}
                  >
                    {feat.sub}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Far Right: Handwritten-Style Accent ("Trusted by India's Healthcare Heroes ♡") */}
          <div
            style={{
              paddingBlock: '1rem',
              paddingLeft: '1rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontStyle: 'italic',
                fontWeight: 700,
                fontSize: '1.15rem',
                color: '#184980',
                lineHeight: 1.25,
                transform: 'rotate(-4deg)',
              }}
            >
              Trusted
              <br />
              by India’s
              <br />
              Healthcare
              <br />
              Heroes{' '}
              <span style={{ color: '#146EF5', fontStyle: 'normal' }}>♡</span>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 1200px) {
          .bs-showcase-col {
            flex: 0 0 calc((100% - 2 * 1.25rem) / 3) !important;
          }
          .bs-fabric-banner {
            grid-template-columns: 200px 1fr !important;
            padding-bottom: 1.25rem;
          }
          .bs-fabric-banner > div:last-child {
            display: none !important;
          }
          .bs-fabric-banner-title {
            border-right: none !important;
            padding-right: 0 !important;
          }
        }
        @media (max-width: 900px) {
          .bs-showcase-col {
            flex: 0 0 calc((100% - 1rem) / 2) !important;
          }
        }
        @media (max-width: 640px) {
          .bs-showcase-col {
            flex: 0 0 84vw !important;
            max-width: 330px !important;
          }
          .bs-fabric-banner {
            grid-template-columns: 1fr !important;
            padding-right: 0 !important;
          }
          .bs-fabric-banner-img {
            height: 150px !important;
          }
          .bs-fabric-banner-body {
            padding-inline: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  )
}
