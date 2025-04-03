import type { Configuration } from "webpack";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  webpack: (config: Configuration) => {
    config.module?.rules?.push({
      test: /\.m?js$/,
      include: /node_modules\/lit-element|lit-html|@lit|lit/,
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  },
};

export default nextConfig;
