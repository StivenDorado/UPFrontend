import React from 'react';
import Link from 'next/link';
import { Eye, Pencil, Trash2, Home, PlusCircle } from 'lucide-react';

type Propiedad = {
  id: number;
  titulo: string;
  ubicacion: string;
  habitaciones: number;
  banos: number;
  precio: number;
  visitas: number;
  reservas: number;
  estado: 'activa' | 'inactiva';
};

const MisPropiedades: React.FC = () => {
  const propiedades: Propiedad[] = [
    {
      id: 1,
      titulo: 'Apartamento moderno en el centro',
      ubicacion: 'Centro de la ciudad',
      habitaciones: 2,
      banos: 1,
      precio: 1200000,
      visitas: 145,
      reservas: 3,
      estado: 'activa'
    },
    {
      id: 2,
      titulo: 'Casa amplia con jardín',
      ubicacion: 'Zona residencial',
      habitaciones: 4,
      banos: 3,
      precio: 2500000,
      visitas: 89,
      reservas: 1,
      estado: 'activa'
    },
    {
      id: 3,
      titulo: 'Estudio cerca de la universidad',
      ubicacion: 'Barrio universitario',
      habitaciones: 1,
      banos: 1,
      precio: 800000,
      visitas: 56,
      reservas: 0,
      estado: 'inactiva'
    }
  ];

  const formatPrecio = (precio: number): string => {
    return `$${precio.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-teal-600">
      <div className="bg-gray-50 min-h-screen rounded-t-lg p-4">
        {/* Encabezado con icono de casa y botón de nueva propiedad */}
        <div className="bg-teal-600 text-white p-4 rounded-lg mb-4 flex justify-between items-center">
          <div className="flex items-center">
            <Home className="mr-2" size={24} />
            <h2 className="text-xl font-bold uppercase">MIS PROPIEDADES</h2>
          </div>
          <Link
            href="/alojamiento"
            className="bg-teal-500 hover:bg-teal-400 text-white px-4 py-2 rounded-md flex items-center"
          >
            <PlusCircle size={18} className="mr-2" />
            Nueva propiedad
          </Link>
        </div>

        {/* Lista de propiedades */}
        <div className="space-y-4">
          {propiedades.map((propiedad) => (
            <div key={propiedad.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="flex">
                {/* Imagen placeholder y badge de estado */}
                <div className="relative w-1/3 bg-gray-200 flex items-center justify-center">
                  <div className="text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <div className={`absolute top-2 left-2 text-xs font-bold py-1 px-3 rounded-full ${propiedad.estado === 'activa' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'}`}>
                    {propiedad.estado === 'activa' ? 'Activa' : 'Inactiva'}
                  </div>
                </div>

                {/* Información de la propiedad */}
                <div className="w-2/3 p-4">
                  <h3 className="font-bold text-teal-700 text-lg mb-1">{propiedad.titulo}</h3>
                  <p className="text-sm text-gray-600 flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {propiedad.ubicacion}
                  </p>

                  <div className="flex mb-2">
                    <div className="flex items-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M3 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H3Z" />
                        <path d="M15 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2h-6Z" />
                        <path d="M9 22v-2c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v2H9Z" />
                        <rect width="18" height="4" x="3" y="10" rx="1" />
                        <path d="M5 10V6a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v4" />
                      </svg>
                      {propiedad.habitaciones}
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
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

                  <div className="flex mb-2">
                    <div className="flex items-center mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {propiedad.visitas} visitas
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                        <path d="M7 7h.01" />
                        <path d="M17 7h.01" />
                        <path d="M7 17h.01" />
                        <path d="M17 17h.01" />
                      </svg>
                      {propiedad.reservas} reservas
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="text-teal-600 font-bold">{formatPrecio(propiedad.precio)}</div>
                    <div className="flex space-x-2">
                      <button className="flex items-center justify-center w-8 h-8 text-teal-600 border border-teal-600 rounded-md hover:bg-teal-50">
                        <Eye size={16} />
                      </button>
                      <button className="flex items-center justify-center w-8 h-8 text-orange-600 border border-orange-600 rounded-md hover:bg-orange-50">
                        <Pencil size={16} />
                      </button>
                      <button className="flex items-center justify-center w-8 h-8 text-red-600 border border-red-600 rounded-md hover:bg-red-50">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Botón de desactivar/activar */}
                  <div className="mt-2">
                    <button
                      className={`w-full py-1 px-2 rounded-md text-sm ${propiedad.estado === 'activa'
                        ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                    >
                      {propiedad.estado === 'activa' ? 'Desactivar' : 'Activar'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MisPropiedades;
