import axios from "axios";

// Configuración de la API de TMDB
const API_BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "YOUR_TMDB_API_KEY"; // Necesitarás obtener tu propia API key

const tmdbApi = axios.create({
  baseURL: API_BASE_URL,
  params: {
    api_key: API_KEY,
    language: "es-ES"
  }
});

// Funciones para obtener datos de películas
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
    const response = await tmdbApi.get("/search/movie", {
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

// Función para construir URLs de imágenes
export const getImageUrl = (path, size = "w500") => {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

export default tmdbApi;
