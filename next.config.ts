import type { NextConfig } from 'next'

// The learning space is built at /learn and served from learn.mkanapaka.space.
// Hosts are matched as patterns: `learn.` also covers learn.localhost in development.
const learnHost = { type: 'host' as const, value: 'learn\\..+' }
const mainHost = { type: 'host' as const, value: '(?:www\\.)?mkanapaka\\.space' }
const learnOrigin = 'https://learn.mkanapaka.space'

const nextConfig: NextConfig = {
  // output: "export", // Uncomment for static export if not using Vercel
  // Lets the dev server be opened as learn.localhost to test the subdomain rules below.
  allowedDevOrigins: ['learn.localhost'],
  images: {
    // Only optimize the images used by the site, including when an old URL is cached.
    localPatterns: [
      { pathname: '/images/bio/**' },
      { pathname: '/images/products/**' },
    ],
  },
  async redirects() {
    return [
      // On the subdomain the short address is the real one: /learn/growth becomes /growth.
      { source: '/learn', has: [learnHost], destination: '/', permanent: false },
      { source: '/learn/:path*', has: [learnHost], destination: '/:path*', permanent: false },
      // On the main site, the learning space lives on its subdomain. Previews and localhost
      // have no subdomain, so they keep serving it at /learn.
      { source: '/learn', has: [mainHost], destination: learnOrigin, permanent: false },
      { source: '/learn/:path*', has: [mainHost], destination: `${learnOrigin}/:path*`, permanent: false },
      { source: '/learning', destination: '/learn', permanent: false },
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
      {
        source: '/products/startdotdev',
        destination: '/#career',
        permanent: false,
      },
    ]
  },
  async rewrites() {
    return {
      // Before files, so the subdomain's root is the learning hub and not the home page.
      // Only single lowercase segments are rewritten, which leaves /_next, /api and files alone.
      // Rules chain, so the second one must skip the /learn that the first one produces.
      beforeFiles: [
        { source: '/', has: [learnHost], destination: '/learn' },
        { source: '/:track((?!learn$)[a-z0-9-]+)', has: [learnHost], destination: '/learn/:track' },
      ],
      afterFiles: [],
      fallback: [],
    }
  },
}

export default nextConfig
