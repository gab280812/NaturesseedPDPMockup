import Image from 'next/image';

interface ProductUsesProps {
  uses: { image: string; title: string; blurb?: string }[];
  title?: string;
}

export default function ProductUses({ uses, title = "Product Uses" }: ProductUsesProps) {
  return (
    <section id="uses" className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {uses.map((use, index) => (
            <div key={index} className="relative group overflow-hidden rounded-lg">
              <div className="aspect-video relative">
                <Image
                  src={use.image}
                  alt={use.title}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-semibold mb-2">{use.title}</h3>
                    {use.blurb && (
                      <p className="text-sm opacity-90 leading-relaxed">{use.blurb}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Seasonality Callouts */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Seasonal Performance</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative overflow-hidden rounded-lg">
              <div className="aspect-video relative">
                <Image
                  src="/natures-seed/season-summer.jpg"
                  alt="Summer growth performance"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Summer Peak Growth</h4>
                  <p className="text-sm opacity-90">
                    Thrives in hot weather with peak growth during summer months when cool-season grasses struggle.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg">
              <div className="aspect-video relative">
                <Image
                  src="/natures-seed/season-fall.jpg"
                  alt="Fall establishment period"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h4 className="text-lg font-semibold mb-2">Fall Establishment</h4>
                  <p className="text-sm opacity-90">
                    Plant in late spring through early fall for best establishment before winter dormancy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
