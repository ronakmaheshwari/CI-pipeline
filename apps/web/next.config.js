/** @type {import('next').NextConfig} */

console.log(process.env.DATABASE_URL);

const nextConfig = {
  env: {
    DATABASE_URL: process.env.DATABASE_URL,  
  },
};

export default nextConfig;