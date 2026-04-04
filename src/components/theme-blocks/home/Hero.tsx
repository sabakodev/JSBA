import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/nav"
import { Mouse } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('HomePage.hero')

	return (
		<div className="relative">
			<Image
				src="/assets/photos/communities/jsba/IMG_1072.JPEG"
				alt="Parish St. Basil the Great from Orthodox Church of Indonesia"
				width={2054 / 2}
				height={1036 / 2}
				className="w-screen min-h-screen h-[140vh] object-cover"
				priority
			/>
			<div className="bg-black/85 z-1 absolute h-[140vh] top-0 w-screen">
				<div className="relative h-screen">
					<div className="absolute w-screen h-screen top-0 flex flex-col justify-center items-center">
						<div className="font-serif max-w-3xl text-center">
							<span className="text-primary-800 text-2xl">{t('subtitle')}</span>
							<h1 className="my-4 text-6xl sm:text-8xl text-white">{t('heading')}</h1>
							<div className="flex font-sans justify-center space-x-4">
								<Link href="/contact">
									<Button className="px-4 h-12">
										{t('cta.primary')}
									</Button>
								</Link>
								<Link href="/why">
									<Button variant="outline" className="px-4 h-12 text-primary-foreground hover:text-primary-foreground/80">
										{t('cta.learn')}
									</Button>
								</Link>
							</div>
						</div>
					</div>
					<div className="text-white z-3 font-mono text-xs w-screen flex flex-col items-center space-y-2 justify-center absolute bottom-0 pb-8 opacity-50">
						<span>{t('scroll')}</span>
						<Mouse className="h-5 w-5 animate-bounce" />
					</div>
				</div>
			</div>

			{/* Multi-layer gradient for a smoother blend */}
			<div className="absolute bottom-0 left-0 w-screen h-[40vh] z-2 pointer-events-none"
				style={{
					background: `linear-gradient(to bottom,
						transparent 0%,
						oklch(98.032% 0.0061 75.13 / 0.3) 25%,
						oklch(98.032% 0.0061 75.13 / 0.6) 50%,
						oklch(98.032% 0.0061 75.13 / 0.85) 75%,
						oklch(98.032% 0.0061 75.13) 100%)`
				}}
			/>
		</div>
	)
}
