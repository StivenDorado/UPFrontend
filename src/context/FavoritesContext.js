"use client";
import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar favoritos desde localStorage al montar el componente
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem("favorites");
      if (storedFavorites) {
        setFavorites(JSON.parse(storedFavorites));
      }
    } catch (error) {
      console.error("Error loading favorites from localStorage:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar en localStorage cuando cambian los favoritos
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites, isLoading]);

  const addFavorite = (room) => {
    if (!room || !room.id) {
      console.error("Invalid room object");
      return;
    }
    
    const exists = favorites.find((fav) => fav.id === room.id);
    if (!exists) {
      setFavorites(prev => [...prev, room]);
    }
  };

  const removeFavorite = (roomId) => {
    setFavorites(prev => prev.filter(room => room.id !== roomId));
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const isFavorite = (roomId) => {
    return favorites.some(room => room.id === roomId);
  };

  return (
    <FavoritesContext.Provider 
      value={{ 
        favorites,
        addFavorite,
        removeFavorite,
        clearFavorites,
        isFavorite,
        isLoading
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites debe usarse dentro de un FavoritesProvider");
  }
  return context;
}