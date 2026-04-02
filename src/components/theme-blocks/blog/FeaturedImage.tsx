import Image from "next/image"

interface FeaturedImageProps {
	src?: string
	alt: string
}

export default function Component({ src, alt }: FeaturedImageProps) {
	if (!src) return null

	return (
		<section className="mb-24">
			<div className="relative w-full aspect-21/9 rounded-lg overflow-hidden group">
				<Image
					className="w-full h-full object-cover sepia-[0.2] transition-transform duration-700 group-hover:scale-105"
					width={2100}
					height={900}
					alt={alt}
					src={src} />
				<div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent"></div>
			</div>
			<p className="mt-4 font-label text-xs italic text-secondary opacity-60 text-center">{alt}</p>
		</section>
	)
}