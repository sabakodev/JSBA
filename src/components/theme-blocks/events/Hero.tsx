import { Link } from "@/i18n/nav"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('eventPage.hero')

	return (
		<header className="mt-17 relative w-full h-138 flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0 bg-secondary-100/60 z-10"></div>
			<Image
				className="absolute inset-0 w-full h-full object-cover sepia-[0.2]"
				alt="atmospheric interior of an orthodox church with dim light and psaltis in the scene"
				src="/assets/photos/scenery/city/IMG_1749.JPEG"
				width={2048}
				height={1536}
			/>
			<div className="relative z-20 text-center px-6 max-w-4xl">
				<h1 className="font-headline text-5xl md:text-7xl text-white mb-6 leading-tight tracking-tight italic">
					{t('label')}
				</h1>
				<p className="font-body text-white/90 text-lg md:text-xl max-w-2xl mx-auto font-light">
					{t('description')}
				</p>
			</div>
		</header>
	)
}