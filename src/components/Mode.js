import React, { useEffect, useState } from "react";
import "../DarkMode.css"; // optional, only if you're using custom styles

const ModeComponent = () => {
  const [isDark, setIsDark] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    return storedTheme === "dark" || (storedTheme === null && prefersDark);
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  const toggleTheme = (e) => {
    setIsDark(e.target.checked);
  };

  return (
    <div className="toggle-theme-wrapper flex items-center gap-2">
      <span>☀️</span>
      <label className="toggle-theme relative inline-block w-12 h-6">
        <input
          type="checkbox"
          id="checkbox"
          checked={isDark}
          onChange={toggleTheme}
          className="opacity-0 w-0 h-0"
        />
        <div className="slider round absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-400 rounded-full transition-all duration-300 before:content-[''] before:absolute before:h-5 before:w-5 before:left-1 before:bottom-0.5 before:bg-white before:rounded-full before:transition-all before:duration-300"
          style={{
            transform: isDark ? "translateX(100%)" : "translateX(0)",
            backgroundColor: isDark ? "#4B5563" : "#E5E7EB",
          }}
        />
      </label>
      <span>🌙</span>
    </div>
  );
};

export default ModeComponent;
