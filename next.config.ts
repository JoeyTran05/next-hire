import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	experimental: {
		serverActions: {
			bodySizeLimit: "5mb", // Set the body size limit to 5MB
		},
	},
	serverExternalPackages: ["pdf-parse"],
	/* config options here */
};

export default nextConfig;
