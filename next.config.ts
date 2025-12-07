import type { NextConfig } from "next";

const nextConfig: NextConfig = {
 redirects:async()=>{
  return [
    {
      source: '/',
      destination: '/workflows',
      permanent: false,
    },
     {
      source: '/dashboard',
      destination: '/workflows',
      permanent: false,
    }
  ]
 },
 devIndicators:false
};

export default nextConfig;
