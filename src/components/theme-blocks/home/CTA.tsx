'use client'

import { useTranslations } from "next-intl"
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism'

import { cn } from "@/lib/utils"
import { useState } from "react"
import { ContactForm } from "../global"

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

const DonationButton = ({ label, selected, onClick }: { label: string, selected: boolean, onClick: React.MouseEventHandler<HTMLButtonElement> }) => (
	<button
		onClick={onClick}
		className={cn(
			"border border-primary-500 rounded-sm flex justify-center items-center h-16 transition active:bg-primary-950/85",
			selected ? "hover:border-primary-200 hover:bg-primary-950/45 bg-primary-950/25" : "hover:border-primary-100 hover:bg-primary-950/25"
		)}>
		{label}
	</button>
)

export const DonationCard = () => {
	const t = useTranslations('donation')

	const [selectedAmount, setSelectedAmount] = useState<number>(0)

	const presets = [
		{
			label: "IDR 25.000",
			value: 25_000,
		},
		{
			label: "IDR 55.000",
			value: 55_000,
		},
		{
			label: "IDR 155.000",
			value: 155_000,
		},
	]


	return (
		<div className="bg-accent shadow-sm rounded-sm p-12 space-y-6 group hover:shadow-md transition-shadow font-extralight text-base">
			<div className="rounded-lg flex justify-center items-center h-10 w-10 bg-primary-300 absolute top-0 left-0 text-primary-950 -translate-x-6 -translate-y-6 shadow-sm group-hover:shadow-lg group-hover:-translate-x-4 group-hover:-translate-y-4 -rotate-20 group-hover:-rotate-15 transition duration-400">
				<VolunteerActivismIcon style={{ fontSize: 24 }} />
			</div>
			<h1 className="mt-4 mb-6 text-3xl">{t('label')}</h1>
			<p className="">{t('description')}</p>
			<div className="grid sm:grid-cols-3 gap-2 ">
				{presets.map((preset, index) => (
					<DonationButton
						key={index}
						selected={preset.value === selectedAmount}
						label={preset.label}
						onClick={() => setSelectedAmount(preset.value)}
					/>
				))}
			</div>
			<button
				disabled={selectedAmount === 0}
				className="w-full uppercase font-extralight h-16 bg-primary-100 hover:bg-primary-200 transition text-primary-950 rounded-sm"
			>
				{t('actionButton')}
			</button>
			<div className="text-xs font-extralight text-center w-full text-tertiary-200">{t('taxDisclaimer')}</div>
		</div>
	)
}