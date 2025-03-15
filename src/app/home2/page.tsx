"use client";

import { useState } from "react";
import Link from "next/link";
import Footer from "../components/general/footer/Footer";
import FiltersMenu from "../components/general/filters/Menu";
import Header from "../components/general/header/Headerlg";
/* import Header2 from "../components/header2/header2"; */


export default function Landing() {
  const [isFiltersOpen, setFiltersOpen] = useState(false);

  // Función para alternar el estado del menú de filtros
  const toggleFiltersMenu = () => setFiltersOpen(!isFiltersOpen);

  return (
    <div className="bg-gray-800 min-h-screen">
      {/* <Header2 /> */}

      {/* Barra de búsqueda */}
      {/* {<header className="relative bg-white shadow">
        <SearchBar onFiltersClick={toggleFiltersMenu} />
      </header>} */}
      <Header />
      

      {/* Sección de resultados */}
      <section className="p-4 grid grid-cols-3 gap-4">
        <div className="bg-gray-300 h-24 rounded-md" />
        <div className="bg-gray-300 h-24 rounded-md" />
        <div className="bg-gray-300 h-24 rounded-md" />
      </section>

      <section className="grid grid-cols-4 gap-20 p-24">
        {Array.from({ length: 16 }).map((_, index) => (
          <Link href="/reserva" key={index}>
            <div className="flex flex-col items-center justify-center">
              <div className="bg-zinc-700 relative w-60 h-56 rounded-t-lg">
                <button className="bg-transparent absolute top-1 right-2 rounded-lg px-1 py-1">
                  <svg
                    className="h-5 w-5"
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

              <div className="text-black flex flex-col items-center bg-gray-300 w-60 h-28 rounded-b-lg">
                <h3 className="text-lg font-semibold">San Eduardo</h3>
                <p className="text-xs text-gray-500 text-center">
                  Disponible desde 11-20 sep
                </p>
                <p className="text-lg font-bold text-center">
                  $ 250,000.00 COP / Mes
                </p>
              </div>
            </div>
          </Link>
        ))}
      </section>

      {/* Menú de filtros */}
      <FiltersMenu isOpen={isFiltersOpen} onClose={toggleFiltersMenu} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
