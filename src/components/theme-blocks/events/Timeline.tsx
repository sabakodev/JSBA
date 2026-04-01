import { Link } from "@/i18n/nav"
import { ArrowRight, CalendarPlus, Clock4, MapPin } from "lucide-react"
import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('eventPage.sidebar')

	return (
		<section className="lg:col-span-8 space-y-24 relative">
			<div className="absolute left-0 top-0 bottom-0 w-px bg-border/20 hidden md:block"></div>
			{/* <!-- Event Entry 1 --> */}
			<article className="relative pl-0 md:pl-12 flex flex-col md:flex-row gap-8">
				<div
					className="hidden md:block absolute -left-1.25 top-2 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-surface">
				</div>
				<div className="md:w-32 shrink-0">
					<div className="font-serif text-3xl text-primary leading-none">Sept 14</div>
					<div className="font-label text-xs uppercase tracking-widest text-secondary mt-1">Saturday</div>
				</div>
				<div className="grow group">
					<div className="overflow-hidden rounded-lg mb-6">
						<img className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700 sepia-[0.2]"
							data-alt="Close up of a hand-painted orthodox icon of the holy cross on aged wood with gold leaf details"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGnBSE63PEmLWif4afnAIhI6r37mFbp3U5NwV0qCA1eu8fzMJa2aCqb6z8RpheQpyyaUl2mqqBG4zE_ibxY-Al9TSEOWYs0Uu0Yye-XYcqKhf_DdbQgyptvePR-rOvehoOPuOxsz4PFi62OBO_S_enuv2adRpRiacR78rKP4KSxc4EXwC84Qgs1DQuJLCwzEWpxIdpi4SQMhVH-dEK1QSsn_eVwvVIY73WbyYs9JXLpiA4qUsKncbsmhI9gA4DnBxj5HtTSsWMS98" />
					</div>
					<h3 className="font-serif text-3xl mb-3 group-hover:text-primary transition-colors">Exaltation of
						the Holy Cross</h3>
					<p className="text-secondary mb-6 leading-relaxed max-w-prose">
						A major feast day commemorating the finding of the True Cross. Divine Liturgy will be
						followed by a traditional procession and the veneration of the Cross adorned with basil.
					</p>
					<div className="flex flex-wrap items-center gap-6 mb-8">
						<div className="flex items-center gap-2 text-secondary/80">
							<Clock4 className="text-lg" size={14} />
							<span className="text-sm">09:00 AM — 11:30 AM</span>
						</div>
						<div className="flex items-center gap-2 text-secondary/80">
							<MapPin size={14} />
							<span className="text-sm">Main Cathedral</span>
						</div>
					</div>
					<button
						className="font-label text-xs uppercase tracking-[0.15em] text-primary flex items-center gap-2 group/btn">
						Add to Calendar
						<CalendarPlus className="transition-transform group-hover/btn:translate-x-1" size={12} />
					</button>
				</div>
			</article>
			{/* <!-- Event Entry 2 --> */}
			<article className="relative pl-0 md:pl-12 flex flex-col md:flex-row gap-8">
				<div
					className="hidden md:block absolute -left-1.25 top-2 w-2.5 h-2.5 rounded-full bg-border ring-4 ring-surface">
				</div>
				<div className="md:w-32 shrink-0">
					<div className="font-serif text-3xl text-secondary opacity-60 leading-none">Sept 18</div>
					<div className="font-label text-xs uppercase tracking-widest text-secondary mt-1">Wednesday</div>
				</div>
				<div className="grow">
					<h3 className="font-serif text-3xl mb-3">Orthodox Life: Theology 101</h3>
					<p className="text-secondary mb-6 leading-relaxed max-w-prose">
						Join Father Basil for the second session of our foundational theology series. This week, we
						explore the significance of the Nicene-Constantinopolitan Creed in our daily prayer life.
					</p>
					<div className="flex flex-wrap items-center gap-6 mb-8">
						<div className="flex items-center gap-2 text-secondary/80">
							<Clock4 className="text-lg" size={14} />
							<span className="text-sm">07:00 PM — 08:30 PM</span>
						</div>
						<div className="flex items-center gap-2 text-secondary/80">
							<MapPin size={14} />
							<span className="text-sm">Parish Library</span>
						</div>
					</div>
					<button
						className="font-label text-xs uppercase tracking-[0.15em] text-primary flex items-center gap-2 group/btn">
						Add to Calendar
						<CalendarPlus className="transition-transform group-hover/btn:translate-x-1" size={12} />
					</button>
				</div>
			</article>
			{/* <!-- Event Entry 3 --> */}
			<article className="relative pl-0 md:pl-12 flex flex-col md:flex-row gap-8">
				<div
					className="hidden md:block absolute -left-1.25 top-2 w-2.5 h-2.5 rounded-full bg-border ring-4 ring-surface">
				</div>
				<div className="md:w-32 shrink-0">
					<div className="font-serif text-3xl text-secondary opacity-60 leading-none">Sept 22</div>
					<div className="font-label text-xs uppercase tracking-widest text-secondary mt-1">Sunday</div>
				</div>
				<div className="grow group">
					<div className="overflow-hidden rounded-lg mb-6">
						<img className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-700 sepia-[0.2]"
							data-alt="long outdoor wooden table set for a community meal with rustic bread, wine, and warm afternoon light"
							src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfZ6WlaInvP7Uem6qJL_iOV9cp3IM7WVvIQxz27ZAgmWJw8adhgWo924N_UD8k3ZZX-M0dQxaZ42UoKUolrvXKF7xYVbYdDNs5nWZPTGQsdAMoes-dmpG5cOFhanD8nFxwvw9-_gKCj_pF0sVfAJ2Sa6wiroy4OKQIY4ZThL5j143g6tSKtFt1qyQRjLh1aNi27yGrApZHOL37MaLmgAqoYA63lJ3IhL9u4NQS62Bl46JfzJRWGj1NhXO5FHL_hOxzqorO1wiPHYY" />
					</div>
					<h3 className="font-serif text-3xl mb-3 group-hover:text-primary transition-colors">Autumn
						Harvest Luncheon</h3>
					<p className="text-secondary mb-6 leading-relaxed max-w-prose">
						A community celebration of the changing seasons. Please bring a traditional dish to share as
						we gather in the parish garden for fellowship and thanksgiving.
					</p>
					<div className="flex flex-wrap items-center gap-6 mb-8">
						<div className="flex items-center gap-2 text-secondary/80">
							<Clock4 className="text-lg" size={14} />
							<span className="text-sm">12:30 PM — 03:00 PM</span>
						</div>
						<div className="flex items-center gap-2 text-secondary/80">
							<MapPin size={14} />
							<span className="text-sm">Parish Garden</span>
						</div>
					</div>
					<button
						className="font-label text-xs uppercase tracking-[0.15em] text-primary flex items-center gap-2 group/btn">
						Add to Calendar
						<CalendarPlus className="transition-transform group-hover/btn:translate-x-1" size={12} />
					</button>
				</div>
			</article>
		</section>
	)
}