import { SVGProps } from "react"
import { JSX } from "react/jsx-runtime"

export default function Component(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg width="18" height="28" viewBox="0 0 18 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
			<path
				d="M18 11.6781V8.6038H10.517V6.16757H13.0234V3.09327H10.517V0H7.48297V3.09327H4.97659V6.16757H7.48297V8.6038H0V11.6781H7.48297V15.7575L4.97659 14.9154V18.1908L7.48297 19.014V27.6781H10.517V20.0393L13.0234 20.8624V17.606L10.517 16.7638V11.6781H18Z"
				fill="currentColor" />
		</svg>
	)
}