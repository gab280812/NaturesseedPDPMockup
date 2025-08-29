"use client"

import { useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ProductGalleryProps {
  images: { src: string; alt: string }[];
  productTitle: string;
  onImageSelect?: (imageIndex: number) => void;
}

export default function ProductGallery({ images, productTitle, onImageSelect }: ProductGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleImageSelect = (index: number) => {
    setSelectedImage(index);
    onImageSelect?.(index);
    
    // Fire GA4 select_item event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'select_item', {
        item_list_id: 'product_gallery',
        item_list_name: 'Product Gallery',
        items: [{
          item_id: `image_${index}`,
          item_name: `${productTitle} - Image ${index + 1}`,
          index: index
        }]
      });
    }
  };

  const nextImage = () => {
    const next = (selectedImage + 1) % images.length;
    handleImageSelect(next);
  };

  const prevImage = () => {
    const prev = (selectedImage - 1 + images.length) % images.length;
    handleImageSelect(prev);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') nextImage();
    if (e.key === 'ArrowLeft') prevImage();
    if (e.key === 'Escape') setIsFullscreen(false);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={images[selectedImage]?.src || '/placeholder-image.jpg'}
            alt={images[selectedImage]?.alt || productTitle}
            fill
            className="object-cover transition-transform group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 42vw"
            priority
          />
          
          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={prevImage}
                aria-label="Previous image"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={nextImage}
                aria-label="Next image"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Fullscreen Button */}
          <Dialog open={isFullscreen} onOpenChange={setIsFullscreen}>
            <DialogTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 bg-white/80 hover:bg-white/90 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="View fullscreen"
              >
                <Expand className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-7xl w-full h-[90vh]" onKeyDown={handleKeyDown}>
              <div className="relative w-full h-full">
                <Image
                  src={images[selectedImage]?.src || '/placeholder-image.jpg'}
                  alt={images[selectedImage]?.alt || productTitle}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
                
                {/* Fullscreen Navigation */}
                {images.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </Button>
                  </>
                )}

                {/* Image Counter */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                  {selectedImage + 1} / {images.length}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={cn(
                "relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden border-2 transition-all",
                selectedImage === index 
                  ? "border-primary ring-2 ring-primary/20" 
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => handleImageSelect(index)}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
