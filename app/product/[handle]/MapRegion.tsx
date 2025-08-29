import Image from 'next/image';

interface MapRegionProps {
  regionMap: { image: string; caption?: string };
}

export default function MapRegion({ regionMap }: MapRegionProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="aspect-video relative">
        <Image
          src={regionMap.image}
          alt="Recommended growing regions map"
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {regionMap.caption && (
        <div className="p-4 bg-gray-50">
          <p className="text-sm text-gray-600 text-center">{regionMap.caption}</p>
        </div>
      )}
    </div>
  );
}
