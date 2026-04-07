'use client'

import { usePathname, useRouter } from "@/i18n/nav"
import { EventType } from "@/lib/graphql/queries/events"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Component({
	categories,
	category

}: {
	categories: EventType[]
	category?: string
}) {
	const t = useTranslations('eventPage.filter')

	const router = useRouter()
	const pathname = usePathname()

	const handleCategoryClick = (slug?: string) => {
		const params = new URLSearchParams({ category: category ?? '' })

		// Reset to page 1 when changing category
		params.delete("page")
		params.delete("cursor")

		if (slug) {
			params.set("category", slug)
		} else {
			params.delete("category")
		}

		const query = params.toString()
		router.push(query ? `${pathname}?${query}` : pathname)
	}

	return (
		<div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
			<div className="flex flex-wrap gap-4">
				<button
					onClick={() => handleCategoryClick()}
					className={cn(
						"text-xs uppercase tracking-widest px-5 py-2 rounded-lg border",
						category ? "bg-secondary-950/10 text-secondary border-border/30 hover:border-primary/50 transition-colors" :
							"bg-secondary-900 text-primary border-primary/10"
					)}
				>
					All
				</button>
				{
					categories.map(({ name, slug }, index) => (
						<button
							key={index}
							onClick={() => handleCategoryClick(slug)}
							className={cn(
								"text-xs uppercase tracking-widest px-5 py-2 rounded-lg border",
								category === slug ? "bg-secondary-900 text-primary border-primary/10" :
									"bg-secondary-950/10 text-secondary border-border/30 hover:border-primary/50 transition-colors"
							)}
						>
							{name}
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