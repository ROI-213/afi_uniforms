import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Maximize2,
  Wind,
  ShieldCheck,
  Headphones,
  CheckCircle2,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Users,
  Building2,
  FlaskConical,
  Shirt,
} from 'lucide-react'

interface ProofStage {
  id: string
  number: string
  shortLabel: 'FIT' | 'COMFORT' | 'QUALITY' | 'SUPPORT'
  badge: string
  eyebrow: string
  title: string
  verifiedClaim: string
  bullets: string[]
  ctaText: string
  ctaLink: string
  accentColor: string
  accentLightBg: string
  accentBorder: string
  activeGradient: string
}

const PROOF_STAGES: ProofStage[] = [
  {
    id: 'fit-options',
    number: '01',
    shortLabel: 'FIT',
    badge: '9 Sizing Silhouettes',
    eyebrow: 'ENGINEERED FOR REAL BODY DIVERSITY',
    title: 'Fit Options',
    verifiedClaim: 'XS to 5XL Standard Sizing + Petite & Tall Inseams',
    bullets: [
      'Tailored Men’s, Women’s, and Ergonomic Unisex Cuts',
      'Articulated knees and gusseted underarms for 360° reach',
      'On-site institutional sizing camps & free trial sizing rings',
    ],
    ctaText: 'Experience Fit Options',
    ctaLink: '/size-guide',
    accentColor: '#1769E8',
    accentLightBg: '#EBF4FF',
    accentBorder: 'rgba(23, 105, 232, 0.24)',
    activeGradient:
      'linear-gradient(135deg, #052254 0%, #0C439C 48%, #1D72EC 100%)',
  },
  {
    id: 'fabric-comfort',
    number: '02',
    shortLabel: 'COMFORT',
    badge: '16-Hour Zero Tension',
    eyebrow: 'TESTED ACROSS 16-HOUR MARATHON SHIFTS',
    title: 'Fabric Comfort',
    verifiedClaim: 'AeroWeave™ 4-Way Stretch & ThermoBreathe™ Micro-Capillaries',
    bullets: [
      '72% Poly / 21% Rayon / 7% Spandex balanced for zero drag',
      'Infused SilverShield™ 99.8% antimicrobial pathogen defense',
      'Zero-iron wrinkle recovery straight from the clothesline',
    ],
    ctaText: 'Experience Fabric Comfort',
    ctaLink: '/shop?collection=stretch',
    accentColor: '#0A9A96',
    accentLightBg: '#E6F7F6',
    accentBorder: 'rgba(10, 154, 150, 0.25)',
    activeGradient:
      'linear-gradient(135deg, #052B38 0%, #085A68 50%, #0A9A96 100%)',
  },
  {
    id: 'quality-checks',
    number: '03',
    shortLabel: 'QUALITY',
    badge: '100+ Wash Life Test',
    eyebrow: 'RIGOROUS INDUSTRIAL AUTOCLAVE TESTING',
    title: 'Quality Checks',
    verifiedClaim: '100+ Commercial High-Temp Hospital Wash Guarantee',
    bullets: [
      'Multi-point seam tensile stress-tested to 220 Newtons',
      'ColorLock™ vat-dye technology resists bleach and fading',
      'Double-stitched stress pockets carry stethoscopes without tearing',
    ],
    ctaText: 'Experience Quality Checks',
    ctaLink: '/fabric-technology',
    accentColor: '#1769E8',
    accentLightBg: '#EBF4FF',
    accentBorder: 'rgba(23, 105, 232, 0.24)',
    activeGradient:
      'linear-gradient(135deg, #062356 0%, #0E459E 50%, #1769E8 100%)',
  },
  {
    id: 'customer-support',
    number: '04',
    shortLabel: 'SUPPORT',
    badge: '2-Hr Concierge Reply',
    eyebrow: 'DIRECT HEALTHCARE CONCIERGE',
    title: 'Customer Support',
    verifiedClaim: '15-Day Doorstep Exchanges & Real Human Clinical Desk',
    bullets: [
      'Dedicated hospital procurement managers on phone & WhatsApp',
      'Hassle-free reverse courier pickup across all Indian pincodes',
      'Pre-production embroidery mockups approved before stitching',
    ],
    ctaText: 'Experience Customer Support',
    ctaLink: '/contact',
    accentColor: '#E07B12',
    accentLightBg: '#FFF5EB',
    accentBorder: 'rgba(224, 123, 18, 0.26)',
    activeGradient:
      'linear-gradient(135deg, #071B35 0%, #123666 58%, #255899 100%)',
  },
]

