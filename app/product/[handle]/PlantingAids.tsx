"use client"

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface PlantingAidsProps {
  productTitle: string;
  selectedVariantSize?: string;
}

interface PlantingAid {
  id: string;
  title: string;
  image: string;
  basePrice: number;
  benefits: string[];
  isBundle?: boolean;
}

export default function PlantingAids({ productTitle, selectedVariantSize = '1 lb' }: PlantingAidsProps) {
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());
  const [addingItems, setAddingItems] = useState<Set<string>>(new Set());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  // Calculate price multiplier based on variant size
  const getPriceMultiplier = () => {
    const sizeMultipliers: { [key: string]: number } = {
      '1 lb': 1,
      '5 lb': 2.5,
      '25 lb': 8,
      '50 lb': 15
    };
    return sizeMultipliers[selectedVariantSize] || 1;
  };

  const priceMultiplier = getPriceMultiplier();

  const handleAddToCart = async (itemId: string) => {
    setAddingItems(prev => new Set(prev).add(itemId));
    
    // Simulate adding to cart
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setAddingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(itemId);
      return newSet;
    });
    
    setAddedItems(prev => new Set(prev).add(itemId));
    
    // Reset after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(itemId);
        return newSet;
      });
    }, 2000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const plantingAids: PlantingAid[] = [
    {
      id: 'bundle',
      title: 'The Planting Bundle',
      image: '/placeholder-product.jpg',
      basePrice: 45.99,
      isBundle: true,
      benefits: [
        'Add a fertilizer bag, rice hulls, and inoculant for increased germination',
        'Complete solution for optimal seed establishment'
      ]
    },
    {
      id: 'fertilizer',
      title: 'The Sustaine Fertilizer',
      image: '/placeholder-product.jpg',
      basePrice: 18.99,
      benefits: [
        'Provides balanced nutrients specifically formulated for new seedlings',
        'Slow-release formula prevents burning while feeding for weeks'
      ]
    },
    {
      id: 'rice-hulls',
      title: 'Rice Hulls',
      image: '/placeholder-product.jpg',
      basePrice: 12.99,
      benefits: [
        'Improves soil aeration and drainage for better root development',
        'Natural organic matter that slowly decomposes to enrich soil'
      ]
    },
    {
      id: 'inoculant',
      title: 'Inoculant',
      image: '/placeholder-product.jpg',
      basePrice: 15.99,
      benefits: [
        'Introduces beneficial bacteria to enhance nutrient uptake',
        'Increases germination rates and early plant vigor'
      ]
    }
  ];

  return (
    <div className="border-t pt-6 mt-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Recommended Planting Aids
        </h3>
      </div>

      {/* Bundle Product - Featured */}
      <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">Bundle</span>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-base font-semibold text-gray-900">The Planting Bundle</h4>
                <Badge variant="destructive" className="text-xs">
                  10% OFF
                </Badge>
              </div>
              <p className="text-sm text-gray-600">Add a fertilizer bag, rice hulls, and inoculant for increased germination</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-gray-900">${(plantingAids[0].basePrice * priceMultiplier * 0.9).toFixed(2)}</div>
            <div className="text-sm text-green-600 font-medium">You save ${(plantingAids[0].basePrice * priceMultiplier * 0.1).toFixed(2)}</div>
            <Button 
              className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2" 
              onClick={() => handleAddToCart('bundle')}
              disabled={addingItems.has('bundle')}
            >
              {addingItems.has('bundle') ? (
                'Adding to cart'
              ) : addedItems.has('bundle') ? (
                <div className="flex items-center gap-1">
                  <Check className="h-4 w-4" />
                  <span>Added</span>
                </div>
              ) : (
                'Add'
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Individual Products */}
      <div className="space-y-3">
        {plantingAids.slice(1).map((aid) => (
          <div key={aid.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-md flex items-center justify-center">
                <span className="text-gray-400 text-xs">Aid</span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-900">{aid.title}</h4>
                <ul className="mt-1 space-y-0.5">
                  {aid.benefits.map((benefit, index) => (
                    <li key={index} className="text-xs text-gray-500 flex items-start">
                      <span className="text-green-600 mr-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-gray-900">${(aid.basePrice * priceMultiplier).toFixed(2)}</div>
              <Button 
                size="sm"
                variant="outline"
                className="mt-1 text-xs text-green-600 hover:text-green-700 hover:bg-green-50 border-green-200"
                onClick={() => handleAddToCart(aid.id)}
                disabled={addingItems.has(aid.id)}
              >
                {addingItems.has(aid.id) ? (
                  'Adding to cart'
                ) : addedItems.has(aid.id) ? (
                  <div className="flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    <span>Added</span>
                  </div>
                ) : (
                  'Add'
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .cursor-grab:active {
          cursor: grabbing;
        }
      `}</style>
    </div>
  );
}
