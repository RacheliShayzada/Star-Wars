import { create } from "zustand";
import { persist } from "zustand/middleware";

type MovieID = string;

interface UserPreferencesState {
  favoriteMovies: MovieID[];
  preferredCategories: string[];
  addFavoriteMovie: (movieId: MovieID) => void;
  removeFavoriteMovie: (movieId: MovieID) => void;
  setPreferredCategories: (categories: string[]) => void;
}

const customStorage = {
  getItem: (name: string) => {
    const item = localStorage.getItem(name);
    console.log("Getting item from localStorage", name, item); // Debugging
    return item ? JSON.parse(item) : null;
  },
  setItem: (name: string, value: any) => {
    console.log("Setting item to localStorage", name, value); // Debugging
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name: string) => {
    console.log("Removing item from localStorage", name); // Debugging
    localStorage.removeItem(name);
  },
};

export const useUserPreferencesStore = create<UserPreferencesState>()(
  persist(
    (set, get) => ({
      favoriteMovies: [],  
      preferredCategories: [],

      addFavoriteMovie: (movieId) => {
        const { favoriteMovies } = get();
        if (!favoriteMovies.includes(movieId)) {
          set({ favoriteMovies: [...favoriteMovies, movieId] });
        }
      },

      removeFavoriteMovie: (movieId) => {
        const { favoriteMovies } = get();
        set({
          favoriteMovies: favoriteMovies.filter((id) => id !== movieId),
        });
      },

      setPreferredCategories: (categories) => {
        set({ preferredCategories: categories });
      },
    }),
    {
      name: "user-preferences",  // שם הקובץ ב-localStorage
      storage: customStorage,    // השתמש ב-storage המותאם אישית
    }
  )
);
