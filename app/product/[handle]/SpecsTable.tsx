"use client"

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SpecsTableProps {
  specs: Record<string, string>;
  title?: string;
  maxVisibleRows?: number;
}

export default function SpecsTable({ specs, title = "Specifications", maxVisibleRows = 6 }: SpecsTableProps) {
  const [showAll, setShowAll] = useState(false);
  
  const specEntries = Object.entries(specs);
  const hasMoreRows = specEntries.length > maxVisibleRows;
  const visibleSpecs = showAll ? specEntries : specEntries.slice(0, maxVisibleRows);

  return (
    <section id="specs" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
        
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {visibleSpecs.map(([key, value], index) => (
              <div
                key={key}
                className={`px-6 py-4 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } md:bg-white md:odd:bg-gray-50`}
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <dt className="text-sm font-medium text-gray-900">{key}</dt>
                  <dd className="text-sm text-gray-600 sm:text-right">{value}</dd>
                </div>
              </div>
            ))}
          </div>
          
          {hasMoreRows && (
            <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
              <Button
                variant="ghost"
                onClick={() => setShowAll(!showAll)}
                className="w-full flex items-center justify-center gap-2 text-sm"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show More ({specEntries.length - maxVisibleRows} more)
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
