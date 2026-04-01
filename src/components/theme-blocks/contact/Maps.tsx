import { Link } from "@/i18n/nav"
import { RichTagsFunction, useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('contactPage.map')

	const formatting: Record<string, string | number | Date | RichTagsFunction> = {
		b: (chunks) => (
			<span
				className="text-primary font-medium">{chunks}</span>
		),
	}

	return (
		<section className="bg-surface-container-low py-24">
			<div className="max-w-7xl mx-auto px-8">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
					<div className="md:col-span-7 rounded-xl overflow-hidden shadow-2xl sepia-[0.15] grayscale-[0.2]">
						<div className="aspect-video bg-surface-dim relative">
							<iframe
								src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3964.952500711237!2d106.8268992!3d-6.4001223!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eb3222b00033%3A0x98b43a10a8467c1a!2sGereja%20Orthodox%20Indonesia%20Js%20Basilius%20Agung%20Depok!5e0!3m2!1sen!2sid!4v1775066468867!5m2!1sen!2sid"
								width="683"
								height="384"
								style={{
									border: 0,
								}}
								allowFullScreen
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade" />
						</div>
					</div>
					<div className="md:col-span-5 space-y-8">
						<h2 className="text-4xl font-headline tracking-tight">{t('title')}</h2>
						<div className="space-y-6">
							<div className="flex gap-4">
								<div
									className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
									<span className="text-primary font-bold text-xs italic">1</span>
								</div>
								<p className="text-on-surface/80 leading-relaxed">
									{t.rich('step.margonda', formatting)}
								</p>
							</div>
							<div className="flex gap-4">
								<div
									className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
									<span className="text-primary font-bold text-xs italic">2</span>
								</div>
								<p className="text-on-surface/80 leading-relaxed">
									{t.rich('step.flamboyant', formatting)}
								</p>
							</div>
							<div className="flex gap-4">
								<div
									className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
									<span className="text-primary font-bold text-xs italic">3</span>
								</div>
								<p className="text-on-surface/80 leading-relaxed">
									{t.rich('step.parking', formatting)}
								</p>
							</div>
						</div>
						<div className="pt-4">
							<Link
								target="_blank"
								className="font-label text-xs uppercase tracking-widest text-primary border-b border-primary/30 pb-1 hover:border-primary transition-colors"
								href="https://maps.app.goo.gl/dBSvwyzqtXY3b3Bv6">
								Open in Google Maps
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}