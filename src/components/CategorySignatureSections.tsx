/**
 * CategorySignatureSections — Signature Uniform Category Showcases & Product Catalog
 * ─────────────────────────────────────────────────────────────
 * Features:
 * 1. Category Pill Navigation Bar (6 Categories matching Women dropdown):
 *    - Corporate Blazers & Shirts
 *    - Hospitality & Front-Office
 *    - Women's Scrub Sets
 *    - Education & Faculty Wear
 *    - Industrial & Lab Coats
 *    - Plus Size Range
 * 2. Stacked Category Rows (displayed one below another):
 *    - Left Hero Card (~32% width, ~380px height)
 *    - Right Product Track (~68% width, exactly 4 cards visible at once, with smooth horizontal scroll & arrows for all 5 styles)
 * 3. 100% Product-Only Photography (No human models/faces — clean e-commerce ghost mannequin & studio catalog shots)
 *    - 5 Corporate Product Styles (corp-prod-1 to corp-prod-5)
 *    - 5 Hospitality Product Styles (hosp-prod-1 to hosp-prod-5)
 *    - 5 Scrub Set Product Styles (scrubs-prod-1 to scrubs-prod-5)
 *    - 5 Education & Faculty Product Styles (edu-prod-1 to edu-prod-5)
 *    - 5 Industrial & Lab Coat Styles (ind-prod-1 to ind-prod-5)
 *    - 5 Plus Size Range Styles (plus-prod-1 to plus-prod-5)
 * 4. Dedicated "AFI Uniforms Client Presentation Lookbook" at the bottom displaying ALL 30 product images
 *    with interactive category filters and high-res lightbox view.
 */

import React, { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Stethoscope,
  Briefcase,
  HardHat,
  ConciergeBell,
  GraduationCap,
  Sparkles,
  ArrowRight,
  Heart,
  ShoppingBag,
  Check,
  ChevronLeft,
  ChevronRight,
  Camera,
  X,
  Maximize2,
  Package,
} from 'lucide-react'
import { useStore } from '../context/StoreContext'
import type { Product } from '../context/StoreContext'

const EASE = 'cubic-bezier(0.22, 1, 0.36, 1)'

function formatPrice(p: number) {
  return `₹${p.toLocaleString('en-IN')}`
}

export type CategoryKey =
  | 'corporate'
  | 'hospitality'
  | 'scrubs'
  | 'education'
  | 'industrial'
  | 'plussize'

interface CategoryProductItem extends Product {
  eyebrow: string
  dateLabel: string
  badgeText: 'NEW' | 'JUST IN'
  extraColoursLabel: string
  specNote?: string
}

interface CategoryData {
  id: CategoryKey
  name: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>
  eyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroBg: string
  exploreLink: string
  products: CategoryProductItem[]
}

