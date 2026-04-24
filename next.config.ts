import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  
};


export default nextConfig;
