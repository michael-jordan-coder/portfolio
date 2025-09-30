/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 14+ doesn't need experimental.appDir anymore
  
  // Ensure static assets are properly served
  async headers() {
    return [
      {
        source: '/imagetrail/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/noise.svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/dashboard-os/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Ensure static files are included in build
  experimental: {
    outputFileTracingRoot: undefined,
  },
  
  // Explicitly configure static file serving
  webpack: (config, { isServer }) => {
    // Ensure static files are copied to output
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  
  // Ensure public directory is properly handled
  trailingSlash: false,
  
  // Optimize static file serving
  compress: true,
  
  // Configure image optimization
  images: {
    domains: ['images.unsplash.com', 'syntax-strong-29615144.figma.site', 'embed.figma.com'],
    unoptimized: false, // Enable optimization for better mobile performance
    formats: ['image/webp', 'image/avif'],
  },
}

module.exports = nextConfig 