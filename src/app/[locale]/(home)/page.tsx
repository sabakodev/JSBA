import { Navbar } from "@/components/theme-blocks/global"
import { About, Apostolic, CTA, Gallery, Hero, Virtue } from "@/components/theme-blocks/home"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('home.title')
	}
}

export default function Home() {
	return (
		<>
			<Navbar hero />
			<main className="flex flex-col flex-1 items-center justify-center font-sans ">
				<Hero />
				<About />
				<Virtue />
				<Apostolic />
				<Gallery />
				<CTA />
			</main>
		</>
	)
}
