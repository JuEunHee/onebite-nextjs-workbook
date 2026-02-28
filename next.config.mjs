const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:12345/';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'search.pstatic.net',
      port: '',
      pathname: '/**',
    },
  ],
},
};

export default nextConfig;
