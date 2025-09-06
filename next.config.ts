import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['@/components'],
  },
  
  // Image optimization configuration
  images: {
    // Enable image optimization
    formats: ['image/webp', 'image/avif'],
    
    // Configure remote patterns if needed
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    
    // Device sizes for responsive images
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Image sizes for different breakpoints
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Minimum cache time for images
    minimumCacheTTL: 60,
    
    // Enable dangerous allowSVG for SVG optimization
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  
  // Headers for better caching
  async headers() {
    return [
      {
        source: '/notes-app/Casestudy/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/notes-app/Casestudy/video/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
  
  // Webpack configuration for better bundling
  webpack: (config, { isServer }) => {
    // Optimize video handling
    config.module.rules.push({
      test: /\.(mp4|webm|ogg)$/,
      type: 'asset/resource',
      generator: {
        filename: 'static/videos/[name].[hash][ext]',
      },
    })
    
    return config
  },
  
  // Output configuration for static export if needed
  output: 'standalone',
  
  // Compression
  compress: true,
  
  // Power optimization
  poweredByHeader: false,
}

export default nextConfig