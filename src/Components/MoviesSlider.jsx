import React, { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MovieCard from "./MovieCards";

const MovieSlider = ({ movies, title }) => {
  const scrollContainerRef = useRef(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const scrollLeft = () => {
    if (scrollContainerRef.current && !isScrolling) {
      setIsScrolling(true);
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth"
      });
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current && !isScrolling) {
      setIsScrolling(true);
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth"
      });
      setTimeout(() => setIsScrolling(false), 500);
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="mt-8 relative group">
      <h2 className="text-white text-xl md:text-2xl font-bold px-4 pb-3">
        {title}
      </h2>

      <button
        onClick={scrollLeft}
        disabled={isScrolling}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#482c23]/80 backdrop-blur-sm rounded-full text-white hover:bg-[#ee5c2b] hover:scale-110 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        <FiChevronLeft className="text-xl transition-transform duration-200 group-hover:scale-110" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 py-2 transition-all duration-300 ease-out"
        style={{
          scrollBehavior: 'smooth',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {movies.map((movie, index) => (
          <div 
            key={movie.id} 
            className="flex-shrink-0 w-40 sm:w-48 md:w-56 transform transition-all duration-300 ease-out hover:scale-105"
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'fadeInUp 0.6s ease-out forwards'
            }}
          >
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        disabled={isScrolling}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#482c23]/80 backdrop-blur-sm rounded-full text-white hover:bg-[#ee5c2b] hover:scale-110 transition-all duration-300 ease-out opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        <FiChevronRight className="text-xl transition-transform duration-200 group-hover:scale-110" />
      </button>

      {/* Gradient overlays for smooth fade effect */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#221511] to-transparent pointer-events-none z-5"></div>
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#221511] to-transparent pointer-events-none z-5"></div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default MovieSlider;
