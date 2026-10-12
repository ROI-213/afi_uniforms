/**
 * CommunityGallery — Section 14: GALLERY
 * ─────────────────────────────────────────────────────────────
 * Masonry editorial gallery with category filtering:
 *   - Products
 *   - Fabric
 *   - Embroidery
 *   - Institutions
 *   - Customer Photos
 *   - Videos
 *
 * Click opens a cinematic full-screen lightbox with media viewer,
 * product tagging, and keyboard navigation.
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Camera,
  Play,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag
} from 'lucide-react'

type GalleryCategory = 'All' | 'Products' | 'Fabric' | 'Embroidery' | 'Institutions' | 'Customer Photos' | 'Videos'

interface GalleryItem {
  id: string
  title: string
  category: 'Products' | 'Fabric' | 'Embroidery' | 'Institutions' | 'Customer Photos' | 'Videos'
  image: string
  aspectRatio: string // for masonry variety: '3/4.2' | '1/1' | '16/10' | '3/4.8'
  span?: string       // grid column or row span
  caption: string
  credit: string
  isVideo?: boolean
  videoDuration?: string
  taggedProduct?: {
    name: string
    price: number
    productId: string
    image: string
  }
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'The Signature Royal Navy Scrub Set',
    category: 'Products',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.4&fp-y=0.25',
    aspectRatio: '3/4.2',
    caption: 'Athletic cut with articulated gussets engineered for marathon 14-hour oncological procedures.',
    credit: 'Studio Lookbook · Spring 2026',
    taggedProduct: {
      name: 'AeroFlex™ Royal Navy Set',
      price: 1299,
      productId: 'p001',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&q=80&fit=crop',
    },
  },
  {
    id: 'g2',
    title: 'HydroDrop™ Fluid-Bead Test',
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.45&fp-y=0.2',
    aspectRatio: '1/1',
    caption: 'Laboratory fluid challenge demonstrating zero moisture absorption under saline and blood splashes.',
    credit: 'AFI Textile Research Lab, Surat',
    taggedProduct: {
      name: 'FluidShield™ Surgical Top',
      price: 799,
      productId: 'p003',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=300&q=80&fit=crop',
    },
  },
  {
    id: 'g3',
    title: 'German Tajima Multi-Head Embroidery',
    category: 'Embroidery',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.2',
    aspectRatio: '3/4.6',
    caption: 'Precision 18K metallic gold thread crest monogramming on executive lab coat lapels.',
    credit: 'Master Embroidery Atelier',
    taggedProduct: {
      name: 'Executive Tailored Lab Coat',
      price: 1899,
      productId: 'p002',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80&fit=crop',
    },
  },
  {
    id: 'g4',
    title: 'Fortis Oncology Theatre Complex',
    category: 'Institutions',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.2',
    aspectRatio: '16/10',
    caption: 'Unified institutional surgical outfitting across 40+ staff surgeons and trauma specialists.',
    credit: 'Fortis Healthcare Partner Ward',
    taggedProduct: {
      name: 'OT Comfort Scrub Pants',
      price: 899,
      productId: 'p005',
      image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&q=80&fit=crop',
    },
  },
  {
    id: 'g5',
    title: 'Dr. Meera S. · Pediatric Ward Rounds',
    category: 'Customer Photos',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.45&fp-y=0.25',
    aspectRatio: '3/4.2',
    caption: 'ComfortCare™ Lilac scrub set worn during evening rounds at Apollo Children’s Hospital, Mumbai.',
    credit: '#AFIHeroes Verified Post · @meera.pediatrics',
    taggedProduct: {
      name: 'Women’s Slim Fit Scrub Set',
      price: 1399,
      productId: 'p009',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&q=80&fit=crop',
    },
  },
  {
    id: 'g6',
    title: 'Surgeon Shift Experience Film',
    category: 'Videos',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.25',
    aspectRatio: '16/10',
    caption: 'A 24-hour documentary following cardiothoracic residents testing zero-friction ergonomics.',
    credit: 'Cinema Documentary Series · 1:24 min',
    isVideo: true,
    videoDuration: '1:24 min',
    taggedProduct: {
      name: 'Classic Navy Scrub Set',
      price: 1299,
      productId: 'p001',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&q=80&fit=crop',
    },
  },
  {
    id: 'g7',
    title: 'AeroWeave™ 4-Way Micro-Twill Structure',
    category: 'Fabric',
    image: 'https://images.unsplash.com/photo-1612776780156-f2a4d2bb3bf1?w=900&q=85&fit=crop&crop=center',
    aspectRatio: '1/1',
    caption: 'Microscopic weave pattern allowing dynamic airflow while maintaining full fluid barrier protection.',
    credit: 'Surat Technical Textile Mill',
    taggedProduct: {
      name: 'Underscrub Thermal Layer',
      price: 649,
      productId: 'p004',
      image: 'https://images.unsplash.com/photo-1612776780156-f2a4d2bb3bf1?w=300&q=80&fit=crop',
    },
  },
  {
    id: 'g8',
    title: 'AIIMS Annual Medical College Batch Kit',
    category: 'Institutions',
    image: 'https://images.unsplash.com/photo-1594824813583-02f5a04e5bf5?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.2',
    aspectRatio: '3/4.2',
    caption: 'Standardized white lab coats with custom college crest embroidery for 150 MBBS residents.',
    credit: 'AIIMS New Delhi Batch Procurement',
    taggedProduct: {
      name: 'Executive Tailored Lab Coat',
      price: 1899,
      productId: 'p002',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&q=80&fit=crop',
    },
  },
]

const CATEGORIES: GalleryCategory[] = [
  'All',
  'Products',
  'Fabric',
  'Embroidery',
  'Institutions',
  'Customer Photos',
  'Videos',
]

export default function CommunityGallery() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('All')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const filteredItems = activeCategory === 'All'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory)

  const openLightbox = (id: string) => {
    const idx = filteredItems.findIndex((item) => item.id === id)
    if (idx !== -1) setLightboxIndex(idx)
  }

  const closeLightbox = () => setLightboxIndex(null)

  const nextLightbox = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev! + 1) % filteredItems.length)
  }

  const prevLightbox = () => {
    if (lightboxIndex === null) return
    setLightboxIndex((prev) => (prev! - 1 + filteredItems.length) % filteredItems.length)
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextLightbox()
      if (e.key === 'ArrowLeft') prevLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [lightboxIndex, filteredItems])

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null

  return (
    <section
      aria-labelledby="gallery-heading"
      style={{
        paddingBlock: 'clamp(4.5rem, 8vw, 7.5rem)',
        background: 'var(--color-navy)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-site">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 1rem',
                borderRadius: 100,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                marginBottom: '0.85rem',
              }}
            >
              <Camera size={14} style={{ color: 'var(--color-blue-light)' }} />
              <span
                style={{
                  fontSize: '0.725rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-blue-light)',
                }}
              >
                Editorial Lookbook & Archives
              </span>
            </div>

            <h2
              id="gallery-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 4vw, 3.4rem)',
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
              }}
            >
              AFI In The Clinic & Atelier
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', marginTop: '0.5rem', maxWidth: 540 }}>
              Curated imagery spanning technical fabric microscopy, precision embroidery, hospital wards, and clinician portraits.
            </p>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-white"
            style={{ padding: '0.85rem 1.65rem', fontSize: '0.875rem' }}
          >
            <Camera size={16} /> #AFIHeroes Community
          </a>
        </div>

        {/* ── Category Filter Pills Bar ── */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2.75rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => {
                  setActiveCategory(cat)
                  setLightboxIndex(null)
                }}
                style={{
                  padding: '0.55rem 1.25rem',
                  borderRadius: 100,
                  border: isSelected ? '1.5px solid var(--color-blue-light)' : '1px solid rgba(255,255,255,0.18)',
                  background: isSelected ? 'var(--color-medical-blue)' : 'rgba(255,255,255,0.06)',
                  color: 'white',
                  fontSize: '0.825rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 16px rgba(28,77,161,0.5)' : 'none',
                }}
              >
                {cat}
              </button>
            )
          })}
        </div>

        {/* ── Masonry Editorial Grid ── */}
        <div
          style={{
            columnCount: 'auto',
            columnWidth: '280px',
            columnGap: '1.25rem',
          }}
        >
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => openLightbox(item.id)}
              style={{
                breakInside: 'avoid',
                marginBottom: '1.25rem',
                position: 'relative',
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'rgba(255,255,255,0.06)',
                border: '1.5px solid rgba(255,255,255,0.14)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
                transition: 'transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease',
              }}
              className="gallery-card"
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: item.aspectRatio, overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.65s cubic-bezier(0.22,1,0.36,1)',
                  }}
                />

                {/* Dark Gradient Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.2) 55%, transparent 100%)',
                  }}
                />

                {/* Top Category Badge */}
                <div style={{ position: 'absolute', top: '1rem', left: '1rem', zIndex: 2 }}>
                  <span
                    style={{
                      background: 'rgba(10,22,40,0.8)',
                      backdropFilter: 'blur(8px)',
                      color: 'var(--color-blue-light)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: 100,
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(255,255,255,0.2)',
                    }}
                  >
                    {item.category}
                  </span>
                </div>

                {/* Video Play Indicator */}
                {item.isVideo && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      width: 32,
                      height: 32,
                      borderRadius: '50%',
                      background: 'var(--color-medical-blue)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                    }}
                  >
                    <Play size={14} fill="white" style={{ marginLeft: 2 }} />
                  </div>
                )}

                {/* Bottom Content Card */}
                <div style={{ position: 'absolute', bottom: '1rem', left: '1.15rem', right: '1.15rem', zIndex: 2 }}>
                  <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.05rem', color: 'white', lineHeight: 1.25, marginBottom: '0.3rem' }}>
                    {item.title}
                  </h4>
                  <p style={{ fontSize: '0.785rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.4, margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          CINEMATIC FULL-SCREEN LIGHTBOX OVERLAY
         ══════════════════════════════════════════════════════════ */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            background: 'rgba(10, 22, 40, 0.94)',
            backdropFilter: 'blur(24px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 'clamp(1rem, 3vw, 2.5rem)',
            animation: 'revealFade 0.25s ease both',
          }}
        >
          {/* Top Bar: Slide Count + Close */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  background: 'var(--color-medical-blue)',
                  color: 'white',
                  padding: '0.35rem 0.85rem',
                  borderRadius: 100,
                  fontSize: '0.725rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                {activeItem.category}
              </span>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: 700, fontFamily: 'var(--font-display)' }}>
                {lightboxIndex! + 1} / {filteredItems.length}
              </span>
            </div>

            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close cinematic lightbox"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.12)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Center Stage: Main Media + Arrows */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              flex: 1,
              paddingBlock: '1rem',
              overflow: 'hidden',
            }}
          >
            {/* Previous Arrow */}
            <button
              type="button"
              onClick={prevLightbox}
              aria-label="Previous slide"
              style={{
                position: 'absolute',
                left: '1rem',
                zIndex: 10,
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.14)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronLeft size={24} />
            </button>

            {/* Media Canvas */}
            <div
              style={{
                maxHeight: '62vh',
                maxWidth: '90vw',
                borderRadius: 20,
                overflow: 'hidden',
                boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
                border: '1.5px solid rgba(255,255,255,0.2)',
                position: 'relative',
              }}
            >
              <img
                src={activeItem.image}
                alt={activeItem.title}
                style={{
                  maxHeight: '62vh',
                  maxWidth: '90vw',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />

              {activeItem.isVideo && (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(10,22,40,0.5)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    gap: '0.75rem',
                  }}
                >
                  <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--color-medical-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Play size={28} fill="white" style={{ marginLeft: 3 }} />
                  </div>
                  <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>Cinematic Film Preview ({activeItem.videoDuration})</span>
                </div>
              )}
            </div>

            {/* Next Arrow */}
            <button
              type="button"
              onClick={nextLightbox}
              aria-label="Next slide"
              style={{
                position: 'absolute',
                right: '1rem',
                zIndex: 10,
                width: 50,
                height: 50,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.14)',
                backdropFilter: 'blur(10px)',
                border: '1.5px solid rgba(255,255,255,0.25)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Caption & Product Tag Bar */}
          <div
            style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(16px)',
              border: '1.5px solid rgba(255,255,255,0.18)',
              borderRadius: 18,
              padding: '1.25rem 1.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.25rem',
              zIndex: 10,
            }}
          >
            <div>
              <div style={{ fontSize: '0.725rem', color: 'var(--color-blue-light)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.2rem' }}>
                {activeItem.credit}
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'white', marginBottom: '0.25rem' }}>
                {activeItem.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.75)', margin: 0, maxWidth: 640 }}>
                {activeItem.caption}
              </p>
            </div>

            {/* Tagged Product Link */}
            {activeItem.taggedProduct && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img
                  src={activeItem.taggedProduct.image}
                  alt={activeItem.taggedProduct.name}
                  style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.3)' }}
                />
                <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'white' }}>
                    {activeItem.taggedProduct.name}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-blue-light)', fontWeight: 700 }}>
                    ₹{activeItem.taggedProduct.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <Link
                  to={`/product/${activeItem.taggedProduct.productId}`}
                  onClick={closeLightbox}
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem', background: 'white', color: 'var(--color-navy)' }}
                >
                  <ShoppingBag size={14} /> Shop Look
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
