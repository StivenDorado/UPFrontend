import PriceInput from "./PriceInput";
import GuestSelect from "./GuestSelect";
import ActionButtons from "./ActionButtons";

export default function Component() {
  return (
    <article className="grid md:grid-cols-2 gap-6 p-6">
      <section className="space-y-6 flex flex-col justify-center">
        <PriceInput />
        <GuestSelect />
      </section>
      <ActionButtons />
    </article>
  );
}
