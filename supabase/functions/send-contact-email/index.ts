import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': '*',
  'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
  console.log('Requisição recebida:', req.method)

  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    })
  }

  try {
    console.log('Iniciando processamento do email')
    
    // Log do body recebido
    const body = await req.json()
    console.log('Body recebido:', body)
    
    const { name, email, subject, message } = body

    // Validação básica
    if (!name || !email || !subject || !message) {
      console.log('Campos obrigatórios faltando:', { name, email, subject, message })
      throw new Error('Todos os campos são obrigatórios')
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log('Email inválido:', email)
      throw new Error('Email inválido')
    }

    // Preparar o email
    const emailContent = {
      to: "inteligencia.christianitatis@gmail.com",
      from: "contato@christianitatis.com",
      subject: `Contato via Site: ${subject}`,
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Assunto:</strong> ${subject}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    }

    console.log('Enviando email:', emailContent)

    // Enviar email usando fetch para o serviço de email
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailContent)
    })

    if (!emailResponse.ok) {
      const errorData = await emailResponse.json()
      console.error('Erro ao enviar email:', errorData)
      throw new Error('Falha ao enviar email')
    }

    const emailResult = await emailResponse.json()
    console.log('Email enviado com sucesso:', emailResult)

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Mensagem enviada com sucesso',
        debug: {
          timestamp: new Date().toISOString(),
          emailResult
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    console.error('Erro ao processar requisição:', error)
    
    const errorMessage = error instanceof Error ? error.message : 'Erro ao processar mensagem'
    console.error('Mensagem de erro:', errorMessage)
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: errorMessage,
        debug: {
          timestamp: new Date().toISOString(),
          errorType: error instanceof Error ? error.constructor.name : typeof error,
          errorDetails: error instanceof Error ? error.stack : null
        }
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error instanceof Error && error.message.includes('obrigatórios') ? 400 : 500,
      }
    )
  }
})
