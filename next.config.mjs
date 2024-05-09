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
    }
};

export default nextConfig;
