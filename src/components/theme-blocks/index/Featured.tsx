import OrthodoxCross from "@/components/orthodox-cross"
import { useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('indexPage.featured')

	return (
		<section className="mb-32 bg-secondary-950 p-16 rounded-lg relative overflow-hidden">
			<div className="absolute top-8 left-1/2 -translate-x-1/2 opacity-10">
				<OrthodoxCross className="w-36 h-36 text-primary" />
			</div>
			<div className="max-w-3xl mx-auto text-center space-y-8 relative z-10">
				<span className="text-xs font-label uppercase tracking-widest text-primary">Patristic Spotlight</span>
				<h2 className="text-5xl font-bold italic">The Works of Saint Basil the Great</h2>
				<p className="text-xl font-body italic text-on-surface-variant leading-relaxed">
					&quot;A good deed is never lost; he who sows courtesy reaps friendship, and he who plants kindness
					gathers love.&quot;
				</p>
				<div className="pt-6">
					<button
						className="bg-transparent border border-primary text-primary px-10 py-4 rounded-lg font-label uppercase tracking-widest text-sm hover:bg-primary hover:text-white transition-all duration-500">
						Explore the Philokalia
					</button>
				</div>
			</div>
		</section>
	)
}