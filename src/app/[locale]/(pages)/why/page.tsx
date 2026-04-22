
import { Asymmetric, FAQ, Hero, PastorGuide, Sacramental, Scripture } from "@/components/theme-blocks/why"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('why.title'),
		alternates: {
			canonical: 'https://www.basilius.or.id/id/why',
			languages: {
				id: 'https://www.basilius.or.id/id/why',
				en: 'https://www.basilius.or.id/en/why',
			},
		}
	}
}

export default function Page() {

	return (
		<>
			{/* <!-- Hero Section --> */}
			<Hero />
			{/* <!-- What is Orthodoxy? (Asymmetric Layout) --> */}
			<Asymmetric />
			<Scripture />
			<Sacramental />
			<FAQ />
			{/* <!-- What to Expect (Pastoral Guide) --> */}
			<PastorGuide />
		</>
	)
}