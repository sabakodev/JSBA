import {
	getCurrentLiturgicalWeek,
} from "@/lib/utils"
import MobileCalendar from "./calendar/MobileCalendar"
import GridCalendar from "./calendar/GridCalendar"


interface Props {
	year: number
	month: number
	locale: string
}

export default function LiturgicalCalendar({ locale, year, month }: Props) {
	// Current liturgical context
	const week = getCurrentLiturgicalWeek()

	return (
		<div className="w-full mx-auto overflow-hidden">
			{/* ── Header ── */}
			<p className="text-xs font-body font-bold block text-center mb-4 md:hidden">
				{
					(
						{
							default: week.name,
							id: week.nameId,
							el: week.nameEl
						})[locale] ?? week.name
				}
			</p>


			<MobileCalendar
				year={year}
				month={month}
				locale={locale} />
			<GridCalendar
				locale={locale}
				year={year}
				month={month} />
		</div>
	)
}