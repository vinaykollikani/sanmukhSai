import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'your-r2-public-url.com', // Replace with R2 domain later
      // }
    ],
  },
};

export default nextConfig;
