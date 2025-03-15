"use client";
import { auth } from "../../firebase";
import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut 
} from "firebase/auth";

export const authContext = createContext();

export const useAuth = () => {
    const context = useContext(authContext);
    if (!context) {
        console.log("Error creating auth context");
    }
    return context;
};

export function AuthProvider({ children }) {
    const register = async (email, password) => {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        console.log("Register response:", response);
        return response; // Retornamos la respuesta
    };

    const login = async (email, password) => {
        const response = await signInWithEmailAndPassword(auth, email, password);
        console.log("Login response:", response);
        return response; // Retornamos la respuesta
    };

    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        const response = await signInWithPopup(auth, provider);
        console.log("Google login response:", response);
        return response;
    };

    const logout = async () => {
        const response = await signOut(auth);
        console.log("Logout response:", response);
        return response;
    };

    return (
        <authContext.Provider value={{ register, login, loginWithGoogle, logout }}>
            {children}
        </authContext.Provider>
    );
}
