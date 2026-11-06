import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // output: "export", // Uncomment for static export if not using Vercel
  images: {
    // Only optimize the images used by the site, including when an old URL is cached.
    localPatterns: [
      { pathname: '/images/bio/**' },
      { pathname: '/images/products/**' },
    ],
  },
  async redirects() {
    return [
      {
        source: '/products/rackets-and-retreats',
        destination: '/products/court-trips',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
