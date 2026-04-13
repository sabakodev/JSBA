/**
 * Julian Calendar Feast Day Calculator
 * For Orthodox churches using the Julian (Old) calendar
 * Julian dates are 13 days behind Gregorian (2000-2099)
 */

import { FIXED_FEASTS, LENT_WEEKS, MOVEABLE_FEASTS, PASCHAL_WEEKS } from "./julian-calendar-data"
import { VENERATED_SAINTS } from "./synaxarion/saints"

// ──────────────────────────────────────
// Core: Calendar Conversion
// ──────────────────────────────────────

const JULIAN_OFFSET = 13 // Valid 2000–2099

export function convertToDate(date: { year: number, month: number, day: number }) {
	return new Date(date.year, date.month - 1, date.day)
}

export function julianToGregorian(year: number, month: number, day: number) {
	const date = new Date(year, month - 1, day + JULIAN_OFFSET)
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
	}
}

export function gregorianToJulian(year: number, month: number, day: number) {
	const date = new Date(year, month - 1, day)
	date.setDate(date.getDate() - JULIAN_OFFSET)
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
	}
}

// ──────────────────────────────────────
// Fast-Free Periods
// ──────────────────────────────────────

interface FastFreePeriod {
	name: string
	nameEl: string
	nameId: string
	// Julian start/end (month, day)
	julianStart: { month: number; day: number }
	julianEnd: { month: number; day: number }
}

const FAST_FREE_PERIODS: FastFreePeriod[] = [
	{
		name: "Sviatki (Christmas to Theophany Eve)",
		nameEl: "Δωδεκαήμερο (Χριστούγεννα — Παραμονή Θεοφανείων)",
		nameId: "Sviatki (Natal — Malam Teofani)",
		julianStart: { month: 12, day: 25 },
		julianEnd: { month: 1, day: 4 },
	},
	{
		name: "Afterfeast of Theophany",
		nameEl: "Μεθέορτα Θεοφανείων",
		nameId: "Sesudah Pesta Teofani",
		julianStart: { month: 1, day: 5 },
		julianEnd: { month: 1, day: 17 },
	},
	// Moveable ones are handled separately:
	// - Week of Publican & Pharisee (already in your code)
	// - Bright Week (already in your code)
	// - Pentecost Week (already in your code)
]

/**
 * Check if a Julian date falls within a fast-free period.
 * Handles year boundary (e.g., Dec 25 → Jan 4).
 */
function isInFastFreePeriod(
	julianMonth: number,
	julianDay: number
): { isFastFree: boolean; period: FastFreePeriod | null } {
	for (const period of FAST_FREE_PERIODS) {
		const start = period.julianStart
		const end = period.julianEnd

		// Convert to day-of-year for comparison
		const toNum = (m: number, d: number) => m * 100 + d
		const current = toNum(julianMonth, julianDay)
		const startNum = toNum(start.month, start.day)
		const endNum = toNum(end.month, end.day)

		if (startNum <= endNum) {
			// Normal range (e.g., Jan 5 — Jan 17)
			if (current >= startNum && current <= endNum) {
				return { isFastFree: true, period }
			}
		} else {
			// Wraps around year boundary (e.g., Dec 25 — Jan 4)
			if (current >= startNum || current <= endNum) {
				return { isFastFree: true, period }
			}
		}
	}

	return { isFastFree: false, period: null }
}

// ──────────────────────────────────────
// Core: Liturgical Date (Sunset Boundary)
// ──────────────────────────────────────

export interface LiturgicalDate {
	// The civil datetime used as input
	civil: { year: number; month: number; day: number; hour: number }
	// After sunset shift, the Gregorian liturgical date
	gregorian: { year: number; month: number; day: number }
	// Converted to Julian
	julian: { year: number; month: number; day: number }
	// Day of week of the LITURGICAL day (0=Sun ... 6=Sat)
	dayOfWeek: number
	// Whether we've crossed sunset
	isAfterSunset: boolean
}

