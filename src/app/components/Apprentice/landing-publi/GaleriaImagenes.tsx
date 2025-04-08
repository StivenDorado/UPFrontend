import { useEffect, useState } from "react";

interface GaleriaImagenesProps {
  imagenes?: any[]; // Acepta un array de URLs o de objetos con url
  propiedadId?: string; // ID opcional para cargar imágenes por API
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
    // 1. Si recibimos imágenes directamente como prop
    if (imagenesProps && Array.isArray(imagenesProps) && imagenesProps.length > 0) {
      console.log("Usando imágenes proporcionadas directamente:", imagenesProps);
      
      let urls: string[] = [];
      if (typeof imagenesProps[0] === 'string') {
        // Si el array son strings (URLs directas)
        urls = imagenesProps as string[];
      } else {
        // Si el array son objetos con 'url'
        urls = imagenesProps
          .filter((img: any) => img && img.url)
          .sort((a: any, b: any) => (a.orden || 0) - (b.orden || 0))
          .map((img: any) => img.url);
      }
      setImagenesUrls(urls);
      setLoading(false);
      return;
    }
    
    // 2. Si no tenemos imágenes directas pero tenemos propiedadId, las cargamos vía API
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
            const imagenesOrdenadas = [...data.imagenes].sort((a: Imagen, b: Imagen) => 
              (a.orden || 0) - (b.orden || 0)
            );
            const urls = imagenesOrdenadas.map((img: Imagen) => img.url);
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
      // 3. Si no hay ni imágenes ni ID
      setError("No se proporcionaron imágenes ni ID de propiedad");
      setLoading(false);
    }
  }, [propiedadId, imagenesProps]);

  // 4. Loading
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

  // 5. Error
  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 mb-6">
        <p>Error: {error}</p>
        <p className="text-sm mt-1">Verifica las imágenes o la conexión con la API.</p>
      </div>
    );
  }

  // 6. Sin imágenes
  if (imagenesUrls.length === 0) {
    return (
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 mb-6">
        <p>No hay imágenes disponibles para esta propiedad.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {/* Columna izquierda: imagen principal */}
      <div className="relative">
        <img
          src={imagenesUrls[0]}
          alt="Vista principal"
          className="w-full h-[400px] object-cover rounded-lg"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-image.png";
            console.error("Error al cargar imagen:", imagenesUrls[0]);
          }}
        />
        <div className="absolute bottom-2 left-2 bg-white/80 px-3 py-1 rounded-full text-sm text-gray-700">
          Vista principal
        </div>
      </div>

      {/* Columna derecha: 2 imágenes adicionales, cada una con 200px de alto */}
      <div className="flex flex-col gap-4">
        {imagenesUrls.slice(1, 3).map((img, index) => (
          <div key={index} className="relative">
            <img
              src={img}
              alt={`Vista ${index + 2}`}
              className="w-full h-[200px] object-cover rounded-lg"
              onError={(e) => {
                e.currentTarget.src = "/placeholder-image.png";
                console.error("Error al cargar imagen:", img);
              }}
            />
            <div className="absolute bottom-2 left-2 bg-white/80 px-3 py-1 rounded-full text-sm text-gray-700">
              Vista {index + 2}
            </div>
          </div>
        ))}

        {/* Si solo hay 1 imagen en total, slice(1,3) estará vacío: mostrar placeholders */}
        {imagenesUrls.length === 1 && (
          <>
            <div className="relative h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400 text-sm">No hay imagen adicional</p>
            </div>
            <div className="relative h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-400 text-sm">No hay imagen adicional</p>
            </div>
          </>
        )}
        
        {/* Si solo hay 2 imágenes en total, slice(1,3) mostrará 1 imagen; rellenar la segunda */}
        {imagenesUrls.length === 2 && (
          <div className="relative h-[200px] bg-gray-100 rounded-lg flex items-center justify-center">
            <p className="text-gray-400 text-sm">No hay imagen adicional</p>
          </div>
        )}
      </div>
    </div>
  );
}
