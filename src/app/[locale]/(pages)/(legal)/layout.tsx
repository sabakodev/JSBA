export default function LayoutComponent({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="max-w-2xl mx-auto mt-17 mb-32 sm:pt-16 px-6">
			{children}
		</div>
	)
}