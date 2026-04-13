'use client'

import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip"
import { LiturgicalWeek, cn } from "@/lib/utils"
import { FASTING_CONFIG } from "@/lib/utils/calendar"
import { useTranslations } from "next-intl"

export default function FastingIndicator({ type }: { type: LiturgicalWeek["fastingType"] }) {
	const t = useTranslations('eventPage.schedule')

	if (type === "none") return null

	const config = FASTING_CONFIG[type]
	const Icon = config.icon

	return (
		<TooltipProvider delayDuration={200}>
			<Tooltip>
				<TooltipTrigger asChild>
					<div className={cn("inline-flex items-center gap-0.5 px-1 py-0.5 rounded text-[9px]", config.bg, config.color)}>
						<Icon className="w-2.5 h-2.5" />
						<span className="hidden sm:inline">{t(`fast.${type}`)}</span>
					</div>
				</TooltipTrigger>
				<TooltipContent className="flex-col">
					<p className="text-xs font-medium">{t(`fastFull.${type}.label`)}</p>
					<p className="text-[10px] text-muted-foreground">
						{t(`fastFull.${type}.description`)}
					</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}