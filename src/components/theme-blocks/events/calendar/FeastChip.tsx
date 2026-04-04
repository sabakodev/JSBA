"use client"

import { useState } from "react"
import { TooltipProvider, TooltipTrigger, TooltipContent, Tooltip } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { FEAST_TYPE_CONFIG, JULIAN_MONTHS } from "@/lib/utils/calendar"
import { CalendarCheck, CalendarClock, X } from "lucide-react"
import type { ResolvedFeast } from "@/lib/utils/julian-calendar"

// ──────────────────────────────────────
// Source icon
// ──────────────────────────────────────

function SourceIcon({ source }: { source: "fixed" | "moveable" }) {
	return source === "fixed" ? (
		<CalendarCheck className="size-3" />
	) : (
		<CalendarClock className="size-3" />
	)
}

// ──────────────────────────────────────
// Shared feast detail content
// ──────────────────────────────────────

function FeastDetail({ feast }: { feast: ResolvedFeast }) {
	const config = FEAST_TYPE_CONFIG[feast.type]

	return (
		<div className="space-y-0">
			{/* ── Header ── */}
			<div className="flex items-center gap-2 flex-wrap px-3 pt-2.5 pb-2">
				<Badge className={cn("text-[10px]", config.color)}>
					{config.label}
				</Badge>
				<Badge variant="outline" className="text-[10px] text-primary">
					<SourceIcon source={feast.source} />
					{feast.source === "fixed" ? "Fixed" : "Moveable"}
				</Badge>
				{feast.saints.length > 0 && (
					<span className="text-[10px] text-muted-foreground ml-auto">
						{feast.saints.length} saint{feast.saints.length > 1 ? "s" : ""}
					</span>
				)}
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

					{/* ── Footer ── */}
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
						<p className="text-xs text-muted-foreground italic">{feast.nameEl}</p>
						<p className="text-xs text-muted-foreground">{feast.nameId}</p>
					</div>
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
			)}
		</div>
	)
}

// ──────────────────────────────────────
// Bottom Drawer (mobile)
// ──────────────────────────────────────

function BottomDrawer({
	open,
	onClose,
	children,
}: {
	open: boolean
	onClose: () => void
	children: React.ReactNode
}) {
	return (
		<>
			{/* Backdrop */}
			<div
				className={cn(
					"fixed inset-0 z-50 bg-black/40 transition-opacity duration-300",
					open ? "opacity-100" : "opacity-0 pointer-events-none"
				)}
				onClick={onClose}
			/>

			{/* Drawer */}
			<div
				className={cn(
					"fixed bottom-0 left-0 right-0 z-50 bg-background rounded-t-2xl shadow-2xl transition-transform duration-300 ease-out max-h-[70vh] overflow-hidden flex flex-col",
					open ? "translate-y-0" : "translate-y-full"
				)}
			>
				{/* Handle bar */}
				<div className="flex justify-center pt-3 pb-1">
					<div className="w-10 h-1 bg-muted-foreground/20 rounded-full" />
				</div>

				{/* Close button */}
				<button
					onClick={onClose}
					className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-muted transition-colors"
					aria-label="Close"
				>
					<X size={16} className="text-muted-foreground" />
				</button>

				{/* Content */}
				<div className="overflow-y-auto pb-safe-area-inset-bottom pb-6">
					{children}
				</div>
			</div>
		</>
	)
}

// ──────────────────────────────────────
// Chip label (shared)
// ──────────────────────────────────────

function ChipLabel({ feast, locale }: { feast: ResolvedFeast; locale: string }) {
	const config = FEAST_TYPE_CONFIG[feast.type]
	const name = ({ en: feast.name, id: feast.nameId, el: feast.nameEl } as Record<string, string>)[locale] ?? feast.name

	return (
		<div
			className={cn(
				"text-[10px] leading-tight px-1.5 py-4 md:py-0.5 cursor-default select-none",
				"border-l-2 transition-colors active:opacity-70",
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
			<span className="line-clamp-2">{name}</span>
		</div>
	)
}

// ──────────────────────────────────────
// Main component — desktop tooltip, mobile drawer
// ──────────────────────────────────────

export default function FeastChip({ feast, locale }: { feast: ResolvedFeast; locale: string }) {
	const [drawerOpen, setDrawerOpen] = useState(false)

	return (
		<>
			{/* ── Desktop: Tooltip ── */}
			<div className="hidden md:block">
				<TooltipProvider delayDuration={200}>
					<Tooltip>
						<TooltipTrigger asChild>
							<div>
								<ChipLabel feast={feast} locale={locale} />
							</div>
						</TooltipTrigger>
						<TooltipContent
							side="right"
							className="bg-white text-foreground max-w-sm shadow-sm hover:shadow-md transition-shadow p-0 overflow-hidden"
						>
							<FeastDetail feast={feast} />
						</TooltipContent>
					</Tooltip>
				</TooltipProvider>
			</div>

			{/* ── Mobile: Tap → Drawer ── */}
			<div className="md:hidden">
				<div onClick={() => setDrawerOpen(true)}>
					<ChipLabel feast={feast} locale={locale} />
				</div>

				<BottomDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
					<FeastDetail feast={feast} />
				</BottomDrawer>
			</div>
		</>
	)
}