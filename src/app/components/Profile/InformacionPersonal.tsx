import React, { useState } from 'react';

const InformacionPersonal = () => {
  const [formData, setFormData] = useState({
    nombre: 'Muriel',
    apellido: 'Espencer',
    correo: 'correo@ejemplo.com',
    telefono: '+1 234 567 890',
    direccion: 'De La Cruz Barrio',
    ciudad: 'Ciudad Ejemplo',
    biografia: 'Cuéntanos sobre ti...'
  });

  const [originalData, setOriginalData] = useState({...formData});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to an API
    console.log('Saving data:', formData);
    // Update the original data to match current data
    setOriginalData({...formData});
    alert('Datos guardados correctamente');
  };

  const handleCancel = () => {
    // Reset form to original values
    setFormData({...originalData});
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-medium text-gray-800 mb-6">Información personal</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-teal-600 mb-2">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="apellido" className="block text-teal-600 mb-2">
              Apellido
            </label>
            <input
              type="text"
              id="apellido"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="correo" className="block text-teal-600 mb-2">
              Correo electrónico
            </label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="telefono" className="block text-teal-600 mb-2">
              Teléfono
            </label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="direccion" className="block text-teal-600 mb-2">
              Dirección
            </label>
            <input
              type="text"
              id="direccion"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded-md"
            />
          </div>
          
          <div>
            <label htmlFor="ciudad" className="block text-teal-600 mb-2">
              Ciudad
            </label>
            <input
              type="text"
              id="ciudad"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              className="w-full p-2 border border-gray-200 rounded-md"
            />
          </div>
        </div>
        
        <div className="mt-6">
          <label htmlFor="biografia" className="block text-teal-600 mb-2">
            Biografía
          </label>
          <textarea
            id="biografia"
            name="biografia"
            value={formData.biografia}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border border-gray-200 rounded-md"
          />
        </div>
        
        <div className="flex justify-end mt-6 space-x-2">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Guardar cambios
          </button>
        </div>
      </form>
    </div>
  );
};

export default InformacionPersonal;