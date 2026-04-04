import { fetchGraphQL } from "../fetch"
import {
	EventNode,
	GetEventsResponse,
	GET_EVENTS,
	GET_EVENTS_FILTERED,
	GET_EVENTS_BY_SLUG,
} from "../queries/events"

interface GetEventsOptions {
	first?: number
	after?: string
	/** Filter events after this date. Defaults to 7 days ago. */
	afterDate?: Date
	/** Filter by event category slug */
	categorySlug?: string
}

function getLastWeekDate(): string {
	const date = new Date()
	date.setDate(date.getDate() - 7)
	return date.toISOString().split("T")[0] // "2026-03-28"
}

function buildDateQuery(afterDate?: Date) {
	const d = afterDate ?? new Date(getLastWeekDate())
	return {
		after: {
			year: d.getFullYear(),
			month: d.getMonth() + 1,
			day: d.getDate(),
		},
	}
}

export async function getEvents(options: GetEventsOptions = {}): Promise<EventNode[]> {
	const {
		first = 10,
		after,
		afterDate,
		categorySlug,
	} = options

	const dateQuery = buildDateQuery(afterDate)

	// Use category-filtered query or plain date-filtered query
	if (categorySlug) {
		const data = await fetchGraphQL<GetEventsResponse>(
			GET_EVENTS,
			{
				first,
				after,
				dateQuery,
				categorySlug,
			},
			{ tags: ["events"] }
		)
		return data.events.nodes
	}

	const data = await fetchGraphQL<GetEventsResponse>(
		GET_EVENTS_FILTERED,
		{
			first,
			after,
			dateQuery,
		},
		{ tags: ["events"] }
	)
	return data.events.nodes
}

export async function getEventBySlug(slug: string): Promise<EventNode | null> {
	const data = await fetchGraphQL<{ event: EventNode | null }>(
		GET_EVENTS_BY_SLUG,
		{ slug },
		{ tags: ["events"] }
	)
	return data.event
}