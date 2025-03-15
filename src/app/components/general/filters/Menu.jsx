import React from "react";
import {
  Home, // Icono para tipo de vivienda
  Wifi, // Icono para Wifi
  Zap, // Icono para Energía
  Tv, // Icono para TV
  Utensils, // Icono para Cocina
  Droplet, // Icono para Agua
  Car, // Icono para Garaje
  Settings, // Icono alternativo para Lavadora (Washer no existe)
  Snowflake, // Icono alternativo para Nevera (Refrigerator no existe)
  Flame, // Icono para Gas
  Sofa, // Icono para Amoblado
  PawPrint, // Icono para Acepta mascotas
} from "lucide-react";

const FiltersMenu = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Ocultar si el menú no está abierto

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90%] relative">
        {/* Botón de cierre */}
        <button
          className="absolute top-4 left-4 text-gray-500 hover:text-black"
          onClick={onClose}
        >
          ←
        </button>

        <h2 className="text-2xl font-semibold text-center mb-6">Filtros</h2>

        <div className="space-y-8 text-gray-800">
          {/* Tipo de vivienda */}
          <section className="text-center">
            <h3 className="text-lg font-semibold mb-4">Tipo de vivienda</h3>
            <div className="flex justify-center space-x-6">
              {[
                { label: "Apartamento", icon: <Home className="w-6 h-6" /> },
                { label: "Casa", icon: <Home className="w-6 h-6" /> },
                { label: "Casa de Familia", icon: <Home className="w-6 h-6" /> },
                { label: "Estudio", icon: <Home className="w-6 h-6" /> },
                { label: "Habitación", icon: <Home className="w-6 h-6" /> },
              ].map((tipo) => (
                <button
                  key={tipo.label}
                  className="flex flex-col items-center text-sm border-2 border-gray-300 rounded-lg p-4 hover:border-gray-500"
                >
                  {tipo.icon}
                  {tipo.label}
                </button>
              ))}
            </div>
          </section>

          {/* Servicios */}
          <section className="text-center">
            <h3 className="text-lg font-semibold mb-4">Servicios</h3>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "Wifi", icon: <Wifi className="w-6 h-6" /> },
                { label: "Energía", icon: <Zap className="w-6 h-6" /> },
                { label: "TV", icon: <Tv className="w-6 h-6" /> },
                { label: "Cocina", icon: <Utensils className="w-6 h-6" /> },
                { label: "Agua", icon: <Droplet className="w-6 h-6" /> },
                { label: "Garaje", icon: <Car className="w-6 h-6" /> },
                { label: "Lavadora", icon: <Settings className="w-6 h-6" /> }, // Icono alternativo
                { label: "Nevera", icon: <Snowflake className="w-6 h-6" /> }, // Icono alternativo
                { label: "Gas", icon: <Flame className="w-6 h-6" /> },
              ].map((servicio) => (
                <button
                  key={servicio.label}
                  className="flex flex-col items-center text-sm border-2 border-gray-300 rounded-lg p-4 hover:border-gray-500"
                >
                  {servicio.icon}
                  {servicio.label}
                </button>
              ))}
            </div>
          </section>

          {/* Filtros adicionales */}
          <section className="text-center">
            <h3 className="text-lg font-semibold mb-4">Otros filtros</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Amoblado", icon: <Sofa className="w-6 h-6" /> },
                {
                  label: "Sin Amoblar",
                  icon: (
                    <div className="relative">
                      <Sofa className="w-6 h-6" />
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="w-6 h-0.5 bg-red-500 transform rotate-45"></div>
                      </div>
                    </div>
                  ),
                },
                {
                  label: "Acepta mascotas",
                  icon: <PawPrint className="w-6 h-6" />,
                },
                {
                  label: "No acepta mascotas",
                  icon: (
                    <div className="relative">
                      <PawPrint className="w-6 h-6" />
                      <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                        <div className="w-6 h-0.5 bg-red-500 transform rotate-45"></div>
                      </div>
                    </div>
                  ),
                },
              ].map((filtro) => (
                <button
                  key={filtro.label}
                  className="flex flex-col items-center text-sm border-2 border-gray-300 rounded-lg p-4 hover:border-gray-500"
                >
                  {filtro.icon}
                  {filtro.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Botón para aplicar filtros */}
        <button
          className="mt-6 w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900"
          onClick={onClose}
        >
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FiltersMenu;