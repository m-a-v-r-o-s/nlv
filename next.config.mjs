/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Real car photography drops in later; unoptimized keeps offline builds clean.
    unoptimized: true,
  },
  // Fonts are loaded via <link> at runtime (see layout.tsx), so skip build-time
  // font inlining — avoids a network fetch during build.
  optimizeFonts: false,
};
export default nextConfig;
