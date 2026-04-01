
import { Asymmetric, FAQ, Hero, PastorGuide, Sacramental, Scripture } from "@/components/theme-blocks/why"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('why.title')
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