/* ── Custom 3D-Styled Vector Graphics for the 4 Cards ─────────── */
function FitAbstractGraphic({ isActive }: { isActive: boolean }) {
  return (
    <svg
      viewBox="0 0 210 290"
      fill="none"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'visible',
        filter: isActive
          ? 'drop-shadow(0 12px 24px rgba(4, 18, 42, 0.38))'
          : 'drop-shadow(0 8px 18px rgba(23, 105, 232, 0.14))',
      }}
    >
      <defs>
        <linearGradient id="fitFigMain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={isActive ? '#70B8FF' : '#2B7FFF'} />
          <stop offset="45%" stopColor={isActive ? '#1E6CEB' : '#1355C5'} />
          <stop offset="100%" stopColor={isActive ? '#0A327A' : '#082964'} />
        </linearGradient>
        <linearGradient id="fitFigBack1" x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={isActive ? '#93C8FF' : '#68A8FF'}
            stopOpacity="0.55"
          />
          <stop
            offset="100%"
            stopColor={isActive ? '#1C5ED8' : '#1E63E0'}
            stopOpacity="0.12"
          />
        </linearGradient>
        <linearGradient id="fitRibbonGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#E1F0FF" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#B8DAFF" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* Vertical Measurement Scale Grid on Left */}
      <g opacity={isActive ? 0.55 : 0.45}>
        <line
          x1="28"
          y1="44"
          x2="28"
          y2="245"
          stroke={isActive ? '#93C5FD' : '#3B82F6'}
          strokeWidth="1.2"
        />
        {[48, 72, 96, 120, 144, 168, 192, 216, 240].map((y, idx) => (
          <line
            key={y}
            x1="22"
            y1={y}
            x2={idx % 2 === 0 ? '35' : '31'}
            y2={y}
            stroke={isActive ? '#93C5FD' : '#3B82F6'}
            strokeWidth="1.2"
          />
        ))}
      </g>

      {/* Receding Silhouette 3 (Far Right) */}
      <g transform="translate(86, 36) scale(0.76)" opacity="0.35">
        <circle cx="95" cy="34" r="14" fill="url(#fitFigBack1)" />
        <path
          d="M68 62 C68 54, 122 54, 122 62 L128 135 L114 135 L110 230 L80 230 L76 135 L62 135 Z"
          fill="url(#fitFigBack1)"
        />
      </g>

      {/* Receding Silhouette 2 (Middle Right) */}
      <g transform="translate(48, 22) scale(0.87)" opacity="0.58">
        <circle cx="95" cy="34" r="14.5" fill="url(#fitFigBack1)" />
        <path
          d="M66 62 C66 53, 124 53, 124 62 L131 138 L115 138 L111 238 L79 238 L75 138 L59 138 Z"
          fill="url(#fitFigBack1)"
        />
      </g>

      {/* Primary Foreground 3D Medical Scrub Silhouette */}
      <g transform="translate(4, 6)">
        {/* Head */}
        <circle
          cx="92"
          cy="38"
          r="15.5"
          fill="url(#fitFigMain)"
          stroke={isActive ? '#A5D4FF' : '#60A5FA'}
          strokeWidth="1.2"
        />
        {/* Neck & Torso + Scrub V-Neck + Arms + Legs */}
        <path
          d="M60 68 C60 58, 124 58, 124 68 L134 132 L119 135 L114 92 L112 152 L109 252 L95 252 L92 172 L89 252 L75 252 L72 152 L70 92 L65 135 L50 132 Z"
          fill="url(#fitFigMain)"
          stroke={isActive ? '#93C5FD' : '#60A5FA'}
          strokeWidth="1.2"
        />
        {/* V-Neck Collar & Seam Detail Lines */}
        <path
          d="M81 61 L92 78 L103 61"
          stroke="#BAE6FD"
          strokeWidth="1.5"
          fill="none"
        />
        <line
          x1="71"
          y1="150"
          x2="113"
          y2="150"
          stroke="#BAE6FD"
          strokeWidth="1"
          strokeDasharray="3 2"
        />
      </g>

      {/* Curved 3D Sizing Tape Ribbon (XS S M L XL 2XL 3XL 4XL 5XL) */}
      <path
        d="M12 162 C38 198, 126 212, 202 184 L202 208 C126 236, 38 222, 12 186 Z"
        fill="url(#fitRibbonGrad)"
        stroke="#60A5FA"
        strokeWidth="1.2"
      />
      {/* Sizing Labels Along Ribbon */}
      <text
        x="22"
        y="185"
        fill="#1D5BD6"
        fontSize="8.5"
        fontWeight="800"
        fontFamily="var(--font-sans)"
      >
        XS
      </text>
      <text
        x="41"
        y="194"
        fill="#0D3C94"
        fontSize="9.5"
        fontWeight="800"
        fontFamily="var(--font-sans)"
      >
        S
      </text>
      <text
        x="59"
        y="200"
        fill="#08264A"
        fontSize="10.5"
        fontWeight="800"
        fontFamily="var(--font-sans)"
      >
        M
      </text>
      <text
        x="81"
        y="204"
        fill="#08264A"
        fontSize="11"
        fontWeight="900"
        fontFamily="var(--font-sans)"
      >
        L
      </text>
      <text
        x="100"
        y="206"
        fill="#08264A"
        fontSize="11"
        fontWeight="900"
        fontFamily="var(--font-sans)"
      >
        XL
      </text>
      <text
        x="122"
        y="206"
        fill="#0D3C94"
        fontSize="10.5"
        fontWeight="800"
        fontFamily="var(--font-sans)"
      >
        2XL
      </text>
      <text
        x="148"
        y="204"
        fill="#1769E8"
        fontSize="10"
        fontWeight="800"
        fontFamily="var(--font-sans)"
      >
        3XL
      </text>
      <text
        x="172"
        y="199"
        fill="#1769E8"
        fontSize="9.5"
        fontWeight="800"
        fontFamily="var(--font-sans)"
      >
        4XL
      </text>
    </svg>
  )
}

