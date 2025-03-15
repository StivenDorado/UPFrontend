// src/components/PropertySize.jsx
export default function PropertySize() {
  return (
    <article className="mb-6">
      <label className="block text-lg font-medium text-gray-700">
        Tamaño de la propiedad
      </label>
      <article className="grid grid-cols-2 gap-4 mt-4">
        <article>
          <label
            htmlFor="bedrooms"
            className="block text-sm font-medium text-gray-600"
          >
            Dormitorios
          </label>
          <select
            id="bedrooms"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </article>
        <article>
          <label
            htmlFor="bathrooms"
            className="block text-sm font-medium text-gray-600"
          >
            Baños
          </label>
          <select
            id="bathrooms"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </article>
      </article>
    </article>
  );
}
