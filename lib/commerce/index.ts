import { Product } from '@/app/product/[handle]/types';
import { getProductByHandle as getMockProduct } from './mock';
// import { getProductByHandle as getWooProduct } from './woo';

export async function getProductByHandle(handle: string): Promise<Product> {
  // Use mock data first, then environment-gated Woo if keys exist
  if (process.env.WOO_CONSUMER_KEY && process.env.WOO_CONSUMER_SECRET) {
    // return await getWooProduct(handle);
  }
  return await getMockProduct(handle);
}

export async function addToCart(variantId: string, qty: number): Promise<{cartId: string}> {
  // Mock implementation - in real app would integrate with commerce platform
  console.log(`Adding ${qty} of variant ${variantId} to cart`);
  return { cartId: 'mock-cart-id' };
}

export async function toggleWishlist(productId: string): Promise<boolean> {
  // Mock implementation - would integrate with user wishlist system
  const wishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
  const isInWishlist = wishlist.includes(productId);
  
  if (isInWishlist) {
    const filtered = wishlist.filter((id: string) => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(filtered));
    return false;
  } else {
    wishlist.push(productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    return true;
  }
}

export async function submitReview(
  productId: string, 
  form: {rating: number; title: string; body: string; author: string}
): Promise<void> {
  // Mock implementation - would POST to review API
  console.log('Submitting review:', { productId, ...form });
}

export async function submitQuestion(
  productId: string, 
  question: string, 
  author?: string
): Promise<void> {
  // Mock implementation - would POST to Q&A API
  console.log('Submitting question:', { productId, question, author });
}

export async function voteHelpful(kind: "review" | "qa", id: string): Promise<void> {
  // Mock implementation - would POST helpful vote
  console.log(`Voting helpful on ${kind} ${id}`);
}
