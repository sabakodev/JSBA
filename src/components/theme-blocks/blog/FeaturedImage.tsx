import { useTranslations } from "next-intl"

export default function Component() {
	const t = useTranslations('blogPage.hero')

	return (
		<section className="mb-24">
			<div className="relative w-full aspect-21/9 rounded-lg overflow-hidden group">
				<img className="w-full h-full object-cover sepia-[0.2] transition-transform duration-700 group-hover:scale-105"
					data-alt="misty mountain range at sunrise with soft golden light filtering through dense evergreen trees and atmospheric fog"
					src="https://lh3.googleusercontent.com/aida-public/AB6AXuDmigjBRGYTPdgMiWw1Zrra1Biqzzgdkp6NuC0NU3n336cKZqQd9SpLdRQaz8y1iebV3tVSWL43Ebo2xB0n-p0RXkrgQulBmD9ofhJxB3BvqFKCgESxg8VWEivRUuQHl3jNHvGN2TyheVGkDfHVFDZ5yZO0YD9v_ZxjpTvGqCEOl61x3SDe5y4lBZFi79exsfObZL-bEU1EaGPKFVIw11on89CxIJa7XLYmhr6XCUeNO6MB4LAZCU-Nj_jSyHeF21QjYTexhV5cN2s" />
				<div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent"></div>
			</div>
			<p className="mt-4 font-label text-xs italic text-secondary opacity-60 text-center">&quot;Be still, and know that I
				am God.&quot; — Psalm 46:10</p>
		</section>
	)
}