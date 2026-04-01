import { Link } from "@/i18n/nav"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

interface Post {
	href: string
	image: string
	imageAlt: string
	title: string
	category: string
	excerpt: string
}

interface Props {
	posts: Post[]
}

export default function Component({ posts }: Props) {
	const t = useTranslations('blogPage.post')

	return (
		<section className="mb-24 pt-24 border-t border-border/15">
			<div className="flex items-end justify-between mb-12">
				<div>
					<h2 className="font-headline text-4xl text-on-surface mb-2">{t('relatedPostLabel')}</h2>
					<p className="text-secondary opacity-60 font-body">{t('relatedPostDescription')}</p>
				</div>
				<Link
					className="flex items-center font-label text-xs uppercase tracking-widest text-primary font-bold hover:opacity-70 transition-opacity"
					href="/blog"
				>
					{t('relatedPostAllPost')}
					<ArrowRight className="ml-1" size={12} />
				</Link>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				{posts.map((post, index) => (
					<Card
						key={index}
						href={post.href}
						image={post.image}
						imageAlt={post.imageAlt}
						title={post.title}
						category={post.category}
						excerpt={post.excerpt}
					/>
				))}
			</div>
		</section>
	)
}

interface CardProps {
	href: string
	image: string
	imageAlt: string
	category: string
	title: string
	excerpt: string
}

export function Card({ href, image, imageAlt, category, title, excerpt }: CardProps) {
	return (
		<Link href={href} className="group cursor-pointer">
			<div className="aspect-4/3 rounded-lg overflow-hidden mb-6 bg-surface-container">
				<Image
					width={512}
					height={512}
					className="w-full h-full object-cover sepia-[0.2] transition-transform duration-500 group-hover:scale-105"
					alt={imageAlt}
					src={image} />
			</div>
			<span className="text-primary font-label text-[10px] uppercase tracking-[0.2em] font-bold">
				{category}
			</span>
			<h3 className="font-headline text-2xl text-on-surface mt-2 group-hover:text-primary transition-colors">
				{title}
			</h3>
			<p className="text-secondary text-sm mt-3 line-clamp-2">{excerpt}</p>
		</Link>
	)
}