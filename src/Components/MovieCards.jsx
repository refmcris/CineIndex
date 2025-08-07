import { useNavigate } from "react-router-dom";

const BASE_IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const imageUrl = movie?.poster_path
    ? BASE_IMAGE_URL + movie.poster_path
    : null;

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div 
      className="group cursor-pointer w-full max-w-[200px] min-w-[150px] flex flex-col"
      onClick={handleClick}
    >
      <div className="relative pt-[150%] overflow-hidden rounded-xl mb-3">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>

      <div className="h-[60px] flex flex-col justify-center">
        <h3 className="text-white font-medium text-sm md:text-base truncate">
          {movie.title || movie.name}
        </h3>
        <p className="text-[#c9a092] text-xs truncate">
          {movie.release_date?.split("-")[0] ||
            movie.first_air_date?.split("-")[0]}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
