/**
 * EditorialJournal — Section 15: BLOG PREVIEW
 * ─────────────────────────────────────────────────────────────
 * Three editorial magazine cards:
 *   1. Fit Guide
 *   2. Fabric Care
 *   3. Uniform Selection
 *
 * Designed as high-fashion / clinical magazine editorial features
 * rather than generic ecommerce blog cards.
 */

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Feather } from 'lucide-react'

interface MagazineArticle {
  id: string
  topic: 'Fit Guide' | 'Fabric Care' | 'Uniform Selection'
  issueTag: string
  headline: string
  kicker: string
  excerpt: string
  author: string
  authorRole: string
  readTime: string
  image: string
  imagePos: string
  accentColor: string
  href: string
}

const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: 'fit-guide',
    topic: 'Fit Guide',
    issueTag: 'Volume IV · Editorial No. 01',
    kicker: 'Clinical Ergonomics & Human Geometry',
    headline: 'The Anatomy of Movement: Tailoring Inseams, Articulated Knees, and 360° Surgical Drape',
    excerpt: 'Generic hospital scrubs fail because they assume a static clinician. An in-depth ergonomic study into why gusseted underarms and 4-way micro-twill eliminate shift shoulder drag.',
    author: 'Dr. Siddharth Verma',
    authorRole: 'Fellow, Clinical Ergonomics Group',
    readTime: '6 Min Read',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.2',
    imagePos: 'center 20%',
    accentColor: '#1C4DA1',
    href: '/blog/fit-guide',
  },
  {
    id: 'fabric-care',
    topic: 'Fabric Care',
    issueTag: 'Volume IV · Editorial No. 02',
    kicker: 'Textile Science & Laundry Protocol',
    headline: 'The Autoclave Survival Protocol: Protecting Vat Dyes and Antimicrobial Bonds Under 85°C Laundry Heat',
    excerpt: 'How commercial hospital laundries strip inferior fibers, and the scientific wash sequence that preserves ColorLock™ molecular dye bonds across 100+ high-temp wash cycles.',
    author: 'AFI Textile Research Lab',
    authorRole: 'Surat Advanced Weaving Facility',
    readTime: '4 Min Read',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.5&fp-y=0.2',
    imagePos: 'center 25%',
    accentColor: '#0D9488',
    href: '/blog/fabric-care',
  },
  {
    id: 'uniform-selection',
    topic: 'Uniform Selection',
    issueTag: 'Volume IV · Editorial No. 03',
    kicker: 'Institutional Standards & Specialty Matrices',
    headline: 'From Trauma Bay to Aesthetic Suite: The Chief Medical Officer’s Uniform Selection Matrix',
    excerpt: 'A comprehensive decision guide matching clinical specialties with GSM weights, fluid-barrier HydroDrop™ ratings, and neurological color psychology across medical teams.',
    author: 'AFI Clinical Advisory Board',
    authorRole: 'Panel of 12 Senior Department Heads',
    readTime: '8 Min Read',
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=900&q=85&fit=crop&crop=focalpoint&fp-x=0.45&fp-y=0.25',
    imagePos: 'center 18%',
    accentColor: '#2563EB',
    href: '/blog/uniform-selection',
  },
]

