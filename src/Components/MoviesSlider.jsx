import React, { useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import MovieCard from "./MovieCards";

const MovieSlider = ({ movies, title }) => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth"
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth"
      });
    }
  };

  if (!movies || movies.length === 0) return null;

  return (
    <section className="mt-8 relative">
      <h2 className="text-white text-xl md:text-2xl font-bold px-4 pb-3">
        {title}
      </h2>

      <button
        onClick={scrollLeft}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#482c23] rounded-full text-white hover:bg-[#ee5c2b] transition"
      >
        <FiChevronLeft className="text-xl" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide px-4 py-2"
      >
        {movies.map((movie) => (
          <div key={movie.id} className="flex-shrink-0 w-40 sm:w-48 md:w-56">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center bg-[#482c23] rounded-full text-white hover:bg-[#ee5c2b] transition"
      >
        <FiChevronRight className="text-xl" />
      </button>
    </section>
  );
};

export default MovieSlider;
