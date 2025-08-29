/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  async rewrites() {
    return [
      // TODO: Add redirects for old product slugs
    ];
  },
};

module.exports = nextConfig;
