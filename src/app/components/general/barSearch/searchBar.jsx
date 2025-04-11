"use client";

import React, { useState } from "react";
import { useDebounce } from "use-debounce";
import { Button } from "../../ui/button";
import { CalendarIcon } from "lucide-react";
import { DateTimeModal } from "../calendario/date";

const SearchBar = ({ 
  onSearchTermChange = () => {}, // Valor por defecto añadido
  onFiltersClick 
}) => {
  const [searchTermRaw, setSearchTermRaw] = useState("");
  const [searchTerm] = useDebounce(searchTermRaw, 500);
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);

  React.useEffect(() => {
    onSearchTermChange(searchTerm);
  }, [searchTerm, onSearchTermChange]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setSearchTermRaw(e.target.value);
    }
  };

  const handleDateTimeClick = () => {
    setIsDateTimeModalOpen(true);
  };

  return (
    <section className="w-full p-4 flex flex-col items-center justify-center">
      <article className="w-full max-w-4xl bg-white rounded-full shadow-md flex items-center p-2 space-x-2">
        <Button
          variant="outline"
          className="w-full md:w-auto justify-start text-left font-normal border-0 shadow-sm bg-white"
          onClick={handleDateTimeClick}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          Fecha de Entrada
        </Button>

        <DateTimeModal
          isOpen={isDateTimeModalOpen}
          onOpenChange={setIsDateTimeModalOpen}
        />

        <div className="border-l border-gray-300 h-6 mx-2"></div>

        <input
          value={searchTermRaw}
          onChange={(e) => setSearchTermRaw(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="¿En qué barrio quieres vivir?"
          className="text-black flex-1 bg-transparent border-0 focus:outline-none p-2 text-center"
          aria-label="Buscar propiedades"
        />

        <div className="border-l border-gray-300 h-6 mx-2"></div>

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