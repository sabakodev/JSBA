import { fetchGraphQL } from "../fetch"
import {
	CategoriesResponse,
	GET_CATEGORIES,
	GET_FEATURED_POST,
	GET_POSTS_BY_CATEGORY,
	GET_POSTS_PAGINATED,
	GET_POST_BY_SLUG,
	GET_POST_SLUGS,
	GET_RELATED_POSTS,
	POSTS_PER_PAGE,
	Post,
	PostsPaginatedResponse,
	PostsSlugResponse,
	RelatedPostsResponse,
	SinglePost,
	SinglePostResponse,
} from "../queries/posts"

export async function getFeaturedPost() {
	const data = await fetchGraphQL<{
		posts: { nodes: Post[] }
	}>(GET_FEATURED_POST)

	return data.posts.nodes[0] || null
}

// Build a cursor map: page number → cursor
async function getCursorForPage(page: number, categorySlug?: string): Promise<string | null> {
	if (page <= 1) return null

	const skipCount = (page - 1) * POSTS_PER_PAGE

	// Use category filter if provided
	const query = categorySlug
		? `query GetCursor($first: Int!, $categorySlug: String!) {
			posts(first: $first, where: { categoryName: $categorySlug }) {
				pageInfo { endCursor }
				nodes { id }
			}
		}`
		: `query GetCursor($first: Int!) {
			posts(first: $first) {
				pageInfo { endCursor }
				nodes { id }
			}
		}`

	const variables: Record<string, unknown> = { first: skipCount }
	if (categorySlug) variables.categorySlug = categorySlug

	const data = await fetchGraphQL<{
		posts: {
			pageInfo: { endCursor: string }
			nodes: { id: string }[]
		}
	}>(query, variables)

	return data.posts.pageInfo.endCursor
}

// Get total post count (optionally by category)
async function getTotalPosts(categorySlug?: string): Promise<number> {
	const query = categorySlug
		? `query($categorySlug: String!) {
			posts(first: 999, where: { categoryName: $categorySlug }) {
				nodes { id }
			}
		}`
		: `query {
			posts(first: 999) {
				nodes { id }
			}
		}`

	const variables = categorySlug ? { categorySlug } : undefined

	const data = await fetchGraphQL<{
		posts: { nodes: { id: string }[] }
	}>(query, variables)

	return data.posts.nodes.length
}

export async function getPostSlugs(first: number = 100) {
	const data = await fetchGraphQL<PostsSlugResponse>(
		GET_POST_SLUGS,
		{
			first,
		}
	)

	return data.posts.nodes
}

export async function getPosts(page: number = 1) {
	const [cursor, totalPosts] = await Promise.all([
		getCursorForPage(page),
		getTotalPosts(),
	])

	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

	const data = await fetchGraphQL<PostsPaginatedResponse>(
		GET_POSTS_PAGINATED,
		{
			first: POSTS_PER_PAGE,
			after: cursor,
		}
	)

	return {
		posts: data.posts.nodes,
		totalPages,
		currentPage: page,
		hasNextPage: data.posts.pageInfo.hasNextPage,
		hasPreviousPage: page > 1,
	}
}

export async function getPostsByCategory(
	categorySlug: string,
	page: number = 1,
) {
	const [cursor, totalPosts] = await Promise.all([
		getCursorForPage(page, categorySlug),
		getTotalPosts(categorySlug),
	])

	const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE)

	const data = await fetchGraphQL<PostsPaginatedResponse>(
		GET_POSTS_BY_CATEGORY,
		{
			first: POSTS_PER_PAGE,
			after: cursor,
			categorySlug,
		}
	)

	return {
		posts: data.posts.nodes,
		totalPages,
		currentPage: page,
		hasNextPage: data.posts.pageInfo.hasNextPage,
		hasPreviousPage: page > 1,
	}
}

export async function getCategories() {
	const data = await fetchGraphQL<CategoriesResponse>(GET_CATEGORIES)
	return data.categories.nodes
}

export async function getPostBySlug(slug: string): Promise<SinglePost | null> {
	const data = await fetchGraphQL<SinglePostResponse>(GET_POST_BY_SLUG, {
		slug,
	})

	return data.post || null
}

export async function getRelatedPosts(categorySlug: string, excludeId: string, first: number = 3) {
	const data = await fetchGraphQL<RelatedPostsResponse>(GET_RELATED_POSTS, {
		categorySlug,
		excludeId,
		first,
	})

	return data.posts.nodes
}