"use client"

import { useMemo } from "react"
import { ChevronLeft, ChevronRight, Church, Leaf, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import {
	buildMonthGrid,
	FASTING_CONFIG,
	FEAST_TYPE_CONFIG,
	JULIAN_MONTHS,
} from "@/lib/utils/calendar"
import { getCurrentLiturgicalWeek } from "@/lib/utils/julian-calendar"
import { Link } from "@/i18n/nav"

// ──────────────────────────────────────
// Flatten grid into day list
// ──────────────────────────────────────

interface CalendarDay {
	gregorianDate: { year: number; month: number; day: number }
	julianDate: { year: number; month: number; day: number }
	dayOfWeek: number
	isToday: boolean
	isCurrentMonth: boolean
	feasts: {
		name: string
		type: "great" | "major" | "minor" | "fast" | "saint"
	}[]
	fasting: {
		active: boolean
		type: "strict" | "xerophagy" | "oil-wine" | "fish" | "dairy" | "regular" | "none"
		label: string
	}
	tone?: number
	weekName?: string
}

/**
 * Converts the grid-based month data into a flat list of CalendarDay,
 * filtered to only include days in the target month.
 */
function buildMonthDays(year: number, month: number, locale: string): CalendarDay[] {
	// month is 1-based here, buildMonthGrid expects 0-based month index
	const weeks = buildMonthGrid(year, month)

	const days: CalendarDay[] = []

	for (const week of weeks) {
		for (const cell of week) {
			// Only include days that belong to the current month
			if (!cell.isCurrentMonth) continue

			const date = cell.date
			const dow = date.getDay()

			// Get liturgical week info for tone & week name
			const litWeek = getCurrentLiturgicalWeek(date)

			days.push({
				gregorianDate: cell.gregorian,
				julianDate: cell.julian,
				dayOfWeek: dow,
				isToday: cell.isToday,
				isCurrentMonth: cell.isCurrentMonth,
				feasts: cell.feasts.map((f) => ({
					name: f.name,
					type: f.type,
				})),
				fasting: {
					active: cell.fasting.active,
					type: cell.fasting.type,
					label: cell.fasting.label,
				},
				// Tone shows on Sundays
				tone: dow === 0 ? litWeek.tone : undefined,
				// Week name shows on Sundays
				weekName: dow === 0 ? ({ default: litWeek.name, id: litWeek.nameId, el: litWeek.nameEl })[locale] : undefined,
			})
		}
	}

	return days
}

// ──────────────────────────────────────
// Config
// ──────────────────────────────────────

const FEAST_COLOR: Record<string, { color: string; bg: string }> = {
	great: { color: "text-red-600", bg: "bg-red-50" },
	major: { color: "text-amber-600", bg: "bg-amber-50" },
	minor: { color: "text-blue-500", bg: "bg-blue-50" },
	fast: { color: "text-orange-600", bg: "bg-orange-50" },
	saint: { color: "text-emerald-600", bg: "bg-emerald-50" },
}

const DOW_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

const MONTH_NAMES = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
]

// ──────────────────────────────────────
// Day Row Component
// ──────────────────────────────────────

