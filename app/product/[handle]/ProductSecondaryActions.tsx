"use client"

import { useState } from 'react';
import { Heart, Share2, Calculator, MapPin, Leaf, Truck, Shield, Microscope, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Product } from './types';
import { toggleWishlist } from '@/lib/commerce';
import CoverageCalculator from './CoverageCalculator';
import RegionChecker from './RegionChecker';

interface ProductSecondaryActionsProps {
  product: Product;
}

export default function ProductSecondaryActions({ product }: ProductSecondaryActionsProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showCalculator, setShowCalculator] = useState(false);
  const [showRegionChecker, setShowRegionChecker] = useState(false);

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
        console.log('Link copied to clipboard');
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  return (
    <div className="mt-8 bg-gray-50 rounded-xl p-6 space-y-6">
      {/* Header with Actions */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Product Tools</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            onClick={handleWishlistToggle}
          >
            <Heart className={cn("h-4 w-4", isWishlisted && "fill-red-500 text-red-500")} />
            Wishlist
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-600 hover:text-gray-900"
            onClick={handleShare} 
            aria-label="Share product"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Trust Badges - Redesigned */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
          <div className="w-8 h-8 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
            <Leaf className="h-4 w-4 text-green-600" />
          </div>
          <div className="text-xs font-medium text-gray-900">NON-GMO</div>
          <div className="text-xs text-gray-500">Natural seeds</div>
        </div>
        <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
          <div className="w-8 h-8 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
            <Truck className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-xs font-medium text-gray-900">FARM DIRECT</div>
          <div className="text-xs text-gray-500">Sustainably obtained</div>
        </div>
        <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
          <div className="w-8 h-8 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
            <Shield className="h-4 w-4 text-purple-600" />
          </div>
          <div className="text-xs font-medium text-gray-900">FREE FROM FILLERS</div>
          <div className="text-xs text-gray-500">And endophytes</div>
        </div>
        <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
          <div className="w-8 h-8 mx-auto mb-2 bg-orange-100 rounded-full flex items-center justify-center">
            <Microscope className="h-4 w-4 text-orange-600" />
          </div>
          <div className="text-xs font-medium text-gray-900">RIGOROUS QUALITY CONTROL</div>
          <div className="text-xs text-gray-500">Tested thoroughly</div>
        </div>
        <div className="bg-white rounded-lg p-3 text-center border border-gray-200">
          <div className="w-8 h-8 mx-auto mb-2 bg-indigo-100 rounded-full flex items-center justify-center">
            <Users className="h-4 w-4 text-indigo-600" />
          </div>
          <div className="text-xs font-medium text-gray-900">CRAFTED BY EXPERTS</div>
          <div className="text-xs text-gray-500">Professional blend</div>
        </div>
      </div>

      {/* Calculator Tools - Redesigned */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Planning Tools</h4>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Coverage Calculator */}
          <Dialog open={showCalculator} onOpenChange={setShowCalculator}>
            <DialogTrigger asChild>
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Calculator className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Coverage Calculator</div>
                    <div className="text-xs text-gray-500">Calculate how much seed you need</div>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Coverage Calculator</DialogTitle>
              </DialogHeader>
              <CoverageCalculator
                variants={product.variants}
                specs={product.specs}
                onApplyQuantity={(qty) => {
                  setShowCalculator(false);
                }}
              />
            </DialogContent>
          </Dialog>

          {/* Region Checker */}
          <Dialog open={showRegionChecker} onOpenChange={setShowRegionChecker}>
            <DialogTrigger asChild>
              <div className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                    <MapPin className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-900">Region Compatibility</div>
                    <div className="text-xs text-gray-500">Check if this works in your area</div>
                  </div>
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Regional Compatibility Check</DialogTitle>
              </DialogHeader>
              <RegionChecker
                productTitle={product.title}
                onClose={() => setShowRegionChecker(false)}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Quick Links - Redesigned */}
      <div className="pt-4 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Learn More</h4>
        <div className="space-y-2">
          <a
            href="#mix"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('mix')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-125 transition-transform"></span>
            What's in the mix?
          </a>
          <a
            href="#specs"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors group"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('specs')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="w-1.5 h-1.5 bg-primary rounded-full group-hover:scale-125 transition-transform"></span>
            View specifications
          </a>
        </div>
      </div>
    </div>
  );
}
