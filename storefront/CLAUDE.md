# Project Specification: Leone D'Oro Luxury Storefront

## 1. Technical Stack
- **Framework**: Next.js 15 (App Router)
- **E-commerce Engine**: MedusaJS 2.0 (via Medusa Next.js Starter)
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI (Radix UI primitives)
- **Animations**: Framer Motion (for luxury feel and smooth transitions)
- **Icons**: Tabler Icons
- **Typography**: 
  - **Headings**: Playfair Display (Serif) - Elegant, timeless
  - **Body**: Inter (Sans-serif) - Clean, readable
- **State Management**: Medusa SDK built-in + React Context for cart/user state
- **Form Validation**: React Hook Form + Zod (Romanian error messages)
- **Image Optimization**: Next.js Image component with WebP format + AVIF fallback

## 2. Language & Localization
- **Primary Language**: Romanian (Română)
- **HTML Attributes**: `<html lang="ro">`
- **Content Strategy**: 
  - All UI labels, buttons, error messages, and placeholder content in Romanian
  - Product descriptions and metadata in Romanian
  - Currency format: "123,45 RON" (Romanian number format)
- **SEO Localization**: 
  - Metadata, alt texts, and OpenGraph tags optimized for Romanian market
  - Hreflang tags for future multi-language support
  - Canonical URLs following Romanian naming conventions

## 3. Design Vision & Brand Identity
- **Name**: Leone D'Oro (Italian for "Golden Lion")
- **Tagline**: "Bijuterii de lux pentru momente speciale"
- **Aesthetic**: Minimalist Luxury, High-End Boutique
- **Color Palette**: 
  - **Primary**: #000000 (Deep Black) - Sophistication
  - **Accent**: #D4AF37 (Metallic Gold) - Luxury
  - **Background**: #FFFFFF (Pure White) - Purity
  - **Secondary**: #F5F5F5 (Light Gray) - Subtle backgrounds
  - **Error**: #DC2626 (Red) - Validation errors
  - **Success**: #16A34A (Green) - Confirmations
  - **Text Primary**: #000000
  - **Text Secondary**: #6B7280 (Gray) - Descriptions
- **Feel**: Spacious, elegant, sophisticated. High-quality imagery with generous whitespace (minimum 80px section spacing)

## 4. Typography System
```css
/* Headings - Playfair Display */
- H1: 48px / 3rem (mobile: 32px / 2rem) - Product titles, hero
- H2: 36px / 2.25rem (mobile: 24px / 1.5rem) - Section titles
- H3: 28px / 1.75rem (mobile: 20px / 1.25rem) - Category headings
- H4: 24px / 1.5rem (mobile: 18px / 1.125rem) - Card titles

/* Body - Inter */
- Body Large: 18px / 1.125rem - Lead paragraphs
- Body: 16px / 1rem - Default text
- Body Small: 14px / 0.875rem - Captions, labels
- Tiny: 12px / 0.75rem - Legal text, disclaimers
```

## 5. Key UI/UX Principles
- **Luxury Experience**: 
  - Framer Motion for staggered entrance animations (fadeInUp, scale)
  - Page transitions with 300ms easing
  - Hover effects with subtle scale (1.02) and shadow elevation
  - Loading states with skeleton screens (never spinners)
- **Mobile First**: 
  - 100% responsive breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px)
  - Touch-friendly targets (minimum 44x44px)
  - Swipeable product galleries on mobile
  - Hamburger menu with slide-in drawer animation
- **Accessibility (WCAG 2.1 AA)**:
  - Keyboard navigation support (Tab, Enter, Escape)
  - Screen reader optimization (ARIA labels in Romanian)
  - Focus indicators with 2px gold outline
  - Color contrast ratio minimum 4.5:1
- **Performance Targets**:
  - Lighthouse Performance: 90+
  - Lighthouse Accessibility: 100
  - LCP (Largest Contentful Paint): < 2.5s
  - CLS (Cumulative Layout Shift): < 0.1
  - Bundle size: < 200KB initial JavaScript
- **SEO Optimization**: 
  - Semantic HTML5 tags (`<header>`, `<nav>`, `<main>`, `<article>`)
  - JSON-LD Schema for Products, Organization, BreadcrumbList
  - Optimized for Core Web Vitals
  - Structured product data with Romanian attributes

## 6. Page Structure & Content Hierarchy

