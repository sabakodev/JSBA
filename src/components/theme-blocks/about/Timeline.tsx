import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('aboutPage.timeline')

	const timeline = [
		{
			year: 2020,
			title: 'Orthodox Community',
			description: 'A small gathering of families celebrated the acceptance of Orthodox Faith in a humble rented house, planting the seeds of what would become our parish today.',
		},
		{
			year: 2024,
			title: 'Deacon Timothy Ordained',
			description: 'A faithful laymen are growing, then the chosen one come ordained as deacon.',
		},
		{
			year: 2026,
			title: 'The Great Reformation Project',
			description: 'Led by the new selected leader & accompanied by the deacon to built what we call "Home".',
		},
	]

	return (
		<section className="bg-surface-container py-32 overflow-hidden">
			<div className="max-w-7xl mx-auto px-8 relative">
				<div className="flex flex-col mb-20">
					<h2 className="text-5xl mb-4">{t('label')}</h2>
					<p className="font-body text-on-surface-variant max-w-xl">
						{t('description')}
					</p>
				</div>

				<div className="relative">
					{/* Timeline center line - solid */}
					<div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border/30 hidden md:block" />

					{/* Dotted line - past era (before first event) */}
					<div
						className="absolute left-1/2 -translate-x-1/2 bottom-full w-px h-32 hidden md:block"
						style={{
							backgroundImage: 'linear-gradient(to top, var(--color-border) 50%, transparent 50%)',
							backgroundSize: '1px 8px',
							maskImage: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
							WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,0.3), transparent)',
						}}
					/>

					{/* Dotted line - future era (after last event) */}
					<div
						className="absolute left-1/2 -translate-x-1/2 top-full w-px h-32 hidden md:block"
						style={{
							backgroundImage: 'linear-gradient(to bottom, var(--color-border) 50%, transparent 50%)',
							backgroundSize: '1px 8px',
							maskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
							WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,0.3), transparent)',
						}}
					/>

					<div className="space-y-32">
						{timeline.map(({ year, title, description }, index) => {
							const isEven = index % 2 === 0

							return (
								<div key={index} className="relative grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-0 items-start">
									{/* Left column */}
									<div
										className={cn(
											"hidden md:flex items-start pt-1 pr-12",
											isEven ? "justify-end" : "order-1"
										)}
									>
										{isEven ? (
											<span className="font-serif text-6xl text-primary opacity-20">{year}</span>
										) : (
											<div>
												<span className="font-label text-primary md:hidden">{year}</span>
												<h4 className="text-3xl mb-4">{title}</h4>
												<p className="text-foreground leading-relaxed">{description}</p>
											</div>
										)}
									</div>

									{/* Center dot */}
									<div className="hidden md:flex justify-center order-2 pt-1">
										<div className="w-5 h-5 bg-primary rounded-full border-4 border-surface-container shrink-0" />
									</div>

									{/* Right column */}
									<div className="hidden md:flex items-start pt-1 order-3 pl-12">
										{isEven ? (
											<div>
												<span className="font-label text-primary md:hidden">{year}</span>
												<h4 className="text-3xl mb-4">{title}</h4>
												<p className="text-foreground leading-relaxed">{description}</p>
											</div>
										) : (
											<span className="font-serif text-6xl text-primary opacity-20 text-left">{year}</span>
										)}
									</div>

									{/* Mobile layout */}
									<div className="md:hidden">
										<span className="font-label text-primary">{year}</span>
										<h4 className="text-3xl mb-4">{title}</h4>
										<p className="text-foreground leading-relaxed">{description}</p>
									</div>
								</div>
							)
						})}
					</div>
				</div>
			</div>
		</section>
	)
}