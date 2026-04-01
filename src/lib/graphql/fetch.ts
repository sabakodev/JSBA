interface GraphQLResponse<T> {
	data: T
	errors?: { message: string }[]
}

export async function fetchGraphQL<T>(
	query: string,
	variables?: Record<string, unknown>,
	options?: { revalidate?: number; tags?: string[] }
): Promise<T> {
	const res = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL!, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ query, variables }),
		next: {
			revalidate: options?.revalidate ?? 3600, // Cache for 1 hour by default
			tags: options?.tags,
		},
	})

	const json: GraphQLResponse<T> = await res.json()

	if (json.errors) {
		console.error("GraphQL Errors:", json.errors)
		throw new Error(json.errors.map((e) => e.message).join(", "))
	}

	return json.data
}