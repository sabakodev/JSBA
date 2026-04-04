import { useTranslations } from "next-intl"

import { ContactForm, DonationCard } from "../global"

export default function Component() {
	const t = useTranslations('HomePage.cta')

	return (
		<div className="grid sm:grid-cols-2 items-center max-w-7xl mx-auto mt-32 mb-36">
			<div className="px-8 sm:px-24 pb-8 sm:pb-0">
				<h1 className="mt-4 mb-6 text-4xl">{t('label')}</h1>
				<ContactForm />
			</div>
			<div className="flex flex-col items-center relative">
				<DonationCard />
			</div>
		</div>
	)
}