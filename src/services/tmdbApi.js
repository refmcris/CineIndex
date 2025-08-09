import axios from "axios";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;

const tmdbApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

// Functions to get movie data
export const getPopularMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get("/movie/popular", {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return { results: [] };
  }
};

export const getTopRatedMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get("/movie/top_rated", {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    return { results: [] };
  }
};

export const getUpcomingMovies = async (page = 1) => {
  try {
    const response = await tmdbApi.get("/movie/upcoming", {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    return { results: [] };
  }
};

export const searchMovies = async (query, page = 1) => {
  try {
    const response = await tmdbApi.get("/search/movie?include_adult=false", {
      params: { query, page }
    });
    return response.data;
  } catch (error) {
    console.error("Error searching movies:", error);
    return { results: [] };
  }
};

export const getMovieDetails = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return null;
  }
};

// Get movie credits (cast and crew)
export const getMovieCredits = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/credits`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie credits:", error);
    return { cast: [], crew: [] };
  }
};

// Get movie trailers
export const getMovieVideos = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/videos`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie videos:", error);
    return { results: [] };
  }
};

// Get movie reviews
export const getMovieReviews = async (movieId, page = 1) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/reviews`, {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie reviews:", error);
    return { results: [] };
  }
};

// Get movie images
export const getMovieImages = async (movieId) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/images`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movie images:", error);
    return { backdrops: [], posters: [] };
  }
};

// Get movie recommendations
export const getMovieRecommendations = async (movieId, page = 1) => {
  try {
    const response = await tmdbApi.get(`/movie/${movieId}/recommendations`, {
      params: { page }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movie recommendations:", error);
    return { results: [] };
  }
};

// Get movies genre

export const getMovieGenres = async () => {
  try {
    const response = await tmdbApi.get("/genre/movie/list?language=en");
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching movie genres:", error);
    return [];
  }
};

export const getMoviesByGenre = async (genreId, page = 1) => {
  try {
    const response = await tmdbApi.get("/discover/movie", {
      params: { with_genres: genreId, page }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    return { results: [] };
  }
};

// Function to build image URLs
export const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export default tmdbApi;
