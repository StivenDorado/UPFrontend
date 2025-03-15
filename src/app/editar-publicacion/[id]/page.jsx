"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Home, MapPin, DollarSign, Upload, Check } from "lucide-react";
import { auth } from "../../../../firebase"; 
import "../../../../src/globals.css";

export default function EditarPropiedad() {
  const router = useRouter();
  const { id: propiedadId } = useParams();
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    direccion: "",
    precio: "",
    imagen: null,
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState(null);

  // Cargar la propiedad a editar
  useEffect(() => {
    if (!propiedadId) return;
    
    const cargarPropiedad = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/publicacion/${propiedadId}`);
        if (!res.ok) {
          throw new Error("Error al cargar la propiedad");
        }
        const data = await res.json();
        setFormData({
          titulo: data.titulo,
          descripcion: data.descripcion,
          direccion: data.direccion,
          precio: data.precio,
          imagen: null, // No se establece el archivo, se mantiene la imagen actual en preview
        });
        setPreviewImage(`http://localhost:4000/uploads/${data.imagen}`);
      } catch (err) {
        console.error("Error al cargar la propiedad:", err);
        setError("Error al cargar la propiedad");
      }
    };

    cargarPropiedad();
  }, [propiedadId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imagen: file }));
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const currentUser = auth.currentUser;
    if (!currentUser) {
      setError("Usuario no autenticado. Inicia sesión.");
      return;
    }
    const token = await currentUser.getIdToken();
    if (!token) {
      setError("No se pudo obtener el token de autenticación.");
      return;
    }

    try {
      const data = new FormData();
      data.append("titulo", formData.titulo);
      data.append("descripcion", formData.descripcion);
      data.append("direccion", formData.direccion);
      data.append("precio", formData.precio);
      if (formData.imagen) {
        data.append("imagen", formData.imagen);
      }

      const res = await fetch(`http://localhost:4000/api/publicacion/${propiedadId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Error al actualizar la propiedad");
      } else {
        alert("¡Propiedad actualizada con éxito!");
        router.push("/propiedadesPublicadas");
      }
    } catch (err) {
      console.error("Error en la petición:", err);
      setError("Error en la petición");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10" />
      <div className="bg-black/40 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/10 flex flex-col lg:flex-row gap-8 max-w-4xl w-full mx-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400 mb-6">
            Editar Propiedad
          </h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Home className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="titulo"
                placeholder="Título"
                value={formData.titulo}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white"
                required
              />
            </div>
            <div className="relative">
              <textarea
                name="descripcion"
                placeholder="Descripción"
                value={formData.descripcion}
                onChange={handleChange}
                rows="4"
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white"
                required
              />
            </div>
            <div className="relative">
              <MapPin className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white"
                required
              />
            </div>
            <div className="relative">
              <DollarSign className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                name="precio"
                placeholder="Precio"
                value={formData.precio}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white"
                required
              />
            </div>
            <div className="relative">
              <label className="flex items-center justify-center w-full h-16 bg-white/10 backdrop-blur-sm rounded-lg border border-white/10 text-white cursor-pointer hover:bg-white/20">
                <Upload className="w-5 h-5 mr-2" />
                <span>Seleccionar imagen</span>
                <input
                  type="file"
                  name="imagen"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg flex items-center justify-center">
              Actualizar <Check className="w-5 h-5 ml-2" />
            </button>
          </form>
        </div>
        <div className="flex-1 flex items-center justify-center">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Vista previa"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <p className="text-white">No hay imagen seleccionada</p>
          )}
        </div>
      </div>
    </div>
  );
}
