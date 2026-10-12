/**
 * CategorySignatureSections — Signature Category Showcases
 * ─────────────────────────────────────────────────────────────
 * Implements the exact layout requested by user:
 * 1. Top Category Pill Bar (matching 1st attached image):
 *    - Healthcare, Corporate, Industrial & Safety, Hospitality, Security & Tactical, School & College
 *    - Clickable pill buttons with icons, active state in dark navy blue.
 * 2. Signature Section Card (matching 2nd attached image):
 *    - Height contained to ~385px
 *    - Left Hero (~32% width): Thematic editorial background, Spring/Season badges, 3 feature pillars,
 *      and floating white card with title, description, and "Explore Collection →" / "View Lookbook →"
 *    - Right 4-Product Row (~68% width): Exactly 4 products in a row
 *    - 100% authentic Bengaluru & South Indian professional photography (24 dedicated generated images)
 *    - Badges ("NEW"/"JUST IN"), wishlist heart, 2-line title, release date, price & % off, swatches, and cart button.
 */

import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Stethoscope,
  Briefcase,
  HardHat,
  ConciergeBell,
  ShieldCheck,
  GraduationCap,
  ArrowRight,
  Heart,
  ShoppingBag,
  Check,
  Calendar,
  Sparkles,
  Layers,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'
import type { Product } from '../context/StoreContext'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function formatPrice(p: number) {
  return `₹${p.toLocaleString('en-IN')}`
}

export type CategoryKey =
  | 'healthcare'
  | 'corporate'
  | 'industrial'
  | 'hospitality'
  | 'security'
  | 'education'

interface CategoryProductItem extends Product {
  eyebrow: string
  dateLabel: string
  badgeText: 'NEW' | 'JUST IN'
  extraColoursLabel: string
}

interface CategoryData {
  id: CategoryKey
  name: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>
  eyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroBg: string
  exploreLink: string
  products: CategoryProductItem[]
}

