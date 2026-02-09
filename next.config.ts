import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "5mb", // Set the body size limit to 5MB
		},
	},
	serverExternalPackages: ["pdf-parse"],
	images: {
		remotePatterns: [{ hostname: "img.clerk.com" }],
	},
	/* config options here */
};

export default nextConfig;
