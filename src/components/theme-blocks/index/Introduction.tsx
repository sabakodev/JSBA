import { useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('indexPage.introduction')

	return (
		<section className="mb-32 grid grid-cols-12 gap-8 items-center">
			<div className="col-span-1 md:col-span-2">
				<div className="h-px bg-border/30 w-full"></div>
			</div>
			<div className="col-span-10 md:col-span-6">
				<h2 className="text-3xl italic text-primary mb-6">{t('label')}</h2>
				<p className="text-lg text-on-surface-variant font-body leading-relaxed">
					{t('description')}
				</p>
			</div>
		</section>
	)
}