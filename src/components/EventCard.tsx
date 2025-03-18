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
  // const handleClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   if (videoUrl) {
  //     setActiveModal("video-modal");
  //     setVideoUrl(videoUrl);
  //   }
  // };

  return (
    <div className="col-span-1">
      {videoUrl ? (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onClick();
          }}
          className="gallery-item image-popup"
        >
          <div className="thumbnail">
            <div className="image bg-cover bg-center">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="overlay">
              <div className="overlay-box">
                <h4>{title}</h4>
                <p>
                  <strong>Local:</strong> {location}
                </p>
                <p>
                  <strong>Endereço:</strong> {address}
                </p>
                <p>
                  <strong>Horário:</strong> {time}
                </p>
                <p>
                  <strong>Informações:</strong> {info}
                </p>
              </div>
            </div>
          </div>
        </a>
      ) : (
        <a href={imageUrl} className="gallery-item image-popup">
          <div className="thumbnail">
            <div className="image bg-cover bg-center">
              <img
                src={imageUrl}
                alt={title}
                className="w-full h-48 object-cover"
              />
            </div>
            <div className="overlay">
              <div className="overlay-box">
                <h4>{title}</h4>
                <p>
                  <strong>Local:</strong> {location}
                </p>
                <p>
                  <strong>Endereço:</strong> {address}
                </p>
                <p>
                  <strong>Horário:</strong> {time}
                </p>
                <p>
                  <strong>Informações:</strong> {info}
                </p>
              </div>
            </div>
          </div>
        </a>
      )}
    </div>
  );
};

export default EventCard;
