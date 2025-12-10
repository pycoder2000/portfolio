import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import { styled } from '../stitches.config'

const Turnstile = forwardRef(({ onVerify, onError }, ref) => {
  const containerRef = useRef(null)
  const widgetIdRef = useRef(null)

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current)
      }
    },
  }))

  useEffect(() => {
    // Only load Turnstile if site key is provided
    if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
      return
    }

    // Check if script already exists
    if (document.querySelector('script[src*="turnstile"]')) {
      // Script already loaded, just render widget
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          callback: token => {
            if (onVerify) onVerify(token)
          },
          'error-callback': () => {
            if (onError) onError()
          },
          theme: 'dark', // Match your dark theme
          size: 'normal', // Can be 'normal' or 'compact'
        })
      }
      return
    }

    // Load Turnstile script
    const script = document.createElement('script')
    script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js'
    script.async = true
    script.defer = true
    document.body.appendChild(script)

    script.onload = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY,
          callback: token => {
            if (onVerify) onVerify(token)
          },
          'error-callback': () => {
            if (onError) onError()
          },
          theme: 'dark', // Match your dark theme
          size: 'normal', // Can be 'normal' or 'compact'
        })
      }
    }

    return () => {
      // Cleanup
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current)
        widgetIdRef.current = null
      }
    }
  }, [onVerify, onError])

  // Don't render if site key is not configured
  if (!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY) {
    return null
  }

  return <TurnstileContainer ref={containerRef} />
})

Turnstile.displayName = 'Turnstile'

export default Turnstile

const TurnstileContainer = styled('div', {
  marginTop: '10px',
  display: 'flex',
  justifyContent: 'flex-start',
  '& iframe': {
    borderRadius: '$borderRadius',
  },
})

