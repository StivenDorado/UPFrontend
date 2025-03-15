"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Home, MapPin, DollarSign, Upload, Check } from "lucide-react";
import { auth } from "../../../firebase"; // Ajusta la ruta según tu estructura
import "../../../src/globals.css";

export default function PublicarPropiedad() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    direccion: "",
    precio: "",
    imagen: null, // Archivo
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imagen: file })); // Guarda el archivo
      setPreviewImage(URL.createObjectURL(file)); // Crea una URL para la vista previa
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Verifica que se tenga el id del propietario desde localStorage y lo limpia
    const arrendadorId = localStorage.getItem("arrendadorId")?.trim();
    console.log("PropietarioId obtenido desde localStorage:", arrendadorId);
    if (!arrendadorId) {
      setError("No se encontró el id del propietario. Asegúrate de estar registrado.");
      return;
    }
    if (!auth.currentUser) {
      setError("Usuario no autenticado. Inicia sesión.");
      return;
    }

    try {
      // Obtén el token del usuario autenticado en Firebase
      const token = await auth.currentUser.getIdToken();
      console.log("Token obtenido:", token);

      // Prepara el FormData con los campos requeridos
      const data = new FormData();
      data.append("titulo", formData.titulo);
      data.append("descripcion", formData.descripcion);
      data.append("direccion", formData.direccion);
      data.append("precio", formData.precio);
      data.append("imagen", formData.imagen); // Asegúrate de que el campo se llame "imagen"
      data.append("arrendador_uid", arrendadorId);


      // Muestra los datos del FormData para depuración
      for (let pair of data.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      // Realiza la petición al endpoint de creación de propiedad
      const res = await fetch("http://localhost:4000/api/publicacion", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          // No se establece Content-Type al usar FormData
        },
        body: data,
      });

      const json = await res.json();
      console.log("Respuesta del servidor:", json);
      if (!res.ok) {
        setError(json.error || "Error al publicar la propiedad");
        console.error("Error publicando propiedad:", json);
      } else {
        console.log("Propiedad publicada:", json);
        alert("¡Propiedad publicada con éxito!");
        router.push("/propiedadesPublicadas");
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      setError(err.message || "Error en la petición");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10" />
      <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 flex flex-col lg:flex-row gap-8 max-w-4xl w-full mx-4">
        {/* Formulario */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
            Publicar Propiedad
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Campo: Título */}
            <div className="relative">
              <Home className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="titulo"
                placeholder="Título de la propiedad"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Campo: Descripción */}
            <div className="relative">
              <textarea
                name="descripcion"
                placeholder="Descripción de la propiedad"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Campo: Dirección */}
            <div className="relative">
              <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Campo: Precio */}
            <div className="relative">
              <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="precio"
                placeholder="Precio al mes"
                value={formData.precio}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {/* Campo: Imagen (Archivo) */}
            <div className="relative">
              <label className="flex items-center justify-center w-full h-16 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white cursor-pointer hover:bg-white/20 transition-all duration-300">
                <Upload className="w-5 h-5 mr-2" />
                <span>Seleccionar imagen</span>
                <input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  required
                />
              </label>
            </div>
            {/* Botón de Publicar */}
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center"
            >
              Publicar
              <Check className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>
        {/* Vista previa de la imagen */}
        <div className="flex-1 flex items-center justify-center">
          {previewImage ? (
            <div className="w-full h-96 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center">
              <img
                src={previewImage}
                alt="Vista previa de la propiedad"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="w-full h-80 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 flex items-center justify-center text-gray-400">
              <p>Vista previa de la imagen</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
