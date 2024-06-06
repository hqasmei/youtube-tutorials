/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        hostname: 'rosy-goat-314.convex.cloud',
      },
    ],
  },
};

module.exports = nextConfig;
