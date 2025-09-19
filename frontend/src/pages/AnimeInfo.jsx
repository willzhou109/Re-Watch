import { useParams } from 'react-router-dom';
import { useState, useEffect } from "react";
import { getAnimeById } from "../services/api";
import "../css/AnimeInfo.css";

function AnimeInfo() {
    const { id } = useParams();
    const [anime, setAnime] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAnime() {
            try {
                const data = await getAnimeById(id);
                setAnime(data);
            } catch (err) {
                setError("Failed to load anime details.");
            } finally {
                setLoading(false);
            }
        }
        fetchAnime();
    }, [id]);
    if (loading) return <div>Loading…</div>;
    if (error) return <div>{error}</div>;
    if (!anime) return null;
    return (
        <div className="anime-info">
            <h1>{anime.title}</h1>
            <div className="anime-details">
                <img src={anime.images.jpg.image_url} alt={anime.title} />
                <div className="details">
                    <p><strong>Synopsis:</strong> {anime.synopsis}</p>
                    <p><strong>Episodes:</strong> {anime.episodes}</p>
                    <p><strong>Status:</strong> {anime.status}</p>
                    <p><strong>Score:</strong> {anime.score}</p>
                    <p><strong>Aired:</strong> {anime.aired?.from ? anime.aired.from.split("T")[0] : "Unknown"}</p>
                </div>
            </div>
        </div>
    );
}

export default AnimeInfo;