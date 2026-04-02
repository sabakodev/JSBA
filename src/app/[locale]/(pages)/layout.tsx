import { Navbar } from "@/components/theme-blocks/global"
import { TooltipProvider } from "@/components/ui/tooltip"

export default function LayoutComponent({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<TooltipProvider>
			<Navbar />
			{children}
		</TooltipProvider>

	)
}