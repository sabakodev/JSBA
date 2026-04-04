"use client"

import { useEffect, useRef, useState } from "react"

export function useAntiSpam() {
	const [timestamp] = useState(() => Date.now())
	const [interactions, setInteractions] = useState(0)
	const hasMouseMoved = useRef(false)

	useEffect(() => {
		const handler = () => {
			hasMouseMoved.current = true
		}
		window.addEventListener("mousemove", handler, { once: true })
		window.addEventListener("touchstart", handler, { once: true })

		return () => {
			window.removeEventListener("mousemove", handler)
			window.removeEventListener("touchstart", handler)
		}
	}, [])

	const trackInteraction = () => {
		setInteractions((prev) => prev + 1)
	}

	return {
		timestamp,
		interactions,
		trackInteraction,
		hasMouseMoved,
	}
}