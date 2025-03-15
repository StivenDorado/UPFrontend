export default function Resenas() {
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="font-medium">Reseñas:</h3>
          <div className="flex items-center">
            <svg
              className="h-4 w-4 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
            <span className="text-sm ml-1">4.5</span>
          </div>
          <span className="text-sm text-gray-500">(3 calificaciones)</span>
        </div>
  
        <div className="flex items-center gap-2 mb-4">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <input className="rounded-full border px-3 py-2 w-full text-sm" placeholder="Deja tu reseña..." />
          <button className="p-2">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M22 2L11 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
  
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Juan</p>
              <p className="text-xs text-gray-500">5.0</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Cristhian</p>
              <p className="text-xs text-gray-500">4.0</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Julian</p>
              <p className="text-xs text-gray-500">4.5</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Sebas</p>
              <p className="text-xs text-gray-500">4.8</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Kevin</p>
              <p className="text-xs text-gray-500">4.2</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
            <div>
              <p className="text-sm font-medium">Muriel</p>
              <p className="text-xs text-gray-500">4.7</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  