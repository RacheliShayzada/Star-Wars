import React, { useState } from 'react';
import { useUserPreferencesStore } from '../../services/favoritesStore.ts';
import { Movie } from '../../services/types.ts';
import './MovieCard.css';

interface MovieCardProps {
    movie: Movie;
    isFavorite: boolean;
    openPopup: (movie: Movie) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, isFavorite, openPopup }) => {
    const { addFavoriteMovie, removeFavoriteMovie } = useUserPreferencesStore();
    const [favorite, setFavorite] = useState(isFavorite);

    const toggleFavorite = () => {
        if (favorite) {
            removeFavoriteMovie(movie.title);
        } else {
            addFavoriteMovie(movie.title);
        }
        setFavorite(!favorite);
    };

    return (
        <div className="movie-card">
            <h2>{movie.title}</h2>
            <p><strong>Release Date:</strong> {movie.release_date}</p>
            <p><strong>Director:</strong> {movie.director}</p>
            <p><strong>Producer:</strong> {movie.producer}</p>
            <div className="container-buttons">
                <button className="favorite-button" onClick={toggleFavorite}>
                    {favorite ? '💛' : '🤍'}
                </button>
                <button className="readMore" onClick={() => openPopup(movie)}>
                    Read More
                </button>
            </div>
        </div>
    );
};

export default MovieCard;
