import { useEffect, useState } from "react";
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
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <div className="flex items-center gap-2 cursor-pointer select-none">
      <span className={`toggle-label ${theme === "light" ? "active" : ""}`}>
        Light
      </span>

      <div className={`toggle-switch ${theme}`} onClick={toggleTheme}>
        <div className="toggle-circle"></div>
      </div>

      <span className={`toggle-label ${theme === "dark" ? "active" : ""}`}>
        Dark
      </span>
    </div>
  );
};

export default ThemeToggle;
