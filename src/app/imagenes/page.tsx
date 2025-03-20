"use client";
import React, { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";
import { Button } from "../components/ui/button";
import { X, Plus, Upload } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { storage } from "../../../firebase"; // Ajusta la ruta a tu archivo de configuración
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PhotoUploader() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleAddPhoto = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newPhotos: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Verifica el límite de 5MB
      if (file.size > 5 * 1024 * 1024) {
        setError("El archivo es demasiado grande. El tamaño máximo permitido es 5MB.");
        continue;
      }
      if (!file.type.startsWith("image/")) {
        setError("Solo se permiten archivos de imagen.");
        continue;
      }

      try {
        // Opciones para comprimir la imagen: maxSizeMB: 0.1 => ~100KB
        const options = {
          maxSizeMB: 0.1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };

        const compressedFile = await imageCompression(file, options);
        // Crea una referencia única en Firebase Storage
        const storageRef = ref(storage, `photos/${Date.now()}-${file.name}`);
        // Sube el archivo comprimido
        const snapshot = await uploadBytes(storageRef, compressedFile);
        // Obtén la URL de descarga
        const downloadURL = await getDownloadURL(snapshot.ref);
        newPhotos.push(downloadURL);
      } catch (err) {
        console.error("Error al procesar o subir la imagen:", err);
        setError("Error al procesar o subir la imagen.");
      }
    }
    if (newPhotos.length > 0) {
      setPhotos((prev) => [...prev, ...newPhotos]);
    }
  }, []);

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNextStep = () => {
    // Aquí puedes agregar lógica adicional si es necesario
    router.push("/finalizar");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-semibold mb-2">Agrega algunas fotos de tu minicasa</h1>
        <p className="text-muted-foreground">
          Para empezar, necesitarás cinco fotos. Después podrás agregar más o hacer cambios.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative group aspect-[4/3] border rounded-md overflow-hidden">
            <Image src={photo} alt={`Foto ${index + 1}`} fill className="object-cover" />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        <label
          htmlFor="file-upload"
          className="border-2 border-dashed rounded-md flex flex-col items-center justify-center p-8 aspect-[4/3] hover:bg-muted/50 transition-colors cursor-pointer"
        >
          <Plus size={24} className="mb-2 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Agregar foto</span>
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleAddPhoto}
          className="hidden"
        />
      </div>

      <div className="border-2 border-dashed rounded-lg p-12 flex flex-col items-center justify-center">
        <div className="bg-muted rounded-full p-3 mb-4">
          <Upload className="w-6 h-6 text-muted-foreground" />
        </div>
        <label htmlFor="file-upload" className="mb-2">
          <Button asChild>
            <span>Agrega fotos</span>
          </Button>
        </label>
        <p className="text-sm text-muted-foreground">Arrastra y suelta o haz clic para seleccionar</p>
      </div>

      <Button
        className="w-full py-6 text-lg mt-8 bg-[#2A8C82] text-white"
        onClick={handleNextStep}
      >
        Siguiente
      </Button>
    </div>
  );
}
