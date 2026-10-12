import { Link } from 'react-router-dom'
import { ArrowRight, Minus, Plus, X, ShoppingBag, Truck, RefreshCw, MessageCircle } from 'lucide-react'
import { useStore } from '../context/StoreContext'

function formatPrice(p: number) {
  return `₹${p.toLocaleString('en-IN')}`
}

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore()

  if (cart.length === 0) {
    return (
      <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-blue-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShoppingBag size={36} style={{ color: 'var(--color-blue-muted)' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Your Cart is Empty</h2>
          <p style={{ color: 'var(--color-neutral-500)', fontSize: '0.9rem' }}>Discover premium medical uniforms and add them to your cart.</p>
        </div>
        <Link to="/shop" className="btn-primary">
          Start Shopping <ArrowRight size={16} />
        </Link>
      </div>
    )
  }

  const shipping = cartTotal >= 999 ? 0 : 99
  const total = cartTotal + shipping

  return (
    <div style={{ background: 'white', minHeight: '80vh' }}>
      <div style={{ background: 'var(--color-blue-pale)', borderBottom: '1px solid var(--color-blue-light)', padding: '1.5rem 0' }}>
        <div className="container-site">
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-navy)' }}>
            Shopping Cart <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-neutral-400)' }}>({cart.length} item{cart.length !== 1 ? 's' : ''})</span>
          </h1>
        </div>
      </div>

      <div className="container-site" style={{ paddingBlock: '2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', alignItems: 'flex-start' }}>
          {/* Cart Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {cart.map(item => (
              <div
                key={`${item.id}-${item.selectedSize}`}
                style={{
                  display: 'flex', gap: '1.25rem', padding: '1.25rem',
                  border: '1.5px solid var(--color-neutral-100)',
                  borderRadius: 'var(--radius-lg)',
                  background: 'white',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'box-shadow 0.25s ease',
                }}
              >
                {/* Image */}
                <Link to={`/product/${item.id}`} style={{ flexShrink: 0, width: 100, height: 120, borderRadius: 'var(--radius-md)', overflow: 'hidden', background: 'var(--color-neutral-100)' }}>
                  <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Link>

                {/* Details */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <div>
                      <p style={{ fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: 'var(--color-blue-muted)', marginBottom: '0.25rem' }}>
                        {item.category.replace('-', ' ')}
                      </p>
                      <Link to={`/product/${item.id}`}>
                        <h3 style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--color-navy)', lineHeight: 1.3, marginBottom: '0.375rem' }}>{item.name}</h3>
                      </Link>
                      {item.selectedSize && (
                        <p style={{ fontSize: '0.8125rem', color: 'var(--color-neutral-400)', fontWeight: 500 }}>Size: {item.selectedSize}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{ color: 'var(--color-neutral-300)', flexShrink: 0, transition: 'color 0.15s' }}
                      onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-error)')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-neutral-300)')}
                      aria-label="Remove item"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.875rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {/* Qty */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--color-neutral-200)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-600)' }}
                      >
                        <Minus size={12} />
                      </button>
                      <span style={{ width: 32, textAlign: 'center', fontWeight: 700, fontSize: '0.875rem', color: 'var(--color-navy)' }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-neutral-600)' }}
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Price */}
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--color-navy)', fontFamily: 'var(--font-display)' }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      {item.quantity > 1 && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-400)' }}>
                          {formatPrice(item.price)} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link to="/shop" className="btn-ghost" style={{ alignSelf: 'flex-start', marginTop: '0.5rem' }}>
              ← Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div style={{ border: '1.5px solid var(--color-neutral-100)', borderRadius: 'var(--radius-xl)', padding: '1.75rem', boxShadow: 'var(--shadow-card)' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-navy)', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
                Order Summary
              </h2>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-neutral-600)' }}>
                  <span>Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
                  <span style={{ fontWeight: 600 }}>{formatPrice(cartTotal)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: 'var(--color-neutral-600)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                    <Truck size={14} style={{ color: shipping === 0 ? '#16A34A' : 'inherit' }} />
                    Shipping
                  </span>
                  <span style={{ fontWeight: 600, color: shipping === 0 ? '#16A34A' : 'inherit' }}>
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                {shipping > 0 && (
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-neutral-400)', background: 'var(--color-blue-pale)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    Add {formatPrice(999 - cartTotal)} more for free delivery
                  </p>
                )}
              </div>

              <div style={{ borderTop: '1.5px solid var(--color-neutral-100)', paddingTop: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 800, fontSize: '1.0625rem', color: 'var(--color-navy)' }}>Total</span>
                  <span style={{ fontWeight: 800, fontSize: '1.25rem', color: 'var(--color-navy)', fontFamily: 'var(--font-display)' }}>{formatPrice(total)}</span>
                </div>
                <p style={{ fontSize: '0.75rem', color: 'var(--color-neutral-400)', marginTop: '0.25rem' }}>Including all taxes</p>
              </div>

              {/* Promo code */}
              <div style={{ display: 'flex', gap: '0.625rem', marginBottom: '1.25rem' }}>
                <input
                  type="text"
                  placeholder="Promo code"
                  className="input-field"
                  style={{ flex: 1 }}
                />
                <button className="btn-secondary" style={{ padding: '0.75rem 1rem', fontSize: '0.875rem', whiteSpace: 'nowrap' }}>
                  Apply
                </button>
              </div>

              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '1rem', marginBottom: '0.75rem' }}>
                Proceed to Checkout <ArrowRight size={17} />
              </button>

              <a
                href="https://wa.me/919999999999?text=Hi%2C%20I%20want%20to%20complete%20my%20order"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                  width: '100%', padding: '0.875rem',
                  border: '1.5px solid #25D366', borderRadius: 'var(--radius-md)',
                  color: '#25D366', fontWeight: 600, fontSize: '0.9375rem',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#25D366'; (e.currentTarget as HTMLElement).style.color = 'white' }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = ''; (e.currentTarget as HTMLElement).style.color = '#25D366' }}
              >
                <MessageCircle size={17} /> Order via WhatsApp
              </a>

              {/* Trust */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1.25rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { icon: RefreshCw, label: 'Easy Returns' },
                  { icon: Truck, label: 'Fast Delivery' },
                ].map(b => (
                  <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--color-neutral-500)' }}>
                    <b.icon size={12} />
                    {b.label}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
