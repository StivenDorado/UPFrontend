"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";
import "../../../src/globals.css";
import { FaGoogle, FaUserPlus, FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const { login, loginWithGoogle, register } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [error, setError] = useState(null);

  // Función para verificar si el usuario está registrado como arrendador
  const verificararrendador = async (token, userUid) => {
    try {
      const res = await fetch("http://localhost:4000/api/arrendador", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
  
      const data = await res.json();
      console.log("Respuesta del endpoint de arrendador:", data);
  
      // Si la respuesta es un array, buscamos el arrendador con el mismo UID
      if (Array.isArray(data)) {
        const arrendador = data.find((p) => p.uid.trim() === userUid.trim());
        if (arrendador) {
          localStorage.setItem("arrendadorId", arrendador.uid);
          return true;
        }
      }
  
      return false;
    } catch (error) {
      console.error("Error verificando arrendador:", error);
      return false;
    }
  };
  
  const handleAuth = async () => {
    if (!email || !password) {
      console.error("Email y contraseña son obligatorios.");
      return;
    }
    try {
      let response;
      if (isNewUser) {
        response = await register(email, password);
        console.log("Usuario registrado correctamente:", response);
      } else {
        response = await login(email, password);
        console.log("Inicio de sesión exitoso:", response);
      }
  
      if (!response || !response.user) {
        setError("Error: la respuesta de autenticación no contiene usuario.");
        return;
      }
  
      const user = response.user;
      const token = await user.getIdToken();
      console.log("Token obtenido:", token);
  
      // Verificamos si el usuario está registrado como arrendador usando su UID
      const esarrendador = await verificararrendador(token, user.uid);
      console.log("¿Es arrendador?", esarrendador);
  
      if (esarrendador) {
        router.push("/landing2");
      } else {
        router.push("/landing2");
      }
    } catch (error) {
      console.error("Error en la autenticación:", error.message);
      setError(error.message);
    }
  };
  
  const handleGoogleLogin = async () => {
    try {
      const response = await loginWithGoogle();
      console.log("Inicio de sesión con Google exitoso:", response);
  
      if (!response || !response.user) {
        setError("Error: la respuesta de autenticación no contiene usuario.");
        return;
      }
  
      const user = response.user;
      const token = await user.getIdToken();
      console.log("Token obtenido:", token);
  
      const esarrendador = await verificararrendador(token, user.uid);
      console.log("¿Es arrendador?", esarrendador);
  
      if (esarrendador) {
        router.push("/landing2");
      } else {
        router.push("/landing2");
      }
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
      setError(error.message);
    }
  };
  
  return (
    <div className="h-screen flex flex-col items-center justify-center transform -translate-y-20">
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-white via-gray-200 to-white opacity-20 blur-sm"></div>
        {/* Contenedor del logo */}
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
  
        {error && (
          <p className="text-red-500 mt-4">
            {error}
          </p>
        )}
  
        <p
          onClick={() => setIsNewUser(!isNewUser)}
          className="text-white cursor-pointer hover:underline"
        >
          {isNewUser
            ? "¿Ya tienes cuenta? Inicia sesión"
            : "¿No tienes cuenta? Regístrate"}
        </p>
      </div>
    </div>
  );
}
