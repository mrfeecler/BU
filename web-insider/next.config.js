// @ts-check

const withNextIntl = require('next-intl/plugin')();

/** @type {import('next').NextConfig} */

const nextConfig = {
  eslint: {
    dirs: ['src'],
  },
  images: {
    domains: ['img.api.cryptorank.io', 'img.cryptorank.io', 'pbs.twimg.com'],
  },
  reactStrictMode: false,
  output: 'standalone',
  distDir: 'build',
};

module.exports = withNextIntl(nextConfig);
