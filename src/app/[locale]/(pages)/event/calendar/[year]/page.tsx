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
	params: Promise<{
		locale: string
		year: number
	}>
}>) {
	const { locale, year } = await params

	const currentDate = new Date()

	return (
		<main className="max-w-7xl mx-auto px-6 py-24">
			{
				(year >= 2000 && year <= 2099) ?
					<LiturgicalCalendar locale={locale} year={year} month={currentDate.getMonth()} /> :
					<div></div>
			}
		</main>
	)
}