/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'standalone',
  compress: false,
  env: {
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_ID,
    AWS_SECRET_ACESS_KEY: process.env.AWS_SECRET_KEY,
    AWS_REGION: process.env.AWS_REGION,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    API_URL: process.env.API_URL,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL: process.env.GOOGLE_REDIRECT_URL,
    GOOGLE_AUTH_URI: process.env.GOOGLE_AUTH_URI,
    REACT_APP_VIDEO_BUCKET: process.env.REACT_APP_VIDEO_BUCKET,
    REACT_APP_UTIL_REGION: process.env.REACT_APP_UTIL_REGION,
  },
  images: {
    domains: ['fakeface.rest']
  },
}

module.exports = withBundleAnalyzer(nextConfig)