### 6.1 Homepage
1. **Hero Section**: 
   - Full-width image carousel (3-5 slides)
   - CTA: "Descoperă Colecția" (Discover Collection)
   - Overlay text: H1 heading with brand tagline
2. **Featured Collections**: 
   - 3-column grid (mobile: 1 column)
   - Categories: "Inele de Logodnă", "Verighete", "Bijuterii Personalizate"
3. **USPs Section**: 
   - Icons + text for: "Livrare Gratuită", "Garanție 2 Ani", "Consultanță Gratuită"
4. **Testimonials**: 
   - Carousel with 5-star reviews
   - Customer photos (if available)
5. **Instagram Feed**: 
   - Latest 6 posts from @leonedoro_ro

### 6.2 Product Listing Page (PLP)
- **Filters Sidebar** (Collapsible on mobile):
  - Material: Aur alb, Aur galben, Aur roz, Platină
  - Piatră: Diamant, Safir, Rubin, Smarald
  - Preț: Slider (0 - 50,000 RON)
  - Mărime: EU standards (48-68)
- **Grid View**: 3 columns desktop, 2 mobile
- **Sort Options**: "Cele mai noi", "Preț crescător", "Preț descrescător"
- **Pagination**: Load more button (not infinite scroll for SEO)

### 6.3 Product Detail Page (PDP)
1. **Image Gallery**: 
   - Main image (zoomable)
   - 4-6 thumbnail images
   - 360° view (if available)
2. **Product Info**:
   - H1: Product name
   - Price (large, bold, gold accent)
   - Star rating + review count
   - Short description (2-3 lines)
3. **Options**:
   - Mărime selector (dropdown)
   - Material selector (color swatches)
   - Quantity (default: 1, max: 3)
4. **CTAs**:
   - "Adaugă în Coș" (primary button)
   - "Cumpără Acum" (secondary outline)
   - "Adaugă la Favorite" (icon button)
5. **Accordion Sections**:
   - "Detalii Tehnice" (Material, Greutate, Dimensiuni)
   - "Ghid de Mărimi" (Size chart table)
   - "Livrare și Retur" (Shipping info, 14-day return policy)
   - "Întrebări Frecvente" (Product-specific FAQs)
6. **Related Products**: 4-product carousel

### 6.4 Cart Page
- Line items with: Image, Name, Size, Material, Price, Quantity, Remove
- Summary sidebar: Subtotal, Shipping (calculated), Total
- Coupon code input
- CTA: "Finalizează Comanda"

### 6.5 Checkout (Multi-step)
1. **Informații Personale**: Email, Telefon
2. **Adresă de Livrare**: Nume, Adresă, Oraș, Județ, Cod Poștal
3. **Metodă de Livrare**: 
   - Fan Courier (2-3 zile, 20 RON)
   - Cargus (2-3 zile, 25 RON)
   - Livrare Gratuită (peste 500 RON)
4. **Metodă de Plată**: 
   - Card (Stripe)
   - Ramburs (Cash on Delivery)
5. **Confirmare**: Order summary + "Plasează Comanda"

## 7. Required Components (Romanian UI Labels)

### 7.1 Header/Navigation
- **Logo**: "Leone D'Oro" (linked to homepage)
- **Main Menu**: 
  - "Bijuterii"
  - "Inele de Logodnă"
  - "Verighete"
  - "Colecții Speciale"
  - "Despre Noi"
  - "Contact"
- **Utility Menu**: 
  - Search icon: "Caută bijuterii..."
  - User icon: "Contul Meu" (Login/Register)
  - Heart icon: "Favorite" (with count badge)
  - Cart icon: "Coș" (with count badge)

### 7.2 Footer
- **Columns**:
  1. About: "Despre Leone D'Oro", "Povestea Noastră", "Certificări"
  2. Customer Service: "Contact", "Livrare", "Returnări", "Garanție"
  3. Legal: "Termeni și Condiții", "Politica de Confidențialitate", "GDPR", "ANPC"
  4. Social: Instagram, Facebook, Pinterest icons
- **Newsletter**: "Abonează-te la newsletter" + email input
- **Copyright**: "© 2025 Leone D'Oro. Toate drepturile rezervate."
- **Payment Icons**: Visa, Mastercard, Stripe badge

### 7.3 Product Card
- Image (hover: show second image)
- "NOU" badge (if product < 30 days old)
- Product name (truncated to 2 lines)
- Price: "2.499 RON"
- Star rating + "(23 recenzii)"
- Hover actions:
  - "Vizualizare Rapidă" (Quick view modal)
  - "Adaugă la Favorite" (heart icon)

