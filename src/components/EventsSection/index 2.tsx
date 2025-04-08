import React from "react";
import EventList from "../EventList";
import { useCache } from "../../hooks/useCache";

const EventsSection: React.FC = () => {
  const {
    data: events,
    loading,
    error,
  } = useCache(
    async () => {
      // Simulando uma chamada à API
      return [
        {
          imageUrl: "./assets/images/Nick-Vujicic-Em-Brasilia.jpg",
          title: "15 ABRIL - Brasília",
          location: "Campus Arena Sara Nossa Terra",
          address: "Vicente Pires, DF",
          time: "19:00",
          info: "@copevdf",
          theme: "DEUS TEM UM PLANO para a sua vida.",
          videoUrl: undefined,
          isFree: true,
          partners: [
            "Nick V Ministries",
            "Concepab",
            "Fenasp",
            "Sara Nossa Terra",
          ],
        },
        {
          imageUrl: "./assets/images/Nick-Vujicic-Em-Goiania.jpg",
          title: "16 ABRIL - Goiânia",
          location: "Arena Videira Bueno",
          address: "Goiânia, GO",
          time: "19:00",
          info: "(62) 3251-0505",
          theme: "VIVA UMA EXPERIÊNCIA DE FÉ.",
          videoUrl: undefined,
          isFree: true,
          partners: ["Nick V Ministries", "Videira"],
        },
        {
          imageUrl: "./assets/images/Nick-Vujicic-Em-Ponta-Grossa.jpg",
          title: "17 ABRIL - Ponta Grossa",
          location: "Centro de Convenções do Avivamento",
          address: "Ponta Grossa, PR",
          time: "19:00",
          info: "(42) 3223-7870",
          theme: "Ouça uma mensagem que transforma vidas E FORTALECE O CORAÇÃO",
          videoUrl: "/assets/videos/video-nick-ponta-grossa.mp4",
          isFree: true,
          partners: ["Nick V Ministries", "Igreja Cristã Presbiteriana"],
        },
        {
          imageUrl: "./assets/images/Nick-Vujicic-Em-Belo-Horizonte.jpg",
          title: "18 ABRIL - Belo Horizonte",
          location: "Igreja Batista Getsêmani",
          address: "Belo Horizonte, MG",
          time: "19:00",
          info: "(31) 3448-9898",
          theme:
            "Um encontro para inspirar e transformar. FÉ, SUPERAÇÃO E PROPÓSITO.",
          videoUrl: undefined,
          isFree: true,
          partners: ["Nick V Ministries", "Igreja Batista Getsêmani"],
        },
      ];
    },
    { key: "events", ttl: 3600 }
  );

  if (loading) {
    return <div>Carregando eventos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar eventos: {error.message}</div>;
  }

  return (
    <div className="py-8">
      <EventList events={events} />
    </div>
  );
};

export default EventsSection;
