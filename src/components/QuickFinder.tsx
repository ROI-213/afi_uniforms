/**
 * QuickProductFinder
 * ─────────────────────────────────────────────────────────────────
 * A floating premium panel that overlaps the hero section bottom.
 * Layout:
 *   [For]  [Category]  [Size]  [Colour]  [→ FIND MY UNIFORM]
 *
 * On submit → navigates to /shop with query-params:
 *   ?gender=women&category=scrubs&size=M&color=%230A1628
 */

import { useState, useRef, useEffect, useId } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronDown, CheckCircle2 } from 'lucide-react'

/* ── Data ─────────────────────────────────────────────────── */

const GENDERS = [
  { id: 'women',  label: 'Women',  icon: '♀' },
  { id: 'men',    label: 'Men',    icon: '♂' },
  { id: 'unisex', label: 'Unisex', icon: '⊕' },
] as const
type Gender = (typeof GENDERS)[number]['id']

const CATEGORIES = [
  { id: 'scrubs',       label: 'Scrubs',       emoji: '🩺' },
  { id: 'lab-coats',    label: 'Lab Coats',    emoji: '🥼' },
  { id: 'underscrubs',  label: 'Underscrubs',  emoji: '👕' },
  { id: 'jackets',      label: 'Jackets',      emoji: '🧥' },
  { id: 'scrub-caps',   label: 'Scrub Caps',   emoji: '🧢' },
  { id: 'accessories',  label: 'Accessories',  emoji: '👜' },
] as const
type Category = (typeof CATEGORIES)[number]['id'] | ''

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'] as const
type Size = (typeof SIZES)[number] | ''

interface ColorSwatch {
  hex:   string
  label: string
  group: 'dark' | 'blue' | 'green' | 'warm' | 'light' | 'other'
}

const COLORS: ColorSwatch[] = [
  { hex: '#0A1628', label: 'Navy Black',    group: 'dark'  },
  { hex: '#1C4DA1', label: 'Medical Blue',  group: 'blue'  },
  { hex: '#2563EB', label: 'Royal Blue',    group: 'blue'  },
  { hex: '#6B8DC4', label: 'Muted Blue',    group: 'blue'  },
  { hex: '#0D9488', label: 'Teal',          group: 'green' },
  { hex: '#16A34A', label: 'Forest Green',  group: 'green' },
  { hex: '#84CC16', label: 'Lime',          group: 'green' },
  { hex: '#7C3AED', label: 'Violet',        group: 'other' },
  { hex: '#EC4899', label: 'Rose',          group: 'warm'  },
  { hex: '#EF4444', label: 'Red',           group: 'warm'  },
  { hex: '#F97316', label: 'Orange',        group: 'warm'  },
  { hex: '#FFFFFF', label: 'White',         group: 'light' },
  { hex: '#F3F4F6', label: 'Off White',     group: 'light' },
  { hex: '#6B7280', label: 'Grey',          group: 'light' },
  { hex: '#1F2937', label: 'Charcoal',      group: 'dark'  },
]

/* ── Helpers ──────────────────────────────────────────────── */

function isLight(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return (r * 299 + g * 587 + b * 114) / 1000 > 155
}

/* ── Dropdown (shared) ────────────────────────────────────── */

interface DropdownProps {
  label:      string
  value:      string
  placeholder: string
  open:       boolean
  onToggle:   () => void
  onClose:    () => void
  children:   React.ReactNode
  width?:     number | string
  fieldLabel: string
}

