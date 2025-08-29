import { Product, Variant } from '@/app/product/[handle]/types';

// Extend Window interface for gtag
declare global {
  interface Window {
    gtag: (command: string, targetId: string, config?: any) => void;
    dataLayer: any[];
  }
}

export function gaViewItem(product: Product) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  const selectedVariant = product.variants.find(v => v.id === product.defaultVariantId) || product.variants[0];
  
  window.gtag('event', 'view_item', {
    currency: 'USD',
    value: selectedVariant.price,
    items: [{
      item_id: product.id,
      item_name: product.title,
      item_category: 'Grass Seed',
      item_variant: selectedVariant.title,
      price: selectedVariant.price,
      quantity: 1
    }]
  });
}

export function gaSelectItem(product: Product, variant: Variant) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'select_item', {
    item_list_id: 'product_variants',
    item_list_name: 'Product Variants',
    items: [{
      item_id: variant.id,
      item_name: `${product.title} - ${variant.title}`,
      item_category: 'Grass Seed',
      item_variant: variant.title,
      price: variant.price,
      quantity: 1
    }]
  });
}

export function gaAddToCart(product: Product, variant: Variant, qty: number) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'add_to_cart', {
    currency: 'USD',
    value: variant.price * qty,
    items: [{
      item_id: variant.id,
      item_name: `${product.title} - ${variant.title}`,
      item_category: 'Grass Seed',
      item_variant: variant.title,
      price: variant.price,
      quantity: qty
    }]
  });
}

export function gaWriteReviewOpen(productId: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'write_review_open', {
    product_id: productId
  });
}

export function gaSubmitReview(productId: string, rating: number) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'submit_review', {
    product_id: productId,
    rating: rating
  });
}

export function gaQAOpen(productId: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'qa_open', {
    product_id: productId
  });
}

export function gaAskQuestion(productId: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'qa_ask_question', {
    product_id: productId
  });
}

export function gaHelpfulVote(itemType: 'review' | 'qa', itemId: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'helpful_vote', {
    item_type: itemType,
    item_id: itemId
  });
}

export function gaShareOpen(productId: string) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', 'share_open', {
    product_id: productId
  });
}
