"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";
import { LockKeyhole, Mail } from "lucide-react";

export default function PasswordReset() {
  const { resetPassword } = useAuth();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get("oobCode");

  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      setLoading(true);
      await resetPassword(oobCode, newPassword);
      setSuccess(true);
      setError("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#275950] to-[#1a3b35] p-4">
      <div className="bg-white bg-opacity-10 p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm border border-[#88F2E8] border-opacity-20">
        <h1 className="text-2xl font-bold mb-6 text-white text-center">
          Restablecer Contraseña
        </h1>

        {success ? (
          <div className="text-center">
            <p className="text-green-400 mb-4">¡Contraseña actualizada con éxito!</p>
            <a 
              href="/login" 
              className="text-[#88F2E8] hover:underline"
            >
              Volver al inicio de sesión
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <LockKeyhole className="h-5 w-5 text-[#88F2E8]" />
              </div>
              <input
                type="password"
                placeholder="Nueva contraseña"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-10 border border-[#41BFB3] border-opacity-30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#88F2E8] text-white placeholder-gray-300"
                minLength="6"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2A8C82] hover:bg-[#41BFB3] text-white font-bold py-3 px-4 rounded-lg transition duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-70"
            >
              {loading ? "Actualizando..." : "Restablecer Contraseña"}
            </button>

            {error && (
              <div className="mt-4 p-3 bg-red-900 bg-opacity-20 text-red-400 rounded-lg text-sm">
                {error}
              </div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}