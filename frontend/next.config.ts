import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
      allowedOrigins: ['res.cloudinary.com'],
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
