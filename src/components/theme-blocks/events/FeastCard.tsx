import { ResolvedFeast, cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface FeastCardProps {
	feast: ResolvedFeast
	locale: string
	index: number
	year?: boolean
}

export default function FeastCard({ feast, locale, index, year }: FeastCardProps) {
	const t = useTranslations("eventPage.sidebar.feast")

	const monthNames = [
		"January", "February", "March", "April", "May", "June",
		"July", "August", "September", "October", "November", "December",
	]

	// Unified display date: vespers start for fixed, gregorian for moveable
	const displayDate = feast.source === "fixed"
		? feast.civilVespersStart
		: feast.gregorianDate

	const day = displayDate.day
	const month = monthNames[displayDate.month - 1]
	const displayYear = displayDate.year

	const julianDay = feast.julianDate.day
	const julianMonth = monthNames[feast.julianDate.month - 1]

	const isNextUp = index === 0

	const name = ({ default: feast.name, id: feast.nameId, el: feast.nameEl })[locale] ?? feast.name

	return (
		<div
			className={cn(
				`flex items-start gap-4 group`,
				(!year && !isNextUp) ? "opacity-50" : "",
				year && 'flex-col border rounded-sm p-2 border-secondary-800'
			)}
		>
			<div
				className="w-10 h-10 shrink-0 flex items-center justify-center font-serif bg-primary/20 text-primary"
			>
				{String(day).padStart(2, "0")}
			</div>
			<div>
				<h4 className="font-body font-bold text-sm">
					{name}
				</h4>
				<p className="text-xs text-secondary/60 uppercase tracking-widest mt-1">
					{month} {day} {year && displayYear}
					<span className={cn(
						"text-secondary/40",
						year && 'hidden'
					)}>
						({julianMonth} {julianDay})
					</span>
					<span className={cn(
						"text-secondary/25 font-extrabold",
						year ? 'block' : 'hidden'
					)}>
						{julianMonth} {julianDay}
					</span>
				</p>
				{isNextUp && (
					<span className="inline-block mt-2 text-[10px] uppercase tracking-widest text-primary-foreground bg-primary px-2 py-0.5 rounded-full">
						{t('next')}
					</span>
				)}
				{feast.fasting && (
					<span className="inline-block mt-2 ml-2 text-[10px] uppercase tracking-widest text-secondary-foreground bg-tertiary-500 px-2 py-0.5 rounded-full">
						{t('fastDay')}
					</span>
				)}
			</div>
		</div>
	)
}