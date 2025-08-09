import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMovieDetails,
  getImageUrl,
  getMovieCredits,
  getMovieVideos,
  getMovieReviews,
  getMovieRecommendations
} from "../services/tmdbApi";
import Header from "../Components/Header";
import MoviesSlider from "../Components/MoviesSlider";
import { FiArrowLeft, FiStar, FiPlay, FiBookmark, FiEye } from "react-icons/fi";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState({ cast: [], crew: [] });
  const [videos, setVideos] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchMovieData = async () => {
      try {
        const [movieData, creditsData, videosData, reviewsData, recommendationsData] = await Promise.all([
          getMovieDetails(id),
          getMovieCredits(id),
          getMovieVideos(id),
          getMovieReviews(id),
          getMovieRecommendations(id)
        ]);

        setMovie(movieData);
        setCredits(creditsData);
        setVideos(videosData.results || []);
        setReviews(reviewsData.results || []);
        setRecommendations(recommendationsData.results || []);
      } catch (err) {
        setError("Could not load movie information.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovieData();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FiStar key={i} className="text-[#ee5c2b] fill-current" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <FiStar key={i} className="text-[#ee5c2b] fill-current opacity-50" />
        );
      } else {
        stars.push(<FiStar key={i} className="text-gray-400" />);
      }
    }
    return stars;
  };

  const getTrailerUrl = () => {
    const trailer = videos.find(video =>
      video.type === "Trailer" &&
      (video.site === "YouTube" || video.site === "Vimeo")
    );
    return trailer;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  // Function to clean review content by removing URLs and marketing phrases
  const cleanReviewContent = (content) => {
    if (!content) return "";

    // Remove URLs from the content
    let cleaned = content.replace(/https?:\/\/[^\s]+/g, '');

    // Remove common marketing phrases that appear in TMDB reviews
    const marketingPhrases = [
      /FULL SPOILER-FREE REVIEW/gi,
      /SPOILER-FREE REVIEW/gi,
      /REVIEW @/gi,
      /@ [^\s]+/gi,
      /Read more at/gi,
      /Visit/gi,
      /Follow/gi,
      /Subscribe/gi,
      /Check out/gi,
      /For more/gi,
      /Full review/gi,
      /Complete review/gi
    ];

    marketingPhrases.forEach(phrase => {
      cleaned = cleaned.replace(phrase, '');
    });

    // Remove extra whitespace and clean up
    cleaned = cleaned.replace(/\s+/g, ' ').trim();

    // If the cleaned content is too short, return a default message
    if (cleaned.length < 20) {
      return "This reviewer didn't provide a detailed comment.";
    }

    return cleaned;
  };

  if (loading) {
    return (
      <div className="bg-[#221511] text-white min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ee5c2b] mx-auto mb-4"></div>
            <p className="text-lg">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#221511] text-white min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={handleGoBack}
              className="bg-[#ee5c2b] hover:bg-[#d14a1f] text-white px-6 py-2 rounded-lg transition"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!movie) {
    return null;
  }

  const trailer = getTrailerUrl();
  const topCast = credits.cast?.slice(0, 5) || [];
  const topCrew = credits.crew?.slice(0, 3) || [];

  // Filter and clean reviews to remove spam and marketing content
  const filteredReviews = reviews
    .filter((review) => {
      const cleanedContent = cleanReviewContent(review.content);
      return cleanedContent.length > 20 &&
        !cleanedContent.includes("This reviewer didn't provide a detailed comment");
    })
    .slice(0, 3);

  return (
    <div className="bg-[#221511] text-white min-h-screen">
      <Header />

      {/* Movie Banner */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${getImageUrl(
              movie.backdrop_path,
              "original"
            )})`,
            backgroundPosition: "center 30%"
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#221511] via-[#221511]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#221511] via-[#221511]/50 to-transparent" />
        </div>

        <div className="relative h-full flex flex-col justify-end pb-8 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
          <button
            onClick={handleGoBack}
            className="absolute top-6 left-6 flex items-center gap-2 text-white hover:text-[#ee5c2b] transition"
          >
            <FiArrowLeft size={20} />
            <span>Back</span>
          </button>

          <div className="max-w-2xl -mt-16">
            <h1 className="text-4xl md:text-6xl font-bold mb-3">
              {movie.title}
            </h1>
            <div className="flex items-center gap-4 text-gray-300 text-sm mb-3">
              <span>{movie.release_date?.split("-")[0]}</span>
              <span>•</span>
              <span>{movie.runtime} min</span>
              <span>•</span>
              <span>{movie.genres?.map((g) => g.name).join(", ")}</span>
            </div>
            {movie.tagline && (
              <p className="text-[#c9a092] text-lg italic mb-4">
                "{movie.tagline}"
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Movie Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Poster and Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <img
                src={getImageUrl(movie.poster_path, "w500")}
                alt={movie.title}
                className="w-full rounded-lg shadow-lg mb-6"
              />

              {/* Rating Section */}
              <div className="bg-[#2a1a15] rounded-lg p-6 mb-6">
                <div className="text-center mb-4">
                  <div className="text-4xl font-bold text-[#ee5c2b] mb-2">
                    {movie.vote_average?.toFixed(1)}
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {renderStars(movie.vote_average / 2)}
                  </div>
                  <p className="text-gray-400 text-sm">Based on {movie.vote_count} votes</p>
                </div>

                {/* Rating Distribution - Calculated based on average rating */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((stars) => {
                    // Generate realistic distribution based on average rating
                    // TMDB doesn't provide actual rating distribution, so we calculate it
                    const avgRating = movie.vote_average / 2; // Convert from 10-star to 5-star scale
                    let percentage;

                    // Calculate percentage for each star rating based on average
                    if (stars === 5) {
                      percentage = Math.max(10, Math.min(60, (avgRating - 3) * 20 + 30));
                    } else if (stars === 4) {
                      percentage = Math.max(15, Math.min(40, (avgRating - 2.5) * 15 + 25));
                    } else if (stars === 3) {
                      percentage = Math.max(10, Math.min(35, (avgRating - 2) * 10 + 20));
                    } else if (stars === 2) {
                      percentage = Math.max(5, Math.min(25, (avgRating - 1.5) * 8 + 15));
                    } else {
                      percentage = Math.max(2, Math.min(20, (avgRating - 1) * 5 + 10));
                    }

                    return (
                      <div key={stars} className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-4">{stars}</span>
                        <div className="flex-1 bg-gray-700 rounded-full h-2">
                          <div
                            className="bg-[#ee5c2b] h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400 w-8">{percentage.toFixed(0)}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>


              {/* Action Buttons */}
              {/* 
              <div className="space-y-3">
                <button className="w-full bg-[#ee5c2b] hover:bg-[#d14a1f] text-white py-3 px-6 rounded-lg transition flex items-center justify-center gap-2">
                  <FiBookmark size={18} />
                  Add to My List
                </button>
                <button className="w-full border border-[#ee5c2b] text-[#ee5c2b] hover:bg-[#ee5c2b] hover:text-white py-3 px-6 rounded-lg transition flex items-center justify-center gap-2">
                  <FiEye size={18} />
                  Mark as Watched
                </button>
              </div>
               */}
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2">
            {/* Synopsis */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-lg leading-relaxed text-gray-300">{movie.overview}</p>
            </div>

            {/* Additional Info - Moved from bottom to after Synopsis */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Additional Info</h2>
              <div className="grid grid-cols-2 gap-6 text-sm">
                <div>
                  <span className="text-gray-400">Status:</span>
                  <p className="text-white">{movie.status}</p>
                </div>
                <div>
                  <span className="text-gray-400">Original Language:</span>
                  <p className="text-white">{movie.original_language?.toUpperCase()}</p>
                </div>
                <div>
                  <span className="text-gray-400">Budget:</span>
                  <p className="text-white">
                    {movie.budget ? `$${(movie.budget / 1000000).toFixed(1)}M` : "Not available"}
                  </p>
                </div>
                <div>
                  <span className="text-gray-400">Revenue:</span>
                  <p className="text-white">
                    {movie.revenue ? `$${(movie.revenue / 1000000).toFixed(1)}M` : "Not available"}
                  </p>
                </div>
              </div>
            </div>

            {/* Cast & Crew - Real data from TMDB API */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Cast & Crew</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {[...topCast, ...topCrew].slice(0, 6).map((person, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gray-700 rounded-full mx-auto mb-2 flex items-center justify-center overflow-hidden">
                      {person.profile_path ? (
                        <img
                          src={getImageUrl(person.profile_path, "w185")}
                          alt={person.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-xs">{person.name.charAt(0)}</span>
                      )}
                    </div>
                    <p className="text-sm font-medium truncate">{person.name}</p>
                    <p className="text-xs text-gray-400 truncate">{person.character || person.job}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Trailer - Real YouTube embed from TMDB API */}
            {trailer && (
              <div className="mb-8">
                <h2 className="text-2xl font-bold mb-4">Trailer</h2>
                <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video">
                  <iframe
                    src={`https://www.youtube.com/embed/${trailer.key}`}
                    title={trailer.name}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            )}

                         {/* Reviews - Cleaned and filtered from TMDB API */}
             <div className="mb-8">
               <h2 className="text-2xl font-bold mb-4">Reviews</h2>
               {filteredReviews.length > 0 ? (
                 <div className="space-y-4">
                   {filteredReviews.map((review) => (
                     <div key={review.id} className="bg-[#2a1a15] rounded-lg p-4">
                       <div className="flex items-center justify-between mb-2">
                         <div>
                           <p className="font-medium">{review.author}</p>
                           <p className="text-sm text-gray-400">
                             {formatDate(review.created_at)}
                           </p>
                         </div>
                         <div className="flex gap-1">
                           {renderStars(review.author_details.rating / 2)}
                         </div>
                       </div>
                       <p className="text-gray-300 line-clamp-3">{cleanReviewContent(review.content)}</p>
                     </div>
                   ))}
                 </div>
               ) : (
                 <p className="text-gray-400">No reviews available for this movie.</p>
               )}
             </div>


           </div>
         </div>
       </div>

               {/* Recommended Movies Section */}
        {recommendations.length > 0 && (
          <div className="max-w-6xl mx-auto px-4 md:px-10 lg:px-20 py-8">
            <MoviesSlider 
              movies={recommendations.slice(0, 10)} 
              title="You might also like" 
            />
          </div>
        )}
     </div>
   );
 };

export default MovieDetails;
