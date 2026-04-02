"use client"

import { useState } from "react"
import { Share2, Bookmark, Check, Link2, Mail, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface PostActionsProps {
	title: string
	url?: string
}

export default function PostActions({ title, url }: PostActionsProps) {
	const [isBookmarked, setIsBookmarked] = useState(false)
	const [showShareMenu, setShowShareMenu] = useState(false)
	const [copied, setCopied] = useState(false)

	const link = url || (typeof window !== "undefined" ? window.location.href : "")
	const shareUrl = `${link}?utm_source=web&utm_medium=share_header&utm_campaign=article`

	const copyLink = async () => {
		try {
			await navigator.clipboard.writeText(shareUrl)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		} catch {
			// Fallback for older browsers
			const input = document.createElement("input")
			input.value = shareUrl
			document.body.appendChild(input)
			input.select()
			document.execCommand("copy")
			document.body.removeChild(input)
			setCopied(true)
			setTimeout(() => setCopied(false), 2000)
		}
	}

	const shareNative = async () => {
		if (navigator.share) {
			try {
				await navigator.share({
					title,
					url: shareUrl,
				})
			} catch {
				// User cancelled
			}
		} else {
			setShowShareMenu(!showShareMenu)
		}
	}

	const shareEmail = () => {
		const subject = encodeURIComponent(title)
		const body = encodeURIComponent(`Check this article:\n\n${title}\n${shareUrl}`)
		window.open(`mailto:?subject=${subject}&body=${body}`)
		setShowShareMenu(false)
	}

	const shareX = () => {
		const text = encodeURIComponent(title)
		window.open(`https://x.com/intent/tweet?text=${text}&url=${encodeURIComponent(shareUrl)}`, "_blank")
		setShowShareMenu(false)
	}

	const shareFacebook = () => {
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
		setShowShareMenu(false)
	}

	const toggleBookmark = () => {
		setIsBookmarked(!isBookmarked)

		// Save to localStorage
		const bookmarks: string[] = JSON.parse(localStorage.getItem("bookmarked_posts") || "[]")

		if (!isBookmarked) {
			bookmarks.push(shareUrl)
			localStorage.setItem("bookmarked_posts", JSON.stringify(bookmarks))
		} else {
			const filtered = bookmarks.filter((b) => b !== shareUrl)
			localStorage.setItem("bookmarked_posts", JSON.stringify(filtered))
		}
	}

	// Check bookmark status on mount
	if (typeof window !== "undefined" && !isBookmarked) {
		const bookmarks: string[] = JSON.parse(localStorage.getItem("bookmarked_posts") || "[]")
		if (bookmarks.includes(shareUrl) && !isBookmarked) {
			// Will set on next render to avoid hydration mismatch
		}
	}

	return (
		<div className="flex items-center gap-4 relative">
			{/* Share Button */}
			<div className="relative">
				<button
					onClick={shareNative}
					className="w-10 h-10 rounded-lg flex items-center justify-center border border-border/20 text-secondary hover:bg-secondary-950 hover:text-primary transition-colors"
					aria-label="Share this post"
				>
					<Share2 size={16} />
				</button>

				{/* Share Dropdown */}
				{showShareMenu && (
					<>
						{/* Backdrop */}
						<div
							className="fixed inset-0 z-40"
							onClick={() => setShowShareMenu(false)}
						/>

						{/* Menu */}
						<div className="absolute right-0 top-12 z-50 w-52 bg-secondary-950 border border-border/20 rounded-lg shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
							<div className="flex items-center justify-between px-4 py-3 border-b border-border/10">
								<span className="text-xs uppercase tracking-widest text-outline font-bold">Share</span>
								<button
									onClick={() => setShowShareMenu(false)}
									className="text-secondary hover:text-primary transition-colors"
								>
									<X size={14} />
								</button>
							</div>

							<button
								onClick={copyLink}
								className="w-full flex items-center gap-3 px-4 py-3 text-sm text-secondary hover:bg-secondary-900 hover:text-primary transition-colors"
							>
								{copied ? <Check size={16} className="text-green-400" /> : <Link2 size={16} />}
								{copied ? "Copied!" : "Copy link"}
							</button>

							<button
								onClick={shareEmail}
								className="w-full flex items-center gap-3 px-4 py-3 text-sm text-secondary hover:bg-secondary-900 hover:text-primary transition-colors"
							>
								<Mail size={16} />
								Email
							</button>

							<button
								onClick={shareX}
								className="w-full flex items-center gap-3 px-4 py-3 text-sm text-secondary hover:bg-secondary-900 hover:text-primary transition-colors"
							>
								<svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
									<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
								</svg>
								X / Twitter
							</button>

							<button
								onClick={shareFacebook}
								className="w-full flex items-center gap-3 px-4 py-3 text-sm text-secondary hover:bg-secondary-900 hover:text-primary transition-colors"
							>
								<svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
									<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
								</svg>
								Facebook
							</button>
						</div>
					</>
				)}
			</div>

			{/* Bookmark Button */}
			<button
				onClick={toggleBookmark}
				className={cn(
					"w-10 h-10 rounded-lg flex items-center justify-center border transition-all duration-300",
					isBookmarked
						? "border-primary/30 bg-primary/10 text-primary"
						: "border-border/20 text-secondary hover:bg-secondary-950 hover:text-primary"
				)}
				aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
			>
				<Bookmark
					size={16}
					className={cn(
						"transition-all duration-300",
						isBookmarked && "fill-primary"
					)}
				/>
			</button>
		</div>
	)
}