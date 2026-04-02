export default function LayoutComponent({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<div className="max-w-2xl mx-auto mt-17 pb-32 pt-16">
			{children}
		</div>
	)
}