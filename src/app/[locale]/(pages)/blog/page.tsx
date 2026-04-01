import { Featured, FeedCard, Hero } from "@/components/theme-blocks/blog"
import OrthodoxCross from "@/components/orthodox-cross"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { getTranslations } from "next-intl/server"
import Image from "next/image"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('blog.title')
	}
}

export default function Page() {
	const posts = [
		{
			href: '/blog/the-great-canon-of-st-andrew-a-journey-of-repentance',
			title: "The Great Canon of St. Andrew: A Journey of Repentance",
			image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGhZoN-Yz8kQMyVwecq0zHGUKC0JUXSLboYAlJWO0XkVay31nA_6qa0IphTzlZxoUITHx63bxIY_jPyfBqrD1tAaFAOFCr3KEmgGfZXPT28J3O2oStucduGa8P2Xd1LFoj4oJlU7GderawJqkWEYRGQ320pnwni0LrxfhRPkOHOn88SyfODOJbjIQmGQAsdMWVVsm_aMJR1ugwLn46C8AqIbUyfdxbqYpxF5eL5wrK1tCDAgZr8ly186PQUKBcewz8XW9bUCv1NZM",
			imageAlt: "close-up of an ornate golden orthodox cross hanging in front of blurred church candles",
			category: "Feast Days",
			excerpt: "As we enter the Lenten season, we reflect on the profound depth of the Great Canon and its call for the soul to return to its Creator.",
			publishedAt: new Date('March 12, 2024'),
		},
		{
			href: '/blog/the-theology-of-the-icon-windows-into-heaven',
			title: "The Theology of the Icon: Windows into Heaven",
			image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDAzeDMQ8lEgHrlAJMyuHfBSQFKb9h5ZmTux6Y4OXYrfK6gmXEP7JQKu-hQjaevVe_7E10nUlDT48DJW_KPKE5q4ZwUCZL8uAE9StK4z4YMSUr7mRyJKdOpOOvFCaoHQcRuda93gLbL7ATSASSevjeGZZmUNx8mO1snCtci9wYgzxizvvEfVzkDSUsRItIe8wTQjVF3UJqXsRtzSwgiFj3S8vAVwuwzK2PFmsOJGC67FP-fugTLd3HdL4bJYL85wdnB52CN-YRxrVw",
			imageAlt: "ancient hand-painted icon of a saint with gold leaf details and visible wood grain texture",
			category: "Spiritual Reflections",
			excerpt: "Understanding why icons are not merely art, but essential liturgical elements that bridge the gap between the earthly and the divine.",
			publishedAt: new Date('Feb 24, 2024'),
		},
		{
			href: '/blog/agape-building-community-beyond-the-divine-liturgy',
			title: "Agape: Building Community Beyond the Divine Liturgy",
			image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVnBkubSHvP1nqGN1KC12xJ3IIYVaaea-3Kb94qkcIH6KWugAqG847tDnU7zAO-x_yG_i66fybSEDxWqlez8A1D-__1IlguSZZ22-pPV7OFaA7AEa0SB10D4oGTRAbIQK4dkzu4XXtjxc7Z1YTD0g_vi9RlozayhLVnaSurN2sFi87Pnm3VMWCW8r7HIE4n30GWqZdgs1edS7LI6D0zklvWN017Nyo4Si44E3VNBZbDO-1eyZePRKTrNvmC6XJcHA1tGjn5hdg5Ec",
			imageAlt: "communal table set for a simple meal in a warm rustic hall with long shadows and soft lighting",
			category: "Parish Life",
			excerpt: "How our shared meals and fellowship hours serve as an extension of the Eucharist, binding us together in Christ& apos;s love.",
			publishedAt: new Date('March 02, 2024'),
		},
		{
			href: '/blog/the-philokalia-wisdom-for-the-modern-seeker',
			title: "The Philokalia: Wisdom for the Modern Seeker",
			image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAwhXtRZXSCAYHrRvg60HP6eQVAXCJuZZkluoz8ESCnzw2LIvjbVSZgn79KSVgrBpiFV3jHs0BamsthnbkxplPULOasveIa_MktMwDcYhrGBS4kQ6xR9oTtPK8OUV4rmdBYJIp3q1RkvsMJnyEWLgyukr84EKyJKs_cF3OxAAyE1ng7Q6ZUdX2yO1qcvUHWUU10MqFcGjszhMdQvOJSxkHOF5_qBeLABEXnPsEKmhS-SwMOmllw8itGR7zZc14m4yw4C2zUvxPZI8g",
			imageAlt: "detail of an open ancient bible with cyrillic text on weathered parchment under warm candle light",
			category: "Spiritual Reflections",
			excerpt: "Introducing the foundational texts of Orthodox spirituality and how their ancient wisdom remains relevant in our digital age.",
			publishedAt: new Date('March 02, 2024'),
		},
		{
			href: '/blog/the-meeting-of-our-lord-in-the-temple',
			title: "The Meeting of our Lord in the Temple",
			imageAlt: "silhouette of a majestic orthodox church dome and cross against a soft twilight sky",
			image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0jSYSsjjVBgRcTTB3Hf6NtgtrY4U7PxVpSigqQierisejQov9Af3me4XXP4u7-v10BW9Cd3AzB4qHPJ0FHnvqNqAg4l7PVzLEXVpC4Mw6qqai2FoPPaRKkS854b6hgdWnpPhpAUV8nMyza5YYD1a0Wqc1XySeoMjamDhhHVKsFOWyeVugU1hFk4dfRv-QohD5x_6WVbbrJy1P3YtMSF98sVOoVoMLyfDpVE39Nk5mE9Lo8b-sYRw3xbnNsdckQ8jIsF0JiSmeEC4",
			category: "Feast Days",
			excerpt: "Reflecting on the encounter between the infant Christ and the aged Simeon, and what it teaches us about patient expectation.",
			publishedAt: new Date('Feb 15, 2024'),
		},
	]

	return (
		<main className="max-w-7xl mx-auto px-8 mt-17">
			<Hero />
			<Featured
				href="#"
				image="https://lh3.googleusercontent.com/aida-public/AB6AXuBcNPH8YRuD897AjCz5ihfLAgU74tZ2eRR9t9H1EnUnTlDIbwMx7nAGWRQ4W9gAZJD6KsE8FlD4K3X-JA-qHPSbSMUMAu2KdYspyfJI6ygSkBhKO6T7KxypRET9xT7yiGD_ZAuZPXjyO4yfnhnlmY5_eE2byGehSmpBdKBi5cnDP6PTATE339tUoM7Y0ypPNJhSnD8t6mlCK1QUXbqhM_N7T1CZFHCmSv0J-gVI2GbFtJDGyeUBiY51JTJNSzuvMwAyseQtL3GnEVY"
				imageAlt="atmospheric interior of an orthodox church with sunlight streaming through dome windows onto incense smoke and icons"
				title="The Luminous Path: Finding Stillness in a Distracted World"
				excerpt="An exploration of Hesychasm and the practice of the Jesus Prayer as a transformative tool for the modern parishioner seeking the peace of Christ."
				publishedAt={new Date('March 15, 2024')}
			/>
			<div
				className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-border/10 pb-8 space-y-6 md:space-y-0">
				<div className="flex flex-wrap justify-center md:justify-start gap-3">
					<button
						className="px-5 py-2 rounded-full bg-primary text-primary-foreground text-xs uppercase tracking-widest">All</button>
					<button
						className="px-5 py-2 rounded-full bg-secondary-900 text-secondary-100/70 text-xs uppercase tracking-widest hover:bg-surface-variant transition-colors">Spiritual
						Reflections</button>
					<button
						className="px-5 py-2 rounded-full bg-secondary-900 text-secondary-100/70 text-xs uppercase tracking-widest hover:bg-surface-variant transition-colors">Parish
						Life</button>
					<button
						className="px-5 py-2 rounded-full bg-secondary-900 text-secondary-100/70 text-xs uppercase tracking-widest hover:bg-surface-variant transition-colors">Feast
						Days</button>
				</div>
				<div className="md:hidden w-full relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2" size={14} />
					<input
						className="w-full bg-secondary-950 border-none rounded-lg py-3 pl-10 pr-4 text-sm font-body focus:ring-1 focus:ring-primary/20 outline-none"
						placeholder="Search reflections..." type="text" />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
				{posts.map((data, index) => (
					<FeedCard
						key={index}
						href={data.href}
						title={data.title}
						image={data.image}
						imageAlt={data.imageAlt}
						category={data.category}
						excerpt={data.excerpt}
						publishedAt={data.publishedAt}
					/>
				))}
				<div
					className="flex flex-col justify-center items-center text-center p-12 bg-secondary-900 rounded-lg space-y-6 border border-border/5">
					<OrthodoxCross className="text-primary" />
					<h3 className="text-2xl font-serif italic text-secondary">&quot;The Church is a hospital, not a courtroom.&quot;</h3>
					<p className="text-sm text-secondary font-body">St. John Chrysostom</p>
					<div className="w-12 h-px bg-primary/30"></div>
					<p className="text-xs uppercase tracking-widest text-secondary-100/70 max-w-50">Dive
						deeper into our parish life and history.</p>
					<button
						className="bg-primary/10 text-primary px-6 py-2 rounded-sm text-xs uppercase tracking-widest hover:bg-primary/20 transition-colors">Join
						our Newsletter</button>
				</div>
			</div>
			{/* <!-- Pagination --> */}
			<nav className="my-24 flex justify-center items-center space-x-4">
				<button
					className="w-10 h-10 flex items-center justify-center rounded-lg border border-border/30 text-outline hover:border-primary hover:text-primary transition-colors">
					<ChevronLeft size={12} />
				</button>
				<button
					className="w-10 h-10 flex items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm">1</button>
				<button
					className="w-10 h-10 flex items-center justify-center rounded-lg border border-border/30 text-secondary hover:border-primary hover:text-primary transition-colors text-sm">2</button>
				<button
					className="w-10 h-10 flex items-center justify-center rounded-lg border border-border/30 text-secondary hover:border-primary hover:text-primary transition-colors text-sm">3</button>
				<span className="text-outline">...</span>
				<button
					className="w-10 h-10 flex items-center justify-center rounded-lg border border-border/30 text-outline hover:border-primary hover:text-primary transition-colors">
					<ChevronRight size={12} />
				</button>
			</nav>
		</main>
	)
}