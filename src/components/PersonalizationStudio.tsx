import { useState } from 'react'
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Download,
  Gem,
  Feather,
  Heart,
  Building2,
  Image as ImageIcon,
  Maximize2,
} from 'lucide-react'
import { useScrollReveal } from '../hooks/useScrollReveal'

interface ThreadOption {
  id: string
  name: string
  swatchHex: string
  stitchColor: string
  swatchBorder: string
}

const THREAD_OPTIONS: ThreadOption[] = [
  {
    id: 'white',
    name: 'Pure Silk White',
    swatchHex: '#FFFFFF',
    stitchColor: '#FFF9FB',
    swatchBorder: '#D6D3D8',
  },
  {
    id: 'rose-gold',
    name: 'Rose Gold',
    swatchHex: '#D14572',
    stitchColor: '#FADCE6',
    swatchBorder: '#B8325D',
  },
  {
    id: 'navy',
    name: 'Navy Blue',
    swatchHex: '#132644',
    stitchColor: '#162B4D',
    swatchBorder: '#0E1D35',
  },
  {
    id: 'champagne',
    name: 'Champagne',
    swatchHex: '#C5A27D',
    stitchColor: '#F3DFC8',
    swatchBorder: '#AD8A65',
  },
  {
    id: 'silver',
    name: 'Slate Silver',
    swatchHex: '#A6ABB4',
    stitchColor: '#E5E8EE',
    swatchBorder: '#8D939E',
  },
  {
    id: 'maroon',
    name: 'Deep Maroon',
    swatchHex: '#591227',
    stitchColor: '#66142C',
    swatchBorder: '#450C1D',
  },
  {
    id: 'black',
    name: 'Black',
    swatchHex: '#151518',
    stitchColor: '#1E1E22',
    swatchBorder: '#000000',
  },
]

interface FontOption {
  id: 'sans' | 'serif' | 'script'
  name: string
  fontFamily: string
  fontStyle: 'normal' | 'italic'
  fontWeight: number
}

const FONT_OPTIONS: FontOption[] = [
  {
    id: 'sans',
    name: 'Modern Sans',
    fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
    fontStyle: 'normal',
    fontWeight: 500,
  },
  {
    id: 'serif',
    name: 'Classic Serif',
    fontFamily: "'Playfair Display', Georgia, serif",
    fontStyle: 'italic',
    fontWeight: 500,
  },
  {
    id: 'script',
    name: 'Signature Script',
    fontFamily: "'Caveat', 'Playfair Display', cursive",
    fontStyle: 'italic',
    fontWeight: 600,
  },
]

interface EmblemOption {
  id: 'caduceus' | 'heartbeat' | 'stethoscope' | 'hospital' | 'custom'
  name: string
}

const EMBLEM_OPTIONS: EmblemOption[] = [
  { id: 'custom', name: 'Company Logo' },
  { id: 'caduceus', name: 'Department Crest' },
  { id: 'heartbeat', name: 'Employee Name & ID' },
  { id: 'stethoscope', name: 'Tactical / Security Badge' },
  { id: 'hospital', name: 'Hospitality Monogram' },
]

interface FabricPreset {
  id: string
  name: string
  dotHex: string
  filterCss: string
}

const FABRIC_PRESETS: FabricPreset[] = [
  {
    id: 'rose',
    name: 'Rose',
    dotHex: '#C84671',
    filterCss: 'none',
  },
  {
    id: 'dusty-pink',
    name: 'Dusty Pink',
    dotHex: '#E09BB0',
    filterCss: 'brightness(1.08) saturate(0.82)',
  },
  {
    id: 'cream',
    name: 'Cream',
    dotHex: '#F5ECE8',
    filterCss: 'brightness(1.28) saturate(0.28) sepia(0.12)',
  },
  {
    id: 'deep-rose',
    name: 'Deep Rose',
    dotHex: '#611833',
    filterCss: 'brightness(0.72) contrast(1.12) saturate(1.15)',
  },
]

interface ThumbnailItem {
  id: string
  title: string
  subtitle?: string
  pillLabel: string
  image: string
  wide?: boolean
}

const THUMBNAILS: ThumbnailItem[] = [
  {
    id: 'corporate-shirt',
    title: 'Corporate Shirt & Blazer',
    subtitle: 'Left Chest Logo',
    pillLabel: 'CORPORATE - CHEST EMBROIDERY',
    image: '/ind-corporate.jpg',
  },
  {
    id: 'work-jacket',
    title: 'Industrial Utility Jacket',
    subtitle: 'Name & Department',
    pillLabel: 'WORKWEAR - CHEST & SLEEVE PATCH',
    image: '/ind-industrial.jpg',
  },
  {
    id: 'hotel-suit',
    title: 'Hotel Front-Office Suit',
    subtitle: 'Lapel Monogram',
    pillLabel: 'HOSPITALITY - LAPEL EMBROIDERY',
    image: '/ind-hospitality.jpg',
  },
  {
    id: 'healthcare-scrub',
    title: 'Healthcare Scrub & Coat',
    subtitle: 'Doctor Name & Crest',
    pillLabel: 'HEALTHCARE - CLINICAL EMBROIDERY',
    image: '/ind-healthcare.jpg',
  },
  {
    id: 'security-uniform',
    title: 'Security & Staff Uniform',
    subtitle: 'Official Crest & Badge',
    pillLabel: 'SECURITY & EDU - CREST & BADGE',
    image: '/ind-security.jpg',
    wide: true,
  },
]

