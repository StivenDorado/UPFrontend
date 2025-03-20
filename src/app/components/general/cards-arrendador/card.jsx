"use client";

import { useState } from "react";
import { Heart, MapPin, Calendar, DollarSign, Home, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AccommodationCard({ id, apartmentData }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const router = useRouter();

  const toggleFavorite = (e) => {
    e.stopPropagation(); // Evitar que el clic en el corazón también active la navegación
    setIsFavorite(!isFavorite);
  };

  const toggleDetails = (e) => {
    e.stopPropagation(); // Evitar que el clic en detalles active la navegación
    setShowDetails(!showDetails);
  };

  const handleCardClick = () => {
    router.push("/descripcionPropiedad"); // Redirigir a la página PropertyPage
  };

  // Valores predeterminados en caso de que no se pase apartmentData
  const {
    name = "Apartamento",
    distance = "0",
    dates = "Disponible",
    price = "0",
    imageUrl = "/img/habitacion-1.avif",
    isFeatured = false,
    apartmentNumber = "",
    availability = "",
    features = [],
  } = apartmentData || {};

  return (
    <div
      className="w-full max-w-xs mx-auto bg-white text-gray-800 border-2 border-gray-200 rounded-lg overflow-hidden cursor-pointer transition-transform hover:scale-105 shadow-lg hover:shadow-xl"
      onClick={handleCardClick}
    >
      <div className="relative">
        <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
        {isFeatured && (
          <div className="absolute top-3 left-3 bg-white/90 py-1 px-2 rounded-full text-xs font-semibold text-gray-800 shadow-sm">
            ⭐ Favorito entre huéspedes
          </div>
        )}
        <button
          className="absolute top-3 right-3 bg-white/90 p-2 rounded-full hover:bg-gray-100 transition-colors shadow-sm"
          onClick={toggleFavorite}
        >
          <Heart
            className={`h-5 w-5 ${
              isFavorite ? "fill-red-500 text-red-500" : "text-gray-800"
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg">{name}</h3>
        <p className="text-sm flex items-center text-gray-600">
          <MapPin className="h-4 w-4 mr-1" /> A {distance} kilómetros
        </p>
        <p className="text-sm mb-2 text-gray-600">{dates}</p>
        <p className="font-semibold text-gray-800">
          ${price} COP <span className="font-normal text-gray-600">Por mes</span>
        </p>

        {/* Botón para mostrar más detalles */}
        <button
          className="mt-2 text-sm text-green-600 hover:text-green-500 flex items-center"
          onClick={toggleDetails}
        >
          {showDetails ? "Ocultar detalles" : "Ver detalles"}
        </button>

        {/* Sección expandible con características */}
        {showDetails && (
          <div className="mt-3 pt-3 border-t border-gray-200">
            {apartmentNumber && (
              <p className="text-sm flex items-center mb-2 text-gray-600">
                <Home className="h-4 w-4 mr-1 text-gray-400" />
                {apartmentNumber}
              </p>
            )}
            {availability && (
              <p className="text-sm flex items-center mb-2 text-gray-600">
                <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                Disponible desde: {availability}
              </p>
            )}
            {features && features.length > 0 && (
              <div className="mt-2">
                <p className="text-sm font-medium mb-1 text-gray-800">Características:</p>
                <div className="flex flex-wrap gap-1">
                  {features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-gray-100 text-xs rounded-full px-2 py-1 text-gray-700 border border-gray-200"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}