/**
 * Julian Calendar Feast Day Calculator
 * For Orthodox churches using the Julian (Old) calendar
 * Julian dates are 13 days behind Gregorian (2000-2099)
 */

import { FIXED_FEASTS, LENT_WEEKS, MOVEABLE_FEASTS, PASCHAL_WEEKS } from "./julian-calendar-data"

// Julian to Gregorian offset (valid 2000-2099)
const JULIAN_OFFSET = 13

// ──────────────────────────────────────
// Pascha (Easter) Calculation
// Using the Meeus Julian algorithm
// ──────────────────────────────────────
export function calculatePascha(year: number) {
	// Step 1: Compute Pascha in Julian calendar
	const a = year % 4
	const b = year % 7
	const c = year % 19
	const d = (19 * c + 15) % 30
	const e = (2 * a + 4 * b - d + 34) % 7
	const month = Math.floor((d + e + 114) / 31) // 3 = March, 4 = April (Julian)
	const day = ((d + e + 114) % 31) + 1

	// Julian date of Pascha
	const julianDate = { month, day }

	// Step 2: Convert Julian to Gregorian
	const gregorianDate = julianToGregorian(year, month, day)

	return {
		julian: julianDate,
		gregorian: gregorianDate,
		year,
	}
}

// ──────────────────────────────────────
// Conversion Helpers
// ──────────────────────────────────────
export function julianToGregorian(year: number, month: number, day: number) {
	const gregorianDay = day + JULIAN_OFFSET
	const date = new Date(year, month - 1, gregorianDay)
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
	}
}

export function addDaysToDate(year: number, month: number, day: number, days: number) {
	const date = new Date(year, month - 1, day)
	date.setDate(date.getDate() + days)
	return {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
	}
}

// ──────────────────────────────────────
// Get All Feasts for a Given Year
// ──────────────────────────────────────
export interface CalendarFeast {
	name: string
	nameEl: string
	nameId: string
	type: "great" | "major" | "minor" | "fast"
	julianDate?: { month: number; day: number }
	gregorianDate: { year: number; month: number; day: number }
	fasting?: boolean
}

export function getAllFeasts(year: number): CalendarFeast[] {
	const feasts: CalendarFeast[] = []

	// 1. Fixed feasts
	for (const feast of FIXED_FEASTS) {
		const gregorian = julianToGregorian(year, feast.julianMonth, feast.julianDay)
		feasts.push({
			name: feast.name,
			nameEl: feast.nameEl,
			nameId: feast.nameId,
			type: feast.type,
			julianDate: { month: feast.julianMonth, day: feast.julianDay },
			gregorianDate: gregorian,
			fasting: feast.fasting,
		})
	}

	// 2. Moveable feasts (based on Pascha)
	const pascha = calculatePascha(year)
	const paschaGregorian = pascha.gregorian

	for (const feast of MOVEABLE_FEASTS) {
		const gregorian = addDaysToDate(
			paschaGregorian.year,
			paschaGregorian.month,
			paschaGregorian.day,
			feast.daysFromPascha
		)
		feasts.push({
			name: feast.name,
			nameEl: feast.nameEl,
			nameId: feast.nameId,
			type: feast.type,
			gregorianDate: gregorian,
			julianDate: {
				month: pascha.julian.month,
				day: pascha.julian.day,
			}
		})
	}

	// Sort by Gregorian date
	feasts.sort((a, b) => {
		const dateA = new Date(a.gregorianDate.year, a.gregorianDate.month - 1, a.gregorianDate.day)
		const dateB = new Date(b.gregorianDate.year, b.gregorianDate.month - 1, b.gregorianDate.day)
		return dateA.getTime() - dateB.getTime()
	})

	return feasts
}

// ──────────────────────────────────────
// Helper: Get upcoming feasts
// ──────────────────────────────────────
export function getUpcomingFeasts(count: number = 5): CalendarFeast[] {
	const today = new Date()
	const year = today.getFullYear()

	// Get feasts for this year and next (in case we're near year end)
	const feasts = [...getAllFeasts(year), ...getAllFeasts(year + 1)]

	return feasts
		.filter((feast) => {
			const feastDate = new Date(
				feast.gregorianDate.year,
				feast.gregorianDate.month - 1,
				feast.gregorianDate.day
			)
			return feastDate >= today
		})
		.slice(0, count)
}

// ──────────────────────────────────────
// Helper: Get today's feast (if any)
// ──────────────────────────────────────
export function getTodaysFeast(): CalendarFeast | null {
	const today = new Date()
	const year = today.getFullYear()
	const feasts = getAllFeasts(year)

	return (
		feasts.find(
			(feast) =>
				feast.gregorianDate.month === today.getMonth() + 1 &&
				feast.gregorianDate.day === today.getDate()
		) || null
	)
}

