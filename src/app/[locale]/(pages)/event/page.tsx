import { Hero, Sidebar, Timeline } from "@/components/theme-blocks/events"
import { getEvents } from "@/lib/graphql/services/events"
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
	searchParams,
}: Readonly<{
	params: Promise<{
		locale: string
	}>
	searchParams: Promise<{
		page?: string
		category?: string
	}>
}>) {
	const { locale } = await params

	const query = await searchParams
	const activeCategory = query.category || undefined

	const now = new Date()
	const yesterday = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)

	const [eventsData] = await Promise.all([
		// getCategories(),
		getEvents({
			first: 20,
			afterDate: yesterday,
			categorySlug: activeCategory,
		})
	])

	return (
		<>
			<Hero />
			<main className="max-w-7xl mx-auto px-6 py-24">
				{/* <FilterBar
					categories={categories}
					category={activeCategory}
				/> */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
					<Timeline events={eventsData} />
					<Sidebar locale={locale} />
				</div>
			</main>
		</>
	)
}