import React, { useState, useEffect } from "react";

interface Props {
  images: string[];
}

export default function ImageTestimonialsCarousel({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  useEffect(() => {
    // Precargar todas las imágenes
    images.forEach((src, index) => {
      const img = new Image();
      img.onload = () => {
        setLoadedImages((prev) => new Set([...prev, index]));
      };
      img.onerror = () => {
        setImageErrors((prev) => new Set([...prev, index]));
        console.error(`Error loading image: ${src}`);
      };
      img.src = src;
    });
  }, [images]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) return null;

  return (
    <div className='relative w-full mx-auto'>
      {/* Contenedor principal de la imagen */}
      <div className='relative overflow-hidden rounded-lg md:rounded-xl shadow-xl bg-gradient-to-br from-gray-900 via-black to-gray-900'>
        <div
          className='flex transition-transform duration-500 ease-in-out'
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className='w-full flex-shrink-0 relative flex items-center justify-center min-h-[200px]'
            >
              {/* Loading placeholder */}
              {!loadedImages.has(index) && !imageErrors.has(index) && (
                <div className='absolute inset-0 bg-gray-800 animate-pulse flex items-center justify-center z-10'>
                  <div className='w-8 h-8 sm:w-12 sm:h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin'></div>
                </div>
              )}

              {/* Error placeholder */}
              {imageErrors.has(index) && (
                <div className='absolute inset-0 bg-gray-800 flex items-center justify-center z-10'>
                  <div className='text-center text-gray-400'>
                    <svg
                      className='w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-2'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                    >
                      <path
                        fillRule='evenodd'
                        d='M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z'
                        clipRule='evenodd'
                      />
                    </svg>
                    <p className='text-xs sm:text-sm'>Error al cargar imagen</p>
                  </div>
                </div>
              )}

              <img
                src={image}
                alt={`Testimonio ${index + 1}`}
                className={`w-full h-auto max-h-[400px] sm:max-h-[500px] md:max-h-[600px] object-contain transition-opacity duration-300 mx-auto ${
                  loadedImages.has(index) ? "opacity-100" : "opacity-0"
                }`}
                style={{
                  minHeight: "200px",
                  display: "block",
                  margin: "auto",
                }}
              />
            </div>
          ))}
        </div>

        {/* Indicador de progreso simple */}
        {images.length > 1 && (
          <div className='absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1'>
            <span className='text-white text-xs font-medium'>
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}
      </div>

      {/* Botones de navegación fuera de la imagen */}
      {images.length > 1 && (
        <div className='flex justify-between items-center mt-4 px-4'>
          <button
            onClick={goToPrevious}
            className='bg-black/60 hover:bg-black/80 text-white p-3 sm:p-4 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg flex items-center justify-center'
          >
            <svg
              className='w-5 h-5 sm:w-6 sm:h-6'
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
            className='bg-black/60 hover:bg-black/80 text-white p-3 sm:p-4 rounded-full backdrop-blur-sm transition-all duration-300 shadow-lg flex items-center justify-center'
          >
            <svg
              className='w-5 h-5 sm:w-6 sm:h-6'
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
        </div>
      )}

      {/* Indicadores de puntos */}
      {images.length > 1 && (
        <div className='flex justify-center mt-4 space-x-2'>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-gradient-to-r from-yellow-400 to-pink-400 scale-125"
                  : "bg-gray-400 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
