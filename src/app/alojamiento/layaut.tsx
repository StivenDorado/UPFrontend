import React, { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils"; // Asegúrate de que esta ruta sea correcta

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Registro de Alojamiento",
  description: "Formulario para registrar información de alojamientos",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={cn(inter.className, "bg-gray-100 min-h-screen flex items-center justify-center p-4")}>
        <main className="container mx-auto max-w-4xl bg-white shadow-lg rounded-lg p-6">
          {children}
        </main>
      </body>
    </html>
  );
}