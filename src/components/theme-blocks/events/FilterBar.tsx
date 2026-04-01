import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('eventPage.filter')

	const filters = [
		{
			label: 'All Events',
			current: true,
		},
		{
			label: 'Liturgical',
			current: false,
		},
		{
			label: 'Educational',
			current: false,
		},
		{
			label: 'Community',
			current: false,
		},
	]

	return (
		<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
			<div className="flex flex-wrap gap-4">
				{
					filters.map(({ label, current }, index) => (
						<button
							key={index}
							className={cn(
								"text-xs uppercase tracking-widest px-5 py-2 rounded-lg border",
								current ? "bg-secondary-900 text-primary border-primary/10" :
									"bg-secondary-950/10 text-secondary border-border/30 hover:border-primary/50 transition-colors"
							)}
						>
							{label}
						</button>
					))
				}
			</div>
			<div className="flex items-center text-secondary gap-2">
				<span className="font-label text-xs uppercase tracking-widest opacity-60">{t('sortLabel')}:</span>
				<span className="font-label text-xs uppercase tracking-widest font-bold">Upcoming Date</span>
				<ChevronDown size={12} />
			</div>
		</div>
	)
}