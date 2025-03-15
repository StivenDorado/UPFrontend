export default function TotalCost({ label, amount }) {
  return (
    <article className="flex justify-between">
      <span className="font-medium">{label}</span>
      <span className="font-medium">{amount}</span>
    </article>
  );
}
