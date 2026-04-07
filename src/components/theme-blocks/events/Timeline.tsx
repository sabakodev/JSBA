import { CalendarPlus, Clock4, MapPin } from "lucide-react"
import Image from "next/image"
import { type EventNode } from "@/lib/graphql/queries/events"
import { getEvents } from "@/lib/graphql/services/events"
import { getTranslations } from "next-intl/server"

// ── Helpers ──────────────────────────────────

function formatDate(dateStr: string) {
	const date = new Date(dateStr)
	return {
		short: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
		dayName: date.toLocaleDateString("en-US", { weekday: "long" }),
	}
}

function formatTime(dateStr: string) {
	const date = new Date(dateStr)
	return date.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	})
}

function calculateDuration(startStr: string, endStr: string) {
	const start = new Date(startStr)
	const end = new Date(endStr)
	const diffMs = end.getTime() - start.getTime()
	const diffMins = Math.round(diffMs / 60000)

	const hours = Math.floor(diffMins / 60)
	const mins = diffMins % 60

	if (hours === 0) return `${mins}m`
	if (mins === 0) return `${hours}h`
	return `${hours}h ${mins}m`
}

function isUpcoming(dateStr: string) {
	return new Date(dateStr) >= new Date()
}

function generateICSUrl(event: EventNode) {
	const start = new Date(event.eventSchedule.startAt)
		.toISOString()
		.replace(/[-:]/g, "")
		.replace(/\.\d{3}/, "")
	const end = new Date(event.eventSchedule.endAt)
		.toISOString()
		.replace(/[-:]/g, "")
		.replace(/\.\d{3}/, "")

	const ics = [
		"BEGIN:VCALENDAR",
		"VERSION:2.0",
		"BEGIN:VEVENT",
		`DTSTART:${start}`,
		`DTEND:${end}`,
		`SUMMARY:${event.title ?? event.slug}`,
		`LOCATION:${event.eventSchedule.location ?? ""}`,
		"END:VEVENT",
		"END:VCALENDAR",
	].join("\n")

	return `data:text/calendar;charset=utf-8,${encodeURIComponent(ics)}`
}

// ── Component ────────────────────────────────

export default async function EventTimeline({
	events,
	categorySlug,
}: {
	events: EventNode[]
	categorySlug?: string
}) {
	const t = await getTranslations('eventPage.timeline')

	const now = new Date()


	// const events = await getEvents({
	// 	first: count,
	// 	afterDate: yesterday,
	// 	categorySlug: categorySlug,
	// })

	if (events && !events.length) {
		return (
			<section className="lg:col-span-8 text-center py-24 text-secondary">
				{t('noUpcoming')}
			</section>
		)
	}

	return (
		<section className="lg:col-span-8 space-y-24 relative">
			<div className="absolute left-0 top-0 bottom-0 w-px bg-border/20 hidden md:block" />

			{events.map((event) => {
				const { short, dayName } = formatDate(event.eventSchedule.startAt)
				const timeStart = formatTime(event.eventSchedule.startAt)
				const timeEnd = formatTime(event.eventSchedule.endAt)
				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const duration = calculateDuration(
					event.eventSchedule.startAt,
					event.eventSchedule.endAt
				)
				const upcoming = isUpcoming(event.eventSchedule.startAt)
				const image = event.eventSchedule.featuredImage?.node
				const icsUrl = generateICSUrl(event)

				return (
					<article
						key={event.id}
						className="relative pl-0 md:pl-12 flex flex-col md:flex-row gap-8"
					>
						{/* Timeline dot */}
						<div
							className={`
								hidden md:block absolute -left-1.25 top-2
								w-2.5 h-2.5 rounded-full ring-4 ring-surface
								${upcoming ? "bg-primary" : "bg-border"}
							`}
						/>

						{/* Date column */}
						<div className="md:w-32 shrink-0">
							<div
								className={`
									font-serif text-3xl leading-none
									${upcoming ? "text-primary" : "text-secondary opacity-60"}
								`}
							>
								{short}
							</div>
							<div className="font-label text-xs uppercase tracking-widest text-secondary mt-1">
								{dayName}
							</div>
						</div>

						{/* Content */}
						<div className={`grow ${image ? "group" : ""}`}>
							{/* Featured image */}
							{image && (
								<div className="overflow-hidden rounded-lg mb-6">
									<Image
										className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700 sepia-[0.2]"
										src={image.sourceUrl}
										alt={image.altText || event.title || "Event image"}
										width={800}
										height={256}
									/>
								</div>
							)}

							{/* Title */}
							<h3
								className={`
									font-serif text-3xl mb-3
									${image ? "group-hover:text-primary transition-colors" : ""}
								`}
							>
								{event.title ?? event.slug}
							</h3>

							{/* Description */}
							{event.excerpt && (
								<div
									className="text-secondary mb-6 leading-relaxed max-w-prose"
									dangerouslySetInnerHTML={{ __html: event.excerpt }}
								/>
							)}

							{/* Meta row */}
							<div className="flex flex-wrap items-center gap-6 mb-8">
								<div className="flex items-center gap-2 text-secondary/80">
									<Clock4 className="text-lg" size={14} />
									{event.eventSchedule.endAt ? (
										<span className="text-sm">
											{timeStart} — {timeEnd}
										</span>
									) : (
										<span className="text-sm">
											{timeStart}
										</span>
									)}
									{/* Duration badge */}
									{/* <div className="inline-block text-[10px] font-label uppercase tracking-wider bg-secondary text-secondary-foreground px-2 py-0.5 rounded">
										{duration}
									</div> */}
								</div>
								{event.eventSchedule.location && (
									<div className="flex items-center gap-2 text-secondary/80">
										<MapPin size={14} />
										<span className="text-sm">
											{event.eventSchedule.location}
										</span>
									</div>
								)}
							</div>

							{/* Add to Calendar */}
							<a
								href={icsUrl}
								download={`${event.slug}.ics`}
								className="font-label text-xs uppercase tracking-[0.15em] text-primary flex items-center gap-2 group/btn"
							>
								{t('addToCalendar')}
								<CalendarPlus
									className="transition-transform group-hover/btn:translate-x-1"
									size={12}
								/>
							</a>
						</div>
					</article>
				)
			})}
		</section>
	)
}