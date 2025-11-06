import React, { useEffect, useState } from "react";
import axios from "axios";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";
import { popularURL, searchURL } from "./api";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // fetch popular movies on load
  useEffect(() => {
    fetchPopular();
  }, []);

  const fetchPopular = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(popularURL());
      setMovies(res.data.results || []);
    } catch (err) {
      setError("Failed to fetch popular movies.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (q) => {
    if (!q || !q.trim()) {
      // empty: go back to popular
      fetchPopular();
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(searchURL(q));
      setMovies(res.data.results || []);
      // navigate home to show results list in case user is on details route
      navigate("/");
    } catch (err) {
      setError("Search failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      {error && <div style={{ color: "#ff7b7b", textAlign: "center", marginTop: 8 }}>{error}</div>}
      <Routes>
        <Route path="/" element={<MovieList movies={movies} loading={loading} />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
};

export default App;
