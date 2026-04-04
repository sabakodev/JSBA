"use client"

import { SendHorizonal, Loader2, CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useActionState } from 'react'
import { submitContactForm, type ContactFormState } from '@/actions/contact'

const initialState: ContactFormState = {
	success: false,
	error: null,
	fieldErrors: {},
}

export default function Component() {
	const t = useTranslations('global.form')
	const [state, formAction, isPending] = useActionState(submitContactForm, initialState)

	if (state.success) {
		return (
			<div className="flex flex-col items-center justify-center py-16 space-y-4 text-center">
				<CheckCircle className="text-green-600" size={48} />
				<h3 className="font-label text-lg uppercase tracking-widest">
					{t('successTitle')}
				</h3>
				<p className="text-accent-foreground/70 max-w-md">
					{t('successMessage')}
				</p>
			</div>
		)
	}

	return (
		<form action={formAction} className="space-y-8">
			{state.error && (
				<div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-sm text-sm">
					{state.error}
				</div>
			)}

			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				{/* Full Name */}
				<div className="space-y-2">
					<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
						{t('fullName')}
					</label>
					<input
						name="fullName"
						className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50"
						placeholder={t('fullNamePlaceholder')}
						type="text"
						required
					/>
					{state.fieldErrors.fullName && (
						<p className="text-red-400 text-xs mt-1">{state.fieldErrors.fullName[0]}</p>
					)}
				</div>

				{/* Email */}
				<div className="space-y-2">
					<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
						{t('email')}
					</label>
					<input
						name="email"
						className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50"
						placeholder="john@caesarea.edu"
						type="email"
						required
					/>
					{state.fieldErrors.email && (
						<p className="text-red-400 text-xs mt-1">{state.fieldErrors.email[0]}</p>
					)}
				</div>
			</div>

			{/* Phone */}
			<div className="space-y-2">
				<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
					{t('phone')}
				</label>
				<input
					name="phone"
					className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50"
					placeholder="+62 812 3456 7890"
					type="tel"
					required
				/>
				{state.fieldErrors.phone && (
					<p className="text-red-400 text-xs mt-1">{state.fieldErrors.phone[0]}</p>
				)}
			</div>

			{/* Inquiry */}
			<div className="space-y-2">
				<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
					{t('inquiry.label')}
				</label>
				<select
					name="inquiry"
					className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors appearance-none text-accent-foreground/50"
					required
				>
					<option value="general">{t('inquiry.option.general')}</option>
					<option value="beginner">{t('inquiry.option.beginner')}</option>
					<option value="sacrament">{t('inquiry.option.sacrament')}</option>
					<option value="confession">{t('inquiry.option.confession')}</option>
					<option value="manager">{t('inquiry.option.manager')}</option>
				</select>
				{state.fieldErrors.inquiry && (
					<p className="text-red-400 text-xs mt-1">{state.fieldErrors.inquiry[0]}</p>
				)}
			</div>

			{/* Message */}
			<div className="space-y-2">
				<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
					{t('message')}
				</label>
				<textarea
					name="message"
					className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50 resize-none"
					placeholder={t('messagePlaceholder')}
					rows={4}
					required
				/>
				{state.fieldErrors.message && (
					<p className="text-red-400 text-xs mt-1">{state.fieldErrors.message[0]}</p>
				)}
			</div>

			{/* Submit */}
			<div className="pt-4">
				<button
					className="bg-linear-to-br focus:outline-0 from-primary to-primary text-white px-10 py-4 rounded-sm font-label text-sm uppercase tracking-widest hover:opacity-90 focus:opacity-80 transition-all flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
					type="submit"
					disabled={isPending}
				>
					{isPending ? (
						<>
							{t('ctaSending')}
							<Loader2 size={14} className="animate-spin" />
						</>
					) : (
						<>
							{t('ctaSend')}
							<SendHorizonal size={14} />
						</>
					)}
				</button>
			</div>
		</form>
	)
}