export default function GuestSelect() {
  return (
    <article>
      <select id="guests" className="w-full">
        <option value="">Select number of guests</option>
        {Array.from({ length: 10 }, (_, i) => (
          <option key={i + 1} value={i + 1}>{`${i + 1} guest${
            i + 1 > 1 ? "s" : ""
          }`}</option>
        ))}
      </select>
    </article>
  );
}