const CATEGORIES: CategoryData[] = [
  {
    id: 'healthcare',
    name: 'Healthcare',
    icon: Stethoscope,
    eyebrow: 'HEALTHCARE PRO SERIES',
    heroTitle: 'A New Season, A Stronger You.',
    heroSubtitle:
      'Elevated designs, advanced antimicrobial fabrics and all-day comfort for doctors, nurses, and surgeons across Bengaluru hospitals.',
    heroBg: '/cat-health-1.jpg',
    exploreLink: '/collections/scrubs',
    products: [
      {
        id: 'cat-hosp-p1',
        name: 'Bengaluru Signature Antimicrobial Scrub Suit',
        price: 1499,
        originalPrice: 1949,
        image: '/cat-health-1.jpg',
        category: 'healthcare',
        collection: 'CLINICAL SCRUBS',
        eyebrow: 'CLINICAL SCRUBS',
        badgeText: 'NEW',
        dateLabel: '24 Mar 2026',
        colors: ['#A855F7', '#EC4899', '#1E3A8A', '#475569'],
        extraColoursLabel: '+3 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'cat-hosp-p2',
        name: 'Executive Consultation Doctor Lab Coat',
        price: 1299,
        originalPrice: 1699,
        image: '/cat-health-2.jpg',
        category: 'healthcare',
        collection: 'PHYSICIAN SERIES',
        eyebrow: 'PHYSICIAN SERIES',
        badgeText: 'JUST IN',
        dateLabel: '20 Mar 2026',
        colors: ['#FFFFFF', '#1E3A8A', '#64748B'],
        extraColoursLabel: '+1 colour',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'cat-hosp-p3',
        name: 'Ergonomic Inpatient Ward Nurse Scrub Set',
        price: 1399,
        originalPrice: 1799,
        image: '/cat-health-3.jpg',
        category: 'healthcare',
        collection: 'NURSING PRO',
        eyebrow: 'NURSING PRO',
        badgeText: 'NEW',
        dateLabel: '18 Mar 2026',
        colors: ['#2563EB', '#0284C7', '#0D9488', '#0B2744'],
        extraColoursLabel: '+2 colours',
        sizes: ['XS', 'S', 'M', 'L'],
      },
      {
        id: 'cat-hosp-p4',
        name: 'Sterile OT & Surgical Barrier Scrub Set',
        price: 1699,
        originalPrice: 2199,
        image: '/cat-health-4.jpg',
        category: 'healthcare',
        collection: 'SURGICAL THEATRE',
        eyebrow: 'SURGICAL THEATRE',
        badgeText: 'NEW',
        dateLabel: '15 Mar 2026',
        colors: ['#0F766E', '#134E4A', '#0B2744'],
        extraColoursLabel: '+2 colours',
        sizes: ['M', 'L', 'XL', 'XXL'],
      },
    ],
  },
  {
    id: 'corporate',
    name: 'Corporate',
    icon: Briefcase,
    eyebrow: 'CORPORATE PRO SERIES',
    heroTitle: 'Modern Precision, Executive Poise.',
    heroSubtitle:
      'Tailored poly-viscose blazers, wrinkle-free shirting and formal trousers designed for Bengaluru tech parks and boardroom leaders.',
    heroBg: '/cat-corp-1.jpg',
    exploreLink: '/collections/corporate',
    products: [
      {
        id: 'cat-corp-p1',
        name: 'Bengaluru Tech-Park Executive Navy Blazer Suit',
        price: 2499,
        originalPrice: 3199,
        image: '/cat-corp-1.jpg',
        category: 'corporate',
        collection: 'EXECUTIVE BLAZER',
        eyebrow: 'EXECUTIVE BLAZER',
        badgeText: 'NEW',
        dateLabel: '25 Mar 2026',
        colors: ['#0B2744', '#1E293B', '#334155'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'cat-corp-p2',
        name: 'Crisp Poly-Cotton Executive Formal Shirt',
        price: 999,
        originalPrice: 1299,
        image: '/cat-corp-2.jpg',
        category: 'corporate',
        collection: 'CORPORATE SHIRTING',
        eyebrow: 'CORPORATE SHIRTING',
        badgeText: 'JUST IN',
        dateLabel: '22 Mar 2026',
        colors: ['#FFFFFF', '#BFDBFE', '#E2E8F0'],
        extraColoursLabel: '+3 colours',
        sizes: ['39', '40', '42', '44'],
      },
      {
        id: 'cat-corp-p3',
        name: 'UB City Tailored Business Waistcoat Vest',
        price: 1499,
        originalPrice: 1899,
        image: '/cat-corp-3.jpg',
        category: 'corporate',
        collection: 'FORMAL WAISTCOAT',
        eyebrow: 'FORMAL WAISTCOAT',
        badgeText: 'NEW',
        dateLabel: '19 Mar 2026',
        colors: ['#334155', '#0B2744', '#475569'],
        extraColoursLabel: '+1 colour',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'cat-corp-p4',
        name: 'Contemporary Tech-Campus Executive Trouser Set',
        price: 1699,
        originalPrice: 2199,
        image: '/cat-corp-4.jpg',
        category: 'corporate',
        collection: 'OFFICE ESSENTIALS',
        eyebrow: 'OFFICE ESSENTIALS',
        badgeText: 'NEW',
        dateLabel: '16 Mar 2026',
        colors: ['#0B2744', '#3B82F6', '#1E293B'],
        extraColoursLabel: '+2 colours',
        sizes: ['30', '32', '34', '36'],
      },
    ],
  },
  {
    id: 'industrial',
    name: 'Industrial & Safety',
    icon: HardHat,
    eyebrow: 'INDUSTRIAL SAFETY PRO',
    heroTitle: 'Built Tough, Certified Safe.',
    heroSubtitle:
      'Heavy-duty boiler suits, high-visibility reflective vests and reinforced technical workwear for Bengaluru manufacturing and metro projects.',
    heroBg: '/cat-ind-1.jpg',
    exploreLink: '/collections/industrial',
    products: [
      {
        id: 'cat-ind-p1',
        name: 'Heavy-Duty High-Precision Boiler Suit Coverall',
        price: 1899,
        originalPrice: 2499,
        image: '/cat-ind-1.jpg',
        category: 'industrial',
        collection: 'ENGINEERING PRO',
        eyebrow: 'ENGINEERING PRO',
        badgeText: 'NEW',
        dateLabel: '24 Mar 2026',
        colors: ['#0B2744', '#EAB308', '#1E3A8A'],
        extraColoursLabel: '+2 colours',
        sizes: ['M', 'L', 'XL', 'XXL'],
      },
      {
        id: 'cat-ind-p2',
        name: 'BMRCL Grade Hi-Vis Reflective Safety Jacket',
        price: 899,
        originalPrice: 1199,
        image: '/cat-ind-2.jpg',
        category: 'industrial',
        collection: 'INFRASTRUCTURE SAFETY',
        eyebrow: 'INFRASTRUCTURE SAFETY',
        badgeText: 'JUST IN',
        dateLabel: '21 Mar 2026',
        colors: ['#84CC16', '#F97316', '#EAB308'],
        extraColoursLabel: '+1 colour',
        sizes: ['Free Size', 'L', 'XL'],
      },
      {
        id: 'cat-ind-p3',
        name: 'Kaizen Precision Electronics Technician Uniform',
        price: 1599,
        originalPrice: 1999,
        image: '/cat-ind-3.jpg',
        category: 'industrial',
        collection: 'TECHNICAL WORKWEAR',
        eyebrow: 'TECHNICAL WORKWEAR',
        badgeText: 'NEW',
        dateLabel: '18 Mar 2026',
        colors: ['#0B2744', '#1E3A8A', '#334155'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'cat-ind-p4',
        name: 'BLR Logistics Heavy Cargo Utility Work Shirt',
        price: 1499,
        originalPrice: 1899,
        image: '/cat-ind-4.jpg',
        category: 'industrial',
        collection: 'WAREHOUSE UTILITY',
        eyebrow: 'WAREHOUSE UTILITY',
        badgeText: 'NEW',
        dateLabel: '15 Mar 2026',
        colors: ['#334155', '#1E293B', '#475569'],
        extraColoursLabel: '+3 colours',
        sizes: ['M', 'L', 'XL', 'XXL'],
      },
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality',
    icon: ConciergeBell,
    eyebrow: 'HOSPITALITY SIGNATURE',
    heroTitle: 'Culinary Pride, 5-Star Elegance.',
    heroSubtitle:
      'Double-breasted master chef coats, front-office concierge suits and barista aprons crafted for Bengaluru luxury hotels and restaurants.',
    heroBg: '/cat-hosp-1.jpg',
    exploreLink: '/collections/hospitality',
    products: [
      {
        id: 'cat-hospit-p1',
        name: 'Master Chef Double-Breasted Executive Coat',
        price: 1499,
        originalPrice: 1949,
        image: '/cat-hosp-1.jpg',
        category: 'hospitality',
        collection: 'CHEF & CULINARY',
        eyebrow: 'CHEF & CULINARY',
        badgeText: 'NEW',
        dateLabel: '25 Mar 2026',
        colors: ['#FFFFFF', '#0B2744', '#1E293B'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'cat-hospit-p2',
        name: '5-Star Luxury Front-Desk Concierge Blazer Suit',
        price: 2799,
        originalPrice: 3599,
        image: '/cat-hosp-2.jpg',
        category: 'hospitality',
        collection: 'HOSPITALITY SIGNATURE',
        eyebrow: 'HOSPITALITY SIGNATURE',
        badgeText: 'JUST IN',
        dateLabel: '22 Mar 2026',
        colors: ['#0B2744', '#1E3A8A', '#312E81'],
        extraColoursLabel: '+1 colour',
        sizes: ['36', '38', '40', '42'],
      },
      {
        id: 'cat-hospit-p3',
        name: 'Fine-Dining Captain & Steward Hospitality Vest',
        price: 1299,
        originalPrice: 1699,
        image: '/cat-hosp-3.jpg',
        category: 'hospitality',
        collection: 'BANQUET & SERVICE',
        eyebrow: 'BANQUET & SERVICE',
        badgeText: 'NEW',
        dateLabel: '19 Mar 2026',
        colors: ['#0B2744', '#18181B', '#27272A'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'cat-hospit-p4',
        name: 'Bengaluru Roastery Heavy Barista Canvas Apron',
        price: 899,
        originalPrice: 1199,
        image: '/cat-hosp-4.jpg',
        category: 'hospitality',
        collection: 'CAFE & BARISTA',
        eyebrow: 'CAFE & BARISTA',
        badgeText: 'NEW',
        dateLabel: '16 Mar 2026',
        colors: ['#4D5634', '#3B2F2F', '#1E293B'],
        extraColoursLabel: '+3 colours',
        sizes: ['Standard', 'XL'],
      },
    ],
  },
  {
    id: 'security',
    name: 'Security & Tactical',
    icon: ShieldCheck,
    eyebrow: 'SECURITY PRO SERIES',
    heroTitle: 'Discipline Defined, Guarding Bengaluru.',
    heroSubtitle:
      'Heavy-duty poly-cotton security shirts, tactical field uniforms and executive VIP protection suits for commercial and corporate security.',
    heroBg: '/cat-sec-1.jpg',
    exploreLink: '/collections/security',
    products: [
      {
        id: 'cat-sec-p1',
        name: 'Corporate Tech-Park Security Officer Uniform Set',
        price: 1799,
        originalPrice: 2299,
        image: '/cat-sec-1.jpg',
        category: 'security',
        collection: 'SECURITY PRO SERIES',
        eyebrow: 'SECURITY PRO SERIES',
        badgeText: 'NEW',
        dateLabel: '24 Mar 2026',
        colors: ['#0B2744', '#1E3A8A', '#1E293B'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'cat-sec-p2',
        name: 'Atrium Security Supervisor Tactical Duty Uniform',
        price: 1999,
        originalPrice: 2599,
        image: '/cat-sec-2.jpg',
        category: 'security',
        collection: 'TACTICAL SUPERVISOR',
        eyebrow: 'TACTICAL SUPERVISOR',
        badgeText: 'JUST IN',
        dateLabel: '21 Mar 2026',
        colors: ['#18181B', '#0B2744', '#27272A'],
        extraColoursLabel: '+1 colour',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'cat-sec-p3',
        name: 'UB City VIP Executive Close Protection Suit',
        price: 2899,
        originalPrice: 3699,
        image: '/cat-sec-3.jpg',
        category: 'security',
        collection: 'EXECUTIVE SECURITY',
        eyebrow: 'EXECUTIVE SECURITY',
        badgeText: 'NEW',
        dateLabel: '18 Mar 2026',
        colors: ['#09090B', '#18181B', '#0B2744'],
        extraColoursLabel: '+2 colours',
        sizes: ['40', '42', '44', '46'],
      },
      {
        id: 'cat-sec-p4',
        name: 'Campus Tactical Ripstop Field Patrol Uniform',
        price: 1899,
        originalPrice: 2399,
        image: '/cat-sec-4.jpg',
        category: 'security',
        collection: 'FIELD & COMBAT',
        eyebrow: 'FIELD & COMBAT',
        badgeText: 'NEW',
        dateLabel: '15 Mar 2026',
        colors: ['#556B2F', '#8B7355', '#1E293B'],
        extraColoursLabel: '+2 colours',
        sizes: ['M', 'L', 'XL', 'XXL'],
      },
    ],
  },
  {
    id: 'education',
    name: 'School & College',
    icon: GraduationCap,
    eyebrow: 'CAMPUS & ACADEMIC',
    heroTitle: 'Inspiring Futures, Campus Smart.',
    heroSubtitle:
      'Durable crested school blazers, pleated pinafores, collegiate pique polos and science lab coats for Bengaluru premier schools and colleges.',
    heroBg: '/cat-school-1.jpg',
    exploreLink: '/collections/education',
    products: [
      {
        id: 'cat-edu-p1',
        name: 'International School Crested Navy Uniform Blazer',
        price: 1699,
        originalPrice: 2199,
        image: '/cat-school-1.jpg',
        category: 'education',
        collection: 'SCHOOL BLAZER',
        eyebrow: 'SCHOOL BLAZER',
        badgeText: 'NEW',
        dateLabel: '25 Mar 2026',
        colors: ['#0B2744', '#1E3A8A', '#475569'],
        extraColoursLabel: '+2 colours',
        sizes: ['32', '34', '36', '38'],
      },
      {
        id: 'cat-edu-p2',
        name: 'Classic Pleated Pinafore School Uniform Set',
        price: 1199,
        originalPrice: 1599,
        image: '/cat-school-2.jpg',
        category: 'education',
        collection: 'GIRLS ACADEMIC',
        eyebrow: 'GIRLS ACADEMIC',
        badgeText: 'JUST IN',
        dateLabel: '22 Mar 2026',
        colors: ['#0B2744', '#1E293B', '#1E3A8A'],
        extraColoursLabel: '+1 colour',
        sizes: ['28', '30', '32', '34'],
      },
      {
        id: 'cat-edu-p3',
        name: 'Bengaluru University Pique Cotton Collegiate Polo',
        price: 799,
        originalPrice: 999,
        image: '/cat-school-3.jpg',
        category: 'education',
        collection: 'COLLEGE WEAR',
        eyebrow: 'COLLEGE WEAR',
        badgeText: 'NEW',
        dateLabel: '19 Mar 2026',
        colors: ['#0B2744', '#FFFFFF', '#1E3A8A'],
        extraColoursLabel: '+3 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'cat-edu-p4',
        name: 'Academic Science Student Protective Lab Coat',
        price: 899,
        originalPrice: 1199,
        image: '/cat-school-4.jpg',
        category: 'education',
        collection: 'CAMPUS SCIENCE LAB',
        eyebrow: 'CAMPUS SCIENCE LAB',
        badgeText: 'NEW',
        dateLabel: '16 Mar 2026',
        colors: ['#FFFFFF', '#F1F5F9', '#E2E8F0'],
        extraColoursLabel: '+2 colours',
        sizes: ['36', '38', '40', '42'],
      },
    ],
  },
]

/* ── Individual Product Card (Matching 2nd Image Layout) ── */
function SignatureProductCard({ product }: { product: CategoryProductItem }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore()
  const swatches = product.colors || ['#0B2744']
  const [selectedColor, setSelectedColor] = useState<string>(swatches[0])
  const [hovered, setHovered] = useState(false)
  const [wishHovered, setWishHovered] = useState(false)
  const [justAdded, setJustAdded] = useState(false)

  const wishlisted = isInWishlist(product.id)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

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
      style={{
        background: 'white',
        borderRadius: 20,
        border: '1px solid rgba(11, 39, 68, 0.08)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        boxShadow: hovered
          ? '0 20px 42px rgba(11, 39, 68, 0.12), 0 4px 12px rgba(11, 39, 68, 0.05)'
          : '0 4px 20px rgba(11, 39, 68, 0.04)',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
        transition: `transform 0.4s ${EASE}, box-shadow 0.4s ${EASE}`,
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
            src={product.image}
            alt={product.name}
            loading="lazy"
            draggable={false}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 12%',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: `transform 0.5s ${EASE}`,
            }}
          />
        </Link>

        {/* Top-Left Badge */}
        <div
          style={{
            position: 'absolute',
            top: '0.7rem',
            left: '0.7rem',
            zIndex: 2,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '0.24rem 0.65rem',
              borderRadius: 100,
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'white',
              background:
                product.badgeText === 'NEW'
                  ? '#146EF5'
                  : 'rgba(71, 108, 158, 0.88)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 10px rgba(11, 39, 68, 0.16)',
            }}
          >
            {product.badgeText}
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
            top: '0.7rem',
            right: '0.7rem',
            zIndex: 2,
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(11, 39, 68, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: wishlisted ? '#EF4444' : wishHovered ? '#146EF5' : '#0B2744',
            cursor: 'pointer',
            transform: wishHovered ? 'scale(1.1)' : 'scale(1)',
            transition: `all 0.22s ${EASE}`,
            boxShadow: '0 4px 10px rgba(10, 22, 40, 0.10)',
          }}
        >
          <Heart
            size={13}
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
          {/* Eyebrow */}
          <div
            style={{
              fontSize: '0.54rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#3B82F6',
              marginBottom: '0.15rem',
            }}
          >
            {product.eyebrow}
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: 'none' }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.82rem',
                color: '#0B2744',
                lineHeight: 1.22,
                letterSpacing: '-0.015em',
                marginBottom: '0.2rem',
                minHeight: '1.98rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </h4>
          </Link>

          {/* Release Date */}
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
            <span>{product.dateLabel}</span>
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

        {/* Swatches & Circular Cart Button */}
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
            {swatches.slice(0, 4).map(hex => {
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
              {product.extraColoursLabel}
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
            {justAdded ? <Check size={13} /> : <ShoppingBag size={13} />}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Single Category Section Component ── */
function CategoryCardRow({ category }: { category: CategoryData }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 32%) minmax(0, 68%)',
        gap: '1rem',
        alignItems: 'stretch',
        minHeight: 380,
      }}
      className="signature-category-grid"
    >
      {/* ── LEFT HERO CARD (Contained to ~380px) ── */}
      <div
        style={{
          position: 'relative',
          borderRadius: 22,
          overflow: 'hidden',
          minHeight: 380,
          background: '#0B2744',
          boxShadow: '0 16px 40px rgba(11, 39, 68, 0.12)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1.25rem',
        }}
      >
        {/* Background Image with Dark Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${category.heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 15%',
            filter: 'brightness(0.68) contrast(1.05)',
          }}
        />
        {/* Gradient Overlay for Text Readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(11,39,68,0.7) 0%, rgba(11,39,68,0.3) 45%, rgba(11,39,68,0.85) 100%)',
          }}
        />

        {/* Top Badges */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.28rem 0.75rem',
              borderRadius: 100,
              background: 'rgba(255, 255, 255, 0.18)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              color: 'white',
              fontSize: '0.64rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}
          >
            <Sparkles size={11} style={{ color: '#60A5FA' }} />
            JUST IN • SPRING 2026
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
            }}
          >
            {['Premium Bengaluru Textiles', 'Modern Ergonomic Fit', 'Built for Real Shifts'].map(
              (pill, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.92)',
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#38BDF8',
                    }}
                  />
                  {pill}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom Floating White Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.96)',
            backdropFilter: 'blur(16px)',
            borderRadius: 16,
            padding: '1rem',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.18)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          <div
            style={{
              fontSize: '0.58rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#146EF5',
              marginBottom: '0.2rem',
            }}
          >
            {category.eyebrow}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '0.96rem',
              color: '#0B2744',
              lineHeight: 1.25,
              marginBottom: '0.35rem',
            }}
          >
            {category.heroTitle}
          </h3>

          <p
            style={{
              fontSize: '0.68rem',
              color: '#475569',
              lineHeight: 1.45,
              marginBottom: '0.75rem',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {category.heroSubtitle}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Link
              to={category.exploreLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#0B2744',
                color: 'white',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.45rem 0.85rem',
                borderRadius: 100,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(11, 39, 68, 0.22)',
                transition: `all 0.2s ${EASE}`,
              }}
            >
              Explore Collection
              <ArrowRight size={12} />
            </Link>

            <Link
              to="/lookbook"
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#0B2744',
                textDecoration: 'none',
                borderBottom: '1px solid #146EF5',
                paddingBottom: 1,
              }}
            >
              View Lookbook →
            </Link>
          </div>
        </div>
      </div>

      {/* ── RIGHT SIDE: 4 PRODUCTS IN A ROW ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '0.75rem',
          alignItems: 'stretch',
        }}
        className="signature-products-grid"
      >
        {category.products.map(product => (
          <SignatureProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

/* ── Main CategorySignatureSections Export ── */
export default function CategorySectionShowcase() {
  const [activeTab, setActiveTab] = useState<CategoryKey>('healthcare')
  const [viewMode, setViewMode] = useState<'tabbed' | 'all'>('all')

  const activeCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0]

  return (
    <section
      id="category-signatures"
      style={{
        paddingBlock: 'clamp(2.5rem, 5vw, 4rem)',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
        borderTop: '1px solid rgba(11, 39, 68, 0.05)',
      }}
    >
      <div className="container-site">
        {/* ── 1. SECTION HEADER ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.3rem 0.85rem',
                borderRadius: 100,
                background: '#EAF4FF',
                border: '1px solid rgba(20, 110, 245, 0.15)',
                marginBottom: '0.65rem',
              }}
            >
              <Sparkles size={12} style={{ color: '#146EF5' }} />
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#146EF5',
                }}
              >
                BENGALURU SIGNATURE COLLECTIONS
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                color: '#0B2744',
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
              }}
            >
              Uniforms for <span style={{ color: '#146EF5' }}>Every Sector</span>
            </h2>

            <p
              style={{
                color: 'var(--color-neutral-500)',
                fontSize: '0.88rem',
                maxWidth: 620,
                marginTop: '0.35rem',
                lineHeight: 1.5,
              }}
            >
              Real South Indian professionals photographed in Bengaluru hospitals, tech parks,
              commercial complexes, and educational institutions.
            </p>
          </div>

          {/* View Mode Toggle / Link */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
            }}
          >
            <button
              type="button"
              onClick={() => setViewMode(prev => (prev === 'tabbed' ? 'all' : 'tabbed'))}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.78rem',
                fontWeight: 700,
                color: '#0B2744',
                background: 'white',
                border: '1px solid rgba(11, 39, 68, 0.12)',
                borderRadius: 100,
                padding: '0.4rem 0.9rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(11, 39, 68, 0.04)',
                transition: 'all 0.2s ease',
              }}
            >
              <Layers size={13} style={{ color: '#146EF5' }} />
              {viewMode === 'tabbed' ? 'Show All 6 Categories' : 'Tabbed View'}
            </button>

            <Link
              to="/categories"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#0B2744',
                textDecoration: 'none',
                borderBottom: '2px solid #146EF5',
                paddingBottom: 2,
              }}
            >
              View All Categories
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>

        {/* ── 2. CATEGORY PILL NAVIGATION (MATCHING 1ST ATTACHED IMAGE) ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            overflowX: 'auto',
            paddingBottom: '0.85rem',
            marginBottom: '1.5rem',
            scrollbarWidth: 'none',
          }}
          className="hide-scrollbar"
        >
          {CATEGORIES.map(cat => {
            const isActive = activeTab === cat.id
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveTab(cat.id)
                  if (viewMode === 'all') {
                    const el = document.getElementById(`cat-row-${cat.id}`)
                    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                  }
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: 100,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: isActive ? '#0B2744' : 'white',
                  color: isActive ? 'white' : '#0B2744',
                  border: isActive
                    ? '1px solid #0B2744'
                    : '1px solid rgba(20, 110, 245, 0.16)',
                  boxShadow: isActive
                    ? '0 6px 18px rgba(11, 39, 68, 0.22)'
                    : '0 2px 6px rgba(11, 39, 68, 0.03)',
                  transition: `all 0.22s ${EASE}`,
                  flexShrink: 0,
                }}
              >
                <Icon
                  size={15}
                  style={{
                    color: isActive ? '#60A5FA' : '#146EF5',
                  }}
                />
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* ── 3. CONTENT AREA ── */}
        {viewMode === 'tabbed' ? (
          /* Tabbed View: Shows active category with smooth entrance */
          <div key={activeCategory.id} style={{ animation: 'fadeIn 0.35s ease' }}>
            <CategoryCardRow category={activeCategory} />
          </div>
        ) : (
          /* Stacked View: Displays all 6 categories consecutively */
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {CATEGORIES.map(cat => (
              <div key={cat.id} id={`cat-row-${cat.id}`}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    marginBottom: '0.85rem',
                  }}
                >
                  <cat.icon size={18} style={{ color: '#146EF5' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.25rem',
                      color: '#0B2744',
                    }}
                  >
                    {cat.name}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 600,
                      color: 'var(--color-neutral-400)',
                    }}
                  >
                    (4 Signature Styles)
                  </span>
                </div>
                <CategoryCardRow category={cat} />
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 1024px) {
          .signature-category-grid {
            grid-template-columns: 1fr !important;
          }
          .signature-products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 640px) {
          .signature-products-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
