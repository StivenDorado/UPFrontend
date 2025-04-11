"use client";

import React, { useState, useEffect } from "react";
import { useDebounce } from "use-debounce"; // Instala: npm install use-debounce
import { Button } from "../../ui/button";
import { CalendarIcon } from "lucide-react";
import { DateTimeModal } from "../calendario/date";
import { format } from "date-fns"; // Instala: npm install date-fns

const SearchBar = ({ onFiltersClick }) => {
  const [searchTermRaw, setSearchTermRaw] = useState("");
  const [searchTerm] = useDebounce(searchTermRaw, 500);
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isDateTimeModalOpen, setIsDateTimeModalOpen] = useState(false);

  // Efecto para búsqueda automática con debounce
  useEffect(() => {
    const fetchProperties = async () => {
      if (!searchTerm) {
        setProperties([]);
        return;
      }

      setIsLoading(true);
      setError(null);
      
      try {
        const response = await fetch(
          `http://localhost:4000/api/propiedades/search?q=${encodeURIComponent(searchTerm)}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error en la búsqueda");
        }

        const { data } = await response.json();
        setProperties(data);
      } catch (err) {
        setError(err.message);
        console.error("Search error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [searchTerm]);

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
        {/* Sección Fecha */}
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

        {/* Campo de Búsqueda */}
        <input
          value={searchTermRaw}
          onChange={(e) => setSearchTermRaw(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="¿En qué barrio quieres vivir?"
          className="text-black flex-1 bg-transparent border-0 focus:outline-none p-2 text-center"
          aria-label="Buscar propiedades"
        />

        <div className="border-l border-gray-300 h-6 mx-2"></div>

        {/* Botón Filtros */}
        <button
          className="text-black flex-shrink-0 px-4 py-2 rounded-full border-0 bg-transparent hover:bg-gray-100"
          onClick={onFiltersClick}
        >
          Filtros
        </button>
      </article>

      {/* Estado de la Búsqueda */}
      <div className="mt-4 text-center">
        {isLoading && <p className="text-gray-500">Buscando propiedades...</p>}
        {error && <p className="text-red-500">{error}</p>}
      </div>

      {/* Resultados */}
      {!isLoading && properties.length > 0 && (
        <section className="mt-4 w-full max-w-4xl space-y-4">
          <h2 className="text-xl font-bold text-gray-800">
            {properties.length} Propiedades encontradas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((propiedad) => (
              <article
                key={propiedad.id}
                className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-lg text-gray-800">
                  {propiedad.titulo}
                </h3>
                <p className="text-gray-600 mt-2">{propiedad.direccion}</p>
                <div className="mt-4">
                  <p className="text-primary font-bold">
                    ${propiedad.precio?.toLocaleString("es-AR")}/mes
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {!isLoading && properties.length === 0 && searchTerm && (
        <p className="mt-4 text-gray-500">
          No encontramos propiedades que coincidan con "{searchTerm}"
        </p>
      )}
    </section>
  );
};

export default SearchBar;