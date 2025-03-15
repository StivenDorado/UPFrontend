export default function InformacionArrendador() {
  return (
    <div className="rounded-lg p-6" style={{ backgroundColor: "#91F2E9", borderColor: "#41BFB3" }}>
      <h3 className="font-medium mb-4" style={{ color: "#275950" }}>Conoce a tu arrendador</h3>
      
      <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: "white", borderColor: "#41BFB3", border: "1px solid #41BFB3" }}>
        <div className="flex gap-4">
          <div className="h-16 w-16 rounded-full" style={{ backgroundColor: "#2A8C82" }}></div>
          <div>
            <h4 className="font-medium" style={{ color: "#275950" }}>David Lossada</h4>
            <p className="text-sm" style={{ color: "#2A8C82" }}>Superarrendador</p>
            
            <div className="mt-2">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium" style={{ color: "#275950" }}>400</span>
                <span className="text-xs" style={{ color: "#2A8C82" }}>Reseñas</span>
              </div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium" style={{ color: "#275950" }}>4.52</span>
                <span className="text-xs" style={{ color: "#2A8C82" }}>Calificación</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium" style={{ color: "#275950" }}>3</span>
                <span className="text-xs" style={{ color: "#2A8C82" }}>Años arrendando</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <p className="text-sm mb-4" style={{ color: "#275950" }}>
        Los Superarrendador tienen mucha experiencia, tienen calificaciones excelentes y se destacan el compromiso para
        ofrecer a los huéspedes estadías magníficas.
      </p>
      
      <div className="mb-4">
        <h4 className="font-medium mb-2" style={{ color: "#275950" }}>Información sobre el arrendador</h4>
        <p className="text-sm" style={{ color: "#275950" }}>Idioma de respuesta: ES, EN</p>
        <p className="text-sm" style={{ color: "#275950" }}>Tiempo de respuesta: 1 hora</p>
      </div>
      
      <button className="py-2 px-4 rounded mb-6 text-white" 
              style={{ backgroundColor: "#275950", borderColor: "#275950" }}>
        Contactar al arrendador
      </button>
      
      <div className="text-xs text-center" style={{ color: "#2A8C82" }}>
        <p>Logo Urban Point</p>
        <p className="mt-2">
          Para proteger tus pagos, nunca transfieras dinero ni te comuniques fuera de la página o la aplicación de Urban
          Point.
        </p>
      </div>
    </div>
  )
}