"use client";
import React, { useEffect, useState } from "react";
import { Eye, Pencil, Trash2, Home, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";

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
};

// Función para formatear el precio de forma segura
const formatPrecio = (precio: number | string | undefined): string => {
  const p = Number(precio);
  if (isNaN(p)) {
    return "N/A";
  }
  return `$${p.toLocaleString()}`;
};

const MisPropiedades: React.FC = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const fetchPropiedades = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/api/propiedades/arrendador/${user.uid}`
        );
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

  if (loading) return <p>Cargando propiedades...</p>;
  if (error) return <p>Error: {error}</p>;
  if (propiedades.length === 0)
    return <p>No se encontraron propiedades publicadas.</p>;

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
                {/* Imagen placeholder y badge de estado */}
                <div className="relative w-1/3 bg-gray-200 flex items-center justify-center">
                  {/* Aquí puedes agregar un Image real o SVG de placeholder */}
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
                      <button className="flex items-center justify-center w-8 h-8 text-red-600 border border-red-600 rounded-md hover:bg-red-50">
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