export function getLiturgicalNow() {
	const now = new Date()

	// If after 18:00, liturgically we are in the NEXT day
	const civilDate = new Date(now)
	if (now.getHours() >= 18) {
		civilDate.setDate(civilDate.getDate() + 1)
	}

	const gregorian = {
		year: civilDate.getFullYear(),
		month: civilDate.getMonth() + 1,
		day: civilDate.getDate(),
	}

	const julian = gregorianToJulian(gregorian.year, gregorian.month, gregorian.day)

	// Day of week of the LITURGICAL day (not civil)
	const dayOfWeek = civilDate.getDay()

	return {
		gregorian,
		julian,
		dayOfWeek,
		civilNow: now,
	}
}

export function getLiturgicalDate(now: Date = new Date()): LiturgicalDate {
	const hour = now.getHours()
	const isAfterSunset = hour >= 18

	// If after 18:00, liturgically we're in the next day
	const liturgicalGregorian = new Date(now)
	if (isAfterSunset) {
		liturgicalGregorian.setDate(liturgicalGregorian.getDate() + 1)
	}

	const gregYear = liturgicalGregorian.getFullYear()
	const gregMonth = liturgicalGregorian.getMonth() + 1
	const gregDay = liturgicalGregorian.getDate()
	const dayOfWeek = liturgicalGregorian.getDay()

	const julian = gregorianToJulian(gregYear, gregMonth, gregDay)

	return {
		civil: {
			year: now.getFullYear(),
			month: now.getMonth() + 1,
			day: now.getDate(),
			hour,
		},
		gregorian: { year: gregYear, month: gregMonth, day: gregDay },
		julian,
		dayOfWeek,
		isAfterSunset,
	}
}

// ──────────────────────────────────────
// Core: Pascha Calculation (unchanged)
// ──────────────────────────────────────

export function calculatePascha(year: number) {
	const a = year % 4
	const b = year % 7
	const c = year % 19
	const d = (19 * c + 15) % 30
	const e = (2 * a + 4 * b - d + 34) % 7
	const month = Math.floor((d + e + 114) / 31)
	const day = ((d + e + 114) % 31) + 1

	const julianDate = { month, day }
	const gregorianDate = julianToGregorian(year, month, day)

	return { julian: julianDate, gregorian: gregorianDate, year }
}

type NameKey = "name" | "nameEl" | "nameId"

/**
 * Combines multiple saint names into a single string.
 *
 * 1 saint  → "Holy Martyr Sozon"
 * 2 saints → "Holy Martyr Sozon and Venerable Pelagia"
 * 3+ saints → "Holy Martyr Sozon, Venerable Pelagia, and Holy Apostle Thomas"
 */
function combineSaintNames(
	saints: { name: string; nameEl: string; nameId: string }[],
	key: NameKey,
): string {
	const names = saints.map((s) => s[key])

	if (names.length === 1) {
		return names[0]
	}

	if (names.length === 2) {
		return `${names[0]} & ${names[1]}`
	}

	const allButLast = names.slice(0, -1).join("; ")
	const last = names[names.length - 1]
	return `${allButLast}; & ${last}`
}


// ──────────────────────────────────────
// Helper: Date arithmetic
// ──────────────────────────────────────

export function addDaysToDate(year: number, month: number, day: number, days: number) {
	const date = new Date(year, month - 1, day)
	date.setDate(date.getDate() + days)
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
	}
}

function julianDatesEqual(
	a: { year: number; month: number; day: number },
	b: { year: number; month: number; day: number }
): boolean {
	return a.year === b.year && a.month === b.month && a.day === b.day
}

// ──────────────────────────────────────
// Feast Resolution: All in Julian Space
// ──────────────────────────────────────

export interface ResolvedFeast {
	name: string
	nameEl: string
	nameId: string
	type: "great" | "major" | "minor" | "fast" | "saint"
	julianDate: { year: number, month: number; day: number }
	gregorianDate: { year: number; month: number; day: number }
	// The civil evening when the feast BEGINS (vespers)
	civilVespersStart: { year: number; month: number; day: number; hour: 18 }
	fasting?: boolean
	source: "fixed" | "moveable"
	saints: {
		name: string
		nameEl: string
		nameId: string
	}[]
}

/**
 * Resolve all moveable feasts for a given year into Julian dates.
 * Pascha is computed, then each offset is applied in Gregorian,
 * then converted back to Julian for canonical comparison.
 */
