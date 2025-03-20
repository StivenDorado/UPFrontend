"use client";

import { useState, useRef, useEffect } from "react";
import {
  Menu,
  User,
  MessageSquare,
  Bell,
  Heart,
  HelpCircle,
  LogOut,
  Home
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "../../../../context/AuthContext";

export default function DropdownModal() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  // Debug logs
  console.log("Usuario en DropdownModal:", user);
  console.log("¿Es arrendador?", user?.arrendador);

  // Cierra el modal al hacer clic fuera de él
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
          {user ? (
            // Usar === true para comparación estricta
            user.arrendador === true ? (
              <Modal3 onLogout={logout} />
            ) : (
              <Modal2 onLogout={logout} />
            )
          ) : (
            <Modal1 />
          )}
        </div>
      )}
    </div>
  );
}


function Modal1() {
  return (
    <div className="py-2 flex flex-col">
      <Link href="/login">
        <button className="px-4 py-3 text-left font-medium hover:bg-gray-100 transition-colors w-full">
          Inicia sesión
        </button>
      </Link>
      <Link href="/login">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors w-full">
          Regístrate
        </button>
      </Link>
      <div className="h-px bg-gray-200 my-1"></div>
      <Link href="/ayuda">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors w-full">
          Centro de ayuda
        </button>
      </Link>
    </div>
  );
}

// Definimos una interfaz para tipar la propiedad onLogout
interface ModalProps {
  onLogout: () => void;
}

function Modal2({ onLogout }: ModalProps) {
  return (
    <div className="py-2 flex flex-col">
      <Link href="/profile?section=mensajes">
        <button className="px-4 py-3 text-left font-medium hover:bg-gray-100 transition-colors flex items-center justify-between w-full">
          Mensajes
          <MessageSquare size={18} />
        </button>
      </Link>
      <Link href="/notificaciones">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center justify-between w-full">
          Notificaciones
          <div className="relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </button>
      </Link>
      <Link href="/profile?section=favoritos">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center justify-between w-full">
          Listas de favoritos
          <Heart size={18} />
        </button>
      </Link>

      <Link href="/profile">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors w-full">
          Perfil
        </button>
      </Link>
      <div className="h-px bg-gray-200 my-1"></div>
      <Link href="/ayuda">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center justify-between w-full">
          Centro de ayuda
          <HelpCircle size={18} />
        </button>
      </Link>
      <button
        onClick={onLogout}
        className="px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center justify-between w-full"
      >
        Cierra la sesión
        <LogOut size={18} />
      </button>
    </div>
  );
}

function Modal3({ onLogout }: ModalProps) {
  return (
    <div className="py-2 flex flex-col">
      <Link href="/profile?section=mensajes">
        <button className="px-4 py-3 text-left font-medium hover:bg-gray-100 transition-colors flex items-center justify-between w-full">
          Mensajes
          <MessageSquare size={18} />
        </button>
      </Link>
      <Link href="/notificaciones">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center justify-between w-full">
          Notificaciones
          <div className="relative">
            <Bell size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </button>
      </Link>
      <Link href="/alojamiento">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors w-full">
          Publicar Alojamiento
        </button>
      </Link>
      <Link href="/anuncios">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center justify-between w-full">
          Administra los anuncios
          <div className="relative">
            <Home size={18} />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </div>
        </button>
      </Link>
      <Link href="/profile">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors w-full">
          Perfil
        </button>
      </Link>
      <div className="h-px bg-gray-200 my-1"></div>
      <Link href="/ayuda">
        <button className="px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center justify-between w-full">
          Centro de ayuda
          <HelpCircle size={18} />
        </button>
      </Link>
      <button
        onClick={onLogout}
        className="px-4 py-3 text-left hover:bg-gray-100 transition-colors flex items-center justify-between w-full"
      >
        Cierra la sesión
        <LogOut size={18} />
      </button>
    </div>
  );
}
