import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Restore static export so Firebase Hosting can deploy from `out/`
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
