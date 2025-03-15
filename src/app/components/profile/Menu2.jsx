"use client";
import { useFavorites } from "../../../context/FavoritesContext";
import Link from "next/link";
import { 
  Heart,
  Home,      
  Bookmark,
  Flag,
  Bell,
  LogOut,
  PlusSquare,  
  List,        
  CreditCard,  
  User         
} from "lucide-react";

export default function Menu() {
  const menuItems = [
    { label: "Volver a ser usuario", href: "/volverUsuario", icon: <User className="w-5 h-5" /> },
    { label: "Publicar propiedad", href: "/publicarPropiedad", icon: <PlusSquare className="w-5 h-5" /> },
    { label: "Propiedades publicadas", href: "/propiedadesPublicadas", icon: <List className="w-5 h-5" /> },
    { label: "Pagos", href: "/pagos", icon: <CreditCard className="w-5 h-5" /> },
    { label: "Publicaciones guardadas", href: "/favorites", icon: <Bookmark className="w-5 h-5" /> },
    { label: "Enviar reportes", href: "/reports", icon: <Flag className="w-5 h-5" /> },
    { label: "Notificaciones", href: "/notifications", icon: <Bell className="w-5 h-5" /> },
    { label: "Inicio", href: "/landing2", icon: <Home className="w-5 h-5" /> },
    { label: "Cerrar sesión", href: "/", icon: <LogOut className="w-5 h-5" /> },
  ];

  const { favorites, addFavorite, removeFavorite } = useFavorites();

  const toggleFavorite = (room) => {
    if (favorites.some((fav) => fav.id === room.id)) {
      removeFavorite(room.id);
    } else {
      addFavorite(room);
    }
  };

  return (
    <div>
      {/* Menú */}
      <nav className="mt-8">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.href}
                className="flex items-center px-4 py-2 text-sm text-white rounded-md hover:bg-white/30 hover:text-blue-300 transition-all duration-150 ease-in-out"
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sección de publicaciones guardadas */}
      {favorites && favorites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-white text-lg font-bold mb-4 flex items-center">
            <span className="mr-2 mb-1 text-xl">🏠</span>
            Propiedades Favoritas
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {favorites.map((fav) => (
              <div key={fav.id} className="relative bg-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="relative h-32 w-full">
                  <img
                    src={fav.image}
                    alt={fav.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(fav)}
                    className="absolute top-2 right-2 p-2 rounded-full hover:bg-black/40 transition-colors duration-200"
                  >
                    <Heart
                      className={`w-5 h-5 ${favorites.some(f => f.id === fav.id) ? "text-red-500 fill-red-500" : "text-white/70 fill-white/30"}`}
                    />
                  </button>
                </div>

                {/* Detalles de la habitación */}
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white mb-1">{fav.name}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2">
                    {fav.description}
                  </p>
                  <div className="flex justify-between items-center mt-3">
                    <p className="text-blue-300 font-semibold">
                      ${fav.price} <span className="text-white text-sm">/Mes</span>
                    </p>
                    <Link
                      href={`/reserva/${fav.id}`}
                      className="text-sm text-white hover:text-blue-400 transition-colors"
                    >
                      Ver detalles
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