function ComfortAbstractGraphic() {
  return (
    <svg
      viewBox="0 0 180 230"
      fill="none"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'visible',
        filter: 'drop-shadow(0 12px 22px rgba(10, 154, 150, 0.18))',
      }}
    >
      <defs>
        <linearGradient id="comfTopLayer" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id="comfMidLayer" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id="comfBotLayer" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="100%" stopColor="#0F766E" />
        </linearGradient>
        <linearGradient id="comfArrowGrad" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#2563EB" stopOpacity="0.88" />
        </linearGradient>
      </defs>

      {/* Bottom Layer 3: Perforated Teal AeroWeave™ Mesh */}
      <path
        d="M18 168 L98 136 L176 168 L96 204 Z"
        fill="url(#comfBotLayer)"
        stroke="#5EEAD4"
        strokeWidth="1.2"
      />
      {/* Micro-capillary dots on bottom layer */}
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <circle
            key={`${r}-${c}`}
            cx={64 + c * 16 - r * 10}
            cy={158 + r * 8 + c * 5}
            r="1.6"
            fill="#CCFBF1"
            opacity="0.75"
          />
        ))
      )}

      {/* Middle Layer 2: ThermoBreathe™ Blue Stratum */}
      <path
        d="M20 142 C52 126, 82 122, 102 114 L176 144 C146 156, 118 164, 94 176 Z"
        fill="url(#comfMidLayer)"
        stroke="#7DD3FC"
        strokeWidth="1.2"
      />

      {/* Top Layer 1: Soft-Touch SilverShield™ Outer Weave */}
      <path
        d="M22 118 C56 98, 78 106, 106 90 L176 118 C144 134, 118 134, 92 150 Z"
        fill="url(#comfTopLayer)"
        stroke="#E2E8F0"
        strokeWidth="1.4"
      />

      {/* Upward 3D Breathable Airflow Arrows */}
      <g>
        <path
          d="M68 128 C64 96, 72 68, 84 44"
          stroke="url(#comfArrowGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <polygon points="84,34 75,48 91,49" fill="#2563EB" />

        <path
          d="M104 136 C102 98, 112 62, 126 30"
          stroke="url(#comfArrowGrad)"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
        <polygon points="128,18 116,34 135,36" fill="#1D4ED8" />

        <path
          d="M138 142 C138 110, 146 82, 158 56"
          stroke="url(#comfArrowGrad)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <polygon points="160,46 150,60 166,61" fill="#38BDF8" />
      </g>
    </svg>
  )
}

function QualityAbstractGraphic() {
  return (
    <svg
      viewBox="0 0 180 230"
      fill="none"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'visible',
        filter: 'drop-shadow(0 12px 24px rgba(23, 105, 232, 0.22))',
      }}
    >
      <defs>
        <linearGradient id="qualShieldOuter" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id="qualShieldInner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="55%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#0F296B" />
        </linearGradient>
        <linearGradient id="qualBaseGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#DBEAFE" />
          <stop offset="50%" stopColor="#93C5FD" />
          <stop offset="100%" stopColor="#BFDBFE" />
        </linearGradient>
      </defs>

      {/* Autoclave Hydro-Test Pedestal Base */}
      <ellipse cx="105" cy="186" rx="58" ry="16" fill="url(#qualBaseGrad)" />
      <ellipse
        cx="105"
        cy="181"
        rx="48"
        ry="12"
        fill="#EFF6FF"
        stroke="#60A5FA"
        strokeWidth="1.2"
      />

      {/* 3D Metallic & Royal-Blue Shield */}
      <path
        d="M105 32 L156 52 V106 C156 144, 134 168, 105 182 C76 168, 54 144, 54 106 V52 Z"
        fill="url(#qualShieldOuter)"
        stroke="#FFFFFF"
        strokeWidth="2"
      />
      <path
        d="M105 42 L147 59 V105 C147 137, 128 158, 105 170 C82 158, 63 137, 63 105 V59 Z"
        fill="url(#qualShieldInner)"
      />

      {/* 3D White Medical Cross Inside Shield */}
      <path
        d="M98 76 H112 V95 H131 V109 H112 V128 H98 V109 H79 V95 H98 Z"
        fill="#FFFFFF"
        style={{ filter: 'drop-shadow(0 4px 8px rgba(8, 24, 68, 0.45))' }}
      />

      {/* Floating Autoclave Water / Steam Droplets */}
      <circle cx="42" cy="128" r="4.5" fill="#93C5FD" opacity="0.8" />
      <circle cx="164" cy="96" r="3.5" fill="#60A5FA" opacity="0.75" />
      <circle cx="52" cy="70" r="3" fill="#BFDBFE" opacity="0.85" />
    </svg>
  )
}

