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
	categories: {
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

export const GET_EVENTS = `
	query GetEvents(
		$first: Int = 10
		$after: String
		$dateQuery: DateQueryInput
		$categorySlug: String
	) {
		events(
			first: $first
			after: $after
			where: {
				orderby: { field: DATE, order: ASC }
				dateQuery: $dateQuery
				taxQuery: {
					taxArray: [
						{
							taxonomy: EVENTCATEGORY
							field: SLUG
							terms: [$categorySlug]
							operator: IN
						}
					]
				}
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
				categories {
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
		$dateQuery: DateQueryInput
	) {
		events(
			first: $first
			after: $after
			where: {
				orderby: { field: DATE, order: ASC }
				dateQuery: $dateQuery
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
				categories {
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
			categories {
				nodes {
					slug
					name
				}
			}
		}
	}
`


