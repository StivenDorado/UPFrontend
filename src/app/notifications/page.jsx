"use client";
import { useState } from "react";
import '../../../src/globals.css';

export default function NotificationsPage() {
  const [notifications] = useState([
    {
      id: 1,
      title: "Actualización disponible",
      description:
        "Se ha lanzado una nueva versión de la app. ¡Actualiza ahora para disfrutar de las novedades!",
      time: "Hace 2 horas",
    },
    {
      id: 2,
      title: "Mensaje nuevo",
      description: "Has recibido un mensaje de Juan. Haz clic para leerlo.",
      time: "Hace 30 minutos",
    },
    {
      id: 3,
      title: "Recordatorio",
      description:
        "No olvides completar tu perfil para obtener mejores recomendaciones.",
      time: "Hace 1 día",
    },
  ]);

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-lg"></div>

      {/* Contenido por encima del overlay */}
      <div className="relative z-10 container mx-auto p-4">
        <h1 className="text-4xl font-bold text-white text-center mb-8">
          Notificaciones
        </h1>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 bg-black/40 backdrop-blur-sm rounded-lg shadow-sm border border-gray-700"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-semibold text-white">
                  {notification.title}
                </h2>
                <span className="text-sm text-gray-400">
                  {notification.time}
                </span>
              </div>
              <p className="text-gray-300">{notification.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
