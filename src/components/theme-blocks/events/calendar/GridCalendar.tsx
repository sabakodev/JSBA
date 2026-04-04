import { FEAST_TYPE_CONFIG, JULIAN_MONTHS, FASTING_CONFIG, buildMonthGrid } from "@/lib/utils/calendar"
import { FastingIndicator, FeastChip } from "./index"
import { cn } from "@/lib/utils"
import { useMemo } from "react"

const DOW_HEADERS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

interface Props {
	year: number
	month: number
	locale: string
}

export default function GridCalendar({ locale, year, month }: Props) {
	const weeks = useMemo(() => buildMonthGrid(
		year,
		month,
	), [year, month])

	return (
		<>
			{/* ── Day-of-week headers ── */}
			<div className="grid grid-cols-7 border-b">
				{DOW_HEADERS.map((dow, i) => (
					<div
						key={dow}
						className={cn(
							"text-center text-xs font-medium py-2 text-muted-foreground",
							(i === 3 || i === 5) && "text-purple-500" // Wed & Fri fasting highlight
						)}
					>
						{dow}
					</div>
				))}
			</div>

			{/* ── Calendar Grid ── */}
			<div className="w-full overflow-x-auto">
				<div className="min-w-175 border-l border-primary border-t">
					{weeks.map((week, wi) => (
						<div key={wi} className="grid grid-cols-7 *:min-w-25">
							{week.map((cell, di) => (
								<div
									key={di}
									className={cn(
										"border-r border-primary border-b min-w-25 min-h-25 sm:min-h-30 p-1.5 transition-colors",
										"hover:bg-accent/30",
										!cell.isCurrentMonth && "bg-muted/30 opacity-50",
										cell.isToday && "bg-primary/5 ring-1 ring-inset ring-primary/20",
										cell.fasting.active && cell.isCurrentMonth && "bg-linear-to-b from-transparent to-purple-100/50"
									)}
								>
									{/* ── Day number row ── */}
									<div className="flex items-start justify-between gap-1">
										<div className="md:flex items-baseline gap-1">
											<div
												className={cn(
													"text-sm font-medium leading-none",
													cell.isToday &&
													"bg-primary text-primary-foreground w-6 h-6 rounded-sm flex items-center justify-center text-xs",
													!cell.isCurrentMonth && "text-muted-foreground"
												)}
											>
												{cell.gregorian.day}
											</div>
											<div className="text-xs text-muted-foreground/70 leading-none">
												{JULIAN_MONTHS[cell.julian.month - 1]} {cell.julian.day}
											</div>
										</div>
										{cell.fasting.active && cell.isCurrentMonth && (
											<FastingIndicator type={cell.fasting.type} />
										)}
									</div>

									{/* ── Feast chips ── */}
									{cell.isCurrentMonth && cell.feasts.length > 0 && (
										<div className="mt-1 space-y-0.5">
											{cell.feasts.slice(0, 3).map((feast, fi) => (
												<FeastChip key={fi} feast={feast} locale={locale} />
											))}
											{cell.feasts.length > 3 && (
												<p className="text-[9px] text-muted-foreground pl-1">
													+{cell.feasts.length - 3} more
												</p>
											)}
										</div>
									)}
								</div>
							))}
						</div>
					))}
				</div>
			</div>

			{/* ── Legend ── */}
			<div className="mt-4 px-2 text-[10px]">
				<span className="font-medium text-foreground pb-2">Legend:</span>
				<div className="flex flex-col sm:flex-row justify-between text-muted-foreground gap-4 mt-2">
					<span className="flex gap-3">
						{Object.entries(FEAST_TYPE_CONFIG).map(([key, val]) => (
							<span key={key} className="flex items-center gap-1">
								<span className={cn("w-2 h-2 rounded-sm", val.color)} />
								{val.label}
							</span>
						))}
					</span>
					{/* <span className="mx-1 opacity-30 sm:hidden">|</span> */}
					<span className="grid grid-cols-3 md:grid-cols-6 gap-3">
						{Object.entries(FASTING_CONFIG)
							.filter(([k]) => k !== "none")
							.map(([key, val]) => {
								const Icon = val.icon
								return (
									<span key={key} className={cn("flex items-center gap-1", val.color)}>
										<Icon className="w-2.5 h-2.5" />
										{val.label}
									</span>
								)
							})}
					</span>
				</div>
			</div>
		</>
	)
}