import type { Metadata } from "next"
import { Geist, Manrope, Geist_Mono, Instrument_Serif } from "next/font/google"
import "../globals.css"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { routing } from "@/i18n/routing"
import { notFound } from "next/navigation"
import { Footer } from "@/components/theme-blocks/global"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

const instrumentSerif = Instrument_Serif({
	weight: "400",
	variable: "--font-instrument-serif",
	subsets: ['latin']
})

const manropeSans = Manrope({
	variable: "--font-manrope-sans",
	subsets: ["latin"],
})

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})

export const metadata: Metadata = {
	title: "GOI - JsBA",
	description: "Orthodox Church",
}

export default async function RootLayout({
	children,
	params,
}: Readonly<{
	children: React.ReactNode
	params: Promise<{ locale: string }>
}>) {
	const { locale } = await params
	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	return (
		<html
			className={`${geistSans.variable} ${geistMono.variable} ${manropeSans.variable} ${instrumentSerif.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col">
				<Analytics />
				<SpeedInsights />
				<NextIntlClientProvider>
					{children}
					<Footer />
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
