import "../css/Favorites.css";
import { useAnimeContext } from "../contexts/AnimeContext";
import AnimeCard from "../components/AnimeCard";

function Favorites() {
  const { favorites } = useAnimeContext();

  if (favorites) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="animes-grid">
          {favorites.map((anime) => (
            <AnimeCard anime={anime} key={anime.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Animes Yet</h2>
      <p>Start adding Animes to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;