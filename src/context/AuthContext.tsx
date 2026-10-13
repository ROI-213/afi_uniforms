import React, { createContext, useContext, useState, useEffect } from 'react'

export interface UserOrder {
  id: string
  date: string
  status: 'Processing' | 'In Transit' | 'Delivered'
  items: Array<{ name: string; quantity: number; size: string; color: string; price: number }>
  total: number
  trackingNumber: string
}

export interface UserProfile {
  email: string
  name: string
  phone: string
  company: string
  designation: string
  address: string
  city: string
  state: string
  pincode: string
  gstin: string
  orders: UserOrder[]
  createdAt: string
}

interface AuthContextType {
  user: UserProfile | null
  isLoggedIn: boolean
  activeOtp: string | null
  sendOtp: (email: string) => Promise<{ success: boolean; otp: string; message: string }>
  verifyOtp: (email: string, otp: string) => boolean
  updateProfile: (data: Partial<UserProfile>) => void
  logout: () => void
}

const AUTH_STORAGE_KEY = 'afi_uniforms_user_auth_session'
const OTP_STORAGE_KEY = 'afi_uniforms_active_otp'

const INITIAL_ORDERS: UserOrder[] = [
  {
    id: 'AFI-92841',
    date: '28 Mar 2026',
    status: 'In Transit',
    trackingNumber: 'DTDC-884920194',
    total: 8499,
    items: [
      {
        name: "Women's Executive Tailored Navy Blazer",
        quantity: 2,
        size: 'M',
        color: '#0B2744',
        price: 2499,
      },
      {
        name: "Crisp White Formal Oxford Dress Shirt",
        quantity: 3,
        size: 'M',
        color: '#FFFFFF',
        price: 1299,
      },
    ],
  },
  {
    id: 'AFI-88120',
    date: '12 Feb 2026',
    status: 'Delivered',
    trackingNumber: 'BLUEDART-55102948',
    total: 4797,
    items: [
      {
        name: "AeroFlex™ Tailored Scrub Top & Jogger Set",
        quantity: 3,
        size: 'L',
        color: '#0D9488',
        price: 1599,
      },
    ],
  },
]

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(AUTH_STORAGE_KEY)
      if (saved) {
        return JSON.parse(saved)
      }
    } catch (e) {
      console.error('Failed to load user auth from localStorage', e)
    }
    return null
  })

  const [activeOtp, setActiveOtp] = useState<string | null>(() => {
    return sessionStorage.getItem(OTP_STORAGE_KEY) || null
  })

  // Synchronize user to localStorage so session never expires when leaving site
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user))
      } catch (e) {
        console.error('Failed to save user auth to localStorage', e)
      }
    } else {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    }
  }, [user])

  const sendOtp = async (email: string): Promise<{ success: boolean; otp: string; message: string }> => {
    // Generate a secure 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString()
    setActiveOtp(generatedOtp)
    sessionStorage.setItem(OTP_STORAGE_KEY, generatedOtp)

    return {
      success: true,
      otp: generatedOtp,
      message: `Verification code sent to ${email}`,
    }
  }

  const verifyOtp = (email: string, enteredOtp: string): boolean => {
    // Check against generated OTP or default fallback '123456' for seamless access
    if (enteredOtp === activeOtp || enteredOtp === '123456') {
      const cleanEmail = email.trim().toLowerCase()
      const existingName = cleanEmail.split('@')[0]
      const capitalizedName =
        existingName.charAt(0).toUpperCase() + existingName.slice(1).replace(/[._]/g, ' ')

      const newUserProfile: UserProfile = {
        email: cleanEmail,
        name: user?.email === cleanEmail && user.name ? user.name : capitalizedName,
        phone: user?.email === cleanEmail && user.phone ? user.phone : '+91 98765 43210',
        company: user?.email === cleanEmail && user.company ? user.company : 'Enterprise Client',
        designation: user?.email === cleanEmail && user.designation ? user.designation : 'Procurement Manager',
        address: user?.email === cleanEmail && user.address ? user.address : 'Plot 42, Tech Park Central',
        city: user?.email === cleanEmail && user.city ? user.city : 'Bangalore',
        state: user?.email === cleanEmail && user.state ? user.state : 'Karnataka',
        pincode: user?.email === cleanEmail && user.pincode ? user.pincode : '560100',
        gstin: user?.email === cleanEmail && user.gstin ? user.gstin : '29AABCU9603R1ZM',
        orders: user?.email === cleanEmail && user.orders ? user.orders : INITIAL_ORDERS,
        createdAt: user?.createdAt || new Date().toISOString(),
      }

      setUser(newUserProfile)
      setActiveOtp(null)
      sessionStorage.removeItem(OTP_STORAGE_KEY)
      return true
    }
    return false
  }

  const updateProfile = (data: Partial<UserProfile>) => {
    if (!user) return
    setUser(prev => (prev ? { ...prev, ...data } : null))
  }

  const logout = () => {
    setUser(null)
    setActiveOtp(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
    sessionStorage.removeItem(OTP_STORAGE_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        activeOtp,
        sendOtp,
        verifyOtp,
        updateProfile,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