export function resolveMovableFeasts(year: number): ResolvedFeast[] {
	const pascha = calculatePascha(year)
	const pg = pascha.gregorian

	return MOVEABLE_FEASTS.map((feast) => {
		const greg = addDaysToDate(pg.year, pg.month, pg.day, feast.daysFromPascha)
		const julian = gregorianToJulian(greg.year, greg.month, greg.day)
		const vespersDate = new Date(greg.year, greg.month - 1, greg.day)
		vespersDate.setDate(vespersDate.getDate() - 1)

		return {
			name: feast.name,
			nameEl: feast.nameEl,
			nameId: feast.nameId,
			type: feast.type,
			julianDate: { year: julian.year, month: julian.month, day: julian.day },
			gregorianDate: greg,
			civilVespersStart: {
				year: vespersDate.getFullYear(),
				month: vespersDate.getMonth() + 1,
				day: vespersDate.getDate(),
				hour: 18,
			},
			saints: [],
			source: "moveable" as const,
		}
	})
}

/**
 * Resolve all fixed feasts for a given year into both calendars.
 */
export function resolveFixedFeasts(year: number): ResolvedFeast[] {
	return FIXED_FEASTS.map((feast) => {
		const greg = julianToGregorian(year, feast.julianMonth, feast.julianDay)

		// Vespers begins the evening BEFORE the Gregorian date
		const vespersDate = new Date(greg.year, greg.month - 1, greg.day)
		vespersDate.setDate(vespersDate.getDate() - 1)

		return {
			name: feast.name,
			nameEl: feast.nameEl,
			nameId: feast.nameId,
			type: feast.type,
			julianDate: { year: year, month: feast.julianMonth, day: feast.julianDay },
			gregorianDate: greg,
			civilVespersStart: {
				year: vespersDate.getFullYear(),
				month: vespersDate.getMonth() + 1,
				day: vespersDate.getDate(),
				hour: 18,
			},
			fasting: feast.fasting,
			saints: [],
			source: "fixed" as const,
		}
	})
}

/**
 * Groups saints by Julian date and produces one ResolvedFeast per date
 * with a combined name and an array of individual saints.
 */
export function resolveSaintSynaxarion(year: number): ResolvedFeast[] {
	// ── Step 1: Group by Julian month + day ──────────────
	const grouped = new Map<string, typeof VENERATED_SAINTS>()

	for (const feast of VENERATED_SAINTS) {
		const key = `${feast.julianMonth}-${feast.julianDay}`
		if (!grouped.has(key)) {
			grouped.set(key, [])
		}
		grouped.get(key)!.push(feast)
	}

	// ── Step 2: Resolve each group ───────────────────────
	const results: ResolvedFeast[] = []

	for (const [, saints] of grouped) {
		const first = saints[0]
		const greg = julianToGregorian(year, first.julianMonth, first.julianDay)

		const vespersDate = new Date(greg.year, greg.month - 1, greg.day)
		vespersDate.setDate(vespersDate.getDate() - 1)

		// ── Combine names ────────────────────────────────
		const combinedName = combineSaintNames(saints, "name")
		const combinedNameEl = combineSaintNames(saints, "nameEl")
		const combinedNameId = combineSaintNames(saints, "nameId")

		results.push({
			name: combinedName,
			nameEl: combinedNameEl,
			nameId: combinedNameId,
			type: "saint",
			julianDate: {
				year,
				month: first.julianMonth,
				day: first.julianDay,
			},
			gregorianDate: greg,
			civilVespersStart: {
				year: vespersDate.getFullYear(),
				month: vespersDate.getMonth() + 1,
				day: vespersDate.getDate(),
				hour: 18,
			},
			source: "fixed" as const,
			saints: saints.map((s) => ({
				name: s.name,
				nameEl: s.nameEl,
				nameId: s.nameId,
			})),
		})
	}

	// ── Step 3: Sort by Julian date ──────────────────────
	return results.sort((a, b) => {
		if (a.julianDate.month !== b.julianDate.month) {
			return a.julianDate.month - b.julianDate.month
		}
		return a.julianDate.day - b.julianDate.day
	})
}

/**
 * Get ALL feasts for a year, sorted by Gregorian date.
 */
export function getAllFeasts(year: number): ResolvedFeast[] {
	const fixed = resolveFixedFeasts(year)
	const moveable = resolveMovableFeasts(year)

	return [...fixed, ...moveable].sort((a, b) => {
		const dA = new Date(a.gregorianDate.year, a.gregorianDate.month - 1, a.gregorianDate.day)
		const dB = new Date(b.gregorianDate.year, b.gregorianDate.month - 1, b.gregorianDate.day)
		return dA.getTime() - dB.getTime()
	})
}

