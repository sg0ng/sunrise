import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  //basePath: "/sunrise",
  output: 'export',
  images: {
    unoptimized: true,
  }
};

export default nextConfig;
