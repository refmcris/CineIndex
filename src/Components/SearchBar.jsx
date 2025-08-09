import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiX } from "react-icons/fi";

const SearchBar = ({
  placeholder,
  className = "",
  onSearch,
  onClear,
  debounceDelay = 600
}) => {
  const [query, setQuery] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setIsTyping(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (newQuery.trim()) {
        onSearch(newQuery);
      } else {
        onClear();
      }
    }, debounceDelay);
  };

  const handleClear = () => {
    setQuery("");
    setIsTyping(false);
    onClear();

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Backdrop blur container */}
      <div className="relative">
        {/* Glass effect background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-md rounded-xl border border-white/10 shadow-lg"></div>
        
        {/* Search input with transparent background */}
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <FiSearch className={`w-5 h-5 transition-colors duration-300 ${
              isFocused ? "text-[#ee5c2b]" : "text-white/70"
            }`} />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-4 bg-transparent text-white placeholder-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ee5c2b]/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-300 text-base"
          />
          
          {/* Clear button with improved styling */}
          {query && (
            <button
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-white/70 hover:text-white hover:scale-110 transition-all duration-200"
            >
              <FiX className="w-5 h-5" />
            </button>
          )}
          
          {/* Typing indicator with glass effect */}
          {isTyping && (
            <div className="absolute inset-y-0 right-12 pr-4 flex items-center pointer-events-none">
              <div className="flex items-center gap-1">
                <div className="w-1 h-1 bg-[#ee5c2b] rounded-full animate-pulse"></div>
                <div className="w-1 h-1 bg-[#ee5c2b] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-1 h-1 bg-[#ee5c2b] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Subtle glow effect on focus */}
      {isFocused && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#ee5c2b]/20 via-transparent to-[#ee5c2b]/20 rounded-xl blur-sm pointer-events-none"></div>
      )}
    </div>
  );
};

export default SearchBar;
