import React from 'react';
import { Link } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  return (
    <motion.nav 
      className="bg-black shadow-lg"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 120 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Film className="h-8 w-8 text-yellow-500" />
            <motion.span 
              className="text-2xl font-bold text-yellow-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              OMDB Clone
            </motion.span>
          </Link>
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 flex items-center"
            >
              <span>Home</span>
            </Link>
            <Link 
              to="/favorites" 
              className="text-gray-300 hover:text-yellow-500 transition-colors duration-300 flex items-center space-x-1"
            >
              <Heart className="h-5 w-5" />
              <span>Favorites</span>
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;