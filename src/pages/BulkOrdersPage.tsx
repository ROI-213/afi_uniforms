import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight,
  Truck,
  Users,
  Phone,
  MessageCircle,
  CheckCircle,
  Building2,
  Receipt,
  Send,
  Boxes,
} from 'lucide-react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const VOLUME_TIERS = [
  {
    range: '50 – 199 Units',
    discount: '15% Off MRP',
    badge: 'Tier 1',
    benefits: ['Free Logo Digitization', 'Standard Pan-India Dispatch', 'GST Tax Invoice'],
  },
  {
    range: '200 – 499 Units',
    discount: '25% Off MRP',
    badge: 'Tier 2 (Popular)',
    benefits: ['Free On-Site Size Set Kit', 'Free Embroidery Setup', 'Priority Production Slot'],
  },
  {
    range: '500 – 1,999 Units',
    discount: '35% Off MRP',
    badge: 'Tier 3 (Enterprise)',
    benefits: ['Multi-City Phased Delivery', 'Dedicated Key Account Director', 'Custom Fabric Weave Options'],
  },
  {
    range: '2,000+ Units',
    discount: 'Direct Factory OEM',
    badge: 'Tier 4 (Institutional)',
    benefits: ['Annual Rate Contract (ARC)', 'Dedicated Buffer Stock Warehousing', 'Bespoke Mill Dyeing'],
  },
]

const INDUSTRIES = [
  'Corporate & IT Tech Parks',
  'Industrial & Manufacturing Plants',
  'Hospitality & Hotel Chains',
  'Healthcare & Hospital Networks',
  'Security Agencies & Facility Services',
  'Logistics Fleets & Retail Chains',
  'Colleges, Universities & Schools',
]