function SupportAbstractGraphic() {
  return (
    <svg
      viewBox="0 0 180 230"
      fill="none"
      style={{
        width: '100%',
        height: '100%',
        overflow: 'visible',
        filter: 'drop-shadow(0 12px 24px rgba(15, 38, 74, 0.18))',
      }}
    >
      <defs>
        <linearGradient id="suppRingGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F59E0B" />
          <stop offset="50%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
        <linearGradient id="suppEarGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B82F6" />
          <stop offset="55%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {/* Glowing Amber Support Ring Behind Headset */}
      <circle
        cx="106"
        cy="122"
        r="48"
        stroke="url(#suppRingGrad)"
        strokeWidth="6"
        opacity="0.85"
      />
      <circle
        cx="106"
        cy="122"
        r="58"
        stroke="#FDE68A"
        strokeWidth="1.2"
        strokeDasharray="4 4"
      />

      {/* 3D Headset Band */}
      <path
        d="M58 122 C58 76, 154 76, 154 122"
        stroke="url(#suppEarGrad)"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d="M70 86 C92 66, 120 66, 142 86"
        stroke="url(#suppRingGrad)"
        strokeWidth="5"
        strokeLinecap="round"
      />

      {/* Left & Right Ear Cups */}
      <rect
        x="46"
        y="110"
        width="22"
        height="40"
        rx="11"
        fill="url(#suppEarGrad)"
        stroke="#93C5FD"
        strokeWidth="1.5"
      />
      <rect
        x="142"
        y="110"
        width="22"
        height="40"
        rx="11"
        fill="url(#suppEarGrad)"
        stroke="#93C5FD"
        strokeWidth="1.5"
      />

      {/* Microphone Boom */}
      <path
        d="M152 146 C150 172, 128 184, 102 184"
        stroke="#1E3A8A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <rect
        x="90"
        y="179"
        width="16"
        height="10"
        rx="5"
        fill="url(#suppRingGrad)"
      />

      {/* Floating Clinical Concierge Chat Bubble */}
      <g transform="translate(68, 106)">
        <rect
          x="0"
          y="0"
          width="54"
          height="34"
          rx="9"
          fill="#E2E8F0"
          stroke="#FFFFFF"
          strokeWidth="1.5"
        />
        <polygon points="16,34 26,34 18,43" fill="#E2E8F0" />
        <circle cx="16" cy="17" r="3" fill="#64748B" />
        <circle cx="27" cy="17" r="3" fill="#64748B" />
        <circle cx="38" cy="17" r="3" fill="#64748B" />
      </g>
    </svg>
  )
}

function StageTopIcon({
  index,
  isActive,
  accentColor,
}: {
  index: number
  isActive: boolean
  accentColor: string
}) {
  const color = isActive ? '#1769E8' : accentColor
  if (index === 0) return <Maximize2 size={17} strokeWidth={2.2} color={color} />
  if (index === 1) return <Wind size={17} strokeWidth={2.2} color={color} />
  if (index === 2) return <ShieldCheck size={17} strokeWidth={2.2} color={color} />
  return <Headphones size={17} strokeWidth={2.2} color={color} />
}

