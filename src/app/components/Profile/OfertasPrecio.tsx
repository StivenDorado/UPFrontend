import React, { useState, useEffect } from 'react';
import { X, Check, RefreshCw, Clock, DollarSign } from 'lucide-react';

const OfertasPrecio = () => {
  const [reservas, setReservas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/reserva');
        if (!response.ok) throw new Error('Error al cargar reservas');
        const data = await response.json();
        
        const reservasFormateadas = data.map(reserva => ({
          id: reserva.reserva_id,
          nombre: reserva.usuario.nombre || 'Sin nombre',
          fecha: formatFecha(reserva.fecha_creacion),
          estado: reserva.estado === 'pendiente' ? 'en espera' : reserva.estado,
          monto: `$${Number(reserva.monto_reserva).toLocaleString('es-CO')} COP`,
          fechaEstado: reserva.estado !== 'pendiente' ? 
            formatFecha(reserva.fecha_creacion) : null,
          propiedad: reserva.propiedad.titulo,
          fotoPerfil: reserva.usuario.fotoPerfil
        }));
        
        setReservas(reservasFormateadas);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchReservas();
  }, []);

  const handleCambiarEstado = async (id, nuevoEstado) => {
    try {
      const endpoint = nuevoEstado === 'aceptada' ? 'aceptar' : 'cancelar';
      const response = await fetch(
        `http://localhost:4000/api/reserva/${id}/${endpoint}`, 
        { method: 'PUT' }
      );
      
      if (!response.ok) throw new Error(`Error al ${nuevoEstado} reserva`);
      
      setReservas(reservas.map(reserva => 
        reserva.id === id ? { 
          ...reserva, 
          estado: nuevoEstado,
          fechaEstado: formatFecha(new Date())
        } : reserva
      ));
    } catch (err) {
      console.error('Error:', err);
    }
  };

  const renderEstadoReserva = (reserva) => {
    switch(reserva.estado) {
      case 'en espera':
        return (
          <div className="flex flex-col">
            <div className="flex items-center text-[#2A8C82] font-medium">
              <DollarSign size={16} className="mr-1" />
              {reserva.monto}
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
              {reserva.fechaEstado}
            </div>
            <div className="text-sm text-gray-600">
              Reserva cancelada
            </div>
          </div>
        );
      case 'aceptada':
        return (
          <div className="flex flex-col">
            <div className="flex items-center text-[#275950] font-medium">
              <Clock size={16} className="mr-1" />
              {reserva.fechaEstado}
            </div>
            <div className="text-sm text-gray-600">
              Reserva aceptada
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderAccionButton = (reserva) => {
    switch(reserva.estado) {
      case 'en espera':
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleCambiarEstado(reserva.id, 'aceptada')}
              className="flex items-center px-4 py-2 rounded-full bg-green-200 text-green-700 hover:bg-green-300 transition-colors"
            >
              <Check size={16} className="mr-1" /> Aceptar
            </button>
            <button
              onClick={() => handleCambiarEstado(reserva.id, 'cancelada')}
              className="flex items-center px-4 py-2 rounded-full bg-red-200 text-red-700 hover:bg-red-300 transition-colors"
            >
              <X size={16} className="mr-1" /> Cancelar
            </button>
          </div>
        );
      case 'cancelada':
        return (
          <div className="flex items-center px-4 py-2 text-gray-600">
            <X size={16} className="mr-1" /> Cancelada
          </div>
        );
      case 'aceptada':
        return (
          <div className="px-4 py-2 rounded-full bg-[#41BFB3] text-white flex items-center">
            <Check size={16} className="mr-1" /> Aceptada
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) return (
    <div className="max-w-7xl mx-auto p-4 text-center text-gray-600">
      Cargando reservas...
    </div>
  );

  if (error) return (
    <div className="max-w-7xl mx-auto p-4 text-center text-red-500">
      Error: {error}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="bg-[#2A8C82] text-white p-4 flex items-center">
        <DollarSign className="mr-2" />
        <h2 className="text-xl font-medium">SOLICITUD DE RESERVAS</h2>
      </div>
      
      <div className="bg-white rounded-b-lg shadow-md">
        {reservas.map((reserva) => (
          <div key={reserva.id} className="border-b border-gray-100 p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#91F2E9] bg-opacity-30 rounded-full flex items-center justify-center mr-4">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white">
                    {reserva.fotoPerfil ? (
                      <img 
                        src={reserva.fotoPerfil} 
                        alt="Perfil" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200"></div>
                    )}
                  </div>
                </div>
                <div>
                  <h3 className="font-medium text-[#260101]">
                    {reserva.nombre}
                  </h3>
                  <p className="text-sm text-gray-500 flex items-center">
                    <Clock size={14} className="mr-1" /> 
                    {reserva.fecha}
                  </p>
                  <p className="text-sm text-gray-500">
                    {reserva.propiedad}
                  </p>
                </div>
              </div>
              
              {renderEstadoReserva(reserva)}
              
              <div className="flex items-center">
                <button 
                  className="w-8 h-8 flex items-center justify-center rounded-full border border-[#41BFB3] text-[#41BFB3] mr-3 hover:bg-[#91F2E9] hover:bg-opacity-20 transition-colors"
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw size={16} />
                </button>
                {renderAccionButton(reserva)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OfertasPrecio;