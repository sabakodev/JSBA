import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('aboutPage.management')

	return (
		<section id="clergy" className="bg-surface py-32">
			<div className="max-w-7xl mx-auto px-8">
				<div className="mb-16 flex justify-between items-end">
					<div>
						<h2 className="font-headline text-5xl mb-4">{t('title')}</h2>
						<p className="font-body text-on-surface-variant">{t('description')}</p>
					</div>
					{/* <Link href="#" className="text-primary font-label text-sm uppercase tracking-widest flex items-center group">
						View Full Directory
						<ArrowRight size={12} className="ml-2 group-hover:translate-x-1 transition-transform" />
					</Link> */}
				</div>
				<div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* <!-- Rector --> */}
					<div className="md:col-span-2 bg-secondary-950 p-8 rounded-lg flex flex-col justify-between group">
						<div>
							<Image alt="Deacon Timothy" className="w-32 h-32 rounded-full object-cover mb-6 sepia-[0.2] group-hover:-rotate-15 transition-transform duration-750"
								data-alt="Kind face of an Orthodox priest with a grey beard and black cassock, standing in a sunlit garden"
								width={414}
								height={414}
								src="/assets/photos/clergy/deacon-timothy.jpeg" />
							<h3 className="font-headline text-3xl mb-1">{t('shepherd.name')}</h3>
							<p className="font-label text-primary tracking-widest text-xs uppercase">{t('shepherd.title')}</p>
						</div>
						<p className="mt-8 text-on-surface-variant text-sm leading-relaxed italic">{t('shepherd.description')}</p>
					</div>
					{/* <!-- Council Lead --> */}
					<div className="bg-secondary-900/90 p-8 rounded-lg hover:bg-secondary-800/60 transition-colors">
						<h3 className="font-headline text-2xl mb-1">Athanasius Reyffissen B. Tuhumury</h3>
						<p className="font-label text-outline tracking-widest text-[10px] uppercase mb-6">{t('lead.title')}</p>
						<p className="text-xs text-on-surface-variant">
							{t('lead.description')}
						</p>
					</div>
					{/* <!-- Secretary --> */}
					<div className="bg-secondary-900/90 p-8 rounded-lg hover:bg-secondary-800/60 transition-colors">
						<h3 className="font-headline text-2xl mb-1">Agnes Ester T. Winowatan</h3>
						<p className="font-label text-outline tracking-widest text-[10px] uppercase mb-6">{t('secretary.title')}</p>
						<p className="text-xs text-on-surface-variant">{t('secretary.description')}</p>
					</div>
					{/* <!-- Smaller Grid Items --> */}
					<div className="bg-secondary-900/90 p-8 rounded-lg hover:bg-secondary-800/60 transition-colors">
						<h3 className="font-headline text-2xl mb-1">Spyridon Yehezkiel M. Manik</h3>
						<p className="font-label text-outline tracking-widest text-[10px] uppercase">{t('treasurer.title')}</p>
					</div>
					<div className="bg-secondary-900/90 p-8 rounded-lg hover:bg-secondary-800/60 transition-colors">
						<h3 className="font-headline text-2xl mb-1">Antonius Suhanto Pakpahan</h3>
						<p className="font-label text-outline tracking-widest text-[10px] uppercase">{t('equpment.title')}</p>
					</div>
					<div className="bg-secondary-900/90 p-8 rounded-lg hover:bg-secondary-800/60 transition-colors">
						<h3 className="font-headline text-2xl mb-1">Musa Andrefico Bangun</h3>
						<p className="font-label text-outline tracking-widest text-[10px] uppercase">{t('choir.title')}</p>
					</div>
					<div className="bg-secondary-900/90 p-8 rounded-lg hover:bg-secondary-800/60 transition-colors">
						<h3 className="font-headline text-2xl mb-1">Yakobus Hans J. Liem & Zakheus Andy M. Suryawardhana</h3>
						<p className="font-label text-outline tracking-widest text-[10px] uppercase">{t('education.title')}</p>
					</div>
				</div>
			</div>
		</section>
	)
}