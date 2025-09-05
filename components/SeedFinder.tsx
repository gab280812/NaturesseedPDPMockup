"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface SeedFinderProps {
  onClose: () => void;
}

interface RecommendedSeed {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  description: string;
}

export default function SeedFinder({ onClose }: SeedFinderProps) {
  const [zipCode, setZipCode] = useState('');
  const [seedType, setSeedType] = useState('');
  const [recommendations, setRecommendations] = useState<RecommendedSeed[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);

  const seedTypes = [
    'Pasture Seed',
    'Lawn Seed',
    'Wildflower Seed',
    'Specialty Seed'
  ];

  // Mock recommendations based on seed type and region
  const mockRecommendations: Record<string, RecommendedSeed[]> = {
    'Pasture Seed': [
      {
        id: '1',
        name: 'Horse Pasture Mix - Warm Season',
        type: 'Pasture',
        price: 59.99,
        image: '/placeholder-seed.jpg',
        description: 'Perfect for warm climates, provides excellent nutrition for horses'
      },
      {
        id: '2', 
        name: 'Cattle Pasture Blend',
        type: 'Pasture',
        price: 45.99,
        image: '/placeholder-seed.jpg',
        description: 'High-protein mix ideal for cattle grazing'
      }
    ],
    'Lawn Seed': [
      {
        id: '3',
        name: 'Premium Lawn Mix',
        type: 'Lawn',
        price: 34.99,
        image: '/placeholder-seed.jpg',
        description: 'Dense, green lawn perfect for your climate'
      },
      {
        id: '4',
        name: 'Drought Resistant Grass',
        type: 'Lawn', 
        price: 42.99,
        image: '/placeholder-seed.jpg',
        description: 'Low-maintenance grass that thrives in dry conditions'
      }
    ],
    'Wildflower Seed': [
      {
        id: '5',
        name: 'Native Wildflower Mix',
        type: 'Wildflower',
        price: 28.99,
        image: '/placeholder-seed.jpg',
        description: 'Beautiful native flowers that attract pollinators'
      }
    ],
    'Specialty Seed': [
      {
        id: '6',
        name: 'Food Plot Mix',
        type: 'Specialty',
        price: 52.99,
        image: '/placeholder-seed.jpg',
        description: 'Attracts wildlife and provides excellent nutrition'
      }
    ]
  };

  const handleSubmit = async () => {
    if (!zipCode || !seedType) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const recs = mockRecommendations[seedType] || [];
    setRecommendations(recs);
    setIsLoading(false);
    setStep(2);
  };

  const handleReset = () => {
    setZipCode('');
    setSeedType('');
    setRecommendations([]);
    setStep(1);
  };

  return (
    <div className="space-y-4">
      {step === 1 && (
        <>
          <p className="text-sm text-gray-600 mb-4">
            Tell us about your location and needs, and we'll recommend the perfect seeds for you.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Zip Code
              </label>
              <Input
                type="text"
                placeholder="Enter your zip code"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                maxLength={5}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What type of seed do you need?
              </label>
              <Select value={seedType} onValueChange={setSeedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select seed type" />
                </SelectTrigger>
                <SelectContent>
                  {seedTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button 
              onClick={handleSubmit}
              disabled={!zipCode || !seedType || isLoading}
              className="flex-1"
            >
              {isLoading ? 'Finding Seeds...' : 'Find My Seeds'}
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="mb-4">
            <h3 className="font-medium text-gray-900 mb-2">
              Perfect seeds for {seedType} in {zipCode}
            </h3>
            <p className="text-sm text-gray-600">
              Based on your location and needs, here are our top recommendations:
            </p>
          </div>

          <div className="space-y-3 max-h-80 overflow-y-auto">
            {recommendations.map((seed) => (
              <div key={seed.id} className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-gray-400 text-xs">Seed</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm leading-tight">
                        {seed.name}
                      </h4>
                      <div className="text-right ml-2">
                        <div className="font-bold text-base text-green-600">
                          ${seed.price}
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                      {seed.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary" className="text-xs">
                        {seed.type}
                      </Badge>
                      <Button size="sm" variant="outline" className="text-xs h-7">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-4 border-t">
            <Button onClick={handleReset} variant="outline" className="flex-1">
              Search Again
            </Button>
            <Button onClick={onClose} variant="default" className="flex-1">
              Close
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
