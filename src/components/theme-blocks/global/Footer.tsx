'use client'

import { Link } from "@/i18n/nav"
import { ArrowUp } from "lucide-react"
import { useTranslations } from "next-intl"

export default function FooterCompoonent() {
	const t = useTranslations('global')

	const sublinks = [
		{
			label: t('page.privacy'),
			route: "/privacy",
		},
		{
			label: t('page.calendar'),
			route: "/event/calendar",
		},
		{
			label: t('page.council'),
			route: "/about#clergy",
		},
		{
			label: t('page.donate'),
			route: "/donate",
		},
	]

	const jump = () => {
		if (typeof window !== 'undefined') {
			window.scrollTo({ top: 0, behavior: 'smooth' })
		}
	}

	return (
		<footer className="bg-accent w-screen">
			<div className="flex flex-col md:flex-row justify-between md:items-center p-12">
				<div>
					<h3 className="text-xl">{t('saintName')}</h3>
					<span className="font-extralight text-xs">
						{/* eslint-disable-next-line react-hooks/purity */}
						&copy; 2020 - {(new Date(Date.now())).getFullYear()} {t('saintName')}. {t('legal.copyright')}.
					</span>
				</div>
				<div className="flex flex-col md:flex-row my-8 md:my-0 space-y-8 md:space-y-0 md:space-x-8">
					{sublinks.map((value, index) => (
						<Link
							key={index}
							href={value.route}
							className="font-extralight text-xs uppercase text-primary-100 hover:text-primary-500 transition"
						>
							{value.label}
						</Link>
					))}
				</div>
				<button
					onClick={jump}
					className="hidden md:flex items-end justify-end font-extralight space-x-2 uppercase text-primary-100 hover:text-primary-500 transition"
				>
					<div className="text-xs">{t('generic.top')}</div>
					<ArrowUp className="h-3 w-3" />
				</button>
			</div>
		</footer>
	)
}