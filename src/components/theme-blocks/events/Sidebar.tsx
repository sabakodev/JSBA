import OrthodoxCross from "@/components/orthodox-cross"
import { Link } from "@/i18n/nav"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import {
	getUpcomingFeasts,
	getCurrentLiturgicalWeek,
} from "@/lib/utils"
import FeastCard from "./FeastCard"

export default function Component({ locale }: { locale: string }) {
	const t = useTranslations("eventPage.sidebar")

	const upcomingFeasts = getUpcomingFeasts(3, new Date(), ['great', 'major'])
	const currentWeek = getCurrentLiturgicalWeek()

	const currentWeekName = ({ default: currentWeek.name, id: currentWeek.nameId, el: currentWeek.nameEl })[locale] ?? currentWeek.name

	return (
		<aside className="lg:col-span-4 space-y-12">
			{/* <!-- Major Feast Days Card --> */}
			<div className="bg-secondary-950 p-10 parchment-glow relative border border-border/10">
				<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-surface px-4">
					<OrthodoxCross className="text-primary" />
				</div>
				<h2 className="text-2xl text-primary mb-4 text-center italic">
					{t("feast.major.label")}
				</h2>

				{/* Current Liturgical Week */}
				<div className="mb-8 py-3 px-4 bg-primary/5 border border-primary/10 rounded-sm text-center">
					<p className="text-[10px] uppercase tracking-[0.3em] text-secondary/60 mb-1">
						{t('feast.weekLabel')}
					</p>
					<p className="text-sm font-body font-bold text-on-surface">
						{currentWeekName}
					</p>
					{currentWeek.tone && (
						<p className="text-xs text-secondary/60 mt-1">
							Tone {currentWeek.tone}
						</p>
					)}
					{currentWeek.fasting && (
						<p className="text-[10px] uppercase tracking-widest text-primary mt-2">
							{currentWeek.fastingType}
						</p>
					)}
				</div>

				{/* Upcoming 3 Feasts */}
				<div className="space-y-8">
					{upcomingFeasts.map((feast, index) => (
						<FeastCard
							key={`${feast.julianDate?.month}-${feast.julianDate?.day}-${index}`}
							locale={locale}
							feast={feast}
							index={index}
						/>
					))}
				</div>

				<div className="mt-12 pt-8 border-t border-border/20 group">
					<Link
						href="/event/calendar"
						className="w-full font-label text-xs uppercase tracking-[0.2em] group-hover:text-primary transition-colors flex items-center justify-center gap-2"
					>
						{t("feast.major.cta")}
						<ArrowRight size={12} className="group-hover:translate-x-2 transition-transform duration-200" />
					</Link>
				</div>
			</div>

			{/* <!-- Recurring Services --> */}
			<div className="p-4">
				<h3 className="text-xl mb-6 italic">{t("services.label")}</h3>
				<ul className="space-y-6 text-sm">
					<li className="flex justify-between items-center border-b border-border/10 pb-4">
						<span className="font-label uppercase tracking-widest text-secondary">
							{t("services.wed")}
						</span>
						<span className="text-on-surface">18:00</span>
					</li>
					<li className="flex justify-between items-center border-b border-border/10 pb-4">
						<span className="font-label uppercase tracking-widest text-secondary">
							{t("services.fri")}
						</span>
						<span className="text-on-surface">19:00</span>
					</li>
					<li className="flex justify-between items-center border-b border-border/10 pb-4">
						<span className="font-label uppercase tracking-widest text-secondary">
							{t("services.sat")}
						</span>
						<span className="text-on-surface">18:00</span>
					</li>
					<li className="flex justify-between items-center border-b border-border/10 pb-4">
						<span className="font-label uppercase tracking-widest text-secondary">
							{t("services.sun")}
						</span>
						<span className="text-on-surface">10:00</span>
					</li>
				</ul>
			</div>

			{/* <!-- Newsletter Callout --> */}
			<div className="bg-primary/90 p-10 rounded-sm text-primary-foreground">
				<h3 className="text-2xl mb-4 italic">{t("cta.label")}</h3>
				<p className="text-primary-foreground/80 text-sm leading-relaxed mb-6">
					{t("cta.description")}
				</p>
				<div className="space-y-4">
					<input
						className="px-2 w-full bg-white/10 border-b border-white/30 text-white placeholder:text-white/50 py-2 text-sm focus:outline-none focus:border-white transition-colors duration-300"
						placeholder={t("cta.placeholder")}
						type="email"
					/>
					<button className="w-full bg-white text-primary py-3 rounded-xs text-xs font-label uppercase tracking-widest hover:bg-white transition-colors">
						{t("cta.button")}
					</button>
				</div>
			</div>
		</aside>
	)
}