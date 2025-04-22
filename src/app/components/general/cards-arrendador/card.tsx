"use client";
import { useState, useEffect, useContext, SyntheticEvent } from "react";
import { Heart, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { authContext } from "@/context/AuthContext";

interface AccommodationCardProps {
  id: string | number;
  onFavoriteToggle?: () => void;
}

interface Caracteristicas {
  tipo_vivienda?: string;
  habitaciones?: number;
  banos?: number;
}

interface Imagen {
  url: string;
}

interface Propiedad {
  id?: string | number;
  propiedadId?: string | number;
  imagenes?: Imagen[];
  titulo: string;
  direccion: string;
  caracteristicas?: Caracteristicas;
  precio: string | number;
}

export default function AccommodationCard({ id, onFavoriteToggle }: AccommodationCardProps): JSX.Element {
  const { user, loading: authLoading } = useContext(authContext) as {
    user: { uid: string; token: string } | null;
    loading: boolean;
  };

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/propiedades/publicacion/${id}`
        );
        if (!response.ok) throw new Error("Error al cargar la propiedad");
        const data: Propiedad = await response.json();
        setPropiedad(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPropiedad();
  }, [id]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && !authLoading) {
        try {
          const response = await fetch(
            `http://localhost:4000/api/favorites/${user.uid}`,
            { headers: { Authorization: `Bearer ${user.token}` } }
          );
          if (response.ok) {
            const favorites = await response.json();
            const isFav = favorites.some((fav: any) => {
              const favId =
                fav?.propiedadId ??
                fav?.id ??
                fav?.propiedad?._id ??
                fav?.propiedad?.id;
              return favId?.toString() === id?.toString();
            });
            setIsFavorite(isFav);
          }
        } catch (error) {
          console.error("Error verificando favoritos:", error);
        }
      }
    };
    checkFavoriteStatus();
  }, [user, authLoading, id]);

  const handleFavorite = async (e: SyntheticEvent) => {
    e.stopPropagation();
    if (!user || authLoading) {
      setShowLoginPrompt(true);
      return;
    }

    try {
      const method = isFavorite ? "DELETE" : "POST";
      const url = isFavorite
        ? `http://localhost:4000/api/favorites/${user.uid}/${id}`
        : "http://localhost:4000/api/favorites";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: !isFavorite
          ? JSON.stringify({ usuarioUid: user.uid, propiedadId: id })
          : null,
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        if (onFavoriteToggle) onFavoriteToggle();
      }
    } catch (error) {
      console.error("Error actualizando favoritos:", error);
    }
  };

  const handleCardClick = async () => {
    try {
      await fetch(`http://localhost:4000/api/propiedades/${id}/vistas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      router.push(`/descripcionPropiedad/${id}`);
    } catch (error) {
      console.error("Error al manejar el click en la tarjeta:", error);
    }
  };

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!propiedad) return <div className="p-4">Propiedad no encontrada</div>;

  const imageUrl = propiedad.imagenes?.[0]?.url || "/default-image.jpg";
  const features: string[] = [
    propiedad.caracteristicas?.tipo_vivienda ?? "",
    `${propiedad.caracteristicas?.habitaciones ?? 1} hab.`,
    `${propiedad.caracteristicas?.banos ?? 1} baños`,
  ].filter(Boolean);

  return (
    <div className="relative">
      {showLoginPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm mx-auto">
            <h3 className="text-lg font-semibold mb-4">Acceso requerido</h3>
            <p className="mb-4">Debes iniciar sesión para guardar favoritos</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLoginPrompt(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={() => router.push("/login")}
                className="px-4 py-2 text-white rounded hover:brightness-110"
                style={{ backgroundColor: "#41BFB3" }}
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      <div
        className="w-full max-w-xs mx-auto bg-white text-gray-800 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-lg hover:shadow-xl"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            src={imageUrl}
            alt={propiedad.titulo}
            className="w-full h-48 object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              if (target.src.indexOf("default-image.jpg") === -1) {
                target.src = "/default-image.jpg";
              }
            }}
          />
          <motion.button
            onClick={handleFavorite}
            disabled={authLoading}
            className={`absolute top-3 right-3 bg-white/90 p-2 rounded-full shadow-sm ${
              authLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            whileTap={{ scale: 0.8 }}
            animate={
              isFavorite
                ? {
                    scale: [1, 1.4, 0.9, 1],
                    rotate: [0, -10, 10, 0]
                  }
                : { scale: 1, rotate: 0 }
            }
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-800"
              }`}
            />
          </motion.button>
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-lg">{propiedad.titulo}</h3>
          <p className="text-sm flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" /> {propiedad.direccion}
          </p>
          <p className="text-sm mb-2 text-gray-600">Disponible</p>
          <p className="font-semibold text-gray-800">
            ${new Intl.NumberFormat("es-CO").format(Number(propiedad.precio))} COP{" "}
            <span className="font-normal text-gray-600">Por mes</span>
          </p>
          <button
            className="mt-2 text-sm text-green-600 hover:text-green-500 flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              setShowDetails(!showDetails);
            }}
          >
            {showDetails ? "Ocultar detalles" : "Ver detalles"}
          </button>
          {showDetails && (
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-sm font-medium mb-1 text-gray-800">
                Características:
              </p>
              <div className="flex flex-wrap gap-1">
                {features.map((feature, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-xs rounded-full px-2 py-1 text-gray-700 border border-gray-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
