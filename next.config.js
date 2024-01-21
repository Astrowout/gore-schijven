const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true" && process.env.VERCEL_ENV !== "production",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.scdn.co",
            },
        ],
    },
};

module.exports = withBundleAnalyzer(nextConfig);
