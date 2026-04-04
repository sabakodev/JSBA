import { CategoryFilter, Featured, FeedCard, Hero } from "@/components/theme-blocks/blog"
import OrthodoxCross from "@/components/orthodox-cross"
import { Search } from "lucide-react"
import { getTranslations } from "next-intl/server"
import { getCategories, getFeaturedPost, getPosts, getPostsByCategory } from "@/lib/graphql/services/posts"
import Pagination from "@/components/ui/pagination"
import { Link } from "@/i18n/nav"

interface Props {
	locale: string
	searchParams: Promise<{
		page?: string
		category?: string
	}>
}

export async function generateMetadata({ params }: { params: Promise<Props> }) {
	const { locale } = await params
	const t = await getTranslations({ locale, namespace: 'Metadata' })

	return {
		title: t('blog.title'),
		canonical: '/id/blog'
	}
}

export default async function Page({ searchParams }: Props) {
	const t = await getTranslations('blogPage.generic')

	const params = await searchParams
	const currentPage = Number(params.page) || 1
	const activeCategory = params.category || undefined

	// Fetch categories and posts in parallel
	const [categories, postsData, featuredPost] = await Promise.all([
		getCategories(),
		activeCategory
			? getPostsByCategory(activeCategory, currentPage)
			: getPosts(currentPage),
		getFeaturedPost(),
	])

	return (
		<main className="max-w-7xl mx-auto px-8 mt-17">
			<Hero />
			{featuredPost && <Featured post={featuredPost} />}
			<div
				className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-border/10 pb-8 space-y-6 md:space-y-0">
				<CategoryFilter categories={categories} activeCategory={activeCategory} />
				<div className="md:hidden w-full relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2" size={14} />
					<input
						className="w-full bg-secondary-950 border-none rounded-lg py-3 pl-10 pr-4 text-sm font-body focus:ring-1 focus:ring-primary/20 outline-none"
						placeholder={t('search')} type="text" />
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
				{
					postsData.posts.length > 0 ?
						postsData.posts.map((post, index) => (
							<FeedCard
								key={index}
								data={post}
							/>
						)) : (
							<div className="text-center py-20">
								<p className="text-secondary-300 text-lg">{t('notFound')}</p>
							</div>
						)
				}
				<div
					className="flex flex-col justify-center items-center text-center p-12 bg-secondary-900 rounded-lg space-y-6 border border-border/5">
					<OrthodoxCross className="text-primary" />
					<h3 className="text-2xl font-serif italic text-secondary">&quot;{t('cta.quote')}&quot;</h3>
					<p className="text-sm text-secondary font-body">{t('cta.saintName')}</p>
					<div className="w-12 h-px bg-primary/30"></div>
					<p className="text-xs uppercase tracking-widest text-secondary-100/70 max-w-50">{t('cta.description')}</p>
					<Link
						href="/contact"
						className="bg-primary/10 text-primary px-6 py-2 rounded-sm text-xs uppercase tracking-widest hover:bg-primary/20 transition-colors">
						{t('cta.button')}
					</Link>
				</div>
			</div>
			{/* <!-- Pagination --> */}
			<Pagination
				currentPage={postsData.currentPage}
				totalPages={postsData.totalPages}
				category={activeCategory}
			/>
		</main>
	)
}