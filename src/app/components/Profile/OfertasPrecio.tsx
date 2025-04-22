import React, { useEffect, useState } from 'react';
import { Tag, RefreshCw, X, Check, Clock, AlertTriangle, DollarSign, ThumbsUp, ThumbsDown } from 'lucide-react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

// Base URL de la API (defínela en .env como REACT_APP_API_BASE_URL)
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'https://miapi.com/api';

const OfertasPrecios = ({ propiedadId }) => {
  const [ofertas, setOfertas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const colorPalette = {
    primary: '#2A8C82',
    secondary: '#41BFB3',
    accent: '#91F2E9',
    dark: '#275950',
    error: '#260101'
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setCurrentUser(user);
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

  useEffect(() => {
    const fetchOfertas = async () => {
      if (!currentUser) return;
      try {
        setLoading(true);
        let url = propiedadId
          ? `${API_BASE_URL}/ofertas/propiedad/${propiedadId}`
          : `${API_BASE_URL}/ofertas/usuario/${currentUser.uid}`;

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${await currentUser.getIdToken()}`
          }
        });

        clearTimeout(timeoutId);
        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Error ${response.status}: ${errText}`);
        }

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error('Formato de respuesta inválido');

        setOfertas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOfertas();
  }, [currentUser, propiedadId]);

  const manejarEstadoOferta = async (ofertaId, accion) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/ofertas/${ofertaId}/${accion}`,
        {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${await currentUser.getIdToken()}`
          }
        }
      );

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(errText);
      }

      const updated = await response.json();
      setOfertas(prev => prev.map(o => o._id === updated._id ? updated : o));
    } catch (err) {
      setError(`Error al ${accion} la oferta: ${err.message}`);
    }
  };

  const recargarOfertas = () => {
    setLoading(true);
    setError(null);
    setTimeout(() => window.location.reload(), 300);
  };

  const renderEstado = oferta => {
    const accionesPropietario = propiedadId && oferta.estado === 'pendiente' && (
      <div className="flex gap-2 ml-2">
        <button
          onClick={() => manejarEstadoOferta(oferta._id, 'aceptar')}
          className="hover:bg-opacity-80 transition-all px-2 py-1 rounded-full flex items-center"
          style={{ backgroundColor: colorPalette.secondary, color: 'white' }}
        >
          <ThumbsUp className="w-4 h-4 mr-1" /> Aceptar
        </button>
        <button
          onClick={() => manejarEstadoOferta(oferta._id, 'rechazar')}
          className="hover:bg-opacity-80 transition-all px-2 py-1 rounded-full flex items-center"
          style={{ backgroundColor: colorPalette.error, color: '#FFE8E8' }}
        >
          <ThumbsDown className="w-4 h-4 mr-1" /> Rechazar
        </button>
      </div>
    );

    const estados = {
      aceptada: { bg: colorPalette.accent + '40', color: colorPalette.dark, icon: <Check className="w-4 h-4 mr-1" /> },
      rechazada: { bg: colorPalette.error + '20', color: colorPalette.error, icon: <X className="w-4 h-4 mr-1" /> },
      pendiente: { bg: colorPalette.secondary + '30', color: colorPalette.dark, icon: <Clock className="w-4 h-4 mr-1" /> }
    };

    return (
      <div className="flex items-center">
        <div className="px-3 py-1 rounded-full flex items-center"
             style={{ backgroundColor: estados[oferta.estado]?.bg, color: estados[oferta.estado]?.color }}>
          {estados[oferta.estado]?.icon}
          <span>{oferta.estado === 'pendiente'
            ? (propiedadId ? 'Pendiente de acción' : 'En revisión')
            : oferta.estado}
          </span>
        </div>
        {accionesPropietario}
      </div>
    );
  };

  const formatPrice = amount => new Intl.NumberFormat('es-ES', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: 2
  }).format(amount || 0);

  if (loading) return (
    <div className="w-full" style={{ backgroundColor: '#f8fafb' }}>
      <div className="p-4 flex items-center justify-between" style={{ backgroundColor: colorPalette.primary }}>
        <div className="flex items-center">
          <Tag className="text-white mr-2" />
          <h2 className="text-white text-xl font-semibold">{propiedadId ? 'OFERTAS RECIBIDAS' : 'MIS OFERTAS'}</h2>
        </div>
        <div className="w-10 h-10 bg-transparent" />
      </div>
      <div className="w-full p-16 flex flex-col items-center justify-center rounded-b-lg" style={{ backgroundColor: '#f8fafb' }}>
        <RefreshCw className="w-8 h-8 mb-4 animate-spin" style={{ color: colorPalette.primary }} />
        <p style={{ color: colorPalette.dark }}>Cargando ofertas...</p>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      <div className="p-4 flex items-center justify-between" style={{ backgroundColor: colorPalette.primary }}>
        <div className="flex items-center">
          <Tag className="text-white mr-2" />
          <h2 className="text-white text-xl font-semibold">{propiedadId ? 'OFERTAS RECIBIDAS' : 'MIS OFERTAS'}</h2>
        </div>
        <button onClick={recargarOfertas} className="p-2 rounded-full hover:bg-opacity-90 transition-all" style={{ backgroundColor: colorPalette.dark, color: 'white' }}>
          <RefreshCw className="w-5 h-5" />
        </button>
      </div>
      <div className="rounded-b-lg shadow-sm" style={{ backgroundColor: '#f8fafb', border: `1px solid ${colorPalette.accent}40` }}>
        {ofertas.length === 0 ? (
          <div className="p-16 text-center">
            <DollarSign className="w-16 h-16 mx-auto mb-4" style={{ color: colorPalette.accent }} />
            <p style={{ color: colorPalette.dark, fontSize: '1.1rem' }}>{propiedadId ? 'No hay ofertas recibidas' : 'No tienes ofertas activas'}</p>
          </div>
        ) : ofertas.map(oferta => (
          <div key={oferta._id} className="border-b p-4" style={{ borderColor: colorPalette.accent + '30' }}>
            <div className="flex flex-col md:flex-row md:items-center">
              <div className="w-full md:w-16 h-16 rounded flex-shrink-0 md:mr-4 flex items-center justify-center mb-4 md:mb-0" style={{ backgroundColor: colorPalette.accent + '20' }}>
                <DollarSign className="w-6 h-6" style={{ color: colorPalette.dark }} />
              </div>
              <div className="flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <h3 className="font-bold mb-2 md:mb-0" style={{ color: colorPalette.dark }}>{oferta.producto?.nombre || 'Producto sin nombre'}</h3>
                  {renderEstado(oferta)}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-1" style={{ color: colorPalette.secondary }} />
                    <span style={{ color: colorPalette.dark }}>Oferta: {formatPrice(oferta.precio_ofertado)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Tag className="w-4 h-4 mr-1" style={{ color: colorPalette.secondary }} />
                    <span style={{ color: colorPalette.dark }}>Precio original: {formatPrice(oferta.precio_original)}</span>
                  </div>
                  {propiedadId && (
                    <div className="flex items-center text-sm">
                      <span className="mr-1" style={{ color: colorPalette.dark }}>📧</span>
                      <span style={{ color: colorPalette.dark }}>Ofertante: {oferta.ofertante?.email || 'Anónimo'}</span>
                    </div>
                  )}
                </div>
                {oferta.mensaje && (
                  <div className="mt-2 p-2 rounded text-sm" style={{ backgroundColor: colorPalette.accent + '15', color: colorPalette.dark }}>
                    <p>"{oferta.mensaje}"</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {error && (
        <div className="p-4 rounded-lg flex items-start mt-4 mx-4" style={{ backgroundColor: colorPalette.error + '15', color: colorPalette.error }}>
          <AlertTriangle className="w-5 h-5 mr-2 mt-0.5" />
          <div>
            <p className="font-medium">{error}</p>
            <button onClick={recargarOfertas} className="mt-3 px-4 py-2 rounded text-sm flex items-center hover:bg-opacity-20 transition-all" style={{ backgroundColor: colorPalette.error + '20', color: colorPalette.error }}>
              <RefreshCw className="w-4 h-4 mr-1" /> Intentar nuevamente
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OfertasPrecios;
