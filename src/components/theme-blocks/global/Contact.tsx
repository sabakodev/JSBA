import SendOutlined from '@mui/icons-material/SendOutlined'

export default function Component() {
	return (
		<form className="space-y-8">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div className="space-y-2">
					<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">Full
						Name</label>
					<input
						className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50"
						placeholder="St. Basil the Great" type="text" />
				</div>
				<div className="space-y-2">
					<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">Email
						Address</label>
					<input
						className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50"
						placeholder="basil@caesarea.edu" type="email" />
				</div>
			</div>
			<div className="space-y-2">
				<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">Inquiry
					Type</label>
				<select
					className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors appearance-none text-accent-foreground/50">
					<option>General Inquiry</option>
					<option>Becoming Orthodox (Catechumenate)</option>
					<option>Baptism or Wedding Inquiries</option>
					<option>Confession / Spiritual Guidance</option>
					<option>Parish Council</option>
				</select>
			</div>
			<div className="space-y-2">
				<label className="font-label text-xs uppercase tracking-widest text-secondary ml-1">Your
					Message</label>
				<textarea
					className="w-full bg-transparent focus:outline-0 border-0 border-b border-border/30 focus:ring-0 active:ring-0 focus:border-primary active:border-primary px-1 py-3 transition-colors placeholder:text-accent-foreground/50 resize-none"
					placeholder="How may we serve you?" rows={4}></textarea>
			</div>
			<div className="pt-4">
				<button
					className="bg-linear-to-br focus:outline-0 from-primary to-primary text-white px-10 py-4 rounded-sm font-label text-sm uppercase tracking-widest hover:opacity-90 focus:opacity-80 transition-all flex items-center gap-3"
					type="submit">
					Enter In
					<SendOutlined style={{ fontSize: 14 }} />
				</button>
			</div>
		</form>
	)
}