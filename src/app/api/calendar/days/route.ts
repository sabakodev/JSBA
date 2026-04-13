import { CACHE_WEEKLY } from "@/lib/utils"
import { buildMonthGrid, DayCell } from "@/lib/utils/calendar"
import { NextRequest, NextResponse } from "next/server"

interface DayResponse {
	gregorianDateUTC: Date
	gregorianDate: string
	julian: DayCell['julian']
	feast: DayCell['feasts']
	fasting: DayCell['fasting']
}

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams

		// Expect ?month=2026-04 or defaults to current month
		const monthParam = query.get('month')

		let year: number
		let month: number

		if (monthParam) {
			const match = monthParam.match(/^(\d{4})-(\d{2})$/)
			if (!match) {
				return NextResponse.json(
					{ error: "Invalid format. Use YYYY-MM" },
					{ status: 400 }
				)
			}
			year = parseInt(match[1])
			month = parseInt(match[2]) - 1 // Convert to 0-indexed

			if (year < 2000 || year > 2099 || month < 0 || month > 11) {
				return NextResponse.json(
					{ error: "Year must be 2000-2099, month must be 01-12" },
					{ status: 400 }
				)
			}
		} else {
			const now = new Date()
			year = now.getFullYear()
			month = now.getMonth()
		}

		const weeks = buildMonthGrid(year, month)

		const days: DayResponse[] = []

		for (const week of weeks) {
			for (const day of week) {
				if (day.date.getMonth() === month) {
					days.push({
						gregorianDateUTC: day.date,
						gregorianDate: day.date.toISOString().split('T')[0],
						julian: day.julian,
						feast: day.feasts,
						fasting: day.fasting,
					})
				}
			}
		}

		return NextResponse.json({
			data: {
				month: `${year}-${String(month + 1).padStart(2, '0')}`,
				totalDays: days.length,
				days,
			},
		}, {
			headers: CACHE_WEEKLY,
		})
	} catch (err) {
		console.error("API error:", err)
		return NextResponse.json(
			{ error: "Internal error" },
			{ status: 500 }
		)
	}
}