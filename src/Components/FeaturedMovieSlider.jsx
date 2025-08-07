import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function FeaturedMovieSlider({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const navigate = useNavigate();

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === movies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? movies.length - 1 : prevIndex - 1
    );
  };

  const handleMovieClick = () => {
    const currentMovie = movies[currentIndex];
    navigate(`/movie/${currentMovie.id}`);
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying && movies.length > 1) {
      interval = setInterval(nextSlide, 8000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, movies.length]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div
      className="relative w-full h-[70vh] min-h-[500px] mb-8 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
          backgroundPosition: "center 30%"
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#221511] via-[#221511]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#221511] via-[#221511]/50 to-transparent" />
      </div>

      <div 
        className="relative h-full flex flex-col justify-end pb-12 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto cursor-pointer"
        onClick={handleMovieClick}
      >
        <div className="max-w-2xl p-6 rounded-lg hover:bg-black/20 transition-colors duration-300">
          <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4">
            {currentMovie.title}
          </h1>
          <p className="text-[#c9a092] text-base md:text-lg mb-6 line-clamp-4">
            {currentMovie.overview}
          </p>
        </div>
      </div>

      {movies.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#482c23]/80 rounded-full text-white hover:bg-[#ee5c2b] transition"
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#482c23]/80 rounded-full text-white hover:bg-[#ee5c2b] transition"
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {movies.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition ${
                index === currentIndex ? "bg-[#ee5c2b] w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
