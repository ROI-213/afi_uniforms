import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react'
import type { Product } from '../context/StoreContext'
import { useStore } from '../context/StoreContext'

interface ProductCardProps {
  product: Product
  style?: React.CSSProperties
}

function formatPrice(p: number) {
  return `₹${p.toLocaleString('en-IN')}`
}

export default function ProductCard({ product, style }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useStore()
  const [hoveredSize, setHoveredSize] = useState<string | null>(null)
  const [isHovered, setIsHovered] = useState(false)
  const wishlisted = isInWishlist(product.id)

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div
      className="product-card"
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image */}
      <div className="product-card-image">
        <Link to={`/product/${product.id}`} aria-label={product.name}>
          <img
            src={product.image}
            alt={product.name}
            className="primary"
            loading="lazy"
          />
          {product.secondaryImage && (
            <img
              src={product.secondaryImage}
              alt={`${product.name} — alternate view`}
              className="secondary"
            />
          )}
        </Link>

        {/* Badge */}
        {product.badge && (
          <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem' }}>
            <span className={`badge badge-${product.badge}`}>
              {product.badge === 'bestseller' ? 'Best Seller' : product.badge === 'new' ? 'New' : `${discount}% OFF`}
            </span>
          </div>
        )}

        {/* Wishlist */}
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute', top: '0.75rem', right: '0.75rem',
            width: 34, height: 34, borderRadius: '50%',
            background: 'rgba(255,255,255,0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: wishlisted ? '#EF4444' : 'var(--color-neutral-500)',
            transition: 'transform 0.2s var(--ease-premium), color 0.15s ease',
            transform: isHovered ? 'scale(1)' : 'scale(0.85)',
            opacity: isHovered ? 1 : 0.7,
          }}
        >
          <Heart size={16} fill={wishlisted ? '#EF4444' : 'none'} />
        </button>

        {/* Quick View */}
        <Link
          to={`/product/${product.id}`}
          style={{
            position: 'absolute', bottom: '0.75rem', left: '50%',
            transform: `translateX(-50%) translateY(${isHovered ? 0 : 8}px)`,
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.3s var(--ease-premium)',
            background: 'rgba(255,255,255,0.92)',
            backdropFilter: 'blur(8px)',
            padding: '0.375rem 0.875rem',
            borderRadius: '100px',
            fontSize: '0.75rem', fontWeight: 600,
            color: 'var(--color-navy)',
            whiteSpace: 'nowrap',
            display: 'flex', alignItems: 'center', gap: '0.25rem',
          }}
        >
          <Eye size={12} /> Quick View
        </Link>
      </div>

      {/* Info */}
      <div style={{ padding: '0.875rem 1rem 1rem' }}>
        {/* Category */}
        <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-blue-muted)', marginBottom: '0.25rem' }}>
          {product.category.replace('-', ' ')}
        </p>

        {/* Name */}
        <Link to={`/product/${product.id}`}>
          <h3 style={{ fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-neutral-800)', lineHeight: 1.35, marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        {product.rating && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', marginBottom: '0.625rem' }}>
            <div style={{ display: 'flex', gap: '1px' }}>
              {[1,2,3,4,5].map(s => (
                <Star
                  key={s}
                  size={11}
                  fill={s <= Math.round(product.rating!) ? 'var(--color-accent-gold)' : 'none'}
                  stroke={s <= Math.round(product.rating!) ? 'var(--color-accent-gold)' : 'var(--color-neutral-300)'}
                />
              ))}
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--color-neutral-400)', fontWeight: 500 }}>
              ({product.reviewCount})
            </span>
          </div>
        )}

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.625rem' }}>
            {product.colors.slice(0, 5).map(color => (
              <div
                key={color}
                style={{
                  width: 14, height: 14, borderRadius: '50%',
                  background: color,
                  border: '1.5px solid rgba(0,0,0,0.12)',
                }}
              />
            ))}
            {product.colors.length > 5 && (
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-neutral-400)', fontWeight: 500, marginLeft: 2 }}>+{product.colors.length - 5}</span>
            )}
          </div>
        )}

        {/* Price */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
          <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-navy)', fontFamily: 'var(--font-display)' }}>
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span style={{ fontSize: '0.8125rem', color: 'var(--color-neutral-400)', textDecoration: 'line-through', fontWeight: 400 }}>
              {formatPrice(product.originalPrice)}
            </span>
          )}
          {discount && (
            <span style={{ fontSize: '0.75rem', color: '#16A34A', fontWeight: 700 }}>
              {discount}% off
            </span>
          )}
        </div>

        {/* Sizes hover strip */}
        {product.sizes && (
          <div
            style={{
              display: 'flex', gap: '0.25rem', marginBottom: '0.75rem',
              opacity: isHovered ? 1 : 0,
              transform: `translateY(${isHovered ? 0 : 4}px)`,
              transition: 'all 0.3s var(--ease-premium)',
            }}
          >
            {product.sizes.slice(0, 6).map(size => (
              <button
                key={size}
                onMouseEnter={() => setHoveredSize(size)}
                onMouseLeave={() => setHoveredSize(null)}
                onClick={() => addToCart(product, size)}
                style={{
                  padding: '0.2rem 0.5rem',
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: hoveredSize === size ? 'var(--color-navy)' : 'var(--color-neutral-200)',
                  background: hoveredSize === size ? 'var(--color-navy)' : 'transparent',
                  color: hoveredSize === size ? 'white' : 'var(--color-neutral-500)',
                  fontSize: '0.6875rem', fontWeight: 600,
                  transition: 'all 0.15s ease',
                  cursor: 'pointer',
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Add to Cart */}
        <button
          onClick={() => addToCart(product)}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: '0.625rem 1rem', fontSize: '0.875rem' }}
        >
          <ShoppingBag size={15} />
          Add to Cart
        </button>
      </div>
    </div>
  )
}
