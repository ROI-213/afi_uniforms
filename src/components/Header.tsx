import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
  Search, ShoppingBag, Heart, User, Phone, Menu, X,
  ChevronDown, ChevronRight, ArrowRight, Package
} from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useMediaQuery } from '../hooks/useScrollReveal'

/* ─── Nav Data ─── */
const WOMEN_MENU = [
  { name: 'Corporate Blazers & Shirts', href: '/women?category=corporate', desc: 'Executive office wear' },
  { name: 'Hospitality & Front-Office', href: '/women?category=hospitality', desc: 'Hotel & guest relations' },
  { name: "Women's Scrub Sets", href: '/women?category=scrubs', desc: 'Healthcare & clinical sets' },
  { name: 'Education & Faculty Wear', href: '/women?category=education', desc: 'School & university uniforms' },
  { name: 'Industrial & Lab Coats', href: '/women?category=industrial', desc: 'Technical & QC coats' },
  { name: 'Plus Size Range', href: '/women?category=plussize', desc: 'XS to 5XL across industries' },
]

const MEN_MENU = [
  { name: 'Corporate Shirts & Suits', href: '/men?category=corporate', desc: 'Executive & business wear' },
  { name: 'Industrial & Safety Workwear', href: '/men?category=industrial', desc: 'Jackets, coveralls & cargo' },
  { name: 'Hospitality & Chef Coats', href: '/men?category=hospitality', desc: 'Hotel, banquet & culinary' },
  { name: 'Security & Tactical Uniforms', href: '/men?category=security', desc: 'Guard shirts & utility pants' },
  { name: "Men's Healthcare Scrubs", href: '/men?category=scrubs', desc: 'Clinical sets & separates' },
  { name: 'Logistics & Retail Polos', href: '/men?category=logistics', desc: 'Fleet & store operations' },
]

const INDUSTRIES_MENU = [
  { name: 'Corporate & Office', href: '/shop?category=corporate', desc: 'Executive suits, shirts & polos' },
  { name: 'Industrial & Manufacturing', href: '/shop?category=industrial', desc: 'Heavy-duty jackets & coveralls' },
  { name: 'Hospitality & Hotels', href: '/shop?category=hospitality', desc: 'Front-office, concierge & F&B' },
  { name: 'Chef & Culinary', href: '/shop?category=chef', desc: 'Chef coats, aprons & kitchen wear' },
  { name: 'Healthcare & Hospitals', href: '/collections/scrubs', desc: 'Scrubs, lab coats & OT wear' },
  { name: 'Education & Institutions', href: '/shop?category=education', desc: 'School, college & faculty blazers' },
  { name: 'Security & Facility', href: '/shop?category=security', desc: 'Tactical uniforms & guard kits' },
  { name: 'Retail, Construction & Logistics', href: '/shop?category=logistics', desc: 'High-vis vests, polos & cargo' },
]

const COLLECTIONS_MENU = [
  { name: 'Corporate Pro', href: '/shop?category=corporate', desc: 'Executive blazers & Oxford shirts' },
  { name: 'Industrial Shield', href: '/shop?category=industrial', desc: 'Reflective & shop-floor workwear' },
  { name: 'Hospitality Signature', href: '/shop?category=hospitality', desc: 'Luxury hotel & culinary attire' },
  { name: 'Healthcare Essentials', href: '/collections/scrubs', desc: 'Antimicrobial scrubs & lab coats' },
  { name: 'Education Classic', href: '/shop?category=education', desc: 'Campus & faculty uniforms' },
  { name: 'Security Pro & Custom OEM', href: '/bulk-orders', desc: 'Tactical & private-label supply' },
]

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Women', href: '/women', dropdown: 'women' },
  { name: 'Men', href: '/men', dropdown: 'men' },
  { name: 'Shop All', href: '/shop' },
  { name: 'Industries', href: '/shop', dropdown: 'industries' },
  { name: 'Collections', href: '/collections', dropdown: 'collections' },
  { name: 'Custom Uniforms', href: '/bulk-orders' },
  { name: 'Bulk Orders', href: '/bulk-orders' },
]

