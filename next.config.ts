import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    FRONTEND_URL: process.env.FRONTEND_URL,
    BACKEND_URL: process.env.BACKEND_URL,

    },
  images: {
    domains: ["via.placeholder.com", "res.cloudinary.com"],
  },
};


export default nextConfig;
