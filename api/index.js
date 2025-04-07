import express from 'express'
import bodyParser from 'body-parser'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(cors())
app.use(bodyParser.json())

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date(),
    uptime: process.uptime(),
  })
})

// Configurar o transporte de email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Rota para receber dados do formulário
app.post('/enviar', (req, res) => {
  const { email } = req.body
  console.log('Nova requisição de contato recebida:', email)

  // Configurar email para o destinatário
  const mailOptions = {
    from: 'seu-email@gmail.com',
    to: 'info@christianitatis.org',
    subject: 'Nova mensagem do formulário de contato',
    text: `Você recebeu uma nova mensagem de ${email}.`,
  }

  // Configurar email para o remetente
  const mailOptionsCopy = {
    from: 'seu-email@gmail.com',
    to: email,
    subject: 'Confirmação de recebimento',
    text: 'Recebemos sua mensagem e alguém da nossa equipe entrará em contato em breve.',
  }

  // Enviar email para o destinatário
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Erro ao enviar email:', error)
      return res.status(500).send('Erro ao enviar email')
    }
    console.log('Email enviado:', info.response)

    // Enviar cópia para o remetente
    transporter.sendMail(mailOptionsCopy, (error, info) => {
      if (error) {
        console.error('Erro ao enviar cópia:', error)
        return res.status(500).send('Erro ao enviar cópia')
      }
      console.log('Cópia enviada:', info.response)
      res.status(200).send('Emails enviados com sucesso!')
    })
  })
})

app.listen(PORT, () => {
  console.log(`
🚀 Servidor backend rodando!
📡 Porta: ${PORT}
🔗 URL: http://localhost:${PORT}
🛠️ Ambiente: ${process.env.NODE_ENV || 'development'}
  `)
})
