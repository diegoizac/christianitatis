import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import OptimizedImage from "../components/OptimizedImage";

interface Event {
  imageUrl: string;
  title: string;
  location: string;
  address: string;
  time: string;
  info: string;
  videoUrl?: string;
}

const EventDetails: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const event = location.state?.event as Event;

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Evento não encontrado
        </h2>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          Voltar para a página inicial
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative h-96">
          <OptimizedImage
            src={event.imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {event.videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center">
              <a
                href={event.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-4 rounded-full transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </a>
            </div>
          )}
        </div>

        <div className="p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {event.title}
          </h1>

          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Local</h2>
              <p className="text-gray-600">{event.location}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Endereço</h2>
              <p className="text-gray-600">{event.address}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">Horário</h2>
              <p className="text-gray-600">{event.time}</p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                Informações
              </h2>
              <p className="text-gray-600">{event.info}</p>
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
            >
              Voltar para a lista de eventos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
