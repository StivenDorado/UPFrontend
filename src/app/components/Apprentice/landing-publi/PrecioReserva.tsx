import Link from "next/link";

export default function PrecioReserva() {
  return (
    <div className="border rounded-lg p-4 shadow-sm" style={{ borderColor: "#41BFB3" }}>
      <div className="flex justify-between items-center mb-4">
        <div className="font-bold" style={{ color: "#275950" }}>$350.000 COP</div>
        <div className="text-xs" style={{ color: "#2A8C82" }}>Mensual</div>
      </div>
      
      <div className="border rounded-lg mb-4" style={{ borderColor: "#91F2E9" }}>
        <div className="grid grid-cols-2 border-b" style={{ borderColor: "#91F2E9" }}>
          <div className="p-2 border-r" style={{ borderColor: "#91F2E9" }}>
            <div className="text-xs" style={{ color: "#2A8C82" }}>LLEGADA</div>
            <div className="text-sm" style={{ color: "#275950" }}>12/05/2023</div>
          </div>
          <div className="p-2">
            <div className="text-xs" style={{ color: "#2A8C82" }}>SALIDA</div>
            <div className="text-sm" style={{ color: "#275950" }}>12/06/2023</div>
          </div>
        </div>
        <div className="p-2">
          <div className="text-xs" style={{ color: "#2A8C82" }}>ESTADO</div>
          <div className="text-sm" style={{ color: "#275950" }}>Disponible</div>
        </div>
      </div>
      
      <Link href="/PropertyPage">
        <button className="w-full mb-2 text-white py-2 rounded" 
                style={{ backgroundColor: "#275950", borderColor: "#275950" }}>
          RESERVAR
        </button>
      </Link>
      
      <button className="w-full mb-4 border py-2 rounded" 
              style={{ borderColor: "#41BFB3", color: "#275950" }}>
        OFRECER PRECIO
      </button>
      
      <div className="text-xs text-center mb-2" style={{ color: "#2A8C82" }}>
        Cobro manual
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm" style={{ color: "#275950" }}>
          <span>$350.000 COP</span>
          <span>$350.000 COP</span>
        </div>
        <div className="flex justify-between text-sm" style={{ color: "#275950" }}>
          <span>Cuota limpieza</span>
          <span>$50.000 COP</span>
        </div>
        <div className="flex justify-between text-sm border-t pt-2" 
             style={{ borderColor: "#41BFB3", color: "#275950" }}>
          <span>Total del costo</span>
          <span>$400.000 COP</span>
        </div>
      </div>
    </div>
  )
}