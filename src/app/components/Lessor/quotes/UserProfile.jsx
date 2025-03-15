export default function UserProfile() {
  return (
    <article className="flex items-center gap-4 p-4 border-r">
      <article className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
        <img
          src="../../ME.jpg"
          alt="User"
          className="w-full h-full rounded-full object-cover"
        />
        <article className="hidden">JD</article>
      </article>
      <article>
        <article className="font-medium">Muriel</article>
        <article className="text-muted-foreground text-sm">Información</article>
      </article>
    </article>
  );
}
