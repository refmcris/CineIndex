import React, { useEffect, useState } from "react";
import { getMovieGenres } from "../services/tmdbApi";

const GenreTabs = ({ active }) => {
  // const [genres, setGenres] = useState([]);
  const genres = ["Action", "Comedy", "Drama"];

  // const handleGetGenres = async () => {
  //   try {
  //     const response = await getMovieGenres();

  //     setGenres(response);
  //   } catch (error) {
  //     console.error("Error fetching genres:", error);
  //   }
  // };

  // useEffect(() => {
  //   handleGetGenres();
  // }, []);

  return (
    <div className="border-b border-[#673f32] px-4">
      <div className="flex gap-6 md:gap-8">
        {genres.map((genre) => (
          <button
            key={genre}
            className={`pb-3 pt-4 border-b-2 ${
              genre.id === active
                ? "border-[#ee5c2b] text-white"
                : "border-transparent text-[#c9a092] hover:text-white"
            } transition-colors`}
          >
            <span className="text-sm font-bold capitalize">{genre}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreTabs;
