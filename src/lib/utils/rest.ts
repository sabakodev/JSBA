// Legend - static, cache forever (1 year)
export const CACHE_IMMUTABLE = {
	'Cache-Control': 'public, max-age=31536000, immutable',
	'CDN-Cache-Control': 'public, max-age=31536000, immutable',
	'Vercel-CDN-Cache-Control': 'public, s-maxage=31536000, immutable',
}

// Week - changes weekly
export const CACHE_WEEKLY = {
	'Cache-Control': 'public, max-age=3600, stale-while-revalidate=82800',
	'CDN-Cache-Control': 'public, max-age=86400, stale-while-revalidate=518400',
	'Vercel-CDN-Cache-Control': 'public, s-maxage=604800, stale-while-revalidate=86400',
}

// Days - changes daily
export const CACHE_DAILY = {
	'Cache-Control': 'public, max-age=3600, stale-while-revalidate=3600',
	'CDN-Cache-Control': 'public, max-age=43200, stale-while-revalidate=43200',
	'Vercel-CDN-Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=43200',
}