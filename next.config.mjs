/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // All images ship as pre-optimized local WebP, so skip the runtime optimizer.
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
};
export default nextConfig;
