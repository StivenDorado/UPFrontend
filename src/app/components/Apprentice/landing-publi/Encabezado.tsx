export default function Encabezado() {
    return (
      <header className="border-b p-4">
        <div className="container mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 bg-white rounded-full px-3 py-1 border">
            <span className="font-semibold text-sm">Logo UrbanPress</span>
          </div>
  
          <div className="flex items-center border rounded-full overflow-hidden">
            <div className="border-r px-3 py-2 flex items-center">
              <span className="text-sm">Fecha de Entrada</span>
              <svg
                className="h-4 w-4 ml-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <input
              className="border-none outline-none px-3 py-2 text-sm w-full"
              placeholder="¿En qué barrio quieres vivir?"
            />
            <button className="p-2">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
  
          <div>
            <button className="border rounded-full px-4 py-2 text-sm">Filtros</button>
          </div>
        </div>
      </header>
    )
  }
  
  