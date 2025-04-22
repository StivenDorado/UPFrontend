"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import GaleriaImagenes from "../../components/Apprentice/landing-publi/GaleriaImagenes";
import Servicios from "../../components/Apprentice/landing-publi/Servicios";
import Resenas from "../../components/Apprentice/landing-publi/Resenas";
import InformacionArrendador from "../../components/Apprentice/landing-publi/InformacionArrendador";
import PrecioReserva from "../../components/Apprentice/landing-publi/PrecioReserva";
import Footer from "../../components/general/footer/Footer";
import Header from "../../components/general/header/Headerlg";
interface Propiedad {
  id: string;
  titulo: string;
  precio: number;
  imagenes: string[];
  caracteristicas: any;
  resenas: any[];
  arrendador: any;
  fechasReserva: string[];
}

export default function PaginaPropiedad() {
  const { id } = useParams();
  const [propiedad, setPropiedad] = useState<Propiedad | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("No se proporcionó ID de propiedad");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/api/propiedades/publicacion/${id}`);
        
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        
        const data: Propiedad = await response.json();
        
        if (!data) {
          throw new Error("No se encontraron datos");
        }
        
        setPropiedad(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error desconocido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <div className="p-6 text-center">Cargando...</div>;
  if (error) return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  if (!propiedad) return <div className="p-6 text-center">No se encontró la propiedad</div>;

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4">
        <div className="my-4">
          <h1 className="text-2xl font-bold mt-2">{propiedad.titulo}</h1>
        </div>
        
        <GaleriaImagenes imagenes={propiedad.imagenes || []} />
        <Servicios servicios={propiedad.caracteristicas?.[0] || {}} />
        <Resenas resenas={propiedad.resenas || []} />
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <div className="md:col-span-1 order-2 md:order-1">
          <PrecioReserva 
  precio={propiedad.precio} 
  fechas={propiedad.fechasReserva}
  id={propiedad.id} // ¡Asegúrate de pasar el ID aquí!
/>
          </div>
          <div className="md:col-span-2 order-1 md:order-2">
            {/* <InformacionArrendador 
              arrendador={propiedad.arrendador}
              uid={propiedad.arrendador?.uid}
            /> */}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}