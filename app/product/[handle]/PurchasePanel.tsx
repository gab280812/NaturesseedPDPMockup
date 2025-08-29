"use client"

import { useState } from 'react';
import { Star, Heart, Share2, Minus, Plus, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Variant, Product } from './types';
import { addToCart, toggleWishlist } from '@/lib/commerce';
import CoverageCalculator from './CoverageCalculator';

interface PurchasePanelProps {
  product: Product;
  onVariantChange?: (variant: Variant) => void;
}

export default function PurchasePanel({ product, onVariantChange }: PurchasePanelProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.defaultVariantId);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const handleVariantChange = (variantId: string) => {
    const variant = product.variants.find(v => v.id === variantId);
    if (variant) {
      setSelectedVariantId(variantId);
      onVariantChange?.(variant);
      
      // Fire GA4 select_item event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'select_item', {
          item_list_id: 'product_variants',
          item_list_name: 'Product Variants',
          items: [{
            item_id: variant.id,
            item_name: `${product.title} - ${variant.title}`,
            item_variant: variant.title,
            price: variant.price,
            quantity: quantity
          }]
        });
      }
    }
  };

  const handleQuantityChange = (newQty: number) => {
    setQuantity(Math.max(1, newQty));
  };

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(selectedVariantId, quantity);
      
      // Fire GA4 add_to_cart event
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', 'add_to_cart', {
          currency: 'USD',
          value: selectedVariant.price * quantity,
          items: [{
            item_id: selectedVariant.id,
            item_name: `${product.title} - ${selectedVariant.title}`,
            item_variant: selectedVariant.title,
            price: selectedVariant.price,
            quantity: quantity
          }]
        });
      }
      
      // Show success toast (would be implemented with toast component)
      console.log('Added to cart successfully!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const handleWishlistToggle = async () => {
    try {
      const newState = await toggleWishlist(product.id);
      setIsWishlisted(newState);
    } catch (error) {
      console.error('Failed to toggle wishlist:', error);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.title,
          text: product.subtitle || product.title,
          url: window.location.href,
        });
      } catch (error) {
        // User cancelled or error occurred
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        // Show tooltip "Link copied" (would implement with tooltip component)
        console.log('Link copied to clipboard');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={cn(
          "h-4 w-4",
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        )}
      />
    ));
  };

  return (
    <div className="space-y-6">
      {/* Title and Rating */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
        {product.subtitle && (
          <p className="text-lg text-gray-600 mb-3">{product.subtitle}</p>
        )}
        
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            {renderStars(product.rating.average)}
          </div>
          <span className="text-sm font-medium">{product.rating.average}</span>
          <a 
            href="#reviews" 
            className="text-sm text-primary hover:underline"
            onClick={() => {
              document.getElementById('reviews')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ({product.rating.count} reviews)
          </a>
        </div>

        {/* Badges */}
        {product.badges && product.badges.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {product.badges.map((badge, index) => (
              <span
                key={index}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"
              >
                {badge}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Variant Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Size
        </label>
        <Select value={selectedVariantId} onValueChange={handleVariantChange}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {product.variants.map((variant) => (
              <SelectItem key={variant.id} value={variant.id}>
                <div className="flex justify-between items-center w-full">
                  <span>{variant.title}</span>
                  <span className="ml-2 font-medium">
                    ${variant.price.toFixed(2)}
                    {variant.compareAtPrice && (
                      <span className="ml-1 text-sm text-gray-500 line-through">
                        ${variant.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">
          ${selectedVariant.price.toFixed(2)}
        </span>
        {selectedVariant.compareAtPrice && (
          <span className="text-xl text-gray-500 line-through">
            ${selectedVariant.compareAtPrice.toFixed(2)}
          </span>
        )}
      </div>

      {/* Stock Status */}
      <div>
        {selectedVariant.inStock ? (
          <p className="text-sm text-green-600 font-medium">✓ In Stock</p>
        ) : (
          <p className="text-sm text-red-600 font-medium">Out of Stock</p>
        )}
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center border border-gray-300 rounded-md w-32">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-none"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="border-0 text-center h-10 w-12 rounded-none focus-visible:ring-0"
            min="1"
          />
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-none"
            onClick={() => handleQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Coverage Calculator Link */}
      <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
        <DialogTrigger asChild>
          <Button variant="link" className="p-0 h-auto text-primary">
            <Calculator className="h-4 w-4 mr-1" />
            Coverage Calculator
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Coverage Calculator</DialogTitle>
          </DialogHeader>
          <CoverageCalculator
            variants={product.variants}
            specs={product.specs}
            onApplyQuantity={(qty) => {
              setQuantity(qty);
              setShowCalculator(false);
            }}
          />
        </DialogContent>
      </Dialog>

      {/* Add to Cart Button */}
      <Button
        variant="accent"
        size="lg"
        className="w-full h-12 text-base"
        onClick={handleAddToCart}
        disabled={!selectedVariant.inStock || isAddingToCart}
      >
        {isAddingToCart ? 'Adding...' : 'ADD TO CART'}
      </Button>

      {/* Secondary Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="flex items-center gap-2"
          onClick={handleWishlistToggle}
        >
          <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500 text-red-500")} />
          Add to Wishlist
        </Button>
        
        <Button variant="ghost" size="icon" onClick={handleShare} aria-label="Share product">
          <Share2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Trust Badges */}
      <div className="border-t pt-4">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="text-xs text-gray-600">
            <div className="w-8 h-8 mx-auto mb-1 bg-gray-100 rounded-full flex items-center justify-center">
              🚚
            </div>
            Free Shipping
          </div>
          <div className="text-xs text-gray-600">
            <div className="w-8 h-8 mx-auto mb-1 bg-gray-100 rounded-full flex items-center justify-center">
              ↩️
            </div>
            Easy Returns
          </div>
          <div className="text-xs text-gray-600">
            <div className="w-8 h-8 mx-auto mb-1 bg-gray-100 rounded-full flex items-center justify-center">
              ✅
            </div>
            Quality Guarantee
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="border-t pt-4 space-y-2">
        <a
          href="#mix"
          className="block text-sm text-primary hover:underline"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('mix')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          → What's in the mix?
        </a>
        <a
          href="#specs"
          className="block text-sm text-primary hover:underline"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          → View specifications
        </a>
      </div>
    </div>
  );
}
