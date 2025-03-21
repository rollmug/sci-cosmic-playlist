import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin('./src/i18n.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'rlmg-dev.ngrok.io',
                port: '',
                pathname: '/assets/**/**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '9980',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.4.116',
                port: '9980',
                pathname: '/**',
            },
            {
                protocol: 'http',
                hostname: '10.0.11.176',
                port: '8055',
                pathname: '/assets/**/**',
            },
            {
                protocol: 'http',
                hostname: '10.0.8.234',
                port: '8055',
                pathname: '/assets/**/**',
            },
            {
                protocol: 'http',
                hostname: '192.168.4.116',
                port: '8055',
                pathname: '/assets/**/**',
            }
        ]
    },
};
;
export default withNextIntl(nextConfig);
