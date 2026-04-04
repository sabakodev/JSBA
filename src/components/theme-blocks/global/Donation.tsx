"use client"

import { useTranslations } from "next-intl"
import { useActionState, useEffect, useState } from "react"
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism"

import { cn } from "@/lib/utils"
import { createDonationInvoice, type DonationState } from "@/actions/donation"
import { useAntiSpam } from "@/hooks/use-antispam"

const DonationButton = ({
	label,
	selected,
	onClick,
}: {
	label: string
	selected: boolean
	onClick: React.MouseEventHandler<HTMLButtonElement>
}) => (
	<button
		type="button"
		onClick={onClick}
		className={cn(
			"border border-primary-500 rounded-sm flex justify-center items-center h-16 transition active:bg-primary-950/85",
			selected
				? "hover:border-primary-200 hover:bg-primary-950/45 bg-primary-950/25"
				: "hover:border-primary-100 hover:bg-primary-950/25"
		)}
	>
		{label}
	</button>
)

const initialState: DonationState = {
	success: false,
	error: null,
	invoiceUrl: null,
}

export default function DonationCard() {
	const t = useTranslations("donation")
	const antiSpam = useAntiSpam()

	const [selectedAmount, setSelectedAmount] = useState<number>(0)
	const [customAmount, setCustomAmount] = useState<string>("")
	const [state, formAction, isPending] = useActionState(
		createDonationInvoice,
		initialState
	)

	useEffect(() => {
		if (state.success && state.invoiceUrl) {
			window.location.href = state.invoiceUrl
		}
	}, [state.success, state.invoiceUrl])

	const presets = [
		{ label: "IDR 25.000", value: 25_000 },
		{ label: "IDR 55.000", value: 55_000 },
		{ label: "IDR 155.000", value: 155_000 },
	]

	const effectiveAmount =
		selectedAmount || Number(customAmount.replace(/\D/g, "")) || 0

	const formatCustom = (value: string) => {
		const digits = value.replace(/\D/g, "")
		if (!digits) return ""
		return new Intl.NumberFormat("id-ID").format(Number(digits))
	}

	return (
		<form
			action={formAction}
			className="bg-accent shadow-sm rounded-sm p-12 space-y-6 group hover:shadow-md transition-shadow font-extralight text-base"
		>
			{/* ── Anti-spam hidden fields ── */}
			<input type="hidden" name="amount" value={effectiveAmount} />
			<input type="hidden" name="_ts" value={antiSpam.timestamp} />

			{/* Honeypot — visually hidden, bots will fill it */}
			<div aria-hidden="true" className="absolute opacity-0 h-0 w-0 overflow-hidden -z-10 pointer-events-none">
				<label htmlFor="website">Website</label>
				<input
					type="text"
					name="website"
					id="website"
					tabIndex={-1}
					autoComplete="off"
				/>
			</div>

			<div className="rounded-lg flex justify-center items-center h-10 w-10 bg-primary-300 absolute top-0 left-0 text-primary-950 -translate-x-6 -translate-y-6 shadow-sm group-hover:shadow-lg group-hover:-translate-x-4 group-hover:-translate-y-4 -rotate-20 group-hover:-rotate-15 transition duration-400">
				<VolunteerActivismIcon style={{ fontSize: 24 }} />
			</div>

			<h1 className="mt-4 mb-6 text-3xl">{t("label")}</h1>
			<p>{t("description")}</p>

			{/* ── Optional donor info ── */}
			<div className="grid grid-cols-2 gap-2">
				<input
					type="text"
					name="donorName"
					placeholder={t("donorNamePlaceholder")}
					onChange={antiSpam.trackInteraction}
					className="bg-transparent border-0 border-b border-border/30 focus:outline-0 focus:ring-0 focus:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50"
				/>
				<input
					type="email"
					name="donorEmail"
					placeholder={t("donorEmailPlaceholder")}
					onChange={antiSpam.trackInteraction}
					className="bg-transparent border-0 border-b border-border/30 focus:outline-0 focus:ring-0 focus:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50"
				/>
			</div>

			{/* ── Preset amounts ── */}
			<div className="grid sm:grid-cols-3 gap-2">
				{presets.map((preset, index) => (
					<DonationButton
						key={index}
						selected={preset.value === selectedAmount}
						label={preset.label}
						onClick={() => {
							setSelectedAmount(preset.value)
							setCustomAmount("")
							antiSpam.trackInteraction()
						}}
					/>
				))}
			</div>

			{/* ── Custom amount ── */}
			<div className="relative">
				<span className="absolute left-1 top-1/2 -translate-y-1/2 text-accent-foreground/50 text-sm">
					IDR
				</span>
				<input
					type="text"
					inputMode="numeric"
					placeholder={t("customAmountPlaceholder")}
					value={customAmount}
					onChange={(e) => {
						setSelectedAmount(0)
						setCustomAmount(formatCustom(e.target.value))
						antiSpam.trackInteraction()
					}}
					className="w-full bg-transparent border-0 border-b border-border/30 focus:outline-0 focus:ring-0 focus:border-primary pl-12 pr-1 py-3 transition-colors placeholder:text-accent-foreground/50"
				/>
			</div>

			{/* ── Error message ── */}
			{state.error && (
				<p className="text-red-400 text-sm text-center">{state.error}</p>
			)}

			{/* ── Submit ── */}
			<button
				type="submit"
				disabled={effectiveAmount < 10_000 || isPending}
				className={cn(
					"w-full uppercase font-extralight h-16 bg-primary-100 hover:bg-primary-200 transition text-primary-950 rounded-sm",
					(effectiveAmount < 10_000 || isPending) &&
					"opacity-50 cursor-not-allowed"
				)}
			>
				{isPending ? t("processing") : t("actionButton")}
			</button>

			<div className="text-xs font-extralight text-center w-full text-tertiary-200">
				{t("taxDisclaimer")}
			</div>
		</form>
	)
}