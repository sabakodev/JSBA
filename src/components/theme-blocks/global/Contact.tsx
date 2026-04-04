"use client"

import { useActionState, useEffect, useRef } from "react"
import { SendHorizonal, Loader2, CheckCircle2, AlertCircle } from "lucide-react"
import { useTranslations } from "next-intl"
import { submitContactForm, type ContactFormState } from "@/actions/contact"

const initialState: ContactFormState = {
	success: false,
	error: null,
	fieldErrors: {},
}

export default function ContactForm() {
	const t = useTranslations("global.form")
	const [state, formAction, isPending] = useActionState(submitContactForm, initialState)
	const formRef = useRef<HTMLFormElement>(null)

	// Reset form on success
	useEffect(() => {
		if (state.success) {
			formRef.current?.reset()
		}
	}, [state.success])

	const inputClass = (field: string) =>
		`w-full bg-transparent focus:outline-0 border-0 border-b focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50 ${state.fieldErrors[field]?.length
			? "border-red-500/60"
			: "border-border/30"
		}`

	return (
		<form ref={formRef} action={formAction} className="space-y-8">
			{/* ── Success Banner ── */}
			{state.success && (
				<div className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-5 py-4 rounded-sm">
					<CheckCircle2 size={18} />
					<span className="font-label text-sm">{t("successMessage")}</span>
				</div>
			)}

			{/* ── Error Banner ── */}
			{state.error && !state.success && (
				<div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 px-5 py-4 rounded-sm">
					<AlertCircle size={18} />
					<span className="font-label text-sm">{state.error}</span>
				</div>
			)}

			{/* ── Name & Email ── */}
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-2">
					<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
						{t("fullName")}
					</label>
					<input
						name="fullName"
						className={inputClass("fullName")}
						placeholder={t("fullNamePlaceholder")}
						type="text"
						required
						disabled={isPending}
					/>
					{state.fieldErrors.fullName && (
						<p className="text-red-400 text-xs mt-1">{state.fieldErrors.fullName[0]}</p>
					)}
				</div>
				<div className="space-y-2">
					<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
						{t("email")}
					</label>
					<input
						name="email"
						className={inputClass("email")}
						placeholder="john@caesarea.edu"
						type="email"
						required
						disabled={isPending}
					/>
					{state.fieldErrors.email && (
						<p className="text-red-400 text-xs mt-1">{state.fieldErrors.email[0]}</p>
					)}
				</div>
			</div>

			{/* ── Inquiry Type ── */}
			<div className="space-y-2">
				<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
					{t("inquiry.label")}
				</label>
				<select
					name="inquiry"
					className={`${inputClass("inquiry")} appearance-none text-accent-foreground/50`}
					required
					disabled={isPending}
				>
					{/* <option value="">{t("inquiry.option.general")}</option> */}
					<option value="general">{t("inquiry.option.general")}</option>
					<option value="beginner">{t("inquiry.option.beginner")}</option>
					<option value="sacrament">{t("inquiry.option.sacrament")}</option>
					<option value="confession">{t("inquiry.option.confession")}</option>
					<option value="manager">{t("inquiry.option.manager")}</option>
				</select>
				{state.fieldErrors.inquiry && (
					<p className="text-red-400 text-xs mt-1">{state.fieldErrors.inquiry[0]}</p>
				)}
			</div>

			{/* ── Message ── */}
			<div className="space-y-2">
				<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
					{t("message")}
				</label>
				<textarea
					name="message"
					className={`${inputClass("message")} resize-none`}
					placeholder={t("messagePlaceholder")}
					rows={4}
					required
					disabled={isPending}
				/>
				{state.fieldErrors.message && (
					<p className="text-red-400 text-xs mt-1">{state.fieldErrors.message[0]}</p>
				)}
			</div>

			{/* ── Submit ── */}
			<div className="pt-4">
				<button
					className="bg-linear-to-br focus:outline-0 from-primary to-primary text-white px-10 py-4 rounded-sm font-label text-sm uppercase tracking-widest hover:opacity-90 focus:opacity-80 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
					type="submit"
					disabled={isPending}
				>
					{isPending ? (
						<>
							<Loader2 size={14} className="animate-spin" />
							{t("ctaSending")}
						</>
					) : (
						<>
							{t("ctaSend")}
							<SendHorizonal size={14} />
						</>
					)}
				</button>
			</div>
		</form>
	)
}