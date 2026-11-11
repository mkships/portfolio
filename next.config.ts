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
        source: '/case-studies/ai-generalist-pm',
        destination: '/musings/pivoting-from-pm-to-ai-native-builder',
        permanent: true,
      },
      {
        source: '/products/rackets-and-retreats',
        destination: '/products/court-trips',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