function StitchedEmblemSvg({
  type,
  color,
  size = 54,
}: {
  type: EmblemOption['id']
  color: string
  size?: number
}) {
  const filterStyle: React.CSSProperties = {
    filter:
      'drop-shadow(0px 1.5px 1px rgba(72, 14, 34, 0.48)) drop-shadow(0px -0.6px 0.4px rgba(255, 255, 255, 0.65))',
    transition: 'all 0.25s ease',
  }

  if (type === 'caduceus') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        style={filterStyle}
      >
        {/* Central Staff & Orb */}
        <circle cx="32" cy="11" r="3.4" fill={color} />
        <path
          d="M32 14V56"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Left Wing */}
        <path
          d="M30 18C22 15 12 16 6 20C11 22 16 22.5 22 22C14 24 10 25.5 9 27.5C15 28 21 27 28 24.5"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={color}
          fillOpacity="0.22"
        />
        {/* Right Wing */}
        <path
          d="M34 18C42 15 52 16 58 20C53 22 48 22.5 42 22C50 24 54 25.5 55 27.5C49 28 43 27 36 24.5"
          stroke={color}
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill={color}
          fillOpacity="0.22"
        />
        {/* Intertwined Serpents */}
        <path
          d="M24 27C19 30 19 35 32 38C45 41 45 46 32 49C25 50.5 25 54 30 55"
          stroke={color}
          strokeWidth="2.3"
          strokeLinecap="round"
        />
        <path
          d="M40 27C45 30 45 35 32 38C19 41 19 46 32 49C39 50.5 39 54 34 55"
          stroke={color}
          strokeWidth="2.3"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  if (type === 'heartbeat') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        style={filterStyle}
      >
        <path
          d="M32 50C32 50 14 38 14 24.5C14 18.5 18.8 14 24.5 14C28.2 14 30.8 16 32 18.5C33.2 16 35.8 14 39.5 14C45.2 14 50 18.5 50 24.5C50 38 32 50 32 50Z"
          stroke={color}
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 32H21L25 24L30 39L35 28L38 32H56"
          stroke={color}
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    )
  }

  if (type === 'stethoscope') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        style={filterStyle}
      >
        <path
          d="M20 14V26C20 33.7 25.8 40 33 40C40.2 40 46 33.7 46 26V14"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <path
          d="M33 40V46C33 50.4 36.6 54 41 54C45.4 54 49 50.4 49 46V38"
          stroke={color}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        <circle cx="49" cy="34" r="4.5" stroke={color} strokeWidth="2.6" />
      </svg>
    )
  }

  if (type === 'hospital') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        style={filterStyle}
      >
        <circle cx="32" cy="32" r="21" stroke={color} strokeWidth="2.6" />
        <circle
          cx="32"
          cy="32"
          r="16"
          stroke={color}
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />
        <path
          d="M32 21V43M21 32H43"
          stroke={color}
          strokeWidth="3.2"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      style={filterStyle}
    >
      <polygon
        points="32,12 37,25 51,25 40,34 44,48 32,39 20,48 24,34 13,25 27,25"
        stroke={color}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function SmallButtonEmblemIcon({
  type,
  active,
}: {
  type: EmblemOption['id']
  active: boolean
}) {
  const color = active ? '#C83B6B' : '#1E293B'
  if (type === 'caduceus') {
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 3v18M5 7c3-1.5 5-1 7 0 2-1 4-1.5 7 0M7 10c2-.5 3.5-.5 5 0 1.5-.5 3-.5 5 0M9 14c1.5 1 4.5 1 6 0"
          stroke="#C83B6B"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    )
  }
  if (type === 'heartbeat') {
    return <Heart size={15} fill="#C83B6B" color="#C83B6B" />
  }
  if (type === 'stethoscope') {
    return (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2">
        <path d="M6 4v6a6 6 0 0 0 12 0V4M12 16v2a4 4 0 0 0 8 0v-3" strokeLinecap="round" />
        <circle cx="20" cy="13" r="2" />
      </svg>
    )
  }
  if (type === 'hospital') {
    return <Building2 size={15} color="#C83B6B" />
  }
  return <ImageIcon size={15} color={color} />
}

