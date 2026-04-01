import { Link } from "@/i18n/nav"
import { useTranslations } from "next-intl"

interface Tag {
	href: string
	label: string
}

interface Props {
	tags: Tag[]
}

export default function Component({ tags }: Props) {
	const t = useTranslations('blogPage.tags')

	return (
		<div className="sticky top-32 p-8 bg-secondary-950 rounded-lg border-l-4 border-primary/20">
			<h4 className="text-xs uppercase tracking-widest text-primary font-extrabold mb-6">
				{t('title')}
			</h4>
			<div className="flex flex-wrap gap-2 mb-8">
				{tags.map(({ href, label }, index) => (
					<Link
						key={index}
						href={href}
						className="px-3 py-1 bg-secondary-900/50 text-secondary-500 text-[10px] uppercase tracking-widest font-bold hover:bg-primary hover:text-primary-foreground transition-colors"
					>
						{label}
					</Link>
				))}
			</div>
			<div className="pt-8 border-t border-outline-variant/20">
				<p className="font-serif text-xl italic text-secondary mb-4">{t('label')}</p>
				<p className="text-sm text-secondary mb-6 leading-relaxed">
					{t('subtitle')}
				</p>
				<Link
					href="/donate"
					className="w-full bg-secondary-900 text-primary border border-primary/30 px-5 py-3 text-xs uppercase tracking-widest font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
					{t('cta')}
				</Link>
			</div>
		</div>
	)
}