/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
      },
    ],
  },
  env: {
    ALCHEMY_RPC: process.env.ALCHEMY_RPC,
    FIREBASE_API: process.env.FIREBASE_API,
  },
};

module.exports = nextConfig;
