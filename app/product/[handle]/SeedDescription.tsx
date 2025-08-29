import Image from 'next/image';
import MapRegion from './MapRegion';

interface SeedDescriptionProps {
  descriptionHtml: string;
  regionMap?: { image: string; caption?: string };
  title?: string;
}

export default function SeedDescription({ 
  descriptionHtml, 
  regionMap, 
  title = "Seed Description" 
}: SeedDescriptionProps) {
  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Description Content */}
          <div className="space-y-6">
            <div 
              className="prose max-w-none text-gray-600 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
            
            {/* Product Diagram */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center">
                      <div className="w-16 h-16 bg-primary/30 rounded-full flex items-center justify-center">
                        <span className="text-primary font-semibold text-sm">SEED</span>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">Premium Seed Mix</h4>
                  <p className="text-sm text-gray-600">
                    Carefully selected varieties<br />
                    for optimal performance
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Region Map */}
          <div className="lg:sticky lg:top-8">
            {regionMap && <MapRegion regionMap={regionMap} />}
          </div>
        </div>
      </div>
    </section>
  );
}
