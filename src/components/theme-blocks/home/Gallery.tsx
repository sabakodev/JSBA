import { Link } from "@/i18n/nav"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('HomePage.gallery')

	return (
		<div className="bg-accent px-4 py-32 min-w-screen">
			<div className="flex flex-col sm:flex-row justify-between max-w-7xl mx-auto sm:mb-10">
				<div className="text-left max-w-2x">
					<h1 className="text-5xl mb-6">{t('title')}</h1>
					<p className="text-primary-200">{t('description')}</p>
				</div>
				<Link href="/gallery" className="group uppercase font-extralight py-8">
					<div className="border-b-2 border-primary-400/30 text-primary-500 group-hover:text-primary-400 group-hover:border-primary-400/50 transition-colors duration-300">
						{t('fullLink')}
					</div>
				</Link>
			</div>
			<div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-y-4 sm:gap-y-0 sm:gap-x-4">
				<div className="grid gap-y-4">
					<Image
						src="/assets/photos/scenery/monastery/IMG_1575.webp"
						width={1536 / 2}
						height={2048 / 2}
						alt="Indonesian Orthodox Monastery"
						className="rounded-sm"
					/>
				</div>
				<div className="grid gap-y-4">
					<Image
						src="/assets/photos/communities/jspp/IMG_1701.JPEG"
						width={2048 / 2}
						height={1536 / 2}
						alt="Orthodox Church of Indonesia celebrating feast on Parish St. Peter & Paul"
						className="rounded-sm h-full object-cover"
					/>
					<Image
						src="/assets/photos/wide/homilies/bishop-daniel-with-laities.jpeg"
						width={2522 / 2}
						height={1248 / 2}
						alt="Bishop Daniel giving homilies in St. Basil the Great"
						className="rounded-sm h-full object-cover"
					/>
				</div>
				<div className="grid gap-y-4">
					<Image
						src="/assets/photos/scenery/city/IMG_0009.JPEG"
						width={1536 / 2}
						height={2048 / 2}
						alt="City"
						className="rounded-sm"
					/>
				</div>
			</div>
		</div>
	)
}