// ──────────────────────────────────────
// Helper: Check if today is a fasting day
// ──────────────────────────────────────
export function isFastingDay(): { fasting: boolean; reason?: string } {
	const today = new Date()
	const dayOfWeek = today.getDay()

	// Wednesday and Friday are always fasting days
	if (dayOfWeek === 3) return { fasting: true, reason: "Wednesday fast (Betrayal of Christ)" }
	if (dayOfWeek === 5) return { fasting: true, reason: "Friday fast (Crucifixion of Christ)" }

	// Check if within a fasting period
	const todaysFeast = getTodaysFeast()
	if (todaysFeast?.fasting) return { fasting: true, reason: todaysFeast.name }

	return { fasting: false }
}

// ──────────────────────────────────────
// Helper: Format date for display
// ──────────────────────────────────────
export function formatFeastDate(
	gregorianDate: { year: number; month: number; day: number },
	locale: string = "en"
): string {
	const date = new Date(gregorianDate.year, gregorianDate.month - 1, gregorianDate.day)

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

interface LiturgicalWeek {
	name: string
	nameEl: string
	nameId: string
	tone: number // 1-8 Octoechos
	description: string
	fasting: boolean
}

// ──────────────────────────────────────
// Helper: Get current Liturgical Week
// ──────────────────────────────────────

export function getCurrentLiturgicalWeek(): LiturgicalWeek {
	const today = new Date()
	const year = today.getFullYear()

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

	// ✅ FIX: Calculate diff from UPCOMING Pascha (this year)
	// and diff from PREVIOUS Pascha (last year)
	const daysUntilPascha = Math.floor((pascha.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
	const daysSincePrevPascha = Math.floor((today.getTime() - prevPascha.getTime()) / (1000 * 60 * 60 * 24))

	// If we're before this year's Pascha and within ~70 days (Triodion range),
	// use upcoming Pascha for pre-Paschal calculations
	const isPrePaschal = daysUntilPascha > 0 && daysUntilPascha <= 70

	// Determine which Pascha to reference for post-Paschal weeks
	const referencePascha = today >= pascha ? pascha : prevPascha
	const diffMs = today.getTime() - referencePascha.getTime()
	const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
	const weeksSincePascha = Math.floor(diffDays / 7)

	const tone = ((weeksSincePascha % 8) + 8) % 8 || 8
	const dayOfWeek = today.getDay()

	// ── Pre-Paschal periods (use upcoming Pascha) ──
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
				description: LENT_WEEKS[idx].desc,
			}
		}

		if (weeksBeforePascha === 7) {
			return {
				name: "1st Week of Great Lent (Clean Week)",
				nameEl: "Α' Εβδομάδα Νηστειών (Καθαρά Εβδομάδα)",
				nameId: "Minggu ke-1 Prapaskah (Pekan Bersih)",
				tone,
				fasting: true,
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
				description: "Last week before Great Lent. Forgiveness Vespers. No meat, dairy permitted.",
			}
		}

		if (weeksBeforePascha === 9) {
			return {
				name: "Meatfare Week",
				nameEl: "Εβδομάδα Απόκρεω",
				nameId: "Pekan Pantang Daging",
				tone,
				fasting: dayOfWeek === 3 || dayOfWeek === 5,
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
				description: "Beginning of the Triodion. Fast-free week.",
			}
		}
	}

	// ── Post-Pascha periods (use previous/current Pascha) ──

	if (weeksSincePascha === 0) {
		return {
			name: "Bright Week (Pascha Week)",
			nameEl: "Διακαινήσιμος Εβδομάδα",
			nameId: "Pekan Terang (Pekan Paskah)",
			tone: 1,
			fasting: false,
			description: "The radiant celebration of Christ's Resurrection. Fast-free week.",
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
			description: "Descent of the Holy Spirit. Birthday of the Church. Fast-free week.",
		}
	}

	// ── After Pentecost ──
	const weekAfterPentecost = weeksSincePascha - 7

	const allSaintsMonday = new Date(referencePascha)
	allSaintsMonday.setDate(allSaintsMonday.getDate() + 57)
	const apostlesFastEnd = new Date(today.getFullYear(), 6, 11)
	const isApostlesFast = today >= allSaintsMonday && today <= apostlesFastEnd

	const dormitionFastStart = new Date(today.getFullYear(), 7, 14)
	const dormitionFastEnd = new Date(today.getFullYear(), 7, 27)
	const isDormitionFast = today >= dormitionFastStart && today <= dormitionFastEnd

	const nativityFastStart = new Date(today.getFullYear(), 10, 28)
	const nativityFastEnd = new Date(
		today.getMonth() === 0 ? today.getFullYear() : today.getFullYear() + 1,
		0, 6
	)
	const isNativityFast = today >= nativityFastStart && today <= nativityFastEnd

	const isSpecialFast = isApostlesFast || isDormitionFast || isNativityFast
	const isRegularFastDay = dayOfWeek === 3 || dayOfWeek === 5
	const fasting = isSpecialFast || isRegularFastDay

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
		description: `Ordinary time. Octoechos Tone ${tone}.${fastNote}${!isSpecialFast ? " Regular fasting on Wednesday and Friday." : ""}`,
	}
}

function getOrdinal(n: number): string {
	const s = ["th", "st", "nd", "rd"]
	const v = n % 100
	return n + (s[(v - 20) % 10] || s[v] || s[0])
}