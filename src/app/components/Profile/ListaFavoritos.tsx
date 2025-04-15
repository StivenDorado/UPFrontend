"use client";
import { useContext, useEffect, useState } from "react";
import { authContext } from "@/context/AuthContext";
import AccommodationCard from "../general/cards-arrendador/card";

export default function FavoritosList() {
  const { user, loading: authLoading } = useContext(authContext) as {
    user: { uid: string; token: string } | null;
    loading: boolean;
  };

  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchFavoritos = async () => {
      if (!user || authLoading) return;
      try {
        const res = await fetch(`http://localhost:4000/api/favorites/${user.uid}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });

        if (!res.ok) throw new Error("Error al cargar favoritos");
        const data = await res.json();
        const ids = data.map((fav: any) => 
          fav.propiedadId || fav.id || fav.propiedad?._id || fav.propiedad?.id
        );
        setFavoritos(ids);
      } catch (err: any) {
        console.error("Error obteniendo favoritos:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFavoritos();
  }, [user, authLoading, refreshKey]);

  if (authLoading || loading) return <div className="p-4">Cargando favoritos...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!favoritos.length) return <div className="p-4">No tienes propiedades favoritas aún.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {favoritos.map((id) => (
        <AccommodationCard
          key={id}
          id={id}
          onFavoriteToggle={() => setRefreshKey(prev => prev + 1)}
        />
      ))}
    </div>
  );
}