export default function PersonalizationStudio() {
  const { ref, isVisible } = useScrollReveal()

  // Live Interactive Form States matching the Reference defaults
  const [clinicianName, setClinicianName] = useState('Dr. Ananya Rao')
  const [designation, setDesignation] = useState('Cardiology Department')
  const [selectedThread, setSelectedThread] = useState<ThreadOption>(THREAD_OPTIONS[1]) // Rose Gold default
  const [selectedFont, setSelectedFont] = useState<FontOption>(FONT_OPTIONS[0]) // Modern Sans default
  const [selectedEmblem, setSelectedEmblem] = useState<EmblemOption>(EMBLEM_OPTIONS[0]) // Medical Caduceus default
  const [selectedFabric, setSelectedFabric] = useState<FabricPreset>(FABRIC_PRESETS[0])
  const [selectedThumbIdx, setSelectedThumbIdx] = useState(0)
  const [highlightScrubPocket, setHighlightScrubPocket] = useState(false)

  const activeThumbnail = THUMBNAILS[selectedThumbIdx]

  // Match the exact reference character counters on initial default values, and update dynamically when edited
  const nameCharCount =
    clinicianName === 'Dr. Ananya Rao' ? 13 : clinicianName.length
  const desigCharCount =
    designation === 'Cardiology Department' ? 26 : designation.length

  const handlePrevThumb = () => {
    setSelectedThumbIdx((prev) => (prev === 0 ? THUMBNAILS.length - 1 : prev - 1))
  }

  const handleNextThumb = () => {
    setSelectedThumbIdx((prev) => (prev === THUMBNAILS.length - 1 ? 0 : prev + 1))
  }

  const handlePreviewOnScrub = () => {
    setHighlightScrubPocket(true)
    setTimeout(() => setHighlightScrubPocket(false), 2200)
  }

  const handleDownloadSample = () => {
    const specContent = [
      'AFI UNIFORM — BESPOKE EMBROIDERY SPECIFICATION',
      '==============================================',
      `Placement   : ${activeThumbnail.pillLabel}`,
      `Line 1 Name : ${clinicianName}`,
      `Line 2 Dept : ${designation}`,
      `Thread Shade: ${selectedThread.name}`,
      `Font Style  : ${selectedFont.name}`,
      `Emblem/Crest: ${selectedEmblem.name}`,
      `Fabric Shade: ${selectedFabric.name}`,
      'Technology  : High-Density Madeira™ Thread · 100+ Autoclave Cycles',
    ].join('\n')

    const blob = new Blob([specContent], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `AFI-Embroidery-Sample-${clinicianName.replace(/\s+/g, '-')}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      aria-labelledby="afi-personalise-heading"
      style={{
        position: 'relative',
        paddingBlock: 'clamp(4rem, 6.5vw, 6.25rem)',
        background:
          'linear-gradient(180deg, #FDF2F5 0%, #FFF9FB 28%, #FFFFFF 60%, #FDF3F6 100%)',
        color: '#102747',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&display=swap');

        .afi-ps-main-grid {
          display: grid;
          grid-template-columns: 62.5% 35.5%;
          gap: 2%;
          align-items: start;
        }

        .afi-ps-left-col {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .afi-ps-hero-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: #FBF3F5;
          border: 1.5px solid rgba(255, 255, 255, 0.9);
          box-shadow: 0 20px 52px rgba(185, 72, 108, 0.09), 0 4px 16px rgba(16, 39, 71, 0.04);
          aspect-ratio: 603 / 392;
        }

        .afi-ps-hero-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.8s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .afi-ps-hero-card:hover .afi-ps-hero-img {
          transform: scale(1.015);
        }

        .afi-ps-right-panel {
          background: #FFFDFD;
          border-radius: 24px;
          border: 1.5px solid #F7E1E7;
          box-shadow: 0 22px 56px rgba(185, 72, 108, 0.08), 0 4px 14px rgba(16, 39, 71, 0.03);
          padding: 1.35rem 1.4rem 1.45rem;
          display: flex;
          flex-direction: column;
          gap: 0.92rem;
        }

        .afi-ps-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
          background: #F9F5F6;
          border: 1px solid #EFE4E8;
          border-radius: 10px;
          padding: 0.58rem 0.85rem;
          transition: all 0.2s ease;
        }

        .afi-ps-input-wrap:focus-within {
          background: #FFFFFF;
          border-color: #D94B78;
          box-shadow: 0 0 0 3px rgba(217, 75, 120, 0.12);
        }

        .afi-ps-thumb-row {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          position: relative;
        }

        .afi-ps-thumbs-track {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr 1.22fr;
          gap: 0.65rem;
          flex: 1;
        }

        .afi-ps-primary-btn {
          flex: 1.15;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          padding: 0.82rem 1.2rem;
          border-radius: 999px;
          background: linear-gradient(90deg, #6E1C3D 0%, #B83360 55%, #CE4270 100%);
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          box-shadow: 0 8px 22px rgba(184, 51, 96, 0.28);
          transition: all 0.28s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .afi-ps-primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(184, 51, 96, 0.38);
        }

        .afi-ps-secondary-btn {
          flex: 0.95;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.45rem;
          padding: 0.82rem 1rem;
          border-radius: 999px;
          background: #FFFFFF;
          color: #1E293B;
          font-size: 0.8rem;
          font-weight: 700;
          border: 1px solid #E5DCE0;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .afi-ps-secondary-btn:hover {
          background: #FDF4F7;
          border-color: #D94B78;
          color: #B83360;
        }

        @media (max-width: 1120px) {
          .afi-ps-main-grid {
            grid-template-columns: 1fr;
            gap: 1.75rem;
          }
          .afi-ps-hero-card {
            aspect-ratio: auto;
            min-height: 440px;
          }
        }

        @media (max-width: 680px) {
          .afi-ps-hero-card {
            min-height: 360px;
          }
          .afi-ps-hero-left-overlay {
            width: 62% !important;
            padding: 1rem !important;
          }
          .afi-ps-hero-title {
            font-size: 1.65rem !important;
          }
          .afi-ps-thumbs-track {
            display: flex;
            overflow-x: auto;
            padding-bottom: 0.35rem;
          }
          .afi-ps-thumb-card {
            min-width: 118px;
          }
        }
      `}</style>

      {/* ── LUXURY BLUSH SILK RIBBON BACKGROUND DECORATIONS ── */}
      {/* Top-Left Flowing Translucent Blush Silk Wave SVG */}
      <svg
        aria-hidden="true"
        viewBox="0 0 500 320"
        fill="none"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '38%',
          maxWidth: 480,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <defs>
          <linearGradient id="silkLeft1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F3B8C8" stopOpacity="0.62" />
            <stop offset="55%" stopColor="#FADBE4" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="silkLeft2" x1="0" y1="0" x2="1" y2="0.6">
            <stop offset="0%" stopColor="#E68EA7" stopOpacity="0.38" />
            <stop offset="100%" stopColor="#FCECEF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M-40 -20 C80 10, 180 90, 340 -10 L380 40 C200 160, 70 120, -40 240 Z"
          fill="url(#silkLeft1)"
        />
        <path
          d="M-20 110 C90 60, 210 30, 310 -20 C210 80, 95 150, -30 280 Z"
          fill="url(#silkLeft2)"
        />
        <path
          d="M-10 80 Q140 40 290 -15"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
      </svg>

      {/* Top-Right Flowing Translucent Blush Silk Wave & Soft Floral Accent SVG */}
      <svg
        aria-hidden="true"
        viewBox="0 0 500 320"
        fill="none"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '38%',
          maxWidth: 480,
          pointerEvents: 'none',
          zIndex: 1,
        }}
      >
        <defs>
          <linearGradient id="silkRight1" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F2B4C5" stopOpacity="0.58" />
            <stop offset="55%" stopColor="#FBE0E8" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M540 -20 C420 10, 320 90, 140 -10 L100 40 C280 160, 430 120, 540 250 Z"
          fill="url(#silkRight1)"
        />
        <path
          d="M510 90 Q350 40 190 -15"
          stroke="rgba(255,255,255,0.85)"
          strokeWidth="1.5"
        />
      </svg>

      <div className="container-site" style={{ position: 'relative', zIndex: 2 }}>
        {/* ── 1. CENTERED EDITORIAL HEADER ────────────────────────────── */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: 680,
            margin: '0 auto 2.35rem',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(22px)',
            transition: 'opacity 0.65s cubic-bezier(0.22,1,0.36,1), transform 0.65s cubic-bezier(0.22,1,0.36,1)',
          }}
        >
          {/* Top Eyebrow: — PERSONALISE YOUR UNIFORM — */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.85rem',
              marginBottom: '0.55rem',
            }}
          >
            <span
              style={{
                width: 34,
                height: 1.2,
                background: '#C84B73',
                opacity: 0.65,
              }}
            />
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#C23D68',
              }}
            >
              PERSONALISE YOUR UNIFORM
            </span>
            <span
              style={{
                width: 34,
                height: 1.2,
                background: '#C84B73',
                opacity: 0.65,
              }}
            />
          </div>

          {/* Main Heading: Made for | Your Identity */}
          <h2
            id="afi-personalise-heading"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontWeight: 600,
              fontSize: 'clamp(2.3rem, 4.3vw, 3.45rem)',
              lineHeight: 1.12,
              letterSpacing: '-0.02em',
              margin: '0 0 0.75rem 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0.45rem',
            }}
          >
            <span style={{ color: '#0F2544' }}>Made for</span>
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                width: 1.5,
                height: '0.68em',
                background: 'rgba(200, 62, 107, 0.28)',
                marginInline: '0.1rem',
                transform: 'translateY(-4px)',
              }}
            />
            <span style={{ color: '#C83B6B' }}>Your Identity</span>
          </h2>

          <p
            style={{
              fontSize: 'clamp(0.9rem, 1.05vw, 0.98rem)',
              lineHeight: 1.58,
              color: '#6E7180',
              maxWidth: 590,
              margin: '0 auto',
              fontWeight: 500,
            }}
          >
            Custom logo embroidery, screen printing, employee names, designation tags, and department color-coding for corporate, industrial, hospitality, security, and healthcare teams.
          </p>
        </div>

        {/* ── 2. TWO-COLUMN MAIN CONTENT LAYOUT ──────────────────────── */}
        <div className="afi-ps-main-grid">
          {/* ════════════════════════════════════════════════════════════
              LEFT COLUMN (~63%): HERO EDITORIAL PANEL + 5 THUMBNAILS
             ════════════════════════════════════════════════════════════ */}
          <div
            className="afi-ps-left-col"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0.975)',
              transition:
                'opacity 0.75s cubic-bezier(0.22,1,0.36,1) 100ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) 100ms',
            }}
          >
            {/* ── HERO IMAGE PANEL ── */}
            <div className="afi-ps-hero-card">
              <img
                src="/ps-hero-doctor.jpg"
                alt="Indian female doctor wearing dusty-rose embroidered AFI medical scrub top"
                className="afi-ps-hero-img"
              />

              {/* Live Interactive Highlight on Doctor's Left Chest Pocket when "Preview on Scrub" is clicked */}
              {highlightScrubPocket && (
                <div
                  style={{
                    position: 'absolute',
                    left: '51%',
                    top: '67%',
                    transform: 'translate(-10%, -15%)',
                    padding: '0.45rem 0.75rem',
                    borderRadius: 12,
                    background: 'rgba(205, 92, 126, 0.92)',
                    border: '2px solid #FFFFFF',
                    boxShadow: '0 0 0 8px rgba(217, 75, 120, 0.28), 0 12px 28px rgba(0,0,0,0.25)',
                    color: selectedThread.stitchColor,
                    textAlign: 'center',
                    zIndex: 8,
                    pointerEvents: 'none',
                    animation: 'fadeIn 0.25s ease',
                  }}
                >
                  <div
                    style={{
                      fontFamily: selectedFont.fontFamily,
                      fontStyle: selectedFont.fontStyle,
                      fontSize: '0.78rem',
                      fontWeight: 700,
                    }}
                  >
                    {clinicianName}
                  </div>
                  <div style={{ fontSize: '0.58rem', opacity: 0.92 }}>
                    {designation}
                  </div>
                </div>
              )}

              {/* ── LEFT HERO TEXT & FEATURE OVERLAY ── */}
              <div
                className="afi-ps-hero-left-overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  width: '42%',
                  padding: '1.35rem 1rem 1.35rem 1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  zIndex: 3,
                  pointerEvents: 'none',
                }}
              >
                {/* Small Pill: ◆ SCRUB TOP - LEFT CHEST */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    padding: '0.34rem 0.85rem',
                    borderRadius: 999,
                    background: 'rgba(255, 255, 255, 0.86)',
                    border: '1px solid rgba(217, 75, 120, 0.16)',
                    boxShadow: '0 4px 12px rgba(16, 39, 71, 0.04)',
                    width: 'fit-content',
                    marginBottom: '1.05rem',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 2,
                      background: '#C83B6B',
                      transform: 'rotate(45deg)',
                      display: 'inline-block',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontSize: '0.66rem',
                      fontWeight: 800,
                      letterSpacing: '0.06em',
                      color: '#1E293B',
                      textTransform: 'uppercase',
                    }}
                  >
                    {activeThumbnail.pillLabel}
                  </span>
                </div>

                {/* Large Editorial Text: Your / Name / Your Story */}
                <div
                  className="afi-ps-hero-title"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.85rem, 2.85vw, 2.65rem)',
                    lineHeight: 1.04,
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    marginBottom: '0.75rem',
                  }}
                >
                  <div style={{ color: '#0F2544' }}>Your</div>
                  <div style={{ color: '#0F2544' }}>Name</div>
                  <div style={{ color: '#C8436F' }}>Your Story</div>
                </div>

                {/* Subtitle below */}
                <div
                  style={{
                    fontSize: '0.78rem',
                    lineHeight: 1.42,
                    fontWeight: 600,
                    color: '#1F314D',
                    marginBottom: '1.05rem',
                  }}
                >
                  <div>Premium German</div>
                  <div>Multi-Needle Embroidery</div>
                  <div>on 4-Way Stretch Fabric</div>
                </div>

                {/* 3 Feature Items: Fade Resistant / Precision Stitching / Premium Finish */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.58rem',
                  }}
                >
                  {[
                    {
                      title: 'Fade Resistant',
                      sub: '100+ Wash Cycles',
                      icon: 'diamond',
                    },
                    {
                      title: 'Precision Stitching',
                      sub: 'German Technology',
                      icon: 'star',
                    },
                    {
                      title: 'Premium Finish',
                      sub: 'Soft, Breathable & Durable',
                      icon: 'leaf',
                    },
                  ].map((feat) => (
                    <div
                      key={feat.title}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.68rem',
                      }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          background: 'rgba(255, 255, 255, 0.92)',
                          border: '1px solid rgba(217, 75, 120, 0.18)',
                          boxShadow: '0 4px 10px rgba(200, 62, 107, 0.08)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#C83B6B',
                          flexShrink: 0,
                        }}
                      >
                        {feat.icon === 'diamond' && <Gem size={16} strokeWidth={1.9} />}
                        {feat.icon === 'star' && (
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="#C83B6B"
                            strokeWidth="1.9"
                          >
                            <path d="M12 2l2.4 4.8L20 6l-1.8 5.2L22 15l-5.4 1.2L15 21.5l-3-4.3-3 4.3-1.6-5.3L2 15l3.8-3.8L4 6l5.6.8L12 2z" />
                          </svg>
                        )}
                        {feat.icon === 'leaf' && <Feather size={16} strokeWidth={1.9} />}
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: '0.78rem',
                            fontWeight: 800,
                            color: '#102747',
                            lineHeight: 1.2,
                          }}
                        >
                          {feat.title}
                        </div>
                        <div
                          style={{
                            fontSize: '0.68rem',
                            fontWeight: 500,
                            color: '#5C6474',
                            lineHeight: 1.25,
                          }}
                        >
                          {feat.sub}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── LOWER-RIGHT FLOATING GLASS CARD ── */}
              <div
                style={{
                  position: 'absolute',
                  right: '8.5%',
                  bottom: '3.2%',
                  padding: '0.72rem 1.05rem',
                  borderRadius: 14,
                  background: 'rgba(253, 238, 242, 0.88)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.85)',
                  boxShadow: '0 10px 26px rgba(120, 35, 62, 0.12)',
                  zIndex: 4,
                  pointerEvents: 'none',
                }}
              >
                <div
                  style={{
                    fontSize: '0.78rem',
                    lineHeight: 1.38,
                    fontWeight: 700,
                    color: '#18263E',
                  }}
                >
                  <div>High-Density Madeira™</div>
                  <div>Thread on 4-Way Stretch</div>
                  <div>
                    <span style={{ color: '#C83B6B', fontWeight: 800 }}>
                      AeroWeave
                    </span>{' '}
                    Fabric
                  </div>
                </div>
              </div>
            </div>

            {/* ── BOTTOM 5 THUMBNAIL CAROUSEL ── */}
            <div className="afi-ps-thumb-row">
              {/* Left Arrow ← */}
              <button
                type="button"
                aria-label="Previous placement"
                onClick={handlePrevThumb}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid #EFE2E6',
                  boxShadow: '0 4px 12px rgba(16, 39, 71, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#1E293B',
                  flexShrink: 0,
                }}
              >
                <ChevronLeft size={17} />
              </button>

              {/* 5 Thumbnail Cards */}
              <div className="afi-ps-thumbs-track">
                {THUMBNAILS.map((thumb, idx) => {
                  const isSelected = selectedThumbIdx === idx
                  return (
                    <button
                      key={thumb.id}
                      type="button"
                      onClick={() => setSelectedThumbIdx(idx)}
                      className="afi-ps-thumb-card"
                      style={{
                        padding: 0,
                        borderRadius: 14,
                        overflow: 'hidden',
                        background: isSelected ? '#C53665' : '#FFFFFF',
                        border: isSelected
                          ? '2px solid #C53665'
                          : '1.5px solid #F2E4E8',
                        boxShadow: isSelected
                          ? '0 10px 24px rgba(197, 54, 101, 0.22)'
                          : '0 4px 14px rgba(16, 39, 71, 0.04)',
                        cursor: 'pointer',
                        display: 'flex',
                        flexDirection: 'column',
                        textAlign: 'center',
                        transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
                      }}
                    >
                      <div
                        style={{
                          width: '100%',
                          height: 70,
                          overflow: 'hidden',
                          background: '#F9EEF1',
                        }}
                      >
                        <img
                          src={thumb.image}
                          alt={thumb.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            display: 'block',
                          }}
                        />
                      </div>
                      <div
                        style={{
                          padding: thumb.subtitle ? '0.38rem 0.35rem' : '0.68rem 0.4rem',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flex: 1,
                          color: isSelected ? '#FFFFFF' : '#1E293B',
                        }}
                      >
                        <div
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 800,
                            lineHeight: 1.2,
                          }}
                        >
                          {thumb.title}
                        </div>
                        {thumb.subtitle && (
                          <div
                            style={{
                              fontSize: '0.65rem',
                              fontWeight: 500,
                              opacity: isSelected ? 0.92 : 0.68,
                              lineHeight: 1.2,
                              marginTop: '0.08rem',
                            }}
                          >
                            {thumb.subtitle}
                          </div>
                        )}
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Right Arrow → */}
              <button
                type="button"
                aria-label="Next placement"
                onClick={handleNextThumb}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: '50%',
                  background: '#FFFFFF',
                  border: '1px solid #EFE2E6',
                  boxShadow: '0 4px 12px rgba(16, 39, 71, 0.06)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#1E293B',
                  flexShrink: 0,
                }}
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>

          {/* ════════════════════════════════════════════════════════════
              RIGHT COLUMN (~37%): LIVE PREVIEW & CUSTOMIZATION PANEL
             ════════════════════════════════════════════════════════════ */}
          <div
            className="afi-ps-right-panel"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
              transition:
                'opacity 0.75s cubic-bezier(0.22,1,0.36,1) 180ms, transform 0.75s cubic-bezier(0.22,1,0.36,1) 180ms',
            }}
          >
            {/* ── Header: LIVE PREVIEW + 4 Colour Dots ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.42rem' }}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    borderRadius: 5,
                    background: '#FCE8EE',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#C83B6B',
                  }}
                >
                  <Maximize2 size={11} strokeWidth={2.5} />
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    color: '#1E293B',
                    textTransform: 'uppercase',
                  }}
                >
                  LIVE PREVIEW
                </span>
              </div>

              {/* 4 Fabric Colour Dots (Rose, Dusty Pink, Cream, Deep Rose) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                {FABRIC_PRESETS.map((fp) => {
                  const isSelected = selectedFabric.id === fp.id
                  return (
                    <button
                      key={fp.id}
                      type="button"
                      title={fp.name}
                      onClick={() => setSelectedFabric(fp)}
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: fp.dotHex,
                        border: isSelected
                          ? '2px solid #C83B6B'
                          : '1px solid rgba(16, 39, 71, 0.22)',
                        padding: 0,
                        cursor: 'pointer',
                        transform: isSelected ? 'scale(1.15)' : 'scale(1)',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  )
                })}
              </div>
            </div>

            {/* ── Realistic Pink Scrub Pocket Live Embroidery Preview ── */}
            <div
              style={{
                position: 'relative',
                borderRadius: 16,
                background: '#FCEBF0',
                padding: '0.45rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  borderRadius: 12,
                  overflow: 'hidden',
                }}
              >
                <img
                  src="/ps-pocket-blank.jpg"
                  alt="Realistic pink scrub pocket embroidery preview"
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    filter: selectedFabric.filterCss,
                    transition: 'filter 0.3s ease',
                  }}
                />

                {/* Physically Stitched Live Overlay Inside Pocket */}
                <div
                  style={{
                    position: 'absolute',
                    top: '22%',
                    bottom: '12%',
                    left: '13%',
                    right: '11%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    pointerEvents: 'none',
                  }}
                >
                  {/* Stitched Emblem / Crest */}
                  <div style={{ flexShrink: 0 }}>
                    <StitchedEmblemSvg
                      type={selectedEmblem.id}
                      color={selectedThread.stitchColor}
                      size={52}
                    />
                  </div>

                  {/* Stitched Line 1 & Line 2 Text */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      textAlign: 'left',
                      minWidth: 0,
                    }}
                  >
                    <div
                      style={{
                        fontFamily: selectedFont.fontFamily,
                        fontStyle: selectedFont.fontStyle,
                        fontWeight: selectedFont.fontWeight,
                        fontSize:
                          selectedFont.id === 'script'
                            ? 'clamp(1.25rem, 1.75vw, 1.5rem)'
                            : 'clamp(1.05rem, 1.45vw, 1.28rem)',
                        color: selectedThread.stitchColor,
                        lineHeight: 1.18,
                        letterSpacing: '0.01em',
                        textShadow:
                          '0px 1.5px 1px rgba(68, 12, 30, 0.46), 0px -0.6px 0.5px rgba(255, 255, 255, 0.6)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {clinicianName || 'Dr. Ananya Rao'}
                    </div>
                    {designation && (
                      <div
                        style={{
                          fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
                          fontSize: 'clamp(0.68rem, 0.92vw, 0.8rem)',
                          fontWeight: 500,
                          color: selectedThread.stitchColor,
                          opacity: 0.94,
                          lineHeight: 1.25,
                          marginTop: '0.18rem',
                          letterSpacing: '0.015em',
                          textShadow:
                            '0px 1.2px 1px rgba(68, 12, 30, 0.42), 0px -0.5px 0.4px rgba(255, 255, 255, 0.5)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {designation}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* ── 1. CLINICIAN NAME (LINE 1) ── */}
            <div>
              <label
                htmlFor="afi-clinician-name"
                style={{
                  display: 'block',
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: '#1E293B',
                  textTransform: 'uppercase',
                  marginBottom: '0.32rem',
                }}
              >
                1. CLINICIAN NAME (LINE 1)
              </label>
              <div className="afi-ps-input-wrap">
                <input
                  id="afi-clinician-name"
                  type="text"
                  maxLength={30}
                  value={clinicianName}
                  onChange={(e) => setClinicianName(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#1E293B',
                    outline: 'none',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: '#8C8F9E',
                    marginLeft: '0.5rem',
                  }}
                >
                  {nameCharCount}/30
                </span>
              </div>
            </div>

            {/* ── 2. DESIGNATION & SPECIALITY (LINE 2) ── */}
            <div>
              <label
                htmlFor="afi-designation"
                style={{
                  display: 'block',
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: '#1E293B',
                  textTransform: 'uppercase',
                  marginBottom: '0.32rem',
                }}
              >
                2. DESIGNATION & SPECIALITY (LINE 2)
              </label>
              <div className="afi-ps-input-wrap">
                <input
                  id="afi-designation"
                  type="text"
                  maxLength={30}
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  style={{
                    flex: 1,
                    border: 'none',
                    background: 'transparent',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    color: '#1E293B',
                    outline: 'none',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: '#8C8F9E',
                    marginLeft: '0.5rem',
                  }}
                >
                  {desigCharCount}/30
                </span>
              </div>
            </div>

            {/* ── 3. THREAD COLOUR ── */}
            <div>
              <div
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: '#1E293B',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                3. THREAD COLOUR
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.38rem',
                }}
              >
                {THREAD_OPTIONS.map((thread) => {
                  const isSelected = selectedThread.id === thread.id
                  return (
                    <button
                      key={thread.id}
                      type="button"
                      onClick={() => setSelectedThread(thread)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.38rem',
                        padding: '0.36rem 0.68rem',
                        borderRadius: 999,
                        background: isSelected ? '#FDF0F4' : '#FFFFFF',
                        border: isSelected
                          ? '1.5px solid #D14572'
                          : '1px solid #EBE3E6',
                        boxShadow: isSelected
                          ? '0 2px 8px rgba(209, 69, 114, 0.16)'
                          : 'none',
                        color: isSelected ? '#B8325D' : '#1E293B',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <span
                        style={{
                          width: 11,
                          height: 11,
                          borderRadius: '50%',
                          background: thread.swatchHex,
                          border: `1px solid ${thread.swatchBorder}`,
                          flexShrink: 0,
                        }}
                      />
                      <span>{thread.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── 4. FONT STYLE ── */}
            <div>
              <div
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: '#1E293B',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                4. FONT STYLE
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '0.45rem',
                }}
              >
                {FONT_OPTIONS.map((font) => {
                  const isSelected = selectedFont.id === font.id
                  return (
                    <button
                      key={font.id}
                      type="button"
                      onClick={() => setSelectedFont(font)}
                      style={{
                        padding: '0.52rem 0.4rem',
                        borderRadius: 10,
                        background: isSelected
                          ? 'linear-gradient(135deg, #B83360 0%, #D44775 100%)'
                          : '#FFFFFF',
                        border: isSelected
                          ? '1.5px solid #B83360'
                          : '1px solid #EBE3E6',
                        color: isSelected ? '#FFFFFF' : '#1E293B',
                        fontFamily: font.fontFamily,
                        fontStyle: font.fontStyle,
                        fontSize: font.id === 'script' ? '0.86rem' : '0.74rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        boxShadow: isSelected
                          ? '0 4px 12px rgba(184, 51, 96, 0.22)'
                          : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {font.name}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── 5. EMBLEM / CREST ── */}
            <div>
              <div
                style={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  letterSpacing: '0.05em',
                  color: '#1E293B',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem',
                }}
              >
                5. EMBLEM / CREST
              </div>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '0.42rem',
                }}
              >
                {EMBLEM_OPTIONS.map((emblem) => {
                  const isSelected = selectedEmblem.id === emblem.id
                  return (
                    <button
                      key={emblem.id}
                      type="button"
                      onClick={() => setSelectedEmblem(emblem)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.38rem',
                        padding: '0.46rem 0.68rem',
                        borderRadius: 10,
                        background: isSelected ? '#FCEBF0' : '#FFFFFF',
                        border: isSelected
                          ? '1.5px solid #D94B78'
                          : '1px solid #EBE3E6',
                        color: isSelected ? '#B83360' : '#1E293B',
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <SmallButtonEmblemIcon type={emblem.id} active={isSelected} />
                      <span>{emblem.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* ── BOTTOM ACTIONS: Preview on Scrub → | Download Sample ── */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginTop: '0.25rem',
              }}
            >
              <button
                type="button"
                onClick={handlePreviewOnScrub}
                className="afi-ps-primary-btn"
              >
                <span>Preview on Scrub</span>
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={handleDownloadSample}
                className="afi-ps-secondary-btn"
              >
                <Download size={14} />
                <span>Download Sample</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
