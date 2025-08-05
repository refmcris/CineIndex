import React from "react";

const Header = () => (
  <header className="flex items-center justify-between border-b border-[#482c23] px-6 md:px-10 py-3">
    <div className="flex items-center gap-4 md:gap-8">
      <div className="flex items-center gap-2">
        <Logo />
        <h1 className="text-white text-lg font-bold">CineIndex</h1>
      </div>
      <nav className="hidden md:flex gap-6">
        {["Home", "Movies", "TV Shows", "People"].map((item) => (
          <a
            key={item}
            className="text-white text-sm font-medium hover:text-[#ee5c2b] transition"
          >
            {item}
          </a>
        ))}
      </nav>
    </div>
    <div className="flex items-center gap-4">
      <button className="p-2 rounded-lg bg-[#482c23] hover:bg-[#5a382d] transition">
        <BookmarkIcon />
      </button>
    </div>
  </header>
);

const Logo = () => (
  <svg
    className="w-4 h-4 text-white"
    viewBox="0 0 48 48"
    fill="currentColor"
  ></svg>
);

const BookmarkIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 256 256"></svg>
);

export default Header;
