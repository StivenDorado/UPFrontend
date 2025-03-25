"use client";
import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Home, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { app } from "../../../../firebase";

// Tipos de datos para la propiedad
type PropiedadImagen = {
  url: string; // Aquí debe guardarse el path, por ejemplo "photos/1645734567890-image.jpg"
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

// Función para formatear el precio
const formatPrecio = (precio: number | string | undefined): string => {
  const p = Number(precio);
  if (isNaN(p)) return "N/A";
  return `$${p.toLocaleString()}`;
};

const MisPropiedades: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const storage = getStorage(app);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const fetchPropiedades = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/propiedades/arrendador/${user.uid}`);
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Error al obtener las propiedades");
          setLoading(false);
          return;
        }
        const data = await response.json();
        setPropiedades(data);
        setLoading(false);
      } catch (err) {
        console.error("Error en la petición:", err);
        setError("Error en la petición");
        setLoading(false);
      }
    };

    fetchPropiedades();
  }, [user]);

  // Función para eliminar las imágenes de Firebase Storage y luego la propiedad en el backend
  const handleDeleteProperty = async (propiedadId: number) => {
    if (!user?.uid) {
      setError("No se encontró el UID del arrendador. Inicia sesión primero.");
      return;
    }

    // Busca la propiedad a eliminar para obtener sus imágenes
    const propiedadAEliminar = propiedades.find((p) => p.id === propiedadId);
    if (!propiedadAEliminar) {
      setError("Propiedad no encontrada");
      return;
    }

    try {
      // Eliminar cada imagen de Firebase Storage
      if (propiedadAEliminar.imagenes && propiedadAEliminar.imagenes.length > 0) {
        for (const img of propiedadAEliminar.imagenes) {
          try {
            // Crea la referencia con el path guardado en la base de datos
            const imageRef = ref(storage, img.url);
            await deleteObject(imageRef);
            console.log(`Imagen eliminada: ${img.url}`);
          } catch (error) {
            console.error("Error al eliminar imagen de Firebase:", img.url, error);
            // Decide si continúas o abortas la eliminación según tu lógica
          }
        }
      }

      // Luego, envía la petición DELETE al backend
      const response = await fetch(`http://localhost:4000/api/propiedades/${propiedadId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ arrendador_uid: user.uid }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al eliminar la propiedad");
        return;
      }

      // Si se elimina correctamente, actualizar el estado local
      setPropiedades((prev) => prev.filter((p) => p.id !== propiedadId));
      alert("Propiedad eliminada con éxito.");
    } catch (err) {
      console.error("Error al eliminar la propiedad:", err);
      setError("Error al eliminar la propiedad");
    }
  };

  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p>Error: {error}</p>;

  // Si no hay propiedades publicadas, muestra un mensaje y un botón para crear una propiedad
  if (propiedades.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="bg-gray-50 p-6 rounded-lg shadow-lg text-center">
          <h2 className="text-2xl font-bold text-teal-600 mb-3">No tienes propiedades publicadas</h2>
          <p className="text-gray-700 mb-4">
            Crea tu primera propiedad para empezar a recibir reservas.
          </p>
          <Link
            href="/alojamiento"
            className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-md flex items-center justify-center"
          >
            <PlusCircle size={18} className="mr-2" />
            Nueva propiedad
          </Link>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-teal-600">
      <div className="bg-gray-50 min-h-screen rounded-t-lg p-4">
        {/* Encabezado */}
        <div className="bg-teal-600 text-white p-4 rounded-lg mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <Home className="mr-2" size={24} />
            <h2 className="text-xl font-bold uppercase">MIS PROPIEDADES</h2>
          </div>
          <Link
            href="/alojamiento"
            className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle size={18} className="mr-2" />
            Nueva propiedad
          </Link>
        </div>

        {/* Lista de propiedades */}
        <div className="space-y-4">
          {propiedades.map((propiedad) => (
            <div
              key={propiedad.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="flex">
                {/* Sección de la imagen */}
                <div className="relative w-1/3 bg-gray-200 flex items-center justify-center">
                  {propiedad.imagenes && propiedad.imagenes.length > 0 ? (
                    <div className="relative w-full h-40">
                      <img
                        src={propiedad.imagenes[0].url}
                        alt={`Imagen de ${propiedad.titulo}`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div className="text-gray-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <circle cx="9" cy="9" r="2" />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>
                  )}
                  <div
                    className={`absolute top-2 left-2 text-xs font-bold py-1 px-3 rounded-full ${
                      propiedad.estado === "activa"
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {propiedad.estado === "activa" ? "Activa" : "Inactiva"}
                  </div>
                </div>

                {/* Información de la propiedad */}
                <div className="w-2/3 p-4">
                  <h3 className="font-bold text-teal-700 text-lg mb-1">
                    {propiedad.titulo}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center mb-2">
                    {propiedad.ubicacion}
                  </p>
                  <div className="flex mb-2">
                    <div className="flex items-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M3 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H3Z" />
                        <path d="M15 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2h-6Z" />
                        <path d="M9 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H9Z" />
                      </svg>
                      {propiedad.habitaciones}
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M8 2v2" />
                        <path d="M16 2v2" />
                        <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
                        <path d="M3 10h18" />
                        <path d="M16 19h6" />
                        <path d="M19 16v6" />
                      </svg>
                      {propiedad.banos}
                    </div>
                  </div>
                  <div className="flex mb-2">
                    <div className="flex items-center mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {propiedad.visitas} visitas
                    </div>
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-1"
                      >
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <path d="M7 7h.01" />
                        <path d="M17 7h.01" />
                        <path d="M7 17h.01" />
                        <path d="M17 17h.01" />
                      </svg>
                      {propiedad.reservas} reservas
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-teal-600 font-bold">
                      {formatPrecio(propiedad.precio)}
                    </div>
                    <div className="flex space-x-2">
                      <Link href={`/propiedadesPublicadas/${propiedad.id}`}>
                        <button className="flex items-center justify-center w-8 h-8 text-teal-600 border border-teal-600 rounded-md hover:bg-teal-50">
                          <Eye size={16} />
                        </button>
                      </Link>
                      <button className="flex items-center justify-center w-8 h-8 text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50">
                        <Pencil size={16} />
                      </button>
                      {/* Botón para eliminar */}
                      <button
                        onClick={() => handleDeleteProperty(propiedad.id)}
                        className="flex items-center justify-center w-8 h-8 text-red-600 border border-red-600 rounded-md hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2">
                    <button
                      className={`w-full py-1 px-2 rounded-md text-sm ${
                        propiedad.estado === "activa"
                          ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {propiedad.estado === "activa" ? "Desactivar" : "Activar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MisPropiedades;
