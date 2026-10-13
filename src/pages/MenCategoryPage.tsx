import { Link, useSearchParams } from 'react-router-dom'
import { ShieldCheck, Truck, Sparkles, ChevronRight } from 'lucide-react'
import MenCategorySignatureSections from '../components/MenCategorySignatureSections'
import type { MenCategoryKey } from '../components/MenCategorySignatureSections'

interface MenCategoryPageProps {
  defaultCategory?: MenCategoryKey
}

const MEN_CATEGORY_NAMES: Record<string, string> = {
  corporate: 'Corporate Shirts & Suits',
  industrial: 'Industrial & Safety Workwear',
  hospitality: 'Hospitality & Chef Coats',
  security: 'Security & Tactical Uniforms',
  scrubs: "Men's Healthcare Scrubs",
  logistics: 'Logistics & Retail Polos',
}

export default function MenCategoryPage({ defaultCategory }: MenCategoryPageProps) {
  const [searchParams] = useSearchParams()
  const rawCat = searchParams.get('category') || defaultCategory || ''
  const activeCategoryTitle = MEN_CATEGORY_NAMES[rawCat] || "All Men's Categories"

  return (
    <div style={{ minHeight: '85vh', background: '#FAFBFD' }}>
      {/* ── BREADCRUMB & PAGE HERO ── */}
      <div
        style={{
          background: 'linear-gradient(180deg, #EDF4FD 0%, #FAFBFD 100%)',
          borderBottom: '1px solid rgba(20, 110, 245, 0.1)',
          paddingTop: '2.5rem',
          paddingBottom: '2.25rem',
        }}
      >
        <div className="container-site">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              color: 'var(--color-neutral-500)',
              marginBottom: '1rem',
            }}
          >
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
            <ChevronRight size={13} style={{ color: 'var(--color-neutral-400)' }} />
            <Link to="/men" style={{ color: 'inherit', textDecoration: 'none' }}>
              Men
            </Link>
            {rawCat && (
              <>
                <ChevronRight size={13} style={{ color: 'var(--color-neutral-400)' }} />
                <span style={{ color: '#146EF5', fontWeight: 700 }}>
                  {activeCategoryTitle}
                </span>
              </>
            )}
          </nav>

          {/* Heading Area */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.25rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.28rem 0.8rem',
                  borderRadius: 100,
                  background: 'white',
                  border: '1px solid rgba(20, 110, 245, 0.25)',
                  boxShadow: '0 2px 8px rgba(20, 110, 245, 0.08)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#146EF5',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.65rem',
                }}
              >
                <Sparkles size={12} />
                CLIENT PRODUCT CATALOG • GHOST MANNEQUIN
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                  color: '#0B2744',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}
              >
                {rawCat ? activeCategoryTitle : "Men's Uniform Collections"}
              </h1>

              <p
                style={{
                  fontSize: 'clamp(0.9rem, 1.1vw, 1.05rem)',
                  color: 'var(--color-neutral-600)',
                  maxWidth: 680,
                  lineHeight: 1.5,
                }}
              >
                Studio catalog product photography (5 dedicated styles per category, zero human models) engineered with reinforced seams, heavy-duty blends, high-visibility 3M tapes, and direct factory tailoring.
              </p>
            </div>

            {/* Trust Pill */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
                background: 'white',
                padding: '0.85rem 1.25rem',
                borderRadius: 16,
                border: '1px solid rgba(11, 39, 68, 0.08)',
                boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', fontWeight: 700, color: '#0B2744' }}>
                <ShieldCheck size={16} style={{ color: '#16A34A' }} />
                ISO-Certified In-House Production
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.78rem', fontWeight: 600, color: 'var(--color-neutral-600)' }}>
                <Truck size={16} style={{ color: '#146EF5' }} />
                Pan-India Enterprise Delivery
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── THE SIGNATURE CATEGORY SHOWCASE (WITH SCROLL & LOOKBOOK) ── */}
      <MenCategorySignatureSections initialCategory={rawCat as MenCategoryKey} />
    </div>
  )
}
