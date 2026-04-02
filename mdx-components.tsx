import type { MDXComponents } from "mdx/types"

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => (
			<h1 className="text-3xl font-bold tracking-tight mt-8 mb-4">{children}</h1>
		),
		h2: ({ children }) => (
			<h2 className="text-2xl font-semibold tracking-tight mt-6 mb-3 border-b pb-2">{children}</h2>
		),
		h3: ({ children }) => (
			<h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>
		),
		p: ({ children }) => (
			<p className="text-base leading-7 text-muted-foreground mb-4">{children}</p>
		),
		ul: ({ children }) => (
			<ul className="list-disc pl-6 mb-4 space-y-1 text-muted-foreground">{children}</ul>
		),
		ol: ({ children }) => (
			<ol className="list-decimal pl-6 mb-4 space-y-1 text-muted-foreground">{children}</ol>
		),
		li: ({ children }) => (
			<li className="text-base leading-7">{children}</li>
		),
		a: ({ href, children }) => (
			<a
				href={href}
				className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
				target={href?.startsWith("http") ? "_blank" : undefined}
				rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
			>
				{children}
			</a>
		),
		strong: ({ children }) => (
			<strong className="font-semibold text-foreground">{children}</strong>
		),
		hr: () => <hr className="my-6 border-border" />,
		blockquote: ({ children }) => (
			<blockquote className="border-l-4 border-primary/30 pl-4 italic text-muted-foreground my-4">
				{children}
			</blockquote>
		),
		table: ({ children }) => (
			<div className="overflow-x-auto my-4">
				<table className="w-full text-sm border-collapse">{children}</table>
			</div>
		),
		th: ({ children }) => (
			<th className="border border-border bg-muted/50 px-3 py-2 text-left font-semibold">
				{children}
			</th>
		),
		td: ({ children }) => (
			<td className="border border-border px-3 py-2">{children}</td>
		),
		...components,
	}
}