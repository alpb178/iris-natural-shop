import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: process.env.IMAGE_HOSTNAME || "localhost" },
      { hostname: "res.cloudinary.com" }
    ]
  },
  pageExtensions: ["ts", "tsx"]
};

export default withNextIntl(nextConfig);
