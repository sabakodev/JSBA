import { Link } from "@/i18n/nav"
import { Post } from "@/lib/graphql/queries/posts"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

interface Props {
	post: Post
}

// ── Format date deterministically (UTC) ──
function formatPostDate(dateString: string): string {
	const date = new Date(dateString)
	return date.toLocaleDateString("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}

export default function Component({ post }: Props) {
	const t = useTranslations('blogPage.featured')

	const altText = post.featuredImage
		? post.featuredImage.node.altText
		: 'Featured image unavailable'
	const sourceUrl = post.featuredImage
		? post.featuredImage.node.sourceUrl
		: '/assets/photos/scenery/monastery/IMG_1575.webp'

	// ── Strip wrapping <p> tags from WordPress excerpt ──
	const cleanExcerpt = post.excerpt
		?.replace(/<p>/gi, "")
		?.replace(/<\/p>/gi, "")
		?.replace(/\n/g, " ")
		?.trim() ?? ""

	return (
		<Link href={`/blog/${post.slug}`}>
			<section className="mb-24">
				<div className="relative group grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-lg bg-secondary-950 parchment-glow">
					<div className="lg:col-span-7 relative h-96 lg:h-125 overflow-hidden">
						<Image
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sepia-[0.2]"
							alt={altText}
							width={512}
							height={512}
							src={sourceUrl}
						/>
						<div className="absolute inset-0 bg-linear-to-r from-on-background/40 to-transparent" />
					</div>
					<div className="lg:col-span-5 p-12 flex flex-col justify-center space-y-6">
						<span className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
							{t('label')}
						</span>
						<h2 className="text-4xl font-serif text-secondary leading-tight line-clamp-2">
							{post.title}
						</h2>

						<div
							className="text-secondary font-body leading-relaxed line-clamp-3"
							dangerouslySetInnerHTML={{ __html: cleanExcerpt }}
						/>

						<div className="flex items-center space-x-4 pt-4">
							<span className="text-xs uppercase tracking-widest text-outline">
								{formatPostDate(post.date)}
							</span>
							<div className="h-px w-8 bg-border/30" />
							<button className="text-primary text-sm uppercase tracking-widest inline-flex items-center group">
								{t('ctaLabel')}
								<ArrowRight
									className="ml-2 group-hover:translate-x-1 transition-transform"
									size={12}
								/>
							</button>
						</div>
					</div>
				</div>
			</section>
		</Link>
	)
}