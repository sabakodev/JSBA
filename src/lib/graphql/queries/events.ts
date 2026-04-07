export interface EventNode {
	id: string
	title: string | null
	slug: string
	excerpt: string | null
	eventSchedule: {
		startAt: string
		endAt: string
		location: string | null
		featuredImage: {
			node: {
				sourceUrl: string
				altText: string
			}
		} | null
	}
	eventTypes: {
		nodes: {
			slug: string
			name: string
		}[]
	} | null
}

export interface GetEventsResponse {
	events: {
		nodes: EventNode[]
	}
}

export const GET_CATEGORIES = `
	query GetEventCategories {
		eventTypes(first: 20, where: { hideEmpty: true }) {
			nodes {
				id
				name
				slug
				count
			}
		}
	}
`

export interface EventType {
	id: string
	name: string
	slug: string
	count: number
}

export interface CategoriesResponse {
	eventTypes: {
		nodes: EventType[]
	}
}

export const GET_EVENTS = `
	query GetEvents(
		$first: Int = 10
		$after: String
		$startAt: String
		$categorySlug: String
	) {
	events(
		first: $first
		after: $after
		where: {
			orderByStartAt: ASC,
			startAtAfter: $startAt,
			eventTypeSlug: $categorySlug
		}
	) {
		nodes {
			id
			title
			slug
			excerpt
			eventSchedule {
				startAt
				endAt
				location
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
			}
			eventTypes {
				nodes {
					slug
					name
				}
			}
		}
		pageInfo {
			hasNextPage
			endCursor
		}
	}
}
`

// When no category filter needed, use this variant
// to avoid sending null taxonomy filter which may error
export const GET_EVENTS_FILTERED = `
	query GetEventsFiltered(
		$first: Int = 10
		$after: String
		$startAt: String
	) {
		events(
			first: $first
			after: $after
			where: {
				orderByStartAt: ASC
				startAtAfter: $startAt
			}
		) {
			nodes {
				id
				title
				slug
				excerpt
				eventSchedule {
					startAt
					endAt
					location
					featuredImage {
						node {
							sourceUrl
							altText
						}
					}
				}
				eventTypes {
					nodes {
						slug
						name
					}
				}
			}
			pageInfo {
				hasNextPage
				endCursor
			}
		}
	}
`

export const GET_EVENTS_BY_SLUG = `
	query GetEventBySlug($slug: ID!) {
		event(id: $slug, idType: SLUG) {
			id
			title
			slug
			excerpt
			eventSchedule {
				startAt
				endAt
				location
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
			}
			eventTypes {
				nodes {
					slug
					name
				}
			}
		}
	}
`


