// src/components/PropertyType.jsx
export default function PropertyType() {
  return (
    <article className="mb-6">
      <label className="block text-lg font-medium text-gray-700">
        Tipo de propiedad
      </label>
      <article className="grid grid-cols-3 gap-4 mt-4">
        {["apartment", "house", "room"].map((type) => (
          <article key={type}>
            <input
              type="radio"
              id={type}
              name="propertyType"
              value={type}
              className="sr-only"
            />
            <label
              htmlFor={type}
              className="flex flex-col items-center justify-center rounded-md border border-gray-300 bg-white p-4 shadow-sm hover:bg-gray-100 transition-all cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mb-2 h-8 w-8 text-gray-700"
              >
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              {type === "apartment"
                ? "Apartamento"
                : type === "house"
                ? "Casa"
                : "Habitación"}
            </label>
          </article>
        ))}
      </article>
    </article>
  );
}
