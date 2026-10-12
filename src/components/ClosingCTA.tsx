import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, PhoneCall, ShieldCheck, Truck, RefreshCw, Award } from 'lucide-react'

export default function ClosingCTA() {
  return (
    <section style={{ paddingBlock: 'clamp(4rem, 7vw, 6.5rem)', background: 'white' }}>
      <div className="container-site">
        <div
          style={{
            background: 'linear-gradient(135deg, var(--color-navy) 0%, #152744 60%, var(--color-navy) 100%)',
            borderRadius: 'clamp(24px, 3vw, 36px)',
            padding: 'clamp(3rem, 6vw, 5.5rem) clamp(1.5rem, 5vw, 4.5rem)',
            color: 'white',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(10,22,40,0.25)',
          }}
        >
          {/* Subtle Ambient Backdrops */}
          <div style={{ position: 'absolute', top: '-25%', left: '20%', width: 450, height: 450, borderRadius: '50%', background: 'rgba(28, 77, 161, 0.3)', filter: 'blur(90px)', pointerEvents: 'none' }} />
          <div style={{ position: 'absolute', bottom: '-25%', right: '15%', width: 400, height: 400, borderRadius: '50%', background: 'rgba(96, 239, 255, 0.15)', filter: 'blur(90px)', pointerEvents: 'none' }} />

          <div style={{ position: 'relative', zIndex: 2, maxWidth: 740, margin: '0 auto' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', padding: '0.35rem 1rem', borderRadius: 100, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)', marginBottom: '1.25rem' }}>
              <Award size={14} style={{ color: 'var(--color-blue-light)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-blue-light)' }}>
                India’s #1 Medical Apparel Standard
              </span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(2.25rem, 4.5vw, 3.6rem)', letterSpacing: '-0.025em', lineHeight: 1.12, marginBottom: '1.25rem' }}>
              Wear Your Profession With Pride, Precision & Comfort
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.78)', fontSize: 'clamp(1rem, 1.6vw, 1.15rem)', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: 600, marginInline: 'auto' }}>
              Join over 50,000 surgeons, physicians, and nurses who have elevated their daily hospital experience with AFI Uniforms.
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
              <Link
                to="/shop"
                className="btn-primary"
                style={{
                  padding: '1.05rem 2.5rem',
                  fontSize: '1rem',
                  background: 'white',
                  color: 'var(--color-navy)',
                  boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
                }}
              >
                Shop Full Collection <ArrowRight size={17} />
              </Link>
              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%20would%20like%20to%20consult%20about%20hospital%20uniforms"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-white"
                style={{
                  padding: '1.05rem 2.25rem',
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <MessageCircle size={18} style={{ color: '#25D366' }} /> WhatsApp Procurement Desk
              </a>
            </div>

            {/* Trust Points Row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
                gap: '1.5rem',
                borderTop: '1px solid rgba(255,255,255,0.15)',
                paddingTop: '2.5rem',
                textAlign: 'center',
              }}
            >
              {[
                { icon: Truck, title: 'Express 48H Dispatch', sub: 'Across All Metros' },
                { icon: RefreshCw, title: '15-Day Easy Exchange', sub: 'Hassle-Free Returns' },
                { icon: ShieldCheck, title: 'SilverShield™ Safe', sub: '99.8% Antimicrobial' },
                { icon: PhoneCall, title: 'Hospital Concierge', sub: 'GST Tax Invoicing' },
              ].map((b) => {
                const Icon = b.icon
                return (
                  <div key={b.title} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-blue-light)', marginBottom: '0.2rem' }}>
                      <Icon size={18} />
                    </div>
                    <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'white' }}>{b.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>{b.sub}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
