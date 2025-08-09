import React, { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function FeaturedMovieSlider({ movies }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === movies.length - 1 ? 0 : prevIndex + 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? movies.length - 1 : prevIndex - 1
      );
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleMovieClick = () => {
    const currentMovie = movies[currentIndex];
    navigate(`/movie/${currentMovie.id}`);
  };

  const goToSlide = (index) => {
    if (!isTransitioning && index !== currentIndex) {
      setIsTransitioning(true);
      setCurrentIndex(index);
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  useEffect(() => {
    let interval;
    if (isAutoPlaying && movies.length > 1 && !isTransitioning) {
      interval = setInterval(nextSlide, 8000);
    }
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying, movies.length, isTransitioning]);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[currentIndex];

  return (
    <div
      className="relative w-full h-[70vh] min-h-[500px] mb-8 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Background Image with Smooth Transition */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
          backgroundPosition: "center 30%",
          transform: isTransitioning ? "scale(1.05)" : "scale(1)",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#221511] via-[#221511]/50 to-transparent transition-opacity duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#221511] via-[#221511]/50 to-transparent transition-opacity duration-1000" />
      </div>

      {/* Content with Fade Animation */}
      <div 
        className="relative h-full flex flex-col justify-end pb-12 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto cursor-pointer"
        onClick={handleMovieClick}
      >
        <div 
          className={`max-w-2xl p-6 rounded-lg hover:bg-black/20 transition-all duration-700 ease-out ${
            isTransitioning ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
          }`}
        >
          <h1 
            className={`text-white text-3xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-700 ease-out ${
              isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
            }`}
          >
            {currentMovie.title}
          </h1>
          <p 
            className={`text-[#c9a092] text-base md:text-lg mb-6 line-clamp-4 transition-all duration-700 ease-out delay-200 ${
              isTransitioning ? "opacity-0 transform translate-x-4" : "opacity-100 transform translate-x-0"
            }`}
          >
            {currentMovie.overview}
          </p>
        </div>
      </div>

      {/* Navigation Buttons with Enhanced Animations */}
      {movies.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            disabled={isTransitioning}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#482c23]/80 backdrop-blur-sm rounded-full text-white hover:bg-[#ee5c2b] hover:scale-110 transition-all duration-300 ease-out ${
              isTransitioning ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <FiChevronLeft size={24} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            disabled={isTransitioning}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-[#482c23]/80 backdrop-blur-sm rounded-full text-white hover:bg-[#ee5c2b] hover:scale-110 transition-all duration-300 ease-out ${
              isTransitioning ? "opacity-50 cursor-not-allowed" : "opacity-100"
            }`}
          >
            <FiChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator with Smooth Transitions */}
      {movies.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {movies.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              disabled={isTransitioning}
              className={`w-3 h-3 rounded-full transition-all duration-300 ease-out hover:scale-125 ${
                index === currentIndex 
                  ? "bg-[#ee5c2b] w-6 shadow-lg" 
                  : "bg-white/50 hover:bg-white/70"
              } ${isTransitioning ? "cursor-not-allowed" : "cursor-pointer"}`}
            />
          ))}
        </div>
      )}

      {/* Loading Indicator */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center z-20">
          <div className="w-8 h-8 border-2 border-[#ee5c2b] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
