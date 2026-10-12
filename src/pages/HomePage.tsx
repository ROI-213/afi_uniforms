import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { useScrollReveal } from '../hooks/useScrollReveal'
import ProductCard from '../components/ProductCard'
import HeroSection from '../components/HeroSection'

import BrandIntro from '../components/BrandIntro'
import IndustriesWeServe from '../components/IndustriesWeServe'
import CategorySectionShowcase from '../components/CategorySectionShowcase'
import WhyAFISection from '../components/WhyAFISection'
import TestimonialsSection from '../components/TestimonialsSection'

// ── Reveal wrapper ────────────────────────────────────────────────
function Reveal({ children, delay = 0, style }: { children: React.ReactNode; delay?: number; style?: React.CSSProperties }) {
  const { ref, isVisible } = useScrollReveal()
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(28px)',
        transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

// ── TRUST STRIP ───────────────────────────────────────────────────
function TrustStrip() {
  const items = [
    { icon: Truck, title: 'Pan-India Dispatch', sub: 'Free shipping above ₹999' },
    { icon: RefreshCw, title: 'In-House Manufacturing', sub: 'Direct factory pricing & QC' },
    { icon: ShieldCheck, title: 'Custom Branding', sub: 'Logo embroidery & printing' },
    { icon: Award, title: '500+ Organizations', sub: 'Corporate, industrial & institutional' },
  ]
  return (
    <div className="trust-strip">
      <div className="container-site" style={{ paddingBlock: '1.375rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }}>
        {items.map(item => (
          <div key={item.title} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: 'var(--color-blue-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <item.icon size={18} style={{ color: 'var(--color-medical-blue)' }} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-navy)', lineHeight: 1.2 }}>{item.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-blue-muted)', fontWeight: 500 }}>{item.sub}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


// ── FEATURED PRODUCTS ─────────────────────────────────────────────
export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState<'bestsellers' | 'new' | 'corporate' | 'industrial'>('bestsellers')

  const tabProducts = {
    bestsellers: PRODUCTS.filter(p => p.badge === 'bestseller' || p.rating! >= 4.8),
    new: PRODUCTS.filter(p => p.badge === 'new'),
    corporate: PRODUCTS.filter(p => ['corporate', 'hospitality', 'education'].includes(p.category)).slice(0, 4),
    industrial: PRODUCTS.filter(p => ['industrial', 'security', 'logistics'].includes(p.category)).slice(0, 4),
  }

  const tabs = [
    { id: 'bestsellers', label: 'Bestselling Uniforms' },
    { id: 'new', label: 'New Arrivals' },
    { id: 'corporate', label: 'Corporate & Hospitality' },
    { id: 'industrial', label: 'Industrial & Security' },
  ] as const

  return (
    <section style={{ paddingBlock: 'clamp(4.5rem, 8vw, 7.5rem)', background: 'white' }}>
      <div className="container-site">
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
            <div>
              <div className="section-divider" />
              <h2 className="text-section" style={{ color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Featured Professional Uniforms</h2>
              <p style={{ color: 'var(--color-neutral-500)', fontSize: '1rem' }}>Handpicked workwear styles trusted by corporate, industrial, hospitality and healthcare teams.</p>
            </div>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '0.6rem 1.25rem',
                    borderRadius: '100px',
                    fontSize: '0.875rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    background: activeTab === tab.id ? 'var(--color-navy)' : 'var(--color-neutral-100)',
                    color: activeTab === tab.id ? 'white' : 'var(--color-neutral-600)',
                    border: 'none',
                    transition: 'all 0.25s var(--ease-smooth)',
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
          {(tabProducts[activeTab] ?? tabProducts.bestsellers).slice(0, 4).map((product, i) => (
            <Reveal key={product.id} delay={i * 70}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <Reveal style={{ marginTop: '3rem', textAlign: 'center' }}>
          <Link to="/shop" className="btn-secondary" style={{ padding: '0.85rem 2rem' }}>
            View Full Catalogue ({PRODUCTS.length} Styles) <ArrowRight size={16} />
          </Link>
        </Reveal>
      </div>
    </section>
  )
}

// ── MAIN HOME PAGE ────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      {/* 1. Hero */}
      <HeroSection />

      {/* Trust Strip */}
      <TrustStrip />

      {/* 3. Brand Introduction (Manufacturing & Workwear Story) */}
      <BrandIntro />

      {/* 4. Industries We Serve (10 Major Professional Sectors) */}
      <IndustriesWeServe />

      {/* 5. Category-Wise Products Showcase (4 Products per Category) */}
      <CategorySectionShowcase />

      {/* 7. Why 50,000+ Professionals Choose AFI */}
      <WhyAFISection />

      {/* 8. Verified Client & Enterprise Testimonials */}
      <TestimonialsSection />
    </>
  )
}
