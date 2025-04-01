"use client"
import { useState, useEffect } from "react"
import { Eye, Pencil, Trash2, ImageIcon } from "lucide-react"
import Link from "next/link"

// Import Firebase with error handling
let firebase = null
try {
  const { getStorage, ref, getDownloadURL } = require("firebase/storage")
  const { app } = require("../../../../firebase")
  firebase = { getStorage, ref, getDownloadURL, app }
} catch (error) {
  console.error("Firebase import error:", error)
}

export type PropiedadImagen = {
  path: string
  url?: string
  orden?: number
}

export type Propiedad = {
  id: number
  titulo: string
  ubicacion: string
  habitaciones: number
  banos: number
  precio: number | string
  visitas: number
  reservas: number
  estado: "activa" | "inactiva"
  imagenes?: PropiedadImagen[]
}

const formatPrecio = (precio: number | string | undefined): string => {
  if (!precio) return "$0"
  const p = typeof precio === "string" ? Number.parseFloat(precio) : precio
  return `$${p.toLocaleString("es-CO")}`
}

type PropertyCardProps = {
  propiedad: Propiedad
  onDelete: (id: number) => void
  onToggleStatus?: (id: number) => void
  baseUrl?: string
}

const PropertyCard = ({ 
  propiedad, 
  onDelete, 
  onToggleStatus,
  baseUrl = "http://localhost:4000/api/propiedades"
}: PropertyCardProps) => {
  const [imageError, setImageError] = useState(false)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  // Construir o cargar la URL de la imagen
  // En tu PropertyCard.tsx, modifica el efecto de carga de imágenes:

  useEffect(() => {
    const loadImage = async () => {
      setLoading(true);
      setImageError(false);
  
      try {
        // Verificar si hay imágenes válidas
        if (!propiedad.imagenes || propiedad.imagenes.length === 0) {
          throw new Error("No hay imágenes disponibles");
        }
  
        const primeraImagen = propiedad.imagenes[0];
        
        // 1. Intentar con URL directa
        if (primeraImagen.url) {
          setImageUrl(primeraImagen.url);
          return;
        }
  
        // 2. Verificar path de Firebase
        if (!primeraImagen.path) {
          throw new Error("No hay path definido para la imagen");
        }
  
        console.log("Intentando cargar imagen con path:", primeraImagen.path);
  
        // 3. Cargar desde Firebase si está disponible
        if (firebase) {
          const storage = firebase.getStorage(firebase.app);
          const imageRef = firebase.ref(storage, primeraImagen.path);
          const url = await firebase.getDownloadURL(imageRef);
          setImageUrl(url);
          return;
        }
  
        // 4. Fallback a API si Firebase no está configurado
        setImageUrl(`${baseUrl}/publicacion/${propiedad.id}/imagen`);
  
      } catch (err) {
        console.error("Error cargando imagen:", err);
        setImageError(true);
      } finally {
        setLoading(false);
      }
    };
  
    loadImage();
  }, [propiedad.id, propiedad.imagenes, baseUrl]);
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {/* Imagen - Ahora con soporte para Firebase Storage */}
      <div className="relative h-56 bg-gray-100">
        {loading ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
          </div>
        ) : !imageError && imageUrl ? (
          <img
            src={imageUrl}
            alt={propiedad.titulo}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
            <ImageIcon className="h-10 w-10 opacity-30 mr-2" />
            <span>Imagen no disponible</span>
          </div>
        )}
        <div
          className={`absolute top-3 left-3 text-xs font-bold py-1 px-3 rounded-full ${
            propiedad.estado === "activa" ? "bg-green-500" : "bg-gray-500"
          } text-white shadow-sm`}
        >
          {propiedad.estado === "activa" ? "Activa" : "Inactiva"}
        </div>
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full text-teal-600 font-bold shadow-sm">
          {formatPrecio(propiedad.precio)}
        </div>
      </div>

      {/* Detalles */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-teal-800 mb-1 line-clamp-1">{propiedad.titulo}</h3>
        <p className="text-gray-600 text-sm mb-4 flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {propiedad.ubicacion}
        </p>

        <div className="grid grid-cols-4 gap-2 text-sm mb-4 bg-gray-50 rounded-lg p-3">
          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-500 mb-1">🛏️</span>
            <span className="font-medium">{propiedad.habitaciones}</span>
            <span className="text-xs text-gray-500">Hab.</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-500 mb-1">🚿</span>
            <span className="font-medium">{propiedad.banos}</span>
            <span className="text-xs text-gray-500">Baños</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-500 mb-1">👁️</span>
            <span className="font-medium">{propiedad.visitas}</span>
            <span className="text-xs text-gray-500">Visitas</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-500 mb-1">📅</span>
            <span className="font-medium">{propiedad.reservas}</span>
            <span className="text-xs text-gray-500">Reservas</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => onToggleStatus?.(propiedad.id)}
            className={`py-1.5 px-3 text-sm rounded-md ${
              propiedad.estado === "activa"
                ? "bg-gray-100 text-gray-800 hover:bg-gray-200"
                : "bg-green-100 text-green-800 hover:bg-green-200"
            } transition-colors`}
          >
            {propiedad.estado === "activa" ? "Desactivar" : "Activar"}
          </button>

          <div className="flex space-x-1">
            <Link
              href={`/propiedadesPublicadas/${propiedad.id}`}
              className="p-2 text-teal-600 hover:bg-teal-50 rounded-full transition-colors"
              title="Ver propiedad"
            >
              <Eye size={18} />
            </Link>
            <button
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
              title="Editar propiedad"
            >
              <Pencil size={18} />
            </button>
            <button
              onClick={() => onDelete(propiedad.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
              title="Eliminar propiedad"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyCard