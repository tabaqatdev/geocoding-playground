import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

function getThemeFromDOM(): Theme {
  if (typeof window === "undefined") return "light";
  // Check if dark class is on html element
  if (document.documentElement.classList.contains("dark")) return "dark";
  // Check localStorage
  const stored = localStorage.getItem("theme");
  if (stored === "dark" || stored === "light") return stored;
  // Check system preference
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) return "dark";
  return "light";
}

// Apply initial theme on DOM
function applyInitialTheme() {
  if (typeof window === "undefined") return;
  const theme = getThemeFromDOM();
  document.documentElement.classList.toggle("dark", theme === "dark");
}

// Call once on module load
applyInitialTheme();

function subscribeToThemeChanges(callback: () => void) {
  // Listen for class changes on html element
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });

  // Also listen for storage changes (in case theme is changed in another tab)
  window.addEventListener("storage", callback);

  // Listen for system preference changes
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const handleChange = (e: MediaQueryListEvent) => {
    if (!localStorage.getItem("theme")) {
      document.documentElement.classList.toggle("dark", e.matches);
      callback();
    }
  };
  mediaQuery.addEventListener("change", handleChange);

  return () => {
    observer.disconnect();
    window.removeEventListener("storage", callback);
    mediaQuery.removeEventListener("change", handleChange);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(
    subscribeToThemeChanges,
    getThemeFromDOM,
    () => "light" as Theme
  );

  const setTheme = (newTheme: Theme) => {
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return { theme, setTheme, toggleTheme };
}
