const nextConfig = {
  images: { remotePatterns: [
    { protocol: 'https', hostname: 'images.unsplash.com' },
    { protocol: 'https', hostname: 'plus.unsplash.com' },
    { protocol: 'https', hostname: 'images.pexels.com' }
  ]},
  experimental: { appDir: true }
};
module.exports = nextConfig;
