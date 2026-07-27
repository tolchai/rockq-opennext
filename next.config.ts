import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // {
      //   source: '/',
      //   destination: '/homepage',
      // },
      {
        source: '/cs/privacy',
        destination: '/cs/privacy.pdf',
      },
      {
        source: '/en/privacy',
        destination: '/en/privacy.pdf',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: 'rockaway.localhost',
      },
      {
        hostname: 'rockq.rockaway.localhost',
      },
      {
        hostname: 'fund.rockaway.localhost',
      },
      {
        hostname: 'develop.rockawaycapital.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
      {
        hostname: 'imagedelivery.net',
      },
    ],
  },
  typescript: {
    // TODO: ignoreBuildErrors: true
    ignoreBuildErrors: true,
  },
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  // async headers() {
  //   return [
  //     {
  //       source: '/(.*)',
  //       headers: [
  //         { key: 'X-Frame-Options', value: 'DENY' },

  //         { key: 'X-Content-Type-Options', value: 'nosniff' },

  //         { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },

  //         { key: 'X-XSS-Protection', value: '0' },

  //         {
  //           key: 'Strict-Transport-Security',
  //           value: 'max-age=63072000; includeSubDomains; preload',
  //         },

  //         {
  //           key: 'Permissions-Policy',
  //           value:
  //             'camera=(), microphone=(), geolocation=(), payment=(), usb=()',
  //         },

  //         {
  //           key: 'Content-Security-Policy',
  //           value: `
  //             default-src 'self';
  //             script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
  //             style-src 'self' 'unsafe-inline' https:;
  //             img-src 'self' data: http: https:;
  //             font-src 'self' https: data:;
  //             frame-src 'self' https:;
  //             connect-src 'self' https:;
  //             object-src 'none';
  //             base-uri 'self';
  //             frame-ancestors 'none';
  //           `
  //             .replace(/\s{2,}/g, ' ')
  //             .trim(),
  //         },
  //       ],
  //     },
  //   ];
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

export default nextConfig;
