import React from "react";

const MovieCard = ({ movie, aspect = "aspect-[1/2]" }) => (
  <div className="group cursor-pointer">
    <div
      className={`${aspect} w-full bg-cover bg-center rounded-xl mb-2 transition-all group-hover:opacity-90`}
      style={{ backgroundImage: `url(${movie.image})` }}
    />
    <h3 className="text-white font-medium truncate">{movie.title}</h3>
    <p className="text-[#c9a092] text-sm truncate">{movie.desc}</p>
  </div>
);

export default MovieCard;
