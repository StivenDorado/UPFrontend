"use client";
import { useState, useEffect } from "react";
import { Heart, MapPin, Eye, Pen, Trash } from "lucide-react";
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

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (confirm("¿Estás seguro de eliminar esta publicación?")) {
      try {
        await fetch(`http://localhost:4000/api/propiedades/${id}`, {
          method: "DELETE",
        });
        router.refresh();
      } catch (err) {
        setError("Error al eliminar la propiedad");
      }
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    router.push(`/editar-propiedad/${id}`);
  };

  const handleView = (e) => {
    e.stopPropagation();
    router.push(`/descripcionPropiedad/${id}`);
  };

  if (loading) return <div className="w-full max-w-xs mx-auto bg-white p-4 rounded-lg">Cargando...</div>;
  if (error) return <div className="w-full max-w-xs mx-auto bg-white p-4 rounded-lg text-red-500">Error: {error}</div>;
  if (!propiedad) return <div className="w-full max-w-xs mx-auto bg-white p-4 rounded-lg">No se encontró la propiedad</div>;

  const imageUrl = propiedad.imagenes?.[0]?.url || "/default-image.jpg";
  const features = [
    propiedad.caracteristicas?.tipo_vivienda,
    `${propiedad.caracteristicas?.habitaciones || 1} hab.`,
    `${propiedad.caracteristicas?.banos || 1} baños`
  ].filter(Boolean);

  return (
    <div
      className="w-full max-w-xs mx-auto bg-white text-gray-800 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-shadow shadow-lg hover:shadow-xl"
    >
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={propiedad.titulo} 
          className="w-full h-48 object-cover"
          onError={(e) => e.target.src = "/default-image.jpg"}
        />
        <div className="absolute top-0 left-0 bg-black/50 text-white px-3 py-1 text-sm rounded-br-lg">
          {propiedad.estado ? "Activa" : "Inactiva"}
        </div>
        <button
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-gray-100 shadow-sm"
          onClick={toggleFavorite}
        >
          <Heart className={`h-5 w-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-gray-800"}`}/>
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{propiedad.titulo}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {new Intl.NumberFormat('es-CO').format(propiedad.precio)} COP
          </span>
        </div>

        <p className="text-sm flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />{propiedad.direccion}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Eye className="h-4 w-4" />
          <span>{propiedad.vistas || 0} vistas</span>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleView}
            className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 text-sm flex items-center justify-center gap-1"
          >
            Ver
          </button>
          <button
            onClick={handleEdit}
            className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 text-sm flex items-center justify-center gap-1"
          >
            <Pen className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="flex-1 bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 text-sm flex items-center justify-center gap-1"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>

        {showDetails && (
          <div className="mt-4 pt-3 border-t border-gray-200">
            <p className="text-sm font-medium mb-2">Características:</p>
            <div className="flex flex-wrap gap-1">
              {features.map((feature, index) => (
                <span key={index} className="bg-gray-100 text-xs rounded-full px-2 py-1 border border-gray-200">
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}