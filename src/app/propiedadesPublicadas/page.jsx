"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Home, MapPin, DollarSign, Trash2, Edit } from "lucide-react";
import { auth } from "../../../firebase"; // Ajusta la ruta según tu estructura
import "../../../src/globals.css";

export default function MisPublicaciones() {
  const router = useRouter();
  const [publicaciones, setPublicaciones] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Esperar a que Firebase cargue el usuario
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        console.log("Usuario autenticado:", currentUser);
        setUser(currentUser);
        fetchPublicaciones(currentUser);
      } else {
        console.error("Usuario no autenticado");
        setUser(null);
        setLoading(false);
        setError("Usuario no autenticado. Inicia sesión.");
      }
    });

    return () => unsubscribe(); // Limpia el listener al desmontar
  }, []);

  // Función para obtener las publicaciones del arrendador
  const fetchPublicaciones = async (currentUser) => {
    setLoading(true);
    setError(null);

    // Se obtiene el ID del arrendador desde localStorage (clave "arrendadorId")
    const arrendadorId = localStorage.getItem("arrendadorId")?.trim();
    console.log("arrendadorId obtenido desde localStorage:", arrendadorId);
    if (!arrendadorId) {
      setError("No se encontró el ID del arrendador en localStorage.");
      setLoading(false);
      return;
    }

    try {
      const token = await currentUser.getIdToken();
      console.log("Token obtenido:", token);

      // Se utiliza el query parameter "arrendador_uid" para que coincida con lo que espera el backend
      const res = await fetch(`http://localhost:4000/api/publicacion?arrendador_uid=${arrendadorId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("Respuesta del servidor:", data);
      if (!res.ok) {
        setError(data.error || "Error al obtener las publicaciones");
      } else {
        setPublicaciones(data);
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      setError("Error en la petición: " + err.message);
    }
    setLoading(false);
  };

  // Función para eliminar una publicación en la base de datos
  const handleEliminarPublicacion = async (id) => {
    try {
      // Obtenemos el token del usuario autenticado
      const token = await auth.currentUser.getIdToken();
      // Realizamos la petición DELETE al endpoint
      const res = await fetch(`http://localhost:4000/api/publicacion/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const json = await res.json();
      console.log("Respuesta al eliminar publicación:", json);
      if (!res.ok) {
        alert(json.error || "Error al eliminar la publicación");
      } else {
        // Actualizamos el estado eliminando la publicación borrada
        setPublicaciones((prev) => prev.filter((pub) => pub.id !== id));
        alert("Publicación eliminada exitosamente");
      }
    } catch (err) {
      console.error("Error en la petición de eliminación:", err);
      alert("Error en la petición de eliminación: " + err.message);
    }
  };

  // Función para editar una publicación
  const handleEditarPublicacion = (id) => {
    router.push(`/editar-publicacion/${id}`);
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-white">Cargando publicaciones...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10" />
      <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 max-w-4xl w-full mx-4">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
          Mis Publicaciones
        </h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <div className="space-y-6">
          {publicaciones.length > 0 ? (
            publicaciones.map((publicacion) => (
              <div
                key={publicacion.id}
                className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 p-6 flex flex-col lg:flex-row gap-6"
              >
                <div className="w-full lg:w-1/3 h-48 lg:h-40 rounded-lg overflow-hidden">
                  <img
                    src={`http://localhost:4000/uploads/${publicacion.imagen}`}
                    alt={publicacion.titulo}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-white mb-2">
                    {publicacion.titulo}
                  </h2>
                  <p className="text-gray-300 mb-4">{publicacion.descripcion}</p>
                  <div className="flex items-center gap-4 text-gray-300">
                    <MapPin className="w-5 h-5" />
                    <p>{publicacion.direccion}</p>
                  </div>
                  <div className="flex items-center gap-4 text-gray-300 mt-2">
                    <DollarSign className="w-5 h-5" />
                    <p>${publicacion.precio} por mes</p>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-2 lg:gap-4 items-center justify-center">
                  <button
                    onClick={() => handleEditarPublicacion(publicacion.id)}
                    className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleEliminarPublicacion(publicacion.id)}
                    className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5 mr-2" />
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-white">No tienes publicaciones.</p>
          )}
        </div>
        <button
          onClick={() => router.push("/arrendatario")}
          className="w-full bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center mt-6"
        >
          Volver al perfil
        </button>
      </div>
    </div>
  );
}
