import { Navbar } from "@/components/theme-blocks/global"

export default function LayoutComponent({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<>
			<Navbar />
			{children}
		</>
	)
}