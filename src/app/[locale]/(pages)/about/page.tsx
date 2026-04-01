import { Clergy, CTA, Jurisdiction, Mission, Timeline } from "@/components/theme-blocks/about"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"
import Image from "next/image"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('about.title')
	}
}

export default function Page() {
	const t = useTranslations('aboutPage.hero')

	return (
		<>
			<header className="relative h-screen w-full overflow-hidden">
				<Image alt="" className="absolute inset-0 w-full h-full object-cover sepia-[0.2]"
					data-alt="Stunning interior of an Orthodox cathedral with golden icons, candle smoke drifting through sunbeams, and intricate mosaic domes in soft morning light"
					src="/assets/photos/wide/homilies/bishop-daniel-with-laities.jpeg"
					width={2522 / 2}
					height={1248 / 2}
				/>
				<div className="absolute inset-0 bg-linear-to-b from-transparent to-background"></div>
				<div className="relative z-10 h-full max-w-7xl mx-auto px-8 flex flex-col justify-end pb-24">
					<span className="uppercase tracking-[0.3em] text-primary mb-4 opacity-80">{t('title')}</span>
					<h1
						className="text-7xl md:text-8xl text-on-surface leading-[0.9] -ml-1 max-w-4xl font-extrabold tracking-tight">
						{t.rich('subtitle', {
							i: (chunk) => (<span className="italic font-normal">{chunk}</span>)
						})}
					</h1>
				</div>
			</header>
			<Mission />
			<Timeline />
			<Jurisdiction />
			<Clergy />
			<CTA />
		</>
	)
}