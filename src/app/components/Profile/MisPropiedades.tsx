"use client";
import { useEffect, useState } from "react";
import { Home, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../context/AuthContext";
import { useRouter } from "next/navigation";
import AccommodationCard from "../Profile/card"; // Asegúrate de que la ruta sea correcta

// Import Firebase con manejo de errores
let firebaseStorage: any = null;
let firebaseApp: any = null;

try {
  const firebaseModule = require("../../../../firebase");
  firebaseApp = firebaseModule.app;
  const { getStorage, ref, deleteObject, getDownloadURL } = require("firebase/storage");
  firebaseStorage = { getStorage, ref, deleteObject, getDownloadURL };
} catch (error) {
  console.error("Firebase import error:", error);
}

// Define la interfaz para una propiedad
interface Propiedad {
  id: number;
  titulo: string;
  ubicacion: string;
  habitaciones: number;
  banos: number;
  precio: number;
  visitas: number;
  reservas: number;
  estado: "activa" | "inactiva";
  imagenes?: { path: string; url?: string }[];
}

const MisPropiedades = () => {
  const { user } = useAuth?.() || { user: null };
  const router = useRouter();
  const [propiedades, setPropiedades] = useState<Propiedad[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Si Firebase no está disponible o el usuario no está autenticado,
    // se deja el arreglo de propiedades vacío.
    if (!firebaseApp || !user?.uid) {
      setPropiedades([]);
      setLoading(false);
      return;
    }

    const fetchPropiedades = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/propiedades/arrendador/${user.uid}`);
        if (!res.ok) throw new Error(await res.text());
        const data: Propiedad[] = await res.json();
        setPropiedades(data);
      } catch (err: any) {
        console.error("Error al obtener propiedades:", err);
        setError("Error al cargar propiedades");
        setPropiedades([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPropiedades();
  }, [user]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    );

  if (error && propiedades.length === 0)
    return (
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

  if (propiedades.length === 0)
    return (
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
            <AccommodationCard key={propiedad.id} id={propiedad.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MisPropiedades;