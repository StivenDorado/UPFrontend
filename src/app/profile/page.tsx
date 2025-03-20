"use client";
import React, { useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  User,
  Info,
  Heart,
  Calendar,
  Clock,
  DollarSign,
  MessageSquare,
  BarChart2,
  Home,
  Building2,
  LogOut,
  ChevronLeft,
  Users
} from 'lucide-react';

import InformacionPersonal from '../components/Profile/InformacionPersonal';
import ListaFavoritos from '../components/Profile/ListaFavoritos';
import SolicitudesReservas from '../components/Profile/SolicitudReserva';
import SolicitudCitas from '../components/profile/SolicitudCita';
import MisPropiedades from '../components/Profile/MisPropiedades';
import Mensajes from '../components/Profile/Mensajes';
import OfertasPrecio from '../components/Profile/OfertasPrecio';
import Perfil from '../components/Profile/Perfil';

import { useAuth } from '../../context/AuthContext';

const ProfileInterface = () => {
  const { user, logout } = useAuth(); // Obtenemos el usuario autenticado desde el context
  const searchParams = useSearchParams();
  const router = useRouter();

  // Leemos el parámetro 'section' (si no existe, usamos 'perfil')
  const initialSection = searchParams.get('section') || 'perfil';
  const [activeSection, setActiveSection] = React.useState(initialSection);

  // Log de debugging y actualización si cambia el query
  useEffect(() => {
    const paramSection = searchParams.get('section') || 'perfil';
    console.log("searchParams section:", paramSection);
    setActiveSection(paramSection);
  }, [searchParams]);

  console.log("activeSection:", activeSection);

  // Determinamos el tipo de usuario según la propiedad "arrendador" del usuario
  const userType = user && user.arrendador ? 'arrendador' : 'usuario';

  // Si el usuario aún no está cargado, mostramos un mensaje de carga
  if (!user) {
    return <div>Cargando...</div>;
  }

  // Función para cerrar sesión y redirigir a landing
  const handleLogout = async () => {
    try {
      await logout();
      router.push('/landing');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  // Renderizamos el contenido de cada sección
  const renderContent = () => {
    switch (activeSection) {
      case 'perfil':
        return <Perfil />;
      case 'informacion':
        return <InformacionPersonal />;
      case 'favoritos':
        return <ListaFavoritos />;
      case 'solicitudes_citas':
        return <SolicitudCitas />;
      case 'solicitudes_reservas':
        return <SolicitudesReservas />;
      case 'ofertas':
        return <OfertasPrecio />;
      case 'mensajes':
        return <Mensajes />;
      case 'reportes':
        return <div>Enviar Reportes</div>;
      case 'propiedades':
        return <MisPropiedades />;
      case 'inicio':
        return <div>Inicio</div>;
      case 'registro_arrendador':
        return <div>Registrarse como Arrendatario</div>;
      default:
        return <div>Contenido del Perfil</div>;
    }
  };

  return (
    <div className="flex h-screen bg-white">
      {/* Sidebar */}
      <div className="w-72 bg-teal-700 text-white p-4">
        <div className="flex items-center mb-6">
          {/* Foto de perfil */}
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Foto de perfil"
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gray-200 mr-3"></div>
          )}
          <div>
            <div className="font-semibold">{user.displayName || "Usuario"}</div>
            <div className="text-xs flex items-center">
              <span className="mr-1">
                {userType === 'usuario' ? <User size={12} /> : <Building2 size={12} />}
              </span>
              {userType === 'usuario' ? 'Usuario' : 'Arrendador'}
            </div>
          </div>
        </div>

        <nav className="space-y-3">
          <button
            className={`flex items-center w-full p-3 rounded-md ${activeSection === 'perfil' ? "bg-teal-600" : "hover:bg-teal-600"}`}
            onClick={() => setActiveSection('perfil')}
          >
            <User className="mr-3" size={18} /> Perfil
          </button>

          <button
            className={`flex items-center w-full p-3 rounded-md ${activeSection === 'informacion' ? "bg-teal-600" : "hover:bg-teal-600"}`}
            onClick={() => setActiveSection('informacion')}
          >
            <Info className="mr-3" size={18} /> Información personal
          </button>

          {userType === 'usuario' ? (
            <>
              <button
                className={`flex items-center w-full p-3 rounded-md ${activeSection === 'favoritos' ? "bg-teal-600" : "hover:bg-teal-600"}`}
                onClick={() => setActiveSection('favoritos')}
              >
                <Heart className="mr-3" size={18} /> Lista de Favoritos
              </button>

              <button
                className={`flex items-center w-full p-3 rounded-md ${activeSection === 'solicitudes_citas' ? "bg-teal-600" : "hover:bg-teal-600"}`}
                onClick={() => setActiveSection('solicitudes_citas')}
              >
                <Calendar className="mr-3" size={18} /> Solicitudes para citas
              </button>

              <button
                className={`flex items-center w-full p-3 rounded-md ${activeSection === 'solicitudes_reservas' ? "bg-teal-600" : "hover:bg-teal-600"}`}
                onClick={() => setActiveSection('solicitudes_reservas')}
              >
                <Clock className="mr-3" size={18} /> Solicitudes de reservas
              </button>

              

            </>
          ) : (
            <>
              <button
                className={`flex items-center w-full p-3 rounded-md ${activeSection === 'solicitudes_citas' ? "bg-teal-600" : "hover:bg-teal-600"}`}
                onClick={() => setActiveSection('solicitudes_citas')}
              >
                <Calendar className="mr-3" size={18} /> Solicitudes de citas
              </button>

              <button
                className={`flex items-center w-full p-3 rounded-md ${activeSection === 'ofertas' ? "bg-teal-600" : "hover:bg-teal-600"}`}
                onClick={() => setActiveSection('ofertas')}
              >
                <DollarSign className="mr-3" size={18} /> Ofertas de precio
              </button>
            </>
          )}

          <button
            className={`flex items-center w-full p-3 rounded-md ${activeSection === 'mensajes' ? "bg-teal-600" : "hover:bg-teal-600"}`}
            onClick={() => setActiveSection('mensajes')}
          >
            <MessageSquare className="mr-3" size={18} /> Mensajes
          </button>

          {userType === 'usuario' && (
            <button
              className={`flex items-center w-full p-3 rounded-md ${activeSection === 'reportes' ? "bg-teal-600" : "hover:bg-teal-600"}`}
              onClick={() => setActiveSection('reportes')}
            >
              <BarChart2 className="mr-3" size={18} /> Enviar reportes
            </button>
          )}

          {userType === 'arrendador' && (
            <button
              className={`flex items-center w-full p-3 rounded-md ${activeSection === 'propiedades' ? "bg-teal-600" : "hover:bg-teal-600"}`}
              onClick={() => setActiveSection('propiedades')}
            >
              <Building2 className="mr-3" size={18} /> Mis propiedades
            </button>
          )}

          <button
            className={`flex items-center w-full p-3 rounded-md ${activeSection === 'inicio' ? "bg-teal-600" : "hover:bg-teal-600"}`}
            onClick={() => router.push('/landing')}
          >
            <Home className="mr-3" size={18} /> Inicio
          </button>

          {/* Botón para registrarse como arrendatario */}
          {userType === 'usuario' && (
            <Link href="/registerArrendador">
              <button
                className={`flex items-center w-full pt-3 pl-2 pb-3 rounded-md ${activeSection === 'registro_arrendador' ? "bg-teal-600" : "hover:bg-teal-600"}`}
                onClick={() => setActiveSection('registerArrendador')}
              >
                <Users className="mr-3" size={18} /> Registrarse como Arrendatario
              </button>
            </Link>
          )}

          {/* Botón para cerrar sesión (usa handleLogout para llamar a logout del context y redirigir) */}
          <button
            className="flex items-center w-full p-3 text-white hover:bg-teal-600 rounded-md mt-2"
            onClick={async () => {
              try {
                await logout();
                router.push('/landing');
              } catch (error) {
                console.error("Error al cerrar sesión:", error);
              }
            }}
          >
            <LogOut className="mr-3" size={18} /> Cerrar sesión
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <div className="bg-teal-600 text-white p-4 flex items-center">
          <button className="mr-4">
            <ChevronLeft size={24} />
          </button>
          <h1 className="text-xl font-medium">
            {userType === 'arrendador' ? "Perfil Arrendador" : "Perfil Usuario"}
          </h1>
        </div>

        {/* Contenido basado en activeSection */}
        <div className="p-4">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ProfileInterface;
