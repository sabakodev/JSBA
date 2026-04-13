import Content from './content.mdx'

export function generateMetadata() {
	return {
		alternates: {
			canonical: `/en/privacy`,
		}
	}
}

export default function LayoutComponent() {
	return <Content />
}