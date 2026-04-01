import OrthodoxCross from "@/components/orthodox-cross"
import { useTranslations } from "next-intl"

// Scripture & Tradition (Sacred Modernist Frame)
export default function Component() {
	const t = useTranslations('whyPage.scripture')

	return (
		<section className="py-32" >
			<div className="max-w-4xl mx-auto px-8 text-center relative">
				<div className="mb-12 flex justify-center">
					<OrthodoxCross className="opacity-30 text-primary" />
				</div>
				<h2 className="text-5xl mb-12">{t('title')}</h2>
				<div className="bg-secondary-950 p-12 md:p-20 relative rounded-lg overflow-hidden">
					<p className="font-serif italic text-3xl text-on-surface leading-relaxed relative z-10">
						&quot;{t('bible.quote')}&quot;
					</p>
					<p className="mt-8 font-label text-primary tracking-widest uppercase text-xs">{t('bible.source')}</p>
				</div>
				<div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 text-left">
					<div>
						<h3 className="text-3xl mb-4 text-primary">{t('notSola.title')}</h3>
						<p className="font-body text-on-surface-variant leading-relaxed">
							{t('notSola.description')}
						</p>
					</div>
					<div>
						<h3 className="text-3xl mb-4 text-primary">{t('orthopraxia.title')}</h3>
						<p className="font-body text-on-surface-variant leading-relaxed">
							{t('orthopraxia.description')}
						</p>
					</div>
				</div>
			</div>
		</section>
	)
}