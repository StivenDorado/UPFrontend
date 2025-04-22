import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tag, RefreshCw, X, Check, Clock, AlertTriangle, DollarSign, ThumbsUp, ThumbsDown, Trash2 } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

const OfertasPrecios = ({ propiedadId }) => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [isDeleting, setIsDeleting] = useState({});
  
  const { currentUser, getIdToken, isAuthenticated } = useAuth();

  const colorPalette = {
    primary: '#2A8C82',
    secondary: '#41BFB3',
    accent: '#91F2E9',
    dark: '#275950',
    error: '#260101'
  };

  const fetchOfertas = useCallback(async () => {
    if (!currentUser) {
      setError('Debes iniciar sesión para ver las ofertas');
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      const endpoint = propiedadId 
        ? `ofertas/propiedad/${propiedadId}`
        : `ofertas/usuario/${currentUser.uid}`;
      
      const token = await getIdToken();
      const response = await fetch(`http://localhost:4000/api/${endpoint}`, {
        headers: { 
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al cargar ofertas');
      }
      
      const data = await response.json();
      setOfertas(Array.isArray(data) ? data : []);
      setError(null);
    } catch (error) {
      setError(error.message);
      setDebugInfo(`Error en ${new Date().toISOString()}: ${error.message}`);
    } finally {
      setLoading(false);
    }
  }, [currentUser, propiedadId, getIdToken]);

  useEffect(() => {
    if (isAuthenticated) fetchOfertas();
  }, [isAuthenticated, fetchOfertas]);

  const manejarEstadoOferta = async (ofertaId, accion) => {
    try {
      const token = await getIdToken();
      const response = await fetch(`http://localhost:4000/api/ofertas/${ofertaId}/${accion}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error al ${accion} la oferta`);
      }

      const updatedOferta = await response.json();
      setOfertas(prev => prev.map(o => o._id === updatedOferta._id ? updatedOferta : o));
      
    } catch (error) {
      setError(error.message);
    }
  };

  const eliminarOferta = async (ofertaId) => {
    if (!window.confirm('¿Estás seguro de eliminar esta oferta?')) return;
    
    try {
      setIsDeleting(prev => ({...prev, [ofertaId]: true}));
      const token = await getIdToken();
      
      const response = await fetch(`http://localhost:4000/api/ofertas/${ofertaId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar oferta');
      }

      setOfertas(prev => prev.filter(o => o._id !== ofertaId));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsDeleting(prev => ({...prev, [ofertaId]: false}));
    }
  };

  const renderEstado = (oferta) => {
    const estados = {
      aceptada: {
        icon: <Check className="w-4 h-4 mr-1" />,
        estilo: 'bg-green-100 text-green-800'
      },
      rechazada: {
        icon: <X className="w-4 h-4 mr-1" />,
        estilo: 'bg-red-100 text-red-800'
      },
      pendiente: {
        icon: <Clock className="w-4 h-4 mr-1" />,
        estilo: 'bg-blue-100 text-blue-800'
      }
    };

    return (
      <div className="flex items-center gap-2">
        <div className={`px-3 py-1 rounded-full flex items-center text-sm ${estados[oferta.estado]?.estilo}`}>
          {estados[oferta.estado]?.icon}
          {oferta.estado}
        </div>
        
        {propiedadId && oferta.estado === 'pendiente' && (
          <>
            <button
              onClick={() => manejarEstadoOferta(oferta._id, 'aceptar')}
              className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              Aceptar
            </button>
            <button
              onClick={() => manejarEstadoOferta(oferta._id, 'rechazar')}
              className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center"
            >
              <ThumbsDown className="w-4 h-4 mr-1" />
              Rechazar
            </button>
          </>
        )}

        {!propiedadId && (
          <button
            onClick={() => eliminarOferta(oferta._id)}
            disabled={isDeleting[oferta._id]}
            className={`px-3 py-1 bg-red-500 text-white rounded-lg flex items-center ${
              isDeleting[oferta._id] ? 'opacity-50 cursor-not-allowed' : 'hover:bg-red-600'
            }`}
          >
            {isDeleting[oferta._id] ? (
              <RefreshCw className="w-4 h-4 mr-1 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4 mr-1" />
            )}
            Eliminar
          </button>
        )}
      </div>
    );
  };

  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  if (!isAuthenticated) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center gap-2 text-red-500">
          <AlertTriangle className="w-5 h-5" />
          <p>Debes iniciar sesión para ver las ofertas</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-md flex flex-col items-center">
        <RefreshCw className="w-8 h-8 animate-spin text-blue-500 mb-4" />
        <p className="text-gray-600">Cargando ofertas...</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4 bg-blue-500 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5" />
          <h2 className="text-lg font-semibold">
            {propiedadId ? 'Ofertas Recibidas' : 'Mis Ofertas'}
          </h2>
        </div>
        <button 
          onClick={fetchOfertas}
          className="p-2 hover:bg-blue-600 rounded-full transition-colors"
        >
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4">
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg flex items-center gap-2">
            <AlertTriangle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {ofertas.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <DollarSign className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>{propiedadId ? 'No hay ofertas recibidas' : 'No tienes ofertas activas'}</p>
          </div>
        ) : (
          ofertas.map((oferta) => (
            <div key={oferta._id} className="border-b last:border-b-0 py-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-800">
                      {oferta.producto?.nombre || 'Producto sin nombre'}
                    </h3>
                    {renderEstado(oferta)}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center text-gray-600">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Oferta: {formatPrice(oferta.precio_ofertado)}
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Tag className="w-4 h-4 mr-1" />
                      Precio original: {formatPrice(oferta.precio_original)}
                    </div>
                    {propiedadId && (
                      <div className="flex items-center text-gray-600">
                        <span className="mr-1">✉️</span>
                        {oferta.ofertante?.email || 'Correo no disponible'}
                      </div>
                    )}
                  </div>

                  {oferta.mensaje && (
                    <div className="mt-2 p-2 bg-gray-50 rounded text-gray-600 text-sm">
                      "{oferta.mensaje}"
                    </div>
                  )}

                  <div className="mt-2 text-xs text-gray-400">
                    Fecha: {new Date(oferta.fecha_creacion).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

OfertasPrecios.propTypes = {
  propiedadId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
};

export default OfertasPrecios;