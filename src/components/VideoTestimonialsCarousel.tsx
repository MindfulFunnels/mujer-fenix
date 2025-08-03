import React, { useState, useRef } from "react";

interface VideoTestimonialsCarouselProps {
  videos: string[];
}

const VideoTestimonialsCarousel: React.FC<VideoTestimonialsCarouselProps> = ({
  videos,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + videos.length) % videos.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % videos.length);
  };

  if (videos.length === 0) return null;

  return (
    <div className='relative w-full max-w-5xl mx-auto px-2 sm:px-4'>
      {/* Contenedor del video */}
      <div className='relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl bg-black'>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {videos.map((video, index) => (
            <div key={index} className='w-full flex-shrink-0'>
              <div className='relative w-full h-0 pb-[56.25%]'>
                <iframe
                  ref={(el) => {
                    iframeRefs.current[index] = el;
                  }}
                  className='absolute top-0 left-0 w-full h-full'
                  src={`${video}?controls=1&rel=0&modestbranding=1`}
                  title={`Video testimonio ${index + 1}`}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                  allowFullScreen
                />
              </div>
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        <button
          onClick={goToPrevious}
          className='absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10'
        >
          <svg
            className='w-4 h-4 sm:w-6 sm:h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M15 19l-7-7 7-7'
            />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className='absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10'
        >
          <svg
            className='w-4 h-4 sm:w-6 sm:h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M9 5l7 7-7 7'
            />
          </svg>
        </button>

        {/* Indicador de progreso */}
        <div className='absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2'>
          <span className='text-white text-xs sm:text-sm font-medium'>
            {currentIndex + 1} / {videos.length}
          </span>
        </div>
      </div>

      {/* Indicadores de puntos */}
      <div className='flex justify-center mt-4 sm:mt-6 space-x-2'>
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-gradient-to-r from-yellow-400 to-pink-400 scale-125"
                : "bg-gray-400 hover:bg-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Miniaturas de navegación */}
      <div className='mt-4 sm:mt-6 flex justify-center space-x-2 sm:space-x-4 overflow-x-auto pb-2'>
        {videos.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 rounded-lg border-2 transition-all duration-300 ${
              index === currentIndex
                ? "border-yellow-400 shadow-lg scale-105"
                : "border-gray-600 hover:border-gray-400"
            }`}
          >
            <div
              className={`w-full h-full rounded-md ${
                index === currentIndex
                  ? "bg-gradient-to-r from-yellow-400/20 to-pink-400/20"
                  : "bg-gray-800"
              } flex items-center justify-center`}
            >
              <svg
                className='w-3 h-3 sm:w-4 sm:h-4 text-white'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VideoTestimonialsCarousel;
