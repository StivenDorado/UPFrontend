export default function GaleriaImagenes() {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {/* Imagen grande a la izquierda */}
      <div className="relative aspect-square bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
        <div className="absolute top-2 right-2 flex gap-2">
          <button className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
            <svg
              className="h-4 w-4 text-gray-700"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>
        <div className="absolute bottom-2 left-2 bg-white/80 px-3 py-1 rounded-full text-sm text-gray-700">
          Vista principal
        </div>
      </div>

      {/* Columna derecha con dos imágenes */}
      <div className="flex flex-col gap-4">
        {/* Primera imagen pequeña */}
        <div className="relative h-full bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="absolute top-2 right-2 flex gap-2">
            <button className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
              <svg
                className="h-4 w-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </button>
            <button className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
              <svg
                className="h-4 w-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          <div className="absolute bottom-2 left-2 bg-white/80 px-3 py-1 rounded-full text-sm text-gray-700">
            Vista 1
          </div>
        </div>

        {/* Segunda imagen pequeña */}
        <div className="relative h-full bg-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <div className="absolute top-2 right-2 flex gap-2">
            <button className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
              <svg
                className="h-4 w-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </button>
            <button className="h-8 w-8 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors">
              <svg
                className="h-4 w-4 text-gray-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>
          <div className="absolute bottom-2 left-2 bg-white/80 px-3 py-1 rounded-full text-sm text-gray-700">
            Vista 2
          </div>
        </div>
      </div>
    </div>
  );
}