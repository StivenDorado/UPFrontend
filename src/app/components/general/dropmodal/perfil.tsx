"use client";

import { useState, useRef, useEffect } from "react";
import { Menu, User } from "lucide-react";
import Link from "next/link";

export default function DropdownModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={modalRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between gap-3 rounded-full border border-gray-300 bg-white px-3 py-1.5 shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="text-gray-500">
          <Menu size={18} />
        </div>
        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <User size={18} className="text-gray-500" />
        </div>
      </button>
      {isOpen && (
        <div className="absolute right-0 top-12 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <GuestView />
        </div>
      )}
    </div>
  );
}

function GuestView() {
  return (
    <div className="py-2 flex flex-col">
      <Link href="/login">
        <button className="px-4 py-3 text-left font-medium hover:bg-gray-100 transition-colors w-full">
          Inicia sesión
        </button>
      </Link>
      <Link href="/register">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors w-full">
          Regístrate
        </button>
      </Link>
      <div className="h-px bg-gray-200 my-1"></div>
      
      <Link href="/experiencias">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors w-full">
          Organiza una experiencia
        </button>
      </Link>
      <Link href="/ayuda">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors w-full">
          Centro de ayuda
        </button>
      </Link>
      
    </div>
  );
}
