/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'your-cdn-domain.com', 'images.unsplash.com'],
  },
  experimental: {
    serverActions: true,
  },
}

module.exports = nextConfig