import { Link } from 'react-router-dom'
import { Phone, Mail, MessageCircle, Camera, Users, Play, Share2 } from 'lucide-react'

const FOOTER_LINKS = {
  Shop: [
    { name: 'All Products', href: '/shop' },
    { name: 'Women\'s Scrubs', href: '/women' },
    { name: 'Men\'s Scrubs', href: '/men' },
    { name: 'Lab Coats', href: '/collections/lab-coats' },
    { name: 'Scrub Caps', href: '/collections/scrub-caps' },
    { name: 'Accessories', href: '/collections/accessories' },
    { name: 'New Arrivals', href: '/new-arrivals' },
    { name: 'Bestsellers', href: '/bestsellers' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Story', href: '/about#story' },
    { name: 'Bulk Orders', href: '/bulk-orders' },
    { name: 'Custom Uniforms', href: '/custom-uniforms' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  Support: [
    { name: 'Contact Us', href: '/contact' },
    { name: 'FAQs', href: '/faqs' },
    { name: 'Size Guide', href: '/size-guide' },
    { name: 'Track Order', href: '/track' },
    { name: 'Returns & Exchanges', href: '/returns' },
    { name: 'Shipping Policy', href: '/shipping' },
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
}

export default function Footer() {
  return (
    <footer style={{ background: 'var(--color-navy)', color: 'white', marginTop: 'auto' }}>

      {/* Main Footer */}
      <div className="container-site" style={{ paddingBlock: '4rem 2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '2.5rem', marginBottom: '3rem' }}>
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ marginBottom: '1.25rem' }}>
              <div
                style={{
                  background: 'white',
                  borderRadius: 10,
                  padding: '6px 14px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.25)',
                }}
              >
                <img
                  src="/afi-logo.png"
                  alt="AFI Uniforms"
                  style={{
                    height: 40,
                    width: 'auto',
                    maxWidth: 135,
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </div>
            </div>
            <p style={{ fontSize: '0.875rem', lineHeight: 1.7, opacity: 0.7, maxWidth: 220, marginBottom: '1.5rem' }}>
              India's premium destination for medical uniforms and professional healthcare workwear.
            </p>

            {/* Social Links */}
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              {[
                { icon: Camera, href: '#', label: 'Instagram' },
                { icon: Users, href: '#', label: 'Facebook' },
                { icon: Play, href: '#', label: 'YouTube' },
                { icon: Share2, href: '#', label: 'X/Twitter' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  style={{
                    width: 36, height: 36, borderRadius: 8,
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--color-medical-blue)'; (e.currentTarget as HTMLElement).style.color = 'white' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)' }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>

            {/* Contact */}
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              <a href="tel:+919999999999" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                <Phone size={14} style={{ color: 'var(--color-blue-muted)' }} />
                +91 99999 99999
              </a>
              <a href="mailto:hello@afiuniform.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                <Mail size={14} style={{ color: 'var(--color-blue-muted)' }} />
                hello@afiuniform.com
              </a>
              <a
                href="https://wa.me/919999999999"
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8125rem', color: '#25D366', fontWeight: 600 }}
              >
                <MessageCircle size={14} />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.875rem', letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.5, marginBottom: '1rem' }}>
                {title}
              </h4>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {links.map(link => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      style={{ fontSize: '0.875rem', fontWeight: 400, color: 'rgba(255,255,255,0.65)', transition: 'color 0.15s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white' }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.65)' }}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <p style={{ fontSize: '0.8125rem', opacity: 0.5 }}>
            © 2026 AFI Uniform. All rights reserved.
          </p>
          <a
            href="https://wa.me/919945379333"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: '0.78rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.8)',
              textDecoration: 'none',
              transition: 'color 0.2s ease',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.color = '#38BDF8'
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.color = 'rgba(255, 255, 255, 0.8)'
            }}
          >
            DEVELOPED BY ROI INFOTECH
          </a>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['Visa', 'Mastercard', 'UPI', 'Paytm', 'RazorPay'].map(method => (
              <span key={method} style={{ padding: '0.25rem 0.5rem', borderRadius: 4, background: 'rgba(255,255,255,0.08)', fontSize: '0.6875rem', fontWeight: 600, opacity: 0.6 }}>
                {method}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/919999999999?text=Hi%20AFI%20Uniform!"
        target="_blank" rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 80,
          width: 52, height: 52, borderRadius: '50%',
          background: '#25D366',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(37,211,102,0.4)',
          color: 'white',
          transition: 'transform 0.2s var(--ease-premium), box-shadow 0.2s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
      >
        <MessageCircle size={24} />
      </a>
    </footer>
  )
}
