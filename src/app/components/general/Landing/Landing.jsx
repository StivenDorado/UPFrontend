"use client";
import React, { useEffect, useState } from "react";
import Footer from "../../components/footer/Footer";
import AccommodationCard from "../../components/cards/AccommodationCard";

export default function Landing() {
  const [propiedades, setPropiedades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPropiedades = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/alojamientos");
        
        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        console.log("Datos recibidos:", data); // Depuración
        
        // Verifica si la respuesta es un array
        if (!Array.isArray(data)) {
          throw new Error("La respuesta no es un array de propiedades");
        }

        setPropiedades(data);
      } catch (err) {
        console.error("Error al cargar propiedades:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPropiedades();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando propiedades...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Sección de banners (opcional) */}
      <section className="p-4 grid grid-cols-3 gap-4">
        <div className="bg-gray-300 h-24 rounded-md" />
        <div className="bg-gray-300 h-24 rounded-md" />
        <div className="bg-gray-300 h-24 rounded-md" />
      </section>

      {/* Listado de propiedades */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
        {propiedades.length > 0 ? (
          propiedades.map((propiedad) => (
            <AccommodationCard
              key={propiedad.id}
              id={propiedad.id}
              apartmentData={{
                name: propiedad.titulo || "Sin título",
                distance: "5 km", // Puedes calcularlo con geolocalización
                dates: "Disponible", // Puedes usar propiedad.fechasDisponibles
                price: propiedad.precio || "Consultar",
                imageUrl: propiedad.imagenes?.[0]?.url || "/default-image.jpg",
                features: [
                  propiedad.caracteristicas?.tipo_vivienda || "Casa",
                  `${propiedad.caracteristicas?.habitaciones || 1} hab.`,
                  `${propiedad.caracteristicas?.banos || 1} baños`,
                ].filter(Boolean),
              }}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-10">
            <p>No hay propiedades disponibles.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}