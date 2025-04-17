import React, { useState, useEffect } from 'react';
import { Calendar, RefreshCw, Check, X, MessageSquare } from 'lucide-react';

interface Cita {
  cita_id: string; // Using cita_id instead of uid to match the API routes
  nombreAprendiz: string;
  fecha: string;
  diaCita: string;
  horaCita: string;
  estado: 'pendiente' | 'aceptada' | 'cancelada';
  usuario_uid?: string;
  propiedad_id?: string;
}

const API_BASE_URL = 'http://localhost:4000/api';

const CitasArrendador: React.FC = () => {
  const [citas, setCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCitas();
  }, []);

  const fetchCitas = async () => {
    setLoading(true);
    try {
      const url = `${API_BASE_URL}/citas`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Error al obtener citas');
      const data: Cita[] = await response.json();
      setCitas(data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar las citas:', err);
      setError('Error al cargar las citas');
    } finally {
      setLoading(false);
    }
  };

  const aceptarCita = async (citaId: string) => {
    if (!citaId) {
      console.error('ID de cita no proporcionado');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/citas/${citaId}/aceptar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('No se pudo aceptar la cita');
      await fetchCitas();
    } catch (err) {
      console.error('Error aceptando la cita:', err);
      setError('Error al aceptar la cita');
    }
  };

  const cancelarCita = async (citaId: string) => {
    if (!citaId) {
      console.error('ID de cita no proporcionado');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/citas/${citaId}/cancelar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('No se pudo cancelar la cita');
      await fetchCitas();
    } catch (err) {
      console.error('Error cancelando la cita:', err);
      setError('Error al cancelar la cita');
    }
  };

  const eliminarCita = async (citaId: string) => {
    if (!citaId) {
      console.error('ID de cita no proporcionado');
      return;
    }
    if (!confirm('¿Está seguro que desea eliminar esta cita?')) return;
    
    try {
      const response = await fetch(`${API_BASE_URL}/citas/${citaId}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('No se pudo eliminar la cita');
      await fetchCitas();
    } catch (err) {
      console.error('Error eliminando la cita:', err);
      setError('Error al eliminar la cita');
    }
  };

  if (loading)
    return <div className="p-4 text-center">Cargando solicitudes...</div>;
  if (error)
    return (
      <div className="p-4 text-center">
        <p className="text-red-500 mb-2">{error}</p>
        <button 
          className="bg-teal-500 text-white px-4 py-2 rounded-lg"
          onClick={fetchCitas}
        >
          Reintentar
        </button>
      </div>
    );

  return (
    <div className="w-full">
      <div className="bg-teal-600 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="text-white mr-2" />
          <h2 className="text-white text-xl font-semibold">
            GESTIÓN DE SOLICITUDES
          </h2>
        </div>
        <button
          className="text-white rounded-full bg-teal-700 p-2"
          onClick={fetchCitas}
          title="Actualizar citas"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-b-lg shadow-sm border border-gray-100">
        {citas.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No hay solicitudes de citas pendientes
          </div>
        ) : (
          citas.map((cita) => (
            <div key={cita.cita_id} className="border-b border-gray-200 p-4">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex-shrink-0 mr-4" />
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800">{cita.nombreAprendiz}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{cita.fecha}</span>
                  </div>
                  <div className="mt-1">
                    <p className="text-gray-700">Día {cita.diaCita}</p>
                    <p className="text-gray-700">
                      {cita.estado === "pendiente" && "Esperando respuesta..."}
                      {cita.estado === "aceptada" && "Cita aceptada"}
                      {cita.estado === "cancelada" && "Cita cancelada"}
                    </p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <span className="text-sm">
                        ⏰ Hora cita: {cita.horaCita}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-2">
                  {cita.estado === "pendiente" && (
                    <>
                      <button
                        className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center"
                        onClick={() => aceptarCita(cita.cita_id)}
                      >
                        <Check className="w-4 h-4 mr-1" />
                        <span>Aceptar</span>
                      </button>
                      <button
                        className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full flex items-center"
                        onClick={() => cancelarCita(cita.cita_id)}
                      >
                        <X className="w-4 h-4 mr-1" />
                        <span>Cancelar</span>
                      </button>
                    </>
                  )}

                  {cita.estado === "aceptada" && (
                    <button className="bg-teal-500 text-white px-4 py-2 rounded-full flex items-center">
                      <MessageSquare className="w-4 h-4 mr-1" />
                      <span>Cita Aceptada</span>
                    </button>
                  )}

                  {cita.estado === "cancelada" && (
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full flex items-center">
                      <X className="w-4 h-4 mr-1" />
                      <span>Cita Cancelada</span>
                    </button>
                  )}
                  
                  <button
                    className="text-red-500 rounded-full border border-red-200 p-2"
                    onClick={() => eliminarCita(cita.cita_id)}
                    title="Eliminar cita"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CitasArrendador;