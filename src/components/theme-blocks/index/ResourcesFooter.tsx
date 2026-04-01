import { useTranslations } from "next-intl"
import Image from "next/image"

export default function Component() {
	const t = useTranslations('indexPage.hero')

	return (
		<section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-32 border-t border-border/10 pt-16">
			<div className="space-y-4">
				<h4 className="font-bold text-xl">Scripture</h4>
				<ul className="space-y-3">
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Old Testament (LXX)</a></li>
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">The New Testament</a></li>
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Audio Bible</a></li>
				</ul>
			</div>
			<div className="space-y-4">
				<h4 className="font-bold text-xl">Liturgical</h4>
				<ul className="space-y-3">
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Divine Liturgy Text</a></li>
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Horologion</a></li>
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Menaion</a></li>
				</ul>
			</div>
			<div className="space-y-4">
				<h4 className="font-bold text-xl">Youth &amp; Family</h4>
				<ul className="space-y-3">
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Children&apos;s Bible Stories</a></li>
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Family Prayer Guide</a></li>
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Activity Books</a></li>
				</ul>
			</div>
			<div className="space-y-4">
				<h4 className="font-bold text-xl">Multimedia</h4>
				<ul className="space-y-3">
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Podcast Archive</a></li>
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Vesperal Lectures</a></li>
					<li><a className="text-secondary opacity-70 hover:opacity-100 font-body text-sm transition-opacity"
						href="#">Parish Photo Journal</a></li>
				</ul>
			</div>
		</section>
	)
}