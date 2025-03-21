"use client";

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext"; // Ajusta la ruta según tu proyecto
import dynamic from "next/dynamic";
import Header from "../components/general/header/Headerlg";
import Footer from "../components/general/footer/Footer";
import { useRouter } from "next/navigation";

// Cargar el mapa dinámicamente sin SSR
const MapaComponent = dynamic(() => import("../components/Map/MapaComponent"), { ssr: false });

export default function AlojamientoForm() {
  const { user } = useAuth(); // Obtenemos el usuario autenticado
  const router = useRouter();

  // Estados para los datos del formulario de propiedad
  const [formData, setFormData] = useState({
    nombre: "",
    direccion: "",
    costo: "",
    descripcion: "",
  });
  // Estado para la posición del mapa (lat, lng)
  const [position, setPosition] = useState<[number, number]>([4.5709, -74.2973]); // Ejemplo: Bogotá, Colombia
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica que el usuario esté autenticado
    if (!user || !user.uid) {
      setError("Usuario no autenticado.");
      return;
    }
    const arrendador_uid = user.uid;

    // Construir el objeto de datos a enviar
    const data = {
      titulo: formData.nombre,
      descripcion: formData.descripcion,
      direccion: formData.direccion,
      precio: parseFloat(formData.costo),
      arrendador_uid,
      lat: position[0],
      lng: position[1],
    };

    try {
      const response = await fetch("http://localhost:4000/api/propiedades", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Error al crear la propiedad");
        return;
      }

      const result = await response.json();
      console.log("Propiedad creada:", result);
      // Redirige a la página de características pasando el id en la URL
      router.push(`/caracteristicas?propiedadId=${result.id}`);
    } catch (error) {
      console.error("Error en la petición:", error);
      setError("Error en la petición");
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
          {/* Formulario de propiedad */}
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
                <label
                  htmlFor="nombre"
                  className="block font-medium text-[#275950]"
                >
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
                <label
                  htmlFor="direccion"
                  className="block font-medium text-[#275950]"
                >
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
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="costo"
                  className="block font-medium text-[#275950]"
                >
                  Costo por mes (COP)
                </label>
                <input
                  id="costo"
                  name="costo"
                  type="number"
                  value={formData.costo}
                  onChange={handleInputChange}
                  placeholder="Ej: 1500"
                  required
                  className="w-full px-3 py-2 border border-[#9BF2EA] rounded-md focus:outline-none focus:ring-2 focus:ring-[#41BFB3]"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="descripcion"
                  className="block font-medium text-[#275950]"
                >
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

              {error && (
                <p className="text-red-500 text-center">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#2A8C82] text-white py-2 px-4 rounded-md hover:bg-[#275950] focus:outline-none focus:ring-2 focus:ring-[#41BFB3] focus:ring-offset-2 transition-colors"
              >
                Continuar
              </button>
            </form>
          </div>

          {/* Mapa para seleccionar ubicación */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#9BF2EA]">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-[#275950]">Ubicación</h2>
              <p className="text-[#41BFB3] text-sm">
                Haz clic en el mapa para seleccionar la ubicación
              </p>
            </div>

            <div className="h-[400px]">
              <MapaComponent position={position} setPosition={setPosition} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
