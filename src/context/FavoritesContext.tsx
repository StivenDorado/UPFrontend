// context/FavoritesContext.tsx
"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { useContext as useReactContext } from "react";
import { authContext } from "@/context/AuthContext";

const FavoritesContext = createContext<any>(null);

export const FavoritesProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useReactContext(authContext);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = async () => {
    if (!user) return;
    try {
      const res = await fetch(`http://localhost:4000/api/favorites/${user.uid}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const data = await res.json();
      setFavorites(data);
    } catch (err) {
      console.error("Error fetching favoritos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, [user]);

  const refreshFavorites = fetchFavorites;

  return (
    <FavoritesContext.Provider value={{ favorites, refreshFavorites, loading }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
