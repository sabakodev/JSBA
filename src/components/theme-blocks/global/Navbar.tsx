"use client"

import { Link, usePathname } from "@/i18n/nav"
import { cn } from "@/lib/utils"
import { MenuIcon, SearchIcon, XIcon } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"

export default function Component({ hero = false }: { hero?: boolean }) {
	const t = useTranslations('global')
	const [scrolled, setScrolled] = useState(false)
	const [sidebarOpen, setSidebarOpen] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			setScrolled(window.scrollY > 50)
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		handleScroll()

		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	// Lock body scroll when sidebar is open
	useEffect(() => {
		if (sidebarOpen) {
			document.body.style.overflow = "hidden"
		} else {
			document.body.style.overflow = ""
		}
		return () => {
			document.body.style.overflow = ""
		}
	}, [sidebarOpen])

	const isTransparent = hero && !scrolled

	const navlinks = [
		{
			label: t('page.about'),
			href: "/about",
		},
		{
			label: t('page.events'),
			href: "/event",
		},
		{
			label: t('page.blog'),
			href: "/blog",
		},
		{
			label: t('page.index'),
			href: "/index",
		},
		{
			label: t('page.why'),
			href: "/why",
		},
	]

	const currentRoute = usePathname()

	return (
		<>
			<nav
				className={cn(
					"fixed top-0 w-full z-50 transition-all duration-500",
					scrolled && 'shadow-sm',
					isTransparent
						? "bg-transparent"
						: "bg-background/80 backdrop-blur-xl",
				)}
			>
				<div className="flex justify-between items-center w-full px-8 py-4 max-w-7xl mx-auto">
					<Link
						className={cn(
							"text-2xl font-serif italic transition-colors duration-500",
							isTransparent ? "text-white" : "text-primary-500"
						)}
						href="/"
					>
						{t('saintName')}
					</Link>

					{/* Desktop nav */}
					<div className="font-sans hidden md:flex items-center space-x-8">
						{navlinks.map(({ label, href }, index) => (
							<Link
								key={index}
								href={href}
								className={cn(
									"transition-all duration-300",
									currentRoute.startsWith(href)
										? cn(
											"border-b-2 pb-1 font-bold",
											isTransparent
												? "text-white border-white/50"
												: "text-primary-600 border-primary-100"
										)
										: cn(
											"opacity-70 hover:opacity-100",
											isTransparent
												? "text-white/80 hover:text-white"
												: "text-primary-100 hover:text-primary-600"
										)
								)}
							>
								{label}
							</Link>
						))}
					</div>

					<div className="flex items-center space-x-6">
						<div className={cn(
							"relative hidden",
							// "lg:block"
						)}>
							<SearchIcon
								className={cn(
									"absolute left-3 top-1/2 -translate-y-1/2 transition-colors duration-500",
									isTransparent ? "text-white/60" : "text-secondary-100"
								)}
								size={10}
							/>
							<input
								className={cn(
									"bg-transparent placeholder:transition focus:ring-0 py-1 pl-9 pr-4 text-sm font-body transition-colors focus:outline-none",
									isTransparent
										? "border-b border-white/30 focus:border-white text-white placeholder:text-white/40 focus:placeholder:text-white/60"
										: "border-b border-border/30 focus:border-primary text-foreground placeholder:text-muted-foreground focus:placeholder:text-primary-200"
								)}
								placeholder={t('generic.search')}
								type="text"
							/>
						</div>

						<Link
							href="/contact"
							className={cn(
								"hidden md:block px-6 py-2 text-sm tracking-wide active:scale-95 transition-all duration-500",
								isTransparent
									? "bg-white/15 hover:bg-white/25 text-white border border-white/30"
									: "bg-primary-500 hover:bg-primary-400 text-primary-foreground"
							)}
						>
							{t('generic.contact')}
						</Link>

						{/* Mobile hamburger */}
						<button
							className={cn(
								"md:hidden p-2 transition-colors duration-500",
								isTransparent ? "text-white" : "text-foreground"
							)}
							onClick={() => setSidebarOpen(true)}
							aria-label="Open menu"
						>
							<MenuIcon className="h-6 w-6" />
						</button>
					</div>
				</div>
			</nav >

			{/* Mobile sidebar overlay */}
			< div
				className={
					cn(
						"fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
						sidebarOpen
							? "opacity-100 pointer-events-auto"
							: "opacity-0 pointer-events-none"
					)
				}
				onClick={() => setSidebarOpen(false)}
			/>

			{/* Mobile sidebar */}
			<aside
				className={cn(
					"fixed top-0 right-0 z-70 h-full w-80 max-w-[85vw] bg-background shadow-2xl transition-transform duration-300 ease-in-out",
					sidebarOpen ? "translate-x-0" : "translate-x-full"
				)}
			>
				<div className="flex flex-col h-full">
					{/* Sidebar header */}
					<div className="flex items-center justify-between px-6 py-4 border-b border-border/30">
						<a className="text-xl font-serif italic text-primary-500" href="#">
							{t('saintName')}
						</a>
						<button
							className="p-2 text-foreground hover:text-primary-500 transition-colors"
							onClick={() => setSidebarOpen(false)}
							aria-label="Close menu"
						>
							<XIcon className="h-5 w-5" />
						</button>
					</div>

					{/* Sidebar links */}
					<nav className="flex-1 overflow-y-auto px-6 py-6">
						<div className="flex flex-col space-y-1">
							{navlinks.map(({ label, href }, index) => (
								<Link
									key={index}
									href={href}
									onClick={() => setSidebarOpen(false)}
									className={cn(
										"px-4 py-3 rounded-lg text-base transition-all duration-200",
										currentRoute === href
											? "bg-primary-500/10 text-primary-600 font-bold"
											: "text-foreground/70 hover:bg-primary-500/5 hover:text-primary-600"
									)}
								>
									{label}
								</Link>
							))}
						</div>
					</nav>

					{/* Sidebar footer */}
					<Link href="/contact" className="px-6 py-6 border-t border-border/30" onClick={() => setSidebarOpen(false)}>
						<button
							className="w-full bg-primary-500 hover:bg-primary-400 text-primary-foreground px-6 py-3 text-sm tracking-wide active:scale-95 transition-all rounded-lg"
						>
							{t('generic.contact')}
						</button>
					</Link>
				</div>
			</aside>
		</>
	)
}
