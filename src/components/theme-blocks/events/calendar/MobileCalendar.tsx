"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Church, Leaf, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { FASTING_CONFIG, FEAST_TYPE_CONFIG } from "@/lib/utils/calendar"

// ──────────────────────────────────────
// Types
// ──────────────────────────────────────

interface CalendarDay {
	gregorianDate: { year: number; month: number; day: number }
	julianDate: { month: number; day: number }
	dayOfWeek: number // 0=Sun
	isToday: boolean
	feasts: {
		name: string
		type: "great" | "major" | "minor" | "fast" | "saint"
	}[]
	fasting: {
		active: boolean
		type: "strict" | "xerophagy" | "oil-wine" | "fish" | "dairy" | "regular" | "none"
	}
	tone?: number
}

// ──────────────────────────────────────
// Mock data generator (replace with real data)
// ──────────────────────────────────────

function generateMockMonth(year: number, month: number): CalendarDay[] {
	const daysInMonth = new Date(year, month, 0).getDate()
	const today = new Date()

	return Array.from({ length: daysInMonth }, (_, i) => {
		const day = i + 1
		const date = new Date(year, month - 1, day)
		const dow = date.getDay()

		const isWedFri = dow === 3 || dow === 5
		const isSunday = dow === 0

		// Mock feasts
		const feasts: CalendarDay["feasts"] = []
		if (day === 7) feasts.push({ name: "Nativity of the Theotokos", type: "great" })
		if (day === 14) feasts.push({ name: "Exaltation of the Holy Cross", type: "great" })
		if (day === 21) feasts.push({ name: "St. Jonah of Moscow", type: "saint" })
		if (day === 9) feasts.push({ name: "Ss. Joachim & Anna", type: "major" })

		return {
			gregorianDate: { year, month, day },
			julianDate: { month: month === 1 ? 12 : month - 1, day: ((day + 18) % 30) + 1 },
			dayOfWeek: dow,
			isToday:
				today.getFullYear() === year &&
				today.getMonth() + 1 === month &&
				today.getDate() === day,
			feasts,
			fasting: {
				active: isWedFri && !isSunday,
				type: isWedFri ? "regular" : "none",
			},
			tone: isSunday ? ((Math.floor(day / 7) % 8) + 1) : undefined,
		}
	})
}

// ──────────────────────────────────────
// Fasting indicator
// ──────────────────────────────────────

const FEAST_CONFIG: Record<string, { color: string; bg: string }> = {
	great: { color: "text-red-400", bg: "bg-red-400/10" },
	major: { color: "text-amber-400", bg: "bg-amber-400/10" },
	minor: { color: "text-blue-300", bg: "bg-blue-300/10" },
	fast: { color: "text-orange-400", bg: "bg-orange-400/10" },
	saint: { color: "text-emerald-400", bg: "bg-emerald-400/10" },
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
						isSunday && "text-red-400",
						isSaturday && "text-blue-300",
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
				{/* Julian date */}
				<p className="text-[10px] text-muted-foreground/60 tracking-wide">
					Julian: {day.julianDate.month}/{day.julianDate.day}
					{day.tone !== undefined && (
						<span className="ml-2 text-primary/60">Tone {day.tone}</span>
					)}
				</p>

				{/* Feasts */}
				{day.feasts.length > 0 ? (
					day.feasts.map((feast, i) => {
						const config = FEAST_CONFIG[feast.type]
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
								<span className={cn("truncate", config.color)}>
									{feast.name}
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

						{/* Tooltip */}
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

export default function MobileCalendar() {
	const today = new Date()
	const [year, setYear] = useState(today.getFullYear())
	const [month, setMonth] = useState(today.getMonth() + 1)

	const days = generateMockMonth(year, month)

	const goToPrev = () => {
		if (month === 1) {
			setMonth(12)
			setYear(year - 1)
		} else {
			setMonth(month - 1)
		}
	}

	const goToNext = () => {
		if (month === 12) {
			setMonth(1)
			setYear(year + 1)
		} else {
			setMonth(month + 1)
		}
	}

	const goToToday = () => {
		setYear(today.getFullYear())
		setMonth(today.getMonth() + 1)
	}

	const isCurrentMonth =
		year === today.getFullYear() && month === today.getMonth() + 1

	// Count fasting days
	const fastingDays = days.filter((d) => d.fasting.active).length
	const feastDays = days.filter((d) => d.feasts.length > 0).length

	return (
		<div className="max-w-lg mx-auto min-h-screen">
			{/* ── Header ── */}
			<div className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/20">
				<div className="flex items-center justify-between px-4 py-4">
					<button
						onClick={goToPrev}
						className="p-2 -m-2 hover:bg-accent rounded-sm transition-colors"
						aria-label="Previous month"
					>
						<ChevronLeft size={20} />
					</button>

					<div className="text-center">
						<h2 className="text-lg font-medium tracking-wide">
							{MONTH_NAMES[month - 1]} {year}
						</h2>
						{!isCurrentMonth && (
							<button
								onClick={goToToday}
								className="text-[10px] uppercase tracking-widest text-primary hover:text-primary/80 transition-colors mt-0.5"
							>
								Back to today
							</button>
						)}
					</div>

					<button
						onClick={goToNext}
						className="p-2 -m-2 hover:bg-accent rounded-sm transition-colors"
						aria-label="Next month"
					>
						<ChevronRight size={20} />
					</button>
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
						key={day.gregorianDate.day}
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
					{Object.entries(FASTING_CONFIG).filter(([k]) => k !== "none").map(([type, config]) => (
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