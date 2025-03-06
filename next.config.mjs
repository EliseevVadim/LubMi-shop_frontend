/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    // images: {
    //     domains: ['*', '193.168.49.60'], // Разрешить все домены
    // },
    images: {
        domains: ['*', '193.168.49.60'], // Разрешить все домены
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
