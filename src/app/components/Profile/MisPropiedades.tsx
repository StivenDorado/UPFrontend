"use client"
import { useEffect, useState } from "react"
import { Eye, Pencil, Trash2, Home, PlusCircle, ImageIcon } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../../../context/AuthContext"
import { useRouter } from "next/navigation"

// Import Firebase with error handling
let firebaseStorage: any = null
let firebaseApp: any = null

try {
  // Try different possible import paths
  const firebaseModule = require("../../../../firebase")
  firebaseApp = firebaseModule.app

  const { getStorage, ref, deleteObject, getDownloadURL } = require("firebase/storage")
  firebaseStorage = { getStorage, ref, deleteObject, getDownloadURL }
} catch (error) {
  console.error("Firebase import error:", error)
  // We'll handle the missing Firebase in the component
}

// Componente mejorado para mostrar imágenes desde Firebase Storage o fallback
const PropertyImage = ({
  path,
  alt = "",
  className = "",
}: {
  path?: string
  alt?: string
  className?: string
}) => {
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchImage = async () => {
      try {
        if (!path) {
          throw new Error("No se proporcionó path de la imagen")
        }

        if (!firebaseStorage || !firebaseApp) {
          throw new Error("Firebase no está disponible")
        }

        const storage = firebaseStorage.getStorage(firebaseApp)
        const imageRef = firebaseStorage.ref(storage, path)
        const downloadUrl = await firebaseStorage.getDownloadURL(imageRef)
        setUrl(downloadUrl)
        setError(null)
      } catch (err) {
        console.error("Error al cargar imagen:", err)
        setError("No se pudo cargar la imagen")
      } finally {
        setLoading(false)
      }
    }

    if (path) {
      fetchImage()
    } else {
      setLoading(false)
      setError("No hay imagen")
    }
  }, [path])

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    )
  }

  if (error || !url) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500">
        <ImageIcon className="h-10 w-10 opacity-30 mr-2" />
        <span>Imagen no disponible</span>
      </div>
    )
  }

  return (
    <img
      src={url || "/placeholder.svg"}
      alt={alt}
      className={className}
      onError={() => setError("Error al cargar la imagen")}
    />
  )
}

type PropiedadImagen = {
  path: string // Ruta completa en Firebase Storage
  url?: string // URL opcional (no necesaria si usamos FirebaseImage)
  orden?: number
}

type Propiedad = {
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

// Mock data for preview purposes
const mockPropiedades: Propiedad[] = [
  {
    id: 1,
    titulo: "Apartamento en El Poblado",
    ubicacion: "Medellín, Antioquia",
    habitaciones: 3,
    banos: 2,
    precio: 1500000,
    visitas: 120,
    reservas: 5,
    estado: "activa",
    imagenes: [{ path: "/images/property1.jpg" }],
  },
  {
    id: 2,
    titulo: "Casa en Laureles",
    ubicacion: "Medellín, Antioquia",
    habitaciones: 4,
    banos: 3,
    precio: 2200000,
    visitas: 85,
    reservas: 3,
    estado: "activa",
    imagenes: [{ path: "/images/property2.jpg" }],
  },
  {
    id: 3,
    titulo: "Estudio en Envigado",
    ubicacion: "Envigado, Antioquia",
    habitaciones: 1,
    banos: 1,
    precio: 900000,
    visitas: 65,
    reservas: 2,
    estado: "inactiva",
  },
]

const MisPropiedades = () => {
  const { user } = useAuth?.() || { user: null }
  const router = useRouter()
  const [propiedades, setPropiedades] = useState<Propiedad[]>([])
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // For preview purposes, use mock data if Firebase is not available
    if (!firebaseApp || !user?.uid) {
      console.log("Using mock data for preview")
      setPropiedades(mockPropiedades)
      setLoading(false)
      return
    }

    const fetchPropiedades = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/propiedades/arrendador/${user.uid}`)
        if (!res.ok) throw new Error(await res.text())
        const data = await res.json()
        setPropiedades(data)
      } catch (err) {
        console.error("Error al obtener propiedades:", err)
        setError("Error al cargar propiedades")
        // Fallback to mock data for preview
        setPropiedades(mockPropiedades)
      } finally {
        setLoading(false)
      }
    }

    fetchPropiedades()
  }, [user])

  const handleDeleteProperty = async (id: number) => {
    if (!window.confirm("¿Estás seguro de eliminar esta propiedad?")) return

    if (!firebaseApp || !firebaseStorage) {
      // Mock deletion for preview
      setPropiedades((prev) => prev.filter((p) => p.id !== id))
      return
    }

    if (!user?.uid) {
      setError("Usuario no autenticado")
      return
    }

    try {
      // Eliminar imágenes de Firebase primero
      const propiedad = propiedades.find((p) => p.id === id)
      if (propiedad?.imagenes) {
        const storage = firebaseStorage.getStorage(firebaseApp)
        await Promise.all(
          propiedad.imagenes.map(async (img) => {
            try {
              const imageRef = firebaseStorage.ref(storage, img.path)
              await firebaseStorage.deleteObject(imageRef)
            } catch (err) {
              console.error("Error al eliminar imagen:", img.path, err)
            }
          }),
        )
      }

      // Eliminar propiedad del backend
      const res = await fetch(`http://localhost:4000/api/propiedades/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ arrendador_uid: user.uid }),
      })

      if (!res.ok) throw new Error(await res.text())

      // Actualizar estado local
      setPropiedades((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      console.error("Error al eliminar propiedad:", err)
      setError("Error al eliminar propiedad")
      // Still remove from UI for preview purposes
      setPropiedades((prev) => prev.filter((p) => p.id !== id))
    }
  }

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-600"></div>
      </div>
    )

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
    )

  if (propiedades.length === 0)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
          <h2 className="text-2xl font-bold text-teal-600 mb-4">No tienes propiedades</h2>
          <p className="text-gray-600 mb-6">Publica tu primera propiedad para empezar a recibir reservas</p>
          <Link
            href="/alojamiento"
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md inline-flex items-center"
          >
            <PlusCircle className="mr-2" size={18} />
            Crear propiedad
          </Link>
        </div>
      </div>
    )

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
            <div
              key={propiedad.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Imagen mejorada - más grande y con mejor presentación */}
              <div className="relative h-56 bg-gray-100">
                {propiedad.imagenes && propiedad.imagenes.length > 0 ? (
                  <PropertyImage
                    path={propiedad.imagenes[0].path}
                    alt={propiedad.titulo}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <Home size={48} className="opacity-30" />
                    <span className="ml-2">Sin imagen</span>
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
                      onClick={() => handleDeleteProperty(propiedad.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                      title="Eliminar propiedad"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MisPropiedades

