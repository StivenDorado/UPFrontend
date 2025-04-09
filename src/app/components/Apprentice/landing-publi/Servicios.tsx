"use client";

import { useEffect, useState } from "react";
import {
  Wifi,
  Zap,
  Tv,
  Utensils,
  Droplets,
  Car,
  Refrigerator,
  Flame,
  Trees,
  Waves,
  Mountain,
  Home,
  Sofa,
  Dog,
  Check,
  Sparkles,
  Sun
} from 'lucide-react';

export default function Servicios({ servicios = {} }) {
  const [serviciosLista, setServiciosLista] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (servicios && typeof servicios === 'object') {
      const serviciosDisponibles = Object.entries(servicios)
        .filter(([key, value]) => typeof value === "boolean" && value)
        .map(([key]) => key);
      
      setServiciosLista(serviciosDisponibles);
    } else {
      setServiciosLista([]);
    }
  }, [servicios]);

  if (serviciosLista.length === 0) {
    return (
      <div className="mb-6">
        <h3 className="font-medium mb-3">Servicios que este lugar ofrece:</h3>
        <p>No hay servicios disponibles.</p>
      </div>
    );
  }

  const iconos = {
    wifi: <Wifi className="h-5 w-5" />,
    energia: <Zap className="h-5 w-5" />,
    tv: <Tv className="h-5 w-5" />,
    cocina: <Utensils className="h-5 w-5" />,
    agua: <Droplets className="h-5 w-5" />,
    garaje: <Car className="h-5 w-5" />,
    lavadora: <Sparkles className="h-5 w-5" />,
    nevera: <Refrigerator className="h-5 w-5" />,
    gas: <Flame className="h-5 w-5" />,
    jardin: <Trees className="h-5 w-5" />,
    piscina: <Waves className="h-5 w-5" />,
    vista_montana: <Mountain className="h-5 w-5" />,
    terraza: <Sun className="h-5 w-5" />,
    amoblado: <Sofa className="h-5 w-5" />,
    acepta_mascotas: <Dog className="h-5 w-5" />,
  };

  return (
    <div className="mb-6">
      <h3 className="font-medium mb-3">Servicios que este lugar ofrece:</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {serviciosLista.map((servicio, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="h-5 w-5 flex items-center justify-center">
              {iconos[servicio.toLowerCase()] || <Check className="h-5 w-5" />}
            </div>
            <span className="text-sm capitalize">{servicio.replace("_", " ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}