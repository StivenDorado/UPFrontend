"use client";
import { auth } from "../../firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  confirmPasswordReset
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
  const [loading, setLoading] = useState(true);

  // Función para enviar correo de recuperación
  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error("Error al enviar correo de recuperación:", error);
      throw error;
    }
  };

  // Función para confirmar nueva contraseña
  const confirmPassword = async (oobCode, newPassword) => {
    try {
      await confirmPasswordReset(auth, oobCode, newPassword);
      return true;
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      throw error;
    }
  };

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
      if (!res.ok) throw new Error("Error registrando usuario");
    } catch (error) {
      console.error("Error en el registro del usuario:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true);
      if (firebaseUser) {
        try {
          const token = await firebaseUser.getIdToken(true);
          const esArrendador = await verificarArrendador(token, firebaseUser.uid);
          
          if (!esArrendador) {
            const yaRegistrado = await verificarUsuario(token, firebaseUser.uid);
            if (!yaRegistrado) {
              await registrarUsuario(token, {
                uid: firebaseUser.uid,
                nombres_apellidos: firebaseUser.displayName || "Nombre no proporcionado",
                email: firebaseUser.email,
                fotoPerfil: firebaseUser.photoURL || null,
              });
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
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      return await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error en login con Google:", error);
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      return await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error en registro:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      localStorage.removeItem("arrendadorId");
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error en logout:", error);
      throw error;
    }
  };

  return (
    <authContext.Provider 
      value={{ 
        user,
        setUser,           // ahora expuesto
        loading,
        register,
        login,
        loginWithGoogle,
        logout,
        sendPasswordReset,
        confirmPassword
      }}
    >
      {children}
    </authContext.Provider>
  );
}
