"use client";
import { AuthProvider } from "../context/AuthContext";
import { FavoritesProvider } from "../context/FavoritesContext";
import { ReactNode } from "react";
import "../../src/globals.css";



type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="es">
      <body>
        {/* Proveedores de contexto */}
        <AuthProvider>
          <FavoritesProvider>
            {/* Contenido principal */}
            <main className="min-h-screen">
              {/* Capa oscura semitransparente */}
              <div/>
              {children}
            </main>
          </FavoritesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
