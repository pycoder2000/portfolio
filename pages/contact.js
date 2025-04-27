import Head from 'next/head'
import React from 'react'
import { Box } from '../components/Box'
import Toast from '../components/Toast'
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

  const onSendEmail = async e => {
    e.preventDefault()

    try {
      const isProd = process.env.NODE_ENV === 'production'
      const base = isProd
        ? 'https://www.parthdesai.site'
        : 'http://localhost:3000'

      await fetch(`${base}/api/email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: e.target.name.value,
          email: e.target.email.value,
          message: e.target.message.value,
        }),
      })

      setIsEmailSent(true)
      setShowToast(true)
    } catch (e) {
      console.error(e)
      setIsEmailSent(false)
      setShowToast(true)
    }
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
        <h2>Send an email</h2>
        <Form onSubmit={onSendEmail}>
          {[
            // Array of form fields for easier mapping
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
              <Button type="submit">Send</Button>
            </FormGroup>
          </motion.div>
        </Form>

        <Toast
          title={isEmailSent ? 'Email sent :D' : 'Error :('}
          description={
            isEmailSent
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
  '&:hover': {
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
})

Contact.Layout = Base

export default Contact
