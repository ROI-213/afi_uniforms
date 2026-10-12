/**
 * ShoppingProcess — Section 12: HOW SHOPPING WORKS
 * ─────────────────────────────────────────────────────────────
 * Interactive timeline featuring two modes:
 *
 * Retail:
 *   Browse → Select → Customize → Checkout → Track
 *
 * Bulk:
 *   Enquiry → Quote → Artwork → Confirmation → Production → Delivery
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Compass,
  CheckCircle2,
  ArrowRight,
  ShoppingBag,
  Building2,
  Search,
  CheckSquare,
  Scissors,
  CreditCard,
  Truck,
  FileText,
  Calculator,
  Palette,
  ClipboardCheck,
  Factory
} from 'lucide-react'

/* ── Retail Timeline Steps ────────────────────────────────── */
const RETAIL_STEPS = [
  {
    step: '01',
    name: 'Browse',
    tagline: 'Curated Department Silhouettes',
    description: 'Explore scrubs, lab coats, and underscrubs in 20+ hospital-approved colorways tailored for surgical and clinical roles.',
    icon: Search,
    detailPoint: 'Filter by specialty, sleeve cut, or colorway',
  },
  {
    step: '02',
    name: 'Select',
    tagline: 'Precision Sizing & Fabric',
    description: 'Choose your size from XS to 5XL with petite or tall options. Pick your preferred fabric: AeroFlex™ or ComfortCare™.',
    icon: CheckSquare,
    detailPoint: 'Smart size guide guarantees <1% return rate',
  },
  {
    step: '03',
    name: 'Customize',
    tagline: 'Doctor & Department Monogram',
    description: 'Add your name, clinical credentials, and specialty emblem with high-density autoclave-resistant embroidery.',
    icon: Scissors,
    detailPoint: 'Live real-time embroidery visual preview',
  },
  {
    step: '04',
    name: 'Checkout',
    tagline: 'Seamless Instant Order',
    description: 'Quick checkout via UPI, Cards, NetBanking, or Cash on Delivery with automatic GST tax invoice download.',
    icon: CreditCard,
    detailPoint: 'Free express shipping on orders over ₹999',
  },
  {
    step: '05',
    name: 'Track',
    tagline: 'Sterile Doorstep Delivery',
    description: 'Shipped in tamper-proof sterile packaging with real-time WhatsApp & SMS tracking. 15-day easy exchange guarantee.',
    icon: Truck,
    detailPoint: '48-hour metro express dispatch',
  },
]

/* ── Bulk Timeline Steps ──────────────────────────────────── */
const BULK_STEPS = [
  {
    step: '01',
    name: 'Enquiry',
    tagline: 'Submit Headcounts & Departments',
    description: 'Share your hospital staff headcount, desired color-coding by department (OT, ICU, OPD), and fabric preferences.',
    icon: FileText,
    detailPoint: 'Dedicated account manager assigned in 2 hours',
  },
  {
    step: '02',
    name: 'Quote',
    tagline: 'Volume Tier Pricing & GST Terms',
    description: 'Receive a transparent itemized quotation with institutional discounts (up to 35% off), MSME terms, and GST invoicing.',
    icon: Calculator,
    detailPoint: 'Complimentary physical fabric sample ring',
  },
  {
    step: '03',
    name: 'Artwork',
    tagline: 'Hospital Logo Digitization',
    description: 'Our embroidery master digitizes your hospital crest into vector stitch files with exact Pantone thread color matching.',
    icon: Palette,
    detailPoint: 'Digital pre-production stitch approval within 24h',
  },
  {
    step: '04',
    name: 'Confirmation',
    tagline: 'Staff Size Matrix Logging',
    description: 'Finalize individual doctor names, designations, and sizes using our standardized institutional size matrix template.',
    icon: ClipboardCheck,
    detailPoint: 'Free doorstep trial sizing sets dispatched',
  },
  {
    step: '05',
    name: 'Production',
    tagline: 'Automated Multi-Head Stitching',
    description: 'Manufactured in our ISO-certified clean facility with high-tensile seam stitching and autoclave durability testing.',
    icon: Factory,
    detailPoint: 'Capacity of 2,000+ units per week',
  },
  {
    step: '06',
    name: 'Delivery',
    tagline: 'Department-Wise Sorted Dispatch',
    description: 'Individually labeled by doctor name and ward department for effortless on-site distribution at your medical facility.',
    icon: Truck,
    detailPoint: 'Pan-India temperature-controlled dispatch',
  },
]

