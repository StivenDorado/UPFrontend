"use client"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { X, Plus, Camera } from "lucide-react"
import Image from "next/image"

export default function PhotoUploader() {
  const [photos, setPhotos] = useState([
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
    "/placeholder.svg?height=200&width=300",
  ])

  const handleAddPhoto = () => {
    // En una implementación real, esto abriría un selector de archivos
    const newPhoto = "/placeholder.svg?height=200&width=300"
    setPhotos([...photos, newPhoto])
  }

  const handleRemovePhoto = (index: number) => {
    const newPhotos = [...photos]
    newPhotos.splice(index, 1)
    setPhotos(newPhotos)
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold mb-2">Agrega algunas fotos de tu minicasa</h1>
        <p className="text-muted-foreground">
          Para empezar, necesitarás cinco fotos. Después podrás agregar más o hacer cambios.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative group aspect-[4/3] border rounded-md overflow-hidden">
            <Image src={photo || "/placeholder.svg"} alt={`Foto ${index + 1}`} fill className="object-cover" />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        <button
          onClick={handleAddPhoto}
          className="border-2 border-dashed rounded-md flex flex-col items-center justify-center p-8 aspect-[4/3] hover:bg-muted/50 transition-colors"
        >
          <Plus size={24} className="mb-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Agregar foto</span>
        </button>
      </div>

      <div className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center">
        <div className="bg-muted rounded-full p-3 mb-4">
          <Camera className="w-6 h-6 text-muted-foreground" />
        </div>
        <Button onClick={handleAddPhoto} className="mb-2">
          Agrega fotos
        </Button>
        <p className="text-sm text-muted-foreground">Arrastra y suelta o haz clic para seleccionar</p>
      </div>
    </div>
  )
}

