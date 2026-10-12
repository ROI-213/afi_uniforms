import React, { createContext, useContext, useState, useCallback } from 'react'

export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  secondaryImage?: string
  category: string
  collection?: string
  badge?: 'new' | 'sale' | 'bestseller' | 'featured'
  salesCount?: number
  publishedAt?: string
  colors?: string[]
  sizes?: string[]
  description?: string
  rating?: number
  reviewCount?: number
  sku?: string
}

interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface StoreContextType {
  cart: CartItem[]
  wishlist: string[]
  addToCart: (product: Product, size?: string, color?: string) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  toggleWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  cartCount: number
  cartTotal: number
  isCartOpen: boolean
  setCartOpen: (open: boolean) => void
}

const StoreContext = createContext<StoreContextType | null>(null)

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isCartOpen, setCartOpen] = useState(false)

  const addToCart = useCallback((product: Product, size?: string, color?: string) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === product.id && i.selectedSize === size)
      if (existing) {
        return prev.map(i =>
          i.id === product.id && i.selectedSize === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size, selectedColor: color }]
    })
    setCartOpen(true)
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setCart(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity } : i))
  }, [removeFromCart])

  const toggleWishlist = useCallback((id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(w => w !== id) : [...prev, id])
  }, [])

  const isInWishlist = useCallback((id: string) => wishlist.includes(id), [wishlist])

  const cartCount = cart.reduce((acc, i) => acc + i.quantity, 0)
  const cartTotal = cart.reduce((acc, i) => acc + i.price * i.quantity, 0)

  return (
    <StoreContext.Provider value={{
      cart, wishlist, addToCart, removeFromCart, updateQuantity,
      toggleWishlist, isInWishlist, cartCount, cartTotal, isCartOpen, setCartOpen
    }}>
      {children}
    </StoreContext.Provider>
  )
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used within StoreProvider')
  return ctx
}
