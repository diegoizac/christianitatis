import React from "react";

interface EventCardProps {
  imageUrl: string;
  title: string;
  location: string;
  address: string;
  time: string;
  info: string;
  videoUrl?: string; // Optional video URL
  onClick: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
  imageUrl,
  title,
  location,
  address,
  time,
  info,
  videoUrl,
  onClick,
}) => {
  return (
    <div
      className="relative group bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={onClick}
    >
      {/* Imagem do Evento */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        {videoUrl && (
          <div className="absolute top-4 right-4 bg-red-600 text-white px-2 py-1 rounded-md text-sm">
            <i className="fas fa-play mr-1"></i> Vídeo
          </div>
        )}
      </div>

      {/* Informações do Evento */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>

        <div className="space-y-2 text-gray-600">
          <div className="flex items-start">
            <i className="fas fa-map-marker-alt mt-1 mr-2 text-red-500"></i>
            <div>
              <p className="font-semibold">{location}</p>
              <p className="text-sm">{address}</p>
            </div>
          </div>

          <div className="flex items-center">
            <i className="fas fa-clock mr-2 text-blue-500"></i>
            <p>{time}</p>
          </div>

          <div className="flex items-center">
            <i className="fas fa-info-circle mr-2 text-green-500"></i>
            <p>{info}</p>
          </div>
        </div>
      </div>

      {/* Overlay com efeito hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <div className="text-white text-center p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-lg font-bold mb-2">Clique para mais detalhes</p>
          {videoUrl && (
            <p className="text-sm">
              <i className="fas fa-play-circle mr-1"></i> Assista ao vídeo
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
