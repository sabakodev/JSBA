"use client"

import { useEffect, useState } from "react"
import { Link2, Mail, Check } from "lucide-react"
import Link from "next/link"

interface SidebarShareProps {
	title: string
	url?: string
}

// Custom SVG icons for social platforms
export function WhatsAppIcon({ size = 14 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
			<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
		</svg>
	)
}

export function FacebookIcon({ size = 14 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
			<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
		</svg>
	)
}

export function XIcon({ size = 14 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
			<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
		</svg>
	)
}

export function ThreadsIcon({ size = 14 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
			<path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.59 12c.025 3.086.718 5.496 2.057 7.164 1.432 1.781 3.632 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.29 3.276-.865 1.076-2.125 1.7-3.748 1.856-1.243.12-2.448-.154-3.39-.771-1.09-.714-1.735-1.79-1.82-3.027-.077-1.12.348-2.15 1.196-2.9.878-.776 2.14-1.216 3.551-1.241.972-.017 1.872.113 2.688.386-.038-1.407-.343-2.504-.89-3.2-.635-.81-1.648-1.21-3.011-1.188l-.024-.002c-1.167.016-2.14.35-2.893.994-.7.6-1.148 1.393-1.323 2.318l-2.016-.421c.247-1.327.913-2.46 1.925-3.323 1.097-.937 2.49-1.44 4.025-1.464l.044-.001h.007c1.878-.029 3.377.55 4.345 1.674.84 1.075 1.24 2.582 1.292 4.478.618.38 1.151.832 1.6 1.353 1.002 1.164 1.524 2.642 1.56 4.263v.018c-.014 1.974-.736 3.741-2.155 5.267-1.865 2.007-4.394 2.887-7.538 2.612z" />
		</svg>
	)
}

export function TelegramIcon({ size = 14 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
			<path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
		</svg>
	)
}

export function LineIcon({ size = 14 }: { size?: number }) {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
			<path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
		</svg>
	)
}

export default function SidebarShare({ title, url }: SidebarShareProps) {
	const [copied, setCopied] = useState(false)
	const [link, setLink] = useState<string>(url || "")

	useEffect(() => {
		if (!url && typeof window !== "undefined") {
			// eslint-disable-next-line react-hooks/set-state-in-effect
			setLink(window.location.href)
		}
	}, [url])

	const shareUrl = `${link}?utm_source=web&utm_medium=share_sidebar&utm_campaign=article`
	const encodedUrl = encodeURIComponent(shareUrl)
	const encodedTitle = encodeURIComponent(title)
	const emailBody = encodeURIComponent(`Check out this article: ${title}\n\n${shareUrl}`)

	const copyLink = async () => {
		await navigator.clipboard.writeText(shareUrl)
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	const socials = [
		{
			label: "WhatsApp",
			icon: <WhatsAppIcon size={14} />,
			href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
		},
		{
			label: "Facebook",
			icon: <FacebookIcon size={14} />,
			href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		},
		{
			label: "X",
			icon: <XIcon size={14} />,
			href: `https://x.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
		},
		// {
		// 	label: "Threads",
		// 	icon: <ThreadsIcon size={14} />,
		// 	href: `https://www.threads.net/intent/post?text=${encodedTitle}%20${encodedUrl}`,
		// },
		// {
		// 	label: "Telegram",
		// 	icon: <TelegramIcon size={14} />,
		// 	href: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
		// },
		// {
		// 	label: "LINE",
		// 	icon: <LineIcon size={14} />,
		// 	href: `https://social-plugins.line.me/lineit/share?url=${encodedUrl}`,
		// },
		{
			label: "Email",
			icon: <Mail size={14} />,
			href: `mailto:?subject=${encodedTitle}&body=${emailBody}`,
		},
	]

	return (
		<div className="flex flex-col gap-6">
			<p className="text-[10px] uppercase tracking-[0.3em] text-outline font-extrabold">
				Share
			</p>

			{socials.map((social) => (
				<Link
					key={social.label}
					href={social.href}
					target="_blank"
					rel="noopener noreferrer"
					className="w-4 text-secondary-500 hover:text-primary transition-colors"
					aria-label={`Share via ${social.label}`}
					title={social.label}
				>
					{social.icon}
				</Link>
			))}

			<button
				onClick={copyLink}
				className="text-secondary-500 hover:text-primary transition-colors text-left"
				aria-label="Copy link"
				title="Copy link"
			>
				{copied ? (
					<Check size={14} className="text-green-400" />
				) : (
					<Link2 size={14} />
				)}
			</button>
		</div>
	)
}