const MOBILE_NAV = [
  { name: 'Shop All', href: '/shop' },
  { name: 'Industries', href: '/shop', children: INDUSTRIES_MENU },
  { name: 'Women', href: '/women', children: WOMEN_MENU },
  { name: 'Men', href: '/men', children: MEN_MENU },
  { name: 'Collections', href: '/collections', children: COLLECTIONS_MENU },
  { name: 'Custom Uniforms', href: '/bulk-orders' },
  { name: 'Bulk Orders', href: '/bulk-orders' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
]

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

/* ─── Dropdown Panel Component ─── */
function DropdownPanel({
  items, isOpen
}: { items: typeof WOMEN_MENU; isOpen: boolean }) {
  return (
    <div style={{
      position: 'absolute',
      top: 'calc(100% + 4px)',
      left: '50%',
      background: 'white',
      borderRadius: 16,
      boxShadow: '0 20px 60px rgba(10,22,40,0.15), 0 4px 16px rgba(10,22,40,0.08)',
      border: '1px solid rgba(10,22,40,0.06)',
      minWidth: 290,
      padding: '0.75rem',
      zIndex: 60,
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? 'all' : 'none',
      transform: `translateX(-50%) translateY(${isOpen ? 0 : -8}px)`,
      transition: `opacity 0.22s ${EASE}, transform 0.22s ${EASE}`,
    }}>
      {items.map((item) => (
        <Link
          key={item.name}
          to={item.href}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.58rem 0.875rem',
            borderRadius: 10,
            transition: `background 0.15s ease, color 0.15s ease`,
            color: 'var(--color-neutral-700)',
            fontSize: '0.875rem',
            fontWeight: 500,
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = 'var(--color-blue-pale)'
            el.style.color = 'var(--color-navy)'
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLElement
            el.style.background = ''
            el.style.color = 'var(--color-neutral-700)'
          }}
        >
          <span>
            <span style={{ display: 'block', fontWeight: 600, color: 'inherit', lineHeight: 1.3 }}>{item.name}</span>
            <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--color-blue-muted)', marginTop: 1 }}>{item.desc}</span>
          </span>
          <ChevronRight size={13} style={{ color: 'var(--color-blue-muted)', flexShrink: 0 }} />
        </Link>
      ))}
    </div>
  )
}

