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

export interface Event {
  imageUrl: string;
  title: string;
  location: string;
  address: string;
  time: string;
  info: string;
  videoUrl?: string;
}

export const fetchEvents = async (): Promise<Event[]> => {
  // Simulando uma chamada à API
  return [
    {
      imageUrl: "/assets/images/nick-brasilia.png",
      title: "15/04 - Brasília",
      location: "Campus Arena da Sara Nossa Terra",
      address: "Quadra 02, Com. 11, Lote 01, Vicente Pires, DF.",
      time: "19H",
      info: "@copevdf",
    },
    {
      imageUrl: "/assets/images/nick-goiania.png",
      title: "16/04 - Goiânia",
      location: "Arena Videira Bueno",
      address: "Av. T-7, 1361, Goiânia, GO.",
      time: "19H",
      info: "(062) 3251-0505",
    },
    {
      imageUrl: "/assets/images/nick-ponta-grossa.png",
      title: "17/04 - Ponta Grossa",
      location: "Centro de Convenções do Avivamento",
      address: "Av. Maria Rita Perpétuo da Cruz S/N, Ponta Grossa, PR.",
      time: "19H",
      info: "(042) 3223-7870",
      videoUrl: "/assets/videos/video-nick-ponta-grossa.mp4",
    },
    {
      imageUrl: "/assets/images/nick-belo-horizonte.png",
      title: "18/04 - Belo Horizonte",
      location: "Igreja Batista Getsêmani",
      address: "Rua Cassiano Campolina 360, Belo Horizonte, MG.",
      time: "19H",
      info: "(031) 3448-9898",
    },
    {
      imageUrl: "/assets/images/nick-belem.png",
      title: "20/04 - Belém",
      location: "Catedral da Família Foursquare",
      address: "Tv Barão de Igarapé Mirim 977, Guamá, Belém, PA.",
      time: "18H",
      info: "(091) 99981-2091",
      videoUrl: "/assets/videos/video-nick-belem.mp4",
    },
  ];
};
