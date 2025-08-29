import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProductByHandle } from '@/lib/commerce';
import ProductPage from './ProductPage';

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  try {
    const product = await getProductByHandle(params.handle);
    
    const selectedVariant = product.variants.find(v => v.id === product.defaultVariantId) || product.variants[0];
    
    return {
      title: `${product.title} | Nature's Seed`,
      description: product.subtitle || `High-quality ${product.title} from Nature's Seed. ${product.descriptionHtml.replace(/<[^>]*>/g, '').substring(0, 160)}...`,
      openGraph: {
        title: product.title,
        description: product.subtitle || product.title,
        images: [
          {
            url: product.images[0]?.src || '/placeholder-image.jpg',
            width: 1200,
            height: 630,
            alt: product.images[0]?.alt || product.title,
          },
        ],
        type: 'website',
        siteName: 'Nature\'s Seed',
      },
      twitter: {
        card: 'summary_large_image',
        title: product.title,
        description: product.subtitle || product.title,
        images: [product.images[0]?.src || '/placeholder-image.jpg'],
      },
      other: {
        'product:price:amount': selectedVariant.price.toString(),
        'product:price:currency': 'USD',
        'product:availability': selectedVariant.inStock ? 'in stock' : 'out of stock',
        'product:condition': 'new',
        'product:retailer_item_id': product.id,
      },
    };
  } catch (error) {
    return {
      title: 'Product Not Found | Nature\'s Seed',
      description: 'The requested product could not be found.',
    };
  }
}

export default async function Page({ params }: ProductPageProps) {
  try {
    const product = await getProductByHandle(params.handle);
    return <ProductPage product={product} />;
  } catch (error) {
    notFound();
  }
}
