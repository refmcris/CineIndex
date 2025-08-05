import React, { useState } from "react";

const SearchBar = ({ placeholder, className = "" }) => {
  const [query, setQuery] = useState("");

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#c9a092]">
        <SearchIcon />
      </div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-[#482c23] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ee5c2b] placeholder-[#c9a092]"
      />
    </div>
  );
};

const SearchIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 256 256"></svg>
);

export default SearchBar;
