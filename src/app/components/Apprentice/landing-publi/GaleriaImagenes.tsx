import { useEffect, useState } from "react";

interface GaleriaImagenesProps {
  imagenes?: any[]; // Ahora acepta un array de imágenes directamente
  propiedadId?: string; // Hacemos este prop opcional
}

interface Imagen {
  id: number;
  url: string;
  path?: string;
  orden?: number;
}

export default function GaleriaImagenes({ imagenes: imagenesProps, propiedadId }: GaleriaImagenesProps) {
  const [imagenesUrls, setImagenesUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Si recibimos las imágenes directamente como prop, las usamos
    if (imagenesProps && Array.isArray(imagenesProps) && imagenesProps.length > 0) {
      console.log("Usando imágenes proporcionadas directamente:", imagenesProps);
      
      // Procesar las imágenes según su formato
      let urls: string[] = [];
      
      if (typeof imagenesProps[0] === 'string') {
        // Si son strings (URLs directas)
        urls = imagenesProps as string[];
      } else {
        // Si son objetos con una propiedad url
        urls = imagenesProps
          .filter((img: any) => img && img.url)
          .sort((a: any, b: any) => (a.orden || 0) - (b.orden || 0))
          .map((img: any) => img.url);
      }
      
      setImagenesUrls(urls);
      setLoading(false);
      return;
    }
    
    // Si no tenemos imágenes directas pero tenemos propiedadId, las buscamos por API
    if (propiedadId) {
      const fetchImagenes = async () => {
        try {
          setLoading(true);
          console.log(`Obteniendo imágenes para propiedad: ${propiedadId}`);
          
          const response = await fetch(`http://localhost:4000/api/images/${propiedadId}`);
          
          if (!response.ok) {
            throw new Error(`Error ${response.status}: No se pudieron cargar las imágenes`);
          }
          
          const data = await response.json();
          console.log("Datos recibidos de API:", data);
          
          if (data && data.imagenes && Array.isArray(data.imagenes)) {
            // Ordenar imágenes por el campo 'orden' si existe
            const imagenesOrdenadas = [...data.imagenes].sort((a: Imagen, b: Imagen) => 
              (a.orden || 0) - (b.orden || 0)
            );
            
            // Extraer solo las URLs de las imágenes
            const urls = imagenesOrdenadas.map((img: Imagen) => img.url);
            console.log("URLs procesadas:", urls);
            setImagenesUrls(urls);
          } else {
            console.error("Formato de datos inesperado", data);
            setError("Formato de datos inesperado");
          }
        } catch (error: any) {
          console.error("Error al obtener imágenes:", error);
          setError(error.message || "Error al cargar las imágenes");
        } finally {
          setLoading(false);
        }
      };

      fetchImagenes();
    } else {
      // Si no tenemos ni imágenes ni propiedadId, es un error
      setError("No se proporcionaron imágenes ni ID de propiedad");
      setLoading(false);
    }
  }, [propiedadId, imagenesProps]);

  // Mensaje de carga
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="aspect-square bg-gray-100 rounded-lg animate-pulse"></div>
        <div className="flex flex-col gap-4">
          <div className="h-full bg-gray-100 rounded-lg animate-pulse"></div>
          <div className="h-full bg-gray-100 rounded-lg animate-pulse"></div>
        </div>
      </div>
    );
  }

  // Mensaje de error
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 mb-6">
        <p>Error: {error}</p>
        <p className="text-sm mt-1">Verifica las imágenes proporcionadas o la conexión con la API.</p>
      </div>
    );
  }

  // Si no hay imágenes
  if (imagenesUrls.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 mb-6">
        <p>No hay imágenes disponibles para esta propiedad.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {/* Imagen principal */}
      <div className="relative aspect-square bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <img
          src={imagenesUrls[0]}
          alt="Imagen principal"
          className="w-full h-full object-cover rounded-lg"
          onError={(e) => {
            // Fallback si la imagen no carga
            e.currentTarget.src = "/placeholder-image.png";
            console.error("Error al cargar imagen:", imagenesUrls[0]);
          }}
        />
        <div className="absolute bottom-2 left-2 bg-white/80 px-3 py-1 rounded-full text-sm text-gray-700">
          Vista principal
        </div>
      </div>

      {/* Imágenes adicionales */}
      <div className="flex flex-col gap-4">
        {imagenesUrls.length > 1 ? (
          imagenesUrls.slice(1, 3).map((img, index) => (
            <div key={index} className="relative h-full bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <img 
                src={img} 
                alt={`Vista ${index + 1}`} 
                className="w-full h-full object-cover rounded-lg" 
                onError={(e) => {
                  // Fallback si la imagen no carga
                  e.currentTarget.src = "/placeholder-image.png";
                  console.error("Error al cargar imagen:", img);
                }}
              />
              <div className="absolute bottom-2 left-2 bg-white/80 px-3 py-1 rounded-full text-sm text-gray-700">
                Vista {index + 1}
              </div>
            </div>
          ))
        ) : (
          // Si solo hay una imagen, mostrar placeholders
          Array(2).fill(0).map((_, index) => (
            <div key={index} className="relative h-full bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400 text-sm">No hay imagen adicional</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}