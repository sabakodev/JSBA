import { Fish, Droplets, Milk, Wine, Wheat, Cross } from "lucide-react"
import { ResolvedFeast, LiturgicalWeek, getAllFeasts, gregorianToJulian, getCurrentLiturgicalWeek, resolveSaintSynaxarion } from "./julian-calendar"

interface DayCell {
	date: Date
	gregorian: { year: number; month: number; day: number }
	julian: { year: number; month: number; day: number }
	feasts: ResolvedFeast[]
	fasting: {
		active: boolean
		type: LiturgicalWeek["fastingType"]
		label: string
	}
	isToday: boolean
	isCurrentMonth: boolean
}

// ──────────────────────────────────────
// Fasting Config
// ──────────────────────────────────────

export const FASTING_CONFIG: Record<
	LiturgicalWeek["fastingType"],
	{ label: string; icon: typeof Fish; color: string; bg: string }
> = {
	strict: { label: "Strict Fast", icon: Cross, color: "text-red-700", bg: "bg-red-50" },
	xerophagy: { label: "Dry Eating", icon: Wheat, color: "text-amber-700", bg: "bg-amber-50" },
	"oil-wine": { label: "Oil & Wine", icon: Wine, color: "text-purple-700", bg: "bg-purple-50" },
	fish: { label: "Fish Allowed", icon: Fish, color: "text-blue-700", bg: "bg-blue-50" },
	dairy: { label: "Cheesefare", icon: Milk, color: "text-emerald-700", bg: "bg-emerald-50" },
	regular: { label: "Wed/Fri Fast", icon: Droplets, color: "text-slate-600", bg: "bg-slate-50" },
	none: { label: "", icon: Cross, color: "", bg: "" },
}

export const FEAST_TYPE_CONFIG = {
	great: { label: "Great Feast", color: "bg-red-600 text-white", border: "border-l-red-600" },
	major: { label: "Major Feast", color: "bg-amber-500 text-white", border: "border-l-amber-500" },
	minor: { label: "Minor Feast", color: "bg-sky-500 text-white", border: "border-l-sky-500" },
	fast: { label: "Fast Day", color: "bg-purple-600 text-white", border: "border-l-purple-600" },
	saint: { label: "Saint Commemoration", color: "bg-gray-600 text-white", border: "border-l-gray-400" },
}

export const JULIAN_MONTHS = [
	"Jan", "Feb", "Mar", "Apr", "May", "Jun",
	"Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

// ──────────────────────────────────────
// Get "today" in a specific timezone
// ──────────────────────────────────────

function getTodayInTimezone(timezone: string): { year: number; month: number; day: number } {
	const now = new Date()
	const parts = new Intl.DateTimeFormat("en-CA", {
		timeZone: timezone,
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
	}).formatToParts(now)

	const year = parseInt(parts.find((p) => p.type === "year")!.value)
	const month = parseInt(parts.find((p) => p.type === "month")!.value)
	const day = parseInt(parts.find((p) => p.type === "day")!.value)

	return { year, month, day }
}

// ──────────────────────────────────────
// Build Calendar Grid
// ──────────────────────────────────────

export function buildMonthGrid(year: number, month: number, timezone: string = "Asia/Jakarta"): DayCell[][] {
	const feasts = [
		...getAllFeasts(year - 1),
		...getAllFeasts(year),
		...getAllFeasts(year + 1),
		...resolveSaintSynaxarion(year - 1),
		...resolveSaintSynaxarion(year),
		...resolveSaintSynaxarion(year + 1),
	]

	const firstDay = new Date(year, month, 1)
	const startDay = firstDay.getDay() // 0=Sun

	// Start from the Sunday before (or on) the 1st
	const gridStart = new Date(year, month, 1 - startDay)

	const weeks: DayCell[][] = []
	const current = new Date(gridStart)

	// Compute "today" once, in the user's timezone
	const today = getTodayInTimezone(timezone)

	for (let week = 0; week < 6; week++) {
		const row: DayCell[] = []

		for (let dow = 0; dow < 7; dow++) {
			const date = new Date(current)
			const greg = {
				year: date.getFullYear(),
				month: date.getMonth() + 1,
				day: date.getDate(),
			}
			const julian = gregorianToJulian(greg.year, greg.month, greg.day)

			// Find feasts for this day (compare in Julian space)
			const dayFeasts = feasts.filter((f) => {
				if (f.source === 'fixed' && (f.type === 'major' || f.type === 'great')) {
					return f.civilVespersStart.month === greg.month && f.civilVespersStart.day === greg.day && f.civilVespersStart.year === greg.year
				}

				return f.julianDate.month === julian.month && f.julianDate.day === julian.day && f.julianDate.year === julian.year
			})

			// Get fasting info
			const litWeek = getCurrentLiturgicalWeek(date)
			const dayOfWeek = date.getDay()
			const isFastDay =
				litWeek.fasting ||
				dayOfWeek === 3 ||
				dayOfWeek === 5

			const isToday =
				greg.year === today.year &&
				greg.month === today.month &&
				greg.day === today.day

			row.push({
				date,
				gregorian: greg,
				julian,
				feasts: dayFeasts,
				fasting: {
					active: isFastDay && litWeek.fastingType !== "none",
					type: litWeek.fastingType,
					label: FASTING_CONFIG[litWeek.fastingType]?.label || "",
				},
				isToday,
				isCurrentMonth: date.getMonth() === month,
			})

			current.setDate(current.getDate() + 1)
		}

		weeks.push(row)

		// Stop if we've passed the current month entirely
		if (current.getMonth() > month && current.getFullYear() >= year) {
			// Keep at least 5 weeks, break after 6
			if (weeks.length >= 5) break
		}
	}

	return weeks
}