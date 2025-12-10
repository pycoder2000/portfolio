// Verify Turnstile token on server side

export async function verifyTurnstileToken(token, remoteip = null) {
  if (!process.env.TURNSTILE_SECRET_KEY) {
    // If Turnstile is not configured, skip verification
    // This allows the form to work without Turnstile in development
    return { success: true }
  }

  if (!token) {
    return { success: false, error: 'Missing token' }
  }

  try {
    const formData = new URLSearchParams()
    formData.append('secret', process.env.TURNSTILE_SECRET_KEY)
    formData.append('response', token)
    if (remoteip) {
      formData.append('remoteip', remoteip)
    }

    const response = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      }
    )

    const result = await response.json()

    return {
      success: result.success === true,
      error: result.success === false ? result['error-codes'] : null,
    }
  } catch (error) {
    console.error('Turnstile verification error:', error)
    return { success: false, error: 'Verification failed' }
  }
}

