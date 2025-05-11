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
  output: 'standalone',      // 只进行静态打包
  // 解决 'ERR_MODULE_NOT_FOUND'
  transpilePackages: ["antd", "@ant-design", "rc-util", "rc-pagination", "rc-picker", "rc-notification", "rc-tooltip", "rc-tree", "rc-table"],
};

export default nextConfig;
