'use client'

import { Link } from "@/i18n/nav"
import { Post } from "@/lib/graphql/queries/posts"
import { useTranslations } from "next-intl"
import Image from "next/image"

interface Props {
	data: Post
}

export default function Component({ data }: Props) {
	const t = useTranslations('blogPage.feed')

	const altText = data.featuredImage ? data.featuredImage.node.altText : 'Featured image unavailable'
	const sourceUrl = data.featuredImage ? data.featuredImage.node.sourceUrl : '/assets/photos/scenery/monastery/IMG_1575.webp'

	return (
		<Link href={`/blog/${data.slug}`}>
			<article className="flex flex-col space-y-6 group">
				<div className="aspect-5/4 overflow-hidden rounded-lg bg-surface-container">
					<Image
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sepia-[0.2]"
						alt={altText}
						width={512}
						height={512}
						src={sourceUrl} />
				</div>
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<div className="text-[10px] uppercase tracking-[0.2em] text-primary">{data.categories.nodes[0].name}</div>
						<span className="text-[10px] uppercase tracking-widest text-outline">{new Date(data.date).toDateString()}</span>
					</div>
					<h3
						className="text-2xl font-serif text-secondary leading-tight group-hover:text-primary transition-colors line-clamp-1">
						{data.title}
					</h3>
					<p className="text-sm text-secondary font-body leading-relaxed line-clamp-3" dangerouslySetInnerHTML={{ __html: data.excerpt }} />
					<button
						className="pt-2 text-xs uppercase tracking-widest text-primary border-b border-transparent group-hover:border-primary transition-all">
						{t('readMore')}
					</button>
				</div>
			</article>
		</Link>
	)
}