"use client";
import React, { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import {
  CheckCircle,
  ExternalLink,
  Edit,
  Share2,
  Calendar,
  Star,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../../components/ui/card";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { app } from "../../../../firebase";

// Definición de las características de la propiedad
interface Caracteristica {
  id: number;
  tipo_vivienda: string;
  habitaciones: number;
  banos: number;
  wifi: boolean;
  energia: boolean;
  tv: boolean;
  cocina: boolean;
  agua: boolean;
  garaje: boolean;
  lavadora: boolean;
  nevera: boolean;
  gas: boolean;
  estacionamientos: number;
  jardin: boolean;
  piscina: boolean;
  vista_montana: boolean;
  terraza: boolean;
  amoblado: boolean;
  acepta_mascotas: boolean;
}

// Actualización del tipo de propiedad incluyendo los nuevos campos
interface Propiedad {
  id: number;
  titulo: string;
  descripcion: string;
  direccion: string;
  precio: number;
  estado: string;
  lat: number;
  lng: number;
  arrendador_uid: string;
  fecha_creacion: string;
  fecha_actualizacion: string;
  imagenes?: { path: string; url?: string }[];
  caracteristicas?: Caracteristica[];
}

// Componente para cargar la imagen usando la URL obtenida desde Firebase Storage o mostrar un fallback
const PropertyImage = ({
  url,
  alt = "",
  className = "",
}: {
  url?: string;
  alt?: string;
  className?: string;
}) => {
  const [imgUrl, setImgUrl] = useState(url || "");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!url) {
      setError("No se proporcionó URL de la imagen");
      setLoading(false);
      return;
    }
    setImgUrl(url);
    setLoading(false);
  }, [url]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2" style={{ borderColor: "#2A8C82 transparent" }}></div>
      </div>
    );
  }

  if (error || !imgUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center text-[#275950]">
        <span>Imagen no disponible</span>
      </div>
    );
  }

  return (
    <img
      src={imgUrl}
      alt={alt}
      className={className}
      onError={() => setError("Error al cargar la imagen")}
    />
  );
};

function formatPrecio(precio: number | string | undefined): string {
  if (!precio) return "$0";
  const p = typeof precio === "string" ? parseFloat(precio) : precio;
  return `$${p.toLocaleString("es-CO")}`;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" });
}

