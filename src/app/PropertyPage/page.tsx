"use client"; // Asegúrate de que este archivo sea un Client Component

import { useState } from "react";
import { Star, Clock } from "lucide-react";
import PriceOfferModal from "../components/Apprentice/ofrecer/Modal"; // Ajusta la ruta según tu estructura
import Header from "../components/general/header/Headerlg";
import Footer from "../components/general/footer/Footer";
import { ReservationModal } from "../components/Apprentice/modales/ReservasModal";
import { AppointmentModal } from "../components/Apprentice/modales/CitasModal";

export default function PropertyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);

  const handleSaveAppointment = (data) => {
    console.log("Datos de la cita:", data);
    // Aquí puedes enviar los datos al backend o realizar alguna acción adicional
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Side - Imagen de la propiedad y botones de reservación */}
          <div className="flex flex-col gap-8">
            {/* Imagen de la propiedad */}
            <div className="rounded-lg overflow-hidden bg-[#275950] aspect-video flex items-center justify-center">
              <div className="text-[#91F2E9]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="64"
                  height="64"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
                  <circle cx="12" cy="13" r="3" />
                </svg>
              </div>
            </div>

            {/* Botones de reservación */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setIsReservationModalOpen(true)}
                className="bg-[#2A8C82] hover:bg-[#275950] text-white py-3 rounded font-medium transition-colors duration-300"
              >
                RESERVAR
              </button>
              <button
                onClick={() => setIsAppointmentModalOpen(true)}
                className="bg-[#41BFB3] hover:bg-[#2A8C82] text-white py-3 rounded font-medium transition-colors duration-300"
              >
                AGENDA UNA CITA
              </button>
            </div>
          </div>

          {/* Right Side - Detalles de la propiedad y oferta de precio */}
          <div className="flex flex-col gap-8">
            {/* Detalles de la propiedad */}
            <div className="bg-[#91F2E9]/20 rounded-lg overflow-hidden shadow-md">
              <div className="p-4 flex items-start gap-4">
                <div className="bg-[#41BFB3] w-20 h-20 rounded" />
                <div className="flex-grow">
                  <h2 className="font-bold text-sm text-[#275950]">
                    APARTAMENTO EN BELLO HORIZONTE
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-[#2A8C82]" />
                      <span className="text-sm ml-1">0.0 (0 reseñas)</span>
                    </div>
                    <Clock className="w-4 h-4 ml-2 text-[#2A8C82]" />
                  </div>
                </div>
              </div>

              <div className="border-t border-[#41BFB3]/30 p-4">
                <h3 className="text-sm mb-4 font-medium text-[#275950]">
                  Información del Precio
                </h3>

                <div className="flex justify-between py-2">
                  <span className="text-sm">Cobro mensual</span>
                  <span className="text-sm font-medium">$250.000,00 COP</span>
                </div>

                <div className="flex justify-between py-2">
                  <span className="text-sm">Costo Servicios</span>
                  <span className="text-sm font-medium">$10.000,00 COP</span>
                </div>

                <div className="border-t border-[#41BFB3]/30 mt-2 pt-2 flex justify-between">
                  <span className="text-sm font-medium text-[#275950]">
                    Total del Costo
                  </span>
                  <span className="text-sm font-medium text-[#275950]">
                    $260.000,00 COP
                  </span>
                </div>
              </div>
            </div>

            {/* Botón de oferta de precio */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#2A8C82] hover:bg-[#275950] text-white py-3 rounded font-medium transition-all duration-200 ease-in-out transform hover:scale-105 hover:shadow-lg"
              >
                OFRECER PRECIO
              </button>

              <div className="text-center mt-2">
                <p className="text-sm text-[#275950]">
                  Precio Inicial: $260.000,00 COP
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Modal de oferta de precio */}
      <PriceOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        productImage="/placeholder.svg?height=150&width=200"
        productPrice={260000}
        productRating={4.8}
        reviewCount={9}
        currency="COP"
      />

      {/* Modal de reservas */}
      <ReservationModal
        isOpen={isReservationModalOpen}
        onClose={() => setIsReservationModalOpen(false)}
      />

      {/* Modal de citas */}
      <AppointmentModal
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
        onSave={handleSaveAppointment}
      />
    </div>
  );
}
