export default function ContactForm() {
    return (
      <div className="max-w-md mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold">QUEREMOS QUE TU EXPERIENCIA SEA CÓMODA</h1>
        </header>
  
        <div className="space-y-6">
          <form className="space-y-6">
            <div>
              <label className="block font-semibold mb-2">NOMBRES</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
  
            <div>
              <label className="block font-semibold mb-2">APELLIDOS</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
  
            <div>
              <label className="block font-semibold mb-2">Tipo de documento</label>
              <select className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black">
                <option value="">Seleccione un documento</option>
                <option value="citizenship">Cesión de Ciudadanía</option>
                <option value="identity">Tarjeta de Identidad</option>
                <option value="passport">Pasaporte</option>
              </select>
            </div>
  
            <div>
              <label className="block font-semibold mb-2">NÚMERO DE DOCUMENTO</label>
              <input 
                type="text" 
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
  
            <div>
              <label className="block font-semibold mb-2">¿QUÉ PROBLEMA TIENES?</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-black"
              />
            </div>
  
            <div className="text-center">
              <button 
                type="submit"
                className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors w-full max-w-xs"
              >
                ENVIAR
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  }