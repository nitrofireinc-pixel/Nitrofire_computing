import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully prerendered marketing site. The contact form runs in the browser.
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
