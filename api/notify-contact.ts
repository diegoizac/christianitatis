import { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// Inicializa o cliente do Supabase com as variáveis de ambiente da Vercel
const supabase = createClient(
  process.env.VITE_SUPABASE_URL || "",
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || ""
);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, name, message } = request.body;

    // Aqui você pode adicionar a lógica para enviar email usando seu serviço preferido
    // Por exemplo: SendGrid, AWS SES, etc.

    // Exemplo com SendGrid (você precisará instalar @sendgrid/mail):
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    await sgMail.send({
      to: 'seu-email@christianitatis.org',
      from: 'noreply@christianitatis.org',
      subject: 'Nova mensagem de contato',
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
      html: `<p><strong>Nome:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Mensagem:</strong> ${message}</p>`,
    });
    */

    // Atualiza o status da mensagem no Supabase
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: "sent" })
      .eq("email", email)
      .eq("status", "pending");

    if (error) {
      throw error;
    }

    return response.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao processar notificação:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
}
