import IncludedServices from "./IncludedServices";
import StayDuration from "./StayDuration";
import Gender from "./Gender";
import AccommodationRules from "./AccommodationRules";

export default function Component() {
  return (
    <article className="grid gap-8 max-w-2xl mx-auto p-4 md:p-8">
      <IncludedServices />
      <StayDuration />
      <Gender />
      <AccommodationRules />
    </article>
  );
}
