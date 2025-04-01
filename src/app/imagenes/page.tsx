"use client";
import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import { Button } from "../components/ui/button";
import { X, Plus } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { storage } from "../../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function PhotoUploader() {
  const [photos, setPhotos] = useState<{ url: string; path: string }[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const propiedadId = searchParams.get("propiedadId");

  const MAX_PHOTOS = 5;

  // Subir imagen a Firebase
  const handleAddPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setUploading(true);

    for (const file of files) {
      try {
        const compressedFile = await imageCompression(file, { maxSizeMB: 1 });
        const fileName = `${Date.now()}-${compressedFile.name}`;
        const storageRef = ref(storage, `photos/${fileName}`);
        const snapshot = await uploadBytes(storageRef, compressedFile);
        const downloadURL = await getDownloadURL(snapshot.ref);

        setPhotos((prev) => [
          ...prev,
          { url: downloadURL, path: storageRef.fullPath }
        ]);
      } catch (err) {
        console.error("Error al subir la imagen:", err);
        setError("Error al subir la imagen.");
      }
    }
    setUploading(false);
  };

  // Eliminar imagen del estado
  const handleRemovePhoto = (index: number) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Enviar URLs y paths al backend
  const handleNextStep = async () => {
    if (!propiedadId) {
      setError("No se encontró el id de la propiedad.");
      return;
    }
    if (photos.length === 0) {
      setError("Debes subir al menos una foto.");
      return;
    }
  
    const payload = {
      propiedadId: Number(propiedadId),
      imagenes: photos.map((photo, index) => ({
        url: photo.url,
        path: photo.path,
        orden: index,
      })),
    };
  
    try {
      const response = await fetch("http://localhost:4000/api/images", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error en el backend");
  
      console.log("Imágenes guardadas en backend:", data);
      // Redirige usando el id obtenido en los parámetros (propiedadId)
      router.push(`/finalizar/${propiedadId}`);
    } catch (err) {
      console.error("Error al guardar imágenes en el backend:", err);
      setError("Error al guardar imágenes.");
    }
  };
  

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-2 text-center">
        Agrega fotos de tu minicasa
      </h1>

      {error && <div className="text-red-600 mb-4">{error}</div>}
      {uploading && <div className="text-blue-600 mb-4">Subiendo imágenes...</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {photos.map((photo, index) => (
          <div key={index} className="relative group border rounded-md overflow-hidden">
            <Image src={photo.url} alt={`Foto ${index + 1}`} fill className="object-cover" />
            <button onClick={() => handleRemovePhoto(index)} className="absolute top-2 right-2 bg-black text-white p-1 rounded-full">
              <X size={16} />
            </button>
          </div>
        ))}

        {photos.length < MAX_PHOTOS && (
          <label className="border-2 border-dashed rounded-md flex flex-col items-center justify-center p-8 cursor-pointer">
            <Plus size={24} className="mb-2" />
            <span className="text-sm">Agregar foto</span>
            <input id="file-upload" type="file" multiple accept="image/*" onChange={handleAddPhoto} className="hidden" disabled={uploading || photos.length >= MAX_PHOTOS} />
          </label>
        )}
      </div>

      <Button onClick={handleNextStep} disabled={photos.length === 0 || uploading} className="w-full py-6 text-lg bg-[#2A8C82] text-white">
        Siguiente
      </Button>
    </div>
  );
}
