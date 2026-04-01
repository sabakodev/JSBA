import { Link } from "@/i18n/nav"
import { useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('aboutPage.mission')

	return (
		<section className="max-w-7xl mx-auto px-8 py-24 md:py-32">
			<div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
				<div className="md:col-span-7">
					<h2 className="text-4xl mb-8 italic text-primary">{t('title')}</h2>
					<p className="text-xl leading-relaxed text-on-surface-variant mb-12">
						{t('content')}
					</p>
					<Link href="/why" className="flex items-center space-x-4 group cursor-pointer">
						<span className="w-12 h-px bg-primary group-hover:w-20 transition-all duration-500"></span>
						<span className="uppercase tracking-widest text-primary text-sm">{t('ctaLabel')}</span>
					</Link>
				</div>
				<div className="md:col-span-5 bg-surface-container-low p-12 rounded-lg">
					<div className="mb-8">
						<h3 className="font-sans text-xs uppercase tracking-[0.2em] text-outline mb-4">{t('mission.label')}</h3>
						<p className="font-headline text-2xl italic">{t('mission.content')}</p>
					</div>
					<div className="pt-8 border-t border-outline-variant/20">
						<h3 className="font-sans text-xs uppercase tracking-[0.2em] text-outline mb-4">{t('vision.label')}</h3>
						<p className="font-headline text-2xl italic">{t('vision.content')}</p>
					</div>
				</div>
			</div>
		</section>
	)
}