import React from 'react';
import { Heart } from 'lucide-react';

const ListaFavoritos = () => {
  const propiedadesFavoritas = [
    {
      id: 1,
      titulo: 'Apartamento moderno en el centro',
      ubicacion: 'Centro de la ciudad',
      habitaciones: 2,
      banos: 1,
      precio: 1200000,
      imagen: '/placeholder.jpg'
    },
    {
      id: 2,
      titulo: 'Casa amplia con jardín',
      ubicacion: 'Zona residencial',
      habitaciones: 4,
      banos: 3,
      precio: 2500000,
      imagen: '/placeholder.jpg'
    },
    {
      id: 3,
      titulo: 'Estudio cerca de la universidad',
      ubicacion: 'Barrio universitario',
      habitaciones: 1,
      banos: 1,
      precio: 800000,
      imagen: '/placeholder.jpg'
    }
  ];

  const formatPrecio = (precio) => {
    return `$ ${precio.toLocaleString()}`;
  };

  const toggleFavorito = (id) => {
    console.log(`Toggleado favorito para propiedad ${id}`);
    // Aquí iría la lógica para añadir/quitar de favoritos
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-600 p-4 text-white flex justify-center items-center">
        <Heart className="mr-2" size={24} fill="white" />
        <h1 className="text-xl font-bold">LISTA DE FAVORITOS</h1>
      </header>

      {/* Grid de propiedades */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {propiedadesFavoritas.map((propiedad) => (
            <div key={propiedad.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              {/* Imagen con botón de favorito */}
              <div className="relative bg-gray-200 h-48 flex items-center justify-center">
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                </div>
                <button 
                  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100"
                  onClick={() => toggleFavorito(propiedad.id)}
                >
                  <Heart size={20} className="text-teal-600" fill="#0d9488" />
                </button>
              </div>
              
              {/* Información de la propiedad */}
              <div className="p-4">
                <h3 className="font-semibold text-lg text-teal-800 mb-2">{propiedad.titulo}</h3>
                <p className="text-sm text-gray-600 flex items-center mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-gray-500">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {propiedad.ubicacion}
                </p>
                
                <div className="flex items-center mb-3">
                  <div className="flex items-center mr-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-gray-500">
                      <path d="M3 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H3Z" />
                      <path d="M15 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2h-6Z" />
                      <path d="M9 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H9Z" />
                      <rect width="18" height="4" x="3" y="10" rx="1" />
                      <path d="M5 10V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v4" />
                    </svg>
                    {propiedad.habitaciones}
                  </div>
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1 text-gray-500">
                      <path d="M8 2v2" />
                      <path d="M16 2v2" />
                      <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7" />
                      <path d="M3 10h18" />
                      <path d="M16 19h6" />
                      <path d="M19 16v6" />
                    </svg>
                    {propiedad.banos}
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-4">
                  <span className="text-teal-600 font-bold text-lg">
                    {formatPrecio(propiedad.precio)}
                  </span>
                </div>
                
                {/* Botones de acción */}
                <div className="flex justify-between mt-2">
                  <button className="border border-teal-600 text-teal-600 px-4 py-2 rounded-md hover:bg-teal-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition flex-grow mr-2">
                    Ver detalles
                  </button>
                  <button className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition flex-grow">
                    Contactar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListaFavoritos;