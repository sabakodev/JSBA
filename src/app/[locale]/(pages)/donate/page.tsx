
import { DonationAccounts } from "@/components/theme-blocks/donation/bank"
import { DonationCard } from "@/components/theme-blocks/global"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('donate.title')
	}
}

export default function Page() {
	return (
		<main className="max-w-2xl mx-auto mt-17 py-6">
			<DonationCard />
			<DonationAccounts />
		</main>
	)
}