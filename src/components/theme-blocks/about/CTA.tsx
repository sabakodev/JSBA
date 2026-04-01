import { Clock4, Coffee, Shirt } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('aboutPage.cta')

	return (
		<section className="max-w-7xl mx-auto px-8 py-32">
			<div className="bg-secondary p-1 md:p-2 rounded-xl">
				<div className="bg-white p-12 md:p-24 rounded-lg text-center relative overflow-hidden">
					{/* <!-- Background Decorative Cross --> */}
					<div
						className="absolute md:-bottom-20 left-1/2 -translate-x-1/2 opacity-[0.03] select-none pointer-events-none">
						<span className="text-[100px] md:text-[300px]">orthodox</span>
					</div>
					<h2 className="font-headline text-5xl md:text-6xl mb-8">{t('label')}</h2>
					<p className="font-body text-xl text-on-surface-variant max-w-2xl mx-auto mb-12">
						{t('description')}
					</p>
					<div className="flex flex-col md:flex-row items-center justify-center gap-6">
						<button
							className="bg-primary text-primary-foreground px-10 py-4 rounded font-label tracking-widest uppercase text-sm hover:scale-[1.02] transition-transform">
							{t('action.primary')}
						</button>
						<button
							className="bg-transparent border border-border/30 text-primary px-10 py-4 rounded font-label tracking-widest uppercase text-sm hover:bg-primary/5 transition-colors">
							{t('action.secondary')}
						</button>
					</div>
					<div
						className="mt-16 pt-16 border-t border-border/10 grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
						<div className="flex items-start space-x-4">
							<Clock4 className="text-primary" />
							<div>
								<h5 className="font-label font-bold text-xs uppercase tracking-widest mb-2">{t('when.label')}</h5>
								<p className="text-sm text-on-surface-variant">{t('when.description')}</p>
							</div>
						</div>
						<div className="flex items-start space-x-4">
							<Shirt className="text-primary" />
							<div>
								<h5 className="font-label font-bold text-xs uppercase tracking-widest mb-2">{t('what.label')}</h5>
								<p className="text-sm text-on-surface-variant">{t('what.description')}</p>
							</div>
						</div>
						<div className="flex items-start space-x-4">
							<Coffee className="text-primary" />
							<div>
								<h5 className="font-label font-bold text-xs uppercase tracking-widest mb-2">{t('fellowship.label')}</h5>
								<p className="text-sm text-on-surface-variant">{t('fellowship.description')}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}