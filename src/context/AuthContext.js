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

  const verificarUsuario = async (token, uid) => {
    try {
      const res = await fetch(`http://localhost:4000/api/usuario/${uid}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 404) return false;
      if (!res.ok) throw new Error("Error en la verificación del usuario");
      return true;
    } catch (error) {
      console.error("Error al verificar usuario:", error);
      return false;
    }
  };

  const registrarUsuario = async (token, usuarioData) => {
    try {
      const res = await fetch("http://localhost:4000/api/usuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(usuarioData),
      });

      if (!res.ok) {
        const errData = await res.json();
        console.log("Error registrando usuario:", errData);
      } else {
        console.log("Usuario registrado exitosamente en la BD");
      }
    } catch (error) {
      console.error("Error en el registro del usuario:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken(true);
          console.log("Token obtenido en AuthContext:", token);

          const esArrendador = await verificarArrendador(token, firebaseUser.uid);
          console.log("Resultado verificación arrendador:", esArrendador);

          if (!esArrendador) {
            const yaRegistrado = await verificarUsuario(token, firebaseUser.uid);

            if (!yaRegistrado) {
              const usuarioData = {
                uid: firebaseUser.uid,
                nombres_apellidos: firebaseUser.displayName || "Nombre no proporcionado",
                email: firebaseUser.email,
                fotoPerfil: firebaseUser.photoURL || null,
              };
              console.log("Registrando usuario con datos:", usuarioData);
              await registrarUsuario(token, usuarioData);
            } else {
              console.log("El usuario ya está registrado como Usuario");
            }
          }

          setUser({ 
            ...firebaseUser, 
            loggedIn: true, 
            arrendador: esArrendador 
          });
        } catch (error) {
          console.error("Error en proceso de autenticación:", error);
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
      return response;
    } catch (error) {
      console.error("Error en login con Google:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      return response;
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      const response = await signOut(auth);
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
