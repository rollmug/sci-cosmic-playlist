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
        ]
    },
};
;
export default withNextIntl(nextConfig);
