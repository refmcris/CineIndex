import React from "react";
import Header from "../Components/Header";
import MovieCard from "../Components/MovieCards";
import GenreTabs from "../Components/GenreTabs";
import SearchBar from "../Components/SearchBar";

// Datos de ejemplo
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
  // ...otros géneros
};

const Home = () => (
  <div className="flex flex-col">
    <Header />

    <main className="px-10 md:px-40 py-5 max-w-7xl mx-auto w-full">
      //Busqueda Principal
      <div className="px-4 py-3">
        <SearchBar placeholder="Search for movies..." />
      </div>
      {/* Películas destacadas */}
      <div className="flex overflow-x-auto hide-scrollbar p-4 gap-4">
        {moviesData.featured.map((movie) => (
          <MovieCard key={movie.id} movie={movie} aspect="aspect-video" />
        ))}
      </div>
      //Secciones por género
      {["action", "comedy", "drama"].map((genre) => (
        <section key={genre} className="mt-8">
          <h2 className="text-white text-xl md:text-2xl font-bold px-4 pb-3">
            Popular {genre.charAt(0).toUpperCase() + genre.slice(1)} Movies
          </h2>
          <GenreTabs active={genre} />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            {moviesData[genre]?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      ))}
    </main>
  </div>
);

export default Home;
