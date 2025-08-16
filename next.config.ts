import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    clientReferenceManifest: true,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
};

export default nextConfig;
