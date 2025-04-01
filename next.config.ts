import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.wallpaperhub.app",
      },
      {
        protocol: "https",
        hostname: "www.wallpaperhub.app",
      },
      {
        protocol: "https",
        hostname: "wallpaperaccess.com",
      }
    ],
  },
};

export default nextConfig;
