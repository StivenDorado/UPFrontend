"use client"
import { useEffect, useState } from "react"
import { Home, PlusCircle } from "lucide-react"
import Link from "next/link"
import { useAuth } from "../../../context/AuthContext"
import { useRouter } from "next/navigation"
import PropertyCard, { Propiedad } from "../Profile/CardPropiedad" // Import the new component

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
    imagenes: [{ 
      path: "propiedades/1/foto-principal.jpg", // Ruta de Firebase
      url: "" // Opcional: puedes agregar una URL directa aquí
    }],
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
    imagenes: [{ 
      path: "propiedades/2/foto-principal.jpg" 
    }],
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
  
  const handleToggleStatus = (id: number) => {
    setPropiedades(prev => 
      prev.map(p => 
        p.id === id 
          ? {...p, estado: p.estado === "activa" ? "inactiva" : "activa"} 
          : p
      )
    )
    
    // Here you would also call your API to update the status
    // if you have a backend implementation
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
            <PropertyCard 
              key={propiedad.id} 
              propiedad={propiedad} 
              onDelete={handleDeleteProperty}
              onToggleStatus={handleToggleStatus}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default MisPropiedades