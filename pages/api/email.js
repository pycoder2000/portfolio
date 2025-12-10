import { Resend } from 'resend'
import EmailTemplate from '../../components/EmailTemplate'
import { rateLimit, getClientIP } from '../../lib/rateLimiter'
import {
  isSpamContent,
  isValidEmail,
  isValidName,
  isValidMessage,
} from '../../lib/spamDetection'
import { verifyTurnstileToken } from '../../lib/turnstile'

const resend = new Resend(process.env.RESEND_API_KEY)

export default async function sendEmail(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const data = req.body

    // 1. Honeypot check - if this field is filled, it's a bot
    if (data.website && data.website.trim() !== '') {
      // Silently reject - don't let bots know they were caught
      return res.status(200).json({ message: 'Email sent' })
    }

    // 2. Verify Turnstile token (if configured)
    if (process.env.TURNSTILE_SECRET_KEY) {
      if (!data.turnstileToken) {
        return res.status(400).json({ message: 'Verification required' })
      }

      const clientIP = getClientIP(req)
      const turnstileResult = await verifyTurnstileToken(
        data.turnstileToken,
        clientIP !== 'unknown' ? clientIP : null
      )

      if (!turnstileResult.success) {
        return res.status(400).json({
          message: 'Verification failed. Please try again.',
        })
      }
    }

    // 3. Validate required fields
    if (!data.name || !data.email || !data.message) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // 4. Content validation
    if (!isValidName(data.name)) {
      return res.status(400).json({ message: 'Invalid name' })
    }

    if (!isValidEmail(data.email)) {
      return res.status(400).json({ message: 'Invalid email' })
    }

    if (!isValidMessage(data.message)) {
      return res.status(400).json({ message: 'Invalid message' })
    }

    // 5. Check for spam patterns in content
    if (
      isSpamContent(data.name) ||
      isSpamContent(data.email) ||
      isSpamContent(data.message)
    ) {
      // Silently reject spam
      return res.status(200).json({ message: 'Email sent' })
    }

    // 6. Rate limiting by IP
    const clientIP = getClientIP(req)
    const rateLimitResult = rateLimit(clientIP, 3, 3600000) // 3 submissions per hour

    if (!rateLimitResult.allowed) {
      return res.status(429).json({
        message: 'Too many requests. Please try again later.',
      })
    }

    // 7. Additional check: message should have some meaningful content
    // Reject messages that are just random characters
    const messageWords = data.message.trim().split(/\s+/)
    if (messageWords.length < 3) {
      return res.status(400).json({ message: 'Message too short' })
    }

    // All checks passed - send email
    await resend.sendEmail({
      from: 'parthdesai.site <website@parthdesai.site>',
      to: process.env.RESEND_DESTINATION_EMAIL,
      replyTo: data.email,
      subject: `${data.name} - via parthdesai.site`,
      react: <EmailTemplate {...data} />,
    })

    res.status(200).json({ message: 'Email sent' })
  } catch (e) {
    console.error('Email sending error:', e)
    res.status(500).json({ message: 'Failed to send email' })
  }
}
