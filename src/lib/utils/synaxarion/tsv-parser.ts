interface Saint {
	name: string
	nameEl: string
	nameId: string
	julianMonth: number
	julianDay: number
	julianYear?: number
}

const MONTH_MAP: Record<string, number> = {
	"January": 1,
	"February": 2,
	"March": 3,
	"April": 4,
	"May": 5,
	"June": 6,
	"July": 7,
	"August": 8,
	"September": 9,
	"October": 10,
	"November": 11,
	"December": 12,
}

/**
 * Parses a TSV string of saints into structured data.
 *
 * Expected TSV columns:
 * Name | Title/Event | Julian Date | Gregorian Date | Year | Remarks | nameEn | nameEl | nameId
 *
 * Skips header row and rows without a valid Julian Date.
 */
export function parseSaintsTsv(tsv: string): Saint[] {
	const lines = tsv.trim().split("\n")

	// Skip header
	const dataLines = lines.slice(1)

	const saints: Saint[] = []

	for (const line of dataLines) {
		const columns = line.split("\t")

		// columns[0] = Name
		// columns[1] = Title/Event
		// columns[2] = Julian Date (e.g. "September 7")
		// columns[3] = Gregorian Date
		// columns[4] = Year
		// columns[5] = Remarks
		// columns[6] = nameEn
		// columns[7] = nameEl
		// columns[8] = nameId

		const julianDateStr = columns[2]?.trim()
		const julianYear = columns[4]?.trim()
		const nameEn = columns[6]?.trim()
		const nameEl = columns[7]?.trim()
		const nameId = columns[8]?.trim()

		const remarks = columns[5]?.trim()

		if (remarks && remarks.length) {
			// console.debug(`${nameEn} -> ${remarks}`)
			// console.debug(columns)
		}

		// Skip rows without a Julian date
		if (!julianDateStr) continue

		const parsed = parseJulianDate(julianDateStr)
		if (!parsed) continue

		// Skip rows missing any of the three name columns
		if (!nameEn || !nameEl || !nameId) continue

		saints.push({
			name: nameEn,
			nameEl: nameEl,
			nameId: nameId,
			julianMonth: parsed.month,
			julianDay: parsed.day,
			julianYear: julianYear.length ? parseInt(julianYear) : undefined
		})
	}

	return saints
}

/**
 * Parses a string like "September 7" into { month: 9, day: 7 }.
 * Returns null if the format is invalid.
 */
function parseJulianDate(dateStr: string): { month: number; day: number } | null {
	const parts = dateStr.split(/\s+/)
	if (parts.length !== 2) return null

	const monthName = parts[0]
	const day = parseInt(parts[1], 10)

	const month = MONTH_MAP[monthName]
	if (!month || isNaN(day) || day < 1 || day > 31) return null

	return { month, day }
}