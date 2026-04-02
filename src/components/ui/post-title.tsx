import { cn, splitTitle } from "@/lib/utils"

interface PostTitleProps {
	title: string
	className?: string
	subtitleClassName?: string
	as?: "h1" | "h2" | "h3"
	fallbackWordCount?: number
}

export default function PostTitle({
	title,
	className,
	subtitleClassName,
	as: Tag = "h1",
	fallbackWordCount = 1,
}: PostTitleProps) {
	const { main, subtitle } = splitTitle(title, fallbackWordCount)

	return (
		<Tag className={className}>
			{main}
			{subtitle && (
				<span className={cn("italic block", subtitleClassName)}>
					{subtitle}
				</span>
			)}
		</Tag>
	)
}


