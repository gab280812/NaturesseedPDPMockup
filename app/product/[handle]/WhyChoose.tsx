import Image from 'next/image';

interface WhyChooseProps {
  title?: string;
}

const features = [
  {
    image: '/natures-seed/feature-drought.jpg',
    title: 'Superior Drought Tolerance',
    description: 'Specially selected warm-season grasses that thrive in hot, dry conditions with minimal water requirements.',
  },
  {
    image: '/natures-seed/feature-traffic.jpg',
    title: 'Heavy Traffic Resistance',
    description: 'Robust grass varieties that can withstand constant horse traffic and recover quickly from grazing damage.',
  },
  {
    image: '/natures-seed/feature-nutrition.jpg',
    title: 'High Nutritional Value',
    description: 'Balanced blend of grasses and legumes provides excellent protein and mineral content for horse health.',
  },
];

export default function WhyChoose({ title = "Why Choose This Seed?" }: WhyChooseProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="aspect-video relative">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
