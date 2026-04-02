import { join } from "path"
import { parseSaintsTsv } from "./tsv-parser"
import { readFileSync, writeFileSync } from "fs"

// Read TSV file
const tsv = readFileSync("./saints.tsv", "utf-8")
const OUTPUT_FILE = join(__dirname, "./saints.ts")

// Parse
const saints = parseSaintsTsv(tsv)

console.log(`Parsed ${saints.length} saints with valid dates`)

saints.sort((a, b) => {
	if (a.julianMonth !== b.julianMonth) return a.julianMonth - b.julianMonth
	return a.julianDay - b.julianDay
})

const monthNames = [
	"", "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
	"JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER",
]

let output = `// Source: Orthodox Synaxarion fixed-date saints
// Do not edit manually.

/**
 * Fixed-date saints from the Orthodox Synaxarion.
 * All dates are Julian calendar.
 * Total: ${saints.length} entries
 */
export const VENERATED_SAINTS = [\n`

let currentMonth = 0

for (const saint of saints) {
	if (saint.julianMonth !== currentMonth) {
		currentMonth = saint.julianMonth
		output += `\n\t// ─── ${monthNames[currentMonth]} ───────────────────────────────────\n`
	}

	const nameEscaped = saint.name.replace(/"/g, '\\"')
	const nameElEscaped = saint.nameEl.replace(/"/g, '\\"')
	const nameIdEscaped = saint.nameId.replace(/"/g, '\\"')

	output += `\t{
\t\tname: "${nameEscaped}",
\t\tnameEl: "${nameElEscaped}",
\t\tnameId: "${nameIdEscaped}",
\t\tjulianMonth: ${saint.julianMonth},
\t\tjulianDay: ${saint.julianDay},\n`

	if (saint.julianYear) {
		output += `\t\tjulianYear: ${saint.julianYear},\n`
	}

	output += `\t},\n`
}

output += `]\n`

writeFileSync(OUTPUT_FILE, output, "utf-8")
console.log(` Written to ${OUTPUT_FILE}`)

// ─── Print summary ────────────────────────────
console.log("\n Summary by month:")
for (let m = 1; m <= 12; m++) {
	const count = saints.filter((s) => s.julianMonth === m).length
	console.log(`   ${monthNames[m].padEnd(12)} ${count} saints`)
}