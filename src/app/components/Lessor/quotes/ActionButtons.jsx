export default function ActionButtons() {
  return (
    <article className="p-4 space-y-4 flex flex-col justify-center">
      <button className="w-full transition-all duration-300 hover:bg-primary hover:text-primary-foreground border border-current py-2 rounded">
        ACEPTAR
      </button>
      <button className="w-full border border-current py-2 rounded">
        RECHAZAR
      </button>
    </article>
  );
}
