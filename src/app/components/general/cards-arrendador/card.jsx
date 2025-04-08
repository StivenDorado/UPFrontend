"use client";
import { useState, useEffect } from "react";
import { Heart, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccommodationCard({ id }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [propiedad, setPropiedad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPropiedad = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/propiedades/publicacion/${id}`);
        if (!response.ok) {
          throw new Error("Error al cargar la propiedad");
        }
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

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const toggleDetails = (e) => {
    e.stopPropagation();
    setShowDetails(!showDetails);
  };

  // Función para incrementar el contador de vistas en el backend
  const incrementarVistas = async () => {
    try {
      await fetch(`http://localhost:4000/api/propiedades/${id}/vistas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error al incrementar vistas:", error);
    }
  };

  const handleCardClick = async () => {
    // Incrementar las vistas en el backend antes de redirigir
    await incrementarVistas();
    router.push(`/descripcionPropiedad/${id}`);
  };

  if (loading)
    return (
      <div className="w-full max-w-xs mx-auto bg-white p-4 rounded-lg">
        Cargando...
      </div>
    );
  if (error)
    return (
      <div className="w-full max-w-xs mx-auto bg-white p-4 rounded-lg text-red-500">
        Error: {error}
      </div>
    );
  if (!propiedad)
    return (
      <div className="w-full max-w-xs mx-auto bg-white p-4 rounded-lg">
        No se encontró la propiedad
      </div>
    );

  // Extraer datos de la propiedad
  const imageUrl = propiedad.imagenes?.[0]?.url || "/default-image.jpg";
  const features = [
    propiedad.caracteristicas?.tipo_vivienda,
    `${propiedad.caracteristicas?.habitaciones || 1} hab.`,
    `${propiedad.caracteristicas?.banos || 1} baños`
  ].filter(Boolean);

  return (
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
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
          onClick={toggleFavorite}
        >
          <Heart
            className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-800"}`}
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
          ${new Intl.NumberFormat("es-CO").format(propiedad.precio)} COP <span className="font-normal text-gray-600">Por mes</span>
        </p>

        <button
          className="mt-2 text-sm text-green-600 hover:text-green-500 flex items-center"
          onClick={toggleDetails}
        >
          {showDetails ? "Ocultar detalles" : "Ver detalles"}
        </button>

        {showDetails && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="mt-2">
              <p className="text-sm font-medium mb-1 text-gray-800">Características:</p>
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
  );
}
