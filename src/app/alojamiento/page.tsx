"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import dynamic from "next/dynamic";
import Header from "../components/general/header/Headerlg";
import Footer from "../components/general/footer/Footer";
import { useRouter } from "next/navigation";

const MapaComponent = dynamic(() => import("../components/Map/MapaComponent"), {
  ssr: false,
  loading: () => <p>Cargando mapa...</p>,
});

export default function AlojamientoForm() {
  const { user } = useAuth();
  const router = useRouter();

  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    costo: "",
    descripcion: "",
  });

  const [position, setPosition] = useState<[number, number]>([4.5709, -74.2973]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para mostrar valor en formato COP (estilo Nequi)
  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, ""); // Elimina caracteres no numéricos
    const number = parseInt(numericValue, 10);
    if (isNaN(number)) return "";
    return number.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });
  };

  const reverseGeocode = async (lat: number, lng: number) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.address) {
        const address =
          data.display_name ||
          `${data.address.road || ""} ${data.address.house_number || ""}, ${data.address.city || data.address.town || data.address.village || ""}`;
        setFormData((prev) => ({
          ...prev,
          direccion: address.trim(),
        }));
        setError(null);
      }
    } catch (error) {
      console.error("Error en reverse geocoding:", error);
      setError("No se pudo obtener la dirección para esta ubicación");
    } finally {
      setIsSearching(false);
    }
  };

  const geocodeAddress = async (address: string) => {
    if (!address) return;
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          address
        )}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setPosition([parseFloat(lat), parseFloat(lon)]);
        setError(null);
      } else {
        setError("Dirección no encontrada");
      }
    } catch (error) {
      console.error("Error en geocodificación:", error);
      setError("Error al buscar la dirección");
    } finally {
      setIsSearching(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (formData.direccion.trim().length > 3) {
        geocodeAddress(formData.direccion);
      }
    }, 1000);
    return () => clearTimeout(delayDebounce);
  }, [formData.direccion]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user || !user.uid) {
      setError("Usuario no autenticado.");
      return;
    }

    if (position[0] === 4.5709 && position[1] === -74.2973) {
      setError("Por favor selecciona una ubicación válida en el mapa");
      return;
    }

    const arrendador_uid = user.uid;
    const precioEntero = parseInt(formData.costo.replace(/\D/g, ""), 10);

    const dataToSend = {
      titulo: formData.nombre,
      descripcion: formData.descripcion,
      direccion: formData.direccion,
      precio: precioEntero,
      arrendador_uid,
      lat: position[0],
      lng: position[1],
    };

    console.log("Enviando datos:", dataToSend);

    try {
      const response = await fetch("http://localhost:4000/api/propiedades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al crear la propiedad");
        return;
      }

      const result = await response.json();
      router.push(`/caracteristicas?propiedadId=${result.id}`);
    } catch (error) {
      console.error("Error en la petición:", error);
      setError("Error en la conexión con el servidor");
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#275950]">
          Registro de Alojamiento
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulario */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#9BF2EA]">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-[#275950]">
                Información del Alojamiento
              </h2>
              <p className="text-[#41BFB3] text-sm">
                Ingresa los detalles de tu propiedad
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="nombre" className="block font-medium text-[#275950]">
                  Nombre del Alojamiento
                </label>
                <input
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  placeholder="Ej: Villa Paraíso"
                  required
                  className="w-full px-3 py-2 border border-[#9BF2EA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41BFB3]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="direccion" className="block font-medium text-[#275950]">
                  Dirección
                </label>
                <input
                  id="direccion"
                  name="direccion"
                  value={formData.direccion}
                  onChange={handleInputChange}
                  placeholder="Ej: Av. Principal #123, Ciudad"
                  required
                  className="w-full px-3 py-2 border border-[#9BF2EA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41BFB3]"
                />
                {isSearching && <p className="text-sm text-[#41BFB3]">Buscando ubicación...</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="costo" className="block font-medium text-[#275950]">
                  Costo por mes (COP)
                </label>
                <input
                  id="costo"
                  name="costo"
                  type="text"
                  value={formatCurrency(formData.costo)}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/\D/g, "");
                    setFormData({ ...formData, costo: raw });
                  }}
                  placeholder="Ej: $1.500.000"
                  required
                  className="w-full px-3 py-2 border border-[#9BF2EA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41BFB3]"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="descripcion" className="block font-medium text-[#275950]">
                  Descripción
                </label>
                <textarea
                  id="descripcion"
                  name="descripcion"
                  value={formData.descripcion}
                  onChange={handleInputChange}
                  placeholder="Describe tu alojamiento..."
                  rows={4}
                  className="w-full px-3 py-2 border border-[#9BF2EA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41BFB3]"
                />
              </div>

              {error && <p className="text-red-500 text-center">{error}</p>}

              <button
                type="submit"
                className="w-full bg-[#2A8C82] text-white py-2 px-4 rounded-md hover:bg-[#275950] focus:outline-none focus:ring-2 focus:ring-[#41BFB3] transition-colors"
              >
                Continuar
              </button>
            </form>
          </div>

          {/* Mapa */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#9BF2EA]">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-[#275950]">Ubicación</h2>
              <p className="text-[#41BFB3] text-sm">
                {formData.direccion || "Ingresa una dirección o haz clic en el mapa"}
              </p>
            </div>

            <div className="h-[400px]">
              <MapaComponent
                position={position}
                setPosition={setPosition}
                updateAddress={reverseGeocode}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
