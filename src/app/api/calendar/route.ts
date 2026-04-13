import { getCurrentLiturgicalWeek } from "@/lib/utils"
import { buildMonthGrid, DayCell, FASTING_CONFIG, FEAST_TYPE_CONFIG } from "@/lib/utils/calendar"
import { NextRequest, NextResponse } from "next/server"

interface DayRows {
	gregorianDate: Date
	julian: DayCell['julian']
	feast: DayCell['feasts']
	fasting: DayCell['fasting']
}

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams

		const {
			year,
			month,
			date,
		}: {
			year: number,
			month: number,
			date: number,
		} = {
			year: parseInt(query.get('year') ?? '0'),
			month: parseInt(query.get('month') ?? '0'),
			date: parseInt(query.get('date') ?? '0'),
		}

		let currentDate = new Date()

		if (year > 1999 && month >= 0 && year < 2100 && month < 12) {
			currentDate = new Date(year, month, date)
		}

		const litWeek = getCurrentLiturgicalWeek(currentDate)

		const weeks = buildMonthGrid(
			currentDate.getFullYear(),
			currentDate.getUTCMonth(),
			Intl.DateTimeFormat().resolvedOptions().timeZone,
		)

		const days: DayRows[] = []

		let age = 60 * 60

		weeks.map((week) => week.map(day => {
			if (currentDate.getUTCMonth() === day.date.getUTCMonth()) {
				days.push({
					gregorianDate: day.date,
					julian: day.julian,
					feast: day.feasts,
					fasting: day.fasting,
				})
			}

			age = 60 * 60 * 24 * 30
		}))

		return NextResponse.json({
			litWeek,
			days: age > 3600 ? days : [],
			legend: {
				feast: FEAST_TYPE_CONFIG,
				fast: FASTING_CONFIG
			}
		}, {
			headers: {
				'Cache-Control': `max-age=${age}`,
				'CDN-Cache-Control': `max-age=${age}`,
				'Vercel-CDN-Cache-Control': `max-age=${age}`,
			},
		})
	} catch (err) {
		console.error("Webhook error:", err)
		return NextResponse.json({ error: "Internal error", }, { status: 500 })
	}
}