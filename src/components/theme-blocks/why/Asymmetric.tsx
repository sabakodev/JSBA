import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('whyPage.foundation')

	return (
		<section className="py-24 bg-accent">
			<div className="max-w-7xl mx-auto px-8">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
					<div>
						<span
							className="font-label text-primary uppercase tracking-[0.2em] text-xs mb-4 block">{t('label')}</span>
						<h2 className="font-headline text-5xl text-on-surface mb-8">{t('title')}</h2>
						<div className="space-y-6 font-body text-lg leading-relaxed">
							<p>
								{t('definition')}
							</p>
							<p>
								{t('purpose')}
							</p>
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="space-y-4">
							<div className="bg-white p-1 rounded-lg parchment-glow">
								<Image loading="lazy" width={300} height={300} alt="Eastern Orthodox cross" className="rounded aspect-square object-cover"
									data-alt="Detailed close up of an ornate ancient hand-carved wooden cross textures"
									src="/assets/photos/scenery/monastery/ksenia-obukhova-afgY7qlAM_0-unsplash.jpg" />
							</div>
							<div className="bg-white p-6 rounded-lg parchment-glow">
								<h4 className="font-headline text-2xl text-primary mb-2">{t('unbroken.title')}</h4>
								<p className="font-body text-sm">{t('unbroken.description')}</p>
							</div>
						</div>
						<div className="space-y-4 pt-12">
							<div className="bg-white p-6 rounded-lg parchment-glow">
								<h4 className="font-headline text-2xl text-primary mb-2">{t('universal.title')}</h4>
								<p className="font-body text-sm">{t('universal.description')}</p>
							</div>
							<div className="bg-white p-1 rounded-lg parchment-glow">
								<Image loading="lazy" width={300} height={400} alt="Censer" className="rounded aspect-3/4 object-cover sepia-[0.2]"
									data-alt="Brass incense burner with delicate smoke rising in a dimly lit cathedral with rays of light"
									src="/assets/photos/scenery/monastery/andriy-tod-3TC586O9Q0U-unsplash.jpg" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}