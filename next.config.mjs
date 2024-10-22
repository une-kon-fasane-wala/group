/** @type {import('next').NextConfig} */
const nextConfig = {};




// next.config.mjs
export default {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        pathname: '/uc**',
      },
    ],
  },
};


  