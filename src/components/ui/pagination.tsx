"use client"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

interface PaginationProps {
	currentPage: number
	totalPages: number
	category?: string
}

export default function Pagination({ currentPage, totalPages, category }: PaginationProps) {
	const router = useRouter()

	if (totalPages <= 1) return null

	const goToPage = (page: number) => {
		const params = new URLSearchParams()
		params.set("page", page.toString())
		if (category) params.set("category", category)
		router.push(`?${params.toString()}`)
	}

	const getPageNumbers = () => {
		const pages: (number | "...")[] = []

		if (totalPages <= 7) {
			for (let i = 1; i <= totalPages; i++) pages.push(i)
		} else {
			pages.push(1)
			if (currentPage > 3) pages.push("...")
			for (
				let i = Math.max(2, currentPage - 1);
				i <= Math.min(totalPages - 1, currentPage + 1);
				i++
			) {
				pages.push(i)
			}
			if (currentPage < totalPages - 2) pages.push("...")
			pages.push(totalPages)
		}

		return pages
	}

	return (
		<nav className="mb-24 flex justify-center items-center space-x-4">
			<button
				onClick={() => goToPage(currentPage - 1)}
				disabled={currentPage <= 1}
				className={cn(
					"w-10 h-10 flex items-center justify-center rounded-lg border border-border/30 transition-colors",
					currentPage <= 1
						? "text-outline/30 cursor-not-allowed"
						: "text-outline hover:border-primary hover:text-primary"
				)}
			>
				<ChevronLeft size={12} />
			</button>

			{getPageNumbers().map((page, i) =>
				page === "..." ? (
					<span key={`ellipsis-${i}`} className="text-outline">...</span>
				) : (
					<button
						key={page}
						onClick={() => goToPage(page)}
						className={cn(
							"w-10 h-10 flex items-center justify-center rounded-lg text-sm transition-colors",
							page === currentPage
								? "bg-primary text-primary-foreground"
								: "border border-border/30 text-secondary hover:border-primary hover:text-primary"
						)}
					>
						{page}
					</button>
				)
			)}

			<button
				onClick={() => goToPage(currentPage + 1)}
				disabled={currentPage >= totalPages}
				className={cn(
					"w-10 h-10 flex items-center justify-center rounded-lg border border-border/30 transition-colors",
					currentPage >= totalPages
						? "text-outline/30 cursor-not-allowed"
						: "text-outline hover:border-primary hover:text-primary"
				)}
			>
				<ChevronRight size={12} />
			</button>
		</nav>
	)
}