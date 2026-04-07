import { fetchGraphQL } from "../fetch"
import {
	EventNode,
	GetEventsResponse,
	GET_EVENTS,
	GET_EVENTS_FILTERED,
	GET_EVENTS_BY_SLUG,
	GET_CATEGORIES,
	CategoriesResponse,
} from "../queries/events"

interface GetEventsOptions {
	first?: number
	after?: string
	/** Filter events after this date. Defaults to yesterday. */
	afterDate?: Date
	/** Filter by event category slug */
	categorySlug?: string
}

export async function getCategories() {
	const data = await fetchGraphQL<CategoriesResponse>(GET_CATEGORIES)
	return data.eventTypes.nodes
}

export async function getEvents(options: GetEventsOptions = {}): Promise<EventNode[]> {
	const {
		first = 10,
		after,
		afterDate,
		categorySlug,
	} = options

	// const dateQuery = buildDateQuery(afterDate)
	const startAt = new Date(afterDate ?? 0).toISOString()

	// Use category-filtered query or plain date-filtered query
	if (categorySlug) {
		const data = await fetchGraphQL<GetEventsResponse>(
			GET_EVENTS,
			{
				first,
				after,
				startAt,
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
			startAt,
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