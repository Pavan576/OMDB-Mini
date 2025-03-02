import React, { useState, useEffect, useRef } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);
  const debounceTimeoutRef = useRef(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    if (query.trim() && !isSearching) {
      setIsSearching(true);
      onSearch(query);
      // Reset searching state after a short delay to prevent rapid consecutive searches
      setTimeout(() => {
        setIsSearching(false);
      }, 1000);
    }
  };

  useEffect(() => {
    if (debounceTimeoutRef.current) {
      window.clearTimeout(debounceTimeoutRef.current);
    }

    if (query.trim()) {
      debounceTimeoutRef.current = window.setTimeout(() => {
        handleSearch();
      }, 500);
    }

    return () => {
      if (debounceTimeoutRef.current) {
        window.clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, [query]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (debounceTimeoutRef.current) {
        window.clearTimeout(debounceTimeoutRef.current);
      }
      handleSearch();
    }
  };

  const handleClear = () => {
    setQuery('');
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <motion.div 
      className={`relative max-w-2xl mx-auto mb-8 ${isFocused ? 'ring-2 ring-yellow-500' : ''}`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Search for movies..."
          className="w-full py-3 px-12 bg-gray-700 text-white rounded-full focus:outline-none transition-all duration-300 placeholder-gray-400"
        />
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        {query && (
          <button
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white"
            onClick={handleClear}
          >
            <span className="text-sm">Clear</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default SearchBar;