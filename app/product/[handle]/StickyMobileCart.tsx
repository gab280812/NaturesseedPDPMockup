"use client"

import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Variant, Product } from './types';
import { addToCart } from '@/lib/commerce';

interface StickyMobileCartProps {
  product: Product;
  selectedVariant: Variant;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  className?: string;
}

export default function StickyMobileCart({ 
  product, 
  selectedVariant, 
  quantity, 
  onQuantityChange,
  className 
}: StickyMobileCartProps) {
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    try {
      await addToCart(selectedVariant.id, quantity);
      
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
      
      console.log('Added to cart successfully!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <div className={cn(
      "fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-50 md:hidden",
      className
    )}>
      <div className="flex items-center gap-4">
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate">
            {selectedVariant.title}
          </p>
          <p className="text-lg font-bold text-gray-900">
            ${selectedVariant.price.toFixed(2)}
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center border border-gray-300 rounded-md bg-white">
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-none hover:bg-gray-50"
            onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
            aria-label="Decrease quantity"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-3 py-2 text-base font-medium min-w-[3rem] text-center">
            {quantity}
          </span>
          <Button
            variant="ghost"
            size="sm"
            className="h-10 w-10 rounded-none hover:bg-gray-50"
            onClick={() => onQuantityChange(quantity + 1)}
            aria-label="Increase quantity"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Add to Cart Button */}
        <Button
          variant="accent"
          onClick={handleAddToCart}
          disabled={!selectedVariant.inStock || isAddingToCart}
          className="px-6 py-2 text-sm font-bold"
        >
          {isAddingToCart ? 'ADDING...' : 'ADD TO CART'}
        </Button>
      </div>
    </div>
  );
}
