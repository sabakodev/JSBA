
import { FAQ, Hero, Maps, Sidebar } from "@/components/theme-blocks/contact"
import { ContactForm } from "@/components/theme-blocks/global"
import { useTranslations } from "next-intl"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('contact.title')
	}
}

export default function Page() {
	const t = useTranslations('contactPage.form')

	return (
		<main className="mt-17">
			<Hero />
			<section className="max-w-7xl mx-auto px-8 py-24 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
				{/* <!-- Left: Info Column --> */}
				<div className="md:col-span-4 space-y-12">
					<Sidebar />
				</div>
				{/* <!-- Right: Contact Form --> */}
				<div
					className="md:col-span-8 bg-surface-container-lowest p-8 md:p-12 rounded-xl shadow-[0_40px_80px_-15px_rgba(115,88,33,0.05)] border border-outline-variant/5">
					<h2 className="text-3xl font-headline mb-2">{t('title')}</h2>
					<p className="text-secondary font-body italic mb-10">
						{t('subtitle')}
					</p>
					<ContactForm />
				</div>
			</section>
			{/* <!-- Map & Directions Section --> */}
			<Maps />
			{/* <!-- FAQ Accordion --> */}
			<FAQ />
		</main>
	)
}