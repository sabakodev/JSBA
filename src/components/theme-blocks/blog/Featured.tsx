import { Link } from "@/i18n/nav"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

interface Props {
	href: string
	title: string
	excerpt: string
	image: string
	imageAlt: string
	publishedAt: Date
}

export default function Component({ href, title, excerpt, image, imageAlt, publishedAt }: Props) {
	const t = useTranslations('blogPage.featured')

	return (
		<Link href={href}>
			<section className="mb-24">
				<div
					className="relative group grid grid-cols-1 lg:grid-cols-12 gap-0 overflow-hidden rounded-lg bg-secondary-950 parchment-glow">
					<div className="lg:col-span-7 relative h-96 lg:h-125 overflow-hidden">
						<Image
							className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 sepia-[0.2]"
							alt={imageAlt}
							width={512}
							height={512}
							src={image} />
						<div className="absolute inset-0 bg-linear-to-r from-on-background/40 to-transparent"></div>
					</div>
					<div className="lg:col-span-5 p-12 flex flex-col justify-center space-y-6">
						<span className="text-xs uppercase tracking-[0.2em] text-primary font-bold">{t('label')}</span>
						<h2 className="text-4xl font-serif text-secondary leading-tight">{title}</h2>
						<p className="text-secondary font-body leading-relaxed">
							{excerpt}
						</p>
						<div className="flex items-center space-x-4 pt-4">
							<span className="text-xs uppercase tracking-widest text-outline">{publishedAt.toDateString()}</span>
							<div className="h-px w-8 bg-border/30"></div>
							<button
								className="text-primary text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform inline-flex items-center group">
								{t('ctaLabel')}
								<ArrowRight className="ml-2" size={12} />
							</button>
						</div>
					</div>
				</div>
			</section>
		</Link>
	)
}