export default function EditorialJournal() {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)

  return (
    <section
      aria-labelledby="magazine-heading"
      style={{
        paddingBlock: 'clamp(4.5rem, 8vw, 7.5rem)',
        background: 'var(--color-neutral-50)',
        borderTop: '1px solid var(--color-neutral-200)',
        borderBottom: '1px solid var(--color-neutral-200)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div className="container-site">
        {/* Magazine Editorial Header */}
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
              <Feather size={14} style={{ color: 'var(--color-medical-blue)' }} />
              <span
                style={{
                  fontSize: '0.725rem',
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'var(--color-medical-blue)',
                }}
              >
                The AFI Review · Medical Quarterly
              </span>
            </div>

            <h2
              id="magazine-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(2.25rem, 4vw, 3.4rem)',
                color: 'var(--color-navy)',
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
              }}
            >
              Clinical & Textile Editorial
            </h2>

            <p style={{ color: 'var(--color-neutral-500)', fontSize: '1.05rem', marginTop: '0.5rem', maxWidth: 540 }}>
              Rigorous research essays and practitioner guides exploring garment architecture, sterilization science, and department aesthetics.
            </p>
          </div>

          <Link
            to="/blog"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.9rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--color-navy)',
              textDecoration: 'none',
              paddingBottom: '3px',
              borderBottom: '2.5px solid var(--color-medical-blue)',
              transition: 'all 0.2s ease',
            }}
          >
            Explore Complete Library <ArrowRight size={15} />
          </Link>
        </div>

        {/* ── 3 EDITORIAL MAGAZINE CARDS ── */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 'clamp(1.5rem, 2.5vw, 2.5rem)',
          }}
        >
          {MAGAZINE_ARTICLES.map((article) => {
            const isHovered = hoveredCard === article.id
            return (
              <article
                key={article.id}
                onMouseEnter={() => setHoveredCard(article.id)}
                onMouseLeave={() => setHoveredCard(null)}
                style={{
                  background: 'white',
                  borderRadius: 'clamp(18px, 2vw, 26px)',
                  border: '1.5px solid var(--color-neutral-200)',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isHovered ? '0 25px 60px rgba(10,22,40,0.12)' : 'var(--shadow-card)',
                  transform: isHovered ? 'translateY(-6px)' : 'translateY(0)',
                  transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
                  position: 'relative',
                }}
              >
                {/* ── Magazine Cover Imagery Frame ── */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', overflow: 'hidden', background: '#0A1628' }}>
                  <img
                    src={article.image}
                    alt={article.headline}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: article.imagePos,
                      transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                      transition: 'transform 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />

                  {/* Gradient Film */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 60%)',
                    }}
                  />

                  {/* Top Left: Topic Pill */}
                  <div style={{ position: 'absolute', top: '1.15rem', left: '1.15rem' }}>
                    <span
                      style={{
                        background: 'rgba(255,255,255,0.92)',
                        backdropFilter: 'blur(8px)',
                        color: 'var(--color-navy)',
                        padding: '0.35rem 0.85rem',
                        borderRadius: 100,
                        fontSize: '0.725rem',
                        fontWeight: 900,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.12)',
                      }}
                    >
                      {article.topic}
                    </span>
                  </div>

                  {/* Top Right: Read Time */}
                  <div style={{ position: 'absolute', top: '1.15rem', right: '1.15rem' }}>
                    <span
                      style={{
                        background: 'rgba(10,22,40,0.75)',
                        backdropFilter: 'blur(8px)',
                        color: 'white',
                        padding: '0.3rem 0.75rem',
                        borderRadius: 100,
                        fontSize: '0.7rem',
                        fontWeight: 700,
                        border: '1px solid rgba(255,255,255,0.2)',
                      }}
                    >
                      {article.readTime}
                    </span>
                  </div>

                  {/* Bottom Image Sub-tag */}
                  <div style={{ position: 'absolute', bottom: '0.85rem', left: '1.15rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.725rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    {article.issueTag}
                  </div>
                </div>

                {/* ── Editorial Story Content ── */}
                <div style={{ padding: 'clamp(1.5rem, 2.5vw, 2.25rem)', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                  <div>
                    {/* Kicker Eyebrow */}
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-medical-blue)', marginBottom: '0.45rem' }}>
                      {article.kicker}
                    </div>

                    {/* Headline */}
                    <Link to={article.href} style={{ textDecoration: 'none' }}>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontWeight: 800,
                          fontSize: 'clamp(1.2rem, 1.8vw, 1.4rem)',
                          color: 'var(--color-navy)',
                          lineHeight: 1.3,
                          letterSpacing: '-0.02em',
                          marginBottom: '0.85rem',
                          transition: 'color 0.2s ease',
                        }}
                      >
                        {article.headline}
                      </h3>
                    </Link>

                    {/* Excerpt */}
                    <p style={{ color: 'var(--color-neutral-600)', fontSize: '0.925rem', lineHeight: 1.65, marginBottom: '1.5rem' }}>
                      {article.excerpt}
                    </p>
                  </div>

                  {/* ── Magazine Byline & Link Footer ── */}
                  <div
                    style={{
                      borderTop: '1.5px solid var(--color-neutral-200)',
                      paddingTop: '1.25rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '1rem',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: '0.875rem', color: 'var(--color-navy)' }}>
                        {article.author}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--color-neutral-400)', fontWeight: 500 }}>
                        {article.authorRole}
                      </div>
                    </div>

                    <Link
                      to={article.href}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        background: isHovered ? 'var(--color-navy)' : 'var(--color-neutral-100)',
                        color: isHovered ? 'white' : 'var(--color-navy)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textDecoration: 'none',
                        transition: 'all 0.25s ease',
                        flexShrink: 0,
                      }}
                      title="Read Article"
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
