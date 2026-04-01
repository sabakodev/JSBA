import { useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('blogPage.hero')

	return (
		<header className="py-20 flex flex-col items-center text-center space-y-6">
			<h1 className="text-6xl md:text-7xl font-serif text-on-surface tracking-tight leading-none">
				{t('headline.primary')} <br />
				<span className="font-serif-italic text-primary">&amp; {t('headline.announcement')}</span>
			</h1>
			<p className="max-w-2xl text-lg text-secondary font-body leading-relaxed">
				{t('description')}
			</p>
			<div className="w-24 h-px bg-border/30 mt-8"></div>
		</header>
	)
}