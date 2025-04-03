"use client";
import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  FileCheck, 
  FileSpreadsheet, 
  BookOpen, 
  File, 
  Building, 
  MessageSquare, 
  Search, 
  Users,
  Home,
  Bell,
  Settings,
  LogOut,
  ChevronRight
} from 'lucide-react';

// Definimos los tipos para nuestros componentes
interface ComponentProps {
  title: string;
}

// Componentes de ejemplo (en una aplicación real, estos estarían en archivos separados)
const RevisarMatriculas: React.FC<ComponentProps> = ({ title }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4 text-[#275950]">{title}</h2>
    <p className="text-gray-700 mb-4">Listado de matrículas pendientes de revisión</p>
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-[#91F2E9] text-[#275950]">
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">Estudiante</th>
            <th className="py-2 px-4 text-left">Curso</th>
            <th className="py-2 px-4 text-left">Fecha</th>
            <th className="py-2 px-4 text-left">Estado</th>
            <th className="py-2 px-4 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2, 3, 4, 5].map((item) => (
            <tr key={item} className="border-b border-gray-200 hover:bg-gray-50">
              <td className="py-2 px-4">M-{1000 + item}</td>
              <td className="py-2 px-4">Estudiante {item}</td>
              <td className="py-2 px-4">Curso {item}</td>
              <td className="py-2 px-4">2025-03-{10 + item}</td>
              <td className="py-2 px-4">
                <span className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">Pendiente</span>
              </td>
              <td className="py-2 px-4">
                <button className="text-[#41BFB3] hover:text-[#275950] mr-2">Revisar</button>
                <button className="text-red-500 hover:text-red-700">Rechazar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Componente para mostrar mensajes por defecto para las demás secciones
const DefaultComponent: React.FC<ComponentProps> = ({ title }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4 text-[#275950]">{title}</h2>
    <p className="text-gray-700">Contenido del componente {title}</p>
    <div className="mt-4 p-4 bg-[#91F2E9] bg-opacity-20 rounded-lg border border-[#41BFB3] border-opacity-30">
      <p className="text-[#275950]">Esta sección está en desarrollo. Pronto tendrás acceso a todas las funcionalidades.</p>
    </div>
  </div>
);

const AdminPanel: React.FC = () => {
  // Estado para rastrear el componente actual
  const [currentComponent, setCurrentComponent] = useState<string>('revisar-matriculas');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [showNotifications, setShowNotifications] = useState<boolean>(false);

  // Función para cargar el componente seleccionado
  const loadComponent = (componentName: string) => {
    setCurrentComponent(componentName);
  };

  // Función para renderizar el componente activo
  const renderComponent = () => {
    switch (currentComponent) {
      case 'revisar-matriculas':
        return <RevisarMatriculas title="Revisar Matrículas" />;
      // Para los demás componentes, usamos un componente por defecto
      default:
        return <DefaultComponent title={getComponentTitle()} />;
    }
  };

  // Obtener el título para el breadcrumb
  const getComponentTitle = () => {
    switch (currentComponent) {
      case 'revisar-matriculas':
        return 'Revisar Matrículas';
      case 'verificacion-cuentas':
        return 'Verificación de Cuentas';
      case 'resenas-de-alojamientos':
        return 'Reseñas de alojamientos';
      case 'gestion-de-publicaciones':
        return 'Gestión de Publicaciones';
      case 'seguimiento-de-incidentes':
        return 'Seguimiento de Incidentes';
      case 'equipo-de-administradores':
        return 'Equipo de administradores';
      default:
        return 'Revisar Matrículas';
    }
  };

  // Cargar el componente de revisar matrículas por defecto
  useEffect(() => {
    loadComponent('revisar-matriculas');
  }, []);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-[#275950] h-full overflow-y-auto shadow-lg">
        {/* Perfil de usuario */}
        <div className="px-5 py-4 border-b border-[#41BFB3] border-opacity-30 flex items-center">
          <div className="w-10 h-10 rounded-full bg-[#91F2E9] mr-3 flex items-center justify-center text-[#275950] font-bold">
            ME
          </div>
          <div>
            <div className="text-white font-medium">Muriel Esneider</div>
            <div className="text-xs text-[#91F2E9]">Administrador</div>
          </div>
        </div>
        
        {/* Menú de navegación */}
        <div className="py-3 text-white">
          <div className="px-5 mb-2 text-xs text-[#91F2E9] uppercase font-semibold">Administración</div>
          
          <div 
            className={`px-5 py-3 cursor-pointer flex items-center hover:bg-[#2A8C82] transition-colors ${currentComponent === 'revisar-matriculas' ? 'bg-[#2A8C82] border-r-4 border-[#91F2E9]' : ''}`}
            onClick={() => loadComponent('revisar-matriculas')}
          >
            <FileCheck size={18} className="mr-3" /> Revisar Matrículas
          </div>
          <div 
            className={`px-5 py-3 cursor-pointer flex items-center hover:bg-[#2A8C82] transition-colors ${currentComponent === 'verificacion-cuentas' ? 'bg-[#2A8C82] border-r-4 border-[#91F2E9]' : ''}`}
            onClick={() => loadComponent('verificacion-cuentas')}
          >
            <BookOpen size={18} className="mr-3" /> Verificación de Cuentas
          </div>
          
          <div className="px-5 mt-4 mb-2 text-xs text-[#91F2E9] uppercase font-semibold">Revisiones</div>
          
          <div 
            className={`px-5 py-3 cursor-pointer flex items-center hover:bg-[#2A8C82] transition-colors ${currentComponent === 'resenas-de-alojamientos' ? 'bg-[#2A8C82] border-r-4 border-[#91F2E9]' : ''}`}
            onClick={() => loadComponent('resenas-de-alojamientos')}
          >
            <Building size={18} className="mr-3" /> Reseñas de alojamientos
          </div>
          <div 
            className={`px-5 py-3 cursor-pointer flex items-center hover:bg-[#2A8C82] transition-colors ${currentComponent === 'gestion-de-publicaciones' ? 'bg-[#2A8C82] border-r-4 border-[#91F2E9]' : ''}`}
            onClick={() => loadComponent('gestion-de-publicaciones')}
          >
            <FileSpreadsheet size={18} className="mr-3" /> Gestión de Publicaciones
          </div>
          <div 
            className={`px-5 py-3 cursor-pointer flex items-center hover:bg-[#2A8C82] transition-colors ${currentComponent === 'seguimiento-de-incidentes' ? 'bg-[#2A8C82] border-r-4 border-[#91F2E9]' : ''}`}
            onClick={() => loadComponent('seguimiento-de-incidentes')}
          >
            <Search size={18} className="mr-3" /> Seguimiento de Incidentes
          </div>
          
          <div className="px-5 mt-4 mb-2 text-xs text-[#91F2E9] uppercase font-semibold">Administradores</div>
          
          <div 
            className={`px-5 py-3 cursor-pointer flex items-center hover:bg-[#2A8C82] transition-colors ${currentComponent === 'equipo-de-administradores' ? 'bg-[#2A8C82] border-r-4 border-[#91F2E9]' : ''}`}
            onClick={() => loadComponent('equipo-de-administradores')}
          >
            <Users size={18} className="mr-3" /> Equipo de administradores
          </div>

          <div className="mt-auto px-5 py-4 border-t border-[#41BFB3] border-opacity-30 mt-8">
            <div className="py-2 flex items-center cursor-pointer hover:text-[#91F2E9]">
              <Settings size={18} className="mr-3" /> Configuración
            </div>
            <div className="py-2 flex items-center cursor-pointer hover:text-[#91F2E9]">
              <LogOut size={18} className="mr-3" /> Cerrar sesión
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col">
        {/* Barra superior */}
        <div className="bg-white p-4 shadow flex justify-between items-center">
          <div className="flex items-center text-[#275950]">
            <Home size={16} className="mr-1" /> / 
            <span className="mx-1 text-gray-500">Administración</span> / 
            <span className="ml-1 font-medium">{getComponentTitle()}</span>
          </div>
          
          <div className="flex items-center">
            <div className="relative mr-4">
              <input 
                type="text" 
                placeholder="Buscar..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="py-2 px-4 pr-10 rounded bg-gray-100 border border-gray-200 w-64 text-sm focus:outline-none focus:ring-2 focus:ring-[#41BFB3] focus:border-transparent" 
              />
              <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            
            <div className="relative">
              <button 
                className="p-2 rounded-full hover:bg-gray-100 relative"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={18} className="text-[#2A8C82]" />
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#260101] text-white rounded-full text-xs flex items-center justify-center">3</span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
                  <div className="p-3 border-b border-gray-200 font-medium text-[#275950]">
                    Notificaciones (3)
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[1, 2, 3].map((item) => (
                      <div key={item} className="p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                        <div className="font-medium text-sm text-[#2A8C82]">Nueva matrícula pendiente</div>
                        <div className="text-xs text-gray-600 mt-1">Estudiante ha enviado una nueva solicitud de matrícula</div>
                        <div className="text-xs text-gray-400 mt-1">Hace {item} hora{item > 1 ? 's' : ''}</div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center">
                    <button className="text-sm text-[#41BFB3] hover:text-[#275950]">Ver todas</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Contenido */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-100">
          <div className="component-container">
            {renderComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;