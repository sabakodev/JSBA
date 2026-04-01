import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('aboutPage.jurisdiction')

	return (
		<section className="max-w-7xl mx-auto px-8 py-32">
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
				<div className="relative group">
					<div
						className="absolute -inset-4 bg-primary-container/5 rounded-lg -rotate-2 group-hover:rotate-0 transition-transform duration-700">
					</div>
					<Image
						alt="Dignified portrait of an Orthodox bishop in traditional liturgical vestments, holding a staff."
						className="relative z-10 w-full aspect-4/5 object-cover rounded-lg parchment-glow sepia-[0.1]"
						src="/assets/photos/clergy/bishop-daniel-coat.jpeg"
						width={1024}
						height={1526}
					/>
				</div>
				<div>
					<span className="uppercase tracking-widest text-primary text-sm mb-6 block">{t('hierarchLabel')}</span>
					<h2 className="font-headline text-5xl mb-8">{t('bishop.name')}</h2>
					<p className="font-body text-lg text-on-surface-variant leading-relaxed mb-8 italic">
						&quot;{t('quote')}&quot;
					</p>
					<div className="bg-surface-container-high p-8 rounded border-l-4 border-primary">
						<h4 className="font-sans text-xs uppercase tracking-widest text-on-surface mb-2">{t('label')}
						</h4>
						<p className="font-body text-sm text-on-surface-variant">{t('hierarchScope')}</p>
					</div>
				</div>
			</div>
		</section>
	)
}