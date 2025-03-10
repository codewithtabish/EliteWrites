import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all external images
      },
    ],
    domains: ["*"], // Alternative way to allow all image domains
    dangerouslyAllowSVG: true, // Allow SVG images
    contentSecurityPolicy: "default-src 'self'; img-src *; media-src *; script-src 'none'; sandbox;",
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Ignore TypeScript errors during build
  },
  webpack: (config) => {
    config.infrastructureLogging = { level: "error" }; // Suppress warnings in console
    return config;
  },
  reactStrictMode: false, // Disable strict mode to avoid extra warnings
};

export default nextConfig;
