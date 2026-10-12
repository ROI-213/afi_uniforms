import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { PRODUCTS } from '../data/products'
import ProductCard from '../components/ProductCard'

export default function WishlistPage() {
  const { wishlist } = useStore()
  const wishlistProducts = PRODUCTS.filter(p => wishlist.includes(p.id))

  return (
    <div style={{ background: 'white', minHeight: '80vh' }}>
      <div style={{ background: 'var(--color-blue-pale)', borderBottom: '1px solid var(--color-blue-light)', padding: '1.5rem 0' }}>
        <div className="container-site">
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-navy)' }}>
            My Wishlist <span style={{ fontSize: '1rem', fontWeight: 500, color: 'var(--color-neutral-400)' }}>({wishlistProducts.length})</span>
          </h1>
        </div>
      </div>

      <div className="container-site" style={{ paddingBlock: '2.5rem' }}>
        {wishlistProducts.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '5rem 2rem', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--color-blue-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={36} style={{ color: 'var(--color-blue-muted)' }} />
            </div>
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.5rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Your Wishlist is Empty</h2>
              <p style={{ color: 'var(--color-neutral-500)', fontSize: '0.9rem' }}>Save your favourite items here to revisit them anytime.</p>
            </div>
            <Link to="/shop" className="btn-primary">
              Explore Products <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
            {wishlistProducts.map((product, i) => (
              <div key={product.id} style={{ animation: `revealUp 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 60}ms both` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
