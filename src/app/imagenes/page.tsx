"use client"
import type React from "react"
import { useState, useRef } from "react"
import imageCompression from "browser-image-compression"
import { Button } from "../components/ui/button"
import { X, Loader2, ImageIcon } from "lucide-react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { storage } from "../../../firebase"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

export default function PhotoUploader() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const searchParams = useSearchParams()
  const propiedadId = searchParams.get("propiedadId")

  const MAX_PHOTOS = 5

  // Generar previews de las imágenes seleccionadas
  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return

    const files = Array.from(e.target.files)

    // Verificar si excede el límite
    if (selectedFiles.length + files.length > MAX_PHOTOS) {
      setError(`Solo puedes subir hasta ${MAX_PHOTOS} fotos.`)
      return
    }

    setError(null)

    // Crear previews para las imágenes seleccionadas
    const newFiles = [...selectedFiles]
    const newPreviews = [...previews]

    files.forEach((file) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          newPreviews.push(e.target.result as string)
          setPreviews([...newPreviews])
        }
      }
      reader.readAsDataURL(file)
      newFiles.push(file)
    })

    setSelectedFiles(newFiles)
  }

  // Eliminar imagen del estado
  const handleRemovePhoto = (index: number) => {
    const newFiles = [...selectedFiles]
    const newPreviews = [...previews]

    newFiles.splice(index, 1)
    newPreviews.splice(index, 1)

    setSelectedFiles(newFiles)
    setPreviews(newPreviews)
  }

  // Subir todas las imágenes a Firebase y luego al backend
  const handleNextStep = async () => {
    if (!propiedadId) {
      setError("No se encontró el id de la propiedad.")
      return
    }

    if (selectedFiles.length === 0) {
      setError("Debes subir al menos una foto.")
      return
    }

    setUploading(true)
    setError(null)

    try {
      const uploadedPhotos = []

      // Subir cada imagen a Firebase
      for (let i = 0; i < selectedFiles.length; i++) {
        const file = selectedFiles[i]

        // Actualizar progreso
        setUploadProgress(Math.round((i / selectedFiles.length) * 50))

        // Comprimir imagen
        const compressedFile = await imageCompression(file, { maxSizeMB: 1 })
        const fileName = `${Date.now()}-${compressedFile.name}`
        const storageRef = ref(storage, `photos/${fileName}`)

        // Subir a Firebase
        const snapshot = await uploadBytes(storageRef, compressedFile)
        const downloadURL = await getDownloadURL(snapshot.ref)

        uploadedPhotos.push({
          url: downloadURL,
          path: storageRef.fullPath,
        })
      }

      // Actualizar progreso a 50%
      setUploadProgress(50)

      // Enviar datos al backend
      const payload = {
        propiedadId: Number(propiedadId),
        imagenes: uploadedPhotos.map((photo, index) => ({
          url: photo.url,
          path: photo.path,
          orden: index,
        })),
      }

      const response = await fetch("http://localhost:4000/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      // Actualizar progreso a 100%
      setUploadProgress(100)

      const data = await response.json()
      if (!response.ok) throw new Error(data.error || "Error en el backend")

      console.log("Imágenes guardadas en backend:", data)
      router.push(`/finalizar/${propiedadId}`)
    } catch (err) {
      console.error("Error al procesar imágenes:", err)
      setError("Error al procesar las imágenes. Inténtalo de nuevo.")
      setUploading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 bg-white rounded-lg shadow-sm">
      <h1 className="text-2xl font-semibold mb-2 text-center text-[#275950]">Agrega fotos de tu alojamiento</h1>
      <p className="text-center text-gray-600 mb-6">Las fotos ayudan a los huéspedes a visualizar tu espacio</p>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 flex items-center">
          <span>{error}</span>
        </div>
      )}

      {uploading && (
        <div className="bg-[#9BF2EA]/20 border border-[#41BFB3] text-[#275950] px-4 py-3 rounded-md mb-4">
          <div className="flex items-center mb-2">
            <Loader2 className="animate-spin mr-2" size={18} />
            <span>Procesando imágenes... {uploadProgress}%</span>
          </div>
          <div className="w-full bg-[#9BF2EA]/30 rounded-full h-2">
            <div
              className="bg-[#41BFB3] h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {previews.map((preview, index) => (
          <div key={index} className="relative group border rounded-md overflow-hidden h-48 bg-gray-100">
            <Image src={preview || "/placeholder.svg"} alt={`Foto ${index + 1}`} fill className="object-cover" />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white p-1.5 rounded-full transition-all"
              disabled={uploading}
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {previews.length < MAX_PHOTOS && (
          <label
            className={`border-2 border-dashed rounded-md flex flex-col items-center justify-center p-8 cursor-pointer h-48 transition-all ${
              uploading
                ? "bg-gray-100 border-gray-300"
                : "bg-[#9BF2EA]/10 border-[#41BFB3]/40 hover:border-[#41BFB3] hover:bg-[#9BF2EA]/20"
            }`}
          >
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-[#9BF2EA]/30 flex items-center justify-center mb-3">
                <ImageIcon size={24} className="text-[#2A8C82]" />
              </div>
              <span className="text-sm font-medium text-[#275950]">Agregar foto</span>
              <span className="text-xs text-gray-500 mt-1">
                {previews.length > 0 ? `${previews.length} de ${MAX_PHOTOS} fotos` : `Máximo ${MAX_PHOTOS} fotos`}
              </span>
            </div>
            <input
              ref={fileInputRef}
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleSelectFiles}
              className="hidden"
              disabled={uploading || previews.length >= MAX_PHOTOS}
            />
          </label>
        )}
      </div>

      <Button
        onClick={handleNextStep}
        disabled={previews.length === 0 || uploading}
        className="w-full py-6 text-lg bg-[#2A8C82] hover:bg-[#275950] text-white transition-colors"
      >
        {uploading ? (
          <span className="flex items-center">
            <Loader2 className="animate-spin mr-2" size={18} />
            Procesando...
          </span>
        ) : (
          "Siguiente"
        )}
      </Button>

      <p className="text-center text-xs text-gray-500 mt-4">Las fotos se subirán cuando hagas clic en "Siguiente"</p>
    </div>
  )
}
