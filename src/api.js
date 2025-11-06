// src/api.js

// 🔑 TMDB API base setup
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const BASE = "https://api.themoviedb.org/3";

// 🎬 Popular movies
export const popularURL = (page = 1) =>
  `${BASE}/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`;

// 🔍 Search movies
export const searchURL = (query, page = 1) =>
  `${BASE}/search/movie?api_key=${API_KEY}&language=en-US&query=${encodeURIComponent(
    query
  )}&page=${page}`;

// 📄 Movie details
export const movieDetailsURL = (id) =>
  `${BASE}/movie/${id}?api_key=${API_KEY}&language=en-US`;
