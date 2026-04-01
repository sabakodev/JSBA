import { Link } from "@/i18n/nav"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('HomePage.about')

	return (
		<div className="grid sm:grid-cols-12 items-center max-w-7xl mx-auto mt-32 mb-36">
			<div className="sm:col-span-7 px-5 max-w-2xl">
				<h1 className="text-6xl">
					<div>{t('title.top')}</div>
					<div className="text-primary-500 italic">{t('title.bottom')}</div>
				</h1>
				<div className="space-y-8 mt-12" dangerouslySetInnerHTML={{ __html: t.raw('content') }} />
				<Link href="/why" className="text-primary-500 hover:text-primary-400 transition flex uppercase font-medium items-center group py-12">
					{t('historyLabel')}
					<ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition" />
				</Link>
			</div>
			<div className="sm:col-span-5 mx-5 sm:mx-10 relative">
				<Image
					src="/assets/photos/byzantine-icons/st-basil-the-great.png"
					alt="Icon of St. Basil the Great"
					width={912 / 2}
					height={1140 / 2}
					className="w-full sm:w-114 h-142.5 object-cover rounded-sm shadow-md"
				/>
				<div className="bg-white absolute z-1 bottom-0 max-w-80 shadow-lg rounded-sm p-8 hover:shadow-2xl -translate-x-8 hover:-translate-x-4 translate-y-6 hover:translate-y-8 hover:rotate-3 transition duration-1000">
					<p className="font-serif italic text-primary-400 mb-4">&quot;{t('quote.content')}&quot;</p>
					<span className="text-xs text-primary-300">— {t('quote.saint')}</span>
				</div>
			</div>
		</div>
	)
}