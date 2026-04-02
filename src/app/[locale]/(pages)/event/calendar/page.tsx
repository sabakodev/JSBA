import { LiturgicalCalendar } from "@/components/theme-blocks/events"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('event.title')
	}
}

export default async function Page({
	params,
}: Readonly<{
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params

	// const t = useTranslations("eventPage.sidebar")

	return (
		<>
			<main className="max-w-7xl mx-auto px-6 py-24">
				<LiturgicalCalendar locale={locale} />
			</main>
		</>
	)
}