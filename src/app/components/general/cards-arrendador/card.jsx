"use client";
import { useState, useEffect, useContext } from "react";
import { Heart, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { authContext } from "@/context/AuthContext";

export default function AccommodationCard({ id }) {
  const { user, loading: authLoading } = useContext(authContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [propiedad, setPropiedad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const router = useRouter();

  // Cargar datos de la propiedad
  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/propiedades/publicacion/${id}`
        );
        if (!response.ok) throw new Error("Error al cargar la propiedad");
        const data = await response.json();
        setPropiedad(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPropiedad();
  }, [id]);

  // Verificar estado de favoritos
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (user && !authLoading) {
        try {
          const response = await fetch(
            `http://localhost:4000/api/favorites/${user.uid}`,
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          if (response.ok) {
            const favorites = await response.json();
            setIsFavorite(favorites.some(fav => fav.propiedadId === id.toString()));
          }
        } catch (error) {
          console.error("Error verificando favoritos:", error);
        }
      }
    };
    checkFavoriteStatus();
  }, [user, authLoading, id]);

  // Manejar favoritos
  const handleFavorite = async (e) => {
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
        body: !isFavorite ? JSON.stringify({
          usuarioUid: user.uid,
          propiedadId: id
        }) : null,
      });

      if (response.ok) setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error actualizando favoritos:", error);
    }
  };

  // Manejar clic en la tarjeta
  const handleCardClick = async () => {
    try {
      await fetch(`http://localhost:4000/api/propiedades/${id}/vistas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" }
      });
      router.push(`/descripcionPropiedad/${id}`);
    } catch (error) {
      console.error("Error al manejar el click:", error);
    }
  };

  if (loading) return <div className="p-4">Cargando...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;
  if (!propiedad) return <div className="p-4">Propiedad no encontrada</div>;

  // Datos de la propiedad
  const imageUrl = propiedad.imagenes?.[0]?.url || "/default-image.jpg";
  const features = [
    propiedad.caracteristicas?.tipo_vivienda,
    `${propiedad.caracteristicas?.habitaciones || 1} hab.`,
    `${propiedad.caracteristicas?.banos || 1} baños`
  ].filter(Boolean);

  return (
    <div className="relative">
      {/* Modal de autenticación */}
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
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Iniciar sesión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tarjeta de propiedad */}
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
              e.target.src = "/default-image.jpg";
            }}
          />
          <button
            className={`absolute top-3 right-3 bg-white/90 p-2 rounded-full transition-colors shadow-sm ${
              authLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
            onClick={handleFavorite}
            disabled={authLoading}
          >
            <Heart
              className={`h-5 w-5 ${
                isFavorite ? "fill-red-500 text-red-500" : "text-gray-800"
              }`}
            />
          </button>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg">{propiedad.titulo}</h3>
          <p className="text-sm flex items-center text-gray-600">
            <MapPin className="h-4 w-4 mr-1" /> {propiedad.direccion}
          </p>
          <p className="text-sm mb-2 text-gray-600">Disponible</p>
          <p className="font-semibold text-gray-800">
            ${new Intl.NumberFormat("es-CO").format(propiedad.precio)} COP{" "}
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
              <div className="mt-2">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
}