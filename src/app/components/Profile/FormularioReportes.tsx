import React, { useState } from 'react';

const FormularioReporte: React.FC = () => {
  const [formData, setFormData] = useState({
    nombres: '',
    apellidos: '',
    tipoDocumento: 'cedula',
    numeroDocumento: '',
    problema: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos enviados:', formData);
    // Aquí puedes agregar la lógica para enviar los datos
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md border-t-4 border-[#2A8C82]">
      <div className="text-center mb-8 relative">
        <h1 className="text-2xl font-semibold text-[#275950]">QUEREMOS QUE TU EXPERIENCIA SEA CÓMODA</h1>
        <div className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-[#41BFB3]"></div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="mb-4">
            <label htmlFor="nombres" className="block text-sm font-medium text-[#275950] mb-1">
              NOMBRES
            </label>
            <input
              type="text"
              id="nombres"
              name="nombres"
              value={formData.nombres}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41BFB3] focus:border-[#41BFB3]"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="apellidos" className="block text-sm font-medium text-[#275950] mb-1">
              APELLIDOS
            </label>
            <input
              type="text"
              id="apellidos"
              name="apellidos"
              value={formData.apellidos}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41BFB3] focus:border-[#41BFB3]"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-[#275950] mb-1">
            Tipo de documento
          </label>
          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="cedula"
                name="tipoDocumento"
                value="cedula"
                checked={formData.tipoDocumento === 'cedula'}
                onChange={handleChange}
                className="h-4 w-4 text-[#2A8C82] focus:ring-[#41BFB3]"
              />
              <label htmlFor="cedula" className="ml-2 text-sm text-gray-700">
                Cédula de Ciudadanía
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="tarjeta"
                name="tipoDocumento"
                value="tarjeta"
                checked={formData.tipoDocumento === 'tarjeta'}
                onChange={handleChange}
                className="h-4 w-4 text-[#2A8C82] focus:ring-[#41BFB3]"
              />
              <label htmlFor="tarjeta" className="ml-2 text-sm text-gray-700">
                Tarjeta de Identidad
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="pasaporte"
                name="tipoDocumento"
                value="pasaporte"
                checked={formData.tipoDocumento === 'pasaporte'}
                onChange={handleChange}
                className="h-4 w-4 text-[#2A8C82] focus:ring-[#41BFB3]"
              />
              <label htmlFor="pasaporte" className="ml-2 text-sm text-gray-700">
                Pasaporte
              </label>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="numeroDocumento" className="block text-sm font-medium text-[#275950] mb-1">
            NÚMERO DE DOCUMENTO
          </label>
          <input
            type="text"
            id="numeroDocumento"
            name="numeroDocumento"
            value={formData.numeroDocumento}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41BFB3] focus:border-[#41BFB3]"
            required
          />
        </div>

        <div className="mb-8">
          <label htmlFor="problema" className="block text-sm font-medium text-[#275950] mb-1">
            ¿QUÉ PROBLEMA TIENES?
          </label>
          <textarea
            id="problema"
            name="problema"
            value={formData.problema}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#41BFB3] focus:border-[#41BFB3]"
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="block w-full md:w-40 mx-auto py-3 px-6 bg-[#2A8C82] hover:bg-[#275950] text-white font-medium rounded-lg transition-colors duration-300 uppercase tracking-wide"
        >
          Enviar
        </button>
      </form>
    </div>
  );
};

export default FormularioReporte;