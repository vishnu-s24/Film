import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const imageUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : movie.poster || "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie-card">
      <img src={imageUrl} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.release_date ? movie.release_date.split("-")[0] : movie.year || ""} • {movie.vote_average ? `⭐ ${movie.vote_average}` : ""}</p>
      <Link className="btn" to={`/movie/${movie.id}`}>View Details</Link>
    </div>
  );
};

export default MovieCard;
