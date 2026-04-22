import { getPostSlugs } from '@/lib/graphql/services/posts'
import { MetadataRoute } from 'next'

const BASE_URL = 'https://www.basilius.or.id'
const locales = ['en', 'id']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const staticPages = [
		'',
		'/about',
		'/event',
		'/event/calendar',
		'/blog',
		'/why',
		'/contact',
	]

	const staticEntries = staticPages.flatMap((path) =>
		locales.map((locale) => ({
			url: `${BASE_URL}/${locale}${path}`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: path === '' ? 1.0 : 0.8,
			alternates: {
				languages: Object.fromEntries(
					locales.map((l) => [l, `${BASE_URL}/${l}${path}`])
				),
			},
		}))
	)

	// Dynamic blog posts
	const posts = await getPostSlugs()
	const blogEntries = posts.flatMap((post: { slug: string; modifiedGmt: string }) =>
		locales.map((locale) => ({
			url: `${BASE_URL}/${locale}/blog/${post.slug}`,
			lastModified: new Date(post.modifiedGmt),
			changeFrequency: 'monthly' as const,
			priority: 0.6,
			alternates: {
				languages: Object.fromEntries(
					locales.map((l) => [l, `${BASE_URL}/${l}/blog/${post.slug}`])
				),
			},
		}))
	)

	return [...staticEntries, ...blogEntries]
}