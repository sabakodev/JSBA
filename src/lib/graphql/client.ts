import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client"

const client = new ApolloClient({
	link: new HttpLink({
		uri: process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL,
		// e.g. https://your-wp-site.com/graphql
	}),
	cache: new InMemoryCache(),
})

export default client