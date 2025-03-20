"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext"; // Ajusta la ruta según tu estructura
import { auth } from "../../../../firebase";             // Ajusta la ruta según tu estructura
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

// Define la interfaz de las props del modal
interface LandlordRegistrationModalProps {
  onClose?: () => void;
}

export default function LandlordRegistrationModal({ onClose }: LandlordRegistrationModalProps) {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Imprime en consola el estado del arrendador cada vez que user cambie
  useEffect(() => {
    console.log("Estado del arrendador:", user?.arrendador);
  }, [user]);

  // Lógica para registrar como arrendador
  const handleContinuar = async () => {
    setLoading(true);
    setError(null);

    if (!auth.currentUser) {
      setError("Usuario no autenticado. Por favor, inicia sesión.");
      setLoading(false);
      return;
    }

    try {
      const token = await auth.currentUser.getIdToken();
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
        localStorage.setItem("arrendadorId", data.arrendador.uid);
        setUser({ ...user, arrendador: true });
        if (onClose) onClose();
        router.push("/profile");
      }
    } catch (err: any) {
      setError(err.message || "Error en la petición");
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <Card className="w-full bg-slate-100 max-w-md border shadow-lg rounded-lg">
        <CardHeader className="bg-[#2A8C82] text-white rounded-t-lg">
          <CardTitle className="text-center text-xl font-bold">
            ¿Quieres registrarte como arrendador?
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-center text-gray-600">
            Selecciona una opción para continuar con el proceso de registro.
          </p>
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </CardContent>
        <CardFooter className="flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button
            variant="outline"
            className="w-full border-gray-300 hover:bg-gray-100 sm:w-auto"
            onClick={onClose}
          >
            Volver
          </Button>
          <Button
            className="w-full bg-[#2A8C82] hover:bg-[#237268] sm:w-auto"
            onClick={handleContinuar}
            disabled={loading}
          >
            {loading ? "Registrando..." : "Continuar como arrendador"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
