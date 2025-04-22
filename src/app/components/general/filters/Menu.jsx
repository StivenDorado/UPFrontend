import React, { useState, useEffect } from "react";
import {
  Wifi, Zap, Tv, Utensils, Droplet,
  Car, Settings, Snowflake, Flame,
  Sofa, PawPrint, Home, BedDouble, Book
} from "lucide-react";

const FiltersMenu = ({ isOpen, onClose, onApplyFilters }) => {
  // Estado local para controlar la visibilidad
  const [isModalOpen, setIsModalOpen] = useState(isOpen);
  
  // Sincroniza el estado local con la prop isOpen
  useEffect(() => {
    setIsModalOpen(isOpen);
  }, [isOpen]);

  const [filters, setFilters] = useState({
    tipo_vivienda: null,
    wifi: false,
    energia: false,
    tv: false,
    cocina: false,
    agua: false,
    garaje: false,
    lavadora: false,
    nevera: false,
    gas: false,
    amoblado: null,
    mascotas: null
  });

  const handleTipoVivienda = (tipo) => {
    setFilters(prev => ({
      ...prev,
      tipo_vivienda: prev.tipo_vivienda === tipo ? null : tipo
    }));
  };

  const toggleServicio = (servicio) => {
    setFilters(prev => ({
      ...prev,
      [servicio]: !prev[servicio]
    }));
  };

  const handleOption = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key] === value ? null : value
    }));
  };

  // Función de cierre
  const closeModal = () => {
    setIsModalOpen(false);
    if (onClose) onClose();
  };

  const handleAplicar = () => {
    // Aplicamos los filtros
    if (onApplyFilters) onApplyFilters(filters);
    // Cerramos el modal usando nuestra función de cierre
    closeModal();
  };

  // Si el modal no está abierto según nuestro estado local, no renderizamos nada
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg p-6 overflow-y-auto max-h-[90%] relative">
        <button
          className="absolute top-4 left-4 text-gray-500 hover:text-[#2A8C82]"
          onClick={closeModal}
        >
          ←
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center">Filtros</h2>

        {/* Tipo de Vivienda */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Tipo de vivienda</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { label: "Apartamento", value: "apartamento", icon: <Home size={20} /> },
              { label: "Casa", value: "casa", icon: <Home size={20} /> },
              { label: "Casa de Familia", value: "casa_familia", icon: <Home size={20} /> },
              { label: "Estudio", value: "estudio", icon: <Book size={20} /> },
              { label: "Habitación", value: "habitacion", icon: <BedDouble size={20} /> }
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => handleTipoVivienda(item.value)}
                className={`flex items-center justify-center p-3 border-2 rounded-lg ${
                  filters.tipo_vivienda === item.value
                    ? "border-[#2A8C82] bg-[#E6F0EF]"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {item.icon}
                <span className="ml-2 text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Servicios */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Servicios</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: "Wifi", key: "wifi", icon: <Wifi size={20} /> },
              { label: "Energía", key: "energia", icon: <Zap size={20} /> },
              { label: "Cocina", key: "cocina", icon: <Utensils size={20} /> },
              { label: "Agua", key: "agua", icon: <Droplet size={20} /> },
              { label: "Lavadora", key: "lavadora", icon: <Settings size={20} /> },
              { label: "Nevera", key: "nevera", icon: <Snowflake size={20} /> },
              { label: "TV", key: "tv", icon: <Tv size={20} /> },
              { label: "Garaje", key: "garaje", icon: <Car size={20} /> },
              { label: "Gas", key: "gas", icon: <Flame size={20} /> },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => toggleServicio(item.key)}
                className={`flex items-center p-3 border-2 rounded-lg ${
                  filters[item.key]
                    ? "border-[#2A8C82] bg-[#E6F0EF]"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                {item.icon}
                <span className="ml-2 text-sm">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Otros Filtros */}
        <section className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Otros filtros</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Amoblado</p>
              <div className="flex gap-2">
                {[
                  { label: "Amoblado", value: true, icon: <Sofa size={20} /> },
                  { label: "Sin amoblar", value: false, icon: <Sofa size={20} className="opacity-50" /> }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleOption("amoblado", item.value)}
                    className={`flex-1 flex items-center justify-center p-2 border-2 rounded-lg ${
                      filters.amoblado === item.value
                        ? "border-[#2A8C82] bg-[#E6F0EF]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2 text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-sm font-medium">Mascotas</p>
              <div className="flex gap-2">
                {[
                  { label: "Acepta", value: true, icon: <PawPrint size={20} /> },
                  { label: "No acepta", value: false, icon: <PawPrint size={20} className="opacity-50" /> }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleOption("mascotas", item.value)}
                    className={`flex-1 flex items-center justify-center p-2 border-2 rounded-lg ${
                      filters.mascotas === item.value
                        ? "border-[#2A8C82] bg-[#E6F0EF]"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    {item.icon}
                    <span className="ml-2 text-sm">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <button
          className="w-full py-3 text-white rounded-lg transition-colors bg-[#2A8C82] hover:bg-[#23746D]"
          onClick={handleAplicar}
        >
          Aplicar filtros
        </button>
      </div>
    </div>
  );
};

export default FiltersMenu;