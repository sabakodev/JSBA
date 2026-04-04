"use server"

import { z } from "zod"

// ──────────────────────────────────────
// Validation Schema
// ──────────────────────────────────────

const contactSchema = z.object({
	fullName: z.string().min(2, "Name is required").max(100),
	email: z.email("Invalid email address"),
	phone: z
		.string()
		.min(8, "Phone number is too short")
		.max(20, "Phone number is too long")
		.regex(
			/^[+]?[\d\s\-().]+$/,
			"Phone number can only contain digits, spaces, dashes, and parentheses"
		),
	inquiry: z.string().min(1, "Please select an inquiry type"),
	message: z.string().min(10, "Message must be at least 10 characters").max(2000),
})

export type ContactFormState = {
	success: boolean
	error: string | null
	fieldErrors: Record<string, string[]>
}

// ──────────────────────────────────────
// Telegram API
// ──────────────────────────────────────

async function sendToTelegram(data: z.infer<typeof contactSchema>) {
	const botToken = process.env.TELEGRAM_BOT_TOKEN
	const chatId = process.env.TELEGRAM_CHAT_ID

	if (!botToken || !chatId) {
		console.warn("Telegram credentials not configured, skipping...")
		return
	}

	// Escape MarkdownV2 special characters
	const escape = (text: string) =>
		text.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&")

	const text = [
		`*New Contact Form Submission*`,
		``,
		`*Name:* ${escape(data.fullName)}`,
		`*Email:* ${escape(data.email)}`,
		`*Phone:* ${escape(data.phone)}`,
		`*Inquiry:* ${escape(data.inquiry)}`,
		``,
		`*Message:*`,
		escape(data.message),
		``,
		`🕐 _${escape(new Date().toISOString())}_`,
	].join("\n")

	const response = await fetch(
		`https://api.telegram.org/bot${botToken}/sendMessage`,
		{
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				chat_id: chatId,
				text,
				parse_mode: "MarkdownV2",
			}),
		}
	)

	if (!response.ok) {
		const err = await response.text()
		throw new Error(`Telegram API error: ${err}`)
	}
}

// ──────────────────────────────────────
// Discord Webhook
// ──────────────────────────────────────

async function sendToDiscord(data: z.infer<typeof contactSchema>) {
	const webhookUrl = process.env.DISCORD_WEBHOOK_URL

	if (!webhookUrl) {
		console.warn("Discord webhook not configured, skipping...")
		return
	}

	const embed = {
		title: "New Contact Form Submission",
		color: 0xd4a056,
		fields: [
			{
				name: "Full Name",
				value: data.fullName,
				inline: true,
			},
			{
				name: "Email",
				value: data.email,
				inline: true,
			},
			{
				name: "Phone",
				value: data.phone,
				inline: true,
			},
			{
				name: "Inquiry",
				value: data.inquiry,
				inline: false,
			},
			{
				name: "Message",
				value: data.message.length > 1024
					? data.message.slice(0, 1021) + "..."
					: data.message,
				inline: false,
			},
		],
		timestamp: new Date().toISOString(),
		footer: {
			text: "SABAKO Contact Form",
		},
	}

	const response = await fetch(webhookUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			username: "SABAKO Contact",
			embeds: [embed],
		}),
	})

	if (!response.ok) {
		const err = await response.text()
		throw new Error(`Discord webhook error: ${err}`)
	}
}

// ──────────────────────────────────────
// Main Action
// ──────────────────────────────────────

export async function submitContactForm(
	_prevState: ContactFormState,
	formData: FormData
): Promise<ContactFormState> {
	const raw = {
		fullName: formData.get("fullName") as string,
		email: formData.get("email") as string,
		phone: formData.get("phone") as string,
		inquiry: formData.get("inquiry") as string,
		message: formData.get("message") as string,
	}

	// ── Validate ──
	const result = contactSchema.safeParse(raw)

	if (!result.success) {
		return {
			success: false,
			error: "Please fix the errors below.",
			fieldErrors: result.error.flatten().fieldErrors as Record<string, string[]>,
		}
	}

	// ── Send to both platforms concurrently ──
	try {
		const results = await Promise.allSettled([
			sendToTelegram(result.data),
			sendToDiscord(result.data),
		])

		// Check if ALL failed
		const allFailed = results.every((r) => r.status === "rejected")

		if (allFailed) {
			console.error("Both integrations failed:", results)
			return {
				success: false,
				error: "Failed to send message. Please try again later.",
				fieldErrors: {},
			}
		}

		// Log partial failures but still return success
		for (const r of results) {
			if (r.status === "rejected") {
				console.error("Partial delivery failure:", r.reason)
			}
		}

		return {
			success: true,
			error: null,
			fieldErrors: {},
		}
	} catch (err) {
		console.error("Contact form error:", err)
		return {
			success: false,
			error: "An unexpected error occurred. Please try again.",
			fieldErrors: {},
		}
	}
}