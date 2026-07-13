import { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);

    localStorage.setItem("theme", nextTheme);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}