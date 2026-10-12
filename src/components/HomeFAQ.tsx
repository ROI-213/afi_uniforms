/**
 * HomeFAQ — Section 16: FAQ
 * ─────────────────────────────────────────────────────────────
 * Accordion with smooth answer expansion animation (CSS grid 0fr -> 1fr).
 *
 * Categories:
 *   - Sizing
 *   - Products
 *   - Sets
 *   - Customization
 *   - Payments
 *   - Delivery
 *   - Returns
 *   - Bulk Orders
 */

import { useState } from 'react'
import {
  ChevronDown,
  HelpCircle,
  MessageSquare,
  Maximize2,
  Package,
  Layers,
  Scissors,
  CreditCard,
  Truck,
  RotateCcw,
  Building2,
  Sparkles,
  PhoneCall
} from 'lucide-react'

type FAQCategory =
  | 'All'
  | 'Sizing'
  | 'Products'
  | 'Sets'
  | 'Customization'
  | 'Payments'
  | 'Delivery'
  | 'Returns'
  | 'Bulk Orders'

interface FAQItem {
  id: string
  category: Exclude<FAQCategory, 'All'>
  q: string
  a: string
  highlight?: string
}

const FAQ_DATA: FAQItem[] = [
  // ── 1. Sizing ──
  {
    id: 's1',
    category: 'Sizing',
    q: 'How do AFI uniform sizes compare to standard Indian and international charts?',
    a: 'AFI sizes are calibrated specifically for Indian healthcare professionals while matching global scrubs standards (XS to 5XL). Our tailored silhouettes provide ample chest and shoulder room for stethoscope drape and unhindered CPR reach. Consult our interactive Smart Size Guide on each product page or order a free sizing trial ring.',
    highlight: 'XS to 5XL with Petite & Tall Inseams',
  },
  {
    id: 's2',
    category: 'Sizing',
    q: 'Can I select different sizes for scrub tops and scrub pants in a set?',
    a: 'Yes. In our Scrub Set customizer and individual separates collection, you can pair a Medium top with Large pants or any combination that fits your individual body proportions.',
    highlight: 'Mix-and-Match Top & Bottom Sizing Available',
  },
  {
    id: 's3',
    category: 'Sizing',
    q: 'Do you offer petite and tall inseam lengths for scrub pants?',
    a: 'All AFI scrub bottoms come in three engineered inseam profiles: Petite (28"), Regular (30.5"), and Tall (33"). This guarantees straight-fall drape without fabric dragging across sterile theatre floors.',
  },

  // ── 2. Products ──
  {
    id: 'p1',
    category: 'Products',
    q: 'What is the technical difference between AeroFlex™ and ComfortCare™ fabrics?',
    a: 'AeroFlex™ is a 4-way stretch micro-twill (72% Poly, 21% Rayon, 7% Spandex, 175 GSM) engineered for operating theatres, surgical marathons, and trauma care with SilverShield™ antimicrobial infusion. ComfortCare™ is an ultra-soft combed cotton-poly blend (200 GSM) designed for outpatient consultations, day wards, and executive clinic wear.',
    highlight: 'AeroFlex™ (Stretch / OT) vs ComfortCare™ (Soft / OPD)',
  },
  {
    id: 'p2',
    category: 'Products',
    q: 'Are AFI scrubs and lab coats autoclave and high-temp sterilization safe?',
    a: 'Yes. Every AFI garment undergoes ColorLock™ molecular vat-dyeing and reinforced dual-lock seam testing, certified to withstand 100+ commercial hospital autoclave washing cycles at 85°C without fading or shrinking.',
  },
  {
    id: 'p3',
    category: 'Products',
    q: 'How does the HydroDrop™ liquid barrier function during surgical procedures?',
    a: 'HydroDrop™ is a durable water-repellent (DWR) surface finish that causes bodily fluids, blood, and saline splashes to bead up and roll off without permeating the textile weave, keeping clinicians dry and protected.',
  },

  // ── 3. Sets ──
  {
    id: 'st1',
    category: 'Sets',
    q: 'What is included in a complete AFI Scrub Set?',
    a: 'Each complete Scrub Set includes a tailored multi-pocket scrub top (chest pocket, hidden pen slots, and scissor loop) paired with ergonomic scrub pants (deep cargo pockets, back pocket, and elastic drawstring waistband).',
    highlight: 'Complete 2-Piece Clinical Suit with 7 Pockets',
  },
  {
    id: 'st2',
    category: 'Sets',
    q: 'Can I purchase scrub tops and scrub bottoms separately?',
    a: 'Absolutely. We sell both complete coordinated 2-piece sets and individual separates under our Scrub Tops and Scrub Bottoms categories, allowing you to replenish pieces as needed.',
  },
  {
    id: 'st3',
    category: 'Sets',
    q: 'Is color consistency guaranteed when re-ordering sets across different months?',
    a: 'Yes. We utilize strictly standardized Pantone clinical master dyes. When your hospital department orders Royal Navy or Forest Green today and re-orders in six months, color continuity is 100% consistent.',
  },

  // ── 4. Customization ──
  {
    id: 'c1',
    category: 'Customization',
    q: 'Can I order personalized clinician name and credentials embroidery on a single set?',
    a: 'Yes! We have zero minimum order requirements for clinician monograms. You can personalize a single top with your name (Line 1) and clinical designation (Line 2) in your choice of font and thread color.',
    highlight: 'Zero Minimum Quantity for Name Embroidery',
  },
  {
    id: 'c2',
    category: 'Customization',
    q: 'How does custom hospital and clinic logo digitization work?',
    a: 'Upload your hospital vector or clinic crest at checkout or share it with our design team on WhatsApp. Our master digitizer converts your logo into high-density stitch files with Pantone thread matching and sends a digital pre-production strike-off for your approval within 24 hours.',
  },
  {
    id: 'c3',
    category: 'Customization',
    q: 'Will custom embroidery unravel or fray under industrial hospital laundering?',
    a: 'No. We use German Madeira™ polyester-core industrial embroidery thread locked with high-tensile under-stitching. It is impervious to commercial bleaches and autoclave sterilization temperatures.',
  },

  // ── 5. Payments ──
  {
    id: 'py1',
    category: 'Payments',
    q: 'What payment modes are accepted? Is Cash on Delivery (COD) available?',
    a: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm), Credit/Debit Cards (Visa, Mastercard, RuPay, Amex), NetBanking across 50+ banks, and Cash on Delivery (COD) for orders up to ₹5,000.',
    highlight: 'UPI, Cards, NetBanking, and COD Supported',
  },
  {
    id: 'py2',
    category: 'Payments',
    q: 'Can I receive a formal GST tax invoice to claim business input tax credit?',
    a: 'Yes. Enter your hospital, clinic, or private practice GSTIN at checkout. A GST-compliant B2B tax invoice with your company details and HSN code (6211) will be generated automatically and emailed immediately.',
    highlight: 'Instant GST Input Tax Credit (HSN 6211)',
  },
  {
    id: 'py3',
    category: 'Payments',
    q: 'Do you support purchase orders (PO) and corporate credit terms for institutions?',
    a: 'Yes. Registered hospitals, universities, and healthcare chains can place orders via corporate purchase orders with net-30 credit terms following credit verification.',
  },

  // ── 6. Delivery ──
  {
    id: 'd1',
    category: 'Delivery',
    q: 'How fast is dispatch and delivery across Indian medical centers?',
    a: 'Standard orders dispatch within 24 hours. Metro deliveries (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata) take 2–3 business days. Non-metro and regional hospital centers arrive in 3–5 business days via express air courier.',
    highlight: '48-Hour Metro Express Courier',
  },
  {
    id: 'd2',
    category: 'Delivery',
    q: 'How much does delivery cost? Is free shipping available?',
    a: 'Shipping is completely FREE on all prepaid and COD orders over ₹999 across all Indian pincodes. For orders below ₹999, a nominal flat express shipping charge of ₹79 applies.',
  },
  {
    id: 'd3',
    category: 'Delivery',
    q: 'How are clinical garments packaged for hygienic transit?',
    a: 'Every uniform is individually sealed in tamper-evident, sterile vacuum packaging to protect the fabric from humidity and transit contaminants until opened in your changing facility.',
  },

  // ── 7. Returns ──
  {
    id: 'r1',
    category: 'Returns',
    q: 'What is your return and exchange policy?',
    a: 'We provide a 15-day risk-free exchange policy on all non-embroidered garments. If the fit, sleeve length, or feel is not ideal, we arrange a free doorstep pickup from your hospital or home and dispatch your exchange immediately.',
    highlight: '15-Day Free Doorstep Reverse Pickup',
  },
  {
    id: 'r2',
    category: 'Returns',
    q: 'Can customized or embroidered uniforms be returned or exchanged?',
    a: 'Because customized uniforms are permanently stitched with individual names and institution logos, they cannot be returned for change of mind. However, if there is any manufacturing flaw or embroidery misspelling on our part, we replace the garment at 100% zero cost.',
  },
  {
    id: 'r3',
    category: 'Returns',
    q: 'How long does a refund take once a return is picked up?',
    a: 'Refunds are initiated within 24 hours of return pickup inspection and credited back to your original payment method (or UPI account) within 2–4 business days.',
  },

  // ── 8. Bulk Orders ──
  {
    id: 'b1',
    category: 'Bulk Orders',
    q: 'What are the volume discount tiers for hospitals and medical colleges?',
    a: 'Our tiered pricing unlocks substantial savings: 20–50 units (15% off), 51–200 units (25% off), and 200+ units (35%+ off contract rate). Bulk tiers also include complimentary logo embroidery digitizing and physical sample boxes.',
    highlight: 'Up to 35%+ Volume Rebate + Free Logo Setup',
  },
  {
    id: 'b2',
    category: 'Bulk Orders',
    q: 'Can we receive a physical sample box before placing an institutional order?',
    a: 'Yes! Healthcare procurement heads and medical college committees can request an Institutional Sample Box containing full fabric swatches, color shade rings, and a finished embroidered sample scrub within 48 hours.',
  },
  {
    id: 'b3',
    category: 'Bulk Orders',
    q: 'Can AFI conduct an on-site sizing camp for our hospital staff?',
    a: 'For institutional orders of 100+ units in tier-1 and tier-2 metros, our uniform specialists visit your hospital to record individual staff size matrices, ensuring zero sizing mismatches across departments.',
  },
]

