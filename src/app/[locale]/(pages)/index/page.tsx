
import { CategoryCard, Featured, Hero, Introduction, ResourcesFooter } from "@/components/theme-blocks/index"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('index.title'),
		alternates: {
			canonical: 'https://www.basilius.or.id/id/',
			languages: {
				id: 'https://www.basilius.or.id/id/',
				en: 'https://www.basilius.or.id/en/',
			},
		}
	}
}


export default function Page() {

	return (
		<main className="max-w-7xl mx-auto px-8 mt-17">
			<Hero />
			<Introduction />
			<CategoryCard />
			<Featured />
			<ResourcesFooter />
		</main>
	)
}