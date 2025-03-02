import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useFavorites } from '../context/FavoritesContext';

const MovieCard = ({ movie }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorite = isFavorite(movie.imdbID);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
      whileHover={{ scale: 1.03 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/movie/${movie.imdbID}`} className="block relative">
        <div className="relative aspect-[2/3] overflow-hidden">
          {movie.Poster && movie.Poster !== 'N/A' ? (
            <img 
              src={movie.Poster} 
              alt={movie.Title} 
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
            />
          ) : (
            <div className="w-full h-full bg-gray-700 flex items-center justify-center">
              <span className="text-gray-400">No Image Available</span>
            </div>
          )}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all duration-300"
          >
            <Heart 
              className={`h-6 w-6 ${favorite ? 'text-red-500 fill-red-500' : 'text-white'}`} 
            />
          </button>
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-white truncate">{movie.Title}</h3>
          <p className="text-gray-400">{movie.Year}</p>
        </div>
      </Link>
    </motion.div>
  );
};

export default MovieCard;