function DayRow({ day }: { day: CalendarDay }) {
	const isSunday = day.dayOfWeek === 0
	const isSaturday = day.dayOfWeek === 6
	const fastConfig = day.fasting.active ? FASTING_CONFIG[day.fasting.type] : null

	return (
		<div
			className={cn(
				"flex items-start gap-3 px-4 py-3 border-b border-border/10 transition-colors",
				day.isToday && "bg-primary/5 border-l-2 border-l-primary",
				isSunday && "bg-accent/30",
			)}
		>
			{/* ── Date column ── */}
			<div className="flex flex-col items-center w-12 shrink-0">
				<span
					className={cn(
						"text-lg font-medium leading-none",
						day.isToday && "text-primary",
						isSunday && "text-red-600",
						isSaturday && "text-blue-400",
					)}
				>
					{day.gregorianDate.day}
				</span>
				<span
					className={cn(
						"text-[10px] uppercase tracking-wider mt-1",
						isSunday ? "text-red-400/70" : "text-muted-foreground",
					)}
				>
					{DOW_NAMES[day.dayOfWeek]}
				</span>
			</div>

			{/* ── Content column ── */}
			<div className="flex-1 min-w-0 space-y-1">
				{/* Julian date & tone */}
				<p className="text-[10px] text-muted-foreground/60 tracking-wide">
					{JULIAN_MONTHS[day.julianDate.month - 1]} {day.julianDate.day}
					{day.tone !== undefined && (
						<span className="ml-2 text-primary/60">· Tone {day.tone}</span>
					)}
				</p>

				{/* Sunday liturgical week name */}
				{day.weekName && (
					<p className="text-[10px] text-primary/50 tracking-wide italic">
						{day.weekName}
					</p>
				)}

				{/* Feasts */}
				{day.feasts.length > 0 ? (
					day.feasts.map((feast, i) => {
						const config = FEAST_COLOR[feast.type]
						return (
							<div
								key={i}
								className={cn(
									"flex items-center gap-2 text-sm rounded-sm px-2 py-1 -mx-2",
									config.bg,
								)}
							>
								{feast.type === "great" ? (
									<Star size={12} className={cn(config.color, "shrink-0 fill-current")} />
								) : feast.type === "saint" ? (
									<Church size={12} className={cn(config.color, "shrink-0")} />
								) : (
									<Star size={12} className={cn(config.color, "shrink-0")} />
								)}
								<span className={cn("line-clamp-3", config.color)}>
									{
										feast.type === "saint" ?
											<ul className="list-disc">
												{
													feast.name.split(';').map((s => (
														<li key={s}>{s}</li>
													)))
												}
											</ul> :
											feast.name
									}
								</span>
							</div>
						)
					})
				) : (
					<p className="text-sm text-muted-foreground/40 italic">
						No feasts
					</p>
				)}
			</div>

			{/* ── Fasting indicator ── */}
			<div className="shrink-0 w-8 flex justify-center pt-0.5">
				{fastConfig && (
					<div className="relative group">
						<fastConfig.icon size={14} className={fastConfig.color} />
						<div className="absolute right-0 top-6 bg-popover text-popover-foreground text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
							{fastConfig.label}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

// ──────────────────────────────────────
// Month Calendar
// ──────────────────────────────────────

interface Props {
	year: number
	month: number
	locale: string
}

export default function MobileCalendar({ locale, year, month }: Props) {
	const today = new Date()

	// Memoize to avoid recomputing on every render
	const days = useMemo(() => buildMonthDays(year, month, locale), [year, month, locale])

	const targetD = (d: number) => {
		const targetDate = new Date(year, month + d, 1)

		return `/event/calendar/${targetDate.getFullYear()}/${targetDate.getMonth() + 1}`
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const prevMonth = useMemo(() => targetD(-1), [])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const nextMonth = useMemo(() => targetD(+1), [])
	const goToday = `/event/calendar`

	const isCurrentMonth =
		year === today.getFullYear() && month === today.getMonth()

	// Stats
	const fastingDays = days.filter((d) => d.fasting.active).length
	const feastDays = days.filter((d) => d.feasts.length > 0).length

	return (
		<div className="max-w-lg mx-auto min-h-screen relative md:hidden">
			{/* ── Header ── */}
			<div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/20">
				<div className="flex items-center justify-between px-4 py-4">
					<Link
						href={prevMonth}
						className="p-2 -m-2 hover:bg-accent rounded-sm transition-colors"
						aria-label="Previous month"
					>
						<ChevronLeft size={20} />
					</Link>

					<div className="text-center">
						<h2 className="text-lg font-medium tracking-wide">
							{MONTH_NAMES[month]} {year}
						</h2>
						{!isCurrentMonth && (
							<Link
								href={goToday}
								className="text-[10px] uppercase tracking-widest text-primary hover:text-primary/80 transition-colors mt-0.5"
							>
								Back to today
							</Link>
						)}
					</div>

					<Link
						href={nextMonth}
						className="p-2 -m-2 hover:bg-accent rounded-sm transition-colors"
						aria-label="Next month"
					>
						<ChevronRight size={20} />
					</Link>
				</div>

				{/* ── Month stats ── */}
				<div className="flex items-center justify-center gap-6 px-4 pb-3 text-[10px] uppercase tracking-widest text-muted-foreground">
					<span className="flex items-center gap-1.5">
						<Star size={10} className="text-amber-400 fill-amber-400" />
						{feastDays} feasts
					</span>
					<span className="flex items-center gap-1.5">
						<Leaf size={10} className="text-orange-400" />
						{fastingDays} fasting days
					</span>
				</div>
			</div>

			{/* ── Day rows ── */}
			<div className="divide-y divide-border/5">
				{days.map((day) => (
					<DayRow
						key={`${day.gregorianDate.year}-${day.gregorianDate.month}-${day.gregorianDate.day}`}
						day={day}
					/>
				))}
			</div>

			{/* ── Legend ── */}
			<div className="px-4 py-8 space-y-4 border-t border-border/20">
				<h3 className="text-sm uppercase tracking-widest text-muted-foreground">
					Legend
				</h3>

				<div className="grid grid-cols-2 gap-2">
					{Object.entries(FEAST_TYPE_CONFIG).map(([key, val]) => (
						<span key={key} className="flex items-center gap-2 text-xs">
							<span className={cn("w-2 h-2 rounded-sm", val.color)} />
							<span className="text-muted-foreground capitalize">{val.label}</span>
						</span>
					))}
				</div>

				<div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/10">
					{Object.entries(FASTING_CONFIG)
						.filter(([k]) => k !== "none")
						.map(([type, config]) => (
							<div key={type} className="flex items-center gap-2 text-xs">
								<config.icon size={10} className={config.color} />
								<span className="text-muted-foreground">{config.label}</span>
							</div>
						))}
				</div>
			</div>
		</div>
	)
}