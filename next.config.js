// Configuration options for Next.js
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
}

const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
})

// Export the combined configuration for Next.js with PWA support
module.exports = withPWA(nextConfig)
