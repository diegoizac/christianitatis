import React, { useState } from 'react';

interface EventCarouselProps {
  events: { imageUrl: string; title: string; eventPath: string; videoUrl?: string }[];
  onOpenVideo?: (videoUrl: string) => void;
}

const EventCarousel: React.FC<EventCarouselProps> = ({ events, onOpenVideo }) => {
  const [current, setCurrent] = useState(0);
  const length = events.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(events) || events.length <= 0) {
    return null;
  }

    const handleVideoClick = (videoUrl: string) => {
    if (onOpenVideo) {
      onOpenVideo(videoUrl);
    }
  };

  return (
    <section className="relative w-full h-64 flex justify-center items-center overflow-hidden">
      {events.map((slide, index) => {
        return (
          <div
            className={index === current ? 'opacity-100 transition-opacity duration-1000 ease-in-out' : 'opacity-0'}
            key={index}
          >
            {index === current && (
              <>
                {slide.videoUrl ? (
                  <a href="#" onClick={(e) => {e.preventDefault(); handleVideoClick(slide.videoUrl);}} className='cursor-pointer'>
                    <img src={slide.imageUrl} alt={slide.title} className="w-full h-64 object-cover" />
                  </a>
                ) : (
                  <img src={slide.imageUrl} alt={slide.title} className="w-full h-64 object-cover" />
                )}
              </>
            )}
          </div>
        );
      })}
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={prevSlide}>
        &#10094;
      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full" onClick={nextSlide}>
        &#10095;
      </button>
    </section>
  );
};

export default EventCarousel;
