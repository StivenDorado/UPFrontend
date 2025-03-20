import React from 'react';
import { Calendar, RefreshCw, X, MessageSquare } from 'lucide-react';

const SolicitudesCitas = () => {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-teal-600 p-4 flex items-center justify-center">
        <Calendar className="text-white mr-2" />
        <h2 className="text-white text-xl font-semibold">SOLICITUDES & CITAS</h2>
      </div>
      
      {/* Appointments Container */}
      <div className="bg-white rounded-b-lg shadow-sm border border-gray-100">
        {/* First appointment - Waiting */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center">
            {/* Avatar circle */}
            <div className="w-16 h-16 bg-gray-100 rounded-full flex-shrink-0 mr-4"></div>
            
            {/* Appointment info */}
            <div className="flex-grow">
              <h3 className="font-bold text-gray-800">Muriel</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>8 de Octubre</span>
              </div>
              
              <div className="mt-1">
                <p className="text-gray-700">Día 5 de marzo</p>
                <p className="text-gray-700">Esperando cita...</p>
                <div className="flex items-center text-gray-600 mt-1">
                  <span className="text-sm">
                    <span className="inline-block mr-1">⏰</span> 
                    Hora cita: 4:00 PM
                  </span>
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
                <span>Cancelar cita</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Second appointment - Cancelled */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center">
            {/* Avatar circle */}
            <div className="w-16 h-16 bg-gray-100 rounded-full flex-shrink-0 mr-4"></div>
            
            {/* Appointment info */}
            <div className="flex-grow">
              <h3 className="font-bold text-gray-800">Muriel</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>8 de Octubre</span>
              </div>
              
              <div className="mt-1">
                <p className="text-gray-700">Día 5 de marzo</p>
                <p className="text-gray-700">Cancelaste cita</p>
                <div className="flex items-center text-gray-600 mt-1">
                  <span className="text-sm">
                    <span className="inline-block mr-1">⏰</span> 
                    Hora cita: 4:00 PM
                  </span>
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
                <span>Cancelaste Cita</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Third appointment - Accepted */}
        <div className="p-4">
          <div className="flex items-center">
            {/* Avatar circle */}
            <div className="w-16 h-16 bg-gray-100 rounded-full flex-shrink-0 mr-4"></div>
            
            {/* Appointment info */}
            <div className="flex-grow">
              <h3 className="font-bold text-gray-800">Muriel</h3>
              <div className="flex items-center text-gray-500 text-sm">
                <Calendar className="w-4 h-4 mr-1" />
                <span>8 de Octubre</span>
              </div>
              
              <div className="mt-1">
                <p className="text-gray-700">Día 5 de marzo</p>
                <p className="text-gray-700">Cita aceptada</p>
                <div className="flex items-center text-gray-600 mt-1">
                  <span className="text-sm">
                    <span className="inline-block mr-1">⏰</span> 
                    Hora cita: 4:00 PM
                  </span>
                </div>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center">
              <button className="text-teal-600 rounded-full bg-gray-100 p-2 mr-2">
                <RefreshCw className="w-5 h-5" />
              </button>
              <button className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center">
                <MessageSquare className="w-4 h-4 mr-1" />
                <span>Cita Aceptada</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolicitudesCitas;