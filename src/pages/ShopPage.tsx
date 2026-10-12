import { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { SlidersHorizontal, Grid3X3, List, X, Search, Heart } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'

const CATEGORY_LABELS: Record<string, string> = {
  scrubs: 'Scrubs',
  'lab-coats': 'Lab Coats & Aprons',
  underscrubs: 'Underscrubs',
  jackets: 'Jackets',
  'scrub-caps': 'Scrub Caps',
  accessories: 'Accessories',
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'newest', label: 'Newest First' },
]

interface FilterState {
  categories:  string[]
  priceMax:    number
  sizes:       string[]
  badge:       string[]
  gender?:     string
  color?:      string
  collection?: string
}

export default function ShopPage({ category }: { category?: string }) {
  const [searchParams] = useSearchParams()
  const searchQuery   = searchParams.get('search')     || ''
  const urlGender     = searchParams.get('gender')     || ''
  const urlCategory   = searchParams.get('category')   || ''
  const urlSize       = searchParams.get('size')       || ''
  const urlColor      = searchParams.get('color')      || ''
  const urlCollection = searchParams.get('collection') || ''

  const [sort, setSort]     = useState('featured')
  const [view, setView]     = useState<'grid' | 'list'>('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)

  // Seed filters from URL params (QuickFinder navigation) or prop
  const [filters, setFilters] = useState<FilterState>(() => ({
    categories: category
      ? [category]
      : urlCategory
        ? [urlCategory]
        : [],
    priceMax:   5000,
    sizes:      urlSize ? [urlSize] : [],
    badge:      [],
    gender:     urlGender     || '',
    color:      urlColor      || '',
    collection: urlCollection || '',
  }))

  const allCategories = Object.keys(CATEGORY_LABELS)
  const allSizes = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL']

  const filteredProducts = useMemo(() => {
    let result = [...PRODUCTS]

    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q)
      )
    }

    if (filters.categories.length > 0) {
      result = result.filter(p => filters.categories.includes(p.category))
    }

    if (filters.collection) {
      const colQuery = filters.collection.toLowerCase()
      const matched = result.filter(p =>
        p.collection?.toLowerCase().includes(colQuery)
      )
      if (matched.length > 0) {
        result = matched
      }
    }

    if (filters.color) {
      const colorMap: Record<string, string[]> = {
        'navy blue': ['#0A1628', '#1C4DA1'],
        'royal blue': ['#1C4DA1', '#0A1628'],
        'sky blue': ['#1C4DA1', '#0D9488'],
        'bottle green': ['#16A34A', '#0D9488'],
        'teal': ['#0D9488', '#16A34A'],
        'wine / burgundy': ['#7C3AED', '#EC4899'],
        'wine': ['#7C3AED', '#EC4899'],
        'steel grey': ['#6B7280', '#9CA3AF'],
        'charcoal': ['#6B7280', '#0A1628'],
        'black': ['#0A1628', '#6B7280'],
        'white': ['#FFFFFF', '#F3F4F6'],
        'purple': ['#7C3AED'],
        'pink': ['#EC4899'],
      }
      const key = filters.color.toLowerCase()
      const targetHexes = colorMap[key] || [filters.color]
      const matched = result.filter(p =>
        p.colors?.some(c => targetHexes.some(h => h.toLowerCase() === c.toLowerCase()))
      )
      if (matched.length > 0) {
        result = matched
      }
    }

    if (filters.badge.length > 0) {
      result = result.filter(p => p.badge && filters.badge.includes(p.badge))
    }

    result = result.filter(p => p.price <= filters.priceMax)

    if (filters.sizes.length > 0) {
      result = result.filter(p => p.sizes?.some(s => filters.sizes.includes(s)))
    }

    switch (sort) {
      case 'price-asc': result.sort((a, b) => a.price - b.price); break
      case 'price-desc': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => (b.rating || 0) - (a.rating || 0)); break
      case 'newest': result.sort((a, b) => (b.badge === 'new' ? 1 : 0) - (a.badge === 'new' ? 1 : 0)); break
    }

    return result
  }, [filters, sort, searchQuery])

  const toggleFilter = <K extends keyof FilterState>(key: K, value: string) => {
    const arr = filters[key] as string[]
    setFilters(prev => ({
      ...prev,
      [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value]
    }))
  }

  const activeFilterCount = filters.categories.length + filters.sizes.length + filters.badge.length + (filters.priceMax < 5000 ? 1 : 0) + (filters.color ? 1 : 0)

  return (
    <div style={{ minHeight: '80vh', background: 'white' }}>
      {/* Page Header */}
      <div style={{ background: 'var(--color-blue-pale)', borderBottom: '1px solid var(--color-blue-light)', paddingBlock: '2rem' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: 'var(--color-neutral-400)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Link to="/" style={{ color: 'inherit' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-navy)' }}>{category ? CATEGORY_LABELS[category] || category : filters.color ? `Colour: ${filters.color}` : searchQuery ? `Search: "${searchQuery}"` : 'All Products'}</span>
          </nav>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h1 className="text-display" style={{ color: 'var(--color-navy)', marginBottom: '0.375rem' }}>
                {category ? CATEGORY_LABELS[category] || category : filters.color ? `${filters.color} Uniforms` : searchQuery ? `"${searchQuery}"` : 'All Products'}
              </h1>
              <p style={{ color: 'var(--color-neutral-500)', fontSize: '0.9rem' }}>
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container-site" style={{ paddingBlock: '2rem' }}>
        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setFiltersOpen(true)}
            style={{
              display: 'flex', alignItems: 'center', gap: '0.5rem',
              padding: '0.5625rem 1rem',
              border: '1.5px solid var(--color-neutral-200)',
              borderRadius: 'var(--radius-md)',
              background: activeFilterCount > 0 ? 'var(--color-navy)' : 'white',
              color: activeFilterCount > 0 ? 'white' : 'var(--color-neutral-700)',
              fontSize: '0.875rem', fontWeight: 600,
              cursor: 'pointer', transition: 'all 0.2s ease',
            }}
          >
            <SlidersHorizontal size={16} />
            Filters
            {activeFilterCount > 0 && (
              <span style={{ background: 'var(--color-blue-mid)', color: 'white', width: 18, height: 18, borderRadius: '50%', fontSize: '0.7rem', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>
                {activeFilterCount}
              </span>
            )}
          </button>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', marginLeft: 'auto' }}>
            <label style={{ fontSize: '0.875rem', color: 'var(--color-neutral-500)', fontWeight: 500 }}>Sort:</label>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                padding: '0.5rem 0.875rem',
                border: '1.5px solid var(--color-neutral-200)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.875rem', fontWeight: 600,
                color: 'var(--color-neutral-700)',
                background: 'white', cursor: 'pointer',
              }}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', border: '1.5px solid var(--color-neutral-200)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {(['grid', 'list'] as const).map(v => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{
                  padding: '0.5rem 0.625rem',
                  background: view === v ? 'var(--color-navy)' : 'white',
                  color: view === v ? 'white' : 'var(--color-neutral-400)',
                  transition: 'all 0.15s ease',
                }}
                aria-label={`${v} view`}
              >
                {v === 'grid' ? <Grid3X3 size={15} /> : <List size={15} />}
              </button>
            ))}
          </div>
        </div>

        {/* Active filter chips */}
        {activeFilterCount > 0 && (
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {filters.categories.map(cat => (
              <span key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', background: 'var(--color-blue-pale)', color: 'var(--color-medical-blue)', borderRadius: '100px', fontSize: '0.8125rem', fontWeight: 600, border: '1px solid var(--color-blue-light)' }}>
                {CATEGORY_LABELS[cat]}
                <button onClick={() => toggleFilter('categories', cat)}><X size={12} /></button>
              </span>
            ))}
            {filters.sizes.map(size => (
              <span key={size} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', background: 'var(--color-blue-pale)', color: 'var(--color-medical-blue)', borderRadius: '100px', fontSize: '0.8125rem', fontWeight: 600, border: '1px solid var(--color-blue-light)' }}>
                {size}
                <button onClick={() => toggleFilter('sizes', size)}><X size={12} /></button>
              </span>
            ))}
            {filters.color && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', background: 'var(--color-blue-pale)', color: 'var(--color-medical-blue)', borderRadius: '100px', fontSize: '0.8125rem', fontWeight: 600, border: '1px solid var(--color-blue-light)' }}>
                Colour: {filters.color}
                <button onClick={() => setFilters(prev => ({ ...prev, color: '' }))}><X size={12} /></button>
              </span>
            )}
            <button
              onClick={() => setFilters({ categories: [], priceMax: 5000, sizes: [], badge: [], color: '' })}
              style={{ color: 'var(--color-error)', fontSize: '0.8125rem', fontWeight: 600, textDecoration: 'underline' }}
            >
              Clear all
            </button>
          </div>
        )}

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem 2rem', color: 'var(--color-neutral-400)' }}>
            <Search size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
            <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--color-neutral-600)' }}>No products found</h3>
            <p style={{ fontSize: '0.9rem' }}>Try adjusting your filters or search term.</p>
            <button
              onClick={() => setFilters({ categories: [], priceMax: 5000, sizes: [], badge: [] })}
              className="btn-primary"
              style={{ marginTop: '1.5rem' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: view === 'grid' ? 'repeat(auto-fill, minmax(210px, 1fr))' : '1fr',
            gap: '1.25rem',
          }}>
            {filteredProducts.map((product, i) => (
              <div
                key={product.id}
                style={{ animation: `revealUp 0.5s cubic-bezier(0.22,1,0.36,1) ${Math.min(i, 8) * 50}ms both` }}
              >
                {view === 'grid' ? (
                  <ProductCard product={product} />
                ) : (
                  <ListProductCard product={product} />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter Drawer */}
      {filtersOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100 }}>
          <div
            style={{ position: 'absolute', inset: 0, background: 'rgba(10,22,40,0.5)' }}
            onClick={() => setFiltersOpen(false)}
          />
          <div style={{
            position: 'absolute', inset: '0 auto 0 0',
            width: '85vw', maxWidth: 340,
            background: 'white', overflowY: 'auto',
            animation: 'slideInLeft 0.35s var(--ease-premium) both',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem', borderBottom: '1px solid var(--color-neutral-100)' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-navy)' }}>Filters</h3>
              <button onClick={() => setFiltersOpen(false)}><X size={20} /></button>
            </div>
            <div style={{ padding: '1.25rem' }}>
              <FilterPanel
                filters={filters}
                setFilters={setFilters}
                allCategories={allCategories}
                allSizes={allSizes}
                toggleFilter={toggleFilter}
              />
            </div>
            <div style={{ padding: '1rem 1.25rem', borderTop: '1px solid var(--color-neutral-100)', display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={() => { setFilters({ categories: [], priceMax: 5000, sizes: [], badge: [] }); setFiltersOpen(false) }}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Clear
              </button>
              <button
                onClick={() => setFiltersOpen(false)}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Apply ({filteredProducts.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FilterPanel({ filters, setFilters, allCategories, allSizes, toggleFilter }: any) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>Category</h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
          {allCategories.map((cat: string) => (
            <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', padding: '0.25rem 0' }}>
              <input type="checkbox" checked={filters.categories.includes(cat)} onChange={() => toggleFilter('categories', cat)} style={{ width: 16, height: 16, accentColor: 'var(--color-medical-blue)' }} />
              <span style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600)', fontWeight: 500 }}>{CATEGORY_LABELS[cat]}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>
          Max Price: ₹{filters.priceMax.toLocaleString('en-IN')}
        </h4>
        <input type="range" min={299} max={5000} step={100} value={filters.priceMax} onChange={e => setFilters((prev: FilterState) => ({ ...prev, priceMax: Number(e.target.value) }))} style={{ width: '100%', accentColor: 'var(--color-medical-blue)' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--color-neutral-400)', marginTop: '0.25rem' }}>
          <span>₹299</span><span>₹5,000</span>
        </div>
      </div>

      <div>
        <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>Size</h4>
        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
          {allSizes.map((size: string) => (
            <button key={size} onClick={() => toggleFilter('sizes', size)} style={{ padding: '0.375rem 0.625rem', borderRadius: 6, border: '1.5px solid', borderColor: filters.sizes.includes(size) ? 'var(--color-navy)' : 'var(--color-neutral-200)', background: filters.sizes.includes(size) ? 'var(--color-navy)' : 'transparent', color: filters.sizes.includes(size) ? 'white' : 'var(--color-neutral-600)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.15s ease' }}>
              {size}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-navy)', marginBottom: '0.75rem' }}>Collection</h4>
        {['new', 'sale', 'bestseller'].map(badge => (
          <label key={badge} style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', cursor: 'pointer', padding: '0.25rem 0', marginBottom: '0.25rem' }}>
            <input type="checkbox" checked={filters.badge.includes(badge)} onChange={() => toggleFilter('badge', badge)} style={{ width: 16, height: 16, accentColor: 'var(--color-medical-blue)' }} />
            <span style={{ fontSize: '0.875rem', color: 'var(--color-neutral-600)', fontWeight: 500, textTransform: 'capitalize' }}>{badge === 'new' ? 'New Arrivals' : badge === 'sale' ? 'On Sale' : 'Bestsellers'}</span>
          </label>
        ))}
      </div>
    </div>
  )
}

function ListProductCard({ product }: { product: any }) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore()
  const wishlisted = isInWishlist(product.id)
  return (
    <div style={{ display: 'flex', gap: '1.25rem', padding: '1rem', background: 'white', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-card)', border: '1px solid var(--color-neutral-100)' }}>
      <Link to={`/product/${product.id}`} style={{ flexShrink: 0, width: 120, height: 150, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--color-neutral-100)' }}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </Link>
      <div style={{ flex: 1 }}>
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-blue-muted)', marginBottom: '0.25rem' }}>{product.category}</p>
        <Link to={`/product/${product.id}`}><h3 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>{product.name}</h3></Link>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-neutral-500)', lineHeight: 1.55, marginBottom: '0.75rem' }}>{product.description?.slice(0, 100)}...</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 700, fontSize: '1.0625rem', color: 'var(--color-navy)' }}>₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice && <span style={{ fontSize: '0.875rem', color: 'var(--color-neutral-400)', textDecoration: 'line-through' }}>₹{product.originalPrice.toLocaleString('en-IN')}</span>}
          <button onClick={() => addToCart(product)} className="btn-primary" style={{ padding: '0.5rem 1.125rem', fontSize: '0.875rem' }}>Add to Cart</button>
          <button onClick={() => toggleWishlist(product.id)} style={{ color: wishlisted ? '#EF4444' : 'var(--color-neutral-400)' }}>
            <Heart size={18} fill={wishlisted ? '#EF4444' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  )
}
