import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import EventCard from "../EventCard";
import Section from "../Section";
import { Event } from "../../types/Event";

interface EventListProps {
  title: string;
  subtitle?: string;
  events: Event[];
}

type FilterStatus = "all" | "upcoming" | "ongoing" | "past";

export default function EventList({ title, subtitle, events }: EventListProps) {
  const [filter, setFilter] = useState<FilterStatus>("all");

  const filters: { value: FilterStatus; label: string }[] = [
    { value: "all", label: "Todos" },
    { value: "upcoming", label: "Próximos" },
    { value: "ongoing", label: "Em Andamento" },
    { value: "past", label: "Encerrados" },
  ];

  const filteredEvents = events.filter((event) =>
    filter === "all" ? true : event.status === filter
  );

  return (
    <Section title={title} subtitle={subtitle}>
      {/* Filtros */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {filters.map(({ value, label }) => (
          <motion.button
            key={value}
            onClick={() => setFilter(value)}
            className={clsx(
              "px-4 py-2 rounded-full text-sm font-medium",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              filter === value
                ? "bg-primary text-white"
                : "bg-gray-50 text-gray-600 hover:bg-gray-100",
              "shadow-sm"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {label}
          </motion.button>
        ))}
      </div>

      {/* Grid de eventos */}
      <div
        className={clsx(
          "flex flex-col",
          "gap-8",
          "max-w-5xl mx-auto",
          "px-4 sm:px-6 lg:px-8"
        )}
      >
        <AnimatePresence mode="popLayout">
          {filteredEvents.map((event) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                opacity: { duration: 0.4 },
                layout: { duration: 0.4 },
                ease: "easeOut",
              }}
              className="w-full"
            >
              <EventCard
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                description={event.description}
                image={event.image}
                href={event.href}
                status={event.status}
                className="h-full"
              />
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Mensagem quando não há eventos */}
        {filteredEvents.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-500">
              Nenhum evento encontrado para o filtro selecionado.
            </p>
          </motion.div>
        )}
      </div>
    </Section>
  );
}

// Exemplo de uso:
/*
const events = [
  {
    id: "1",
    title: "Workshop de Oração",
    date: "24 Mar 2024",
    time: "09:00 - 12:00",
    location: "Igreja Matriz",
    description: "Um workshop para aprender mais sobre a oração e sua importância na vida cristã.",
    image: "/events/workshop.jpg",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Retiro Espiritual",
    date: "15-17 Abr 2024",
    time: "Todo o dia",
    location: "Casa de Retiros Santa Clara",
    description: "Um fim de semana de renovação espiritual e conexão com Deus.",
    image: "/events/retiro.jpg",
    status: "upcoming",
    href: "/eventos/retiro-espiritual"
  },
  // ... mais eventos
];

<EventList
  title="Eventos"
  subtitle="Participe dos nossos eventos e fortaleça sua fé"
  events={events}
/>
*/
