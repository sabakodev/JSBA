import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip"
import { Badge } from '@/components/ui/badge'
import { ResolvedFeast, cn } from "@/lib/utils"
import { FEAST_TYPE_CONFIG, JULIAN_MONTHS } from "@/lib/utils/calendar"

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
										: "bg-purple-50 text-purple-800"
						)}
					>
						{({ default: feast.name, id: feast.nameId, el: feast.nameEl })[locale] ?? feast.name}
					</div>
				</TooltipTrigger>
				<TooltipContent side="right" className="bg-white text-foreground max-w-xs shadow-sm hover:shadow-md transition-shadow">
					<div className="space-y-1.5">
						<div className="flex items-center gap-2">
							<Badge className={cn("text-[10px]", config.color)}>
								{config.label}
							</Badge>
							<Badge variant="outline" className="text-[10px]">
								{feast.source === "fixed" ? "Fixed" : "Moveable"}
							</Badge>
						</div>
						<p className="font-semibold text-sm">{feast.name}</p>
						<p className="text-xs text-muted-foreground italic">{feast.nameEl}</p>
						<p className="text-xs text-muted-foreground">{feast.nameId}</p>
						<div className="text-[10px] text-muted-foreground pt-1 border-t">
							Julian: {JULIAN_MONTHS[feast.julianDate.month - 1]} {feast.julianDate.day}
						</div>
					</div>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}