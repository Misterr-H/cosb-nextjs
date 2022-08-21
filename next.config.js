/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        domains: ['res.cloudinary.com'],
        loader: 'akamai',
        path: ''
    },
    trailingSlash: true
}

module.exports = nextConfig
