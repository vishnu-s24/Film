import React, { useState } from "react";

const Navbar = ({ onSearch }) => {
  const [q, setQ] = useState("");

  const submit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(q);
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">🎬 FilmFusion</div>
      </div>
      <div className="search-container">
        <form onSubmit={submit}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search any movie (Hollywood, Bollywood, Kollywood, Mollywood)..."
            aria-label="Search movies"
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </>
  );
};

export default Navbar;
