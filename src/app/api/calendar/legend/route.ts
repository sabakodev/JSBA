import { FASTING_CONFIG, FEAST_TYPE_CONFIG } from "@/lib/utils/calendar"
import { CACHE_IMMUTABLE } from "@/lib/utils"
import { NextResponse } from "next/server"

export async function GET() {
	try {
		return NextResponse.json({
			data: {
				legend: {
					feast: Object.fromEntries(
						Object.entries(FEAST_TYPE_CONFIG).map(([key, { label }]) => [key, label])
					),
					fast: Object.fromEntries(
						Object.entries(FASTING_CONFIG).map(([key, { label }]) => [key, label])
					),
				}
			},
		}, {
			headers: CACHE_IMMUTABLE,
		})
	} catch (err) {
		console.error("API error:", err)
		return NextResponse.json({ error: "Internal error", }, { status: 500 })
	}
}