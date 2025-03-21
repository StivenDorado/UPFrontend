"use client";
import React, { useState, useCallback } from "react";
import imageCompression from "browser-image-compression";
import { Button } from "../components/ui/button";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PhotoUploader() {
  const [photos, setPhotos] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  const MAX_PHOTOS = 5;

  const handleAddPhoto = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    if (photos.length + files.length > MAX_PHOTOS) {
      setError(`No puedes subir más de ${MAX_PHOTOS} fotos.`);
      return;
    }

    setUploading(true);
    setError(null);

    const newPhotos: string[] = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      if (file.size > 5 * 1024 * 1024) {
        setError("El archivo es demasiado grande. El tamaño máximo permitido es 5MB.");
        continue;
      }
      if (!file.type.startsWith("image/")) {
        setError("Solo se permiten archivos de imagen.");
        continue;
      }

      try {
        const options = { maxSizeMB: 0.1, maxWidthOrHeight: 1920, useWebWorker: true };
        const compressedFile = await imageCompression(file, options);
        const storageRef = ref(storage, `photos/${Date.now()}-${file.name}`);
        const snapshot = await uploadBytes(storageRef, compressedFile);
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
    setUploading(false);
  }, [photos]);

  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Función actualizada: ya no se envían las imágenes al backend
  const handleNextStep = async () => {
    if (photos.length === 0) {
      setError("Debes subir al menos una foto.");
      return;
    }
    // Aquí podrías, opcionalmente, guardar los URLs en Firestore o realizar otra acción.
    console.log("Fotos guardadas en Firebase Storage:", photos);
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

      {uploading && (
        <div className="mb-4 p-4 bg-blue-100 border border-blue-400 text-blue-700 rounded-md">
          Subiendo imágenes...
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative group aspect-[4/3] border rounded-md overflow-hidden">
            <Image
              src={photo}
              alt={`Foto ${index + 1}`}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
            <button
              onClick={() => handleRemovePhoto(index)}
              className="absolute top-2 right-2 bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {photos.length < MAX_PHOTOS && (
          <label
            htmlFor="file-upload"
            className="border-2 border-dashed rounded-md flex flex-col items-center justify-center p-8 aspect-[4/3] hover:bg-muted/50 transition-colors cursor-pointer"
          >
            <Plus size={24} className="mb-2 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Agregar foto</span>
          </label>
        )}
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          onChange={handleAddPhoto}
          className="hidden"
          disabled={uploading || photos.length >= MAX_PHOTOS}
        />
      </div>

      <Button
        className="w-full py-6 text-lg mt-8 bg-[#2A8C82] text-white"
        onClick={handleNextStep}
        disabled={photos.length === 0 || uploading}
      >
        Siguiente
      </Button>
    </div>
  );
}
