import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('contactPage.hero')

	return (
		<section className="relative h-153.5 flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 z-0">
				<Image
					alt="Orthodox Sanctuary"
					width={400}
					height={400}
					className="w-full h-full object-cover sepia-[0.2]"
					data-alt="atmospheric interior of an orthodox church with warm candlelight reflecting off wooden cross with dim sunlight scattered peeking through window"
					loading="eager"
					src="/assets/photos/scenery/city/IMG_1750.JPEG" />
				<div className="absolute inset-0 bg-secondary-100/60 backdrop-blur-sm"></div>
			</div>
			<div className="relative z-10 text-center px-6">
				<h1 className="text-5xl md:text-7xl font-headline text-white tracking-tight mb-4">
					{t('title')}
				</h1>
				<p
					className="text-xl md:text-2xl font-serif italic text-secondary-950 max-w-2xl mx-auto opacity-90">
					&quot;{t('subtitle')}&quot;
				</p>
			</div>
		</section>
	)
}