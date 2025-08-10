import { useEffect, useState } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import "./themeToggle.css";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "light";
    }
    return "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);

    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer select-none">
      {/* Sun icon for light */}
      <div
        className={`toggle-icon ${theme === "light" ? "active" : ""}`}
        onClick={() => setTheme("light")}
      >
        <FiSun size={20} />
      </div>

      {/* Toggle switch with circle */}
      <div className={`toggle-switch ${theme}`} onClick={toggleTheme}>
        <div className="toggle-circle"></div>
      </div>

      {/* Moon icon for dark */}
      <div
        className={`toggle-icon ${theme === "dark" ? "active" : ""}`}
        onClick={() => setTheme("dark")}
      >
        <FiMoon size={20} />
      </div>
    </div>
  );
};

export default ThemeToggle;