export default function ConfirmationPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Propiedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Creamos una referencia estable a Firebase Storage
  const storage = useMemo(() => getStorage(app), []);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/propiedades/publicacion/${id}`);
        if (!res.ok) {
          throw new Error("Error al obtener la propiedad");
        }
        const data: Propiedad = await res.json();

        if (data.imagenes && data.imagenes.length > 0) {
          const imagenesConUrls = await Promise.all(
            data.imagenes.map(async (imagen) => {
              try {
                const storageRef = ref(storage, imagen.path);
                const url = await getDownloadURL(storageRef);
                return { ...imagen, url };
              } catch (err) {
                console.error("Error en imagen", imagen.path, err);
                return { ...imagen, url: "/imagen-fallback.jpg" };
              }
            })
          );
          setProperty({ ...data, imagenes: imagenesConUrls });
        } else {
          setProperty(data);
        }
        setError(null);
      } catch (err: any) {
        setError(err.message || "Error al cargar la publicación");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  if (loading) return <p className="text-center text-[#275950]">Cargando publicación...</p>;
  if (error || !property)
    return <p className="text-center text-[#260101]">{error || "Propiedad no encontrada"}</p>;

  return (
    <div className="min-h-screen  flex flex-col">
      <main className="flex-1 py-12">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <CheckCircle className="h-16 w-16" style={{ color: "#2A8C82" }} />
            </div>
            <h1 className="text-3xl font-bold mb-3" style={{ color: "#275950" }}>
              ¡Tu publicación ha sido registrada con éxito!
            </h1>
            <p className="text-lg mb-8" style={{ color: "#275950" }}>
              Tu espacio ya está disponible para que los huéspedes lo descubran.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {/* Al hacer clic, redirige a la sección de propiedades del perfil */}
              <Link href="/profile?section=propiedades" passHref>
                <Button className="gap-2" style={{ backgroundColor: "#2A8C82", color: "#FFF" }}>
                  <ExternalLink size={18} />
                  Ver publicación
                </Button>
              </Link>
              <Button variant="outline" className="gap-2" style={{ borderColor: "#41BFB3", color: "#2A8C82" }}>
                <Edit size={18} />
                Editar publicación
              </Button>
              <Button variant="outline" className="gap-2" style={{ borderColor: "#41BFB3", color: "#2A8C82" }}>
                <Share2 size={18} />
                Compartir
              </Button>
            </div>
          </div>

          {/* Card principal con imagen y datos básicos */}
          <Card className="overflow-hidden border shadow-lg" style={{ borderColor: "#41BFB3" }}>
            <div className="relative aspect-video">
              {property.imagenes && property.imagenes.length > 0 ? (
                <PropertyImage
                  url={property.imagenes[0].url}
                  alt="Vista previa de tu espacio"
                  className="object-cover w-full h-full"
                />
              ) : (
                <Image
                  src="/placeholder.svg?height=400&width=800"
                  alt="Vista previa de tu espacio"
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-semibold mb-1" style={{ color: "#275950" }}>
                    {property.titulo}
                  </h2>
                  <p style={{ color: "#275950" }}>{property.direccion}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4" style={{ color: "#2A8C82" }} />
                  <span className="font-medium" style={{ color: "#275950" }}>Nuevo</span>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between py-3 border-t" style={{ borderColor: "#41BFB3" }}>
                  <div className="font-medium" style={{ color: "#275950" }}>Precio por noche</div>
                  <div className="font-semibold" style={{ color: "#260101" }}>{formatPrecio(property.precio)}</div>
                </div>
                <div className="flex justify-between py-3 border-t" style={{ borderColor: "#41BFB3" }}>
                  <div className="font-medium" style={{ color: "#275950" }}>Estado</div>
                  <div className="px-2 py-1 rounded-full text-sm font-medium" style={{ backgroundColor: "#2A8C82", color: "#FFF" }}>
                    Publicado
                  </div>
                </div>
                <div className="flex justify-between py-3 border-t" style={{ borderColor: "#41BFB3" }}>
                  <div className="font-medium" style={{ color: "#275950" }}>Disponibilidad</div>
                  <div className="flex items-center gap-2" style={{ color: "#275950" }}>
                    <Calendar className="h-4 w-4" style={{ color: "#2A8C82" }} />
                    <span>Disponible ahora</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Sección de información adicional */}
          <div className="mt-10">
            <Card className="border shadow-lg" style={{ borderColor: "#41BFB3" }}>
              <CardContent className="p-6">
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#275950" }}>Información Detallada</h3>
                <p className="mb-3" style={{ color: "#275950" }}>
                  <strong>Descripción:</strong> {property.descripcion}
                </p>
                <p className="mb-3" style={{ color: "#275950" }}>
                  <strong>Fecha de Creación:</strong> {formatDate(property.fecha_creacion)}
                </p>
                <p className="mb-3" style={{ color: "#275950" }}>
                  <strong>Fecha de Actualización:</strong> {formatDate(property.fecha_actualizacion)}
                </p>
                {property.caracteristicas && property.caracteristicas.length > 0 && (
                  <div>
                    <h4 className="text-xl font-semibold mb-2" style={{ color: "#2A8C82" }}>
                      Características:
                    </h4>
                    <ul className="list-disc ml-5" style={{ color: "#275950" }}>
                      <li><strong>Tipo de Vivienda:</strong> {property.caracteristicas[0].tipo_vivienda}</li>
                      <li><strong>Habitaciones:</strong> {property.caracteristicas[0].habitaciones}</li>
                      <li><strong>Baños:</strong> {property.caracteristicas[0].banos}</li>
                      <li><strong>Wifi:</strong> {property.caracteristicas[0].wifi ? "Sí" : "No"}</li>
                      <li><strong>Energía:</strong> {property.caracteristicas[0].energia ? "Sí" : "No"}</li>
                      <li><strong>TV:</strong> {property.caracteristicas[0].tv ? "Sí" : "No"}</li>
                      <li><strong>Cocina:</strong> {property.caracteristicas[0].cocina ? "Sí" : "No"}</li>
                      <li><strong>Agua:</strong> {property.caracteristicas[0].agua ? "Sí" : "No"}</li>
                      <li><strong>Garaje:</strong> {property.caracteristicas[0].garaje ? "Sí" : "No"}</li>
                      <li><strong>Lavadora:</strong> {property.caracteristicas[0].lavadora ? "Sí" : "No"}</li>
                      <li><strong>Nevera:</strong> {property.caracteristicas[0].nevera ? "Sí" : "No"}</li>
                      <li><strong>Gas:</strong> {property.caracteristicas[0].gas ? "Sí" : "No"}</li>
                      <li><strong>Estacionamientos:</strong> {property.caracteristicas[0].estacionamientos}</li>
                      <li><strong>Jardín:</strong> {property.caracteristicas[0].jardin ? "Sí" : "No"}</li>
                      <li><strong>Piscina:</strong> {property.caracteristicas[0].piscina ? "Sí" : "No"}</li>
                      <li><strong>Terraza:</strong> {property.caracteristicas[0].terraza ? "Sí" : "No"}</li>
                      <li><strong>Amoblado:</strong> {property.caracteristicas[0].amoblado ? "Sí" : "No"}</li>
                      <li><strong>Acepta Mascotas:</strong> {property.caracteristicas[0].acepta_mascotas ? "Sí" : "No"}</li>
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
