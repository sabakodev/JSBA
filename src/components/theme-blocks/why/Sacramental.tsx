import { Link } from "@/i18n/nav"
import { Droplet, HeartHandshake } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

// Sacramental Life (Bento-style Cards)
export default function Component() {
	const t = useTranslations('whyPage.sacrament')

	return (
		<section className="py-24 bg-accent">
			<div className="max-w-7xl mx-auto px-8">
				<div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
					<div className="max-w-2xl">
						<span className="font-label text-primary uppercase tracking-[0.2em] text-xs mb-4 block">{t('label')}</span>
						<h2 className="font-headline text-5xl">{t('title')}</h2>
						<p className="mt-6 font-body text-lg">
							{t('description')}
						</p>
					</div>
					<button
						className="text-primary font-label text-sm tracking-widest uppercase border-b border-primary pb-1">
						{t('allSacraments')}
					</button>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-6">
					{/* <!-- Large Feature --> */}
					<div
						className="md:col-span-8 bg-white p-8 rounded-lg parchment-glow flex flex-col md:flex-row gap-8 items-center">
						<div className="md:w-1/2 aspect-video overflow-hidden rounded">
							<Image
								width={300}
								height={300}
								alt="The Eucharist"
								className="w-full h-full object-cover sepia-[0.1]"
								data-alt="Golden chalice and paten on a silk altar cloth with warm ethereal light streaming from a high window"
								src="/assets/photos/scenery/sacraments/IMG_1943.JPEG" />
						</div>
						<div className="md:w-1/2">
							<h3 className="font-headline text-3xl mb-4">{t('eucharist.title')}</h3>
							<p className="font-body mb-6">
								{t('eucharist.description')}
							</p>
							<span className="text-primary-container text-sm font-label uppercase tracking-widest">
								{t('eucharist.secondary')}
							</span>
						</div>
					</div>
					{/* <!-- Small Card 1 --> */}
					<div className="md:col-span-4 bg-white p-8 rounded-lg parchment-glow text-center">
						<div
							className="w-16 h-16 bg-surface-container rounded-full flex items-center justify-center mx-auto mb-6">
							<Droplet className="text-primary" />
						</div>
						<h3 className="font-headline text-2xl mb-4">{t('baptism.title')}</h3>
						<p className="font-body text-sm">
							{t('baptism.description')}
						</p>
					</div>
					{/* <!-- Small Card 2 --> */}
					<div className="md:col-span-4 bg-white p-8 rounded-lg parchment-glow">
						<h3 className="font-headline text-2xl mb-4">{t('confession.title')}</h3>
						<p className="font-body text-sm">
							{t('confession.description')}
						</p>
						<div className="mt-6 border-t border-outline-variant opacity-20"></div>
						<span
							className="mt-4 block font-label text-[10px] tracking-[0.2em] uppercase text-primary text-center">
							{t('baptism.secondary')}
						</span>
					</div>
					{/* <!-- Medium Card --> */}
					<div
						className="md:col-span-8 bg-primary-500 p-12 rounded-lg text-primary-foreground flex justify-between items-center">
						<div className="max-w-md">
							<h3 className="font-headline text-3xl mb-4 italic">{t('schedule.title')}</h3>
							<p className="font-body opacity-90 mb-8">
								{t('schedule.description')}
							</p>
							<Link
								href="/event"
								className="bg-white text-primary px-8 py-3 rounded text-xs font-label tracking-widest uppercase hover:bg-surface-bright transition-colors">
								{t('schedule.cta')}
							</Link>
						</div>
						<HeartHandshake className="opacity-10 hidden lg:block" size={96} />
					</div>
				</div>
			</div>
		</section>
	)
}