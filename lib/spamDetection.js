// Spam detection utilities

export function isSpamContent(text) {
  if (!text || typeof text !== 'string') {
    return true
  }

  const trimmedText = text.trim()
  const lowerText = trimmedText.toLowerCase()

  // Check for suspicious patterns
  const spamPatterns = [
    // Random character strings (like the spam you're receiving)
    // Matches strings that are 10+ characters of only alphanumeric with no spaces
    /^[a-z0-9]{10,}$/i,
    // Common spam keywords
    /\b(buy now|click here|free money|viagra|casino|loan|debt|credit)\b/i,
    // Excessive repetition
    /(.)\1{10,}/, // Same character repeated 10+ times
    // Suspicious URLs
    /(http|https|www\.)[^\s]{50,}/i, // Very long URLs
  ]

  // Check if text matches spam patterns
  for (const pattern of spamPatterns) {
    if (pattern.test(trimmedText)) {
      return true
    }
  }

  // Check for random character strings without spaces (like "shcMnfSUMKFcvigLASORUBc")
  // If it's 8+ characters, all alphanumeric, no spaces, and doesn't look like a word
  if (trimmedText.length >= 8 && /^[a-z0-9]+$/i.test(trimmedText)) {
    // Check if it has reasonable vowel/consonant distribution
    const vowels = (trimmedText.match(/[aeiou]/gi) || []).length
    const consonants = (trimmedText.match(/[bcdfghjklmnpqrstvwxyz]/gi) || []).length
    const totalLetters = vowels + consonants

    // If it's mostly letters but has very poor vowel/consonant ratio, it's likely spam
    if (totalLetters > 0) {
      const vowelRatio = vowels / totalLetters
      // Legitimate text usually has 30-50% vowels
      // Random strings often have <20% or >60% vowels
      if (vowelRatio < 0.15 || vowelRatio > 0.65) {
        return true
      }
    }

    // Check for excessive capitalization changes (like "shcMnfSUMKFcvigLASORUBc")
    const caseChanges = (trimmedText.match(/[a-z][A-Z]|[A-Z][a-z]/g) || []).length
    if (caseChanges > trimmedText.length * 0.3) {
      // More than 30% of characters have case changes = likely random spam
      return true
    }
  }

  // Check for suspicious character distribution (too many random characters)
  const randomCharRatio = (trimmedText.match(/[a-z0-9]/gi) || []).length / trimmedText.length
  if (randomCharRatio > 0.9 && trimmedText.length > 20) {
    // If more than 90% are alphanumeric and it's long, might be spam
    const hasVowels = /[aeiou]/i.test(trimmedText)
    const hasConsonants = /[bcdfghjklmnpqrstvwxyz]/i.test(trimmedText)

    // If it's mostly random characters without proper word structure
    if (!hasVowels || !hasConsonants) {
      return true
    }
  }

  return false
}

export function isValidEmail(email) {
  if (!email || typeof email !== 'string') {
    return false
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return false
  }

  // Check for suspicious email patterns
  const suspiciousPatterns = [
    /^[a-z0-9]{10,}@[a-z0-9]{5,}\.[a-z]{2,}$/i, // Random-looking emails
  ]

  // Allow emails that match suspicious patterns but have some structure
  // This is less strict - we'll rely more on other checks
  return true
}

export function isValidName(name) {
  if (!name || typeof name !== 'string') {
    return false
  }

  // Name should be reasonable length
  if (name.length < 2 || name.length > 100) {
    return false
  }

  // Check if it's a random string (like the spam)
  if (/^[a-z0-9]{10,}$/i.test(name) && !/\s/.test(name)) {
    // Random string without spaces
    return false
  }

  return true
}

export function isValidMessage(message) {
  if (!message || typeof message !== 'string') {
    return false
  }

  // Message should be reasonable length
  if (message.length < 10 || message.length > 5000) {
    return false
  }

  return !isSpamContent(message)
}

