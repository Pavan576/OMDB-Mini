import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import MovieGrid from '../components/MovieGrid';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center mb-2">
          <Heart className="h-8 w-8 text-red-500 fill-red-500 mr-2" />
          <h1 className="text-4xl font-bold text-white">My Favorites</h1>
        </div>
        <p className="text-gray-400">Your personal collection of favorite movies</p>
      </motion.div>

      {favorites.length === 0 ? (
        <motion.div 
          className="text-center py-12 bg-gray-800 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Heart className="h-16 w-16 mx-auto text-gray-600 mb-4" />
          <h2 className="text-2xl font-semibold text-white mb-2">No favorites yet</h2>
          <p className="text-gray-400 max-w-md mx-auto">
            Start adding movies to your favorites by clicking the heart icon on any movie card.
          </p>
        </motion.div>
      ) : (
        <MovieGrid movies={favorites} loading={false} />
      )}
    </div>
  );
};

export default Favorites;