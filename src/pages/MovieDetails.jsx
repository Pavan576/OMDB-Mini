import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Heart, ArrowLeft, Star, Clock, Calendar, Film } from 'lucide-react';
import { motion } from 'framer-motion';
import { getMovieDetails } from '../api/omdb';
import { useFavorites } from '../context/FavoritesContext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        if (data.Response === 'True') {
          setMovie(data);
        } else {
          setError(data.Error || 'Movie not found');
        }
      } catch (err) {
        setError('Failed to fetch movie details');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleFavoriteToggle = () => {
    if (!movie) return;

    if (isFavorite(movie.imdbID)) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-yellow-500"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 text-lg">{error || 'Movie not found'}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const favorite = isFavorite(movie.imdbID);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-400 hover:text-yellow-500 transition-colors mb-6"
      >
        <ArrowLeft className="mr-2" size={20} />
        Back
      </button>

      <div className="bg-gray-800 rounded-xl overflow-hidden shadow-xl">
        <div className="md:flex">
          <div className="md:w-1/3 relative">
            {movie.Poster && movie.Poster !== 'N/A' ? (
              <img 
                src={movie.Poster} 
                alt={movie.Title} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-[400px] bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400">No Image Available</span>
              </div>
            )}
          </div>
          
          <div className="md:w-2/3 p-6 md:p-8">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold text-white mb-2">{movie.Title}</h1>
              <button
                onClick={handleFavoriteToggle}
                className={`p-2 rounded-full transition-all duration-300 ${
                  favorite ? 'bg-red-500 bg-opacity-20' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <Heart 
                  className={`h-6 w-6 ${favorite ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                />
              </button>
            </div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              {movie.imdbRating !== 'N/A' && (
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-yellow-500 mr-1" />
                  <span>{movie.imdbRating}/10</span>
                </div>
              )}
              {movie.Runtime !== 'N/A' && (
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{movie.Runtime}</span>
                </div>
              )}
              {movie.Year !== 'N/A' && (
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-1" />
                  <span>{movie.Year}</span>
                </div>
              )}
              {movie.Rated !== 'N/A' && (
                <div className="px-2 py-1 bg-gray-700 rounded text-sm">
                  {movie.Rated}
                </div>
              )}
            </div>
            
            {movie.Genre !== 'N/A' && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {movie.Genre.split(', ').map((genre) => (
                    <span 
                      key={genre} 
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {movie.Plot !== 'N/A' && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Plot</h2>
                <p className="text-gray-300 leading-relaxed">{movie.Plot}</p>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {movie.Director !== 'N/A' && (
                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Director</h3>
                  <p>{movie.Director}</p>
                </div>
              )}
              
              {movie.Actors !== 'N/A' && (
                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Cast</h3>
                  <p>{movie.Actors}</p>
                </div>
              )}
              
              {movie.Writer !== 'N/A' && (
                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Writer</h3>
                  <p>{movie.Writer}</p>
                </div>
              )}
              
              {movie.Awards !== 'N/A' && (
                <div>
                  <h3 className="text-gray-400 font-medium mb-1">Awards</h3>
                  <p>{movie.Awards}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieDetails;