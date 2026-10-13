import { useState, useMemo, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import {
  SlidersHorizontal,
  Grid3X3,
  List,
  X,
  Search,
  Heart,
  ShoppingBag,
  Check,
  Maximize2,
  Sparkles,
  ChevronDown,
  RotateCcw,
} from 'lucide-react'
import { CREATED_PRODUCTS } from '../data/createdProducts'
import { useStore } from '../context/StoreContext'
import type { Product } from '../context/StoreContext'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function formatPrice(p: number) {
  return `₹${p.toLocaleString('en-IN')}`
}

export const SHOP_CATEGORY_LABELS: Record<string, string> = {
  corporate: 'Corporate Shirts & Suits',
  industrial: 'Industrial & Safety Workwear',
  hospitality: 'Hospitality & Chef Coats',
  security: 'Security & Tactical Uniforms',
  scrubs: 'Healthcare Scrubs',
  logistics: 'Logistics & Retail Polos',
  education: 'Education & Faculty Wear',
  plussize: 'Plus Size Range',
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
]

const COLOR_OPTIONS = [
  { name: 'Navy Blue', hex: '#0B2744' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Charcoal Grey', hex: '#374151' },
  { name: 'Royal Blue', hex: '#1E3A8A' },
  { name: 'Medical Teal', hex: '#0D9488' },
  { name: 'Burgundy / Wine', hex: '#4A0404' },
  { name: 'Hunter Green', hex: '#14532D' },
  { name: 'Tactical Olive', hex: '#3F6212' },
  { name: 'Hi-Vis Yellow / Lime', hex: '#EAB308' },
  { name: 'Jet Black', hex: '#111827' },
  { name: 'Sky Blue', hex: '#BAE6FD' },
]

const ALL_SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL', '30', '32', '34', '36', '38', '40', '42', '44', '46']

interface FilterState {
  gender: string // '' | 'women' | 'men'
  categories: string[]
  priceMax: number
  sizes: string[]
  badge: string[]
  color: string
}

export default function ShopPage({ category }: { category?: string }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const searchQuery = searchParams.get('search') || ''
  const urlGender = searchParams.get('gender') || ''
  const urlCategory = searchParams.get('category') || ''
  const urlSize = searchParams.get('size') || ''
  const urlColor = searchParams.get('color') || ''

  const [sort, setSort] = useState('featured')
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [searchInput, setSearchInput] = useState(searchQuery)

  // Lightbox Modal state
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean
    image: string
    title: string
    spec?: string
  }>({
    isOpen: false,
    image: '',
    title: '',
    spec: '',
  })

  // Filters state
  const [filters, setFilters] = useState<FilterState>(() => ({
    gender: urlGender || '',
    categories: category ? [category] : urlCategory ? [urlCategory] : [],
    priceMax: 5000,
    sizes: urlSize ? [urlSize] : [],
    badge: [],
    color: urlColor || '',
  }))

  // Sync state if URL changes
  useEffect(() => {
    if (urlCategory && !filters.categories.includes(urlCategory)) {
      setFilters(prev => ({ ...prev, categories: [urlCategory] }))
    }
    if (urlGender && filters.gender !== urlGender) {
      setFilters(prev => ({ ...prev, gender: urlGender }))
    }
  }, [urlCategory, urlGender])

  // Sync search input
  useEffect(() => {
    setSearchInput(searchQuery)
  }, [searchQuery])

  // Base product catalog: All 60 custom-created studio ghost-mannequin products
  const baseCatalog = useMemo(() => {
    return CREATED_PRODUCTS
  }, [])

  // Filtered products calculation
  const filteredProducts = useMemo(() => {
    let result = [...baseCatalog]

    // 1. Search Query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim()
      result = result.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.collection?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      )
    }

    // 2. Gender Filter
    if (filters.gender) {
      result = result.filter(p => p.gender === filters.gender)
    }

    // 3. Category Filter
    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    // 4. Max Price Filter
    if (filters.priceMax < 5000) {
      result = result.filter(p => p.price <= filters.priceMax)
    }

    // 5. Size Filter
    if (filters.sizes.length > 0) {
      result = result.filter(p => p.sizes?.some(s => filters.sizes.includes(s)))
    }

    // 6. Color Filter
    if (filters.color) {
      const target = filters.color.toLowerCase()
      result = result.filter(p =>
        p.colors?.some(c => c.toLowerCase() === target)
      )
    }

    // 7. Badge Filter (bestseller / new / sale)
    if (filters.badge.length > 0) {
      result = result.filter(p => p.badge && filters.badge.includes(p.badge))
    }

    // 8. Sorting
    switch (sort) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      case 'newest':
        result.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0))
        break
      default:
        // Featured order: bestsellers first
        result.sort((a, b) => (b.badge === 'bestseller' ? 1 : 0) - (a.badge === 'bestseller' ? 1 : 0))
        break
    }

    return result
  }, [baseCatalog, searchQuery, filters, sort])

  // Filter mutation handlers
  const handleGenderChange = (g: string) => {
    setFilters(prev => ({ ...prev, gender: prev.gender === g ? '' : g }))
  }

  const toggleCategory = (cat: string) => {
    setFilters(prev => ({
      ...prev,
      categories: prev.categories.includes(cat)
        ? prev.categories.filter(c => c !== cat)
        : [...prev.categories, cat],
    }))
  }

  const toggleSize = (size: string) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }))
  }

  const toggleBadge = (badge: string) => {
    setFilters(prev => ({
      ...prev,
      badge: prev.badge.includes(badge)
        ? prev.badge.filter(b => b !== badge)
        : [...prev.badge, badge],
    }))
  }

  const handleColorSelect = (hex: string) => {
    setFilters(prev => ({
      ...prev,
      color: prev.color.toLowerCase() === hex.toLowerCase() ? '' : hex,
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      gender: '',
      categories: [],
      priceMax: 5000,
      sizes: [],
      badge: [],
      color: '',
    })
    setSearchInput('')
    setSearchParams({})
  }

  const activeFilterCount =
    (filters.gender ? 1 : 0) +
    filters.categories.length +
    filters.sizes.length +
    filters.badge.length +
    (filters.color ? 1 : 0) +
    (filters.priceMax < 5000 ? 1 : 0)

  // Handle Search Submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchInput.trim()) {
      setSearchParams(prev => {
        prev.set('search', searchInput.trim())
        return prev
      })
    } else {
      setSearchParams(prev => {
        prev.delete('search')
        return prev
      })
    }
  }

  // Open Lightbox
  const handleOpenLightbox = (image: string, title: string, spec?: string) => {
    setLightbox({ isOpen: true, image, title, spec })
  }

  const handleCloseLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <div style={{ minHeight: '85vh', background: '#FAFBFD' }}>
      {/* ── TOP HERO BANNER ── */}
      <div
        style={{
          background: 'linear-gradient(180deg, #EDF4FD 0%, #FAFBFD 100%)',
          borderBottom: '1px solid rgba(20, 110, 245, 0.1)',
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
      >
        <div className="container-site">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-neutral-500)',
              marginBottom: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <span style={{ color: '#146EF5', fontWeight: 700 }}>
              {filters.gender === 'women'
                ? "Women's Collection"
                : filters.gender === 'men'
                  ? "Men's Collection"
                  : filters.categories.length === 1
                    ? SHOP_CATEGORY_LABELS[filters.categories[0]]
                    : 'Shop All'}
            </span>
          </nav>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 100,
                  background: 'white',
                  border: '1px solid rgba(20, 110, 245, 0.25)',
                  boxShadow: '0 2px 8px rgba(20, 110, 245, 0.08)',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#146EF5',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.5rem',
                }}
              >
                <Sparkles size={12} />
                PURE STUDIO CATALOG • 60 CREATED PRODUCTS
              </div>

              <h1
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
                  color: '#0B2744',
                  letterSpacing: '-0.03em',
                  lineHeight: 1.15,
                  marginBottom: '0.35rem',
                }}
              >
                {filters.gender === 'women'
                  ? "Women's Uniform Collection"
                  : filters.gender === 'men'
                    ? "Men's Uniform Collection"
                    : filters.categories.length === 1
                      ? SHOP_CATEGORY_LABELS[filters.categories[0]]
                      : 'All Uniform Collections'}
              </h1>

              <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.88rem', maxWidth: 650 }}>
                100% pure ghost mannequin product photography with zero human faces/models across all industrial workwear, corporate suiting, scrubs, hotel attire, and tactical gear.
              </p>
            </div>

            {/* Total Count Badge */}
            <div
              style={{
                background: 'white',
                border: '1px solid rgba(11, 39, 68, 0.1)',
                padding: '0.65rem 1.1rem',
                borderRadius: 14,
                boxShadow: '0 4px 14px rgba(11, 39, 68, 0.05)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: '#16A34A',
                  boxShadow: '0 0 0 3px rgba(22, 163, 74, 0.2)',
                }}
              />
              <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0B2744' }}>
                {filteredProducts.length} Products Found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT LAYOUT: LEFT SIDEBAR + PRODUCT GRID ── */}
      <div className="container-site" style={{ paddingBlock: '2rem' }}>
        {/* Mobile Filter Toggle & Controls Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
            marginBottom: '1.5rem',
            flexWrap: 'wrap',
          }}
        >
          {/* Mobile Filter Trigger Button (hidden on desktop via media query or layout) */}
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="mobile-filter-btn"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1rem',
              border: activeFilterCount > 0 ? '1.5px solid #0B2744' : '1.5px solid rgba(11, 39, 68, 0.15)',
              borderRadius: 10,
              background: activeFilterCount > 0 ? '#0B2744' : 'white',
              color: activeFilterCount > 0 ? 'white' : '#0B2744',
              fontSize: '0.82rem',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(11, 39, 68, 0.06)',
            }}
          >
            <SlidersHorizontal size={15} />
            Filter Products
            {activeFilterCount > 0 && (
              <span
                style={{
                  background: '#146EF5',
                  color: 'white',
                  width: 19,
                  height: 19,
                  borderRadius: '50%',
                  fontSize: '0.68rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                }}
              >
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Search Box */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              position: 'relative',
              flex: '1 1 260px',
              maxWidth: 360,
            }}
          >
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: '0.85rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-neutral-400)',
              }}
            />
            <input
              type="text"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Search products..."
              style={{
                width: '100%',
                padding: '0.52rem 2.2rem 0.52rem 2.3rem',
                borderRadius: 10,
                border: '1.5px solid rgba(11, 39, 68, 0.12)',
                background: 'white',
                fontSize: '0.82rem',
                outline: 'none',
                color: '#0B2744',
                fontWeight: 500,
              }}
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput('')
                  setSearchParams(prev => {
                    prev.delete('search')
                    return prev
                  })
                }}
                style={{
                  position: 'absolute',
                  right: '0.65rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94A3B8',
                }}
              >
                <X size={14} />
              </button>
            )}
          </form>

          {/* Right Toolbar Controls: Sort & Grid View */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginLeft: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--color-neutral-500)', fontWeight: 600 }}>
                Sort:
              </span>
              <div style={{ position: 'relative' }}>
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  style={{
                    padding: '0.52rem 1.8rem 0.52rem 0.85rem',
                    border: '1.5px solid rgba(11, 39, 68, 0.12)',
                    borderRadius: 10,
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: '#0B2744',
                    background: 'white',
                    cursor: 'pointer',
                    outline: 'none',
                    appearance: 'none',
                  }}
                >
                  {SORT_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={13}
                  style={{
                    position: 'absolute',
                    right: '0.65rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    pointerEvents: 'none',
                    color: '#64748B',
                  }}
                />
              </div>
            </div>

            {/* View mode toggle */}
            <div
              style={{
                display: 'flex',
                border: '1.5px solid rgba(11, 39, 68, 0.12)',
                borderRadius: 10,
                overflow: 'hidden',
                background: 'white',
              }}
            >
              {(['grid', 'list'] as const).map(v => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  style={{
                    padding: '0.5rem 0.65rem',
                    background: view === v ? '#0B2744' : 'transparent',
                    color: view === v ? 'white' : '#64748B',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  aria-label={`${v} view`}
                >
                  {v === 'grid' ? <Grid3X3 size={15} /> : <List size={15} />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── TWO-COLUMN DESKTOP CONTAINER ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '280px 1fr',
            gap: '2rem',
            alignItems: 'start',
          }}
          className="shop-page-columns"
        >
          {/* ══════════════════════════════════════════
              LEFT SIDE FILTER SIDEBAR (DESKTOP)
          ══════════════════════════════════════════ */}
          <aside
            className="shop-left-sidebar"
            style={{
              position: 'sticky',
              top: 86,
              background: 'white',
              borderRadius: 18,
              border: '1px solid rgba(11, 39, 68, 0.08)',
              boxShadow: '0 4px 20px rgba(11, 39, 68, 0.04)',
              padding: '1.5rem',
              maxHeight: 'calc(100vh - 106px)',
              overflowY: 'auto',
              scrollbarWidth: 'thin',
              scrollbarColor: '#CBD5E1 transparent',
            }}
          >
            <SidebarFilterContent
              filters={filters}
              setFilters={setFilters}
              handleGenderChange={handleGenderChange}
              toggleCategory={toggleCategory}
              toggleSize={toggleSize}
              toggleBadge={toggleBadge}
              handleColorSelect={handleColorSelect}
              clearAllFilters={clearAllFilters}
              activeFilterCount={activeFilterCount}
              totalFound={filteredProducts.length}
            />
          </aside>

          {/* ══════════════════════════════════════════
              RIGHT COLUMN: PRODUCTS GRID & ACTIVE CHIPS
          ══════════════════════════════════════════ */}
          <main style={{ minWidth: 0 }}>
            {/* Active Filter Chips */}
            {activeFilterCount > 0 && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  flexWrap: 'wrap',
                  marginBottom: '1.25rem',
                  padding: '0.75rem 1rem',
                  background: 'white',
                  borderRadius: 12,
                  border: '1px solid rgba(11, 39, 68, 0.06)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    color: '#0B2744',
                    textTransform: 'uppercase',
                    letterSpacing: '0.04em',
                    marginRight: '0.2rem',
                  }}
                >
                  Active:
                </span>

                {filters.gender && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      background: '#EFF6FF',
                      color: '#1D4ED8',
                      borderRadius: 100,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: '1px solid rgba(29, 78, 216, 0.2)',
                    }}
                  >
                    Gender: {filters.gender === 'women' ? "Women's" : "Men's"}
                    <button
                      type="button"
                      onClick={() => handleGenderChange(filters.gender)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {filters.categories.map(cat => (
                  <span
                    key={cat}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      background: '#EFF6FF',
                      color: '#1D4ED8',
                      borderRadius: 100,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: '1px solid rgba(29, 78, 216, 0.2)',
                    }}
                  >
                    {SHOP_CATEGORY_LABELS[cat] || cat}
                    <button
                      type="button"
                      onClick={() => toggleCategory(cat)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {filters.sizes.map(size => (
                  <span
                    key={size}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      background: '#F1F5F9',
                      color: '#0B2744',
                      borderRadius: 100,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: '1px solid rgba(11, 39, 68, 0.12)',
                    }}
                  >
                    Size: {size}
                    <button
                      type="button"
                      onClick={() => toggleSize(size)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                {filters.color && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      background: '#F1F5F9',
                      color: '#0B2744',
                      borderRadius: 100,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: '1px solid rgba(11, 39, 68, 0.12)',
                    }}
                  >
                    <div
                      style={{
                        width: 10,
                        height: 10,
                        borderRadius: '50%',
                        background: filters.color,
                        border: '1px solid rgba(0,0,0,0.2)',
                      }}
                    />
                    Color
                    <button
                      type="button"
                      onClick={() => handleColorSelect(filters.color)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {filters.priceMax < 5000 && (
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      background: '#F1F5F9',
                      color: '#0B2744',
                      borderRadius: 100,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: '1px solid rgba(11, 39, 68, 0.12)',
                    }}
                  >
                    Up to ₹{filters.priceMax}
                    <button
                      type="button"
                      onClick={() => setFilters(prev => ({ ...prev, priceMax: 5000 }))}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                )}

                {filters.badge.map(b => (
                  <span
                    key={b}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.25rem 0.65rem',
                      background: '#FEF3C7',
                      color: '#92400E',
                      borderRadius: 100,
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      border: '1px solid rgba(146, 64, 14, 0.2)',
                    }}
                  >
                    {b === 'new' ? 'New Arrivals' : b === 'sale' ? 'On Sale' : 'Best Sellers'}
                    <button
                      type="button"
                      onClick={() => toggleBadge(b)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0 }}
                    >
                      <X size={12} />
                    </button>
                  </span>
                ))}

                <button
                  type="button"
                  onClick={clearAllFilters}
                  style={{
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    color: '#EF4444',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    marginLeft: 'auto',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                  }}
                >
                  <RotateCcw size={12} /> Clear all
                </button>
              </div>
            )}

            {/* Products Grid or Empty State */}
            {filteredProducts.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '4rem 2rem',
                  background: 'white',
                  borderRadius: 18,
                  border: '1px solid rgba(11, 39, 68, 0.08)',
                }}
              >
                <Search size={44} style={{ margin: '0 auto 1rem', color: '#94A3B8' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    color: '#0B2744',
                    marginBottom: '0.4rem',
                  }}
                >
                  No matching uniforms found
                </h3>
                <p style={{ color: 'var(--color-neutral-500)', fontSize: '0.88rem', maxWidth: 400, margin: '0 auto' }}>
                  Try relaxing your category or price filters, or clearing your search term.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="btn-primary"
                  style={{ marginTop: '1.5rem', padding: '0.65rem 1.5rem' }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns:
                    view === 'grid' ? 'repeat(auto-fill, minmax(230px, 1fr))' : '1fr',
                  gap: '1.25rem',
                }}
              >
                {filteredProducts.map(product => (
                  <ShopCatalogProductCard
                    key={product.id}
                    product={product}
                    viewMode={view}
                    onOpenLightbox={handleOpenLightbox}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ── MOBILE FILTER SLIDE-IN DRAWER ── */}
      {mobileFiltersOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000 }}>
          {/* Backdrop */}
          <div
            onClick={() => setMobileFiltersOpen(false)}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(11, 39, 68, 0.6)',
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Drawer Panel */}
          <div
            style={{
              position: 'absolute',
              inset: '0 auto 0 0',
              width: '86vw',
              maxWidth: 340,
              background: 'white',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              animation: `slideInLeft 0.3s ${EASE} both`,
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.25rem',
                borderBottom: '1px solid rgba(11, 39, 68, 0.08)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <SlidersHorizontal size={18} style={{ color: '#146EF5' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    color: '#0B2744',
                  }}
                >
                  Filter Products
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                style={{
                  background: '#F1F5F9',
                  border: 'none',
                  borderRadius: '50%',
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                }}
              >
                <X size={16} style={{ color: '#0B2744' }} />
              </button>
            </div>

            {/* Scrollable Filters Content */}
            <div style={{ padding: '1.25rem', overflowY: 'auto', flex: 1 }}>
              <SidebarFilterContent
                filters={filters}
                setFilters={setFilters}
                handleGenderChange={handleGenderChange}
                toggleCategory={toggleCategory}
                toggleSize={toggleSize}
                toggleBadge={toggleBadge}
                handleColorSelect={handleColorSelect}
                clearAllFilters={clearAllFilters}
                activeFilterCount={activeFilterCount}
                totalFound={filteredProducts.length}
              />
            </div>

            {/* Footer Buttons */}
            <div
              style={{
                padding: '1rem 1.25rem',
                borderTop: '1px solid rgba(11, 39, 68, 0.08)',
                display: 'flex',
                gap: '0.75rem',
                background: '#FAFBFD',
              }}
            >
              <button
                type="button"
                onClick={clearAllFilters}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: 10,
                  border: '1.5px solid rgba(11, 39, 68, 0.15)',
                  background: 'white',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  color: '#0B2744',
                  cursor: 'pointer',
                }}
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="btn-primary"
                style={{
                  flex: 2,
                  padding: '0.65rem',
                  justifyContent: 'center',
                  fontSize: '0.85rem',
                }}
              >
                Show {filteredProducts.length} Items
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── HIGH-RES LIGHTBOX MODAL ── */}
      {lightbox.isOpen && (
        <div
          onClick={handleCloseLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(11, 39, 68, 0.88)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              background: 'white',
              borderRadius: 20,
              maxWidth: 720,
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '92vh',
            }}
          >
            <button
              type="button"
              onClick={handleCloseLightbox}
              aria-label="Close lightbox"
              style={{
                position: 'absolute',
                top: '0.85rem',
                right: '0.85rem',
                zIndex: 10,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'white',
                border: '1px solid rgba(11, 39, 68, 0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
              }}
            >
              <X size={18} style={{ color: '#0B2744' }} />
            </button>

            <div
              style={{
                position: 'relative',
                background: '#F8FAFC',
                aspectRatio: '1 / 1',
                maxHeight: '62vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={lightbox.image}
                alt={lightbox.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>

            <div style={{ padding: '1.25rem 1.5rem' }}>
              <div
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  color: '#146EF5',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  marginBottom: '0.25rem',
                }}
              >
                AFI UNIFORMS • 100% GHOST MANNEQUIN CATALOG SPEC
              </div>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  color: '#0B2744',
                  marginBottom: '0.35rem',
                }}
              >
                {lightbox.title}
              </h3>
              {lightbox.spec && (
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: 'var(--color-neutral-600)',
                    lineHeight: 1.4,
                  }}
                >
                  {lightbox.spec}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

/* ─── SIDEBAR FILTER CONTENT COMPONENT ─── */
function SidebarFilterContent({
  filters,
  setFilters,
  handleGenderChange,
  toggleCategory,
  toggleSize,
  toggleBadge,
  handleColorSelect,
  clearAllFilters,
  activeFilterCount,
}: any) {
  const categoryKeys = Object.keys(SHOP_CATEGORY_LABELS)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Sidebar Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(11, 39, 68, 0.08)',
          paddingBottom: '0.85rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <SlidersHorizontal size={16} style={{ color: '#146EF5' }} />
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '0.98rem',
              color: '#0B2744',
            }}
          >
            Filters
          </span>
          {activeFilterCount > 0 && (
            <span
              style={{
                background: '#EFF6FF',
                color: '#1D4ED8',
                fontSize: '0.68rem',
                fontWeight: 800,
                padding: '0.15rem 0.45rem',
                borderRadius: 100,
              }}
            >
              {activeFilterCount}
            </span>
          )}
        </div>

        {activeFilterCount > 0 && (
          <button
            type="button"
            onClick={clearAllFilters}
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              color: '#EF4444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            Reset All
          </button>
        )}
      </div>

      {/* 1. GENDER FILTER (All / Women / Men) */}
      <div>
        <h4
          style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#0B2744',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Department / Gender
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {[
            { id: '', label: 'All Uniforms', count: 60 },
            { id: 'women', label: "Women's Collection", count: 30 },
            { id: 'men', label: "Men's Collection", count: 30 },
          ].map(item => {
            const isSelected = filters.gender === item.id
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleGenderChange(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.45rem 0.75rem',
                  borderRadius: 8,
                  border: isSelected ? '1.5px solid #0B2744' : '1px solid rgba(11, 39, 68, 0.08)',
                  background: isSelected ? '#0B2744' : '#F8FAFC',
                  color: isSelected ? 'white' : '#0B2744',
                  fontSize: '0.8rem',
                  fontWeight: isSelected ? 700 : 600,
                  cursor: 'pointer',
                  transition: `all 0.18s ${EASE}`,
                  textAlign: 'left',
                }}
              >
                <span>{item.label}</span>
                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    opacity: isSelected ? 0.9 : 0.6,
                  }}
                >
                  ({item.count})
                </span>
              </button>
            )
          })}
        </div>
      </div>

      {/* 2. CATEGORIES FILTER */}
      <div>
        <h4
          style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#0B2744',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Uniform Categories
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
          {categoryKeys.map(cat => {
            const isChecked = filters.categories.includes(cat)
            return (
              <label
                key={cat}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  padding: '0.2rem 0',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat)}
                    style={{
                      width: 16,
                      height: 16,
                      accentColor: '#146EF5',
                      cursor: 'pointer',
                      borderRadius: 4,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: isChecked ? 700 : 500,
                      color: isChecked ? '#0B2744' : 'var(--color-neutral-700)',
                    }}
                  >
                    {SHOP_CATEGORY_LABELS[cat]}
                  </span>
                </div>
              </label>
            )
          })}
        </div>
      </div>

      {/* 3. PRICE RANGE SLIDER */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.65rem',
          }}
        >
          <h4
            style={{
              fontSize: '0.74rem',
              fontWeight: 800,
              color: '#0B2744',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            Max Price
          </h4>
          <span
            style={{
              fontSize: '0.82rem',
              fontWeight: 800,
              color: '#146EF5',
            }}
          >
            ₹{filters.priceMax.toLocaleString('en-IN')}
          </span>
        </div>

        <input
          type="range"
          min={600}
          max={5000}
          step={100}
          value={filters.priceMax}
          onChange={e =>
            setFilters((prev: any) => ({ ...prev, priceMax: Number(e.target.value) }))
          }
          style={{
            width: '100%',
            accentColor: '#146EF5',
            cursor: 'pointer',
          }}
        />

        {/* Quick price pills */}
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
          {[1500, 2500, 3500, 5000].map(val => (
            <button
              key={val}
              type="button"
              onClick={() => setFilters((prev: any) => ({ ...prev, priceMax: val }))}
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                padding: '0.2rem 0.5rem',
                borderRadius: 6,
                border:
                  filters.priceMax === val
                    ? '1px solid #146EF5'
                    : '1px solid rgba(11, 39, 68, 0.1)',
                background: filters.priceMax === val ? '#EFF6FF' : 'white',
                color: filters.priceMax === val ? '#1D4ED8' : '#0B2744',
                cursor: 'pointer',
              }}
            >
              {val === 5000 ? 'All' : `< ₹${val}`}
            </button>
          ))}
        </div>
      </div>

      {/* 4. SIZES FILTER */}
      <div>
        <h4
          style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#0B2744',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Available Sizes
        </h4>
        <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
          {ALL_SIZES.map(size => {
            const isSelected = filters.sizes.includes(size)
            return (
              <button
                key={size}
                type="button"
                onClick={() => toggleSize(size)}
                style={{
                  minWidth: 34,
                  height: 30,
                  padding: '0 0.4rem',
                  borderRadius: 6,
                  border: isSelected ? '1.5px solid #0B2744' : '1px solid rgba(11, 39, 68, 0.12)',
                  background: isSelected ? '#0B2744' : 'white',
                  color: isSelected ? 'white' : '#0B2744',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: `all 0.15s ${EASE}`,
                }}
              >
                {size}
              </button>
            )
          })}
        </div>
      </div>

      {/* 5. COLOR SWATCHES */}
      <div>
        <h4
          style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#0B2744',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Garment Colors
        </h4>
        <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
          {COLOR_OPTIONS.map(c => {
            const isSelected = filters.color.toLowerCase() === c.hex.toLowerCase()
            const isWhite = c.hex.toLowerCase() === '#ffffff'
            return (
              <button
                key={c.hex}
                type="button"
                onClick={() => handleColorSelect(c.hex)}
                title={c.name}
                aria-label={`Filter by ${c.name}`}
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: c.hex,
                  border: isSelected
                    ? '2px solid white'
                    : isWhite
                      ? '1px solid #CBD5E1'
                      : '1px solid rgba(0,0,0,0.15)',
                  boxShadow: isSelected
                    ? '0 0 0 2px #146EF5, 0 2px 6px rgba(20, 110, 245, 0.4)'
                    : '0 1px 3px rgba(0,0,0,0.08)',
                  cursor: 'pointer',
                  transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                  transition: `transform 0.15s ${EASE}`,
                }}
              />
            )
          })}
        </div>
      </div>

      {/* 6. BADGES / HIGHLIGHTS */}
      <div>
        <h4
          style={{
            fontSize: '0.74rem',
            fontWeight: 800,
            color: '#0B2744',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}
        >
          Special Highlights
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          {[
            { id: 'bestseller', label: 'Best Sellers' },
            { id: 'new', label: 'New Arrivals' },
            { id: 'sale', label: 'Special Value / Sale' },
          ].map(b => {
            const isChecked = filters.badge.includes(b.id)
            return (
              <label
                key={b.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  padding: '0.2rem 0',
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleBadge(b.id)}
                  style={{
                    width: 16,
                    height: 16,
                    accentColor: '#146EF5',
                    cursor: 'pointer',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: isChecked ? 700 : 500,
                    color: isChecked ? '#0B2744' : 'var(--color-neutral-700)',
                  }}
                >
                  {b.label}
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─── SINGLE PRODUCT CARD FOR SHOP CATALOG ─── */
function ShopCatalogProductCard({
  product,
  viewMode,
  onOpenLightbox,
}: {
  product: Product
  viewMode: 'grid' | 'list'
  onOpenLightbox?: (img: string, title: string, spec?: string) => void
}) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore()
  const wishlisted = isInWishlist(product.id)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? '#0B2744')
  const [added, setAdded] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, product.sizes?.[0] ?? 'M', selectedColor)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  const handleColorSelect = (col: string) => {
    if (selectedColor === col) return
    setIsChanging(true)
    setSelectedColor(col)
    setTimeout(() => setIsChanging(false), 200)
  }

  const isBaseColor = selectedColor === (product.colors?.[0] ?? '#0B2744')
  const isWhiteGarment =
    product.image.includes('lab-coat') || product.colors?.[0]?.toLowerCase() === '#ffffff'

  // List View Layout
  if (viewMode === 'list') {
    return (
      <div
        style={{
          display: 'flex',
          gap: '1.25rem',
          padding: '1rem',
          background: 'white',
          borderRadius: 16,
          boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
          border: '1px solid rgba(11, 39, 68, 0.08)',
          alignItems: 'center',
          transition: `all 0.25s ${EASE}`,
        }}
      >
        <Link
          to={`/product/${product.id}`}
          style={{
            flexShrink: 0,
            width: 140,
            height: 140,
            borderRadius: 12,
            overflow: 'hidden',
            background: '#F8FAFC',
            position: 'relative',
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        </Link>

        <div style={{ flex: 1 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.66rem',
              fontWeight: 800,
              color: '#146EF5',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: '0.25rem',
            }}
          >
            <span>{SHOP_CATEGORY_LABELS[product.category] || product.category}</span>
            {product.gender && <span>• {product.gender.toUpperCase()}</span>}
          </div>

          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '1rem',
                color: '#0B2744',
                marginBottom: '0.35rem',
              }}
            >
              {product.name}
            </h3>
          </Link>

          <p
            style={{
              fontSize: '0.8rem',
              color: 'var(--color-neutral-600)',
              lineHeight: 1.4,
              marginBottom: '0.65rem',
              maxWidth: 600,
            }}
          >
            {product.description}
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span
                style={{
                  fontSize: '1.05rem',
                  fontWeight: 900,
                  color: '#0B2744',
                  fontFamily: 'var(--font-display)',
                }}
              >
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: '0.78rem',
                    color: 'var(--color-neutral-400)',
                    textDecoration: 'line-through',
                  }}
                >
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {discountPercent > 0 && (
                <span
                  style={{
                    fontSize: '0.65rem',
                    fontWeight: 800,
                    color: '#16A34A',
                    background: '#DCFCE7',
                    padding: '0.1rem 0.4rem',
                    borderRadius: 4,
                  }}
                >
                  {discountPercent}% OFF
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleQuickAdd}
              className="btn-primary"
              style={{
                padding: '0.45rem 1rem',
                fontSize: '0.78rem',
                background: added ? '#16A34A' : '#0B2744',
              }}
            >
              {added ? <Check size={14} /> : <ShoppingBag size={14} />}
              {added ? 'Added' : 'Add to Cart'}
            </button>

            <button
              type="button"
              onClick={() => toggleWishlist(product.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: wishlisted ? '#EF4444' : '#94A3B8',
              }}
            >
              <Heart size={18} fill={wishlisted ? '#EF4444' : 'none'} />
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Grid View Layout
  return (
    <div
      className="signature-card-item"
      style={{
        background: 'white',
        borderRadius: 18,
        border: '1px solid rgba(11, 39, 68, 0.08)',
        boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        transition: `transform 0.28s ${EASE}, box-shadow 0.28s ${EASE}, border-color 0.28s ease`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = '0 14px 32px rgba(11, 39, 68, 0.12)'
        el.style.borderColor = 'rgba(20, 110, 245, 0.24)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 4px 16px rgba(11, 39, 68, 0.04)'
        el.style.borderColor = 'rgba(11, 39, 68, 0.08)'
      }}
    >
      {/* ── IMAGE WRAPPER ── */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          background: '#F8FAFC',
          cursor: 'pointer',
        }}
      >
        <Link
          to={`/product/${product.id}`}
          style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              opacity: isChanging ? 0.6 : 1,
              transition: `transform 0.4s ${EASE}, opacity 0.2s ease`,
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
            }}
          />

          {!isBaseColor && (
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: selectedColor,
                mixBlendMode: isWhiteGarment ? 'multiply' : 'color',
                opacity: 0.38,
                pointerEvents: 'none',
                transition: 'all 0.3s ease',
              }}
            />
          )}
        </Link>

        {/* Top-Left Badge */}
        {product.badge && (
          <div
            style={{
              position: 'absolute',
              top: '0.65rem',
              left: '0.65rem',
              zIndex: 2,
            }}
          >
            <span
              style={{
                display: 'inline-block',
                padding: '0.22rem 0.6rem',
                borderRadius: 100,
                fontSize: '0.6rem',
                fontWeight: 800,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'white',
                background:
                  product.badge === 'bestseller'
                    ? '#0B2744'
                    : product.badge === 'new'
                      ? '#146EF5'
                      : '#16A34A',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              }}
            >
              {product.badge === 'bestseller'
                ? 'Best Seller'
                : product.badge === 'new'
                  ? 'New'
                  : 'Special'}
            </span>
          </div>
        )}

        {/* Top-Right Wishlist Button */}
        <button
          type="button"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute',
            top: '0.65rem',
            right: '0.65rem',
            zIndex: 2,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(11, 39, 68, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transition: `all 0.2s ${EASE}`,
          }}
        >
          <Heart
            size={15}
            style={{
              color: wishlisted ? '#EF4444' : '#64748B',
              fill: wishlisted ? '#EF4444' : 'none',
              transition: 'all 0.18s ease',
            }}
          />
        </button>

        {/* Quick Zoom Preview */}
        {onOpenLightbox && (
          <button
            type="button"
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              onOpenLightbox(product.image, product.name, product.description)
            }}
            title="Inspect garment detail"
            style={{
              position: 'absolute',
              bottom: '0.65rem',
              right: '0.65rem',
              zIndex: 2,
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'rgba(11, 39, 68, 0.82)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0.9,
              transition: `all 0.2s ${EASE}`,
            }}
          >
            <Maximize2 size={13} />
          </button>
        )}
      </div>

      {/* ── CARD BODY ── */}
      <div
        style={{
          padding: '0.9rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Eyebrow / Category */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.3rem',
              gap: '0.3rem',
            }}
          >
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 800,
                color: '#146EF5',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}
            >
              {SHOP_CATEGORY_LABELS[product.category] || product.category}
            </span>
            {product.gender && (
              <span
                style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: '#64748B',
                  background: '#F1F5F9',
                  padding: '0.08rem 0.35rem',
                  borderRadius: 4,
                  textTransform: 'uppercase',
                }}
              >
                {product.gender}
              </span>
            )}
          </div>

          {/* Product Title */}
          <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.84rem',
                color: '#0B2744',
                lineHeight: 1.25,
                letterSpacing: '-0.015em',
                marginBottom: '0.25rem',
                minHeight: '2.1rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </h4>
          </Link>

          {/* Price + MRP + Discount */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginBottom: '0.65rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '0.98rem',
                fontWeight: 900,
                color: '#0B2744',
                fontFamily: 'var(--font-display)',
              }}
            >
              {formatPrice(product.price)}
            </span>

            {product.originalPrice && (
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-neutral-400)',
                  textDecoration: 'line-through',
                  fontWeight: 500,
                }}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}

            {discountPercent > 0 && (
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  color: '#16A34A',
                  background: '#DCFCE7',
                  padding: '0.1rem 0.35rem',
                  borderRadius: 4,
                }}
              >
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* ── CARD FOOTER: SWATCHES + QUICK ADD ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.6rem',
            borderTop: '1px solid rgba(11, 39, 68, 0.06)',
            gap: '0.4rem',
          }}
        >
          {/* Swatches */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.22rem' }}>
            {(product.colors ?? []).slice(0, 4).map((col, idx) => {
              const isSelected = selectedColor === col
              const isWhite = col.toLowerCase() === '#ffffff'
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleColorSelect(col)}
                  aria-label={`Select color ${col}`}
                  title={`Select color ${col}`}
                  style={{
                    width: 14,
                    height: 14,
                    borderRadius: '50%',
                    background: col,
                    border: isSelected
                      ? '2px solid white'
                      : isWhite
                        ? '1px solid #CBD5E1'
                        : '1px solid rgba(0,0,0,0.14)',
                    boxShadow: isSelected
                      ? '0 0 0 2px #146EF5, 0 2px 6px rgba(20, 110, 245, 0.35)'
                      : '0 1px 2px rgba(0,0,0,0.06)',
                    padding: 0,
                    cursor: 'pointer',
                    transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                    transition: `transform 0.15s ${EASE}`,
                  }}
                />
              )
            })}
          </div>

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: 8,
              border: 'none',
              background: added ? '#16A34A' : '#0B2744',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: `all 0.2s ${EASE}`,
              flexShrink: 0,
            }}
          >
            {added ? (
              <>
                <Check size={12} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={12} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
