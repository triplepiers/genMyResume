import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true // 忽略 eslint 检查
  },
  typescript: {
    ignoreBuildErrors: true  // 打包时忽略 TypeScript 检查
  },
  output: 'export'           // 只进行静态打包
};

export default nextConfig;
