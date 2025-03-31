"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "../components/general/footer/Footer";
import SearchBar from "../components/general/barSearch/searchBar";
import FiltersMenu from "../components/general/filters/Menu";
import Header from "../components/general/header/Headerlg";
import { Home, Building, BedDouble, BookOpen } from "lucide-react";
import AccommodationCard from "../components/general/cards-arrendador/card";

export default function Landing() {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Función para obtener propiedades del backend
  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('http://localhost:4000/api/alojamientos');
      
      if (!response.ok) {
        throw new Error('Error al cargar propiedades');
      }
      
      const data = await response.json();
      setProperties(data);
    } catch (error) {
      console.error('Error al obtener propiedades:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Cargar propiedades al montar el componente
  useEffect(() => {
    fetchProperties();
  }, []);

  const toggleFiltersMenu = () => setFiltersOpen(!isFiltersOpen);

  const categories = [
    { name: "Todos", icon: <Home className="w-6 h-6" /> },
    { name: "Apartamentos", icon: <Building className="w-6 h-6" /> },
    { name: "Casas", icon: <Home className="w-6 h-6" /> },
    { name: "Estudios", icon: <BookOpen className="w-6 h-6" /> },
    { name: "Habitaciones", icon: <BedDouble className="w-6 h-6" /> },
  ];

  return (
    <div className="bg-gray-800 min-h-screen">
      <Header />

      <section className="p-4 bg-[#275950]">
        <div className="flex justify-between w-full px-8 mb-4">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => setSelectedCategory(category.name)}
              className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors flex-1 mx-2 ${
                selectedCategory === category.name
                  ? "bg-[#9BF2EA] text-[#275950]"
                  : "bg-[#9BF2EA] text-[#275950] hover:bg-[#8ad9d1] hover:text-[#275950]"
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
            <p>Cargando propiedades...</p>
          </div>
        ) : properties.length === 0 ? (
          <div className="col-span-full text-center py-8">
            <p>No se encontraron propiedades</p>
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

      <FiltersMenu isOpen={isFiltersOpen} onClose={toggleFiltersMenu} />
      <Footer />
    </div>
  );
}