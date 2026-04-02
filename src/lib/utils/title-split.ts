interface SplitTitle {
	main: string
	subtitle: string | null
}

/**
 * Splits a post title into main + subtitle
 *
 * Strategies (in order):
 * 1. Split at colon → "The Stillness: Finding Peace" → main: "The Stillness:", subtitle: "Finding Peace"
 * 2. Split at em dash → "The Stillness — Finding Peace"
 * 3. Split at pipe → "The Stillness | Finding Peace"
 * 4. If no delimiter, take the last N words as subtitle
 */
export function splitTitle(title: string, fallbackWordCount: number = 4): SplitTitle {
	// Try splitting by delimiters
	const delimiters = [":", "—", "–", "|"]

	for (const delimiter of delimiters) {
		if (title.includes(delimiter)) {
			const index = title.indexOf(delimiter)
			return {
				main: title.slice(0, index + 1).trim(),
				subtitle: title.slice(index + 1).trim() || null,
			}
		}
	}

	// Fallback: split last N words
	const words = title.split(" ")

	if (words.length <= fallbackWordCount) {
		return { main: title, subtitle: null }
	}

	const splitAt = words.length - fallbackWordCount
	return {
		main: words.slice(0, splitAt).join(" "),
		subtitle: words.slice(splitAt).join(" "),
	}
}