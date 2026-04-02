import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge'
import { ResolvedFeast, cn } from "@/lib/utils"
import { FEAST_TYPE_CONFIG, JULIAN_MONTHS } from "@/lib/utils/calendar"
import { CalendarCheck, CalendarClock } from "lucide-react"

function SourceIcon({ source }: { source: "fixed" | "moveable" }) {
	return source === "fixed" ? (
		<CalendarCheck className="size-3" />
	) : (
		<CalendarClock className="size-3" />
	)
}

export default function FeastChip({ feast, locale }: { feast: ResolvedFeast, locale: string }) {
	const config = FEAST_TYPE_CONFIG[feast.type]

	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div
						className={cn(
							"text-[10px] leading-tight px-1.5 py-0.5 line-clamp-3 cursor-default",
							"border-l-2",
							config.border,
							feast.type === "great"
								? "bg-red-50 text-red-800 font-semibold"
								: feast.type === "major"
									? "bg-amber-50 text-amber-800"
									: feast.type === "minor"
										? "bg-sky-50 text-sky-800"
										: feast.type === "saint"
											? "bg-gray-50 text-gray-600"
											: "bg-purple-50 text-purple-800"
						)}
					>
						{({ default: feast.name, id: feast.nameId, el: feast.nameEl })[locale] ?? feast.name}
					</div>
				</TooltipTrigger>
				<TooltipContent
					side="right"
					className="bg-white text-foreground max-w-sm shadow-sm hover:shadow-md transition-shadow p-0 overflow-hidden"
				>
					<div className="space-y-0">
						{/* ── Header ── */}
						<div className="flex items-center gap-2 px-3 pt-2.5 pb-2">
							<Badge className={cn("text-[10px]", config.color)}>
								{config.label}
							</Badge>
							<Badge variant="outline" className="text-[10px] text-primary">
								<SourceIcon source={feast.source} />
								{feast.source === "fixed" ? "Fixed" : "Moveable"}
							</Badge>
							{
								feast.saints.length > 0 &&
								<span className="text-[10px] text-muted-foreground ml-auto">
									{feast.saints.length} saint{feast.saints.length > 1 ? "s" : ""}
								</span>
							}
						</div>

						{feast.type === "saint" ? (
							<>
								{/* ── Saints list ── */}
								<div className="max-h-60 overflow-y-auto">
									<ul className="divide-y divide-border">
										{feast.saints.map((saint, i) => (
											<li key={i} className="px-3 py-2 hover:bg-muted/50 transition-colors">
												<p className="font-semibold text-sm leading-tight">
													{saint.name}
												</p>
												<p className="text-xs text-muted-foreground italic mt-0.5">
													{saint.nameEl}
												</p>
												<p className="text-xs text-muted-foreground mt-0.5">
													{saint.nameId}
												</p>
											</li>
										))}
									</ul>
								</div>

								{/* ── Footer with date ── */}
								<div className="text-[10px] text-muted-foreground px-3 py-2 border-t bg-muted/30">
									<div className="flex items-center justify-between">
										<span>
											Julian: {JULIAN_MONTHS[feast.julianDate.month - 1]}{" "}
											{feast.julianDate.day}
										</span>
										<span>
											Gregorian: {feast.gregorianDate.month}/{feast.gregorianDate.day}/
											{feast.gregorianDate.year}
										</span>
									</div>
								</div>
							</>
						) : (
							<>
								{/* ── Non-saint feast ── */}
								<div className="px-3 pb-2">
									<p className="font-semibold text-sm">{feast.name}</p>
									<p className="text-xs text-muted-foreground italic">
										{feast.nameEl}
									</p>
									<p className="text-xs text-muted-foreground">
										{feast.nameId}
									</p>
								</div>
								<div className="text-[10px] text-muted-foreground px-3 py-2 border-t bg-muted/30">
									Julian: {JULIAN_MONTHS[feast.julianDate.month - 1]}{" "}
									{feast.julianDate.day}
								</div>
							</>
						)}
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}