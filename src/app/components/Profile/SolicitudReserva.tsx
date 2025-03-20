import React from 'react';
import { Calendar, RefreshCw, X, Check } from 'lucide-react';

const SolicitudesReservas = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-teal-600 p-4 flex items-center justify-center">
        <Calendar className="text-white mr-2" />
        <h2 className="text-white text-xl font-semibold">SOLICITUDES DE RESERVAS</h2>
      </div>
      
      {/* Reservations Container */}
      <div className="bg-white rounded-b-lg shadow-sm border border-gray-100">
        {/* First reservation - Pending */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center">
            {/* Property thumbnail */}
            <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 mr-4 flex items-center justify-center">
              <span className="text-gray-300 text-2xl">·</span>
            </div>
            
            {/* Reservation info */}
            <div className="flex-grow">
              <h3 className="font-bold text-gray-800">Apartamento moderno en el centro</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>15 de junio, 2024 - 22 de junio, 2024</span>
              </div>
              
              <div className="mt-1">
                <div className="flex items-center text-gray-700">
                  <span className="inline-block mr-1">⏰</span> 
                  <span>15 de junio, 2024 al 22 de junio, 2024</span>
                </div>
                <div className="text-gray-700">
                  Precio: $350.000
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center">
              <button className="text-teal-600 rounded-full bg-gray-100 p-2 mr-2">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full flex items-center">
                <X className="w-4 h-4 mr-1" />
                <span>Cancelar reserva</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Second reservation - Accepted */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center">
            {/* Property thumbnail */}
            <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 mr-4 flex items-center justify-center">
              <span className="text-gray-300 text-2xl">·</span>
            </div>
            
            {/* Reservation info */}
            <div className="flex-grow">
              <h3 className="font-bold text-gray-800">Casa amplia con jardín</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>10 de julio, 2024 - 20 de julio, 2024</span>
              </div>
              
              <div className="mt-1">
                <div className="flex items-center text-gray-700">
                  <span className="inline-block mr-1">⏰</span> 
                  <span>10 de julio, 2024 al 20 de julio, 2024</span>
                </div>
                <div className="text-gray-700">
                  Precio: $750.000
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center">
              <button className="text-teal-600 rounded-full bg-gray-100 p-2 mr-2">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center">
                <Check className="w-4 h-4 mr-1" />
                <span>Reserva Aceptada</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Third reservation - Rejected */}
        <div className="p-4">
          <div className="flex items-center">
            {/* Property thumbnail */}
            <div className="w-16 h-16 bg-gray-100 rounded flex-shrink-0 mr-4 flex items-center justify-center">
              <span className="text-gray-300 text-2xl">·</span>
            </div>
            
            {/* Reservation info */}
            <div className="flex-grow">
              <h3 className="font-bold text-gray-800">Estudio cerca de la universidad</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>5 de agosto, 2024 - 10 de agosto, 2024</span>
              </div>
              
              <div className="mt-1">
                <div className="flex items-center text-gray-700">
                  <span className="inline-block mr-1">⏰</span> 
                  <span>5 de agosto, 2024 al 10 de agosto, 2024</span>
                </div>
                <div className="text-gray-700">
                  Precio: $200.000
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center">
              <button className="text-teal-600 rounded-full bg-gray-100 p-2 mr-2">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full flex items-center">
                <X className="w-4 h-4 mr-1" />
                <span>Reserva rechazada</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitudesReservas;