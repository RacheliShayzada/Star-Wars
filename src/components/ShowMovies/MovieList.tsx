import React, { useEffect, useState } from 'react';
import { fetchAll } from '../../services/moviesService.ts';
import { useUserPreferencesStore } from '../../services/favoritesStore.ts';
import MovieCard from '../MovieCard/MovieCard.tsx';
import { Movie } from '../../services/types.ts';
import './MovieList.css';

const MovieList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { favoriteMovies } = useUserPreferencesStore();
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

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

    const filteredMovies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openPopup = (movie: Movie) => {
        setSelectedMovie(movie);
    };

    const closePopup = () => {
        setSelectedMovie(null);
    };

    if (loading) return <p>Loading...</p>;

    console.log(selectedMovie)

    return (
        <>
            <h1 className="title">Movies</h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="movie-list">
                {filteredMovies.length > 0 ? (
                    filteredMovies.map((movie) => (
                        <MovieCard
                            key={movie.title}
                            movie={movie}
                            isFavorite={isFavorite(movie.title)}
                            openPopup={openPopup}
                        />
                    ))
                ) : (
                    <p>No movies available.</p>
                )}
            </div>

            {selectedMovie && (
                <div className={`popup ${selectedMovie ? 'open' : ''}`}>
                    <div className="popup-content">
                        <h2>{selectedMovie.title}</h2>
                        <p>{selectedMovie.opening_crawl}</p>
                        <button className="close-popup" onClick={closePopup}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieList;
