import { LiturgicalCalendar } from "@/components/theme-blocks/events"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('event.title'),
		alternates: {
			canonical: 'https://www.basilius.or.id/id/event/calendar',
			languages: {
				id: 'https://www.basilius.or.id/id/event/calendar',
				en: 'https://www.basilius.or.id/en/event/calendar',
			},
		}
	}
}

export default async function Page({
	params,
}: Readonly<{
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params

	const currentDate = new Date()

	return (
		<main className="max-w-7xl mx-auto px-6 py-24">
			<LiturgicalCalendar locale={locale} year={currentDate.getFullYear()} month={currentDate.getMonth()} />
		</main>
	)
}