function Dropdown({ label, value, placeholder, open, onToggle, onClose, children, width = 220, fieldLabel }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null)
  const id  = useId()

  /* Close on outside click */
  useEffect(() => {
    if (!open) return
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, onClose])

  return (
    <div ref={ref} style={{ position: 'relative', flexShrink: 0 }}>
      <label
        htmlFor={id}
        style={{
          display:      'block',
          fontSize:     '0.6875rem',
          fontWeight:   700,
          letterSpacing:'0.09em',
          textTransform:'uppercase',
          color:        'rgba(255,255,255,0.5)',
          marginBottom: '0.375rem',
        }}
      >
        {fieldLabel}
      </label>

      <button
        id={id}
        type="button"
        onClick={onToggle}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          gap:            '0.625rem',
          padding:        '0 1rem',
          height:         48,
          minWidth:       typeof width === 'number' ? width : undefined,
          width:          typeof width === 'string'  ? width : undefined,
          borderRadius:   10,
          background:     open
            ? 'rgba(255,255,255,0.16)'
            : 'rgba(255,255,255,0.09)',
          border:         `1.5px solid ${open ? 'rgba(255,255,255,0.35)' : 'rgba(255,255,255,0.14)'}`,
          color:          value ? 'white' : 'rgba(255,255,255,0.45)',
          fontSize:       '0.9rem',
          fontWeight:     value ? 600 : 400,
          cursor:         'pointer',
          transition:     'all 0.2s cubic-bezier(0.22,1,0.36,1)',
          whiteSpace:     'nowrap',
          fontFamily:     'var(--font-sans)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {value || placeholder}
        </span>
        <ChevronDown
          size={15}
          style={{
            flexShrink: 0,
            color: 'rgba(255,255,255,0.55)',
            transform: open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.25s cubic-bezier(0.22,1,0.36,1)',
          }}
        />
      </button>

      {/* Dropdown panel */}
      <div
        role="listbox"
        aria-label={label}
        style={{
          position:    'absolute',
          top:         'calc(100% + 8px)',
          left:        0,
          zIndex:      200,
          minWidth:    typeof width === 'number' ? width : 180,
          background:  'white',
          borderRadius: 14,
          boxShadow:   '0 16px 48px rgba(10,22,40,0.2), 0 4px 12px rgba(10,22,40,0.1)',
          border:      '1px solid rgba(10,22,40,0.07)',
          overflow:    'hidden',
          opacity:     open ? 1 : 0,
          transform:   open ? 'translateY(0) scale(1)' : 'translateY(-6px) scale(0.97)',
          pointerEvents: open ? 'all' : 'none',
          transition:  'all 0.25s cubic-bezier(0.22,1,0.36,1)',
          transformOrigin: 'top left',
        }}
      >
        {children}
      </div>
    </div>
  )
}

/* ── Main Component ───────────────────────────────────────── */

