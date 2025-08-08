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
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#c9a092]">
        <FiSearch className="w-5 h-5" />
      </div>
      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full  pl-10 pr-10 py-3 bg-[#482c23]  text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee5c2b] placeholder-[#c9a092] transition-all"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#c9a092] hover:text-white transition-colors"
        >
          <FiX className="w-5 h-5" />
        </button>
      )}
      {isTyping && (
        <div className="absolute inset-y-0 right-8 pr-3 flex items-center pointer-events-none">
          <span className="text-xs text-[#c9a092]">Typing...</span>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
