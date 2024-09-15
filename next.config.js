const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { dev, isServer }) => {
        config.resolve.alias = {
            ...config.resolve.alias,
            '@': path.resolve(__dirname),
        }

        // Disable webpack cache
        config.cache = false

        return config
    },
}

module.exports = nextConfig
