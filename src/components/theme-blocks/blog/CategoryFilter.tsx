"use client"

import { cn } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { usePathname } from "@/i18n/nav"
import type { Category } from "@/lib/graphql/queries/posts"
import { useTranslations } from "next-intl"

interface CategoryFilterProps {
	categories: Category[]
	activeCategory?: string
}

export const skipFilter = ['uncategorized', 'featured']

export default function CategoryFilter({ categories, activeCategory }: CategoryFilterProps) {
	const t = useTranslations('blogPage.category')

	const router = useRouter()
	const searchParams = useSearchParams()
	const pathname = usePathname()

	const handleCategoryClick = (slug?: string) => {
		const params = new URLSearchParams(searchParams.toString())

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
		<div className="flex flex-wrap justify-center md:justify-start gap-3">
			<button
				onClick={() => handleCategoryClick()}
				className={cn(
					"px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-colors",
					!activeCategory
						? "bg-primary text-primary-foreground"
						: "bg-secondary-900 text-secondary-100/70 hover:bg-surface-variant"
				)}
			>
				{t('all')}
			</button>
			{categories.filter((category) => !skipFilter.includes(category.slug)).map((category) => (
				<button
					key={category.id}
					onClick={() => handleCategoryClick(category.slug)}
					className={cn(
						"px-5 py-2 rounded-full text-xs uppercase tracking-widest transition-colors",
						activeCategory === category.slug
							? "bg-primary text-primary-foreground"
							: "bg-secondary-900 text-secondary-100/70 hover:bg-surface-variant"
					)}
				>
					{category.name}
				</button>
			))}
		</div>
	)
}