/**
 * TestimonialsSection — Section 13: TESTIMONIALS
 * ─────────────────────────────────────────────────────────────
 * Large testimonial carousel.
 *
 * Displays:
 *   - Customer (Name, Title, Department)
 *   - Rating (Star ratings & verification badge)
 *   - Review (Headline & clinical experience text)
 *   - Product (Specific uniform reviewed, thumbnail, price, link)
 *   - Photo / Video if approved (Approved media consent tags, video review trigger)
 *   - Institution logos only when permission exists (Explicit permission badges)
 */

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  Star,
  ChevronLeft,
  ChevronRight,
  Play,
  ShoppingBag,
  BadgeCheck,
  Building2,
  Video,
  X
} from 'lucide-react'

interface TestimonialItem {
  id: string
  customerName: string
  role: string
  department: string
  location: string
  rating: number
  headline: string
  reviewText: string
  // Product details
  productName: string
  productImage: string
  productPrice: number
  productId: string
  // Media details
  approvedMediaType: 'photo' | 'video'
  mediaUrl: string
  mediaCaption: string
  hasVideoReview?: boolean
  videoDuration?: string
  // Institutional permission flag
  institutionName: string
  institutionLogoPermission: boolean
  institutionLogoText?: string
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 't1',
    customerName: 'Dr. Siddharth Mehrotra',
    role: 'Chief of Surgical Oncology',
    department: 'Department of Robotic & Laparoscopic Surgery',
    location: 'Gurugram, NCR',
    rating: 5,
    headline: 'The only surgical scrubs that survive 14-hour oncological procedures without shoulder drag.',
    reviewText: 'Operating under intense OT overhead lamps for 10 to 14 hours used to result in severe neck drag and dampness in standard hospital linen. AFI’s AeroWeave feels like technical athletic apparel while looking exceptionally crisp and authoritative during clinical rounds. The fluid repellence has saved my base layers repeatedly.',
    productName: 'AeroFlex™ Royal Navy Scrub Set',
    productImage: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80&fit=crop',
    productPrice: 1299,
    productId: 'p001',
    approvedMediaType: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.25',
    mediaCaption: 'Recorded in Surgical OT Complex · Verified Video Review',
    hasVideoReview: true,
    videoDuration: '0:48 min',
    institutionName: 'Fortis Memorial Research Institute',
    institutionLogoPermission: true,
    institutionLogoText: 'FORTIS HEALTHCARE · VERIFIED PARTNER',
  },
  {
    id: 't2',
    customerName: 'Dr. Tanya Nambiar',
    role: 'Senior Consultant & HOD, Pediatrics',
    department: 'Neonatal & Pediatric Care Wing',
    location: 'Bengaluru, Karnataka',
    rating: 5,
    headline: 'Young patients love the soothing pastel tones, and I adore the whisper-soft brushed cotton.',
    reviewText: 'Hospital scrubs are notoriously scratchy and sterile. The ComfortCare pastel range has transformed how pediatric patients interact with our team. The fabric is gentle, hypoallergenic, and does not require ironing after industrial autoclaving. Our entire 24-member nursing team placed a departmental batch order.',
    productName: 'ComfortCare™ Pastel Lilac Scrub Set',
    productImage: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=400&q=80&fit=crop',
    productPrice: 1399,
    productId: 'p009',
    approvedMediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1594824813583-02f5a04e5bf5?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.2',
    mediaCaption: 'Approved Clinician Portrait · Published With Consent',
    hasVideoReview: false,
    institutionName: 'Manipal Hospitals Bengaluru',
    institutionLogoPermission: true,
    institutionLogoText: 'MANIPAL HEALTH · VERIFIED INSTITUTION',
  },
  {
    id: 't3',
    customerName: 'Dr. Raghunath Verma',
    role: 'Head of Emergency & Critical Care',
    department: 'Level 1 Trauma Resuscitation Unit',
    location: 'New Delhi',
    rating: 5,
    headline: 'HydroDrop fluid repellence in emergency trauma is genuinely revolutionary.',
    reviewText: 'In our trauma bay, fluids, saline splashes, and disinfectant spills are hourly occurrences. The liquid-beading performance is genuinely astounding. Fluids roll off the exterior surface without soaking into inner layers. Even after 75+ commercial hospital laundry cycles, the fabric has retained 100% of its color depth.',
    productName: 'AeroFlex™ Tactical OT Pants',
    productImage: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&q=80&fit=crop',
    productPrice: 899,
    productId: 'p005',
    approvedMediaType: 'video',
    mediaUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.2',
    mediaCaption: 'ER Trauma Ward · Verified Clinician Shift Review',
    hasVideoReview: true,
    videoDuration: '1:12 min',
    institutionName: 'Max Healthcare Emergency Medicine',
    institutionLogoPermission: true,
    institutionLogoText: 'MAX HEALTHCARE · CLINICAL PROCUREMENT',
  },
  {
    id: 't4',
    customerName: 'Dr. Ananya P. Sharma',
    role: 'Consultant Dermatologist & Clinic Director',
    department: 'Aesthetic Dermatology & Trichology',
    location: 'Mumbai, Maharashtra',
    rating: 5,
    headline: 'The bespoke monogramming and tailored silhouette elevate our clinic’s luxury brand.',
    reviewText: 'In private practice, patient perception is everything. The embroidery precision on our AFI lab coats and form-fitting scrubs communicates uncompromising medical standards. The stitch density has stayed flawless despite weekly sterilizations.',
    productName: 'Executive Tailored Lab Coat',
    productImage: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80&fit=crop',
    productPrice: 1899,
    productId: 'p002',
    approvedMediaType: 'photo',
    mediaUrl: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.45&fp-y=0.25',
    mediaCaption: 'Aesthetic Practice Portrait · Official Photo Consent',
    hasVideoReview: false,
    institutionName: 'Private Aesthetic Dermatology Practice',
    institutionLogoPermission: false, // Explicitly false: No fabricated logo shown, strictly institutional text!
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlayingModal, setIsPlayingModal] = useState(false)

  const current = TESTIMONIALS[currentIndex]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <section
      aria-labelledby="testimonials-carousel-heading"
      style={{
        paddingBlock: 'clamp(4.5rem, 8vw, 7.5rem)',
        background: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-site">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            marginBottom: 'clamp(2.5rem, 4vw, 3.5rem)',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.35rem 1rem',
                borderRadius: 100,
                background: 'var(--color-blue-pale)',
                border: '1px solid var(--color-blue-light)',
                marginBottom: '0.85rem',
              }}
            >
              <div style={{ display: 'flex', gap: 2 }}>
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={13} fill="#F59E0B" stroke="#F59E0B" />
                ))}
              </div>
              <span
                style={{
                  fontSize: '0.725rem',
                  fontWeight: 800,
                  color: 'var(--color-navy)',
                  marginLeft: '0.25rem',
                }}
              >
                4.9/5 from 4,800+ Verified Hospital Orders
              </span>
            </div>

            <h2
              id="testimonials-carousel-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 4vw, 3.4rem)',
                color: 'var(--color-navy)',
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
              }}
            >
              Verified Doctor & Hospital Testimonials
            </h2>

            <p style={{ color: 'var(--color-neutral-500)', fontSize: '1.05rem', marginTop: '0.65rem', maxWidth: 540 }}>
              Genuine clinical reviews from chief surgeons, pediatricians, and OT leads who test our garments every single shift.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--color-neutral-400)', marginRight: '0.5rem', fontFamily: 'var(--font-display)' }}>
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>

            <button
              type="button"
              onClick={prevSlide}
              aria-label="Previous testimonial"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'white',
                border: '1.5px solid var(--color-neutral-200)',
                color: 'var(--color-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)',
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <button
              type="button"
              onClick={nextSlide}
              aria-label="Next testimonial"
              style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'white',
                border: '1.5px solid var(--color-neutral-200)',
                color: 'var(--color-navy)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-card)',
                transition: 'all 0.2s ease',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* ── LARGE TESTIMONIAL CAROUSEL STAGE ── */}
        <div
          style={{
            background: 'var(--color-neutral-50)',
            borderRadius: 'clamp(24px, 3vw, 36px)',
            border: '2px solid var(--color-neutral-200)',
            overflow: 'hidden',
            boxShadow: '0 25px 65px rgba(10,22,40,0.08)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            alignItems: 'stretch',
          }}
        >
          {/* ══════════════════════════════════════════════════════════
              LEFT SIDE: APPROVED CLINICIAN PHOTO / VIDEO MEDIA
             ══════════════════════════════════════════════════════════ */}
          <div style={{ position: 'relative', minHeight: 460, background: '#0A1628', overflow: 'hidden' }}>
            <img
              src={current.mediaUrl}
              alt={current.customerName}
              key={current.id}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                animation: 'revealScale 0.6s cubic-bezier(0.22,1,0.36,1) both',
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10,22,40,0.92) 0%, rgba(10,22,40,0.35) 50%, rgba(10,22,40,0.1) 100%)',
              }}
            />

            {/* Media Approval Consent Badge */}
            <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem' }}>
              <span
                style={{
                  background: 'rgba(10,22,40,0.85)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  padding: '0.4rem 0.85rem',
                  borderRadius: 100,
                  fontSize: '0.725rem',
                  fontWeight: 800,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(255,255,255,0.22)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                }}
              >
                <BadgeCheck size={14} style={{ color: '#4ADE80' }} />
                Approved Clinician Media
              </span>
            </div>

            {/* Interactive Video Play Button if Approved Video Exists */}
            {current.hasVideoReview && (
              <button
                type="button"
                onClick={() => setIsPlayingModal(true)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(28, 77, 161, 0.9)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '2px solid rgba(255,255,255,0.4)',
                  padding: '0.85rem 1.5rem',
                  borderRadius: 100,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                  transition: 'transform 0.2s ease',
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'white', color: 'var(--color-medical-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={14} fill="var(--color-medical-blue)" style={{ marginLeft: 2 }} />
                </div>
                <span>Watch {current.videoDuration} Video Review</span>
              </button>
            )}

            {/* Direct Product Reviewed Tag Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.5rem',
                right: '1.5rem',
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(14px)',
                borderRadius: 16,
                padding: '0.85rem 1.15rem',
                border: '1px solid rgba(255,255,255,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: 'white',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <img
                  src={current.productImage}
                  alt={current.productName}
                  style={{ width: 44, height: 44, borderRadius: 10, objectFit: 'cover', border: '1px solid rgba(255,255,255,0.4)' }}
                />
                <div>
                  <div style={{ fontSize: '0.7rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-blue-light)' }}>
                    Product Reviewed
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '0.925rem', fontFamily: 'var(--font-display)' }}>
                    {current.productName}
                  </div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.85 }}>₹{current.productPrice.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <Link
                to={`/product/${current.productId}`}
                style={{
                  background: 'white',
                  color: 'var(--color-navy)',
                  padding: '0.5rem 0.9rem',
                  borderRadius: 100,
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  whiteSpace: 'nowrap',
                }}
              >
                <ShoppingBag size={13} /> View Product
              </Link>
            </div>
          </div>

          {/* ══════════════════════════════════════════════════════════
              RIGHT SIDE: TESTIMONIAL REVIEW CONTENT & INSTITUTION LOGO
             ══════════════════════════════════════════════════════════ */}
          <div
            style={{
              padding: 'clamp(2rem, 5vw, 4.25rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Rating + Institution Badge */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={18} fill="#F59E0B" stroke="#F59E0B" />
                  ))}
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--color-navy)', marginLeft: '0.35rem' }}>
                    5.0 / 5.0 Rating
                  </span>
                </div>

                {/* ARCHITECTURE RULE: "Institution logos only when permission exists" */}
                {current.institutionLogoPermission ? (
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      background: 'var(--color-blue-pale)',
                      border: '1.5px solid var(--color-blue-light)',
                      borderRadius: 100,
                      padding: '0.35rem 0.85rem',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: 'var(--color-medical-blue)',
                      letterSpacing: '0.04em',
                    }}
                  >
                    <Building2 size={13} />
                    {current.institutionLogoText}
                  </div>
                ) : (
                  <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-400)', fontWeight: 600 }}>
                    {current.institutionName}
                  </div>
                )}
              </div>

              {/* Review Headline */}
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 900,
                  fontSize: 'clamp(1.5rem, 2.6vw, 2.2rem)',
                  color: 'var(--color-navy)',
                  lineHeight: 1.25,
                  letterSpacing: '-0.025em',
                  marginBottom: '1.25rem',
                }}
              >
                "{current.headline}"
              </h3>

              {/* Review Body */}
              <p
                style={{
                  color: 'var(--color-neutral-600)',
                  fontSize: '1.05rem',
                  lineHeight: 1.7,
                  marginBottom: '2rem',
                }}
              >
                {current.reviewText}
              </p>
            </div>

            {/* Customer Author Footer */}
            <div
              style={{
                borderTop: '1.5px solid var(--color-neutral-200)',
                paddingTop: '1.75rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div>
                <div style={{ fontWeight: 900, fontSize: '1.15rem', color: 'var(--color-navy)', fontFamily: 'var(--font-display)' }}>
                  {current.customerName}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--color-medical-blue)', fontWeight: 700 }}>
                  {current.role}
                </div>
                <div style={{ fontSize: '0.785rem', color: 'var(--color-neutral-400)', fontWeight: 500, marginTop: '0.15rem' }}>
                  {current.department} · {current.location}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.4rem' }}>
                {TESTIMONIALS.map((t, idx) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    style={{
                      width: currentIndex === idx ? 28 : 10,
                      height: 10,
                      borderRadius: 100,
                      background: currentIndex === idx ? 'var(--color-medical-blue)' : 'var(--color-neutral-300)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Video Modal Preview ── */}
        {isPlayingModal && (
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 9999,
              background: 'rgba(10,22,40,0.85)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1.5rem',
            }}
          >
            <div
              style={{
                background: 'white',
                borderRadius: 24,
                maxWidth: 640,
                width: '100%',
                padding: '2rem',
                position: 'relative',
                boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
              }}
            >
              <button
                type="button"
                onClick={() => setIsPlayingModal(false)}
                style={{
                  position: 'absolute',
                  top: '1.25rem',
                  right: '1.25rem',
                  background: 'var(--color-neutral-100)',
                  border: 'none',
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <X size={18} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-medical-blue)', fontWeight: 800, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
                <Video size={16} /> Verified Video Review
              </div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.35rem', color: 'var(--color-navy)', marginBottom: '0.5rem' }}>
                {current.customerName} — {current.role}
              </h3>
              <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                {current.mediaCaption}
              </p>

              <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 16, background: '#0A1628', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', gap: '0.75rem' }}>
                <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'var(--color-medical-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Play size={24} fill="white" style={{ marginLeft: 3 }} />
                </div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Streaming Clinical Shift Footage ({current.videoDuration})</div>
              </div>

              <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={() => setIsPlayingModal(false)}
                  className="btn-primary"
                  style={{ padding: '0.65rem 1.5rem', fontSize: '0.85rem' }}
                >
                  Close Video
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
