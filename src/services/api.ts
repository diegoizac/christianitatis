import { supabase, ContactMessage } from "../lib/supabase";

export interface ContactFormData {
  email: string;
  name: string;
  message: string;
  subject?: string;
  phone?: string;
}

export const contactService = {
  async submitForm(data: ContactFormData) {
    try {
      const { data: insertedData, error } = await supabase
        .from("contact_messages")
        .insert([
          {
            ...data,
            status: "pending",
          },
        ])
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }

      // Enviar notificação por email (opcional, pode ser feito via Edge Function)
      try {
        await fetch("/api/notify-contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      } catch (emailError) {
        console.error("Erro ao enviar notificação:", emailError);
        // Não falha o processo se a notificação falhar
      }

      return {
        success: true,
        message: "Mensagem enviada com sucesso",
        data: insertedData,
      };
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      throw new Error("Erro ao enviar mensagem. Tente novamente mais tarde.");
    }
  },
};
