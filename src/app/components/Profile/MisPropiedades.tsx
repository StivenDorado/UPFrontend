"use client";
import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Home, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { getStorage, ref, deleteObject, getDownloadURL } from "firebase/storage";
import { app } from "../../../../firebase";

// Componente mejorado para mostrar imágenes desde Firebase Storage
const FirebaseImage = ({ path, alt = "", className = "" }: {
  path: string;
  alt?: string;
  className?: string
}) => {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const storage = getStorage(app);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!path) {
          throw new Error("No se proporcionó path de la imagen");
        }

        const imageRef = ref(storage, path);
        const downloadUrl = await getDownloadURL(imageRef);
        setUrl(downloadUrl);
        setError(null);
      } catch (err) {
        console.error("Error al cargar imagen:", err);
        setError("No se pudo cargar la imagen");
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [path, storage]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error || !url) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
        <span>Imagen no disponible</span>
      </div>
    );
  }

  return (
    <img
      src={url}
      alt={alt}
      className={className}
      onError={() => setError("Error al cargar la imagen")}
    />
  );
};

type PropiedadImagen = {
  path: string; // Ruta completa en Firebase Storage
  url?: string;  // URL opcional (no necesaria si usamos FirebaseImage)
  orden?: number;
};

type Propiedad = {
  id: number;
  titulo: string;
  ubicacion: string;
  habitaciones: number;
  banos: number;
  precio: number | string;
  visitas: number;
  reservas: number;
  estado: "activa" | "inactiva";
  imagenes?: PropiedadImagen[];
};

const formatPrecio = (precio: number | string | undefined): string => {
  if (!precio) return "$0";
  const p = typeof precio === "string" ? parseFloat(precio) : precio;
  return `$${p.toLocaleString("es-CO")}`;
};

const MisPropiedades = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const fetchPropiedades = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/propiedades/arrendador/${user.uid}`);
        if (!res.ok) throw new Error(await res.text());
        const data = await res.json();
        setPropiedades(data);
      } catch (err) {
        console.error("Error al obtener propiedades:", err);
        setError("Error al cargar propiedades");
      } finally {
        setLoading(false);
      }
    };

    fetchPropiedades();
  }, [user]);

  const handleDeleteProperty = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar esta propiedad?")) return;
    if (!user?.uid) {
      setError("Usuario no autenticado");
      return;
    }

    try {
      // Eliminar imágenes de Firebase primero
      const propiedad = propiedades.find(p => p.id === id);
      if (propiedad?.imagenes) {
        const storage = getStorage(app);
        await Promise.all(
          propiedad.imagenes.map(async (img) => {
            try {
              const imageRef = ref(storage, img.path);
              await deleteObject(imageRef);
            } catch (err) {
              console.error("Error al eliminar imagen:", img.path, err);
            }
          })
        );
      }

      // Eliminar propiedad del backend
      const res = await fetch(`http://localhost:4000/api/propiedades/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arrendador_uid: user.uid })
      });

      if (!res.ok) throw new Error(await res.text());

      // Actualizar estado local
      setPropiedades(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar propiedad:", err);
      setError("Error al eliminar propiedad");
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700"
        >
          Reintentar
        </button>
      </div>
    </div>
  );

  if (propiedades.length === 0) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
        <h2 className="text-2xl font-bold text-teal-600 mb-4">No tienes propiedades</h2>
        <p className="text-gray-600 mb-6">
          Publica tu primera propiedad para empezar a recibir reservas
        </p>
        <Link
          href="/alojamiento"
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md inline-flex items-center"
        >
          <PlusCircle className="mr-2" size={18} />
          Crear propiedad
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-teal-800 flex items-center">
            <Home className="mr-2" size={24} />
            Mis Propiedades
          </h1>
          <Link
            href="/alojamiento"
            className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle className="mr-2" size={18} />
            Nueva propiedad
          </Link>
        </div>

        {/* Lista de propiedades */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {propiedades.map((propiedad) => (
            <div key={propiedad.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Imagen */}
              <div className="relative h-48 bg-gray-100">
                {propiedad.imagenes && propiedad.imagenes.length > 0 ? (
                  <FirebaseImage
                    path={propiedad.imagenes[0].path}
                    alt={propiedad.titulo}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Sin imagen
                  </div>
                )}
                <div className={`absolute top-2 left-2 text-xs font-bold py-1 px-2 rounded-full ${propiedad.estado === "activa" ? "bg-green-500" : "bg-gray-500"
                  } text-white`}>
                  {propiedad.estado === "activa" ? "Activa" : "Inactiva"}
                </div>
              </div>

              {/* Detalles */}
              <div className="p-4">
                <h3 className="font-bold text-lg text-teal-800 mb-1">{propiedad.titulo}</h3>
                <p className="text-gray-600 text-sm mb-3">{propiedad.ubicacion}</p>

                <div className="flex justify-between text-sm mb-3">
                  <span className="flex items-center">
                    <span className="mr-1">🛏️</span>
                    {propiedad.habitaciones} hab.
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">🚿</span>
                    {propiedad.banos} baños
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">👁️</span>
                    {propiedad.visitas}
                  </span>
                  <span className="flex items-center">
                    <span className="mr-1">📅</span>
                    {propiedad.reservas}
                  </span>
                </div>

                <div className="flex justify-between items-center mt-4">
                  <span className="font-bold text-teal-600">
                    {formatPrecio(propiedad.precio)}
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      href={`/propiedadesPublicadas/${propiedad.id}`}
                      className="p-2 text-teal-600 hover:bg-teal-50 rounded"
                    >
                      <Eye size={18} />
                    </Link>
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded">
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteProperty(propiedad.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                <button
                  className={`w-full mt-3 py-1 text-sm rounded ${propiedad.estado === "activa"
                      ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                      : "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}
                >
                  {propiedad.estado === "activa" ? "Desactivar" : "Activar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MisPropiedades;