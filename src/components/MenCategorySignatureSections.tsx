/**
 * MenCategorySignatureSections — Men's Uniform Category Showcases & Product Catalog
 * ─────────────────────────────────────────────────────────────
 * Features:
 * 1. Category Pill Navigation Bar (6 Categories matching Men dropdown):
 *    - Corporate Shirts & Suits
 *    - Industrial & Safety Workwear
 *    - Hospitality & Chef Coats
 *    - Security & Tactical Uniforms
 *    - Men's Healthcare Scrubs
 *    - Logistics & Retail Polos
 * 2. Stacked Category Rows (displayed one below another):
 *    - Left Hero Card (~32% width, ~380px height)
 *    - Right Product Track (~68% width, exactly 4 cards visible at once, with smooth horizontal scroll & arrows for all 5 styles)
 * 3. 100% Product-Only Photography (No human models/faces — clean e-commerce ghost mannequin & studio catalog shots)
 *    - 5 Corporate Product Styles (corp-prod-1 to corp-prod-5)
 *    - 5 Industrial & Safety Styles (ind-prod-1 to ind-prod-5)
 *    - 5 Hospitality & Chef Styles (hosp-prod-1 to hosp-prod-5)
 *    - 5 Security & Tactical Styles (sec-prod-1 to sec-prod-5)
 *    - 5 Healthcare Scrub Styles (scrubs-prod-1 to scrubs-prod-5)
 *    - 5 Logistics & Retail Styles (log-prod-1 to log-prod-5)
 * 4. Dedicated "AFI Uniforms Client Presentation Lookbook" at the bottom displaying ALL 30 product images
 *    with interactive category filters and high-res lightbox view.
 */

