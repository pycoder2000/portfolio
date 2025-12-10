// Simple in-memory rate limiter
// For production, consider using Vercel KV or Redis for persistent rate limiting

const submissions = new Map()

// Clean up old entries every 5 minutes
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of submissions.entries()) {
    if (now - value.lastSubmission > 3600000) { // 1 hour
      submissions.delete(key)
    }
  }
}, 300000) // 5 minutes

export function rateLimit(identifier, maxSubmissions = 3, windowMs = 3600000) {
  const now = Date.now()
  const record = submissions.get(identifier)

  if (!record) {
    submissions.set(identifier, {
      count: 1,
      lastSubmission: now,
      firstSubmission: now,
    })
    return { allowed: true, remaining: maxSubmissions - 1 }
  }

  // Reset if window has passed
  if (now - record.firstSubmission > windowMs) {
    submissions.set(identifier, {
      count: 1,
      lastSubmission: now,
      firstSubmission: now,
    })
    return { allowed: true, remaining: maxSubmissions - 1 }
  }

  // Check if exceeded limit
  if (record.count >= maxSubmissions) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.firstSubmission + windowMs,
    }
  }

  // Increment count
  record.count++
  record.lastSubmission = now
  submissions.set(identifier, record)

  return {
    allowed: true,
    remaining: maxSubmissions - record.count,
  }
}

export function getClientIP(req) {
  // Check various headers for the real IP
  const forwarded = req.headers['x-forwarded-for']
  const realIP = req.headers['x-real-ip']

  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  if (realIP) {
    return realIP
  }

  return req.socket?.remoteAddress || 'unknown'
}

