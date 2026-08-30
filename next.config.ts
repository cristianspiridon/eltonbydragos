import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first: the stage photography is dark and grainy, where AVIF holds
    // detail at roughly half the byte cost of WebP.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920, 2560],
    imageSizes: [256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  poweredByHeader: false,
};

export default nextConfig;
