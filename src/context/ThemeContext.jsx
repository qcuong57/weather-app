"use client";

import { createContext, useContext, useState } from "react";
import { MantineProvider } from "@mantine/core";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [colorScheme, setColorScheme] = useState("light");

  const toggleColorScheme = (value) => {
    const newColorScheme = value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(newColorScheme);

    // Apply to html tag for Tailwind dark mode
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", newColorScheme === "dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme,
          primaryColor: "blue",
          defaultRadius: "md",
        }}
      >
        {children}
      </MantineProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
