// src/components/Features.jsx
export default function Features() {
  const features = [
    { id: "independent-entrance", label: "Entrada independiente" },
    { id: "family-home", label: "Casa de familia" },
    { id: "parking", label: "Área de estacionamiento" },
    { id: "restaurant", label: "Restaurante en el lugar" },
    { id: "pets", label: "Se permiten mascotas" },
  ];

  return (
    <article className="mb-6">
      <label className="block text-lg font-medium text-gray-700">
        Características
      </label>
      <article className="grid grid-cols-2 gap-4 mt-4">
        {features.map((feature) => (
          <article className="flex items-center gap-2" key={feature.id}>
            <input
              type="checkbox"
              id={feature.id}
              name="features"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor={feature.id} className="text-sm text-gray-600">
              {feature.label}
            </label>
          </article>
        ))}
      </article>
    </article>
  );
}
