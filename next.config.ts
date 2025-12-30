/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  experimental: {
    // ✅ La configuración CORRECTA va aquí adentro
    serverActions: {
      bodySizeLimit: '10mb', 
    },
  },
  
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/api/:path*',
      },
    ];
  }, 
};

module.exports = nextConfig;