import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ movies, loading }) => {
  if (loading) return <div className="no-results">Loading...</div>;
  if (!movies || movies.length === 0) return <div className="no-results">No movies found</div>;

  return (
    <div className="movie-list">
      {movies.map((m) => (
        <MovieCard key={m.id} movie={m} />
      ))}
    </div>
  );
};

export default MovieList;

