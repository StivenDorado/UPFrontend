"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/general/footer/Footer";
import SearchBar from "../components/general/barSearch/searchBar";
import FiltersMenu from "../components/general/filters/Menu";
import Header from "../components/general/header/Headerlg";
import { Home, Building, BedDouble, BookOpen } from "lucide-react";

export default function Landing() {
  const [isFiltersOpen, setFiltersOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

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
        {Array.from({ length: 16 }).map((_, index) => (
          <Link href="/reserva" key={index}>
            <div className="flex flex-col items-center justify-center border border-[#275950] rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition-shadow w-64 mx-auto">
              <div className="relative w-full h-48">
                <img
                  src="https://a0.muscache.com/im/pictures/canvas/Canvas-1713384244713/original/51167052-ebe9-4a7e-9ff0-009ded0fd4a1.jpeg?im_w=720&im_format=avif"
                  alt="Imagen del alojamiento"
                  className="w-full h-full object-cover"
                />
                <button className="bg-transparent absolute top-2 right-2 rounded-lg p-1">
                  <svg
                    className="h-6 w-6 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </button>
              </div>
              <div className="text-black flex flex-col items-center w-full p-4 ">
                <h3 className="text-lg font-semibold">San Eduardo</h3>
                <p className="text-sm text-gray-600 text-center">Disponible desde 11-20 sep</p>
                <p className="text-lg font-bold text-center">$ 250,000.00 COP / Mes</p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      <FiltersMenu isOpen={isFiltersOpen} onClose={toggleFiltersMenu} />
      <Footer />
    </div>
  );
}