export default function QuickProductFinder() {
  const navigate = useNavigate()

  const [gender,   setGender]   = useState<Gender | ''>('')
  const [category, setCategory] = useState<Category>('')
  const [size,     setSize]     = useState<Size>('')
  const [color,    setColor]    = useState<string>('')

  const [openDropdown, setOpenDropdown] = useState<'category' | 'size' | 'color' | null>(null)

  const toggle = (d: typeof openDropdown) =>
    setOpenDropdown(prev => (prev === d ? null : d))

  function handleFind(e: React.FormEvent) {
    e.preventDefault()
    const params = new URLSearchParams()
    if (gender)   params.set('gender',   gender)
    if (category) params.set('category', category)
    if (size)     params.set('size',     size)
    if (color)    params.set('color',    color)
    navigate(`/shop?${params.toString()}`)
  }

  /* ── Derived display labels ── */
  const categoryLabel = CATEGORIES.find(c => c.id === category)?.label ?? ''
  const colorSwatch   = COLORS.find(c => c.hex === color)
  const colorLabel    = colorSwatch?.label ?? ''

  const hasAny = !!gender || !!category || !!size || !!color
  const filled = [gender, category, size, color].filter(Boolean).length

  return (
    /*
     * Wrapper sits in the document flow so it pushes content down,
     * but uses negative margin-top to visually overlap the hero.
     * z-index keeps it above the hero.
     */
    <div
      style={{
        position:   'relative',
        zIndex:     10,
        marginTop:  '-4.5rem',
        marginBottom: '0',
        paddingInline: 'clamp(1rem, 4vw, 5rem)',
      }}
    >
      {/* ── Outer glow backdrop ── */}
      <div
        style={{
          maxWidth:     1200,
          margin:       '0 auto',
          position:     'relative',
        }}
      >
        {/* Glow ring beneath panel */}
        <div
          aria-hidden
          style={{
            position:     'absolute',
            inset:        '4px',
            borderRadius: 22,
            background:   'linear-gradient(135deg, rgba(28,77,161,0.35) 0%, rgba(96,239,255,0.12) 100%)',
            filter:       'blur(18px)',
            pointerEvents:'none',
          }}
        />

        {/* ── Main panel ── */}
        <form
          onSubmit={handleFind}
          style={{
            position:       'relative',
            display:        'flex',
            alignItems:     'flex-end',
            gap:            '1rem',
            flexWrap:       'wrap',
            padding:        'clamp(1.25rem, 2.5vw, 1.875rem) clamp(1.25rem, 2.5vw, 2rem)',
            borderRadius:   20,
            background:     'rgba(10,22,40,0.82)',
            backdropFilter: 'blur(28px) saturate(1.4)',
            WebkitBackdropFilter: 'blur(28px) saturate(1.4)',
            border:         '1px solid rgba(255,255,255,0.10)',
            boxShadow:      [
              '0 24px 64px rgba(10,22,40,0.45)',
              '0 4px 16px  rgba(10,22,40,0.25)',
              'inset 0 1px 0 rgba(255,255,255,0.08)',
            ].join(','),
          }}
        >
          {/* ── FIELD 1 — Gender toggle ── */}
          <div style={{ flexShrink: 0 }}>
            <p
              style={{
                fontSize:     '0.6875rem',
                fontWeight:   700,
                letterSpacing:'0.09em',
                textTransform:'uppercase',
                color:        'rgba(255,255,255,0.5)',
                marginBottom: '0.375rem',
              }}
            >
              Shopping for
            </p>
            <div
              role="group"
              aria-label="Shopping for"
              style={{
                display:      'flex',
                gap:          '0.375rem',
                height:       48,
                alignItems:   'center',
              }}
            >
              {GENDERS.map(g => {
                const active = gender === g.id
                return (
                  <button
                    key={g.id}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setGender(gender === g.id ? '' : g.id)}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      gap:            '0.375rem',
                      padding:        '0 0.875rem',
                      height:         '100%',
                      borderRadius:   9,
                      background:     active
                        ? 'white'
                        : 'rgba(255,255,255,0.08)',
                      border:         `1.5px solid ${active ? 'white' : 'rgba(255,255,255,0.12)'}`,
                      color:          active ? 'var(--color-navy)' : 'rgba(255,255,255,0.65)',
                      fontSize:       '0.875rem',
                      fontWeight:     active ? 700 : 500,
                      cursor:         'pointer',
                      transition:     'all 0.2s cubic-bezier(0.22,1,0.36,1)',
                      whiteSpace:     'nowrap',
                      fontFamily:     'var(--font-sans)',
                    }}
                    onMouseEnter={e => {
                      if (!active) {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = 'rgba(255,255,255,0.14)'
                        el.style.borderColor = 'rgba(255,255,255,0.22)'
                        el.style.color = 'white'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        const el = e.currentTarget as HTMLElement
                        el.style.background = 'rgba(255,255,255,0.08)'
                        el.style.borderColor = 'rgba(255,255,255,0.12)'
                        el.style.color = 'rgba(255,255,255,0.65)'
                      }
                    }}
                  >
                    {g.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* ── Vertical divider ── */}
          <div aria-hidden style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)', flexShrink: 0, alignSelf: 'flex-end', marginBottom: 4 }} />

          {/* ── FIELD 2 — Category ── */}
          <Dropdown
            label="Category"
            fieldLabel="Category"
            value={categoryLabel}
            placeholder="Select category"
            open={openDropdown === 'category'}
            onToggle={() => toggle('category')}
            onClose={() => setOpenDropdown(null)}
            width={180}
          >
            <div style={{ padding: '0.5rem' }}>
              {CATEGORIES.map(cat => {
                const active = category === cat.id
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="option"
                    aria-selected={active}
                    onClick={() => { setCategory(cat.id); setOpenDropdown(null) }}
                    style={{
                      display:        'flex',
                      alignItems:     'center',
                      justifyContent: 'space-between',
                      width:          '100%',
                      padding:        '0.625rem 0.875rem',
                      borderRadius:   8,
                      background:     active ? 'var(--color-blue-pale)' : 'transparent',
                      border:         'none',
                      cursor:         'pointer',
                      fontSize:       '0.9rem',
                      fontWeight:     active ? 700 : 500,
                      color:          active ? 'var(--color-navy)' : 'var(--color-neutral-700)',
                      textAlign:      'left',
                      fontFamily:     'var(--font-sans)',
                      transition:     'background 0.15s ease',
                    }}
                    onMouseEnter={e => {
                      if (!active) (e.currentTarget as HTMLElement).style.background = 'var(--color-neutral-50)'
                    }}
                    onMouseLeave={e => {
                      if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1rem' }}>{cat.emoji}</span>
                      {cat.label}
                    </span>
                    {active && <CheckCircle2 size={14} style={{ color: 'var(--color-medical-blue)', flexShrink: 0 }} />}
                  </button>
                )
              })}
            </div>
          </Dropdown>

          {/* ── Vertical divider ── */}
          <div aria-hidden style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)', flexShrink: 0, alignSelf: 'flex-end', marginBottom: 4 }} />

          {/* ── FIELD 3 — Size ── */}
          <Dropdown
            label="Size"
            fieldLabel="Size"
            value={size}
            placeholder="Select size"
            open={openDropdown === 'size'}
            onToggle={() => toggle('size')}
            onClose={() => setOpenDropdown(null)}
            width={148}
          >
            <div style={{ padding: '0.625rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.375rem' }}>
                {SIZES.map(s => {
                  const active = size === s
                  return (
                    <button
                      key={s}
                      type="button"
                      role="option"
                      aria-selected={active}
                      onClick={() => { setSize(s); setOpenDropdown(null) }}
                      style={{
                        padding:        '0.5rem 0',
                        borderRadius:   7,
                        background:     active ? 'var(--color-navy)' : 'transparent',
                        border:         `1.5px solid ${active ? 'var(--color-navy)' : 'var(--color-neutral-200)'}`,
                        color:          active ? 'white' : 'var(--color-neutral-600)',
                        fontSize:       '0.8125rem',
                        fontWeight:     700,
                        cursor:         'pointer',
                        transition:     'all 0.15s ease',
                        fontFamily:     'var(--font-sans)',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'var(--color-navy)'
                          el.style.color = 'var(--color-navy)'
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          const el = e.currentTarget as HTMLElement
                          el.style.borderColor = 'var(--color-neutral-200)'
                          el.style.color = 'var(--color-neutral-600)'
                        }
                      }}
                    >
                      {s}
                    </button>
                  )
                })}
              </div>
              <button
                type="button"
                onClick={() => { setSize(''); setOpenDropdown(null) }}
                style={{
                  display:    'block',
                  width:      '100%',
                  marginTop:  '0.5rem',
                  padding:    '0.375rem',
                  fontSize:   '0.75rem',
                  color:      'var(--color-neutral-400)',
                  fontWeight: 500,
                  background: 'none',
                  border:     'none',
                  cursor:     'pointer',
                  fontFamily: 'var(--font-sans)',
                  textAlign:  'center',
                }}
              >
                Clear size
              </button>
            </div>
          </Dropdown>

          {/* ── Vertical divider ── */}
          <div aria-hidden style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.1)', flexShrink: 0, alignSelf: 'flex-end', marginBottom: 4 }} />

          {/* ── FIELD 4 — Colour ── */}
          <Dropdown
            label="Colour"
            fieldLabel="Colour"
            value={
              colorSwatch
                ? (
                  /* Show as a small swatch + label inside the trigger */
                  `${colorSwatch.label}`
                )
                : ''
            }
            placeholder="Any colour"
            open={openDropdown === 'color'}
            onToggle={() => toggle('color')}
            onClose={() => setOpenDropdown(null)}
            width={200}
          >
            <div style={{ padding: '0.875rem' }}>
              <p
                style={{
                  fontSize:     '0.6875rem',
                  fontWeight:   700,
                  letterSpacing:'0.08em',
                  textTransform:'uppercase',
                  color:        'var(--color-neutral-400)',
                  marginBottom: '0.625rem',
                }}
              >
                Select a colour
              </p>

              {/* Swatch grid */}
              <div
                style={{
                  display:             'grid',
                  gridTemplateColumns: 'repeat(5, 1fr)',
                  gap:                 '0.5rem',
                  marginBottom:        '0.75rem',
                }}
              >
                {COLORS.map(c => {
                  const active = color === c.hex
                  const light  = isLight(c.hex)
                  return (
                    <button
                      key={c.hex}
                      type="button"
                      title={c.label}
                      aria-label={c.label}
                      aria-pressed={active}
                      onClick={() => { setColor(active ? '' : c.hex); setOpenDropdown(null) }}
                      style={{
                        position:     'relative',
                        width:        '100%',
                        aspectRatio:  '1',
                        borderRadius: 8,
                        background:   c.hex,
                        border:       active
                          ? `3px solid var(--color-navy)`
                          : `1.5px solid ${light ? 'rgba(0,0,0,0.15)' : 'rgba(0,0,0,0.05)'}`,
                        cursor:       'pointer',
                        transition:   'transform 0.15s ease, box-shadow 0.15s ease',
                        boxShadow:    active
                          ? `0 0 0 2px white, 0 0 0 4px var(--color-navy)`
                          : 'none',
                      }}
                      onMouseEnter={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.transform = 'scale(1.12)'
                        el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)'
                      }}
                      onMouseLeave={e => {
                        const el = e.currentTarget as HTMLElement
                        el.style.transform = ''
                        el.style.boxShadow = active
                          ? '0 0 0 2px white, 0 0 0 4px var(--color-navy)'
                          : 'none'
                      }}
                    >
                      {active && (
                        <span
                          style={{
                            position:   'absolute',
                            inset:      0,
                            display:    'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <CheckCircle2
                            size={14}
                            style={{ color: light ? '#0A1628' : 'white', opacity: 0.9 }}
                          />
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Selected label */}
              {colorSwatch && (
                <div
                  style={{
                    display:     'flex',
                    alignItems:  'center',
                    gap:         '0.5rem',
                    padding:     '0.5rem 0.625rem',
                    borderRadius: 8,
                    background:  'var(--color-neutral-50)',
                    border:      '1px solid var(--color-neutral-100)',
                  }}
                >
                  <div
                    style={{
                      width:        16,
                      height:       16,
                      borderRadius: 4,
                      background:   colorSwatch.hex,
                      border:       `1px solid rgba(0,0,0,0.1)`,
                      flexShrink:   0,
                    }}
                  />
                  <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--color-navy)' }}>
                    {colorSwatch.label}
                  </span>
                  <button
                    type="button"
                    onClick={() => setColor('')}
                    style={{
                      marginLeft:  'auto',
                      fontSize:    '0.75rem',
                      color:       'var(--color-neutral-400)',
                      background:  'none',
                      border:      'none',
                      cursor:      'pointer',
                      fontFamily:  'var(--font-sans)',
                    }}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </Dropdown>

          {/* ── Spacer ── */}
          <div style={{ flex: 1, minWidth: 0 }} />

          {/* ── CTA Button ── */}
          <div style={{ flexShrink: 0 }}>
            {/* Hidden label to match the field rows visually */}
            <div style={{ height: '1.4rem', marginBottom: '0.375rem' }} />
            <button
              type="submit"
              style={{
                display:        'flex',
                alignItems:     'center',
                gap:            '0.625rem',
                padding:        '0 1.75rem',
                height:         48,
                borderRadius:   10,
                background:     hasAny
                  ? 'white'
                  : 'rgba(255,255,255,0.55)',
                color:          'var(--color-navy)',
                fontWeight:     800,
                fontSize:       '0.875rem',
                letterSpacing:  '0.04em',
                textTransform:  'uppercase',
                cursor:         'pointer',
                border:         'none',
                fontFamily:     'var(--font-display)',
                transition:     'all 0.25s cubic-bezier(0.22,1,0.36,1)',
                whiteSpace:     'nowrap',
                boxShadow:      hasAny
                  ? '0 4px 20px rgba(10,22,40,0.3)'
                  : 'none',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = 'translateY(-2px)'
                el.style.boxShadow = '0 8px 32px rgba(10,22,40,0.4)'
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement
                el.style.transform = ''
                el.style.boxShadow = hasAny ? '0 4px 20px rgba(10,22,40,0.3)' : 'none'
              }}
            >
              <Search size={16} strokeWidth={2.5} />
              Find My Uniform
              {filled > 0 && (
                <span
                  style={{
                    background:   'var(--color-medical-blue)',
                    color:        'white',
                    borderRadius: '100px',
                    fontSize:     '0.6875rem',
                    fontWeight:   800,
                    padding:      '0.1rem 0.5rem',
                    letterSpacing:'0',
                    textTransform:'none',
                  }}
                >
                  {filled}
                </span>
              )}
            </button>
          </div>
        </form>

        {/* ── Selection summary chips (below the panel) ── */}
        {hasAny && (
          <div
            style={{
              display:     'flex',
              gap:         '0.5rem',
              marginTop:   '0.875rem',
              flexWrap:    'wrap',
              paddingInline:'0.25rem',
              animation:   'revealUp 0.35s cubic-bezier(0.22,1,0.36,1) both',
            }}
          >
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(255,255,255,0.45)', paddingTop: '0.2rem' }}>
              Finding:
            </span>
            {gender && (
              <Chip
                label={GENDERS.find(g => g.id === gender)!.label}
                onRemove={() => setGender('')}
              />
            )}
            {category && (
              <Chip
                label={categoryLabel}
                onRemove={() => setCategory('')}
              />
            )}
            {size && (
              <Chip
                label={`Size ${size}`}
                onRemove={() => setSize('')}
              />
            )}
            {color && colorSwatch && (
              <Chip
                label={colorLabel}
                swatch={color}
                onRemove={() => setColor('')}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

/* ── Selection chip ───────────────────────────────────────── */

function Chip({ label, onRemove, swatch }: { label: string; onRemove: () => void; swatch?: string }) {
  return (
    <span
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '0.375rem',
        padding:        '0.2rem 0.5rem 0.2rem 0.625rem',
        borderRadius:   100,
        background:     'rgba(255,255,255,0.12)',
        border:         '1px solid rgba(255,255,255,0.18)',
        fontSize:       '0.75rem',
        fontWeight:     600,
        color:          'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(8px)',
      }}
    >
      {swatch && (
        <span
          style={{
            width:        10,
            height:       10,
            borderRadius: '50%',
            background:   swatch,
            border:       '1px solid rgba(255,255,255,0.3)',
            flexShrink:   0,
          }}
        />
      )}
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        style={{
          width:        14,
          height:       14,
          borderRadius: '50%',
          background:   'rgba(255,255,255,0.2)',
          border:       'none',
          color:        'rgba(255,255,255,0.8)',
          cursor:       'pointer',
          display:      'flex',
          alignItems:   'center',
          justifyContent:'center',
          fontSize:     '0.6rem',
          fontWeight:   800,
          lineHeight:   1,
          flexShrink:   0,
          transition:   'background 0.15s ease',
        }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.4)' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.2)' }}
      >
        ×
      </button>
    </span>
  )
}
