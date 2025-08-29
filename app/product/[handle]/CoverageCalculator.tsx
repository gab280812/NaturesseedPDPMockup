"use client"

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Variant } from './types';

interface CoverageCalculatorProps {
  variants: Variant[];
  specs: Record<string, string>;
  onApplyQuantity: (quantity: number) => void;
}

export default function CoverageCalculator({ variants, specs, onApplyQuantity }: CoverageCalculatorProps) {
  const [area, setArea] = useState('');
  const [areaUnit, setAreaUnit] = useState('sqft');
  const [seedingRate, setSeedingRate] = useState('');

  // Extract seeding rate from specs (e.g., "8-12 lbs per 1,000 sq ft")
  const defaultSeedingRate = specs['Seeding Rate']?.match(/(\d+)-?(\d+)?/)?.[1] || '10';

  useState(() => {
    setSeedingRate(defaultSeedingRate);
  });

  const calculateCoverage = () => {
    const areaValue = parseFloat(area);
    const rateValue = parseFloat(seedingRate);
    
    if (!areaValue || !rateValue) return null;

    // Convert area to square feet if needed
    const areaSqFt = areaUnit === 'acres' ? areaValue * 43560 : areaValue;
    
    // Calculate total pounds needed
    const totalPounds = (areaSqFt / 1000) * rateValue;

    // Calculate recommendations for each variant
    return variants.map(variant => {
      const variantWeight = parseFloat(variant.title.replace(/[^\d.]/g, ''));
      const bagsNeeded = Math.ceil(totalPounds / variantWeight);
      const totalCost = bagsNeeded * variant.price;
      
      return {
        variant,
        bagsNeeded,
        totalPounds: bagsNeeded * variantWeight,
        totalCost,
        efficiency: totalCost / totalPounds, // cost per pound of coverage
      };
    });
  };

  const recommendations = calculateCoverage();
  const bestOption = recommendations?.sort((a, b) => a.efficiency - b.efficiency)[0];

  return (
    <div className="space-y-4">
      {/* Area Input */}
      <div>
        <label className="block text-sm font-medium mb-2">Area to Cover</label>
        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Enter area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            className="flex-1"
          />
          <Select value={areaUnit} onValueChange={setAreaUnit}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sqft">sq ft</SelectItem>
              <SelectItem value="acres">acres</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Seeding Rate */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Seeding Rate (lbs per 1,000 sq ft)
        </label>
        <Input
          type="number"
          placeholder="10"
          value={seedingRate}
          onChange={(e) => setSeedingRate(e.target.value)}
        />
        <p className="text-xs text-gray-500 mt-1">
          Recommended: {specs['Seeding Rate'] || 'See product specifications'}
        </p>
      </div>

      {/* Results */}
      {recommendations && recommendations.length > 0 && (
        <div className="border-t pt-4">
          <h4 className="font-medium mb-3">Recommendations</h4>
          <div className="space-y-3">
            {recommendations.map((rec, index) => (
              <div
                key={rec.variant.id}
                className={`p-3 rounded-lg border ${
                  rec.variant.id === bestOption?.variant.id
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="font-medium">{rec.variant.title} bags</span>
                    {rec.variant.id === bestOption?.variant.id && (
                      <span className="ml-2 text-xs bg-primary text-white px-2 py-0.5 rounded">
                        Best Value
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">
                    ${rec.totalCost.toFixed(2)}
                  </span>
                </div>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Bags needed: {rec.bagsNeeded}</div>
                  <div>Total coverage: {rec.totalPounds.toFixed(1)} lbs</div>
                  <div className="flex justify-between items-center mt-2">
                    <span>${(rec.efficiency).toFixed(2)}/lb coverage</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onApplyQuantity(rec.bagsNeeded)}
                    >
                      Apply Quantity
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {area && seedingRate && !recommendations && (
        <div className="text-sm text-gray-500 text-center py-4">
          Enter valid area and seeding rate to see recommendations
        </div>
      )}
    </div>
  );
}
