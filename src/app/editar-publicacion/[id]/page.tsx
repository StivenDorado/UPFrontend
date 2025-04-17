"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { useAuth } from "../../../context/AuthContext";
import Header from "../../components/general/header/Headerlg";
import Footer from "../../components/general/footer/Footer";

interface Caracteristica {
  id?: number;
  nombre: string;
  disponible: boolean;
}

interface Imagen {
  id: number;
  url: string;
}

interface FormValues {
  caracteristicas: Caracteristica[];
  toDelete: number[];
  newFiles: File[];
}

export default function EditFeaturesAndImagesPage() {
  const router = useRouter();
  const params = useParams();
  const propiedadId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { user } = useAuth() || {};
  const { control, register, handleSubmit, reset, getValues, setValue } = useForm<FormValues>({
    defaultValues: { caracteristicas: [], toDelete: [], newFiles: [] },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "caracteristicas",
  });

  const [imagenes, setImagenes] = useState<Imagen[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("ID de la propiedad recibido:", propiedadId);
    if (!propiedadId) return;

    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/propiedades/publicacion/${propiedadId}`);
        console.log("Respuesta del servidor (status):", res.status);

        if (!res.ok) {
          throw new Error(`Error al obtener la propiedad: ${res.status}`);
        }

        const data = await res.json();
        console.log("Datos de la propiedad recibidos:", data);

        reset({
          caracteristicas: data.caracteristicas || [],
          toDelete: [],
          newFiles: [],
        });

        setImagenes(data.imagenes || []);
      } catch (err) {
        console.error("Error al cargar la propiedad:", err);
        setError("No se pudo cargar la propiedad");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [propiedadId, reset]);

  const toggleDeleteImage = (id: number) => {
    const current = getValues("toDelete");
    const updated = current.includes(id)
      ? current.filter((x) => x !== id)
      : [...current, id];
    console.log("Imágenes marcadas para eliminar:", updated);
    setValue("toDelete", updated);
  };

  const onSubmit = async (data: FormValues) => {
    if (!user?.uid || !propiedadId) {
      setError("Usuario no autenticado o ID inválido");
      return;
    }

    try {
      console.log("Enviando características:", data.caracteristicas);
      await fetch(`http://localhost:4000/api/propiedades/${propiedadId}/caracteristicas`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caracteristicas: data.caracteristicas,
          arrendador_uid: user.uid,
        }),
      });

      console.log("Enviando imágenes...");
      const formData = new FormData();
      formData.append("arrendador_uid", user.uid);
      formData.append("toDelete", JSON.stringify(data.toDelete));
      data.newFiles.forEach((file) => formData.append("newFiles", file));

      await fetch(`http://localhost:4000/api/propiedades/${propiedadId}/imagenes`, {
        method: "PUT",
        body: formData,
      });

      console.log("Cambios guardados correctamente. Redirigiendo...");
      router.push(`/propiedades/${propiedadId}`);
    } catch (err) {
      console.error("Error al guardar los cambios:", err);
      setError("Error al guardar los cambios");
    }
  };

  if (loading) return <p className="text-center mt-8">Cargando...</p>;
  if (error) return <p className="text-red-500 text-center mt-8">{error}</p>;

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-[#275950]">
          Editar Características e Imágenes
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Características */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#9BF2EA]">
            <h2 className="text-xl font-semibold text-[#275950] mb-4">
              Características
            </h2>
            {fields.map((field, idx) => (
              <div key={field.id} className="flex items-center space-x-4 mb-3">
                <input
                  {...register(`caracteristicas.${idx}.nombre`, { required: true })}
                  placeholder="Nombre"
                  className="flex-1 px-3 py-2 border border-[#9BF2EA] rounded-md"
                />
                <label className="flex items-center space-x-1">
                  <input
                    type="checkbox"
                    {...register(`caracteristicas.${idx}.disponible`)}
                  />
                  <span>Disponible</span>
                </label>
                <button
                  type="button"
                  onClick={() => remove(idx)}
                  className="text-red-500 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ nombre: "", disponible: false })}
              className="text-[#2A8C82] hover:underline"
            >
              + Agregar característica
            </button>
          </div>

          {/* Imágenes */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-[#9BF2EA]">
            <h2 className="text-xl font-semibold text-[#275950] mb-4">
              Imágenes
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {imagenes.map((img) => {
                const marked = getValues("toDelete").includes(img.id);
                return (
                  <div key={img.id} className="relative">
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-32 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => toggleDeleteImage(img.id)}
                      className={`absolute top-1 right-1 p-1 rounded-full text-white ${
                        marked ? "bg-red-600" : "bg-gray-600"
                      }`}
                    >
                      X
                    </button>
                  </div>
                );
              })}
            </div>
            <input
              type="file"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files || []);
                const current = getValues("newFiles");
                const updated = [...current, ...files];
                console.log("Nuevas imágenes seleccionadas:", updated);
                setValue("newFiles", updated);
              }}
              className="mb-2"
            />
            <p className="text-sm text-gray-500">Selecciona nuevas imágenes para subir</p>
          </div>

          {/* Guardar */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#2A8C82] text-white px-6 py-3 rounded-md hover:bg-[#275950] focus:outline-none focus:ring-2 focus:ring-[#41BFB3] transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}
