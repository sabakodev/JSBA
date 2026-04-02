import type { NextConfig } from "next"

import createNextIntlPlugin from 'next-intl/plugin'
import createMDX from '@next/mdx'

const nextConfig: NextConfig = {
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
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

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
})

const withNextIntl = createNextIntlPlugin()
export default withMDX(withNextIntl(nextConfig))