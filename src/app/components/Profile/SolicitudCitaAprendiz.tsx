import React, { useState, useEffect } from 'react';
import { Calendar, RefreshCw, MessageSquare, Clock, X, User, Filter } from 'lucide-react';
import { getAuth } from 'firebase/auth';

interface Cita {
  cita_id: string;
  nombreArrendador: string;
  fecha: string;
  diaCita: string;
  horaCita: string;
  estado: 'pendiente' | 'aceptada' | 'cancelada';
  usuario_uid?: string;
  usuarioID?: string;
  id_usuario?: string;
  uid_usuario?: string;
  usuario_id?: string;
  propiedad_id?: string;
  [key: string]: any;
}

const API_BASE_URL = 'http://localhost:4000/api';

// Datos simulados para usar como respaldo en caso de error de API
const MOCK_DATA: Cita[] = [
  {
    cita_id: "cita1",
    nombreArrendador: "Ana Propietaria",
    fecha: "8 de Octubre",
    diaCita: "5 de marzo",
    horaCita: "4:00 PM",
    estado: "pendiente",
    usuario_uid: "usuario123",
    propiedad_id: "prop1"
  },
  {
    cita_id: "cita2",
    nombreArrendador: "José Inmobiliaria",
    fecha: "10 de Octubre",
    diaCita: "7 de marzo",
    horaCita: "2:30 PM",
    estado: "aceptada",
    usuario_uid: "usuario123",
    propiedad_id: "prop2"
  },
  {
    cita_id: "cita3",
    nombreArrendador: "Inmobiliaria Sur",
    fecha: "12 de Octubre",
    diaCita: "9 de marzo",
    horaCita: "10:00 AM",
    estado: "cancelada",
    usuario_uid: "usuario123",
    propiedad_id: "prop3"
  }
];

