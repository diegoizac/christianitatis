import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "../components/Hero";
import EventList from "../components/EventList";
import Animation from "../components/Animation";
import { useCache } from "../hooks/useCache";
import { fetchEvents, Event } from "../services/api";

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const {
    data: events,
    loading: eventsLoading,
    error: eventsError,
  } = useCache<Event[]>(fetchEvents, { key: "events", ttl: 3600 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <Animation style={{ position: "absolute", inset: 0 }} />
        </div>
        <div className="relative z-10">
          <Hero />
        </div>
      </section>

      {/* Events Section */}
      <section
        id="events-section"
        className={`py-20 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            Próximos Eventos
          </h2>
          <EventList
            events={events || []}
            loading={eventsLoading}
            error={eventsError}
          />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">
            Não perca nenhum evento!
          </h2>
          <p className="text-xl text-white opacity-90 mb-12 max-w-2xl mx-auto">
            Fique por dentro de todas as novidades e seja o primeiro a saber
            sobre novos eventos.
          </p>
          <button
            onClick={() => navigate("/contato")}
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all duration-300"
          >
            Entre em Contato
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
