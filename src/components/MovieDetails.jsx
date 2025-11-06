import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { movieDetailsURL } from "../api";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(movieDetailsURL(id));
        setMovie(res.data);
      } catch (err) {
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    // load comments from localStorage
    const key = `movie_comments_${id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setComments(JSON.parse(saved));
      } catch {
        setComments([]);
      }
    }

    fetchDetails();
  }, [id]);

  const addComment = () => {
    const text = commentText.trim();
    if (!text) return;
    const next = [...comments, text];
    setComments(next);
    localStorage.setItem(`movie_comments_${id}`, JSON.stringify(next));
    setCommentText("");
  };

  if (loading) return <div className="no-results">Loading details...</div>;
  if (!movie) return <div className="no-results">Movie not found</div>;

  const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div className="movie-details">
      <Link to="/" className="btn back">← Back</Link>
      <div className="details-grid">
        <img src={poster} alt={movie.title} />
        <div className="details-content">
          <h1>{movie.title}</h1>
          <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
          <p><strong>Release:</strong> {movie.release_date}</p>
          <p><strong>TMDB Rating:</strong> {movie.vote_average}</p>
          <p style={{ marginTop: 12 }}>{movie.overview}</p>

          <div className="comments">
            <h3>Comments</h3>
            {comments.length === 0 ? <div className="no-results">No comments yet.</div> : comments.map((c,i) => (
              <div key={i} className="comment-item">{c}</div>
            ))}

            <div className="comment-box">
              <textarea value={commentText} onChange={(e)=>setCommentText(e.target.value)} placeholder="Write your comment..." />
              <div>
                <button onClick={addComment}>Add</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
