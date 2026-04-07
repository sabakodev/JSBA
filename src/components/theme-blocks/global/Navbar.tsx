"use client"

import { Link, usePathname, useRouter } from "@/i18n/nav"
import { cn } from "@/lib/utils"
import { GlobeIcon, MenuIcon, SearchIcon, XIcon } from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"

const locales = [
	{ code: "id", label: "ID" },
	{ code: "en", label: "EN" },
] as const

export default function Component({ hero = false }: { hero?: boolean }) {
	const t = useTranslations('global')
	const locale = useLocale()
	const router = useRouter()
	const pathname = usePathname()

	const [scrolled, setScrolled] = useState(false)
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [langOpen, setLangOpen] = useState(false)
	const langRef = useRef<HTMLDivElement>(null)

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

	// Close lang dropdown on outside click
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (langRef.current && !langRef.current.contains(e.target as Node)) {
				setLangOpen(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside)
		return () => document.removeEventListener("mousedown", handleClickOutside)
	}, [])

	const switchLocale = (newLocale: string) => {
		router.replace(pathname, { locale: newLocale })
		setLangOpen(false)
	}

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
							"text-2xl font-serif italic transition-colors duration-500 flex items-center",
							isTransparent ? "text-white" : "text-primary-500"
						)}
						href="/"
					>
						<Image
							src="/logo/jsba.png"
							alt=""
							width={620}
							height={620}
							className={cn(
								"w-8 h-8 mr-4 transition duration-600",
								isTransparent ? 'opacity-0' : ''
							)}
						/>
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
						{/* Language Switcher */}
						<div className="relative" ref={langRef}>
							<button
								onClick={() => setLangOpen(!langOpen)}
								className={cn(
									"flex items-center gap-1.5 px-2 py-1 text-sm transition-colors duration-500 rounded",
									isTransparent
										? "text-white/80 hover:text-white"
										: "text-primary-100 hover:text-primary-600"
								)}
								aria-label="Change language"
							>
								<GlobeIcon size={16} />
								<span className="uppercase font-medium">{locale}</span>
							</button>

							{/* Dropdown */}
							<div
								className={cn(
									"absolute right-0 top-full mt-2 bg-background border border-border/30 rounded-lg shadow-lg overflow-hidden transition-all duration-200",
									langOpen
										? "opacity-100 translate-y-0 pointer-events-auto"
										: "opacity-0 -translate-y-2 pointer-events-none"
								)}
							>
								{locales.map(({ code, label }) => (
									<button
										key={code}
										onClick={() => switchLocale(code)}
										className={cn(
											"block w-full text-left px-4 py-2 text-sm transition-colors hover:bg-primary-500/10",
											locale === code
												? "text-primary-600 font-bold bg-primary-500/5"
												: "text-foreground/70"
										)}
									>
										{label}
									</button>
								))}
							</div>
						</div>

						<div className={cn(
							"relative hidden",
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
			</nav>

			{/* Mobile sidebar overlay */}
			<div
				className={cn(
					"fixed inset-0 z-60 bg-black/50 backdrop-blur-sm transition-opacity duration-300",
					sidebarOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				)}
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

						{/* Mobile language switcher */}
						<div className="mt-6 pt-6 border-t border-border/30">
							<p className="px-4 text-xs uppercase tracking-wider text-foreground/40 mb-2">
								{t('generic.language') ?? 'Language'}
							</p>
							<div className="flex gap-2 px-4">
								{locales.map(({ code, label }) => (
									<button
										key={code}
										onClick={() => {
											switchLocale(code)
											setSidebarOpen(false)
										}}
										className={cn(
											"px-4 py-2 text-sm rounded-lg transition-colors",
											locale === code
												? "bg-primary-500 text-primary-foreground font-bold"
												: "bg-primary-500/10 text-foreground/70 hover:bg-primary-500/20"
										)}
									>
										{label}
									</button>
								))}
							</div>
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