// ──────────────────────────────────────
// Today's Feasts (plural — handles collisions)
// ──────────────────────────────────────

/**
 * Returns ALL feasts for the current liturgical day.
 * Comparison happens in Julian space.
 * After 18:00, returns tomorrow's feasts.
 */
export function getTodaysFeasts(now?: Date): ResolvedFeast[] {
	const litDate = getLiturgicalDate(now)
	const year = litDate.gregorian.year

	// Get feasts for this year and adjacent years (edge cases near Jan/Dec)
	const feasts = [
		...getAllFeasts(year - 1),
		...getAllFeasts(year),
		...getAllFeasts(year + 1),
	]

	return feasts.filter((feast) =>
		julianDatesEqual(
			{ year: feast.julianDate.year, month: feast.julianDate.month, day: feast.julianDate.day },
			{ year: litDate.julian.year, month: litDate.julian.month, day: litDate.julian.day }
		)
	)
}

// ──────────────────────────────────────
// Upcoming Feasts
// ──────────────────────────────────────

export function getUpcomingFeasts(count: number = 5, now?: Date, filters?: string[]): ResolvedFeast[] {
	const actualNow = now ?? new Date()
	const year = actualNow.getFullYear()

	const feasts = [
		...getAllFeasts(year - 1),
		...getAllFeasts(year),
		...getAllFeasts(year + 1),
	]

	const nowMs = actualNow.getTime()

	return feasts
		.filter((feast) => {
			if (filters) {
				return filters.includes(feast.type)
			} else {
				return true
			}
		})
		.filter((feast) => {
			// Feast is "upcoming" if vespers hasn't started yet
			const vespersMs = new Date(
				feast.civilVespersStart.year,
				feast.civilVespersStart.month - 1,
				feast.civilVespersStart.day,
				feast.civilVespersStart.hour,
			).getTime()
			return vespersMs > nowMs
		})
		.sort((a, b) => {
			const aMs = new Date(
				a.civilVespersStart.year,
				a.civilVespersStart.month - 1,
				a.civilVespersStart.day,
				a.civilVespersStart.hour,
			).getTime()
			const bMs = new Date(
				b.civilVespersStart.year,
				b.civilVespersStart.month - 1,
				b.civilVespersStart.day,
				b.civilVespersStart.hour,
			).getTime()
			return aMs - bMs
		})
		.slice(0, count)
}

// ──────────────────────────────────────
// Fasting Day Check (sunset-aware)
// ──────────────────────────────────────

export function isFastingDay(now?: Date): {
	fasting: boolean
	fastingType: LiturgicalWeek["fastingType"]
	reasons: string[]
} {
	const litDate = getLiturgicalDate(now)

	// ═══════════════════════════════════════════
	// Fast-free periods override everything
	// ═══════════════════════════════════════════
	const { isFastFree } = isInFastFreePeriod(
		litDate.julian.month,
		litDate.julian.day
	)

	if (isFastFree) {
		return { fasting: false, fastingType: "none", reasons: [] }
	}

	const dayOfWeek = litDate.dayOfWeek
	const reasons: string[] = []

	// Check feast-based fasting
	const todaysFeasts = getTodaysFeasts(now)
	for (const feast of todaysFeasts) {
		if (feast.fasting) {
			reasons.push(feast.name)
		}
	}

	// Wednesday and Friday
	if (dayOfWeek === 3) reasons.push("Wednesday fast (Betrayal of Christ)")
	if (dayOfWeek === 5) reasons.push("Friday fast (Crucifixion of Christ)")

	// Get liturgical week for fasting type context
	const week = getCurrentLiturgicalWeek(now)

	if (reasons.length > 0 || week.fasting) {
		return {
			fasting: true,
			fastingType: week.fastingType,
			reasons: reasons.length > 0 ? reasons : [week.description],
		}
	}

	return { fasting: false, fastingType: "none", reasons: [] }
}

// ──────────────────────────────────────
// Format date for display
// ──────────────────────────────────────

