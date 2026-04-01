import { Infinity } from "lucide-react"
import { useTranslations } from "next-intl"


export default function Component() {
	const t = useTranslations('blogPage.cta')

	return (
		<section className="mb-24 p-12 md:p-20 bg-secondary-950 rounded-lg text-center relative overflow-hidden">
			<div className="absolute inset-0 opacity-5 pointer-events-none">
				<Infinity className="text-primary absolute -bottom-20 -left-20" size={400} />
			</div>
			<div className="relative z-10 max-w-2xl mx-auto">
				<h2 className="text-4xl text-secondary-400 mb-6 italic">{t('title')}</h2>
				<p className="text-secondary-400 mb-10 text-lg leading-relaxed">
					{t('subtitle')}
				</p>
				<form className="flex flex-col md:flex-row gap-4">
					<input
						className="flex-1 bg-transparent border-b border-border/30 text-secondary-400 p-4 focus:outline-none focus:border-primary transition-colors"
						placeholder={t('placeholder')} type="email" />
					<button
						className="bg-linear-to-br from-primary to-primary-500 hover:from-primary-500 text-primary-foreground px-10 py-4 rounded-sm font-bold tracking-widest text-xs uppercase transition active:scale-95">
						{t('actionButtonLabel')}
					</button>
				</form>
			</div>
		</section>
	)
}