### 7.4 Buttons & CTAs
- **Primary**: "Adaugă în Coș", "Cumpără Acum", "Trimite Comanda"
- **Secondary**: "Continuă Cumpărăturile", "Vezi Mai Multe"
- **Tertiary**: "Salvează", "Anulează"

### 7.5 Form Labels
- **Login**: "Email", "Parolă", "Autentifică-te", "Am uitat parola"
- **Register**: "Nume", "Prenume", "Email", "Parolă", "Confirmă Parola", "Înregistrează-te"
- **Checkout**: "Adresă de livrare", "Oraș", "Județ", "Cod poștal", "Telefon"

### 7.6 Error/Success Messages
- **Validation**: "Acest câmp este obligatoriu", "Email invalid", "Parola trebuie să aibă minim 8 caractere"
- **Cart**: "Produs adăugat în coș!", "Produsul nu este în stoc"
- **Checkout**: "Comandă plasată cu succes! Veți primi un email de confirmare."

## 8. Payment & Shipping Integration

### 8.1 Payment Provider
- **Primary**: Stripe (card payments)
- **Secondary**: Ramburs (cash on delivery)
- **Future Consideration**: Netopia Payments (Romanian payment gateway)

### 8.2 Shipping Providers
- **Fan Courier**: Manual fulfillment (configured in Medusa backend)
  - Standard: 2-3 zile lucrătoare, 20 RON
  - Livrare gratuită peste 500 RON
- **Cargus**: Manual fulfillment
  - Standard: 2-3 zile lucrătoare, 25 RON
- **Future Enhancement**: 
  - API integration for automatic AWB generation
  - Real-time tracking links in order confirmation emails
  - Dynamic shipping cost calculation based on weight/location

### 8.3 Shipping Zones
- **Primary**: România (all counties)
- **Future**: EU countries (Bulgaria, Hungary for cross-border)

## 9. Legal & Compliance (Romanian Market)

### 9.1 GDPR Compliance
- **Cookie Consent Banner**: 
  - "Folosim cookie-uri pentru a îmbunătăți experiența ta"
  - Buttons: "Acceptă tot", "Setări cookie-uri", "Refuză tot"
  - Link to "Politica de Cookie-uri"
- **Privacy Policy Page**: Must include:
  - Data collection practices
  - User rights (access, deletion, portability)
  - Data retention periods
  - Third-party processors (Stripe, Medusa)
- **Email Marketing**: Explicit opt-in checkbox (unchecked by default)

### 9.2 ANPC (Romanian Consumer Protection)
- **Display Requirements**:
  - ANPC logo + registration number in footer
  - Link to "Online Dispute Resolution" (ODR platform)
  - Clear return policy (14 days for online purchases)
- **Required Pages**:
  - "Termeni și Condiții" (full legal terms)
  - "Politica de Returnare" (return instructions)
  - "Garanție" (warranty terms - 2 years for jewelry)
- **Product Information**:
  - Clear pricing (VAT included)
  - Material composition (e.g., "Aur 14K, Diamant 0.5ct")
  - Country of origin (if applicable)

### 9.3 Invoicing
- **E-Factura Integration** (future):
  - Connect to Romanian e-invoicing system (SPV)
  - Auto-generate invoices with CUI/CIF
- **Current**: PDF invoices sent via email

## 10. Analytics & Tracking (Future Implementation)

### 10.1 Google Analytics 4
- **Events to Track**:
  - Page views
  - Product views (with product ID, name, price)
  - Add to cart (with product details)
  - Begin checkout
  - Purchase (with transaction value)
  - Search queries
- **Custom Dimensions**: 
  - Product category
  - Material type
  - Price range

### 10.2 Facebook Pixel (Optional)
- Track conversions for Meta Ads campaigns
- Custom audiences for retargeting

### 10.3 Hotjar/Microsoft Clarity
- Heatmaps for UX optimization
- Session recordings (with GDPR-compliant user consent)

## 11. Currency & Internationalization

### 11.1 Current
- **Single Currency**: RON (Romanian Leu)
- **Price Format**: "1.234,56 RON" (Romanian standard with comma separator)
- **Number Format**: Use `Intl.NumberFormat('ro-RO')`

### 11.2 Future Expansion
- **Multi-Currency Support**: EUR, USD (with Medusa region settings)
- **Currency Switcher**: Dropdown in header
- **Exchange Rate**: Auto-update via API (e.g., exchangerate-api.com)

