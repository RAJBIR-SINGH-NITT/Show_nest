/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@shownest/ui', '@shownest/types', '@shownest/analytics'],
}

module.exports = nextConfig
