import { CTA, FeaturedImage, Headline, RelatedFeed, RelatedTags } from "@/components/theme-blocks/blog"
import { getTranslations } from "next-intl/server"
import { getPostBySlug, getRelatedPosts } from "@/lib/graphql/services/posts"
import { notFound } from "next/navigation"
import SidebarShare from "@/components/ui/sidebar-share"
import { cn, getReadingTime } from "@/lib/utils"
import { Metadata } from "next"

interface Props {
	params: Promise<{
		locale: string
		slug: string
	}>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params
	const post = await getPostBySlug(slug)

	if (!post) {
		const t = await getTranslations({ locale, namespace: 'Metadata' })
		return { title: t('blog.title') }
	}

	const t = await getTranslations({ locale, namespace: 'global' })
	return {
		title: `${post.title} - ${t('saintName')}`,
		description: post.excerpt?.replace(/<[^>]*>/g, '').substring(0, 160),
		alternates: {
			canonical: `/id/blog/${slug}`
		},
		openGraph: post.featuredImage && {
			images: post.featuredImage.node.sourceUrl,
		},
		publisher: `Gereja Orthodox Indonesia Parokia ${t('saintName')}`,
		authors: [{
			name: post.author.node.name
		}],
	}
}

export default async function Page({ params }: Props) {
	const { slug } = await params
	const post = await getPostBySlug(slug)

	if (!post) notFound()

	// Get related posts from the first category
	const skipFilter = ['uncategorized', 'featured']
	const primaryCategory = post.categories.nodes.filter(({ slug }) => !skipFilter.includes(slug))[0]?.slug
	const relatedPosts = primaryCategory
		? await getRelatedPosts(primaryCategory, post.id, 3)
		: []

	// Map tags for the RelatedTags component
	const tags = post.categories.nodes.map((tag) => ({
		label: tag.name,
		href: `/blog?category=${tag.slug}`,
	}))

	// Map related posts for the RelatedFeed component
	const relatedFeedPosts = relatedPosts.map((p) => ({
		href: `/blog/${p.slug}`,
		image: p.featuredImage?.node.sourceUrl || "/assets/photos/scenery/monastery/IMG_1575.webp",
		imageAlt: p.featuredImage?.node.altText || p.title,
		title: p.title,
		category: p.categories.nodes[0]?.name || "",
		excerpt: p.excerpt?.replace(/<[^>]*>/g, '').substring(0, 150) || "",
	}))

	return (
		<main className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 mt-17">
			<Headline
				title={post.title}
				category={post.categories.nodes[0]?.name}
				date={post.date}
				author={post.author.node.name}
				avatarUrl={post.author.node.avatar?.url}
				readingTime={getReadingTime(post.content)}
			/>
			<FeaturedImage
				src={post.featuredImage?.node.sourceUrl}
				alt={post.featuredImage?.node.altText || post.title}
			/>
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
				{/* Sidebar / Share */}
				<aside className="hidden lg:block lg:col-span-2 pt-4">
					<div className="sticky top-32 space-y-12">
						<SidebarShare title={post.title} />
					</div>
				</aside>

				{/* Main Content */}
				<article
					className={cn(
						"lg:col-span-7 prose prose-lg prose-stone max-w-none",
						"[&_iframe]:max-w-full [& _iframe]:w-full [&_iframe]:aspect-video [&_iframe]:h-auto [&_iframe]:rounded-sm"
					)}
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>

				{/* Tags Sidebar */}
				<aside className="lg:col-span-3">
					<RelatedTags tags={tags} />
				</aside>
			</div>

			{relatedFeedPosts.length > 0 && (
				<RelatedFeed posts={relatedFeedPosts} />
			)}

			<CTA />
		</main>
	)
}


