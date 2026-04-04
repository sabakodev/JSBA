/**
 * Honeypot: Bots auto-fill hidden fields.
 * Time trap: Bots submit forms in < 2 seconds.
 * Both combined catch most automated spam.
 */
export function validateAntiSpam(formData: FormData): {
	isBot: boolean
	reason: string | null
} {
	// 1. Honeypot — hidden field that should be EMPTY
	const honeypot = formData.get("website") as string
	if (honeypot && honeypot.length > 0) {
		return { isBot: true, reason: "honeypot" }
	}

	// 2. Time trap — form must take > 3 seconds to fill
	const timestamp = formData.get("_ts") as string
	if (timestamp) {
		const submitted = Date.now()
		const loaded = Number(timestamp)
		const elapsed = submitted - loaded

		if (elapsed < 3000) {
			return { isBot: true, reason: "too_fast" }
		}
	}

	// 3. Check for obviously fake patterns
	const email = formData.get("email") as string || ""
	const message = formData.get("message") as string || ""

	// Excessive URLs in message
	const urlCount = (message.match(/https?:\/\//g) || []).length
	if (urlCount > 3) {
		return { isBot: true, reason: "spam_links" }
	}

	// Common spam phrases
	const spamPatterns = [
		/\bcialis\b/i,
		/\bviagra\b/i,
		/\bcrypto.?invest/i,
		/\bearn.?\$?\d{4,}/i,
		/\bSEO.?service/i,
		/\bbuy.?followers/i,
	]

	for (const pattern of spamPatterns) {
		if (pattern.test(message) || pattern.test(email)) {
			return { isBot: true, reason: "spam_content" }
		}
	}

	return { isBot: false, reason: null }
}