import { CTA, FeaturedImage, Headline, RelatedFeed, RelatedTags } from "@/components/theme-blocks/blog"
import { Link2, Mail } from "lucide-react"
import { getTranslations } from "next-intl/server"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('blog.title')
	}
}

export default function Page() {
	const relatedPosts = [
		{
			href: "#",
			image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCo_UDO5D56Lvkby_M8ITwuifCFGKn-bSeMk_Fts21rpeTufCs2-J2x8d_O6HSfHv2Vzxvuzq5Q28dXs5Tr-djwk5vWetgB5hvSO6LfKWRoP5qBfCiL8qbcuRthLmKx9esb43LahS2z-vPEFlVIL3fc0eW2vPpvGodcU3JQoe7zyHfkkgO2pUgmGS63Z1MqjEYBCPYfUnHtbUXcDP0aZD8SipLyCd32h97w8Q6dTP0j0i1E-Mcn7DbTy7zPlxV43kJc4E3VGP5imkk",
			imageAlt: "a hand holding a glowing candle in a dark Orthodox church, soft bokeh of golden icons in the background",
			title: "The Theology of Light: Preparing for Theophany",
			category: "Liturgical Year",
			excerpt: "Exploring the deep cosmic significance of the blessing of waters and the manifest glory of God.",
		},
		{
			href: "#",
			imageAlt: "ancient parchment scroll with beautiful calligraphy and decorative ink flourishes on a wooden table",
			image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBzKTATHQdzpQdsLjylAQWTLKCMMY9Cvglmlou1vAIGAwa-BKs6CjH0aDGx8AygOYxdHQpLkGKhrfTTuIOXDdFJmovH2hZ9LqY9wXRjhivFXATSc9vumC4Q3Ql86xpK4xpthm2Kld7wYXtnM30HZ-PxUzGS96GkdC4RAJU_A6_XHOMn1_YA8Ju0xtesnFB4KBvjoQ7mPsPoATzjf8a34NP_BOcSsJpcfrYlZSG-AkIpphwEWV440nztXJGZyqBO9g6StN9EXHOBaIk",
			category: "Scripture",
			title: "Vellum and Spirit: Reading the Fathers Today",
			excerpt: "How the ancient writings of the desert elders still speak to the anxieties of the 21st century.",
		},
		{
			href: "#",
			imageAlt: "a solitary bird flying over a calm lake at dusk with vibrant purple and orange sky",
			image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5dh4b_ui9eaWFExUp8huJe8veY2oY01Om0vJxx2diyS2iHIUUiEb1vbAfFIFRZwiwoa5PRcj4P7Va6cMt6JHGNAQgV3fHvZUZzt0rX9cIXZtVRWGJz-95KiSFrrPqfndmazH9NQag7eMTjXrsnsXFm_5Nibcqf7GEbvvl4cno1WWh2O21foeHAW8k_zfNZWqLtvLiso33gy9j4K1qFzc9cIqg2UQ14sdRWO_qKqu51vRSObOx8N87zFaAgNlTXPQBKevgPUArVDs",
			category: "Reflections",
			title: "Ascesis as Freedom: The Path of Letting Go",
			excerpt: "Understanding self-denial not as a burden, but as the breaking of chains that bind our true nature.",
		},
	]

	return (
		<main className="max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-24 mt-17">
			<Headline />
			<FeaturedImage />
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
				{/* <!-- Sidebar / Decorations --> */}
				<aside className="hidden lg:block lg:col-span-2 pt-4">
					<div className="sticky top-32 space-y-12">
						<div className="flex flex-col gap-6">
							<p className="text-[10px] uppercase tracking-[0.3em] text-outline font-extrabold">Share
							</p>
							<a className="text-secondary-500 hover:text-primary transition-colors" href="#">
								{/* <span
									className="material-symbols-outlined">social_leaderboard</span>
									 */}
							</a>
							<a className="text-secondary-500 hover:text-primary transition-colors" href="#">
								<Mail size={14} />
							</a>
							<a className="text-secondary-500 hover:text-primary transition-colors" href="#">
								<Link2 size={14} />
							</a>
						</div>
					</div>
				</aside>
				{/* <!-- Main Text --> */}
				<article className="lg:col-span-7 prose prose-lg prose-stone max-w-none">
					<p className="drop-cap font-body text-xl text-secondary-500 leading-relaxed mb-12">
						In the desert of the soul, there is a silence that speaks louder than the roar of the modern world.
						This silence, known as <i>hesychia</i> in the Orthodox tradition, is not merely the absence of
						noise, but the presence of an infinite peace. As we navigate the digital labyrinth of our daily
						lives, the call to stillness becomes not a luxury, but a necessity for spiritual survival.
					</p>
					<p className="font-body text-lg text-secondary-500 leading-relaxed mb-8">
						Saint Basil the Great often spoke of the mind as a wandering traveler that must be brought home to
						the heart. When the mind is scattered among many concerns, it becomes like a disturbed pool of
						water, unable to reflect the light of the sun. It is only when the surface is still that the depths
						become visible.
					</p>
					{/* <!-- Iconographic Frame Quote --> */}
					<div
						className="my-16 p-12 bg-secondary-950 relative flex flex-col items-center text-center overflow-hidden">
						<span
							className="material-symbols-outlined text-primary/10 text-8xl absolute -top-4 -left-4">church</span>
						<div className="relative z-10 max-w-xl">
							<span className="material-symbols-outlined text-primary mb-6">format_quote</span>
							<blockquote className="font-headline text-3xl italic text-primary leading-tight mb-8">
								&quot;The soul that is free from worldly cares is like a calm harbor, providing a safe haven for
								those who seek refuge from the storms of life.&quot;
							</blockquote>
							<cite className="text-xs uppercase tracking-widest text-on-surface font-bold">— St. Basil
								the Great</cite>
						</div>
						<span
							className="material-symbols-outlined text-primary/10 text-8xl absolute -bottom-4 -right-4">spa</span>
					</div>
					<h2 className="font-headline text-3xl text-on-surface mb-6">The Practice of the Presence</h2>
					<p className="font-body text-lg text-secondary-500 leading-relaxed mb-8">
						To practice stillness is to invite the Holy Spirit to transform our interior landscape. It begins
						with the simple rhythm of the Jesus Prayer: &quot;Lord Jesus Christ, Son of God, have mercy on me.&quot; This
						prayer acts as an anchor, tethering us to the present moment and grounding us in the reality of
						God&apos;s love.
					</p>
					<div className="grid grid-cols-2 gap-4 my-12">
						<div className="aspect-square rounded-lg overflow-hidden">
							<img className="w-full h-full object-cover sepia-[0.2]"
								data-alt="close-up of ancient wooden prayer beads resting on a weathered stone surface with soft morning light"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuAsVt2oEJty_yc39MJPSMmYVeP7mmwkmgj-XPYW-R4jxXCqO5M8AZMVHONzcyfcMwCXQj72kh__RvIDJKOX7xlKUL7NxjMZtWBZOBiKZUmUDMZ_O-FNEICr_pQRJ3iyqZZum8VMVeitoTXxXJsy4f-7VTZLv0AOzDusW3hZ4iGzjWOC3WV6nS8IZ0E9UQu2X4rs-mRV-dZBTE04PKhFK53ALz8cTaN0fHNKajXVMkn278rseDrV1QSHasjD885_vf23lWLla9BN0Ok" />
						</div>
						<div className="aspect-square rounded-lg overflow-hidden">
							<img className="w-full h-full object-cover sepia-[0.2]"
								data-alt="the interior of a small stone chapel with a single lit candle casting a warm glow on ancient frescoes"
								src="https://lh3.googleusercontent.com/aida-public/AB6AXuAcdj_jdVqdtCzdjf8JFRm8XIgClJl5zDc50likW2ZC7RmOK7I29qpOGpU7s4kOZWoy9nzMd4Ix1e5FGdoytPoaaBa9ZM-fRzcnItDkJa8myNezIEqquCD_mds6zKXdOZ-e46g5QR_JfqE8rl7U3Hp4Wj9jW5acko-1pa-6Il5fvHer-KVILxDl5-R09J3vaVenflRW-3pwtaNqVzYMZB6wneG817_M1GwLXtP75xRZUImcK3U8OsTHYEfNqTxXAl5H2pN5XrY0Jpo" />
						</div>
					</div>
					<p className="font-body text-lg text-secondary-500 leading-relaxed mb-8">
						We must create intentional borders around our time. In the same way our design system rejects harsh
						lines in favor of tonal shifts, we should treat our transition from work to prayer as a soft
						gradient—a gradual letting go of the world&apos;s demands.
					</p>
					<h3 className="font-headline text-2xl text-on-surface mb-4 italic">Practical Steps for the Busy Soul</h3>
					<ul className="list-none space-y-6 mb-12 pl-0">
						<li className="flex items-start gap-4">
							<span className="material-symbols-outlined text-primary mt-1">done_all</span>
							<span className="text-secondary-500">The Morning Watch: Dedicate the first fifteen minutes of
								your day to silence before engaging with digital devices.</span>
						</li>
						<li className="flex items-start gap-4">
							<span className="material-symbols-outlined text-primary mt-1">done_all</span>
							<span className="text-secondary-500">Sacred Space: Create a small corner in your home with an
								icon and a candle to serve as a physical reminder of God&apos;s presence.</span>
						</li>
						<li className="flex items-start gap-4">
							<span className="material-symbols-outlined text-primary mt-1">done_all</span>
							<span className="text-secondary-500">Breath Prayer: Use the rhythm of your breath to carry
								short liturgical phrases throughout your commute or workday.</span>
						</li>
					</ul>
				</article>
				{/* <!-- Metadata / Tags --> */}
				<aside className="lg:col-span-3">
					<RelatedTags tags={[
						{
							label: 'Prayer',
							href: '#'
						},
						{
							label: 'Asceticism',
							href: '#'
						},
						{
							label: 'Silence',
							href: '#'
						},
						{
							label: 'Saint Basil',
							href: '#'
						},
					]} />
				</aside>
			</div>
			<RelatedFeed posts={relatedPosts} />
			<CTA />
		</main>
	)
}