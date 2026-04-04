"use client"

import { useMemo } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
	getCurrentLiturgicalWeek,
} from "@/lib/utils"
import { Link } from "@/i18n/nav"
import MobileCalendar from "./calendar/MobileCalendar"
import GridCalendar from "./calendar/GridCalendar"


const MONTH_NAMES = [
	"January", "February", "March", "April", "May", "June",
	"July", "August", "September", "October", "November", "December",
]

interface Props {
	year: number
	month: number
	locale: string
}

export default function LiturgicalCalendar({ locale, year, month }: Props) {
	const targetD = (d: number) => {
		const targetDate = new Date(year, month + d, 1)

		return `/event/calendar/${targetDate.getFullYear()}/${targetDate.getMonth() + 1}`
	}

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const prevMonth = useMemo(() => targetD(-1), [])
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const nextMonth = useMemo(() => targetD(+1), [])
	const goToday = `/event/calendar`

	// Current liturgical context
	const litWeek = useMemo(() => {
		const week = getCurrentLiturgicalWeek()

		return {
			name: ({ default: week.name, id: week.nameId, el: week.nameEl })[locale] ?? week.name,
			tone: week.tone,
			fasting: week.fasting,
			fastingType: week.fastingType,
		}
	}, [locale])

	return (
		<div className="w-full mx-auto overflow-hidden">
			{/* ── Header ── */}
			<p className="text-xs font-body font-bold block text-center mb-4 md:hidden">
				{litWeek.name}
			</p>
			<div className="flex items-center justify-between mb-4 px-2">
				<div>
					<h2 className="text-2xl font-bold tracking-tight">
						{MONTH_NAMES[month]} {year}
					</h2>
					<div className="block md:hidden mt-2">
						<div className="flex space-x-2">
							{litWeek.tone && (
								<p className="text-[10px] py-px tracking-widest text-tertiary-950 rounded-sm px-2 bg-tertiary-100">
									Tone {litWeek.tone}
								</p>
							)}
							{litWeek.fasting && (
								<p className="text-[10px] py-px uppercase tracking-widest text-primary">
									{litWeek.fastingType}
								</p>
							)}
						</div>
					</div>
				</div>

				<div className="py-3 px-4 bg-primary/5 border border-primary/10 rounded-sm text-center hidden md:block">
					<p className="text-sm font-body font-bold text-on-surface">
						{litWeek.name}
					</p>
					{litWeek.tone && (
						<p className="text-xs text-secondary/60 mt-1">
							Tone {litWeek.tone}
						</p>
					)}
					{litWeek.fasting && (
						<p className="text-[10px] uppercase tracking-widest text-primary mt-2">
							{litWeek.fastingType}
						</p>
					)}
				</div>
				<div className="flex items-center gap-1">
					<Link href={goToday}>
						<Button variant="outline" size="sm">
							Today
						</Button>
					</Link>
					<Link href={prevMonth}>
						<Button variant="ghost" size="icon">
							<ChevronLeft className="w-4 h-4" />
						</Button>
					</Link>
					<Link href={nextMonth}>
						<Button variant="ghost" size="icon">
							<ChevronRight className="w-4 h-4" />
						</Button>
					</Link>
				</div>
			</div>

			<MobileCalendar />
			<GridCalendar
				locale={locale}
				year={year}
				month={month} />
		</div>
	)
}