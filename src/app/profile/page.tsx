"use client";
import React, { useEffect, useState } from 'react';
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
  ChevronRight,
  Users,
  FileText // Added for reservation requests icon
} from 'lucide-react';

import InformacionPersonal from '../components/Profile/InformacionPersonal';
import ListaFavoritos from '../components/Profile/ListaFavoritos';
import SolicitudesReservas from '../components/Profile/OfertasPrecio';
import CitasArrendador from '../components/Profile/CitasArrendador';
import SolicitudCitaAprendiz from '../components/Profile/SolicitudCitaAprendiz';

import MisPropiedades from '../components/Profile/MisPropiedades';
import Mensajes from '../components/Profile/Mensajes';
import OfertasPrecio from '../components/Profile/SolicitudesReservas';
import Perfil from '../components/Profile/Perfil';

import { useAuth } from '../../context/AuthContext';
import LandlordRegistrationModal from '../components/Profile/RegistarArrendador';

const ProfileInterface = () => {
  const { user, logout } = useAuth();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const initialSection = searchParams.get('section') || 'perfil';
  const [activeSection, setActiveSection] = useState(initialSection);
  const [showLandlordModal, setShowLandlordModal] = useState(false);

  useEffect(() => {
    const paramSection = searchParams.get('section') || 'perfil';
    setActiveSection(paramSection);
  }, [searchParams]);

  const userType = user && user.arrendador ? 'arrendador' : 'usuario';

  if (!user) {
    return <div>Cargando...</div>;
  }

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/landing');
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'perfil':
        return <Perfil />;
      case 'informacion':
        return <InformacionPersonal />;
      case 'favoritos':
        return <ListaFavoritos />;
      case 'solicitudes_citas_aprendiz':
        return <SolicitudCitaAprendiz />;
      case 'solicitudes_citas_arrendador':
        return <CitasArrendador />;
      case 'solicitudes_reservas':
        return <OfertasPrecio />;
      case 'ofertas':
        return <SolicitudesReservas />;
      case 'mensajes':
        return <Mensajes />;
      case 'reportes':
        return <div>Enviar Reportes</div>;
      case 'propiedades':
        return <MisPropiedades />;
      case 'inicio':
        return <div>Inicio</div>;
      default:
        return <div>Contenido del Perfil</div>;
    }
  };

  const NavItem = ({ icon, label, section, onClick }) => {
    const isActive = activeSection === section;
    
    return (
      <button
        className={`flex items-center w-full p-3 rounded-md ${
          isActive ? "bg-teal-600" : "hover:bg-teal-600"
        } ${isCollapsed ? 'justify-center' : ''}`}
        onClick={onClick || (() => setActiveSection(section))}
        title={isCollapsed ? label : ''}
      >
        {React.cloneElement(icon, { 
          className: isCollapsed ? '' : 'mr-3', 
          size: isCollapsed ? 24 : 18 
        })}
        {!isCollapsed && <span>{label}</span>}
      </button>
    );
  };

  return (
    <div className="flex h-screen bg-white">
      <div 
        className={`${
          isCollapsed ? 'w-20' : 'w-72'
        } bg-teal-700 text-white p-4 transition-all duration-300 relative`}
      >
        <div className={`flex ${isCollapsed ? 'justify-center' : 'items-center'} mb-8`}>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt="Foto de perfil"
              className={`${isCollapsed ? 'w-12 h-12' : 'w-10 h-10'} rounded-full ${isCollapsed ? '' : 'mr-3'} object-cover`}
            />
          ) : (
            <div className={`${isCollapsed ? 'w-12 h-12' : 'w-10 h-10'} rounded-full bg-gray-200 ${isCollapsed ? '' : 'mr-3'} flex items-center justify-center`}>
              <User size={isCollapsed ? 24 : 20} className="text-gray-500" />
            </div>
          )}

          {!isCollapsed && (
            <div>
              <div className="font-semibold">{user.displayName || "Usuario"}</div>
              <div className="text-xs flex items-center">
                <span className="mr-1">
                  {userType === 'usuario' ? <User size={12} /> : <Building2 size={12} />}
                </span>
                {userType === 'usuario' ? 'Usuario' : 'Arrendador'}
              </div>
            </div>
          )}
        </div>

        <nav className="space-y-4">
          <NavItem 
            icon={<User />} 
            label="Perfil" 
            section="perfil" 
          />
          
          <NavItem 
            icon={<Info />} 
            label="Información personal" 
            section="informacion" 
          />

          {userType === 'usuario' ? (
            <>
              <NavItem 
                icon={<Heart />} 
                label="Lista de Favoritos" 
                section="favoritos" 
              />
              
              <NavItem 
                icon={<Calendar />} 
                label="Solicitudes para citas" 
                section="solicitudes_citas_aprendiz"
              />
            </>
          ) : (
            <>
              <NavItem 
                icon={<Calendar />} 
                label="Solicitudes de citas" 
                section="solicitudes_citas_arrendador"
              />
              
              <NavItem 
                icon={<DollarSign />} 
                label="Ofertas de precio" 
                section="ofertas" 
              />
            </>
          )}
          
          {/* Added Solicitudes de reservas for both user types */}
          <NavItem 
            icon={<FileText />} 
            label="Solicitudes de reservas" 
            section="solicitudes_reservas" 
          />

          <NavItem 
            icon={<MessageSquare />} 
            label="Mensajes" 
            section="mensajes" 
          />

          {userType === 'usuario' && (
            <NavItem 
              icon={<BarChart2 />} 
              label="Enviar reportes" 
              section="reportes" 
            />
          )}

          {userType === 'arrendador' && (
            <NavItem 
              icon={<Building2 />} 
              label="Mis propiedades" 
              section="propiedades" 
            />
          )}

          <NavItem 
            icon={<Home />} 
            label="Inicio" 
            section="inicio" 
            onClick={() => router.push('/landing')}
          />

          {userType === 'usuario' && (
            <NavItem 
              icon={<Users />} 
              label="Registrarse como Arrendatario" 
              section="registro_arrendador" 
              onClick={() => setShowLandlordModal(true)}
            />
          )}

          <NavItem 
            icon={<LogOut />} 
            label="Cerrar sesión" 
            section="logout" 
            onClick={handleLogout}
          />
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="bg-teal-600 text-white p-4 flex items-center">
          <button 
            className="mr-4" 
            onClick={toggleSidebar}
          >
            {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
          </button>
          <h1 className="text-xl font-medium">
            {userType === 'arrendador' ? "Perfil Arrendador" : "Perfil Usuario"}
          </h1>
        </div>

        <div className="p-4">
          {renderContent()}
        </div>
      </div>

      {showLandlordModal && (
        <LandlordRegistrationModal onClose={() => setShowLandlordModal(false)} />
      )}
    </div>
  );
};

export default ProfileInterface;