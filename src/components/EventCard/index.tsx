import { motion } from "framer-motion";
import { clsx } from "clsx";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { Event } from "../../types/Event";

type EventCardProps = Event & {
  className?: string;
};

export default function EventCard({
  title,
  date,
  time,
  location,
  description,
  image,
  href,
  status = "upcoming",
  className,
}: EventCardProps) {
  const statusColors = {
    upcoming: "bg-green-500",
    ongoing: "bg-blue-500",
    past: "bg-gray-500",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={clsx(
        "flex flex-col md:flex-row",
        "group relative overflow-hidden rounded-3xl",
        "bg-white",
        "shadow-lg hover:shadow-2xl",
        "transition-all duration-500",
        "border border-gray-100",
        "transform hover:-translate-y-1",
        className
      )}
    >
      {/* Status indicator */}
      <div
        className={clsx(
          "absolute top-6 right-6 z-10",
          "flex items-center gap-2 px-3 py-1",
          "rounded-full bg-white/95",
          "backdrop-blur-sm shadow-sm",
          "text-sm font-medium",
          status === "upcoming" && "text-green-600",
          status === "ongoing" && "text-blue-600",
          status === "past" && "text-gray-600"
        )}
      >
        <div className={clsx("w-2 h-2 rounded-full", statusColors[status])} />
        {status === "upcoming" && "Próximo"}
        {status === "ongoing" && "Em Andamento"}
        {status === "past" && "Encerrado"}
      </div>

      {/* Image container */}
      <div className="relative w-full md:w-2/5 h-72 md:h-auto overflow-hidden">
        <motion.img
          src={image || "/placeholder-event.jpg"}
          alt={title}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.5 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 via-transparent to-transparent md:bg-gradient-to-r" />
      </div>

      <div className="relative flex flex-col p-8 md:p-10 md:w-3/5">
        {/* Date overlay */}
        <div className="flex items-center gap-4 text-primary mb-6">
          <CalendarIcon className="w-5 h-5" />
          <span className="text-base font-medium tracking-wide">{date}</span>
        </div>

        <motion.h3
          className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>

        <p className="text-gray-600 mb-8 text-base md:text-lg leading-relaxed">
          {description}
        </p>

        <div className="space-y-4 mb-8">
          <div className="flex items-center text-gray-500">
            <ClockIcon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="text-base">{time}</span>
          </div>

          <div className="flex items-center text-gray-500">
            <MapPinIcon className="w-5 h-5 mr-3 flex-shrink-0" />
            <span className="text-base">{location}</span>
          </div>
        </div>

        {href && (
          <motion.a
            href={href}
            className={clsx(
              "inline-flex items-center",
              "text-primary hover:text-primary-dark",
              "transition-colors duration-300",
              "text-base font-medium",
              "mt-auto"
            )}
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            Saiba mais
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </motion.a>
        )}
      </div>
    </motion.div>
  );
}
