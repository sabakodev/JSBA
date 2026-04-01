import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('whyPage.pastor')

	return (
		<section className="py-24 bg-surface-container-low overflow-hidden">
			<div className="max-w-7xl mx-auto px-8 relative">
				<div className="absolute top-0 right-0 w-96 h-96 bg-primary opacity-5 rounded-full blur-[100px] -mr-48 -mt-48">
				</div>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
					<div className="md:col-span-5 order-2 md:order-1">
						<div className="relative">
							<Image alt="Candle lighting"
								width={300}
								height={400}
								className="rounded-lg parchment-glow w-full aspect-3/4 object-cover sepia-[0.2]"
								data-alt="Close up of hands lighting a beeswax candle in a dark church with numerous flickering candle flames in background"
								src="/assets/photos/scenery/city/IMG_1750_uncropped.JPEG" />
						</div>
					</div>
					<div className="md:col-span-7 order-1 md:order-2">
						<span className="font-label text-primary uppercase tracking-[0.2em] text-xs mb-4 block">
							{t('label')}
						</span>
						<h2 className="text-5xl text-on-surface mb-8">{t('title')}</h2>
						<div className="space-y-10">
							<div className="flex gap-6">
								<span className="font-serif text-4xl text-primary-500/30">01</span>
								<div>
									<h4 className="text-2xl text-on-surface mb-2">{t('experience.title')}</h4>
									<p className="font-body text-on-surface-variant leading-relaxed">
										{t('experience.description')}
									</p>
								</div>
							</div>
							<div className="flex gap-6">
								<span className="font-serif text-4xl text-primary-500/30">02</span>
								<div>
									<h4 className="text-2xl text-on-surface mb-2">{t('liturgy.title')}</h4>
									<p className="font-body text-on-surface-variant leading-relaxed">
										{t('liturgy.description')}
									</p>
								</div>
							</div>
							<div className="flex gap-6">
								<span className="font-serif text-4xl text-primary-500/30">03</span>
								<div>
									<h4 className="text-2xl text-on-surface mb-2">{t('potluck.title')}</h4>
									<p className="font-body text-on-surface-variant leading-relaxed">
										{t('potluck.description')}
									</p>
								</div>
							</div>
						</div>
						<div className="mt-12 bg-white p-8 border-l-4 border-primary">
							<p className="font-body italic text-on-surface-variant">
								&quot;{t('dressCode')}&quot;
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}