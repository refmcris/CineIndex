import React, { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { getMovieGenres } from "../services/tmdbApi";

const GenreTabs = ({ active, onGenreChange }) => {
  const [genres, setGenres] = useState([]);
  const scrollContainerRef = useRef(null);

  const handleGetGenres = async () => {
    try {
      const response = await getMovieGenres();
      setGenres(response.genres || response);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth"
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    handleGetGenres();
  }, []);

  return (
    <div className="relative border-b border-[#673f32] px-4">
      <button
        onClick={scrollLeft}
        className="absolute left-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-gradient-to-r from-[#221511] to-transparent"
      >
        <FiChevronLeft className="text-white text-xl" />
      </button>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide whitespace-nowrap py-2"
      >
        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onGenreChange(genre.id)}
            className={`inline-flex pb-3 pt-4 border-b-2 px-2 ${
              genre.id === active
                ? "border-[#ee5c2b] text-white"
                : "border-transparent text-[#c9a092] hover:text-white"
            } transition-colors`}
          >
            <span className="text-sm font-bold capitalize">{genre.name}</span>
          </button>
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="absolute right-0 top-0 bottom-0 z-10 w-10 flex items-center justify-center bg-gradient-to-l from-[#221511] to-transparent"
      >
        <FiChevronRight className="text-white text-xl" />
      </button>
    </div>
  );
};

export default GenreTabs;