## 12. Development Instructions for AI

### 12.1 Language & Localization
1. **Always** translate system messages and UI components into Romanian
2. Use Romanian date formats: "7 ianuarie 2025" (not "January 7, 2025")
3. Use Romanian number separators: "1.234,56" (not "1,234.56")
4. Error messages must be user-friendly in Romanian (not technical)

### 12.2 Component Architecture
1. **Base Components**: Use Shadcn UI primitives
   - Button, Input, Select, Dialog, Accordion, etc.
   - Customize with Tailwind (gold accent colors, Playfair headings)
2. **Animation Standards**:
   - Wrap page sections in `<motion.section>`
   - Use `variants` for staggered children animations
   - Default transition: `{ duration: 0.3, ease: "easeOut" }`
3. **Code Style**:
   - TypeScript strict mode
   - Functional components with hooks
   - Server components by default (use "use client" only when needed)
   - Consistent file naming: `product-card.tsx`, `checkout-form.tsx`

### 12.3 Data Fetching (Medusa SDK)
```typescript
// Example: Fetch products in Server Component
import { sdk } from "@/lib/medusa"

export default async function ProductsPage() {
  const { products } = await sdk.store.product.list({
    limit: 12,
    fields: "+variants.calculated_price"
  })
  
  return <ProductGrid products={products} />
}
```

### 12.4 Type Safety
- Use Medusa SDK types: `StoreProduct`, `StoreCart`, `StoreOrder`
- Create custom types for Romanian-specific data:
  ```typescript
  type ShippingProviderRO = "fan-courier" | "cargus"
  type CountyRO = "București" | "Ilfov" | "Cluj" // ... all 41 counties
  ```

### 12.5 Image Optimization
```tsx
<Image
  src={product.thumbnail}
  alt={product.title}
  width={400}
  height={400}
  className="object-cover"
  quality={90}
  priority={isFeatured}
  placeholder="blur"
  blurDataURL={product.thumbnail_blur}
/>
```

### 12.6 SEO Requirements
- Every page must have:
  - `<title>` tag (max 60 chars, include "Leone D'Oro" brand)
  - `<meta name="description">` (max 160 chars, Romanian)
  - OpenGraph tags (og:title, og:description, og:image)
  - Canonical URL
- Product pages need JSON-LD schema:
  ```json
  {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": "Inel de Logodnă cu Diamant",
    "offers": {
      "@type": "Offer",
      "price": "2499.00",
      "priceCurrency": "RON"
    }
  }
  ```

### 12.7 Performance Checklist
- [ ] Use Next.js `<Image>` for all images
- [ ] Lazy load below-the-fold content
- [ ] Implement skeleton loaders (no spinners)
- [ ] Code split large components with `dynamic()`
- [ ] Optimize fonts with `next/font`
- [ ] Use `loading.tsx` for Suspense boundaries

### 12.8 Testing Requirements
- **Unit Tests**: For utility functions (price formatting, date localization)
- **Integration Tests**: For checkout flow
- **E2E Tests**: For critical user journeys (add to cart → checkout → order)
- **Accessibility**: Use `axe-core` for automated a11y testing

## 13. Brand Voice & Content Guidelines

### 13.1 Tone of Voice
- **Elegant but approachable**: "Descoperă bijuterii care îți spun povestea"
- **Confident without arrogance**: "Expertiza noastră, visul tău"
- **Romanian but not overly formal**: Use "tu" form, not "dumneavoastră"

### 13.2 Product Description Template
```
[Nume Produs] - [Material] [Tip Piatră]

[Scurtă descriere emoțională - 1-2 propoziții]

Caracteristici:
• Material: [Aur 14K / 18K / Platină]
• Piatră principală: [Tip] [Carate]
• Mărime disponibilă: [Range]
• Greutate aproximativă: [g]

[Call to action]: "Consultă ghidul de mărimi" sau "Solicită personalizare"
```

### 13.3 Microcopy Examples
- Empty cart: "Coșul tău este gol. Descoperă colecțiile noastre!"
- Wishlist: "Salvează bijuteriile preferate pentru mai târziu"
- Out of stock: "Momentan epuizat. Abonează-te pentru a fi notificat când revine în stoc."
- Loading: "Se încarcă..." (with skeleton, not text alone)

---

**Document Version**: 2.0  
**Last Updated**: January 7, 2025  
**Maintained by**: Leone D'Oro Development Team