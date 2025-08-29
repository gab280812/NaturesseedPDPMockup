export type Variant = {
  id: string;
  title: string;       // e.g., "5 lb", "10 lb", "25 lb"
  sku?: string;
  price: number;       // in $ USD
  compareAtPrice?: number | null;
  inStock: boolean;
  coverageSqFt?: number; // optional for calculator
};

export type Review = {
  id: string;
  rating: number;      // 1–5
  title: string;
  body: string;
  author: string;
  createdAt: string;   // ISO
  verified?: boolean;
  images?: string[];
  helpfulCount?: number;
};

export type QAItem = {
  id: string;
  question: string;
  answer?: string;
  author?: string;
  createdAt: string; // ISO
  helpfulCount?: number;
};

export type MixComponent = { species: string; percent: number };

export type Product = {
  id: string;
  handle: string;             // slug
  title: string;              // "Horse Pasture Mix | Warm Season"
  subtitle?: string;          // optional
  images: { src: string; alt: string }[];
  rating: { average: number; count: number; recommendPct?: number };
  badges?: string[];          // e.g., ["Free Returns", "Fast Shipping"]
  variants: Variant[];
  defaultVariantId: string;
  descriptionHtml: string;    // Seed Description rich content
  specs: Record<string, string>; // "Seeding Rate": "x", etc.
  mix: MixComponent[];
  details: Record<string, string>; // dense spec table
  uses: { image: string; title: string; blurb?: string }[];
  qa: QAItem[];
  reviews: Review[];
  regionMap?: { image: string; caption?: string };
};
