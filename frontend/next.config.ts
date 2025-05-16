import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images:{
    domains: [
      'images.unsplash.com',
      'cdn.solle458.com',
      'solle458.com',
      'solle.vercel.app',
      'cdn.discordapp.com',
      'avatars.githubusercontent.com',
      'github.com',
      'res.cloudinary.com',
    ],
  },experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    }
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'solle.vercel.app',
          },
        ],
        destination: 'https://www.solle458.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
