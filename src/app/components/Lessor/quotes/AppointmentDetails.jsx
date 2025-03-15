import ClockIcon from "./ClockIcon";

export default function AppointmentDetails() {
  return (
    <article className="flex-1 border-r">
      <article className="grid grid-cols-2 p-4 gap-y-4">
        <article className="space-y-1">
          <article className="text-sm text-muted-foreground">
            Fecha de solicitud
          </article>
          <article>25 de junio de 2024</article>
          <article className="text-sm text-muted-foreground">
            Hora de la cita
          </article>
          <article>10:30 AM</article>
        </article>
        <article className="flex items-center justify-end">
          <article className="bg-primary rounded-full w-10 h-10 flex items-center justify-center text-primary-foreground">
            <ClockIcon className="w-5 h-5" />
          </article>
        </article>
      </article>
    </article>
  );
}
