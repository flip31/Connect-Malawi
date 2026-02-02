import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    unoptimized: false, // Set to true if you have issues with local images
  },
};

export default nextConfig;
