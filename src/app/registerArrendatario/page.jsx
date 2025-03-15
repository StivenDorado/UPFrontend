"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { auth } from "../../../firebase"; // Ajusta la ruta según tu estructura
import "../../../src/globals.css";

export default function RegistroArrendatario() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [arrendador, setArrendador] = useState(null);

  const handleContinuar = async () => {
    setLoading(true);
    setError(null);

    // Verificar que el usuario esté autenticado en Firebase
    if (!auth.currentUser) {
      setError("Usuario no autenticado. Por favor, inicia sesión.");
      setLoading(false);
      return;
    }

    try {
      // Obtener el token del usuario autenticado
      const token = await auth.currentUser.getIdToken();

      // Realizar la petición para registrar al arrendador
      const res = await fetch("http://localhost:4000/api/arrendador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al registrar arrendador");
      } else {
        // Registro exitoso, guarda el uid en localStorage y actualiza el estado
        localStorage.setItem("arrendadorId", data.arrendador.uid);
        console.log("arrendadorId guardado:", localStorage.getItem("arrendadorId"));

        setArrendador(data.arrendador);
        // Redirige a la ruta deseada
        router.push("/arrendatario");
      }
    } catch (err) {
      setError(err.message || "Error en la petición");
    }
    setLoading(false);
  };

  const handleVolver = () => {
    router.push("/profile");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10" />
      <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 text-center max-w-md w-full mx-4">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-4">
          ¿Quieres ser Arrendatario?
        </h1>
        <p className="text-gray-300 mb-8">
          Regístrate como arrendatario para publicar tus propiedades y llegar a más personas.
        </p>
        <button
          onClick={handleContinuar}
          disabled={loading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg mb-4 transition-all duration-300"
        >
          {loading ? "Registrando..." : "Continuar"}
        </button>
        <button
          onClick={handleVolver}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 rounded-lg transition-all duration-300"
        >
          Volver
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {arrendador && (
          <div className="mt-4 text-green-500">
            Registrado como arrendador. UID: {arrendador.uid}
          </div>
        )}
      </div>
    </div>
  );
}