export default function WhyAFISection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [dragStartX, setDragStartX] = useState<number | null>(null)

  // IntersectionObserver for viewport entrance animation
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Auto-slide every 5 seconds unless paused by hover/touch/focus
  useEffect(() => {
    if (isPaused || !isVisible) return
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % PROOF_STAGES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPaused, isVisible])

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? PROOF_STAGES.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % PROOF_STAGES.length)
  }

  const handlePointerDown = (clientX: number) => {
    setDragStartX(clientX)
  }

  const handlePointerUp = (clientX: number) => {
    if (dragStartX === null) return
    const delta = clientX - dragStartX
    if (Math.abs(delta) > 45) {
      if (delta < 0) handleNext()
      else handlePrev()
    }
    setDragStartX(null)
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-afi-heading"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') handleNext()
        if (e.key === 'ArrowLeft') handlePrev()
      }}
      style={{
        position: 'relative',
        paddingBlock: 'clamp(4rem, 6.5vw, 6.25rem)',
        background:
          'linear-gradient(180deg, #F4F9FF 0%, #FFFFFF 35%, #F2F8FF 75%, #EAF3FF 100%)',
        color: '#071B35',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .afi-why-metric-strip {
          display: inline-grid;
          grid-template-columns: repeat(4, auto);
          align-items: center;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1.5px solid rgba(23, 105, 232, 0.14);
          border-radius: 999px;
          padding: 0.68rem 1.85rem;
          box-shadow: 0 14px 36px rgba(7, 27, 53, 0.06), inset 0 1px 0 #FFFFFF;
          gap: 1.75rem;
          max-width: 100%;
        }

        .afi-why-carousel-shell {
          position: relative;
          margin-top: 2rem;
          margin-bottom: 1.65rem;
        }

        .afi-why-cards-track {
          display: grid;
          grid-template-columns: 1.38fr 1fr 1fr 1fr;
          gap: 0.95rem;
          align-items: stretch;
          transition: grid-template-columns 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .afi-why-card {
          position: relative;
          border-radius: 24px;
          padding: 1.5rem 1.45rem 1.45rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 418px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.65s cubic-bezier(0.22, 1, 0.36, 1), background 0.55s ease, border 0.45s ease;
          user-select: none;
        }

        .afi-why-card:hover {
          transform: translateY(-5px);
        }

        .afi-why-nav-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid rgba(23, 105, 232, 0.18);
          box-shadow: 0 8px 24px rgba(7, 27, 53, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #071B35;
          cursor: pointer;
          z-index: 10;
          transition: all 0.25s ease;
        }

        .afi-why-nav-arrow:hover {
          background: #071B35;
          color: #FFFFFF;
          border-color: #071B35;
          transform: translateY(-50%) scale(1.06);
        }

        .afi-why-bottom-banner {
          margin-top: 1.75rem;
          border-radius: 22px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(14px);
          border: 1.5px solid rgba(23, 105, 232, 0.14);
          box-shadow: 0 18px 46px rgba(7, 27, 53, 0.06);
          padding: 1.25rem 1.75rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          flex-wrap: wrap;
        }

        @keyframes afiWhyGraphicFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .afi-why-graphic-float {
          animation: afiWhyGraphicFloat 5.5s ease-in-out infinite;
        }

        @media (max-width: 1180px) {
          .afi-why-cards-track {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 0.65rem;
          }
          .afi-why-card {
            min-width: 340px;
            flex: 0 0 340px;
            scroll-snap-align: start;
          }
          .afi-why-metric-strip {
            border-radius: 22px;
            padding: 0.85rem 1.2rem;
            gap: 1.1rem;
            overflow-x: auto;
          }
        }

        @media (max-width: 680px) {
          .afi-why-card {
            min-width: 84vw;
            flex: 0 0 84vw;
          }
          .afi-why-nav-arrow {
            display: none;
          }
          .afi-why-bottom-banner {
            padding: 1.2rem;
          }
        }
      `}</style>

      {/* ── SUBTLE MEDICAL-TECH BACKGROUND WAVES, GRID & PARTICLES ── */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 760"
        fill="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <defs>
          <linearGradient id="whyWaveLeft" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="whyWaveRight" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Top-left and top-right flowing technical curves matching reference */}
        <path
          d="M-60 220 C90 180, 210 90, 280 -20 L-60 -20 Z"
          fill="url(#whyWaveLeft)"
        />
        <path
          d="M-40 240 C110 190, 220 95, 295 -20"
          stroke="rgba(23, 105, 232, 0.22)"
          strokeWidth="1.3"
        />
        <path
          d="M1500 220 C1340 160, 1210 70, 1120 -20 L1500 -20 Z"
          fill="url(#whyWaveRight)"
        />
        <path
          d="M1480 235 C1320 175, 1195 80, 1105 -20"
          stroke="rgba(23, 105, 232, 0.24)"
          strokeWidth="1.3"
        />
      </svg>

      {/* Subtle technical dot grid on top-left & top-right */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '4%',
          left: '1.5%',
          width: 140,
          height: 140,
          backgroundImage:
            'radial-gradient(rgba(23, 105, 232, 0.18) 1.25px, transparent 1.25px)',
          backgroundSize: '14px 14px',
          opacity: 0.65,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
        {/* ════════════════════════════════════════════════════════════════
            1. CENTERED HEADER + FLOATING TRUST METRIC STRIP
           ════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(22px)',
            transition:
              'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Top Eyebrow: — WHY AFI — */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.55rem',
            }}
          >
            <span
              style={{
                width: 42,
                height: 1.5,
                background: 'linear-gradient(90deg, transparent, #1769E8)',
              }}
            />
            <span
              style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#1769E8',
              }}
            >
              WHY AFI
            </span>
            <span
              style={{
                width: 42,
                height: 1.5,
                background: 'linear-gradient(90deg, #1769E8, transparent)',
              }}
            />
          </div>

          {/* Main Heading */}
          <h2
            id="why-afi-heading"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(2.15rem, 4vw, 3.25rem)',
              lineHeight: 1.08,
              letterSpacing: '-0.03em',
              margin: '0 0 0.7rem 0',
            }}
          >
            <div style={{ color: '#071B35' }}>Why 50,000+ Professionals</div>
            <div style={{ color: '#1769E8' }}>Choose AFI</div>
          </h2>

          {/* Supporting Copy */}
          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.05vw, 0.98rem)',
              lineHeight: 1.58,
              color: '#53667E',
              maxWidth: 620,
              margin: '0 0 1.45rem 0',
              fontWeight: 500,
            }}
          >
            Every promise is backed by verifiable textile metrics, certified lab
            tests, and corporate, industrial & healthcare team feedback.
          </p>

          {/* ── FLOATING TRUST METRIC STRIP ── */}
          <div className="afi-why-metric-strip">
            {[
              {
                val: '50,000+',
                label: 'Professionals',
                icon: <Users size={18} strokeWidth={2} color="#1769E8" />,
              },
              {
                val: '500+',
                label: 'Organizations',
                icon: <Building2 size={18} strokeWidth={2} color="#1769E8" />,
              },
              {
                val: '200+',
                label: 'Uniform Designs',
                icon: <Shirt size={18} strokeWidth={2} color="#1769E8" />,
              },
              {
                val: '100+',
                label: 'Fabric Options',
                icon: <FlaskConical size={18} strokeWidth={2} color="#1769E8" />,
              },
            ].map((m, idx) => (
              <div
                key={m.label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.75rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    textAlign: 'left',
                  }}
                >
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: '50%',
                      background: '#EAF4FF',
                      border: '1px solid rgba(23, 105, 232, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {m.icon}
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: '1.05rem',
                        fontWeight: 900,
                        color: '#071B35',
                        lineHeight: 1.15,
                        letterSpacing: '-0.02em',
                      }}
                    >
                      {m.val}
                    </div>
                    <div
                      style={{
                        fontSize: '0.7rem',
                        fontWeight: 600,
                        color: '#63768D',
                      }}
                    >
                      {m.label}
                    </div>
                  </div>
                </div>

                {idx < 3 && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: 1,
                      height: 28,
                      background: 'rgba(23, 105, 232, 0.14)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            2. HORIZONTAL INTERACTIVE STORY CAROUSEL (01 FIT → 04 SUPPORT)
           ════════════════════════════════════════════════════════════════ */}
        <div
          className="afi-why-carousel-shell"
          onMouseDown={(e) => handlePointerDown(e.clientX)}
          onMouseUp={(e) => handlePointerUp(e.clientX)}
          onTouchStart={(e) => handlePointerDown(e.touches[0].clientX)}
          onTouchEnd={(e) => handlePointerUp(e.changedTouches[0].clientX)}
        >
          {/* Left Navigation Arrow ← */}
          <button
            type="button"
            aria-label="Previous proof stage"
            onClick={handlePrev}
            className="afi-why-nav-arrow"
            style={{ left: -18 }}
          >
            <ChevronLeft size={20} strokeWidth={2.3} />
          </button>

          {/* Right Navigation Arrow → */}
          <button
            type="button"
            aria-label="Next proof stage"
            onClick={handleNext}
            className="afi-why-nav-arrow"
            style={{ right: -18 }}
          >
            <ChevronRight size={20} strokeWidth={2.3} />
          </button>

          <div
            className="afi-why-cards-track"
            style={{
              gridTemplateColumns: PROOF_STAGES.map((_, idx) =>
                idx === activeIndex ? '1.38fr' : '1fr'
              ).join(' '),
            }}
          >
            {PROOF_STAGES.map((stage, idx) => {
              const isActive = activeIndex === idx
              return (
                <div
                  key={stage.id}
                  role="button"
                  tabIndex={0}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(idx)}
                  className="afi-why-card"
                  style={{
                    background: isActive
                      ? stage.activeGradient
                      : 'linear-gradient(180deg, #FFFFFF 0%, #F7FBFF 100%)',
                    border: isActive
                      ? '2px solid #3B82F6'
                      : '1.5px solid rgba(23, 105, 232, 0.15)',
                    boxShadow: isActive
                      ? '0 24px 54px rgba(11, 56, 136, 0.28), 0 0 0 1px rgba(147, 197, 253, 0.35)'
                      : '0 14px 36px rgba(7, 27, 53, 0.06)',
                    color: isActive ? '#FFFFFF' : '#071B35',
                  }}
                >
                  {/* Top Colored Accent Bar on Inactive Cards */}
                  {!isActive && (
                    <div
                      aria-hidden="true"
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 16,
                        right: 16,
                        height: 3.5,
                        borderRadius: '0 0 4px 4px',
                        background: stage.accentColor,
                      }}
                    />
                  )}

                  {/* Huge Subtle Background Watermark Number (01 / 02 / 03 / 04) */}
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 14,
                      fontFamily: 'var(--font-display)',
                      fontSize: isActive ? '7rem' : '5.8rem',
                      fontWeight: 900,
                      lineHeight: 0.85,
                      letterSpacing: '-0.05em',
                      color: isActive
                        ? 'rgba(255, 255, 255, 0.13)'
                        : 'rgba(23, 105, 232, 0.06)',
                      pointerEvents: 'none',
                      zIndex: 1,
                    }}
                  >
                    {stage.number}
                  </div>

                  {/* Card Foreground Content */}
                  <div style={{ position: 'relative', zIndex: 3 }}>
                    {/* Top Row: Number Circle + Icon Box + Stat Badge */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        marginBottom: '1.05rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      {/* Number Circle */}
                      <span
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          background: isActive ? '#FFFFFF' : stage.accentLightBg,
                          border: isActive
                            ? '1px solid #FFFFFF'
                            : `1px solid ${stage.accentBorder}`,
                          color: isActive ? '#1769E8' : stage.accentColor,
                          fontSize: '0.82rem',
                          fontWeight: 900,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {stage.number}
                      </span>

                      {/* Square Rounded Icon Box */}
                      <span
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: 10,
                          background: isActive ? '#FFFFFF' : '#FFFFFF',
                          border: isActive
                            ? '1px solid rgba(255, 255, 255, 0.9)'
                            : `1px solid ${stage.accentBorder}`,
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                          boxShadow: '0 4px 10px rgba(7, 27, 53, 0.06)',
                        }}
                      >
                        <StageTopIcon
                          index={idx}
                          isActive={isActive}
                          accentColor={stage.accentColor}
                        />
                      </span>

                      {/* Stat Pill Badge */}
                      <span
                        style={{
                          padding: '0.32rem 0.72rem',
                          borderRadius: 999,
                          background: isActive
                            ? 'rgba(255, 255, 255, 0.94)'
                            : stage.accentLightBg,
                          border: isActive
                            ? '1px solid #FFFFFF'
                            : `1px solid ${stage.accentBorder}`,
                          color: isActive ? '#1769E8' : stage.accentColor,
                          fontSize: '0.68rem',
                          fontWeight: 800,
                          letterSpacing: '0.02em',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {stage.badge}
                      </span>
                    </div>

                    {/* Eyebrow */}
                    <div
                      style={{
                        fontSize: '0.64rem',
                        fontWeight: 800,
                        letterSpacing: '0.07em',
                        textTransform: 'uppercase',
                        color: isActive
                          ? 'rgba(255, 255, 255, 0.88)'
                          : '#3B526E',
                        lineHeight: 1.35,
                        marginBottom: '0.2rem',
                        maxWidth: isActive ? '66%' : '82%',
                      }}
                    >
                      {stage.eyebrow}
                    </div>

                    {/* Main Title */}
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: isActive ? '1.5rem' : '1.3rem',
                        fontWeight: 900,
                        color: isActive ? '#FFFFFF' : '#071B35',
                        letterSpacing: '-0.02em',
                        lineHeight: 1.15,
                        margin: '0 0 0.85rem 0',
                      }}
                    >
                      {stage.title}
                    </h3>

                    {/* Highlighted Proof Box */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.48rem',
                        padding: '0.52rem 0.72rem',
                        borderRadius: 12,
                        background: isActive
                          ? 'rgba(255, 255, 255, 0.96)'
                          : '#FFFFFF',
                        border: isActive
                          ? '1px solid #FFFFFF'
                          : '1px solid rgba(23, 105, 232, 0.14)',
                        boxShadow: '0 6px 16px rgba(7, 27, 53, 0.06)',
                        marginBottom: '0.95rem',
                        maxWidth: isActive ? '62%' : '88%',
                      }}
                    >
                      <CheckCircle2
                        size={15}
                        color="#10B981"
                        style={{ flexShrink: 0 }}
                      />
                      <span
                        style={{
                          fontSize: '0.69rem',
                          fontWeight: 800,
                          color: '#071B35',
                          lineHeight: 1.28,
                        }}
                      >
                        {stage.verifiedClaim}
                      </span>
                    </div>

                    {/* 3 Bullet Points */}
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.48rem',
                        marginBottom: '1.15rem',
                        maxWidth: isActive ? '58%' : '76%',
                      }}
                    >
                      {stage.bullets.map((b) => (
                        <div
                          key={b}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.45rem',
                            fontSize: '0.69rem',
                            lineHeight: 1.38,
                            fontWeight: 500,
                            color: isActive
                              ? 'rgba(255, 255, 255, 0.92)'
                              : '#4A5D75',
                          }}
                        >
                          <span
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: '50%',
                              background: isActive
                                ? '#60A5FA'
                                : stage.accentColor,
                              marginTop: '0.35rem',
                              flexShrink: 0,
                            }}
                          />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Custom 3D Abstract Graphic on Right / Bottom-Right of Card */}
                  <div
                    className="afi-why-graphic-float"
                    style={{
                      position: 'absolute',
                      right: isActive ? 4 : -4,
                      bottom: isActive ? 6 : 8,
                      width: isActive ? '47%' : '44%',
                      height: isActive ? '78%' : '62%',
                      pointerEvents: 'none',
                      zIndex: 2,
                    }}
                  >
                    {idx === 0 && <FitAbstractGraphic isActive={isActive} />}
                    {idx === 1 && <ComfortAbstractGraphic />}
                    {idx === 2 && <QualityAbstractGraphic />}
                    {idx === 3 && <SupportAbstractGraphic />}
                  </div>

                  {/* Bottom CTA Pill Button */}
                  <div style={{ position: 'relative', zIndex: 4, marginTop: 'auto' }}>
                    <Link
                      to={stage.ctaLink}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.45rem',
                        padding: '0.58rem 1.05rem',
                        borderRadius: 999,
                        background: isActive
                          ? '#061A38'
                          : '#FFFFFF',
                        border: isActive
                          ? '1px solid rgba(147, 197, 253, 0.45)'
                          : `1px solid ${stage.accentBorder}`,
                        color: isActive ? '#FFFFFF' : stage.accentColor,
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        textDecoration: 'none',
                        boxShadow: isActive
                          ? '0 8px 20px rgba(4, 15, 35, 0.35)'
                          : '0 4px 12px rgba(7, 27, 53, 0.05)',
                        transition: 'all 0.25s ease',
                      }}
                    >
                      <span>{stage.ctaText}</span>
                      <ArrowRight size={13} strokeWidth={2.4} />
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════════
            3. CONNECTED PROGRESS SYSTEM (01 FIT ━━━ 02 COMFORT ━━━ 03 QUALITY ━━━ 04 SUPPORT)
           ════════════════════════════════════════════════════════════════ */}
        <div
          style={{
            maxWidth: 680,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'relative',
            paddingInline: '0.5rem',
          }}
        >
          {PROOF_STAGES.map((stage, idx) => {
            const isCurrent = activeIndex === idx
            const isPast = idx < activeIndex
            return (
              <div
                key={stage.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flex: idx < PROOF_STAGES.length - 1 ? 1 : 'none',
                }}
              >
                {/* Stage Node Circle + Label */}
                <button
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '0.35rem',
                    background: 'transparent',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    position: 'relative',
                    zIndex: 3,
                  }}
                >
                  <span
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: '50%',
                      background: isCurrent
                        ? '#1769E8'
                        : isPast
                        ? '#DBEAFE'
                        : '#EEF4FA',
                      border: isCurrent
                        ? '2px solid #93C5FD'
                        : '1.5px solid #CBD5E1',
                      color: isCurrent
                        ? '#FFFFFF'
                        : isPast
                        ? '#1769E8'
                        : '#52657C',
                      fontSize: '0.68rem',
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: isCurrent
                        ? '0 4px 14px rgba(23, 105, 232, 0.35)'
                        : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {stage.number}
                  </span>
                  <span
                    style={{
                      fontSize: '0.64rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      color: isCurrent ? '#071B35' : '#64748B',
                    }}
                  >
                    {stage.shortLabel}
                  </span>
                </button>

                {/* Connecting Animated Line Between Nodes */}
                {idx < PROOF_STAGES.length - 1 && (
                  <div
                    aria-hidden="true"
                    style={{
                      flex: 1,
                      height: 3.5,
                      background: '#DCE6F2',
                      borderRadius: 999,
                      marginInline: '0.65rem',
                      marginBottom: '1.15rem',
                      overflow: 'hidden',
                      position: 'relative',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: isPast ? '100%' : isCurrent ? '62%' : '0%',
                        background:
                          'linear-gradient(90deg, #1769E8 0%, #38BDF8 100%)',
                        borderRadius: 999,
                        transition: 'width 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    />
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* ════════════════════════════════════════════════════════════════
            4. BOTTOM TRUST STATEMENT BANNER
           ════════════════════════════════════════════════════════════════ */}
        <div className="afi-why-bottom-banner">
          {/* Left: Hexagon Shield + ENGINEERED FOR REAL HEALTHCARE SHIFTS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.9rem',
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: 'linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%)',
                border: '1px solid rgba(23, 105, 232, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#1769E8',
                flexShrink: 0,
              }}
            >
              <ShieldCheck size={24} strokeWidth={2} />
            </div>
            <div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.98rem',
                  fontWeight: 900,
                  lineHeight: 1.18,
                  letterSpacing: '-0.01em',
                  color: '#071B35',
                }}
              >
                ENGINEERED FOR REAL
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.98rem',
                  fontWeight: 900,
                  lineHeight: 1.18,
                  letterSpacing: '-0.01em',
                  color: '#1769E8',
                }}
              >
                HEALTHCARE SHIFTS
              </div>
            </div>
          </div>

          {/* Vertical Divider */}
          <span
            aria-hidden="true"
            style={{
              width: 1,
              height: 36,
              background: 'rgba(23, 105, 232, 0.14)',
            }}
          />

          {/* Center Supporting Statement */}
          <p
            style={{
              fontSize: '0.78rem',
              lineHeight: 1.48,
              color: '#53667E',
              maxWidth: 270,
              margin: 0,
              fontWeight: 500,
            }}
          >
            From first fitting to 100+ wash cycles, AFI uniforms are designed
            around the realities of healthcare professionals.
          </p>

          {/* Right: 4 Tiny Proof Icons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              flexWrap: 'wrap',
            }}
          >
            {[
              {
                l1: 'Real-world',
                l2: 'Fit',
                icon: <Shirt size={16} strokeWidth={2} color="#1769E8" />,
              },
              {
                l1: 'Long-shift',
                l2: 'Comfort',
                icon: <Wind size={16} strokeWidth={2} color="#1769E8" />,
              },
              {
                l1: 'Industrial',
                l2: 'Testing',
                icon: <ShieldCheck size={16} strokeWidth={2} color="#1769E8" />,
              },
              {
                l1: 'Human',
                l2: 'Support',
                icon: <Users size={16} strokeWidth={2} color="#1769E8" />,
              },
            ].map((item, i) => (
              <div
                key={item.l1}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                  }}
                >
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: '#EAF4FF',
                      border: '1px solid rgba(23, 105, 232, 0.16)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <div
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: '#071B35',
                      lineHeight: 1.2,
                    }}
                  >
                    <div>{item.l1}</div>
                    <div>{item.l2}</div>
                  </div>
                </div>
                {i < 3 && (
                  <span
                    aria-hidden="true"
                    style={{
                      width: 1,
                      height: 26,
                      background: 'rgba(23, 105, 232, 0.12)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
