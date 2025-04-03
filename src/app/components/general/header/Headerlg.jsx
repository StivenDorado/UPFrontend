// src/components/Header.jsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "../barSearch/searchBar";
import FiltersMenu from "../filters/Menu";
import DropdownModal from "../dropmodal/perfil";
                                                                                                                                                                          
const Header = () => {
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false);

  const handleFiltersClick = () => {
    setIsFiltersMenuOpen(true);
  };

  const handleCloseFiltersMenu = () => {
    setIsFiltersMenuOpen(false);
  };

  return (
    <header className="bg-[#2A8C82]"> {/* Fondo oscuro */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-[#eae6e5] font-bold text-xl"> {/* Texto claro */}
            Logo UrbanPoint
          </Link>

          {/* DropdownModal para el menú de usuario */}
          <DropdownModal isLoggedIn={false} />
        </div>

        {/* Barra de búsqueda */}
        <SearchBar onFiltersClick={handleFiltersClick} />
      </div>

      {/* Menú de filtros */}
      <FiltersMenu isOpen={isFiltersMenuOpen} onClose={handleCloseFiltersMenu} />
    </header>
  );
};

export default Header;