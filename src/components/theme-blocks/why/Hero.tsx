import { Link } from "@/i18n/nav"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('whyPage.hero')

	return (
		<section className="relative min-h-217.5 flex items-center pt-20 overflow-hidden bg-surface">
			<div className="max-w-7xl mx-auto px-8 w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
				<div className="md:col-span-7 z-10">
					<h1 className="font-headline text-6xl md:text-8xl text-on-surface leading-tight -tracking-[0.02em] mb-8">
						{t.rich('title', {
							br: () => <br />,
							highlight: (chunks) => (
								<span className="italic text-primary-500">{chunks}</span>
							),
						})}
					</h1>
					<p className="font-body text-xl text-on-surface-variant max-w-xl leading-relaxed mb-10">
						{t('description')}
					</p>
					<div className="flex items-center space-x-6">
						<Link
							href="/contact"
							className="bg-primary text-primary-foreground px-8 py-4 rounded-sm text-sm font-label tracking-widest uppercase hover:opacity-90 transition-opacity">
							{t('cta.primary')}
						</Link>
						<Link
							href="https://www.instagram.com/orthodoxdepok/"
							className="text-primary border-b border-outline-variant pb-1 font-label text-sm tracking-widest uppercase hover:text-primary-container transition-colors">
							{t('cta.secondary')}
						</Link>
					</div>
				</div>
				<div className="md:col-span-5 relative">
					<div className="aspect-4/5 bg-surface-container-low rounded-lg overflow-hidden shadow-sm rotate-2">
						<Image
							width={400}
							height={500}
							loading="eager"
							alt="Orthodox Iconostasis"
							className="w-full h-full object-cover sepia-[0.2]"
							data-alt="Interior of an Orthodox church with golden iconostasis and soft candlelight reflecting off polished wood and sacred icons"
							src="/assets/photos/scenery/sacraments/IMG_1687.JPEG" />
					</div>
					<div
						className="absolute -bottom-8 -left-8 p-8 bg-white rounded-lg shadow-sm max-w-xs -rotate-2">
						<p className="font-serif italic text-primary text-xl leading-snug">
							&quot;{t('quote')}&quot;
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}