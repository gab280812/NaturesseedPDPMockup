# Nature's Seed Product Page - Horse Pasture Mix

A pixel-perfect reproduction of the Nature's Seed "Horse Pasture Mix | Warm Season" product page built with Next.js 14, TypeScript, TailwindCSS, and shadcn/ui components.

## 🚀 Features

### Complete Product Experience
- **Product Gallery** with zoom functionality and thumbnail navigation
- **Purchase Panel** with variant selection, quantity controls, and coverage calculator
- **Mix Composition** table with copy-to-clipboard functionality
- **Specifications** table with expandable rows
- **Product Details** with downloadable PDF spec sheet
- **Reviews & Ratings** with filtering, sorting, and submission
- **Q&A Section** with accordion interface and question submission
- **Mobile-Responsive** design with sticky cart bar

### Technical Features
- **Next.js 14 App Router** with TypeScript
- **Server-Side Rendering** with SEO optimization
- **Analytics Integration** (GA4/GTM events)
- **Accessibility First** with ARIA labels and keyboard navigation
- **JSON-LD Schema** for rich search results
- **Playwright Testing** with comprehensive test coverage

## 🛠 Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **State Management**: React hooks + server actions
- **Analytics**: GA4/GTM integration
- **Testing**: Playwright
- **PDF Generation**: jsPDF

## 📁 Project Structure

```
app/
  product/
    [handle]/
      page.tsx              # Main product page route
      ProductPage.tsx       # Client-side product page wrapper
      ProductGallery.tsx    # Image gallery with zoom
      PurchasePanel.tsx     # Variant selection & cart
      MixComposition.tsx    # Seed mix breakdown
      SpecsTable.tsx        # Product specifications
      WhyChoose.tsx         # Feature highlights
      SeedDescription.tsx   # Product description
      ProductDetailsTable.tsx # Detailed specs with PDF
      ProductUses.tsx       # Usage scenarios
      QA.tsx               # Questions & answers
      Reviews.tsx          # Customer reviews
      CoverageCalculator.tsx # Area coverage tool
      MapRegion.tsx        # Growing region map
      StickyMobileCart.tsx # Mobile cart bar
      types.ts             # TypeScript definitions

lib/
  commerce/
    index.ts             # Commerce adapter facade
    mock.ts              # Mock data for development
    woo.ts               # WooCommerce integration (placeholder)
  analytics/
    ga4.ts               # Google Analytics 4 events
  utils.ts               # Utility functions

components/ui/           # shadcn/ui components
  accordion.tsx
  button.tsx
  dialog.tsx
  input.tsx
  select.tsx
  [... other UI components]

tests/
  product-page.spec.ts   # Playwright test suite
```

## 🎯 Component Features

### ProductGallery
- Main image with hover zoom
- Thumbnail navigation strip
- Full-screen lightbox modal
- Keyboard navigation support
- GA4 image selection tracking

### PurchasePanel
- Variant selection with price updates
- Quantity stepper controls
- Coverage calculator integration
- Add to cart with loading states
- Wishlist toggle functionality
- Social sharing capabilities
- Trust badges display

### Reviews System
- Star rating display and input
- Review filtering by rating
- Sorting by date/helpfulness
- Review submission form
- Helpful voting system
- Verified purchase badges

### Q&A System
- Accordion-style question display
- Question submission form
- Helpful voting on answers
- Expert answer attribution
- Contact support sidebar

### Coverage Calculator
- Area input (sq ft or acres)
- Seeding rate configuration
- Multi-variant recommendations
- Cost efficiency analysis
- Quantity application to cart

## 🔧 Setup & Installation

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

4. **Run Tests**
   ```bash
   npm run test
   ```

## 🌐 Routes

- `/` - Redirects to main product page
- `/product/horse-pasture-mix-warm-season` - Main product page

## 📊 Analytics Events

The application tracks the following GA4 events:

- `view_item` - Product page view
- `select_item` - Variant or image selection
- `add_to_cart` - Add to cart action
- `write_review_open` - Review dialog opened
- `submit_review` - Review submitted
- `qa_open` - Q&A section accessed
- `qa_ask_question` - Question submitted
- `helpful_vote` - Helpful vote on review/answer
- `share_open` - Share dialog opened

## 🎨 Design System

### Colors
- **Primary Green**: `#69874b`
- **Accent Orange**: `#f4810f`
- **Text**: `#1f2937`
- **Muted**: `#6b7280`
- **Background**: `#ffffff`
- **Subtle Gray**: `#f6f6f6`

### Typography
- **Headers**: Pink Sunset (fallback: Prata)
- **Body**: Mulish

### Layout
- **Desktop**: 12-column grid, 24px gutters
- **Container**: Max 1200px width
- **Mobile**: Stacked layout with sticky cart

## 🧪 Testing

Comprehensive Playwright test suite covering:

- Variant selection and price updates
- Quantity controls and validation
- Coverage calculator functionality
- Add to cart workflow
- Review submission and filtering
- Q&A interaction
- Mobile responsive behavior
- PDF generation
- Clipboard operations

Run tests with:
```bash
npm run test
```

## 📱 Mobile Features

- **Responsive Design**: Optimized for all screen sizes
- **Sticky Cart Bar**: Bottom-fixed cart on mobile
- **Touch-Friendly**: Large tap targets and gestures
- **Performance**: Lazy loading and optimized images

## 🔍 SEO Optimization

- **Meta Tags**: Complete Open Graph and Twitter Card
- **JSON-LD Schema**: Product, Review, and Organization markup
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Image Alt Text**: Descriptive alternative text
- **Structured Data**: Rich snippets for search results

## 🚀 Deployment

The application is ready for deployment on:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any Node.js hosting platform

Environment variables needed:
- `WOO_CONSUMER_KEY` (optional, for WooCommerce integration)
- `WOO_CONSUMER_SECRET` (optional)
- `WOO_BASE_URL` (optional)

## 🔄 Commerce Integration

The application includes a flexible commerce adapter that can integrate with:

- **WooCommerce** (placeholder implementation included)
- **Shopify** (can be added)
- **Custom APIs** (extend the adapter interface)

Currently uses mock data for development and demonstration.

## 🎯 Performance

- **Next.js Image Optimization**: Automatic WebP/AVIF conversion
- **Lazy Loading**: Images and components load on demand
- **Code Splitting**: Automatic route-based splitting
- **Bundle Analysis**: Optimized bundle size

## 📄 License

This project is a demonstration/mockup implementation. Please ensure you have appropriate licensing for any production use.

## 🤝 Contributing

This is a demonstration project. For production use, consider:

- Adding real image assets
- Implementing actual commerce backend
- Adding error boundaries
- Implementing proper authentication
- Adding monitoring and logging
- Setting up CI/CD pipeline

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS
