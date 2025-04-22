"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Star } from "lucide-react";
import PriceOfferModal from "../../components/Apprentice/ofrecer/Modal";
import Header from "../../components/general/header/Headerlg";
import Footer from "../../components/general/footer/Footer";
import { ReservationModal } from "../../components/Apprentice/modales/ReservasModal";
import { AppointmentModal } from "../../components/Apprentice/modales/CitasModal";
import { useAuth } from "../../../context/AuthContext"; // Ajusta la ruta según tu estructura

export default function PropertyPage() {
  const { id } = useParams();
  const { user } = useAuth(); // Obtén el usuario autenticado
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modals, setModals] = useState({ offer: false, reservation: false, appointment: false });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!id) return;

    const fetchProperty = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:4000/api/propiedades/publicacion/${id}`);
        if (!res.ok) throw new Error("No se pudo cargar la propiedad");

        const data = await res.json();
        setProperty(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) return <div className="text-center py-8">Cargando propiedad...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!property) return <div className="text-center py-8">Propiedad no encontrada</div>;

  // Verificar si el usuario está autenticado antes de abrir el modal de oferta
  const handleOpenOfferModal = () => {
    if (!user || !user.uid) {
      // Si no hay usuario autenticado, mostrar mensaje o redirigir a login
      alert("Debes iniciar sesión para hacer una oferta");
      // Opcionalmente: redirigir a página de login
      // router.push('/login');
      return;
    }
    setModals((prev) => ({ ...prev, offer: true }));
  };

  const handleNextImage = () => {
    if (property.imagenes && currentImageIndex < property.imagenes.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const handlePrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const handleImageError = (e) => {
    e.target.src = "/placeholder.jpg";
    e.target.className = "w-full h-full object-contain p-4";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Sección izquierda - Imágenes y botones */}
          <div className="flex flex-col gap-8">
            <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-video">
              {property.imagenes && property.imagenes.length > 0 ? (
                <>
                  <img
                    src={property.imagenes[currentImageIndex].url}
                    alt={`Imagen de la propiedad ${property.titulo}`}
                    className="w-full h-full object-cover"
                    onError={handleImageError}
                    loading="lazy"
                  />
                  {property.imagenes.length > 1 && (
                    <div className="absolute inset-0 flex items-center justify-between px-2">
                      <button
                        onClick={handlePrevImage}
                        disabled={currentImageIndex === 0}
                        className="bg-black/50 text-white rounded-full p-2 disabled:opacity-30"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={handleNextImage}
                        disabled={currentImageIndex === property.imagenes.length - 1}
                        className="bg-black/50 text-white rounded-full p-2 disabled:opacity-30"
                      >
                        &gt;
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">Imágenes no disponibles</span>
                </div>
              )}
            </div>

            {/* Miniaturas de imágenes */}
            {property.imagenes && property.imagenes.length > 1 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {property.imagenes.map((img, index) => (
                  <button
                    key={img.id}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-16 h-16 rounded-md overflow-hidden ${currentImageIndex === index ? 'ring-2 ring-[#2A8C82]' : ''}`}
                  >
                    <img
                      src={img.url}
                      alt={`Miniatura ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "/placeholder.jpg"}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Botones de acción */}
            <div className="flex flex-col gap-2">
              <button
                onClick={() => setModals((prev) => ({ ...prev, reservation: true }))}
                className="bg-[#2A8C82] hover:bg-[#275950] text-white py-3 rounded transition-colors duration-200"
              >
                RESERVAR
              </button>
              <button
                onClick={() => setModals((prev) => ({ ...prev, appointment: true }))}
                className="bg-[#41BFB3] hover:bg-[#2A8C82] text-white py-3 rounded transition-colors duration-200"
              >
                AGENDA UNA CITA
              </button>
            </div>
          </div>

          {/* Sección derecha - Información básica (como en la imagen) */}
          <div className="flex flex-col gap-8">
            <div className="bg-[#91F2E9]/20 rounded-lg shadow-md p-4">
              <h2 className="font-bold text-sm text-[#275950]">{property.titulo || "Sin título"}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Star className="w-4 h-4 text-[#2A8C82]" />
                <span className="text-sm ml-1">0.0 (0 reseñas)</span>
              </div>
              <div className="border-t border-[#41BFB3]/30 mt-4 pt-4">
                <h3 className="text-sm font-medium text-[#275950]">Información del Precio</h3>
                <div className="flex justify-between py-2">
                  <span className="text-sm">Cobro mensual</span>
                  <span className="text-sm font-medium">${property.precio.toLocaleString()} COP</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleOpenOfferModal}
              className="bg-[#2A8C82] hover:bg-[#275950] text-white py-3 rounded transition-colors duration-200"
            >
              OFRECER PRECIO
            </button>
          </div>
        </div>
      </main>
      <Footer />

      {/* Modales */}
      <PriceOfferModal 
        isOpen={modals.offer} 
        onClose={() => setModals((prev) => ({ ...prev, offer: false }))} 
        usuarioUid={user?.uid || ""} 
        propiedadId={parseInt(id as string)} 
        productPrice={property.precio}
        productImageUrl={property?.imagenes?.[0]?.url}
        productRating={0}
        reviewCount={0}
        currency="COP"
      />
      <ReservationModal 
        isOpen={modals.reservation} 
        onClose={() => setModals((prev) => ({ ...prev, reservation: false }))} 
        propertyId={id} // Pasamos el ID de la propiedad
      />
      <AppointmentModal isOpen={modals.appointment} onClose={() => setModals((prev) => ({ ...prev, appointment: false }))} />
    </div>
  );
}