import { Bookmark, Share, Share2 } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('blogPage.hero')

	return (
		<header className="mb-16 max-w-4xl mx-auto">
			<div className="flex items-center gap-4 mb-8">
				<span className="text-primary text-xs uppercase tracking-[0.2em] font-bold">Spiritual Life</span>
				<div className="h-px w-12 bg-border/30"></div>
				<span className="text-secondary text-xs uppercase tracking-widest opacity-60">8 Min Read</span>
			</div>
			<h1 className="text-5xl md:text-7xl text-on-surface leading-[1.1] mb-10 tracking-tight">
				The Stillness of the Heart: <span className="italic block">Finding Hesychia in a Modern World</span>
			</h1>
			<div
				className="flex flex-col md:flex-row md:items-center justify-between gap-8 py-8 border-y border-border/15">
				<div className="flex items-center gap-4">
					<div>
						<p className="text-sm font-bold text-on-surface">Fr. Thomas More</p>
						<p className="text-xs text-secondary opacity-70">Published on Oct 24, 2024</p>
					</div>
				</div>
				<div className="flex items-center gap-4">
					<button
						className="w-10 h-10 rounded-lg flex items-center justify-center border border-border/20 text-secondary hover:bg-secondary-950 transition-colors">
						<Share2 size={16} />
					</button>
					<button
						className="w-10 h-10 rounded-lg flex items-center justify-center border border-border/20 text-secondary hover:bg-secondary-950 transition-colors">
						<Bookmark size={16} />
					</button>
				</div>
			</div>
		</header>
	)
}