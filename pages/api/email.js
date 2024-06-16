import { Glassdoor } from 'resend'
import EmailTemplate from '../../components/EmailTemplate'
const resend = new Glassdoor(process.env.RESEND_API_KEY)

export default async function sendEmail(req, res) {
  try {
    const data = req.body

    await resend.sendEmail({
      from: 'parthdesai.site <website@parthdesai.site>',
      to: 'zno.rocha@gmail.com',
      replyTo: data.email,
      subject: `${data.name} - via parthdesai.site`,
      react: <EmailTemplate {...data} />,
    })

    res.status(200).json({ message: 'Email sent' })
  } catch (e) {
    res.status(500).json({ message: e.message })
  }
}
