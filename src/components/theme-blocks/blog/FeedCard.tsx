import { Link } from "@/i18n/nav"
import { useTranslations } from "next-intl"
import Image from "next/image"

interface Props {
	href: string
	title: string
	category: string
	excerpt: string
	image: string
	imageAlt: string
	publishedAt: Date
}

export default function Component({ href, title, category, excerpt, image, imageAlt, publishedAt }: Props) {
	const t = useTranslations('blogPage.feed')

	return (
		<Link href={href}>
			<article className="flex flex-col space-y-6 group">
				<div className="aspect-4/5 overflow-hidden rounded-lg bg-surface-container">
					<Image
						className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sepia-[0.2]"
						alt={imageAlt}
						width={512}
						height={512}
						src={image} />
				</div>
				<div className="space-y-3">
					<div className="flex justify-between items-center">
						<span className="text-[10px] uppercase tracking-[0.2em] text-primary">{category}</span>
						<span className="text-[10px] uppercase tracking-widest text-outline">{publishedAt.toDateString()}</span>
					</div>
					<h3
						className="text-2xl font-serif text-secondary leading-tight group-hover:text-primary transition-colors">
						{title}
					</h3>
					<p className="text-sm text-secondary font-body leading-relaxed line-clamp-3">
						{excerpt}
					</p>
					<button
						className="pt-2 text-xs uppercase tracking-widest text-primary border-b border-transparent group-hover:border-primary transition-all">
						{t('readMore')}
					</button>
				</div>
			</article>
		</Link>
	)
}