export default function ShoppingProcess() {
  const [activeMode, setActiveMode] = useState<'retail' | 'bulk'>('retail')
  const [activeStepIndex, setActiveStepIndex] = useState(0)

  const steps = activeMode === 'retail' ? RETAIL_STEPS : BULK_STEPS
  const currentStep = steps[Math.min(activeStepIndex, steps.length - 1)]

  return (
    <section
      aria-labelledby="how-it-works-heading"
      style={{
        paddingBlock: 'clamp(4.5rem, 8vw, 7.5rem)',
        background: 'var(--color-neutral-50)',
        borderTop: '1px solid var(--color-neutral-200)',
        borderBottom: '1px solid var(--color-neutral-200)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-site">
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 1rem',
              borderRadius: 100,
              background: 'var(--color-blue-pale)',
              border: '1px solid var(--color-blue-light)',
              marginBottom: '1rem',
            }}
          >
            <Compass size={14} style={{ color: 'var(--color-medical-blue)' }} />
            <span
              style={{
                fontSize: '0.725rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-medical-blue)',
              }}
            >
              Frictionless Ordering
            </span>
          </div>

          <h2
            id="how-it-works-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.25rem, 4vw, 3.4rem)',
              color: 'var(--color-navy)',
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              marginBottom: '1rem',
            }}
          >
            How Shopping Works
          </h2>

          <p style={{ color: 'var(--color-neutral-600)', fontSize: '1.05rem', lineHeight: 1.6 }}>
            Whether ordering a single set for your clinic or 500 sets for a medical center, explore our interactive workflow below.
          </p>

          {/* Interactive Dual-Mode Switcher */}
          <div
            style={{
              display: 'inline-flex',
              background: 'white',
              padding: '0.4rem',
              borderRadius: 100,
              border: '1.5px solid var(--color-neutral-200)',
              marginTop: '1.75rem',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <button
              type="button"
              onClick={() => {
                setActiveMode('retail')
                setActiveStepIndex(0)
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                borderRadius: 100,
                border: 'none',
                background: activeMode === 'retail' ? 'var(--color-navy)' : 'transparent',
                color: activeMode === 'retail' ? 'white' : 'var(--color-neutral-600)',
                fontSize: '0.875rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <ShoppingBag size={15} />
              Retail (Individual Clinicians)
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveMode('bulk')
                setActiveStepIndex(0)
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.5rem',
                borderRadius: 100,
                border: 'none',
                background: activeMode === 'bulk' ? 'var(--color-navy)' : 'transparent',
                color: activeMode === 'bulk' ? 'white' : 'var(--color-neutral-600)',
                fontSize: '0.875rem',
                fontWeight: 800,
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <Building2 size={15} />
              Bulk (Hospitals & Institutions)
            </button>
          </div>
        </div>

        {/* ── Interactive Horizontal Timeline Sequence ── */}
        <div style={{ marginBottom: '3.5rem' }}>
          {/* Timeline Step Pills */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${steps.length}, 1fr)`,
              gap: '0.75rem',
              marginBottom: '2rem',
              overflowX: 'auto',
              paddingBottom: '0.5rem',
            }}
          >
            {steps.map((s, idx) => {
              const Icon = s.icon
              const isCurrent = activeStepIndex === idx
              const isPast = activeStepIndex > idx

              return (
                <button
                  key={s.step}
                  type="button"
                  onClick={() => setActiveStepIndex(idx)}
                  style={{
                    background: isCurrent ? 'var(--color-navy)' : 'white',
                    color: isCurrent ? 'white' : 'var(--color-navy)',
                    borderRadius: 16,
                    border: `1.5px solid ${isCurrent ? 'var(--color-medical-blue)' : 'var(--color-neutral-200)'}`,
                    padding: '1.25rem 1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    boxShadow: isCurrent ? '0 12px 30px rgba(10,22,40,0.18)' : 'var(--shadow-card)',
                    transition: 'all 0.25s ease',
                    minWidth: 150,
                    textAlign: 'left',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 800, color: isCurrent ? 'var(--color-blue-light)' : 'var(--color-neutral-400)' }}>
                      Step {s.step}
                    </span>
                    <Icon size={16} style={{ color: isCurrent ? 'var(--color-blue-light)' : isPast ? '#16A34A' : 'var(--color-medical-blue)' }} />
                  </div>

                  <div style={{ fontWeight: 800, fontSize: '1.05rem', fontFamily: 'var(--font-display)', letterSpacing: '-0.01em' }}>
                    {s.name}
                  </div>
                </button>
              )
            })}
          </div>

          {/* Detailed Spotlight Card for the Selected Step */}
          {currentStep && (
            <div
              style={{
                background: 'white',
                borderRadius: 'var(--radius-2xl)',
                border: '1.5px solid var(--color-neutral-200)',
                padding: 'clamp(2rem, 4vw, 3.25rem)',
                boxShadow: '0 20px 50px rgba(10,22,40,0.06)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.5rem',
                alignItems: 'center',
              }}
            >
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--color-medical-blue)', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                  <span>{activeMode === 'retail' ? 'Retail Journey' : 'Institutional Protocol'}</span>
                  <span>•</span>
                  <span>Phase {currentStep.step} of 0{steps.length}</span>
                </div>

                <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, fontSize: 'clamp(1.75rem, 2.8vw, 2.4rem)', color: 'var(--color-navy)', lineHeight: 1.15, marginBottom: '0.5rem' }}>
                  {currentStep.name}: {currentStep.tagline}
                </h3>

                <p style={{ color: 'var(--color-neutral-600)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                  {currentStep.description}
                </p>

                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--color-blue-pale)', border: '1px solid var(--color-blue-light)', padding: '0.5rem 1rem', borderRadius: 10 }}>
                  <CheckCircle2 size={16} style={{ color: 'var(--color-medical-blue)' }} />
                  <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-navy)' }}>
                    {currentStep.detailPoint}
                  </span>
                </div>
              </div>

              {/* Action Buttons for this timeline */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', background: 'var(--color-neutral-50)', padding: '2rem', borderRadius: 18, border: '1px solid var(--color-neutral-200)' }}>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--color-navy)' }}>
                  Ready to proceed with {activeMode === 'retail' ? 'your personal order' : 'your hospital batch'}?
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-neutral-500)', lineHeight: 1.5, margin: 0 }}>
                  {activeMode === 'retail'
                    ? 'All scrub orders include complimentary 15-day doorstep fitting exchanges and sanitized tamper-proof packaging.'
                    : 'Institutional orders receive formal GST invoicing, physical sizing rings, and dedicated department tracking.'}
                </p>

                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                  {activeMode === 'retail' ? (
                    <Link
                      to="/shop"
                      className="btn-primary"
                      style={{ flex: 1, justifyContent: 'center', padding: '0.9rem' }}
                    >
                      Start Shopping Now <ArrowRight size={16} />
                    </Link>
                  ) : (
                    <Link
                      to="/bulk-orders"
                      className="btn-primary"
                      style={{ flex: 1, justifyContent: 'center', padding: '0.9rem' }}
                    >
                      Request Bulk Quotation <ArrowRight size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
