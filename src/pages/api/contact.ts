import { NextApiRequest, NextApiResponse } from 'next'
import { sendContactEmail } from '../../services/emailService'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { name, email, subject, message } = req.body

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' })
  }

  try {
    const result = await sendContactEmail({ name, email, subject, message })

    if (result.success) {
      return res.status(200).json({ message: 'Mensagem enviada com sucesso!' })
    } else {
      return res.status(500).json({ error: result.error })
    }
  } catch (error) {
    console.error('Erro ao processar envio:', error)
    return res.status(500).json({ error: 'Erro ao processar sua mensagem' })
  }
}
