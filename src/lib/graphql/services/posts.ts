import { fetchGraphQL } from "../fetch"
import { GET_POSTS, GET_POST_BY_SLUG } from "../queries/posts"

// Types
export interface WPPost {
	id: string
	slug: string
	title: string
	excerpt: string
	content?: string
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
			avatar: { url: string }
		}
	}
}

interface GetPostsResponse {
	posts: {
		pageInfo: {
			hasNextPage: boolean
			endCursor: string
		}
		nodes: WPPost[]
	}
}

interface GetPostBySlugResponse {
	post: WPPost
}

export async function getPosts(first = 10, after?: string) {
	const data = await fetchGraphQL<GetPostsResponse>(
		GET_POSTS,
		{ first, after },
		{ tags: ["posts"] }
	)
	return data.posts
}

export async function getPostBySlug(slug: string) {
	const data = await fetchGraphQL<GetPostBySlugResponse>(
		GET_POST_BY_SLUG,
		{ slug },
		{ tags: [`post-${slug}`] }
	)
	return data.post
}