"use client";

import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "../barSearch/searchBar";
import FiltersMenu from "../filters/Menu";
import DropdownModal from "../dropmodal/perfil";

const Header = ({ 
  showSearchBar = true,
  onSearchTermChange,
  onFiltersClick
}) => {
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false);

  const handleFiltersClick = () => {
    setIsFiltersMenuOpen(true);
    if(onFiltersClick) onFiltersClick();
  };

  const handleCloseFiltersMenu = () => {
    setIsFiltersMenuOpen(false);
  };

  return (
    <header className="bg-[#2A8C82]">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-[#eae6e5] font-bold text-xl">
            Logo UrbanPoint
          </Link>
          <DropdownModal isLoggedIn={false} />
        </div>

        {showSearchBar && (
          <SearchBar 
            onSearchTermChange={onSearchTermChange}
            onFiltersClick={handleFiltersClick}
          />
        )}
      </div>

      <FiltersMenu 
        isOpen={isFiltersMenuOpen} 
        onClose={handleCloseFiltersMenu}
      />
    </header>
  );
};

export default Header;