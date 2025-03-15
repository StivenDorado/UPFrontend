export default function AccommodationRules() {
  return (
    <article className="grid gap-2">
      <h2 className="text-2xl font-semibold">ACCOMMODATION RULES</h2>
      <textarea
        className="w-full h-10 p-2 rounded-md border border-gray-300 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your rules here..."
      />
    </article>
  );
}
