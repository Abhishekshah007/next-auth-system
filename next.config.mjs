/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['https://res.cloudinary.com'], 
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',
        }
      ],
    },
  };
  
  export default nextConfig;
  