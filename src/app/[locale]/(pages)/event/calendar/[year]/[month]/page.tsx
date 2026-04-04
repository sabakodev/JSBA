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
		month: string
	}>
}>) {
	const { locale, year, month } = await params

	const cMonth = parseInt(month) - 1

	const isValid = (year >= 2000 && year <= 2099) && (cMonth >= 0 && cMonth <= 11)

	return (
		<main className="max-w-7xl mx-auto px-6 py-24">
			{
				isValid ?
					<LiturgicalCalendar locale={locale} year={year} month={cMonth} /> :
					<div>
						Date invalid
					</div>
			}
		</main>
	)
}