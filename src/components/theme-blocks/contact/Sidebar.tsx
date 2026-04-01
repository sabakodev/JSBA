import { Mail, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"

export default function Component() {
	const schedule = useTranslations('eventPage.sidebar.services')
	const t = useTranslations('contactPage.sidebar')

	return (
		<div className="space-y-2">
			<h2 className="text-3xl text-primary mb-6">{t('title')}</h2>
			<div className="space-y-8">
				{/* <!-- Address --> */}
				<div className="flex gap-4">
					<MapPin className="mt-1 text-primary" size={14} />
					<div>
						<p className="font-label uppercase tracking-widest text-xs text-secondary mb-1">{t('location.label')}</p>
						<p className="text-on-surface">1200 Byzantine Way,<br />Eastern Ridge, CA 90210</p>
					</div>
				</div>
				{/* <!-- Communication --> */}
				<div className="flex gap-4">
					<Mail className="mt-1 text-primary" size={14} />
					<div>
						<p className="font-label uppercase tracking-widest text-xs text-secondary mb-1">
							{t('contact.label')}
						</p>
						<p className="text-on-surface">office@basiliusagung.org</p>
						<p className="text-on-surface">(555) 234-8900</p>
					</div>
				</div>
				{/* <!-- Schedule --> */}
				<div className="bg-secondary-950/50 p-8 border-l-2 border-primary/20">
					<h3 className="italic text-xl mb-4 text-primary">{schedule('label')}</h3>
					<ul className="space-y-3 text-sm">
						<li className="flex justify-between border-b border-outline-variant/10 pb-2">
							<span className="text-secondary">{schedule('wed')}</span>
							<span className="font-medium">18:00 WIB</span>
						</li>
						<li className="flex justify-between border-b border-outline-variant/10 pb-2">
							<span className="text-secondary">{schedule('fri')}</span>
							<span className="font-medium">19:00 WIB</span>
						</li>
						<li className="flex justify-between border-b border-outline-variant/10 pb-2">
							<span className="text-secondary">{schedule('sat')}</span>
							<span className="font-medium">18:00 WIB</span>
						</li>
						<li className="flex justify-between">
							<span className="text-secondary">{schedule('sun')}</span>
							<span className="font-medium">10:00 WIB</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}