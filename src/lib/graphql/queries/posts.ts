export const GET_POSTS = `
	query GetPosts($first: Int = 10, $after: String) {
		posts(first: $first, after: $after) {
			pageInfo {
				hasNextPage
				endCursor
			}
			nodes {
				id
				slug
				title
				excerpt
				date
				featuredImage {
					node {
						sourceUrl
						altText
					}
				}
				categories {
					nodes {
						name
						slug
					}
				}
				author {
					node {
						name
						avatar {
							url
						}
					}
				}
			}
		}
	}
`

export const GET_POST_BY_SLUG = `
	query GetPostBySlug($slug: ID!) {
		post(id: $slug, idType: SLUG) {
			id
			title
			content
			date
			featuredImage {
				node {
					sourceUrl
					altText
				}
			}
			author {
				node {
					name
					avatar {
						url
					}
				}
			}
			categories {
				nodes {
					name
					slug
				}
			}
		}
	}
`

export const GET_PAGES = `
	query GetPages {
		pages {
			nodes {
				id
				slug
				title
				content
			}
		}
	}
`