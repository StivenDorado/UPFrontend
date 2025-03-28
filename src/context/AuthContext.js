"use client";
import { auth } from "../../firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged
} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.error("Error creando el AuthContext");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Función para verificar si un usuario es arrendador
  const verificarArrendador = async (token, userUid) => {
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

  // Escucha los cambios en el estado de autenticación
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          // Obtener token y verificar estatus de arrendador
          const token = await firebaseUser.getIdToken(true);
          console.log("Token obtenido en AuthContext:", token);
          
          const esArrendador = await verificarArrendador(token, firebaseUser.uid);
          console.log("Resultado verificación arrendador en AuthContext:", esArrendador);
          
          // Si no es arrendador, registrar al usuario en el modelo Usuario
          if (!esArrendador) {
            console.log("Usuario no es arrendador, se procede a registrar en el modelo Usuario");
            const usuarioData = {
              uid: firebaseUser.uid,
              nombres_apellidos: firebaseUser.displayName || "Nombre no proporcionado",
              email: firebaseUser.email,
              fotoPerfil: firebaseUser.photoURL || null,
            };
            console.log("Datos a enviar:", usuarioData);
          
            const res = await fetch("http://localhost:4000/api/usuario", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify(usuarioData)
            });
          
            console.log("Respuesta del registro:", res);
          
            if (!res.ok) {
              const errData = await res.json();
              console.error("Error registrando el usuario en la BD", errData);
            } else {
              console.log("Usuario registrado exitosamente en la BD");
            }
          }
          
  
          // Actualizar el estado del usuario con la propiedad arrendador
          setUser({ 
            ...firebaseUser, 
            loggedIn: true, 
            arrendador: esArrendador 
          });
        } catch (error) {
          console.error("Error al verificar estado de arrendador:", error);
          setUser({ 
            ...firebaseUser, 
            loggedIn: true, 
            arrendador: false 
          });
        }
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login response:", response);
      return response;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const response = await signInWithPopup(auth, provider);
      console.log("Google login response:", response);
      return response;
    } catch (error) {
      console.error("Error en login con Google:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Register response:", response);
      return response;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await signOut(auth);
      console.log("Logout response:", response);
      localStorage.removeItem("arrendadorId");
      setUser(null);
      return response;
    } catch (error) {
      console.error("Error en logout:", error);
      throw error;
    }
  };

  return (
    <authContext.Provider value={{ user, setUser, register, login, loginWithGoogle, logout }}>
      {children}
    </authContext.Provider>
  );
}
