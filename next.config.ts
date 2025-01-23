import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '6mb',
    },
  },
  images: {
    domains: [
      'cdn.dummyjson.com',
      'fakestoreapi.com',
      'i.imgur.com',
      'amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '3000',
        pathname: '/**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'amzn-s3-nkalbum-bucket.s3.us-east-2.amazonaws.com',
      //   port: '',
      //   pathname: '/**',
      // },
    ],
  },
};

export default nextConfig;
