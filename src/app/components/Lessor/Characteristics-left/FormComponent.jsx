// src/components/FormComponent.jsx
import PropertyType from "./PropertyType";
import PropertySize from "./PropertySize";
import Features from "./Features";

export default function FormComponent() {
  return (
    <article className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto mt-8">
      <PropertyType />
      <PropertySize />
      <Features />
    </article>
  );
}