export function formatFeastDate(
	gregorianDate: { year: number; month: number; day: number },
	locale: string = "en"
): string {
	const date = new Date(
		gregorianDate.year,
		gregorianDate.month - 1,
		gregorianDate.day
	)

	const localeMap: Record<string, string> = {
		en: "en-US",
		el: "el-GR",
		id: "id-ID",
	}

	return date.toLocaleDateString(localeMap[locale] || locale, {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	})
}

// ──────────────────────────────────────
// Current Liturgical Week (sunset-aware)
// ──────────────────────────────────────

export interface LiturgicalWeek {
	name: string
	nameEl: string
	nameId: string
	tone: number    // 1-8 Octoechos
	fasting: boolean
	fastingType:
	| "strict"      // No food or only bread & water (Clean Week, Holy Week weekdays)
	| "xerophagy"   // Dry eating: bread, fruits, nuts, vegetables (no oil/wine)
	| "oil-wine"    // Cooked food with oil and wine allowed
	| "fish"        // Fish, oil, wine allowed
	| "dairy"       // No meat, but dairy/eggs allowed (Cheesefare)
	| "regular"     // Wednesday & Friday fast (no meat, dairy, fish)
	| "none"        // No fasting
	description: string
}

export function getCurrentLiturgicalWeek(now?: Date): LiturgicalWeek {
	const litDate = getLiturgicalDate(now)
	const dayOfWeek = litDate.dayOfWeek

	const year = litDate.gregorian.year

	// ═══════════════════════════════════════════
	// CHECK FAST-FREE PERIODS FIRST
	// ═══════════════════════════════════════════
	const { isFastFree, period } = isInFastFreePeriod(
		litDate.julian.month,
		litDate.julian.day
	)

	if (isFastFree && period) {
		// Still need tone calculation
		const prevPaschaData = calculatePascha(year - 1)
		const prevPascha = new Date(
			prevPaschaData.gregorian.year,
			prevPaschaData.gregorian.month - 1,
			prevPaschaData.gregorian.day
		)
		const litToday = new Date(
			litDate.gregorian.year,
			litDate.gregorian.month - 1,
			litDate.gregorian.day
		)
		const diffMs = litToday.getTime() - prevPascha.getTime()
		const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
		const weeksSincePascha = Math.floor(diffDays / 7)
		const tone = ((weeksSincePascha % 8) + 8) % 8 || 8

		return {
			name: period.name,
			nameEl: period.nameEl,
			nameId: period.nameId,
			tone,
			fasting: false,
			fastingType: "none",
			description: `Fast-free period. ${period.name}. No fasting, even on Wednesday and Friday.`,
		}
	}

	const currentPascha = calculatePascha(year)
	const pascha = new Date(
		currentPascha.gregorian.year,
		currentPascha.gregorian.month - 1,
		currentPascha.gregorian.day
	)

	const prevPaschaData = calculatePascha(year - 1)
	const prevPascha = new Date(
		prevPaschaData.gregorian.year,
		prevPaschaData.gregorian.month - 1,
		prevPaschaData.gregorian.day
	)

	// Use liturgical Gregorian date for all calculations
	const litToday = new Date(
		litDate.gregorian.year,
		litDate.gregorian.month - 1,
		litDate.gregorian.day
	)

	const daysUntilPascha = Math.floor(
		(pascha.getTime() - litToday.getTime()) / (1000 * 60 * 60 * 24)
	)
	const isPrePaschal = daysUntilPascha > 0 && daysUntilPascha <= 70

	const referencePascha = litToday >= pascha ? pascha : prevPascha
	const diffMs = litToday.getTime() - referencePascha.getTime()
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
	const weeksSincePascha = Math.floor(diffDays / 7)

	const tone = ((weeksSincePascha % 8) + 8) % 8 || 8

	// ── Lenten fasting type by day ──
	function getLentFastingType(weeksBeforePascha: number): LiturgicalWeek["fastingType"] {
		if (weeksBeforePascha === 1) {
			// Holy Week — strict throughout
			if (dayOfWeek === 6) return "oil-wine"
			if (dayOfWeek === 5) return "strict"
			return "xerophagy"
		}

		if (weeksBeforePascha === 7) {
			// Clean Week
			if (dayOfWeek === 0 || dayOfWeek === 6) return "oil-wine"
			if (dayOfWeek === 3 || dayOfWeek === 5) return "xerophagy"
			return "strict"
		}

		// Palm Week (week 2 = 6th week of Lent) — Saturday Lazarus: fish
		if (weeksBeforePascha === 2) {
			if (dayOfWeek === 6) return "fish"    // Lazarus Saturday
			if (dayOfWeek === 0) return "fish"    // Palm Sunday
			return "xerophagy"                     // ← add explicit fallthrough
		}

		// Regular Lent weeks
		if (dayOfWeek === 0 || dayOfWeek === 6) return "oil-wine"
		return "xerophagy"
	}

	function getRegularFastType(): LiturgicalWeek["fastingType"] {
		if (dayOfWeek === 3 || dayOfWeek === 5) return "regular"
		return "none"
	}

	// ── Pre-Paschal ──
	if (isPrePaschal) {
		const weeksBeforePascha = Math.ceil(daysUntilPascha / 7)

		if (weeksBeforePascha <= 6) {
			const idx = weeksBeforePascha - 1
			return {
				name: LENT_WEEKS[idx].name,
				nameEl: LENT_WEEKS[idx].nameEl,
				nameId: LENT_WEEKS[idx].nameId,
				tone,
				fasting: true,
				fastingType: getLentFastingType(weeksBeforePascha),
				description: LENT_WEEKS[idx].desc,
			}
		}

		if (weeksBeforePascha === 7) {
			return {
				name: "1st Week of Great Lent (Clean Week)",
				nameEl: "Α' Εβδομάδα Νηστειών (Καθαρά Εβδομάδα)",
				nameId: "Minggu ke-1 Catur Dasa (Pekan Bersih)",
				tone,
				fasting: true,
				fastingType: getLentFastingType(7),
				description: "The beginning of the Great Fast. Strict fasting and repentance.",
			}
		}

		if (weeksBeforePascha === 8) {
			return {
				name: "Forgiveness Sunday / Cheesefare Week",
				nameEl: "Κυριακή Συγχωρήσεως / Τυρινή",
				nameId: "Minggu Pengampunan / Pekan Keju",
				tone,
				fasting: true,
				fastingType: "dairy",
				description:
					"Last week before Great Lent. Forgiveness Vespers. No meat, dairy permitted.",
			}
		}

		if (weeksBeforePascha === 9) {
			return {
				name: "Meatfare Week",
				nameEl: "Εβδομάδα Απόκρεω",
				nameId: "Pekan Pantang Daging",
				tone,
				fasting: dayOfWeek === 3 || dayOfWeek === 5,
				fastingType: getRegularFastType(),
				description: "Last week of meat consumption before Pascha.",
			}
		}

		if (weeksBeforePascha === 10) {
			return {
				name: "Week of the Prodigal Son",
				nameEl: "Εβδομάδα του Ασώτου",
				nameId: "Pekan Anak yang Hilang",
				tone,
				fasting: dayOfWeek === 3 || dayOfWeek === 5,
				fastingType: getRegularFastType(),
				description: "Parable of the Prodigal Son. Call to repentance.",
			}
		}

		if (weeksBeforePascha === 11) {
			return {
				name: "Week of the Publican and the Pharisee",
				nameEl: "Εβδομάδα Τελώνου και Φαρισαίου",
				nameId: "Pekan Pemungut Cukai dan Farisi",
				tone,
				fasting: false,
				fastingType: "none",
				description: "Beginning of the Triodion. Fast-free week.",
			}
		}
	}

	// ── Post-Pascha ──

	if (weeksSincePascha === 0) {
		return {
			name: "Bright Week (Pascha Week)",
			nameEl: "Διακαινήσιμος Εβδομάδα",
			nameId: "Pekan Gemilang (Pekan Paskah)",
			tone: 1,
			fasting: false,
			fastingType: "none",
			description:
				"The radiant celebration of Christ's Resurrection. Fast-free week.",
		}
	}

	if (weeksSincePascha >= 1 && weeksSincePascha <= 6) {
		const idx = weeksSincePascha - 1
		return {
			name: PASCHAL_WEEKS[idx].name,
			nameEl: PASCHAL_WEEKS[idx].nameEl,
			nameId: PASCHAL_WEEKS[idx].nameId,
			tone,
			fasting: dayOfWeek === 3 || dayOfWeek === 5,
			fastingType: getRegularFastType(),
			description: PASCHAL_WEEKS[idx].desc,
		}
	}

	if (weeksSincePascha === 7) {
		return {
			name: "Pentecost Week",
			nameEl: "Εβδομάδα Πεντηκοστής",
			nameId: "Pekan Pentakosta",
			tone: 8,
			fasting: false,
			fastingType: "none",
			description:
				"Descent of the Holy Spirit. Birthday of the Church. Fast-free week.",
		}
	}

	// ── After Pentecost ──
	const weekAfterPentecost = weeksSincePascha - 7

	const allSaintsMonday = new Date(referencePascha)
	allSaintsMonday.setDate(allSaintsMonday.getDate() + 57)
	const apostlesEnd = julianToGregorian(year, 6, 28)
	const apostlesFastEnd = new Date(apostlesEnd.year, apostlesEnd.month - 1, apostlesEnd.day)
	const isApostlesFast = litToday >= allSaintsMonday && litToday <= apostlesFastEnd

	const dormitionFastStart = convertToDate(julianToGregorian(year, 8, 1))  // Aug 1 Julian
	const dormitionFastEnd = convertToDate(julianToGregorian(year, 8, 14))   // Aug 14 Julian (Dormition itself)
	const isDormitionFast = litToday >= dormitionFastStart && litToday <= dormitionFastEnd

	const natFastStartGreg = julianToGregorian(year, 11, 15)
	const natFastEndGreg = julianToGregorian(year, 12, 24) // Christmas Eve Julian

	const natFastStartDate = new Date(natFastStartGreg.year, natFastStartGreg.month - 1, natFastStartGreg.day)
	const natFastEndDate = new Date(natFastEndGreg.year, natFastEndGreg.month - 1, natFastEndGreg.day)
	const isNativityFast = litToday >= natFastStartDate && litToday <= natFastEndDate

	const isSpecialFast = isApostlesFast || isDormitionFast || isNativityFast
	const isRegularFastDay = dayOfWeek === 3 || dayOfWeek === 5
	const fasting = isSpecialFast || isRegularFastDay

	function getSpecialFastType(): LiturgicalWeek["fastingType"] {
		if (isApostlesFast) {
			if (dayOfWeek === 0 || dayOfWeek === 6) return "fish"
			if (dayOfWeek === 2 || dayOfWeek === 4) return "oil-wine"
			return "xerophagy"
		}
		if (isDormitionFast) {
			if (dayOfWeek === 0 || dayOfWeek === 6) return "oil-wine"
			return "xerophagy"
		}
		if (isNativityFast) {
			const dec20Greg = convertToDate(julianToGregorian(year, 12, 20))

			// Stricter after Dec 20 Julian (≈ Jan 2 Gregorian)
			const isStrictPeriod = litToday >= dec20Greg
			if (isStrictPeriod) {
				if (dayOfWeek === 0 || dayOfWeek === 6) return "oil-wine"
				return "xerophagy"
			}
			if (dayOfWeek === 0 || dayOfWeek === 6) return "fish"
			if (dayOfWeek === 2 || dayOfWeek === 4) return "oil-wine"
			return "xerophagy"
		}
		return "none"
	}

	let fastingType: LiturgicalWeek["fastingType"]
	if (isSpecialFast) {
		fastingType = getSpecialFastType()
	} else if (isRegularFastDay) {
		fastingType = "regular"
	} else {
		fastingType = "none"
	}

	let fastNote = ""
	if (isApostlesFast) fastNote = " Apostles' Fast period."
	else if (isDormitionFast) fastNote = " Dormition Fast period."
	else if (isNativityFast) fastNote = " Nativity Fast period."

	return {
		name: `${getOrdinal(weekAfterPentecost)} Week after Pentecost`,
		nameEl: `${weekAfterPentecost}η Εβδομάδα μετά την Πεντηκοστή`,
		nameId: `Minggu ke-${weekAfterPentecost} setelah Pentakosta`,
		tone,
		fasting,
		fastingType,
		description: `Ordinary time. Octoechos Tone ${tone}.${fastNote}${!isSpecialFast ? " Regular fasting on Wednesday and Friday." : ""
			}`,
	}
}

function getOrdinal(n: number): string {
	const s = ["th", "st", "nd", "rd"]
	const v = n % 100
	return n + (s[(v - 20) % 10] || s[v] || s[0])
}