"use client";

import { useState, useEffect, useContext, useRef } from "react";
import Footer from "../components/general/footer/Footer";
import FiltersMenu from "../components/general/filters/Menu";
import Header from "../components/general/header/Headerlg";
import { Home, Building, BedDouble, BookOpen } from "lucide-react";
import AccommodationCard from "../components/general/cards-arrendador/card";
import { authContext } from "@/context/AuthContext";

interface Property {
  id: string;
  [key: string]: any;
}

interface Filters {
  [key: string]: boolean | string | number | null;
}

export default function Landing() {
  const { user } = useContext(authContext) as {
    user: { uid: string; token: string } | null;
    loading: boolean;
  };
  
  const prevUserRef = useRef(user); // Para trackear el estado anterior del usuario
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isFiltersOpen, setFiltersOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");
  const [appliedFilters, setAppliedFilters] = useState<Filters | null>(null);

  // Efecto para recargar solo cuando cambia de logged-in a logged-out
  useEffect(() => {
    if (prevUserRef.current !== null && user === null) {
      window.location.reload();
    }
    prevUserRef.current = user; // Actualizar referencia
  }, [user]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let endpoint = "";

        if (searchTerm) {
          endpoint = `http://localhost:4000/api/propiedades/search?q=${encodeURIComponent(searchTerm)}`;
        } else if (appliedFilters) {
          const filteredFilters = Object.entries(appliedFilters).filter(([key, value]) => {
            const serviceKeys = ['wifi', 'energia', 'tv', 'cocina', 'agua', 'garaje', 'lavadora', 'nevera', 'gas'];
            if (serviceKeys.includes(key)) return value === true;
            return value !== null && value !== undefined;
          });

          const queryParameters = filteredFilters
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value as string | number | boolean)}`)
            .join("&");

          endpoint = `http://localhost:4000/api/caracteristicas/buscar?${queryParameters}`;
        } else {
          endpoint = "http://localhost:4000/api/alojamientos";
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Error en la búsqueda");
        }

        const result = await response.json();
        setProperties(searchTerm ? result.data : result);
      } catch (err: any) {
        setError(err.message);
        console.error("Error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [searchTerm, appliedFilters]);

  const categories = [
    { name: "Todos", icon: <Home className="w-6 h-6" /> },
    { name: "Apartamentos", icon: <Building className="w-6 h-6" /> },
    { name: "Casas", icon: <Home className="w-6 h-6" /> },
    { name: "Estudios", icon: <BookOpen className="w-6 h-6" /> },
    { name: "Habitaciones", icon: <BedDouble className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-gray-800 min-h-screen">
      <Header
        showSearchBar={true}
        onSearchTermChange={setSearchTerm}
        onFiltersClick={() => setFiltersOpen(true)}
      />

      <section className="p-4 bg-[#275950]">
        <div className="flex justify-between w-full px-8 mb-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 mx-2 ${
                selectedCategory === category.name
                  ? "bg-[#9BF2EA] text-[#275950]"
                  : "bg-[#9BF2EA] text-[#275950] hover:bg-[#8ad9d1]"
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6 bg-white justify-center">
        {isLoading ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">Buscando propiedades...</p>
          </div>
        ) : error ? (
          <div className="col-span-full text-center py-8">
            <p className="text-red-500">{error}</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-600">
              {searchTerm
                ? `No hay resultados para "${searchTerm}"`
                : "No se encontraron propiedades"}
            </p>
          </div>
        ) : (
          properties.map((property) => (
            <AccommodationCard
              key={property.id}
              id={property.id}
              apartmentData={property}
            />
          ))
        )}
      </section>

      <FiltersMenu
        isOpen={isFiltersOpen}
        onClose={() => setFiltersOpen(false)}
        onApplyFilters={(filters: Filters) => {
          setAppliedFilters(filters);
          setFiltersOpen(false);
        }}
      />
      <Footer />
    </div>
  );
}