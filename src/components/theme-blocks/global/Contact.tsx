import { SendHorizonal } from 'lucide-react'
import { useTranslations } from 'next-intl'

export default function Component() {
	const t = useTranslations('global.form')

	return (
		<form className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-2">
					<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
						{t('fullName')}
					</label>
					<input
						className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50"
						placeholder={t('fullNamePlaceholder')} type="text" />
				</div>
				<div className="space-y-2">
					<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
						{t('email')}
					</label>
					<input
						className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50"
						placeholder="john@caesarea.edu" type="email" />
				</div>
			</div>
			<div className="space-y-2">
				<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
					{t('inquiry.label')}
				</label>
				<select
					className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors appearance-none text-accent-foreground/50">
					<option>{t('inquiry.option.general')}</option>
					<option>{t('inquiry.option.beginner')}</option>
					<option>{t('inquiry.option.sacrament')}</option>
					<option>{t('inquiry.option.confession')}</option>
					<option>{t('inquiry.option.manager')}</option>
				</select>
			</div>
			<div className="space-y-2">
				<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">
					{t('message')}
				</label>
				<textarea
					className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50 resize-none"
					placeholder={t('messagePlaceholder')} rows={4}></textarea>
			</div>
			<div className="pt-4">
				<button
					className="bg-linear-to-br focus:outline-0 from-primary to-primary text-white px-10 py-4 rounded-sm font-label text-sm uppercase tracking-widest hover:opacity-90 focus:opacity-80 transition-all flex items-center gap-3"
					type="submit">
					{t('ctaSend')}
					<SendHorizonal size={14} />
				</button>
			</div>
		</form>
	)
}