import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('HomePage.apostolic')

	return (
		<div className="grid sm:grid-cols-2 items-center max-w-7xl mx-auto mt-32 mb-36">
			<div className="px-4 pb-8 sm:pb-0">
				<span className="font-extralight uppercase text-xs text-primary-100">{t('title')}</span>
				<h1 className="mt-4 mb-6 text-4xl">{t('label')}</h1>
				<p className="my-6 text-lg text-primary-100">{t('description')}</p>
				<div className="border-l-2 pl-6 py-4 border-primary-800/30">
					<p className="font-serif text-xl pb-4">&quot;{t('quote.content')}&quot;</p>
					<span className="font-extralight text-xs">— {t('quote.saint')}</span>
				</div>
			</div>
			<div className="flex flex-col items-center">
				<Image
					src="/assets/photos/clergy/IMG_0786.JPEG"
					alt="Bishop Daniel of Nikopolis and All Indonesia"
					width={360}
					height={480}
					className="aspect-square object-cover rounded-sm shadow-md hover:shadow-2xl transition-shadow duration-1000"
				/>
				<div className="text-center mt-6">
					<div className="font-serif text-2xl">{t('bishop.name')}</div>
					<div className="text-sm font-extralight text-primary-100 uppercase">{t('bishop.title')}</div>
				</div>
			</div>
		</div>
	)
}