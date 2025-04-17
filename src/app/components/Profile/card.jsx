"use client";
import { useState, useEffect } from "react";
import { Heart, MapPin, Eye, Pen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { app } from "../../../../firebase";
import { getStorage, ref as storageRef, deleteObject } from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AccommodationCard({ id }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [propiedad, setPropiedad] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [uid, setUid] = useState(null);
  const [visible, setVisible] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

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

  const handleDeleteProperty = async (id) => {
    if (!confirm("¿Estás seguro de eliminar esta publicación?")) return;
    if (!uid) {
      setError("Usuario no autenticado");
      return;
    }
    try {
      // Eliminar imágenes de Firebase si existen
      if (propiedad?.imagenes) {
        const storage = getStorage(app);
        await Promise.all(
          propiedad.imagenes.map(async (img) => {
            try {
              const imageRef = storageRef(storage, img.path);
              await deleteObject(imageRef);
            } catch (err) {
              console.error("Error al eliminar imagen:", img.path, err);
            }
          })
        );
      }
      const res = await fetch(`http://localhost:4000/api/propiedades/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arrendador_uid: uid }),
      });
      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage);
      }
      // Ocultar la card sin recargar
      setVisible(false);
    } catch (err) {
      console.error("Error al eliminar propiedad:", err);
      setError("Error al eliminar propiedad: " + err.message);
    }
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    await handleDeleteProperty(id);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    router.push(`/editar-publicacion/${id}`);
  };

  const handleView = (e, id) => {
    e.stopPropagation();
    router.push(`/propiedadesPublicadas/${id}`);
  };

  // Función para incrementar vistas (suponiendo que tu endpoint es POST /propiedades/:id/vistas)
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
    // Incrementar la cantidad de vistas en el backend antes de redirigir
    await incrementarVistas();
    router.push(`/propiedadesPublicadas/${id}`);
  };

  if (!visible) return null;
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
    <div className="w-full max-w-xs mx-auto bg-white text-gray-800 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-shadow shadow-lg hover:shadow-xl" onClick={handleCardClick}>
      <div className="relative">
        <img
          src={imageUrl}
          alt={propiedad.titulo}
          className="w-full h-48 object-cover"
          onError={(e) => (e.target.src = "/default-image.jpg")}
        />
        <div className="absolute top-0 left-0 bg-black/50 text-white px-3 py-1 text-sm rounded-br-lg">
          {propiedad.estado ? "Activa" : "Inactiva"}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-lg">{propiedad.titulo}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            {new Intl.NumberFormat("es-CO").format(propiedad.precio)} COP
          </span>
        </div>

        <p className="text-sm flex items-center text-gray-600 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {propiedad.direccion}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
          <Eye className="h-4 w-4" />
          {/* Cambia 'propiedad.vistas' a 'propiedad.views' si ese es el nombre real del campo */}
          <span>{propiedad.views || 0} vistas</span>
        </div>

        <div className="flex gap-2 mt-4">
          <button
            type="button"
            onClick={(e) => handleView(e, propiedad.id)}
            className="flex-1 text-white px-3 py-2 rounded-md text-sm flex items-center justify-center gap-1 transition-colors"
            style={{ backgroundColor: "#2A8C82" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#246f68")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#2A8C82")}
          >
            <Eye size={16} />
            Ver
          </button>

          <button
            type="button"
            onClick={handleEdit}
            className="flex-1 bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 text-sm flex items-center justify-center gap-1"
          >
            <Pen className="h-4 w-4" />
          </button>
          <button
            type="button"
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
