import React, { useEffect, useState } from 'react';
import { fetchAll } from '../../services/moviesService.ts';
import { useUserPreferencesStore } from '../../services/favoritesStore.ts';
import MovieCard from '../MovieCard/MovieCard.tsx';
import { Movie } from '../../services/types.ts';
import './MovieList.css';

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const { favoriteMovies } = useUserPreferencesStore();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const data = await fetchAll<{ results: Movie[] }>('films');
                setMovies(data.results);
            } catch (error) {
                console.error('Failed to fetch movies', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    const isFavorite = (movieTitle: string) => {
        return favoriteMovies.includes(movieTitle);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <>
            <h1 className="title">Movies</h1>
            <div className="movie-list">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <MovieCard
                            key={movie.title}
                            movie={movie}
                            isFavorite={isFavorite(movie.title)}
                        />
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>
        </>
    );
};

export default MovieList;
