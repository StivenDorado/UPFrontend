import React, { useState } from 'react';
import { X, Check, RefreshCw, Clock, DollarSign } from 'lucide-react';

const OfertasPrecio = () => {
  const [ofertas, setOfertas] = useState([
    { 
      id: 1, 
      nombre: 'Muriel', 
      fecha: '8 de Octubre', 
      estado: 'en espera', 
      monto: '$300.000.000 COP',
      fechaEstado: null
    },
    { 
      id: 2, 
      nombre: 'Muriel', 
      fecha: '8 de Octubre', 
      estado: 'cancelada', 
      monto: null,
      fechaEstado: 'Día 5 de marzo'
    },
    { 
      id: 3, 
      nombre: 'Muriel', 
      fecha: '8 de Octubre', 
      estado: 'aceptada', 
      monto: null,
      fechaEstado: 'Día 5 de marzo'
    },
    { 
      id: 4, 
      nombre: 'Muriel', 
      fecha: '8 de Octubre', 
      estado: 'rechazada', 
      monto: null,
      fechaEstado: 'Día 5 de marzo'
    }
  ]);

  const handleCancelarOferta = (id) => {
    setOfertas(ofertas.map(oferta => 
      oferta.id === id ? { 
        ...oferta, 
        estado: 'cancelada', 
        fechaEstado: 'Día 5 de marzo' // Simulando la fecha actual
      } : oferta
    ));
  };

  // Función para renderizar el estado de la oferta
  const renderEstadoOferta = (oferta) => {
    switch(oferta.estado) {
      case 'en espera':
        return (
          <div className="flex flex-col">
            <div className="flex items-center text-[#2A8C82] font-medium">
              <DollarSign size={16} className="mr-1" />
              {oferta.monto}
            </div>
            <div className="text-sm text-gray-600">
              Solicitud en espera...
            </div>
          </div>
        );
      case 'cancelada':
        return (
          <div className="flex flex-col">
            <div className="flex items-center text-[#275950] font-medium">
              <Clock size={16} className="mr-1" />
              {oferta.fechaEstado}
            </div>
            <div className="text-sm text-gray-600">
              Cancelaste oferta
            </div>
          </div>
        );
      case 'aceptada':
        return (
          <div className="flex flex-col">
            <div className="flex items-center text-[#275950] font-medium">
              <Clock size={16} className="mr-1" />
              {oferta.fechaEstado}
            </div>
            <div className="text-sm text-gray-600">
              Su oferta ha sido aceptada
            </div>
          </div>
        );
      case 'rechazada':
        return (
          <div className="flex flex-col">
            <div className="flex items-center text-[#275950] font-medium">
              <Clock size={16} className="mr-1" />
              {oferta.fechaEstado}
            </div>
            <div className="text-sm text-gray-600">
              Oferta rechazada
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  // Función para renderizar el botón de acción según el estado
  const renderAccionButton = (oferta) => {
    switch(oferta.estado) {
      case 'en espera':
        return (
          <button
            onClick={() => handleCancelarOferta(oferta.id)}
            className="flex items-center px-4 py-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            <X size={16} className="mr-1" /> Cancelar oferta
          </button>
        );
      case 'cancelada':
        return (
          <div className="flex items-center px-4 py-2 text-gray-600">
            <X size={16} className="mr-1" /> Cancelaste Oferta
          </div>
        );
      case 'aceptada':
        return (
          <div className="px-4 py-2 rounded-full bg-[#41BFB3] text-white flex items-center">
            <Check size={16} className="mr-1" /> Oferta Aceptada
          </div>
        );
      case 'rechazada':
        return (
          <div className="flex items-center px-4 py-2 text-gray-600">
            <X size={16} className="mr-1" /> Oferta rechazada
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-[#2A8C82] text-white p-4 flex items-center">
        <DollarSign className="mr-2" />
        <h2 className="text-xl font-medium">SOLICITUD DE OFERTAS DE PRECIO</h2>
      </div>
      
      <div className="bg-white rounded-b-lg shadow-md">
        {ofertas.map((oferta) => (
          <div key={oferta.id} className="border-b border-gray-100 p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              {/* Lado izquierdo: Avatar e información */}
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#91F2E9] bg-opacity-30 rounded-full flex items-center justify-center mr-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    {/* Aquí iría la imagen de perfil, uso un div placeholder */}
                    <div className="w-full h-full bg-gray-200"></div>
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-[#260101]">{oferta.nombre}</h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" /> {oferta.fecha}
                  </p>
                </div>
              </div>
              
              {/* Lado central: Estado de la oferta */}
              {renderEstadoOferta(oferta)}
              
              {/* Lado derecho: Acciones y botón de actualización */}
              <div className="flex items-center">
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-[#41BFB3] text-[#41BFB3] mr-3 hover:bg-[#91F2E9] hover:bg-opacity-20 transition-colors">
                  <RefreshCw size={16} />
                </button>
                {renderAccionButton(oferta)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfertasPrecio;