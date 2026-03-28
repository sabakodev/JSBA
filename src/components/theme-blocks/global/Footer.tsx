'use client'

import { Link } from "@/i18n/nav"
import { ArrowUp } from "lucide-react"
import { useTranslations } from "next-intl"

export default function FooterCompoonent() {
	const t = useTranslations('global')

	const footerLinks = [
		{
			label: "Scripture",
			links: [
				{
					label: "Old Testament(LXX)",
					route: '/#"Old Testament(LXX)"'
				},
				{
					label: "The New Testament",
					route: '/#"The New Testament"'
				},
				{
					label: "Audio Bible",
					route: '/#"Audio Bible"'
				},
			]
		},
		{
			label: "Liturgical",
			links: [
				{
					label: "Divine Liturgy Text", route:
						"/#Divine Liturgy Text"
				},
				{
					label: "Horologion", route:
						"/#Horologion"
				},
				{
					label: "Menaion", route:
						"/#Menaion"
				},
			]
		},
		{
			label: "Youth & Family",
			links: [
				{
					label: "Children's Bible Stories", route:
						"/#Children's Bible Stories"
				},
				{
					label: "Family Prayer Guide", route:
						"/#Family Prayer Guide"
				},
				{
					label: "Activity Books", route:
						"/#Activity Books"
				},
			]
		},
		{
			label: "Multimedia",
			links: [
				{
					label: "Podcast Archive", route:
						"/#Podcast Archive"
				},
				{
					label: "Vesperal Lectures", route:
						"/#Vesperal Lectures"
				},
				{
					label: "Parish Photo Journal", route:
						"/#Parish Photo Journal"
				},
			]
		}
	]

	const sublinks = [
		{
			label: t('page.privacy'),
			route: "/privacy",
		},
		{
			label: t('page.calendar'),
			route: "/calendar",
		},
		{
			label: t('page.council'),
			route: "/council",
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
			<div className="flex justify-between items-center p-12">
				<div>
					<h3 className="text-xl">{t('saintName')}</h3>
					<span className="font-extralight text-xs">
						{/* eslint-disable-next-line react-hooks/purity */}
						&copy; 2020 - {(new Date(Date.now())).getFullYear()} {t('saintName')}. {t('legal.copyright')}.
					</span>
				</div>
				<div className="space-x-8">
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
					className="flex items-end justify-end font-extralight space-x-2 uppercase text-primary-100 hover:text-primary-500 transition"
				>
					<div className="text-xs">{t('generic.top')}</div>
					<ArrowUp className="h-3 w-3" />
				</button>
			</div>
		</footer>
	)
}