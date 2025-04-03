import React from "react";
import EventCard from "../EventCard";

export interface Event {
  imageUrl: string;
  title: string;
  location: string;
  address: string;
  time: string;
  info: string;
  videoUrl?: string;
}

interface EventListProps {
  events: Event[] | null;
  loading?: boolean;
  error?: Error | null;
}

const EventList: React.FC<EventListProps> = ({ events, loading, error }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600">
        Erro ao carregar eventos: {error.message}
      </div>
    );
  }

  if (!events || events.length === 0) {
    return (
      <div className="text-center text-gray-600">Nenhum evento encontrado.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {events.map((event, index) => (
        <EventCard
          key={index}
          {...event}
          onClick={() => {
            console.log(`Evento clicado: ${event.title}`);
            if (event.videoUrl) {
              window.open(event.videoUrl, "_blank");
            }
          }}
        />
      ))}
    </div>
  );
};

export default EventList;
