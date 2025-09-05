"use client"

import { useState } from 'react';
import { Star, Minus, Plus, Circle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Variant, Product } from './types';
import { addToCart } from '@/lib/commerce';
import PlantingAids from './PlantingAids';

interface PurchasePanelProps {
  product: Product;
  onVariantChange?: (variant: Variant) => void;
}

export default function PurchasePanel({ product, onVariantChange }: PurchasePanelProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.defaultVariantId);
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

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

      {/* Also Safe for Animals */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          {/* Bottom Padding for Mobile Sticky Cart */}
        <div className="h-24 md:h-0" />
        </label>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800 border border-orange-200">
            <Circle className="h-3 w-3 mr-1.5 fill-current" />
            Horse
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <Circle className="h-3 w-3 mr-1.5 fill-current" />
            Cattle
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <Circle className="h-3 w-3 mr-1.5 fill-current" />
            Sheep
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <Circle className="h-3 w-3 mr-1.5 fill-current" />
            Goats
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700 border border-gray-200">
            <Circle className="h-3 w-3 mr-1.5 fill-current" />
            Wildlife
          </span>
        </div>
      </div>

      {/* Variant Selection - Radio Buttons */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Size
        </label>
        <div className="space-y-2 sm:space-y-3">
          {product.variants.map((variant, index) => {
            const isSelected = selectedVariantId === variant.id;
            const bulkDiscount = index === 1 ? '10% bulk discount' : index === 2 ? '15% bulk discount' : null;
            const isBestSeller = index === 1;
            
            return (
              <div
                key={variant.id}
                className={cn(
                  "relative border rounded-lg p-2 sm:p-3 cursor-pointer transition-colors",
                  isSelected ? "border-green-500 bg-green-50" : "border-gray-200 hover:border-gray-300"
                )}
                onClick={() => handleVariantChange(variant.id)}
              >
                <div className="flex items-center">
                  <input
                    type="radio"
                    id={variant.id}
                    name="variant"
                    value={variant.id}
                    checked={isSelected}
                    onChange={() => handleVariantChange(variant.id)}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300"
                  />
                  <div className="ml-3 flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 sm:gap-2 flex-wrap">
                        <label htmlFor={variant.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                          {variant.title}
                        </label>
                        {bulkDiscount && (
                          <Badge variant="secondary" className="text-xs bg-orange-100 text-orange-800">
                            {bulkDiscount}
                          </Badge>
                        )}
                        {isBestSeller && (
                          <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                            Best Seller
                          </Badge>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="text-sm font-bold text-gray-900">
                          ${variant.price}
                        </div>
                        <div className="text-xs text-gray-500">
                          ${(variant.price / parseFloat(variant.title.split(' ')[0])).toFixed(2)}/lb
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Price and Savings */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
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
          <div className="text-right">
            <div className="text-sm font-bold text-orange-600 uppercase tracking-wide">
              BUY MORE,
            </div>
            <div className="text-sm font-bold text-orange-600 uppercase tracking-wide">
              PAY LESS
            </div>
          </div>
        </div>
        {selectedVariant.compareAtPrice && (
          <div className="text-green-600 font-medium">
            You saved ${(selectedVariant.compareAtPrice - selectedVariant.price).toFixed(2)}
          </div>
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
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Quantity
        </label>
        <div className="flex items-center border border-gray-300 rounded-md w-28 sm:w-32">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-10 w-8 sm:w-10 rounded-none"
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
          <Input
            type="number"
            value={quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
            className="h-10 text-center border-0 rounded-none focus:ring-0 focus:border-0 text-sm"
            min="1"
            aria-label="Quantity"
          />
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-10 w-8 sm:w-10 rounded-none"
            onClick={() => handleQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
          </Button>
        </div>
      </div>


      {/* Add to Cart Button - Hidden on mobile (replaced by sticky cart) */}
      <Button
        variant="accent"
        size="lg"
        className="w-full h-12 text-base hidden md:flex"
        onClick={handleAddToCart}
        disabled={!selectedVariant.inStock || isAddingToCart}
      >
        {isAddingToCart ? 'Adding...' : 'ADD TO CART'}
      </Button>

      {/* Planting Aids Section */}
      <PlantingAids productTitle={product.title} selectedVariantSize={selectedVariant.title} />
    </div>
  );
}
