"use client";

import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

export default function Resenas() {
  const [resenas, setResenas] = useState<any[]>([]);
  const [promedio, setPromedio] = useState<number>(0);
  const [nuevaResena, setNuevaResena] = useState<string>("");
  const [puntuacion, setPuntuacion] = useState<number>(5);
  const [cargando, setCargando] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<any>(null);

  const propiedadId =
    typeof window !== "undefined"
      ? parseInt(window.location.pathname.split("/").pop() || "1")
      : 1;

  // Obtiene el user y token de Firebase
  const getAuthUser = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return null;
    const token = await user.getIdToken();
    return { uid: user.uid, token };
  };

  // --- Función que recarga reseñas y promedio (con manejo de errores) ---
  const recargarDatos = async () => {
    try {
      setError(null);
      const [resenasRes, promedioRes] = await Promise.all([
        fetch(`http://localhost:4000/api/resenas/propiedad/${propiedadId}`),
        fetch(`http://localhost:4000/api/resenas/propiedad/${propiedadId}/promedio`),
      ]);

      // Reseñas
      if (resenasRes.ok) {
        const data = await resenasRes.json();
        setResenas(data);
      } else {
        console.error("Error al recargar reseñas:", resenasRes.status);
      }

      // Promedio
      if (promedioRes.ok) {
        const raw = await promedioRes.json();
        // Puede venir { promedio: number } o un número crudo
        const valor =
          typeof raw === "number"
            ? raw
            : typeof raw.promedio === "number"
            ? raw.promedio
            : 0;
        setPromedio(Number(valor.toFixed(1)));
      } else {
        console.error("Error al recargar promedio:", promedioRes.status);
      }
    } catch (e: any) {
      console.error("Error en recargarDatos:", e);
      setError("Algo salió mal al actualizar los datos");
    }
  };

  // Carga inicial
  useEffect(() => {
    setCargando(true);
    recargarDatos().finally(() => setCargando(false));
  }, [propiedadId]);

  // Envío de nueva reseña
  const enviarResena = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nuevaResena.trim()) return;

    const authUser = await getAuthUser();
    if (!authUser) {
      setError("Debes iniciar sesión para dejar una reseña");
      return;
    }

    try {
      setCargando(true);
      setError(null);
      setDebugInfo(null);

      const payload = {
        usuario_uid: authUser.uid,
        propiedad_id: propiedadId,
        comentario: nuevaResena,
        puntuacion,
      };

      setDebugInfo({ request: payload });

      const resp = await fetch("http://localhost:4000/api/resenas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authUser.token}`,
        },
        body: JSON.stringify(payload),
      });

      const text = await resp.text();
      let body;
      try {
        body = JSON.parse(text);
      } catch {
        body = text;
      }

      setDebugInfo((prev: any) => ({
        ...prev,
        statusCode: resp.status,
        response: body,
      }));

      if (!resp.ok) {
        throw new Error(body.message || `Error ${resp.status}`);
      }

      // Re-cargamos sólo los datos, sin romper si uno falla
      await recargarDatos();

      // Reset de formulario
      setNuevaResena("");
      setPuntuacion(5);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCargando(false);
    }
  };

  const renderEstrellasSelector = () => (
    <div className="flex items-center mb-2">
      {[1, 2, 3, 4, 5].map((v) => (
        <button
          key={v}
          type="button"
          onClick={() => setPuntuacion(v)}
          className="focus:outline-none"
        >
          <svg
            className={`h-5 w-5 ${
              v <= puntuacion ? "text-yellow-400" : "text-gray-300"
            }`}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        </button>
      ))}
      <span className="text-sm ml-2">{puntuacion} / 5</span>
    </div>
  );

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h3 className="font-medium">Reseñas:</h3>
        <div className="flex items-center">
          <svg className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          <span className="text-sm ml-1">{promedio || "0.0"}</span>
        </div>
        <span className="text-sm text-gray-500">({resenas.length} calificaciones)</span>
      </div>

      {/* Form */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h4 className="text-sm font-medium mb-2">Deja tu opinión</h4>
        {renderEstrellasSelector()}
        <form onSubmit={enviarResena} className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-300 rounded-full" />
          <input
            className="rounded-full border px-3 py-2 w-full text-sm"
            placeholder="Escribe tu comentario..."
            value={nuevaResena}
            onChange={(e) => setNuevaResena(e.target.value)}
            disabled={cargando}
          />
          <button type="submit" className={`p-2 ${cargando ? "opacity-50" : ""}`} disabled={cargando}>
            {cargando ? (
              <div className="h-5 w-5 border-t-2 border-blue-500 rounded-full animate-spin" />
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </form>
      </div>

      {/* Error / Debug 
      {error && (
        <div className="bg-red-100 p-3 rounded text-red-700 mb-4">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}
      {debugInfo && (
        <div className="bg-blue-50 p-3 rounded mb-4 text-xs font-mono overflow-auto">
          <p className="font-medium mb-2">Información de depuración:</p>
          <div>
            <strong>Estado HTTP:</strong> {debugInfo.statusCode}
          </div>
          <div className="mt-2">
            <strong>Solicitud:</strong>
          </div>
          <pre>{JSON.stringify(debugInfo.request, null, 2)}</pre>
          <div className="mt-2">
            <strong>Respuesta:</strong>
          </div>
          <pre>
            {typeof debugInfo.response === "object"
              ? JSON.stringify(debugInfo.response, null, 2)
              : debugInfo.response}
          </pre>
        </div>
      )} */}

      {/* Lista de reseñas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {resenas.length > 0 ? (
          resenas.map((r, i) => (
            <div key={r.resena_id || i} className="bg-white p-4 rounded shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 bg-gray-300 rounded-full" />
                <div>
                  <p className="text-sm font-medium">{r.usuario?.nombre || "Usuario anónimo"}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, j) => (
                      <svg
                        key={j}
                        className={`h-3 w-3 ${j < r.puntuacion ? "text-yellow-400" : "text-gray-300"}`}
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
              {r.comentario && <p className="text-sm mt-1">{r.comentario}</p>}
              {r.fecha_reseña && <p className="text-xs text-gray-500 mt-2">{new Date(r.fecha_reseña).toLocaleDateString()}</p>}
            </div>
          ))
        ) : (
          !cargando && <div className="col-span-3 text-center text-gray-500">No hay reseñas disponibles</div>
        )}
        {cargando && <div className="col-span-3 text-center text-gray-500">Cargando reseñas...</div>}
      </div>
    </div>
  );
}
