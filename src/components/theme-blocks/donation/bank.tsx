'use client'

import { Copy, Check, Building2, Wallet, QrCode } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

// ── Data ─────────────────────────────────────

interface DonationAccount {
	bank: string
	bankCode: string
	accountNumber: string
	accountName: string
	type: "bank" | "ewallet" | "qris"
	active: boolean
}

const DONATION_ACCOUNTS: DonationAccount[] = [
	{
		bank: "Bank Central Asia (BCA)",
		bankCode: "014",
		accountNumber: "123-456-7890",
		accountName: "GEREJA ORTODOKS NAMA PAROKI",
		type: "bank",
		active: true,
	},
	{
		bank: "Bank Negara Indonesia (BNI)",
		bankCode: "009",
		accountNumber: "123-456-7890",
		accountName: "GEREJA ORTODOKS NAMA PAROKI",
		type: "bank",
		active: true,
	},
	{
		bank: "Bank Rakyat Indonesia (BRI)",
		bankCode: "002",
		accountNumber: "123-456-7890",
		accountName: "GEREJA ORTODOKS NAMA PAROKI",
		type: "bank",
		active: true,
	},
	{
		bank: "Bank Mandiri",
		bankCode: "008",
		accountNumber: "123-456-7890",
		accountName: "GEREJA ORTODOKS NAMA PAROKI",
		type: "bank",
		active: true,
	},
]

// ── Copy Button ──────────────────────────────

function CopyButton({ text }: { text: string }) {
	const [copied, setCopied] = useState(false)

	const handleCopy = async () => {
		await navigator.clipboard.writeText(text.replace(/-/g, ""))
		setCopied(true)
		setTimeout(() => setCopied(false), 2000)
	}

	return (
		<button
			onClick={handleCopy}
			className={cn(
				"inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors",
				"hover:bg-muted active:bg-muted/80",
				copied && "text-green-600"
			)}
			aria-label={copied ? "Copied" : "Copy account number"}
		>
			{copied ? (
				<>
					<Check className="h-3 w-3" />
					<span>Copied</span>
				</>
			) : (
				<>
					<Copy className="h-3 w-3" />
					<span>Copy</span>
				</>
			)}
		</button>
	)
}

// ── Type Icon ────────────────────────────────

function AccountTypeIcon({ type }: { type: DonationAccount["type"] }) {
	switch (type) {
		case "bank":
			return <Building2 className="h-5 w-5 text-muted-foreground" />
		case "ewallet":
			return <Wallet className="h-5 w-5 text-muted-foreground" />
		case "qris":
			return <QrCode className="h-5 w-5 text-muted-foreground" />
	}
}

// ── Main Component ───────────────────────────

export function DonationAccounts() {
	const activeAccounts = DONATION_ACCOUNTS.filter((a) => a.active)

	return (
		<section className="mt-14 mb-32 space-y-4">
			<div>
				<h2 className="text-lg font-semibold">Donation Accounts</h2>
				<p className="text-sm text-muted-foreground">
					Transfer your donation to one of the following accounts
				</p>
			</div>

			<div className="grid gap-3 sm:grid-cols-2">
				{activeAccounts.map((account) => (
					<div
						key={`${account.bankCode}-${account.accountNumber}`}
						className="rounded-lg border bg-card p-4 space-y-3"
					>
						{/* Header */}
						<div className="flex items-center gap-3">
							<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted">
								<AccountTypeIcon type={account.type} />
							</div>
							<div className="min-w-0">
								<p className="text-sm font-medium leading-tight truncate">
									{account.bank}
								</p>
								<p className="text-xs text-muted-foreground">
									Code: {account.bankCode}
								</p>
							</div>
						</div>

						{/* Account Details */}
						<div className="rounded-md bg-muted/50 px-3 py-2.5 space-y-1">
							<div className="flex items-center justify-between gap-2">
								<code className="text-sm font-mono font-semibold tracking-wider">
									{account.accountNumber}
								</code>
								<CopyButton text={account.accountNumber} />
							</div>
							<p className="text-xs text-muted-foreground">
								a.n. <span className="font-medium">{account.accountName}</span>
							</p>
						</div>
					</div>
				))}
			</div>

			{/* Reminder */}
			<div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
				<p className="font-medium">Important</p>
				<p className="text-xs mt-1 text-amber-700">
					Please ensure the account holder name matches before transferring.
					Contact the parish office if you need confirmation.
				</p>
			</div>
		</section>
	)
}