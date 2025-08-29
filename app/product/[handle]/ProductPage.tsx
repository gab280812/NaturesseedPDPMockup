"use client"

import { useState, useEffect } from 'react';
import { Product, Variant } from './types';
import ProductGallery from './ProductGallery';
import PurchasePanel from './PurchasePanel';
import MixComposition from './MixComposition';
import SpecsTable from './SpecsTable';
import WhyChoose from './WhyChoose';
import SeedDescription from './SeedDescription';
import ProductDetailsTable from './ProductDetailsTable';
import ProductUses from './ProductUses';
import QA from './QA';
import Reviews from './Reviews';
import StickyMobileCart from './StickyMobileCart';
import { gaViewItem } from '@/lib/analytics/ga4';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(
    product.variants.find(v => v.id === product.defaultVariantId) || product.variants[0]
  );
  const [quantity, setQuantity] = useState(1);

  // Fire view_item event on page load
  useEffect(() => {
    gaViewItem(product);
  }, [product]);

  // Generate JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.title,
    "description": product.subtitle || product.title,
    "image": product.images.map(img => img.src),
    "sku": selectedVariant.sku || product.id,
    "brand": {
      "@type": "Brand",
      "name": "Nature's Seed"
    },
    "offers": {
      "@type": "Offer",
      "price": selectedVariant.price,
      "priceCurrency": "USD",
      "availability": selectedVariant.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "seller": {
        "@type": "Organization",
        "name": "Nature's Seed"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": product.rating.average,
      "reviewCount": product.rating.count,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": product.reviews.slice(0, 3).map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewBody": review.body,
      "datePublished": review.createdAt
    }))
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* Above the Fold - Product Hero */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Product Gallery - Left Side (cols 1-7) */}
            <div className="lg:col-span-7">
              <ProductGallery
                images={product.images}
                productTitle={product.title}
                onImageSelect={(index) => {
                  // Optional: track image selection
                }}
              />
            </div>

            {/* Purchase Panel - Right Side (cols 8-12) */}
            <div className="lg:col-span-5">
              <PurchasePanel
                product={product}
                onVariantChange={(variant) => {
                  setSelectedVariant(variant);
                }}
              />
            </div>
          </div>
        </div>

        {/* Below the Fold - Product Details */}
        <div className="space-y-0">
          {/* Mix Composition */}
          <MixComposition mix={product.mix} />

          {/* Specifications */}
          <SpecsTable specs={product.specs} />

          {/* Why Choose This Seed */}
          <WhyChoose />

          {/* Seed Description with Region Map */}
          <SeedDescription
            descriptionHtml={product.descriptionHtml}
            regionMap={product.regionMap}
          />

          {/* Product Details Table */}
          <ProductDetailsTable
            details={product.details}
            productTitle={product.title}
          />

          {/* Product Uses */}
          <ProductUses uses={product.uses} />

          {/* Questions & Answers */}
          <QA qa={product.qa} productId={product.id} />

          {/* Reviews */}
          <Reviews
            reviews={product.reviews}
            productId={product.id}
            rating={product.rating}
          />
        </div>

        {/* Sticky Mobile Cart */}
        <StickyMobileCart
          product={product}
          selectedVariant={selectedVariant}
          quantity={quantity}
          onQuantityChange={setQuantity}
        />

        {/* Bottom Padding for Mobile Sticky Cart */}
        <div className="h-20 md:h-0" />
      </div>
    </>
  );
}