const SolicitudesCitasAprendiz: React.FC = () => {
  const [misCitas, setMisCitas] = useState<Cita[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [usandoDatosMock, setUsandoDatosMock] = useState(false);
  
  // Obtenemos el usuario actual de Firebase
  const auth = getAuth();
  const currentUser = auth.currentUser;

  useEffect(() => {
    fetchCitasUsuario();
  }, []);

  // Función para cargar las citas del usuario actual usando la ruta específica
  const fetchCitasUsuario = async () => {
    setLoading(true);
    setError(null);
    setUsandoDatosMock(false);
    
    // Verificar si hay un usuario autenticado
    if (!currentUser) {
      setError("No hay usuario autenticado");
      setMisCitas(MOCK_DATA);
      setUsandoDatosMock(true);
      setLoading(false);
      return;
    }
    
    try {
      const userUID = currentUser.uid;
      // Usar la ruta específica para obtener citas por usuario
      const url = `${API_BASE_URL}/citas/usuario/${userUID}`;
      console.log(`Obteniendo citas del usuario desde: ${url}`);
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
      }
      
      const citasUsuario = await response.json();
      console.log('Citas del usuario recibidas:', citasUsuario);
      
      if (!Array.isArray(citasUsuario)) {
        throw new Error('Formato de respuesta incorrecto');
      }

      setMisCitas(citasUsuario);
      
    } catch (err) {
      console.error("Error al obtener citas:", err);
      setMisCitas(MOCK_DATA);
      setUsandoDatosMock(true);
      setError(`Error de conexión: ${err instanceof Error ? err.message : 'Desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  const eliminarCita = async (citaId: string) => {
    if (!confirm('¿Estás seguro que deseas eliminar esta cita?')) return;
    
    if (usandoDatosMock) {
      // Si estamos usando datos simulados, simulamos la eliminación localmente
      const citasFiltradas = misCitas.filter(cita => cita.cita_id !== citaId);
      setMisCitas(citasFiltradas);
      return;
    }
    
    try {
      const response = await fetch(`${API_BASE_URL}/citas/${citaId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`No se pudo eliminar la cita: ${response.status} ${errorData}`);
      }
      
      // Mostramos mensaje de éxito
      alert('Cita eliminada correctamente');
      
      // Actualizamos la UI inmediatamente sin esperar una nueva carga
      setMisCitas(prev => prev.filter(cita => cita.cita_id !== citaId));
      
      // Recargamos las citas para sincronizar con el servidor
      setTimeout(() => fetchCitasUsuario(), 1000);
    } catch (err) {
      console.error('Error eliminando la cita:', err);
      setError(`Error al eliminar la cita: ${err instanceof Error ? err.message : 'Desconocido'}`);
      
      // Eliminación simulada en caso de error para mejorar UX
      setMisCitas(prev => prev.filter(cita => cita.cita_id !== citaId));
    }
  };

  // Función para obtener la clase CSS según el estado de la cita
  const getStatusClass = (estado: 'pendiente' | 'aceptada' | 'cancelada') => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-100 text-yellow-800';
      case 'aceptada':
        return 'bg-green-100 text-green-800';
      case 'cancelada':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Función para obtener el icono según el estado de la cita
  const getStatusIcon = (estado: 'pendiente' | 'aceptada' | 'cancelada') => {
    switch (estado) {
      case 'pendiente':
        return <Clock className="w-4 h-4 mr-1" />;
      case 'aceptada':
        return <MessageSquare className="w-4 h-4 mr-1" />;
      case 'cancelada':
        return <X className="w-4 h-4 mr-1" />;
      default:
        return null;
    }
  };

  // Función para obtener el texto según el estado de la cita
  const getStatusText = (estado: 'pendiente' | 'aceptada' | 'cancelada') => {
    switch (estado) {
      case 'pendiente':
        return 'Esperando respuesta';
      case 'aceptada':
        return 'Cita Aceptada';
      case 'cancelada':
        return 'Cita Cancelada';
      default:
        return 'Estado desconocido';
    }
  };

  if (loading) return (
    <div className="p-4 text-center">
      <div className="flex justify-center items-center">
        <RefreshCw className="animate-spin w-6 h-6 text-teal-500 mr-2" />
        <span>Cargando tus citas...</span>
      </div>
    </div>
  );
  
  return (
    <div className="w-full">
      {/* Header */}
      <div className="bg-teal-600 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="text-white mr-2" />
          <h2 className="text-white text-xl font-semibold">MIS CITAS</h2>
        </div>
        <button
          className="text-white rounded-full bg-teal-700 p-2 hover:bg-teal-800 transition-colors"
          onClick={fetchCitasUsuario}
          title="Actualizar citas"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
      
      {/* Error notice */}
      {error && (
        <div className="bg-red-100 p-3 text-red-800 text-sm">
          <p className="mb-2"><strong>Aviso:</strong> {error}</p>
          <button 
            className="bg-red-200 hover:bg-red-300 text-red-800 px-3 py-1 rounded text-sm transition-colors"
            onClick={fetchCitasUsuario}
          >
            Reintentar
          </button>
        </div>
      )}
      
      {/* Mock data notice */}
      {usandoDatosMock && (
        <div className="bg-yellow-100 p-3 text-yellow-800 text-sm">
          <p>Mostrando datos de ejemplo - La conexión con el servidor no está disponible</p>
        </div>
      )}
      
      {/* Appointments Container */}
      <div className="bg-white rounded-b-lg shadow-md">
        {misCitas.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-2 text-gray-300" />
            <p>No hay citas para mostrar</p>
          </div>
        ) : (
          misCitas.map((cita) => (
            <div key={cita.cita_id} className="border-b border-gray-200 p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center flex-wrap md:flex-nowrap">
                {/* Avatar circle */}
                <div className="w-16 h-16 bg-gray-100 rounded-full flex-shrink-0 mr-4 flex items-center justify-center">
                  <Calendar className="text-gray-400 w-8 h-8" />
                </div>
                
                {/* Appointment info */}
                <div className="flex-grow">
                  <h3 className="font-bold text-gray-800">{cita.nombreArrendador}</h3>
                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Solicitada: {cita.fecha}</span>
                  </div>
                  
                  <div className="mt-1">
                    <p className="text-gray-700">
                      <span className="font-medium">Día de la cita:</span> {cita.diaCita}
                    </p>
                    <div className="flex items-center text-gray-600 mt-1">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">Hora: {cita.horaCita}</span>
                    </div>
                    {cita.propiedad_id && (
                      <div className="text-sm text-gray-500 mt-1">
                        ID Propiedad: <span className="font-mono">{cita.propiedad_id}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Status */}
                <div className="flex items-center gap-2 mt-3 md:mt-0">
                  <div className={`${getStatusClass(cita.estado)} px-4 py-2 rounded-full flex items-center`}>
                    {getStatusIcon(cita.estado)}
                    <span>{getStatusText(cita.estado)}</span>
                  </div>
                  
                  <button
                    className="text-red-500 rounded-full border border-red-200 p-2 ml-2 hover:bg-red-50 transition-colors"
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

export default SolicitudesCitasAprendiz;