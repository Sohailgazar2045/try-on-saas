/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", 
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com', 'localhost'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.cloudinary.com',
      },
    ],
  },
}

module.exports = nextConfig

