import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import MovieCard from "../Components/MovieCards";
import GenreTabs from "../Components/GenreTabs";
import SearchBar from "../Components/SearchBar";
import {
  getMovieGenres,
  getMoviesByGenre,
  getPopularMovies,
  searchMovies
} from "../services/tmdbApi";
import FeaturedMovieSlider from "../Components/FeaturedMovieSlider";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenre] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [genreMovies, setGenreMovies] = useState([]);

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

  const handleGenreChange = async (genreId) => {
    setSelectedGenre(genreId);
    try {
      const response = await getMoviesByGenre(genreId);
      setGenreMovies(response.results);
    } catch (error) {
      console.error("Error fetching genre movies:", error);
      setGenreMovies([]);
    }
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
      <main className="w-full">
        <div className="absolute top-24 left-0 right-0 z-20 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
          <SearchBar
            placeholder="Search for movies..."
            onSearch={handleSearch}
            onClear={handleClear}
            debounceDelay={500}
          />
        </div>

        {!isSearching && movies?.length > 0 && (
          <FeaturedMovieSlider movies={movies.slice(0, 5)} />
        )}

        <div className="mt-8 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
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
              <section className="mt-8">
                <h2 className="text-white text-xl md:text-2xl font-bold px-4 pb-3">
                  Popular Movies
                </h2>
                <GenreTabs
                  active={selectedGenre}
                  onGenreChange={handleGenreChange}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
                  {genreMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