export default function BulkOrdersPage() {
  const [selectedIndustry, setSelectedIndustry] = useState(INDUSTRIES[0])
  const [quantity, setQuantity] = useState('200 – 499 Units')
  const [form, setForm] = useState({
    name: '',
    org: '',
    email: '',
    phone: '',
    deliveryCity: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello AFI Uniforms, I would like to request an Enterprise Bulk Order Quotation:\n` +
        `• Organisation: ${form.org || 'Not specified'}\n` +
        `• Name: ${form.name || 'Client'}\n` +
        `• Industry: ${selectedIndustry}\n` +
        `• Volume Tier: ${quantity}\n` +
        `• City/Locations: ${form.deliveryCity || 'Pan-India'}\n` +
        `• Details: ${form.message || 'Please provide quotation & sizing kit details'}`
    )
    return `https://wa.me/919945379333?text=${text}`
  }

  return (
    <div style={{ background: '#FAFBFD', minHeight: '85vh' }}>
      {/* ── 1. HERO SECTION ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, #0B2744 0%, #113861 100%)',
          color: 'white',
          paddingTop: 'clamp(3.5rem, 6vw, 5.5rem)',
          paddingBottom: 'clamp(3rem, 5vw, 4.5rem)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 450,
            height: 450,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20, 110, 245, 0.25) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <span style={{ color: '#38BDF8', fontWeight: 700 }}>Bulk Orders</span>
          </nav>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.3rem 0.85rem',
              borderRadius: 100,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.72rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#38BDF8',
              marginBottom: '1.25rem',
            }}
          >
            <Boxes size={13} />
            ENTERPRISE VOLUME PROCUREMENT & SUPPLY
          </div>

          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.1rem, 4.2vw, 3.4rem)',
              letterSpacing: '-0.03em',
              lineHeight: 1.15,
              maxWidth: 820,
              marginBottom: '1.25rem',
            }}
          >
            Enterprise Bulk Uniform Procurement & Volume Supply.
          </h1>

          <p
            style={{
              fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
              color: 'rgba(255, 255, 255, 0.85)',
              maxWidth: 700,
              lineHeight: 1.6,
              marginBottom: '2rem',
            }}
          >
            Equipping corporate workforces, hospital networks, hotel groups, and manufacturing plants with direct factory volume supply, guaranteed tiered bulk discounts, and scheduled pan-India delivery.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="#bulk-quote-form"
              className="btn-primary"
              style={{
                background: '#146EF5',
                padding: '0.85rem 1.8rem',
                fontSize: '0.9rem',
                boxShadow: '0 4px 18px rgba(20, 110, 245, 0.4)',
              }}
            >
              Request Bulk Quotation <ArrowRight size={15} />
            </a>

            <a
              href="https://wa.me/919945379333?text=Hi%20AFI%20Uniforms%2C%20I%20am%20looking%20for%20enterprise%20bulk%20uniform%20procurement"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(255, 255, 255, 0.12)',
                color: 'white',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                padding: '0.85rem 1.6rem',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.9rem',
                fontWeight: 700,
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                transition: `all 0.2s ${EASE}`,
              }}
            >
              <MessageCircle size={16} style={{ color: '#25D366' }} />
              WhatsApp Procurement (+91 99453 79333)
            </a>
          </div>

          {/* Quick Stats Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '1rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {[
              { val: '500+ Institutions', label: 'Supplied Nationwide' },
              { val: '50,000+ Units', label: 'Monthly Capacity' },
              { val: 'Up to 35% Off', label: 'Volume Tier Savings' },
              { val: 'Pan-India', label: 'Phased Branch Delivery' },
            ].map(s => (
              <div key={s.label}>
                <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'white', fontFamily: 'var(--font-display)' }}>
                  {s.val}
                </div>
                <div style={{ fontSize: '0.74rem', color: '#94A3B8', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. TIERED VOLUME DISCOUNT PRICING TABLE ── */}
      <section style={{ paddingBlock: 'clamp(3rem, 5vw, 5rem)' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 3rem' }}>
            <div
              style={{
                fontSize: '0.72rem',
                fontWeight: 800,
                color: '#146EF5',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                marginBottom: '0.4rem',
              }}
            >
              TRANSPARENT VOLUME SLABS
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.7rem, 2.8vw, 2.3rem)',
                color: '#0B2744',
                letterSpacing: '-0.02em',
                marginBottom: '0.6rem',
              }}
            >
              Volume Tier Discounts for Enterprise Orders
            </h2>
            <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.9rem' }}>
              The larger your uniform procurement volume, the greater your savings. Direct factory pricing with zero distributor markups.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {VOLUME_TIERS.map((tier, idx) => {
              const isHighlight = idx === 1 || idx === 2
              return (
                <div
                  key={tier.range}
                  style={{
                    background: 'white',
                    borderRadius: 18,
                    padding: '1.75rem',
                    border: isHighlight
                      ? '2px solid #146EF5'
                      : '1px solid rgba(11, 39, 68, 0.08)',
                    boxShadow: isHighlight
                      ? '0 12px 32px rgba(20, 110, 245, 0.12)'
                      : '0 4px 16px rgba(11, 39, 68, 0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    position: 'relative',
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'inline-block',
                        fontSize: '0.66rem',
                        fontWeight: 800,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: isHighlight ? '#146EF5' : '#64748B',
                        background: isHighlight ? '#EFF6FF' : '#F1F5F9',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 100,
                        marginBottom: '0.75rem',
                      }}
                    >
                      {tier.badge}
                    </span>

                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 900,
                        fontSize: '1.2rem',
                        color: '#0B2744',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {tier.range}
                    </h3>

                    <div
                      style={{
                        fontSize: '1.1rem',
                        fontWeight: 900,
                        color: '#16A34A',
                        marginBottom: '1.25rem',
                      }}
                    >
                      {tier.discount}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                      {tier.benefits.map(b => (
                        <div key={b} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#334155' }}>
                          <CheckCircle size={14} style={{ color: '#16A34A', flexShrink: 0 }} />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <a
                    href="#bulk-quote-form"
                    onClick={() => setQuantity(tier.range)}
                    style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '0.65rem',
                      borderRadius: 10,
                      background: isHighlight ? '#0B2744' : '#F8FAFC',
                      color: isHighlight ? 'white' : '#0B2744',
                      border: '1px solid rgba(11, 39, 68, 0.12)',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    Select Slab
                  </a>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. ENTERPRISE PROCUREMENT ADVANTAGES ── */}
      <section style={{ background: '#F1F5F9', paddingBlock: 'clamp(3.5rem, 6vw, 5rem)' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 3rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.7rem, 2.8vw, 2.2rem)',
                color: '#0B2744',
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
              }}
            >
              Why Enterprise Procurement Teams Trust AFI
            </h2>
            <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.9rem' }}>
              We simplify multi-branch uniform rollouts with institutional compliance and end-to-end logistics.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                icon: Truck,
                title: 'Multi-Location Phased Delivery',
                desc: 'Consolidated bulk production dispatched in phases directly to multiple branch locations, hospitals, or manufacturing plants.',
              },
              {
                icon: Users,
                title: 'Free On-Site Size Set Kits',
                desc: 'Complete physical size trial sets (XS to 5XL) dispatched to your HR/Admin team for accurate employee fitting before production.',
              },
              {
                icon: Receipt,
                title: 'Formal GST & PO Billing',
                desc: 'Complete tax invoice compliance, vendor onboarding support, digital work orders, and institutional payment terms for verified corporates.',
              },
              {
                icon: Building2,
                title: 'Dedicated Account Director',
                desc: 'A single senior relationship manager handling sample approvals, factory scheduling, logistics updates, and re-orders.',
              },
            ].map(adv => {
              const Icon = adv.icon
              return (
                <div
                  key={adv.title}
                  style={{
                    background: 'white',
                    borderRadius: 16,
                    padding: '1.75rem',
                    border: '1px solid rgba(11, 39, 68, 0.08)',
                    boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 12,
                      background: '#EFF6FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                    }}
                  >
                    <Icon size={22} style={{ color: '#146EF5' }} />
                  </div>
                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1rem',
                      color: '#0B2744',
                      marginBottom: '0.45rem',
                    }}
                  >
                    {adv.title}
                  </h4>
                  <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                    {adv.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 4. BULK QUOTE ENQUIRY FORM ── */}
      <section id="bulk-quote-form" style={{ paddingBlock: 'clamp(3.5rem, 6vw, 5.5rem)' }}>
        <div className="container-site">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 520px)',
              gap: '3rem',
              alignItems: 'start',
            }}
          >
            {/* Left side details */}
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 100,
                  background: '#EFF6FF',
                  border: '1px solid rgba(20, 110, 245, 0.25)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#146EF5',
                  marginBottom: '0.75rem',
                }}
              >
                DIRECT FACTORY PROCUREMENT
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.7rem, 2.8vw, 2.4rem)',
                  color: '#0B2744',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.75rem',
                }}
              >
                Request a Formal Commercial Bulk Quotation
              </h2>

              <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Fill out the procurement request form, and our institutional volume specialist will provide a detailed line-item quote, sample schedule, and volume price breakdown within 4 business hours.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Phone size={18} style={{ color: '#146EF5' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Direct Procurement Desk</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0B2744' }}>+91 99453 79333</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <MessageCircle size={18} style={{ color: '#16A34A' }} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Instant WhatsApp RFQ</div>
                    <a
                      href="https://wa.me/919945379333?text=Hi%20AFI%20Uniforms%2C%20I%20need%20a%20bulk%20uniform%20quote"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ fontSize: '0.95rem', fontWeight: 800, color: '#16A34A', textDecoration: 'none' }}
                    >
                      Chat on WhatsApp (+91 99453 79333) →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side form */}
            <div
              style={{
                background: 'white',
                borderRadius: 20,
                padding: '2rem',
                border: '1px solid rgba(11, 39, 68, 0.1)',
                boxShadow: '0 12px 36px rgba(11, 39, 68, 0.08)',
              }}
            >
              {submitted ? (
                <div
                  style={{
                    background: '#DCFCE7',
                    borderRadius: 14,
                    padding: '2rem',
                    textAlign: 'center',
                    border: '1px solid #86EFAC',
                  }}
                >
                  <CheckCircle size={44} style={{ color: '#16A34A', margin: '0 auto 0.75rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 900, color: '#14532D', fontSize: '1.2rem', marginBottom: '0.4rem' }}>
                    Bulk Quotation Request Received!
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: '#166534', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                    Thank you! Our institutional procurement director will review your requirements and provide an official quotation within 4 business hours.
                  </p>
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      background: '#16A34A',
                      color: 'white',
                      padding: '0.7rem 1.25rem',
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={16} /> Open on WhatsApp Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                        Procurement Officer Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Anand Sharma"
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.85rem',
                          borderRadius: 8,
                          border: '1.5px solid rgba(11, 39, 68, 0.12)',
                          fontSize: '0.84rem',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                        Organization / Entity *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Fortis Healthcare / Tata Motors"
                        value={form.org}
                        onChange={e => setForm({ ...form, org: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.85rem',
                          borderRadius: 8,
                          border: '1.5px solid rgba(11, 39, 68, 0.12)',
                          fontSize: '0.84rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="purchase@organization.com"
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.85rem',
                          borderRadius: 8,
                          border: '1.5px solid rgba(11, 39, 68, 0.12)',
                          fontSize: '0.84rem',
                          outline: 'none',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                        Phone / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 99453 79333"
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.85rem',
                          borderRadius: 8,
                          border: '1.5px solid rgba(11, 39, 68, 0.12)',
                          fontSize: '0.84rem',
                          outline: 'none',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                        Industry Sector
                      </label>
                      <select
                        value={selectedIndustry}
                        onChange={e => setSelectedIndustry(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.85rem',
                          borderRadius: 8,
                          border: '1.5px solid rgba(11, 39, 68, 0.12)',
                          fontSize: '0.84rem',
                          outline: 'none',
                          background: 'white',
                          color: '#0B2744',
                        }}
                      >
                        {INDUSTRIES.map(ind => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                        Volume Tier
                      </label>
                      <select
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '0.6rem 0.85rem',
                          borderRadius: 8,
                          border: '1.5px solid rgba(11, 39, 68, 0.12)',
                          fontSize: '0.84rem',
                          outline: 'none',
                          background: 'white',
                          color: '#0B2744',
                        }}
                      >
                        {VOLUME_TIERS.map(t => (
                          <option key={t.range} value={t.range}>
                            {t.range} ({t.discount})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                      Delivery Location(s) / Cities
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bangalore, Mumbai, Delhi (Multiple branches)"
                      value={form.deliveryCity}
                      onChange={e => setForm({ ...form, deliveryCity: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 8,
                        border: '1.5px solid rgba(11, 39, 68, 0.12)',
                        fontSize: '0.84rem',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                      Procurement Requirements & Timeline
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specific fabric specs, employee count by department, target dispatch schedule..."
                      value={form.message}
                      onChange={e => setForm({ ...form, message: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 8,
                        border: '1.5px solid rgba(11, 39, 68, 0.12)',
                        fontSize: '0.84rem',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      justifyContent: 'center',
                      fontSize: '0.88rem',
                      background: '#0B2744',
                      marginTop: '0.5rem',
                    }}
                  >
                    <Send size={15} /> Submit for Official Institutional RFQ
                  </button>

                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.45rem',
                      padding: '0.7rem',
                      borderRadius: 8,
                      border: '1px solid #16A34A',
                      color: '#16A34A',
                      background: '#F0FDF4',
                      fontSize: '0.82rem',
                      fontWeight: 700,
                      textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={15} /> Or Connect on WhatsApp (+91 99453 79333)
                  </a>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
