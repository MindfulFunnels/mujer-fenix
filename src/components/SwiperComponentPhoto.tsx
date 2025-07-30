import React, { useState } from "react";

interface Props {
  images: string[];
}

export default function ImageSlider({ images }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className='relative w-full max-w-md mx-auto overflow-hidden rounded-lg shadow-lg'>
      {/* Imagen actual */}
      <img
        src={images[currentIndex]}
        alt={`Testimonio ${currentIndex}`}
        className='object-contain w-full h-auto transition-transform duration-500 rounded-lg'
      />

      {/* Botones */}
      <button
        onClick={prev}
        className='absolute left-0 p-2 px-3 text-white -translate-y-1/2 top-1/2 bg-black/40 rounded-r-md hover:bg-black/70'
      >
        ‹
      </button>
      <button
        onClick={next}
        className='absolute right-0 p-2 px-3 text-white -translate-y-1/2 top-1/2 bg-black/40 rounded-l-md hover:bg-black/70'
      >
        ›
      </button>

      {/* Indicadores */}
      <div className='flex justify-center gap-2 mt-4'>
        {images.map((_, i) => (
          <div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
