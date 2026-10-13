import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Sparkles,
  ArrowRight,
  CheckCircle,
  MessageCircle,
  Palette,
  Layers,
  Scissors,
  Printer,
  Send,
  Check,
} from 'lucide-react'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

const CUSTOM_CATEGORIES = [
  'Corporate Blazers & Formal Shirts',
  'Industrial Workwear & Boiler Suits',
  'Hospitality & Master Chef Coats',
  'Medical Scrubs & Lab Coats',
  'Security & Tactical Uniforms',
  'Logistics & Retail Pique Polos',
]

const BRANDING_METHODS = [
  {
    name: 'Precision Logo Embroidery',
    desc: 'Japanese Tajima multi-head machines, high-density thread, 100+ wash durability.',
    icon: Scissors,
  },
  {
    name: 'Pantone Color Mill-Dyeing',
    desc: 'Exact color matching to your brand Pantone guidelines for fabrics and trims.',
    icon: Palette,
  },
  {
    name: 'Screen & Plastisol Print',
    desc: 'High-contrast discharge and plastisol printing ideal for high-visibility logos.',
    icon: Printer,
  },
  {
    name: 'Custom Trims & Piping',
    desc: 'Bespoke contrast collars, engraved buttons, epaulettes, and 3M reflective tape.',
    icon: Layers,
  },
]

const FABRICS = [
  {
    name: 'Executive Poly-Viscose Twill',
    ideal: 'Corporate Blazers & Suits',
    feature: 'Wrinkle-resistant with 4-way stretch comfort weave',
  },
  {
    name: 'Heavy Industrial Cotton 280 GSM',
    ideal: 'Plant & Mechanic Workwear',
    feature: 'High tensile strength, tear-proof, fire-retardant options',
  },
  {
    name: 'AeroFlex™ Antimicrobial Weave',
    ideal: 'Hospitality & Healthcare Scrubs',
    feature: 'SILVADUR™ fluid-barrier coating and odor protection',
  },
  {
    name: 'Mercerized Combed Pique',
    ideal: 'Logistics & Fleet Driver Polos',
    feature: 'Breathable, fade-resistant color with non-curl collar',
  },
]