import React, { useState, useRef, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  Briefcase,
  HardHat,
  ConciergeBell,
  Shield,
  Stethoscope,
  Truck,
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

export type MenCategoryKey =
  | 'corporate'
  | 'industrial'
  | 'hospitality'
  | 'security'
  | 'scrubs'
  | 'logistics'

interface MenCategoryProductItem extends Product {
  eyebrow: string
  dateLabel: string
  badgeText: 'NEW' | 'JUST IN'
  extraColoursLabel: string
  specNote?: string
}

interface MenCategoryData {
  id: MenCategoryKey
  name: string
  icon: React.ComponentType<{ size?: number; style?: React.CSSProperties; className?: string }>
  eyebrow: string
  heroTitle: string
  heroSubtitle: string
  heroBg: string
  exploreLink: string
  products: MenCategoryProductItem[]
}

const MEN_CATEGORIES: MenCategoryData[] = [
  {
    id: 'corporate',
    name: 'Corporate Shirts & Suits',
    icon: Briefcase,
    eyebrow: 'EXECUTIVE OFFICE WEAR',
    heroTitle: 'Executive Suiting & Power Corporate Attire.',
    heroSubtitle:
      'Precision-tailored blazers, wrinkle-resistant business shirts, and poly-viscose formal trousers engineered for corporate boardrooms and executives.',
    heroBg: '/products/men/corp/corp-prod-1.jpg',
    exploreLink: '/men?category=corporate',
    products: [
      {
        id: 'men-corp-p1',
        name: "Men's Executive Italian-Cut Navy Blue Blazer",
        price: 2699,
        originalPrice: 3499,
        image: '/products/men/corp/corp-prod-1.jpg',
        category: 'corporate',
        collection: 'EXECUTIVE SUITING',
        eyebrow: 'EXECUTIVE BLAZER',
        badgeText: 'NEW',
        dateLabel: '28 Mar 2026',
        specNote: 'Wrinkle-Resistant Poly-Viscose | Notched Lapel',
        colors: ['#0B2744', '#1E3A8A', '#334155'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44', '46'],
      },
      {
        id: 'men-corp-p2',
        name: "Men's Crisp Wrinkle-Free White Formal Oxford Shirt",
        price: 1399,
        originalPrice: 1899,
        image: '/products/men/corp/corp-prod-2.jpg',
        category: 'corporate',
        collection: 'CORPORATE BASICS',
        eyebrow: 'FORMAL SHIRTING',
        badgeText: 'JUST IN',
        dateLabel: '25 Mar 2026',
        specNote: '100% Breathable Egyptian Cotton | Easy Care',
        colors: ['#FFFFFF', '#BAE6FD', '#F1F5F9'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '39', '40', '42', '44'],
      },
      {
        id: 'men-corp-p3',
        name: "Men's Charcoal Grey Tailored Poly-Viscose Trousers",
        price: 1499,
        originalPrice: 1999,
        image: '/products/men/corp/corp-prod-3.jpg',
        category: 'corporate',
        collection: 'EXECUTIVE FORMAL',
        eyebrow: 'FORMAL TROUSERS',
        badgeText: 'NEW',
        dateLabel: '22 Mar 2026',
        specNote: 'Flex Waistband | Anti-Crease Micro-Poly Blend',
        colors: ['#374151', '#1F2937', '#111827'],
        extraColoursLabel: '+2 colours',
        sizes: ['30', '32', '34', '36', '38'],
      },
      {
        id: 'men-corp-p4',
        name: "Men's Formal Navy Blue 5-Button Business Waistcoat",
        price: 1599,
        originalPrice: 2199,
        image: '/products/men/corp/corp-prod-4.jpg',
        category: 'corporate',
        collection: 'EXECUTIVE SUITING',
        eyebrow: 'BUSINESS WAISTCOAT',
        badgeText: 'JUST IN',
        dateLabel: '19 Mar 2026',
        specNote: 'Adjustable Back Cinch | Sateen Inner Lining',
        colors: ['#0B2744', '#1E293B', '#334155'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'men-corp-p5',
        name: "Men's Executive Sky Blue French-Cuff Dress Shirt",
        price: 1499,
        originalPrice: 1999,
        image: '/products/men/corp/corp-prod-5.jpg',
        category: 'corporate',
        collection: 'CORPORATE PREMIER',
        eyebrow: 'EXECUTIVE SHIRT',
        badgeText: 'NEW',
        dateLabel: '15 Mar 2026',
        specNote: 'Fine Twill Weave | Stiffened Spread Collar',
        colors: ['#BAE6FD', '#FFFFFF', '#93C5FD'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '39', '40', '42', '44'],
      },
    ],
  },
  {
    id: 'industrial',
    name: 'Industrial & Safety Workwear',
    icon: HardHat,
    eyebrow: 'HEAVY-DUTY INDUSTRIAL',
    heroTitle: 'Heavy-Duty Industrial Protection & High-Visibility Workwear.',
    heroSubtitle:
      'Certified boiler suits, 3M reflective jackets, and reinforced multi-pocket cargo work pants built for manufacturing plants and field operations.',
    heroBg: '/products/men/ind/ind-prod-1.jpg',
    exploreLink: '/men?category=industrial',
    products: [
      {
        id: 'men-ind-p1',
        name: "Men's Heavy-Duty Reflective Boiler Suit Coverall",
        price: 2499,
        originalPrice: 3299,
        image: '/products/men/ind/ind-prod-1.jpg',
        category: 'industrial',
        collection: 'PLANT SAFETY',
        eyebrow: 'BOILER SUIT',
        badgeText: 'NEW',
        dateLabel: '29 Mar 2026',
        specNote: 'Dual 3M Reflective Bands | Heavy Twill 280 GSM',
        colors: ['#0B2744', '#EAB308', '#F97316'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-ind-p2',
        name: "Men's Neon Yellow 3M Reflective High-Vis Jacket",
        price: 1899,
        originalPrice: 2499,
        image: '/products/men/ind/ind-prod-2.jpg',
        category: 'industrial',
        collection: 'HIGH-VIS SAFETY',
        eyebrow: 'SAFETY JACKET',
        badgeText: 'JUST IN',
        dateLabel: '26 Mar 2026',
        specNote: 'Class 2 Certified 3M Tape | Water-Repellent Shell',
        colors: ['#EAB308', '#22C55E', '#F97316'],
        extraColoursLabel: '+2 colours',
        sizes: ['M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-ind-p3',
        name: "Men's Multi-Pocket Industrial Cargo Work Pants",
        price: 1699,
        originalPrice: 2299,
        image: '/products/men/ind/ind-prod-3.jpg',
        category: 'industrial',
        collection: 'SHOP-FLOOR RUGGED',
        eyebrow: 'CARGO PANTS',
        badgeText: 'NEW',
        dateLabel: '23 Mar 2026',
        specNote: 'Triple-Stitched Seams | 6 Reinforced Tool Pockets',
        colors: ['#0B2744', '#374151', '#78350F'],
        extraColoursLabel: '+2 colours',
        sizes: ['30', '32', '34', '36', '38', '40'],
      },
      {
        id: 'men-ind-p4',
        name: "Men's Shop-Floor Industrial Mechanic Work Shirt",
        price: 1299,
        originalPrice: 1799,
        image: '/products/men/ind/ind-prod-4.jpg',
        category: 'industrial',
        collection: 'WORKSHOP SERIES',
        eyebrow: 'MECHANIC SHIRT',
        badgeText: 'JUST IN',
        dateLabel: '20 Mar 2026',
        specNote: 'Soil-Release Finish | Flap Chest Pockets & Pen Slot',
        colors: ['#6B7280', '#0B2744', '#1E293B'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-ind-p5',
        name: "Men's Heavy-Duty Flame-Resistant Field Work Jacket",
        price: 2799,
        originalPrice: 3699,
        image: '/products/men/ind/ind-prod-5.jpg',
        category: 'industrial',
        collection: 'FIELD SAFETY',
        eyebrow: 'FIELD JACKET',
        badgeText: 'NEW',
        dateLabel: '17 Mar 2026',
        specNote: 'FR-Treated Cotton Blend | Heavy Brass Zipper',
        colors: ['#0B2744', '#1F2937', '#78350F'],
        extraColoursLabel: '+2 colours',
        sizes: ['M', 'L', 'XL', '2XL'],
      },
    ],
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Chef Coats',
    icon: ConciergeBell,
    eyebrow: 'LUXURY HOSPITALITY & CULINARY',
    heroTitle: 'Culinary Mastery & 5-Star Hotel Guest Relations Attire.',
    heroSubtitle:
      'Double-breasted master chef coats, luxury concierge blazers, captain waistcoats, and heavy canvas barista aprons.',
    heroBg: '/products/men/hosp/hosp-prod-1.jpg',
    exploreLink: '/men?category=hospitality',
    products: [
      {
        id: 'men-hosp-p1',
        name: "Men's Master Executive Chef Double-Breasted Jacket",
        price: 2199,
        originalPrice: 2899,
        image: '/products/men/hosp/hosp-prod-1.jpg',
        category: 'hospitality',
        collection: 'EXECUTIVE CHEF',
        eyebrow: 'CHEF COAT',
        badgeText: 'NEW',
        dateLabel: '27 Mar 2026',
        specNote: 'Removable Studs | Underarm Airflow Breathable Mesh',
        colors: ['#FFFFFF', '#1E293B', '#B91C1C'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-hosp-p2',
        name: "Men's Luxury Hotel Concierge Navy Blazer with Gold Piping",
        price: 2999,
        originalPrice: 3899,
        image: '/products/men/hosp/hosp-prod-2.jpg',
        category: 'hospitality',
        collection: 'FRONT-DESK LUXE',
        eyebrow: 'HOTEL BLAZER',
        badgeText: 'JUST IN',
        dateLabel: '24 Mar 2026',
        specNote: 'Gold Contrast Lapel Piping | Bespoke Crest Embroidery',
        colors: ['#0B2744', '#1E1B4B', '#0F172A'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44', '46'],
      },
      {
        id: 'men-hosp-p3',
        name: "Men's Fine-Dining Server Captain Formal Waistcoat",
        price: 1599,
        originalPrice: 2199,
        image: '/products/men/hosp/hosp-prod-3.jpg',
        category: 'hospitality',
        collection: 'BANQUET & F&B',
        eyebrow: 'CAPTAIN WAISTCOAT',
        badgeText: 'NEW',
        dateLabel: '21 Mar 2026',
        specNote: 'Stain-Resistant Poly Weave | Welt Pockets',
        colors: ['#111827', '#4A0404', '#0B2744'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'men-hosp-p4',
        name: "Men's Barista & Artisan Cafe Heavy Canvas Apron",
        price: 1199,
        originalPrice: 1699,
        image: '/products/men/hosp/hosp-prod-4.jpg',
        category: 'hospitality',
        collection: 'CAFE & BISTRO',
        eyebrow: 'BARISTA APRON',
        badgeText: 'JUST IN',
        dateLabel: '18 Mar 2026',
        specNote: 'Cross-Back Leather Straps | Heavy 12oz Duck Canvas',
        colors: ['#78350F', '#1F2937', '#14532D'],
        extraColoursLabel: '+2 colours',
        sizes: ['ONE SIZE'],
      },
      {
        id: 'men-hosp-p5',
        name: "Men's Modern Commis Chef Black Contrast Jacket",
        price: 1899,
        originalPrice: 2499,
        image: '/products/men/hosp/hosp-prod-5.jpg',
        category: 'hospitality',
        collection: 'CULINARY ESSENTIALS',
        eyebrow: 'COMMIS CHEF COAT',
        badgeText: 'NEW',
        dateLabel: '15 Mar 2026',
        specNote: 'Red Piping Trim | Thermometer Arm Pocket',
        colors: ['#111827', '#FFFFFF', '#374151'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  {
    id: 'security',
    name: 'Security & Tactical Uniforms',
    icon: Shield,
    eyebrow: 'TACTICAL PATROL & PROTECTION',
    heroTitle: 'Tactical Field Uniforms & Executive Security Protection.',
    heroSubtitle:
      'Authoritative security officer shirt sets, ripstop field patrol uniforms, VIP bodyguard suits, and weatherproof duty windbreakers.',
    heroBg: '/products/men/security/sec-prod-1.jpg',
    exploreLink: '/men?category=security',
    products: [
      {
        id: 'men-sec-p1',
        name: "Men's Corporate Security Officer Uniform Shirt Set",
        price: 1799,
        originalPrice: 2399,
        image: '/products/men/security/sec-prod-1.jpg',
        category: 'security',
        collection: 'SECURITY OFFICER',
        eyebrow: 'OFFICER SHIRT SET',
        badgeText: 'NEW',
        dateLabel: '28 Mar 2026',
        specNote: 'Dual Epaulettes & Badge Holders | Heavy Poly Blend',
        colors: ['#0B2744', '#1E293B', '#374151'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'men-sec-p2',
        name: "Men's Tactical Ripstop Field Patrol Cargo Uniform",
        price: 2499,
        originalPrice: 3299,
        image: '/products/men/security/sec-prod-2.jpg',
        category: 'security',
        collection: 'FIELD PATROL',
        eyebrow: 'TACTICAL UNIFORM',
        badgeText: 'JUST IN',
        dateLabel: '25 Mar 2026',
        specNote: 'Tear-Proof Tactical Ripstop Weave | Reinforced Knees',
        colors: ['#3F6212', '#1E293B', '#78350F'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-sec-p3',
        name: "Men's VIP Close Protection Executive Bodyguard Suit",
        price: 3499,
        originalPrice: 4599,
        image: '/products/men/security/sec-prod-3.jpg',
        category: 'security',
        collection: 'VIP PROTECTION',
        eyebrow: 'BODYGUARD SUIT',
        badgeText: 'NEW',
        dateLabel: '22 Mar 2026',
        specNote: 'High-Stretch Suiting | Concealed Inner Radio Holster Pockets',
        colors: ['#0B0F19', '#1E293B', '#111827'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44', '46'],
      },
      {
        id: 'men-sec-p4',
        name: "Men's Security High-Collar Duty Windbreaker Jacket",
        price: 1999,
        originalPrice: 2699,
        image: '/products/men/security/sec-prod-4.jpg',
        category: 'security',
        collection: 'DUTY GEAR',
        eyebrow: 'DUTY WINDBREAKER',
        badgeText: 'JUST IN',
        dateLabel: '19 Mar 2026',
        specNote: 'Wind & Water Resistant | Reflective SECURITY Back Patch',
        colors: ['#111827', '#0B2744', '#1E293B'],
        extraColoursLabel: '+2 colours',
        sizes: ['M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-sec-p5',
        name: "Men's Heavy-Duty Ripstop Security Cargo Work Trousers",
        price: 1699,
        originalPrice: 2299,
        image: '/products/men/security/sec-prod-5.jpg',
        category: 'security',
        collection: 'PATROL CARGO',
        eyebrow: 'TACTICAL TROUSERS',
        badgeText: 'NEW',
        dateLabel: '16 Mar 2026',
        specNote: 'Gusseted Crotch & Double Knees | 8 Tactical Pockets',
        colors: ['#1F2937', '#0B2744', '#3F6212'],
        extraColoursLabel: '+2 colours',
        sizes: ['30', '32', '34', '36', '38'],
      },
    ],
  },
  {
    id: 'scrubs',
    name: "Men's Healthcare Scrubs",
    icon: Stethoscope,
    eyebrow: 'CLINICAL & HEALTHCARE ESSENTIALS',
    heroTitle: 'Antimicrobial Medical Scrubs & Doctor Consultation Attire.',
    heroSubtitle:
      '4-way stretch athletic scrub suits, barrier OT sets, and consultation doctor lab coats crafted with fluid-repellent antimicrobial weave.',
    heroBg: '/products/men/scrubs/scrubs-prod-1.jpg',
    exploreLink: '/men?category=scrubs',
    products: [
      {
        id: 'men-scrubs-p1',
        name: "Men's Athletic V-Neck Scrub Top & Jogger Pants Set",
        price: 1799,
        originalPrice: 2399,
        image: '/products/men/scrubs/scrubs-prod-1.jpg',
        category: 'healthcare',
        collection: 'PRO CLINICAL',
        eyebrow: 'ATHLETIC SCRUB SET',
        badgeText: 'NEW',
        dateLabel: '29 Mar 2026',
        specNote: 'SILVADUR™ Antimicrobial 4-Way Stretch | Elastic Jogger Cuff',
        colors: ['#1D4ED8', '#0F766E', '#1E293B'],
        extraColoursLabel: '+3 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-scrubs-p2',
        name: "Men's Executive Doctor Consultation White Lab Coat",
        price: 1499,
        originalPrice: 1999,
        image: '/products/men/scrubs/scrubs-prod-2.jpg',
        category: 'healthcare',
        collection: 'CONSULTATION WEAR',
        eyebrow: 'DOCTOR LAB COAT',
        badgeText: 'JUST IN',
        dateLabel: '26 Mar 2026',
        specNote: 'Knee Length | Dual Tablet Pockets & Side Slit Access',
        colors: ['#FFFFFF', '#F8FAFC', '#E2E8F0'],
        extraColoursLabel: '+2 colours',
        sizes: ['38', '40', '42', '44'],
      },
      {
        id: 'men-scrubs-p3',
        name: "Men's Sterile Surgical OT Barrier Scrub Set",
        price: 1599,
        originalPrice: 2199,
        image: '/products/men/scrubs/scrubs-prod-3.jpg',
        category: 'healthcare',
        collection: 'OT & SURGICAL',
        eyebrow: 'SURGICAL SCRUBS',
        badgeText: 'NEW',
        dateLabel: '23 Mar 2026',
        specNote: 'Fluid-Repellent Coating | Autoclavable Poly-Cotton',
        colors: ['#0284C7', '#059669', '#0F766E'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-scrubs-p4',
        name: "Men's Ergonomic 4-Pocket Hospital Scrub Set",
        price: 1699,
        originalPrice: 2299,
        image: '/products/men/scrubs/scrubs-prod-4.jpg',
        category: 'healthcare',
        collection: 'HOSPITAL STAFF',
        eyebrow: 'HOSPITAL SCRUBS',
        badgeText: 'JUST IN',
        dateLabel: '20 Mar 2026',
        specNote: '4 Ergonomic Utility Pockets | Fade-Resistant Deep Navy',
        colors: ['#0B2744', '#1E3A8A', '#0F172A'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
      {
        id: 'men-scrubs-p5',
        name: "Men's High-Performance Antiviral Clinical Scrub Set",
        price: 1899,
        originalPrice: 2499,
        image: '/products/men/scrubs/scrubs-prod-5.jpg',
        category: 'healthcare',
        collection: 'CLINICAL PRO',
        eyebrow: 'ANTIVIRAL SCRUBS',
        badgeText: 'NEW',
        dateLabel: '17 Mar 2026',
        specNote: 'Antiviral Certified Weave | Hunter Forest Green Fit',
        colors: ['#14532D', '#166534', '#064E3B'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL'],
      },
    ],
  },
  {
    id: 'logistics',
    name: 'Logistics & Retail Polos',
    icon: Truck,
    eyebrow: 'SUPPLY CHAIN & STORE OPERATIONS',
    heroTitle: 'Fleet Operations, Warehouse Logistics & Retail Team Polos.',
    heroSubtitle:
      'Heavy-duty pique knit polos, moisture-wicking courier tees, store supervisor polos, and high-visibility logistics apparel.',
    heroBg: '/products/men/logistics/log-prod-1.jpg',
    exploreLink: '/men?category=logistics',
    products: [
      {
        id: 'men-log-p1',
        name: "Men's Heavy-Duty Pique Fleet Transport Driver Polo",
        price: 899,
        originalPrice: 1299,
        image: '/products/men/logistics/log-prod-1.jpg',
        category: 'logistics',
        collection: 'FLEET TRANSPORT',
        eyebrow: 'DRIVER POLO',
        badgeText: 'NEW',
        dateLabel: '29 Mar 2026',
        specNote: 'Heavy 240 GSM Combed Pique | Reinforced Collar & Cuffs',
        colors: ['#0B2744', '#1F2937', '#DC2626'],
        extraColoursLabel: '+3 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL', '3XL'],
      },
      {
        id: 'men-log-p2',
        name: "Men's Warehouse Moisture-Wicking Two-Tone Athletic Polo",
        price: 999,
        originalPrice: 1399,
        image: '/products/men/logistics/log-prod-2.jpg',
        category: 'logistics',
        collection: 'WAREHOUSE TECH',
        eyebrow: 'ATHLETIC POLO',
        badgeText: 'JUST IN',
        dateLabel: '26 Mar 2026',
        specNote: 'CoolPass™ Moisture Wicking | Breathable Contrast Panels',
        colors: ['#1D4ED8', '#111827', '#0F766E'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-log-p3',
        name: "Men's Quick-Dry Last-Mile Delivery Courier Field T-Shirt",
        price: 699,
        originalPrice: 999,
        image: '/products/men/logistics/log-prod-3.jpg',
        category: 'logistics',
        collection: 'LAST-MILE COURIER',
        eyebrow: 'COURIER TEE',
        badgeText: 'NEW',
        dateLabel: '23 Mar 2026',
        specNote: 'Reflective Safety Accent Stripes | Lightweight UV Shield',
        colors: ['#0284C7', '#2563EB', '#1F2937'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-log-p4',
        name: "Men's Retail Store Supervisor Formal Uniform Polo",
        price: 1099,
        originalPrice: 1499,
        image: '/products/men/logistics/log-prod-4.jpg',
        category: 'logistics',
        collection: 'STORE SUPERVISOR',
        eyebrow: 'SUPERVISOR POLO',
        badgeText: 'JUST IN',
        dateLabel: '20 Mar 2026',
        specNote: 'Gold Contrast Jacquard Collar Tipping | Premium Mercerized Cotton',
        colors: ['#111827', '#0B2744', '#374151'],
        extraColoursLabel: '+2 colours',
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
      },
      {
        id: 'men-log-p5',
        name: "Men's Transport Logistics High-Visibility Safety Utility Polo",
        price: 1199,
        originalPrice: 1699,
        image: '/products/men/logistics/log-prod-5.jpg',
        category: 'logistics',
        collection: 'SAFETY UTILITY',
        eyebrow: 'HI-VIS POLO',
        badgeText: 'NEW',
        dateLabel: '17 Mar 2026',
        specNote: 'Neon Lime with Navy Hem | 3M Reflective Micro-Prisms',
        colors: ['#A3E635', '#EAB308', '#F97316'],
        extraColoursLabel: '+2 colours',
        sizes: ['M', 'L', 'XL', '2XL'],
      },
    ],
  },
]

/* ─── ALL 30 GENERATED PRODUCT IMAGES CATALOG LOOKBOOK ─── */
interface LookbookItem {
  id: string
  category: MenCategoryKey
  categoryLabel: string
  title: string
  spec: string
  image: string
  price: string
}

const ALL_MEN_PRODUCT_IMAGES: LookbookItem[] = [
  // Corporate (5)
  {
    id: 'lb-mc1',
    category: 'corporate',
    categoryLabel: 'Corporate Shirts & Suits',
    title: "Men's Executive Italian-Cut Navy Blue Blazer",
    spec: 'Wrinkle-Resistant Poly-Viscose | Notched Lapel',
    image: '/products/men/corp/corp-prod-1.jpg',
    price: '₹2,699',
  },
  {
    id: 'lb-mc2',
    category: 'corporate',
    categoryLabel: 'Corporate Shirts & Suits',
    title: "Men's Crisp Wrinkle-Free White Formal Oxford Shirt",
    spec: '100% Breathable Egyptian Cotton | Easy Care',
    image: '/products/men/corp/corp-prod-2.jpg',
    price: '₹1,399',
  },
  {
    id: 'lb-mc3',
    category: 'corporate',
    categoryLabel: 'Corporate Shirts & Suits',
    title: "Men's Charcoal Grey Tailored Poly-Viscose Trousers",
    spec: 'Flex Waistband | Anti-Crease Micro-Poly Blend',
    image: '/products/men/corp/corp-prod-3.jpg',
    price: '₹1,499',
  },
  {
    id: 'lb-mc4',
    category: 'corporate',
    categoryLabel: 'Corporate Shirts & Suits',
    title: "Men's Formal Navy Blue 5-Button Business Waistcoat",
    spec: 'Adjustable Back Cinch | Sateen Inner Lining',
    image: '/products/men/corp/corp-prod-4.jpg',
    price: '₹1,599',
  },
  {
    id: 'lb-mc5',
    category: 'corporate',
    categoryLabel: 'Corporate Shirts & Suits',
    title: "Men's Executive Sky Blue French-Cuff Dress Shirt",
    spec: 'Fine Twill Weave | Stiffened Spread Collar',
    image: '/products/men/corp/corp-prod-5.jpg',
    price: '₹1,499',
  },

  // Industrial & Safety (5)
  {
    id: 'lb-mi1',
    category: 'industrial',
    categoryLabel: 'Industrial & Safety Workwear',
    title: "Men's Heavy-Duty Reflective Boiler Suit Coverall",
    spec: 'Dual 3M Reflective Bands | Heavy Twill 280 GSM',
    image: '/products/men/ind/ind-prod-1.jpg',
    price: '₹2,499',
  },
  {
    id: 'lb-mi2',
    category: 'industrial',
    categoryLabel: 'Industrial & Safety Workwear',
    title: "Men's Neon Yellow 3M Reflective High-Vis Jacket",
    spec: 'Class 2 Certified 3M Tape | Water-Repellent Shell',
    image: '/products/men/ind/ind-prod-2.jpg',
    price: '₹1,899',
  },
  {
    id: 'lb-mi3',
    category: 'industrial',
    categoryLabel: 'Industrial & Safety Workwear',
    title: "Men's Multi-Pocket Industrial Cargo Work Pants",
    spec: 'Triple-Stitched Seams | 6 Reinforced Tool Pockets',
    image: '/products/men/ind/ind-prod-3.jpg',
    price: '₹1,699',
  },
  {
    id: 'lb-mi4',
    category: 'industrial',
    categoryLabel: 'Industrial & Safety Workwear',
    title: "Men's Shop-Floor Industrial Mechanic Work Shirt",
    spec: 'Soil-Release Finish | Flap Chest Pockets & Pen Slot',
    image: '/products/men/ind/ind-prod-4.jpg',
    price: '₹1,299',
  },
  {
    id: 'lb-mi5',
    category: 'industrial',
    categoryLabel: 'Industrial & Safety Workwear',
    title: "Men's Heavy-Duty Flame-Resistant Field Work Jacket",
    spec: 'FR-Treated Cotton Blend | Heavy Brass Zipper',
    image: '/products/men/ind/ind-prod-5.jpg',
    price: '₹2,799',
  },

  // Hospitality & Chef (5)
  {
    id: 'lb-mh1',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Chef Coats',
    title: "Men's Master Executive Chef Double-Breasted Jacket",
    spec: 'Removable Studs | Underarm Airflow Breathable Mesh',
    image: '/products/men/hosp/hosp-prod-1.jpg',
    price: '₹2,199',
  },
  {
    id: 'lb-mh2',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Chef Coats',
    title: "Men's Luxury Hotel Concierge Navy Blazer with Gold Piping",
    spec: 'Gold Contrast Lapel Piping | Bespoke Crest Embroidery',
    image: '/products/men/hosp/hosp-prod-2.jpg',
    price: '₹2,999',
  },
  {
    id: 'lb-mh3',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Chef Coats',
    title: "Men's Fine-Dining Server Captain Formal Waistcoat",
    spec: 'Stain-Resistant Poly Weave | Welt Pockets',
    image: '/products/men/hosp/hosp-prod-3.jpg',
    price: '₹1,599',
  },
  {
    id: 'lb-mh4',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Chef Coats',
    title: "Men's Barista & Artisan Cafe Heavy Canvas Apron",
    spec: 'Cross-Back Leather Straps | Heavy 12oz Duck Canvas',
    image: '/products/men/hosp/hosp-prod-4.jpg',
    price: '₹1,199',
  },
  {
    id: 'lb-mh5',
    category: 'hospitality',
    categoryLabel: 'Hospitality & Chef Coats',
    title: "Men's Modern Commis Chef Black Contrast Jacket",
    spec: 'Red Piping Trim | Thermometer Arm Pocket',
    image: '/products/men/hosp/hosp-prod-5.jpg',
    price: '₹1,899',
  },

  // Security & Tactical (5)
  {
    id: 'lb-ms1',
    category: 'security',
    categoryLabel: 'Security & Tactical Uniforms',
    title: "Men's Corporate Security Officer Uniform Shirt Set",
    spec: 'Dual Epaulettes & Badge Holders | Heavy Poly Blend',
    image: '/products/men/security/sec-prod-1.jpg',
    price: '₹1,799',
  },
  {
    id: 'lb-ms2',
    category: 'security',
    categoryLabel: 'Security & Tactical Uniforms',
    title: "Men's Tactical Ripstop Field Patrol Cargo Uniform",
    spec: 'Tear-Proof Tactical Ripstop Weave | Reinforced Knees',
    image: '/products/men/security/sec-prod-2.jpg',
    price: '₹2,499',
  },
  {
    id: 'lb-ms3',
    category: 'security',
    categoryLabel: 'Security & Tactical Uniforms',
    title: "Men's VIP Close Protection Executive Bodyguard Suit",
    spec: 'High-Stretch Suiting | Concealed Inner Radio Holster Pockets',
    image: '/products/men/security/sec-prod-3.jpg',
    price: '₹3,499',
  },
  {
    id: 'lb-ms4',
    category: 'security',
    categoryLabel: 'Security & Tactical Uniforms',
    title: "Men's Security High-Collar Duty Windbreaker Jacket",
    spec: 'Wind & Water Resistant | Reflective SECURITY Back Patch',
    image: '/products/men/security/sec-prod-4.jpg',
    price: '₹1,999',
  },
  {
    id: 'lb-ms5',
    category: 'security',
    categoryLabel: 'Security & Tactical Uniforms',
    title: "Men's Heavy-Duty Ripstop Security Cargo Work Trousers",
    spec: 'Gusseted Crotch & Double Knees | 8 Tactical Pockets',
    image: '/products/men/security/sec-prod-5.jpg',
    price: '₹1,699',
  },

  // Men's Healthcare Scrubs (5)
  {
    id: 'lb-msc1',
    category: 'scrubs',
    categoryLabel: "Men's Healthcare Scrubs",
    title: "Men's Athletic V-Neck Scrub Top & Jogger Pants Set",
    spec: 'SILVADUR™ Antimicrobial 4-Way Stretch | Elastic Jogger Cuff',
    image: '/products/men/scrubs/scrubs-prod-1.jpg',
    price: '₹1,799',
  },
  {
    id: 'lb-msc2',
    category: 'scrubs',
    categoryLabel: "Men's Healthcare Scrubs",
    title: "Men's Executive Doctor Consultation White Lab Coat",
    spec: 'Knee Length | Dual Tablet Pockets & Side Slit Access',
    image: '/products/men/scrubs/scrubs-prod-2.jpg',
    price: '₹1,499',
  },
  {
    id: 'lb-msc3',
    category: 'scrubs',
    categoryLabel: "Men's Healthcare Scrubs",
    title: "Men's Sterile Surgical OT Barrier Scrub Set",
    spec: 'Fluid-Repellent Coating | Autoclavable Poly-Cotton',
    image: '/products/men/scrubs/scrubs-prod-3.jpg',
    price: '₹1,599',
  },
  {
    id: 'lb-msc4',
    category: 'scrubs',
    categoryLabel: "Men's Healthcare Scrubs",
    title: "Men's Ergonomic 4-Pocket Hospital Scrub Set",
    spec: '4 Ergonomic Utility Pockets | Fade-Resistant Deep Navy',
    image: '/products/men/scrubs/scrubs-prod-4.jpg',
    price: '₹1,699',
  },
  {
    id: 'lb-msc5',
    category: 'scrubs',
    categoryLabel: "Men's Healthcare Scrubs",
    title: "Men's High-Performance Antiviral Clinical Scrub Set",
    spec: 'Antiviral Certified Weave | Hunter Forest Green Fit',
    image: '/products/men/scrubs/scrubs-prod-5.jpg',
    price: '₹1,899',
  },

  // Logistics & Retail Polos (5)
  {
    id: 'lb-ml1',
    category: 'logistics',
    categoryLabel: 'Logistics & Retail Polos',
    title: "Men's Heavy-Duty Pique Fleet Transport Driver Polo",
    spec: 'Heavy 240 GSM Combed Pique | Reinforced Collar & Cuffs',
    image: '/products/men/logistics/log-prod-1.jpg',
    price: '₹899',
  },
  {
    id: 'lb-ml2',
    category: 'logistics',
    categoryLabel: 'Logistics & Retail Polos',
    title: "Men's Warehouse Moisture-Wicking Two-Tone Athletic Polo",
    spec: 'CoolPass™ Moisture Wicking | Breathable Contrast Panels',
    image: '/products/men/logistics/log-prod-2.jpg',
    price: '₹999',
  },
  {
    id: 'lb-ml3',
    category: 'logistics',
    categoryLabel: 'Logistics & Retail Polos',
    title: "Men's Quick-Dry Last-Mile Delivery Courier Field T-Shirt",
    spec: 'Reflective Safety Accent Stripes | Lightweight UV Shield',
    image: '/products/men/logistics/log-prod-3.jpg',
    price: '₹699',
  },
  {
    id: 'lb-ml4',
    category: 'logistics',
    categoryLabel: 'Logistics & Retail Polos',
    title: "Men's Retail Store Supervisor Formal Uniform Polo",
    spec: 'Gold Contrast Jacquard Collar Tipping | Premium Mercerized Cotton',
    image: '/products/men/logistics/log-prod-4.jpg',
    price: '₹1,099',
  },
  {
    id: 'lb-ml5',
    category: 'logistics',
    categoryLabel: 'Logistics & Retail Polos',
    title: "Men's Transport Logistics High-Visibility Safety Utility Polo",
    spec: 'Neon Lime with Navy Hem | 3M Reflective Micro-Prisms',
    image: '/products/men/logistics/log-prod-5.jpg',
    price: '₹1,199',
  },
]

/* ─── SINGLE PRODUCT CARD ─── */
function MenSignatureProductCard({
  product,
  onOpenLightbox,
}: {
  product: MenCategoryProductItem
  onOpenLightbox?: (img: string, title: string, spec?: string) => void
}) {
  const { addToCart, isInWishlist, toggleWishlist } = useStore()
  const wishlisted = isInWishlist(product.id)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] ?? '#0B2744')
  const [added, setAdded] = useState(false)
  const [wishHovered, setWishHovered] = useState(false)
  const [isChanging, setIsChanging] = useState(false)

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

  const handleColorSelect = (col: string) => {
    if (selectedColor === col) return
    setIsChanging(true)
    setSelectedColor(col)
    setTimeout(() => setIsChanging(false), 200)
  }

  const isBaseColor = selectedColor === (product.colors?.[0] ?? '#0B2744')
  const isWhiteGarment = product.image.includes('lab-coat') || product.colors?.[0]?.toLowerCase() === '#ffffff'

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
          style={{ display: 'block', width: '100%', height: '100%', position: 'relative' }}
        >
          <img
            key={product.image}
            src={product.image}
            alt={product.name}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              opacity: isChanging ? 0.6 : 1,
              transition: `transform 0.4s ${EASE}, opacity 0.2s ease`,
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.05)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
            }}
          />

          {!isBaseColor && (
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: selectedColor,
                mixBlendMode: isWhiteGarment ? 'multiply' : 'color',
                opacity: 0.38,
                pointerEvents: 'none',
                transition: 'all 0.3s ease',
              }}
            />
          )}
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
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            {product.badgeText}
          </span>
        </div>

        {/* Top-Right Wishlist Button */}
        <button
          type="button"
          onClick={e => {
            e.preventDefault()
            e.stopPropagation()
            toggleWishlist(product.id)
          }}
          onMouseEnter={() => setWishHovered(true)}
          onMouseLeave={() => setWishHovered(false)}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          style={{
            position: 'absolute',
            top: '0.65rem',
            right: '0.65rem',
            zIndex: 2,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(11, 39, 68, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            transform: wishHovered ? 'scale(1.1)' : 'scale(1)',
            transition: `transform 0.18s ${EASE}, background 0.18s ease`,
          }}
        >
          <Heart
            size={15}
            style={{
              color: wishlisted ? '#EF4444' : '#64748B',
              fill: wishlisted ? '#EF4444' : 'none',
              transition: 'all 0.18s ease',
            }}
          />
        </button>

        {/* Zoom Lightbox Preview Action */}
        {onOpenLightbox && (
          <button
            type="button"
            onClick={e => {
              e.preventDefault()
              e.stopPropagation()
              onOpenLightbox(product.image, product.name, product.specNote)
            }}
            title="Inspect tailored garment details"
            style={{
              position: 'absolute',
              bottom: '0.65rem',
              right: '0.65rem',
              zIndex: 2,
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'rgba(11, 39, 68, 0.82)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              opacity: 0.9,
              transition: `all 0.2s ${EASE}`,
            }}
            onMouseEnter={e => {
              ;(e.currentTarget as HTMLElement).style.opacity = '1'
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1.12)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.opacity = '0.9'
              ;(e.currentTarget as HTMLElement).style.transform = 'scale(1)'
            }}
          >
            <Maximize2 size={13} />
          </button>
        )}
      </div>

      {/* ── CARD BODY ── */}
      <div
        style={{
          padding: '0.9rem',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Eyebrow & Date */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.35rem',
              gap: '0.4rem',
            }}
          >
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 800,
                color: '#146EF5',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}
            >
              {product.eyebrow}
            </span>
            <span
              style={{
                fontSize: '0.6rem',
                color: 'var(--color-neutral-400)',
                fontWeight: 500,
              }}
            >
              {product.dateLabel}
            </span>
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
              {(product.colors ?? []).slice(0, 4).map((col, idx) => {
                const isSelected = selectedColor === col
                const isWhite = col.toLowerCase() === '#ffffff'
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleColorSelect(col)}
                    aria-label={`Select color ${col}`}
                    title={`Select color ${col}`}
                    style={{
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: col,
                      border: isSelected
                        ? '2px solid white'
                        : isWhite
                          ? '1px solid #CBD5E1'
                          : '1px solid rgba(0,0,0,0.14)',
                      boxShadow: isSelected
                        ? '0 0 0 2px #146EF5, 0 2px 6px rgba(20, 110, 245, 0.35)'
                        : '0 1px 2px rgba(0,0,0,0.06)',
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

          {/* Quick Add Button */}
          <button
            type="button"
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            style={{
              padding: '0.35rem 0.65rem',
              borderRadius: 8,
              border: 'none',
              background: added ? '#16A34A' : '#0B2744',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              transition: `all 0.2s ${EASE}`,
              flexShrink: 0,
            }}
          >
            {added ? (
              <>
                <Check size={12} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={12} /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── STACKED CATEGORY ROW ─── */
function MenCategoryRow({
  category,
  onOpenLightbox,
}: {
  category: MenCategoryData
  onOpenLightbox?: (img: string, title: string, spec?: string) => void
}) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!trackRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = trackRef.current
    setCanScrollLeft(scrollLeft > 6)
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 6)
  }

  useEffect(() => {
    checkScroll()
    const el = trackRef.current
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true })
      window.addEventListener('resize', checkScroll)
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scrollByAmount = (direction: 'left' | 'right') => {
    if (!trackRef.current) return
    const cardWidth = trackRef.current.clientWidth / 4
    const amount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2
    trackRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const IconComp = category.icon

  return (
    <section
      id={category.id}
      style={{
        paddingTop: '2.5rem',
        paddingBottom: '2.5rem',
        borderBottom: '1px solid rgba(11, 39, 68, 0.08)',
        scrollMarginTop: '110px',
      }}
    >
      <div
        className="category-row-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '32% 68%',
          gap: '1.5rem',
          alignItems: 'stretch',
        }}
      >
        {/* ── LEFT: HERO POSTER CARD (~32%) ── */}
        <div
          className="category-hero-poster"
          style={{
            position: 'relative',
            borderRadius: 22,
            overflow: 'hidden',
            minHeight: 380,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.75rem',
            boxShadow: '0 8px 24px rgba(11, 39, 68, 0.08)',
            border: '1px solid rgba(11, 39, 68, 0.08)',
          }}
        >
          {/* Background Image with Pure Studio Catalog Photo */}
          <img
            src={category.heroBg}
            alt={category.name}
            loading="lazy"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              background: '#F1F5F9',
              transition: `transform 0.6s ${EASE}`,
            }}
          />

          {/* Subtle Contrast Gradient so text is ultra-crisp */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, rgba(11, 39, 68, 0.85) 0%, rgba(11, 39, 68, 0.35) 45%, rgba(11, 39, 68, 0.92) 100%)',
              zIndex: 1,
            }}
          />

          {/* Top Pill & Badges */}
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                background: 'rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                color: 'white',
                padding: '0.35rem 0.85rem',
                borderRadius: 100,
                fontSize: '0.72rem',
                fontWeight: 800,
                letterSpacing: '0.04em',
                marginBottom: '0.75rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
              }}
            >
              <IconComp size={14} style={{ color: '#38BDF8' }} />
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
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--color-neutral-500)',
                marginRight: '0.35rem',
              }}
            >
              Scroll 5 Styles
            </span>

            <button
              type="button"
              onClick={() => scrollByAmount('left')}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: canScrollLeft ? 'white' : '#F1F5F9',
                border: '1px solid rgba(11, 39, 68, 0.12)',
                color: canScrollLeft ? '#0B2744' : '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollLeft ? 'pointer' : 'default',
                boxShadow: canScrollLeft ? '0 2px 8px rgba(11, 39, 68, 0.08)' : 'none',
                transition: `all 0.2s ${EASE}`,
              }}
            >
              <ChevronLeft size={16} />
            </button>

            <button
              type="button"
              onClick={() => scrollByAmount('right')}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: canScrollRight ? '#0B2744' : '#F1F5F9',
                border: canScrollRight
                  ? '1px solid #0B2744'
                  : '1px solid rgba(11, 39, 68, 0.12)',
                color: canScrollRight ? 'white' : '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: canScrollRight ? 'pointer' : 'default',
                boxShadow: canScrollRight ? '0 4px 12px rgba(11, 39, 68, 0.2)' : 'none',
                transition: `all 0.2s ${EASE}`,
              }}
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* The Scroll Container (4 cards visible simultaneously on desktop) */}
          <div
            ref={trackRef}
            className="horizontal-product-track"
            style={{
              display: 'flex',
              gap: '1rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              paddingTop: '0.5rem',
              paddingBottom: '0.75rem',
              scrollbarWidth: 'thin',
              scrollbarColor: '#CBD5E1 transparent',
            }}
          >
            {category.products.map(product => (
              <MenSignatureProductCard
                key={product.id}
                product={product}
                onOpenLightbox={onOpenLightbox}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── FULL CLIENT PRESENTATION LOOKBOOK (ALL 30 PRODUCT IMAGES) ─── */
function MenClientPresentationLookbook({
  onOpenLightbox,
}: {
  onOpenLightbox: (img: string, title: string, spec?: string) => void
}) {
  const [filter, setFilter] = useState<MenCategoryKey | 'all'>('all')

  const displayedImages =
    filter === 'all'
      ? ALL_MEN_PRODUCT_IMAGES
      : ALL_MEN_PRODUCT_IMAGES.filter(item => item.category === filter)

  const filterTabs: Array<{ id: MenCategoryKey | 'all'; label: string }> = [
    { id: 'all', label: 'All 30 Men Products' },
    { id: 'corporate', label: 'Corporate (5)' },
    { id: 'industrial', label: 'Industrial & Safety (5)' },
    { id: 'hospitality', label: 'Hospitality & Chef (5)' },
    { id: 'security', label: 'Security & Tactical (5)' },
    { id: 'scrubs', label: 'Healthcare Scrubs (5)' },
    { id: 'logistics', label: 'Logistics & Polos (5)' },
  ]

  return (
    <section
      id="men-lookbook-section"
      style={{
        marginTop: '3.5rem',
        paddingTop: '3.5rem',
        paddingBottom: '4rem',
        background: 'linear-gradient(180deg, #F8FAFC 0%, #FFFFFF 100%)',
        borderTop: '1px solid rgba(11, 39, 68, 0.08)',
      }}
    >
      {/* Header Banner */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.28rem 0.75rem',
              borderRadius: 100,
              background: '#EEF6FF',
              border: '1px solid rgba(20, 110, 245, 0.25)',
              marginBottom: '0.65rem',
            }}
          >
            <Camera size={13} style={{ color: '#146EF5' }} />
            <span
              style={{
                fontSize: '0.68rem',
                fontWeight: 800,
                color: '#146EF5',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
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
            All 30 Men&apos;s Uniform Product Catalog Images
          </h3>

          <p
            style={{
              color: 'var(--color-neutral-500)',
              fontSize: '0.86rem',
              maxWidth: 680,
              marginTop: '0.35rem',
            }}
          >
            Pure e-commerce studio catalog photography (ghost mannequin display, zero human faces/models) across all 6 men&apos;s uniform categories. Click any product to enlarge and inspect tailoring details.
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
                    padding: '0.4rem 0.8rem',
                    borderRadius: 100,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  }}
                >
                  <Maximize2 size={12} /> Inspect Detail
                </span>
              </div>
            </div>

            <div style={{ padding: '0.85rem' }}>
              <div
                style={{
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  color: '#146EF5',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: '0.2rem',
                }}
              >
                {item.categoryLabel}
              </div>
              <h5
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  color: '#0B2744',
                  lineHeight: 1.25,
                  marginBottom: '0.25rem',
                }}
              >
                {item.title}
              </h5>
              <div
                style={{
                  fontSize: '0.65rem',
                  color: 'var(--color-neutral-500)',
                  lineHeight: 1.3,
                  marginBottom: '0.45rem',
                }}
              >
                {item.spec}
              </div>
              <div
                style={{
                  fontWeight: 900,
                  fontSize: '0.85rem',
                  color: '#0B2744',
                }}
              >
                {item.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─── LIGHTBOX MODAL ─── */
function MenLightboxModal({
  isOpen,
  image,
  title,
  spec,
  onClose,
}: {
  isOpen: boolean
  image: string
  title: string
  spec?: string
  onClose: () => void
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'rgba(11, 39, 68, 0.88)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: 'white',
          borderRadius: 20,
          maxWidth: 720,
          width: '100%',
          overflow: 'hidden',
          boxShadow: '0 25px 60px rgba(0,0,0,0.4)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '92vh',
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close lightbox"
          style={{
            position: 'absolute',
            top: '0.85rem',
            right: '0.85rem',
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'white',
            border: '1px solid rgba(11, 39, 68, 0.12)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.15)',
          }}
        >
          <X size={18} style={{ color: '#0B2744' }} />
        </button>

        <div
          style={{
            position: 'relative',
            background: '#F8FAFC',
            aspectRatio: '1 / 1',
            maxHeight: '62vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <img
            src={image}
            alt={title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </div>

        <div style={{ padding: '1.25rem 1.5rem' }}>
          <div
            style={{
              fontSize: '0.68rem',
              fontWeight: 800,
              color: '#146EF5',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '0.25rem',
            }}
          >
            AFI UNIFORMS • 100% GHOST MANNEQUIN CATALOG SPEC
          </div>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 900,
              fontSize: '1.15rem',
              color: '#0B2744',
              marginBottom: '0.35rem',
            }}
          >
            {title}
          </h3>
          {spec && (
            <p
              style={{
                fontSize: '0.82rem',
                color: 'var(--color-neutral-600)',
                lineHeight: 1.4,
              }}
            >
              {spec}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

/* ─── MAIN MEN'S CATEGORY SIGNATURE SECTIONS EXPORT ─── */
interface MenCategorySignatureSectionsProps {
  initialCategory?: MenCategoryKey
}

export default function MenCategorySignatureSections({
  initialCategory,
}: MenCategorySignatureSectionsProps) {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategoryParam = (searchParams.get('category') as MenCategoryKey) || initialCategory || 'corporate'
  const [activeTab, setActiveTab] = useState<MenCategoryKey>(activeCategoryParam)

  // Lightbox State
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean
    image: string
    title: string
    spec?: string
  }>({
    isOpen: false,
    image: '',
    title: '',
    spec: '',
  })

  const openLightbox = (image: string, title: string, spec?: string) => {
    setLightbox({ isOpen: true, image, title, spec })
  }

  const closeLightbox = () => {
    setLightbox(prev => ({ ...prev, isOpen: false }))
  }

  // Sync with searchParams
  useEffect(() => {
    const cat = searchParams.get('category') as MenCategoryKey
    if (cat && cat !== activeTab) {
      setActiveTab(cat)
      const el = document.getElementById(cat)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
  }, [searchParams])

  const handleTabClick = (catId: MenCategoryKey) => {
    setActiveTab(catId)
    setSearchParams({ category: catId })
    const el = document.getElementById(catId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div style={{ background: '#FAFBFD' }}>
      {/* ── STICKY CATEGORY PILLS BAR ── */}
      <div
        style={{
          position: 'sticky',
          top: 72,
          zIndex: 40,
          background: 'rgba(255, 255, 255, 0.94)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid rgba(11, 39, 68, 0.08)',
          boxShadow: '0 4px 16px rgba(11, 39, 68, 0.04)',
          padding: '0.75rem 0',
        }}
      >
        <div className="container-site">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            {/* Pill items for all 6 categories */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              {MEN_CATEGORIES.map(cat => {
                const isActive = activeTab === cat.id
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => handleTabClick(cat.id)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      padding: '0.48rem 0.95rem',
                      borderRadius: 100,
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      transition: `all 0.22s ${EASE}`,
                      background: isActive ? '#0B2744' : 'transparent',
                      color: isActive ? 'white' : '#0B2744',
                      border: isActive
                        ? '1px solid #0B2744'
                        : '1px solid rgba(11, 39, 68, 0.12)',
                      boxShadow: isActive
                        ? '0 4px 14px rgba(11, 39, 68, 0.22)'
                        : 'none',
                    }}
                  >
                    <Icon size={14} style={{ color: isActive ? '#38BDF8' : '#146EF5' }} />
                    {cat.name}
                  </button>
                )
              })}
            </div>

            {/* Jump to Full 30 Products Presentation Lookbook */}
            <a
              href="#men-lookbook-section"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontSize: '0.74rem',
                fontWeight: 800,
                color: '#146EF5',
                textDecoration: 'none',
                whiteSpace: 'nowrap',
                padding: '0.45rem 0.9rem',
                borderRadius: 100,
                background: '#EEF6FF',
                border: '1px solid rgba(20, 110, 245, 0.25)',
                flexShrink: 0,
              }}
            >
              <Camera size={13} />
              Inspect All 30 Catalog Shots
            </a>
          </div>
        </div>
      </div>

      {/* ── STACKED ROWS FOR ALL 6 MEN CATEGORIES ── */}
      <div className="container-site">
        {MEN_CATEGORIES.map(category => (
          <MenCategoryRow
            key={category.id}
            category={category}
            onOpenLightbox={openLightbox}
          />
        ))}

        {/* ── ALL 30 PRODUCTS CLIENT PRESENTATION LOOKBOOK ── */}
        <MenClientPresentationLookbook onOpenLightbox={openLightbox} />
      </div>

      {/* ── LIGHTBOX MODAL ── */}
      <MenLightboxModal
        isOpen={lightbox.isOpen}
        image={lightbox.image}
        title={lightbox.title}
        spec={lightbox.spec}
        onClose={closeLightbox}
      />
    </div>
  )
}
