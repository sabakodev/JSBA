import type { NextConfig } from "next"

import createNextIntlPlugin from 'next-intl/plugin'

const nextConfig: NextConfig = {
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
			},
			{
				protocol: 'https',
				hostname: 'jsba.sabako.id',
			},
			{
				protocol: 'https',
				hostname: 'secure.gravatar.com',
			},
		]
	},
	allowedDevOrigins: ['192.168.1.12'],
}

const withNextIntl = createNextIntlPlugin()
export default withNextIntl(nextConfig)