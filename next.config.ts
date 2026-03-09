import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  webpack(config) {
    // 1. Find the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // 2. Re-apply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // 3. Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      },
    );

    // 4. Modify the file loader rule to ignore *.svg
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

export default nextConfig;
