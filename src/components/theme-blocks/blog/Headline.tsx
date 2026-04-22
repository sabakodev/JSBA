import PostActions from "@/components/ui/post-action"
import PostTitle from "@/components/ui/post-title"
import { ReadingTime } from "@/lib/utils"
import { useTranslations } from "next-intl"
import Image from "next/image"

interface HeadlineProps {
	title: string
	category?: string
	date: string
	author: string
	avatarUrl?: string
	readingTime: ReadingTime
}

export default function Component({ title, category, date, author, avatarUrl, readingTime }: HeadlineProps) {
	const t = useTranslations('blogPage.headline')

	const formattedDate = new Date(date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	})

	return (
		<header className="mb-16 max-w-4xl mx-auto">
			<div className="flex items-center gap-4 mb-8">
				{category && (
					<span className="text-primary text-xs uppercase tracking-[0.2em] font-bold">{category}</span>
				)}
				<div className="h-px w-12 bg-border/30"></div>
				<span className="text-secondary text-xs uppercase tracking-widest opacity-60">{readingTime.text}</span>
			</div>
			<PostTitle
				title={title}
				className="text-5xl md:text-7xl leading-[1.1] mb-10 tracking-tight"
				subtitleClassName="text-primary/80 mt-2"
			/>
			<div
				className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-y border-border/15">
				<div className="flex items-center gap-4">
					{avatarUrl && (
						<Image
							width={50}
							height={50}
							src={avatarUrl}
							alt={author}
							className="w-8 h-8 rounded-full"
						/>
					)}
					<div>
						<p className="text-sm font-bold text-on-surface">{author}</p>
						<p className="text-xs text-secondary opacity-70">{t('published')} {formattedDate}</p>
					</div>
				</div>
				<PostActions title={title} />
			</div>
		</header>
	)
}