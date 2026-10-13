import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star, ChevronDown, Truck, RefreshCw, ShieldCheck, Share2, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react'
import { PRODUCTS } from '../data/products'
import { useStore } from '../context/StoreContext'
import ProductCard from '../components/ProductCard'

function formatPrice(p: number) {
  return `₹${p.toLocaleString('en-IN')}`
}

export default function ProductPage() {
  const { id } = useParams<{ id: string }>()
  const product = PRODUCTS.find(p => p.id === id)
  const { addToCart, toggleWishlist, isInWishlist } = useStore()

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(product?.colors?.[0] || null)
  const [quantity, setQuantity] = useState(1)
  const [imageIdx, setImageIdx] = useState(0)
  const [openAccordion, setOpenAccordion] = useState<string | null>('details')

  if (!product) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-navy)' }}>Product Not Found</h2>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    )
  }

  const colorVariantImage = selectedColor && product?.colorImages?.[selectedColor]
  const baseImages = [product.image, ...(product.secondaryImage ? [product.secondaryImage] : [])]
  const images = colorVariantImage
    ? [colorVariantImage, ...baseImages.filter(img => img !== colorVariantImage)]
    : baseImages
  const wishlisted = isInWishlist(product.id)
  const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : null
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addToCart(product, selectedSize || product.sizes?.[0], selectedColor || undefined)
  }

  const accordions = [
    {
      id: 'details',
      title: 'Product Details',
      content: product.description || 'Premium quality medical workwear, crafted with care.',
    },
    {
      id: 'fabric',
      title: 'Fabric & Care',
      content: 'Made from 60% Cotton, 35% Polyester, 5% Spandex. Anti-wrinkle, anti-fade, moisture-wicking. Machine wash at 40°C. Do not bleach. Tumble dry low.',
    },
    {
      id: 'sizing',
      title: 'Size & Fit',
      content: 'This product fits true to size. We recommend ordering your usual size. For the perfect fit, please refer to our size guide. Available in XS–3XL.',
    },
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: 'Free delivery on orders above ₹999. Standard delivery: 3–5 working days. Express: 1–2 days (₹99 extra). Easy 15-day exchanges. No questions asked.',
    },
  ]

  return (
    <div style={{ background: 'white', minHeight: '80vh' }}>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--color-blue-pale)', borderBottom: '1px solid var(--color-blue-light)', padding: '0.875rem 0' }}>
        <div className="container-site">
          <nav style={{ fontSize: '0.8125rem', color: 'var(--color-neutral-400)', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <Link to="/" style={{ color: 'inherit' }}>Home</Link>
            <span>/</span>
            <Link to="/shop" style={{ color: 'inherit' }}>Shop</Link>
            <span>/</span>
            <Link to={`/collections/${product.category}`} style={{ color: 'inherit', textTransform: 'capitalize' }}>{product.category.replace('-', ' ')}</Link>
            <span>/</span>
            <span style={{ color: 'var(--color-navy)' }}>{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container-site" style={{ paddingBlock: '2.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', alignItems: 'flex-start' }}>
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div style={{ position: 'relative', borderRadius: 'var(--radius-xl)', overflow: 'hidden', background: 'var(--color-neutral-100)', aspectRatio: '3/4', marginBottom: '0.75rem' }}>
              <img
                src={images[imageIdx]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'opacity 0.35s ease' }}
              />

              {/* Badge */}
              {product.badge && (
                <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                  <span className={`badge badge-${product.badge}`} style={{ fontSize: '0.75rem', padding: '0.3rem 0.75rem' }}>
                    {product.badge === 'bestseller' ? 'Best Seller' : product.badge === 'new' ? 'New Arrival' : `${discount}% OFF`}
                  </span>
                </div>
              )}

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: wishlisted ? '#EF4444' : 'var(--color-neutral-500)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  transition: 'transform 0.2s var(--ease-premium)',
                }}
              >
                <Heart size={18} fill={wishlisted ? '#EF4444' : 'none'} />
              </button>

              {/* Nav */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => setImageIdx(i => (i - 1 + images.length) % images.length)}
                    style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={() => setImageIdx(i => (i + 1) % images.length)}
                    style={{ position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImageIdx(i)}
                  style={{
                    width: 72, height: 88, borderRadius: 'var(--radius-md)', overflow: 'hidden',
                    border: `2px solid ${imageIdx === i ? 'var(--color-navy)' : 'var(--color-neutral-200)'}`,
                    transition: 'border-color 0.2s ease',
                    flexShrink: 0,
                  }}
                >
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div style={{ position: 'sticky', top: '90px' }}>
            {/* Category */}
            <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-blue-muted)', marginBottom: '0.5rem' }}>
              {product.category.replace('-', ' ')}
            </p>

            {/* Name */}
            <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'var(--color-navy)', lineHeight: 1.2, marginBottom: '0.875rem', letterSpacing: '-0.025em' }}>
              {product.name}
            </h1>

            {/* Rating */}
            {product.rating && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', marginBottom: '1.125rem' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {[1,2,3,4,5].map(s => (
                    <Star
                      key={s}
                      size={15}
                      fill={s <= Math.round(product.rating!) ? 'var(--color-accent-gold)' : 'none'}
                      stroke={s <= Math.round(product.rating!) ? 'var(--color-accent-gold)' : 'var(--color-neutral-300)'}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.875rem', color: 'var(--color-neutral-500)', fontWeight: 500 }}>
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', padding: '1rem', background: 'var(--color-blue-pale)', borderRadius: 'var(--radius-md)' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--color-navy)', letterSpacing: '-0.03em' }}>
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span style={{ fontSize: '1rem', color: 'var(--color-neutral-400)', textDecoration: 'line-through', fontWeight: 400 }}>
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span style={{ background: '#16A34A', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.625rem', borderRadius: 100 }}>
                    {discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Colors */}
            {product.colors && (
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-neutral-700)' }}>Colour</label>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => {
                        setSelectedColor(color)
                        setImageIdx(0)
                      }}
                      title={color}
                      style={{
                        width: 28, height: 28, borderRadius: '50%',
                        background: color,
                        border: selectedColor === color ? '3px solid var(--color-navy)' : '2px solid rgba(0,0,0,0.12)',
                        boxShadow: selectedColor === color ? '0 0 0 2px white inset' : 'none',
                        transition: 'border-color 0.15s, box-shadow 0.15s',
                        cursor: 'pointer',
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
                  <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-neutral-700)' }}>
                    Size {selectedSize && <span style={{ fontWeight: 500, color: 'var(--color-blue-muted)' }}>— {selectedSize}</span>}
                  </label>
                  <Link to="/size-guide" style={{ fontSize: '0.8125rem', color: 'var(--color-medical-blue)', fontWeight: 600 }}>Size Guide</Link>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '0.5rem 0.875rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1.5px solid',
                        borderColor: selectedSize === size ? 'var(--color-navy)' : 'var(--color-neutral-200)',
                        background: selectedSize === size ? 'var(--color-navy)' : 'white',
                        color: selectedSize === size ? 'white' : 'var(--color-neutral-600)',
                        fontSize: '0.875rem', fontWeight: 600,
                        transition: 'all 0.15s ease',
                        cursor: 'pointer',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                {!selectedSize && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-error)', marginTop: '0.375rem', fontWeight: 500 }}>
                    Please select a size
                  </p>
                )}
              </div>
            )}

            {/* Quantity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-neutral-700)' }}>Qty</label>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-neutral-200)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-600)', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-neutral-100)')}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}
                >
                  <Minus size={14} />
                </button>
                <span style={{ width: 40, textAlign: 'center', fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-navy)' }}>{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-600)', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--color-neutral-100)')}
                  onMouseLeave={e => (e.currentTarget.style.background = '')}
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <button
                onClick={handleAddToCart}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '0.9375rem', fontSize: '1rem' }}
              >
                <ShoppingBag size={18} />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                style={{
                  width: 50, height: 50, borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--color-neutral-200)',
                  background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: wishlisted ? '#EF4444' : 'var(--color-neutral-400)',
                  flexShrink: 0,
                  transition: 'all 0.2s ease',
                }}
              >
                <Heart size={20} fill={wishlisted ? '#EF4444' : 'none'} />
              </button>
              <button
                style={{
                  width: 50, height: 50, borderRadius: 'var(--radius-md)',
                  border: '1.5px solid var(--color-neutral-200)',
                  background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--color-neutral-400)',
                  flexShrink: 0,
                }}
              >
                <Share2 size={18} />
              </button>
            </div>

            {/* Trust badges */}
            <div style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--color-neutral-50)', borderRadius: 'var(--radius-md)', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {[
                { icon: Truck, label: 'Free delivery above ₹999' },
                { icon: RefreshCw, label: '15-day easy exchange' },
                { icon: ShieldCheck, label: 'Genuine quality assured' },
              ].map(b => (
                <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8125rem', color: 'var(--color-neutral-600)', fontWeight: 500 }}>
                  <b.icon size={14} style={{ color: 'var(--color-medical-blue)', flexShrink: 0 }} />
                  {b.label}
                </div>
              ))}
            </div>

            {/* Accordions */}
            <div style={{ borderTop: '1px solid var(--color-neutral-200)' }}>
              {accordions.map(acc => (
                <div key={acc.id} style={{ borderBottom: '1px solid var(--color-neutral-200)' }}>
                  <button
                    onClick={() => setOpenAccordion(openAccordion === acc.id ? null : acc.id)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '1rem 0', background: 'none', cursor: 'pointer',
                      fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-navy)',
                    }}
                  >
                    {acc.title}
                    <ChevronDown
                      size={16}
                      style={{
                        transition: 'transform 0.25s ease',
                        transform: openAccordion === acc.id ? 'rotate(180deg)' : 'none',
                        color: 'var(--color-neutral-400)',
                      }}
                    />
                  </button>
                  <div style={{
                    maxHeight: openAccordion === acc.id ? '300px' : 0,
                    overflow: 'hidden',
                    transition: 'max-height 0.35s var(--ease-premium)',
                  }}>
                    <p style={{ paddingBottom: '1rem', fontSize: '0.9rem', color: 'var(--color-neutral-600)', lineHeight: 1.7 }}>
                      {acc.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: '4rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <div className="section-divider" />
                <h2 className="text-section" style={{ color: 'var(--color-navy)' }}>You May Also Like</h2>
              </div>
              <Link to={`/collections/${product.category}`} className="btn-ghost">
                See All <ChevronRight size={15} />
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))', gap: '1.25rem' }}>
              {related.map((p, i) => (
                <div key={p.id} style={{ animation: `revealUp 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both` }}>
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
