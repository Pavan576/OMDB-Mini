import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import MovieGrid from '../components/MovieGrid';
import { searchMovies } from '../api/omdb';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const fetchInitialMovies = async () => {
      try {
        setLoading(true);
        const response = await searchMovies('avengers');
        if (response.Response === 'True') {
          setMovies(response.Search);
        }
      } catch (err) {
        setError('Failed to fetch movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchInitialMovies();
  }, []);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      return;
    }

    // Prevent multiple simultaneous searches
    if (isSearching) {
      return;
    }

    setSearchQuery(query);
    setLoading(true);
    setError(null);
    setIsSearching(true);

    try {
      const response = await searchMovies(query);
      if (response.Response === 'True') {
        setMovies(response.Search);
      } else {
        setMovies([]);
        setError(response.Error || 'No results found');
      }
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
      setMovies([]);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <h1 className="text-4xl font-bold text-yellow-500 mb-2">Discover Movies</h1>
        <p className="text-gray-400">Search for your favorite movies and add them to your favorites list</p>
      </motion.div>

      <SearchBar onSearch={handleSearch} />

      {error && (
        <div className="text-red-500 text-center mb-4">{error}</div>
      )}

      <MovieGrid movies={movies} loading={loading} />
    </div>
  );
};

export default Home;