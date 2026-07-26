import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow regular <img> tags (we use Unsplash URLs directly, not next/image)
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },

  // Silence the hydration mismatch warnings from GSAP DOM mutations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? { exclude: ['error', 'warn'] } : false,
  },

  // Allow GSAP to set inline styles without CSP issues
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
        ],
      },
    ];
  },
};

export default nextConfig;
