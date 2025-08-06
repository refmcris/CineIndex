import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function FeaturedMovieSlider({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentMovie = movies[currentIndex];

  const nextMovie = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevMovie = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextMovie, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  if (!movies || movies.length === 0) return null;
  return (
    <div className="relative h-[28rem] w-full overflow-hidden rounded-lg mt-4 cursor-pointer">
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-500"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
          opacity: 0.8
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#221511] via-[#221511]/50 to-transparent" />
      </div>

      <div className="relative z-10 h-full flex flex-col justify-end p-8">
        <h2 className="text-white text-3xl md:text-4xl font-bold mb-2">
          {currentMovie.title}
        </h2>
        <p className="text-[#c9a092] text-sm md:text-base mb-4">
          {currentMovie.overview.length > 200
            ? `${currentMovie.overview.substring(0, 200)}...`
            : currentMovie.overview}
        </p>
      </div>
      <button
        onClick={prevMovie}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#482c23]/80 rounded-full text-white hover:bg-[#ee5c2b] transition"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={nextMovie}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-[#482c23]/80 rounded-full text-white hover:bg-[#ee5c2b] transition"
      >
        <FiChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {movies.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? "bg-[#ee5c2b] w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
