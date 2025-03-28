"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../../../firebase";
import {
  Wifi,
  Flame,
  Tv,
  UtensilsCrossed,
  Droplet,
  Car,
  Waves,
  Refrigerator,
  Sofa,
  Ban,
  Dog,
  TreePine,
  Mountain,
  Home,
  Building,
  Bed,
  Bath,
  Users,
  ParkingCircle
} from "lucide-react";

interface PropiedadImagen {
  id: number;
  url: string;
  orden: number;
}

interface CaracteristicaPropiedad {
  id: number;
  tipo_vivienda: string;
  wifi: boolean;
  energia: boolean;
  tv: boolean;
  cocina: boolean;
  agua: boolean;
  garaje: boolean;
  lavadora: boolean;
  nevera: boolean;
  gas: boolean;
  habitaciones: number;
  banos: number;  // Asegúrate que coincida con el backend (baños vs banos)
  capacidad: number;
  estacionamientos: number;
  jardin: boolean;
  piscina: boolean;
  vista_montaña: boolean;
  terraza: boolean;
  amoblado: boolean;
  acepta_mascotas: boolean;
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
          // Si usas JWT, podrías incluirlo aquí:
          // Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ arrendador_uid: user.uid }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Error al eliminar la propiedad");
      }

      // Si se elimina correctamente, redirigir o mostrar un mensaje
      alert("Propiedad eliminada con éxito.");
      router.push("/"); // Redirige a donde quieras (inicio, listado, etc.)
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

  if (!propiedad) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#9BF2EA]/10">
        <p className="text-xl text-[#275950]">Propiedad no encontrada</p>
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
                          className={`w-2.5 h-2.5 rounded-full ${index === currentImageIndex ? "bg-[#2A8C82]" : "bg-white/70"
                            }`}
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

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Left Column - Description */}
          <div className="md:col-span-2 space-y-8">
            {/* Description Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold text-[#275950] mb-5 pb-2 border-b border-[#9BF2EA]">
                Descripción
              </h2>
              <p className="text-gray-700 whitespace-pre-line leading-relaxed">
                {propiedad.descripcion || "No hay descripción disponible"}
              </p>
            </div>

            {/* Characteristics Card */}
            {/* Characteristics Card */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold text-[#275950] mb-5 pb-2 border-b border-[#9BF2EA]">
                Características
              </h2>

              {/* Primera fila - Características principales */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {/* Tipo de vivienda */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#9BF2EA]/30 p-3 rounded-full">
                    <Building className="w-5 h-5 text-[#2A8C82]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Tipo</p>
                    <p className="font-medium">{propiedad.caracteristicas[0]?.tipo_vivienda || "N/A"}</p>
                  </div>
                </div>

                {/* Habitaciones */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#9BF2EA]/30 p-3 rounded-full">
                    <Bed className="w-5 h-5 text-[#2A8C82]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Habitaciones</p>
                    <p className="font-medium">{propiedad.caracteristicas[0]?.habitaciones || 0}</p>
                  </div>
                </div>

                {/* Baños */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#9BF2EA]/30 p-3 rounded-full">
                    <Bath className="w-5 h-5 text-[#2A8C82]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Baños</p>
                    <p className="font-medium">{propiedad.caracteristicas[0]?.banos || 0}</p>
                  </div>
                </div>

                {/* Capacidad */}
                <div className="flex items-center gap-3">
                  <div className="bg-[#9BF2EA]/30 p-3 rounded-full">
                    <Users className="w-5 h-5 text-[#2A8C82]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Capacidad</p>
                    <p className="font-medium">{propiedad.caracteristicas[0]?.capacidad || 0}</p>
                  </div>
                </div>
              </div>

              {/* Segunda fila - Servicios básicos */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-[#275950] mb-3">Servicios</h3>
                <div className="flex flex-wrap gap-3">
                  {propiedad.caracteristicas[0]?.wifi && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Wifi className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Wifi</span>
                    </div>
                  )}
                  {propiedad.caracteristicas[0]?.energia && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Flame className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Energía</span>
                    </div>
                  )}
                  {/* Repite para los demás servicios */}
                  {propiedad.caracteristicas[0]?.tv && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Tv className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">TV</span>
                    </div>
                  )}
                  {propiedad.caracteristicas[0]?.cocina && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <UtensilsCrossed className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Cocina</span>
                    </div>
                  )}
                  {propiedad.caracteristicas[0]?.agua && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Droplet className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Agua</span>
                    </div>
                  )}
                  {propiedad.caracteristicas[0]?.garaje && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Car className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Garaje</span>
                    </div>
                  )}
                  {propiedad.caracteristicas[0]?.lavadora && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Waves className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Lavadora</span>
                    </div>
                  )}
                  {propiedad.caracteristicas[0]?.nevera && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Refrigerator className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Nevera</span>
                    </div>
                  )}
                  {propiedad.caracteristicas[0]?.gas && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Flame className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Gas</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Tercera fila - Otras características */}
              <div>
                <h3 className="text-lg font-semibold text-[#275950] mb-3">Otras características</h3>
                <div className="flex flex-wrap gap-3">
                  {/* Estado del inmueble */}
                  <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                    {propiedad.caracteristicas[0]?.amoblado ? (
                      <Sofa className="w-4 h-4 text-[#2A8C82]" />
                    ) : (
                      <Ban className="w-4 h-4 text-[#2A8C82]" />
                    )}
                    <span className="text-sm">
                      {propiedad.caracteristicas[0]?.amoblado ? "Amoblado" : "Sin amoblar"}
                    </span>
                  </div>

                  {/* Política de mascotas */}
                  <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                    {propiedad.caracteristicas[0]?.acepta_mascotas ? (
                      <Dog className="w-4 h-4 text-[#2A8C82]" />
                    ) : (
                      <Ban className="w-4 h-4 text-[#2A8C82]" />
                    )}
                    <span className="text-sm">
                      {propiedad.caracteristicas[0]?.acepta_mascotas ? "Acepta mascotas" : "No mascotas"}
                    </span>
                  </div>

                  {/* Características exteriores */}
                  {propiedad.caracteristicas[0]?.jardin && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <TreePine className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Jardín</span>
                    </div>
                  )}
                  {propiedad.caracteristicas[0]?.piscina && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Droplet className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Piscina</span>
                    </div>
                  )}
                  {propiedad.caracteristicas[0]?.vista_montaña && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Mountain className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Vista montaña</span>
                    </div>
                  )}
                  {propiedad.caracteristicas[0]?.terraza && (
                    <div className="flex items-center gap-2 bg-[#9BF2EA]/10 px-3 py-2 rounded-full">
                      <Home className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm">Terraza</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Gallery Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold text-[#275950] mb-5 pb-2 border-b border-[#9BF2EA]">
                Galería
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {propiedad.imagenes.length > 0 ? (
                  propiedad.imagenes.map((img, index) => (
                    <div
                      key={img.id}
                      className="relative h-48 md:h-64 rounded-xl overflow-hidden shadow-sm border border-[#9BF2EA]/20"
                    >
                      <Image
                        src={img.url}
                        alt={`Imagen ${index + 1} de ${propiedad.titulo}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ))
                ) : (
                  <div className="col-span-full h-64 bg-gray-100 rounded-xl flex items-center justify-center">
                    <p className="text-gray-500">No hay imágenes adicionales disponibles</p>
                  </div>
                )}
              </div>
            </div>

            {/* Map Section */}
            <div className="bg-white p-8 rounded-2xl shadow-sm">
              <h2 className="text-2xl font-semibold text-[#275950] mb-5 pb-2 border-b border-[#9BF2EA]">
                Ubicación
              </h2>
              <div className="h-80 bg-[#9BF2EA]/30 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="#2A8C82"
                    className="w-12 h-12 mx-auto mb-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
                    />
                  </svg>
                  <p className="text-[#275950] font-medium">
                    Mapa de ubicación (próximamente)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-[#9BF2EA]/20 sticky top-8">
              {/* Mostrar la imagen de la publicación si existe */}
              {propiedad.imagenes.length > 0 && (
                <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
                  <Image
                    src={propiedad.imagenes[0].url}
                    alt={`Imagen de ${propiedad.titulo}`}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                </div>
              )}
              <h3 className="text-xl font-bold text-[#275950] mb-6 pb-2 border-b border-[#9BF2EA]">
                Reserva tu estancia
              </h3>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Fechas
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41BFB3] focus:border-[#41BFB3]"
                      placeholder="Llegada"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41BFB3] focus:border-[#41BFB3]"
                      placeholder="Salida"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Huéspedes
                </label>
                <select className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41BFB3] focus:border-[#41BFB3]">
                  <option>1 huésped</option>
                  <option>2 huéspedes</option>
                  <option>3 huéspedes</option>
                  <option>4 huéspedes</option>
                  <option>5+ huéspedes</option>
                </select>
              </div>

              <div className="bg-[#9BF2EA]/10 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">
                    ${propiedad.precio.toLocaleString("es-CO")} COP x 3 noches
                  </span>
                  <span className="font-medium">
                    ${(propiedad.precio * 3).toLocaleString("es-CO")} COP
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700">Tarifa de limpieza</span>
                  <span className="font-medium">
                    ${(propiedad.precio * 0.1).toLocaleString("es-CO")} COP
                  </span>
                </div>
                <div className="flex justify-between pt-3 border-t border-[#41BFB3]/20 mt-3">
                  <span className="font-bold text-[#275950]">Total</span>
                  <span className="font-bold text-[#275950]">
                    ${(propiedad.precio * 3.1).toLocaleString("es-CO")} COP
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <button className="w-full bg-[#2A8C82] text-white py-3 rounded-lg hover:bg-[#275950] transition-colors flex items-center justify-center">
                  <span>Reservar ahora</span>
                </button>
                <button className="w-full border-2 border-[#41BFB3] text-[#275950] py-3 rounded-lg hover:bg-[#9BF2EA]/20 transition-colors flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    />
                  </svg>
                  <span>Contactar al arrendador</span>
                </button>
              </div>

              {/* Botón para eliminar la propiedad (solo visible si el usuario es el dueño, por ejemplo) */}
              {user?.uid === propiedad.caracteristicas[0]?.id /* Ajusta la validación a tu lógica */
                ? (
                  <button
                    className="mt-4 w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                    onClick={handleDeleteProperty}
                  >
                    Eliminar publicación
                  </button>
                )
                : null
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}