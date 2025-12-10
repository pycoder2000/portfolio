import Head from 'next/head'
import React from 'react'
import { Box } from '../components/Box'
import Toast from '../components/Toast'
import Turnstile from '../components/Turnstile'
import Base from '../layouts/Base'
import stripHtml from '../lib/strip-html'
import { styled } from '../stitches.config'
import { motion } from 'framer-motion'

export async function getStaticProps() {
  const meta = {
    title: 'Contact // Parth Desai',
    tagline: 'Email me. Like in the old days.',
    image: '/static/images/contact-bw.jpg',
    primaryColor: 'cyan',
    secondaryColor: 'green',
  }

  return { props: meta }
}

function Contact(props) {
  const { title, image } = props
  const description = `<strong>I love chatting</strong> with software engineers, tech founders, students, and geeks. I promise that I'll try to reply to your email in a timely manner.`
  const [isEmailSent, setIsEmailSent] = React.useState(undefined)
  const [showToast, setShowToast] = React.useState(false)
  const [turnstileToken, setTurnstileToken] = React.useState(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const turnstileRef = React.useRef(null)

  const onSendEmail = async e => {
    e.preventDefault()

    // Check if Turnstile is required and token is present
    if (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setIsEmailSent(false)
      setShowToast(true)
      return
    }

    setIsSubmitting(true)

    try {
      const isProd = process.env.NODE_ENV === 'production'
      const base = isProd
        ? 'https://www.parthdesai.site'
        : 'http://localhost:3000'

      // Get honeypot field value (should be empty)
      const honeypotValue = e.target.website?.value || ''

      const response = await fetch(`${base}/api/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value.trim(),
          email: e.target.email.value.trim(),
          message: e.target.message.value.trim(),
          website: honeypotValue, // Honeypot field
          turnstileToken: turnstileToken, // Turnstile token
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || 'Failed to send email')
      }

      const result = await response.json()
      setIsEmailSent(true)
      setShowToast(true)
      setTurnstileToken(null) // Reset token
      // Reset form on success
      e.target.reset()

      // Reset Turnstile widget
      if (turnstileRef.current) {
        turnstileRef.current.reset()
      }
    } catch (e) {
      console.error(e)
      setIsEmailSent(false)
      setShowToast(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTurnstileVerify = token => {
    setTurnstileToken(token)
  }

  const handleTurnstileError = () => {
    setTurnstileToken(null)
  }

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta content={title} property="og:title" />
        <meta content={stripHtml(description)} name="description" />
        <meta content={stripHtml(description)} property="og:description" />
        <meta content="https://parthdesai.site/contact" property="og:url" />
        <meta content={`https://parthdesai.site${image}`} property="og:image" />
      </Head>

      <Box>
        <p dangerouslySetInnerHTML={{ __html: description }} />
        <h2>Send me an email</h2>
        <Form onSubmit={onSendEmail}>
          {[
            {
              label: 'Name',
              id: 'name',
              type: 'text',
              placeholder: 'James Bond',
              component: Input,
              required: true,
            },
            {
              label: 'Email',
              id: 'email',
              type: 'email',
              placeholder: 'james@bond.com',
              component: Input,
              required: true,
            },
            {
              label: 'Message',
              id: 'message',
              placeholder: 'How can I help you?',
              component: Textarea,
              rows: 4,
              required: true,
            },
          ].map((field, idx) => (
            <motion.div
              key={field.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: idx * 0.08,
                duration: 0.5,
                type: 'spring',
                stiffness: 60,
              }}
            >
              <FormGroup>
                <Label htmlFor={field.id}>{field.label}</Label>
                <field.component
                  id={field.id}
                  type={field.type}
                  placeholder={field.placeholder}
                  rows={field.rows}
                  required={field.required}
                />
              </FormGroup>
            </motion.div>
          ))}
          {/* Honeypot field - hidden from users but visible to bots */}
          <HoneypotField
            id="website"
            name="website"
            type="text"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />
          {/* Cloudflare Turnstile */}
          <Turnstile
            ref={turnstileRef}
            onVerify={handleTurnstileVerify}
            onError={handleTurnstileError}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 3 * 0.08,
              duration: 0.5,
              type: 'spring',
              stiffness: 60,
            }}
          >
            <FormGroup>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : 'Send'}
              </Button>
            </FormGroup>
          </motion.div>
        </Form>

        <Toast
          title={
            isEmailSent === undefined
              ? ''
              : isEmailSent
              ? 'Email sent :D'
              : 'Error :('
          }
          description={
            isEmailSent === undefined
              ? ''
              : isEmailSent
              ? 'Thanks for taking the time to write it.'
              : 'Something wrong happened. Try again later.'
          }
          isSuccess={isEmailSent}
          showToast={showToast}
          setShowToast={setShowToast}
        />
      </Box>
    </>
  )
}

const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '400px',
})

const FormGroup = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '10px',
})

const Label = styled('label', {
  color: '$secondary',
  textTransform: 'uppercase',
  fontSize: '12px',
  fontWeight: '500',
})

const Input = styled('input', {
  color: '$primary',
  background: 'none',
  border: '1px solid $secondary',
  borderRadius: '$borderRadius',
  padding: '10px',
  '&:focus': { outline: 'none', borderColor: '$cyan' },
})

const Textarea = styled('textarea', {
  color: '$primary',
  background: 'none',
  border: '1px solid $secondary',
  borderRadius: '$borderRadius',
  padding: '10px',
  '&:focus': { outline: 'none', borderColor: '$cyan' },
})

const Button = styled('button', {
  color: '$background',
  background: '#fff',
  border: '1px solid #fff',
  borderRadius: '$borderRadius',
  cursor: 'pointer',
  padding: '10px',
  marginTop: '5px',
  transition: 'all 0.2s ease-in-out',
  '&:hover:not(:disabled)': {
    background: 'transparent',
    borderColor: '$cyan',
    color: '$cyan',
  },
  '&:focus': {
    background: 'transparent',
    borderColor: '$cyan',
    color: '$cyan',
    outline: 'none',
  },
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
})

const HoneypotField = styled('input', {
  position: 'absolute',
  left: '-9999px',
  width: '1px',
  height: '1px',
  opacity: 0,
  pointerEvents: 'none',
  tabIndex: -1,
})

Contact.Layout = Base

export default Contact
