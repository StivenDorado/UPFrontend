"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useState, useEffect } from "react";
import "../../../src/globals.css";
import { FaGoogle, FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const { login, loginWithGoogle, register, user } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      router.push("/landing");
    }
  }, [user, router]);

  const handleAuth = async () => {
    if (!email || !password) {
      setError("Email y contraseña son obligatorios.");
      return;
    }
    
    try {
      if (isNewUser) {
        await register(email, password);
        console.log("Usuario registrado correctamente");
      } else {
        await login(email, password);
        console.log("Inicio de sesión exitoso");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error.message);
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      console.log("Inicio de sesión con Google exitoso");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center transform -translate-y-20">
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-white via-gray-200 to-white opacity-20 blur-sm"></div>
        <div className="relative bg-white bg-opacity-5 rounded-full p-1 backdrop-blur-sm shadow-md">
          <img src="/logoUP.png" alt="Logo" className="w-40 h-40 object-contain" />
        </div>
      </div>

      <div className="bg-black bg-opacity-40 p-8 rounded-lg shadow-lg w-96 text-center">
        <h1 className="text-2xl font-bold mb-6 text-white">
          {isNewUser ? "Regístrate" : "Inicia sesión"}
        </h1>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2 mb-6 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleAuth}
          className="w-full bg-green-600 hover:bg-green-800 text-white font-bold py-2 px-4 rounded-lg mb-3 transition flex items-center justify-center gap-2"
        >
          {isNewUser ? (
            <>
              <FaUserPlus /> Registrarse
            </>
          ) : (
            <>
              <FaSignInAlt /> Iniciar sesión
            </>
          )}
        </button>

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-lg mb-4 transition flex items-center justify-center gap-2"
        >
          <FaGoogle /> Iniciar sesión con Google
        </button>

        {error && <p className="text-red-500 mt-4">{error}</p>}

        <p
          onClick={() => setIsNewUser(!isNewUser)}
          className="text-white cursor-pointer hover:underline"
        >
          {isNewUser ? "¿Ya tienes cuenta? Inicia sesión" : "¿No tienes cuenta? Regístrate"}
        </p>
      </div>
    </div>
  );
}
