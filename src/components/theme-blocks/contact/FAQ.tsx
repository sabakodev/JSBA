"use client"

import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function Component() {
	const faq = useTranslations('whyPage.faq')
	const t = useTranslations('contactPage.faq')
	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggle = (index: number) => {
		setOpenIndex(openIndex === index ? null : index)
	}

	const faqs = [
		{
			question: faq('dresscode.question'),
			answer: faq('dresscode.answer'),
		},
		{
			question: faq('eucharist.question'),
			answer: faq('eucharist.answer'),
		},
		{
			question: faq('duration.question'),
			answer: faq('duration.answer'),
		},
		{
			question: faq('childcare.question'),
			answer: faq('childcare.answer'),
		},
		{
			question: faq('canonical.question'),
			answer: faq('canonical.answer'),
		},
		{
			question: faq('faith.question'),
			answer: faq('faith.answer'),
		},
		{
			question: faq('icons.question'),
			answer: faq('icons.answer'),
		},
		{
			question: faq('cathecumen.question'),
			answer: faq('cathecumen.answer'),
		},
	]

	return (
		<section className="max-w-4xl mx-auto px-8 py-24">
			<div className="text-center mb-16 sacred-frame pb-8">
				<h2 className="text-4xl font-headline mb-4">{t('title')}</h2>
				<p className="text-secondary italic font-headline">{t('subtitle')}</p>
			</div>
			<div className="space-y-1">
				{faqs.map(({ question, answer }, index) => {
					const isOpen = openIndex === index
					const isLast = index === faqs.length - 1

					return (
						<div
							key={index}
							className={cn(
								"py-6 cursor-pointer",
								!isLast && "border-b border-outline-variant/20"
							)}
						>
							<button
								onClick={() => toggle(index)}
								className="w-full flex justify-between items-center text-left group"
							>
								<h3 className="text-xl font-headline group-hover:text-primary transition-colors">
									{question}
								</h3>
								<ChevronDown
									className={cn(
										"shrink-0 ml-4 text-primary transition-transform duration-300",
										isOpen && "rotate-180"
									)}
								/>
							</button>
							<div
								className={cn(
									"overflow-hidden transition-all duration-500 ease-in-out",
									isOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
								)}
							>
								<p className="text-on-surface/70 leading-relaxed">
									{answer}
								</p>
							</div>
						</div>
					)
				})}
			</div>
		</section>
	)
}