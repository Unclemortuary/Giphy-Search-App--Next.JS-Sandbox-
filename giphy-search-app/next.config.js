/** @type {import('next').NextConfig} */
const optimizedImages = require('next-optimized-images');

const nextConfig = {
  reactStrictMode: true,
  images: {
    disableStaticImages: true,
    unoptimized: true,
  }
}

module.exports = optimizedImages(nextConfig)
