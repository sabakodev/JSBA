"use server"

import { z } from "zod"

// ──────────────────────────────────────
// Validation
// ──────────────────────────────────────

const donationSchema = z.object({
	amount: z.number().min(10_000, "Minimum donation is IDR 10.000"),
	donorName: z.string().min(2).max(100).optional(),
	donorEmail: z.email().optional(),
})

export type DonationState = {
	success: boolean
	error: string | null
	invoiceUrl: string | null
}

// ──────────────────────────────────────
// Xendit Invoice Creation
// ──────────────────────────────────────

export async function createDonationInvoice(
	_prevState: DonationState,
	formData: FormData
): Promise<DonationState> {
	const raw = {
		amount: Number(formData.get("amount")),
		donorName: (formData.get("donorName") as string) || undefined,
		donorEmail: (formData.get("donorEmail") as string) || undefined,
	}

	const result = donationSchema.safeParse(raw)

	if (!result.success) {
		return {
			success: false,
			error: result.error.message ?? "Invalid input",
			invoiceUrl: null,
		}
	}

	const { amount, donorName, donorEmail } = result.data

	try {
		const xenditApiKey = process.env.XENDIT_SECRET_KEY

		if (!xenditApiKey) {
			throw new Error("Xendit API key not configured")
		}

		const externalId = `donation-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

		const payload: Record<string, unknown> = {
			external_id: externalId,
			amount,
			currency: "IDR",
			description: `Donation to JSBA${donorName ? ` from ${donorName}` : ""}`,
			// Redirect after payment
			success_redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/thank-you`,
			failure_redirect_url: `${process.env.NEXT_PUBLIC_BASE_URL}/donation/failed`,
			// Invoice expires in 24 hours
			invoice_duration: 86_400,
			// Payment methods available in Indonesia
			payment_methods: [
				"BCA",
				"BNI",
				"BSI",
				"BRI",
				"MANDIRI",
				"PERMATA",
				"OVO",
				"DANA",
				"SHOPEEPAY",
				"LINKAJA",
				"QRIS",
			],
		}

		// Optional donor info
		if (donorEmail || donorName) {
			payload.customer = {
				...(donorName && { given_names: donorName }),
				...(donorEmail && { email: donorEmail }),
			}
			if (donorEmail) {
				payload.customer_notification_preference = {
					invoice_paid: ["email"],
				}
			}
		}

		const response = await fetch("https://api.xendit.co/v2/invoices", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${Buffer.from(xenditApiKey + ":").toString("base64")}`,
			},
			body: JSON.stringify(payload),
		})

		if (!response.ok) {
			const err = await response.json()
			console.error("Xendit error:", err)
			throw new Error(err.message || "Failed to create invoice")
		}

		const invoice = await response.json()

		// ── Notify via Telegram & Discord ──
		await Promise.allSettled([
			notifyTelegram(amount, donorName, externalId),
			notifyDiscord(amount, donorName, externalId),
		])

		return {
			success: true,
			error: null,
			invoiceUrl: invoice.invoice_url,
		}
	} catch (err) {
		console.error("Donation error:", err)
		return {
			success: false,
			error: "Failed to process donation. Please try again.",
			invoiceUrl: null,
		}
	}
}

// ──────────────────────────────────────
// Notifications (optional)
// ──────────────────────────────────────

async function notifyTelegram(amount: number, name?: string, externalId?: string) {
	const botToken = process.env.TELEGRAM_BOT_TOKEN
	const chatId = process.env.TELEGRAM_CHAT_ID
	if (!botToken || !chatId) return

	const escape = (t: string) => t.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&")

	const formatted = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(amount)

	const text = [
		`💝 *New Donation Initiated*`,
		``,
		`*Amount:* ${escape(formatted)}`,
		name ? `*Donor:* ${escape(name)}` : `*Donor:* _Anonymous_`,
		`*ID:* \`${externalId}\``,
		``,
		`🕐 _${escape(new Date().toISOString())}_`,
	].join("\n")

	await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			chat_id: chatId,
			text,
			parse_mode: "MarkdownV2",
		}),
	})
}

async function notifyDiscord(amount: number, name?: string, externalId?: string) {
	const webhookUrl = process.env.DISCORD_WEBHOOK_URL
	if (!webhookUrl) return

	const formatted = new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(amount)

	await fetch(webhookUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			username: "JSBA Donations",
			embeds: [
				{
					title: "💝 New Donation Initiated",
					color: 0xd4a056,
					fields: [
						{ name: "Amount", value: formatted, inline: true },
						{ name: "Donor", value: name || "Anonymous", inline: true },
						{ name: "Reference", value: `\`${externalId}\``, inline: false },
					],
					timestamp: new Date().toISOString(),
				},
			],
		}),
	})
}