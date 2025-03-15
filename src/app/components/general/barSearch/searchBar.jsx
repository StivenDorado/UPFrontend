"use client";

import React, { useState } from "react";
import { DateTimeModal } from "../calendario/date"; // Importa el modal de fecha y hora
import { Button } from "../../ui/button"; // Importa el componente Button
import { CalendarIcon } from "lucide-react"; // Importa el ícono de calendario

const SearchBar = ({ onFiltersClick }) => {
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);

  const handleDateTimeClick = () => {
    setIsDateTimeModalOpen(true); // Abre el modal de fecha y hora
  };

  return (
    <section className="w-full p-4 flex items-center justify-center">
      <article className="w-full max-w-4xl bg-white rounded-full shadow-md flex items-center p-2 space-x-2">
        {/* Botón "Fecha de Entrada" */}
        <Button
          variant="outline"
          className="w-full md:w-auto justify-start text-left font-normal border-0 shadow-sm bg-white"
          onClick={handleDateTimeClick}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Fecha de Entrada
        </Button>

        {/* Modal de fecha y hora */}
        <DateTimeModal
          isOpen={isDateTimeModalOpen}
          onOpenChange={setIsDateTimeModalOpen}
        />

        {/* Separador */}
        <div className="border-l border-gray-300 h-6 mx-2"></div>

        {/* Campo de entrada */}
        <input
          placeholder="¿En qué barrio quieres vivir?"
          className="text-black flex-1 bg-transparent border-0 focus:outline-none p-2 text-center"
        />

        {/* Separador */}
        <div className="border-l border-gray-300 h-6 mx-2"></div>

        {/* Botón "Filtros" */}
        <button
          className="text-black flex-shrink-0 px-4 py-2 rounded-full border-0 bg-transparent hover:bg-gray-100"
          onClick={onFiltersClick}
        >
          Filtros
        </button>
      </article>
    </section>
  );
};

export default SearchBar;