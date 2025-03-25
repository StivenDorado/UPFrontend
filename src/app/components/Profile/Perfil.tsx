import React, { useState } from 'react';
import { 
  MapPin, Calendar, Mail, Phone, Edit, Camera, Check, X, ChevronDown 
} from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';

interface UserInfo {
  // Usamos nombre de usuario local solo si no existe el de Google
  nombre: string;
  ubicacion: string;
  fechaUnion: string;
  correo: string;
  telefono: string;
  idiomas: string[];
  propiedadesFavoritas: number;
  ultimaActividad: string;
  verificado: boolean;
}

const Perfil: React.FC = () => {
  const { user } = useAuth(); // Obtenemos datos de Google
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [showMoreOptions, setShowMoreOptions] = useState<boolean>(false);
  
  // Se inicializa el estado usando algunos valores predeterminados;
  // para nombre y correo se usan valores de Google si existen.
  const [userInfo, setUserInfo] = useState<UserInfo>({
    nombre: user?.displayName || "MURIEL ESNEIDER",
    ubicacion: "DE LA CRUZ BARRIO",
    fechaUnion: "ABRIL DEL 2024",
    correo: user?.email || "correo@ejemplo.com",
    telefono: "+1 234 567 890",
    idiomas: ["Español", "Inglés", "Francés"],
    propiedadesFavoritas: 12,
    ultimaActividad: "Hace 2 días",
    verificado: true
  });

  const handleEdit = () => {
    if (isEditing) {
      // Aquí iría la lógica para guardar los cambios
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
      {/* Banner superior */}
      <div className="h-32 bg-gradient-to-r from-teal-500 to-teal-600 relative">
        {isEditing && (
          <button className="absolute right-4 top-4 bg-white p-2 rounded-full shadow-md">
            <Camera size={20} className="text-teal-600" />
          </button>
        )}
      </div>
      
      <div className="px-6 pb-6 relative">
        {/* Avatar y botones de acción */}
        <div className="flex justify-between">
          <div className="relative -mt-16">
            <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white shadow-md overflow-hidden">
              {/* Se muestra la foto de perfil de Google si existe */}
              {user?.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Foto de perfil" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  {isEditing ? <Camera size={32} /> : <span className="text-5xl font-light">ME</span>}
                </div>
              )}
            </div>
            {userInfo.verificado && (
              <div className="absolute bottom-2 right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                <Check size={16} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="mt-4 flex space-x-2">
            <button 
              onClick={handleEdit}
              className={`px-4 py-2 rounded-lg flex items-center ${isEditing 
                ? 'bg-green-500 text-white' 
                : 'bg-teal-500 text-white'}`}
            >
              {isEditing ? (
                <>
                  <Check size={16} className="mr-1" />
                  Guardar
                </>
              ) : (
                <>
                  <Edit size={16} className="mr-1" />
                  Editar
                </>
              )}
            </button>
            
            {isEditing && (
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg flex items-center"
              >
                <X size={16} className="mr-1" />
                Cancelar
              </button>
            )}
          </div>
        </div>
        
        {/* Información principal */}
        <div className="mt-4">
          {isEditing ? (
            <input 
              type="text" 
              value={userInfo.nombre}
              onChange={(e) => setUserInfo({ ...userInfo, nombre: e.target.value })}
              className="text-2xl font-bold w-full border-b border-teal-300 focus:border-teal-500 focus:outline-none pb-1"
            />
          ) : (
            // Se muestra el nombre de Google si existe; de lo contrario, se usa el nombre local.
            <h2 className="text-2xl font-bold">{user?.displayName || userInfo.nombre}</h2>
          )}
          
          <div className="flex flex-wrap items-center mt-2 text-gray-600">
            <div className="flex items-center mr-6 mb-2">
              <MapPin size={16} className="mr-1 text-teal-600" />
              {isEditing ? (
                <input 
                  type="text" 
                  value={userInfo.ubicacion}
                  onChange={(e) => setUserInfo({ ...userInfo, ubicacion: e.target.value })}
                  className="border-b border-teal-300 focus:border-teal-500 focus:outline-none w-40"
                />
              ) : (
                <span>{userInfo.ubicacion}</span>
              )}
            </div>
            
            <div className="flex items-center mb-2">
              <Calendar size={16} className="mr-1 text-teal-600" />
              <span>SE UNIÓ EN {userInfo.fechaUnion}</span>
            </div>
          </div>
          
          {/* Etiquetas de idioma */}
          <div className="flex flex-wrap gap-2 mt-3">
            {userInfo.idiomas.map((idioma, index) => (
              <span key={index} className="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-sm">
                {idioma}
              </span>
            ))}
            {isEditing && (
              <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm flex items-center">
                <span className="text-lg mr-1">+</span> Añadir
              </button>
            )}
          </div>
          
          {/* Estadísticas rápidas */}
          <div className="flex mt-4 space-x-4 text-sm">
            <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-lg">
              <span className="font-bold text-teal-600">{userInfo.propiedadesFavoritas}</span>
              <span className="text-gray-500">Favoritos</span>
            </div>
            <div className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-lg">
              <span className="text-gray-500">{userInfo.ultimaActividad}</span>
              <span className="text-gray-500">Última actividad</span>
            </div>
          </div>
        </div>
        
        {/* Información de contacto */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            <h3 className="text-teal-600 font-medium mb-2 flex items-center">
              <Mail size={16} className="mr-2" />
              DIRECCIÓN DE CORREO ELECTRÓNICO
            </h3>
            {isEditing ? (
              <input 
                type="email" 
                value={userInfo.correo}
                onChange={(e) => setUserInfo({ ...userInfo, correo: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <p className="flex items-center">
                <span className="font-medium">{user?.email || userInfo.correo}</span>
                {userInfo.verificado && <Check size={16} className="ml-2 text-green-500" />}
              </p>
            )}
          </div>
          
          <div className="border border-gray-200 rounded-lg p-4 bg-white hover:shadow-md transition-shadow">
            <h3 className="text-teal-600 font-medium mb-2 flex items-center">
              <Phone size={16} className="mr-2" />
              TELÉFONO
            </h3>
            {isEditing ? (
              <input 
                type="tel" 
                value={userInfo.telefono}
                onChange={(e) => setUserInfo({ ...userInfo, telefono: e.target.value })}
                className="w-full border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            ) : (
              <p className="font-medium">{userInfo.telefono}</p>
            )}
          </div>
        </div>
        
        {/* Opciones adicionales */}
        <div className="mt-6">
          <button 
            onClick={() => setShowMoreOptions(!showMoreOptions)}
            className="flex items-center text-gray-600 hover:text-teal-600 transition-colors"
          >
            <span className="mr-1">Más opciones</span>
            <ChevronDown size={16} className={`transition-transform ${showMoreOptions ? 'rotate-180' : ''}`} />
          </button>
          
          {showMoreOptions && (
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <h3 className="font-medium mb-3 text-gray-700">Preferencias de cuenta</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <input type="checkbox" id="notificaciones" className="mr-2" defaultChecked />
                  <label htmlFor="notificaciones">Recibir notificaciones por correo</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="marketing" className="mr-2" defaultChecked />
                  <label htmlFor="marketing">Recibir ofertas especiales</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="privacidad" className="mr-2" />
                  <label htmlFor="privacidad">Perfil privado</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Perfil;