const CATEGORIES: CategoryData[] = [
  {
    id: 'corporate',
    name: 'Corporate Blazers & Shirts',
    icon: Briefcase,
    eyebrow: 'EXECUTIVE OFFICE WEAR',
    heroTitle: 'Executive Tailoring & Power Silhouettes.',
    heroSubtitle:
      'Precision-tailored blazers and crisp wrinkle-resistant shirts engineered for corporate boardrooms and tech park offices.',
    heroBg: '/products/women/corp/corp-prod-1.jpg',
    exploreLink: '/women?category=corporate',
    products: [
      {
        id: 'corp-p1',
        name: "Women's Executive Tailored Navy Blazer",
        price: 2499,
        originalPrice: 3299,
        image: '/products/women/corp/corp-prod-1.jpg',
        category: 'corporate',
        collection: 'EXECUTIVE SUITING',
        eyebrow: 'EXECUTIVE BLAZER',
        badgeText: 'NEW',
        dateLabel: '28 Mar 2026',
        specNote: 'Wrinkle-Resistant Poly-Viscose | Notched Lapel',
        colors: ['#0B2744', '#1E3A8A', '#334155'],
        extraColoursLabel: '+2 colours',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 'corp-p2',
        name: 'Crisp White Formal Oxford Dress Shirt',
        price: 1299,
        originalPrice: 1799,
        image: '/products/women/corp/corp-prod-2.jpg',
        category: 'corporate',
        collection: 'CORPORATE BASICS',
        eyebrow: 'FORMAL SHIRTING',
        badgeText: 'JUST IN',
        dateLabel: '25 Mar 2026',
        specNote: '100% Breathable Egyptian Cotton | Easy Care',
        colors: ['#FFFFFF', '#E0F2FE', '#F8FAFC'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'corp-p3',
        name: 'Charcoal Grey 2-Piece Corporate Suiting Set',
        price: 3899,
        originalPrice: 4999,
        image: '/products/women/corp/corp-prod-3.jpg',
        category: 'corporate',
        collection: 'PREMIUM SUITING',
        eyebrow: '2-PIECE ENSEMBLE',
        badgeText: 'NEW',
        dateLabel: '23 Mar 2026',
        specNote: 'Structured Blazer + Tailored Skirt Set',
        colors: ['#374151', '#1F2937', '#0F172A'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'corp-p4',
        name: 'Sky Blue Pleated Silk-Blend Office Blouse',
        price: 1499,
        originalPrice: 1999,
        image: '/products/women/corp/corp-prod-4.jpg',
        category: 'corporate',
        collection: 'EXECUTIVE SHIRTS',
        eyebrow: 'OFFICE BLOUSE',
        badgeText: 'JUST IN',
        dateLabel: '21 Mar 2026',
        specNote: 'Pleated Front Drape | All-Day Flex Breathable',
        colors: ['#BAE6FD', '#E0F2FE', '#FFFFFF'],
        extraColoursLabel: '+2 colours',
        sizes: ['XS', 'S', 'M', 'L'],
      },
      {
        id: 'corp-p5',
        name: 'Camel Sand Slim-Fit Corporate Blazer',
        price: 2699,
        originalPrice: 3499,
        image: '/products/women/corp/corp-prod-5.jpg',
        category: 'corporate',
        collection: 'MODERN EXECUTIVE',
        eyebrow: 'TAILORED BLAZER',
        badgeText: 'NEW',
        dateLabel: '19 Mar 2026',
        specNote: 'Tortoiseshell Button Accent | Stretch Lining',
        colors: ['#D4A373', '#CCD5AE', '#0B2744'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Front-Office',
    icon: ConciergeBell,
    eyebrow: 'HOTEL & GUEST RELATIONS',
    heroTitle: 'Luxury Guest Welcomes & Front-Desk Elegance.',
    heroSubtitle:
      'Distinguished concierge suiting, mandarin tunics, and hospitality blazers crafted for 5-star hotel receptions and guest relations.',
    heroBg: '/products/women/hosp/hosp-prod-1.jpg',
    exploreLink: '/women?category=hospitality',
    products: [
      {
        id: 'hosp-p1',
        name: 'Royal Burgundy Velvet Shawl Concierge Blazer',
        price: 2799,
        originalPrice: 3699,
        image: '/products/women/hosp/hosp-prod-1.jpg',
        category: 'hospitality',
        collection: 'LUXURY CONCIERGE',
        eyebrow: 'HOTEL BLAZER',
        badgeText: 'NEW',
        dateLabel: '27 Mar 2026',
        specNote: 'Satin Shawl Lapel | Polished Gold Buttons',
        colors: ['#4A0404', '#1E1B4B', '#000000'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'hosp-p2',
        name: 'Mandarin Collar Ivory Guest Relations Tunic',
        price: 2199,
        originalPrice: 2899,
        image: '/products/women/hosp/hosp-prod-2.jpg',
        category: 'hospitality',
        collection: 'GUEST RELATIONS',
        eyebrow: 'RECEPTION TUNIC',
        badgeText: 'JUST IN',
        dateLabel: '24 Mar 2026',
        specNote: 'Gold Piping Placket | Stain-Release Microfiber',
        colors: ['#FEF9C3', '#F8FAFC', '#E2E8F0'],
        extraColoursLabel: '+1 colour',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 'hosp-p3',
        name: 'Formal Tailored Hospitality Vest & Shirt Kit',
        price: 1899,
        originalPrice: 2499,
        image: '/products/women/hosp/hosp-prod-3.jpg',
        category: 'hospitality',
        collection: 'BANQUET SERVICE',
        eyebrow: 'WAISTCOAT & SHIRT',
        badgeText: 'NEW',
        dateLabel: '22 Mar 2026',
        specNote: '4-Button Tailored Waistcoat + Oxford Shirt',
        colors: ['#0F172A', '#1E293B', '#334155'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'hosp-p4',
        name: 'Emerald Green Reception Suiting Blazer',
        price: 2599,
        originalPrice: 3399,
        image: '/products/women/hosp/hosp-prod-4.jpg',
        category: 'hospitality',
        collection: 'FRONT OFFICE',
        eyebrow: 'HOTEL SUITING',
        badgeText: 'JUST IN',
        dateLabel: '20 Mar 2026',
        specNote: 'Tailored Notch Lapels | AFI Hospitality Standard',
        colors: ['#064E3B', '#065F46', '#0F766E'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'hosp-p5',
        name: 'Midnight Navy Front-Office Formal Belted Dress',
        price: 2399,
        originalPrice: 3199,
        image: '/products/women/hosp/hosp-prod-5.jpg',
        category: 'hospitality',
        collection: 'HOTEL APPAREL',
        eyebrow: 'UNIFORM DRESS',
        badgeText: 'NEW',
        dateLabel: '17 Mar 2026',
        specNote: 'Gold Clasp Belted Waist | Anti-Crease Crepe Weave',
        colors: ['#0B2744', '#1E3A8A', '#000000'],
        extraColoursLabel: '+1 colour',
        sizes: ['XS', 'S', 'M', 'L'],
      },
    ],
  },
  {
    id: 'scrubs',
    name: "Women's Scrub Sets",
    icon: Stethoscope,
    eyebrow: 'HEALTHCARE & CLINICAL SETS',
    heroTitle: 'Clinical Comfort & Antimicrobial Protection.',
    heroSubtitle:
      '4-way stretch scrub tops and jogger sets engineered for doctors, nurses, and surgeons through 14-hour hospital shifts.',
    heroBg: '/products/women/scrubs/scrubs-prod-1.jpg',
    exploreLink: '/collections/scrubs',
    products: [
      {
        id: 'scrubs-p1',
        name: 'Ceil Blue 4-Way Stretch Scrub Set',
        price: 1499,
        originalPrice: 1999,
        image: '/products/women/scrubs/scrubs-prod-1.jpg',
        category: 'healthcare',
        collection: 'CLINICAL SCRUBS',
        eyebrow: 'CLINICAL SCRUB SET',
        badgeText: 'NEW',
        dateLabel: '26 Mar 2026',
        specNote: 'Antimicrobial Silver Weave | Flex Jogger Ankle',
        colors: ['#7DD3FC', '#0284C7', '#0369A1'],
        extraColoursLabel: '+3 colours',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 'scrubs-p2',
        name: 'Deep Wine Multi-Pocket Clinical Scrub Suit',
        price: 1599,
        originalPrice: 2099,
        image: '/products/women/scrubs/scrubs-prod-2.jpg',
        category: 'healthcare',
        collection: 'NURSING PRO',
        eyebrow: 'CARGO SCRUB SET',
        badgeText: 'JUST IN',
        dateLabel: '23 Mar 2026',
        specNote: '6 Utility Cargo Pockets | Fluid-Repellent Twill',
        colors: ['#881337', '#9F1239', '#4C0519'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'scrubs-p3',
        name: 'Hospital Navy Flex-Knit Nursing Scrub Set',
        price: 1549,
        originalPrice: 1999,
        image: '/products/women/scrubs/scrubs-prod-3.jpg',
        category: 'healthcare',
        collection: 'CLINICAL MOTION',
        eyebrow: 'ATHLETIC SCRUB SUIT',
        badgeText: 'NEW',
        dateLabel: '21 Mar 2026',
        specNote: 'Rib-Knit Side Stretch Panels | Drawstring Waist',
        colors: ['#0B2744', '#1E3A8A', '#0F172A'],
        extraColoursLabel: '+2 colours',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 'scrubs-p4',
        name: 'Sage Green Mandarin OT Surgical Scrub Set',
        price: 1699,
        originalPrice: 2199,
        image: '/products/women/scrubs/scrubs-prod-4.jpg',
        category: 'healthcare',
        collection: 'SURGICAL THEATRE',
        eyebrow: 'SURGICAL SCRUBS',
        badgeText: 'JUST IN',
        dateLabel: '18 Mar 2026',
        specNote: 'Mandarin Notch Collar | Autoclave Safe Lint-Free',
        colors: ['#84A98C', '#52796F', '#2F3E46'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'scrubs-p5',
        name: 'Royal Blue Performance Athletic Scrub Suit',
        price: 1649,
        originalPrice: 2149,
        image: '/products/women/scrubs/scrubs-prod-5.jpg',
        category: 'healthcare',
        collection: 'PERFORMANCE WEAR',
        eyebrow: 'PRO SCRUB SUIT',
        badgeText: 'NEW',
        dateLabel: '15 Mar 2026',
        specNote: 'Badge Loop & Pen Pocket | Quick-Drying Fabric',
        colors: ['#1D4ED8', '#2563EB', '#1E40AF'],
        extraColoursLabel: '+3 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  {
    id: 'education',
    name: 'Education & Faculty Wear',
    icon: GraduationCap,
    eyebrow: 'SCHOOL & UNIVERSITY UNIFORMS',
    heroTitle: 'Academic Prestige & Faculty Professionalism.',
    heroSubtitle:
      'Institutional blazers, crest jackets, and educator tunics designed for universities, schools, and academic faculty.',
    heroBg: '/products/women/edu/edu-prod-1.jpg',
    exploreLink: '/women?category=education',
    products: [
      {
        id: 'edu-p1',
        name: 'Collegiate Crest Navy Faculty Blazer',
        price: 2299,
        originalPrice: 2999,
        image: '/products/women/edu/edu-prod-1.jpg',
        category: 'education',
        collection: 'CAMPUS CREST',
        eyebrow: 'FACULTY BLAZER',
        badgeText: 'NEW',
        dateLabel: '25 Mar 2026',
        specNote: 'Gold Embroidered Crest | Brass Shank Buttons',
        colors: ['#0B2744', '#1E3A8A', '#000000'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'edu-p2',
        name: 'Sand Beige & Maroon Piped Teacher Jacket',
        price: 2199,
        originalPrice: 2849,
        image: '/products/women/edu/edu-prod-2.jpg',
        category: 'education',
        collection: 'EDUCATOR SERIES',
        eyebrow: 'TEACHER BLAZER',
        badgeText: 'JUST IN',
        dateLabel: '22 Mar 2026',
        specNote: 'Contrast Maroon Piping | Wrinkle-Resistant Blend',
        colors: ['#E6CCB2', '#DDB892', '#7F1D1D'],
        extraColoursLabel: '+2 colours',
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
      },
      {
        id: 'edu-p3',
        name: 'Grey Micro-Check Faculty Waistcoat & Shirt',
        price: 1799,
        originalPrice: 2399,
        image: '/products/women/edu/edu-prod-3.jpg',
        category: 'education',
        collection: 'ACADEMIC FORMAL',
        eyebrow: 'WAISTCOAT SET',
        badgeText: 'NEW',
        dateLabel: '19 Mar 2026',
        specNote: 'Houndstooth Pattern Weave + Crisp White Shirt',
        colors: ['#6B7280', '#4B5563', '#9CA3AF'],
        extraColoursLabel: '+1 colour',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'edu-p4',
        name: 'Forest Green Professor Academic Blazer',
        price: 2499,
        originalPrice: 3299,
        image: '/products/women/edu/edu-prod-4.jpg',
        category: 'education',
        collection: 'UNIVERSITY ELITE',
        eyebrow: 'PROFESSOR BLAZER',
        badgeText: 'JUST IN',
        dateLabel: '16 Mar 2026',
        specNote: 'Wool-Touch Suiting | Notched Collar & Horn Buttons',
        colors: ['#14532D', '#166534', '#064E3B'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'edu-p5',
        name: 'Navy & White Piped Institutional Tunic',
        price: 1999,
        originalPrice: 2599,
        image: '/products/women/edu/edu-prod-5.jpg',
        category: 'education',
        collection: 'INSTITUTIONAL WEAR',
        eyebrow: 'EDUCATOR TUNIC',
        badgeText: 'NEW',
        dateLabel: '14 Mar 2026',
        specNote: 'Stand Collar With Contrast Piping | Patch Pockets',
        colors: ['#0B2744', '#1E293B', '#FFFFFF'],
        extraColoursLabel: '+1 colour',
        sizes: ['XS', 'S', 'M', 'L'],
      },
    ],
  },
  {
    id: 'industrial',
    name: 'Industrial & Lab Coats',
    icon: HardHat,
    eyebrow: 'TECHNICAL & QC COATS',
    heroTitle: 'Heavy-Duty Protection & Laboratory Precision.',
    heroSubtitle:
      'Cleanroom lab coats, antistatic QC coats, and high-visibility safety jackets meeting stringent industrial and laboratory safety norms.',
    heroBg: '/products/women/ind/ind-prod-1.jpg',
    exploreLink: '/collections/lab-coats',
    products: [
      {
        id: 'ind-p1',
        name: 'Pure White Antimicrobial Laboratory Coat',
        price: 1299,
        originalPrice: 1699,
        image: '/products/women/ind/ind-prod-1.jpg',
        category: 'industrial',
        collection: 'LAB PRECISION',
        eyebrow: 'LABORATORY COAT',
        badgeText: 'NEW',
        dateLabel: '26 Mar 2026',
        specNote: 'Snap Button Front | Dual Pen Slot & Deep Pockets',
        colors: ['#FFFFFF', '#F8FAFC', '#E2E8F0'],
        extraColoursLabel: '+1 colour',
        sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'ind-p2',
        name: 'High-Visibility 3M Reflective Safety Work Jacket',
        price: 1899,
        originalPrice: 2499,
        image: '/products/women/ind/ind-prod-2.jpg',
        category: 'industrial',
        collection: 'SAFETY SHIELD',
        eyebrow: 'HI-VIS WORKWEAR',
        badgeText: 'JUST IN',
        dateLabel: '23 Mar 2026',
        specNote: 'Class 2 Reflective Tape | Water-Resistant Shell',
        colors: ['#EAB308', '#FACC15', '#0B2744'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      },
      {
        id: 'ind-p3',
        name: 'ESD Antistatic Cleanroom QC Inspection Coat',
        price: 1499,
        originalPrice: 1999,
        image: '/products/women/ind/ind-prod-3.jpg',
        category: 'industrial',
        collection: 'TECH CLEANROOM',
        eyebrow: 'QC TECHNICAL COAT',
        badgeText: 'NEW',
        dateLabel: '20 Mar 2026',
        specNote: 'Conductive Grid Weave | Knit Cuffs & Placket',
        colors: ['#0B2744', '#1E3A8A', '#0284C7'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'ind-p4',
        name: 'Petrol Blue Multi-Pocket Plant Technician Jacket',
        price: 1799,
        originalPrice: 2349,
        image: '/products/women/ind/ind-prod-4.jpg',
        category: 'industrial',
        collection: 'PLANT OPERATIONS',
        eyebrow: 'TECHNICIAN JACKET',
        badgeText: 'JUST IN',
        dateLabel: '17 Mar 2026',
        specNote: 'Heavy-Duty Twill | Reinforced Seams & Tool Loops',
        colors: ['#0E7490', '#155E75', '#164E63'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'ind-p5',
        name: 'Mint Cyan Fluid-Resistant Barrier Lab Coat',
        price: 1399,
        originalPrice: 1799,
        image: '/products/women/ind/ind-prod-5.jpg',
        category: 'industrial',
        collection: 'BIOTECH SERIES',
        eyebrow: 'BARRIER COAT',
        badgeText: 'NEW',
        dateLabel: '14 Mar 2026',
        specNote: 'Fluid Barrier Coating | Protective Ribbed Cuffs',
        colors: ['#A7F3D0', '#6EE7B7', '#34D399'],
        extraColoursLabel: '+1 colour',
        sizes: ['XS', 'S', 'M', 'L'],
      },
    ],
  },
  {
    id: 'plussize',
    name: 'Plus Size Range',
    icon: Sparkles,
    eyebrow: 'XS TO 5XL ACROSS INDUSTRIES',
    heroTitle: 'Inclusive Ergonomic Fit for Every Body Silhouette.',
    heroSubtitle:
      'Tailored executive blazers, flexible comfort scrubs, and protective workwear engineered specifically in sizes XS to 5XL.',
    heroBg: '/products/women/plussize/plus-prod-1.jpg',
    exploreLink: '/plus-size',
    products: [
      {
        id: 'plus-p1',
        name: 'Plus-Size Tailored Stretch Executive Blazer',
        price: 2799,
        originalPrice: 3599,
        image: '/products/women/plussize/plus-prod-1.jpg',
        category: 'corporate',
        collection: 'CURVE PRO SUITING',
        eyebrow: 'PLUS SIZE BLAZER',
        badgeText: 'NEW',
        dateLabel: '27 Mar 2026',
        specNote: 'Ergonomic Flex Side Panels | Available Up to 5XL',
        colors: ['#0B2744', '#1E3A8A', '#334155'],
        extraColoursLabel: '+2 colours',
        sizes: ['XL', '2XL', '3XL', '4XL', '5XL'],
      },
      {
        id: 'plus-p2',
        name: 'Plus-Size ComfortFit Teal Medical Scrub Set',
        price: 1699,
        originalPrice: 2199,
        image: '/products/women/plussize/plus-prod-2.jpg',
        category: 'healthcare',
        collection: 'CURVE CLINICAL',
        eyebrow: 'PLUS SIZE SCRUBS',
        badgeText: 'JUST IN',
        dateLabel: '24 Mar 2026',
        specNote: 'Wide Flex Waistband | 4-Way Stretch Breathable',
        colors: ['#0F766E', '#115E59', '#134E4A'],
        extraColoursLabel: '+3 colours',
        sizes: ['XL', '2XL', '3XL', '4XL', '5XL'],
      },
      {
        id: 'plus-p3',
        name: 'Plus-Size Burgundy Front-Desk Suiting Blazer',
        price: 2899,
        originalPrice: 3699,
        image: '/products/women/plussize/plus-prod-3.jpg',
        category: 'hospitality',
        collection: 'CURVE HOSPITALITY',
        eyebrow: 'HOTEL SUITING',
        badgeText: 'NEW',
        dateLabel: '22 Mar 2026',
        specNote: 'Relaxed Executive Fit | Contrast Shawl Lapel',
        colors: ['#4A0404', '#1E1B4B', '#0F172A'],
        extraColoursLabel: '+2 colours',
        sizes: ['XL', '2XL', '3XL', '4XL', '5XL'],
      },
      {
        id: 'plus-p4',
        name: 'Plus-Size Hi-Vis Industrial Safety Work Jacket',
        price: 1999,
        originalPrice: 2599,
        image: '/products/women/plussize/plus-prod-4.jpg',
        category: 'industrial',
        collection: 'CURVE SAFETY',
        eyebrow: 'SAFETY WORKWEAR',
        badgeText: 'JUST IN',
        dateLabel: '19 Mar 2026',
        specNote: 'Gusseted Action Back | Dual 3M Reflective Bands',
        colors: ['#0B2744', '#EAB308', '#1E293B'],
        extraColoursLabel: '+2 colours',
        sizes: ['XL', '2XL', '3XL', '4XL', '5XL'],
      },
      {
        id: 'plus-p5',
        name: 'Plus-Size Sky Blue Formal Executive Button-Down',
        price: 1399,
        originalPrice: 1899,
        image: '/products/women/plussize/plus-prod-5.jpg',
        category: 'corporate',
        collection: 'CURVE ESSENTIALS',
        eyebrow: 'EXECUTIVE SHIRT',
        badgeText: 'NEW',
        dateLabel: '16 Mar 2026',
        specNote: 'Comfort Stretch Cotton | Non-Gap Button Placket',
        colors: ['#BAE6FD', '#FFFFFF', '#E0F2FE'],
        extraColoursLabel: '+2 colours',
        sizes: ['XL', '2XL', '3XL', '4XL', '5XL'],
      },
    ],
  },
]

/* ─── ALL 30 GENERATED PRODUCT IMAGES CATALOG LOOKBOOK ─── */
interface LookbookItem {
  id: string
  category: CategoryKey
  categoryLabel: string
  title: string
  spec: string
  image: string
  price: string
}

const ALL_PRODUCT_IMAGES: LookbookItem[] = [
  // Corporate (5)
  {
    id: 'lb-c1',
    category: 'corporate',
    categoryLabel: 'Corporate Blazers & Shirts',
    title: "Women's Executive Tailored Navy Blazer",
    spec: 'Wrinkle-Resistant Poly-Viscose | Notched Lapel',
    image: '/products/women/corp/corp-prod-1.jpg',
    price: '₹2,499',
  },
  {
    id: 'lb-c2',
    category: 'corporate',
    categoryLabel: 'Corporate Blazers & Shirts',
    title: 'Crisp White Formal Oxford Dress Shirt',
    spec: '100% Breathable Egyptian Cotton | Easy Care',
    image: '/products/women/corp/corp-prod-2.jpg',
    price: '₹1,299',
  },
  {
    id: 'lb-c3',
    category: 'corporate',
    categoryLabel: 'Corporate Blazers & Shirts',
    title: 'Charcoal Grey 2-Piece Corporate Suiting Set',
    spec: 'Structured Blazer + Tailored Skirt Set',
    image: '/products/women/corp/corp-prod-3.jpg',
    price: '₹3,899',
  },
  {
    id: 'lb-c4',
    category: 'corporate',
    categoryLabel: 'Corporate Blazers & Shirts',
    title: 'Sky Blue Pleated Silk-Blend Office Blouse',
    spec: 'Pleated Front Drape | All-Day Flex Breathable',
    image: '/products/women/corp/corp-prod-4.jpg',
    price: '₹1,499',
  },
  {
    id: 'lb-c5',
    category: 'corporate',
    categoryLabel: 'Corporate Blazers & Shirts',
    title: 'Camel Sand Slim-Fit Corporate Blazer',
    spec: 'Tortoiseshell Button Accent | Stretch Lining',
    image: '/products/women/corp/corp-prod-5.jpg',
    price: '₹2,699',
  },

  // Hospitality (5)
  {
    id: 'lb-h1',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Front-Office',
    title: 'Royal Burgundy Velvet Shawl Concierge Blazer',
    spec: 'Satin Shawl Lapel | Polished Gold Buttons',
    image: '/products/women/hosp/hosp-prod-1.jpg',
    price: '₹2,799',
  },
  {
    id: 'lb-h2',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Front-Office',
    title: 'Mandarin Collar Ivory Guest Relations Tunic',
    spec: 'Gold Piping Placket | Stain-Release Microfiber',
    image: '/products/women/hosp/hosp-prod-2.jpg',
    price: '₹2,199',
  },
  {
    id: 'lb-h3',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Front-Office',
    title: 'Formal Tailored Hospitality Vest & Shirt Kit',
    spec: '4-Button Tailored Waistcoat + Oxford Shirt',
    image: '/products/women/hosp/hosp-prod-3.jpg',
    price: '₹1,899',
  },
  {
    id: 'lb-h4',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Front-Office',
    title: 'Emerald Green Reception Suiting Blazer',
    spec: 'Tailored Notch Lapels | AFI Hospitality Standard',
    image: '/products/women/hosp/hosp-prod-4.jpg',
    price: '₹2,599',
  },
  {
    id: 'lb-h5',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Front-Office',
    title: 'Midnight Navy Front-Office Formal Belted Dress',
    spec: 'Gold Clasp Belted Waist | Anti-Crease Crepe Weave',
    image: '/products/women/hosp/hosp-prod-5.jpg',
    price: '₹2,399',
  },

  // Scrubs (5)
  {
    id: 'lb-s1',
    category: 'scrubs',
    categoryLabel: "Women's Scrub Sets",
    title: 'Ceil Blue 4-Way Stretch Scrub Set',
    spec: 'Antimicrobial Silver Weave | Flex Jogger Ankle',
    image: '/products/women/scrubs/scrubs-prod-1.jpg',
    price: '₹1,499',
  },
  {
    id: 'lb-s2',
    category: 'scrubs',
    categoryLabel: "Women's Scrub Sets",
    title: 'Deep Wine Multi-Pocket Clinical Scrub Suit',
    spec: '6 Utility Cargo Pockets | Fluid-Repellent Twill',
    image: '/products/women/scrubs/scrubs-prod-2.jpg',
    price: '₹1,599',
  },
  {
    id: 'lb-s3',
    category: 'scrubs',
    categoryLabel: "Women's Scrub Sets",
    title: 'Hospital Navy Flex-Knit Nursing Scrub Set',
    spec: 'Rib-Knit Side Stretch Panels | Drawstring Waist',
    image: '/products/women/scrubs/scrubs-prod-3.jpg',
    price: '₹1,549',
  },
  {
    id: 'lb-s4',
    category: 'scrubs',
    categoryLabel: "Women's Scrub Sets",
    title: 'Sage Green Mandarin OT Surgical Scrub Set',
    spec: 'Mandarin Notch Collar | Autoclave Safe Lint-Free',
    image: '/products/women/scrubs/scrubs-prod-4.jpg',
    price: '₹1,699',
  },
  {
    id: 'lb-s5',
    category: 'scrubs',
    categoryLabel: "Women's Scrub Sets",
    title: 'Royal Blue Performance Athletic Scrub Suit',
    spec: 'Badge Loop & Pen Pocket | Quick-Drying Fabric',
    image: '/products/women/scrubs/scrubs-prod-5.jpg',
    price: '₹1,649',
  },

  // Education (5)
  {
    id: 'lb-e1',
    category: 'education',
    categoryLabel: 'Education & Faculty Wear',
    title: 'Collegiate Crest Navy Faculty Blazer',
    spec: 'Gold Embroidered Crest | Brass Shank Buttons',
    image: '/products/women/edu/edu-prod-1.jpg',
    price: '₹2,299',
  },
  {
    id: 'lb-e2',
    category: 'education',
    categoryLabel: 'Education & Faculty Wear',
    title: 'Sand Beige & Maroon Piped Teacher Jacket',
    spec: 'Contrast Maroon Piping | Wrinkle-Resistant Blend',
    image: '/products/women/edu/edu-prod-2.jpg',
    price: '₹2,199',
  },
  {
    id: 'lb-e3',
    category: 'education',
    categoryLabel: 'Education & Faculty Wear',
    title: 'Grey Micro-Check Faculty Waistcoat & Shirt',
    spec: 'Houndstooth Pattern Weave + Crisp White Shirt',
    image: '/products/women/edu/edu-prod-3.jpg',
    price: '₹1,799',
  },
  {
    id: 'lb-e4',
    category: 'education',
    categoryLabel: 'Education & Faculty Wear',
    title: 'Forest Green Professor Academic Blazer',
    spec: 'Wool-Touch Suiting | Notched Collar & Horn Buttons',
    image: '/products/women/edu/edu-prod-4.jpg',
    price: '₹2,499',
  },
  {
    id: 'lb-e5',
    category: 'education',
    categoryLabel: 'Education & Faculty Wear',
    title: 'Navy & White Piped Institutional Tunic',
    spec: 'Stand Collar With Contrast Piping | Patch Pockets',
    image: '/products/women/edu/edu-prod-5.jpg',
    price: '₹1,999',
  },

  // Industrial & Lab Coats (5)
  {
    id: 'lb-i1',
    category: 'industrial',
    categoryLabel: 'Industrial & Lab Coats',
    title: 'Pure White Antimicrobial Laboratory Coat',
    spec: 'Snap Button Front | Dual Pen Slot & Deep Pockets',
    image: '/products/women/ind/ind-prod-1.jpg',
    price: '₹1,299',
  },
  {
    id: 'lb-i2',
    category: 'industrial',
    categoryLabel: 'Industrial & Lab Coats',
    title: 'High-Visibility 3M Reflective Safety Work Jacket',
    spec: 'Class 2 Reflective Tape | Water-Resistant Shell',
    image: '/products/women/ind/ind-prod-2.jpg',
    price: '₹1,899',
  },
  {
    id: 'lb-i3',
    category: 'industrial',
    categoryLabel: 'Industrial & Lab Coats',
    title: 'ESD Antistatic Cleanroom QC Inspection Coat',
    spec: 'Conductive Grid Weave | Knit Cuffs & Placket',
    image: '/products/women/ind/ind-prod-3.jpg',
    price: '₹1,499',
  },
  {
    id: 'lb-i4',
    category: 'industrial',
    categoryLabel: 'Industrial & Lab Coats',
    title: 'Petrol Blue Multi-Pocket Plant Technician Jacket',
    spec: 'Heavy-Duty Twill | Reinforced Seams & Tool Loops',
    image: '/products/women/ind/ind-prod-4.jpg',
    price: '₹1,799',
  },
  {
    id: 'lb-i5',
    category: 'industrial',
    categoryLabel: 'Industrial & Lab Coats',
    title: 'Mint Cyan Fluid-Resistant Barrier Lab Coat',
    spec: 'Fluid Barrier Coating | Protective Ribbed Cuffs',
    image: '/products/women/ind/ind-prod-5.jpg',
    price: '₹1,399',
  },

  // Plus Size Range (5)
  {
    id: 'lb-p1',
    category: 'plussize',
    categoryLabel: 'Plus Size Range',
    title: 'Plus-Size Tailored Stretch Executive Blazer',
    spec: 'Ergonomic Flex Side Panels | Available Up to 5XL',
    image: '/products/women/plussize/plus-prod-1.jpg',
    price: '₹2,799',
  },
  {
    id: 'lb-p2',
    category: 'plussize',
    categoryLabel: 'Plus Size Range',
    title: 'Plus-Size ComfortFit Teal Medical Scrub Set',
    spec: 'Wide Flex Waistband | 4-Way Stretch Breathable',
    image: '/products/women/plussize/plus-prod-2.jpg',
    price: '₹1,699',
  },
  {
    id: 'lb-p3',
    category: 'plussize',
    categoryLabel: 'Plus Size Range',
    title: 'Plus-Size Burgundy Front-Desk Suiting Blazer',
    spec: 'Relaxed Executive Fit | Contrast Shawl Lapel',
    image: '/products/women/plussize/plus-prod-3.jpg',
    price: '₹2,899',
  },
  {
    id: 'lb-p4',
    category: 'plussize',
    categoryLabel: 'Plus Size Range',
    title: 'Plus-Size Hi-Vis Industrial Safety Work Jacket',
    spec: 'Gusseted Action Back | Dual 3M Reflective Bands',
    image: '/products/women/plussize/plus-prod-4.jpg',
    price: '₹1,999',
  },
  {
    id: 'lb-p5',
    category: 'plussize',
    categoryLabel: 'Plus Size Range',
    title: 'Plus-Size Sky Blue Formal Executive Button-Down',
    spec: 'Comfort Stretch Cotton | Non-Gap Button Placket',
    image: '/products/women/plussize/plus-prod-5.jpg',
    price: '₹1,399',
  },
]

/* ─── SINGLE PRODUCT CARD ─── */
function SignatureProductCard({
  product,
  onOpenLightbox,
}: {
  product: CategoryProductItem
  onOpenLightbox?: (img: string, title: string, spec?: string) => void
}) {
  const { addToCart, isInWishlist, toggleWishlist } = useStore()
  const wishlisted = isInWishlist(product.id)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? '#0B2744')
  const [added, setAdded] = useState(false)
  const [wishHovered, setWishHovered] = useState(false)

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart(product, product.sizes?.[0] ?? 'M', selectedColor)
    setAdded(true)
    setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div
      className="signature-card-item"
      style={{
        background: 'white',
        borderRadius: 18,
        border: '1px solid rgba(11, 39, 68, 0.08)',
        boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        transition: `transform 0.28s ${EASE}, box-shadow 0.28s ${EASE}, border-color 0.28s ease`,
        flex: '0 0 calc(25% - 0.75rem)',
        minWidth: 220,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(-5px)'
        el.style.boxShadow = '0 14px 32px rgba(11, 39, 68, 0.12)'
        el.style.borderColor = 'rgba(20, 110, 245, 0.24)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget
        el.style.transform = 'translateY(0)'
        el.style.boxShadow = '0 4px 16px rgba(11, 39, 68, 0.04)'
        el.style.borderColor = 'rgba(11, 39, 68, 0.08)'
      }}
    >
      {/* ── IMAGE WRAPPER ── */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '1 / 1',
          overflow: 'hidden',
          background: '#F8FAFC',
          cursor: 'pointer',
        }}
      >
        <Link
          to={`/product/${product.id}`}
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              transition: `transform 0.4s ${EASE}`,
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
            }}
          />
        </Link>

        {/* Top-Left Badge */}
        <div
          style={{
            position: 'absolute',
            top: '0.65rem',
            left: '0.65rem',
            zIndex: 2,
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '0.22rem 0.6rem',
              borderRadius: 100,
              fontSize: '0.6rem',
              fontWeight: 800,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'white',
              background:
                product.badgeText === 'NEW'
                  ? '#146EF5'
                  : 'rgba(71, 108, 158, 0.88)',
              backdropFilter: 'blur(8px)',
              boxShadow: '0 4px 10px rgba(11, 39, 68, 0.16)',
            }}
          >
            {product.badgeText}
          </span>
        </div>

        {/* Top-Right Quick Zoom Button */}
        {onOpenLightbox && (
          <button
            type="button"
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              onOpenLightbox(product.image, product.name, product.specNote)
            }}
            aria-label="Enlarge image"
            style={{
              position: 'absolute',
              top: '0.65rem',
              right: '2.8rem',
              zIndex: 3,
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.92)',
              backdropFilter: 'blur(8px)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: `all 0.2s ${EASE}`,
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'scale(1.1)'
              el.style.background = '#0B2744'
              const svg = el.querySelector('svg')
              if (svg) svg.style.color = '#FFFFFF'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLElement
              el.style.transform = 'scale(1)'
              el.style.background = 'rgba(255, 255, 255, 0.92)'
              const svg = el.querySelector('svg')
              if (svg) svg.style.color = '#0B2744'
            }}
          >
            <Maximize2 size={13} style={{ color: '#0B2744', transition: 'color 0.2s' }} />
          </button>
        )}

        {/* Top-Right Wishlist Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          onMouseEnter={() => setWishHovered(true)}
          onMouseLeave={() => setWishHovered(false)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute',
            top: '0.65rem',
            right: '0.65rem',
            zIndex: 3,
            width: 30,
            height: 30,
            borderRadius: '50%',
            background: wishlisted
              ? 'rgba(239, 68, 68, 0.12)'
              : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            transform: wishHovered ? 'scale(1.1)' : 'scale(1)',
            transition: `all 0.2s ${EASE}`,
          }}
        >
          <Heart
            size={14}
            style={{
              color: wishlisted ? '#EF4444' : '#0B2744',
              fill: wishlisted ? '#EF4444' : 'none',
              transition: 'all 0.2s ease',
            }}
          />
        </button>
      </div>

      {/* ── CARD CONTENT ── */}
      <div
        style={{
          padding: '0.85rem 0.95rem 1rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
          background: 'white',
        }}
      >
        <div>
          {/* Eyebrow */}
          <div
            style={{
              fontSize: '0.64rem',
              fontWeight: 800,
              letterSpacing: '0.07em',
              textTransform: 'uppercase',
              color: '#3B82F6',
              marginBottom: '0.2rem',
            }}
          >
            {product.eyebrow}
          </div>

          {/* Product Title */}
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: 'none' }}
          >
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 800,
                fontSize: '0.84rem',
                color: '#0B2744',
                lineHeight: 1.25,
                letterSpacing: '-0.015em',
                marginBottom: '0.25rem',
                minHeight: '2.1rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.name}
            </h4>
          </Link>

          {/* Specification Note */}
          {product.specNote && (
            <div
              style={{
                fontSize: '0.64rem',
                color: '#64748B',
                lineHeight: 1.3,
                marginBottom: '0.45rem',
                minHeight: '1.7rem',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {product.specNote}
            </div>
          )}

          {/* Price + MRP + Discount */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
              marginBottom: '0.65rem',
              flexWrap: 'wrap',
            }}
          >
            <span
              style={{
                fontSize: '0.98rem',
                fontWeight: 900,
                color: '#0B2744',
                fontFamily: 'var(--font-display)',
              }}
            >
              {formatPrice(product.price)}
            </span>

            {product.originalPrice && (
              <span
                style={{
                  fontSize: '0.72rem',
                  color: 'var(--color-neutral-400)',
                  textDecoration: 'line-through',
                  fontWeight: 500,
                }}
              >
                {formatPrice(product.originalPrice)}
              </span>
            )}

            {discountPercent > 0 && (
              <span
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  color: '#16A34A',
                  background: '#DCFCE7',
                  padding: '0.1rem 0.35rem',
                  borderRadius: 4,
                }}
              >
                {discountPercent}% OFF
              </span>
            )}
          </div>
        </div>

        {/* ── CARD FOOTER: SWATCHES + QUICK ADD ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '0.6rem',
            borderTop: '1px solid rgba(11, 39, 68, 0.06)',
            gap: '0.4rem',
          }}
        >
          {/* Swatches */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.22rem' }}>
              {(product.colors ?? []).slice(0, 3).map((col, idx) => {
                const isSelected = selectedColor === col
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedColor(col)}
                    aria-label={`Select color ${col}`}
                    style={{
                      width: 13,
                      height: 13,
                      borderRadius: '50%',
                      background: col,
                      border: isSelected ? '1.5px solid #146EF5' : '1px solid #CBD5E1',
                      padding: 0,
                      cursor: 'pointer',
                      transform: isSelected ? 'scale(1.2)' : 'scale(1)',
                      transition: `transform 0.15s ${EASE}`,
                    }}
                  />
                )
              })}
            </div>
            <span
              style={{
                fontSize: '0.62rem',
                color: 'var(--color-neutral-500)',
                fontWeight: 600,
                letterSpacing: '-0.01em',
              }}
            >
              {product.extraColoursLabel}
            </span>
          </div>

          {/* Quick Add To Cart Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: added ? '#16A34A' : '#0B2744',
              color: 'white',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: added
                ? '0 4px 12px rgba(22, 163, 74, 0.35)'
                : '0 4px 10px rgba(11, 39, 68, 0.2)',
              transition: `all 0.22s ${EASE}`,
              transform: added ? 'scale(1.08)' : 'scale(1)',
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              if (!added) {
                const el = e.currentTarget
                el.style.background = '#146EF5'
                el.style.transform = 'scale(1.08)'
              }
            }}
            onMouseLeave={e => {
              if (!added) {
                const el = e.currentTarget
                el.style.background = '#0B2744'
                el.style.transform = 'scale(1)'
              }
            }}
          >
            {added ? <Check size={14} /> : <ShoppingBag size={14} />}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── SINGLE ROW: LEFT HERO (~32%) + RIGHT SCROLL TRACK (~68%) ─── */
function CategoryCardRow({
  category,
  onOpenLightbox,
}: {
  category: CategoryData
  onOpenLightbox?: (img: string, title: string, spec?: string) => void
}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    const el = scrollContainerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10)
  }

  const handleScroll = (dir: 'left' | 'right') => {
    const el = scrollContainerRef.current
    if (!el) return
    const cardWidth = el.querySelector('.signature-card-item')?.clientWidth ?? 240
    const scrollAmount = (cardWidth + 16) * 2
    el.scrollBy({
      left: dir === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
    setTimeout(checkScroll, 350)
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '32% 68%',
        gap: 'clamp(1rem, 1.8vw, 1.5rem)',
        alignItems: 'stretch',
        minHeight: 380,
      }}
      className="signature-category-grid"
    >
      {/* ── LEFT: HERO POSTER CARD (~32%) ── */}
      <div
        style={{
          position: 'relative',
          borderRadius: 22,
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 'clamp(1.2rem, 1.8vw, 1.5rem)',
          minHeight: 380,
          background: '#0B2744',
          boxShadow: '0 8px 24px rgba(11, 39, 68, 0.12)',
        }}
      >
        {/* Crisp Studio Background Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${category.heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.72) contrast(1.08)',
          }}
        />
        {/* Clean Gradient Overlay for Readability */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(11,39,68,0.78) 0%, rgba(11,39,68,0.4) 40%, rgba(11,39,68,0.92) 100%)',
          }}
        />

        {/* Top Badges */}
        <div style={{ position: 'relative', zIndex: 2 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.28rem 0.75rem',
              borderRadius: 100,
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.35)',
              color: 'white',
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              marginBottom: '0.65rem',
            }}
          >
            <Sparkles size={11} style={{ color: '#60A5FA' }} />
            PRODUCT CATALOG • 5 STYLES
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.3rem',
            }}
          >
            {['100% Product Photography', 'Ghost Mannequin Display', 'Direct Factory Sizing'].map(
              (pill, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    color: 'rgba(255, 255, 255, 0.95)',
                    textShadow: '0 1px 3px rgba(0,0,0,0.5)',
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: '50%',
                      background: '#38BDF8',
                    }}
                  />
                  {pill}
                </div>
              )
            )}
          </div>
        </div>

        {/* Bottom Floating Card */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(16px)',
            borderRadius: 16,
            padding: '1rem',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
          }}
        >
          <div
            style={{
              fontSize: '0.62rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#146EF5',
              marginBottom: '0.2rem',
            }}
          >
            {category.eyebrow}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '1rem',
              color: '#0B2744',
              lineHeight: 1.25,
              letterSpacing: '-0.02em',
              marginBottom: '0.35rem',
            }}
          >
            {category.heroTitle}
          </h3>

          <p
            style={{
              fontSize: '0.72rem',
              color: 'var(--color-neutral-600)',
              lineHeight: 1.45,
              marginBottom: '0.75rem',
            }}
          >
            {category.heroSubtitle}
          </p>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Link
              to={category.exploreLink}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#0B2744',
                color: 'white',
                fontSize: '0.72rem',
                fontWeight: 700,
                padding: '0.45rem 0.85rem',
                borderRadius: 100,
                textDecoration: 'none',
                boxShadow: '0 4px 12px rgba(11, 39, 68, 0.22)',
                transition: `all 0.2s ${EASE}`,
              }}
            >
              Explore Collection
              <ArrowRight size={12} />
            </Link>

            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                color: '#146EF5',
              }}
            >
              5 Dedicated Styles →
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT: HORIZONTAL SCROLL PRODUCT TRACK (~68%) ── */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Navigation Arrows */}
        <div
          style={{
            position: 'absolute',
            top: '-2.4rem',
            right: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            zIndex: 10,
          }}
        >
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Scroll products left"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'white',
              border: '1px solid rgba(11, 39, 68, 0.12)',
              color: '#0B2744',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canScrollLeft ? 'pointer' : 'not-allowed',
              opacity: canScrollLeft ? 1 : 0.4,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: `all 0.2s ${EASE}`,
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Scroll products right"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              background: 'white',
              border: '1px solid rgba(11, 39, 68, 0.12)',
              color: '#0B2744',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: canScrollRight ? 'pointer' : 'not-allowed',
              opacity: canScrollRight ? 1 : 0.4,
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: `all 0.2s ${EASE}`,
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Product Cards Container (5 cards, smooth scroll) */}
        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            gap: '1rem',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            paddingBlock: '0.4rem',
            scrollbarWidth: 'none',
          }}
        >
          {category.products.map(product => (
            <SignatureProductCard
              key={product.id}
              product={product}
              onOpenLightbox={onOpenLightbox}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── DEDICATED ALL-IMAGES LOOKBOOK PHOTO GALLERY ─── */
function AllImagesLookbook({
  onOpenLightbox,
  activeCategory,
}: {
  onOpenLightbox: (img: string, title: string, spec?: string) => void
  activeCategory?: CategoryKey
}) {
  const [filter, setFilter] = useState<'all' | CategoryKey>(activeCategory || 'all')

  useEffect(() => {
    if (activeCategory) {
      setFilter(activeCategory)
    }
  }, [activeCategory])

  const filterTabs: { id: 'all' | CategoryKey; label: string }[] = [
    { id: 'all', label: 'All 30 Product Styles' },
    { id: 'corporate', label: 'Corporate Blazers & Shirts (5)' },
    { id: 'hospitality', label: 'Hospitality & Front-Office (5)' },
    { id: 'scrubs', label: "Women's Scrub Sets (5)" },
    { id: 'education', label: 'Education & Faculty Wear (5)' },
    { id: 'industrial', label: 'Industrial & Lab Coats (5)' },
    { id: 'plussize', label: 'Plus Size Range (5)' },
  ]

  const displayedImages =
    filter === 'all'
      ? ALL_PRODUCT_IMAGES
      : ALL_PRODUCT_IMAGES.filter(item => item.category === filter)

  return (
    <div
      style={{
        marginTop: '4.5rem',
        paddingTop: '3.5rem',
        borderTop: '2px dashed rgba(20, 110, 245, 0.18)',
      }}
    >
      {/* Lookbook Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.5rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.85rem',
              borderRadius: 100,
              background: '#EAF4FF',
              border: '1px solid rgba(20, 110, 245, 0.2)',
              marginBottom: '0.5rem',
            }}
          >
            <Camera size={13} style={{ color: '#146EF5' }} />
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#146EF5',
              }}
            >
              CLIENT PRESENTATION LOOKBOOK
            </span>
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
              color: '#0B2744',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}
          >
            All 30 Uniform Product Catalog Images
          </h3>

          <p
            style={{
              color: 'var(--color-neutral-500)',
              fontSize: '0.86rem',
              maxWidth: 680,
              marginTop: '0.35rem',
            }}
          >
            Pure e-commerce studio catalog photography (ghost mannequin display, zero human faces/models) across all 6 women&apos;s uniform categories. Click any product to enlarge and inspect tailoring details.
          </p>
        </div>

        <div
          style={{
            fontSize: '0.78rem',
            fontWeight: 800,
            color: '#146EF5',
            background: 'white',
            border: '1px solid rgba(20, 110, 245, 0.25)',
            borderRadius: 100,
            padding: '0.45rem 1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
          }}
        >
          <Package size={14} />
          Showing {displayedImages.length} of 30 Products
        </div>
      </div>

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.55rem',
          flexWrap: 'wrap',
          marginBottom: '2rem',
        }}
      >
        {filterTabs.map(tab => {
          const isActive = filter === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '0.45rem 0.95rem',
                borderRadius: 100,
                cursor: 'pointer',
                transition: `all 0.2s ${EASE}`,
                background: isActive ? '#0B2744' : 'white',
                color: isActive ? 'white' : '#0B2744',
                border: isActive
                  ? '1px solid #0B2744'
                  : '1px solid rgba(11, 39, 68, 0.12)',
                boxShadow: isActive
                  ? '0 4px 12px rgba(11, 39, 68, 0.2)'
                  : 'none',
              }}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Responsive Grid of All 30 Product Images */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {displayedImages.map(item => (
          <div
            key={item.id}
            onClick={() => onOpenLightbox(item.image, item.title, item.spec)}
            className="gallery-photo-card"
            style={{
              background: 'white',
              borderRadius: 16,
              overflow: 'hidden',
              border: '1px solid rgba(11, 39, 68, 0.08)',
              boxShadow: '0 4px 16px rgba(11, 39, 68, 0.05)',
              cursor: 'pointer',
              transition: `all 0.28s ${EASE}`,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <div
              style={{
                position: 'relative',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                background: '#F8FAFC',
              }}
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  display: 'block',
                  transition: `transform 0.4s ${EASE}`,
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(11, 39, 68, 0.28)',
                  opacity: 0,
                  transition: 'opacity 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                className="gallery-hover-overlay"
              >
                <span
                  style={{
                    background: 'white',
                    color: '#0B2744',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    padding: '0.4rem 0.85rem',
                    borderRadius: 100,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                  }}
                >
                  <Maximize2 size={12} />
                  Enlarge Image
                </span>
              </div>
            </div>

            <div style={{ padding: '0.85rem 1rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span
                  style={{
                    fontSize: '0.62rem',
                    fontWeight: 800,
                    color: '#146EF5',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {item.categoryLabel}
                </span>

                <h5
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '0.82rem',
                    color: '#0B2744',
                    lineHeight: 1.25,
                    marginTop: '0.2rem',
                    marginBottom: '0.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.title}
                </h5>

                <div
                  style={{
                    fontSize: '0.64rem',
                    color: '#64748B',
                    lineHeight: 1.3,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {item.spec}
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '0.6rem',
                  paddingTop: '0.5rem',
                  borderTop: '1px solid #F1F5F9',
                }}
              >
                <span
                  style={{
                    fontSize: '0.9rem',
                    fontWeight: 900,
                    color: '#0B2744',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  {item.price}
                </span>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    color: '#146EF5',
                  }}
                >
                  View Details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── MAIN COMPONENT ─── */
export default function CategorySignatureSections({
  initialCategory,
}: {
  initialCategory?: CategoryKey
} = {}) {
  const [searchParams] = useSearchParams()
  const categoryParam = (searchParams.get('category') as CategoryKey) || initialCategory
  const validCategory =
    categoryParam && CATEGORIES.some(c => c.id === categoryParam)
      ? categoryParam
      : 'corporate'
  const [activeTab, setActiveTab] = useState<CategoryKey>(validCategory)

  useEffect(() => {
    if (categoryParam && CATEGORIES.some(c => c.id === categoryParam)) {
      setActiveTab(categoryParam)
      const timer = setTimeout(() => {
        const el = document.getElementById(`cat-row-${categoryParam}`)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 150)
      return () => clearTimeout(timer)
    }
  }, [categoryParam])
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean
    img: string
    title: string
    spec?: string
  }>({
    isOpen: false,
    img: '',
    title: '',
  })

  const openLightbox = (img: string, title: string, spec?: string) => {
    setLightbox({ isOpen: true, img, title, spec })
  }

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }))
  }

  return (
    <section
      id="category-showcase-section"
      aria-label="Signature Category Uniform Collections"
      style={{
        paddingBlock: 'clamp(3.5rem, 6vw, 5.5rem)',
        background: '#FAFBFD',
        position: 'relative',
        borderTop: '1px solid rgba(11, 39, 68, 0.05)',
      }}
    >
      <div className="container-site">
        {/* ── 1. SECTION HEADER ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.3rem 0.85rem',
                borderRadius: 100,
                background: '#EAF4FF',
                border: '1px solid rgba(20, 110, 245, 0.15)',
                marginBottom: '0.65rem',
              }}
            >
              <Sparkles size={12} style={{ color: '#146EF5' }} />
              <span
                style={{
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: '#146EF5',
                }}
              >
                WOMEN&apos;S UNIFORM CATALOG • ALL 6 CATEGORIES
              </span>
            </div>

            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: 900,
                fontSize: 'clamp(1.75rem, 3.2vw, 2.5rem)',
                color: '#0B2744',
                letterSpacing: '-0.03em',
                lineHeight: 1.12,
              }}
            >
              Professional Uniforms for <span style={{ color: '#146EF5' }}>Every Industry</span>
            </h2>

            <p
              style={{
                color: 'var(--color-neutral-500)',
                fontSize: '0.88rem',
                maxWidth: 640,
                marginTop: '0.35rem',
                lineHeight: 1.5,
              }}
            >
              Pure studio product catalog photography (no human models) across all 6 women&apos;s categories — displaying 5 dedicated styles for each category with full specifications.
            </p>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <div
              style={{
                fontSize: '0.82rem',
                fontWeight: 800,
                color: '#0B2744',
                background: 'white',
                border: '1px solid rgba(11, 39, 68, 0.12)',
                borderRadius: 100,
                padding: '0.45rem 1rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                boxShadow: '0 2px 6px rgba(11, 39, 68, 0.04)',
              }}
            >
              <Package size={14} style={{ color: '#146EF5' }} />
              6 Categories • 30 Products
            </div>
          </div>
        </div>

        {/* ── 2. CATEGORY PILL NAVIGATION (MATCHING WOMEN DROPDOWN) ── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            overflowX: 'auto',
            paddingBottom: '0.85rem',
            marginBottom: '2rem',
            scrollbarWidth: 'none',
          }}
          className="hide-scrollbar"
        >
          {CATEGORIES.map(cat => {
            const isActive = activeTab === cat.id
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => {
                  setActiveTab(cat.id)
                  const el = document.getElementById(`cat-row-${cat.id}`)
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
                }}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.55rem 1.25rem',
                  borderRadius: 100,
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-sans)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  background: isActive ? '#0B2744' : 'white',
                  color: isActive ? 'white' : '#0B2744',
                  border: isActive
                    ? '1px solid #0B2744'
                    : '1px solid rgba(20, 110, 245, 0.16)',
                  boxShadow: isActive
                    ? '0 6px 18px rgba(11, 39, 68, 0.22)'
                    : '0 2px 6px rgba(11, 39, 68, 0.03)',
                  transition: `all 0.22s ${EASE}`,
                  flexShrink: 0,
                }}
              >
                <Icon
                  size={15}
                  style={{
                    color: isActive ? '#60A5FA' : '#146EF5',
                  }}
                />
                {cat.name}
              </button>
            )
          })}
        </div>

        {/* ── 3. STACKED CATEGORY ROWS (ALL 6 DISPLAYED CONSECUTIVELY ONE BELOW ANOTHER) ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.25rem' }}>
          {CATEGORIES.map(cat => (
            <div key={cat.id} id={`cat-row-${cat.id}`}>
              {/* Category Subheading Bar */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '1rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                  }}
                >
                  <cat.icon size={19} style={{ color: '#146EF5' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 900,
                      fontSize: '1.25rem',
                      color: '#0B2744',
                      letterSpacing: '-0.02em',
                      margin: 0,
                    }}
                  >
                    {cat.name}
                  </h3>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      color: '#146EF5',
                      background: '#EAF4FF',
                      padding: '0.15rem 0.55rem',
                      borderRadius: 100,
                    }}
                  >
                    5 Products
                  </span>
                </div>

                <Link
                  to={cat.exploreLink}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.3rem',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    color: '#146EF5',
                    textDecoration: 'none',
                  }}
                >
                  Explore {cat.name}
                  <ArrowRight size={13} />
                </Link>
              </div>

              {/* Left Hero Card + Right Product Track with 5 styles */}
              <CategoryCardRow
                category={cat}
                onOpenLightbox={openLightbox}
              />
            </div>
          ))}
        </div>

        {/* ── 4. ALL-IMAGES LOOKBOOK PHOTO GALLERY (ALL 30 PRODUCT IMAGES) ── */}
        <AllImagesLookbook onOpenLightbox={openLightbox} activeCategory={activeTab} />
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      {lightbox.isOpen && (
        <div
          onClick={closeLightbox}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: 'rgba(11, 39, 68, 0.92)',
            backdropFilter: 'blur(16px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.5rem',
            animation: 'fadeIn 0.25s ease',
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              position: 'relative',
              maxWidth: 720,
              width: '100%',
              background: 'white',
              borderRadius: 24,
              overflow: 'hidden',
              boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                zIndex: 10,
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.92)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <X size={18} style={{ color: '#0B2744' }} />
            </button>

            <div
              style={{
                width: '100%',
                maxHeight: '68vh',
                overflow: 'hidden',
                background: '#FAFBFD',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '1.5rem',
              }}
            >
              <img
                src={lightbox.img}
                alt={lightbox.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '60vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            <div
              style={{
                padding: '1.25rem 1.5rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem',
                borderTop: '1px solid #F1F5F9',
              }}
            >
              <div>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontWeight: 800,
                    fontSize: '1.05rem',
                    color: '#0B2744',
                    marginBottom: '0.25rem',
                  }}
                >
                  {lightbox.title}
                </h4>
                {lightbox.spec && (
                  <div
                    style={{
                      fontSize: '0.8rem',
                      color: '#64748B',
                      fontWeight: 500,
                    }}
                  >
                    {lightbox.spec}
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={closeLightbox}
                style={{
                  background: '#0B2744',
                  color: 'white',
                  border: 'none',
                  borderRadius: 100,
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .gallery-photo-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 36px rgba(11, 39, 68, 0.18) !important;
        }
        .gallery-photo-card:hover img {
          transform: scale(1.05);
        }
        .gallery-photo-card:hover .gallery-hover-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 1024px) {
          .signature-category-grid {
            grid-template-columns: 1fr !important;
          }
          .signature-card-item {
            flex: 0 0 calc(45% - 0.5rem) !important;
          }
        }
        @media (max-width: 640px) {
          .signature-card-item {
            flex: 0 0 85% !important;
          }
        }
      `}</style>
    </section>
  )
}
