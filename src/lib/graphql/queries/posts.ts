export const GET_POSTS_PAGINATED = `
	query GetPostsPaginated($first: Int!, $after: String) {
		posts(first: $first, after: $after) {
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
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

export const GET_ALL_POST_CURSORS = `
	query GetAllPostCursors($first: Int!) {
		posts(first: $first) {
			nodes {
				id
			}
			pageInfo {
				endCursor
			}
		}
	}
`

export const POSTS_PER_PAGE = 5

export interface Post {
	id: string
	slug: string
	title: string
	excerpt: string
	date: string
	featuredImage?: {
		node: {
			sourceUrl: string
			altText: string
		}
	}
	categories: {
		nodes: {
			name: string
			slug: string
		}[]
	}
	author: {
		node: {
			name: string
			avatar?: {
				url: string
			}
		}
	}
}

export interface PostsPaginatedResponse {
	posts: {
		pageInfo: {
			hasNextPage: boolean
			hasPreviousPage: boolean
			startCursor: string
			endCursor: string
		}
		nodes: Post[]
	}
}

export const GET_POSTS_BY_CATEGORY = `
	query GetPostsByCategory($first: Int!, $after: String, $categorySlug: String!) {
		posts(first: $first, after: $after, where: { categoryName: $categorySlug }) {
			pageInfo {
				hasNextPage
				hasPreviousPage
				startCursor
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

export const GET_CATEGORIES = `
	query GetCategories {
		categories(first: 20, where: { hideEmpty: true }) {
			nodes {
				id
				name
				slug
				count
			}
		}
	}
`

export interface Category {
	id: string
	name: string
	slug: string
	count: number
}

export interface CategoriesResponse {
	categories: {
		nodes: Category[]
	}
}

export const GET_FEATURED_POST = `
	query GetFeaturedPost {
		posts(first: 1, where: { categoryName: "featured" }) {
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
			slug
			title
			content
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
			tags {
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
`

export const GET_RELATED_POSTS = `
	query GetRelatedPosts($categorySlug: String!, $excludeId: ID!, $first: Int!) {
		posts(
			first: $first,
			where: {
				categoryName: $categorySlug,
				notIn: [$excludeId]
			}
		) {
			nodes {
				id
				slug
				title
				excerpt
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
			}
		}
	}
`

export interface SinglePost extends Post {
	content: string
	tags: {
		nodes: {
			name: string
			slug: string
		}[]
	}
}

export interface SinglePostResponse {
	post: SinglePost
}

export interface RelatedPostsResponse {
	posts: {
		nodes: Post[]
	}
}


