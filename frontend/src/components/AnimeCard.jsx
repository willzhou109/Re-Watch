import "../css/AnimeCard.css"
import { useAnimeContext } from "../contexts/AnimeContext"
import { Link } from "react-router-dom";

function AnimeCard({anime}) {
    const {isFavorite, addToFavorites, removeFromFavorites} = useAnimeContext()
    const favorite = isFavorite(anime.id)

    function onFavoriteClick(e) {
        e.preventDefault();
        e.stopPropogation();
        if (favorite) removeFromFavorites(anime.id)
        else addToFavorites(anime)
    }

    return <div className="anime-card">
        <div className="anime-poster">
            <img src={anime.images.jpg.image_url} alt={anime.title}/>
            <div className="anime-overlay">
                <button className={`favorite-btn ${favorite ? "active" : ""}`} onClick={onFavoriteClick}>
                    ♥
                </button>
            </div>
        </div>
        <div className="anime-info">
            <h3>{anime.title}</h3>
            <p>{anime.season && anime.year ? `${anime.season.charAt(0).toUpperCase() + anime.season.slice(1)} ${anime.year}` : `${anime.aired?.from?.split("T")[0]}`}</p>
        </div>
        <Link to={`/anime/${anime.mal_id}`} className="anime-link">
            <button className="view-details-btn">View Details</button>
        </Link>
    </div>
}

export default AnimeCard