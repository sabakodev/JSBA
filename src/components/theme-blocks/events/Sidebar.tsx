import OrthodoxCross from "@/components/orthodox-cross"
import { Link } from "@/i18n/nav"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import {
	getUpcomingFeasts,
	getCurrentLiturgicalWeek,
	julianToGregorian,
	CalendarFeast,
} from "@/lib/utils"

export default function Component() {
	const t = useTranslations("eventPage.sidebar")

	const upcomingFeasts = getUpcomingFeasts(4)
	const currentWeek = getCurrentLiturgicalWeek()

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
						Current Week
					</p>
					<p className="text-sm font-body font-bold text-on-surface">
						{currentWeek.name}
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
							feast={feast}
							index={index}
						/>
					))}
				</div>

				<div className="mt-12 pt-8 border-t border-border/20">
					<Link
						href="#"
						className="w-full font-label text-xs uppercase tracking-[0.2em] text-on-surface hover:text-primary transition-colors flex items-center justify-center gap-2"
					>
						{t("feast.major.cta")}
						<ArrowRight size={12} />
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
						className="px-2 w-full bg-white/10 border-b border-white/30 text-white placeholder:text-white/50 py-2 text-sm focus:outline-none focus:border-white transition-colors"
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

interface FeastCardProps {
	feast: CalendarFeast
	index: number
}

export function FeastCard({ feast, index }: FeastCardProps) {
	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December",
	]

	if (!feast.julianDate) return

	const gregorianDate = julianToGregorian(
		new Date().getFullYear(),
		feast.julianDate?.month,
		feast.julianDate?.day
	)
	const day = feast.gregorianDate.day
	const month = monthNames[feast.gregorianDate.month - 1]
	const julianDay = feast.julianDate.day
	const julianMonth = monthNames[feast.julianDate.month - 1]
	const isNextUp = index === 0

	return (
		<div
			className={`flex items-start gap-4 group ${index >= 2 ? "opacity-50" : ""
				}`}
		>
			<div
				className={`w-10 h-10 shrink-0 flex items-center justify-center font-serif ${isNextUp
					? "bg-primary/10 text-primary"
					: "bg-border/20 text-secondary"
					}`}
			>
				{String(day).padStart(2, "0")}
			</div>
			<div>
				<h4 className="font-body font-bold text-sm">
					{feast.name}
				</h4>
				<p className="text-xs text-secondary/60 uppercase tracking-widest mt-1">
					{month} {day} <span className="text-secondary/40">({julianMonth} {julianDay})</span>
				</p>
				{isNextUp && (
					<span className="inline-block mt-2 text-[10px] uppercase tracking-widest text-primary bg-primary/5 px-2 py-0.5 rounded-full">
						Next Feast
					</span>
				)}
				{feast.fasting && (
					<span className="inline-block mt-2 ml-2 text-[10px] uppercase tracking-widest text-secondary/40 bg-secondary/5 px-2 py-0.5 rounded-full">
						Fast Day
					</span>
				)}
			</div>
		</div>
	)
}