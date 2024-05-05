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
        ],
    },
};

export default nextConfig;
