import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('indexPage.hero')

	return (
		<section className="mb-32">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
				{/* <!-- Card 1: Synaxarion --> */}
				<article className="flex flex-col space-y-6">
					<div
						className="aspect-3/4 rounded-lg overflow-hidden bg-surface-container-low transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
						<Image
							width={300}
							height={400}
							alt="Synaxarion"
							className="w-full h-full object-cover sepia-[0.2]"
							data-alt="An ornate orthodox icon of a saint with gold leaf details and deep crimson and blue pigments on a wooden panel"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHEQFKbhli-qgrXrFsCusYDxcli8SygDZYF8INfgbqK--DogtqEZvLzJwz-2zzZa1hn3WU1L0adLFRIccIAt_WFpoLIF1JwfaZWnpsKTWWL-coLak3tN25ah8X6oy5fM6VqwsTdGXyj2kN2dt69a8KqYLC57SvrqF_qocYORFuKU2Ok6ouC8NQMDrtLyg2jFaHSjuqt3q3LsS984zZPpDMAG7I2M6P1kGTo74dTPKUPKFREzcJxVefYd5OC67fFX-QsJjdgPNQpwU" />
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span className="text-xs font-label uppercase tracking-widest text-primary font-bold">Daily
								Reading</span>
							<span className="text-xs text-secondary opacity-60 font-label">VOL. I - IV</span>
						</div>
						<h3 className="text-3xl font-bold">Synaxarion</h3>
						<p className="text-secondary font-body line-clamp-3">The lives of the saints are the Gospel in
							action. Access the daily accounts of those who have finished the race and inherited the
							Kingdom.</p>
						<div className="pt-2 flex items-center space-x-6">
							<a className="text-primary font-label uppercase tracking-widest text-xs font-bold hover:underline underline-offset-8"
								href="#">Read Today</a>
							<a className="text-secondary opacity-60 font-label uppercase tracking-widest text-xs hover:opacity-100"
								href="#">View All</a>
						</div>
					</div>
				</article>
				{/* <!-- Card 2: Prayer Books --> */}
				<article className="flex flex-col space-y-6 md:translate-y-16">
					<div
						className="aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
						<img alt="Prayer Book" className="w-full h-full object-cover sepia-[0.2]"
							data-alt="Hand holding a small open prayer book in a dimly lit cathedral with blurred golden icons in the background"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuACsrA_Wov1tgmaJGeS0-4iG90tqzIc_hory4UP_vtwdoe38q6DeffwUJrG6dzuUdYVh0vFrOFtV-DOkn0RLVKG3_TSaT-F8ACO4DNknpsp5NO14McyU-rDHnbrv2s0sM7JCgI9VvPJkv3LNm2YRTZw3VdPcvPxvtIJvE7HxguraGtF9qhISBGYcInhz2EOICBpw6odu1b0zNw4pmW2vupkXZpn-t8XBM1K2rXmT2rRZQBjo1DOs4VWdOjxwwb9DwYTQ3zK8KZ6Uxo" />
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span
								className="text-xs font-label uppercase tracking-widest text-primary font-bold">Liturgical</span>
							<span className="text-xs text-secondary opacity-60 font-label">PARISH COLLECTION</span>
						</div>
						<h3 className="text-3xl font-bold">Prayer Books</h3>
						<p className="text-secondary font-body line-clamp-3">Standard texts for Morning and Evening prayers,
							the Jesus Prayer, and Akathists. Formatted for digital reading and physical devotion.</p>
						<div className="pt-2 flex items-center space-x-6">
							<a className="text-primary font-label uppercase tracking-widest text-xs font-bold hover:underline underline-offset-8"
								href="#">Open Library</a>
							<a className="text-secondary opacity-60 font-label uppercase tracking-widest text-xs hover:opacity-100"
								href="#">Download PDF</a>
						</div>
					</div>
				</article>
				{/* <!-- Card 3: Orthodox Index --> */}
				<article className="flex flex-col space-y-6">
					<div
						className="aspect-[3/4] rounded-lg overflow-hidden bg-surface-container-low transition-transform duration-500 hover:scale-[1.02] cursor-pointer">
						<img alt="Orthodox Index" className="w-full h-full object-cover sepia-[0.2]"
							data-alt="A grand theological library with floor-to-ceiling wooden bookshelves and a rolling ladder in warm ambient lighting"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuAYyT9hTywjwig-7SCVwp4BDmN02fIMqzF4AJ9VR94NaEpYPrhQEnPiTfh6mDWujKBZUT54-6HkxHnQzgsOCojv1J3qHuZGnj6lxE64-4sp9iwWvhI7cN69UEOuXNnUFgjINT6_uvQx0Fbgh-fWLwBSH95NspVkghRGZHbI1ni04saxj5PzmgX6Y_ZJLzasU5yVrqwbFp9atvqGjokrptFO14XHUpVOFlITFP151xF10vh8HfMY1qZPwVcaXPYdg2AcItW2mJDSs6E" />
					</div>
					<div className="space-y-4">
						<div className="flex items-center justify-between">
							<span
								className="text-xs font-label uppercase tracking-widest text-primary font-bold">Catechesis</span>
							<span className="text-xs text-secondary opacity-60 font-label">SEARCHABLE</span>
						</div>
						<h3 className="text-3xl font-bold">Orthodox Index</h3>
						<p className="text-secondary font-body line-clamp-3">An expansive directory of articles, external
							links, and theological papers on the history, dogma, and practice of Holy Orthodoxy.</p>
						<div className="pt-2 flex items-center space-x-6">
							<a className="text-primary font-label uppercase tracking-widest text-xs font-bold hover:underline underline-offset-8"
								href="#">Search Index</a>
							<a className="text-secondary opacity-60 font-label uppercase tracking-widest text-xs hover:opacity-100"
								href="#">External Links</a>
						</div>
					</div>
				</article>
			</div>
		</section>
	)
}