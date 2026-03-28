import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('HomePage.hero')

	return (
		<div className="relative h-screen top-0">
			<Image
				src="/assets/photos/communities/jsba/IMG_1072.JPEG"
				alt="Parish St. Basil the Great from Orthodox Church of Indonesia"
				width={2054 / 2}
				height={1036 / 2}
				className="w-screen max-h-screen object-cover"
				priority
			/>
			<div className="bg-black/60 absolute z-1 w-screen h-screen top-0 flex flex-col justify-center items-center">
				<div className="font-serif max-w-3xl text-center space-y-4">
					<span className="text-primary-800 text-2xl">{t('subtitle')}</span>
					<h1 className="text-8xl">{t('heading')}</h1>
					<div className="flex">

					</div>
				</div>
			</div>
		</div>
	)
}