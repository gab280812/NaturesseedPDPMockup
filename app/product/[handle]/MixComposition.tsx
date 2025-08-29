"use client"

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MixComponent } from './types';

interface MixCompositionProps {
  mix: MixComponent[];
  title?: string;
}

export default function MixComposition({ mix, title = "What's in the Southern Horse Pasture Mix?" }: MixCompositionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyMix = async () => {
    const mixText = mix
      .map(component => `${component.species}: ${component.percent}%`)
      .join('\n');
    
    try {
      await navigator.clipboard.writeText(mixText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy mix to clipboard:', error);
    }
  };

  return (
    <section id="mix" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopyMix}
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copy Mix
              </>
            )}
          </Button>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                    Species
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Percentage
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                    Visual
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {mix.map((component, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {component.species}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 text-right">
                      {component.percent}%
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end">
                        <div className="w-20 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full transition-all duration-300"
                            style={{ width: `${component.percent}%` }}
                          />
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-gray-50">
                <tr>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                    Total
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                    {mix.reduce((sum, component) => sum + component.percent, 0)}%
                  </td>
                  <td className="px-6 py-4"></td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="mt-6 text-sm text-gray-600">
          <p>
            This carefully balanced mix is formulated specifically for warm-season climates and horse grazing systems. 
            Each species contributes unique benefits including drought tolerance, traffic resistance, and nutritional value.
          </p>
        </div>
      </div>
    </section>
  );
}
