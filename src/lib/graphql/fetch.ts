interface GraphQLResponse<T> {
	data: T
	errors?: { message: string }[]
}

export async function fetchGraphQL<T>(
	query: string,
	variables?: Record<string, unknown>,
	options?: { revalidate?: number; tags?: string[] }
): Promise<T> {
	const url = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL

	if (!url) {
		throw new Error("NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL is not defined")
	}

	console.debug("Fetching from:", url)

	const res = await fetch(url, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
			...(process.env.WP_AUTH_TOKEN && {
				Authorization: `Bearer ${process.env.WP_AUTH_TOKEN}`,
			}),
		},
		body: JSON.stringify({ query, variables }),
		next: {
			revalidate: options?.revalidate ?? 3600,
			tags: options?.tags,
		},
	})

	// Debug: Check what we're actually getting back
	const text = await res.text()
	console.debug("Response status:", res.status)
	console.debug("Response body:", text.substring(0, 500))

	if (!res.ok) {
		throw new Error(`GraphQL request failed: ${res.status} ${res.statusText}\n${text}`)
	}

	if (!text) {
		throw new Error("GraphQL returned an empty response. Check if WPGraphQL plugin is active.")
	}

	let json: GraphQLResponse<T>

	try {
		json = JSON.parse(text)
	} catch {
		throw new Error(`Failed to parse GraphQL response as JSON:\n${text.substring(0, 500)}`)
	}

	if (json.errors) {
		console.error("GraphQL errors:", json.errors)
		throw new Error(json.errors.map((e) => e.message).join("\n"))
	}

	return json.data
}