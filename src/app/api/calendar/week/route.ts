import { CACHE_WEEKLY, getCurrentLiturgicalWeek } from "@/lib/utils"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
	try {
		const query = req.nextUrl.searchParams

		// Parse — expect ?date=2026-04-13 (simpler than 3 separate params)
		const dateParam = query.get('date')

		let currentDate = new Date()

		if (dateParam) {
			const parsed = new Date(dateParam)
			if (isNaN(parsed.getTime())) {
				return NextResponse.json(
					{ error: "Invalid date format. Use YYYY-MM-DD" },
					{ status: 400 }
				)
			}
			currentDate = parsed
		}

		const litWeek = getCurrentLiturgicalWeek(currentDate)

		return NextResponse.json({
			data: litWeek,
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