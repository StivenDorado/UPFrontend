import React, { useEffect, useState } from 'react';
import { Calendar, RefreshCw, X, Check, Clock, AlertTriangle } from 'lucide-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const SolicitudesReservas = () => {
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Obtener el usuario actual de Firebase
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        console.log('Usuario autenticado:', user.uid);
        setDebugInfo(`Usuario autenticado: ${user.uid}`);
      } else {
        setCurrentUser(null);
        setError('No hay usuario autenticado. Por favor, inicia sesión.');
        setDebugInfo('No hay sesión activa');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Cargar las reservas cuando tengamos el usuario
  useEffect(() => {
    const fetchReservas = async () => {
      if (!currentUser) return;
      
      try {
        setLoading(true);
        
        // Usar la ruta correcta con el uid de Firebase
        const url = `http://localhost:4000/api/reserva/usuario/${currentUser.uid}`;
        console.log('Intentando obtener reservas de:', url);
        setDebugInfo(`Consultando: ${url}`);
        
        // Realizar la solicitud con un timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 segundos timeout
        
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        });
        
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('Error en la respuesta:', response.status, errorText);
          setDebugInfo(`Error ${response.status}: ${errorText}`);
          throw new Error(`Error ${response.status}: ${errorText}`);
        }
        
        const data = await response.json();
        console.log('Datos recibidos:', data);
        
        // Verificar estructura de datos
        if (!Array.isArray(data)) {
          console.error('Los datos recibidos no son un array:', data);
          setDebugInfo(`Formato incorrecto: ${JSON.stringify(data).substring(0, 100)}...`);
          throw new Error('Los datos recibidos no tienen el formato esperado');
        }
        
        setReservas(data);
        setDebugInfo(`Recibidas ${data.length} reservas`);
        setLoading(false);
      } catch (error) {
        console.error('Error detallado al obtener reservas:', error);
        
        // Manejo específico para errores de timeout
        if (error.name === 'AbortError') {
          setError('La solicitud ha tardado demasiado tiempo. Verifica la conexión con el servidor.');
          setDebugInfo('Timeout de solicitud (10s)');
        } else {
          setError(`No se pudieron cargar tus reservas: ${error.message}`);
          setDebugInfo(`Error: ${error.message}`);
        }
        
        setLoading(false);
      }
    };

    fetchReservas();
  }, [currentUser]);

  const recargarReservas = () => {
    setLoading(true);
    setError(null);
    setDebugInfo(null);
    // Si tenemos usuario, recargamos las reservas
    if (currentUser) {
      // Usamos setTimeout para asegurar que el estado de carga se muestre
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } else {
      // Si no hay usuario, intentamos autenticar de nuevo
      const auth = getAuth();
      if (auth.currentUser) {
        setCurrentUser(auth.currentUser);
      } else {
        setError('No hay usuario autenticado. Por favor, inicia sesión.');
        setDebugInfo('No hay sesión activa');
        setLoading(false);
      }
    }
  };

  const renderEstado = (estado) => {
    switch (estado) {
      case 'confirmada':
        return (
          <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center">
            <Check className="w-4 h-4 mr-1" />
            <span>Aceptada</span>
          </div>
        );
      case 'cancelada':
        return (
          <div className="bg-red-100 text-red-700 px-3 py-1 rounded-full flex items-center">
            <X className="w-4 h-4 mr-1" />
            <span>Cancelada</span>
          </div>
        );
      case 'pendiente':
        return (
          <div className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>Pendiente</span>
          </div>
        );
      default:
        return (
          <div className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full flex items-center">
            <span>{estado || 'Desconocido'}</span>
          </div>
        );
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Fecha no disponible';
    
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Si no es una fecha válida, devolver el string original
      }
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    } catch (e) {
      console.error('Error al formatear fecha:', e);
      return dateString;
    }
  };

  if (loading) {
    return (
      <div className="w-full">
        <div className="bg-teal-600 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="text-white mr-2" />
            <h2 className="text-white text-xl font-semibold">MIS RESERVAS</h2>
          </div>
          <button 
            onClick={recargarReservas} 
            className="bg-teal-700 text-white p-2 rounded-full hover:bg-teal-800"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="w-full p-16 flex flex-col items-center justify-center bg-white rounded-b-lg shadow-sm border border-gray-100">
          <RefreshCw className="w-8 h-8 mb-4 animate-spin text-teal-600" />
          <p className="text-gray-600 mb-1">Cargando tus reservas...</p>
          {debugInfo && (
            <p className="text-xs text-gray-400 mt-2">{debugInfo}</p>
          )}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full">
        <div className="bg-teal-600 p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Calendar className="text-white mr-2" />
            <h2 className="text-white text-xl font-semibold">MIS RESERVAS</h2>
          </div>
          <button 
            onClick={recargarReservas} 
            className="bg-teal-700 text-white p-2 rounded-full hover:bg-teal-800"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
        
        <div className="w-full p-8 bg-white rounded-b-lg shadow-sm border border-gray-100">
          <div className="bg-red-50 p-4 rounded-lg text-red-700 flex items-start">
            <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">{error}</p>
              {debugInfo && (
                <p className="text-xs text-red-500 mt-2">Información de depuración: {debugInfo}</p>
              )}
              <button 
                onClick={recargarReservas}
                className="mt-3 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded text-sm flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-1" />
                Intentar nuevamente
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-teal-600 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <Calendar className="text-white mr-2" />
          <h2 className="text-white text-xl font-semibold">MIS RESERVAS</h2>
        </div>
        <button 
          onClick={recargarReservas} 
          className="bg-teal-700 text-white p-2 rounded-full hover:bg-teal-800"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-white rounded-b-lg shadow-sm border border-gray-100">
        {debugInfo && (
          <div className="p-2 bg-gray-100 text-xs text-gray-500">
            {debugInfo}
          </div>
        )}
        
        {reservas.length === 0 ? (
          <div className="p-16 text-center">
            <div className="text-gray-400 mb-4">
              <Calendar className="w-16 h-16 mx-auto" />
            </div>
            <p className="text-gray-600 font-medium">No tienes reservas creadas aún.</p>
            <p className="text-gray-500 text-sm mt-2">
              Cuando realices reservas, aparecerán aquí.
            </p>
          </div>
        ) : (
          <div>
            {reservas.map((reserva, index) => (
              <div key={reserva.id || `reserva-${index}`} className="border-b border-gray-200 p-4">
                <div className="flex flex-col md:flex-row md:items-center">
                  <div className="w-full md:w-16 h-16 bg-gray-100 rounded flex-shrink-0 md:mr-4 flex items-center justify-center mb-4 md:mb-0">
                    <span className="text-gray-400 text-2xl">🏠</span>
                  </div>
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <h3 className="font-bold text-gray-800 mb-2 md:mb-0">
                        {reserva.propiedad?.titulo || 'Propiedad sin título'}
                      </h3>
                      <div className="mb-2 md:mb-0">
                        {renderEstado(reserva.estado)}
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center text-gray-500 text-sm mt-2">
                      <div className="flex items-center mb-2 md:mb-0 md:mr-4">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{formatDate(reserva.fecha_inicio)} - {formatDate(reserva.fecha_fin)}</span>
                      </div>
                      <div className="font-medium text-gray-700">
                        ${reserva.monto_reserva?.toLocaleString('es-ES') || reserva.monto_reserva || '-'}
                      </div>
                    </div>
                    {reserva.mensaje && (
                      <div className="mt-2 text-gray-600 text-sm">
                        <p className="italic">"{reserva.mensaje}"</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SolicitudesReservas;