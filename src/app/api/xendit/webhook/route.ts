import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
	try {
		// ── Verify Xendit callback token ──
		const callbackToken = req.headers.get("x-callback-token")
		const expectedToken = process.env.XENDIT_WEBHOOK_TOKEN

		if (!expectedToken || callbackToken !== expectedToken) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
		}

		const body = await req.json()

		const {
			external_id,
			status,
			amount,
			paid_amount,
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			payment_method,
			payment_channel,
			paid_at,
		} = body

		console.log(`[Xendit Webhook] ${external_id}: ${status}`)

		if (status === "PAID") {
			const formatted = new Intl.NumberFormat("id-ID", {
				style: "currency",
				currency: "IDR",
				minimumFractionDigits: 0,
			}).format(paid_amount || amount)

			// ── Notify successful payment ──
			await Promise.allSettled([
				notifyTelegramPaid(formatted, external_id, payment_channel, paid_at),
				notifyDiscordPaid(formatted, external_id, payment_channel, paid_at),
			])

			// TODO: Save to database if needed
			// await db.donation.update({ where: { externalId: external_id }, data: { status: "paid" } })
		}

		return NextResponse.json({ received: true })
	} catch (err) {
		console.error("Webhook error:", err)
		return NextResponse.json({ error: "Internal error" }, { status: 500 })
	}
}

async function notifyTelegramPaid(
	amount: string,
	externalId: string,
	channel: string,
	paidAt: string
) {
	const botToken = process.env.TELEGRAM_BOT_TOKEN
	const chatId = process.env.TELEGRAM_CHAT_ID
	if (!botToken || !chatId) return

	const escape = (t: string) => t.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, "\\$&")

	const text = [
		`✅ *Donation Payment Received\\!*`,
		``,
		`*Amount:* ${escape(amount)}`,
		`*Method:* ${escape(channel || "Unknown")}`,
		`*ID:* \`${externalId}\``,
		`*Paid at:* _${escape(paidAt || new Date().toISOString())}_`,
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

async function notifyDiscordPaid(
	amount: string,
	externalId: string,
	channel: string,
	paidAt: string
) {
	const webhookUrl = process.env.DISCORD_WEBHOOK_URL
	if (!webhookUrl) return

	await fetch(webhookUrl, {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			username: "JSBA Donations",
			embeds: [
				{
					title: "✅ Donation Payment Received!",
					color: 0x2ecc71,
					fields: [
						{ name: "Amount", value: amount, inline: true },
						{ name: "Method", value: channel || "Unknown", inline: true },
						{ name: "Reference", value: `\`${externalId}\``, inline: false },
					],
					timestamp: paidAt || new Date().toISOString(),
				},
			],
		}),
	})
}