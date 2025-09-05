"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, CheckCircle, XCircle } from 'lucide-react';

interface RegionCheckerProps {
  productTitle: string;
  onClose: () => void;
}

interface RecommendedProduct {
  id: string;
  title: string;
  image: string;
  price: number;
}

export default function RegionChecker({ productTitle, onClose }: RegionCheckerProps) {
  const [zipCode, setZipCode] = useState('');
  const [result, setResult] = useState<'compatible' | 'incompatible' | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock recommended products for pairing
  const pairingProducts: RecommendedProduct[] = [
    {
      id: '1',
      title: 'Premium Soil Conditioner',
      image: '/placeholder-product.jpg',
      price: 24.99
    },
    {
      id: '2',
      title: 'Seed Starting Fertilizer',
      image: '/placeholder-product.jpg',
      price: 19.99
    },
    {
      id: '3',
      title: 'Organic Mulch Mix',
      image: '/placeholder-product.jpg',
      price: 32.99
    },
    {
      id: '4',
      title: 'pH Testing Kit',
      image: '/placeholder-product.jpg',
      price: 15.99
    }
  ];

  // Mock alternative products for incompatible regions
  const alternativeProducts: RecommendedProduct[] = [
    {
      id: '5',
      title: 'Cool Season Grass Mix',
      image: '/placeholder-product.jpg',
      price: 45.99
    },
    {
      id: '6',
      title: 'Northern Climate Blend',
      image: '/placeholder-product.jpg',
      price: 52.99
    },
    {
      id: '7',
      title: 'Shade Tolerant Mix',
      image: '/placeholder-product.jpg',
      price: 48.99
    }
  ];

  const handleCheck = async () => {
    if (!zipCode.trim()) return;
    
    setIsLoading(true);
    
    // Mock API call - simulate checking region compatibility
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock logic: zip codes starting with 7, 8, 9 are compatible (warm regions)
    const firstDigit = parseInt(zipCode.charAt(0));
    const isCompatible = firstDigit >= 7;
    
    setResult(isCompatible ? 'compatible' : 'incompatible');
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCheck();
    }
  };

  return (
    <div className="space-y-4">
      {!result && (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Enter your zip code to check if {productTitle} is suitable for your region's climate.
          </p>
          
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter zip code"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
              onKeyPress={handleKeyPress}
              className="flex-1"
              maxLength={5}
            />
            <Button 
              onClick={handleCheck}
              disabled={!zipCode.trim() || isLoading}
              className="px-6"
            >
              {isLoading ? 'Checking...' : 'Check'}
            </Button>
          </div>
        </>
      )}

      {result === 'compatible' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <div>
              <p className="font-medium text-green-800">
                Yes! This seed works great in your region
              </p>
              <p className="text-sm text-green-600">
                Zip code {zipCode} is perfect for {productTitle}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">
              For better success, pair it with:
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {pairingProducts.slice(0, 4).map((product) => (
                <div key={product.id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="aspect-square bg-gray-100 rounded mb-2 flex items-center justify-center">
                    <span className="text-gray-400 text-xs">Product Image</span>
                  </div>
                  <h5 className="text-xs font-medium text-gray-900 mb-1 line-clamp-2">
                    {product.title}
                  </h5>
                  <p className="text-xs font-bold text-primary">
                    ${product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={onClose} variant="outline" size="sm" className="flex-1">
              Close
            </Button>
            <Button onClick={() => setResult(null)} variant="ghost" size="sm">
              Check Another Zip
            </Button>
          </div>
        </div>
      )}

      {result === 'incompatible' && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <XCircle className="h-5 w-5 text-red-600" />
            <div>
              <p className="font-medium text-red-800">
                This seed doesn't work well in your region
              </p>
              <p className="text-sm text-red-600">
                Zip code {zipCode} has a different climate than what {productTitle} needs
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium text-gray-900 mb-3">
              But these will work great in your area:
            </h4>
            <div className="space-y-3">
              {alternativeProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3 border rounded-lg p-3 hover:shadow-sm transition-shadow cursor-pointer">
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-400 text-xs">IMG</span>
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-medium text-gray-900">
                      {product.title}
                    </h5>
                    <p className="text-sm font-bold text-primary">
                      ${product.price}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <Button onClick={onClose} variant="outline" size="sm" className="flex-1">
              Close
            </Button>
            <Button onClick={() => setResult(null)} variant="ghost" size="sm">
              Check Another Zip
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
