"use client"

import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { cn } from "@/lib/utils"

export default function Component() {
	const t = useTranslations('whyPage.faq')

	const [openIndex, setOpenIndex] = useState<number | null>(null)

	const toggle = (index: number) => {
		setOpenIndex((prev) => (prev === index ? null : index))
	}

	const faqs = [
		{
			question: t('canonical.question'),
			answer: t('canonical.answer'),
		},
		{
			question: t('faith.question'),
			answer: t('faith.answer'),
		},
		{
			question: t('icons.question'),
			answer: t('icons.answer'),
		},
		{
			question: t('cathecumen.question'),
			answer: t('cathecumen.answer'),
		},
	]

	return (
		<section className="py-24 bg-surface">
			<div className="max-w-3xl mx-auto px-8">
				<div className="text-center mb-16">
					<h2 className="font-serif text-5xl mb-6">{t('title')}</h2>
					<p className="font-body text-on-surface-variant">
						{t('description')}
					</p>
				</div>
				<div className="space-y-4">
					{faqs.map(({ question, answer }, index) => {
						const isOpen = openIndex === index

						return (
							<div
								key={index}
								className="border-b border-outline-variant border-opacity-20 pb-6 transition-all"
							>
								<button
									onClick={() => toggle(index)}
									className="w-full flex justify-between items-center py-4 text-left cursor-pointer"
								>
									<span
										className={cn(
											"font-serif text-2xl transition-colors",
											isOpen ? "text-primary" : "text-on-surface hover:text-primary"
										)}
									>
										{question}
									</span>
									<ChevronDown
										className={cn(
											"text-primary shrink-0 ml-4 transition-transform duration-300",
											isOpen && "rotate-180"
										)}
									/>
								</button>
								<div
									className={cn(
										"overflow-hidden transition-all duration-500 ease-in-out",
										isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
									)}
								>
									<p className="font-body text-on-surface-variant leading-relaxed pt-2 pb-4">
										{answer}
									</p>
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</section>
	)
}