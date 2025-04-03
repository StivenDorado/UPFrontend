"use client";

import { useRouter } from "next/navigation";

interface PrecioReservaProps {
  precio: number;
  fechas: {
    llegada?: string;
    salida?: string;
  };
  id: string;
}

export default function PrecioReserva({ precio, fechas, id }: PrecioReservaProps) {
  const router = useRouter();

  const handleReservation = () => {
    if (!id) {
      console.error("No hay ID de propiedad disponible");
      return;
    }
    router.push(`/PropertyPage/${id}`);
  };

  return (
    <div className="border rounded-lg p-6 shadow-sm" style={{ borderColor: "#41BFB3", backgroundColor: "#F0F7F6" }}>
      <div className="flex justify-between items-center mb-6">
        <div className="font-bold text-2xl" style={{ color: "#275950" }}>
          {precio ? `$${precio} COP` : "Precio no disponible"}
        </div>
        <div className="text-sm" style={{ color: "#2A8C82" }}>Mensual</div>
      </div>
      
      <div className="border rounded-lg mb-6" style={{ borderColor: "#91F2E9" }}>
        <div className="grid grid-cols-2 border-b" style={{ borderColor: "#91F2E9" }}>
          <div className="p-3 border-r" style={{ borderColor: "#91F2E9" }}>
            <div className="text-xs" style={{ color: "#2A8C82" }}>LLEGADA</div>
            <div className="text-sm font-medium" style={{ color: "#275950" }}>
              {fechas?.llegada || "N/A"}
            </div>
          </div>
          <div className="p-3">
            <div className="text-xs" style={{ color: "#2A8C82" }}>SALIDA</div>
            <div className="text-sm font-medium" style={{ color: "#275950" }}>
              {fechas?.salida || "N/A"}
            </div>
          </div>
        </div>
        <div className="p-3">
          <div className="text-xs" style={{ color: "#2A8C82" }}>ESTADO</div>
          <div className="text-sm font-medium" style={{ color: "#275950" }}>Disponible</div>
        </div>
      </div>
      
      <button 
        onClick={handleReservation}
        className="w-full mb-4 text-white py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors" 
        style={{ backgroundColor: "#275950", borderColor: "#275950" }}
      >
        RESERVAR
      </button>
      
      <button className="w-full mb-6 border py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors" 
              style={{ borderColor: "#41BFB3", color: "#275950" }}>
        OFRECER PRECIO
      </button>
      
      <div className="text-xs text-center mb-4" style={{ color: "#2A8C82" }}>
        Cobro manual
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between text-sm" style={{ color: "#275950" }}>
          <span>{precio ? `$${precio} COP` : "-"}</span>
          <span>{precio ? `$${precio} COP` : "-"}</span>
        </div>
        <div className="flex justify-between text-sm" style={{ color: "#275950" }}>
          <span>Cuota limpieza</span>
          <span>$50.000 COP</span>
        </div>
        <div className="flex justify-between text-sm border-t pt-3 font-medium" 
             style={{ borderColor: "#41BFB3", color: "#275950" }}>
          <span>Total del costo</span>
          <span>$400.000 COP</span>
        </div>
      </div>
    </div>
  );
}
