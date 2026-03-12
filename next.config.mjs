/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // সব ডোমেইন অ্যালাউ করা হলো
      },
    ],
  },
};

export default nextConfig;