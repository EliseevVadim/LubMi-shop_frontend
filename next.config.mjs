/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lubmi.ru',
            },
            {
                protocol: 'http',
                hostname: 'lubmi.ru',
            },
            {
                protocol: 'https',
                hostname: 'api.lubmi.ru',
            },
            {
                protocol: 'http',
                hostname: 'api.lubmi.ru',
            },
        ],
    },
};

export default nextConfig;
