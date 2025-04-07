import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'inteligencia.christianitatis@gmail.com',
    pass: 'kadfrezqkqthjyku',
  },
})

interface EmailData {
  name: string
  email: string
  subject: string
  message: string
}

export const sendContactEmail = async (data: EmailData) => {
  const mailOptions = {
    from: `"${data.name}" <${data.email}>`,
    to: 'inteligencia.christianitatis@gmail.com',
    subject: `Contato via Site: ${data.subject}`,
    html: `
      <h2>Nova mensagem de contato</h2>
      <p><strong>Nome:</strong> ${data.name}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Assunto:</strong> ${data.subject}</p>
      <p><strong>Mensagem:</strong></p>
      <p>${data.message.replace(/\n/g, '<br>')}</p>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error('Erro ao enviar email:', error)
    return { success: false, error: 'Erro ao enviar mensagem' }
  }
}
