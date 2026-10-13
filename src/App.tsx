import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { StoreProvider } from './context/StoreContext'
import Header from './components/Header'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import ShopPage from './pages/ShopPage'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import BulkOrdersPage from './pages/BulkOrdersPage'
import WomenCategoryPage from './pages/WomenCategoryPage'
import MenCategoryPage from './pages/MenCategoryPage'

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [pathname])
  return null
}

// Page transition wrapper
function PageWrapper({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation()
  return (
    <div
      key={pathname}
      style={{
        animation: 'revealFade 0.4s cubic-bezier(0.22,1,0.36,1) both',
        minHeight: '70vh',
      }}
    >
      {children}
    </div>
  )
}

function AppInner() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <ScrollToTop />
        <PageWrapper>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/women" element={<WomenCategoryPage />} />
            <Route path="/men" element={<MenCategoryPage />} />
            <Route path="/new-arrivals" element={<ShopPage />} />
            <Route path="/bestsellers" element={<ShopPage />} />
            <Route path="/plus-size" element={<WomenCategoryPage defaultCategory="plussize" />} />
            <Route path="/collections" element={<ShopPage />} />
            <Route path="/collections/:category" element={<CollectionRoute />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/bulk-orders" element={<BulkOrdersPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageWrapper>
      </main>
      <Footer />
    </div>
  )
}

function CollectionRoute() {
  const { pathname } = useLocation()
  const category = pathname.split('/').pop()
  return <ShopPage category={category} />
}

function NotFound() {
  return (
    <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', padding: '2rem', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'var(--color-blue-light)', lineHeight: 1 }}>404</div>
      <div>
        <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.75rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>Page Not Found</h1>
        <p style={{ color: 'var(--color-neutral-500)', maxWidth: 380 }}>The page you're looking for doesn't exist or may have moved.</p>
      </div>
      <a href="/" className="btn-primary">Return Home</a>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppInner />
      </StoreProvider>
    </BrowserRouter>
  )
}
