export default function InformacionArrendador() {
  return (
    <div className="rounded-lg p-6 shadow-sm h-full" style={{ backgroundColor: "#F0F7F6", borderColor: "#41BFB3" }}>
      <h3 className="font-medium text-xl mb-6" style={{ color: "#275950" }}>Conoce a tu arrendador</h3>
      
      <div className="rounded-lg p-4 mb-6" style={{ backgroundColor: "white", borderColor: "#41BFB3", border: "1px solid #41BFB3" }}>
        <div className="flex gap-4">
          <div className="h-16 w-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#2A8C82" }}>
            <span className="text-white text-2xl">DL</span>
          </div>
          <div>
            <h4 className="font-medium text-lg" style={{ color: "#275950" }}>David Lossada</h4>
            <p className="text-sm" style={{ color: "#2A8C82" }}>Superarrendador</p>
            
            <div className="mt-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium" style={{ color: "#275950" }}>400</span>
                <span className="text-xs" style={{ color: "#2A8C82" }}>Reseñas</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
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
      
      <p className="text-sm mb-6" style={{ color: "#275950" }}>
        Los Superarrendador tienen mucha experiencia, tienen calificaciones excelentes y se destacan el compromiso para
        ofrecer a los huéspedes estadías magníficas.
      </p>
      
      <div className="mb-6">
        <h4 className="font-medium text-lg mb-3" style={{ color: "#275950" }}>Información sobre el arrendador</h4>
        <p className="text-sm" style={{ color: "#275950" }}>Idioma de respuesta: ES, EN</p>
        <p className="text-sm" style={{ color: "#275950" }}>Tiempo de respuesta: 1 hora</p>
      </div>
      
      <button className="w-full py-3 rounded-lg font-medium hover:bg-opacity-90 transition-colors" 
              style={{ backgroundColor: "#275950", borderColor: "#275950", color: "white" }}>
        Contactar al arrendador
      </button>
      
      
    </div>
  );
}