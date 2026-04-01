import OrthodoxCross from "@/components/orthodox-cross"
import { Link } from "@/i18n/nav"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('eventPage.sidebar')

	return (
		<aside className="lg:col-span-4 space-y-12">
			{/* <!-- Major Feast Days Card --> */}
			<div className="bg-secondary-950 p-10 parchment-glow relative border border-border/10">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-4">
					<OrthodoxCross className="text-primary" />
				</div>
				<h2 className="text-2xl text-primary mb-8 text-center italic">{t('feast.major.label')}</h2>
				<div className="space-y-8">
					<div className="flex items-start gap-4 group">
						<div
							className="w-10 h-10 shrink-0 bg-primary/10 flex items-center justify-center font-serif text-primary">
							08</div>
						<div>
							<h4 className="font-body font-bold text-sm">Nativity of the Theotokos</h4>
							<p className="text-xs text-secondary/60 uppercase tracking-widest mt-1">September 8</p>
						</div>
					</div>
					<div className="flex items-start gap-4 group">
						<div
							className="w-10 h-10 shrink-0 bg-primary/10 flex items-center justify-center font-serif text-primary">
							14</div>
						<div>
							<h4 className="font-body font-bold text-sm">Exaltation of the Holy Cross</h4>
							<p className="text-xs text-secondary/60 uppercase tracking-widest mt-1">September 14</p>
						</div>
					</div>
					<div className="flex items-start gap-4 group opacity-50">
						<div
							className="w-10 h-10 shrink-0 bg-border/20 flex items-center justify-center font-serif">
							21</div>
						<div>
							<h4 className="font-body font-bold text-sm">Entry into the Temple</h4>
							<p className="text-xs text-secondary/60 uppercase tracking-widest mt-1">November 21</p>
						</div>
					</div>
				</div>
				<div className="mt-12 pt-8 border-t border-border/20">
					<Link
						href="#"
						className="w-full font-label text-xs uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-colors flex items-center justify-center gap-2">
						{t('feast.major.cta')}
						<ArrowRight size={12} />
					</Link>
				</div>
			</div>
			{/* <!-- Recurring Services --> */}
			<div className="p-4">
				<h3 className="text-xl mb-6 italic">{t('services.label')}</h3>
				<ul className="space-y-6 text-sm">
					<li className="flex justify-between items-center border-b border-border/10 pb-4">
						<span className="font-label uppercase tracking-widest text-secondary">{t('services.wed')}</span>
						<span className="text-on-surface">18:00</span>
					</li>
					<li className="flex justify-between items-center border-b border-border/10 pb-4">
						<span className="font-label uppercase tracking-widest text-secondary">{t('services.fri')}</span>
						<span className="text-on-surface">19:00</span>
					</li>
					<li className="flex justify-between items-center border-b border-border/10 pb-4">
						<span className="font-label uppercase tracking-widest text-secondary">{t('services.sat')}</span>
						<span className="text-on-surface">18:00</span>
					</li>
					<li className="flex justify-between items-center border-b border-border/10 pb-4">
						<span className="font-label uppercase tracking-widest text-secondary">{t('services.sun')}</span>
						<span className="text-on-surface">10:00</span>
					</li>
				</ul>
			</div>
			{/* <!-- Newsletter Callout --> */}
			<div className="bg-primary/90 p-10 rounded-sm text-primary-foreground">
				<h3 className="text-2xl mb-4 italic">{t('cta.label')}</h3>
				<p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
					{t('cta.description')}
				</p>
				<div className="space-y-4">
					<input
						className="px-2 w-full bg-white/10 border-b border-white/30 text-white placeholder:text-white/50 py-2 text-sm focus:outline-none focus:border-white transition-colors"
						placeholder={t('cta.placeholder')} type="email" />
					<button
						className="w-full bg-white text-primary py-3 rounded-xs text-xs font-label uppercase tracking-widest hover:bg-white transition-colors">
						{t('cta.button')}
					</button>
				</div>
			</div>
		</aside>
	)
}