const CATEGORY_TABS: { label: FAQCategory; icon: typeof Maximize2 }[] = [
  { label: 'All', icon: Sparkles },
  { label: 'Sizing', icon: Maximize2 },
  { label: 'Products', icon: Package },
  { label: 'Sets', icon: Layers },
  { label: 'Customization', icon: Scissors },
  { label: 'Payments', icon: CreditCard },
  { label: 'Delivery', icon: Truck },
  { label: 'Returns', icon: RotateCcw },
  { label: 'Bulk Orders', icon: Building2 },
]

export default function HomeFAQ() {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('All')
  const [openIds, setOpenIds] = useState<string[]>(['s1']) // default first item open

  const filteredFaqs = activeCategory === 'All'
    ? FAQ_DATA
    : FAQ_DATA.filter((item) => item.category === activeCategory)

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    )
  }

  return (
    <section
      aria-labelledby="faq-heading"
      style={{
        paddingBlock: 'clamp(4.5rem, 8vw, 7.5rem)',
        background: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-site" style={{ maxWidth: 960 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.35rem 1rem',
              borderRadius: 100,
              background: 'var(--color-blue-pale)',
              border: '1px solid var(--color-blue-light)',
              marginBottom: '0.85rem',
            }}
          >
            <HelpCircle size={14} style={{ color: 'var(--color-medical-blue)' }} />
            <span
              style={{
                fontSize: '0.725rem',
                fontWeight: 800,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--color-medical-blue)',
              }}
            >
              Clear Answers · Zero Ambiguity
            </span>
          </div>

          <h2
            id="faq-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.25rem, 4vw, 3.4rem)',
              color: 'var(--color-navy)',
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              marginBottom: '0.75rem',
            }}
          >
            Frequently Asked Questions
          </h2>

          <p style={{ color: 'var(--color-neutral-500)', fontSize: '1.05rem', lineHeight: 1.6, maxWidth: 600, margin: '0 auto' }}>
            Explore verified answers across all 8 operational domains—from individual doctor sizing to institutional hospital contracts.
          </p>
        </div>

        {/* ── 8 Category Filter Tabs ── */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '2.5rem',
            overflowX: 'auto',
            paddingBottom: '0.5rem',
            scrollbarWidth: 'none',
          }}
        >
          {CATEGORY_TABS.map((tab) => {
            const Icon = tab.icon
            const isSelected = activeCategory === tab.label
            return (
              <button
                key={tab.label}
                type="button"
                onClick={() => setActiveCategory(tab.label)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.15rem',
                  borderRadius: 100,
                  border: isSelected ? '1.5px solid var(--color-navy)' : '1px solid var(--color-neutral-200)',
                  background: isSelected ? 'var(--color-navy)' : 'var(--color-neutral-50)',
                  color: isSelected ? 'white' : 'var(--color-neutral-700)',
                  fontSize: '0.825rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? '0 4px 14px rgba(10,22,40,0.15)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={14} style={{ color: isSelected ? 'var(--color-blue-light)' : 'var(--color-medical-blue)' }} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* ── Accordion Stack with Smooth Grid Expansion ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
          {filteredFaqs.map((item) => {
            const isOpen = openIds.includes(item.id)

            return (
              <div
                key={item.id}
                style={{
                  borderRadius: 'var(--radius-xl)',
                  border: `1.5px solid ${isOpen ? 'var(--color-medical-blue)' : 'var(--color-neutral-200)'}`,
                  background: isOpen ? 'white' : 'var(--color-neutral-50)',
                  boxShadow: isOpen ? '0 12px 32px rgba(28,77,161,0.08)' : 'none',
                  transition: 'border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease',
                  overflow: 'hidden',
                }}
              >
                {/* Accordion Question Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  style={{
                    width: '100%',
                    padding: '1.35rem 1.75rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1.25rem',
                    textAlign: 'left',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--color-navy)',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span
                        style={{
                          fontSize: '0.6875rem',
                          fontWeight: 800,
                          letterSpacing: '0.06em',
                          textTransform: 'uppercase',
                          color: 'var(--color-medical-blue)',
                        }}
                      >
                        {item.category}
                      </span>
                      {item.highlight && (
                        <span
                          style={{
                            fontSize: '0.6875rem',
                            fontWeight: 700,
                            background: 'var(--color-blue-pale)',
                            color: 'var(--color-navy)',
                            padding: '0.15rem 0.5rem',
                            borderRadius: 4,
                          }}
                        >
                          {item.highlight}
                        </span>
                      )}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        fontSize: '1.05rem',
                        lineHeight: 1.35,
                      }}
                    >
                      {item.q}
                    </span>
                  </div>

                  {/* Smooth rotating caret circle */}
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: isOpen ? 'var(--color-medical-blue)' : 'white',
                      border: '1px solid var(--color-neutral-200)',
                      color: isOpen ? 'white' : 'var(--color-navy)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), background 0.25s ease, color 0.25s ease',
                      flexShrink: 0,
                    }}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                {/* ── BUTTERY SMOOTH GRID ANIMATION EXPANSION (0fr -> 1fr) ── */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                >
                  <div style={{ overflow: 'hidden' }}>
                    <div
                      style={{
                        padding: '0 1.75rem 1.5rem',
                        color: 'var(--color-neutral-600)',
                        fontSize: '0.95rem',
                        lineHeight: 1.7,
                        borderTop: isOpen ? '1px solid var(--color-neutral-100)' : 'none',
                        paddingTop: isOpen ? '1rem' : 0,
                      }}
                    >
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* ── Bottom Institutional Concierge Support Banner ── */}
        <div
          style={{
            marginTop: '3.5rem',
            background: 'var(--color-neutral-50)',
            border: '1.5px solid var(--color-neutral-200)',
            borderRadius: 'var(--radius-xl)',
            padding: '2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'white',
                border: '1.5px solid var(--color-neutral-200)',
                color: 'var(--color-medical-blue)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <MessageSquare size={22} />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--color-navy)' }}>
                Have an institution-specific tender or custom requirement?
              </div>
              <div style={{ fontSize: '0.875rem', color: 'var(--color-neutral-500)', marginTop: '0.2rem' }}>
                Our hospital procurement team is available 9 AM – 8 PM IST for technical queries.
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/919999999999?text=Hello%20AFI%20Uniforms%2C%20I%20have%20a%20question%20regarding%20uniform%20specifications"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ padding: '0.75rem 1.35rem', fontSize: '0.85rem' }}
            >
              <PhoneCall size={14} /> WhatsApp Concierge
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
