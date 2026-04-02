import { FeastCard, FilterBar, Hero, Sidebar, Timeline } from "@/components/theme-blocks/events"
import { getCurrentLiturgicalWeek, getUpcomingFeasts } from "@/lib/utils"
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

	const upcomingFeasts = getUpcomingFeasts(365)
	const currentWeek = getCurrentLiturgicalWeek()

	const localizedCurrentName: Record<string, string> = {
		default: currentWeek.name,
		id: currentWeek.nameId,
		el: currentWeek.nameEl,
	}

	const currentWeekName = localizedCurrentName[locale] ?? localizedCurrentName.default
	return (
		<>
			<main className="max-w-7xl mx-auto px-6 py-24">
				<div className="mb-8 py-3 px-4 bg-primary/5 border border-primary/10 rounded-sm text-center">
					<p className="text-[10px] uppercase tracking-[0.3em] text-secondary/60 mb-1">
						{/* {t('feast.weekLabel')} */}
					</p>
					<p className="text-sm font-body font-bold text-on-surface">
						{currentWeekName}
					</p>
					{currentWeek.tone && (
						<p className="text-xs text-secondary/60 mt-1">
							Tone {currentWeek.tone}
						</p>
					)}
					{currentWeek.fasting && (
						<p className="text-[10px] uppercase tracking-widest text-primary mt-2">
							{currentWeek.fastingType}
						</p>
					)}
				</div>

				<div className="grid grid-cols-7 gap-4">
					{upcomingFeasts.map((feast, index) => (
						<FeastCard
							key={`${feast.julianDate?.month}-${feast.julianDate?.day}-${index}`}
							locale={locale}
							feast={feast}
							index={index}
							year
						/>
					))}
				</div>
			</main>
		</>
	)
}