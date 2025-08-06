import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import MovieCard from "../Components/MovieCards";
import GenreTabs from "../Components/GenreTabs";
import SearchBar from "../Components/SearchBar";
import {
  getMovieGenres,
  getPopularMovies,
  searchMovies
} from "../services/tmdbApi";
import FeaturedMovieSlider from "../Components/FeaturedMovieSlider";

const moviesData = {
  featured: [
    {
      id: 1,
      title: "The Crimson Horizon",
      desc: "A thrilling action-packed adventure",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBQpniXvW_hcEY4b3EBAJeK8SiqTkA5cvWMvPzDdBeUHdKK3yh-CzHUWh64EOaszDRgUfn20dnWSld6uC5YI-yyU2-l2oOH-RhCsQg_2DnoC43V9Gdwo_3UQjpGMn_9dwqRm41gh9iKzkWMY8ymmUQaugpQ-X6CwZBzuQhcOTHZe7xaFc5OZN5TgTyINweO2LYuu6YJzW3PJN82VOO-JsUYmoujQ0yuP6pN6P3OxShUsnSthR719Fv-ueFEQ9dFTkKL8jvxRfUhfBw"
    },
    {
      id: 2,
      title: "Laugh Out Loud",
      desc: "Hilarious comedy",
      image: "url_imagen_2"
    }
  ],
  action: [
    {
      id: 3,
      title: "Steel Resolve",
      desc: "Courage and determination",
      image: "url_imagen_3"
    }
  ]
};

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenre] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  //handlers
  const handleGetMovies = async () => {
    try {
      const [moviesResponse, genreResponse] = await Promise.all([
        getPopularMovies(),
        getMovieGenres()
      ]);

      setMovies(moviesResponse?.results);
      setGenre(genreResponse);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getMoviesByGenreName = (genreName) => {
    const genreObject = genres.find(
      (g) => g.name.toLowerCase() === genreName.toLowerCase()
    );
    if (!genreObject) return [];

    const genreId = genreObject.id;

    return movies.filter((movie) => movie.genre_ids.includes(genreId));
  };

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setIsSearching(false);
      setSearchResults(null);
      return;
    }
    setIsSearching(true);
    try {
      const response = await searchMovies(query);
      setSearchResults(response?.results);
      console.log("Search results:", response);
    } catch (error) {
      console.error("Error searching movies:", error);
      setSearchResults([]);
    }
  };

  const handleClear = () => {
    setIsSearching(false);
    setSearchResults(null);
  };

  useEffect(() => {
    handleGetMovies();
  }, []);

  return (
    <div className="flex flex-col">
      <Header />
      <main className="px-10 md:px-40 py-5 max-w-7xl mx-auto w-full">
        <div className="px-4 py-3">
          <SearchBar
            placeholder="Search for movies..."
            onSearch={handleSearch}
            onClear={handleClear}
            debounceDelay={500}
          />
          {!isSearching && movies?.length > 0 && (
            <FeaturedMovieSlider movies={movies.slice(0, 5)} />
          )}
        </div>

        {isSearching ? (
          <div className="p-4">
            <h2 className="text-white text-xl md:text-2xl font-bold px-4 pb-3">
              Search Results
            </h2>
            {searchResults && searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                {searchResults.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <p className="text-[#c9a092] px-4">No results found.</p>
            )}
          </div>
        ) : (
          <>
            {["Action", "Comedy", "Drama"].map((genreName) => (
              <section key={genreName} className="mt-8">
                <h2 className="text-white text-xl md:text-2xl font-bold px-4 pb-3">
                  Popular {genreName} Movies
                </h2>
                <GenreTabs active={genreName.toLowerCase()} />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                  {getMoviesByGenreName(genreName)?.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </section>
            ))}
          </>
        )}
      </main>
    </div>
  );
}
