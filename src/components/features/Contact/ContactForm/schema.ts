import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(3, "Nome deve ter pelo menos 3 caracteres")
    .max(100, "Nome muito longo"),

  email: z.string().email("Email inválido").max(100, "Email muito longo"),

  message: z
    .string()
    .min(10, "Mensagem deve ter pelo menos 10 caracteres")
    .max(1000, "Mensagem muito longa"),
});