export default function CustomUniformsPage() {
  const [selectedCategory, setSelectedCategory] = useState(CUSTOM_CATEGORIES[0])
  const [selectedBranding, setSelectedBranding] = useState<string[]>([
    'Precision Logo Embroidery',
  ])
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    quantity: '50-100 units',
    pantone: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const toggleBranding = (method: string) => {
    setSelectedBranding(prev =>
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const generateWhatsAppUrl = () => {
    const text = encodeURIComponent(
      `Hello AFI Uniforms, I would like to request a Custom Uniform Design & Quote:\n` +
        `• Category: ${selectedCategory}\n` +
        `• Customization: ${selectedBranding.join(', ')}\n` +
        `• Quantity: ${formData.quantity}\n` +
        `• Company: ${formData.company || 'Not specified'}\n` +
        `• Name: ${formData.name || 'Client'}\n` +
        `• Pantone/Notes: ${formData.pantone || formData.notes || 'Please share catalog & mockup'}`
    )
    return `https://wa.me/919945379333?text=${text}`
  }

  return (
    <div style={{ background: '#FAFBFD', minHeight: '85vh' }}>
      {/* ── 1. HERO SECTION ── */}
      <section
        style={{
          background: 'linear-gradient(180deg, #0B2744 0%, #0F3258 100%)',
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
            top: '-20%',
            right: '-10%',
            width: 500,
            height: 500,
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
            <span style={{ color: '#38BDF8', fontWeight: 700 }}>Custom Uniforms</span>
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
            <Sparkles size={13} />
            BESPOKE DESIGN & OEM MANUFACTURING
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
            Tailor-Made Uniforms Crafted to Your Exact Brand Identity.
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
            From custom Pantone mill-dyeing and Japanese Tajima embroidery to bespoke contrast trims, functional tool pockets, and custom patterns — we bring your brand vision to life with complete in-house factory manufacturing.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a
              href="#custom-configurator"
              className="btn-primary"
              style={{
                background: '#146EF5',
                padding: '0.85rem 1.8rem',
                fontSize: '0.9rem',
                boxShadow: '0 4px 18px rgba(20, 110, 245, 0.4)',
              }}
            >
              Start Custom Design <ArrowRight size={15} />
            </a>

            <a
              href="https://wa.me/919945379333?text=Hi%20AFI%20Uniforms%2C%20I%20am%20interested%20in%20custom%20uniform%20manufacturing"
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
              WhatsApp Us (+91 99453 79333)
            </a>
          </div>

          {/* Quick trust metrics */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '1rem',
              marginTop: '3rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            {[
              { label: 'Minimum Order', val: 'Low MOQ: 20 Units' },
              { label: 'Sample Turnaround', val: 'Digital Mockup in 24h' },
              { label: 'Embroidery Quality', val: 'Japanese Tajima 12-Color' },
              { label: 'Color Matching', val: '100% Pantone Mill-Dyeing' },
            ].map(m => (
              <div key={m.label}>
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', fontWeight: 600 }}>{m.label}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: 'white', marginTop: 2 }}>{m.val}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 2. CORE CUSTOMIZATION CAPABILITIES ── */}
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
              IN-HOUSE OEM ATELIER
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
              Complete Customization From Fiber to Finished Garment
            </h2>
            <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.9rem' }}>
              We don&apos;t just print over readymade garments. We engineer bespoke patterns, mill-dye fabrics, and build customized uniforms that match your exact brand guidelines.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {BRANDING_METHODS.map((m, i) => {
              const Icon = m.icon
              return (
                <div
                  key={i}
                  style={{
                    background: 'white',
                    borderRadius: 18,
                    padding: '1.75rem',
                    border: '1px solid rgba(11, 39, 68, 0.08)',
                    boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
                    transition: `transform 0.25s ${EASE}, box-shadow 0.25s ${EASE}`,
                  }}
                  onMouseEnter={e => {
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow =
                      '0 12px 28px rgba(11, 39, 68, 0.1)'
                  }}
                  onMouseLeave={e => {
                    ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow =
                      '0 4px 16px rgba(11, 39, 68, 0.04)'
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 14,
                      background: '#EFF6FF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1.15rem',
                    }}
                  >
                    <Icon size={24} style={{ color: '#146EF5' }} />
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      fontSize: '1.05rem',
                      color: '#0B2744',
                      marginBottom: '0.45rem',
                    }}
                  >
                    {m.name}
                  </h3>
                  <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.84rem', lineHeight: 1.5 }}>
                    {m.desc}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── 3. INTERACTIVE CUSTOM UNIFORM CONFIGURATOR & ENQUIRY ── */}
      <section
        id="custom-configurator"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%)',
          paddingBlock: 'clamp(3.5rem, 6vw, 5.5rem)',
          borderTop: '1px solid rgba(11, 39, 68, 0.08)',
          borderBottom: '1px solid rgba(11, 39, 68, 0.08)',
        }}
      >
        <div className="container-site">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(300px, 1fr) minmax(320px, 500px)',
              gap: '2.5rem',
              alignItems: 'start',
            }}
          >
            {/* Left: Configurator Steps */}
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
                STEP-BY-STEP CONFIGURATOR
              </div>

              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                  color: '#0B2744',
                  letterSpacing: '-0.02em',
                  marginBottom: '0.75rem',
                }}
              >
                Configure Your Custom Uniform Program
              </h2>

              <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.88rem', marginBottom: '2rem' }}>
                Select your industry, desired custom features, and quantity to get an instant digital tech pack preview and commercial quote from our design engineers.
              </p>

              {/* Step 1: Category selection */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: '#0B2744',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '0.65rem',
                  }}
                >
                  Step 1: Choose Garment Category
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  {CUSTOM_CATEGORIES.map(cat => {
                    const isSelected = selectedCategory === cat
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                          textAlign: 'left',
                          padding: '0.7rem 0.85rem',
                          borderRadius: 10,
                          border: isSelected
                            ? '1.5px solid #146EF5'
                            : '1px solid rgba(11, 39, 68, 0.12)',
                          background: isSelected ? '#EFF6FF' : 'white',
                          color: isSelected ? '#1D4ED8' : '#0B2744',
                          fontWeight: isSelected ? 800 : 600,
                          fontSize: '0.8rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: `all 0.18s ${EASE}`,
                        }}
                      >
                        <span>{cat}</span>
                        {isSelected && <Check size={14} style={{ color: '#146EF5' }} />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 2: Customization Pillars */}
              <div style={{ marginBottom: '1.75rem' }}>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: '#0B2744',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '0.65rem',
                  }}
                >
                  Step 2: Desired Custom Branding & Trims (Select Multiple)
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.5rem' }}>
                  {[
                    'Precision Logo Embroidery',
                    'Pantone Color Mill-Dyeing',
                    'Screen & Plastisol Print',
                    'Contrast Piping & Trims',
                    'Custom Engraved Buttons',
                    '3M Reflective Safety Tape',
                    'Concealed Radio / Pen Pockets',
                    'Department Name Badge Slots',
                  ].map(method => {
                    const isChecked = selectedBranding.includes(method)
                    return (
                      <button
                        key={method}
                        type="button"
                        onClick={() => toggleBranding(method)}
                        style={{
                          textAlign: 'left',
                          padding: '0.65rem 0.85rem',
                          borderRadius: 10,
                          border: isChecked
                            ? '1.5px solid #0B2744'
                            : '1px solid rgba(11, 39, 68, 0.12)',
                          background: isChecked ? '#0B2744' : 'white',
                          color: isChecked ? 'white' : '#0B2744',
                          fontWeight: isChecked ? 700 : 500,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: `all 0.18s ${EASE}`,
                        }}
                      >
                        <span>{method}</span>
                        {isChecked && <Check size={13} />}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Step 3: Fabric Specifications Overview */}
              <div>
                <label
                  style={{
                    display: 'block',
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    color: '#0B2744',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginBottom: '0.65rem',
                  }}
                >
                  Recommended Fabric Blends Available
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
                  {FABRICS.map(f => (
                    <div
                      key={f.name}
                      style={{
                        background: 'white',
                        padding: '0.85rem',
                        borderRadius: 12,
                        border: '1px solid rgba(11, 39, 68, 0.08)',
                      }}
                    >
                      <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0B2744' }}>
                        {f.name}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#146EF5', fontWeight: 700, margin: '2px 0 4px' }}>
                        {f.ideal}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--color-neutral-500)', lineHeight: 1.35 }}>
                        {f.feature}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: Submission Card */}
            <div
              style={{
                background: 'white',
                borderRadius: 20,
                padding: '2rem',
                border: '1px solid rgba(11, 39, 68, 0.1)',
                boxShadow: '0 12px 36px rgba(11, 39, 68, 0.08)',
              }}
            >
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#146EF5',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: '0.35rem',
                }}
              >
                REQUEST CUSTOM PROTOTYPE & QUOTE
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.25rem',
                  color: '#0B2744',
                  marginBottom: '1rem',
                }}
              >
                Get Free 3D Mockup & Swatches
              </h3>

              {submitted ? (
                <div
                  style={{
                    background: '#DCFCE7',
                    borderRadius: 14,
                    padding: '1.5rem',
                    textAlign: 'center',
                    border: '1px solid #86EFAC',
                  }}
                >
                  <CheckCircle size={36} style={{ color: '#16A34A', margin: '0 auto 0.5rem' }} />
                  <h4 style={{ fontWeight: 800, color: '#14532D', fontSize: '1.05rem', marginBottom: '0.35rem' }}>
                    Custom Request Submitted!
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: '#166534', lineHeight: 1.45, marginBottom: '1rem' }}>
                    Our design team is preparing your digital mockup and will contact you within 24 hours.
                  </p>
                  <a
                    href={generateWhatsAppUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: '#16A34A',
                      color: 'white',
                      padding: '0.6rem 1.1rem',
                      borderRadius: 8,
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      textDecoration: 'none',
                    }}
                  >
                    <MessageCircle size={15} /> Open on WhatsApp Now
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                      Contact Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
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
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Apex Health Systems"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
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

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="procurement@company.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
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
                        Mobile Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 98765 43210"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
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
                        Estimated Quantity
                      </label>
                      <select
                        value={formData.quantity}
                        onChange={e => setFormData({ ...formData, quantity: e.target.value })}
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
                        <option value="20-50 units">20 – 50 units (Sample Batch)</option>
                        <option value="50-100 units">50 – 100 units</option>
                        <option value="101-500 units">101 – 500 units</option>
                        <option value="500+ units">500+ units (Full OEM)</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                        Pantone Code (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. PMS 280 C"
                        value={formData.pantone}
                        onChange={e => setFormData({ ...formData, pantone: e.target.value })}
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

                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                      Project Specifications / Logo Details
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Specify embroidery placement, piping colors, specific pocket needs, or delivery timelines..."
                      value={formData.notes}
                      onChange={e => setFormData({ ...formData, notes: e.target.value })}
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
                    <Send size={15} /> Submit for Free 3D Tech Pack
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
                    <MessageCircle size={15} /> Or Send Directly via WhatsApp (+91 99453 79333)
                  </a>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. 4-STEP PRODUCTION WORKFLOW ── */}
      <section style={{ paddingBlock: 'clamp(3rem, 5vw, 5rem)' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 3rem' }}>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.6rem, 2.5vw, 2.1rem)',
                color: '#0B2744',
                letterSpacing: '-0.02em',
                marginBottom: '0.5rem',
              }}
            >
              Our 4-Step Custom OEM Process
            </h2>
            <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.88rem' }}>
              From initial sketch to full factory dispatch, we ensure strict quality controls and fast turnarounds.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1.25rem',
            }}
          >
            {[
              {
                step: '01',
                title: 'Design Consultation & Tech Pack',
                desc: 'Our uniform design engineers review your brand guidelines, logos, and workplace functional needs.',
              },
              {
                step: '02',
                title: 'Digital 3D Mockup & Swatches',
                desc: 'You receive high-resolution 3D renders with embroidery placement specs and physical fabric swatch cards.',
              },
              {
                step: '03',
                title: 'Physical Prototype Sample Fit',
                desc: 'A complete pre-production master sample is stitched and dispatched for fit testing and client sign-off.',
              },
              {
                step: '04',
                title: 'Bulk Manufacturing & Delivery',
                desc: 'Precision batch production with 12-point QC inspection and pan-India multi-location dispatch.',
              },
            ].map(item => (
              <div
                key={item.step}
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: '1.75rem',
                  border: '1px solid rgba(11, 39, 68, 0.08)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: 900,
                    fontFamily: 'var(--font-display)',
                    color: '#146EF5',
                    lineHeight: 1,
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.step}
                </div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.98rem',
                    color: '#0B2744',
                    marginBottom: '0.45rem',
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ fontSize: '0.82rem', color: 'var(--color-neutral-600)', lineHeight: 1.5 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
