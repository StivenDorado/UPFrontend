export default function CostItem({ label, amount }) {
  return (
    <article className="flex justify-between mb-4">
      <span>{label}</span>
      <span className="font-medium">{amount}</span>
    </article>
  );
}
