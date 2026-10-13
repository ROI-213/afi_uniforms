import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  User,
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  LogOut,
  Package,
  Building,
  MapPin,
  Check,
  ShoppingBag,
  Heart,
  Save,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useStore } from '../context/StoreContext'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function formatPrice(p: number) {
  return `₹${p.toLocaleString('en-IN')}`
}

export default function AccountPage() {
  const { user, isLoggedIn, sendOtp, verifyOtp, updateProfile, logout, activeOtp } = useAuth()
  const { cartCount, wishlist } = useStore()

  // Login flow state
  const [email, setEmail] = useState('')
  const [otpStage, setOtpStage] = useState<'email' | 'otp'>('email')
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', ''])
  const [otpError, setOtpError] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [resendSeconds, setResendSeconds] = useState(30)
  const [rememberMe, setRememberMe] = useState(true)
  const [demoBannerOtp, setDemoBannerOtp] = useState<string | null>(null)

  // Account dashboard tabs
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'profile' | 'addresses'>('overview')

  // Profile edit form state
  const [profileForm, setProfileForm] = useState({
    name: '',
    phone: '',
    company: '',
    designation: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    gstin: '',
  })
  const [profileSaved, setProfileSaved] = useState(false)

  // Ref for OTP inputs
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Rehydrate profile form when user changes
  useEffect(() => {
    if (user) {
      setProfileForm({
        name: user.name || '',
        phone: user.phone || '',
        company: user.company || '',
        designation: user.designation || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        pincode: user.pincode || '',
        gstin: user.gstin || '',
      })
    }
  }, [user])

  // Timer countdown for resend
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>
    if (otpStage === 'otp' && resendSeconds > 0) {
      timer = setInterval(() => {
        setResendSeconds(s => s - 1)
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [otpStage, resendSeconds])

  // Send OTP handler
  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (!email || !email.includes('@')) {
      setOtpError('Please enter a valid email address.')
      return
    }

    setOtpError('')
    setIsSending(true)

    try {
      const res = await sendOtp(email.trim())
      setDemoBannerOtp(res.otp)
      setOtpStage('otp')
      setResendSeconds(30)
      setOtpDigits(['', '', '', '', '', ''])
      // Auto-focus first input
      setTimeout(() => {
        otpInputRefs.current[0]?.focus()
      }, 100)
    } catch {
      setOtpError('Failed to send verification code. Please try again.')
    } finally {
      setIsSending(false)
    }
  }

  // Handle OTP digit changes
  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) {
      // Paste handling
      const pasted = val.slice(0, 6).split('')
      const newDigits = [...otpDigits]
      pasted.forEach((char, i) => {
        if (i < 6) newDigits[i] = char
      })
      setOtpDigits(newDigits)
      if (pasted.length === 6) {
        verifyCode(newDigits.join(''))
      }
      return
    }

    const newDigits = [...otpDigits]
    newDigits[index] = val
    setOtpDigits(newDigits)
    setOtpError('')

    // Move to next input if single digit typed
    if (val && index < 5) {
      otpInputRefs.current[index + 1]?.focus()
    }

    // Auto submit if all 6 filled
    if (val && index === 5 && newDigits.every(d => d !== '')) {
      verifyCode(newDigits.join(''))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }
  }

  // Verify OTP handler
  const verifyCode = (enteredCode: string) => {
    setIsVerifying(true)
    setOtpError('')

    setTimeout(() => {
      const success = verifyOtp(email, enteredCode)
      if (!success) {
        setOtpError('Invalid verification code. Please check the code and try again.')
        setIsVerifying(false)
      } else {
        setIsVerifying(false)
      }
    }, 500)
  }

  const handleManualVerify = (e: React.FormEvent) => {
    e.preventDefault()
    const entered = otpDigits.join('')
    if (entered.length < 6) {
      setOtpError('Please enter all 6 digits of the verification code.')
      return
    }
    verifyCode(entered)
  }

  const handleAutofillDemoOtp = () => {
    const code = demoBannerOtp || activeOtp || '123456'
    setOtpDigits(code.split(''))
    verifyCode(code)
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(profileForm)
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 2000)
  }

  // ═════════════════════════════════════════════════════════════
  // VIEW 1: NOT LOGGED IN (EMAIL + OTP AUTHENTICATION)
  // ═════════════════════════════════════════════════════════════
  if (!isLoggedIn || !user) {
    return (
      <div
        style={{
          minHeight: '85vh',
          background: 'linear-gradient(180deg, #EDF4FD 0%, #FAFBFD 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2.5rem 1rem',
        }}
      >
        <div
          style={{
            maxWidth: 460,
            width: '100%',
            background: 'white',
            borderRadius: 22,
            boxShadow: '0 20px 60px rgba(11, 39, 68, 0.12), 0 4px 16px rgba(11, 39, 68, 0.04)',
            border: '1px solid rgba(11, 39, 68, 0.08)',
            overflow: 'hidden',
          }}
        >
          {/* Header Banner */}
          <div
            style={{
              background: '#0B2744',
              color: 'white',
              padding: '2rem 2rem 1.75rem',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
              }}
            >
              <User size={24} style={{ color: '#38BDF8' }} />
            </div>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.45rem',
                letterSpacing: '-0.02em',
                marginBottom: '0.35rem',
              }}
            >
              AFI Client Account Login
            </h1>

            <p style={{ fontSize: '0.82rem', color: '#94A3B8', maxWidth: 340, margin: '0 auto' }}>
              Sign in with your email address using a secure 6-digit one-time verification password.
            </p>
          </div>

          {/* Form Area */}
          <div style={{ padding: '2rem' }}>
            {otpStage === 'email' ? (
              /* ── STAGE 1: ENTER EMAIL ── */
              <form onSubmit={handleSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: '#0B2744',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Your Email Address *
                  </label>
                  <div style={{ position: 'relative' }}>
                    <Mail
                      size={18}
                      style={{
                        position: 'absolute',
                        left: '0.9rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#64748B',
                      }}
                    />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value)
                        setOtpError('')
                      }}
                      placeholder="e.g. procurement@organization.com"
                      style={{
                        width: '100%',
                        padding: '0.78rem 1rem 0.78rem 2.6rem',
                        borderRadius: 12,
                        border: '1.5px solid rgba(11, 39, 68, 0.15)',
                        fontSize: '0.9rem',
                        color: '#0B2744',
                        fontWeight: 600,
                        outline: 'none',
                        transition: `border-color 0.2s ease`,
                      }}
                    />
                  </div>
                </div>

                {otpError && (
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: '#EF4444',
                      background: '#FEF2F2',
                      padding: '0.55rem 0.85rem',
                      borderRadius: 8,
                      border: '1px solid #FCA5A5',
                    }}
                  >
                    {otpError}
                  </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={e => setRememberMe(e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: '#146EF5', cursor: 'pointer' }}
                  />
                  <label
                    htmlFor="remember"
                    style={{ fontSize: '0.78rem', color: '#475569', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Keep me logged in (Stay signed in on this device)
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    background: '#0B2744',
                    boxShadow: '0 4px 14px rgba(11, 39, 68, 0.25)',
                    cursor: isSending ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isSending ? 'Sending Verification Code...' : 'Send Verification OTP'}
                  <ArrowRight size={15} />
                </button>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    background: '#F8FAFC',
                    borderRadius: 10,
                    border: '1px solid rgba(11, 39, 68, 0.06)',
                  }}
                >
                  <ShieldCheck size={16} style={{ color: '#16A34A', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.74rem', color: '#64748B', lineHeight: 1.4 }}>
                    Passwordless OTP login ensures seamless, persistent access to your orders, addresses, and quotes.
                  </span>
                </div>
              </form>
            ) : (
              /* ── STAGE 2: ENTER OTP ── */
              <form onSubmit={handleManualVerify} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>Sent to:</div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0B2744' }}>{email}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setOtpStage('email')
                      setOtpError('')
                    }}
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      color: '#146EF5',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    Change Email
                  </button>
                </div>

                {/* Instant Verification Banner */}
                <div
                  style={{
                    background: '#EFF6FF',
                    borderRadius: 12,
                    padding: '0.85rem 1rem',
                    border: '1.5px solid #BFDBFE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#1D4ED8', textTransform: 'uppercase' }}>
                      Security Verification Code:
                    </div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#0B2744', letterSpacing: '0.12em' }}>
                      {demoBannerOtp || activeOtp || '123456'}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleAutofillDemoOtp}
                    style={{
                      background: '#1D4ED8',
                      color: 'white',
                      border: 'none',
                      padding: '0.4rem 0.75rem',
                      borderRadius: 8,
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(29, 78, 216, 0.3)',
                    }}
                  >
                    Auto-Fill OTP
                  </button>
                </div>

                {/* 6 Digit Input Boxes */}
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.78rem',
                      fontWeight: 800,
                      color: '#0B2744',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      marginBottom: '0.65rem',
                      textAlign: 'center',
                    }}
                  >
                    Enter 6-Digit Verification Code
                  </label>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    {otpDigits.map((digit, idx) => (
                      <input
                        key={idx}
                        ref={el => {
                          otpInputRefs.current[idx] = el
                        }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={e => handleOtpChange(idx, e.target.value)}
                        onKeyDown={e => handleKeyDown(idx, e)}
                        style={{
                          width: 44,
                          height: 52,
                          textAlign: 'center',
                          fontSize: '1.35rem',
                          fontWeight: 900,
                          color: '#0B2744',
                          borderRadius: 10,
                          border: digit
                            ? '2px solid #146EF5'
                            : '1.5px solid rgba(11, 39, 68, 0.15)',
                          background: digit ? '#F8FAFC' : 'white',
                          outline: 'none',
                        }}
                      />
                    ))}
                  </div>
                </div>

                {otpError && (
                  <div
                    style={{
                      fontSize: '0.78rem',
                      color: '#EF4444',
                      background: '#FEF2F2',
                      padding: '0.55rem 0.85rem',
                      borderRadius: 8,
                      border: '1px solid #FCA5A5',
                      textAlign: 'center',
                    }}
                  >
                    {otpError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    justifyContent: 'center',
                    fontSize: '0.9rem',
                    background: '#16A34A',
                    boxShadow: '0 4px 14px rgba(22, 163, 74, 0.3)',
                    cursor: isVerifying ? 'not-allowed' : 'pointer',
                  }}
                >
                  {isVerifying ? 'Verifying...' : 'Verify & Log In'}
                  <Check size={16} />
                </button>

                {/* Resend Option */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem', fontSize: '0.78rem' }}>
                  <span style={{ color: '#64748B' }}>Didn&apos;t receive code?</span>
                  {resendSeconds > 0 ? (
                    <span style={{ color: '#0B2744', fontWeight: 700 }}>Resend in {resendSeconds}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleSendOtp()}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#146EF5',
                        fontWeight: 800,
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      Resend OTP Now
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ═════════════════════════════════════════════════════════════
  // VIEW 2: LOGGED IN (USER ACCOUNT DASHBOARD)
  // ═════════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: '85vh', background: '#FAFBFD', paddingBottom: '4rem' }}>
      {/* ── TOP USER PROFILE HEADER ── */}
      <div
        style={{
          background: 'linear-gradient(180deg, #0B2744 0%, #113861 100%)',
          color: 'white',
          paddingTop: '2.5rem',
          paddingBottom: '2.25rem',
          borderBottom: '1px solid rgba(20, 110, 245, 0.15)',
        }}
      >
        <div className="container-site">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            style={{
              fontSize: '0.8rem',
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>
              Home
            </Link>
            <span>/</span>
            <span style={{ color: '#38BDF8', fontWeight: 700 }}>My Account</span>
          </nav>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1.5rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              {/* Avatar circle */}
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #146EF5 0%, #38BDF8 100%)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  fontFamily: 'var(--font-display)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  flexShrink: 0,
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <h1
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '1.45rem',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {user.name}
                  </h1>
                  <span
                    style={{
                      background: '#DCFCE7',
                      color: '#15803D',
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      padding: '0.15rem 0.55rem',
                      borderRadius: 100,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                    }}
                  >
                    <CheckCircle2 size={11} /> Persistent Login Active
                  </span>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.8)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <span>{user.email}</span>
                  {user.company && <span>• {user.company}</span>}
                  {user.phone && <span>• {user.phone}</span>}
                </div>
              </div>
            </div>

            {/* Logout button */}
            <button
              type="button"
              onClick={logout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1rem',
                borderRadius: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: 'white',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: `all 0.2s ${EASE}`,
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(239, 68, 68, 0.2)'
                ;(e.currentTarget as HTMLElement).style.borderColor = '#EF4444'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.background = 'rgba(255, 255, 255, 0.1)'
                ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(255, 255, 255, 0.2)'
              }}
            >
              <LogOut size={14} /> Log Out
            </button>
          </div>
        </div>
      </div>

      {/* ── MAIN DASHBOARD TABS & CONTENT ── */}
      <div className="container-site" style={{ marginTop: '2rem' }}>
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            borderBottom: '1px solid rgba(11, 39, 68, 0.08)',
            paddingBottom: '0.75rem',
            marginBottom: '2rem',
            overflowX: 'auto',
          }}
        >
          {[
            { id: 'overview', label: 'Overview', icon: User },
            { id: 'orders', label: 'My Orders', icon: Package },
            { id: 'profile', label: 'Profile & Company Info', icon: Building },
            { id: 'addresses', label: 'Delivery Address', icon: MapPin },
          ].map(tab => {
            const isActive = activeTab === tab.id
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 1.1rem',
                  borderRadius: 10,
                  border: isActive ? '1px solid #0B2744' : '1px solid transparent',
                  background: isActive ? '#0B2744' : 'white',
                  color: isActive ? 'white' : '#0B2744',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isActive ? '0 4px 14px rgba(11, 39, 68, 0.18)' : '0 2px 6px rgba(0,0,0,0.03)',
                  transition: `all 0.18s ${EASE}`,
                }}
              >
                <Icon size={14} style={{ color: isActive ? '#38BDF8' : '#146EF5' }} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* ── TAB 1: OVERVIEW ── */}
        {activeTab === 'overview' && (
          <div>
            {/* Quick Metrics */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.25rem',
                marginBottom: '2rem',
              }}
            >
              {[
                {
                  label: 'Total Orders',
                  val: user.orders?.length || 2,
                  icon: Package,
                  link: '#',
                  action: () => setActiveTab('orders'),
                },
                {
                  label: 'Items in Cart',
                  val: cartCount,
                  icon: ShoppingBag,
                  link: '/cart',
                },
                {
                  label: 'Saved in Wishlist',
                  val: wishlist.length,
                  icon: Heart,
                  link: '/wishlist',
                },
                {
                  label: 'Corporate Account',
                  val: 'Verified GST',
                  icon: ShieldCheck,
                  link: '#',
                  action: () => setActiveTab('profile'),
                },
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div
                    key={i}
                    onClick={stat.action}
                    style={{
                      background: 'white',
                      borderRadius: 16,
                      padding: '1.25rem',
                      border: '1px solid rgba(11, 39, 68, 0.08)',
                      boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      cursor: stat.action ? 'pointer' : 'default',
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: '#EFF6FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Icon size={20} style={{ color: '#146EF5' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.72rem', color: '#64748B', fontWeight: 600 }}>{stat.label}</div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 900, color: '#0B2744', fontFamily: 'var(--font-display)' }}>
                        {stat.val}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Recent Orders Overview */}
            <div
              style={{
                background: 'white',
                borderRadius: 18,
                padding: '1.75rem',
                border: '1px solid rgba(11, 39, 68, 0.08)',
                boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1.25rem',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 900,
                    fontSize: '1.1rem',
                    color: '#0B2744',
                  }}
                >
                  Recent Orders &amp; Dispatches
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab('orders')}
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    color: '#146EF5',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  View All Orders →
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {user.orders.map(order => (
                  <div
                    key={order.id}
                    style={{
                      padding: '1rem',
                      borderRadius: 12,
                      background: '#F8FAFC',
                      border: '1px solid rgba(11, 39, 68, 0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                      gap: '1rem',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 800, color: '#0B2744', fontSize: '0.9rem' }}>
                          Order #{order.id}
                        </span>
                        <span
                          style={{
                            fontSize: '0.65rem',
                            fontWeight: 800,
                            padding: '0.15rem 0.5rem',
                            borderRadius: 100,
                            background: order.status === 'Delivered' ? '#DCFCE7' : '#EFF6FF',
                            color: order.status === 'Delivered' ? '#16A34A' : '#1D4ED8',
                          }}
                        >
                          {order.status}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748B' }}>
                        Placed on {order.date} • {order.items.length} product styles
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Total Amount</div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#0B2744' }}>
                          {formatPrice(order.total)}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveTab('orders')}
                        className="btn-primary"
                        style={{ padding: '0.45rem 0.85rem', fontSize: '0.75rem' }}
                      >
                        Track Shipment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── TAB 2: MY ORDERS ── */}
        {activeTab === 'orders' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {user.orders.map(order => (
              <div
                key={order.id}
                style={{
                  background: 'white',
                  borderRadius: 18,
                  padding: '1.5rem',
                  border: '1px solid rgba(11, 39, 68, 0.08)',
                  boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
                }}
              >
                {/* Order Top Bar */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flexWrap: 'wrap',
                    gap: '1rem',
                    borderBottom: '1px solid rgba(11, 39, 68, 0.06)',
                    paddingBottom: '1rem',
                    marginBottom: '1rem',
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <h4 style={{ fontWeight: 900, color: '#0B2744', fontSize: '1rem' }}>
                        Order #{order.id}
                      </h4>
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          padding: '0.15rem 0.55rem',
                          borderRadius: 100,
                          background: order.status === 'Delivered' ? '#DCFCE7' : '#EFF6FF',
                          color: order.status === 'Delivered' ? '#16A34A' : '#1D4ED8',
                        }}
                      >
                        {order.status}
                      </span>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: 2 }}>
                      Placed on {order.date} • Tracking: <span style={{ fontWeight: 700, color: '#0B2744' }}>{order.trackingNumber}</span>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block' }}>Total Paid</span>
                      <span style={{ fontSize: '1.1rem', fontWeight: 900, color: '#0B2744' }}>
                        {formatPrice(order.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Items in this order */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {order.items.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.75rem',
                        background: '#F8FAFC',
                        borderRadius: 10,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            background: item.color,
                            border: '1px solid rgba(0,0,0,0.15)',
                          }}
                        />
                        <div>
                          <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0B2744' }}>
                            {item.name}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: '#64748B' }}>
                            Size: {item.size} • Qty: {item.quantity}
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0B2744' }}>
                        {formatPrice(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── TAB 3: PROFILE & COMPANY INFO ── */}
        {activeTab === 'profile' && (
          <div
            style={{
              background: 'white',
              borderRadius: 18,
              padding: '2rem',
              border: '1px solid rgba(11, 39, 68, 0.08)',
              boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
              maxWidth: 720,
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.15rem',
                color: '#0B2744',
                marginBottom: '0.4rem',
              }}
            >
              Company &amp; Account Information
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.82rem', marginBottom: '1.75rem' }}>
              Keep your contact details, designation, and GST information updated for accurate invoicing and dispatch coordination.
            </p>

            <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 8,
                      border: '1.5px solid rgba(11, 39, 68, 0.12)',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                    Mobile Phone
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 8,
                      border: '1.5px solid rgba(11, 39, 68, 0.12)',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    value={profileForm.company}
                    onChange={e => setProfileForm({ ...profileForm, company: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 8,
                      border: '1.5px solid rgba(11, 39, 68, 0.12)',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                    Designation
                  </label>
                  <input
                    type="text"
                    value={profileForm.designation}
                    onChange={e => setProfileForm({ ...profileForm, designation: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 8,
                      border: '1.5px solid rgba(11, 39, 68, 0.12)',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                  Registered GSTIN (For Corporate Tax Invoicing)
                </label>
                <input
                  type="text"
                  value={profileForm.gstin}
                  onChange={e => setProfileForm({ ...profileForm, gstin: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 8,
                    border: '1.5px solid rgba(11, 39, 68, 0.12)',
                    fontSize: '0.84rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.7rem 1.5rem', fontSize: '0.85rem' }}
                >
                  <Save size={15} /> Save Changes
                </button>

                {profileSaved && (
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#16A34A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <CheckCircle2 size={16} /> Profile Saved &amp; Synced!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}

        {/* ── TAB 4: DELIVERY ADDRESSES ── */}
        {activeTab === 'addresses' && (
          <div
            style={{
              background: 'white',
              borderRadius: 18,
              padding: '2rem',
              border: '1px solid rgba(11, 39, 68, 0.08)',
              boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
              maxWidth: 720,
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: '1.15rem',
                color: '#0B2744',
                marginBottom: '0.4rem',
              }}
            >
              Primary Institutional Delivery Address
            </h3>
            <p style={{ color: '#64748B', fontSize: '0.82rem', marginBottom: '1.75rem' }}>
              Used as the default shipping destination for enterprise bulk shipments and sampling trial kits.
            </p>

            <form onSubmit={handleProfileSave} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                  Street Address / Campus / Facility Building
                </label>
                <input
                  type="text"
                  value={profileForm.address}
                  onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 8,
                    border: '1.5px solid rgba(11, 39, 68, 0.12)',
                    fontSize: '0.84rem',
                    outline: 'none',
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                    City
                  </label>
                  <input
                    type="text"
                    value={profileForm.city}
                    onChange={e => setProfileForm({ ...profileForm, city: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 8,
                      border: '1.5px solid rgba(11, 39, 68, 0.12)',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                    State
                  </label>
                  <input
                    type="text"
                    value={profileForm.state}
                    onChange={e => setProfileForm({ ...profileForm, state: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 8,
                      border: '1.5px solid rgba(11, 39, 68, 0.12)',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: '#0B2744', marginBottom: 4 }}>
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={profileForm.pincode}
                    onChange={e => setProfileForm({ ...profileForm, pincode: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 8,
                      border: '1.5px solid rgba(11, 39, 68, 0.12)',
                      fontSize: '0.84rem',
                      outline: 'none',
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <button
                  type="submit"
                  className="btn-primary"
                  style={{ padding: '0.7rem 1.5rem', fontSize: '0.85rem' }}
                >
                  <Save size={15} /> Save Address
                </button>

                {profileSaved && (
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#16A34A',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                    }}
                  >
                    <CheckCircle2 size={16} /> Address Saved!
                  </span>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
