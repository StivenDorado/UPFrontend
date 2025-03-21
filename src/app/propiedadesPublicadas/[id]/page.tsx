"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useAuth } from "../../../context/AuthContext"; // Asegúrate de que la ruta es correcta

interface PropiedadImagen {
  id: number;
  url: string;
  orden: number;
}

interface CaracteristicaPropiedad {
  id: number;
  tipo_vivienda: string;
  wifi: boolean;
  // otros campos...
}

interface Propiedad {
  id: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  precio: string;
  imagenes?: PropiedadImagen[];
  caracteristicas?: CaracteristicaPropiedad[];
}

export default function PublicacionPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id"); // Extraemos el ID de la URL

  // Extrae el usuario autenticado
  const { user } = useAuth();
  // Ahora el UID del usuario lo puedes utilizar (si es necesario)
  const arrendador_uid = user?.uid;

  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      console.log("No se encontró el id en la URL");
      return;
    }
    console.log("ID obtenido:", id);

    const fetchPropiedad = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/propiedades/${id}`);
        console.log("Respuesta de la API:", response);
        if (!response.ok) {
          const errorData = await response.json();
          setError(errorData.error || "Error al obtener la propiedad");
          return;
        }
        const data = await response.json();
        console.log("Datos de la propiedad:", data);
        setPropiedad(data);
      } catch (err) {
        console.error("Error en la petición:", err);
        setError("Error en la petición");
      }
    };

    fetchPropiedad();
  }, [id]);

  if (error) return <p>Error: {error}</p>;
  if (!propiedad) return <p>Cargando propiedad...</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{propiedad.titulo}</h1>
      <p className="mb-2">{propiedad.descripcion}</p>
      <p className="mb-2">Dirección: {propiedad.direccion}</p>
      <p className="mb-4">Precio: {propiedad.precio}</p>

      {propiedad.imagenes && propiedad.imagenes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {propiedad.imagenes.map((img) => (
            <div key={img.id} className="relative h-64">
              <Image src={img.url} alt={`Imagen ${img.orden}`} fill className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {propiedad.caracteristicas && propiedad.caracteristicas.length > 0 && (
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Características</h2>
          {propiedad.caracteristicas.map((carac) => (
            <div key={carac.id}>
              <p>Tipo de vivienda: {carac.tipo_vivienda}</p>
              <p>Wifi: {carac.wifi ? "Sí" : "No"}</p>
              {/* Renderiza otros campos */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
