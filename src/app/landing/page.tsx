"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/general/footer/Footer";
import SearchBar from "../components/general/barSearch/searchBar";
import FiltersMenu from "../components/general/filters/Menu";
import Header from "../components/general/header/Headerlg";
import { Home, Building, BedDouble, BookOpen } from "lucide-react";
import AccommodationCard from "../components/general/cards-arrendador/card"; // Importar el componente de la card

export default function Landing() {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [properties, setProperties] = useState([
    // Ejemplo de propiedades iniciales
    {
      id: 1,
      name: "San Eduardo",
      distance: "5",
      dates: "Disponible desde 11-20 sep",
      price: "250,000",
      imageUrl: "https://a0.muscache.com/im/pictures/canvas/Canvas-1713384244713/original/51167052-ebe9-4a7e-9ff0-009ded0fd4a1.jpeg?im_w=720&im_format=avif",
      isFeatured: true,
      apartmentNumber: "Apto 101",
      availability: "11-20 sep",
      features: ["Wi-Fi", "Cocina", "Estacionamiento"]
    },
    // Puedes agregar más propiedades aquí
  ]);

  const toggleFiltersMenu = () => setFiltersOpen(!isFiltersOpen);

  const categories = [
    { name: "Todos", icon: <Home className="w-6 h-6" /> },
    { name: "Apartamentos", icon: <Building className="w-6 h-6" /> },
    { name: "Casas", icon: <Home className="w-6 h-6" /> },
    { name: "Estudios", icon: <BookOpen className="w-6 h-6" /> },
    { name: "Habitaciones", icon: <BedDouble className="w-6 h-6" /> },
  ];

  const addNewProperty = () => {
    const newProperty = {
      id: properties.length + 1,
      name: "Nueva Propiedad",
      distance: "10",
      dates: "Disponible desde 01-10 oct",
      price: "300,000",
      imageUrl: "https://a0.muscache.com/im/pictures/canvas/Canvas-1713384244713/original/51167052-ebe9-4a7e-9ff0-009ded0fd4a1.jpeg?im_w=720&im_format=avif",
      isFeatured: false,
      apartmentNumber: "Apto 202",
      availability: "01-10 oct",
      features: ["Wi-Fi", "Cocina", "Estacionamiento"]
    };
    setProperties([...properties, newProperty]);
  };

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
        {properties.map((property) => (
          <AccommodationCard key={property.id} id={property.id} apartmentData={property} />
        ))}
      </section>

      <button 
        onClick={addNewProperty}
        className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600"
      >
        Agregar Propiedad
      </button>

      <FiltersMenu isOpen={isFiltersOpen} onClose={toggleFiltersMenu} />
      <Footer />
    </div>
  );
}