import React from "react";
import EventCard from "./EventCard";
import { useNavigate } from "react-router-dom";

interface Event {
  imageUrl: string;
  title: string;
  location: string;
  address: string;
  time: string;
  info: string;
  videoUrl?: string;
}

interface EventListProps {
  events: Event[];
  loading?: boolean;
  error?: Error | null;
}

const EventList: React.FC<EventListProps> = ({ events, loading, error }) => {
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 p-4">
        <p>Erro ao carregar eventos: {error.message}</p>
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center text-gray-600 p-4">
        <p>Nenhum evento encontrado.</p>
      </div>
    );
  }

  // Função para gerar um ID único baseado no título do evento
  const generateEventId = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  // Função para navegar para a página do evento
  const handleEventClick = (event: Event) => {
    const eventId = generateEventId(event.title);
    navigate(`/evento/${eventId}`, { state: { event } });
  };

  // Remover duplicatas baseado no título do evento
  const uniqueEvents = events.filter(
    (event, index, self) =>
      index === self.findIndex((e) => e.title === event.title)
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {uniqueEvents.map((event) => (
        <EventCard
          key={generateEventId(event.title)}
          imageUrl={event.imageUrl}
          title={event.title}
          location={event.location}
          address={event.address}
          time={event.time}
          info={event.info}
          videoUrl={event.videoUrl}
          onClick={() => handleEventClick(event)}
        />
      ))}
    </div>
  );
};

export default EventList;