/* ─── Main Header ─── */
export default function Header() {
  const { cartCount } = useStore()
  const isMobile = useMediaQuery('(max-width: 1023px)')
  const location = useLocation()
  const navigate = useNavigate()

  const [mobileOpen, setMobileOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`)
      setSearchQuery('')
    }
  }

  const isActive = (href: string) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  const handleDropdownEnter = (key: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setOpenDropdown(key)
  }
  const handleDropdownLeave = () => {
    closeTimer.current = setTimeout(() => setOpenDropdown(null), 120)
  }

  const getDropdownItems = (key: string) => {
    if (key === 'women') return WOMEN_MENU
    if (key === 'men') return MEN_MENU
    if (key === 'industries') return INDUSTRIES_MENU
    if (key === 'collections') return COLLECTIONS_MENU
    return []
  }

  /* ─── Inject page-load animations once ─── */
  useEffect(() => {
    const id = 'afi-header-anim'
    if (document.getElementById(id)) return
    const s = document.createElement('style')
    s.id = id
    s.textContent = `
      @keyframes annoBar { from { opacity:0; transform:translateY(-6px); } to { opacity:1; transform:translateY(0); } }
      @keyframes mainHeader { from { opacity:0; transform:translateY(-10px); } to { opacity:1; transform:translateY(0); } }
      @keyframes navFadeUp { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
      .afi-anno { animation: annoBar 0.5s cubic-bezier(0.22,1,0.36,1) 0ms both; }
      .afi-main-hdr { animation: mainHeader 0.55s cubic-bezier(0.22,1,0.36,1) 120ms both; }
      .afi-nav-row { animation: navFadeUp 0.5s cubic-bezier(0.22,1,0.36,1) 240ms both; }
      .afi-nav-link { position:relative; }
      .afi-nav-link::after {
        content:''; position:absolute; bottom:-2px; left:0; right:0; height:2px;
        background:var(--color-medical-blue); border-radius:100px;
        transform:scaleX(0); transform-origin:left;
        transition:transform 0.25s cubic-bezier(0.22,1,0.36,1);
      }
      .afi-nav-link:hover::after, .afi-nav-link.active::after { transform:scaleX(1); }
      .afi-icon-btn { display:flex; flex-direction:column; align-items:center; gap:2px; padding:0.375rem 0.625rem; border-radius:8px; cursor:pointer; background:none; border:none; font-family:inherit; transition:background 0.15s ease; }
      .afi-icon-btn:hover { background:var(--color-blue-pale); }
      .afi-icon-btn span.lbl { font-size:0.6rem; font-weight:600; letter-spacing:0.04em; color:var(--color-neutral-500); white-space:nowrap; }
      .afi-badge { position:absolute; top:-4px; right:-4px; background:var(--color-medical-blue); color:white; font-size:0.55rem; font-weight:800; min-width:15px; height:15px; border-radius:100px; display:flex; align-items:center; justify-content:center; line-height:1; padding:0 3px; }
    `
    document.head.appendChild(s)
  }, [])

  return (
    <>
      {/* ══════════════════════════════════════════
          1. ANNOUNCEMENT BAR
      ══════════════════════════════════════════ */}
      <div
        className="afi-anno"
        style={{
          background: '#0B2744',
          color: 'white',
          height: 40,
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
        }}
      >
        <div
          className="container-site"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
            gap: '1rem',
          }}
        >
          {/* Left: Trust items */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '1.5rem' : '1.25rem',
              overflow: 'hidden',
              ...(isMobile ? { overflowX: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' } : {}),
            }}
            className="no-scrollbar"
          >
            {[
              '✓ Direct Uniform Manufacturer',
              '✓ Custom Logo & OEM Branding',
              '✓ Pan India Bulk Supply',
            ].map((item, i) => (
              <React.Fragment key={item}>
                {i > 0 && !isMobile && (
                  <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>|</span>
                )}
                <span style={{
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.9)',
                  whiteSpace: 'nowrap',
                  letterSpacing: '0.02em',
                }}>
                  {item}
                </span>
              </React.Fragment>
            ))}
          </div>

          {/* Right: Help & Enquiry */}
          {!isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexShrink: 0 }}>
              <a
                href="tel:+919876543210"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.375rem',
                  fontSize: '0.7rem', fontWeight: 600,
                  color: 'rgba(255,255,255,0.85)', whiteSpace: 'nowrap',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.85)' }}
              >
                <Phone size={11} />
                Need Help? +91 98765 43210
              </a>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
              <Link
                to="/bulk-orders"
                style={{
                  display: 'flex', alignItems: 'center', gap: '0.25rem',
                  fontSize: '0.7rem', fontWeight: 700,
                  color: '#60C4FF', whiteSpace: 'nowrap',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'white' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = '#60C4FF' }}
              >
                Bulk &amp; Custom Quote <ArrowRight size={10} />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════════════════════════════
          2. MAIN BRAND HEADER
      ══════════════════════════════════════════ */}
      <header
        className="afi-main-hdr"
        style={{
          background: 'rgba(255,255,255,0.98)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(10,22,40,0.07)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
          transition: `box-shadow 0.3s ${EASE}`,
          boxShadow: scrolled
            ? '0 4px 24px rgba(10,22,40,0.10)'
            : '0 1px 0 rgba(10,22,40,0.06)',
        }}
      >
        <div
          className="container-site"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '0.75rem' : '1.5rem',
            height: isMobile ? 60 : 76,
          }}
        >
          {/* ── Logo ── */}
          <Link
            to="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0,
              textDecoration: 'none',
            }}
          >
            <img
              src="/afi-logo.png"
              alt="AFI Uniforms"
              style={{
                height: isMobile ? 42 : 52,
                width: 'auto',
                maxWidth: isMobile ? 120 : 160,
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </Link>

          {/* ── Search Bar (desktop center) ── */}
          {!isMobile && (
            <form
              onSubmit={handleSearch}
              style={{
                flex: 1,
                maxWidth: 520,
                margin: '0 auto',
                display: 'flex',
                alignItems: 'center',
                background: 'var(--color-neutral-50)',
                border: '1.5px solid var(--color-neutral-200)',
                borderRadius: 100,
                height: 46,
                padding: '0 0.5rem 0 1.25rem',
                transition: `border-color 0.2s ease, box-shadow 0.2s ease`,
                boxShadow: '0 1px 4px rgba(10,22,40,0.04)',
              }}
              onFocus={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--color-medical-blue)'
                el.style.boxShadow = '0 0 0 3px rgba(28,77,161,0.08)'
              }}
              onBlur={e => {
                const el = e.currentTarget as HTMLElement
                el.style.borderColor = 'var(--color-neutral-200)'
                el.style.boxShadow = '0 1px 4px rgba(10,22,40,0.04)'
              }}
            >
              <Search size={17} style={{ color: 'var(--color-neutral-400)', flexShrink: 0 }} />
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search corporate shirts, industrial workwear, chef coats, scrubs..."
                style={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.875rem',
                  color: 'var(--color-neutral-800)',
                  outline: 'none',
                  padding: '0 0.75rem',
                }}
              />
              <button
                type="submit"
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: 'var(--color-medical-blue)',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  transition: `background 0.2s ease, transform 0.15s ease`,
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'var(--color-navy)'
                  el.style.transform = 'scale(1.08)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'var(--color-medical-blue)'
                  el.style.transform = 'scale(1)'
                }}
                aria-label="Search"
              >
                <ArrowRight size={15} style={{ color: 'white' }} />
              </button>
            </form>
          )}

          {/* ── Right Actions ── */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', marginLeft: 'auto', flexShrink: 0 }}>
            {/* Mobile search icon */}
            {isMobile && (
              <button
                onClick={() => searchRef.current?.focus()}
                className="afi-icon-btn"
                aria-label="Search"
              >
                <Search size={20} style={{ color: 'var(--color-neutral-600)' }} />
              </button>
            )}

            {/* Account */}
            {!isMobile && (
              <Link to="/account" className="afi-icon-btn" aria-label="Account">
                <User size={20} style={{ color: 'var(--color-neutral-600)' }} />
                <span className="lbl">Account</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="afi-icon-btn" aria-label="Wishlist" style={{ position: 'relative' }}>
              <Heart size={20} style={{ color: 'var(--color-neutral-600)' }} />
              {!isMobile && <span className="lbl">Wishlist</span>}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="afi-icon-btn"
              style={{ position: 'relative' }}
              aria-label={`Cart (${cartCount})`}
            >
              <ShoppingBag size={20} style={{ color: 'var(--color-neutral-700)' }} />
              {!isMobile && <span className="lbl">Cart</span>}
              {cartCount > 0 && (
                <span className="afi-badge">{cartCount}</span>
              )}
            </Link>

            {/* Bulk Enquiry CTA — desktop */}
            {!isMobile && (
              <Link
                to="/bulk-orders"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  background: 'var(--color-navy)',
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.8125rem',
                  padding: '0.625rem 1.25rem',
                  borderRadius: 10,
                  marginLeft: '0.625rem',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 16px rgba(10,22,40,0.25)',
                  transition: `background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease`,
                  letterSpacing: '0.01em',
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = '#1a3260'
                  el.style.transform = 'translateY(-1px)'
                  el.style.boxShadow = '0 6px 24px rgba(10,22,40,0.35)'
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLElement
                  el.style.background = 'var(--color-navy)'
                  el.style.transform = 'translateY(0)'
                  el.style.boxShadow = '0 4px 16px rgba(10,22,40,0.25)'
                }}
              >
                <Package size={14} />
                BULK ENQUIRY →
              </Link>
            )}

            {/* Hamburger — mobile */}
            {isMobile && (
              <button
                onClick={() => setMobileOpen(true)}
                className="afi-icon-btn"
                aria-label="Open menu"
                style={{ marginLeft: '0.125rem' }}
              >
                <Menu size={22} style={{ color: 'var(--color-neutral-700)' }} />
              </button>
            )}
          </div>
        </div>

        {/* ── Mobile Search Row ── */}
        {isMobile && (
          <div style={{
            padding: '0 1rem 0.75rem',
            borderTop: '1px solid var(--color-neutral-100)',
          }}>
            <form
              onSubmit={handleSearch}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'var(--color-neutral-50)',
                border: '1.5px solid var(--color-neutral-200)',
                borderRadius: 100,
                height: 40,
                padding: '0 0.375rem 0 1rem',
              }}
            >
              <Search size={15} style={{ color: 'var(--color-neutral-400)', flexShrink: 0 }} />
              <input
                ref={searchRef}
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search corporate, industrial, hospitality, scrubs..."
                style={{
                  flex: 1, border: 'none', background: 'transparent',
                  fontFamily: 'var(--font-sans)', fontSize: '0.8125rem',
                  color: 'var(--color-neutral-800)', outline: 'none', padding: '0 0.625rem',
                }}
              />
              <button
                type="submit"
                style={{
                  width: 28, height: 28, borderRadius: '50%',
                  background: 'var(--color-medical-blue)', border: 'none',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <ArrowRight size={13} style={{ color: 'white' }} />
              </button>
            </form>
          </div>
        )}
      </header>

      {/* ══════════════════════════════════════════
          3. SECONDARY NAVIGATION BAR (desktop)
      ══════════════════════════════════════════ */}
      {!isMobile && (
        <nav
          className="afi-nav-row"
          style={{
            background: 'white',
            borderBottom: '1px solid var(--color-neutral-100)',
            position: 'sticky',
            top: 76,
            zIndex: 49,
            boxShadow: scrolled ? '0 2px 12px rgba(10,22,40,0.06)' : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          <div
            className="container-site"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: 48,
              gap: '1rem',
            }}
          >
            {/* Nav Links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.125rem' }}>
              {NAV_LINKS.map(link => (
                <div
                  key={link.name}
                  style={{ position: 'relative' }}
                  onMouseEnter={() => link.dropdown && handleDropdownEnter(link.dropdown)}
                  onMouseLeave={() => link.dropdown && handleDropdownLeave()}
                >
                  <Link
                    to={link.href}
                    className={`afi-nav-link ${isActive(link.href) ? 'active' : ''}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '3px',
                      padding: '0.375rem 0.68rem',
                      fontSize: '0.8125rem',
                      fontWeight: isActive(link.href) ? 700 : 600,
                      color: isActive(link.href)
                        ? 'var(--color-medical-blue)'
                        : 'var(--color-neutral-700)',
                      borderRadius: 8,
                      transition: `color 0.15s ease`,
                      whiteSpace: 'nowrap',
                      letterSpacing: '-0.01em',
                    }}
                    onMouseEnter={e => {
                      if (!isActive(link.href))
                        (e.currentTarget as HTMLElement).style.color = 'var(--color-navy)'
                    }}
                    onMouseLeave={e => {
                      if (!isActive(link.href))
                        (e.currentTarget as HTMLElement).style.color = 'var(--color-neutral-700)'
                    }}
                  >
                    {link.name}
                    {link.dropdown && (
                      <ChevronDown
                        size={12}
                        style={{
                          transition: `transform 0.2s ease`,
                          transform: openDropdown === link.dropdown ? 'rotate(180deg)' : 'none',
                        }}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {link.dropdown && (
                    <DropdownPanel
                      items={getDropdownItems(link.dropdown)}
                      isOpen={openDropdown === link.dropdown}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Right: Bulk CTA pill */}
            <Link
              to="/bulk-orders"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.375rem',
                background: 'var(--color-blue-pale)',
                color: 'var(--color-medical-blue)',
                fontWeight: 700,
                fontSize: '0.75rem',
                padding: '0.5rem 1.125rem',
                borderRadius: 100,
                whiteSpace: 'nowrap',
                border: '1.5px solid rgba(28,77,161,0.12)',
                transition: `background 0.2s ease, color 0.2s ease`,
                letterSpacing: '-0.01em',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--color-medical-blue)'
                el.style.color = 'white'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.background = 'var(--color-blue-pale)'
                el.style.color = 'var(--color-medical-blue)'
              }}
            >
              Custom Manufacturing &amp; Bulk Orders <ArrowRight size={11} />
            </Link>
          </div>
        </nav>
      )}

      {/* ══════════════════════════════════════════
          4. MOBILE DRAWER
      ══════════════════════════════════════════ */}
      {isMobile && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed', inset: 0, zIndex: 200,
              background: 'rgba(10,22,40,0.55)',
              backdropFilter: 'blur(4px)',
              opacity: mobileOpen ? 1 : 0,
              pointerEvents: mobileOpen ? 'all' : 'none',
              transition: 'opacity 0.3s ease',
            }}
          />

          {/* Drawer panel */}
          <div
            style={{
              position: 'fixed',
              top: 0, left: 0, bottom: 0,
              zIndex: 201,
              width: '88vw',
              maxWidth: 360,
              background: 'white',
              transform: mobileOpen ? 'translateX(0)' : 'translateX(-100%)',
              transition: `transform 0.4s ${EASE}`,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '8px 0 40px rgba(10,22,40,0.18)',
            }}
          >
            {/* Drawer header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '1.125rem 1.25rem 1rem',
              borderBottom: '1px solid var(--color-neutral-100)',
            }}>
              <Link to="/" onClick={() => setMobileOpen(false)} style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="/afi-logo.png"
                  alt="AFI Uniforms"
                  style={{
                    height: 44,
                    width: 'auto',
                    maxWidth: 140,
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              </Link>
              <button
                onClick={() => setMobileOpen(false)}
                style={{
                  width: 32, height: 32, borderRadius: 8,
                  background: 'var(--color-neutral-100)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: 'none', cursor: 'pointer', color: 'var(--color-neutral-600)',
                }}
              >
                <X size={17} />
              </button>
            </div>

            {/* Nav items */}
            <nav style={{ flex: 1, padding: '0.5rem 0' }}>
              {MOBILE_NAV.map(item => (
                <div key={item.name}>
                  {item.children ? (
                    <>
                      <button
                        onClick={() => setExpandedMobile(expandedMobile === item.name ? null : item.name)}
                        style={{
                          width: '100%',
                          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '0.875rem 1.5rem',
                          fontSize: '0.9375rem', fontWeight: 600,
                          color: 'var(--color-neutral-700)',
                          background: 'none', border: 'none', cursor: 'pointer',
                          fontFamily: 'inherit',
                          letterSpacing: '-0.01em',
                        }}
                      >
                        {item.name}
                        <ChevronDown
                          size={16}
                          style={{
                            transition: 'transform 0.25s ease',
                            transform: expandedMobile === item.name ? 'rotate(180deg)' : 'none',
                            color: 'var(--color-blue-muted)',
                          }}
                        />
                      </button>
                      <div style={{
                        maxHeight: expandedMobile === item.name ? '500px' : 0,
                        overflow: 'hidden',
                        transition: `max-height 0.35s ${EASE}`,
                      }}>
                        {item.children.map(child => (
                          <Link
                            key={child.name}
                            to={child.href}
                            onClick={() => setMobileOpen(false)}
                            style={{
                              display: 'flex', alignItems: 'center', gap: '0.5rem',
                              padding: '0.6rem 1.5rem 0.6rem 2.5rem',
                              fontSize: '0.875rem', fontWeight: 500,
                              color: 'var(--color-neutral-600)',
                              borderLeft: '2px solid transparent',
                              transition: 'color 0.15s, background 0.15s',
                            }}
                          >
                            <ChevronRight size={11} style={{ color: 'var(--color-blue-muted)', flexShrink: 0 }} />
                            <span>
                              <span style={{ display: 'block', lineHeight: 1.3 }}>{child.name}</span>
                              <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--color-blue-muted)' }}>{child.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      style={{
                        display: 'block',
                        padding: '0.875rem 1.5rem',
                        fontSize: '0.9375rem', fontWeight: 600,
                        color: item.name === 'Bulk Orders'
                          ? 'var(--color-medical-blue)'
                          : 'var(--color-neutral-700)',
                        borderLeft: item.name === 'Bulk Orders'
                          ? '3px solid var(--color-medical-blue)'
                          : '3px solid transparent',
                        letterSpacing: '-0.01em',
                        background: item.name === 'Bulk Orders' ? 'var(--color-blue-pale)' : 'none',
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Drawer footer */}
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid var(--color-neutral-100)',
              display: 'flex', flexDirection: 'column', gap: '0.625rem',
            }}>
              <Link
                to="/account"
                onClick={() => setMobileOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--color-neutral-600)', fontSize: '0.875rem', fontWeight: 500 }}
              >
                <User size={16} /> My Account
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setMobileOpen(false)}
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--color-neutral-600)', fontSize: '0.875rem', fontWeight: 500 }}
              >
                <Heart size={16} /> My Wishlist
              </Link>
              <a
                href="tel:+919876543210"
                style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', color: 'var(--color-neutral-600)', fontSize: '0.875rem', fontWeight: 500 }}
              >
                <Phone size={16} /> +91 98765 43210
              </a>
              <Link
                to="/bulk-orders"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
                style={{ marginTop: '0.375rem', justifyContent: 'center', fontSize: '0.875rem' }}
              >
                <Package size={14} /> Bulk Enquiry
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  )
}
