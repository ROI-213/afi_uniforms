import { useState } from 'react'
import { ArrowRight, Package, Truck, Award, Users, Phone, MessageCircle, CheckCircle } from 'lucide-react'

export default function BulkOrdersPage() {
  const [form, setForm] = useState({
    name: '', org: '', email: '', phone: '', quantity: '', message: '', category: ''
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div style={{ background: 'white' }}>
      {/* Hero */}
      <div style={{ position: 'relative', background: 'var(--color-navy)', padding: 'clamp(3rem, 7vw, 7rem) 0', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -80, right: -80, width: 400, height: 400, borderRadius: '50%', background: 'rgba(255,255,255,0.03)' }} />
        <div style={{ position: 'absolute', bottom: -100, left: 100, width: 300, height: 300, borderRadius: '50%', background: 'rgba(28,77,161,0.15)' }} />
        <div className="container-site" style={{ position: 'relative', textAlign: 'center', color: 'white' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.375rem 1rem', background: 'rgba(255,255,255,0.1)', borderRadius: '100px', marginBottom: '1.25rem' }}>
            <Package size={15} style={{ color: 'var(--color-blue-muted)' }} />
            <span style={{ fontSize: '0.8125rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-blue-muted)' }}>
              Institutional Orders
            </span>
          </div>
          <h1 className="text-hero" style={{ marginBottom: '1.25rem' }}>
            Uniform Your Entire<br />Healthcare Team
          </h1>
          <p className="text-subheading" style={{ opacity: 0.78, maxWidth: 540, margin: '0 auto 2rem' }}>
            From 20 to 20,000 units — customised with your logo, brand colours, and department details. Trusted by 500+ hospitals and clinics across India.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="#enquiry-form" className="btn-primary" style={{ padding: '0.9375rem 2rem' }}>
              Get Free Quote <ArrowRight size={16} />
            </a>
            <a
              href="https://wa.me/919999999999?text=Hi%2C%20I%20need%20bulk%20uniform%20quote"
              target="_blank" rel="noopener noreferrer"
              className="btn-outline-white"
              style={{ padding: '0.9375rem 2rem' }}
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ background: 'var(--color-medical-blue)', padding: '1.5rem 0' }}>
        <div className="container-site" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem', textAlign: 'center' }}>
          {[
            { value: '500+', label: 'Hospitals Served' },
            { value: '50,000+', label: 'Units Delivered' },
            { value: '5 Days', label: 'Average Turnaround' },
            { value: '₹299/unit', label: 'Starting Price' },
          ].map(stat => (
            <div key={stat.label} style={{ color: 'white' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.375rem, 2.5vw, 1.875rem)', letterSpacing: '-0.02em' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8125rem', opacity: 0.75, fontWeight: 500 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <section style={{ paddingBlock: 'clamp(3rem, 6vw, 6rem)', background: 'var(--color-neutral-50)' }}>
        <div className="container-site">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <div className="section-divider" style={{ margin: '0 auto 1rem' }} />
            <h2 className="text-section" style={{ color: 'var(--color-navy)', marginBottom: '0.75rem' }}>Why Choose AFI for Bulk Orders?</h2>
            <p style={{ color: 'var(--color-neutral-500)', maxWidth: 480, margin: '0 auto' }}>Everything your procurement team needs, in one place.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
            {[
              { icon: Award, title: 'Custom Branding', desc: 'Logo embroidery, custom colour matching, department name tagging — all included.' },
              { icon: Package, title: 'Minimum 20 Units', desc: 'Start small or go big. No maximum order limit. Volume pricing available.' },
              { icon: Truck, title: 'Pan India Delivery', desc: 'Reliable delivery to all major Indian cities in 5–7 working days.' },
              { icon: Users, title: 'Dedicated Account Manager', desc: 'A single point of contact throughout your order journey.' },
              { icon: CheckCircle, title: 'Quality Assured', desc: 'Every batch goes through a 12-point quality inspection before dispatch.' },
              { icon: Phone, title: 'After-Sales Support', desc: 'Free alterations, replacements for manufacturing defects, and ongoing support.' },
            ].map((feat, i) => (
              <div
                key={feat.title}
                style={{
                  background: 'white', borderRadius: 'var(--radius-lg)', padding: '1.75rem',
                  boxShadow: 'var(--shadow-card)',
                  animation: `revealUp 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both`,
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--color-blue-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <feat.icon size={22} style={{ color: 'var(--color-medical-blue)' }} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>{feat.title}</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-500)', lineHeight: 1.6 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry Form */}
      <section id="enquiry-form" style={{ paddingBlock: 'clamp(3rem, 6vw, 6rem)', background: 'white' }}>
        <div className="container-site">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'flex-start' }}>
            <div>
              <div className="section-divider" />
              <h2 className="text-section" style={{ color: 'var(--color-navy)', marginBottom: '1rem' }}>Get a Free Quote</h2>
              <p style={{ color: 'var(--color-neutral-500)', lineHeight: 1.7, marginBottom: '2rem' }}>
                Fill in this form and our bulk order specialist will contact you within 4 business hours with a detailed quote and sample options.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: Phone, text: '+91 99999 99999' },
                  { icon: MessageCircle, text: 'WhatsApp: +91 99999 99999', href: 'https://wa.me/919999999999' },
                ].map(c => (
                  <div key={c.text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: 'var(--color-blue-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <c.icon size={18} style={{ color: 'var(--color-medical-blue)' }} />
                    </div>
                    {c.href ? (
                      <a href={c.href} style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.9375rem' }}>{c.text}</a>
                    ) : (
                      <span style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '0.9375rem' }}>{c.text}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div style={{ background: 'var(--color-blue-pale)', borderRadius: 'var(--radius-xl)', padding: '2rem', border: '1px solid var(--color-blue-light)' }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>
                  <CheckCircle size={56} style={{ color: '#16A34A', margin: '0 auto 1rem' }} />
                  <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.375rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>Enquiry Submitted!</h3>
                  <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.9rem', lineHeight: 1.65 }}>
                    Thank you! Our bulk order specialist will reach out to you within 4 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-navy)', display: 'block', marginBottom: '0.375rem' }}>Your Name *</label>
                      <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="input-field" placeholder="Dr. / Nurse / Admin" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-navy)', display: 'block', marginBottom: '0.375rem' }}>Organisation *</label>
                      <input required value={form.org} onChange={e => setForm(f => ({ ...f, org: e.target.value }))} className="input-field" placeholder="Hospital / Clinic name" />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-navy)', display: 'block', marginBottom: '0.375rem' }}>Email Address *</label>
                    <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="input-field" placeholder="you@hospital.com" />
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.875rem' }}>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-navy)', display: 'block', marginBottom: '0.375rem' }}>Phone Number *</label>
                      <input required type="tel" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="input-field" placeholder="+91 98765 43210" />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-navy)', display: 'block', marginBottom: '0.375rem' }}>Quantity Needed *</label>
                      <input required type="number" min="20" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} className="input-field" placeholder="Min. 20 units" />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-navy)', display: 'block', marginBottom: '0.375rem' }}>Category</label>
                    <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="input-field">
                      <option value="">Select a category</option>
                      <option>Scrubs</option>
                      <option>Lab Coats</option>
                      <option>Underscrubs</option>
                      <option>Scrub Caps</option>
                      <option>Jackets</option>
                      <option>Mixed / Multiple Categories</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'var(--color-navy)', display: 'block', marginBottom: '0.375rem' }}>Additional Requirements</label>
                    <textarea
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="input-field"
                      rows={3}
                      placeholder="Logo embroidery, colour requirements, delivery deadline, etc."
                      style={{ resize: 'vertical' }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '0.9375rem', marginTop: '0.25rem' }}>
                    Submit Enquiry <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
