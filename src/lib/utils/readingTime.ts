export interface ReadingTime {
	minutes: number // raw minutes
	text: string    // formatted string like "8 min read"
	words: number   // total word count
}

export function getReadingTime(content: string, wordsPerMinute: number = 200): ReadingTime {
	// Strip HTML tags
	const plainText = content.replace(/<[^>]*>/g, "")

	// Strip extra whitespace and count words
	const words = plainText
		.trim()
		.split(/\s+/)
		.filter((word) => word.length > 0).length

	const rawMinutes = words / wordsPerMinute

	// Format the display text
	let text: string

	if (rawMinutes < 1) {
		const seconds = Math.max(Math.round(rawMinutes * 60), 1)
		text = `${seconds} sec read`
	} else if (rawMinutes < 60) {
		const mins = Math.ceil(rawMinutes)
		text = `${mins} min read`
	} else {
		const hours = Math.floor(rawMinutes / 60)
		const mins = Math.ceil(rawMinutes % 60)
		if (mins === 0) {
			text = `${hours} hour read`
		} else {
			text = `${hours} hr ${mins} min read`
		}
	}

	return {
		minutes: Math.round(rawMinutes * 100) / 100,
		text,
		words,
	}
}