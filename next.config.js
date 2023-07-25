const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  reactStrictMode: true,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        and: [/\.(js|ts)x?$/],
      },
      oneOf: [
        {
          resourceQuery: /inline/,
          use: ["raw-loader"],
        },
        {
          use: ["@svgr/webpack"],
        },
      ],
    })
    return config
  },
  sassOptions: {
    includePaths: [
      path.join(__dirname, "styles"),
      path.join(__dirname, "assets"),
    ],
  },
}

module.exports = nextConfig
