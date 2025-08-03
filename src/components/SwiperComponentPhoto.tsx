import React, { useState, useEffect, useRef } from "react";

interface Props {
  images: string[];
}

export default function ImageTestimonialsCarousel({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className='relative w-full max-w-4xl mx-auto px-2 sm:px-4'>
      {/* Contenedor principal de la imagen */}
      <div className='relative overflow-hidden rounded-xl md:rounded-2xl shadow-2xl bg-gradient-to-br from-gray-900 via-black to-gray-900'>
        <div
          className='flex transition-transform duration-700 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={index} className='w-full flex-shrink-0 relative'>
              {/* Loading placeholder */}
              {isLoading && index === currentIndex && (
                <div className='absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center'>
                  <div className='w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin'></div>
                </div>
              )}

              <img
                src={image}
                alt={`Testimonio ${index + 1}`}
                className='w-full h-auto max-h-[600px] object-contain transition-opacity duration-300'
                onLoad={handleImageLoad}
                style={{ minHeight: "300px" }}
              />

              {/* Overlay gradient sutil */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none'></div>
            </div>
          ))}
        </div>

        {/* Botones de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className='absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10 group'
            >
              <svg
                className='w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform'
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
              className='absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 sm:p-3 rounded-full backdrop-blur-sm transition-all duration-300 z-10 group'
            >
              <svg
                className='w-4 h-4 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform'
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
          </>
        )}

        {/* Indicador de progreso */}
        {images.length > 1 && (
          <div className='absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 sm:px-4 sm:py-2'>
            <span className='text-white text-xs sm:text-sm font-medium'>
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Barra de progreso estática */}
        {images.length > 1 && (
          <div className='absolute top-0 left-0 w-full h-1 bg-black/30'>
            <div
              className='h-full bg-gradient-to-r from-yellow-400 to-pink-400'
              style={{
                width: `${((currentIndex + 1) / images.length) * 100}%`,
              }}
            ></div>
          </div>
        )}
      </div>

      {/* Indicadores de puntos premium */}
      {images.length > 1 && (
        <div className='flex justify-center mt-4 sm:mt-6 space-x-2 sm:space-x-3'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-yellow-400 to-pink-400 scale-125 shadow-lg"
                  : "bg-gray-400 hover:bg-gray-300 hover:scale-110"
              }`}
            />
          ))}
        </div>
      )}

      {/* Miniaturas de navegación */}
      {images.length > 1 && (
        <div className='mt-4 sm:mt-6 flex justify-center space-x-2 sm:space-x-3 overflow-x-auto pb-2'>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`flex-shrink-0 w-20 h-12 sm:w-24 sm:h-16 rounded-lg sm:rounded-xl border-2 transition-all duration-300 overflow-hidden ${
                index === currentIndex
                  ? "border-yellow-400 shadow-xl scale-105"
                  : "border-gray-600 hover:border-gray-400 hover:scale-102"
              }`}
            >
              <img
                src={image}
                alt={`Miniatura ${index + 1}`}
                className='w-full h-full object-cover'
              />
              {index === currentIndex && (
                <div className='absolute inset-0 bg-gradient-to-r from-yellow-400/20 to-pink-400/20'></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
