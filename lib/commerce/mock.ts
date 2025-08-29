import { Product } from '@/app/product/[handle]/types';

const mockProduct: Product = {
  id: 'horse-pasture-mix-warm-season',
  handle: 'horse-pasture-mix-warm-season',
  title: 'Horse Pasture Mix | Warm Season',
  subtitle: 'Premium warm-season grass blend for southern horse pastures',
  images: [
    { src: '/natures-seed/horse-pasture-1.jpg', alt: 'Horse Pasture Mix seed bag' },
    { src: '/natures-seed/horse-pasture-2.jpg', alt: 'Horses grazing in pasture' },
    { src: '/natures-seed/horse-pasture-3.jpg', alt: 'Close-up of grass mix' },
    { src: '/natures-seed/horse-pasture-4.jpg', alt: 'Established pasture field' },
    { src: '/natures-seed/horse-pasture-5.jpg', alt: 'Seed germination process' },
    { src: '/natures-seed/horse-pasture-6.jpg', alt: 'Mature grass stand' },
  ],
  rating: { 
    average: 4.7, 
    count: 127, 
    recommendPct: 95 
  },
  badges: ['Free Returns', 'Fast Shipping', 'Quality Guarantee'],
  variants: [
    {
      id: 'var-5lb',
      title: '5 lb',
      sku: 'HPM-WS-5',
      price: 29.99,
      compareAtPrice: null,
      inStock: true,
      coverageSqFt: 5000,
    },
    {
      id: 'var-10lb',
      title: '10 lb',
      sku: 'HPM-WS-10',
      price: 59.99,
      compareAtPrice: 69.99,
      inStock: true,
      coverageSqFt: 10000,
    },
    {
      id: 'var-25lb',
      title: '25 lb',
      sku: 'HPM-WS-25',
      price: 129.99,
      compareAtPrice: 149.99,
      inStock: true,
      coverageSqFt: 25000,
    },
  ],
  defaultVariantId: 'var-10lb',
  descriptionHtml: `
    <div class="prose max-w-none">
      <p>Our Horse Pasture Mix for Warm Season climates is specifically formulated for southern regions where warm-season grasses thrive. This premium blend combines drought-tolerant, high-traffic grasses that can withstand heavy grazing while providing excellent nutrition for horses.</p>
      
      <h3>Key Benefits</h3>
      <ul>
        <li>Excellent drought tolerance</li>
        <li>High traffic resistance</li>
        <li>Superior palatability for horses</li>
        <li>Fast establishment</li>
        <li>Long-lasting durability</li>
      </ul>
      
      <p>Perfect for rotational grazing systems and high-use paddocks. Establishes quickly in warm weather and provides season-long nutrition.</p>
    </div>
  `,
  specs: {
    'Seeding Rate': '8-12 lbs per 1,000 sq ft',
    'Coverage per lb': '1,000 sq ft',
    'Days to Germination': '7-21 days',
    'Sunlight': 'Full sun to partial shade',
    'Soil Type': 'Well-drained, pH 6.0-7.5',
    'Packaging Weight': 'Varies by size',
    'Season': 'Warm season',
    'Climate Zone': 'Southern US',
  },
  mix: [
    { species: 'Bermuda Grass', percent: 25 },
    { species: 'Bahia Grass', percent: 20 },
    { species: 'Coastal Bermuda', percent: 15 },
    { species: 'Dallisgrass', percent: 12 },
    { species: 'Johnson Grass', percent: 10 },
    { species: 'Crimson Clover', percent: 8 },
    { species: 'Arrowleaf Clover', percent: 5 },
    { species: 'Annual Ryegrass', percent: 5 },
  ],
  details: {
    'Product Type': 'Grass Seed Mix',
    'Application Method': 'Broadcast or drill seeding',
    'Maintenance Level': 'Low to moderate',
    'Mowing Height': '3-6 inches',
    'Fertilizer Needs': 'Moderate nitrogen',
    'Water Requirements': 'Low to moderate',
    'Establishment Time': '30-60 days',
    'Longevity': '5+ years with proper care',
    'Grazing Ready': '60-90 days after seeding',
    'Best Planting Time': 'Late spring to early summer',
    'Soil Preparation': 'Till and level, remove weeds',
    'Companion Plants': 'Legumes for nitrogen fixation',
  },
  uses: [
    {
      image: '/natures-seed/use-grazing.jpg',
      title: 'Horse Grazing',
      blurb: 'Provides nutritious forage for continuous or rotational grazing systems',
    },
    {
      image: '/natures-seed/use-pasture.jpg',
      title: 'Rotational Pasture',
      blurb: 'Ideal for managed grazing with quick recovery between rotations',
    },
    {
      image: '/natures-seed/use-wildlife.jpg',
      title: 'Wildlife Plots',
      blurb: 'Attracts wildlife while providing ground cover and erosion control',
    },
  ],
  qa: [
    {
      id: 'qa-1',
      question: 'When is the best time to plant this mix in Texas?',
      answer: 'For Texas, plant between April and July when soil temperatures consistently reach 65°F or higher. This gives the warm-season grasses optimal conditions for germination.',
      author: 'Nature\'s Seed Expert',
      createdAt: '2024-03-15T10:00:00Z',
      helpfulCount: 23,
    },
    {
      id: 'qa-2',
      question: 'How much water does this mix need during establishment?',
      answer: 'Keep soil consistently moist (not waterlogged) for the first 3-4 weeks. Water lightly 2-3 times daily until germination, then reduce to deep watering every 2-3 days.',
      author: 'Nature\'s Seed Expert',
      createdAt: '2024-03-10T14:30:00Z',
      helpfulCount: 18,
    },
    {
      id: 'qa-3',
      question: 'Can horses graze immediately after planting?',
      answer: 'No, wait 60-90 days after planting before allowing horses to graze. The grass needs time to establish strong root systems to withstand traffic.',
      author: 'Nature\'s Seed Expert',
      createdAt: '2024-03-08T09:15:00Z',
      helpfulCount: 31,
    },
    {
      id: 'qa-4',
      question: 'Will this mix work in sandy soil?',
      answer: 'Yes, this mix performs well in sandy soils. The Bahia grass component is particularly well-suited for sandy conditions. Consider adding organic matter to improve water retention.',
      author: 'Nature\'s Seed Expert',
      createdAt: '2024-03-05T16:45:00Z',
      helpfulCount: 12,
    },
    {
      id: 'qa-5',
      question: 'How does this compare to cool-season mixes?',
      answer: 'Warm-season mixes like this one are more drought tolerant and heat resistant, but go dormant in winter. Cool-season mixes stay green longer but struggle in hot summers.',
      author: 'Nature\'s Seed Expert',
      createdAt: '2024-02-28T11:20:00Z',
      helpfulCount: 15,
    },
  ],
  reviews: [
    {
      id: 'rev-1',
      rating: 5,
      title: 'Excellent results in Georgia',
      body: 'Planted this mix last spring and it established beautifully. My horses love grazing on it and it\'s held up well to heavy traffic. Highly recommend for southern climates.',
      author: 'Sarah M.',
      createdAt: '2024-02-20T08:30:00Z',
      verified: true,
      helpfulCount: 8,
    },
    {
      id: 'rev-2',
      rating: 4,
      title: 'Good mix, slow start',
      body: 'Quality seed mix that eventually established well. Took a bit longer than expected to germinate, but once it got going it filled in nicely. Worth the wait.',
      author: 'Mike R.',
      createdAt: '2024-02-15T15:45:00Z',
      verified: true,
      helpfulCount: 5,
    },
    {
      id: 'rev-3',
      rating: 5,
      title: 'Perfect for rotational grazing',
      body: 'We use this in our rotational grazing system and it recovers quickly between paddock moves. The horses prefer it over our old pasture grass.',
      author: 'Jennifer L.',
      createdAt: '2024-02-10T12:15:00Z',
      verified: true,
      helpfulCount: 12,
    },
    {
      id: 'rev-4',
      rating: 3,
      title: 'Mixed results',
      body: 'Some areas established great, others were patchy. Might have been my soil prep. The areas that did establish are very nice quality grass.',
      author: 'Tom B.',
      createdAt: '2024-02-05T09:20:00Z',
      verified: false,
      helpfulCount: 3,
    },
    {
      id: 'rev-5',
      rating: 5,
      title: 'Drought tolerant as advertised',
      body: 'Survived a tough summer drought in Alabama with minimal watering. Still green when neighboring pastures were brown. Excellent product.',
      author: 'Lisa K.',
      createdAt: '2024-01-30T14:10:00Z',
      verified: true,
      helpfulCount: 15,
    },
    {
      id: 'rev-6',
      rating: 4,
      title: 'Great customer service too',
      body: 'Had questions about planting and the Nature\'s Seed team was very helpful. The grass is performing well in our Florida pasture.',
      author: 'David P.',
      createdAt: '2024-01-25T11:30:00Z',
      verified: true,
      helpfulCount: 6,
    },
  ],
  regionMap: {
    image: '/natures-seed/region-map.jpg',
    caption: 'Recommended for USDA Zones 8-11: Southern US warm-season regions',
  },
};

export async function getProductByHandle(handle: string): Promise<Product> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  if (handle === 'horse-pasture-mix-warm-season') {
    return mockProduct;
  }
  
  throw new Error(`Product not found: ${handle}`);
}
