import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [], 
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
