import React, { useState } from 'react';

const OfertasPrecio = () => {
  const [ofertas, setOfertas] = useState([
    { id: 1, nombre: 'Muriel', fecha: '8 de Octubre', estado: 'en espera', accion: 'Cancelar oferta' },
    { id: 2, nombre: 'Muriel', fecha: '8 de Octubre', estado: 'cancelada', accion: 'Oferta cancelada' },
    { id: 3, nombre: 'Muriel', fecha: '8 de Octubre', estado: 'en espera', accion: 'Cancelar oferta' },
    { id: 4, nombre: 'Día 5 de marzo', fecha: '5 de marzo', estado: 'aceptada', accion: 'Oferta aceptada' },
    { id: 5, nombre: 'Día 5 de marzo', fecha: '5 de marzo', estado: 'aceptada', accion: 'Oferta aceptada' },
  ]);

  const handleCancelarOferta = (id) => {
    setOfertas(ofertas.map(oferta => 
      oferta.id === id ? { ...oferta, estado: 'cancelada', accion: 'Oferta cancelada' } : oferta
    ));
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-brown-900 mb-4">Solicitudes de Ofertas de Precio</h2>
      
      <div className="space-y-4">
        {ofertas.map((oferta) => (
          <div key={oferta.id} className="border border-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{oferta.nombre}</h3>
                <p className="text-sm text-gray-600">{oferta.fecha}</p>
              </div>
              <p className={`text-sm ${oferta.estado === 'en espera' ? 'text-yellow-600' : oferta.estado === 'aceptada' ? 'text-green-600' : 'text-red-600'}`}>
                {oferta.estado === 'en espera' ? 'Solicitud en espera...' : oferta.estado === 'aceptada' ? 'Su oferta ha sido aceptada' : 'Cancelaste oferta'}
              </p>
            </div>
            <div className="flex justify-end mt-2">
              {oferta.estado === 'en espera' && (
                <button
                  onClick={() => handleCancelarOferta(oferta.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                >
                  Cancelar oferta
                </button>
              )}
              {(oferta.estado === 'cancelada' || oferta.estado === 'aceptada') && (
                <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md">
                  {oferta.accion}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfertasPrecio;