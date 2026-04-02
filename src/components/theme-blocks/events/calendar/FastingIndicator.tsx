import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip"
import { LiturgicalWeek, cn } from "@/lib/utils"
import { FASTING_CONFIG } from "@/lib/utils/calendar"

export default function FastingIndicator({ type }: { type: LiturgicalWeek["fastingType"] }) {
	if (type === "none") return null

	const config = FASTING_CONFIG[type]
	const Icon = config.icon

	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className={cn("inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[9px]", config.bg, config.color)}>
						<Icon className="w-2.5 h-2.5" />
						<span className="hidden sm:inline">{config.label}</span>
					</div>
				</TooltipTrigger>
				<TooltipContent className="flex-col">
					<p className="text-xs font-medium">{config.label}</p>
					<p className="text-[10px] text-muted-foreground">
						{type === "strict" && "No food, or bread & water only"}
						{type === "xerophagy" && "Simple food: bread, fruits, nuts, vegetables"}
						{type === "oil-wine" && "Cooked food with olive oil and wine permitted"}
						{type === "fish" && "Fish, oil, and wine permitted"}
						{type === "dairy" && "No meat, but dairy and eggs permitted"}
						{type === "regular" && "No meat, dairy, or fish"}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}