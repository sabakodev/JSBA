import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('indexPage.hero')

	return (
		<header className="relative min-h-153.5 flex items-center mb-24 mt-8">
			<div className="grid grid-cols-12 w-full gap-8">
				<div className="col-span-12 md:col-span-7 flex flex-col justify-center space-y-8 z-10">
					<h1 className="text-7xl font-bold text-on-surface tracking-tight leading-none">
						{t('label.first')} <br />
						<span className="italic font-light text-primary">&amp; {t('label.secondary')}</span>
					</h1>
					<p className="text-xl text-secondary max-w-xl font-body leading-relaxed opacity-90">
						{t('description')}
					</p>
					<div className="pt-4 flex space-x-4">
						<button
							className="bg-primary text-white px-8 py-4 rounded-sm font-label uppercase tracking-widest text-sm">
							{t('cta.primary')}
						</button>
						<button
							className="bg-transparent border border-border/30 text-primary px-8 py-4 rounded-sm font-label uppercase tracking-widest text-sm hover:bg-surface-container-low transition-colors">
							{t('cta.secondary')}
						</button>
					</div>
				</div>
				<div className="col-span-12 md:col-span-5 relative">
					<div className="aspect-4/5 bg-surface-container-low rounded-lg overflow-hidden parchment-glow">
						<Image
							width={400}
							height={500}
							alt="Sacred book"
							className="w-full h-full object-cover sepia-[0.2]"
							data-alt="Close-up of a vintage leather-bound book with gold embossing resting on a weathered wooden table in soft warm candlelight"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuC21KZ4VEF50VbRbkhmVqUs7VgiCeN0sMsfwqku6P7d_Q5GDCFecp8e-Pal7-1bnE8Z1HpcRmjIEcxnIjx9UvQBs8n-lsM5PrW7goZrxX38eF1WN9ojtEdA1zkYlgcGdtyYYIAs686qx86dCHk1M_62W3uIazpN9VFvYNe1yUYbml8ZtDC7zttyqAZsw7Lyc--ANN-pWBTl8jqNuq4Px3uZ6IXuckBf4MWrxa9xw3sUxSROIdTaBK285ukYtIsDgiAcYZAG6_8LyHU" />
					</div>
				</div>
			</div>
		</header>
	)
}