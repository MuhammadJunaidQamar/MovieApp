import MovieCard from "../components/MovieCard";
import { useState, useEffect } from "react";
import { searchMovies, getMovies } from "../services/api";
import '../css/Home.css';
function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadMovies = async () => {
            try {
                const Movies = await getMovies();
                setMovies(Movies);
            }
            catch (err) {
                setError("Failed to Load movies...");
                console.log(err);
            }
            finally {
                setLoading(false);
            }
        }
        loadMovies();
    }, [])
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        if (loading) return;
        setLoading(true);
        try {
            const searchResult = await searchMovies(searchQuery);
            setMovies(searchResult);
            setError(null);
        } catch (err) {
            setError("Failed to fetch movies...");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className="home">
            <form onSubmit={handleSearch} className="search-form">
                <input type="text" placeholder="Search for movies..." className="search-input" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                <button type="submit" className="search-button">Search</button>
            </form>
            {error && <div className="error-message">{error}</div>}
            {loading ? <div className="loading">Loading...</div>
                :
                <div className="movies-grid">
                    {
                        movies.map((movie) => (
                            // movie.title.toLowerCase().startsWith(searchQuery) &&
                            <MovieCard movie={movie} key={movie.id} />))
                    }
                </div>
            }
        </div>
    );
}
export default Home