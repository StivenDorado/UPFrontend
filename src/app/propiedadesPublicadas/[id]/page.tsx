"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../../../firebase";

interface PropiedadImagen {
  id: number;
  url: string;
  orden: number;
}

interface CaracteristicaPropiedad {
  id: number;
  tipo_vivienda: string;
  wifi: boolean;
  habitaciones: number;
  banos: number;
}

interface Propiedad {
  id: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  precio: number;
  imagenes: PropiedadImagen[];
  caracteristicas: CaracteristicaPropiedad[];
}

export default function PublicacionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
  const { user } = useAuth();
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const storage = getStorage(app);

  useEffect(() => {
    if (!id || isNaN(Number(id))) {
      setError("ID de propiedad inválido");
      setLoading(false);
      return;
    }

    const fetchPropiedad = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/propiedades/publicacion/${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error al obtener la propiedad");
        }

        const data: Propiedad = await response.json();

        // Obtener URLs de Firebase Storage para cada imagen
        const imagenesConUrls = await Promise.all(
          data.imagenes.map(async (imagen) => {
            try {
              const storageRef = ref(storage, imagen.url);
              const url = await getDownloadURL(storageRef);
              return { ...imagen, url };
            } catch (error) {
              console.error("Error en imagen", imagen.url, error);
              return { ...imagen, url: "/imagen-fallback.jpg" };
            }
          })
        );

        if (!data.caracteristicas?.[0]) {
          throw new Error("Datos de características incompletos");
        }

        setPropiedad({ ...data, imagenes: imagenesConUrls });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchPropiedad();
  }, [id, storage]);

  // Funciones para cambiar la imagen del hero
  const nextImage = () => {
    if (propiedad?.imagenes) {
      setCurrentImageIndex((prev) =>
        prev === propiedad.imagenes.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (propiedad?.imagenes) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? propiedad.imagenes.length - 1 : prev - 1
      );
    }
  };

  // FUNCIÓN PARA ELIMINAR LA PROPIEDAD
  const handleDeleteProperty = async () => {
    if (!id) return;
    if (!user?.uid) {
      setError("No tienes UID de arrendador. Inicia sesión primero.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/propiedades/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ arrendador_uid: user.uid }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar la propiedad");
      }

      alert("Propiedad eliminada con éxito.");
      router.push("/");
    } catch (err: any) {
      setError(err.message || "Error desconocido al eliminar la propiedad");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#9BF2EA]/10">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2A8C82]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 bg-[#9BF2EA]/10">
        <div className="bg-white p-6 rounded-lg max-w-md shadow-lg border border-[#41BFB3]/20">
          <h2 className="text-2xl font-bold text-[#275950] mb-3">Error</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#2A8C82] text-white px-4 py-2 rounded hover:bg-[#275950] transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Si no hay propiedad publicada, muestra un mensaje y un botón para crear una propiedad
  if (!propiedad) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#9BF2EA]/10">
        <div className="bg-white p-6 rounded-lg max-w-md shadow-lg border border-[#41BFB3]/20 text-center">
          <h2 className="text-2xl font-bold text-[#275950] mb-3">No tienes propiedades publicadas</h2>
          <p className="text-gray-700 mb-4">Crea tu primera propiedad para empezar a recibir reservas.</p>
          <button
            onClick={() => router.push("/crear-propiedad")}
            className="bg-[#2A8C82] text-white px-4 py-2 rounded hover:bg-[#275950] transition-colors"
          >
            Crear propiedad
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#9BF2EA]/10 min-h-screen">
      <div className="container mx-auto p-4 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden mb-8">
          <div className="relative h-96 md:h-[500px] w-full">
            {propiedad.imagenes.length > 0 ? (
              <>
                <Image
                  src={propiedad.imagenes[currentImageIndex].url}
                  alt={`Imagen principal de ${propiedad.titulo}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
                {propiedad.imagenes.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                      aria-label="Imagen anterior"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#2A8C82"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                      </svg>
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full shadow-md hover:bg-white transition-colors"
                      aria-label="Siguiente imagen"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#2A8C82"
                        className="w-6 h-6"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                      {propiedad.imagenes.map((_, index) => (
                        <span
                          key={index}
                          className={`w-2.5 h-2.5 rounded-full ${index === currentImageIndex ? "bg-[#2A8C82]" : "bg-white/70"}`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className="h-full bg-gray-100 flex items-center justify-center">
                <p className="text-gray-500">No hay imágenes disponibles</p>
              </div>
            )}
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-[#275950] mb-2">
                  {propiedad.titulo}
                </h1>
                <div className="flex items-center gap-2 text-lg text-gray-600">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 text-[#41BFB3]"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                    />
                  </svg>
                  <span>{propiedad.direccion}</span>
                </div>
              </div>
              <div className="bg-[#9BF2EA]/20 p-4 rounded-xl border border-[#41BFB3]/20 inline-block">
                <h3 className="text-2xl font-bold text-[#2A8C82]">
                  ${propiedad.precio.toLocaleString("es-CO")} COP
                  <span className="text-[#275950]/70 text-base font-normal"> / noche</span>
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Resto del contenido de la publicación */}
        {/* ... */}
      </div>
    </div>
  );
}
