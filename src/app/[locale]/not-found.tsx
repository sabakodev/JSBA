import { Navbar } from "@/components/theme-blocks/global"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Page() {
	const t = useTranslations('NotFoundPage')

	return (
		<TooltipProvider>
			<Navbar />
			<div className="max-w-7xl mx-auto px-8 my-24 flex flex-col sm:flex-row sm:space-x-8 space-y-4 sm:space-y-0 items-center">
				<Image
					width={222}
					height={300}
					loading="eager"
					src="/assets/photos/byzantine-icons/st-phanourios.jpg"
					alt="Icon of St. Phanourios"
				/>
				<div className="max-w-sm space-y-2">
					<h1 className="text-2xl">{t('title')}</h1>
					<p className="text-base">{t('description')}</p>
				</div>
			</div>
		</TooltipProvider>
	)
}