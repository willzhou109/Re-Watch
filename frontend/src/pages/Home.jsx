import { useState, useEffect } from "react";
import AnimeCard from "../components/AnimeCard";
import { searchAnime, getPopularAnime } from "../services/api";
import "../css/Home.css";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [animeList, setAnimeList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularAnime = async () => {
      try {
        const popular = await getPopularAnime();                 // Jikan call
        setAnimeList(popular);
      } catch (err) {
        console.error(err);
        setError("Failed to load anime…");
      } finally {
        setLoading(false);
      }
    };

    loadPopularAnime();
  }, []);

  // ─── Handle search form submit ────────────────────────────────────────────────
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim() || loading) return;

    setLoading(true);
    try {
      const results = await searchAnime(searchQuery);            // Jikan call
      setAnimeList(results);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Failed to search anime…");
    } finally {
      setLoading(false);
    }
    setSearchQuery("");
  };

  // ─── Render ───────────────────────────────────────────────────────────────────
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <p className="hero-subtitle">「もう一度見る」</p>
        <h1 className="hero-title">Re:Watch</h1>
        <p className="hero-desc">Dis is a personal project to help myself and you keep track of your favorite anime and manga.</p>
        <button className="get-started-btn">Get Started</button>
      </section>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          placeholder="Search for anime…"
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading">Loading…</div>
      ) : (
        /*<div className="animes-grid">
          {animeList.map((anime) => (
            <AnimeCard anime={anime} key={anime.mal_id} /> 
          ))}
        </div>*/
        <div>
          <div className="section-header">
            <h2>Top Animes</h2>
            <button className="explore-more-btn">Explore more</button>
          </div>
          <div className="anime-slider">
            {animeList.map((anime) => (
              <AnimeCard anime={anime} key={anime.mal_id} /> 
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
